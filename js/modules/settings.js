'use strict';
const Settings = (() => {
  let _proxyHealth = { status: 'idle', detail: '' };

  async function _pingProxy(url) {
    if (!url) {
      _proxyHealth = { status: 'none', detail: 'No proxy URL configured' };
      return _proxyHealth;
    }
    _proxyHealth = { status: 'checking', detail: 'Pinging worker…' };
    _updateProxyHealthUI();
    try {
      const base = url.replace(/\/$/, '');
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 6000);
      const res = await fetch(`${base}/health`, { signal: ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        const body = await res.json().catch(() => ({}));
        _proxyHealth = body.ok
          ? { status: 'ok', detail: 'Worker reachable' }
          : { status: 'error', detail: 'Unexpected health response' };
      } else {
        _proxyHealth = { status: 'error', detail: `HTTP ${res.status}` };
      }
    } catch (e) {
      _proxyHealth = { status: 'error', detail: e.name === 'AbortError' ? 'Timeout — worker unreachable' : 'Worker unreachable' };
    }
    _updateProxyHealthUI();
    return _proxyHealth;
  }

  function _proxyHealthLabel() {
    if (_proxyHealth.status === 'ok') return { cls: 't-gain', text: '● Online' };
    if (_proxyHealth.status === 'checking') return { cls: '', text: '● Checking…' };
    if (_proxyHealth.status === 'none') return { cls: '', text: '● Not set' };
    return { cls: 't-loss', text: '● Offline' };
  }

  function _updateProxyHealthUI() {
    const el = document.getElementById('proxy-health-val');
    const sub = document.getElementById('proxy-health-sub');
    if (!el) return;
    const h = _proxyHealthLabel();
    el.className = `setting-value ${h.cls}`.trim();
    el.textContent = h.text;
    if (sub) sub.textContent = _proxyHealth.detail || '';
  }

  function render() {
    const screen = document.getElementById('screen-settings');
    if (!screen) return;

    const state = State.get();
    const settings = state.settings || {};
    const allPrices = Object.values(state.prices || {});
    const lastUpdate = allPrices.sort((a, b) => (b.ts || 0) - (a.ts || 0))[0];
    const lastUpdateStr = lastUpdate ? Prices.formatTs(lastUpdate.ts) : 'Never';
    const txCount = (state.transactions || []).length;
    const proxyUrl = settings.psxProxyUrl || window.STUNDS_CONFIG?.psxProxyUrl || '';
    const isOnline = navigator.onLine;
    const proxyHealth = _proxyHealthLabel();

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

    const theme = settings.theme || 'dark';

    screen.innerHTML = `
    <div class="os-page-header">
      <div class="os-page-title">Settings</div>
      <div class="os-page-sub">Preferences & data</div>
    </div>

    <div class="sec-head"><span class="sec-title">Appearance</span></div>
    <div style="background:var(--os-bg-card);border-bottom:1px solid var(--os-border);padding:16px 20px;">
      <div class="field-label" style="margin-bottom:10px;">Theme</div>
      <div class="os-theme-toggle">
        <button type="button" class="os-theme-btn${theme === 'dark' ? ' active' : ''}" onclick="Settings._setTheme('dark')">Dark</button>
        <button type="button" class="os-theme-btn${theme === 'light' ? ' active' : ''}" onclick="Settings._setTheme('light')">Light</button>
      </div>
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

    <div class="sec-head"><span class="sec-title" id="zakat-section">Zakat Calculator</span></div>
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
      <div class="setting-row">
        <div>
          <div class="setting-label">PSX Proxy</div>
          <div class="setting-sub" id="proxy-health-sub">${_proxyHealth.detail || (proxyUrl ? 'Worker health check' : 'Set URL below to enable live PSX')}</div>
        </div>
        <span class="setting-value ${proxyHealth.cls}" id="proxy-health-val">${proxyHealth.text}</span>
      </div>
      <div style="padding:12px 16px;display:flex;flex-direction:column;gap:10px;">
        <div class="field">
          <label class="field-label">PSX Proxy URL (optional)</label>
          <input class="field-input" id="s-proxy" type="url" placeholder="https://stunds-psx-proxy.yourname.workers.dev" value="${proxyUrl}">
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

    <div class="sec-head"><span class="sec-title">Try demo</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--text3);margin-bottom:0;line-height:1.5;">Open <strong>?demo=1</strong> for a sample PSX + Meezan portfolio without replacing your ledger from Settings.</p>
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
        <button class="btn-secondary" onclick="Settings._exportData()">↑ Export .ledgercap Backup</button>
        <button class="btn-secondary" onclick="Settings._importData()">↓ Import Backup (.ledgercap / .stunds)</button>
        <button class="btn-danger" onclick="Settings._resetVault()">⚠ Reset All Data</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">About</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="setting-row"><div class="setting-label">LedgerCap</div><span class="setting-value">v3.4.2</span></div>
      <div class="setting-row"><div class="setting-label">Architecture</div><span class="setting-value">Ledger-first</span></div>
      <div class="setting-row"><div class="setting-label">Storage</div><span class="setting-value">Local (offline-first)</span></div>
    </div>
    <div style="height:8px;"></div>`;
    _pingProxy(proxyUrl);
  }

  function _saveProfile() {
    const salary = parseInt(document.getElementById('s-salary')?.value, 10) || 150000;
    const targetSIP = parseInt(document.getElementById('s-sip')?.value, 10) || 75000;
    const usdRate = parseInt(document.getElementById('s-usdrate')?.value, 10) || 280;
    const goldPricePerGram = parseInt(document.getElementById('s-goldprice')?.value, 10) || 18000;
    State.update(s => {
      s.settings.salary = salary;
      s.settings.targetSIP = targetSIP;
      s.settings.usdRate = usdRate;
      s.settings.goldPricePerGram = goldPricePerGram;
    });
    App.showToast(`Saved: ₨${salary.toLocaleString()}/mo salary`, 'success');
    App.renderCurrent();
    render();
  }

  function _saveAssumptions() {
    const ret = parseFloat(document.getElementById('s-return')?.value) / 100 || 0.18;
    const inflation = parseFloat(document.getElementById('s-inflation')?.value) / 100 || 0.20;
    const pkrDep = parseFloat(document.getElementById('s-pkrdep')?.value) / 100 || 0.15;
    const freedom = parseInt(document.getElementById('s-freedom')?.value, 10) || 100000;
    State.update(s => {
      s.settings.targetReturn = ret;
      s.settings.inflationRate = inflation;
      s.settings.pkrDepreciationRate = pkrDep;
      s.settings.freedomTarget = freedom;
    });
    App.showToast('Assumptions saved ✓', 'success');
    App.renderCurrent();
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
    a.download = `ledgercap-backup-${new Date().toISOString().slice(0, 10)}.ledgercap`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast('Backup exported', 'success');
  }

  function _importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.ledgercap,.stunds,.json,application/json';
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
    _pingProxy(url);
    App.showToast(url ? 'Proxy URL saved' : 'Proxy cleared — using public fallbacks', 'success');
    App.renderCurrent();
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

  function _snapshotBeforeDestructive() {
    try { localStorage.setItem('ledgercap_pin_backup', State.exportJSON()); } catch (e) {}
  }

  function _resetVault() {
    if (!confirm('Reset all data? Export a .ledgercap backup first if you need to recover.')) return;
    _snapshotBeforeDestructive();
    if (!confirm('Final confirmation — delete all ledger data on this device?')) return;
    State.reset();
    App.showToast('Data reset', 'warning');
    App.renderCurrent();
  }

  function loadSeedData(opts) {
    const silent = opts && opts.silent;
    const seed = window.INITIAL_TRANSACTIONS || [];
    if (!seed.length) { if (!silent) App.showToast('Seed data unavailable', 'error'); return false; }
    if (!silent && !confirm(`Load ${seed.length} demo transactions? Existing ledger will be replaced.`)) return false;
    State.update(s => {
      s.transactions = seed.map(t => ({ ...t, id: t.id || Ledger.newId(), createdAt: Date.now() }));
      s.settings.onboardingDone = true;
      if (window.MEEZAN_FUNDS) {
        (window.MEEZAN_FUNDS || []).forEach(f => {
          if (f.currentNav && !s.prices[f.symbol]) {
            s.prices[f.symbol] = { price: f.currentNav, prevClose: f.currentNav * 0.999, source: 'meezan_seed', ts: Date.now() };
          }
        });
      }
      if (window.FALLBACK_PRICES) {
        Object.entries(window.FALLBACK_PRICES).forEach(([sym, price]) => {
          s.prices[sym] = { price, prevClose: price * 0.998, source: 'seed', ts: Date.now() };
        });
      }
    });
    if (!silent) App.showToast('Demo holdings loaded ✓', 'success');
    App.renderCurrent();
    render();
    return true;
  }

  function _loadSeed() {
    loadSeedData();
  }

  function _clearHoldings() {
    if (!confirm('Remove all transactions? Settings and prices stay.')) return;
    State.update(s => { s.transactions = []; });
    App.showToast('Transactions cleared', 'warning');
    App.renderCurrent();
    render();
  }

  function _setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return;
    App.applyTheme(theme);
    App.showToast(`${theme === 'light' ? 'Light' : 'Dark'} theme applied`, 'success');
    render();
  }

  return { render, loadSeedData, _saveProfile, _saveAssumptions, _resetAssumptions, _saveProxy, _saveNav, _exportData, _importData, _resetVault, _loadSeed, _clearHoldings, _setTheme };
})();
window.Settings = Settings;
