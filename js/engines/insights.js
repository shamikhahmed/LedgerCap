'use strict';
const Insights = (() => {

  function generate(state) {
    const results = [];
    const transactions = state.transactions || [];
    const prices = state.prices || {};
    const holdings = Ledger.calcHoldings(transactions);
    const funds = Ledger.calcFundHoldings(transactions);
    const monthlyContrib = Ledger.monthlyContributions(transactions);
    const now = new Date();
    const thisMonth = now.toISOString().slice(0, 7);

    // 1. Excess cash warning
    const thisSalary = transactions.filter(t => t.type === 'SALARY' && (t.date || '').startsWith(thisMonth))
      .reduce((a, t) => a + (t.amount || 0), 0);
    const thisInvest = monthlyContrib[thisMonth] || 0;
    if (thisSalary > 0 && thisInvest === 0) {
      results.push({ icon: '⚠️', color: '#F0B90B', text: 'Salary received this month but no investments logged yet. Consider contributing now.', priority: 1 });
    }

    // 2. Contribution streak
    let streak = 0;
    for (let i = 0; i < 12; i++) {
      const m = new Date(now.getFullYear(), now.getMonth() - i, 1).toISOString().slice(0, 7);
      if (monthlyContrib[m] > 0) streak++; else break;
    }
    if (streak >= 3) {
      results.push({ icon: '🔥', color: '#FF6B35', text: `${streak}-month investment streak! Consistency is the most powerful wealth-building tool.`, priority: 3 });
    }

    // 3. Concentration risk
    const stockValues = holdings.map(h => ({ symbol: h.symbol, value: h.shares * (prices[h.symbol]?.price || 0) }));
    const totalStockVal = stockValues.reduce((a, s) => a + s.value, 0);
    const topHolding = stockValues.slice().sort((a, b) => b.value - a.value)[0];
    if (topHolding && totalStockVal > 0) {
      const pct = (topHolding.value / totalStockVal) * 100;
      if (pct > 25) {
        results.push({ icon: '📊', color: '#F6465D', text: `${topHolding.symbol} represents ${pct.toFixed(0)}% of your stock portfolio. High concentration — consider diversifying.`, priority: 2 });
      }
    }

    // 4. MIIF buffer suggestion
    const miifFunds = funds.filter(f => f.symbol === 'MIIF-B' || f.symbol === 'MIIF-MMKA');
    const miifVal = miifFunds.reduce((a, f) => {
      const nav = prices[f.symbol]?.price || 55.98;
      return a + f.units * nav;
    }, 0);
    if (miifVal > 200000) {
      results.push({ icon: '💡', color: '#1890FF', text: `MIIF buffer is ₨${Math.round(miifVal / 1000)}k. Consider converting ₨200k to KMIF for higher long-term returns.`, priority: 2 });
    }

    // 5. MEBL underweight
    const meblHolding = holdings.find(h => h.symbol === 'MEBL');
    const meblVal = meblHolding ? meblHolding.shares * (prices['MEBL']?.price || 489) : 0;
    if (meblVal < 100000) {
      results.push({ icon: '🏦', color: '#0ECB81', text: 'MEBL is your highest-conviction stock but position is small. Advisor recommends building to ₨200k+.', priority: 2 });
    }

    // 6. Savings rate (last 6 months)
    let totalSalary6m = 0, totalInvest6m = 0;
    for (let i = 0; i < 6; i++) {
      const m = new Date(now.getFullYear(), now.getMonth() - i, 1).toISOString().slice(0, 7);
      totalSalary6m += transactions.filter(t => t.type === 'SALARY' && (t.date || '').startsWith(m))
        .reduce((a, t) => a + (t.amount || 0), 0);
      totalInvest6m += monthlyContrib[m] || 0;
    }
    if (totalSalary6m > 0) {
      const rate = (totalInvest6m / totalSalary6m) * 100;
      if (rate > 30) {
        results.push({ icon: '⭐', color: '#0ECB81', text: `Investment rate is ${rate.toFixed(0)}% of income over 6 months. Excellent financial discipline.`, priority: 3 });
      } else if (rate < 15 && rate > 0) {
        results.push({ icon: '📉', color: '#F0B90B', text: `Investment rate is only ${rate.toFixed(0)}% of income. Target 30%+ for meaningful wealth building.`, priority: 2 });
      }
    }

    // 7. Portfolio all-time high
    const history = state.priceHistory || [];
    if (history.length > 5) {
      const current = history[history.length - 1]?.value || 0;
      const prevMax = Math.max(...history.slice(0, -1).map(h => h.value));
      if (current > prevMax && prevMax > 0) {
        results.push({ icon: '🏆', color: '#0ECB81', text: 'New portfolio all-time high! Your wealth is at its peak value.', priority: 1 });
      }
    }

    return results.sort((a, b) => a.priority - b.priority).slice(0, 5);
  }

  return { generate };
})();
window.Insights = Insights;
