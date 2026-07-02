'use strict';
const Hub = (() => {
  const TOOLS = () => [
    { id: 'market', key: 'stockWatch', tone: 'blue' },
    { id: 'portfolio', key: 'lossTrack', tone: 'gold' },
    { id: 'funds', key: 'fundNavs', tone: 'green' },
    { id: 'research', key: 'technical', tone: 'violet' },
    { id: 'global', key: 'globalMarkets', tone: 'cyan' },
    { id: 'dividends', key: 'dividends', tone: 'green' },
    { id: 'calendar', key: 'calendar', tone: 'blue' },
    { id: 'screener', key: 'screener', tone: 'slate' },
    { id: 'zakat', key: 'zakatTool', tone: 'gold' },
    { id: 'watchlist', key: 'watchlist', tone: 'amber' },
    { id: 'signals', key: 'signals', tone: 'orange' },
    { id: 'risk-audit', key: 'riskAudit', tone: 'rose' },
    { id: 'insights', key: 'insightsTool', tone: 'violet' },
    { id: 'pilot-tools', key: 'pilotTools', tone: 'blue' },
    { id: 'transactions', key: 'transactions', tone: 'slate' },
    { id: 'import', key: 'import', tone: 'slate' },
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
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn lc-pulse-pill--flat${active === 'unchanged' ? ' on' : ''}" onclick="Hub.openMarketFilter('unchanged')" aria-pressed="${active === 'unchanged'}">
        <label>Flat</label><b class="lc-pulse-neutral">${stats.unch}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn lc-pulse-pill--listed${active === 'all' ? ' on' : ''}" onclick="Hub.openMarketFilter('all')" aria-pressed="${active === 'all'}">
        <label>Listed</label><b class="lc-pulse-listed">${stats.listed}</b>
      </button>
    </div>`;
  }

  function openMarketFilter(f) {
    if (typeof Market !== 'undefined') Market.setMoveFilter(f);
    Navigation.go('market');
  }

  function openPortfolio(id) {
    if (typeof PortfolioScreen !== 'undefined') PortfolioScreen.setFilter(id, { replace: true });
    Navigation.go('portfolio', false, { portfolioId: id });
  }

  function _stalePriceChip(state) {
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    const global = Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : [];
    const syms = new Set([
      ...holdings.map(h => h.symbol),
      ...funds.map(f => f.symbol),
      ...global.map(h => h.symbol),
    ]);
    let stale = 0;
    syms.forEach(s => { if (State.isPriceStale(s, 24)) stale++; });
    if (!stale) return '';
    return `<button type="button" class="lc-stale-chip" onclick="App.refreshPrices()">${stale} stale price${stale > 1 ? 's' : ''} · refresh</button>`;
  }

  function _investmentSummary(state) {
    if (typeof PortfolioBuckets === 'undefined' || !PortfolioBuckets.investmentSummary) return '';
    const sum = PortfolioBuckets.investmentSummary(state);
    const txSum = typeof TransactionLedger !== 'undefined' ? TransactionLedger.summary(state.transactions || []) : null;
    const rows = sum.rows.filter(r => r.deployedPkr > 0 || r.value > 0 || r.positions > 0);
    if (!rows.length) return '';
    const fmtPnl = (r) => {
      const sign = r.pnl >= 0 ? '+' : '';
      return `${sign}${PsxUI.fmt(r.pnl, { signed: r.pnl > 0 })} (${sign}${Number(r.pnlPct || 0).toFixed(1)}%)`;
    };
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head lc-dash-section-head--stack">
        <h3>Capital deployed</h3>
        <div class="lc-deploy-totals">
          <span>Total deployed <strong>${PsxUI.fmt(sum.totalDeployed)}</strong></span>
          <span>Market value <strong>${PsxUI.fmt(sum.totalValue)}</strong></span>
          ${txSum ? `<span>Tax/fees <strong>${PsxUI.fmt(txSum.charges)}</strong></span>` : ''}
        </div>
      </div>
      <div class="lc-sector-card lc-deploy-card">
        <div class="lc-deploy-grid lc-deploy-grid--head" aria-hidden="true">
          <span>Portfolio</span>
          <span>Deployed</span>
          <span>Value</span>
          <span>P&amp;L</span>
          <span></span>
        </div>
        ${rows.map(r => {
          const dep = r.id === 'usa' && r.deployedUsd
            ? FxService.fmtUsdPkr(r.deployedUsd)
            : PsxUI.fmt(r.deployedPkr);
          const pnlCls = r.pnl >= 0 ? 'psx-up' : 'psx-down';
          return `<div class="lc-deploy-grid lc-deploy-row">
            <button type="button" class="lc-deploy-name-btn" onclick="Hub.openPortfolio('${r.id}')">
              <div class="lc-market-sym">${r.name}</div>
              <div class="lc-market-name">${r.deployedNote || ''}</div>
            </button>
            <div class="lc-deploy-num lc-deploy-deployed">${dep}</div>
            <div class="lc-deploy-num lc-deploy-num--strong lc-deploy-value">${PsxUI.fmt(r.value)}</div>
            <div class="lc-deploy-pnl ${pnlCls}">${fmtPnl(r)}</div>
            <button type="button" class="lc-deploy-txs" onclick="Transactions.openBucket('${r.id}')">Txs</button>
          </div>`;
        }).join('')}
      </div>
      ${txSum ? `<div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-ghost" onclick="Navigation.go('transactions')">All transactions (${txSum.count})</button>
        <button type="button" class="psx-btn psx-btn-ghost" onclick="Transactions.setFilter('tax')">Taxes ${PsxUI.fmt(txSum.taxes)}</button>
        <button type="button" class="psx-btn psx-btn-ghost" onclick="Transactions.setFilter('dividend')">Dividends ${PsxUI.fmt(txSum.loggedDividends)}</button>
      </div>` : ''}
    </div>`;
  }

  let _newsHtml = typeof PsxUI !== 'undefined' ? PsxUI.skeletonNews() : '<p class="lc-empty-note">Loading…</p>';

  async function _loadNews(state) {
    if (typeof NewsService === 'undefined') return;
    try {
      const items = await NewsService.fetchPortfolioNews(state);
      if (!items.length) {
        _newsHtml = PsxUI.emptyState('No headlines yet', 'Set PSX proxy URL for Yahoo + Google RSS + BBC, or add GNews key in Settings.', '');
        return;
      }
      _newsHtml = items.slice(0, 6).map(n => `
        <a class="lc-news-row" href="${n.url}" target="_blank" rel="noopener noreferrer">
          <div class="lc-news-title">${n.title}</div>
          <div class="lc-news-meta">${n.portfolioSymbol || n.symbol} · ${n.publisher || n.source}${NewsService.impactBadge(n.impact)}</div>
          <p class="lc-news-hint">${n.impact?.hint || ''}</p>
        </a>`).join('');
    } catch (e) {
      _newsHtml = PsxUI.errorState('News unavailable', navigator.onLine ? (e.message || 'Feed error — try again.') : 'You appear offline.', 'Hub.refreshNews()');
    }
  }

  function _newsSection() {
    return `<div class="lc-dash-section" id="hub-news-section">
      <div class="lc-dash-section-head"><h3>Market news</h3><span>Impact on your holdings</span></div>
      <div class="lc-sector-card" id="hub-news-list">${_newsHtml}</div>
      <div class="lc-dash-actions"><button type="button" class="psx-btn psx-btn-ghost" onclick="Hub.refreshNews()">Refresh news</button></div>
    </div>`;
  }

  async function refreshNews() {
    await _loadNews(State.get());
    const el = document.getElementById('hub-news-list');
    if (el) el.innerHTML = _newsHtml;
    if (typeof LcPolish !== 'undefined') LcPolish.afterRender();
  }

  function _portfolioSection(state) {
    if (typeof PortfolioBuckets === 'undefined') return '';
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>${I18n.t('portfolio.bucketsTitle')}</h3><span>${I18n.t('portfolio.bucketsSub')}</span></div>
      <div class="lc-portfolio-grid">${PortfolioBuckets.cardsHtml(state)}</div>
      <p class="lc-portfolio-footnote">${I18n.t('portfolio.investedFootnote')}</p>
    </div>`;
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
        <div class="lc-tool-icon lc-tool-icon--${t.tone}" aria-hidden="true">${typeof LcIcons !== 'undefined' ? LcIcons.toolIcon(t.id, 20) : ''}</div>
        <strong>${I18n.t(`tools.${t.key}.t`)}</strong>
        <span>${I18n.t(`tools.${t.key}.d`)}</span>
      </button>`).join('')}</div>`;
  }

  function _portfolioChart(state) {
    const histRaw = state.priceHistory || [];
    const hist = histRaw.map(h => h.value).filter(v => v > 0);
    if (hist.length < 2 || typeof Charts === 'undefined') return '';
    const first = hist[0];
    const last = hist[hist.length - 1];
    const chg = first ? ((last - first) / first) * 100 : 0;
    const fmt = n => (typeof PlatformUI !== 'undefined' ? PlatformUI.fmt(n) : `₨${Number(n).toLocaleString('en-PK')}`);
    const startLabel = histRaw[0]?.date || '';
    const endLabel = histRaw[histRaw.length - 1]?.date || '';
    const period = startLabel && endLabel ? `${startLabel} → ${endLabel}` : `${hist.length} days`;
    return `<div class="lc-chart-block hub-chart">
      <div class="lc-dash-section-head"><h3>Net worth</h3><span>${period}</span></div>
      ${Charts.lineChartBlock(hist, {
        height: 110,
        caption: `${fmt(first)} → ${fmt(last)}`,
        subcaption: `${chg >= 0 ? '+' : ''}${chg.toFixed(2)}%`,
        subcaptionCls: chg >= 0 ? 'up' : 'down',
        ariaLabel: `Net worth trend from ${fmt(first)} to ${fmt(last)}`,
      })}
    </div>`;
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
          ${_portfolioSection(state)}
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
          <p>Your wealth · v${window.APP_VERSION || '—'}</p>
        </div>
        <div class="lc-dash-hero">
          <div class="lc-dash-hero-label">${I18n.t('portfolio.value')}</div>
          <div class="lc-dash-hero-val lc-num" data-lc-count="${s.totalValue}" data-lc-count-key="hub-total">${PsxUI.fmt(s.totalValue)}</div>
          <div class="lc-dash-hero-row">
            <span class="lc-dash-chip ${daily >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.today')} ${PsxUI.fmt(daily, { signed: daily >= 0 })}</span>
            <span class="lc-dash-chip ${s.totalReturn.pct >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.allTime')} ${PsxUI.fmt(s.totalReturn.pct, { pct: true, signed: true })}</span>
            <span class="lc-dash-chip">Cash ${PsxUI.fmt(cash)}</span>
          </div>
        </div>
        <div class="lc-dash-actions">
          <button type="button" class="psx-btn psx-btn-primary" onclick="App.refreshPrices()">${I18n.t('refresh')}</button>
          <button type="button" class="psx-btn psx-btn-ghost" onclick="App.openAddTransaction()">${I18n.t('addHoldings')}</button>
          ${_stalePriceChip(state)}
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
        ${_investmentSummary(state)}
        ${_portfolioSection(state)}
        ${_newsSection()}
        ${_portfolioChart(state)}
        ${_portfolioMovers()}
        <div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>${I18n.t('hub.toolsTitle')}</h3><span>${I18n.t('hub.toolsSub')}</span></div>
          ${_toolGrid()}
        </div>
      </div>`;
    _loadNews(state).then(() => {
      if (Navigation?.current?.() === 'home') refreshNews();
    });
  }

  return { render, openMarketFilter, openPortfolio, refreshNews };
})();
window.Hub = Hub;
window.Home = Hub;
