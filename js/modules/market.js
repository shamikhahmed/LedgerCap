'use strict';
const Market = (() => {
  let _filter = 'all';
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

  function _sectorBlocks(bySector, onRow) {
    return Object.keys(bySector).sort().map(sec => `
      <div class="lc-sector-card">
        <div class="lc-sector-head"><h4>${sec}</h4><span>${bySector[sec].length} stocks</span></div>
        ${bySector[sec].map(r => `
          <button type="button" class="lc-market-row" onclick="${onRow(r.symbol)}">
            <div>
              <div class="lc-market-sym">${r.symbol}${r.isShariah ? '<span class="lc-badge">S</span>' : ''}</div>
              <div class="lc-market-name">${r.name}</div>
            </div>
            <div class="lc-market-price">${PsxUI.fmt(r.price)}</div>
            <div class="lc-market-chg ${PsxUI.chgCls(r.chg)}">${PsxUI.fmt(r.chg, { pct: true, signed: true })}</div>
          </button>`).join('')}
      </div>`).join('');
  }

  function render() {
    const screen = document.getElementById('screen-market');
    if (!screen) return;
    let rows = _rows();
    if (_filter === 'islamic') rows = rows.filter(r => r.isShariah);
    const q = _query.trim().toLowerCase();
    if (q) {
      rows = rows.filter(r =>
        r.symbol.toLowerCase().includes(q) ||
        (r.name || '').toLowerCase().includes(q) ||
        (r.sector || '').toLowerCase().includes(q)
      );
    }

    let adv = 0, dec = 0, unch = 0;
    rows.forEach(r => {
      if (r.chg > 0.05) adv++;
      else if (r.chg < -0.05) dec++;
      else unch++;
    });

    const bySector = {};
    rows.forEach(r => { (bySector[r.sector || 'Other'] = bySector[r.sector || 'Other'] || []).push(r); });
    const k = PsxUI.kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${I18n.t('market.title')}</h1>
          <p>${I18n.t('market.sub')}</p>
        </div>
        <div class="lc-dash-market" style="margin-bottom:var(--lc-space-4)">
          <div class="lc-dash-market-card">
            <span>KSE-100</span>
            <strong>${k.value ? PsxUI.fmt(k.value) : '—'}</strong>
            <em class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : '—'}</em>
          </div>
          <div class="lc-dash-market-card">
            <span>Watchlist</span>
            <strong>${rows.length}</strong>
            <em>${_filter === 'islamic' ? I18n.t('market.shariah') : I18n.t('screener.all')}</em>
          </div>
        </div>
        ${_segment()}
        <div class="lc-search">
          <input type="search" placeholder="Search symbol, sector…" value="${_query.replace(/"/g, '&quot;')}" oninput="Market._onSearch(this.value)" aria-label="Search stocks">
        </div>
        <div class="lc-pulse-row">
          <div class="lc-pulse-pill"><label>${I18n.t('market.advancing')}</label><b class="psx-up">${adv}</b></div>
          <div class="lc-pulse-pill"><label>${I18n.t('market.declining')}</label><b class="psx-down">${dec}</b></div>
          <div class="lc-pulse-pill"><label>${I18n.t('market.unchanged')}</label><b>${unch}</b></div>
        </div>
        ${rows.length ? _sectorBlocks(bySector, sym => `Navigation.go('research');Research.open('${sym}')`) : `
          <div class="lc-empty-state"><h2>No matches</h2><p>Try another symbol or filter.</p></div>`}
        <div class="lc-dash-actions">
          <button type="button" class="psx-btn psx-btn-primary" onclick="App.refreshPrices()">${I18n.t('refresh')}</button>
        </div>
      </div>`;
  }

  function setFilter(f) { _filter = f; render(); }
  function _onSearch(q) { _query = q; render(); }

  return { render, setFilter, _onSearch };
})();
window.Market = Market;
