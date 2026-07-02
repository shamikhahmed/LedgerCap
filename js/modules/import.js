'use strict';
const ImportCsv = (() => {
  function _portfolioOptions() {
    if (typeof PortfolioBuckets === 'undefined') return '';
    const custom = PortfolioBuckets.list().filter(p => !p.builtin);
    if (!custom.length) return '';
    const opts = custom.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    return `<div class="field"><label class="field-label">Assign to portfolio (optional)</label>
      <select class="field-select" id="csv-portfolio-id">
        <option value="">Default ledger</option>${opts}
      </select></div>`;
  }

  function render() {
    const screen = document.getElementById('screen-import');
    if (!screen) return;
    screen.innerHTML = PsxUI.lcDash('Import CSV', 'IBKR · Binance · generic trade log', `
      <div class="lc-verdict"><h3>Format</h3><p>Columns: <code>date,symbol,type,quantity,price,broker</code>. Types: BUY, SELL, INTL_BUY, CRYPTO_BUY.</p></div>
      <div class="lc-form-block">
        ${_portfolioOptions()}
        <textarea id="csv-input" class="lc-field-input lc-field-textarea" rows="10" placeholder="date,symbol,type,quantity,price,broker&#10;2026-01-15,AAPL,INTL_BUY,10,195,IBKR" aria-label="CSV rows"></textarea>
        <button type="button" class="psx-btn psx-btn-primary" style="width:100%;margin-top:12px" data-action="ImportCsv._run">Import rows</button>
        <p id="csv-result" style="margin-top:12px;font-size:13px;color:var(--psx-text-3)"></p>
      </div>
    `);
  }

  function _parseLine(line) {
    const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    if (parts.length < 4) return null;
    let [date, symbol, type, qty, price, broker] = parts;
    // Sanitize identity fields at the import boundary — they are later
    // interpolated into innerHTML across the app.
    symbol = String(symbol || '').replace(/[^A-Za-z0-9.\-:]/g, '').slice(0, 16);
    broker = String(broker || '').replace(/[<>"'&]/g, '').slice(0, 32);
    if (!date || !symbol || date === 'date') return null;
    const t = (type || 'BUY').toUpperCase();
    const quantity = parseFloat(qty) || 0;
    const px = parseFloat(price) || 0;
    if (!quantity) return null;
    if (t === 'INTL_BUY' || t === 'INTL_SELL') {
      return { type: t, date, symbol: symbol.toUpperCase(), assetClass: 'intl', shares: quantity, qty: quantity, priceUsd: px, costUsd: quantity * px, broker: broker || 'IBKR', currency: 'USD' };
    }
    if (t === 'CRYPTO_BUY' || t === 'CRYPTO_SELL') {
      return { type: t, date, symbol: symbol.toUpperCase(), assetClass: 'crypto', qty: quantity, shares: quantity, priceUsd: px, costUsd: quantity * px, broker: broker || 'Binance', currency: 'USD' };
    }
    if (t === 'BUY' || t === 'SELL') {
      return { type: t, date, symbol: symbol.toUpperCase(), shares: quantity, price: px, amount: quantity * px, broker: broker || 'CDC' };
    }
    return null;
  }

  function _run() {
    const raw = document.getElementById('csv-input')?.value || '';
    const portfolioId = document.getElementById('csv-portfolio-id')?.value || '';
    let n = 0;
    raw.split(/\r?\n/).filter(Boolean).forEach(line => {
      const tx = _parseLine(line);
      if (tx) {
        if (portfolioId) tx.portfolioId = portfolioId;
        State.addTransaction(tx);
        n++;
      }
    });
    const el = document.getElementById('csv-result');
    if (el) el.textContent = n ? `Imported ${n} transactions${portfolioId ? ' into custom portfolio' : ''}.` : 'No valid rows found.';
    if (n && typeof App !== 'undefined') App.renderCurrent();
  }

  return { render, _run };
})();
window.ImportCsv = ImportCsv;
