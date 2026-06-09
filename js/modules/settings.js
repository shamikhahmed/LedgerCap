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

    const holdings = Ledger.calcHoldings(state.transactions || []);
    const funds = Ledger.calcFundHoldings(state.transactions || []);
    const goldPpg = settings.goldPricePerGram || 18000;
    const nisabValue = 87.48 * goldPpg;
    const zakatableStocks = holdings.filter(h => {
      const sd = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === h.symbol && s.broker === h.broker);
      return sd?.isShariah;
    }).reduce((sum, h) => sum + h.shares * (State.getPrice(h.symbol) || h.avgCost), 0);
    const zakatableFunds = funds.reduce((sum, f) => {
      const nav = State.getPrice(f.symbol) || f.avgNav;
      return sum + f.units * nav;
    }, 0);
    const zakatableTotal = zakatableStocks + zakatableFunds;
    const zakatDue = zakatableTotal >= nisabValue ? zakatableTotal * 0.025 : 0;

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
      <div class="field-row">
        <div class="field">
          <label class="field-label">USD/PKR Rate</label>
          <input class="field-input" id="s-usdrate" type="number" value="${settings.usdRate || 280}" placeholder="280">
        </div>
        <div class="field">
          <label class="field-label">Gold Price (₨/gram)</label>
          <input class="field-input" id="s-goldprice" type="number" value="${settings.goldPricePerGram || 18000}" placeholder="18000">
        </div>
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
      <div class="field-row" style="margin-bottom:16px;">
        <div class="field">
          <label class="field-label">PKR Depreciation (%/yr)</label>
          <input class="field-input" id="s-pkrdep" type="number" step="0.5" value="${((settings.pkrDepreciationRate || 0.15) * 100).toFixed(0)}" placeholder="15">
        </div>
        <div class="field">
          <label class="field-label">Freedom Target (₨/mo)</label>
          <input class="field-input" id="s-freedom" type="number" value="${settings.freedomTarget || 100000}" placeholder="100000">
        </div>
      </div>
      <div class="field-hint" style="margin-bottom:12px;">4% rule: corpus needed = ₨${Math.round((settings.freedomTarget || 100000) * 12 / 0.04).toLocaleString()}</div>
      <div style="display:flex;gap:8px;">
        <button class="btn-primary" style="flex:1;" onclick="Settings._saveAssumptions()">Save Assumptions</button>
        <button class="btn-ghost" onclick="Settings._resetAssumptions()">Reset Defaults</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Zakat Calculator</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Nisab (87.48g gold)</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(nisabValue).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">At ₨${goldPpg.toLocaleString()}/g</div>
        </div>
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Zakatable Assets</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(zakatableTotal).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">Shariah holdings</div>
        </div>
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Shariah Stocks</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(zakatableStocks).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">Marked ☪ in portfolio</div>
        </div>
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Meezan Funds</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(zakatableFunds).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">All funds (Shariah)</div>
        </div>
      </div>
      ${zakatableTotal >= nisabValue ? `
      <div style="padding:12px 14px;background:rgba(14,203,129,0.08);border:1px solid rgba(14,203,129,0.2);border-radius:var(--r-sm);margin-bottom:8px;">
        <div style="font-size:0.75rem;color:var(--text3);margin-bottom:4px;">Zakat Due (2.5%)</div>
        <div style="font-size:1.4rem;font-weight:800;color:var(--green);">₨${Math.round(zakatDue).toLocaleString()}</div>
        <div style="font-size:0.68rem;color:var(--text3);margin-top:2px;">Above nisab threshold ✓</div>
      </div>` : `
      <div style="padding:12px 14px;background:var(--bg3);border-radius:var(--r-sm);margin-bottom:8px;">
        <div style="font-size:0.78rem;color:var(--text3);">Below nisab threshold (₨${Math.round(nisabValue).toLocaleString()}) — no Zakat due on these assets yet.</div>
      </div>`}
      <div style="font-size:0.65rem;color:var(--text3);line-height:1.4;">Consult a scholar for your specific situation. Non-Shariah stocks excluded from calculation.</div>
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
      <div style="padding:12px 16px;display:flex;flex-direction:column;gap:10px;">
        <div class="field">
          <label class="field-label">PSX Proxy URL (optional)</label>
          <input class="field-input" id="s-proxy" type="url" placeholder="https://stunds-psx-proxy.yourname.workers.dev" value="${settings.psxProxyUrl || window.STUNDS_CONFIG?.psxProxyUrl || ''}">
          <div class="field-hint">Deploy worker/ to Cloudflare for reliable PSX prices</div>
        </div>
        <button class="btn-ghost" onclick="Settings._saveProxy()">Save Proxy URL</button>
        <button class="btn-secondary" onclick="App.refreshPrices()">⟳ Refresh All Prices</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Manual Fund NAV</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--text3);margin-bottom:12px;">Meezan funds aren't on PSX — update NAV when AMC publishes new values.</p>
      ${(window.MEEZAN_FUNDS || []).map(f => {
        const p = state.prices?.[f.symbol];
        const nav = p?.price || f.currentNav;
        return `<div class="field-row" style="margin-bottom:8px;align-items:flex-end;">
          <div class="field" style="flex:1;">
            <label class="field-label">${f.symbol}</label>
            <input class="field-input nav-inp" data-sym="${f.symbol}" type="number" step="0.01" value="${nav}">
          </div>
          <button class="btn-ghost" style="padding:10px 14px;" onclick="Settings._saveNav('${f.symbol}')">Save</button>
        </div>`;
      }).join('')}
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
        <button class="btn-secondary" onclick="Settings._exportData()">↑ Export .stunds Backup</button>
        <button class="btn-secondary" onclick="Settings._importData()">↓ Import .stunds Backup</button>
        <button class="btn-danger" onclick="Settings._resetVault()">⚠ Reset All Data</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">About</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="setting-row"><div class="setting-label">StundsOS</div><span class="setting-value">v2.1</span></div>
      <div class="setting-row"><div class="setting-label">Architecture</div><span class="setting-value">Ledger-first</span></div>
      <div class="setting-row"><div class="setting-label">Storage</div><span class="setting-value">Local (offline-first)</span></div>
    </div>
    <div style="height:8px;"></div>`;
  }

  function _saveProfile() {
    const salary = parseInt(document.getElementById('s-salary')?.value) || 150000;
    const targetSIP = parseInt(document.getElementById('s-sip')?.value) || 75000;
    const usdRate = parseInt(document.getElementById('s-usdrate')?.value) || 280;
    const goldPricePerGram = parseInt(document.getElementById('s-goldprice')?.value) || 18000;
    const currentState = State.get();
    currentState.settings = { ...currentState.settings, salary, targetSIP, usdRate, goldPricePerGram };
    try {
      localStorage.setItem('stundsOS_v2', JSON.stringify(currentState));
      App.showToast(`Saved: ₨${salary.toLocaleString()}/mo salary`, 'success');
    } catch(e) {
      App.showToast('Save failed: ' + e.message, 'error');
      return;
    }
    render();
  }

  function _saveAssumptions() {
    const ret = parseFloat(document.getElementById('s-return')?.value) / 100 || 0.18;
    const inflation = parseFloat(document.getElementById('s-inflation')?.value) / 100 || 0.20;
    const pkrDep = parseFloat(document.getElementById('s-pkrdep')?.value) / 100 || 0.15;
    const freedom = parseInt(document.getElementById('s-freedom')?.value) || 100000;
    const currentState = State.get();
    currentState.settings = { ...currentState.settings, targetReturn: ret, inflationRate: inflation, pkrDepreciationRate: pkrDep, freedomTarget: freedom };
    try {
      localStorage.setItem('stundsOS_v2', JSON.stringify(currentState));
      App.showToast('Assumptions saved ✓', 'success');
    } catch(e) {
      App.showToast('Save failed: ' + e.message, 'error');
      return;
    }
    render();
  }

  function _resetAssumptions() {
    if (!confirm('Reset assumptions to defaults?')) return;
    State.update(s => {
      s.settings.targetReturn = 0.18;
      s.settings.inflationRate = 0.20;
      s.settings.pkrDepreciationRate = 0.15;
      s.settings.freedomTarget = 100000;
    });
    App.showToast('Assumptions reset to defaults', 'success');
    render();
  }

  function _exportData() {
    const json = State.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stundsOS-backup-${new Date().toISOString().slice(0, 10)}.stunds`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast('Backup exported', 'success');
  }

  function _importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.stunds,.json,application/json';
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

  function _saveProxy() {
    const url = document.getElementById('s-proxy')?.value?.trim() || '';
    State.update(s => { s.settings.psxProxyUrl = url; });
    if (window.STUNDS_CONFIG) window.STUNDS_CONFIG.psxProxyUrl = url;
    App.showToast(url ? 'Proxy URL saved' : 'Proxy cleared — using public fallbacks', 'success');
    render();
  }

  function _saveNav(symbol) {
    const inp = document.querySelector(`.nav-inp[data-sym="${symbol}"]`);
    const nav = parseFloat(inp?.value);
    if (!nav || nav <= 0) { App.showToast('Enter a valid NAV', 'warning'); return; }
    State.updatePrice(symbol, { price: nav, prevClose: nav * 0.999, source: 'manual', ts: Date.now() });
    App.showToast(`${symbol} NAV updated to ₨${nav}`, 'success');
    App.renderCurrent();
  }

  function _resetVault() {
    if (!confirm('Reset all data? This cannot be undone.')) return;
    State.reset();
    App.showToast('Data reset', 'warning');
    App.renderCurrent();
  }

  return { render, _saveProfile, _saveAssumptions, _resetAssumptions, _saveProxy, _saveNav, _exportData, _importData, _resetVault };
})();
window.Settings = Settings;
