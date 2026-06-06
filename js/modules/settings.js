'use strict';
const Settings = (() => {

  function render() {
    const screen = document.getElementById('screen-settings');
    if (!screen) return;

    const state = State.get();
    const settings = state.settings || {};
    const allPrices = Object.values(state.prices || {});
    const lastUpdate = allPrices.sort((a, b) => (b.ts || 0) - (a.ts || 0))[0];
    const lastUpdateStr = lastUpdate ? Prices.formatTs(lastUpdate.ts) : 'Never';
    const txCount = (state.transactions || []).length;
    const isOnline = navigator.onLine;

    screen.innerHTML = `
    <div style="padding:calc(env(safe-area-inset-top,16px) + 10px) 16px 14px;background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div style="font-size:1.1rem;font-weight:700;">Settings</div>
    </div>

    <div class="sec-head"><span class="sec-title">Investor Profile</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <div class="field">
        <label class="field-label">Monthly Salary (₨)</label>
        <input class="field-input" id="s-salary" type="number" value="${settings.salary || 150000}" placeholder="150000">
      </div>
      <div class="field">
        <label class="field-label">Monthly SIP Target (₨)</label>
        <input class="field-input" id="s-sip" type="number" value="${settings.targetSIP || 75000}" placeholder="75000">
      </div>
      <button class="btn-primary" onclick="Settings._saveProfile()">Save Profile</button>
    </div>

    <div class="sec-head"><span class="sec-title">Return Assumptions</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <div class="field-row" style="margin-bottom:16px;">
        <div class="field">
          <label class="field-label">Target Return (%/yr)</label>
          <input class="field-input" id="s-return" type="number" step="0.5" value="${((settings.targetReturn || 0.18) * 100).toFixed(0)}" placeholder="18">
        </div>
        <div class="field">
          <label class="field-label">Inflation (%/yr)</label>
          <input class="field-input" id="s-inflation" type="number" step="0.5" value="${((settings.inflationRate || 0.20) * 100).toFixed(0)}" placeholder="20">
        </div>
      </div>
      <div class="field">
        <label class="field-label">Freedom Target (₨/mo passive income)</label>
        <input class="field-input" id="s-freedom" type="number" value="${settings.freedomTarget || 100000}" placeholder="100000">
        <div class="field-hint">4% rule: corpus needed = ${Math.round((settings.freedomTarget || 100000) * 12 / 0.04).toLocaleString()}</div>
      </div>
      <button class="btn-primary" onclick="Settings._saveAssumptions()">Save Assumptions</button>
    </div>

    <div class="sec-head"><span class="sec-title">Live Prices</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="setting-row">
        <div>
          <div class="setting-label">Last Updated</div>
          <div class="setting-sub">${lastUpdateStr}</div>
        </div>
        <span class="setting-value ${isOnline ? 't-gain' : 't-loss'}">${isOnline ? '● Online' : '● Offline'}</span>
      </div>
      <div style="padding:12px 16px;">
        <button class="btn-secondary" onclick="App.refreshPrices()">⟳ Refresh All Prices</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Data Management</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="setting-row">
        <div>
          <div class="setting-label">Transactions</div>
          <div class="setting-sub">${txCount} entries in ledger</div>
        </div>
      </div>
      <div style="padding:12px 16px;display:flex;flex-direction:column;gap:8px;">
        <button class="btn-secondary" onclick="Settings._exportData()">↑ Export JSON Backup</button>
        <button class="btn-secondary" onclick="Settings._importData()">↓ Import JSON Backup</button>
        <button class="btn-danger" onclick="Settings._resetVault()">⚠ Reset All Data</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">About</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="setting-row"><div class="setting-label">StundsOS</div><span class="setting-value">v2.0</span></div>
      <div class="setting-row"><div class="setting-label">Architecture</div><span class="setting-value">Ledger-first</span></div>
      <div class="setting-row"><div class="setting-label">Storage</div><span class="setting-value">Local (offline-first)</span></div>
    </div>
    <div style="height:8px;"></div>`;
  }

  function _saveProfile() {
    const salary = parseInt(document.getElementById('s-salary')?.value) || 150000;
    const targetSIP = parseInt(document.getElementById('s-sip')?.value) || 75000;
    State.update(s => { s.settings.salary = salary; s.settings.targetSIP = targetSIP; });
    App.showToast('Profile saved', 'success');
    render();
  }

  function _saveAssumptions() {
    const ret = parseFloat(document.getElementById('s-return')?.value) / 100 || 0.18;
    const inflation = parseFloat(document.getElementById('s-inflation')?.value) / 100 || 0.20;
    const freedom = parseInt(document.getElementById('s-freedom')?.value) || 100000;
    State.update(s => { s.settings.targetReturn = ret; s.settings.inflationRate = inflation; s.settings.freedomTarget = freedom; });
    App.showToast('Assumptions saved', 'success');
    render();
  }

  function _exportData() {
    const json = State.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stundsOS-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast('Backup exported', 'success');
  }

  function _importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const ok = State.importJSON(ev.target.result);
        if (ok) { App.showToast('Data imported successfully', 'success'); App.renderCurrent(); }
        else App.showToast('Invalid backup file', 'error');
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function _resetVault() {
    if (!confirm('Reset all data? This cannot be undone.')) return;
    State.reset();
    App.showToast('Data reset', 'warning');
    App.renderCurrent();
  }

  return { render, _saveProfile, _saveAssumptions, _exportData, _importData, _resetVault };
})();
window.Settings = Settings;
