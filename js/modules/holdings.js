'use strict';
const Holdings = (() => {
  function fmt(n) {
    if (n == null || isNaN(n)) return '—';
    const abs = Math.abs(n);
    if (abs >= 1e5) return '₨' + (n / 1e5).toFixed(2) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function _meta(symbol, broker) {
    return [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])]
      .find(s => s.symbol === symbol && (!broker || s.broker === broker));
  }

  function render() {
    const screen = document.getElementById('screen-holdings');
    if (!screen) return;
    const state = State.get();
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);

    const rows = holdings.map(h => {
      const price = State.getPrice(h.symbol) || h.avgCost;
      const val = h.shares * price;
      const pnl = val - h.shares * h.avgCost;
      const pnlPct = h.avgCost > 0 ? ((price - h.avgCost) / h.avgCost) * 100 : 0;
      const meta = _meta(h.symbol, h.broker);
      return { ...h, price, val, pnl, pnlPct, name: meta?.name || h.symbol, kind: 'stock' };
    }).concat(funds.map(f => {
      const nav = State.getPrice(f.symbol) || f.avgNav;
      const mf = (window.MEEZAN_FUNDS || []).find(m => m.symbol === f.symbol);
      const val = f.units * nav;
      const pnl = val - f.totalInvested;
      const pnlPct = f.avgNav > 0 ? ((nav - f.avgNav) / f.avgNav) * 100 : 0;
      return { symbol: f.symbol, broker: f.broker, shares: f.units, price: nav, val, pnl, pnlPct, name: mf?.name || f.symbol, kind: 'fund' };
    })).sort((a, b) => b.val - a.val);

    screen.innerHTML = `
    <div class="os-page-header cap-reveal">
      <div class="os-page-title">Holdings</div>
      <div class="os-page-sub">${rows.length} positions across all brokers</div>
    </div>
    <div style="padding:12px 20px;display:flex;gap:8px;" class="cap-reveal">
      <button class="os-btn os-btn-primary" onclick="App.openAddTransaction()">+ Add transaction</button>
      <button class="os-btn os-btn-ghost" onclick="Transactions.openLog()">View log</button>
    </div>
    ${rows.length ? rows.map(r => `
      <div class="os-row cap-reveal" onclick="Navigation.go('research');Research.open('${r.symbol}')">
        <div>
          <div class="os-row-sym">${r.symbol}</div>
          <div class="os-row-sub">${r.name} · ${r.broker} · ${r.kind === 'fund' ? r.shares.toFixed(2) + ' units' : r.shares + ' sh'}</div>
        </div>
        <div>
          <div class="os-row-val">${fmt(r.val)}</div>
          <div class="os-row-sub ${r.pnl >= 0 ? 't-gain' : 't-loss'}">${r.pnl >= 0 ? '+' : ''}${r.pnlPct.toFixed(1)}%</div>
        </div>
      </div>`).join('') : `<div class="os-section" style="color:var(--os-text-secondary);">No holdings yet. Add a buy transaction to get started.</div>`}
    <div style="height:16px;"></div>`;
    CapMotion.refresh();
  }

  return { render };
})();
window.Holdings = Holdings;
