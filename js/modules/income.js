'use strict';
const Income = (() => {

  function fmt(n) {
    if (!n && n !== 0) return '—';
    const abs = Math.abs(n);
    if (abs >= 10000000) return '₨' + (n / 10000000).toFixed(2) + 'cr';
    if (abs >= 100000) return '₨' + (n / 100000).toFixed(1) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function render() {
    const screen = document.getElementById('screen-income');
    if (!screen) return;

    const state = State.get();
    const transactions = state.transactions || [];
    const settings = state.settings || {};

    const now = new Date();
    const thisMonth = now.toISOString().slice(0, 7);

    const monthlySalary = Ledger.monthlySalary(transactions);
    const monthlyContrib = Ledger.monthlyContributions(transactions);

    const thisSalary = monthlySalary[thisMonth] || 0;
    const thisInvest = monthlyContrib[thisMonth] || 0;
    const thisSaved = thisSalary - thisInvest;
    const thisRate = thisSalary > 0 ? ((thisInvest / thisSalary) * 100) : 0;

    const months6 = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months6.push(d.toISOString().slice(0, 7));
    }

    const salary6 = months6.map(m => monthlySalary[m] || 0);
    const invest6 = months6.map(m => monthlyContrib[m] || 0);
    const maxVal = Math.max(...salary6, 1);

    const avgInvestRate6 = (() => {
      const totalSal = salary6.reduce((a, v) => a + v, 0);
      const totalInv = invest6.reduce((a, v) => a + v, 0);
      return totalSal > 0 ? (totalInv / totalSal) * 100 : 0;
    })();

    const totalDivs = Ledger.totalDividends(transactions);
    const targetSIP = settings.targetSIP || 75000;
    const contribPct = Math.min(100, Math.round((thisInvest / targetSIP) * 100));

    screen.innerHTML = `
    <div style="padding:calc(env(safe-area-inset-top,16px) + 10px) 16px 14px;background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div style="font-size:1.1rem;font-weight:700;margin-bottom:12px;">Income & Savings</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
        ${[
          ['Salary', fmt(thisSalary), 'This month'],
          ['Invested', fmt(thisInvest), `${thisRate.toFixed(0)}% of income`],
          ['Saved', fmt(Math.max(0, thisSaved)), 'After investing'],
        ].map(([l, v, sub]) => `<div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">${l}</div>
          <div style="font-size:1rem;font-weight:800;">${v}</div>
          <div style="font-size:0.65rem;color:var(--text3);margin-top:2px;">${sub}</div>
        </div>`).join('')}
      </div>
    </div>

    ${thisSalary === 0 ? `
    <div style="padding:14px 16px;background:var(--bg2);border-bottom:1px solid var(--bg4);display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div style="font-size:0.88rem;font-weight:600;">Log this month's salary</div>
        <div style="font-size:0.72rem;color:var(--text3);margin-top:2px;">Track your savings rate accurately</div>
      </div>
      <button class="btn-ghost" onclick="App.openAddTransaction('SALARY')">+ Log</button>
    </div>` : ''}

    <div class="sec-head"><span class="sec-title">SIP Target</span></div>
    <div style="padding:14px 16px;background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-size:0.88rem;font-weight:600;">${fmt(thisInvest)} invested this month</span>
        <span style="font-size:0.78rem;color:var(--orange);font-weight:700;">Target: ${fmt(targetSIP)}</span>
      </div>
      <div class="sip-bar"><div class="sip-fill" style="width:${contribPct}%;"></div></div>
      <div style="margin-top:6px;font-size:0.68rem;color:var(--text3);">${contribPct >= 100 ? '✓ Target reached!' : `${fmt(targetSIP - thisInvest)} remaining`}</div>
    </div>

    <div class="sec-head"><span class="sec-title">6-Month Overview</span></div>
    <div class="income-bar-wrap">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:0.75rem;color:var(--text3);">Avg investment rate: <strong style="color:var(--text)">${avgInvestRate6.toFixed(0)}%</strong></span>
        <div style="display:flex;gap:12px;">
          <div style="display:flex;align-items:center;gap:4px;font-size:0.65rem;color:var(--text3);"><div style="width:8px;height:8px;border-radius:2px;background:var(--orange);"></div>Invested</div>
          <div style="display:flex;align-items:center;gap:4px;font-size:0.65rem;color:var(--text3);"><div style="width:8px;height:8px;border-radius:2px;background:var(--bg4);"></div>Salary</div>
        </div>
      </div>
      <div class="income-bar">
        ${months6.map((m, i) => {
          const sal = salary6[i];
          const inv = invest6[i];
          const salH = sal > 0 ? Math.round((sal / maxVal) * 120) : 0;
          const invH = inv > 0 ? Math.round((inv / maxVal) * 120) : 0;
          const label = new Date(m + '-01').toLocaleDateString('en-PK', { month: 'short' });
          return `<div class="income-col">
            <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;width:100%;">
              <div class="income-seg-invest" style="height:${invH}px;"></div>
              ${sal > inv ? `<div class="income-seg-spend" style="height:${salH - invH}px;border-radius:2px 2px 0 0;"></div>` : ''}
            </div>
            <div class="income-month">${label}</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Month by Month</span></div>
    ${months6.slice().reverse().map(m => {
      const sal = monthlySalary[m] || 0;
      const inv = monthlyContrib[m] || 0;
      const rate = sal > 0 ? ((inv / sal) * 100) : 0;
      const label = new Date(m + '-01').toLocaleDateString('en-PK', { month: 'long', year: 'numeric' });
      return `<div class="income-sum-row">
        <div>
          <div style="font-size:0.88rem;font-weight:600;">${label}</div>
          <div style="font-size:0.7rem;color:var(--text3);margin-top:2px;">${sal > 0 ? `${fmt(inv)} invested · ${rate.toFixed(0)}% rate` : 'No salary logged'}</div>
        </div>
        <div style="text-align:right;">
          <div class="income-sum-value">${fmt(sal)}</div>
          <div style="font-size:0.65rem;color:var(--text3);">salary</div>
        </div>
      </div>`;
    }).join('')}

    ${totalDivs > 0 ? `
    <div class="sec-head"><span class="sec-title">Dividends Received</span></div>
    <div style="padding:14px 16px;background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div style="font-size:1.3rem;font-weight:800;color:var(--gold);">${fmt(totalDivs)}</div>
      <div style="font-size:0.72rem;color:var(--text3);margin-top:4px;">All time dividend income</div>
    </div>` : ''}

    <div style="padding:16px;">
      <button class="btn-secondary" onclick="App.openAddTransaction('SALARY')">+ Log Salary</button>
    </div>
    <div style="height:8px;"></div>`;
  }

  return { render };
})();
window.Income = Income;
