'use strict';
const Stocks = (() => {
  let _filter = 'All';
  let _sort = 'value';
  let _search = '';
  let _detailStock = null;

  function fmtPKR(n) {
    if (!n || isNaN(n)) return '₨0';
    if (n >= 1e7) return '₨' + (n/1e7).toFixed(2) + 'Cr';
    if (n >= 1e5) return '₨' + (n/1e5).toFixed(1) + 'L';
    if (n >= 1e3) return '₨' + (n/1e3).toFixed(0) + 'K';
    return '₨' + Math.round(n).toLocaleString();
  }

  function ratingClass(r) {
    if (!r) return '';
    if (r === 'STRONG BUY') return 'rating-strong-buy';
    if (r === 'BUY') return 'rating-buy';
    if (r === 'HOLD') return 'rating-hold';
    if (r === 'WEAK HOLD') return 'rating-weak-hold';
    if (r === 'SPECULATIVE') return 'rating-speculative';
    return '';
  }

  function getFiltered(stocks) {
    let list = stocks.filter(s => !s.units && s.units !== 0 ? true : !s.units);
    // Only show equities (not funds)
    list = stocks.filter(s => s.shares !== undefined);

    if (_search) {
      const q = _search.toLowerCase();
      list = list.filter(s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
    }

    if (_filter === 'Rafi') list = list.filter(s => s.broker === 'Rafi');
    else if (_filter === 'AKD') list = list.filter(s => s.broker === 'AKD');
    else if (_filter === 'Shariah') list = list.filter(s => s.isShariah);
    else if (_filter === 'Held') list = list.filter(s => s.shares > 0);
    else if (_filter === 'Top Gainers') {
      list = list.filter(s => s.shares > 0 && s.currentPrice > 0 && s.avgCost > 0);
      list.sort((a, b) => ((b.currentPrice - b.avgCost)/b.avgCost) - ((a.currentPrice - a.avgCost)/a.avgCost));
      return list.slice(0, 10);
    } else if (_filter === 'Top Losers') {
      list = list.filter(s => s.shares > 0 && s.currentPrice > 0 && s.avgCost > 0);
      list.sort((a, b) => ((a.currentPrice - a.avgCost)/a.avgCost) - ((b.currentPrice - b.avgCost)/b.avgCost));
      return list.slice(0, 10);
    }

    if (_sort === 'value') {
      list.sort((a, b) => (b.shares*b.currentPrice) - (a.shares*a.currentPrice));
    } else if (_sort === 'pnl') {
      list.sort((a, b) => {
        const pa = a.avgCost > 0 ? (a.currentPrice - a.avgCost)/a.avgCost : 0;
        const pb = b.avgCost > 0 ? (b.currentPrice - b.avgCost)/b.avgCost : 0;
        return pb - pa;
      });
    } else if (_sort === 'name') {
      list.sort((a, b) => a.symbol.localeCompare(b.symbol));
    }

    return list;
  }

  function renderRow(s) {
    const val = s.shares * (s.currentPrice || 0);
    const cost = s.shares * (s.avgCost || 0);
    const pnl = val - cost;
    const pnlPct = cost > 0 ? (pnl / cost * 100) : 0;
    const pnlColor = pnl >= 0 ? 'var(--green)' : 'var(--red)';
    const rating = (window.ADVISOR_RATINGS || {})[s.symbol];
    const brokerBadge = s.broker === 'Rafi' ? 'badge-rafi' : 'badge-akd';

    return `
      <div class="holding-row card-press" onclick="Stocks.openDetail('${s.id}')">
        <div class="holding-left">
          <div class="row" style="gap:6px;margin-bottom:3px">
            <span class="holding-name">${s.symbol}</span>
            <span class="badge ${brokerBadge}">${s.broker}</span>
            ${rating ? `<span class="rating-badge ${ratingClass(rating.rating)}">${rating.rating}</span>` : ''}
          </div>
          <div class="holding-sub">${s.name}</div>
          <div class="holding-sub" style="margin-top:1px">${s.shares > 0 ? s.shares + ' × ₨' + (s.avgCost||0).toFixed(0) : 'Not held'}</div>
        </div>
        <div class="holding-right">
          ${s.shares > 0 ? `
            <div class="holding-value">${fmtPKR(val)}</div>
            <div class="holding-pnl" style="color:${pnlColor}">${pnl>=0?'+':''}${fmtPKR(Math.abs(pnl))} (${pnlPct>=0?'+':''}${pnlPct.toFixed(1)}%)</div>
          ` : `<div class="holding-value" style="color:var(--text3)">Watch</div>`}
          <div style="font-size:0.7rem;color:var(--text3);text-align:right;margin-top:2px">${s.currentPrice ? '₨' + s.currentPrice.toFixed(2) : '—'}</div>
        </div>
      </div>
    `;
  }

  function render() {
    const el = document.getElementById('screen-stocks');
    if (!el) return;

    const stocks = State.get('stocks') || [];
    const filtered = getFiltered(stocks);
    const heldCount = stocks.filter(s => s.shares > 0).length;
    const totalVal = State.calcStocksValue();

    el.innerHTML = `
      <div class="screen-header">
        <div class="row-between">
          <div>
            <div class="screen-title">Stocks</div>
            <div class="screen-subtitle">${heldCount} positions · ${Charts.fmtPKR(totalVal)}</div>
          </div>
          <button class="btn btn-icon" onclick="Stocks.openAddForm()" title="Add stock">+</button>
        </div>
      </div>

      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input class="search-input" id="stock-search" placeholder="Search symbol or name…" value="${_search}"
          oninput="Stocks._onSearch(this.value)">
      </div>

      <div class="chips-wrap" id="filter-chips">
        ${['All','Held','Rafi','AKD','Shariah','Top Gainers','Top Losers'].map(f =>
          `<div class="chip${_filter===f?' active':''}" onclick="Stocks._setFilter('${f}')">${f}</div>`
        ).join('')}
      </div>

      <div style="padding:4px 18px 8px;display:flex;gap:8px;align-items:center">
        <span style="font-size:0.72rem;color:var(--text3)">Sort:</span>
        ${[['value','By Value'],['pnl','By P&L%'],['name','A-Z']].map(([v,l]) =>
          `<span class="chip${_sort===v?' active':''}" onclick="Stocks._setSort('${v}')" style="padding:4px 10px;font-size:0.7rem">${l}</span>`
        ).join('')}
      </div>

      <div style="padding:0 18px">
        <div class="card" style="padding:0 18px">
          <div id="stocks-list">
            ${filtered.length ? filtered.map(renderRow).join('') : '<div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-text">No stocks match filter</div></div>'}
          </div>
        </div>
      </div>

      <div style="padding:18px;display:flex;gap:8px">
        <button class="btn btn-ghost" style="flex:1" onclick="App.openPriceModal()">↻ Update Prices</button>
        <button class="btn btn-ghost-orange" style="flex:1" onclick="Stocks.fetchYahoo()">☁ Yahoo Finance</button>
      </div>
    `;
  }

  function _setFilter(f) {
    _filter = f;
    render();
  }

  function _setSort(s) {
    _sort = s;
    render();
  }

  function _onSearch(v) {
    _search = v;
    render();
  }

  function openDetail(id) {
    const stocks = State.get('stocks') || [];
    const s = stocks.find(x => x.id === id);
    if (!s) return;
    _detailStock = s;

    const val = s.shares * (s.currentPrice || 0);
    const cost = s.shares * (s.avgCost || 0);
    const pnl = val - cost;
    const pnlPct = cost > 0 ? (pnl / cost * 100) : 0;
    const pnlColor = pnl >= 0 ? 'var(--green)' : 'var(--red)';
    const rating = (window.ADVISOR_RATINGS || {})[s.symbol];
    const brokerBadge = s.broker === 'Rafi' ? 'badge-rafi' : 'badge-akd';

    let convictionDots = '';
    if (rating) {
      for (let i = 1; i <= 10; i++) {
        convictionDots += `<div class="conviction-dot${i <= rating.conviction ? ' filled' : ''}"></div>`;
      }
    }

    const html = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div>
          <div class="modal-title">${s.symbol}</div>
          <div style="font-size:0.78rem;color:var(--text3)">${s.name}</div>
        </div>
        <button class="modal-close" onclick="Stocks.closeDetail()">✕</button>
      </div>
      <div class="modal-body">
        <div style="margin-bottom:16px">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <span class="badge ${brokerBadge}">${s.broker}</span>
            <span class="badge badge-${s.sector.toLowerCase().replace(/[^a-z]/g,'')}" style="background:rgba(255,255,255,0.05);border:1px solid var(--border);color:var(--text2)">${s.sector}</span>
            ${s.isShariah ? '<span class="badge badge-shariah">☪ Shariah</span>' : ''}
            ${rating ? `<span class="rating-badge ${ratingClass(rating.rating)}">${rating.rating}</span>` : ''}
          </div>
        </div>

        ${s.currentPrice ? `<div class="detail-price">₨${s.currentPrice.toFixed(2)}</div>` : '<div style="color:var(--text3);font-size:0.85rem">No price set — tap Update Price</div>'}

        ${s.shares > 0 ? `
          <div class="card" style="margin-top:14px">
            <div class="row-between"><span class="t-sub">Shares</span><span class="bold">${s.shares.toLocaleString()}</span></div>
            <div class="divider" style="margin:10px 0"></div>
            <div class="row-between"><span class="t-sub">Avg cost</span><span class="bold">₨${(s.avgCost||0).toFixed(2)}</span></div>
            <div class="divider" style="margin:10px 0"></div>
            <div class="row-between"><span class="t-sub">Market value</span><span class="bold">${Charts.fmtPKR(val)}</span></div>
            <div class="divider" style="margin:10px 0"></div>
            <div class="row-between"><span class="t-sub">P&L</span><span class="bold" style="color:${pnlColor}">${pnl>=0?'+':''}${Charts.fmtPKR(Math.abs(pnl))} (${pnlPct>=0?'+':''}${pnlPct.toFixed(2)}%)</span></div>
          </div>
        ` : ''}

        ${rating ? `
          <div class="card" style="margin-top:12px">
            <div class="t-label" style="margin-bottom:8px">Advisor Analysis</div>
            <div class="row-between" style="margin-bottom:8px">
              <span class="rating-badge ${ratingClass(rating.rating)}">${rating.rating}</span>
              ${rating.target ? `<span class="dividend-chip">Target ₨${rating.target}</span>` : ''}
            </div>
            <div style="font-size:0.78rem;color:var(--text2);line-height:1.6">${rating.thesis}</div>
            <div style="margin-top:10px">
              <div style="font-size:0.68rem;color:var(--text3);margin-bottom:4px">Conviction ${rating.conviction}/10</div>
              <div class="conviction-bar">${convictionDots}</div>
            </div>
          </div>
        ` : ''}

        <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px">
          <button class="btn btn-ghost" onclick="Stocks.openEditForm('${s.id}')">Edit shares / avg cost</button>
          <button class="btn btn-ghost-orange" onclick="Stocks.quickPrice('${s.id}')">Update price</button>
        </div>
      </div>
    `;

    const overlay = document.getElementById('stock-detail-overlay');
    const sheet = document.getElementById('stock-detail-sheet');
    if (!overlay || !sheet) return;
    sheet.innerHTML = html;
    overlay.classList.add('active');
  }

  function closeDetail() {
    const overlay = document.getElementById('stock-detail-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  function openEditForm(id) {
    const stocks = State.get('stocks') || [];
    const s = stocks.find(x => x.id === id);
    if (!s) return;

    const html = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div class="modal-title">Edit ${s.symbol}</div>
        <button class="modal-close" onclick="Stocks.closeEdit()">✕</button>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">Shares</label>
          <input class="input-field" id="edit-shares" type="number" value="${s.shares || 0}" placeholder="0">
        </div>
        <div class="input-group">
          <label class="input-label">Average Cost (₨)</label>
          <input class="input-field" id="edit-avgcost" type="number" step="0.01" value="${s.avgCost || 0}" placeholder="0.00">
        </div>
        <div class="input-group">
          <label class="input-label">Current Price (₨)</label>
          <input class="input-field" id="edit-price" type="number" step="0.01" value="${s.currentPrice || 0}" placeholder="0.00">
        </div>
        <button class="btn btn-primary" onclick="Stocks.saveEdit('${s.id}')">Save Changes</button>
      </div>
    `;

    const overlay = document.getElementById('edit-form-overlay');
    const sheet = document.getElementById('edit-form-sheet');
    if (!overlay || !sheet) return;
    sheet.innerHTML = html;
    overlay.classList.add('active');
    closeDetail();
  }

  function closeEdit() {
    const overlay = document.getElementById('edit-form-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  function saveEdit(id) {
    const shares = parseFloat(document.getElementById('edit-shares')?.value) || 0;
    const avgCost = parseFloat(document.getElementById('edit-avgcost')?.value) || 0;
    const price = parseFloat(document.getElementById('edit-price')?.value) || 0;

    State.update(s => {
      const stock = s.stocks.find(x => x.id === id);
      if (!stock) return;
      stock.shares = shares;
      stock.avgCost = avgCost;
      if (price > 0) {
        stock.currentPrice = price;
        s.prices[stock.symbol] = price;
      }
    });

    closeEdit();
    render();
    App.showToast('Position updated', 'success');
  }

  function quickPrice(id) {
    const stocks = State.get('stocks') || [];
    const s = stocks.find(x => x.id === id);
    if (!s) return;

    const price = prompt(`Enter current price for ${s.symbol} (₨):`);
    if (price === null) return;
    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) { App.showToast('Invalid price', 'error'); return; }

    State.updatePrice(s.symbol, p);
    closeDetail();
    render();
    App.showToast(`${s.symbol} updated to ₨${p.toFixed(2)}`, 'success');
  }

  function openAddForm() {
    const html = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div class="modal-title">Add Stock</div>
        <button class="modal-close" onclick="Stocks.closeAdd()">✕</button>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">Symbol</label>
          <input class="input-field" id="add-symbol" placeholder="e.g. ENGRO" style="text-transform:uppercase">
        </div>
        <div class="input-group">
          <label class="input-label">Company Name</label>
          <input class="input-field" id="add-name" placeholder="e.g. Engro Corporation">
        </div>
        <div class="input-group">
          <label class="input-label">Broker</label>
          <select class="input-field" id="add-broker">
            <option value="Rafi">Rafi</option>
            <option value="AKD">AKD</option>
          </select>
        </div>
        <div class="input-group">
          <label class="input-label">Sector</label>
          <input class="input-field" id="add-sector" placeholder="e.g. Cement">
        </div>
        <div class="input-group">
          <label class="input-label">Shares</label>
          <input class="input-field" id="add-shares" type="number" placeholder="0">
        </div>
        <div class="input-group">
          <label class="input-label">Average Cost (₨)</label>
          <input class="input-field" id="add-cost" type="number" step="0.01" placeholder="0.00">
        </div>
        <div class="input-group">
          <label class="input-label">Shariah Compliant?</label>
          <select class="input-field" id="add-shariah">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <button class="btn btn-primary" onclick="Stocks.saveAdd()">Add Stock</button>
      </div>
    `;

    const overlay = document.getElementById('add-form-overlay');
    const sheet = document.getElementById('add-form-sheet');
    if (!overlay || !sheet) return;
    sheet.innerHTML = html;
    overlay.classList.add('active');
  }

  function closeAdd() {
    const overlay = document.getElementById('add-form-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  function saveAdd() {
    const symbol = document.getElementById('add-symbol')?.value.trim().toUpperCase();
    const name = document.getElementById('add-name')?.value.trim();
    const broker = document.getElementById('add-broker')?.value;
    const sector = document.getElementById('add-sector')?.value.trim() || 'Other';
    const shares = parseFloat(document.getElementById('add-shares')?.value) || 0;
    const avgCost = parseFloat(document.getElementById('add-cost')?.value) || 0;
    const isShariah = document.getElementById('add-shariah')?.value === 'true';

    if (!symbol || !name) { App.showToast('Symbol and name required', 'error'); return; }

    State.update(s => {
      s.stocks.push({
        id: 'custom_' + symbol.toLowerCase() + '_' + Date.now(),
        symbol, name, broker, sector, shares, avgCost, isShariah,
        currentPrice: 0,
      });
    });

    closeAdd();
    render();
    App.showToast(`${symbol} added`, 'success');
  }

  async function fetchYahoo() {
    const stocks = State.get('stocks') || [];
    const held = stocks.filter(s => s.shares > 0);
    if (!held.length) { App.showToast('No holdings to update', 'info'); return; }

    App.showToast('Fetching prices…', 'info');
    let updated = 0;
    let failed = 0;

    for (const s of held) {
      try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${s.symbol}.KA?interval=1d&range=1d`;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
        if (price && price > 0) {
          State.updatePrice(s.symbol, price);
          updated++;
        } else {
          failed++;
        }
      } catch(e) {
        console.warn('Yahoo fetch failed for', s.symbol, e.message);
        failed++;
      }
    }

    render();
    if (Nav.current() === 'overview') Overview.render();

    if (updated > 0) App.showToast(`Updated ${updated} prices${failed > 0 ? `, ${failed} failed (CORS)` : ''}`, updated > 0 ? 'success' : 'error');
    else App.showToast('Yahoo Finance blocked by CORS — use manual price update', 'error');
  }

  return {
    render, _setFilter, _setSort, _onSearch,
    openDetail, closeDetail,
    openEditForm, closeEdit, saveEdit,
    quickPrice,
    openAddForm, closeAdd, saveAdd,
    fetchYahoo,
  };
})();
window.Stocks = Stocks;
