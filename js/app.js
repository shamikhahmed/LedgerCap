'use strict';
const App = (() => {

  function showToast(msg, type = 'info') {
    const wrap = document.getElementById('toast-wrap');
    if (!wrap) return;
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => { if (t.parentNode) t.parentNode.removeChild(t); }, 3200);
  }

  function openPriceModal() {
    const stocks = State.get('stocks') || [];
    const funds  = State.get('funds')  || [];
    const prices = State.get('prices') || {};
    const navs   = State.get('navs')   || {};

    const heldStocks = stocks.filter(s => s.shares > 0);
    const heldFunds  = funds.filter(f => f.units > 0);

    let stockRows = heldStocks.map(s => `
      <div class="price-row">
        <div class="price-symbol">
          ${s.symbol}
          <span style="font-size:0.68rem;color:var(--text3);display:block">${s.broker}</span>
        </div>
        <input class="price-input" data-symbol="${s.symbol}" data-type="stock"
          type="number" step="0.01" placeholder="0.00"
          value="${prices[s.symbol] || s.currentPrice || ''}">
      </div>
    `).join('');

    let fundRows = heldFunds.map(f => `
      <div class="price-row">
        <div class="price-symbol">
          ${f.symbol}
          <span style="font-size:0.68rem;color:var(--text3);display:block">${f.type}</span>
        </div>
        <input class="price-input" data-symbol="${f.symbol}" data-type="fund"
          type="number" step="0.0001" placeholder="0.0000"
          value="${navs[f.symbol] || f.currentNav || ''}">
      </div>
    `).join('');

    const sheet = document.getElementById('price-modal-sheet');
    if (!sheet) return;

    sheet.innerHTML = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div class="modal-title">Update Prices</div>
        <button class="modal-close" onclick="App.closePriceModal()">✕</button>
      </div>
      <div class="modal-body">
        <button class="btn btn-ghost-orange" style="width:100%;margin-bottom:14px" onclick="Stocks.fetchYahoo().then(()=>App.closePriceModal())">
          ☁ Fetch from Yahoo Finance
        </button>

        ${heldStocks.length ? `
          <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--text3);margin-bottom:8px">Stocks (PKR)</div>
          ${stockRows}
        ` : ''}

        ${heldFunds.length ? `
          <div style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--text3);margin:14px 0 8px">Funds / NAV</div>
          ${fundRows}
        ` : ''}

        ${!heldStocks.length && !heldFunds.length ? `
          <div class="empty-state">
            <div class="empty-state-icon">📊</div>
            <div class="empty-state-text">No holdings with shares/units > 0</div>
          </div>
        ` : ''}

        <button class="btn btn-primary" style="margin-top:18px" onclick="App.savePrices()">Save All Prices</button>
      </div>
    `;

    const overlay = document.getElementById('price-modal-overlay');
    if (overlay) overlay.classList.add('active');
  }

  function closePriceModal() {
    const overlay = document.getElementById('price-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  function savePrices() {
    const inputs = document.querySelectorAll('#price-modal-sheet .price-input');
    let count = 0;
    inputs.forEach(inp => {
      const symbol = inp.dataset.symbol;
      const type   = inp.dataset.type;
      const val    = parseFloat(inp.value);
      if (!symbol || isNaN(val) || val <= 0) return;
      if (type === 'stock') State.updatePrice(symbol, val);
      else State.updateNav(symbol, val);
      count++;
    });
    closePriceModal();
    if (Nav.current() === 'overview') Overview.render();
    if (Nav.current() === 'stocks') Stocks.render();
    if (Nav.current() === 'funds') Funds.render();
    showToast(`${count} price${count !== 1 ? 's' : ''} updated`, 'success');
  }

  function launch() {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(e => console.warn('SW:', e));
    }

    // Init navigation — renders first screen
    Nav.init();

    // Refresh overview on app resume
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && Nav.current() === 'overview') Overview.render();
    });

    console.log('StundsOS launched ✓');
  }

  return { launch, showToast, openPriceModal, closePriceModal, savePrices };
})();
window.App = App;

document.addEventListener('DOMContentLoaded', () => App.launch());
