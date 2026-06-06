'use strict';
const You = (() => {
  function fmt(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    if (Math.abs(n) >= 100000) return '₨' + (n / 100000).toFixed(2) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function fmtPct(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
  }

  function pnlClass(n) { return n >= 0 ? 't-gain' : 't-loss'; }

  function render() {
    const screen = document.getElementById('screen-you');
    if (!screen) return;

    const stocks = State.get('stocks') || [];
    const funds = State.get('funds') || [];
    const settings = State.get('settings') || {};

    const pricedStocks = stocks.filter(s => s.currentPrice > 0);
    let best = null, worst = null;
    if (pricedStocks.length > 0) {
      pricedStocks.forEach(s => {
        const pct = ((s.currentPrice - s.avgCost) / s.avgCost) * 100;
        if (!best || pct > best.pct) best = { ...s, pct };
        if (!worst || pct < worst.pct) worst = { ...s, pct };
      });
    }

    const fundsValue = funds.reduce((a, f) => a + (f.currentValue || 0), 0);
    const stocksValue = stocks.reduce((a, s) => a + s.shares * (s.currentPrice || 0), 0);

    screen.innerHTML = `
    <div style="padding:calc(env(safe-area-inset-top,20px) + 16px) 0 0;">

    <!-- Profile Card -->
    <div class="profile-card">
      <div class="profile-avatar">SA</div>
      <div class="profile-name">Shamikh Ahmed</div>
      <div class="profile-sub">26 · Karachi · Salaried Professional</div>
      <div class="profile-stat-row">
        <div class="profile-stat">
          <div class="profile-stat-val">₨1.5L</div>
          <div class="profile-stat-label">Monthly Income</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-val t-orange">₨75K</div>
          <div class="profile-stat-label">Monthly SIP</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-val">50%</div>
          <div class="profile-stat-label">Savings Rate</div>
        </div>
      </div>
      <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--bg4);">
        <div class="t-caption" style="line-height:1.6;">Goal: Build passive income through KSE stocks + Meezan mutual funds. Long-term wealth creation via consistent SIP + selective stock picking.</div>
      </div>
    </div>

    <!-- Portfolio Summary -->
    <div class="sec-head"><span class="sec-title">Portfolio Summary</span></div>
    <div class="stat-grid" style="margin-bottom:16px;">
      <div class="stat-card">
        <div class="stat-val">${stocks.length}</div>
        <div class="stat-label">Total Stocks</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">${fmt(fundsValue)}</div>
        <div class="stat-label">Funds Value</div>
      </div>
      <div class="stat-card ${best ? '' : ''}">
        <div class="stat-val t-gain" style="font-size:1rem;">${best ? best.symbol : '—'}</div>
        <div class="stat-label">Best Stock</div>
        ${best ? `<div class="t-gain" style="font-size:0.75rem;">${fmtPct(best.pct)}</div>` : ''}
      </div>
      <div class="stat-card">
        <div class="stat-val t-loss" style="font-size:1rem;">${worst ? worst.symbol : '—'}</div>
        <div class="stat-label">Worst Stock</div>
        ${worst ? `<div class="t-loss" style="font-size:0.75rem;">${fmtPct(worst.pct)}</div>` : ''}
      </div>
    </div>

    <!-- Quick Nav -->
    <div class="sec-head"><span class="sec-title">Quick Access</span></div>
    <div style="padding:0 16px;display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
      <button class="btn-secondary" onclick="Navigation.go('stocks')">📈 View All Stocks →</button>
      <button class="btn-secondary" onclick="Navigation.go('funds')">💰 Meezan Funds & SIP →</button>
      <button class="btn-secondary" onclick="Navigation.go('advisor')">🎯 Advisor & Watchlist →</button>
    </div>

    <!-- Settings -->
    <div class="sec-head"><span class="sec-title">Settings</span></div>
    <div style="margin:0 16px;background:var(--bg2);border:1px solid var(--bg4);border-radius:var(--r);overflow:hidden;margin-bottom:16px;">
      <div class="settings-row">
        <div>
          <div class="settings-label">Shariah Filter</div>
          <div class="settings-sub">Only show Shariah-compliant stocks</div>
        </div>
        <div class="toggle ${settings.showShariah ? 'on' : ''}" id="shariah-toggle" onclick="You.toggleShariah()">
          <div class="toggle-thumb"></div>
        </div>
      </div>
    </div>

    <!-- Data Actions -->
    <div class="sec-head"><span class="sec-title">Data</span></div>
    <div style="padding:0 16px;display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
      <button class="btn-ghost" onclick="You.exportData()">Export Portfolio JSON</button>
      <button class="btn-ghost" onclick="You.importData()">Import Portfolio JSON</button>
      <button class="btn-ghost" style="color:var(--red);border-color:rgba(246,70,93,0.3);" onclick="You.confirmReset()">Reset All Data</button>
    </div>

    <!-- App Info -->
    <div style="padding:16px;margin:0 16px 24px;background:var(--bg2);border:1px solid var(--bg4);border-radius:var(--r);text-align:center;">
      <div style="font-size:0.9rem;font-weight:800;color:var(--orange);">StundsOS v1.0</div>
      <div class="t-caption" style="margin-top:4px;">Offline-first PWA · Personal portfolio tracker</div>
      <div class="t-caption" style="margin-top:2px;">Prices: Manual + Yahoo Finance (delayed)</div>
      <div class="t-caption" style="margin-top:2px;">All data stored locally on device</div>
    </div>

    </div>`;
  }

  function toggleShariah() {
    const settings = State.get('settings') || {};
    const newVal = !settings.showShariah;
    State.set('settings', { ...settings, showShariah: newVal });
    App.showToast(`Shariah filter ${newVal ? 'ON' : 'OFF'}`, 'info');
    render();
  }

  function exportData() {
    const json = State.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stundsOS_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast('Portfolio exported', 'success');
  }

  function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const ok = State.importJSON(ev.target.result);
        if (ok) {
          App.showToast('Portfolio imported', 'success');
          Overview.render();
          render();
        } else {
          App.showToast('Invalid backup file', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function confirmReset() {
    if (confirm('Reset ALL data? This cannot be undone.')) {
      State.reset();
      App.showToast('Data reset', 'info');
      Overview.render();
      render();
    }
  }

  return { render, toggleShariah, exportData, importData, confirmReset };
})();
window.You = You;
