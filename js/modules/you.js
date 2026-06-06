'use strict';
const You = (() => {

  function fmtPKR(n) {
    if (!n || isNaN(n)) return '₨0';
    if (n >= 1e7) return '₨' + (n/1e7).toFixed(2) + 'Cr';
    if (n >= 1e5) return '₨' + (n/1e5).toFixed(1) + 'L';
    if (n >= 1e3) return '₨' + (n/1e3).toFixed(0) + 'K';
    return '₨' + Math.round(n).toLocaleString();
  }

  function render() {
    const el = document.getElementById('screen-you');
    if (!el) return;

    const settings = State.get('settings') || {};
    const lastUpdate = State.get('lastPriceUpdate');
    const totalVal = State.calcTotalValue();
    const netCash = State.get('netCash') || 0;
    const netWorth = totalVal + netCash;
    const sipLog = State.get('sipLog') || [];
    const totalSipInvested = sipLog.reduce((s, l) => s + (l.amount || 0), 0);

    const plan = window.SIP_PLAN || [];
    const totalSipMonthly = plan.reduce((s, p) => s + p.amount, 0);

    el.innerHTML = `
      <div class="screen-header">
        <div class="screen-title">You</div>
        <div class="screen-subtitle">Investor Profile</div>
      </div>

      <!-- Profile -->
      <div style="padding:0 18px">
        <div class="card">
          <div class="profile-info-row">
            <div class="profile-avatar">S</div>
            <div>
              <div style="font-size:1.2rem;font-weight:700">Shamikh Ahmed</div>
              <div style="font-size:0.78rem;color:var(--text3);margin-top:2px">26 · Single · Karachi</div>
              <div style="font-size:0.78rem;color:var(--orange);margin-top:2px;font-weight:600">Passive Income + Wealth Building</div>
            </div>
          </div>
          <div class="divider" style="margin:14px 0"></div>
          <div class="row-between">
            <span class="t-sub">Monthly salary</span>
            <span class="bold">₨150,000</span>
          </div>
          <div class="row-between" style="margin-top:8px">
            <span class="t-sub">Monthly investment</span>
            <span class="bold" style="color:var(--orange)">₨${(totalSipMonthly/1000).toFixed(0)}K (50%)</span>
          </div>
          <div class="row-between" style="margin-top:8px">
            <span class="t-sub">Total SIP invested</span>
            <span class="bold" style="color:var(--green)">${fmtPKR(totalSipInvested)}</span>
          </div>
        </div>
      </div>

      <!-- Net Worth -->
      <div class="section-header">
        <span class="section-label">Net Worth</span>
        <button class="section-action" onclick="You.editCash()">Edit Cash</button>
      </div>
      <div style="padding:0 18px">
        <div class="card-hero">
          <div class="t-label">Estimated Net Worth</div>
          <div class="networth-num" style="margin-top:8px">${fmtPKR(netWorth)}</div>
          <div style="margin-top:10px;display:flex;gap:20px">
            <div>
              <div style="font-size:0.7rem;color:var(--text3)">Portfolio</div>
              <div style="font-size:0.92rem;font-weight:700">${fmtPKR(totalVal)}</div>
            </div>
            <div>
              <div style="font-size:0.7rem;color:var(--text3)">Cash / Bank</div>
              <div style="font-size:0.92rem;font-weight:700">${fmtPKR(netCash)}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- SIP Allocation -->
      <div class="section-header"><span class="section-label">Monthly SIP Allocation</span></div>
      <div style="padding:0 18px">
        <div class="card">
          ${(plan || []).map(p => `
            <div class="sip-item">
              <div class="sip-dot" style="background:${p.color}"></div>
              <div style="flex:1">
                <div style="font-size:0.85rem;font-weight:600">${p.label}</div>
                <div style="font-size:0.7rem;color:var(--text3)">${p.note}</div>
              </div>
              <div style="text-align:right">
                <div style="font-size:0.9rem;font-weight:700">₨${(p.amount/1000).toFixed(0)}K</div>
                <div style="font-size:0.68rem;color:var(--text3)">${(p.amount/totalSipMonthly*100).toFixed(0)}%</div>
              </div>
            </div>
          `).join('')}
          <div class="divider" style="margin:8px 0"></div>
          <div class="row-between">
            <span style="font-weight:700">Total Monthly</span>
            <span style="font-weight:700;color:var(--orange)">₨${(totalSipMonthly/1000).toFixed(0)}K</span>
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div class="section-header"><span class="section-label">Settings</span></div>
      <div style="padding:0 18px">
        <div class="card" style="padding:0 18px">
          <div class="settings-row">
            <div>
              <div class="settings-label">Shariah Filter</div>
              <div class="settings-value">Show only Shariah-compliant</div>
            </div>
            <button class="toggle${settings.showShariah ? ' on' : ''}" id="shariah-toggle" onclick="You.toggleShariah()"></button>
          </div>
          <div class="settings-row">
            <div>
              <div class="settings-label">Currency</div>
              <div class="settings-value">Pakistani Rupee</div>
            </div>
            <span class="settings-value">PKR</span>
          </div>
        </div>
      </div>

      <!-- Data Management -->
      <div class="section-header"><span class="section-label">Data</span></div>
      <div style="padding:0 18px;display:flex;flex-direction:column;gap:8px">
        <button class="btn btn-ghost" onclick="You.exportData()">Export Data (JSON)</button>
        <button class="btn btn-ghost" onclick="You.importData()">Import Data (JSON)</button>
        <button class="btn btn-danger" onclick="You.resetData()">Reset All Data</button>
      </div>

      <!-- About -->
      <div class="version-info" style="margin-top:24px">
        <div style="font-size:0.85rem;font-weight:700;margin-bottom:4px">StundsOS v1.0</div>
        <div>Offline-first · PWA · All data stored locally</div>
        <div style="margin-top:4px">Last price update: ${lastUpdate ? new Date(lastUpdate).toLocaleString() : 'Never'}</div>
        <div style="margin-top:4px">
          <span id="offline-status" style="color:var(--green)">● Online</span>
        </div>
      </div>

      <div style="height:24px"></div>
    `;

    window.addEventListener('online', () => {
      const s = document.getElementById('offline-status');
      if (s) { s.textContent = '● Online'; s.style.color = 'var(--green)'; }
    });
    window.addEventListener('offline', () => {
      const s = document.getElementById('offline-status');
      if (s) { s.textContent = '● Offline'; s.style.color = 'var(--text3)'; }
    });

    if (!navigator.onLine) {
      const s = document.getElementById('offline-status');
      if (s) { s.textContent = '● Offline'; s.style.color = 'var(--text3)'; }
    }
  }

  function toggleShariah() {
    State.update(s => { s.settings.showShariah = !s.settings.showShariah; });
    render();
  }

  function editCash() {
    const current = State.get('netCash') || 0;
    const val = prompt('Enter cash / bank balance (₨):', current);
    if (val === null) return;
    const n = parseFloat(val);
    if (isNaN(n)) { App.showToast('Invalid amount', 'error'); return; }
    State.set('netCash', n);
    render();
    App.showToast('Cash balance updated', 'success');
  }

  function exportData() {
    const json = State.exportJSON();
    const blob = new Blob([json], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stundsOS_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    App.showToast('Data exported', 'success');
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
        if (ok) { render(); App.showToast('Data imported successfully', 'success'); }
        else { App.showToast('Import failed — invalid file', 'error'); }
      };
      reader.readAsText(file);
    };
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }

  function resetData() {
    if (!confirm('Reset all data? This cannot be undone.')) return;
    State.reset();
    render();
    App.showToast('Data reset', 'info');
  }

  return { render, toggleShariah, editCash, exportData, importData, resetData };
})();
window.You = You;
