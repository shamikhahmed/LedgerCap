'use strict';
const Screener = (() => {
  let _filter = 'all';
  let _query = '';
  let _page = 0;
  const PAGE = 80;

  function _rows() {
    const catalog = typeof PsxStocksCatalog !== 'undefined' ? PsxStocksCatalog.rows() : [];
    const db = window.FUNDAMENTALS_DB || {};
    return catalog.map((s) => {
      const f = db[s.symbol] || {};
      const price = State.getPrice(s.symbol) || (window.FALLBACK_PRICES || {})[s.symbol] || 0;
      return {
        ...s,
        pe: f.pe,
        divYield: f.divYield,
        profitGrowth: f.profitGrowth,
        roe: f.roe,
        price,
        hasFundamentals: !!(f.pe || f.divYield),
      };
    });
  }

  function _match(r) {
    if (_filter === 'islamic' && !r.isShariah) return false;
    if (_filter === 'highDiv') {
      if (!r.hasFundamentals) return false;
      if (!r.divYield || r.divYield < 6) return false;
    }
    if (_filter === 'value') {
      if (!r.hasFundamentals) return false;
      if (!r.pe || r.pe > 12) return false;
    }
    return true;
  }

  function _filteredRows() {
    const q = _query.trim().toLowerCase();
    let rows = _rows().filter(_match);
    if (q) rows = rows.filter((r) => r.symbol.toLowerCase().includes(q) || (r.name || '').toLowerCase().includes(q));
    rows.sort((a, b) => {
      const da = a.divYield || 0;
      const db = b.divYield || 0;
      if (db !== da) return db - da;
      return a.symbol.localeCompare(b.symbol);
    });
    return rows;
  }

  function _listHtml(rows) {
    return rows.map((r) => {
      const pe = r.pe != null ? r.pe : '—';
      const yld = r.divYield != null ? r.divYield + '%' : '—';
      const gr = r.profitGrowth != null ? r.profitGrowth + '% gr' : '—';
      return `<button type="button" class="lc-market-row" data-action="Research.open" data-symbol="${r.symbol}">
      <div><div class="lc-market-sym">${r.symbol}</div><div class="lc-market-name">P/E ${pe} · Yld ${yld}</div></div>
      <div class="lc-market-price">${r.price > 0 ? PsxUI.fmt(r.price) : '—'}</div>
      <div class="lc-market-chg ${PsxUI.chgCls(r.profitGrowth)}">${gr}</div>
    </button>`;
    }).join('');
  }

  function _paintList() {
    const listEl = document.getElementById('screener-list');
    const countEl = document.getElementById('screener-count');
    const fundEl = document.getElementById('screener-fund-count');
    if (!listEl) { render(); return; }
    const all = _filteredRows();
    const withFund = all.filter((r) => r.hasFundamentals).length;
    const start = _page * PAGE;
    const pageRows = all.slice(start, start + PAGE);
    const pages = Math.max(1, Math.ceil(all.length / PAGE));
    listEl.innerHTML = (pageRows.length ? _listHtml(pageRows) : '<p class="lc-empty-hint">No matches — try another filter.</p>')
      + (pages > 1 ? `<div class="lc-pager"><button type="button" class="psx-btn psx-btn-ghost" data-action="Screener.prevPage" ${_page <= 0 ? 'disabled' : ''}>Prev</button><span>${_page + 1} / ${pages}</span><button type="button" class="psx-btn psx-btn-ghost" data-action="Screener.nextPage" ${_page >= pages - 1 ? 'disabled' : ''}>Next</button></div>` : '');
    if (countEl) countEl.textContent = String(all.length);
    if (fundEl) fundEl.textContent = String(withFund);
  }

  function render() {
    const screen = document.getElementById('screen-screener');
    if (!screen) return;
    const all = _filteredRows();
    const withFund = all.filter((r) => r.hasFundamentals).length;
    const start = _page * PAGE;
    const pageRows = all.slice(start, start + PAGE);
    const pages = Math.max(1, Math.ceil(all.length / PAGE));

    screen.innerHTML = PsxUI.lcDash(I18n.t('screener.title'), I18n.t('screener.sub'), `
      ${PsxUI.segment([
        { id: 'all', label: I18n.t('screener.all') },
        { id: 'islamic', label: I18n.t('screener.islamic') },
        { id: 'highDiv', label: I18n.t('screener.highDiv') },
        { id: 'value', label: I18n.t('screener.value') },
      ], _filter, 'Screener')}
      <div class="lc-search-wrap">
        <input type="search" id="screener-search" placeholder="Filter results…" value="${_query.replace(/"/g, '&quot;')}" autocomplete="off" aria-label="Filter screener">
        <p class="lc-search-hint">Full PSX catalog · dividend/value filters need fundamentals seed</p>
      </div>
      <div class="lc-pulse-row">
        <div class="lc-pulse-pill"><label>Matches</label><b id="screener-count">${all.length}</b></div>
        <div class="lc-pulse-pill" title="Symbols with P/E or yield in seed DB"><label>With fundamentals</label><b id="screener-fund-count">${withFund}</b></div>
      </div>
      <div class="lc-sector-card" id="screener-list">${pageRows.length ? _listHtml(pageRows) : '<p class="lc-empty-hint">No matches.</p>'}${pages > 1 ? `<div class="lc-pager"><button type="button" class="psx-btn psx-btn-ghost" data-action="Screener.prevPage" ${_page <= 0 ? 'disabled' : ''}>Prev</button><span>${_page + 1} / ${pages}</span><button type="button" class="psx-btn psx-btn-ghost" data-action="Screener.nextPage" ${_page >= pages - 1 ? 'disabled' : ''}>Next</button></div>` : ''}</div>
    `);

    const inp = document.getElementById('screener-search');
    if (inp && !inp.dataset.bound) {
      inp.dataset.bound = '1';
      inp.addEventListener('input', (e) => { _query = e.target.value; _page = 0; _paintList(); });
    }
  }

  function setFilter(f) { _filter = f; _page = 0; render(); }
  function nextPage() { _page++; _paintList(); }
  function prevPage() { _page = Math.max(0, _page - 1); _paintList(); }
  function _onSearch(q) { _query = q; _page = 0; _paintList(); }
  return { render, setFilter, nextPage, prevPage, _onSearch };
})();
window.Screener = Screener;
