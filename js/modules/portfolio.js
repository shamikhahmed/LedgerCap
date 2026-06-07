'use strict';
const Portfolio = (() => {
  let _filter = 'all';
  let _sort = 'value';

  function fmt(n) {
    if (!n && n !== 0) return '—';
    const abs = Math.abs(n);
    if (abs >= 10000000) return '₨' + (n / 10000000).toFixed(2) + 'cr';
    if (abs >= 100000) return '₨' + (n / 100000).toFixed(1) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function fmt2(n) {
    if (!n && n !== 0) return '—';
    const abs = Math.abs(n);
    if (abs >= 10000000) return '₨' + (n / 10000000).toFixed(1) + 'cr';
    if (abs >= 100000) return '₨' + (n / 100000).toFixed(1) + 'L';
    if (abs >= 1000) return '₨' + (n / 1000).toFixed(0) + 'k';
    return '₨' + Math.round(n).toLocaleString();
  }

  function ratingBadge(rating) {
    if (!rating) return '';
    const r = rating.toUpperCase();
    if (r === 'STRONG BUY') return '<span class="badge badge-strong-buy">STRONG BUY</span>';
    if (r === 'BUY') return '<span class="badge badge-buy">BUY</span>';
    if (r === 'HOLD') return '<span class="badge badge-hold">HOLD</span>';
    if (r === 'SELL') return '<span class="badge badge-sell">SELL</span>';
    if (r === 'SPECULATIVE') return '<span class="badge badge-speculative">SPECULATIVE</span>';
    if (r === 'WEAK HOLD') return '<span class="badge badge-hold">WEAK HOLD</span>';
    return `<span class="badge">${rating}</span>`;
  }

  function brokerBadge(broker) {
    if (!broker) return '';
    const b = broker.toLowerCase();
    if (b === 'rafi') return '<span class="badge badge-rafi">RAFI</span>';
    if (b === 'akd') return '<span class="badge badge-akd">AKD</span>';
    if (b === 'meezan') return '<span class="badge badge-meezan">MEEZAN</span>';
    return `<span class="badge">${broker}</span>`;
  }

  function _priceIndicator(source) {
    if (source === 'yahoo') return '';
    if (source === 'manual') return '<span style="font-size:0.6rem;color:#00b8d9;margin-left:2px;" title="Manual price">M</span>';
    return '<span style="font-size:0.6rem;color:var(--gold);margin-left:2px;" title="Approximate fallback price">~</span>';
  }

  function render() {
    const screen = document.getElementById('screen-portfolio');
    if (!screen) return;

    const state = State.get();
    const transactions = state.transactions || [];
    const holdings = Ledger.calcHoldings(transactions);
    const funds = Ledger.calcFundHoldings(transactions);

    const rows = _buildRows(holdings, funds);
    const filtered = _applyFilter(rows, _filter);
    const sorted = _applySort(filtered, _sort);

    const totalValue = State.calcTotalValue();
    const totalCost = State.calcTotalCost();
    const totalPnl = totalValue - totalCost;
    const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

    const filteredTotalValue = sorted.reduce((s, r) => s + r.value, 0);
    const filteredTotalCost = sorted.reduce((s, r) => s + r.cost, 0);
    const filteredPnl = filteredTotalValue - filteredTotalCost;
    const filteredPnlPct = filteredTotalCost > 0 ? (filteredPnl / filteredTotalCost) * 100 : 0;

    screen.innerHTML = `
    <div class="portfolio-header">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div class="hero-label">Portfolio</div>
          <div style="font-size:1.8rem;font-weight:800;letter-spacing:-0.02em;">${fmt(totalValue)}</div>
        </div>
        <div style="text-align:right;">
          <div class="${totalPnl >= 0 ? 't-gain' : 't-loss'}" style="font-size:0.92rem;font-weight:700;">${totalPnl >= 0 ? '+' : ''}${fmt(Math.abs(totalPnl))}</div>
          <div class="t-dim" style="font-size:0.72rem;">${totalPnl >= 0 ? '+' : ''}${totalPnlPct.toFixed(2)}% all time</div>
        </div>
      </div>
    </div>

    <div class="filter-tabs" id="portfolio-filters">
      ${['all','stocks','funds','rafi','akd','meezan','winners','losers','shariah'].map(f =>
        `<div class="filter-tab${_filter === f ? ' active' : ''}" data-f="${f}">${f.charAt(0).toUpperCase() + f.slice(1)}</div>`
      ).join('')}
    </div>

    <div style="display:flex;align-items:center;gap:6px;padding:8px 16px;background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <span class="t-dim" style="font-size:0.7rem;">Sort:</span>
      ${['value','pnl','name','broker'].map(s =>
        `<button class="btn-ghost" style="padding:4px 10px;font-size:0.7rem;${_sort === s ? 'border-color:var(--orange);color:var(--orange);' : ''}" data-s="${s}">${s.charAt(0).toUpperCase() + s.slice(1)}</button>`
      ).join('')}
      <span class="t-dim" style="font-size:0.62rem;margin-left:auto;">~ = estimate, M = manual</span>
    </div>

    <div class="holdings-table">
      <div class="ht-head">
        <div class="ht-head-cell"></div>
        <div class="ht-head-cell">Name</div>
        <div class="ht-head-cell">Price</div>
        <div class="ht-head-cell">Value</div>
        <div class="ht-head-cell">P&amp;L</div>
      </div>
      ${sorted.length === 0 ? `<div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-title">No holdings</div><div class="empty-state-sub">Add transactions to see your portfolio</div></div>` : ''}
      ${sorted.map(row => _rowHTML(row)).join('')}
      ${sorted.length > 0 ? `
      <div class="ht-row" style="background:var(--bg3);border-top:1px solid var(--bg4);cursor:default;">
        <div class="ht-icon" style="font-size:0.6rem;background:var(--bg4);">TOT</div>
        <div><div class="ht-name">Total</div><div class="ht-sub">${sorted.length} positions</div></div>
        <div class="ht-price" style="font-size:0.72rem;"></div>
        <div class="ht-value" style="font-weight:800;">${fmt2(filteredTotalValue)}</div>
        <div class="ht-pnl ${filteredPnl >= 0 ? 't-gain' : 't-loss'}">
          ${filteredPnl >= 0 ? '+' : ''}${filteredPnlPct.toFixed(1)}%
          <div style="font-size:0.62rem;">${filteredPnl >= 0 ? '+' : ''}${fmt2(Math.abs(filteredPnl))}</div>
        </div>
      </div>` : ''}
    </div>
    <div style="height:8px;"></div>`;

    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => { _filter = tab.dataset.f; render(); });
    });
    document.querySelectorAll('[data-s]').forEach(btn => {
      btn.addEventListener('click', () => { _sort = btn.dataset.s; render(); });
    });
    document.querySelectorAll('.ht-row[data-key]').forEach(row => {
      row.addEventListener('click', () => _openDetail(row.dataset.key, row.dataset.type));
    });
  }

  function _buildRows(holdings, funds) {
    const prices = State.get().prices || {};

    const stockRows = holdings.map(h => {
      const priceData = prices[h.symbol];
      const curr = priceData?.price || 0;
      const prev = priceData?.prevClose || curr;
      const priceSource = priceData?.source || 'fallback';
      const price = curr || h.avgCost;
      const value = h.shares * price;
      const cost = h.shares * h.avgCost;
      const pnl = value - cost;
      const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
      const dailyChg = curr && prev ? ((curr - prev) / prev) * 100 : null;
      const advisor = (window.ADVISOR_RATINGS || {})[h.symbol];
      const staticData = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === h.symbol && s.broker === h.broker);
      return { key: h.symbol + '_' + h.broker, type: 'stock', symbol: h.symbol, name: staticData?.name || h.symbol, broker: h.broker, shares: h.shares, avgCost: h.avgCost, price, priceSource, value, cost, pnl, pnlPct, dailyChg, advisor, isShariah: staticData?.isShariah, sector: staticData?.sector };
    });

    const fundRows = funds.map(f => {
      const priceData = prices[f.symbol];
      const nav = priceData?.price || 0;
      const priceSource = priceData?.source || 'fallback';
      const mf = (window.MEEZAN_FUNDS || []).find(m => m.symbol === f.symbol);
      const currentNav = nav || mf?.currentNav || f.avgNav;
      const value = f.units * currentNav;
      const cost = f.totalInvested;
      const pnl = value - cost;
      const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
      return { key: f.symbol + '_Meezan', type: 'fund', symbol: f.symbol, name: mf?.name || f.symbol, broker: 'Meezan', units: f.units, avgNav: f.avgNav, price: currentNav, priceSource, value, cost, pnl, pnlPct, dailyChg: null, advisor: null, isShariah: true, sector: mf?.type || 'Fund' };
    });

    return [...stockRows, ...fundRows];
  }

  function _applyFilter(rows, f) {
    if (f === 'all') return rows;
    if (f === 'stocks') return rows.filter(r => r.type === 'stock');
    if (f === 'funds') return rows.filter(r => r.type === 'fund');
    if (f === 'rafi') return rows.filter(r => r.broker === 'Rafi');
    if (f === 'akd') return rows.filter(r => r.broker === 'AKD');
    if (f === 'meezan') return rows.filter(r => r.broker === 'Meezan');
    if (f === 'winners') return rows.filter(r => r.pnl > 0);
    if (f === 'losers') return rows.filter(r => r.pnl < 0);
    if (f === 'shariah') return rows.filter(r => r.isShariah);
    return rows;
  }

  function _applySort(rows, s) {
    if (s === 'value') return rows.slice().sort((a, b) => b.value - a.value);
    if (s === 'pnl') return rows.slice().sort((a, b) => b.pnlPct - a.pnlPct);
    if (s === 'name') return rows.slice().sort((a, b) => a.symbol.localeCompare(b.symbol));
    if (s === 'broker') return rows.slice().sort((a, b) => a.broker.localeCompare(b.broker));
    return rows;
  }

  function _rowHTML(row) {
    const pnlClass = row.pnlPct >= 0 ? 't-gain' : 't-loss';
    const sign = row.pnlPct >= 0 ? '+' : '';
    const priceNum = row.price > 0 ? '₨' + row.price.toLocaleString('en-PK', { maximumFractionDigits: 2 }) : '—';
    const priceStr = row.price > 0
      ? priceNum + _priceIndicator(row.priceSource)
      : '—';

    return `<div class="ht-row" data-key="${row.key}" data-type="${row.type}">
      <div class="ht-icon">${row.symbol.slice(0, 4)}</div>
      <div>
        <div class="ht-name">${row.symbol}</div>
        <div class="ht-sub">${row.broker}${row.isShariah ? ' · ☪' : ''}</div>
      </div>
      <div class="ht-price">${priceStr}</div>
      <div class="ht-value">${fmt2(row.value)}</div>
      <div class="ht-pnl ${pnlClass}">
        ${sign}${row.pnlPct.toFixed(1)}%
        <div style="font-size:0.62rem;">${sign}${fmt2(Math.abs(row.pnl))}</div>
      </div>
    </div>`;
  }

  function _openDetail(key, type) {
    const state = State.get();
    const transactions = state.transactions || [];
    const holdings = Ledger.calcHoldings(transactions);
    const funds = Ledger.calcFundHoldings(transactions);
    const rows = _buildRows(holdings, funds);
    const row = rows.find(r => r.key === key);
    if (!row) return;

    const advisor = row.advisor;
    const pnlClass = row.pnl >= 0 ? 't-gain' : 't-loss';
    const sign = row.pnl >= 0 ? '+' : '';

    const sharesLabel = row.type === 'fund' ? `${row.units.toFixed(4)} units` : `${row.shares} shares`;
    const avgLabel = row.type === 'fund' ? 'Avg NAV' : 'Avg Cost';
    const avgVal = row.type === 'fund' ? row.avgNav : row.avgCost;

    const content = `
      <div style="padding:16px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
          <div class="ht-icon" style="width:48px;height:48px;border-radius:10px;font-size:0.85rem;">${row.symbol.slice(0, 4)}</div>
          <div>
            <div style="font-size:1.1rem;font-weight:700;">${row.symbol}</div>
            <div style="font-size:0.78rem;color:var(--text3);">${row.name}</div>
            <div style="display:flex;gap:6px;margin-top:4px;">${brokerBadge(row.broker)}${advisor ? ratingBadge(advisor.rating) : ''}${row.isShariah ? '<span class="badge badge-shariah">☪ SHARIAH</span>' : ''}</div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--bg4);border-radius:var(--r);overflow:hidden;margin-bottom:16px;">
          ${[
            ['Current Value', fmt(row.value)],
            ['P&L', `<span class="${pnlClass}">${sign}${fmt(Math.abs(row.pnl))} (${sign}${row.pnlPct.toFixed(2)}%)</span>`],
            ['Position', sharesLabel],
            [avgLabel, '₨' + (avgVal || 0).toFixed(2)],
            ['Current Price', row.price ? '₨' + row.price.toFixed(2) + (row.priceSource !== 'yahoo' ? ' (' + (row.priceSource === 'manual' ? 'manual' : 'est.') + ')' : '') : '—'],
            ['Total Cost', fmt(row.cost)],
          ].map(([l, v]) => `<div style="background:var(--bg2);padding:12px 14px;"><div class="metric-label">${l}</div><div style="font-size:0.92rem;font-weight:700;">${v}</div></div>`).join('')}
        </div>

        ${advisor ? `
        <div class="card-highlight" style="margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <span style="font-size:0.78rem;font-weight:700;">Advisor View</span>
            ${ratingBadge(advisor.rating)}
            ${advisor.conviction ? `<span style="font-size:0.7rem;color:var(--text3);">Conviction ${advisor.conviction}/10</span>` : ''}
          </div>
          <div style="font-size:0.82rem;color:var(--text2);line-height:1.5;">${advisor.thesis}</div>
          ${advisor.target ? `<div style="margin-top:8px;font-size:0.78rem;"><span class="t-dim">Target: </span><span class="t-orange" style="font-weight:700;">₨${advisor.target}</span></div>` : ''}
        </div>` : ''}

        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <button class="btn-primary" style="background:rgba(14,203,129,0.15);color:var(--green);border:1px solid rgba(14,203,129,0.3);" onclick="App.openAddTransaction('BUY','${row.symbol}','${row.broker}')">+ Buy More</button>
          <button class="btn-primary" style="background:rgba(246,70,93,0.1);color:var(--red);border:1px solid rgba(246,70,93,0.2);" onclick="App.openAddTransaction('SELL','${row.symbol}','${row.broker}')">Sell</button>
        </div>
      </div>`;

    App.openBottomSheet('detail-sheet', row.symbol, content);
  }

  return { render };
})();
window.Portfolio = Portfolio;
