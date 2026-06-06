'use strict';
const Funds = (() => {

  function fmtPKR(n) {
    if (!n || isNaN(n)) return '₨0';
    if (n >= 1e7) return '₨' + (n/1e7).toFixed(2) + 'Cr';
    if (n >= 1e5) return '₨' + (n/1e5).toFixed(1) + 'L';
    if (n >= 1e3) return '₨' + (n/1e3).toFixed(0) + 'K';
    return '₨' + Math.round(n).toLocaleString();
  }

  function typeClass(t) {
    if (t === 'Equity Fund') return 'badge-equity';
    if (t === 'Income Fund') return 'badge-income';
    if (t === 'ETF') return 'badge-etf';
    if (t === 'Hybrid Fund') return 'badge-hybrid';
    return '';
  }

  function getSipProgress() {
    const sipLog = State.get('sipLog') || [];
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const thisMonth = sipLog.filter(l => l.monthKey === monthKey);
    const investedFunds = new Set(thisMonth.map(l => l.fund));
    const plan = window.SIP_PLAN || [];
    return {
      invested: plan.filter(p => investedFunds.has(p.fund)).reduce((s, p) => s + p.amount, 0),
      total: plan.reduce((s, p) => s + p.amount, 0),
      done: investedFunds,
      monthKey,
    };
  }

  function getSipHistory() {
    const sipLog = State.get('sipLog') || [];
    const months = {};
    sipLog.forEach(l => {
      if (!months[l.monthKey]) months[l.monthKey] = 0;
      months[l.monthKey] += l.amount;
    });
    return Object.entries(months)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 12);
  }

  function renderFundCard(f) {
    const val = (f.units || 0) * (f.currentNav || 0);
    const cost = (f.units || 0) * (f.avgNav || 0);
    const pnl = val - cost;
    const pnlPct = cost > 0 ? (pnl / cost * 100) : 0;
    const pnlColor = pnl >= 0 ? 'var(--green)' : 'var(--red)';

    return `
      <div class="fund-card card-press" onclick="Funds.openEditFund('${f.id}')">
        <div class="row-between" style="margin-bottom:10px">
          <div>
            <div class="fund-name">${f.name}</div>
            <div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap">
              <span class="badge ${typeClass(f.type)}">${f.type}</span>
              <span class="badge badge-meezan">Meezan</span>
              <span class="badge badge-shariah">☪ Shariah</span>
            </div>
          </div>
          ${f.annualReturn !== null && f.annualReturn !== undefined ? `
            <div style="text-align:right">
              <div class="fund-return" style="color:${f.annualReturn>=0?'var(--green)':'var(--red)'}">${f.annualReturn>=0?'+':''}${f.annualReturn}%</div>
              <div style="font-size:0.65rem;color:var(--text3)">1Y return</div>
            </div>
          ` : ''}
        </div>

        ${f.units > 0 ? `
          <div class="card" style="padding:12px;background:var(--bg3)">
            <div class="row-between" style="margin-bottom:6px">
              <span style="font-size:0.75rem;color:var(--text3)">Units</span>
              <span style="font-size:0.85rem;font-weight:600">${f.units.toLocaleString()}</span>
            </div>
            <div class="row-between" style="margin-bottom:6px">
              <span style="font-size:0.75rem;color:var(--text3)">Avg NAV</span>
              <span style="font-size:0.85rem;font-weight:600">${f.avgNav > 0 ? '₨' + f.avgNav.toFixed(4) : '—'}</span>
            </div>
            <div class="row-between" style="margin-bottom:6px">
              <span style="font-size:0.75rem;color:var(--text3)">Current NAV</span>
              <span style="font-size:0.85rem;font-weight:600">${f.currentNav > 0 ? '₨' + f.currentNav.toFixed(4) : '—'}</span>
            </div>
            <div class="divider" style="margin:8px 0"></div>
            <div class="row-between">
              <span style="font-size:0.75rem;color:var(--text3)">Market Value</span>
              <span style="font-size:0.95rem;font-weight:700">${fmtPKR(val)}</span>
            </div>
            ${cost > 0 ? `
              <div class="row-between" style="margin-top:4px">
                <span style="font-size:0.75rem;color:var(--text3)">P&L</span>
                <span style="font-size:0.82rem;font-weight:700;color:${pnlColor}">${pnl>=0?'+':''}${fmtPKR(Math.abs(pnl))} (${pnlPct>=0?'+':''}${pnlPct.toFixed(1)}%)</span>
              </div>
            ` : ''}
          </div>
        ` : `
          <div style="font-size:0.78rem;color:var(--text3);padding:8px 0">No units held — tap to add</div>
        `}
      </div>
    `;
  }

  function render() {
    const el = document.getElementById('screen-funds');
    if (!el) return;

    const funds = State.get('funds') || [];
    const totalFundsVal = State.calcFundsValue();
    const sipProgress = getSipProgress();
    const sipHistory = getSipHistory();
    const plan = window.SIP_PLAN || [];

    const sipPct = sipProgress.total > 0 ? (sipProgress.invested / sipProgress.total * 100) : 0;

    el.innerHTML = `
      <div class="screen-header">
        <div class="screen-title">Funds</div>
        <div class="screen-subtitle">Meezan · ${fmtPKR(totalFundsVal)}</div>
      </div>

      <!-- Total funds value -->
      <div style="padding:0 18px">
        <div class="card-hero">
          <div class="t-label">Total Funds Value</div>
          <div class="networth-num" style="margin-top:6px">${fmtPKR(totalFundsVal)}</div>
          <div style="font-size:0.75rem;color:var(--text3);margin-top:4px">All Meezan holdings</div>
        </div>
      </div>

      <!-- Fund List -->
      <div class="section-header"><span class="section-label">Your Funds</span></div>
      ${funds.map(renderFundCard).join('')}

      <!-- MIIF Reminder -->
      <div style="padding:0 18px;margin-top:10px">
        <div class="rule-card" style="border-color:var(--gold)">
          <div class="rule-title" style="color:var(--gold)">MIIF Strategy</div>
          <div class="rule-body">Convert MIIF to KMIF when KSE drops 15%+. MIIF is your dry powder, not a permanent allocation.</div>
        </div>
      </div>

      <!-- SIP Tracker -->
      <div class="section-header">
        <span class="section-label">Monthly SIP</span>
        <button class="section-action" onclick="Funds.logSip()">Log Payment</button>
      </div>

      <div style="padding:0 18px">
        <div class="card">
          <div class="row-between" style="margin-bottom:12px">
            <div>
              <div style="font-size:0.78rem;color:var(--text3)">This month</div>
              <div style="font-size:1.4rem;font-weight:700">${fmtPKR(sipProgress.invested)} <span style="font-size:0.85rem;color:var(--text3)">/ ${fmtPKR(sipProgress.total)}</span></div>
            </div>
            <div style="font-size:1.4rem;font-weight:700;color:${sipPct>=100?'var(--green)':'var(--orange)'}">${sipPct.toFixed(0)}%</div>
          </div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:${Math.min(sipPct,100).toFixed(0)}%;background:${sipPct>=100?'var(--green)':'var(--orange)'}"></div>
          </div>

          <div style="margin-top:14px">
            ${plan.map(p => `
              <div class="sip-item">
                <div class="sip-dot" style="background:${p.color}"></div>
                <div style="flex:1">
                  <div style="font-size:0.85rem;font-weight:600">${p.label}</div>
                  <div style="font-size:0.7rem;color:var(--text3)">${p.note}</div>
                </div>
                <div style="text-align:right">
                  <div style="font-size:0.88rem;font-weight:700">₨${(p.amount/1000).toFixed(0)}K</div>
                  <div style="font-size:0.68rem;margin-top:2px">${sipProgress.done.has(p.fund) ? '<span style="color:var(--green)">✓ Done</span>' : '<span style="color:var(--text3)">Pending</span>'}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SIP History -->
      ${sipHistory.length > 0 ? `
        <div class="section-header"><span class="section-label">SIP History</span></div>
        <div style="padding:0 18px">
          <div class="card" style="padding:0 18px">
            ${sipHistory.map(([month, total]) => `
              <div class="holding-row" style="cursor:default">
                <div class="holding-left">
                  <div class="holding-name">${month}</div>
                </div>
                <div class="holding-right">
                  <div class="holding-value">${fmtPKR(total)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="height:24px"></div>
    `;
  }

  function openEditFund(id) {
    const funds = State.get('funds') || [];
    const f = funds.find(x => x.id === id);
    if (!f) return;

    const html = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div class="modal-title">${f.name}</div>
        <button class="modal-close" onclick="Funds.closeEdit()">✕</button>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">Units Held</label>
          <input class="input-field" id="fund-units" type="number" step="0.0001" value="${f.units || 0}">
        </div>
        <div class="input-group">
          <label class="input-label">Average NAV (₨)</label>
          <input class="input-field" id="fund-nav" type="number" step="0.0001" value="${f.avgNav || 0}">
        </div>
        <div class="input-group">
          <label class="input-label">Current NAV (₨)</label>
          <input class="input-field" id="fund-current-nav" type="number" step="0.0001" value="${f.currentNav || 0}">
        </div>
        <div class="input-group">
          <label class="input-label">1-Year Return (%)</label>
          <input class="input-field" id="fund-return" type="number" step="0.01" value="${f.annualReturn !== null && f.annualReturn !== undefined ? f.annualReturn : ''}">
        </div>
        <button class="btn btn-primary" onclick="Funds.saveEdit('${f.id}')">Save</button>
      </div>
    `;

    const overlay = document.getElementById('fund-edit-overlay');
    const sheet = document.getElementById('fund-edit-sheet');
    if (!overlay || !sheet) return;
    sheet.innerHTML = html;
    overlay.classList.add('active');
  }

  function closeEdit() {
    const overlay = document.getElementById('fund-edit-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  function saveEdit(id) {
    const units = parseFloat(document.getElementById('fund-units')?.value) || 0;
    const avgNav = parseFloat(document.getElementById('fund-nav')?.value) || 0;
    const currentNav = parseFloat(document.getElementById('fund-current-nav')?.value) || 0;
    const annualReturn = document.getElementById('fund-return')?.value !== '' ? parseFloat(document.getElementById('fund-return')?.value) : null;

    State.update(s => {
      const fund = s.funds.find(x => x.id === id);
      if (!fund) return;
      fund.units = units;
      fund.avgNav = avgNav;
      if (currentNav > 0) {
        fund.currentNav = currentNav;
        s.navs[fund.symbol] = currentNav;
      }
      if (annualReturn !== null) fund.annualReturn = annualReturn;
    });

    closeEdit();
    render();
    App.showToast('Fund updated', 'success');
  }

  function logSip() {
    const plan = window.SIP_PLAN || [];
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;

    const html = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div class="modal-title">Log SIP Payment</div>
        <button class="modal-close" onclick="Funds.closeSipLog()">✕</button>
      </div>
      <div class="modal-body">
        <div style="font-size:0.82rem;color:var(--text3);margin-bottom:14px">${monthKey}</div>
        ${plan.map((p, i) => `
          <div class="sip-item">
            <div class="sip-dot" style="background:${p.color}"></div>
            <div style="flex:1">
              <div style="font-size:0.85rem;font-weight:600">${p.label}</div>
              <div style="font-size:0.72rem;color:var(--text3)">₨${p.amount.toLocaleString()}</div>
            </div>
            <button class="toggle" id="sip-toggle-${i}" onclick="this.classList.toggle('on')"></button>
          </div>
        `).join('')}
        <button class="btn btn-primary" style="margin-top:16px" onclick="Funds.saveSipLog('${monthKey}')">Save</button>
      </div>
    `;

    const overlay = document.getElementById('sip-log-overlay');
    const sheet = document.getElementById('sip-log-sheet');
    if (!overlay || !sheet) return;
    sheet.innerHTML = html;
    overlay.classList.add('active');
  }

  function closeSipLog() {
    const overlay = document.getElementById('sip-log-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  function saveSipLog(monthKey) {
    const plan = window.SIP_PLAN || [];
    State.update(s => {
      plan.forEach((p, i) => {
        const toggle = document.getElementById('sip-toggle-' + i);
        if (toggle && toggle.classList.contains('on')) {
          s.sipLog.push({ monthKey, fund: p.fund, amount: p.amount, date: new Date().toISOString() });
        }
      });
    });

    closeSipLog();
    render();
    App.showToast('SIP logged', 'success');
  }

  return {
    render,
    openEditFund, closeEdit, saveEdit,
    logSip, closeSipLog, saveSipLog,
  };
})();
window.Funds = Funds;
