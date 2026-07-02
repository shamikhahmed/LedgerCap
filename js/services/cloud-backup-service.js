'use strict';
/** Optional encrypted ledger backup via LedgerCap worker (sync key auth). */
const CloudBackupService = (() => {
  function _syncKey(state) {
    state = state || State.get();
    return String(state.settings?.cloudBackupKey || state.settings?.telegramSyncKey || '').trim();
  }

  function _proxyBase(state) {
    state = state || State.get();
    const raw = state.settings?.psxProxyUrl || window.LEDGERCAP_CONFIG?.psxProxyUrl || '';
    return typeof resolvePsxProxyUrl === 'function' ? resolvePsxProxyUrl(raw) : raw.replace(/\/$/, '');
  }

  async function pushBackup() {
    const key = _syncKey();
    if (!key) return { ok: false, error: 'Set Cloud sync key in Settings (Telegram sync key works)' };
    const proxy = _proxyBase();
    if (!proxy) return { ok: false, error: 'PSX proxy URL required' };
    if (typeof BackupCrypto === 'undefined') return { ok: false, error: 'Backup crypto unavailable' };
    try {
      const enc = await BackupCrypto.encryptWithPassphrase(State.exportJSON(), key);
      const res = await fetch(`${proxy}/ledger/backup`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-LedgerCap-Sync-Key': key,
        },
        body: JSON.stringify({ payload: enc, updatedAt: new Date().toISOString() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: data.error || `HTTP ${res.status} — worker may need ledger/backup route` };
      return { ok: true, updatedAt: data.updatedAt || new Date().toISOString() };
    } catch (e) {
      return { ok: false, error: e.message || 'Network error' };
    }
  }

  async function pullBackup() {
    const key = _syncKey();
    if (!key) return { ok: false, error: 'Set Cloud sync key in Settings' };
    const proxy = _proxyBase();
    if (!proxy) return { ok: false, error: 'PSX proxy URL required' };
    try {
      const res = await fetch(`${proxy}/ledger/backup`, {
        headers: { Accept: 'application/json', 'X-LedgerCap-Sync-Key': key },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: data.error || `HTTP ${res.status}` };
      if (!data.payload) return { ok: false, error: 'No backup on server' };
      const json = await BackupCrypto.decryptWithPassphrase(data.payload, key);
      if (!json) return { ok: false, error: 'Decrypt failed — wrong sync key?' };
      if (!confirm('Replace local ledger with cloud backup? Export first if unsure.')) {
        return { ok: false, error: 'Cancelled' };
      }
      const ok = State.importJSON(json);
      if (!ok) return { ok: false, error: 'Invalid backup payload' };
      return { ok: true, updatedAt: data.updatedAt };
    } catch (e) {
      return { ok: false, error: e.message || 'Network error' };
    }
  }

  return { pushBackup, pullBackup };
})();
window.CloudBackupService = CloudBackupService;
