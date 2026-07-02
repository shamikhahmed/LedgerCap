'use strict';
const PortfolioScreen = (() => {
  let _filter = null;
  let _lastHoldings = [];
  let _chartRange = '1M';
  let _search = '';
  let _sort = 'value';
  let _viewMode = (typeof localStorage !== 'undefined' && localStorage.getItem('lc_pf_view')) || 'cards';

  function setSearch(v) { _search = String(v || ''); render(); }
  function setSort(v) { _sort = v || 'value'; render(); }
  function setViewMode(v) {
    _viewMode = v === 'table' ? 'table' : 'cards';
    try { localStorage.setItem('lc_pf_view', _viewMode); } catch (_) {}
    render();
  }

  function _filterSort(holdings) {
    let rows = holdings;
    const q = _search.trim().toLowerCase();
    if (q) {
      rows = rows.filter((h) =>
        h.symbol.toLowerCase().includes(q) ||
        (h.broker || '').toLowerCase().includes(q) ||
        (h.name || '').toLowerCase().includes(q));
    }
    return [...rows].sort((a, b) => {
      if (_sort === 'symbol') return a.symbol.localeCompare(b.symbol);
      if (_sort === 'pnl') return (b.pnl || 0) - (a.pnl || 0);
      if (_sort === 'daily') return (b.dailyPnl || 0) - (a.dailyPnl || 0);
      return (b.value || 0) - (a.value || 0);
    });
  }

  function _priceStale(sym) {
    return typeof State !== 'undefined' && State.isPriceStale && State.isPriceStale(sym, 24);
  }

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

  function _holdingCard(h) {
    const qtyLabel = h.kind === 'fund' ? h.quantity.toFixed(2) : PsxUI.fmtNum(h.quantity, 0);
    const avgLabel = h.kind === 'intl' || h.kind === 'crypto'
      ? '$' + Number(h.avgCost || 0).toFixed(2)
      : PsxUI.fmt(h.avgCost || (h.quantity ? h.costBasis / h.quantity : 0));
    const priceLabel = h.kind === 'intl' || h.kind === 'crypto'
      ? '$' + Number(FxService.pkrToUsd(h.price)).toFixed(2)
      : PsxUI.fmt(h.price);
    const dayCls = PsxUI.chgCls(h.dailyPnlPct || 0);
    const totCls = PsxUI.chgCls(h.pnlPct || 0);
    const spark = typeof Charts !== 'undefined' ? Charts.holdingSpark(h) : '';
    const broker = (h.broker || '').replace(/"/g, '&quot;');
    const stale = _priceStale(h.symbol);
    const canSell = h.kind === 'stock' || h.kind === 'intl' || h.kind === 'crypto';
    const sellType = h.kind === 'intl' ? 'INTL_SELL' : h.kind === 'crypto' ? 'CRYPTO_SELL' : 'SELL';
    return `<article class="lc-holding-inv${stale ? ' lc-holding-inv--stale' : ''}" data-nav="research">
      <div class="lc-holding-inv-head">
        <div class="lc-holding-inv-sym">
          <strong>${h.symbol}</strong>
          <span class="lc-holding-inv-price">${priceLabel}</span>
          <span class="lc-holding-inv-sub">${h.broker}${stale ? ' · stale price' : ''}</span>
        </div>
        <div class="lc-holding-inv-value lc-num">${PsxUI.fmt(h.value)}</div>
      </div>
      <div class="lc-holding-inv-meta">
        <span><label>Cost</label><b class="lc-num">${PsxUI.fmt(h.costBasis)}</b></span>
        <span><label>Avg buy</label><b class="lc-num">${avgLabel}</b></span>
        <span><label>Shares</label><b class="lc-num">${qtyLabel}</b></span>
      </div>
      <div class="lc-holding-inv-pnl">
        <div class="lc-pf-pnl-box ${dayCls}">
          <label>${I18n.t('portfolio.today')}</label>
          <b class="lc-num">${PsxUI.fmt(h.dailyPnl || 0, { signed: true })}</b>
          <em>${PsxUI.fmt(h.dailyPnlPct || 0, { pct: true, signed: true })}</em>
        </div>
        <div class="lc-pf-pnl-box ${totCls}">
          <label>${I18n.t('portfolio.gainLoss')}</label>
          <b class="lc-num">${PsxUI.fmt(h.pnl || 0, { signed: true })}</b>
          <em>${PsxUI.fmt(h.pnlPct || 0, { pct: true, signed: true })}</em>
        </div>
      </div>
      <div class="lc-holding-inv-foot">
        <div class="lc-holding-inv-spark" aria-hidden="true">${spark}</div>
        <div class="lc-holding-inv-actions">
          <button type="button" class="lc-link-btn" data-action="App.refreshSymbolPrice" data-symbol="${h.symbol}" data-refresh-symbol="${h.symbol}" data-stop="1" aria-label="Refresh ${h.symbol} price">↻</button>
          ${canSell ? `<button type="button" class="lc-link-btn lc-link-btn--sell" data-action="App.openSellHolding" data-symbol="${h.symbol}" data-broker="${broker}" data-tab="${sellType}" data-stop="1">Sell</button>` : ''}
          <button type="button" class="lc-link-btn" data-action="App.openPriceAlert" data-symbol="${h.symbol}" data-stop="1">Alert</button>
          <button type="button" class="lc-link-btn" data-action="PortfolioScreen.reconcile" data-symbol="${h.symbol}" data-broker="${broker}" data-mode="${h.kind}" data-stop="1">Edit</button>
          <button type="button" class="lc-link-btn" data-action="Transactions.openSymbol" data-symbol="${h.symbol}" data-stop="1">Txs</button>
        </div>
      </div>
    </article>`;
  }

  function _holdingTableRow(h) {
    const broker = (h.broker || '').replace(/"/g, '&quot;');
    const stale = _priceStale(h.symbol);
    const canSell = h.kind === 'stock' || h.kind === 'intl' || h.kind === 'crypto';
    const sellType = h.kind === 'intl' ? 'INTL_SELL' : h.kind === 'crypto' ? 'CRYPTO_SELL' : 'SELL';
    return `<tr class="${stale ? 'lc-row-stale' : ''}">
      <td data-nav="research"><div class="psx-sym">${h.symbol}</div><div class="psx-sym-sub">${h.broker}${stale ? ' · stale' : ''}</div></td>
      <td class="lc-num">${h.kind === 'fund' ? h.quantity.toFixed(2) : PsxUI.fmtNum(h.quantity, 0)}</td>
      <td class="lc-num">${PsxUI.fmt(h.price)}</td>
      <td class="lc-num">${PsxUI.fmt(h.costBasis)}</td>
      <td class="lc-num">${PsxUI.fmt(h.value)}</td>
      <td class="lc-num ${PsxUI.chgCls(h.dailyPnlPct || 0)}">${PsxUI.fmt(h.dailyPnl || 0, { signed: true })}<br><small>${PsxUI.fmt(h.dailyPnlPct || 0, { pct: true, signed: true })}</small></td>
      <td class="lc-num ${PsxUI.chgCls(h.pnlPct || 0)}">${PsxUI.fmt(h.pnl || 0, { signed: true })}<br><small>${PsxUI.fmt(h.pnlPct || 0, { pct: true, signed: true })}</small></td>
      <td style="white-space:nowrap">
        <button type="button" class="lc-link-btn" data-action="App.refreshSymbolPrice" data-symbol="${h.symbol}" data-refresh-symbol="${h.symbol}" data-stop="1" aria-label="Refresh ${h.symbol}">↻</button>
        ${canSell ? `<button type="button" class="lc-link-btn" data-action="App.openSellHolding" data-symbol="${h.symbol}" data-broker="${broker}" data-tab="${sellType}" data-stop="1">Sell</button>` : ''}
        <button type="button" class="lc-link-btn" data-action="PortfolioScreen.reconcile" data-symbol="${h.symbol}" data-broker="${broker}" data-mode="${h.kind}" data-stop="1">Edit</button>
      </td>
    </tr>`;
  }

  function _holdingsToolbar(count) {
    return `<div class="lc-pf-holdings-bar">
      <input type="search" class="lc-pf-search" placeholder="Search symbol…" value="${_search.replace(/"/g, '&quot;')}" aria-label="Search holdings" data-action-input="PortfolioScreen.setSearch">
      <select class="lc-pf-sort" aria-label="Sort holdings" data-action-change="PortfolioScreen.setSort">
        <option value="value"${_sort === 'value' ? ' selected' : ''}>Value</option>
        <option value="pnl"${_sort === 'pnl' ? ' selected' : ''}>Total P&amp;L</option>
        <option value="daily"${_sort === 'daily' ? ' selected' : ''}>Today</option>
        <option value="symbol"${_sort === 'symbol' ? ' selected' : ''}>Symbol</option>
      </select>
      <div class="lc-pf-view-toggle" role="group" aria-label="View mode">
        <button type="button" class="lc-range-btn${_viewMode === 'cards' ? ' on' : ''}" data-action="PortfolioScreen.setViewMode" data-tab="cards">Cards</button>
        <button type="button" class="lc-range-btn${_viewMode === 'table' ? ' on' : ''}" data-action="PortfolioScreen.setViewMode" data-tab="table">Table</button>
      </div>
      <span class="lc-pf-count">${count} shown</span>
    </div>`;
  }

  function _holdingsBlock(holdings) {
    const rows = _filterSort(holdings);
    if (!rows.length) {
      return `<div class="lc-empty-state"><p>No holdings match “${_search.replace(/</g, '')}”.</p></div>`;
    }
    if (_viewMode === 'table') {
      return `${_holdingsToolbar(rows.length)}<div class="psx-table-wrap lc-pf-table-wrap">
        <table class="psx-table"><thead><tr>
          <th>Symbol</th><th>Qty</th><th>Last</th><th>Cost</th><th>Value</th><th>Today</th><th>Total</th><th></th>
        </tr></thead><tbody>${rows.map(_holdingTableRow).join('')}</tbody></table>
      </div>`;
    }
    return `${_holdingsToolbar(rows.length)}<div class="lc-holdings-inv">${rows.map(_holdingCard).join('')}</div>`;
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
    const daily = _filter
      ? holdings.reduce((sum, h) => sum + (h.dailyPnl || 0), 0)
      : State.calcDailyPnl();
    const heroValue = bucketStats ? bucketStats.value : s.totalValue;
    const totalPnl = bucketStats ? bucketStats.pnl : s.totalReturn.abs;
    const totalPnlPct = bucketStats ? bucketStats.pnlPct : s.totalReturn.pct;
    const dailyPct = heroValue > 0 ? (daily / heroValue) * 100 : 0;
    const heroPnlPct = totalPnlPct;
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
          ${_filter ? `<div class="lc-pf-toolbar">
            <button type="button" class="psx-btn psx-btn-primary" data-action="App.openAddForPortfolio" data-tab="${_filter}">Transaction</button>
            <button type="button" class="psx-btn psx-btn-ghost" data-action="Transactions.openBucket" data-tab="${_filter}">Ledger</button>
          </div>` : ''}
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
          <div class="lc-pf-pnl-grid">
            <div class="lc-pf-pnl-box ${daily >= 0 ? 'up' : 'down'}">
              <label>${I18n.t('portfolio.today')}</label>
              <b class="lc-num">${PsxUI.fmt(daily, { signed: true })}</b>
              <em>${PsxUI.fmt(dailyPct, { pct: true, signed: true })}</em>
            </div>
            <div class="lc-pf-pnl-box ${totalPnl >= 0 ? 'up' : 'down'}">
              <label>${I18n.t('portfolio.gainLoss')}</label>
              <b class="lc-num">${PsxUI.fmt(totalPnl, { signed: true })}</b>
              <em>${PsxUI.fmt(heroPnlPct, { pct: true, signed: true })}</em>
            </div>
          </div>
          ${chartBlock}
        </div>
        <div class="lc-pulse-row">
          <div class="lc-pulse-pill"><label>${I18n.t('portfolio.yield')}</label><b class="psx-up">${s.portfolioDivYield.toFixed(2)}%</b></div>
          <div class="lc-pulse-pill"><label>${bucketStats?.deployedPkr ? 'Deployed' : I18n.t('portfolio.invested')}</label><b>${PsxUI.fmt(bucketStats?.deployedPkr ? bucketStats.deployedPkr : s.invested)}</b></div>
          <div class="lc-pulse-pill"><label>Cost basis</label><b>${PsxUI.fmt(bucketStats ? bucketStats.invested : s.invested)}</b></div>
          ${bucketStats?.cashPkr ? `<div class="lc-pulse-pill"><label>Cash</label><b>${PsxUI.fmt(bucketStats.cashPkr)}</b></div>` : ''}
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
        ${holdings.length ? _holdingsBlock(holdings) : `<div class="lc-empty-state" style="margin-top:0">
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

  return { render, setFilter, clearFilter, currentFilter, reconcile, setChartRange, setSearch, setSort, setViewMode };
})();
window.PortfolioScreen = PortfolioScreen;
