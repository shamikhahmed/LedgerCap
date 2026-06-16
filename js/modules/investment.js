'use strict';
const Investment = (() => {

  function fmt(n) {
    if (!n && n !== 0) return '—';
    const abs = Math.abs(n);
    if (abs >= 10000000) return '₨' + (n / 10000000).toFixed(2) + 'cr';
    if (abs >= 100000) return '₨' + (n / 100000).toFixed(1) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function render(transactions, totalValue) {
    const timeline = Ledger.investmentTimeline(transactions);
    const bars = Ledger.monthlyInvestmentBars(timeline.byMonth, 12);
    const totalInvested = Ledger.currentCostBasis ? Ledger.currentCostBasis(transactions) : Ledger.totalInvested(transactions);
    const gain = totalValue - totalInvested;
    const gainPct = totalInvested > 0 ? (gain / totalInvested) * 100 : 0;
    const maxAdded = Math.max(...bars.map(b => b.added), 1);
    const maxCum = Math.max(...bars.map(b => b.cumulative), totalInvested, 1);

    const barHtml = bars.map(b => {
      const h = b.added > 0 ? Math.max(6, Math.round((b.added / maxAdded) * 72)) : 2;
      const label = new Date(b.month + '-01').toLocaleDateString('en-PK', { month: 'short' });
      return `<div class="inv-bar-col" title="${label}: +${fmt(b.added)}">
        <div class="inv-bar" style="height:${h}px"></div>
        <span>${label.charAt(0)}</span>
      </div>`;
    }).join('');

    const cumLine = bars.map((b, i) => {
      const x = (i / (bars.length - 1 || 1)) * 100;
      const y = 100 - (b.cumulative / maxCum) * 100;
      return `${x},${y}`;
    }).join(' ');

    const recent = timeline.points.slice(-5).reverse().map(p =>
      `<div class="inv-tx">
        <span class="inv-tx-date">${p.date || '—'}</span>
        <span class="inv-tx-sym">${p.symbol || p.type}</span>
        <span class="inv-tx-amt">+${fmt(p.amount)}</span>
      </div>`
    ).join('');

    return `
    <div class="sec-head"><span class="sec-title">Investment Tracker</span><span class="sec-action">${timeline.count} txns</span></div>
    <div class="inv-card">
      <div class="inv-summary">
        <div class="inv-stat">
          <div class="inv-stat-label">Total Invested</div>
          <div class="inv-stat-val">${fmt(totalInvested)}</div>
        </div>
        <div class="inv-stat">
          <div class="inv-stat-label">Portfolio Value</div>
          <div class="inv-stat-val">${fmt(totalValue)}</div>
        </div>
        <div class="inv-stat full">
          <div class="inv-stat-label">Net Gain on Capital</div>
          <div class="inv-stat-val ${gain >= 0 ? 't-gain' : 't-loss'}">${gain >= 0 ? '+' : ''}${fmt(gain)} <span class="inv-pct">(${gainPct >= 0 ? '+' : ''}${gainPct.toFixed(1)}%)</span></div>
        </div>
      </div>
      <div class="inv-chart-label">Monthly contributions (12 mo)</div>
      <div class="inv-bars">${barHtml}</div>
      <svg class="inv-spark" viewBox="0 0 100 40" preserveAspectRatio="none">
        <polyline fill="none" stroke="var(--orange)" stroke-width="1.5" points="${cumLine}"/>
      </svg>
      <div class="inv-chart-label">Cumulative invested over time</div>
      ${recent ? `<div class="inv-recent">${recent}</div>` : ''}
    </div>`;
  }

  return { render, fmt };
})();
window.Investment = Investment;
