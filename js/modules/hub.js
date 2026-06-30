'use strict';
const Hub = (() => {
  const TOOLS = () => [
    { id: 'market', key: 'stockWatch' },
    { id: 'funds', key: 'fundNavs' },
    { id: 'portfolio', key: 'lossTrack' },
    { id: 'research', key: 'technical' },
    { id: 'global', key: 'globalMarkets' },
    { id: 'zakat', key: 'zakatTool' },
    { id: 'screener', key: 'screener' },
    { id: 'dividends', key: 'dividends' },
    { id: 'signals', key: 'signals' },
    { id: 'watchlist', key: 'watchlist' },
    { id: 'transactions', key: 'transactions' },
  ];

  function render() {
    const screen = document.getElementById('screen-home');
    if (!screen) return;
    const state = State.get();
    const hasHoldings = (state.transactions || []).length > 0;
    let stats = { adv: 0, dec: 0, unch: 0, listed: 0 };
    if (hasHoldings) {
      PortfolioAnalyticsService.getHoldings().forEach(h => {
        const prev = State.getPrevClose(h.symbol) || h.price;
        const chg = prev && h.price ? ((h.price - prev) / prev) * 100 : null;
        if (chg == null) return;
        if (chg > 0.05) stats.adv++;
        else if (chg < -0.05) stats.dec++;
        else stats.unch++;
      });
    }
    stats.listed = [...new Set([...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].map(s => s.symbol))].length;

    let hero = '';
    if (hasHoldings) {
      const s = PortfolioAnalyticsService.getSummary(state);
      const daily = State.calcDailyPnl();
      hero = `<div class="psx-hero">
        <div class="psx-hero-label">${I18n.t('portfolio.value')}</div>
        <div class="psx-hero-val">${PsxUI.fmt(s.totalValue)}</div>
        <div class="psx-hero-pills">
          <span class="psx-pill ${daily >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.today')} ${PsxUI.fmt(daily, { signed: daily >= 0 })}</span>
          <span class="psx-pill ${s.totalReturn.pct >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.allTime')} ${PsxUI.fmt(s.totalReturn.pct, { pct: true, signed: true })}</span>
          <span class="psx-pill">Cash est. ${PsxUI.fmt(Ledger.cashBalance(state.transactions || []))}</span>
        </div>
      </div>`;
    } else {
      hero = `<div class="psx-page-title">
        <h1>${I18n.t('hub.hero')}</h1>
        <p>${I18n.t('hub.sub')}</p>
        <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">
          <button type="button" class="psx-btn psx-btn-primary" onclick="App.openAddTransaction()">${I18n.t('addHoldings')}</button>
          <button type="button" class="psx-btn psx-btn-ghost" onclick="location.search='?demo=1';location.reload()">${I18n.t('loadDemo')}</button>
        </div>
      </div>`;
    }

    screen.innerHTML = `
      ${PsxUI.strip()}
      ${PsxUI.indexRow()}
      ${PsxUI.statGrid(stats)}
      ${hero}
      <div class="psx-section"><h2>${I18n.t('hub.toolsTitle')}</h2><span>${I18n.t('hub.toolsSub')}</span></div>
      ${TOOLS().map(t => PsxUI.panel(
        I18n.t(`tools.${t.key}.t`),
        I18n.t(`tools.${t.key}.d`),
        `Navigation.go('${t.id}')`
      )).join('')}
      <div style="height:24px"></div>`;
    PsxUI.refreshPortfolioMini();
  }

  return { render };
})();
window.Hub = Hub;
window.Home = Hub;
