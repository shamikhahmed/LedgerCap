'use strict';
const PortfolioScreen = (() => {
  function render() {
    const screen = document.getElementById('screen-portfolio');
    if (!screen) return;
    const state = State.get();
    if (!(state.transactions || []).length) {
      screen.innerHTML = `
        <div class="lc-screen-head">
          <h1>${I18n.t('portfolio.title')}</h1>
          <p>${I18n.t('portfolio.sub')}</p>
        </div>
        <div class="lc-empty-state">
          <h2>No positions yet</h2>
          <p>Log buys, funds, or global holdings to track P&amp;L in PKR.</p>
          <button type="button" class="psx-btn psx-btn-primary" onclick="App.openAddTransaction()">${I18n.t('addHoldings')}</button>
        </div>`;
      return;
    }
    const s = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    const holdings = PortfolioAnalyticsService.getHoldings();

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${I18n.t('portfolio.title')}</h1>
          <p>${I18n.t('portfolio.sub')}</p>
        </div>
        <div class="lc-dash-hero">
          <div class="lc-dash-hero-label">${I18n.t('portfolio.value')}</div>
          <div class="lc-dash-hero-val">${PsxUI.fmt(s.totalValue)}</div>
          <div class="lc-dash-hero-row">
            <span class="lc-dash-chip ${daily >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.today')} ${PsxUI.fmt(daily, { signed: daily >= 0 })}</span>
            <span class="lc-dash-chip ${s.totalReturn.pct >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.allTime')} ${PsxUI.fmt(s.totalReturn.pct, { pct: true, signed: true })}</span>
          </div>
        </div>
        <div class="lc-pulse-row">
          <div class="lc-pulse-pill"><label>${I18n.t('portfolio.yield')}</label><b class="psx-up">${s.portfolioDivYield.toFixed(1)}%</b></div>
          <div class="lc-pulse-pill"><label>${I18n.t('portfolio.invested')}</label><b>${PsxUI.fmt(s.invested)}</b></div>
          <div class="lc-pulse-pill"><label>${I18n.t('portfolio.gainLoss')}</label><b class="${s.totalReturn.abs >= 0 ? 'psx-up' : 'psx-down'}">${PsxUI.fmt(s.totalReturn.abs, { signed: s.totalReturn.abs >= 0 })}</b></div>
          <div class="lc-pulse-pill"><label>Cash</label><b>${PsxUI.fmt(Ledger.cashBalance(state.transactions || []))}</b></div>
        </div>
        ${(s.geoAllocation || []).length ? `<div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>Geography</h3><span>Allocation</span></div>
          <div class="psx-alloc-bars" style="padding:0 2px 12px">
            ${s.geoAllocation.map(g => `<div class="psx-alloc-row"><span>${g.label}</span><div class="psx-alloc-track"><div class="psx-alloc-fill" style="width:${Math.min(100, g.pct).toFixed(1)}%"></div></div><span>${g.pct.toFixed(1)}%</span></div>`).join('')}
          </div>
        </div>` : ''}
        <div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>Holdings</h3><span>${holdings.length} positions</span></div>
        </div>
        <div class="psx-table-wrap" style="margin:0 var(--lc-space-4);border-radius:var(--lc-radius);overflow:hidden;box-shadow:var(--lc-shadow)">
          <table class="psx-table"><thead><tr>
            <th>Symbol</th><th>Qty</th><th>Last</th><th>Value</th><th>G/L</th>
          </tr></thead><tbody>
          ${holdings.map(h => `<tr onclick="Navigation.go('research');Research.open('${h.symbol}')">
            <td><div class="psx-sym">${h.symbol}</div><div class="psx-sym-sub">${h.broker}</div></td>
            <td>${h.kind === 'fund' ? h.quantity.toFixed(2) : h.quantity}</td>
            <td>${PsxUI.fmt(h.price)}</td>
            <td>${PsxUI.fmt(h.value)}</td>
            <td class="${PsxUI.chgCls(h.pnlPct)}">${PsxUI.fmt(h.pnlPct, { pct: true, signed: true })}</td>
          </tr>`).join('')}
          </tbody></table>
        </div>
        <div class="lc-dash-actions" style="margin-top:var(--lc-space-6)">
          <button type="button" class="psx-btn psx-btn-primary" onclick="App.openAddTransaction()">${I18n.t('addHoldings')}</button>
        </div>
      </div>`;
  }
  return { render };
})();
window.PortfolioScreen = PortfolioScreen;
