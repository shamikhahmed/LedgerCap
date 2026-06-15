'use strict';
const DividendService = (() => {

  function _loggedBySymbol() {
    return State.dividendsBySymbol();
  }

  function getHistory(symbol) {
    const txs = (State.get('transactions') || [])
      .filter(t => t.type === 'DIVIDEND' && (!symbol || t.symbol === symbol))
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    const seed = symbol && (window.FUNDAMENTALS_DB || {})[symbol];
    const seedHist = (seed?.divHistory || []).map(d => ({ year: d.y, amount: d.a, source: 'seed' }));
    return { logged: txs, seedAnnual: seedHist };
  }

  function getUpcoming() {
    const items = [];
    Object.entries(window.FUNDAMENTALS_DB || {}).forEach(([sym, f]) => {
      if (f.upcomingDiv) items.push({ symbol: sym, ...f.upcomingDiv, estAmount: f.upcomingDiv.amount });
    });
    const holdings = Ledger.calcHoldings(State.get('transactions') || []);
    return items.map(u => {
      const h = holdings.find(x => x.symbol === u.symbol);
      const estTotal = h ? (u.estAmount || 0) * h.shares : null;
      return { ...u, shares: h?.shares || 0, estTotal };
    }).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  }

  function getCalendar() {
    const upcoming = getUpcoming();
    const byMonth = {};
    upcoming.forEach(u => {
      const m = (u.date || '').slice(0, 7);
      if (!byMonth[m]) byMonth[m] = [];
      byMonth[m].push(u);
    });
    return byMonth;
  }

  function getPortfolioDividends() {
    const total = State.getTotalDividends();
    const txs = (State.get('transactions') || []).filter(t => t.type === 'DIVIDEND');
    const thisYear = new Date().getFullYear();
    const annual = txs.filter(t => (t.date || '').startsWith(String(thisYear))).reduce((s, t) => s + (t.amount || 0), 0);
    const thisMonth = new Date().toISOString().slice(0, 7);
    const monthly = txs.filter(t => (t.date || '').startsWith(thisMonth)).reduce((s, t) => s + (t.amount || 0), 0);
    const invested = State.calcTotalCost();
    const yieldOnPortfolio = invested > 0 ? (annual / invested) * 100 : 0;
    return { total, annual, monthly, yieldOnPortfolio, count: txs.length };
  }

  function getYieldOnCost(symbol, avgCost, shares) {
    const f = (window.FUNDAMENTALS_DB || {})[symbol];
    if (!f || !avgCost || !shares) return null;
    const lastDiv = f.divHistory?.[0]?.a || 0;
    const annualDiv = lastDiv * shares;
    const cost = avgCost * shares;
    return cost > 0 ? (annualDiv / cost) * 100 : null;
  }

  function getDividendGrowth(symbol) {
    const hist = (window.FUNDAMENTALS_DB || {})[symbol]?.divHistory || [];
    if (hist.length < 2) return null;
    const latest = hist[0].a;
    const prev = hist[hist.length - 1].a;
    if (!prev) return null;
    const years = hist.length - 1;
    return (Math.pow(latest / prev, 1 / years) - 1) * 100;
  }

  return {
    getHistory, getUpcoming, getCalendar, getPortfolioDividends,
    getYieldOnCost, getDividendGrowth, loggedBySymbol: _loggedBySymbol,
  };
})();
window.DividendService = DividendService;
