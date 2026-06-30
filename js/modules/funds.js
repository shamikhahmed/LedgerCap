'use strict';
const Funds = (() => {
  let _filter = 'all';
  let _query = '';

  function render() {
    const screen = document.getElementById('screen-funds');
    if (!screen) return;
    let funds = (window.MEEZAN_FUNDS || []).filter(f => {
      if (_filter === 'islamic') return f.isShariah;
      if (_filter === 'income') return /income|mmka/i.test(f.type || f.name);
      return true;
    });
    const q = _query.trim().toLowerCase();
    if (q) funds = funds.filter(f => f.symbol.toLowerCase().includes(q) || (f.name || '').toLowerCase().includes(q));

    screen.innerHTML = PsxUI.lcDash(I18n.t('tools.fundNavs.t'), I18n.t('tools.fundNavs.d'), `
      ${PsxUI.segment([
        { id: 'all', label: I18n.t('screener.all') },
        { id: 'islamic', label: I18n.t('screener.islamic') },
        { id: 'income', label: 'Income' },
      ], _filter, 'Funds')}
      <div class="lc-search"><input type="search" placeholder="Search funds…" value="${_query.replace(/"/g, '&quot;')}" oninput="Funds._onSearch(this.value)" aria-label="Search funds"></div>
      <div class="lc-sector-card" style="margin-top:0">
        ${funds.map(f => {
          const a = (window.FUND_ANALYTICS_DB || {})[f.symbol] || {};
          const nav = State.getPrice(f.symbol) || f.currentNav || 0;
          return `<button type="button" class="lc-market-row" onclick="Navigation.go('research');Research.open('${f.symbol}')">
            <div><div class="lc-market-sym">${f.symbol}</div><div class="lc-market-name">${f.name}</div></div>
            <div class="lc-market-price">${PsxUI.fmt(nav)}</div>
            <div class="lc-market-chg ${PsxUI.chgCls(a.oneYearReturn)}">${a.oneYearReturn != null ? a.oneYearReturn + '% 1Y' : f.type || '—'}</div>
          </button>`;
        }).join('')}
      </div>
      <div class="lc-dash-actions"><button type="button" class="psx-btn psx-btn-primary" onclick="App.refreshPrices()">${I18n.t('refresh')}</button></div>
    `);
  }

  function setFilter(f) { _filter = f; render(); }
  function _onSearch(q) { _query = q; render(); }
  return { render, setFilter, _onSearch };
})();
window.Funds = Funds;
