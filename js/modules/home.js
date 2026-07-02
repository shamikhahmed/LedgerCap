'use strict';
const Home = (() => {
  let _sortBy = 'value';
  let _filterSector = null;
  let _viewMode = 'table';
  const M = () => window.MarketUI;
  const U = () => window.PlatformUI;

  function render() {
    const screen = document.getElementById('screen-home');
    if (!screen) return;

    const state = State.get();
    const hasHoldings = (state.transactions || []).length > 0;
    const marketBlock = M().marketStripFull(hasHoldings ? PortfolioAnalyticsService.getHoldings() : []);

    if (!hasHoldings) {
      screen.innerHTML = `
      ${marketBlock}
      ${M().sectionHead('Portfolio', 'Start here')}
      ${M().emptyState(LcIcons.icon('chart', 28), 'Track PSX like a pro', 'Stocks, Meezan funds, dividends, and net worth — dense tables and live index data, built for Pakistani investors.',
        `<button type="button" class="os-btn os-btn-primary" data-action="App.openAddTransaction">Add holdings</button>
         <button type="button" class="os-btn os-btn-ghost" style="margin-top:10px" data-action="App.loadDemo">Load demo portfolio</button>`)}
      ${M().sectionHead('Platform', 'Tools')}
      ${M().defaultTools()}`;
      CapMotion.refresh();
      return;
    }

    const summary = PortfolioAnalyticsService.getSummary(state);
    const holdings = PortfolioAnalyticsService.getHoldings();
    const dailyPnl = State.calcDailyPnl();
    const history = _generateHistoryFromTransactions(state);
    const intel = PortfolioAnalyticsService.getIntelligence(state);

    screen.innerHTML = `
    ${marketBlock}

    <div class="lc-portfolio-hero cap-reveal">
      <div class="home-label">Portfolio value</div>
      <div class="home-value">${U().fmt(summary.totalValue)}</div>
      <div class="home-subtitle">
        <span class="os-pill ${dailyPnl >= 0 ? 'gain' : 'loss'}">Today ${dailyPnl >= 0 ? '+' : ''}${U().fmt(dailyPnl)}</span>
        <span class="os-pill ${summary.totalReturn.pct >= 0 ? 'gain' : 'loss'}">All time ${summary.totalReturn.pct >= 0 ? '+' : ''}${U().fmt(summary.totalReturn.pct, { pct: true })}</span>
      </div>
      ${history.length > 1 ? `<div class="home-chart" id="home-chart" style="margin-top:14px" aria-label="Portfolio value trend"></div>` : ''}
    </div>

    <div class="lc-stat-row cap-reveal">
      <div class="lc-stat-card"><div class="stat-label">Annual yield</div><div class="stat-value t-gain">${summary.portfolioDivYield.toFixed(1)}%</div><div class="stat-sub">on invested capital</div></div>
      <div class="lc-stat-card"><div class="stat-label">Invested</div><div class="stat-value">${U().fmt(summary.invested)}</div><div class="stat-sub">${holdings.length} positions</div></div>
      <div class="lc-stat-card"><div class="stat-label">Gain / loss</div><div class="stat-value ${summary.totalReturn.abs >= 0 ? 't-gain' : 't-loss'}">${summary.totalReturn.abs >= 0 ? '+' : ''}${U().fmt(summary.totalReturn.abs)}</div><div class="stat-sub">${summary.totalReturn.pct.toFixed(1)}%</div></div>
      <div class="lc-stat-card"><div class="stat-label">Cash est.</div><div class="stat-value">${U().fmt(Ledger.cashBalance(state.transactions || []))}</div><div class="stat-sub">uninvested</div></div>
    </div>

    ${window.Signals ? M().morningBriefCard() : ''}

    ${M().sectionHead('Holdings', `${holdings.length} positions`, '<button type="button" class="lc-section-action" data-nav="portfolio">Full table →</button>')}

    <div class="lc-filter-bar cap-reveal">
      <select class="home-filter" aria-label="Sort holdings" data-action-change="Home.setSortBy">
        <option value="value" ${_sortBy === 'value' ? 'selected' : ''}>Sort: Value</option>
        <option value="gain" ${_sortBy === 'gain' ? 'selected' : ''}>Sort: Gain %</option>
        <option value="yield" ${_sortBy === 'yield' ? 'selected' : ''}>Sort: Dividend %</option>
        <option value="alphabet" ${_sortBy === 'alphabet' ? 'selected' : ''}>Sort: A–Z</option>
      </select>
      <select class="home-filter" aria-label="Filter by sector" data-action-change="Home.setFilter">
        <option value="">All sectors</option>
        ${[...new Set(holdings.map(h => h.sector).filter(Boolean))].map(s => `<option value="${s}" ${_filterSector === s ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
      <div class="lc-pill-group" role="group" aria-label="View mode">
        <button type="button" class="lc-view-pill ${_viewMode === 'table' ? 'active' : ''}" data-action="Home.setViewMode" data-tab="table">Table</button>
        <button type="button" class="lc-view-pill ${_viewMode === 'list' ? 'active' : ''}" data-action="Home.setViewMode" data-tab="list">List</button>
        <button type="button" class="lc-view-pill ${_viewMode === 'grid' ? 'active' : ''}" data-action="Home.setViewMode" data-tab="grid">Grid</button>
      </div>
    </div>

    <div class="lc-holdings-wrap cap-reveal">${_renderHoldings(holdings)}</div>

    ${M().sectionHead('Insights', 'Brief', '<button type="button" class="lc-section-action" data-action="Navigation.goResearchIntel">Full analysis →</button>')}
    <div class="home-insights cap-reveal" style="padding:0 20px 8px">
      ${intel.insights.slice(0, 3).map(i => `<div class="insight-item ${i.severity}">${i.text}</div>`).join('')}
    </div>

    ${M().sectionHead('Platform', 'Tools')}
    ${M().defaultTools()}
    <div style="height:var(--space-4);"></div>`;

    if (history.length > 1) {
      const chart = document.getElementById('home-chart');
      if (chart && Charts.lineChart) {
        chart.innerHTML = Charts.lineChart(history, { color: 'var(--os-accent)', height: 88, fill: true });
      }
    }
    CapMotion.refresh();
  }

  function _renderHoldings(holdings) {
    let filtered = holdings;
    if (_filterSector) filtered = filtered.filter(h => h.sector === _filterSector);

    let sorted = [...filtered];
    if (_sortBy === 'gain') sorted.sort((a, b) => b.pnlPct - a.pnlPct);
    else if (_sortBy === 'yield') sorted.sort((a, b) => (b.divYield || 0) - (a.divYield || 0));
    else if (_sortBy === 'alphabet') sorted.sort((a, b) => a.symbol.localeCompare(b.symbol));
    else sorted.sort((a, b) => b.value - a.value);

    const U = PlatformUI;

    if (_viewMode === 'table') {
      return `<div class="rt-table-wrap"><table class="rt-table">
        <thead><tr><th>Symbol</th><th>Last</th><th>Qty</th><th>Value</th><th>Today</th><th>G/L</th><th>Alloc</th></tr></thead>
        <tbody>${sorted.map(h => {
          const day = MarketUI.dailyChgPct(h.symbol, h.price);
          return `<tr data-nav="research">
            <td><strong>${h.symbol}</strong><div style="font-size:0.68rem;color:var(--os-text-tertiary)">${h.name || h.sector || h.broker}</div></td>
            <td>${U.fmt(h.price)}</td>
            <td>${h.kind === 'fund' ? h.quantity.toFixed(2) : h.quantity}</td>
            <td>${U.fmt(h.value)}</td>
            <td class="${day == null ? '' : U.chgCls(day)}">${day == null ? '—' : U.fmt(day, { pct: true, signed: true })}</td>
            <td class="${U.chgCls(h.pnlPct)}">${U.fmt(h.pnlPct, { pct: true, signed: true })}</td>
            <td>${h.allocPct.toFixed(1)}%</td>
          </tr>`;
        }).join('')}</tbody></table></div>`;
    }

    if (_viewMode === 'grid') {
      return `<div class="holdings-grid">${sorted.map(h => `
        <div class="holding-card" role="button" tabindex="0" aria-label="View ${h.symbol}" data-nav="research">
          <div class="holding-symbol">${h.symbol}</div>
          <div class="holding-price">${U.fmt(h.price)}</div>
          <div class="holding-qty">${h.quantity} units</div>
          <div class="holding-value">${U.fmt(h.value)}</div>
          <div class="holding-gain ${h.pnlPct >= 0 ? 't-gain' : 't-loss'}">${h.pnlPct >= 0 ? '+' : ''}${h.pnlPct.toFixed(1)}%</div>
        </div>`).join('')}</div>`;
    }

    return `<div class="holdings-list">${sorted.map(h => `
      <div class="holding-row" role="button" tabindex="0" aria-label="View ${h.symbol}" data-nav="research">
        <div class="holding-left"><div class="holding-symbol">${h.symbol}</div><div class="holding-detail">${h.quantity} @ ${U.fmt(h.price)}</div></div>
        <div class="holding-right"><div class="holding-value">${U.fmt(h.value)}</div><div class="holding-gain ${h.pnlPct >= 0 ? 't-gain' : 't-loss'}">${h.pnlPct >= 0 ? '+' : ''}${h.pnlPct.toFixed(1)}%</div></div>
      </div>`).join('')}</div>`;
  }

  function _generateHistoryFromTransactions(state) {
    const history = [];
    let lastDate = null;
    (state.transactions || []).sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(txn => {
      if (txn.type !== 'BUY' && txn.type !== 'SELL') return;
      const date = new Date(txn.date).toISOString().split('T')[0];
      if (date === lastDate) return;
      lastDate = date;
      history.push(_calcPortfolioValueAtDate(state, date));
    });
    const total = State.calcTotalValue();
    if (!history.length || history[history.length - 1] !== total) history.push(total);
    return history.length < 2 ? [total, total] : history;
  }

  function _priceAt(state, symbol, fallback) {
    const live = state.prices?.[symbol]?.price;
    if (live && live > 0) return live;
    const fp = (window.FALLBACK_PRICES || {})[symbol];
    return fp && fp > 0 ? fp : (fallback || 0);
  }

  function _calcPortfolioValueAtDate(state, date) {
    const txs = (state.transactions || []).filter(t => t.date <= date);
    let value = 0;
    Ledger.calcHoldings(txs).forEach(h => { value += h.shares * _priceAt(state, h.symbol, h.avgCost); });
    Ledger.calcFundHoldings(txs).forEach(f => { value += f.units * _priceAt(state, f.symbol, f.avgNav); });
    return value;
  }

  function setSortBy(val) { _sortBy = val; render(); }
  function setFilter(val) { _filterSector = val || null; render(); }
  function setViewMode(mode) { _viewMode = mode; render(); }

  return { render, setSortBy, setFilter, setViewMode };
})();
window.Home = Home;
