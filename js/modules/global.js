'use strict';
const Global = (() => {
  let _tab = 'intl';
  let _query = '';

  async function _refreshQuotes() {
    const holdings = Ledger.calcGlobalHoldings(State.get().transactions || []);
    if (!holdings.length) return;
    const results = await Prices.fetchAllGlobal(holdings);
    Object.entries(results).forEach(([sym, data]) => {
      const pkr = FxService.usdToPkr(data.priceUsd || data.price);
      State.updatePrice(sym, { ...data, price: pkr, priceUsd: data.priceUsd || data.price });
    });
    render();
  }

  function _rows() {
    const txs = State.get().transactions || [];
    const holdings = Ledger.calcGlobalHoldings(txs);
    const catalog = _tab === 'crypto' ? (window.CRYPTO_ASSETS || []) : (window.INTL_STOCKS || []);
    const q = _query.trim().toLowerCase();
    let list = catalog.map(s => {
      const h = holdings.find(x => x.symbol === s.symbol && (_tab === 'crypto' ? x.assetClass === 'crypto' : x.assetClass !== 'crypto'));
      const usd = h && State.getPrice(s.symbol) ? FxService.pkrToUsd(State.getPrice(s.symbol)) : (window.GLOBAL_FALLBACK_USD || {})[s.symbol];
      return { ...s, usd: usd || 0, pkr: FxService.usdToPkr(usd || 0), qty: h?.qty || 0, held: !!h };
    });
    if (q) list = list.filter(r => r.symbol.toLowerCase().includes(q) || (r.name || '').toLowerCase().includes(q));
    return { list, holdings, count: catalog.length };
  }

  function _listHtml(list) {
    const shown = list.slice(0, 80);
    return `
      ${shown.map(r => `<button type="button" class="lc-market-row" onclick="Research.open('${r.symbol}')">
        <div><div class="lc-market-sym">${r.symbol}</div><div class="lc-market-name">${r.name}</div></div>
        <div class="lc-market-price">$${Number(r.usd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${typeof Prices !== 'undefined' && Prices.priceBadge ? Prices.priceBadge(r.symbol) : ''}</div>
        <div class="lc-market-chg">${r.held ? r.qty + ' held · ' + PsxUI.fmt(r.pkr) : PsxUI.fmt(r.pkr)}</div>
      </button>`).join('')}
      ${list.length > 80 ? `<p class="lc-search-empty">Showing 80 of ${list.length} — keep typing to narrow</p>` : ''}
      ${!list.length ? `<p class="lc-search-empty">No matches for “${_query.replace(/"/g, '&quot;')}”</p>` : ''}`;
  }

  function _paintList() {
    const listEl = document.getElementById('global-list');
    const showingEl = document.getElementById('global-showing');
    if (!listEl) { render(); return; }
    const { list } = _rows();
    listEl.innerHTML = _listHtml(list);
    if (showingEl) showingEl.textContent = String(Math.min(80, list.length)) + (list.length > 80 ? '+' : '');
  }

  function render() {
    const screen = document.getElementById('screen-global');
    if (!screen) return;
    const usdRate = FxService.getUsdRate();
    const fxMeta = FxService.getMeta ? FxService.getMeta() : {};
    const state = State.get();
    const usaStats = typeof PortfolioBuckets !== 'undefined' ? PortfolioBuckets.statsForBucket(state, 'usa') : null;
    const globalHoldings = Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(state.transactions || []) : [];
    const ttwo = globalHoldings.find(h => h.symbol === 'TTWO');
    const { list, holdings, count } = _rows();
    const heldCount = holdings.filter(h => _tab === 'crypto' ? h.assetClass === 'crypto' : h.assetClass !== 'crypto').length;

    screen.innerHTML = PsxUI.lcDash('Global markets', `USD/PKR ₨${usdRate.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${fxMeta.source ? ' · ' + fxMeta.source : ''} · ${count} US symbols + crypto`, `
      ${PsxUI.segment([
        { id: 'intl', label: 'US equities' },
        { id: 'crypto', label: 'Crypto' },
      ], _tab, 'Global', 'setTab')}
      <div class="lc-search-wrap">
        <input type="search" id="global-search" placeholder="Search ${_tab === 'crypto' ? 'crypto' : 'US ticker'}…" value="${_query.replace(/"/g, '&quot;')}" autocomplete="off" aria-label="Search global symbols">
        <p class="lc-search-hint">Type to shortlist — list updates without leaving the field</p>
      </div>
      <div class="lc-pulse-row">
        ${usaStats?.deployedUsd ? `<div class="lc-pulse-pill"><label>IBKR invested</label><b>${FxService.fmtUsdPkr(usaStats.deployedUsd)}</b></div>` : ''}
        ${ttwo ? `<div class="lc-pulse-pill"><label>TTWO cost</label><b>${FxService.fmtUsdPkr(ttwo.totalCostUsd || ttwo.qty * (ttwo.avgCostUsd || 0))}</b></div>` : ''}
        <div class="lc-pulse-pill"><label>Your positions</label><b>${heldCount}</b></div>
        <div class="lc-pulse-pill"><label>Catalog</label><b>${count}</b></div>
        <div class="lc-pulse-pill"><label>Showing</label><b id="global-showing">${Math.min(80, list.length)}${list.length > 80 ? '+' : ''}</b></div>
      </div>
      <div class="lc-sector-card" id="global-list">${_listHtml(list)}</div>
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-primary" onclick="Global._refreshQuotes()">Refresh FX &amp; quotes</button>
        <button type="button" class="psx-btn psx-btn-ghost" onclick="App.openAddTransaction('INTL_BUY')">Add US stock</button>
        <button type="button" class="psx-btn psx-btn-ghost" onclick="App.openAddTransaction('CRYPTO_BUY')">Add crypto</button>
      </div>
    `);

    const inp = document.getElementById('global-search');
    if (inp && !inp.dataset.bound) {
      inp.dataset.bound = '1';
      const onInput = typeof LcDebounce !== 'undefined'
        ? LcDebounce.debounce(e => { _query = e.target.value; _paintList(); }, 120)
        : e => { _query = e.target.value; _paintList(); };
      inp.addEventListener('input', onInput);
    }
  }

  function setTab(t) { _tab = t; _query = ''; render(); }
  function _onSearch(q) { _query = q; _paintList(); }
  return { render, setTab, _onSearch, _refreshQuotes };
})();
window.Global = Global;
