'use strict';
const ImportCsv = (() => {
  function render() {
    const screen = document.getElementById('screen-import');
    if (!screen) return;
    screen.innerHTML = `
      ${PsxUI.strip()}
      ${PsxUI.pageTitle('Import CSV', 'IBKR · Binance · generic trade log')}
      <div class="psx-analyze" style="margin:16px">
        <p>Paste CSV with columns: <code>date,symbol,type,quantity,price,broker</code> or IBKR/Binance export. Types: BUY, SELL, INTL_BUY, CRYPTO_BUY.</p>
      </div>
      <div style="padding:0 16px">
        <textarea id="csv-input" class="field-input" rows="8" placeholder="date,symbol,type,quantity,price,broker&#10;2026-01-15,AAPL,INTL_BUY,10,195,IBKR"></textarea>
        <button type="button" class="psx-btn psx-btn-primary" style="width:100%;margin-top:12px" onclick="ImportCsv._run()">Import rows</button>
        <p id="csv-result" class="psx-muted" style="margin-top:12px;font-size:13px"></p>
      </div>`;
  }

  function _parseLine(line) {
    const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    if (parts.length < 4) return null;
    const [date, symbol, type, qty, price, broker] = parts;
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
    const lines = raw.split(/\r?\n/).filter(Boolean);
    let n = 0;
    lines.forEach(line => {
      const tx = _parseLine(line);
      if (tx) { State.addTransaction(tx); n++; }
    });
    const el = document.getElementById('csv-result');
    if (el) el.textContent = n ? `Imported ${n} transactions.` : 'No valid rows found.';
    if (n && typeof App !== 'undefined') App.renderCurrent();
  }

  return { render, _run };
})();
window.ImportCsv = ImportCsv;
