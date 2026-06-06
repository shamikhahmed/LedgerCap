'use strict';
const Stocks = (() => {
  let currentFilter = 'all';
  let currentSort = 'value';
  let searchQuery = '';

  function fmt(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    if (Math.abs(n) >= 100000) return '₨' + (n / 100000).toFixed(2) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function fmtPrice(n) {
    if (!n || n === 0) return '—';
    return '₨' + n.toFixed(2);
  }

  function fmtPct(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
  }

  function pnlClass(n) { return n >= 0 ? 't-gain' : 't-loss'; }

  function ratingClass(r) {
    if (!r) return '';
    const map = {
      'STRONG BUY': 'rating-strong-buy',
      'BUY': 'rating-buy',
      'HOLD': 'rating-hold',
      'WEAK HOLD': 'rating-weak-hold',
      'SPECULATIVE': 'rating-speculative',
    };
    return map[r] || 'rating-hold';
  }

  function brokerClass(b) {
    return b === 'Rafi' ? 'broker-rafi' : 'broker-akd';
  }

  function getFilteredStocks() {
    let stocks = State.get('stocks') || [];
    const settings = State.get('settings') || {};

    if (settings.showShariah) stocks = stocks.filter(s => s.isShariah);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      stocks = stocks.filter(s =>
        s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
      );
    }

    switch (currentFilter) {
      case 'rafi':    stocks = stocks.filter(s => s.broker === 'Rafi'); break;
      case 'akd':     stocks = stocks.filter(s => s.broker === 'AKD'); break;
      case 'shariah': stocks = stocks.filter(s => s.isShariah); break;
      case 'gainers': stocks = stocks.filter(s => s.currentPrice > 0 && s.currentPrice > s.avgCost); break;
      case 'losers':  stocks = stocks.filter(s => s.currentPrice > 0 && s.currentPrice < s.avgCost); break;
    }

    switch (currentSort) {
      case 'value':
        stocks = stocks.sort((a, b) => (b.shares * b.currentPrice) - (a.shares * a.currentPrice));
        break;
      case 'pnl':
        stocks = stocks.sort((a, b) => {
          const aPct = a.currentPrice > 0 ? ((a.currentPrice - a.avgCost) / a.avgCost) : -999;
          const bPct = b.currentPrice > 0 ? ((b.currentPrice - b.avgCost) / b.avgCost) : -999;
          return bPct - aPct;
        });
        break;
      case 'name':
        stocks = stocks.sort((a, b) => a.symbol.localeCompare(b.symbol));
        break;
    }

    return stocks;
  }

  function render() {
    const screen = document.getElementById('screen-stocks');
    if (!screen) return;

    const stocks = State.get('stocks') || [];
    const totalCost = stocks.reduce((a, s) => a + s.shares * s.avgCost, 0);
    const totalValue = stocks.reduce((a, s) => a + s.shares * (s.currentPrice || 0), 0);
    const totalPnl = totalValue - totalCost;
    const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;
    const priced = stocks.filter(s => s.currentPrice > 0).length;

    screen.innerHTML = `
    <div style="padding:calc(env(safe-area-inset-top,20px) + 12px) 16px 12px;background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <div>
          <div class="t-label">Stocks Portfolio</div>
          <div style="font-size:1.5rem;font-weight:800;font-variant-numeric:tabular-nums;margin-top:2px;">${fmt(totalValue)}</div>
          <div class="${pnlClass(totalPnl)}" style="font-size:0.8rem;font-weight:700;">${fmtPct(totalPnlPct)} · ${fmt(totalPnl)}</div>
        </div>
        <div style="text-align:right;">
          <div class="t-caption">${priced}/${stocks.length} priced</div>
          <button class="btn-ghost btn-sm" style="margin-top:6px;" onclick="App.fetchYahooPrices()">⟳ Yahoo</button>
        </div>
      </div>
      <div style="display:flex;gap:6px;">
        <button class="btn-ghost btn-sm" style="flex:1;" onclick="App.openPriceModal()">Update Prices</button>
        <button class="btn-ghost btn-sm" style="flex:1;" onclick="Stocks.showAddForm()">+ Add Stock</button>
      </div>
    </div>

    <div style="padding:10px 16px 0;">
      <div class="search-wrap" style="padding:0 0 8px;">
        <input class="search-input" type="text" placeholder="Search symbol or name..." id="stocks-search" value="${searchQuery}">
      </div>

      <div class="filter-row" style="padding:0;margin-bottom:8px;">
        ${['all','rafi','akd','shariah','gainers','losers'].map(f =>
          `<div class="filter-chip${currentFilter===f?' active':''}" data-filter="${f}">${f.charAt(0).toUpperCase()+f.slice(1)}</div>`
        ).join('')}
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px;">
        ${[['value','Value ↓'],['pnl','P&L%'],['name','Name']].map(([k,l]) =>
          `<div class="filter-chip${currentSort===k?' active':''}" data-sort="${k}" style="padding:4px 10px;font-size:0.7rem;">${l}</div>`
        ).join('')}
      </div>
    </div>

    <div class="holdings-list" id="stocks-list">
      ${renderList()}
    </div>`;

    screen.querySelector('#stocks-search').addEventListener('input', e => {
      searchQuery = e.target.value;
      document.getElementById('stocks-list').innerHTML = renderList();
      bindListEvents();
    });

    screen.querySelectorAll('[data-filter]').forEach(el => {
      el.addEventListener('click', () => {
        currentFilter = el.dataset.filter;
        screen.querySelectorAll('[data-filter]').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
        document.getElementById('stocks-list').innerHTML = renderList();
        bindListEvents();
      });
    });

    screen.querySelectorAll('[data-sort]').forEach(el => {
      el.addEventListener('click', () => {
        currentSort = el.dataset.sort;
        screen.querySelectorAll('[data-sort]').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
        document.getElementById('stocks-list').innerHTML = renderList();
        bindListEvents();
      });
    });

    bindListEvents();
  }

  function renderList() {
    const filtered = getFilteredStocks();
    if (filtered.length === 0) {
      return `<div class="empty-state"><div class="empty-state-icon">📊</div><div class="empty-state-text">No stocks match your filter.</div></div>`;
    }
    return filtered.map(s => {
      const value = s.shares * (s.currentPrice || 0);
      const cost = s.shares * s.avgCost;
      const pnl = value - cost;
      const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
      const hasPrice = s.currentPrice > 0;
      const rating = (window.ADVISOR_RATINGS || {})[s.symbol];
      const iconColor = s.broker === 'Rafi' ? '#1890FF' : '#FF6B35';

      return `<div class="holding-row" data-symbol="${s.symbol}" data-broker="${s.broker}">
        <div class="holding-icon" style="border-color:${iconColor}22;color:${iconColor};">
          ${s.symbol.slice(0, 3)}
        </div>
        <div class="holding-left">
          <div style="display:flex;align-items:center;gap:6px;">
            <span class="holding-symbol">${s.symbol}</span>
            <span class="broker-badge ${brokerClass(s.broker)}">${s.broker.toUpperCase()}</span>
            ${s.isShariah ? '<span class="shariah-badge">☾</span>' : ''}
            ${rating ? `<span class="rating-badge ${ratingClass(rating.rating)}" style="font-size:0.55rem;">${rating.rating}</span>` : ''}
          </div>
          <div class="holding-name">${s.name}</div>
          <div class="holding-shares">${s.shares} shares · avg ₨${s.avgCost.toFixed(2)}</div>
        </div>
        <div class="holding-right">
          <div class="holding-value ${hasPrice ? '' : 't-dim'}">${hasPrice ? fmt(value) : '—'}</div>
          <div class="holding-pnl ${hasPrice ? pnlClass(pnl) : 't-dim'}">
            ${hasPrice ? (pnl >= 0 ? '+' : '') + fmtPct(pnlPct) : fmtPrice(s.currentPrice)}
          </div>
        </div>
      </div>`;
    }).join('');
  }

  function bindListEvents() {
    document.querySelectorAll('.holding-row').forEach(row => {
      row.addEventListener('click', () => {
        const symbol = row.dataset.symbol;
        const broker = row.dataset.broker;
        showDetail(symbol, broker);
      });
    });
  }

  function showDetail(symbol, broker) {
    const stocks = State.get('stocks') || [];
    const allWithSymbol = stocks.filter(s => s.symbol === symbol);
    const s = allWithSymbol.find(s => s.broker === broker) || allWithSymbol[0];
    if (!s) return;

    const value = s.shares * (s.currentPrice || 0);
    const cost = s.shares * s.avgCost;
    const pnl = value - cost;
    const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
    const hasPrice = s.currentPrice > 0;
    const rating = (window.ADVISOR_RATINGS || {})[s.symbol];

    const sheet = document.getElementById('detail-sheet');
    const content = document.getElementById('detail-content');
    const header = sheet.querySelector('.detail-header');

    header.innerHTML = `
      <button class="btn-ghost btn-sm" onclick="document.getElementById('detail-sheet').classList.remove('open')">← Back</button>
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="broker-badge ${brokerClass(s.broker)}">${s.broker.toUpperCase()}</span>
        ${s.isShariah ? '<span class="shariah-badge">☾ Shariah</span>' : ''}
      </div>`;

    content.innerHTML = `
      <div style="margin-bottom:16px;">
        <div style="font-size:1.5rem;font-weight:800;">${s.symbol}</div>
        <div style="font-size:0.85rem;color:var(--text3);margin-top:2px;">${s.name}</div>
      </div>

      <div class="detail-pnl-block ${hasPrice ? '' : ''}">
        <div class="detail-pnl-amount ${hasPrice ? pnlClass(pnl) : 't-dim'}">${hasPrice ? (pnl >= 0 ? '+' : '') + fmt(Math.abs(pnl)) : 'No price yet'}</div>
        <div class="detail-pnl-pct ${hasPrice ? pnlClass(pnl) : 't-dim'}">${hasPrice ? fmtPct(pnlPct) : 'Update price to see P&L'}</div>
      </div>

      <div class="detail-info-row">
        <span class="detail-info-label">Shares Held</span>
        <span class="detail-info-val">${s.shares.toLocaleString()}</span>
      </div>
      <div class="detail-info-row">
        <span class="detail-info-label">Avg Buy Price</span>
        <span class="detail-info-val">₨${s.avgCost.toFixed(2)}</span>
      </div>
      <div class="detail-info-row">
        <span class="detail-info-label">Current Price</span>
        <span class="detail-info-val" id="current-price-display">${hasPrice ? '₨'+s.currentPrice.toFixed(2) : '—'}</span>
      </div>
      <div class="detail-info-row">
        <span class="detail-info-label">Cost Basis</span>
        <span class="detail-info-val">₨${cost.toLocaleString('en-PK', {maximumFractionDigits:0})}</span>
      </div>
      <div class="detail-info-row">
        <span class="detail-info-label">Market Value</span>
        <span class="detail-info-val ${hasPrice ? pnlClass(pnl) : ''}">${hasPrice ? fmt(value) : '—'}</span>
      </div>
      <div class="detail-info-row">
        <span class="detail-info-label">Sector</span>
        <span class="detail-info-val">${s.sector}</span>
      </div>

      <div style="display:flex;gap:8px;margin:16px 0;">
        <button class="btn-ghost btn-sm" style="flex:1;" onclick="Stocks.editPrice('${s.symbol}', '${s.broker}')">Edit Price</button>
        <button class="btn-ghost btn-sm" style="flex:1;" onclick="Stocks.addToWatchlist('${s.symbol}', '${s.name}')">+ Watchlist</button>
      </div>

      ${rating ? `
      <div style="margin-top:16px;">
        <div class="t-label" style="margin-bottom:10px;">Advisor Rating</div>
        <div class="card-dark" style="padding:14px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span class="rating-badge ${ratingClass(rating.rating)}">${rating.rating}</span>
            <span class="t-dim" style="font-size:0.75rem;">Conviction: ${rating.conviction}/10</span>
          </div>
          <div class="conviction-bar">
            <div class="conviction-fill" style="width:${rating.conviction*10}%;background:var(--orange);"></div>
          </div>
          ${rating.target ? `<div class="t-caption" style="margin-top:8px;">Price Target: ₨${rating.target}</div>` : ''}
          <div style="margin-top:10px;font-size:0.82rem;color:var(--text2);line-height:1.6;">${rating.thesis}</div>
        </div>
      </div>` : ''}`;

    sheet.classList.add('open');
  }

  function editPrice(symbol, broker) {
    const stocks = State.get('stocks') || [];
    const s = stocks.find(s => s.symbol === symbol && s.broker === broker);
    if (!s) return;

    const display = document.getElementById('current-price-display');
    if (!display) return;

    display.innerHTML = `<div style="display:flex;align-items:center;gap:6px;">
      <input class="inline-price-input" type="number" step="0.01" min="0" id="inline-price-inp" value="${s.currentPrice > 0 ? s.currentPrice : ''}" placeholder="0.00">
      <button class="btn-ghost btn-sm" onclick="Stocks.saveInlinePrice('${symbol}', '${broker}')">Save</button>
    </div>`;

    const inp = document.getElementById('inline-price-inp');
    if (inp) inp.focus();
  }

  function saveInlinePrice(symbol, broker) {
    const inp = document.getElementById('inline-price-inp');
    if (!inp) return;
    const val = parseFloat(inp.value);
    if (!val || val <= 0) { App.showToast('Invalid price', 'error'); return; }
    State.updateStockPrice(symbol, val);
    App.showToast(`${symbol} updated to ₨${val.toFixed(2)}`, 'success');
    document.getElementById('detail-sheet').classList.remove('open');
    render();
    Overview.render();
  }

  function addToWatchlist(symbol, name) {
    App.showToast(`${symbol} noted — check Advisor tab`, 'info');
  }

  function showAddForm() {
    const sheet = document.getElementById('detail-sheet');
    const content = document.getElementById('detail-content');
    const header = sheet.querySelector('.detail-header');

    header.innerHTML = `
      <button class="btn-ghost btn-sm" onclick="document.getElementById('detail-sheet').classList.remove('open')">← Back</button>
      <div style="font-size:0.95rem;font-weight:700;">Add Stock</div>`;

    content.innerHTML = `
      <div class="add-form">
        <div class="form-field">
          <label class="form-label">Symbol</label>
          <input class="form-input" type="text" id="af-symbol" placeholder="e.g. MEBL" style="text-transform:uppercase;">
        </div>
        <div class="form-field">
          <label class="form-label">Company Name</label>
          <input class="form-input" type="text" id="af-name" placeholder="e.g. Meezan Bank">
        </div>
        <div class="form-field">
          <label class="form-label">Shares</label>
          <input class="form-input" type="number" id="af-shares" placeholder="100">
        </div>
        <div class="form-field">
          <label class="form-label">Avg Buy Price (₨)</label>
          <input class="form-input" type="number" step="0.01" id="af-cost" placeholder="491.59">
        </div>
        <div class="form-field">
          <label class="form-label">Broker</label>
          <select class="form-select" id="af-broker">
            <option value="Rafi">Rafi</option>
            <option value="AKD">AKD</option>
          </select>
        </div>
        <div class="form-field">
          <label class="form-label">Sector</label>
          <input class="form-input" type="text" id="af-sector" placeholder="e.g. Banking">
        </div>
        <div class="form-field">
          <label class="form-label">Shariah Compliant?</label>
          <select class="form-select" id="af-shariah">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <button class="btn-primary" style="margin-top:8px;" onclick="Stocks.saveNewStock()">Add Stock</button>
      </div>`;

    sheet.classList.add('open');
  }

  function saveNewStock() {
    const sym = (document.getElementById('af-symbol')?.value || '').trim().toUpperCase();
    const name = (document.getElementById('af-name')?.value || '').trim();
    const shares = parseFloat(document.getElementById('af-shares')?.value || 0);
    const cost = parseFloat(document.getElementById('af-cost')?.value || 0);
    const broker = document.getElementById('af-broker')?.value || 'Rafi';
    const sector = (document.getElementById('af-sector')?.value || '').trim() || 'Other';
    const isShariah = document.getElementById('af-shariah')?.value === 'true';

    if (!sym || !shares || !cost) { App.showToast('Fill all required fields', 'error'); return; }

    State.update(s => {
      s.stocks.push({
        id: 'custom_' + sym + '_' + Date.now(),
        symbol: sym, name: name || sym,
        shares, avgCost: cost, currentPrice: 0,
        broker, sector, isShariah
      });
    });

    App.showToast(`${sym} added`, 'success');
    document.getElementById('detail-sheet').classList.remove('open');
    render();
  }

  return { render, showDetail, editPrice, saveInlinePrice, addToWatchlist, showAddForm, saveNewStock };
})();
window.Stocks = Stocks;
