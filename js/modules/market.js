'use strict';
const Market = (() => {
  let _filter = 'all';
  let _moveFilter = 'all';
  let _sectorFilter = '';
  let _query = '';

  function _rows() {
    const seen = new Set();
    const rows = [];
    [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].forEach(s => {
      if (seen.has(s.symbol)) return;
      seen.add(s.symbol);
      const price = State.getPrice(s.symbol) || (window.FALLBACK_PRICES || {})[s.symbol] || 0;
      const prev = State.getPrevClose(s.symbol) || price;
      const chg = prev ? ((price - prev) / prev) * 100 : 0;
      rows.push({ ...s, price, chg });
    });
    return rows;
  }

  function _segment() {
    return `<div class="lc-segment" role="tablist">
      <button type="button" class="lc-segment-btn${_filter === 'all' ? ' on' : ''}" onclick="Market.setFilter('all')">${I18n.t('screener.all')}</button>
      <button type="button" class="lc-segment-btn${_filter === 'islamic' ? ' on' : ''}" onclick="Market.setFilter('islamic')">${I18n.t('screener.islamic')}</button>
    </div>`;
  }

  function _pulseRow(baseRows) {
    let adv = 0, dec = 0, unch = 0;
    baseRows.forEach(r => {
      if (r.chg > 0.05) adv++;
      else if (r.chg < -0.05) dec++;
      else unch++;
    });
    const listed = baseRows.length;
    return `<div class="lc-pulse-row" role="group" aria-label="Market movers">
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${_moveFilter === 'advancing' ? ' on' : ''}" onclick="Market.setMoveFilter('advancing')" aria-pressed="${_moveFilter === 'advancing'}">
        <label>${I18n.t('market.advancing')}</label><b class="psx-up">${adv}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${_moveFilter === 'declining' ? ' on' : ''}" onclick="Market.setMoveFilter('declining')" aria-pressed="${_moveFilter === 'declining'}">
        <label>${I18n.t('market.declining')}</label><b class="psx-down">${dec}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${_moveFilter === 'unchanged' ? ' on' : ''}" onclick="Market.setMoveFilter('unchanged')" aria-pressed="${_moveFilter === 'unchanged'}">
        <label>${I18n.t('market.unchanged')}</label><b>${unch}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${_moveFilter === 'all' ? ' on' : ''}" onclick="Market.setMoveFilter('all')" aria-pressed="${_moveFilter === 'all'}">
        <label>Listed</label><b>${listed}</b>
      </button>
    </div>`;
  }

  function _sectorBlocks(bySector, onRow) {
    return Object.keys(bySector).sort().map(sec => `
      <div class="lc-sector-card">
        <button type="button" class="lc-sector-head lc-sector-head--btn${_sectorFilter === sec ? ' on' : ''}" onclick="Market.setSectorFilter('${sec.replace(/'/g, "\\'")}')">
          <h4>${sec}</h4><span>${bySector[sec].length} stocks</span>
        </button>
        ${bySector[sec].map(r => `
          <button type="button" class="lc-market-row" onclick="${onRow(r.symbol)}">
            <div>
              <div class="lc-market-sym">${r.symbol}${r.isShariah ? '<span class="lc-badge">S</span>' : ''}</div>
              <div class="lc-market-name">${r.name}</div>
            </div>
            <div class="lc-market-price">${PsxUI.fmt(r.price)} ${typeof Prices !== 'undefined' && Prices.priceBadge ? Prices.priceBadge(r.symbol) : ''}</div>
            <div class="lc-market-chg ${PsxUI.chgCls(r.chg)}">${PsxUI.fmt(r.chg, { pct: true, signed: true })}</div>
          </button>`).join('')}
      </div>`).join('');
  }

  function _filteredRows() {
    let baseRows = _rows();
    if (_filter === 'islamic') baseRows = baseRows.filter(r => r.isShariah);
    const q = _query.trim().toLowerCase();
    if (q) {
      baseRows = baseRows.filter(r =>
        r.symbol.toLowerCase().includes(q) ||
        (r.name || '').toLowerCase().includes(q) ||
        (r.sector || '').toLowerCase().includes(q)
      );
    }
    let rows = baseRows;
    if (_moveFilter === 'advancing') rows = baseRows.filter(r => r.chg > 0.05);
    else if (_moveFilter === 'declining') rows = baseRows.filter(r => r.chg < -0.05);
    else if (_moveFilter === 'unchanged') rows = baseRows.filter(r => r.chg >= -0.05 && r.chg <= 0.05);
    if (_sectorFilter) rows = rows.filter(r => (r.sector || 'Other') === _sectorFilter);
    if (_moveFilter === 'advancing') rows.sort((a, b) => b.chg - a.chg);
    else if (_moveFilter === 'declining') rows.sort((a, b) => a.chg - b.chg);
    else rows.sort((a, b) => a.symbol.localeCompare(b.symbol));
    return { baseRows, rows };
  }

  function _paintList() {
    const host = document.getElementById('market-list');
    if (!host) { render(); return; }
    const { rows } = _filteredRows();
    const bySector = {};
    rows.forEach(r => { (bySector[r.sector || 'Other'] = bySector[r.sector || 'Other'] || []).push(r); });
    host.innerHTML = rows.length
      ? _sectorBlocks(bySector, sym => `Research.open('${sym}')`)
      : `<div class="lc-empty-state"><h2>No matches</h2><p>Try another symbol or clear filters.</p></div>`;
  }

  function render() {
    const screen = document.getElementById('screen-market');
    if (!screen) return;
    const { baseRows, rows } = _filteredRows();
    const bySector = {};
    rows.forEach(r => { (bySector[r.sector || 'Other'] = bySector[r.sector || 'Other'] || []).push(r); });
    const k = PsxUI.kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    const filterHint = (_moveFilter !== 'all' || _sectorFilter)
      ? `<p class="lc-filter-hint">${_sectorFilter ? `Sector: ${_sectorFilter} · ` : ''}${_moveFilter !== 'all' ? _moveFilter + ' · ' : ''}<button type="button" class="lc-link-btn" onclick="Market.clearFilters()">Clear filters</button></p>`
      : '';

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${I18n.t('market.title')}</h1>
          <p>${I18n.t('market.sub')}</p>
        </div>
        <div class="lc-dash-market" style="margin-bottom:var(--lc-space-4)">
          <button type="button" class="lc-dash-market-card lc-dash-market-card--btn" onclick="App.refreshPrices()" aria-label="Refresh KSE-100">
            <span>KSE-100</span>
            <strong>${k.value ? PsxUI.fmtIndex(k.value) : '—'}</strong>
            <em class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : '—'}</em>
          </button>
          <button type="button" class="lc-dash-market-card lc-dash-market-card--btn" onclick="Market.setMoveFilter('all')" aria-label="Show all listed stocks">
            <span>Listed</span>
            <strong>${baseRows.length}</strong>
            <em>${_filter === 'islamic' ? I18n.t('market.shariah') : I18n.t('screener.all')}</em>
          </button>
        </div>
        ${_segment()}
        <div class="lc-search-wrap">
          <input type="search" id="market-search" placeholder="Search symbol, sector…" value="${_query.replace(/"/g, '&quot;')}" autocomplete="off" aria-label="Search stocks">
          <p class="lc-search-hint">Type to shortlist — stays focused while you type</p>
        </div>
        ${_pulseRow(baseRows)}
        ${filterHint}
        <div id="market-list">${rows.length ? _sectorBlocks(bySector, sym => `Research.open('${sym}')`) : `
          <div class="lc-empty-state"><h2>No matches</h2><p>Try another symbol, filter, or clear movers filter.</p></div>`}</div>
        <div class="lc-dash-actions">
          <button type="button" class="psx-btn psx-btn-primary" onclick="App.refreshPrices()">${I18n.t('refresh')}</button>
        </div>
      </div>`;

    const inp = document.getElementById('market-search');
    if (inp && !inp.dataset.bound) {
      inp.dataset.bound = '1';
      const onInput = typeof LcDebounce !== 'undefined'
        ? LcDebounce.debounce(e => { _query = e.target.value; _paintList(); }, 120)
        : e => { _query = e.target.value; _paintList(); };
      inp.addEventListener('input', onInput);
    }
  }

  function setFilter(f) { _filter = f; render(); }
  function setMoveFilter(f) { _moveFilter = _moveFilter === f ? 'all' : f; render(); }
  function setSectorFilter(sec) { _sectorFilter = _sectorFilter === sec ? '' : sec; render(); }
  function clearFilters() { _moveFilter = 'all'; _sectorFilter = ''; render(); }
  function moveFilter() { return _moveFilter; }
  function _onSearch(q) { _query = q; _paintList(); }

  return { render, setFilter, setMoveFilter, setSectorFilter, clearFilters, moveFilter, _onSearch };
})();
window.Market = Market;
