'use strict';
/**
 * Client-side PIN vault — PBKDF2-SHA256 (310k iterations), never stores
 * plaintext PIN. Legacy single-SHA-256 hashes are verified once and
 * transparently upgraded on the next successful unlock.
 * Note: the PIN gates the UI; portfolio data itself is not encrypted with it.
 */
const PinVault = (() => {
  const KEY = 'ledgercap_pin_v1';
  const SESSION_KEY = 'ledgercap_pin_session';
  const BACKUP_KEY = 'ledgercap_pin_backup';
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_MS = 30000;
  const LOCKOUT_MAX_MS = 30 * 60000;
  const PBKDF2_ITER = 310000;
  const PIN_RE = /^\d{4,6}$/;

  let _hiddenAt = 0;

  function _readSession() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null') || null;
    } catch (_) {
      return null;
    }
  }

  function _writeSession(data) {
    try {
      if (!data) sessionStorage.removeItem(SESSION_KEY);
      else sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    } catch (_) {}
  }

  function getConfig() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || 'null') || { enabled: false };
    } catch (_) {
      return { enabled: false };
    }
  }

  function saveConfig(cfg) {
    localStorage.setItem(KEY, JSON.stringify(cfg));
  }

  function validateFormat(pin) {
    return PIN_RE.test(String(pin || ''));
  }

  function _hex(buf) {
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /** Legacy scheme (pre-3.44): single SHA-256 of `salt:pin`. Kept for verify-and-upgrade only. */
  async function digestPinLegacy(pin, salt) {
    const payload = `${salt}:${pin}`;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload));
    return _hex(buf);
  }

  /** Current scheme: PBKDF2-SHA256, 310k iterations. Output prefixed `v2:`. */
  async function digestPin(pin, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(String(pin)), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode(String(salt)), iterations: PBKDF2_ITER },
      keyMaterial,
      256
    );
    return 'v2:' + _hex(bits);
  }

  /** AES-256 key material for SecretsVault — separate salt domain from PIN hash. */
  async function deriveVaultKeyBits(pin) {
    const cfg = getConfig();
    if (!cfg.salt || !validateFormat(pin)) return null;
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(String(pin)), 'PBKDF2', false, ['deriveBits']);
    const vaultSalt = enc.encode(`ledgercap:vault:${cfg.salt}`);
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt: vaultSalt, iterations: PBKDF2_ITER },
      keyMaterial,
      256
    );
    return new Uint8Array(bits);
  }

  async function _matchesStored(pin, salt, storedHash) {
    if (!storedHash) return false;
    if (String(storedHash).startsWith('v2:')) {
      return (await digestPin(pin, salt)) === storedHash;
    }
    return (await digestPinLegacy(pin, salt)) === storedHash;
  }

  function isEnabled() {
    const cfg = getConfig();
    return !!(cfg.enabled && cfg.hash && cfg.salt);
  }

  function isUnlocked() {
    if (!isEnabled()) return true;
    const s = _readSession();
    return !!(s && s.unlockedAt && !shouldReLock(s));
  }

  function isDecoyMode() {
    const s = _readSession();
    return !!(s && s.decoy && isUnlocked());
  }

  function shouldReLock(session) {
    const s = session || _readSession();
    if (!s || !s.unlockedAt) return true;
    const cfg = getConfig();
    const min = cfg.autoLockMin;
    if (min == null || min <= 0) return false;
    return Date.now() - s.unlockedAt > min * 60000;
  }

  function unlock(decoy) {
    _writeSession({ unlockedAt: Date.now(), decoy: !!decoy });
  }

  function lock() {
    _writeSession(null);
  }

  function noteBackground() {
    _hiddenAt = Date.now();
  }

  function lockoutRemaining(cfg) {
    cfg = cfg || getConfig();
    if (!cfg.lockUntil) return 0;
    const left = cfg.lockUntil - Date.now();
    return left > 0 ? left : 0;
  }

  async function verifyPin(pin) {
    const cfg = getConfig();
    if (!cfg.enabled) return { ok: true, decoy: false };
    const wait = lockoutRemaining(cfg);
    if (wait > 0) return { ok: false, locked: true, waitMs: wait };

    if (!validateFormat(pin)) return { ok: false, reason: 'format' };

    if (await _matchesStored(pin, cfg.salt, cfg.hash)) {
      // Transparent upgrade: re-hash legacy SHA-256 entries with PBKDF2.
      if (!String(cfg.hash).startsWith('v2:')) cfg.hash = await digestPin(pin, cfg.salt);
      cfg.fails = 0;
      cfg.lockUntil = 0;
      cfg.lockLevel = 0;
      saveConfig(cfg);
      if (typeof SecretsVault !== 'undefined') {
        SecretsVault.setSessionPin(pin);
        SecretsVault.migrateLegacyToPin(pin).catch(() => {});
      }
      return { ok: true, decoy: false };
    }
    if (cfg.decoyHash && await _matchesStored(pin, cfg.salt, cfg.decoyHash)) {
      if (!String(cfg.decoyHash).startsWith('v2:')) cfg.decoyHash = await digestPin(pin, cfg.salt);
      cfg.fails = 0;
      cfg.lockUntil = 0;
      cfg.lockLevel = 0;
      saveConfig(cfg);
      return { ok: true, decoy: true };
    }

    cfg.fails = (cfg.fails || 0) + 1;
    let attemptsLeft = MAX_ATTEMPTS - cfg.fails;
    if (cfg.fails >= MAX_ATTEMPTS) {
      // Escalating lockout: 30s, 1m, 2m, 4m … capped at 30m.
      const level = (cfg.lockLevel || 0);
      cfg.lockUntil = Date.now() + Math.min(LOCKOUT_MS * Math.pow(2, level), LOCKOUT_MAX_MS);
      cfg.lockLevel = level + 1;
      cfg.fails = 0;
      attemptsLeft = 0;
    }
    saveConfig(cfg);
    return { ok: false, attemptsLeft, locked: attemptsLeft === 0 && lockoutRemaining(cfg) > 0 };
  }

  async function enablePin(pin, confirmPin) {
    if (pin !== confirmPin) throw new Error('PINs do not match');
    if (!validateFormat(pin)) throw new Error('Use 4–6 digits');
    const salt = crypto.randomUUID();
    const hash = await digestPin(pin, salt);
    const prev = getConfig();
    saveConfig({
      enabled: true,
      salt,
      hash,
      decoyHash: prev.decoyHash || '',
      fails: 0,
      lockUntil: 0,
      autoLockMin: prev.autoLockMin != null ? prev.autoLockMin : 5,
    });
    unlock(false);
    if (typeof SecretsVault !== 'undefined') {
      SecretsVault.bindToPin(pin).catch(() => {});
    }
  }

  async function changePin(oldPin, newPin, confirmPin) {
    const check = await verifyPin(oldPin);
    if (!check.ok) throw new Error(check.locked ? 'Too many attempts — wait 30s' : 'Current PIN incorrect');
    if (newPin !== confirmPin) throw new Error('New PINs do not match');
    if (!validateFormat(newPin)) throw new Error('Use 4–6 digits');
    const cfg = getConfig();
    const hash = await digestPin(newPin, cfg.salt);
    cfg.hash = hash;
    cfg.fails = 0;
    cfg.lockUntil = 0;
    saveConfig(cfg);
    unlock(false);
    if (typeof SecretsVault !== 'undefined') {
      SecretsVault.rekeyAfterPinChange(newPin).catch(() => {});
    }
  }

  async function disablePin(pin) {
    const check = await verifyPin(pin);
    if (!check.ok || check.decoy) throw new Error('PIN incorrect');
    localStorage.removeItem(KEY);
    _writeSession(null);
    if (typeof SecretsVault !== 'undefined') SecretsVault.clearSessionPin();
  }

  async function setDecoyPin(pin, mainPin) {
    if (!validateFormat(pin)) throw new Error('Use 4–6 digits');
    const cfg = getConfig();
    if (!cfg.enabled) throw new Error('Set main PIN first');
    if (!(await _matchesStored(mainPin, cfg.salt, cfg.hash))) throw new Error('Main PIN incorrect');
    if (pin === mainPin) throw new Error('Decoy must differ from main PIN');
    cfg.decoyHash = await digestPin(pin, cfg.salt);
    saveConfig(cfg);
  }

  async function clearDecoyPin(mainPin) {
    const cfg = getConfig();
    if (!(await _matchesStored(mainPin, cfg.salt, cfg.hash))) throw new Error('Main PIN incorrect');
    cfg.decoyHash = '';
    saveConfig(cfg);
  }

  function setAutoLock(minutes) {
    const cfg = getConfig();
    cfg.autoLockMin = minutes;
    saveConfig(cfg);
  }

  function getAutoLock() {
    const cfg = getConfig();
    return cfg.autoLockMin != null ? cfg.autoLockMin : 5;
  }

  function hasDecoy() {
    return !!getConfig().decoyHash;
  }

  function snapshotBeforeDestructive(exportJson) {
    try {
      if (exportJson) localStorage.setItem(BACKUP_KEY, exportJson);
    } catch (_) {}
  }

  return {
    KEY,
    MAX_ATTEMPTS,
    LOCKOUT_MS,
    validateFormat,
    digestPin,
    deriveVaultKeyBits,
    getConfig,
    saveConfig,
    isEnabled,
    isUnlocked,
    isDecoyMode,
    shouldReLock,
    unlock,
    lock,
    noteBackground,
    lockoutRemaining,
    verifyPin,
    enablePin,
    changePin,
    disablePin,
    setDecoyPin,
    clearDecoyPin,
    setAutoLock,
    getAutoLock,
    hasDecoy,
    snapshotBeforeDestructive,
  };
})();

window.PinVault = PinVault;
