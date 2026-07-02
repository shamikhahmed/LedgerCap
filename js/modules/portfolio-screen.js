'use strict';
const PortfolioScreen = (() => {
  let _filter = null;
  let _lastHoldings = [];
  let _chartRange = '1M';

  function setFilter(id, opts) {
    opts = opts || {};
    if (opts.replace) _filter = id || null;
    else _filter = _filter === id ? null : (id || null);
    render();
  }
  function clearFilter() { _filter = null; }
  function currentFilter() { return _filter; }

  function _daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
  }

  function _chartData(range, currentValue) {
    const state = State.get();
    const hist = (state.priceHistory || []).filter((p) => p.value > 0);
    const intra = state.intradayHistory || [];
    const today = new Date().toISOString().slice(0, 10);
    const nowVal = currentValue || State.calcTotalValue();

    if (range === '1D') {
      const pts = intra.filter((p) => (p.date || '') === today).map((p) => p.value);
      if (pts.length >= 2) return pts;
      if (pts.length === 1 && hist.length) return [hist[hist.length - 1].value, pts[0]];
      if (hist.length >= 2) return [hist[hist.length - 2].value, nowVal];
      return [nowVal * 0.995, nowVal];
    }
    if (range === '1W') {
      const cutoff = _daysAgo(7);
      const week = hist.filter((p) => p.date >= cutoff).map((p) => p.value);
      if (week.length) { week[week.length - 1] = nowVal; return week; }
      return hist.slice(-7).map((p) => p.value).concat(nowVal).slice(-8);
    }
    if (range === '1M') {
      const cutoff = _daysAgo(30);
      const m = hist.filter((p) => p.date >= cutoff).map((p) => p.value);
      if (m.length >= 2) { m[m.length - 1] = nowVal; return m; }
      const sliced = hist.slice(-30).map((p) => p.value);
      if (sliced.length) { sliced[sliced.length - 1] = nowVal; return sliced; }
      return [nowVal * 0.95, nowVal];
    }
    if (range === '1Y') {
      const cutoff = _daysAgo(365);
      const y = hist.filter((p) => p.date >= cutoff).map((p) => p.value);
      if (y.length >= 2) { y[y.length - 1] = nowVal; return y; }
      const sliced = hist.slice(-365).map((p) => p.value);
      if (sliced.length) { sliced[sliced.length - 1] = nowVal; return sliced; }
      return [nowVal * 0.85, nowVal];
    }
    if (hist.length >= 2) {
      const all = hist.map((p) => p.value);
      all[all.length - 1] = nowVal;
      return all;
    }
    return [nowVal * 0.9, nowVal];
  }

  function setChartRange(r) {
    _chartRange = r || '1M';
    render();
  }

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
            <button type="button" class="psx-btn psx-btn-primary" data-action="App.openAddTransaction">${I18n.t('addHoldings')}</button>
          </div>
        </div>`;
      return;
    }

    const active = _filter ? buckets.find(b => b.id === _filter) : null;
    const holdings = _filter
      ? PortfolioBuckets.getHoldingsForBucket(state, _filter)
      : PortfolioAnalyticsService.getHoldings(state);
    _lastHoldings = holdings;
    const bucketStats = _filter ? PortfolioBuckets.statsForBucket(state, _filter) : null;
    const s = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    const heroValue = bucketStats ? bucketStats.value : s.totalValue;
    const heroPnlPct = bucketStats ? bucketStats.pnlPct : s.totalReturn.pct;
    const chartSeries = _chartData(_chartRange, heroValue);
    const chartUp = chartSeries.length >= 2 && chartSeries[chartSeries.length - 1] >= chartSeries[0];
    const ranges = ['1D', '1W', '1M', '1Y', 'All'];
    const chartBlock = typeof Charts !== 'undefined' ? `
          <div class="lc-pnl-chart-wrap">
            <div class="lc-range-picker" role="tablist" aria-label="Chart range">
              ${ranges.map((r) => `<button type="button" role="tab" class="lc-range-btn${_chartRange === r ? ' on' : ''}" aria-selected="${_chartRange === r}" data-action="PortfolioScreen.setChartRange" data-tab="${r}">${r}</button>`).join('')}
            </div>
            ${Charts.lineChartBlock(chartSeries, {
              height: 128,
              color: chartUp ? '#22c55e' : '#ef4444',
              ariaLabel: `Portfolio value ${_chartRange}`,
            })}
          </div>` : '';

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${active ? active.name : I18n.t('portfolio.title')}</h1>
          <p>${active ? active.desc : I18n.t('portfolio.sub')}</p>
        </div>
        <div class="lc-dash-section">
          <div class="lc-dash-section-head">
            <h3>${I18n.t('portfolio.bucketsTitle')}</h3>
            <span>${_filter ? `<button type="button" class="lc-link-btn" data-action="PortfolioScreen.clearFilter">Show all</button>` : I18n.t('portfolio.bucketsSub')}</span>
          </div>
          ${cards}
        </div>
        <div class="lc-dash-hero">
          <div class="lc-dash-hero-label">${active ? active.name : I18n.t('portfolio.value')}</div>
          <div class="lc-dash-hero-val lc-num" data-lc-count="${heroValue}" data-lc-count-key="pf-hero">${PsxUI.fmt(heroValue)}</div>
          <div class="lc-dash-hero-row">
            <span class="lc-dash-chip ${daily >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.today')} ${PsxUI.fmt(daily, { signed: daily >= 0 })}</span>
            <span class="lc-dash-chip ${heroPnlPct >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.allTime')} ${PsxUI.fmt(heroPnlPct, { pct: true, signed: true })}</span>
          </div>
          ${chartBlock}
        </div>
        <div class="lc-pulse-row">
          <div class="lc-pulse-pill"><label>${I18n.t('portfolio.yield')}</label><b class="psx-up">${s.portfolioDivYield.toFixed(2)}%</b></div>
          <div class="lc-pulse-pill"><label>${I18n.t('portfolio.invested')}</label><b>${PsxUI.fmt(bucketStats ? bucketStats.deployedPkr : s.invested)}</b></div>
          <div class="lc-pulse-pill"><label>Cost basis</label><b>${PsxUI.fmt(bucketStats ? bucketStats.invested : s.invested)}</b></div>
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
            <th>Symbol</th><th class="lc-spark-cell" aria-hidden="true"></th><th>Qty</th><th>Last</th><th>Value</th><th>G/L</th><th></th>
          </tr></thead><tbody>
          ${holdings.map(h => `<tr>
            <td data-nav="research"><div class="psx-sym">${h.symbol}</div><div class="psx-sym-sub">${h.broker}</div></td>
            <td class="lc-spark-cell">${typeof Charts !== 'undefined' ? Charts.holdingSpark(h) : ''}</td>
            <td class="lc-num" data-nav="research">${h.kind === 'fund' ? h.quantity.toFixed(2) : PsxUI.fmtNum(h.quantity, 2)}</td>
            <td class="lc-num" data-nav="research">${h.kind === 'intl' || h.kind === 'crypto' ? '$' + Number(FxService.pkrToUsd(h.price)).toFixed(2) + '<br><small>' + PsxUI.fmt(h.price) + '</small>' : PsxUI.fmt(h.price)}</td>
            <td class="lc-num" data-nav="research">${PsxUI.fmt(h.value)}${h.kind === 'intl' || h.kind === 'crypto' ? '<br><small>Cost ' + PsxUI.fmt(h.costBasis) + '</small>' : ''}</td>
            <td class="lc-num ${PsxUI.chgCls(h.pnlPct)}" data-nav="research">${PsxUI.fmt(h.pnlPct, { pct: true, signed: true })}</td>
            <td style="white-space:nowrap">
              <button type="button" class="lc-link-btn" data-action="App.openPriceAlert" data-symbol="${h.symbol}" data-stop="1">Alert</button>
              <button type="button" class="lc-link-btn" data-action="PortfolioScreen.reconcile" data-symbol="${h.symbol}" data-broker="${(h.broker || '').replace(/"/g, '&quot;')}" data-mode="${h.kind}" data-stop="1">Edit</button>
              <button type="button" class="lc-link-btn" data-action="Transactions.openSymbol" data-symbol="${h.symbol}" data-stop="1">Txs</button>
            </td>
          </tr>`).join('')}
          </tbody></table>
        </div>` : `<div class="lc-empty-state" style="margin-top:0">
          <h2>No holdings in this portfolio</h2>
          <p>Add ${active ? active.name.toLowerCase() : 'positions'} to start tracking.</p>
          <button type="button" class="psx-btn psx-btn-primary" data-action="App.openAddForPortfolio" data-tab="${_filter || 'rafi'}">${I18n.t('addHoldings')}</button>
        </div>`}
        <div class="lc-dash-actions" style="margin-top:var(--lc-space-6)">
          <button type="button" class="psx-btn psx-btn-primary" data-action="App.openAddForPortfolio" data-tab="${_filter || ''}">${I18n.t('addHoldings')}</button>
          <button type="button" class="psx-btn psx-btn-ghost" data-action="App.openAddPortfolio">+ ${I18n.t('portfolio.addBucket')}</button>
        </div>
      </div>`;
  }

  function reconcile(symbol, broker, kind) {
    const h = _lastHoldings.find((x) => x.symbol === symbol && x.broker === broker && x.kind === kind)
      || _lastHoldings.find((x) => x.symbol === symbol);
    if (h && typeof App !== 'undefined') App.openReconcilePosition(h);
  }

  return { render, setFilter, clearFilter, currentFilter, reconcile, setChartRange };
})();
window.PortfolioScreen = PortfolioScreen;
