'use strict';
const Portfolio = (() => {
  let _filter = 'all';
  let _sort = 'value';

  function fmt(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    const abs = Math.abs(n);
    if (abs >= 10000000) return '₨' + (n / 10000000).toFixed(2) + 'cr';
    if (abs >= 100000) return '₨' + (n / 100000).toFixed(2) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function fmtC(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    const abs = Math.abs(n);
    if (abs >= 10000000) return '₨' + (n / 10000000).toFixed(1) + 'cr';
    if (abs >= 100000) return '₨' + (n / 100000).toFixed(1) + 'L';
    if (abs >= 1000) return '₨' + (n / 1000).toFixed(0) + 'k';
    return '₨' + Math.round(n).toLocaleString();
  }

  function fmtPrice(n) {
    if (!n || n <= 0) return '—';
    if (n >= 100000) return '₨' + (n / 100000).toFixed(2) + 'L';
    return '₨' + n.toLocaleString('en-PK', { maximumFractionDigits: 2 });
  }

  function pnlClr(v) { return v >= 0 ? 'var(--green)' : 'var(--red)'; }
  function sgn(v) { return v >= 0 ? '+' : ''; }

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
    if (b === 'cdc') return '<span class="badge badge-cdc">CDC</span>';
    return `<span class="badge">${broker}</span>`;
  }

  function fundTypeBadge(type) {
    if (!type) return '';
    const t = (type || '').toLowerCase();
    if (t.includes('index')) return '<span class="badge badge-buy">INDEX</span>';
    if (t.includes('equity')) return '<span class="badge badge-speculative">EQUITY</span>';
    if (t.includes('income')) return '<span class="badge badge-hold">INCOME</span>';
    if (t.includes('balanced')) return '<span class="badge badge-rafi">BALANCED</span>';
    return `<span class="badge">${type}</span>`;
  }

  function _priceInd(source) {
    if (['yahoo','psx_live','psx_int','psx_symbol','psx_eod'].includes(source)) return '';
    if (source === 'manual') return '<span class="price-ind" title="Manual price">M</span>';
    if (source === 'meezan_seed') return '<span class="price-ind" title="Meezan NAV seed">N</span>';
    return '<span class="price-ind price-approx" title="Last known price">~</span>';
  }

  function _priceSourceLabel(source) {
    if (window.Prices?.sourceLabel) return Prices.sourceLabel(source);
    if (source === 'yahoo') return 'Yahoo Finance';
    if (source === 'manual') return 'Manual';
    return 'Last known';
  }

  function render() {
    const screen = document.getElementById('screen-portfolio');
    if (!screen) return;

    const state = State.get();
    const transactions = state.transactions || [];
    const holdings = Ledger.calcHoldings(transactions);
    const funds = Ledger.calcFundHoldings(transactions);

    const allRows = _buildRows(holdings, funds);
    const stockRows = allRows.filter(r => r.type === 'stock');
    const fundRows = allRows.filter(r => r.type === 'fund');

    const totalStockValue = stockRows.reduce((s, r) => s + r.value, 0);
    const totalStockCost = stockRows.reduce((s, r) => s + r.cost, 0);
    const totalStockPnl = totalStockValue - totalStockCost;
    const totalStockPnlPct = totalStockCost > 0 ? (totalStockPnl / totalStockCost) * 100 : 0;

    const totalFundValue = fundRows.reduce((s, r) => s + r.value, 0);
    const totalFundCost = fundRows.reduce((s, r) => s + r.cost, 0);
    const totalFundPnl = totalFundValue - totalFundCost;
    const totalFundPnlPct = totalFundCost > 0 ? (totalFundPnl / totalFundCost) * 100 : 0;

    const grandValue = totalStockValue + totalFundValue;
    const grandCost = totalStockCost + totalFundCost;
    const grandPnl = grandValue - grandCost;
    const grandPnlPct = grandCost > 0 ? (grandPnl / grandCost) * 100 : 0;

    const filtered = _applyFilter(allRows, _filter);
    const sorted = _applySort(filtered, _sort);
    const filteredStocks = sorted.filter(r => r.type === 'stock');
    const filteredFunds = sorted.filter(r => r.type === 'fund');

    screen.innerHTML = `
    <div class="portfolio-header">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div class="hero-label">Portfolio</div>
          <div style="font-size:1.8rem;font-weight:800;letter-spacing:-0.02em;">${fmt(grandValue)}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.92rem;font-weight:700;color:${pnlClr(grandPnl)};">${sgn(grandPnl)}${fmt(Math.abs(grandPnl))}</div>
          <div class="t-dim" style="font-size:0.72rem;">${sgn(grandPnlPct)}${grandPnlPct.toFixed(2)}% all time</div>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--bg4);">
      <div style="background:var(--bg2);padding:10px 14px;">
        <div class="t-label" style="margin-bottom:6px;">STOCKS (${stockRows.length})</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;">
          <div><div style="font-size:0.58rem;color:var(--text3);">Value</div><div style="font-size:0.78rem;font-weight:700;">${fmtC(totalStockValue)}</div></div>
          <div><div style="font-size:0.58rem;color:var(--text3);">Cost</div><div style="font-size:0.78rem;">${fmtC(totalStockCost)}</div></div>
          <div><div style="font-size:0.58rem;color:var(--text3);">P&amp;L</div><div style="font-size:0.78rem;font-weight:700;color:${pnlClr(totalStockPnl)};">${sgn(totalStockPnl)}${fmtC(Math.abs(totalStockPnl))}</div></div>
          <div><div style="font-size:0.58rem;color:var(--text3);">P&amp;L%</div><div style="font-size:0.78rem;font-weight:700;color:${pnlClr(totalStockPnlPct)};">${sgn(totalStockPnlPct)}${totalStockPnlPct.toFixed(1)}%</div></div>
        </div>
      </div>
      <div style="background:var(--bg2);padding:10px 14px;">
        <div class="t-label" style="margin-bottom:6px;">FUNDS (${fundRows.length})</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;">
          <div><div style="font-size:0.58rem;color:var(--text3);">Value</div><div style="font-size:0.78rem;font-weight:700;">${fmtC(totalFundValue)}</div></div>
          <div><div style="font-size:0.58rem;color:var(--text3);">Invested</div><div style="font-size:0.78rem;">${fmtC(totalFundCost)}</div></div>
          <div><div style="font-size:0.58rem;color:var(--text3);">P&amp;L</div><div style="font-size:0.78rem;font-weight:700;color:${pnlClr(totalFundPnl)};">${sgn(totalFundPnl)}${fmtC(Math.abs(totalFundPnl))}</div></div>
          <div><div style="font-size:0.58rem;color:var(--text3);">P&amp;L%</div><div style="font-size:0.78rem;font-weight:700;color:${pnlClr(totalFundPnlPct)};">${sgn(totalFundPnlPct)}${totalFundPnlPct.toFixed(1)}%</div></div>
        </div>
      </div>
    </div>

    <div class="filter-tabs" id="portfolio-filters">
      ${['all','rafi','akd','cdc','meezan','winners','losers','shariah'].map(f =>
        `<div class="filter-tab${_filter === f ? ' active' : ''}" data-f="${f}">${f.toUpperCase() === 'CDC' ? 'CDC' : f.charAt(0).toUpperCase() + f.slice(1)}</div>`
      ).join('')}
    </div>

    <div style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <span class="t-dim" style="font-size:0.68rem;">Sort:</span>
      ${['value','pnl%','name','shares'].map(s =>
        `<button class="btn-ghost" style="padding:3px 9px;font-size:0.68rem;${_sort === s ? 'border-color:var(--orange);color:var(--orange);' : ''}" data-s="${s}">${s === 'pnl%' ? 'P&L%' : s.charAt(0).toUpperCase() + s.slice(1)}</button>`
      ).join('')}
      <span class="t-dim" style="font-size:0.6rem;margin-left:auto;">~ approx · M manual</span>
    </div>

    ${filteredStocks.length > 0 ? _renderStocksSection(filteredStocks) : ''}
    ${filteredFunds.length > 0 ? _renderFundsSection(filteredFunds) : ''}
    ${filtered.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-title">No holdings</div><div class="empty-state-sub">No holdings match this filter</div></div>' : ''}

    <div style="padding:11px 16px;background:var(--bg3);border-top:2px solid var(--bg4);">
      <span style="font-size:0.62rem;font-weight:700;letter-spacing:0.06em;color:var(--text3);">TOTAL PORTFOLIO</span>
      <span style="font-size:0.82rem;font-weight:800;"> ${fmt(grandValue)}</span>
      <span style="font-size:0.72rem;color:var(--text2);"> · invested ${fmt(grandCost)} · </span>
      <span style="font-size:0.82rem;font-weight:700;color:${pnlClr(grandPnl)};">${sgn(grandPnl)}${fmt(Math.abs(grandPnl))} (${sgn(grandPnlPct)}${grandPnlPct.toFixed(2)}%)</span>
    </div>
    <div style="height:8px;"></div>`;

    document.querySelectorAll('#portfolio-filters .filter-tab').forEach(tab => {
      tab.addEventListener('click', () => { _filter = tab.dataset.f; render(); });
    });
    document.querySelectorAll('[data-s]').forEach(btn => {
      btn.addEventListener('click', () => { _sort = btn.dataset.s; render(); });
    });
    document.querySelectorAll('.pt-row[data-key]').forEach(row => {
      row.addEventListener('click', () => _openDetail(row.dataset.key, row.dataset.type));
    });
  }

  function _renderStocksSection(rows) {
    const rafiRows = rows.filter(r => r.broker === 'Rafi');
    const akdRows = rows.filter(r => r.broker === 'AKD');
    const cdcRows = rows.filter(r => r.broker === 'CDC');

    const HEAD = `<div class="pt-head">
      <div class="pt-hc">Symbol</div>
      <div class="pt-hc pt-r">Shs</div>
      <div class="pt-hc pt-r">Avg</div>
      <div class="pt-hc pt-r">CMP</div>
      <div class="pt-hc pt-r">Value</div>
      <div class="pt-hc pt-r">P&amp;L%</div>
    </div>`;

    let html = '<div class="port-table">' + HEAD;

    if (rafiRows.length > 0) {
      const rv = rafiRows.reduce((s, r) => s + r.value, 0);
      const rc = rafiRows.reduce((s, r) => s + r.cost, 0);
      const rp = rv - rc;
      html += `<div class="pt-sec-head">
        <span style="color:#1890FF;">&#9679;</span>
        RAFI SECURITIES
        <span class="pt-sec-meta">${rafiRows.length} stocks &middot; ${fmtC(rv)} &middot; <span style="color:${pnlClr(rp)};">${sgn(rp)}${fmtC(Math.abs(rp))}</span></span>
      </div>`;
      html += rafiRows.map((r, i) => _stockRow(r, i)).join('');
      html += _brokerTotal(rafiRows, 'RAFI TOTAL');
    }

    if (akdRows.length > 0) {
      const av = akdRows.reduce((s, r) => s + r.value, 0);
      const ac = akdRows.reduce((s, r) => s + r.cost, 0);
      const ap = av - ac;
      html += `<div class="pt-sec-head">
        <span style="color:var(--orange);">&#9679;</span>
        AKD SECURITIES
        <span class="pt-sec-meta">${akdRows.length} stocks &middot; ${fmtC(av)} &middot; <span style="color:${pnlClr(ap)};">${sgn(ap)}${fmtC(Math.abs(ap))}</span></span>
      </div>`;
      html += akdRows.map((r, i) => _stockRow(r, i)).join('');
      html += _brokerTotal(akdRows, 'AKD TOTAL');
    }

    if (cdcRows.length > 0) {
      const cv = cdcRows.reduce((s, r) => s + r.value, 0);
      const cc = cdcRows.reduce((s, r) => s + r.cost, 0);
      const cp = cv - cc;
      html += `<div class="pt-sec-head">
        <span style="color:var(--purple);">&#9679;</span>
        CDC CUSTODY
        <span class="pt-sec-meta">${cdcRows.length} stocks &middot; ${fmtC(cv)} &middot; <span style="color:${pnlClr(cp)};">${sgn(cp)}${fmtC(Math.abs(cp))}</span></span>
      </div>`;
      html += cdcRows.map((r, i) => _stockRow(r, i)).join('');
      html += _brokerTotal(cdcRows, 'CDC TOTAL');
    }

    if (rafiRows.length === 0 && akdRows.length === 0 && cdcRows.length === 0 && rows.length > 0) {
      html += rows.map((r, i) => _stockRow(r, i)).join('');
      html += _brokerTotal(rows, 'TOTAL');
    }

    html += '</div>';
    return html;
  }

  function _renderFundsSection(rows) {
    const tv = rows.reduce((s, r) => s + r.value, 0);
    const tc = rows.reduce((s, r) => s + r.cost, 0);
    const tp = tv - tc;

    const HEAD = `<div class="pt-head">
      <div class="pt-hc">Fund</div>
      <div class="pt-hc pt-r">Units</div>
      <div class="pt-hc pt-r">Avg</div>
      <div class="pt-hc pt-r">NAV</div>
      <div class="pt-hc pt-r">Value</div>
      <div class="pt-hc pt-r">P&amp;L%</div>
    </div>`;

    let html = '<div class="port-table">' + HEAD;
    html += `<div class="pt-sec-head">
      <span style="color:var(--green);">&#9679;</span>
      AL MEEZAN
      <span class="pt-sec-meta">${rows.length} funds &middot; ${fmtC(tv)} &middot; <span style="color:${pnlClr(tp)};">${sgn(tp)}${fmtC(Math.abs(tp))}</span></span>
    </div>`;
    html += rows.map((r, i) => _fundRow(r, i)).join('');
    html += _brokerTotal(rows, 'MEEZAN TOTAL');
    html += '</div>';
    return html;
  }

  function _stockRow(row, idx) {
    const pc = row.pnlPct >= 0 ? 't-gain' : 't-loss';
    const s = row.pnlPct >= 0 ? '+' : '';
    const bg = idx % 2 === 1 ? 'background:rgba(255,255,255,0.018);' : '';
    return `<div class="pt-row" data-key="${row.key}" data-type="${row.type}" style="${bg}">
      <div class="pt-cell">
        <div class="pt-sym">${row.symbol}</div>
        <div class="pt-sym-sub">${row.name.length > 17 ? row.name.slice(0, 15) + '…' : row.name}</div>
      </div>
      <div class="pt-cell pt-r">${(row.shares || 0).toLocaleString('en-PK')}</div>
      <div class="pt-cell pt-r">${fmtPrice(row.avgCost)}</div>
      <div class="pt-cell pt-r">${fmtPrice(row.price)}${_priceInd(row.priceSource)}</div>
      <div class="pt-cell pt-r">${fmtC(row.value)}</div>
      <div class="pt-cell pt-r ${pc}" style="font-weight:700;">${s}${row.pnlPct.toFixed(1)}%</div>
    </div>`;
  }

  function _fundRow(row, idx) {
    const pc = row.pnlPct >= 0 ? 't-gain' : 't-loss';
    const s = row.pnlPct >= 0 ? '+' : '';
    const bg = idx % 2 === 1 ? 'background:rgba(255,255,255,0.018);' : '';
    return `<div class="pt-row" data-key="${row.key}" data-type="${row.type}" style="${bg}">
      <div class="pt-cell">
        <div class="pt-sym">${row.symbol}</div>
        <div class="pt-sym-sub">${row.name.length > 17 ? row.name.slice(0, 15) + '…' : row.name}</div>
      </div>
      <div class="pt-cell pt-r" style="font-size:0.65rem;">${(row.units || 0).toFixed(2)}</div>
      <div class="pt-cell pt-r">${fmtPrice(row.avgNav)}</div>
      <div class="pt-cell pt-r">${fmtPrice(row.price)}${_priceInd(row.priceSource)}</div>
      <div class="pt-cell pt-r">${fmtC(row.value)}</div>
      <div class="pt-cell pt-r ${pc}" style="font-weight:700;">${s}${row.pnlPct.toFixed(1)}%</div>
    </div>`;
  }

  function _brokerTotal(rows, label) {
    const tv = rows.reduce((s, r) => s + r.value, 0);
    const tc = rows.reduce((s, r) => s + r.cost, 0);
    const tp = tv - tc;
    const tpp = tc > 0 ? (tp / tc) * 100 : 0;
    const s = tp >= 0 ? '+' : '';
    return `<div class="pt-total">
      <div class="pt-cell" style="font-size:0.62rem;font-weight:700;color:var(--text3);">${label}</div>
      <div class="pt-cell pt-r"></div>
      <div class="pt-cell pt-r" style="font-size:0.7rem;">${fmtC(tc)}</div>
      <div class="pt-cell pt-r"></div>
      <div class="pt-cell pt-r" style="font-weight:700;">${fmtC(tv)}</div>
      <div class="pt-cell pt-r" style="font-weight:700;color:${pnlClr(tp)};">${s}${tpp.toFixed(1)}%</div>
    </div>`;
  }

  function _buildRows(holdings, funds) {
    const prices = State.get().prices || {};

    const stockRows = holdings.map(h => {
      const priceData = prices[h.symbol];
      const curr = priceData?.price || 0;
      const priceSource = priceData?.source || 'fallback';
      const price = curr || h.avgCost;
      const value = h.shares * price;
      const cost = h.shares * h.avgCost;
      const pnl = value - cost;
      const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
      const advisor = (window.ADVISOR_RATINGS || {})[h.symbol];
      const staticData = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === h.symbol && s.broker === h.broker);
      const ipoTx = h.broker === 'CDC'
        ? (State.get().transactions || []).find(t => t.type === 'IPO_SUBSCRIBE' && t.status === 'listed' && t.symbol === h.symbol)
        : null;
      return {
        key: h.symbol + '_' + h.broker, type: 'stock',
        symbol: h.symbol, name: staticData?.name || ipoTx?.name || h.symbol,
        broker: h.broker, shares: h.shares, avgCost: h.avgCost,
        price, priceSource, value, cost, pnl, pnlPct,
        advisor, isShariah: staticData?.isShariah, sector: staticData?.sector,
      };
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
      return {
        key: f.symbol + '_Meezan', type: 'fund',
        symbol: f.symbol, name: mf?.name || f.symbol,
        broker: 'Meezan', units: f.units, avgNav: f.avgNav,
        price: currentNav, priceSource, value, cost, pnl, pnlPct,
        advisor: null, isShariah: true, sector: mf?.type || 'Fund',
      };
    });

    return [...stockRows, ...fundRows];
  }

  function _applyFilter(rows, f) {
    if (f === 'all') return rows;
    if (f === 'rafi') return rows.filter(r => r.broker === 'Rafi');
    if (f === 'akd') return rows.filter(r => r.broker === 'AKD');
    if (f === 'cdc') return rows.filter(r => r.broker === 'CDC');
    if (f === 'meezan') return rows.filter(r => r.broker === 'Meezan');
    if (f === 'winners') return rows.filter(r => r.pnl > 0);
    if (f === 'losers') return rows.filter(r => r.pnl < 0);
    if (f === 'shariah') return rows.filter(r => r.isShariah);
    return rows;
  }

  function _applySort(rows, s) {
    if (s === 'value') return rows.slice().sort((a, b) => b.value - a.value);
    if (s === 'pnl%' || s === 'pnl') return rows.slice().sort((a, b) => b.pnlPct - a.pnlPct);
    if (s === 'name') return rows.slice().sort((a, b) => a.symbol.localeCompare(b.symbol));
    if (s === 'shares') return rows.slice().sort((a, b) => (b.shares || b.units || 0) - (a.shares || a.units || 0));
    return rows;
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
    const posLabel = row.type === 'fund'
      ? `${(row.units || 0).toFixed(4)} units`
      : `${(row.shares || 0).toLocaleString('en-PK')} shares`;
    const avgLabel = row.type === 'fund' ? 'Avg NAV' : 'Avg Cost';
    const avgVal = row.type === 'fund' ? row.avgNav : row.avgCost;

    const extraRow = row.type === 'fund'
      ? [['Units', (row.units || 0).toFixed(4)]]
      : [['Sector', row.sector || '—']];

    const statRows = [
      ['Current Value', fmt(row.value)],
      ['P&L', `<span class="${pnlClass}">${sign}${fmt(Math.abs(row.pnl))} (${sign}${row.pnlPct.toFixed(2)}%)</span>`],
      ['Position', posLabel],
      [avgLabel, fmtPrice(avgVal)],
      ['Current Price', fmtPrice(row.price) + (row.priceSource !== 'yahoo' ? ` <span style="font-size:0.7rem;color:var(--text3);">(${row.priceSource === 'manual' ? 'manual' : 'approx'})</span>` : '')],
      ['Total Cost', fmt(row.cost)],
      ['Price Source', _priceSourceLabel(row.priceSource)],
      ...extraRow,
    ].map(([l, v]) => `<div style="background:var(--bg2);padding:12px 14px;"><div class="metric-label">${l}</div><div style="font-size:0.88rem;font-weight:600;">${v}</div></div>`).join('');

    const content = `
      <div style="padding:16px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
          <div class="ht-icon" style="width:48px;height:48px;border-radius:10px;font-size:0.85rem;">${row.symbol.slice(0, 4)}</div>
          <div>
            <div style="font-size:1.1rem;font-weight:700;">${row.symbol}</div>
            <div style="font-size:0.78rem;color:var(--text3);">${row.name}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
              ${brokerBadge(row.broker)}
              ${row.type === 'fund' ? fundTypeBadge(row.sector) : (advisor ? ratingBadge(advisor.rating) : '')}
              ${row.isShariah ? '<span class="badge badge-shariah">&#9775; SHARIAH</span>' : ''}
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--bg4);border-radius:var(--r);overflow:hidden;margin-bottom:16px;">
          ${statRows}
        </div>

        ${advisor ? `
        <div class="card-highlight" style="margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <span style="font-size:0.78rem;font-weight:700;">Advisor View</span>
            ${ratingBadge(advisor.rating)}
            ${advisor.conviction ? `<span style="font-size:0.7rem;color:var(--text3);">Conviction ${advisor.conviction}/10</span>` : ''}
          </div>
          <div style="font-size:0.82rem;color:var(--text2);line-height:1.5;">${advisor.thesis}</div>
          ${advisor.target ? `<div style="margin-top:8px;font-size:0.78rem;"><span class="t-dim">Target: </span><span class="t-orange" style="font-weight:700;">&#8360;${advisor.target}</span></div>` : ''}
        </div>` : ''}

        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <button class="btn-primary" style="background:rgba(14,203,129,0.15);color:var(--green);border:1px solid rgba(14,203,129,0.3);" onclick="App.openAddTransaction('BUY','${row.symbol}','${row.broker}')">Log Buy</button>
          <button class="btn-primary" style="background:rgba(246,70,93,0.1);color:var(--red);border:1px solid rgba(246,70,93,0.2);" onclick="App.openAddTransaction('SELL','${row.symbol}','${row.broker}')">Log Sell</button>
        </div>
      </div>`;

    App.openBottomSheet('detail-sheet', row.symbol, content);
  }

  return { render };
})();
window.Portfolio = Portfolio;
