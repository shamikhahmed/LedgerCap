'use strict';
const Ledger = (() => {

  function calcHoldings(transactions) {
    const holdings = {};
    (transactions || []).filter(t => t.type === 'BUY' || t.type === 'SELL').forEach(t => {
      if (!t.symbol) return;
      const key = t.symbol + '_' + t.broker;
      if (!holdings[key]) holdings[key] = { symbol: t.symbol, broker: t.broker, shares: 0, totalCost: 0 };
      if (t.type === 'BUY') {
        holdings[key].totalCost += (t.shares || 0) * (t.price || 0);
        holdings[key].shares += (t.shares || 0);
      } else {
        const prevShares = holdings[key].shares;
        holdings[key].shares -= (t.shares || 0);
        holdings[key].totalCost = holdings[key].shares > 0
          ? (holdings[key].totalCost / prevShares) * holdings[key].shares
          : 0;
      }
    });
    return Object.values(holdings).filter(h => h.shares > 0).map(h => ({
      ...h,
      avgCost: h.shares > 0 ? h.totalCost / h.shares : 0,
    }));
  }

  function calcFundHoldings(transactions) {
    const funds = {};
    (transactions || []).filter(t => t.type === 'CONTRIBUTION' && t.symbol).forEach(t => {
      if (!funds[t.symbol]) funds[t.symbol] = { symbol: t.symbol, broker: t.broker || 'Meezan', units: 0, totalInvested: 0 };
      funds[t.symbol].units += (t.units || 0);
      funds[t.symbol].totalInvested += (t.amount || 0);
    });
    return Object.values(funds).filter(f => f.units > 0).map(f => ({
      ...f,
      avgNav: f.units > 0 ? f.totalInvested / f.units : 0,
    }));
  }

  function monthlyContributions(transactions) {
    const monthly = {};
    (transactions || []).filter(t => ['BUY', 'CONTRIBUTION'].includes(t.type)).forEach(t => {
      const month = (t.date || '').slice(0, 7);
      if (month) monthly[month] = (monthly[month] || 0) + (t.amount || 0);
    });
    return monthly;
  }

  function monthlySalary(transactions) {
    const monthly = {};
    (transactions || []).filter(t => t.type === 'SALARY').forEach(t => {
      const month = (t.date || '').slice(0, 7);
      if (month) monthly[month] = (monthly[month] || 0) + (t.amount || 0);
    });
    return monthly;
  }

  function totalInvested(transactions) {
    return (transactions || [])
      .filter(t => ['BUY', 'CONTRIBUTION'].includes(t.type))
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  function totalDividends(transactions) {
    return (transactions || [])
      .filter(t => t.type === 'DIVIDEND')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  function realisedPnl(transactions) {
    let pnl = 0;
    const holdings = {};
    (transactions || []).filter(t => t.type === 'BUY' || t.type === 'SELL').forEach(t => {
      const key = t.symbol + '_' + t.broker;
      if (!holdings[key]) holdings[key] = { shares: 0, totalCost: 0 };
      if (t.type === 'BUY') {
        holdings[key].shares += t.shares || 0;
        holdings[key].totalCost += (t.shares || 0) * (t.price || 0);
      } else {
        const avgCost = holdings[key].shares > 0 ? holdings[key].totalCost / holdings[key].shares : 0;
        pnl += ((t.price || 0) - avgCost) * (t.shares || 0);
        holdings[key].shares -= t.shares || 0;
        holdings[key].totalCost = holdings[key].shares > 0 ? avgCost * holdings[key].shares : 0;
      }
    });
    return pnl;
  }

  function currentMonthContribution(transactions) {
    const now = new Date();
    const monthKey = now.toISOString().slice(0, 7);
    return (transactions || [])
      .filter(t => (t.date || '').startsWith(monthKey) && ['BUY', 'CONTRIBUTION'].includes(t.type))
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  function newId() { return 'tx_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6); }

  return { calcHoldings, calcFundHoldings, monthlyContributions, monthlySalary,
    totalInvested, totalDividends, realisedPnl, currentMonthContribution, newId };
})();
window.Ledger = Ledger;
