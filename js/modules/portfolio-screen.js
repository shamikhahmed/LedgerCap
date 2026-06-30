'use strict';
const PortfolioScreen = (() => {
  let _filter = null;

  function setFilter(id, opts) {
    opts = opts || {};
    if (opts.replace) _filter = id || null;
    else _filter = _filter === id ? null : (id || null);
    render();
  }
  function clearFilter() { _filter = null; }
  function currentFilter() { return _filter; }

  function render(opts) {
    opts = opts || {};
    if (opts.portfolioId) _filter = opts.portfolioId;

    const screen = document.getElementById('screen-portfolio');
    if (!screen) return;
    const state = State.get();
    const buckets = PortfolioBuckets.list(state);
    const cards = `<div class="lc-portfolio-grid">${PortfolioBuckets.cardsHtml(state, { activeId: _filter, onClick: 'PortfolioScreen.setFilter' })}</div>`;

    if (!(state.transactions || []).length) {
      screen.innerHTML = `
        <div class="lc-dash">
          <div class="lc-screen-head">
            <h1>${I18n.t('portfolio.title')}</h1>
            <p>${I18n.t('portfolio.sub')}</p>
          </div>
          <div class="lc-dash-section">
            <div class="lc-dash-section-head"><h3>${I18n.t('portfolio.bucketsTitle')}</h3><span>${I18n.t('portfolio.bucketsSub')}</span></div>
            ${cards}
          </div>
          <div class="lc-empty-state">
            <h2>No positions yet</h2>
            <p>Pick a portfolio above or add your first holding.</p>
          </div>
        </div>`;
      return;
    }

    const active = _filter ? buckets.find(b => b.id === _filter) : null;
    const holdings = _filter
      ? PortfolioBuckets.getHoldingsForBucket(state, _filter)
      : PortfolioAnalyticsService.getHoldings(state);
    const bucketStats = _filter ? PortfolioBuckets.statsForBucket(state, _filter) : null;
    const s = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    const heroValue = bucketStats ? bucketStats.value : s.totalValue;
    const heroPnlPct = bucketStats ? bucketStats.pnlPct : s.totalReturn.pct;

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${active ? active.name : I18n.t('portfolio.title')}</h1>
          <p>${active ? active.desc : I18n.t('portfolio.sub')}</p>
        </div>
        <div class="lc-dash-section">
          <div class="lc-dash-section-head">
            <h3>${I18n.t('portfolio.bucketsTitle')}</h3>
            <span>${_filter ? `<button type="button" class="lc-link-btn" onclick="PortfolioScreen.clearFilter()">Show all</button>` : I18n.t('portfolio.bucketsSub')}</span>
          </div>
          ${cards}
        </div>
        <div class="lc-dash-hero">
          <div class="lc-dash-hero-label">${active ? active.name : I18n.t('portfolio.value')}</div>
          <div class="lc-dash-hero-val">${PsxUI.fmt(heroValue)}</div>
          <div class="lc-dash-hero-row">
            <span class="lc-dash-chip ${daily >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.today')} ${PsxUI.fmt(daily, { signed: daily >= 0 })}</span>
            <span class="lc-dash-chip ${heroPnlPct >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.allTime')} ${PsxUI.fmt(heroPnlPct, { pct: true, signed: true })}</span>
          </div>
        </div>
        <div class="lc-pulse-row">
          <div class="lc-pulse-pill"><label>${I18n.t('portfolio.yield')}</label><b class="psx-up">${s.portfolioDivYield.toFixed(2)}%</b></div>
          <div class="lc-pulse-pill"><label>${I18n.t('portfolio.invested')}</label><b>${PsxUI.fmt(bucketStats ? bucketStats.invested : s.invested)}</b></div>
          <div class="lc-pulse-pill"><label>${I18n.t('portfolio.gainLoss')}</label><b class="${(bucketStats ? bucketStats.pnl : s.totalReturn.abs) >= 0 ? 'psx-up' : 'psx-down'}">${PsxUI.fmt(bucketStats ? bucketStats.pnl : s.totalReturn.abs, { signed: true })}</b></div>
          <div class="lc-pulse-pill"><label>Positions</label><b>${holdings.length}</b></div>
        </div>
        ${!_filter && (s.geoAllocation || []).length ? `<div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>Geography</h3><span>Allocation</span></div>
          <div class="psx-alloc-bars" style="padding:0 2px 12px">
            ${s.geoAllocation.map(g => `<div class="psx-alloc-row"><span>${g.label}</span><div class="psx-alloc-track"><div class="psx-alloc-fill" style="width:${Math.min(100, g.pct).toFixed(1)}%"></div></div><span>${g.pct.toFixed(1)}%</span></div>`).join('')}
          </div>
        </div>` : ''}
        <div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>Holdings</h3><span>${holdings.length} positions</span></div>
        </div>
        ${holdings.length ? `<div class="psx-table-wrap" style="margin:0 var(--lc-space-4);border-radius:var(--lc-radius);overflow:hidden;box-shadow:var(--lc-shadow)">
          <table class="psx-table"><thead><tr>
            <th>Symbol</th><th>Qty</th><th>Last</th><th>Value</th><th>G/L</th>
          </tr></thead><tbody>
          ${holdings.map(h => `<tr onclick="Navigation.go('research');Research.open('${h.symbol}')">
            <td><div class="psx-sym">${h.symbol}</div><div class="psx-sym-sub">${h.broker}</div></td>
            <td>${h.kind === 'fund' ? h.quantity.toFixed(2) : PsxUI.fmtNum(h.quantity, 2)}</td>
            <td>${h.kind === 'intl' || h.kind === 'crypto' ? '$' + Number(FxService.pkrToUsd(h.price)).toFixed(2) : PsxUI.fmt(h.price)}</td>
            <td>${PsxUI.fmt(h.value)}</td>
            <td class="${PsxUI.chgCls(h.pnlPct)}">${PsxUI.fmt(h.pnlPct, { pct: true, signed: true })}</td>
          </tr>`).join('')}
          </tbody></table>
        </div>` : `<div class="lc-empty-state" style="margin-top:0">
          <h2>No holdings in this portfolio</h2>
          <p>Add ${active ? active.name.toLowerCase() : 'positions'} to start tracking.</p>
          <button type="button" class="psx-btn psx-btn-primary" onclick="App.openAddForPortfolio('${_filter || 'psx'}')">${I18n.t('addHoldings')}</button>
        </div>`}
        <div class="lc-dash-actions" style="margin-top:var(--lc-space-6)">
          <button type="button" class="psx-btn psx-btn-primary" onclick="App.openAddForPortfolio('${_filter || ''}')">${I18n.t('addHoldings')}</button>
          <button type="button" class="psx-btn psx-btn-ghost" onclick="App.openAddPortfolio()">+ ${I18n.t('portfolio.addBucket')}</button>
        </div>
      </div>`;
  }

  return { render, setFilter, clearFilter, currentFilter };
})();
window.PortfolioScreen = PortfolioScreen;
