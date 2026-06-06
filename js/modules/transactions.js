'use strict';
const Transactions = (() => {
  let _filter = 'all';

  const TYPE_META = {
    BUY:          { icon: '📈', cls: 'buy',          label: 'Buy'          },
    SELL:         { icon: '📉', cls: 'sell',         label: 'Sell'         },
    DIVIDEND:     { icon: '💰', cls: 'dividend',     label: 'Dividend'     },
    SALARY:       { icon: '💵', cls: 'salary',       label: 'Salary'       },
    CONTRIBUTION: { icon: '🏦', cls: 'contribution', label: 'Fund Buy'     },
  };

  function fmt(n) {
    if (!n && n !== 0) return '—';
    const abs = Math.abs(n);
    if (abs >= 10000000) return '₨' + (n / 10000000).toFixed(2) + 'cr';
    if (abs >= 100000) return '₨' + (n / 100000).toFixed(1) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function render() {
    const screen = document.getElementById('screen-transactions');
    if (!screen) return;

    const state = State.get();
    const all = (state.transactions || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    const filtered = _filter === 'all' ? all : all.filter(t => t.type === _filter.toUpperCase() || (t.type === 'CONTRIBUTION' && _filter === 'contribution'));

    const grouped = {};
    filtered.forEach(tx => {
      const month = (tx.date || '').slice(0, 7);
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(tx);
    });

    const monthKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    screen.innerHTML = `
    <div style="padding:calc(env(safe-area-inset-top,16px) + 10px) 16px 12px;background:var(--bg2);border-bottom:1px solid var(--bg4);display:flex;align-items:center;justify-content:space-between;">
      <div style="font-size:1.1rem;font-weight:700;">Transactions</div>
      <button class="btn-ghost" onclick="App.openAddTransaction()">+ Add</button>
    </div>

    <div class="filter-tabs">
      ${['all','buy','sell','dividend','salary','contribution'].map(f =>
        `<div class="filter-tab${_filter === f ? ' active' : ''}" data-f="${f}">${f.charAt(0).toUpperCase() + f.slice(1)}</div>`
      ).join('')}
    </div>

    ${filtered.length === 0 ? `<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">No transactions</div><div class="empty-state-sub">Add your first transaction to get started</div></div>` : ''}

    ${monthKeys.map(month => {
      const txs = grouped[month];
      const total = txs.reduce((a, t) => a + (t.amount || 0), 0);
      const label = new Date(month + '-01').toLocaleDateString('en-PK', { month: 'long', year: 'numeric' });
      return `
      <div class="month-group"><span>${label}</span><span>${fmt(total)}</span></div>
      ${txs.map(tx => _txRowHTML(tx)).join('')}`;
    }).join('')}
    <div style="height:8px;"></div>`;

    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => { _filter = tab.dataset.f; render(); });
    });
    document.querySelectorAll('.tx-row[data-id]').forEach(row => {
      row.addEventListener('click', () => _openDetail(row.dataset.id));
    });
  }

  function _txRowHTML(tx) {
    const meta = TYPE_META[tx.type] || { icon: '•', cls: 'buy', label: tx.type };
    const title = tx.symbol ? `${meta.label} ${tx.symbol}` : meta.label;
    const sub = tx.date + (tx.broker ? ` · ${tx.broker}` : '') + (tx.notes ? ` · ${tx.notes}` : '');
    const amtClass = tx.type === 'SELL' || tx.type === 'DIVIDEND' || tx.type === 'SALARY' ? 't-gain' : 't-loss';
    const sign = (tx.type === 'SELL' || tx.type === 'DIVIDEND' || tx.type === 'SALARY') ? '+' : '-';

    return `<div class="tx-row" data-id="${tx.id}">
      <div class="tx-type-dot ${meta.cls}">${meta.icon}</div>
      <div class="tx-left">
        <div class="tx-title">${title}</div>
        <div class="tx-sub">${sub}</div>
      </div>
      <div class="tx-amount ${amtClass}">${sign}${fmt(tx.amount)}</div>
    </div>`;
  }

  function _openDetail(id) {
    const state = State.get();
    const tx = (state.transactions || []).find(t => t.id === id);
    if (!tx) return;

    const meta = TYPE_META[tx.type] || { icon: '•', label: tx.type };
    const fields = [
      ['Type', meta.label],
      tx.symbol ? ['Symbol', tx.symbol] : null,
      tx.broker ? ['Broker', tx.broker] : null,
      ['Date', tx.date],
      ['Amount', '₨' + (tx.amount || 0).toLocaleString()],
      tx.shares ? ['Shares', tx.shares] : null,
      tx.price ? ['Price', '₨' + tx.price] : null,
      tx.units ? ['Units', tx.units.toFixed(4)] : null,
      tx.nav ? ['NAV', '₨' + tx.nav] : null,
      tx.notes ? ['Notes', tx.notes] : null,
    ].filter(Boolean);

    const content = `<div style="padding:0 16px 16px;">
      ${fields.map(([l, v]) => `<div class="detail-stat"><span class="detail-stat-label">${l}</span><span class="detail-stat-value">${v}</span></div>`).join('')}
      <div style="margin-top:16px;">
        <button class="btn-danger" onclick="App.deleteTransaction('${id}')">Delete Transaction</button>
      </div>
    </div>`;

    App.openBottomSheet('tx-detail-sheet', `${meta.icon} ${meta.label}`, content);
  }

  return { render };
})();
window.Transactions = Transactions;
