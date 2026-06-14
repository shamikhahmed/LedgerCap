'use strict';
const Transactions = (() => {
  let _filter = 'all';

  const TYPE_META = {
    BUY:            { icon: '📈', cls: 'buy',          label: 'Buy'            },
    SELL:           { icon: '📉', cls: 'sell',         label: 'Sell'           },
    DIVIDEND:       { icon: '💰', cls: 'dividend',     label: 'Dividend'       },
    SALARY:         { icon: '💵', cls: 'salary',       label: 'Salary'         },
    CONTRIBUTION:   { icon: '🏦', cls: 'contribution', label: 'Fund Buy'       },
    IPO_SUBSCRIBE:  { icon: '🚀', cls: 'ipo',          label: 'IPO Subscribe'  },
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

    const filtered = _filter === 'all' ? all : all.filter(t => {
      if (_filter === 'contribution') return t.type === 'CONTRIBUTION';
      if (_filter === 'ipo') return t.type === 'IPO_SUBSCRIBE';
      return t.type === _filter.toUpperCase();
    });

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
      <div style="display:flex;gap:8px;">
        <button class="btn-ghost" onclick="Transactions.exportCsv()" title="Export CSV">⬇ CSV</button>
        <button class="btn-ghost" onclick="App.openAddTransaction()">+ Add</button>
      </div>
    </div>

    <div class="filter-tabs">
      ${['all','buy','sell','dividend','salary','contribution','ipo'].map(f =>
        `<div class="filter-tab${_filter === f ? ' active' : ''}" data-f="${f}">${f === 'ipo' ? 'IPO' : f.charAt(0).toUpperCase() + f.slice(1)}</div>`
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

  function _ipoStatusBadge(tx) {
    if (tx.type !== 'IPO_SUBSCRIBE') return '';
    const listed = tx.status === 'listed';
    return listed
      ? '<span class="badge badge-cdc" style="font-size:0.58rem;margin-left:4px;">LISTED · CDC</span>'
      : '<span class="badge" style="font-size:0.58rem;margin-left:4px;background:rgba(240,185,11,0.12);color:var(--gold);">PENDING</span>';
  }

  function _txRowHTML(tx) {
    const meta = TYPE_META[tx.type] || { icon: '•', cls: 'buy', label: tx.type };
    const title = tx.symbol ? `${meta.label} ${tx.symbol}` : meta.label;
    const statusNote = tx.type === 'IPO_SUBSCRIBE'
      ? (tx.status === 'listed' ? ` · listed ${tx.listedDate || ''}` : ' · awaiting listing')
      : '';
    const sub = tx.date + (tx.broker ? ` · ${tx.broker}` : '') + statusNote + (tx.notes ? ` · ${tx.notes}` : '');
    const amtClass = tx.type === 'SELL' || tx.type === 'DIVIDEND' || tx.type === 'SALARY' ? 't-gain' : 't-loss';
    const sign = (tx.type === 'SELL' || tx.type === 'DIVIDEND' || tx.type === 'SALARY') ? '+' : '-';

    return `<div class="tx-row" data-id="${tx.id}">
      <div class="tx-type-dot ${meta.cls}">${meta.icon}</div>
      <div class="tx-left">
        <div class="tx-title">${title}${_ipoStatusBadge(tx)}</div>
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
    const isPendingIpo = tx.type === 'IPO_SUBSCRIBE' && (tx.status || 'pending') === 'pending';
    const fields = [
      ['Type', meta.label],
      tx.symbol ? ['Symbol', tx.symbol] : null,
      tx.name && tx.name !== tx.symbol ? ['Company', tx.name] : null,
      tx.type === 'IPO_SUBSCRIBE' ? ['Status', tx.status === 'listed' ? 'Listed (CDC)' : 'Pending'] : null,
      tx.broker ? ['Broker', tx.broker] : null,
      ['Date', tx.date],
      ['Amount', '₨' + (tx.amount || 0).toLocaleString()],
      tx.shares ? ['Shares Applied', tx.shares] : null,
      tx.allottedShares ? ['Allotted Shares', tx.allottedShares] : null,
      tx.listingPrice ? ['Listing Price', '₨' + tx.listingPrice] : null,
      tx.listedDate ? ['Listed On', tx.listedDate] : null,
      tx.price ? ['Price', '₨' + tx.price] : null,
      tx.units ? ['Units', tx.units.toFixed(4)] : null,
      tx.nav ? ['NAV', '₨' + tx.nav] : null,
      tx.notes ? ['Notes', tx.notes] : null,
    ].filter(Boolean);

    const listBtn = isPendingIpo
      ? `<button class="btn-primary" style="margin-bottom:8px;" onclick="App.openMarkIpoListed('${id}')">Mark as Listed → CDC</button>`
      : '';

    const content = `<div style="padding:0 16px 16px;">
      ${fields.map(([l, v]) => `<div class="detail-stat"><span class="detail-stat-label">${l}</span><span class="detail-stat-value">${v}</span></div>`).join('')}
      <div style="margin-top:16px;">
        ${listBtn}
        <button class="btn-danger" onclick="App.deleteTransaction('${id}')">Delete Transaction</button>
      </div>
    </div>`;

    App.openBottomSheet('tx-detail-sheet', `${meta.icon} ${meta.label}`, content);
  }

  function exportCsv() {
    const txs = (State.get().transactions || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!txs.length) { App.showToast('No transactions to export', 'error'); return; }
    const headers = ['date', 'type', 'symbol', 'broker', 'shares', 'units', 'amount', 'price', 'notes', 'status'];
    const esc = (v) => {
      const s = v == null ? '' : String(v);
      return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = txs.map(t => headers.map(h => esc(t[h])).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ledgercap-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast(`Exported ${txs.length} transactions`, 'success');
  }

  function openLog() {
    Navigation.go('transactions');
  }

  return { render, exportCsv, openLog };
})();
window.Transactions = Transactions;
