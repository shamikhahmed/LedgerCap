'use strict';
const Reports = (() => {

  function fmt(n) {
    if (!n && n !== 0) return '—';
    const abs = Math.abs(n);
    if (abs >= 10000000) return '₨' + (n / 10000000).toFixed(2) + 'cr';
    if (abs >= 100000) return '₨' + (n / 100000).toFixed(1) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function monthlySnapshot(state) {
    const transactions = state.transactions || [];
    const settings = state.settings || {};
    const now = new Date();
    const thisMonth = now.toISOString().slice(0, 7);
    const monthLabel = now.toLocaleDateString('en-PK', { month: 'long', year: 'numeric' });

    const contrib = Ledger.monthlyContributions(transactions)[thisMonth] || 0;
    const targetSIP = settings.targetSIP || 75000;
    const sipGap = targetSIP - contrib;
    const dividends = (transactions || []).filter(t => t.type === 'DIVIDEND' && (t.date || '').startsWith(thisMonth));
    const divTotal = dividends.reduce((s, t) => s + (t.amount || 0), 0);

    const totalValue = State.calcTotalValue();
    const totalCost = State.calcTotalCost();
    const totalPnl = totalValue - totalCost;
    const dailyPnl = State.calcDailyPnl();

    const holdings = Ledger.calcHoldings(transactions);
    const movers = holdings.map(h => {
      const price = State.getPrice(h.symbol) || h.avgCost;
      const prev = State.getPrevClose(h.symbol) || price;
      const chg = h.shares * (price - prev);
      const chgPct = prev ? ((price - prev) / prev) * 100 : 0;
      return { symbol: h.symbol, chg, chgPct, val: h.shares * price };
    }).sort((a, b) => Math.abs(b.chg) - Math.abs(a.chg)).slice(0, 5);

    const stockVal = holdings.reduce((s, h) => s + h.shares * (State.getPrice(h.symbol) || h.avgCost), 0);
    const funds = Ledger.calcFundHoldings(transactions);
    const fundVal = funds.reduce((s, f) => s + f.units * (State.getPrice(f.symbol) || f.avgNav), 0);
    const stockPct = totalValue > 0 ? (stockVal / totalValue * 100) : 0;
    const fundPct = totalValue > 0 ? (fundVal / totalValue * 100) : 0;

    return `
    <div class="sec-head"><span class="sec-title">Monthly Report — ${monthLabel}</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <div class="metric-grid" style="margin-bottom:12px;">
        <div class="metric-tile">
          <div class="metric-label">Net Worth</div>
          <div class="metric-value">${fmt(totalValue)}</div>
          <div class="metric-sub">All time P&L ${totalPnl >= 0 ? '+' : ''}${fmt(totalPnl)}</div>
        </div>
        <div class="metric-tile">
          <div class="metric-label">SIP This Month</div>
          <div class="metric-value">${fmt(contrib)}</div>
          <div class="metric-sub" style="color:${sipGap > 0 ? 'var(--gold)' : 'var(--green)'};">
            ${sipGap > 0 ? `₨${Math.round(sipGap).toLocaleString()} below target` : 'Target met ✓'}
          </div>
        </div>
        <div class="metric-tile">
          <div class="metric-label">Dividends</div>
          <div class="metric-value">${fmt(divTotal)}</div>
          <div class="metric-sub">${dividends.length} payment(s)</div>
        </div>
        <div class="metric-tile">
          <div class="metric-label">Today P&L</div>
          <div class="metric-value ${dailyPnl >= 0 ? 't-gain' : 't-loss'}">${dailyPnl >= 0 ? '+' : ''}${fmt(dailyPnl)}</div>
          <div class="metric-sub">Unrealised daily</div>
        </div>
      </div>
      <div style="font-size:0.72rem;color:var(--text3);margin-bottom:8px;">Allocation · Stocks ${stockPct.toFixed(0)}% · Funds ${fundPct.toFixed(0)}%</div>
      ${movers.length ? `<div style="font-size:0.72rem;color:var(--text3);margin-bottom:6px;">Top movers today</div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          ${movers.map(m => `<div style="display:flex;justify-content:space-between;font-size:0.8rem;padding:8px 10px;background:var(--bg3);border-radius:8px;">
            <span style="font-weight:700;">${m.symbol}</span>
            <span class="${m.chg >= 0 ? 't-gain' : 't-loss'}">${m.chg >= 0 ? '+' : ''}${fmt(m.chg)} (${m.chgPct >= 0 ? '+' : ''}${m.chgPct.toFixed(1)}%)</span>
          </div>`).join('')}
        </div>` : ''}
      <button class="btn-secondary" style="width:100%;margin-top:14px;" onclick="Reports.exportText()">Copy report summary</button>
    </div>`;
  }

  function exportText() {
    const state = State.get();
    const now = new Date();
    const thisMonth = now.toISOString().slice(0, 7);
    const contrib = Ledger.monthlyContributions(state.transactions || {})[thisMonth] || 0;
    const target = state.settings?.targetSIP || 75000;
    const text = [
      `StundsOS Monthly Report — ${now.toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}`,
      `Net Worth: ${fmt(State.calcTotalValue())}`,
      `Invested: ${fmt(State.calcTotalCost())}`,
      `SIP: ${fmt(contrib)} / ${fmt(target)} target`,
      `Dividends YTD month: ${fmt(Ledger.totalDividends((state.transactions||[]).filter(t=>t.type==='DIVIDEND'&&(t.date||'').startsWith(thisMonth))))}`,
    ].join('\n');
    navigator.clipboard.writeText(text).then(() => App.showToast('Report copied', 'success'));
  }

  return { monthlySnapshot, exportText };
})();
window.Reports = Reports;
