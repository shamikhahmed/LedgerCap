'use strict';
/** PIN-encrypted .ledgercap backup (AES-GCM, same salt as PinVault). */
const BackupCrypto = (() => {
  async function _key(pin) {
    if (typeof PinVault === 'undefined' || !PinVault.deriveVaultKeyBits) return null;
    const bits = await PinVault.deriveVaultKeyBits(String(pin || ''));
    if (!bits) return null;
    return crypto.subtle.importKey('raw', bits, 'AES-GCM', false, ['encrypt', 'decrypt']);
  }

  async function encrypt(json, pin) {
    const key = await _key(pin);
    if (!key) throw new Error('PIN required');
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(json),
    );
    return JSON.stringify({
      ledgercapEnc: 1,
      iv: btoa(String.fromCharCode(...iv)),
      data: btoa(String.fromCharCode(...new Uint8Array(enc))),
    });
  }

  async function _passKey(passphrase) {
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(passphrase || '')));
    return crypto.subtle.importKey('raw', hash, 'AES-GCM', false, ['encrypt', 'decrypt']);
  }

  async function encryptWithPassphrase(json, passphrase) {
    const key = await _passKey(passphrase);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(json));
    return JSON.stringify({
      ledgercapEnc: 2,
      iv: btoa(String.fromCharCode(...iv)),
      data: btoa(String.fromCharCode(...new Uint8Array(enc))),
    });
  }

  async function decryptWithPassphrase(raw, passphrase) {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!parsed?.ledgercapEnc) return null;
    const key = parsed.ledgercapEnc === 2 ? await _passKey(passphrase) : await _key(passphrase);
    if (!key) throw new Error('Key required');
    const iv = Uint8Array.from(atob(parsed.iv), (c) => c.charCodeAt(0));
    const data = Uint8Array.from(atob(parsed.data), (c) => c.charCodeAt(0));
    const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    return new TextDecoder().decode(dec);
  }

  async function decrypt(raw, pin) {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!parsed?.ledgercapEnc) return null;
    if (parsed.ledgercapEnc === 2) return decryptWithPassphrase(parsed, pin);
    const key = await _key(pin);
    if (!key) throw new Error('PIN required');
    const iv = Uint8Array.from(atob(parsed.iv), (c) => c.charCodeAt(0));
    const data = Uint8Array.from(atob(parsed.data), (c) => c.charCodeAt(0));
    const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    return new TextDecoder().decode(dec);
  }

  return { encrypt, decrypt, encryptWithPassphrase, decryptWithPassphrase };
})();
window.BackupCrypto = BackupCrypto;
