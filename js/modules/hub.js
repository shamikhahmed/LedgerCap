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

  function _marketStats() {
    const seen = new Set();
    let adv = 0, dec = 0, unch = 0, listed = 0;
    [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].forEach(s => {
      if (seen.has(s.symbol)) return;
      seen.add(s.symbol);
      listed++;
      const price = State.getPrice(s.symbol) || (window.FALLBACK_PRICES || {})[s.symbol] || 0;
      const prev = State.getPrevClose(s.symbol) || price;
      const chg = prev ? ((price - prev) / prev) * 100 : 0;
      if (chg > 0.05) adv++;
      else if (chg < -0.05) dec++;
      else unch++;
    });
    return { adv, dec, unch, listed };
  }

  function _marketPulse(stats) {
    const active = typeof Market !== 'undefined' ? Market.moveFilter() : 'all';
    return `<div class="lc-pulse-row" role="group" aria-label="Market pulse">
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${active === 'advancing' ? ' on' : ''}" onclick="Hub.openMarketFilter('advancing')" aria-pressed="${active === 'advancing'}">
        <label>Advancing</label><b class="psx-up">${stats.adv}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${active === 'declining' ? ' on' : ''}" onclick="Hub.openMarketFilter('declining')" aria-pressed="${active === 'declining'}">
        <label>Declining</label><b class="psx-down">${stats.dec}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${active === 'unchanged' ? ' on' : ''}" onclick="Hub.openMarketFilter('unchanged')" aria-pressed="${active === 'unchanged'}">
        <label>Flat</label><b>${stats.unch}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${active === 'all' ? ' on' : ''}" onclick="Hub.openMarketFilter('all')" aria-pressed="${active === 'all'}">
        <label>Listed</label><b>${stats.listed}</b>
      </button>
    </div>`;
  }

  function openMarketFilter(f) {
    if (typeof Market !== 'undefined') Market.setMoveFilter(f);
    Navigation.go('market');
  }

  function _portfolioMovers() {
    const holdings = PortfolioAnalyticsService.getHoldings();
    if (!holdings.length) return '';
    const movers = holdings.map(h => {
      const prev = State.getPrevClose(h.symbol) || h.price;
      const chg = prev && h.price ? ((h.price - prev) / prev) * 100 : 0;
      return { symbol: h.symbol, chg };
    }).sort((a, b) => Math.abs(b.chg) - Math.abs(a.chg)).slice(0, 5);
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Your movers</h3><span>Today</span></div>
      <div class="lc-movers-row">${movers.map(m => `
        <button type="button" class="lc-mover-chip" onclick="Research.open('${m.symbol}')">
          <strong>${m.symbol}</strong>
          <em class="${PsxUI.chgCls(m.chg)}">${PsxUI.fmt(m.chg, { pct: true, signed: true })}</em>
        </button>`).join('')}</div>
    </div>`;
  }

  function _portfolioChart(state) {
    const hist = (state.priceHistory || []).map(h => h.value).filter(v => v > 0);
    if (hist.length < 2 || typeof Charts === 'undefined') return '';
    return `<div class="lc-chart-block hub-chart">
      <div class="lc-dash-section-head"><h3>Net worth</h3><span>${hist.length} days</span></div>
      ${Charts.lineChart(hist, { height: 110, color: '#2563eb' })}
    </div>`;
  }

  function _kseCard(k, sign) {
    return `<button type="button" class="lc-dash-market-card lc-dash-market-card--btn" onclick="Navigation.go('market')" aria-label="Open stock watch">
      <span>KSE-100</span>
      <strong>${k.value ? PsxUI.fmtIndex(k.value) : '—'}</strong>
      <em class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : I18n.t('loading')}</em>
    </button>`;
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
    const stats = _marketStats();

    if (!hasHoldings) {
      screen.innerHTML = `
        <div class="lc-dash">
          <div class="lc-dash-greet">
            <h2>${_greeting()}</h2>
            <p>LedgerCap</p>
          </div>
          <div class="lc-dash-market">
            ${_kseCard(k, sign)}
            <button type="button" class="lc-dash-market-card lc-dash-market-card--btn" onclick="App.openAddTransaction()" aria-label="Add holdings">
              <span>${I18n.t('portfolio.value')}</span>
              <strong>—</strong>
              <em>${I18n.t('addHoldings')}</em>
            </button>
          </div>
          ${_marketPulse(stats)}
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
          ${_kseCard(k, sign)}
          <button type="button" class="lc-dash-market-card lc-dash-market-card--btn" onclick="Navigation.go('portfolio')" aria-label="Open portfolio">
            <span>${I18n.t('portfolio.yield')}</span>
            <strong>${s.portfolioDivYield.toFixed(2)}%</strong>
            <em>${I18n.t('portfolio.invested')} ${PsxUI.fmt(s.invested)}</em>
          </button>
        </div>
        ${_marketPulse(stats)}
        ${_portfolioChart(state)}
        ${_portfolioMovers()}
        <div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>${I18n.t('hub.toolsTitle')}</h3><span>${I18n.t('hub.toolsSub')}</span></div>
          ${_toolGrid()}
        </div>
      </div>`;
  }

  return { render, openMarketFilter };
})();
window.Hub = Hub;
window.Home = Hub;
