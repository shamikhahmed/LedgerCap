'use strict';
/** Node unit tests — PIN vault hashing & validation (no Web Crypto in vm). */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const root = path.join(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'js/services/pin-vault.js'), 'utf8');

function nodeDigest(pin, salt) {
  return crypto.createHash('sha256').update(`${salt}:${pin}`).digest('hex');
}

const storage = new Map();
const session = new Map();
const mockLocal = {
  getItem: k => storage.get(k) ?? null,
  setItem: (k, v) => storage.set(k, v),
  removeItem: k => storage.delete(k),
};
const mockSession = {
  getItem: k => session.get(k) ?? null,
  setItem: (k, v) => session.set(k, v),
  removeItem: k => session.delete(k),
};

const subtle = {
  digest: async (_algo, data) => {
    const buf = Buffer.from(data);
    return crypto.createHash('sha256').update(buf).digest().buffer;
  },
};

const ctx = {
  window: {},
  localStorage: mockLocal,
  sessionStorage: mockSession,
  crypto: { subtle, randomUUID: () => 'test-salt-uuid-0001' },
  TextEncoder: require('util').TextEncoder,
  console,
};
vm.createContext(ctx);
vm.runInContext(code, ctx);
const PinVault = ctx.window.PinVault;

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) { passed++; return; }
  failed++;
  console.error('FAIL:', msg);
}

(async () => {
  assert(PinVault.validateFormat('1234'), '4 digit ok');
  assert(PinVault.validateFormat('123456'), '6 digit ok');
  assert(!PinVault.validateFormat('123'), '3 digit reject');
  assert(!PinVault.validateFormat('1234567'), '7 digit reject');
  assert(!PinVault.validateFormat('12ab'), 'alpha reject');

  const salt = 'abc';
  const h = await PinVault.digestPin('4242', salt);
  assert(h === nodeDigest('4242', salt), 'digest matches node crypto');

  await PinVault.enablePin('4242', '4242');
  assert(PinVault.isEnabled(), 'enabled after set');
  assert(PinVault.isUnlocked(), 'unlocked after set');
  PinVault.lock();
  assert(!PinVault.isUnlocked(), 'locked after lock');

  const ok = await PinVault.verifyPin('4242');
  assert(ok.ok && !ok.decoy, 'main pin verifies');
  PinVault.unlock(false);
  assert(PinVault.isUnlocked(), 'unlocked after session');

  const bad = await PinVault.verifyPin('9999');
  assert(!bad.ok, 'wrong pin fails');

  await PinVault.setDecoyPin('1111', '4242');
  const dec = await PinVault.verifyPin('1111');
  assert(dec.ok && dec.decoy, 'decoy pin verifies');

  PinVault.setAutoLock(0);
  assert(PinVault.getAutoLock() === 0, 'auto lock never');

  await PinVault.disablePin('4242');
  assert(!PinVault.isEnabled(), 'disabled after clear');

  console.log(`\npin-vault: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
})().catch(e => {
  console.error(e);
  process.exit(1);
});
