'use strict';
const Global = (() => {
  let _tab = 'intl';

  async function _refreshQuotes() {
    const holdings = Ledger.calcGlobalHoldings(State.get().transactions || []);
    if (!holdings.length) return;
    const results = await Prices.fetchAllGlobal(holdings);
    Object.entries(results).forEach(([sym, data]) => {
      const pkr = FxService.usdToPkr(data.priceUsd || data.price);
      State.updatePrice(sym, { ...data, price: pkr, priceUsd: data.priceUsd || data.price });
    });
  }

  function render() {
    const screen = document.getElementById('screen-global');
    if (!screen) return;
    const txs = State.get().transactions || [];
    const holdings = Ledger.calcGlobalHoldings(txs);
    const usdRate = FxService.getUsdRate();

    const intlRows = (window.INTL_STOCKS || []).map(s => {
      const h = holdings.find(x => x.symbol === s.symbol && x.assetClass === 'intl');
      const usd = h ? (State.getPrice(s.symbol) ? FxService.pkrToUsd(State.getPrice(s.symbol)) : (window.GLOBAL_FALLBACK_USD || {})[s.symbol]) : (window.GLOBAL_FALLBACK_USD || {})[s.symbol];
      const pkr = FxService.usdToPkr(usd || 0);
      return { ...s, usd, pkr, qty: h?.qty || 0, held: !!h };
    });

    const cryptoRows = (window.CRYPTO_ASSETS || []).map(c => {
      const h = holdings.find(x => x.symbol === c.symbol && x.assetClass === 'crypto');
      const usd = h ? (State.getPrice(c.symbol) ? FxService.pkrToUsd(State.getPrice(c.symbol)) : (window.GLOBAL_FALLBACK_USD || {})[c.symbol]) : (window.GLOBAL_FALLBACK_USD || {})[c.symbol];
      return { ...c, usd, pkr: FxService.usdToPkr(usd || 0), qty: h?.qty || 0, held: !!h };
    });

    const rows = _tab === 'crypto' ? cryptoRows : intlRows;

    screen.innerHTML = `
      ${PsxUI.strip('Global._refreshQuotes()')}
      ${PsxUI.pageTitle('Global markets', `USD/PKR ₨${usdRate.toLocaleString('en-PK')} · US equities + crypto`)}
      <div class="psx-filters">
        <button type="button" class="psx-filter${_tab === 'intl' ? ' on' : ''}" onclick="Global.setTab('intl')">US / Intl</button>
        <button type="button" class="psx-filter${_tab === 'crypto' ? ' on' : ''}" onclick="Global.setTab('crypto')">Crypto</button>
      </div>
      <div class="psx-stats">
        <div class="psx-stat"><div class="psx-stat-l">Positions</div><div class="psx-stat-v">${holdings.length}</div></div>
        <div class="psx-stat"><div class="psx-stat-l">USD rate</div><div class="psx-stat-v">₨${usdRate}</div></div>
      </div>
      <div class="psx-table-wrap"><table class="psx-table"><thead><tr>
        <th>Symbol</th><th>Last (USD)</th><th>PKR est.</th><th>Held</th><th></th>
      </tr></thead><tbody>
      ${rows.map(r => `<tr>
        <td><div class="psx-sym">${r.symbol}</div><div class="psx-sym-sub">${r.name}</div></td>
        <td>$${Number(r.usd || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
        <td>${PsxUI.fmt(r.pkr)}</td>
        <td>${r.held ? r.qty : '—'}</td>
        <td><button type="button" class="psx-open" onclick="Research.open('${r.symbol}');Navigation.go('research')">Chart</button></td>
      </tr>`).join('')}
      </tbody></table></div>
      <div style="padding:16px;display:flex;gap:10px;flex-wrap:wrap">
        <button type="button" class="psx-btn psx-btn-primary" onclick="App.openAddTransaction('INTL_BUY')">Add US stock</button>
        <button type="button" class="psx-btn psx-btn-ghost" onclick="App.openAddTransaction('CRYPTO_BUY')">Add crypto</button>
      </div>`;
  }

  function setTab(t) { _tab = t; render(); }

  return { render, setTab, _refreshQuotes };
})();
window.Global = Global;
