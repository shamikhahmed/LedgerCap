'use strict';
const App = (() => {
  let _refreshTimer = null;
  let _activeSheet = null;

  function launch() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    Navigation.init();
    Navigation.go('dashboard');
    _scheduleAutoRefresh();
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) _scheduleAutoRefresh();
    });
  }

  function showToast(msg, type) {
    type = type || 'info';
    const wrap = document.getElementById('toast-wrap');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }, 3000);
  }

  async function refreshPrices() {
    const state = State.get();
    const transactions = state.transactions || [];
    const holdings = Ledger.calcHoldings(transactions);
    const symbols = [...new Set(holdings.map(h => h.symbol))];

    if (symbols.length === 0 && !navigator.onLine) {
      showToast('No symbols to refresh', 'warning');
      return;
    }

    showToast(`Fetching ${symbols.length} prices…`, 'info');

    let ok = 0;
    const results = await Prices.fetchAll(symbols, (done, total, sym, success) => {
      if (success) ok++;
    });

    Object.entries(results).forEach(([sym, data]) => {
      State.updatePrice(sym, data);
    });

    const kse = await Prices.fetchKSE100();
    if (kse) State.set('kseIndex', kse);

    const failed = symbols.length - ok;
    if (failed > 0) {
      showToast(`Updated ${ok}/${symbols.length} prices (${failed} failed)`, 'warning');
    } else if (ok > 0) {
      showToast(`All ${ok} prices updated`, 'success');
    } else {
      showToast('Price fetch failed — check connection', 'error');
    }

    renderCurrent();
  }

  function _scheduleAutoRefresh() {
    clearTimeout(_refreshTimer);
    _refreshTimer = setTimeout(() => {
      if (!document.hidden && navigator.onLine) refreshPrices();
    }, 30 * 60 * 1000);

    const state = State.get();
    const allPrices = Object.values(state.prices || {});
    const lastTs = allPrices.length > 0 ? Math.max(...allPrices.map(p => p.ts || 0)) : 0;
    const staleMins = (Date.now() - lastTs) / 60000;
    if (staleMins > 30 && navigator.onLine) {
      setTimeout(refreshPrices, 1500);
    }
  }

  function openBottomSheet(id, title, content) {
    closeBottomSheet();
    const sheet = document.getElementById('bottom-sheet');
    if (!sheet) return;
    document.getElementById('bs-title').textContent = title || '';
    document.getElementById('bs-body').innerHTML = content || '';
    sheet.classList.add('open');
    _activeSheet = id;
    sheet.querySelector('.bs-backdrop').onclick = closeBottomSheet;
  }

  function closeBottomSheet() {
    const sheet = document.getElementById('bottom-sheet');
    if (sheet) sheet.classList.remove('open');
    _activeSheet = null;
  }

  function openAddTransaction(type, symbol, broker) {
    const allSymbols = [
      ...(window.RAFI_STOCKS || []).map(s => ({ symbol: s.symbol, broker: s.broker })),
      ...(window.AKD_STOCKS || []).map(s => ({ symbol: s.symbol, broker: s.broker })),
      ...(window.MEEZAN_FUNDS || []).map(f => ({ symbol: f.symbol, broker: 'Meezan' })),
    ];

    const typeOpts = ['BUY', 'SELL', 'DIVIDEND', 'SALARY', 'CONTRIBUTION'];
    const selType = type || 'BUY';

    const brokers = ['Rafi', 'AKD', 'Meezan', 'Other'];

    const content = `
    <div id="tx-form">
      <div class="type-selector">
        ${typeOpts.map(t => `<div class="type-btn${t === selType ? ' active' : ''}" data-type="${t}">${t}</div>`).join('')}
      </div>
      <div id="tx-fields">${_txFields(selType, symbol, broker, allSymbols, brokers)}</div>
      <button class="btn-primary" onclick="App._submitTransaction()">Add Transaction</button>
    </div>`;

    openBottomSheet('add-tx', 'Add Transaction', content);

    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const t = btn.dataset.type;
        document.getElementById('tx-fields').innerHTML = _txFields(t, symbol, broker, allSymbols, brokers);
      });
    });
  }

  function _txFields(type, symbol, broker, allSymbols, brokers) {
    const symOpts = allSymbols.map(s => `<option value="${s.symbol}" data-broker="${s.broker}"${symbol === s.symbol ? ' selected' : ''}>${s.symbol} (${s.broker})</option>`).join('');
    const brokerOpts = brokers.map(b => `<option value="${b}"${broker === b ? ' selected' : ''}>${b}</option>`).join('');
    const today = new Date().toISOString().slice(0, 10);

    if (type === 'SALARY') {
      return `
        <div class="field"><label class="field-label">Amount (₨)</label><input class="field-input" id="tx-amount" type="number" placeholder="150000"></div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }
    if (type === 'DIVIDEND') {
      return `
        <div class="field"><label class="field-label">Symbol</label><select class="field-select" id="tx-symbol">${symOpts}</select></div>
        <div class="field"><label class="field-label">Amount (₨)</label><input class="field-input" id="tx-amount" type="number" placeholder="5000"></div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }
    if (type === 'CONTRIBUTION') {
      const fundOpts = (window.MEEZAN_FUNDS || []).map(f => `<option value="${f.symbol}"${symbol === f.symbol ? ' selected' : ''}>${f.symbol} — ${f.name}</option>`).join('');
      return `
        <div class="field"><label class="field-label">Fund</label><select class="field-select" id="tx-symbol">${fundOpts}</select></div>
        <div class="field-row">
          <div class="field"><label class="field-label">Units</label><input class="field-input" id="tx-units" type="number" step="0.0001" placeholder="0.0000"></div>
          <div class="field"><label class="field-label">NAV (₨)</label><input class="field-input" id="tx-nav" type="number" step="0.01" placeholder="0.00"></div>
        </div>
        <div class="field"><label class="field-label">Amount (₨)</label><input class="field-input" id="tx-amount" type="number" placeholder="40000"></div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }
    return `
      <div class="field"><label class="field-label">Symbol</label><select class="field-select" id="tx-symbol">${symOpts}</select></div>
      <div class="field"><label class="field-label">Broker</label><select class="field-select" id="tx-broker">${brokerOpts}</select></div>
      <div class="field-row">
        <div class="field"><label class="field-label">Shares</label><input class="field-input" id="tx-shares" type="number" placeholder="100"></div>
        <div class="field"><label class="field-label">Price (₨)</label><input class="field-input" id="tx-price" type="number" step="0.01" placeholder="0.00"></div>
      </div>
      <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
      <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
  }

  function _submitTransaction() {
    const activeTypeBtn = document.querySelector('.type-btn.active');
    if (!activeTypeBtn) return;
    const type = activeTypeBtn.dataset.type;

    const g = id => document.getElementById(id)?.value?.trim() || '';

    const tx = { type, date: g('tx-date') || new Date().toISOString().slice(0, 10) };
    if (g('tx-notes')) tx.notes = g('tx-notes');

    if (type === 'SALARY') {
      const amount = parseFloat(g('tx-amount'));
      if (!amount) { showToast('Enter salary amount', 'error'); return; }
      tx.amount = amount;
    } else if (type === 'DIVIDEND') {
      const sym = g('tx-symbol');
      const amount = parseFloat(g('tx-amount'));
      if (!sym || !amount) { showToast('Fill in symbol and amount', 'error'); return; }
      tx.symbol = sym;
      tx.amount = amount;
    } else if (type === 'CONTRIBUTION') {
      const sym = g('tx-symbol');
      const units = parseFloat(g('tx-units'));
      const nav = parseFloat(g('tx-nav'));
      const amount = parseFloat(g('tx-amount'));
      if (!sym || !units || !amount) { showToast('Fill in fund, units, and amount', 'error'); return; }
      tx.symbol = sym;
      tx.units = units;
      if (nav) tx.nav = nav;
      tx.amount = amount;
      tx.broker = 'Meezan';
    } else {
      const sym = g('tx-symbol');
      const broker = g('tx-broker');
      const shares = parseFloat(g('tx-shares'));
      const price = parseFloat(g('tx-price'));
      if (!sym || !shares || !price) { showToast('Fill in symbol, shares, and price', 'error'); return; }
      tx.symbol = sym;
      tx.broker = broker;
      tx.shares = shares;
      tx.price = price;
      tx.amount = shares * price;
    }

    State.addTransaction(tx);
    closeBottomSheet();
    showToast('Transaction added', 'success');
    renderCurrent();
  }

  function deleteTransaction(id) {
    if (!confirm('Delete this transaction?')) return;
    State.deleteTransaction(id);
    closeBottomSheet();
    showToast('Transaction deleted', 'warning');
    renderCurrent();
  }

  function renderCurrent() {
    Navigation.go(Navigation.current(), true);
  }

  return { launch, showToast, refreshPrices, openBottomSheet, closeBottomSheet,
    openAddTransaction, _submitTransaction, deleteTransaction, renderCurrent };
})();
window.App = App;

document.addEventListener('DOMContentLoaded', App.launch);
