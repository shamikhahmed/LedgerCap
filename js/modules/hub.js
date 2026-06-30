'use strict';
const Hub = (() => {
  const TOOLS = () => [
    { id: 'market', key: 'stockWatch', icon: '◆' },
    { id: 'portfolio', key: 'lossTrack', icon: '₨' },
    { id: 'funds', key: 'fundNavs', icon: '◎' },
    { id: 'research', key: 'technical', icon: '⌕' },
    { id: 'global', key: 'globalMarkets', icon: '◉' },
    { id: 'dividends', key: 'dividends', icon: '↗' },
    { id: 'screener', key: 'screener', icon: '▦' },
    { id: 'zakat', key: 'zakatTool', icon: '☪' },
    { id: 'watchlist', key: 'watchlist', icon: '★' },
    { id: 'signals', key: 'signals', icon: '⚡' },
    { id: 'transactions', key: 'transactions', icon: '≡' },
    { id: 'import', key: 'import', icon: '↓' },
  ];

  function _greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  function _marketPulse(stats) {
    return `<div class="lc-pulse-row" aria-label="Market pulse">
      <div class="lc-pulse-pill"><label>Advancing</label><b class="psx-up">${stats.adv}</b></div>
      <div class="lc-pulse-pill"><label>Declining</label><b class="psx-down">${stats.dec}</b></div>
      <div class="lc-pulse-pill"><label>Flat</label><b>${stats.unch}</b></div>
      <div class="lc-pulse-pill"><label>Listed</label><b>${stats.listed}</b></div>
    </div>`;
  }

  function _toolGrid() {
    return `<div class="lc-tool-grid">${TOOLS().map(t => `
      <button type="button" class="lc-tool-card" onclick="Navigation.go('${t.id}')">
        <div class="lc-tool-icon" aria-hidden="true">${t.icon}</div>
        <strong>${I18n.t(`tools.${t.key}.t`)}</strong>
        <span>${I18n.t(`tools.${t.key}.d`)}</span>
      </button>`).join('')}</div>`;
  }

  function render() {
    const screen = document.getElementById('screen-home');
    if (!screen) return;
    const state = State.get();
    const hasHoldings = (state.transactions || []).length > 0;
    const k = PsxUI.kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';

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

    if (!hasHoldings) {
      screen.innerHTML = `
        <div class="lc-dash">
          <div class="lc-dash-greet">
            <h2>${_greeting()}</h2>
            <p>LedgerCap</p>
          </div>
          <div class="lc-dash-market">
            <div class="lc-dash-market-card">
              <span>KSE-100</span>
              <strong>${k.value ? PsxUI.fmt(k.value) : '—'}</strong>
              <em class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : I18n.t('loading')}</em>
            </div>
            <div class="lc-dash-market-card">
              <span>${I18n.t('portfolio.value')}</span>
              <strong>—</strong>
              <em>${I18n.t('addHoldings')}</em>
            </div>
          </div>
          <div class="lc-empty-state">
            <h2>${I18n.t('hub.hero')}</h2>
            <p>${I18n.t('hub.sub')}</p>
            <div class="lc-dash-actions" style="justify-content:center">
              <button type="button" class="psx-btn psx-btn-primary" onclick="App.openAddTransaction()">${I18n.t('addHoldings')}</button>
              <button type="button" class="psx-btn psx-btn-ghost" onclick="location.search='?demo=1';location.reload()">${I18n.t('loadDemo')}</button>
            </div>
          </div>
          <div class="lc-dash-section">
            <div class="lc-dash-section-head"><h3>${I18n.t('hub.toolsTitle')}</h3><span>${I18n.t('hub.toolsSub')}</span></div>
            ${_toolGrid()}
          </div>
        </div>`;
      return;
    }

    const s = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    const cash = Ledger.cashBalance(state.transactions || []);

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-dash-greet">
          <h2>${_greeting()}</h2>
          <p>Your wealth</p>
        </div>
        <div class="lc-dash-hero">
          <div class="lc-dash-hero-label">${I18n.t('portfolio.value')}</div>
          <div class="lc-dash-hero-val">${PsxUI.fmt(s.totalValue)}</div>
          <div class="lc-dash-hero-row">
            <span class="lc-dash-chip ${daily >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.today')} ${PsxUI.fmt(daily, { signed: daily >= 0 })}</span>
            <span class="lc-dash-chip ${s.totalReturn.pct >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.allTime')} ${PsxUI.fmt(s.totalReturn.pct, { pct: true, signed: true })}</span>
            <span class="lc-dash-chip">Cash ${PsxUI.fmt(cash)}</span>
          </div>
        </div>
        <div class="lc-dash-actions">
          <button type="button" class="psx-btn psx-btn-primary" onclick="App.refreshPrices()">${I18n.t('refresh')}</button>
          <button type="button" class="psx-btn psx-btn-ghost" onclick="App.openAddTransaction()">${I18n.t('addHoldings')}</button>
        </div>
        <div class="lc-dash-market">
          <div class="lc-dash-market-card">
            <span>KSE-100</span>
            <strong>${k.value ? PsxUI.fmt(k.value) : '—'}</strong>
            <em class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : '—'}</em>
          </div>
          <div class="lc-dash-market-card">
            <span>${I18n.t('portfolio.yield')}</span>
            <strong>${s.portfolioDivYield.toFixed(1)}%</strong>
            <em>${I18n.t('portfolio.invested')} ${PsxUI.fmt(s.invested)}</em>
          </div>
        </div>
        ${_marketPulse(stats)}
        <div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>${I18n.t('hub.toolsTitle')}</h3><span>${I18n.t('hub.toolsSub')}</span></div>
          ${_toolGrid()}
        </div>
      </div>`;
  }

  return { render };
})();
window.Hub = Hub;
window.Home = Hub;
