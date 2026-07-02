'use strict';
const Holdings = (() => {
  const U = PlatformUI;

  function render() {
    const screen = document.getElementById('screen-holdings');
    if (!screen) return;
    const rows = PortfolioAnalyticsService.getHoldings();
    const total = rows.reduce((s, r) => s + r.value, 0);

    screen.innerHTML = `
    ${MarketUI.pageHeader('Holdings', 'Full table', `${rows.length} positions · ${U.fmt(total)} total`, { action: '<button type="button" class="os-btn os-btn-primary" data-action="App.openAddTransaction">+ Add</button>' })}
    <div style="padding:0 20px 12px;display:flex;gap:8px;" class="cap-reveal">
      <button type="button" class="os-btn os-btn-ghost" data-action="Transactions.openLog">Transaction log</button>
    </div>
    ${rows.length ? `
    <div class="rt-table-wrap cap-reveal">
      <table class="rt-table">
        <thead><tr>
          <th>Symbol</th><th>Qty</th><th>Price</th><th>Value</th><th>G/L</th><th>Alloc</th><th>Yield</th><th>Rating</th>
        </tr></thead>
        <tbody>
        ${rows.map(r => `
          <tr data-nav="research">
            <td><strong>${r.symbol}</strong><div style="font-size:0.68rem;color:var(--os-text-tertiary)">${r.name}<br>${r.broker}</div></td>
            <td>${r.kind === 'fund' ? r.quantity.toFixed(2) : r.quantity}</td>
            <td>${U.fmt(r.price)}</td>
            <td>${U.fmt(r.value)}</td>
            <td class="${U.chgCls(r.pnl)}">${U.fmt(r.pnlPct, { pct: true, signed: true })}</td>
            <td>${r.allocPct.toFixed(1)}%</td>
            <td>${r.divYield ? r.divYield.toFixed(1) + '%' : '—'}</td>
            <td>${U.ratingBadge(r.aiRating)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>` : `<div class="cap-empty cap-reveal" style="margin:20px 16px">
      <div class="cap-empty__icon">📋</div>
      <div class="cap-empty__title">No holdings yet</div>
      <div class="cap-empty__body">Log a buy transaction to track your PSX portfolio, dividends, and net worth.</div>
      <div class="cap-empty__cta"><button type="button" class="os-btn os-btn-primary" data-action="App.openAddTransaction">Add first transaction</button></div>
    </div>`}
    <div style="height:20px;"></div>`;
    CapMotion.refresh();
  }

  return { render };
})();
window.Holdings = Holdings;
