'use strict';
const Home = (() => {
  let _sortBy = 'value';
  let _filterSector = null;
  let _viewMode = 'summary';

  function render() {
    const screen = document.getElementById('screen-home');
    if (!screen) return;

    const state = State.get();
    const hasHoldings = (state.transactions || []).length > 0;

    if (!hasHoldings) {
      screen.innerHTML = `
      <div class="os-empty cap-reveal">
        <div class="os-empty-icon">📊</div>
        <div class="os-empty-title">Your wealth OS starts here</div>
        <div class="os-empty-body">Track PSX stocks, Meezan funds, dividends, and net worth.</div>
        <button class="os-btn os-btn-primary" onclick="App.openAddTransaction()">Add holdings</button>
        <button class="os-btn os-btn-ghost" style="margin-top:10px" onclick="location.search='?demo=1';location.reload()">Load demo</button>
      </div>`;
      CapMotion.refresh();
      return;
    }

    const summary = PortfolioAnalyticsService.getSummary(state);
    const holdings = PortfolioAnalyticsService.getHoldings();
    const dailyPnl = State.calcDailyPnl();
    const history = _generateHistoryFromTransactions(state);
    const intel = PortfolioAnalyticsService.getIntelligence(state);

    screen.innerHTML = `
    <div class="home-header cap-reveal">
      <div class="home-hero">
        <div class="home-label">Portfolio Value</div>
        <div class="home-value">${PlatformUI.fmt(summary.totalValue)}</div>
        <div class="home-subtitle">
          <span class="${dailyPnl >= 0 ? 't-gain' : 't-loss'}">Today ${dailyPnl >= 0 ? '+' : ''}${PlatformUI.fmt(dailyPnl)}</span> · 
          <span class="${summary.totalReturn.pct >= 0 ? 't-gain' : 't-loss'}">All time ${summary.totalReturn.pct >= 0 ? '+' : ''}${PlatformUI.fmt(summary.totalReturn.pct, { pct: true })}</span>
        </div>
      </div>
      ${history.length > 1 ? `<div class="home-chart" id="home-chart"></div>` : ''}
    </div>

    <div class="home-stats cap-reveal">
      <div class="stat-card">
        <div class="stat-label">Annual Yield</div>
        <div class="stat-value t-green">${summary.portfolioDivYield.toFixed(1)}%</div>
        <div class="stat-sub">on invested capital</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Invested</div>
        <div class="stat-value">${PlatformUI.fmt(summary.invested)}</div>
        <div class="stat-sub">${holdings.length} positions</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Gain/Loss</div>
        <div class="stat-value ${summary.totalReturn.abs >= 0 ? 't-gain' : 't-loss'}">${summary.totalReturn.abs >= 0 ? '+' : ''}${PlatformUI.fmt(summary.totalReturn.abs)}</div>
        <div class="stat-sub">${summary.totalReturn.pct.toFixed(1)}%</div>
      </div>
    </div>

    <div class="home-filters cap-reveal">
      <select class="home-filter" onchange="Home.setSortBy(this.value)">
        <option value="value" ${_sortBy === 'value' ? 'selected' : ''}>Sort: Value</option>
        <option value="gain" ${_sortBy === 'gain' ? 'selected' : ''}>Sort: Gain %</option>
        <option value="yield" ${_sortBy === 'yield' ? 'selected' : ''}>Sort: Dividend %</option>
        <option value="alphabet" ${_sortBy === 'alphabet' ? 'selected' : ''}>Sort: A-Z</option>
      </select>
      <select class="home-filter" onchange="Home.setFilter(this.value)">
        <option value="">All Sectors</option>
        ${[...new Set(holdings.map(h => h.sector))].map(s => `<option value="${s}" ${_filterSector === s ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
      <button class="home-view-btn ${_viewMode === 'list' ? 'active' : ''}" onclick="Home.setViewMode('list')">List</button>
      <button class="home-view-btn ${_viewMode === 'grid' ? 'active' : ''}" onclick="Home.setViewMode('grid')">Grid</button>
    </div>

    <div class="home-holdings cap-reveal">
      ${_renderHoldings(holdings)}
    </div>

    <div class="home-insights cap-reveal">
      <div class="home-section-title">Quick insights</div>
      ${intel.insights.slice(0, 3).map(i => `<div class="insight-item ${i.severity}">${i.text}</div>`).join('')}
      <button class="home-btn-secondary" onclick="Navigation.go('research', false, { portfolioIntel: true })">Full analysis →</button>
    </div>

    <div class="home-quick-nav cap-reveal">
      <button type="button" class="home-quick-link" onclick="Navigation.go('performance')">Performance</button>
      <button type="button" class="home-quick-link" onclick="Navigation.go('comparison')">Compare</button>
      <button type="button" class="home-quick-link" onclick="Navigation.go('transactions')">Transactions</button>
    </div>

    <div style="height:var(--space-4);"></div>`;

    // Render chart
    if (history.length > 1) {
      const chart = document.getElementById('home-chart');
      if (chart && Charts.lineChart) {
        chart.innerHTML = Charts.lineChart(history, { color: '#2563eb', height: 100, fill: true });
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

    if (_viewMode === 'grid') {
      return `<div class="holdings-grid">${sorted.map(h => `
        <div class="holding-card" onclick="Navigation.go('research');Research.open('${h.symbol}')">
          <div class="holding-symbol">${h.symbol}</div>
          <div class="holding-price">${PlatformUI.fmt(h.price)}</div>
          <div class="holding-qty">${h.quantity} units</div>
          <div class="holding-value">${PlatformUI.fmt(h.value)}</div>
          <div class="holding-gain ${h.pnlPct >= 0 ? 't-gain' : 't-loss'}">${h.pnlPct >= 0 ? '+' : ''}${h.pnlPct.toFixed(1)}%</div>
          ${h.divYield ? `<div class="holding-yield" style="font-size:0.75rem;color:var(--text2);margin-top:4px">${h.divYield.toFixed(1)}% div</div>` : ''}
        </div>
      `).join('')}</div>`;
    }

    return `<div class="holdings-list">${sorted.map(h => `
      <div class="holding-row" onclick="Navigation.go('research');Research.open('${h.symbol}')">
        <div class="holding-left">
          <div class="holding-symbol">${h.symbol}</div>
          <div class="holding-detail">${h.quantity} @ ${PlatformUI.fmt(h.price)}</div>
        </div>
        <div class="holding-right">
          <div class="holding-value">${PlatformUI.fmt(h.value)}</div>
          <div class="holding-gain ${h.pnlPct >= 0 ? 't-gain' : 't-loss'}">${h.pnlPct >= 0 ? '+' : ''}${h.pnlPct.toFixed(1)}%</div>
        </div>
      </div>
    `).join('')}</div>`;
  }

  function _generateHistoryFromTransactions(state) {
    const history = [];
    let lastDate = null;
    const txns = (state.transactions || []).sort((a, b) => new Date(a.date) - new Date(b.date));

    txns.forEach(txn => {
      if (txn.type !== 'BUY' && txn.type !== 'SELL') return;
      const date = new Date(txn.date).toISOString().split('T')[0];
      if (date === lastDate) return;
      lastDate = date;
      history.push(_calcPortfolioValueAtDate(state, date));
    });

    const total = State.calcTotalValue();
    if (!history.length || history[history.length - 1] !== total) {
      history.push(total);
    }

    return history.length < 2 ? [total, total] : history;
  }

  function _calcPortfolioValueAtDate(state, date) {
    let value = 0;
    const holdings = Ledger.calcHoldings((state.transactions || []).filter(t => t.date <= date));
    Object.entries(holdings).forEach(([symbol, h]) => {
      const price = state.prices?.[symbol]?.price || 0;
      value += (h.units || 0) * price;
    });
    return value;
  }

  function setSortBy(val) { _sortBy = val; render(); }
  function setFilter(val) { _filterSector = val || null; render(); }
  function setViewMode(mode) { _viewMode = mode; render(); }

  return { render, setSortBy, setFilter, setViewMode };
})();
window.Home = Home;
