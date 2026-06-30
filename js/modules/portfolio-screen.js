'use strict';
const PortfolioScreen = (() => {
  function render() {
    const screen = document.getElementById('screen-portfolio');
    if (!screen) return;
    const state = State.get();
    if (!(state.transactions || []).length) {
      screen.innerHTML = `${PsxUI.strip()}${PsxUI.pageTitle(I18n.t('portfolio.title'), I18n.t('portfolio.sub'))}
        <div style="padding:16px"><button type="button" class="psx-btn psx-btn-primary" onclick="App.openAddTransaction()">${I18n.t('addHoldings')}</button></div>`;
      return;
    }
    const s = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    const holdings = PortfolioAnalyticsService.getHoldings();

    screen.innerHTML = `
      ${PsxUI.strip()}
      ${PsxUI.pageTitle(I18n.t('portfolio.title'), I18n.t('portfolio.sub'))}
      <div class="psx-hero">
        <div class="psx-hero-label">${I18n.t('portfolio.value')}</div>
        <div class="psx-hero-val">${PsxUI.fmt(s.totalValue)}</div>
        <div class="psx-hero-pills">
          <span class="psx-pill ${daily >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.today')} ${PsxUI.fmt(daily, { signed: daily >= 0 })}</span>
          <span class="psx-pill ${s.totalReturn.pct >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.allTime')} ${PsxUI.fmt(s.totalReturn.pct, { pct: true, signed: true })}</span>
        </div>
      </div>
      <div class="psx-stats">
        <div class="psx-stat"><div class="psx-stat-l">${I18n.t('portfolio.yield')}</div><div class="psx-stat-v psx-up">${s.portfolioDivYield.toFixed(1)}%</div></div>
        <div class="psx-stat"><div class="psx-stat-l">${I18n.t('portfolio.invested')}</div><div class="psx-stat-v">${PsxUI.fmt(s.invested)}</div></div>
        <div class="psx-stat"><div class="psx-stat-l">${I18n.t('portfolio.gainLoss')}</div><div class="psx-stat-v ${s.totalReturn.abs >= 0 ? 'psx-up' : 'psx-down'}">${PsxUI.fmt(s.totalReturn.abs, { signed: s.totalReturn.abs >= 0 })}</div></div>
        <div class="psx-stat"><div class="psx-stat-l">Positions</div><div class="psx-stat-v">${holdings.length}</div></div>
        <div class="psx-stat"><div class="psx-stat-l">Cash est.</div><div class="psx-stat-v">${PsxUI.fmt(Ledger.cashBalance(state.transactions || []))}</div></div>
      </div>
      <div class="psx-sector"><span>Holdings</span><span>${holdings.length} positions</span></div>
      <div class="psx-table-wrap"><table class="psx-table"><thead><tr>
        <th>Symbol</th><th>Qty</th><th>Last</th><th>Value</th><th>G/L</th><th>Alloc</th>
      </tr></thead><tbody>
      ${holdings.map(h => `<tr onclick="Navigation.go('research');Research.open('${h.symbol}')">
        <td><div class="psx-sym">${h.symbol}</div><div class="psx-sym-sub">${h.broker}</div></td>
        <td>${h.kind === 'fund' ? h.quantity.toFixed(2) : h.quantity}</td>
        <td>${PsxUI.fmt(h.price)}</td>
        <td>${PsxUI.fmt(h.value)}</td>
        <td class="${PsxUI.chgCls(h.pnlPct)}">${PsxUI.fmt(h.pnlPct, { pct: true, signed: true })}</td>
        <td>${h.allocPct.toFixed(1)}%</td>
      </tr>`).join('')}
      </tbody></table></div>
      <div style="padding:16px"><button type="button" class="psx-btn psx-btn-primary" onclick="App.openAddTransaction()">${I18n.t('addHoldings')}</button></div>`;
  }
  return { render };
})();
window.PortfolioScreen = PortfolioScreen;
