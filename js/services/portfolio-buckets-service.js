'use strict';
const PortfolioBuckets = (() => {
  const BUILTIN = [
    { id: 'psx', name: 'Pakistan PSX', kind: 'psx', icon: '🇵🇰', builtin: true, desc: 'Stocks · Rafi · AKD · CDC' },
    { id: 'funds', name: 'Islamic Funds', kind: 'funds', icon: '☪', builtin: true, desc: 'Meezan · AMC units' },
    { id: 'usa', name: 'US Equities', kind: 'intl', icon: '🇺🇸', builtin: true, desc: 'IBKR · US stocks & crypto' },
  ];

  function inferBuiltinId(tx) {
    const t = tx?.type || '';
    if (['CONTRIBUTION', 'FUND_OUT', 'REDEMPTION'].includes(t)) return 'funds';
    if (['INTL_BUY', 'INTL_SELL'].includes(t) || tx.assetClass === 'intl') return 'usa';
    if (['CRYPTO_BUY', 'CRYPTO_SELL'].includes(t) || tx.assetClass === 'crypto') return 'usa';
    if (['BUY', 'SELL', 'DIVIDEND', 'IPO_SUBSCRIBE'].includes(t) && tx.symbol) return 'psx';
    return null;
  }

  function list(state) {
    state = state || (typeof State !== 'undefined' ? State.get() : {});
    const custom = (state.portfolios || []).map(p => ({
      ...p,
      builtin: false,
      icon: p.icon || (p.kind === 'intl' ? '🇺🇸' : p.kind === 'crypto' ? '₿' : p.kind === 'funds' ? '☪' : '🇵🇰'),
      desc: p.desc || 'Custom ledger',
    }));
    return [...BUILTIN, ...custom];
  }

  function txsForBucket(state, bucketId) {
    const txs = state?.transactions || [];
    const bucket = list(state).find(b => b.id === bucketId);
    if (!bucket) return txs;
    if (bucket.builtin) {
      return txs.filter(t => !t.portfolioId && inferBuiltinId(t) === bucketId);
    }
    return txs.filter(t => t.portfolioId === bucketId);
  }

  function statsForBucket(state, bucketId) {
    const txs = txsForBucket(state, bucketId);
    const bucket = list(state).find(b => b.id === bucketId);
    if (!bucket) return { value: 0, invested: 0, pnl: 0, pnlPct: 0, positions: 0 };

    let rows = [];
    if (bucket.kind === 'psx') {
      rows = Ledger.calcHoldings(txs).map(h => {
        const price = State.getPrice(h.symbol) || h.avgCost;
        return { value: h.shares * price, cost: h.shares * h.avgCost };
      });
    } else if (bucket.kind === 'funds') {
      rows = Ledger.calcFundHoldings(txs).map(f => {
        const nav = State.getPrice(f.symbol) || f.avgNav;
        return { value: f.units * nav, cost: f.totalInvested };
      });
    } else {
      rows = (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).map(h => {
        const price = State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0);
        const cost = h.qty * FxService.usdToPkr(h.avgCostUsd || 0);
        return { value: h.qty * price, cost };
      });
    }

    const value = rows.reduce((s, r) => s + r.value, 0);
    const invested = rows.reduce((s, r) => s + r.cost, 0);
    const pnl = value - invested;
    return {
      value, invested, pnl,
      pnlPct: invested > 0 ? (pnl / invested) * 100 : 0,
      positions: rows.length,
    };
  }

  function bucketSparkline(state, bucketId) {
    const txs = txsForBucket(state, bucketId);
    if (!txs.length || typeof Ledger === 'undefined' || !Ledger.portfolioValueTimeline) return [];
    const fp = window.FALLBACK_PRICES || {};
    const pts = Ledger.portfolioValueTimeline(txs, (sym, fb) => {
      const p = State.get()?.prices?.[sym]?.price;
      return (p && p > 0) ? p : (fp[sym] || fb || 0);
    });
    return pts.slice(-14).map(p => p.value).filter(v => v > 0);
  }

  function getHoldingsForBucket(state, bucketId) {
    const bucket = list(state).find(b => b.id === bucketId);
    if (!bucket) return PortfolioAnalyticsService.getHoldings(state);
    const txs = txsForBucket(state, bucketId);
    const slice = { ...state, transactions: txs };
    const all = PortfolioAnalyticsService.getHoldings(slice);
    if (bucket.builtin) {
      if (bucket.id === 'psx') return all.filter(h => h.kind === 'stock');
      if (bucket.id === 'funds') return all.filter(h => h.kind === 'fund');
      if (bucket.id === 'usa') return all.filter(h => h.kind === 'intl' || h.kind === 'crypto');
    }
    return all;
  }

  function defaultTxType(kind) {
    if (kind === 'funds') return 'CONTRIBUTION';
    if (kind === 'intl') return 'INTL_BUY';
    if (kind === 'crypto') return 'CRYPTO_BUY';
    return 'BUY';
  }

  function cardsHtml(state, opts) {
    opts = opts || {};
    const activeId = opts.activeId || null;
    const click = opts.onClick || 'Hub.openPortfolio';
    const buckets = list(state);
    const cards = buckets.map(b => {
      const s = statsForBucket(state, b.id);
      const empty = s.positions === 0;
      const on = activeId === b.id ? ' on' : '';
      const spark = bucketSparkline(state, b.id);
      const sparkHtml = spark.length >= 2 && typeof Charts !== 'undefined'
        ? `<div class="lc-portfolio-spark">${Charts.lineChart(spark, { height: 28, color: s.pnl >= 0 ? '#22c55e' : '#ef4444' })}</div>`
        : '';
      const del = !b.builtin
        ? `<button type="button" class="lc-portfolio-del" aria-label="Delete ${b.name}" onclick="event.stopPropagation();App.deletePortfolio('${b.id}')">×</button>`
        : '';
      return `<button type="button" class="lc-portfolio-card${on}${empty ? ' lc-portfolio-card--empty' : ''}" onclick="${click}('${b.id}')" aria-label="${b.name}, ${empty ? 'empty' : PsxUI.fmt(s.value) + ', ' + s.positions + ' positions'}">
        ${del}
        <span class="lc-portfolio-card-icon" aria-hidden="true">${b.icon}</span>
        <div class="lc-portfolio-card-body">
          <strong>${b.name}</strong>
          <span class="lc-portfolio-card-desc">${b.desc}</span>
          ${sparkHtml}
        </div>
        <div class="lc-portfolio-card-meta">
          <em>${empty ? '—' : PsxUI.fmt(s.value)}</em>
          <span class="${empty ? '' : PsxUI.chgCls(s.pnlPct)}">${empty ? 'Set up' : PsxUI.fmt(s.pnlPct, { pct: true, signed: true })}</span>
          <label>${s.positions} pos</label>
        </div>
      </button>`;
    }).join('');
    const add = `<button type="button" class="lc-portfolio-card lc-portfolio-card--add" onclick="App.openAddPortfolio()" aria-label="Add portfolio">
      <span class="lc-portfolio-card-icon" aria-hidden="true">+</span>
      <div class="lc-portfolio-card-body"><strong>Add portfolio</strong><span class="lc-portfolio-card-desc">USA · crypto · PSX · funds</span></div>
    </button>`;
    return cards + add;
  }

  return {
    BUILTIN, list, inferBuiltinId, txsForBucket, statsForBucket, bucketSparkline,
    getHoldingsForBucket, defaultTxType, cardsHtml,
  };
})();
window.PortfolioBuckets = PortfolioBuckets;
