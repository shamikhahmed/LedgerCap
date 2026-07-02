'use strict';
const Transactions = (() => {
  let _filter = 'all';
  let _showInternal = false;

  function fmt(n) {
    if (typeof PsxUI !== 'undefined') return PsxUI.fmt(n);
    if (!n && n !== 0) return '—';
    return '₨' + Number(n).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function setFilter(f, opts) {
    opts = opts || {};
    _filter = f || 'all';
    if (opts.showInternal != null) _showInternal = opts.showInternal;
    render();
  }

  function openSymbol(symbol) {
    _filter = 'sym:' + String(symbol || '').toUpperCase();
    Navigation.go('transactions');
    render();
  }

  function openBucket(bucketId) {
    _filter = 'bucket:' + bucketId;
    Navigation.go('transactions');
    render();
  }

  function render() {
    const screen = document.getElementById('screen-transactions');
    if (!screen) return;

    const state = State.get();
    const all = state.transactions || [];
    const TL = TransactionLedger;
    const sum = TL.summary(all);
    const filtered = TL.filterTxs(all, { filter: _filter, showInternal: _showInternal })
      .sort((a, b) => (b.date || '').localeCompare(a.date || '') || String(b.id).localeCompare(String(a.id)));

    const filterLabel = _filter.startsWith('sym:') ? _filter.slice(4)
      : _filter.startsWith('bucket:') ? (PortfolioBuckets.BUILTIN.find(b => b.id === _filter.slice(7))?.name || _filter.slice(7))
      : null;

    const grouped = {};
    filtered.forEach(tx => {
      const month = (tx.date || '').slice(0, 7);
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(tx);
    });
    const monthKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    const filters = [
      ['all', 'All'], ['buy', 'Buy'], ['sell', 'Sell'], ['dividend', 'Dividends'],
      ['tax', 'Tax'], ['fee', 'Fees'], ['deposit', 'Cash in'], ['fund', 'Funds'], ['global', 'US/Crypto'],
    ];

    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head lc-screen-head--row">
        <div>
          <h1>Transactions</h1>
          <p>${filtered.length} of ${sum.count} entries${filterLabel ? ` · ${filterLabel}` : ''}${_showInternal ? ' · incl. internal' : ''}</p>
        </div>
        <button type="button" class="lc-section-action" onclick="App.openAddTransaction()">+ Add</button>
      </div>

      <div class="lc-pulse-row">
        <div class="lc-pulse-pill"><label>Cash in</label><b class="psx-up">${fmt(sum.inflow)}</b></div>
        <div class="lc-pulse-pill"><label>Cash out</label><b class="psx-down">${fmt(sum.outflow)}</b></div>
        <div class="lc-pulse-pill"><label>Net flow</label><b class="${sum.net >= 0 ? 'psx-up' : 'psx-down'}">${sum.net >= 0 ? '+' : '−'}${fmt(Math.abs(sum.net))}</b></div>
        <div class="lc-pulse-pill"><label>Dividends</label><b class="psx-up">${fmt(sum.loggedDividends)}</b></div>
        <div class="lc-pulse-pill"><label>Taxes</label><b>${fmt(sum.taxes)}</b></div>
        <div class="lc-pulse-pill"><label>Fees</label><b>${fmt(sum.fees)}</b></div>
      </div>

      <div class="lc-filter-bar cap-reveal" style="border-top:none;padding-top:0">
        <div class="lc-pill-group" style="margin-left:0;width:100%;flex-wrap:wrap">
          ${filters.map(([f, label]) =>
            `<button type="button" class="lc-view-pill${_filter === f ? ' active' : ''}" data-f="${f}">${label}</button>`
          ).join('')}
          <button type="button" class="lc-view-pill${_showInternal ? ' active' : ''}" data-internal="1">Internal</button>
        </div>
        <button type="button" class="lc-section-action" onclick="Transactions.exportCsv()" style="margin-left:auto">Export CSV</button>
      </div>

      ${filterLabel ? `<div class="lc-dash-actions"><button type="button" class="psx-btn psx-btn-ghost" onclick="Transactions.setFilter('all')">Clear filter</button></div>` : ''}

      ${!filtered.length ? `<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">No transactions</div><div class="empty-state-sub">Try another filter or add a transaction</div></div>` : ''}

      ${monthKeys.map(month => {
        const txs = grouped[month];
        const net = txs.reduce((a, t) => a + TL.signedFlow(t), 0);
        const monthTax = txs.filter(t => t.type === 'TAX').reduce((s, t) => s + (t.amount || 0), 0);
        const monthFee = txs.filter(t => t.type === 'FEE').reduce((s, t) => s + (t.amount || 0), 0);
        const label = new Date(month + '-01').toLocaleDateString('en-PK', { month: 'long', year: 'numeric' });
        return `
        <div class="month-group">
          <span>${label}</span>
          <span title="Net cash flow">${fmt(net)}${monthTax + monthFee > 0 ? ` · tax/fees ${fmt(monthTax + monthFee)}` : ''}</span>
        </div>
        ${txs.map(tx => _txRowHTML(tx, all)).join('')}`;
      }).join('')}
    </div>`;

    document.querySelectorAll('[data-f]').forEach(tab => {
      tab.addEventListener('click', () => { _filter = tab.dataset.f; render(); });
    });
    document.querySelectorAll('[data-internal]').forEach(btn => {
      btn.addEventListener('click', () => { _showInternal = !_showInternal; render(); });
    });
    document.querySelectorAll('.tx-row[data-id]').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.tx-link')) return;
        _openDetail(row.dataset.id);
      });
    });
    document.querySelectorAll('.tx-link[data-sym]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        Navigation.go('research');
        Research.open(el.dataset.sym);
      });
    });
  }

  function _ipoStatusBadge(tx) {
    if (tx.type !== 'IPO_SUBSCRIBE') return '';
    const listed = tx.status === 'listed';
    return listed
      ? '<span class="badge badge-cdc" style="font-size:0.58rem;margin-left:4px;">LISTED · CDC</span>'
      : '<span class="badge" style="font-size:0.58rem;margin-left:4px;background:rgba(240,185,11,0.12);color:var(--gold);">PENDING</span>';
  }

  function _txRowHTML(tx, all) {
    const TL = TransactionLedger;
    const m = TL.meta(tx);
    const title = TL.title(tx);
    const flow = TL.signedFlow(tx);
    const amt = TL.formatAmount(tx);
    const bucket = TL.bucketName(tx);
    const internalTag = tx.internal ? '<span class="tx-tag tx-tag--internal">internal</span>' : '';
    const custodialTag = tx.custodial ? '<span class="tx-tag tx-tag--custodial">custodial</span>' : '';
    const symLink = tx.symbol
      ? `<button type="button" class="tx-link" data-sym="${esc(tx.symbol)}">${esc(tx.symbol)}</button>`
      : '';

    let amtClass = 't-muted';
    let sign = '';
    if (flow > 0) { amtClass = 't-gain'; sign = '+'; }
    else if (flow < 0) { amtClass = 't-loss'; sign = '−'; }
    else if (tx.type === 'TAX' || tx.type === 'FEE') { amtClass = 't-loss'; sign = '−'; }

    const sub = [
      tx.date,
      esc(bucket),
      tx.broker && tx.broker !== bucket ? esc(tx.broker) : null,
      symLink,
      tx.shares ? `${tx.shares} sh` : null,
      tx.units ? `${Number(tx.units).toFixed(2)} units` : null,
      tx.notes ? esc(tx.notes.slice(0, 48)) : null,
    ].filter(Boolean).join(' · ');

    return `<div class="tx-row" data-id="${esc(tx.id)}">
      <div class="tx-type-dot ${m.cls}">${typeof LcIcons !== 'undefined' ? LcIcons.icon(m.icon, 14) : ''}</div>
      <div class="tx-left">
        <div class="tx-title">${esc(title)}${_ipoStatusBadge(tx)} ${internalTag}${custodialTag}</div>
        <div class="tx-sub">${sub}</div>
      </div>
      <div class="tx-amount ${amtClass}">${flow !== 0 ? sign : ''}${amt}</div>
    </div>`;
  }

  function _openDetail(id) {
    const state = State.get();
    const all = state.transactions || [];
    const tx = all.find(t => t.id === id);
    if (!tx) return;

    const TL = TransactionLedger;
    const m = TL.meta(tx);
    const related = TL.relatedTxs(tx, all);
    const fields = [
      ['Type', m.label + (TL.chargeLabel(tx) ? ` (${TL.chargeLabel(tx)})` : '')],
      ['Portfolio', TL.bucketName(tx)],
      tx.symbol ? ['Symbol', tx.symbol] : null,
      tx.name && tx.name !== tx.symbol ? ['Company', tx.name] : null,
      tx.type === 'IPO_SUBSCRIBE' ? ['Status', tx.status === 'listed' ? 'Listed (CDC)' : 'Pending'] : null,
      tx.broker ? ['Broker', tx.broker] : null,
      ['Date', tx.date],
      ['Amount', TL.formatAmount(tx)],
      tx.costUsd != null ? ['Cost USD', '$' + Number(tx.costUsd).toFixed(2)] : null,
      tx.shares ? ['Shares', tx.shares] : null,
      tx.allottedShares ? ['Allotted', tx.allottedShares] : null,
      tx.price ? ['Price', '₨' + tx.price] : null,
      tx.priceUsd ? ['Price USD', '$' + tx.priceUsd] : null,
      tx.units ? ['Units', tx.units.toFixed(4)] : null,
      tx.nav ? ['NAV', '₨' + tx.nav] : null,
      tx.chargeType ? ['Charge', TL.chargeLabel(tx)] : null,
      tx.relatedId ? ['Linked tx', tx.relatedId] : null,
      tx.internal ? ['Internal', 'Yes — fund convert / ROC'] : null,
      tx.notes ? ['Notes', tx.notes] : null,
    ].filter(Boolean);

    const links = [];
    if (tx.symbol) links.push(`<button type="button" class="psx-btn psx-btn-ghost" onclick="App.closeBottomSheet();Navigation.go('research');Research.open('${tx.symbol}')">Research ${tx.symbol}</button>`);
    links.push(`<button type="button" class="psx-btn psx-btn-ghost" onclick="App.closeBottomSheet();Transactions.openSymbol('${tx.symbol || ''}')">All ${tx.symbol || 'bucket'} txs</button>`);
    const bid = TL.bucketId(tx);
    if (bid) links.push(`<button type="button" class="psx-btn psx-btn-ghost" onclick="App.closeBottomSheet();Transactions.openBucket('${bid}')">Portfolio txs</button>`);

    const relatedHtml = related.length ? `
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--lc-border)">
        <p style="font-size:0.72rem;font-weight:700;margin-bottom:8px;color:var(--text2)">Linked transactions</p>
        ${related.map(r => `<div class="detail-stat" style="cursor:pointer" onclick="App.closeBottomSheet();Transactions._openDetail('${r.id}')">
          <span class="detail-stat-label">${r.date} · ${TL.title(r)}</span>
          <span class="detail-stat-value">${TL.formatAmount(r)}</span>
        </div>`).join('')}
      </div>` : '';

    const isPendingIpo = tx.type === 'IPO_SUBSCRIBE' && (tx.status || 'pending') === 'pending';
    const listBtn = isPendingIpo
      ? `<button type="button" class="btn-primary" style="margin-bottom:8px;" onclick="App.openMarkIpoListed('${id}')">Mark as Listed → CDC</button>`
      : '';

    const content = `<div style="padding:0 16px 16px;">
      ${fields.map(([l, v]) => `<div class="detail-stat"><span class="detail-stat-label">${l}</span><span class="detail-stat-value">${v}</span></div>`).join('')}
      ${relatedHtml}
      <div style="margin-top:16px;display:flex;flex-wrap:wrap;gap:8px">${links.join('')}</div>
      <div style="margin-top:16px;">
        ${listBtn}
        <button type="button" class="btn-danger" onclick="App.deleteTransaction('${id}')">Delete Transaction</button>
      </div>
    </div>`;

    App.openBottomSheet('tx-detail-sheet', TL.title(tx), content);
  }

  function exportCsv() {
    const txs = (State.get().transactions || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    if (!txs.length) { App.showToast('No transactions to export', 'error'); return; }
    const headers = ['date', 'type', 'symbol', 'broker', 'shares', 'units', 'amount', 'costUsd', 'price', 'priceUsd', 'chargeType', 'relatedId', 'internal', 'custodial', 'notes', 'status'];
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

  return { render, exportCsv, openLog, setFilter, openSymbol, openBucket, _openDetail };
})();
window.Transactions = Transactions;
