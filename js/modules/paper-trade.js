'use strict';
/** Simulated PSX ledger — isolated from real transactions. */
const PaperTrade = (() => {
  const U = PlatformUI;
  let _tab = 'portfolio';

  function _ledger() {
    const s = State.get();
    if (!s.paperLedger) s.paperLedger = { cashPkr: 500000, transactions: [] };
    return s.paperLedger;
  }

  function _holdings() {
    const ledger = _ledger();
    const txs = ledger.transactions || [];
    const bySym = {};
    txs.forEach((t) => {
      const sym = (t.symbol || '').toUpperCase();
      if (!sym) return;
      if (!bySym[sym]) bySym[sym] = { symbol: sym, shares: 0, cost: 0 };
      const q = t.shares || 0;
      if (t.type === 'BUY') {
        bySym[sym].cost += t.amount || q * (t.price || 0);
        bySym[sym].shares += q;
      } else if (t.type === 'SELL') {
        const avg = bySym[sym].shares > 0 ? bySym[sym].cost / bySym[sym].shares : 0;
        bySym[sym].shares -= q;
        bySym[sym].cost -= avg * q;
        if (bySym[sym].shares <= 0) delete bySym[sym];
      }
    });
    return Object.values(bySym).map((h) => {
      const price = State.getPrice(h.symbol) || (window.FALLBACK_PRICES || {})[h.symbol] || 0;
      const value = h.shares * price;
      const avg = h.shares > 0 ? h.cost / h.shares : 0;
      const pnl = value - h.cost;
      return { ...h, price, value, avgCost: avg, pnl, pnlPct: h.cost > 0 ? (pnl / h.cost) * 100 : 0 };
    }).sort((a, b) => b.value - a.value);
  }

  function setTab(id) { _tab = id; render(); }

  function _save(fn) {
    State.update((s) => {
      if (!s.paperLedger) s.paperLedger = { cashPkr: 500000, transactions: [] };
      fn(s.paperLedger);
    });
    render();
  }

  function openBuy(symbol) {
    symbol = (symbol || '').toUpperCase();
    const price = State.getPrice(symbol) || (window.FALLBACK_PRICES || {})[symbol] || 0;
    const content = `
      <div class="field"><label class="field-label">Symbol</label>
        <input class="field-input" id="pt-symbol" value="${symbol}" placeholder="ENGROH"></div>
      <div class="field"><label class="field-label">Shares</label>
        <input class="field-input" id="pt-shares" type="number" min="1" step="1" value="100"></div>
      <div class="field"><label class="field-label">Price ₨</label>
        <input class="field-input" id="pt-price" type="number" min="0" step="0.01" value="${price || ''}"></div>
      <button type="button" class="btn-primary" data-action="PaperTrade._submitBuy">Paper buy</button>`;
    App.openBottomSheet('paper-buy', `Paper buy ${symbol || ''}`, content);
  }

  function _submitBuy() {
    const sym = document.getElementById('pt-symbol')?.value?.trim().toUpperCase();
    const shares = parseFloat(document.getElementById('pt-shares')?.value);
    const price = parseFloat(document.getElementById('pt-price')?.value);
    if (!sym || !(shares > 0) || !(price > 0)) {
      App.showToast('Enter symbol, shares, price', 'error');
      return;
    }
    const amount = shares * price;
    const ledger = _ledger();
    if (amount > (ledger.cashPkr || 0)) {
      App.showToast('Insufficient paper cash', 'error');
      return;
    }
    _save((pl) => {
      pl.cashPkr = (pl.cashPkr || 0) - amount;
      pl.transactions.push({
        id: Ledger.newId(),
        type: 'BUY',
        symbol: sym,
        shares,
        price,
        amount,
        date: new Date().toISOString().slice(0, 10),
      });
    });
    App.closeBottomSheet();
    App.showToast(`Paper bought ${shares} ${sym}`, 'success');
  }

  function openSell(h) {
    const content = `
      <div class="field"><label class="field-label">Shares (max ${h.shares})</label>
        <input class="field-input" id="pt-sell-shares" type="number" min="1" max="${h.shares}" value="${h.shares}"></div>
      <div class="field"><label class="field-label">Price ₨</label>
        <input class="field-input" id="pt-sell-price" type="number" value="${h.price || ''}"></div>
      <button type="button" class="btn-primary" data-action="PaperTrade._submitSell" data-symbol="${h.symbol}">Paper sell</button>`;
    window._paperSell = h;
    App.openBottomSheet('paper-sell', `Paper sell ${h.symbol}`, content);
  }

  function _submitSell(el) {
    const h = window._paperSell;
    if (!h) return;
    const shares = parseFloat(document.getElementById('pt-sell-shares')?.value);
    const price = parseFloat(document.getElementById('pt-sell-price')?.value);
    if (!(shares > 0) || shares > h.shares || !(price > 0)) {
      App.showToast('Invalid sell', 'error');
      return;
    }
    const amount = shares * price;
    _save((pl) => {
      pl.cashPkr = (pl.cashPkr || 0) + amount;
      pl.transactions.push({
        id: Ledger.newId(),
        type: 'SELL',
        symbol: h.symbol,
        shares,
        price,
        amount,
        date: new Date().toISOString().slice(0, 10),
      });
    });
    App.closeBottomSheet();
    App.showToast(`Paper sold ${shares} ${h.symbol}`, 'success');
  }

  function resetLedger() {
    if (!confirm('Reset paper ledger? Clears all simulated trades.')) return;
    _save((pl) => {
      pl.cashPkr = 500000;
      pl.transactions = [];
    });
    App.showToast('Paper ledger reset', 'info');
  }

  function render() {
    const screen = document.getElementById('screen-paper-trade');
    if (!screen) return;
    const ledger = _ledger();
    const holdings = _holdings();
    const invested = holdings.reduce((a, h) => a + h.cost, 0);
    const mkt = holdings.reduce((a, h) => a + h.value, 0);
    const pnl = mkt - invested;

    screen.innerHTML = `
    ${MarketUI.pageHeader('Paper trading', 'Simulated PSX', 'Isolated from your real ledger')}
    <div class="lc-filter-bar cap-reveal">
      <button type="button" class="lc-view-pill${_tab === 'portfolio' ? ' active' : ''}" data-action="PaperTrade.setTab" data-tab="portfolio">Portfolio</button>
      <button type="button" class="lc-view-pill${_tab === 'history' ? ' active' : ''}" data-action="PaperTrade.setTab" data-tab="history">History</button>
    </div>
    ${U.metricGrid([
      U.metricCell('Paper cash', U.fmt(ledger.cashPkr || 0)),
      U.metricCell('Market value', U.fmt(mkt)),
      U.metricCell('P&L', U.fmt(pnl), null, pnl >= 0 ? 't-gain' : 't-loss'),
      U.metricCell('Positions', String(holdings.length)),
    ], 4)}
    ${_tab === 'portfolio' ? `
      <div style="padding:0 16px 12px;display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" class="btn-primary" data-action="PaperTrade.openBuy">New paper buy</button>
        <button type="button" class="btn-secondary" data-action="PaperTrade.resetLedger">Reset</button>
      </div>
      ${holdings.length ? holdings.map((h) => `
        <div class="os-row cap-reveal">
          <div><div class="os-row-sym">${h.symbol}</div>
            <div style="font-size:11px;color:var(--os-text-tertiary)">${h.shares} sh · avg ${U.fmt(h.avgCost)}</div></div>
          <div style="text-align:right">
            <div class="${h.pnl >= 0 ? 't-gain' : 't-loss'}">${U.fmt(h.pnl)} (${h.pnlPct.toFixed(1)}%)</div>
            <button type="button" class="btn-sm btn-secondary" data-action="PaperTrade.openSellRow" data-symbol="${h.symbol}">Sell</button>
          </div>
        </div>`).join('') : MarketUI.emptyState('', 'No paper positions', 'Practice entries without touching your real ledger.', '<button type="button" class="os-btn os-btn-primary" data-action="PaperTrade.openBuy">Paper buy</button>')}
    ` : `
      <div class="perf-list" style="padding:0 16px">
        ${(ledger.transactions || []).slice().reverse().slice(0, 40).map((t) => `
          <div class="perf-item"><div>${t.date} · ${t.type} ${t.symbol}</div>
          <div>${t.shares} @ ${U.fmt(t.price)}</div></div>`).join('') || '<p class="psx-muted" style="padding:16px">No paper trades yet.</p>'}
      </div>`}
    <div style="height:24px"></div>`;
    CapMotion.refresh();
  }

  function openSellRow(el) {
    const sym = el?.dataset?.symbol;
    const h = _holdings().find((x) => x.symbol === sym);
    if (h) openSell(h);
  }

  return { render, setTab, openBuy, _submitBuy, openSell, openSellRow, _submitSell, resetLedger };
})();
window.PaperTrade = PaperTrade;
