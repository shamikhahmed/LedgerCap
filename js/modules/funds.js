'use strict';
const Funds = (() => {
  let _filter = 'all';
  let _query = '';

  function _filteredFunds() {
    let funds = (window.MEEZAN_FUNDS || []).filter(f => {
      if (_filter === 'islamic') return f.isShariah;
      if (_filter === 'income') return /income|mmka/i.test(f.type || f.name);
      return true;
    });
    const q = _query.trim().toLowerCase();
    if (q) funds = funds.filter(f => f.symbol.toLowerCase().includes(q) || (f.name || '').toLowerCase().includes(q));
    return funds;
  }

  function _listHtml(funds) {
    return funds.map(f => {
      const a = (window.FUND_ANALYTICS_DB || {})[f.symbol] || {};
      const nav = State.getPrice(f.symbol) || f.currentNav || 0;
      const invested = (f.units || 0) * (f.avgNav || 0);
      return `<button type="button" class="lc-market-row" onclick="Research.open('${f.symbol}')">
        <div><div class="lc-market-sym">${f.symbol}</div><div class="lc-market-name">${f.name}</div></div>
        <div class="lc-market-price">${PsxUI.fmt(nav)}</div>
        <div class="lc-market-chg ${PsxUI.chgCls(a.oneYearReturn)}">${invested ? 'Inv ' + PsxUI.fmt(invested) : (a.oneYearReturn != null ? a.oneYearReturn + '% 1Y' : f.type || '—')}</div>
      </button>`;
    }).join('');
  }

  function _paintList() {
    const listEl = document.getElementById('funds-list');
    if (!listEl) { render(); return; }
    listEl.innerHTML = _listHtml(_filteredFunds());
  }

  function render() {
    const screen = document.getElementById('screen-funds');
    if (!screen) return;
    const funds = _filteredFunds();
    const meezanInvested = window.MEEZAN_TOTAL_PURCHASES_PKR || 0;
    const meezanValue = window.MEEZAN_PORTFOLIO_VALUE_PKR || funds.reduce((s, f) => {
      const nav = State.getPrice(f.symbol) || f.currentNav || 0;
      return s + (f.units || 0) * nav;
    }, 0);

    screen.innerHTML = PsxUI.lcDash(I18n.t('tools.fundNavs.t'), I18n.t('tools.fundNavs.d'), `
      <div class="lc-pulse-row">
        <div class="lc-pulse-pill"><label>Total invested</label><b>${PsxUI.fmt(meezanInvested)}</b></div>
        <div class="lc-pulse-pill"><label>Portfolio value</label><b>${PsxUI.fmt(meezanValue)}</b></div>
        <div class="lc-pulse-pill"><label>Funds</label><b>${funds.length}</b></div>
        <div class="lc-pulse-pill"><label>Gain</label><b class="${meezanValue >= meezanInvested ? 'psx-up' : 'psx-down'}">${PsxUI.fmt(meezanValue - meezanInvested, { signed: true })}</b></div>
      </div>
      ${PsxUI.segment([
        { id: 'all', label: I18n.t('screener.all') },
        { id: 'islamic', label: I18n.t('screener.islamic') },
        { id: 'income', label: 'Income' },
      ], _filter, 'Funds')}
      <div class="lc-search-wrap">
        <input type="search" id="funds-search" placeholder="Search funds…" value="${_query.replace(/"/g, '&quot;')}" autocomplete="off" aria-label="Search funds">
        <p class="lc-search-hint">Type to shortlist — list updates in place</p>
      </div>
      <div class="lc-sector-card" style="margin-top:0" id="funds-list">${_listHtml(funds)}</div>
      <div class="lc-dash-actions"><button type="button" class="psx-btn psx-btn-primary" onclick="App.refreshPrices()">${I18n.t('refresh')}</button></div>
    `);

    const inp = document.getElementById('funds-search');
    if (inp && !inp.dataset.bound) {
      inp.dataset.bound = '1';
      inp.addEventListener('input', e => { _query = e.target.value; _paintList(); });
    }
  }

  function setFilter(f) { _filter = f; render(); }
  function _onSearch(q) { _query = q; _paintList(); }
  return { render, setFilter, _onSearch };
})();
window.Funds = Funds;
