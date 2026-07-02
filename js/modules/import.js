'use strict';
const ImportCsv = (() => {
  let _pending = [];

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
    _pending = [];
    screen.innerHTML = PsxUI.lcDash('Import CSV', 'IBKR · Binance · generic trade log', `
      <div class="lc-verdict"><h3>Format</h3><p>Columns: <code>date,symbol,type,quantity,price,broker</code>. Types: BUY, SELL, INTL_BUY, CRYPTO_BUY.</p></div>
      <div class="lc-form-block">
        ${_portfolioOptions()}
        <textarea id="csv-input" class="lc-field-input lc-field-textarea" rows="10" placeholder="date,symbol,type,quantity,price,broker&#10;2026-01-15,AAPL,INTL_BUY,10,195,IBKR" aria-label="CSV rows"></textarea>
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
          <button type="button" class="psx-btn psx-btn-ghost" data-action="ImportCsv._preview">Preview</button>
          <button type="button" class="psx-btn psx-btn-primary" data-action="ImportCsv._confirm" id="csv-import-btn" disabled>Import ${_pending.length || ''}</button>
        </div>
        <div id="csv-preview" class="lc-csv-preview" aria-live="polite"></div>
        <p id="csv-result" style="margin-top:12px;font-size:13px;color:var(--psx-text-3)"></p>
      </div>
    `);
  }

  function _parseLine(line) {
    const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    if (parts.length < 4) return null;
    let [date, symbol, type, qty, price, broker] = parts;
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

  function _parseAll() {
    const raw = document.getElementById('csv-input')?.value || '';
    return raw.split(/\r?\n/).filter(Boolean).map(_parseLine).filter(Boolean);
  }

  function _preview() {
    _pending = _parseAll();
    const el = document.getElementById('csv-preview');
    const btn = document.getElementById('csv-import-btn');
    if (btn) {
      btn.disabled = !_pending.length;
      btn.textContent = _pending.length ? `Import ${_pending.length} rows` : 'Import';
    }
    if (!el) return;
    if (!_pending.length) {
      el.innerHTML = '<p class="lc-empty-note">No valid rows — check header and columns.</p>';
      return;
    }
    el.innerHTML = `<table class="psx-table"><thead><tr><th>Date</th><th>Symbol</th><th>Type</th><th>Qty</th><th>Price</th><th>Broker</th></tr></thead><tbody>
      ${_pending.slice(0, 20).map((t) => `<tr><td>${t.date}</td><td>${t.symbol}</td><td>${t.type}</td><td>${t.shares ?? t.qty ?? ''}</td><td>${t.price ?? t.priceUsd ?? ''}</td><td>${t.broker || ''}</td></tr>`).join('')}
      </tbody></table>${_pending.length > 20 ? `<p class="lc-empty-note">+${_pending.length - 20} more rows</p>` : ''}`;
  }

  function _confirm() {
    if (!_pending.length) {
      _preview();
      if (!_pending.length) return;
    }
    const portfolioId = document.getElementById('csv-portfolio-id')?.value || '';
    _pending.forEach((tx) => {
      if (portfolioId) tx.portfolioId = portfolioId;
      State.addTransaction(tx);
    });
    const n = _pending.length;
    _pending = [];
    const el = document.getElementById('csv-result');
    if (el) el.textContent = n ? `Imported ${n} transactions${portfolioId ? ' into custom portfolio' : ''}.` : 'No valid rows found.';
    if (n && typeof App !== 'undefined') App.renderCurrent();
    render();
  }

  function _run() {
    _preview();
    _confirm();
  }

  return { render, _preview, _confirm, _run };
})();
window.ImportCsv = ImportCsv;
