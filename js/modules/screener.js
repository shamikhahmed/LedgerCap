'use strict';
const Screener = (() => {
  let _filter = 'all';
  let _query = '';

  function _rows() {
    const db = window.FUNDAMENTALS_DB || {};
    const seen = new Set();
    const rows = [];
    [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].forEach(s => {
      if (seen.has(s.symbol)) return;
      seen.add(s.symbol);
      const f = db[s.symbol] || {};
      rows.push({ ...s, pe: f.pe, divYield: f.divYield, profitGrowth: f.profitGrowth, roe: f.roe, price: State.getPrice(s.symbol) || (window.FALLBACK_PRICES || {})[s.symbol] || 0 });
    });
    return rows;
  }

  function _match(r) {
    if (_filter === 'islamic' && !r.isShariah) return false;
    if (_filter === 'highDiv' && (!r.divYield || r.divYield < 6)) return false;
    if (_filter === 'value' && (!r.pe || r.pe > 12)) return false;
    return true;
  }

  function _filteredRows() {
    const q = _query.trim().toLowerCase();
    let rows = _rows().filter(_match).sort((a, b) => (b.divYield || 0) - (a.divYield || 0));
    if (q) rows = rows.filter(r => r.symbol.toLowerCase().includes(q) || (r.name || '').toLowerCase().includes(q));
    return rows;
  }

  function _listHtml(rows) {
    return rows.map(r => `<button type="button" class="lc-market-row" onclick="Research.open('${r.symbol}')">
      <div><div class="lc-market-sym">${r.symbol}</div><div class="lc-market-name">P/E ${r.pe ?? '—'} · Yld ${r.divYield ? r.divYield + '%' : '—'}</div></div>
      <div class="lc-market-price">${PsxUI.fmt(r.price)}</div>
      <div class="lc-market-chg ${PsxUI.chgCls(r.profitGrowth)}">${r.profitGrowth != null ? r.profitGrowth + '% gr' : '—'}</div>
    </button>`).join('');
  }

  function _paintList() {
    const listEl = document.getElementById('screener-list');
    const countEl = document.getElementById('screener-count');
    if (!listEl) { render(); return; }
    const rows = _filteredRows();
    listEl.innerHTML = _listHtml(rows);
    if (countEl) countEl.textContent = String(rows.length);
  }

  function render() {
    const screen = document.getElementById('screen-screener');
    if (!screen) return;
    const rows = _filteredRows();

    screen.innerHTML = PsxUI.lcDash(I18n.t('screener.title'), I18n.t('screener.sub'), `
      ${PsxUI.segment([
        { id: 'all', label: I18n.t('screener.all') },
        { id: 'islamic', label: I18n.t('screener.islamic') },
        { id: 'highDiv', label: I18n.t('screener.highDiv') },
        { id: 'value', label: I18n.t('screener.value') },
      ], _filter, 'Screener')}
      <div class="lc-search-wrap">
        <input type="search" id="screener-search" placeholder="Filter results…" value="${_query.replace(/"/g, '&quot;')}" autocomplete="off" aria-label="Filter screener">
        <p class="lc-search-hint">Type to shortlist — list updates in place</p>
      </div>
      <div class="lc-pulse-row"><div class="lc-pulse-pill"><label>Matches</label><b id="screener-count">${rows.length}</b></div></div>
      <div class="lc-sector-card" id="screener-list">${_listHtml(rows)}</div>
    `);

    const inp = document.getElementById('screener-search');
    if (inp && !inp.dataset.bound) {
      inp.dataset.bound = '1';
      inp.addEventListener('input', e => { _query = e.target.value; _paintList(); });
    }
  }

  function setFilter(f) { _filter = f; render(); }
  function _onSearch(q) { _query = q; _paintList(); }
  return { render, setFilter, _onSearch };
})();
window.Screener = Screener;
