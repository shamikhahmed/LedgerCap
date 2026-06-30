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

  function render() {
    const screen = document.getElementById('screen-global');
    if (!screen) return;
    const usdRate = FxService.getUsdRate();
    const { list, holdings, count } = _rows();
    const shown = list.slice(0, 80);

    screen.innerHTML = PsxUI.lcDash('Global markets', `USD/PKR ₨${usdRate.toLocaleString('en-PK')} · ${count} US symbols + crypto`, `
      ${PsxUI.segment([
        { id: 'intl', label: 'US equities' },
        { id: 'crypto', label: 'Crypto' },
      ], _tab, 'Global', 'setTab')}
      <div class="lc-search"><input type="search" placeholder="Search ${_tab === 'crypto' ? 'crypto' : 'US ticker'}…" value="${_query.replace(/"/g, '&quot;')}" oninput="Global._onSearch(this.value)"></div>
      <div class="lc-pulse-row">
        <div class="lc-pulse-pill"><label>Your positions</label><b>${holdings.filter(h => _tab === 'crypto' ? h.assetClass === 'crypto' : h.assetClass !== 'crypto').length}</b></div>
        <div class="lc-pulse-pill"><label>Catalog</label><b>${count}</b></div>
        <div class="lc-pulse-pill"><label>Showing</label><b>${shown.length}${list.length > 80 ? '+' : ''}</b></div>
      </div>
      <div class="lc-sector-card">
        ${shown.map(r => `<button type="button" class="lc-market-row" onclick="Research.open('${r.symbol}');Navigation.go('research')">
          <div><div class="lc-market-sym">${r.symbol}</div><div class="lc-market-name">${r.name}</div></div>
          <div class="lc-market-price">$${Number(r.usd || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
          <div class="lc-market-chg">${r.held ? r.qty + ' held' : PsxUI.fmt(r.pkr)}</div>
        </button>`).join('')}
      </div>
      ${list.length > 80 ? `<p style="padding:0 16px 8px;font-size:13px;color:var(--psx-text-3)">Refine search to see more than 80 rows.</p>` : ''}
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-primary" onclick="Global._refreshQuotes()">Refresh FX &amp; quotes</button>
        <button type="button" class="psx-btn psx-btn-ghost" onclick="App.openAddTransaction('INTL_BUY')">Add US stock</button>
        <button type="button" class="psx-btn psx-btn-ghost" onclick="App.openAddTransaction('CRYPTO_BUY')">Add crypto</button>
      </div>
    `);
  }

  function setTab(t) { _tab = t; render(); }
  function _onSearch(q) { _query = q; render(); }
  return { render, setTab, _onSearch, _refreshQuotes };
})();
window.Global = Global;
