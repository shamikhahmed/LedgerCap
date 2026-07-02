'use strict';
/** Encrypt Telegram bot token at rest (AES-GCM). Key derived from PIN when enabled. */
const SecretsVault = (() => {
  const MK = 'ledgercap_mk_v1';
  const ENC = 'ledgercap_tg_token_enc';
  const VK = 'ledgercap_vault_key_v1';
  let _sessionPin = null;

  async function _legacyMasterKey() {
    let b64 = localStorage.getItem(MK);
    if (!b64) {
      const buf = crypto.getRandomValues(new Uint8Array(32));
      b64 = btoa(String.fromCharCode(...buf));
      localStorage.setItem(MK, b64);
    }
    const raw = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    return crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt', 'decrypt']);
  }

  async function _pinDerivedKey(pin) {
    if (typeof PinVault === 'undefined' || !PinVault.deriveVaultKeyBits) return null;
    const bits = await PinVault.deriveVaultKeyBits(pin);
    if (!bits) return null;
    return crypto.subtle.importKey('raw', bits, 'AES-GCM', false, ['encrypt', 'decrypt']);
  }

  async function _masterKey() {
    if (_sessionPin && typeof PinVault !== 'undefined' && PinVault.isEnabled()) {
      const k = await _pinDerivedKey(_sessionPin);
      if (k) return k;
    }
    const stored = localStorage.getItem(VK);
    if (stored === 'pin' && _sessionPin) {
      const k = await _pinDerivedKey(_sessionPin);
      if (k) return k;
    }
    return _legacyMasterKey();
  }

  function setSessionPin(pin) {
    _sessionPin = pin ? String(pin) : null;
  }

  function clearSessionPin() {
    _sessionPin = null;
  }

  async function bindToPin(pin) {
    const plain = await getTelegramToken();
    localStorage.setItem(VK, 'pin');
    localStorage.removeItem(MK);
    setSessionPin(pin);
    if (plain) await setTelegramToken(plain);
  }

  async function rekeyAfterPinChange(pin) {
    const plain = await getTelegramToken();
    setSessionPin(pin);
    if (plain) await setTelegramToken(plain);
  }

  async function migrateLegacyToPin(pin) {
    if (localStorage.getItem(VK) === 'pin') return;
    if (!localStorage.getItem(ENC)) {
      localStorage.setItem(VK, 'pin');
      localStorage.removeItem(MK);
      return;
    }
    const legacy = await _legacyMasterKey();
    const raw = localStorage.getItem(ENC);
    let token = '';
    try {
      const { iv, data } = JSON.parse(raw);
      const dec = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: Uint8Array.from(atob(iv), (c) => c.charCodeAt(0)) },
        legacy,
        Uint8Array.from(atob(data), (c) => c.charCodeAt(0)),
      );
      token = new TextDecoder().decode(dec);
    } catch { /* empty */ }
    localStorage.setItem(VK, 'pin');
    localStorage.removeItem(MK);
    setSessionPin(pin);
    if (token) await setTelegramToken(token);
  }

  function hasTelegramToken() {
    return !!localStorage.getItem(ENC);
  }

  async function setTelegramToken(token) {
    token = String(token || '').trim();
    if (!token) {
      localStorage.removeItem(ENC);
      if (typeof State !== 'undefined') {
        State.update((s) => { delete s.settings.telegramBotToken; });
      }
      return;
    }
    const key = await _masterKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(token),
    );
    const payload = {
      iv: btoa(String.fromCharCode(...iv)),
      data: btoa(String.fromCharCode(...new Uint8Array(enc))),
    };
    localStorage.setItem(ENC, JSON.stringify(payload));
    if (typeof State !== 'undefined') {
      State.update((s) => { delete s.settings.telegramBotToken; });
    }
  }

  async function getTelegramToken() {
    const raw = localStorage.getItem(ENC);
    if (!raw) return '';
    try {
      const { iv, data } = JSON.parse(raw);
      const key = await _masterKey();
      const dec = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: Uint8Array.from(atob(iv), (c) => c.charCodeAt(0)) },
        key,
        Uint8Array.from(atob(data), (c) => c.charCodeAt(0)),
      );
      return new TextDecoder().decode(dec);
    } catch {
      return '';
    }
  }

  async function migratePlaintextToken() {
    if (typeof State === 'undefined') return;
    const plain = State.get('settings')?.telegramBotToken;
    if (!plain || hasTelegramToken()) return;
    await setTelegramToken(plain);
  }

  function stripSensitiveSettings(settings) {
    if (!settings || typeof settings !== 'object') return settings;
    const out = { ...settings };
    delete out.telegramBotToken;
    delete out.gnewsApiKey;
    if (out.telegramSyncKey) out.telegramSyncKey = '[redacted — re-enter after import]';
    return out;
  }

  return {
    setTelegramToken,
    getTelegramToken,
    hasTelegramToken,
    migratePlaintextToken,
    stripSensitiveSettings,
    setSessionPin,
    clearSessionPin,
    bindToPin,
    rekeyAfterPinChange,
    migrateLegacyToPin,
  };
})();
window.SecretsVault = SecretsVault;
