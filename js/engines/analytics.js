'use strict';
const Analytics = (() => {

  function _staticMeta(symbol, broker) {
    return [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])]
      .find(s => s.symbol === symbol && (!broker || s.broker === broker));
  }

  function _sector(symbol, broker, sectorMap) {
    if (sectorMap && sectorMap[symbol]) return sectorMap[symbol];
    const meta = _staticMeta(symbol, broker);
    if (meta?.sector) return meta.sector;
    const mf = (window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol);
    return mf?.type || 'Other';
  }

  function _daysBetween(d1, d2) {
    return (new Date(d2) - new Date(d1)) / 86400000;
  }

  /** Newton-Raphson XIRR approximation */
  function xirr(cashflows, guess) {
    if (!cashflows || cashflows.length < 2) return null;
    const sorted = [...cashflows].sort((a, b) => a.date.localeCompare(b.date));
    const t0 = new Date(sorted[0].date).getTime();
    const flows = sorted.map(cf => ({
      amount: cf.amount,
      t: (_daysBetween(t0, cf.date)) / 365.25,
    }));
    let rate = guess != null ? guess : 0.1;
    for (let i = 0; i < 100; i++) {
      let f = 0;
      let df = 0;
      flows.forEach(({ amount, t }) => {
        const base = Math.pow(1 + rate, t);
        if (base === 0 || !isFinite(base)) return;
        f += amount / base;
        df -= (t * amount) / (base * (1 + rate));
      });
      if (Math.abs(f) < 1e-7) return rate;
      if (df === 0) break;
      const next = rate - f / df;
      if (!isFinite(next) || next <= -0.999) break;
      if (Math.abs(next - rate) < 1e-7) return next;
      rate = next;
    }
    return isFinite(rate) ? rate : null;
  }

  function buildCashflows(state) {
    const txs = state.transactions || [];
    const flows = [];
    txs.forEach(t => {
      if (!t.date) return;
      if (['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type)) {
        flows.push({ date: t.date, amount: -(t.amount || 0) });
      } else if (t.type === 'SELL') {
        flows.push({ date: t.date, amount: t.amount || 0 });
      } else if (t.type === 'DIVIDEND') {
        flows.push({ date: t.date, amount: t.amount || 0 });
      }
    });
    const today = new Date().toISOString().slice(0, 10);
    const totalValue = State.calcTotalValue();
    if (totalValue > 0) flows.push({ date: today, amount: totalValue });
    return flows;
  }

  function computeXirr(state) {
    const flows = buildCashflows(state);
    const invested = flows.filter(f => f.amount < 0).reduce((s, f) => s + Math.abs(f.amount), 0);
    if (invested <= 0 || flows.length < 2) return null;
    const rate = xirr(flows);
    return rate != null && isFinite(rate) ? rate : null;
  }

  function annualReturn(state) {
    const history = (state.priceHistory || []).filter(h => h.value > 0);
    if (history.length >= 2) {
      const first = history[0];
      const last = history[history.length - 1];
      const days = Math.max(1, _daysBetween(first.date, last.date));
      const years = days / 365.25;
      if (years >= 0.08 && first.value > 0) {
        return Math.pow(last.value / first.value, 1 / years) - 1;
      }
    }
    const x = computeXirr(state);
    return x;
  }

  function totalReturn(state) {
    const cost = State.calcTotalCost();
    const value = State.calcTotalValue();
    if (cost <= 0) return { abs: 0, pct: 0 };
    return { abs: value - cost, pct: ((value - cost) / cost) * 100 };
  }

  function assetAllocation(state) {
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    let stocks = 0;
    let fundVal = 0;
    holdings.forEach(h => {
      stocks += h.shares * (State.getPrice(h.symbol) || h.avgCost);
    });
    funds.forEach(f => {
      const nav = State.getPrice(f.symbol);
      const mf = (window.MEEZAN_FUNDS || []).find(m => m.symbol === f.symbol);
      fundVal += f.units * (nav || mf?.currentNav || f.avgNav);
    });
    let globalVal = 0;
    (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).forEach(h => {
      globalVal += h.qty * (State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0));
    });
    const total = stocks + fundVal + globalVal || 1;
    return {
      stocks, funds: fundVal, global: globalVal, total,
      stocksPct: (stocks / total) * 100,
      fundsPct: (fundVal / total) * 100,
      globalPct: (globalVal / total) * 100,
    };
  }

  function brokerAllocation(state) {
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    const map = {};
    holdings.forEach(h => {
      const b = h.broker || 'Other';
      map[b] = (map[b] || 0) + h.shares * (State.getPrice(h.symbol) || h.avgCost);
    });
    funds.forEach(f => {
      map['Meezan'] = (map['Meezan'] || 0) + f.units * (State.getPrice(f.symbol) || f.avgNav);
    });
    const total = Object.values(map).reduce((a, v) => a + v, 0) || 1;
    return Object.entries(map)
      .map(([broker, value]) => ({ broker, value, pct: (value / total) * 100 }))
      .sort((a, b) => b.value - a.value);
  }

  function sectorAllocation(state) {
    const sectorMap = state.sectorMap || {};
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    const map = {};
    holdings.forEach(h => {
      const sector = _sector(h.symbol, h.broker, sectorMap);
      map[sector] = (map[sector] || 0) + h.shares * (State.getPrice(h.symbol) || h.avgCost);
    });
    funds.forEach(f => {
      const sector = _sector(f.symbol, f.broker, sectorMap);
      const nav = State.getPrice(f.symbol) || f.avgNav;
      map[sector] = (map[sector] || 0) + f.units * nav;
    });
    const total = Object.values(map).reduce((a, v) => a + v, 0) || 1;
    return Object.entries(map)
      .map(([sector, value]) => ({ sector, value, pct: (value / total) * 100 }))
      .sort((a, b) => b.value - a.value);
  }

  function riskScore(state) {
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const prices = state.prices || {};
    let score = 35;
    const stockValues = holdings.map(h => ({
      symbol: h.symbol,
      value: h.shares * (prices[h.symbol]?.price || State.getPrice(h.symbol) || h.avgCost),
    }));
    const totalStock = stockValues.reduce((a, s) => a + s.value, 0);
    const top = stockValues.sort((a, b) => b.value - a.value)[0];
    if (top && totalStock > 0) {
      const conc = top.value / totalStock;
      if (conc > 0.35) score += 28;
      else if (conc > 0.25) score += 18;
      else if (conc > 0.15) score += 8;
    }
    const sectors = sectorAllocation(state);
    if (sectors.length <= 2) score += 15;
    else if (sectors.length <= 4) score += 8;
    const history = state.priceHistory || [];
    if (history.length >= 5) {
      const vals = history.map(h => h.value);
      const mean = vals.reduce((a, v) => a + v, 0) / vals.length;
      const variance = vals.reduce((a, v) => a + Math.pow(v - mean, 2), 0) / vals.length;
      const cv = mean > 0 ? Math.sqrt(variance) / mean : 0;
      if (cv > 0.08) score += 12;
      else if (cv > 0.04) score += 6;
    }
    const shariahVal = holdings.reduce((sum, h) => {
      const meta = _staticMeta(h.symbol, h.broker);
      if (!meta?.isShariah) return sum;
      return sum + h.shares * (State.getPrice(h.symbol) || h.avgCost);
    }, 0);
    const total = State.calcTotalValue() || 1;
    const nonShariahPct = 1 - shariahVal / total;
    if (nonShariahPct > 0.5) score += 10;
    return Math.min(100, Math.max(0, Math.round(score)));
  }

  function portfolioHealth(state) {
    const settings = state.settings || {};
    const risk = riskScore(state);
    const ret = totalReturn(state);
    const x = computeXirr(state);
    const target = settings.targetReturn || 0.18;
    const streak = _contribStreak(state);
    let health = 72;
    if (ret.pct >= target * 100) health += 12;
    else if (ret.pct >= target * 50) health += 6;
    else if (ret.pct < 0) health -= 15;
    if (x != null && x >= target) health += 8;
    health -= Math.round(risk * 0.25);
    health += Math.min(12, streak * 2);
    const sipPct = _sipProgress(state);
    if (sipPct >= 100) health += 8;
    else if (sipPct < 50) health -= 6;
    return Math.min(100, Math.max(0, Math.round(health)));
  }

  function _contribStreak(state) {
    const monthly = Ledger.monthlyContributions(state.transactions || []);
    const now = new Date();
    let streak = 0;
    for (let i = 0; i < 12; i++) {
      const m = new Date(now.getFullYear(), now.getMonth() - i, 1).toISOString().slice(0, 7);
      if (monthly[m] > 0) streak++;
      else break;
    }
    return streak;
  }

  function _sipProgress(state) {
    const settings = state.settings || {};
    const target = settings.targetSIP || 75000;
    const contrib = Ledger.currentMonthContribution(state.transactions || []);
    return target > 0 ? (contrib / target) * 100 : 0;
  }

  function aiSummary(state) {
    const ret = totalReturn(state);
    const health = portfolioHealth(state);
    const risk = riskScore(state);
    const x = computeXirr(state);
    const divs = State.getTotalDividends();
    const daily = State.calcDailyPnl();
    const parts = [];
    parts.push(`Portfolio health ${health}/100 with risk score ${risk}/100.`);
    if (ret.pct >= 0) parts.push(`Total return ${ret.pct.toFixed(1)}% on invested capital.`);
    else parts.push(`Portfolio is down ${Math.abs(ret.pct).toFixed(1)}% from cost basis.`);
    if (x != null) parts.push(`XIRR approximates ${(x * 100).toFixed(1)}% annualised.`);
    if (divs > 0) parts.push(`Lifetime dividends ${Math.round(divs).toLocaleString()} PKR collected.`);
    if (daily !== 0) parts.push(`Today's move ${daily >= 0 ? '+' : ''}${Math.round(daily).toLocaleString()} PKR.`);
    return parts.join(' ');
  }

  function dashboardMetrics(state) {
    const ret = totalReturn(state);
    return {
      totalValue: State.calcTotalValue(),
      totalCost: State.calcTotalCost(),
      dailyPnl: State.calcDailyPnl(),
      totalReturn: ret,
      annualReturn: annualReturn(state),
      xirr: computeXirr(state),
      dividendIncome: State.getTotalDividends(),
      portfolioHealth: portfolioHealth(state),
      riskScore: riskScore(state),
      assetAllocation: assetAllocation(state),
      sectorAllocation: sectorAllocation(state),
      brokerAllocation: brokerAllocation(state),
      aiSummary: aiSummary(state),
      insights: Insights.generate(state),
      sipProgress: _sipProgress(state),
    };
  }

  function scenarioPrices(symbol, currentPrice) {
    const advisor = (window.ADVISOR_RATINGS || {})[symbol];
    const target = advisor?.target;
    const base = currentPrice || (window.FALLBACK_PRICES || {})[symbol] || 0;
    if (!base) return { bull: 0, base: 0, bear: 0 };
    const bull = target ? target * 1.12 : base * 1.25;
    const bear = base * 0.78;
    const mid = target || base * 1.08;
    return { bull: Math.round(bull * 100) / 100, base: Math.round(mid * 100) / 100, bear: Math.round(bear * 100) / 100 };
  }

  return {
    xirr, buildCashflows, computeXirr, annualReturn, totalReturn,
    assetAllocation, brokerAllocation, sectorAllocation,
    riskScore, portfolioHealth, aiSummary, dashboardMetrics, scenarioPrices,
  };
})();
window.Analytics = Analytics;
