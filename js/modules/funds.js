'use strict';
const Funds = (() => {
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
    const screen = document.getElementById('screen-funds');
    if (!screen) return;

    const funds = State.get('funds') || [];
    const totalInvested = funds.reduce((a, f) => a + (f.investedValue || 0), 0);
    const totalCurrent  = funds.reduce((a, f) => a + (f.currentValue || 0), 0);
    const totalPnl      = totalCurrent - totalInvested;
    const totalPnlPct   = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

    const sipLog = State.get('sipLog') || [];
    const sipPlan = window.SIP_PLAN || [];
    const sipTotal = sipPlan.reduce((a, s) => a + s.amount, 0);

    screen.innerHTML = `
    <div style="padding:calc(env(safe-area-inset-top,20px) + 12px) 16px 16px;background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="t-label" style="margin-bottom:6px;">Meezan Funds Portfolio</div>
      <div style="font-size:1.8rem;font-weight:800;font-variant-numeric:tabular-nums;">${fmt(totalCurrent)}</div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:4px;flex-wrap:wrap;">
        <span class="${pnlClass(totalPnl)}" style="font-weight:700;">${fmtPct(totalPnlPct)} · ${fmt(totalPnl)}</span>
        <span class="t-dim" style="font-size:0.75rem;">Invested: ${fmt(totalInvested)}</span>
      </div>
    </div>

    <!-- Funds List -->
    <div class="sec-head"><span class="sec-title">All Funds (${funds.length})</span></div>
    <div id="funds-list">
      ${funds.map(f => renderFundCard(f)).join('')}
    </div>

    <!-- SIP Tracker -->
    <div class="sec-head" style="margin-top:16px;">
      <span class="sec-title">Monthly SIP Plan</span>
      <span class="t-orange" style="font-size:0.85rem;font-weight:700;">₨${sipTotal.toLocaleString()}/mo</span>
    </div>

    <div style="padding:0 16px;margin-bottom:16px;">
      <div class="card-dark" style="padding:14px;">
        ${sipPlan.map(s => `
          <div class="sip-item">
            <div class="sip-dot" style="background:${s.color};"></div>
            <div class="sip-fund">
              <div style="font-size:0.85rem;font-weight:700;">${s.fund}</div>
              <div class="t-caption">${s.note}</div>
            </div>
            <div class="sip-amount">₨${s.amount.toLocaleString()}</div>
          </div>`).join('')}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid var(--bg4);">
          <span style="font-size:0.85rem;font-weight:700;">Total Monthly SIP</span>
          <span class="t-orange" style="font-size:0.95rem;font-weight:800;">₨${sipTotal.toLocaleString()}</span>
        </div>
        <button class="btn-primary" style="margin-top:12px;padding:11px;" onclick="Funds.logSIP()">Log SIP This Month</button>
      </div>
    </div>

    <!-- MIIF Conversion Rule -->
    <div class="urgent-card" style="margin:0 16px 16px;">
      <div class="urgent-icon">⚡</div>
      <div style="font-size:0.82rem;font-weight:700;color:var(--gold);margin-bottom:6px;">MIIF Conversion Rule</div>
      <div style="font-size:0.8rem;color:var(--text2);line-height:1.5;">
        When KSE-100 drops <strong style="color:var(--text)">15%+</strong>: Convert MIIF buffer → KMIF immediately.<br>
        Don't wait. This is the rebalancing protocol. Execute without hesitation.
      </div>
    </div>

    <!-- SIP History -->
    ${sipLog.length > 0 ? `
    <div class="sec-head"><span class="sec-title">SIP History</span></div>
    <div style="padding:0 16px;margin-bottom:20px;">
      <div class="card-dark" style="padding:14px;">
        ${sipLog.slice(-6).reverse().map(log => `
          <div class="sip-log-item">
            <span class="sip-log-month">${log.month}</span>
            <span class="sip-log-amount">₨${(log.amount||sipTotal).toLocaleString()}</span>
          </div>`).join('')}
      </div>
    </div>` : `
    <div style="padding:0 16px 20px;">
      <div class="t-caption t-dim" style="text-align:center;padding:16px 0;">No SIP logged yet. Hit "Log SIP This Month" after each deposit.</div>
    </div>`}`;

    bindFundEvents();
  }

  function renderFundCard(f) {
    const pnl = (f.currentValue || 0) - (f.investedValue || 0);
    const pnlPct = f.investedValue > 0 ? (pnl / f.investedValue) * 100 : 0;
    const navGain = f.avgNav > 0 ? ((f.currentNav - f.avgNav) / f.avgNav) * 100 : 0;

    return `<div class="fund-card" data-fund-symbol="${f.symbol}">
      <div class="fund-top">
        <div>
          <div class="fund-name">${f.name}</div>
          <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
            <span class="broker-meezan broker-badge">MEEZAN</span>
            <span class="shariah-badge">☾ Shariah</span>
            <span class="fund-type-badge">${f.type}</span>
          </div>
        </div>
        <div style="text-align:right;">
          <div class="fund-value ${pnlClass(pnl)}">${fmt(f.currentValue)}</div>
          <div class="${pnlClass(pnl)}" style="font-size:0.72rem;font-weight:700;">${fmtPct(pnlPct)}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:4px;">
        <div>
          <div class="t-dim" style="font-size:0.62rem;text-transform:uppercase;letter-spacing:0.06em;">Units</div>
          <div style="font-size:0.8rem;font-weight:700;font-variant-numeric:tabular-nums;">${f.units.toFixed(4)}</div>
        </div>
        <div>
          <div class="t-dim" style="font-size:0.62rem;text-transform:uppercase;letter-spacing:0.06em;">Avg NAV</div>
          <div style="font-size:0.8rem;font-weight:700;font-variant-numeric:tabular-nums;">₨${f.avgNav.toFixed(4)}</div>
        </div>
        <div>
          <div class="t-dim" style="font-size:0.62rem;text-transform:uppercase;letter-spacing:0.06em;">Curr NAV</div>
          <div style="font-size:0.8rem;font-weight:700;font-variant-numeric:tabular-nums;" id="nav-${f.symbol.replace(/[^a-z0-9]/gi,'_')}">
            <span class="${pnlClass(navGain)}">₨${f.currentNav.toFixed(4)}</span>
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;padding-top:8px;border-top:1px solid var(--bg4);">
        <span class="t-caption">Invested: ${fmt(f.investedValue)}</span>
        <span class="${pnlClass(pnl)}" style="font-size:0.75rem;font-weight:700;">${pnl >= 0 ? '+' : ''}${fmt(pnl)}</span>
      </div>
    </div>`;
  }

  function bindFundEvents() {
    document.querySelectorAll('.fund-card').forEach(card => {
      card.addEventListener('click', () => {
        const symbol = card.dataset.fundSymbol;
        showFundDetail(symbol);
      });
    });
  }

  function showFundDetail(symbol) {
    const funds = State.get('funds') || [];
    const f = funds.find(fd => fd.symbol === symbol);
    if (!f) return;

    const pnl = (f.currentValue || 0) - (f.investedValue || 0);
    const pnlPct = f.investedValue > 0 ? (pnl / f.investedValue) * 100 : 0;

    const sheet = document.getElementById('detail-sheet');
    const content = document.getElementById('detail-content');
    const header = sheet.querySelector('.detail-header');

    header.innerHTML = `
      <button class="btn-ghost btn-sm" onclick="document.getElementById('detail-sheet').classList.remove('open')">← Back</button>
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="broker-meezan broker-badge">MEEZAN</span>
        <span class="shariah-badge">☾</span>
      </div>`;

    content.innerHTML = `
      <div style="margin-bottom:16px;">
        <div style="font-size:1.1rem;font-weight:800;">${f.name}</div>
        <div style="font-size:0.8rem;color:var(--text3);margin-top:2px;">${f.symbol} · ${f.type}</div>
      </div>

      <div class="detail-pnl-block">
        <div class="detail-pnl-amount ${pnlClass(pnl)}">${pnl >= 0 ? '+' : ''}${fmt(Math.abs(pnl))}</div>
        <div class="detail-pnl-pct ${pnlClass(pnl)}">${fmtPct(pnlPct)}</div>
      </div>

      <div class="detail-info-row"><span class="detail-info-label">Units Held</span><span class="detail-info-val">${f.units.toFixed(4)}</span></div>
      <div class="detail-info-row"><span class="detail-info-label">Avg NAV</span><span class="detail-info-val">₨${f.avgNav.toFixed(4)}</span></div>
      <div class="detail-info-row">
        <span class="detail-info-label">Current NAV</span>
        <span class="detail-info-val" id="fund-nav-display">₨${f.currentNav.toFixed(4)}</span>
      </div>
      <div class="detail-info-row"><span class="detail-info-label">Invested Value</span><span class="detail-info-val">${fmt(f.investedValue)}</span></div>
      <div class="detail-info-row"><span class="detail-info-label">Current Value</span><span class="detail-info-val ${pnlClass(pnl)}">${fmt(f.currentValue)}</span></div>

      <div style="margin-top:16px;">
        <button class="btn-ghost btn-sm" onclick="Funds.editNav('${f.symbol}')">Update NAV</button>
      </div>`;

    sheet.classList.add('open');
  }

  function editNav(symbol) {
    const funds = State.get('funds') || [];
    const f = funds.find(fd => fd.symbol === symbol);
    if (!f) return;

    const display = document.getElementById('fund-nav-display');
    if (!display) return;

    display.innerHTML = `<div style="display:flex;align-items:center;gap:6px;">
      <input class="inline-price-input" type="number" step="0.0001" min="0" id="inline-nav-inp" value="${f.currentNav}" placeholder="0.0000">
      <button class="btn-ghost btn-sm" onclick="Funds.saveNav('${symbol}')">Save</button>
    </div>`;

    const inp = document.getElementById('inline-nav-inp');
    if (inp) inp.focus();
  }

  function saveNav(symbol) {
    const inp = document.getElementById('inline-nav-inp');
    if (!inp) return;
    const val = parseFloat(inp.value);
    if (!val || val <= 0) { App.showToast('Invalid NAV', 'error'); return; }
    State.updateFundNav(symbol, val);
    App.showToast(`${symbol} NAV updated to ₨${val.toFixed(4)}`, 'success');
    document.getElementById('detail-sheet').classList.remove('open');
    render();
    Overview.render();
  }

  function logSIP() {
    const now = new Date();
    const month = now.toLocaleDateString('en', { month: 'long', year: 'numeric' });
    const sipTotal = (window.SIP_PLAN || []).reduce((a, s) => a + s.amount, 0);

    State.update(s => {
      if (!s.sipLog) s.sipLog = [];
      const existing = s.sipLog.find(l => l.month === month);
      if (!existing) s.sipLog.push({ month, amount: sipTotal, date: now.toISOString() });
    });

    App.showToast(`SIP logged for ${month}`, 'success');
    render();
  }

  return { render, editNav, saveNav, logSIP, showFundDetail };
})();
window.Funds = Funds;
