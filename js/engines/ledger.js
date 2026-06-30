'use strict';
const Ledger = (() => {

  const CDC_BROKER = 'CDC';

  function _holdingKey(symbol, broker) {
    return symbol + '_' + (broker || CDC_BROKER);
  }

  function _globalKey(symbol, assetClass, broker) {
    return `${assetClass || 'intl'}_${symbol}_${broker || 'Global'}`;
  }

  function calcGlobalHoldings(transactions) {
    const map = {};
    _sortTxs(transactions).forEach(t => {
      if (!t.symbol) return;
      const ac = t.assetClass || (t.type.startsWith('CRYPTO') ? 'crypto' : 'intl');
      const key = _globalKey(t.symbol, ac, t.broker);
      if (!map[key]) {
        map[key] = {
          symbol: t.symbol, broker: t.broker || 'IBKR', assetClass: ac,
          qty: 0, totalCostUsd: 0, currency: t.currency || 'USD',
        };
      }
      const qty = t.shares || t.qty || 0;
      if (t.type === 'INTL_BUY' || t.type === 'CRYPTO_BUY') {
        const costUsd = t.costUsd != null ? t.costUsd : (t.priceUsd || t.price || 0) * qty;
        map[key].qty += qty;
        map[key].totalCostUsd += costUsd;
      } else if (t.type === 'INTL_SELL' || t.type === 'CRYPTO_SELL') {
        const sold = Math.min(qty, map[key].qty);
        const avg = map[key].qty > 0 ? map[key].totalCostUsd / map[key].qty : 0;
        map[key].qty -= sold;
        map[key].totalCostUsd = map[key].qty > 0 ? avg * map[key].qty : 0;
      }
    });
    return Object.values(map).filter(h => h.qty > 0.00000001).map(h => ({
      ...h,
      avgCostUsd: h.qty > 0 ? h.totalCostUsd / h.qty : 0,
    }));
  }

  function _addShares(holdings, symbol, broker, shares, cost) {
    if (!symbol || !shares) return;
    const key = _holdingKey(symbol, broker);
    if (!holdings[key]) holdings[key] = { symbol, broker: broker || CDC_BROKER, shares: 0, totalCost: 0 };
    holdings[key].totalCost += cost;
    holdings[key].shares += shares;
  }

  function _sortTxs(transactions) {
    return (transactions || [])
      .slice()
      .sort((a, b) => (a.date || '').localeCompare(b.date || '') || String(a.id || '').localeCompare(String(b.id || '')));
  }

  function _removeShares(holdings, symbol, broker, shares) {
    if (!symbol || !shares) return 0;
    const key = _holdingKey(symbol, broker);
    if (!holdings[key] || holdings[key].shares <= 0) return 0;
    const prevShares = holdings[key].shares;
    const sold = Math.min(shares, prevShares);
    holdings[key].shares -= sold;
    holdings[key].totalCost = holdings[key].shares > 0
      ? (holdings[key].totalCost / prevShares) * holdings[key].shares
      : 0;
    return sold;
  }

  function calcHoldings(transactions) {
    const holdings = {};
    _sortTxs(transactions).forEach(t => {
      if (!t.symbol) return;
      if (t.type === 'BUY') {
        _addShares(holdings, t.symbol, t.broker, t.shares || 0, (t.shares || 0) * (t.price || 0));
      } else if (t.type === 'SELL') {
        _removeShares(holdings, t.symbol, t.broker, t.shares || 0);
      } else if (t.type === 'IPO_SUBSCRIBE' && t.status === 'listed') {
        const shares = t.allottedShares || t.shares || 0;
        const cost = t.amount || shares * (t.listingPrice || 0);
        _addShares(holdings, t.symbol, CDC_BROKER, shares, cost);
      }
    });
    return Object.values(holdings).filter(h => h.shares > 0).map(h => ({
      ...h,
      avgCost: h.shares > 0 ? h.totalCost / h.shares : 0,
    }));
  }

  function calcIpoPending(transactions) {
    return (transactions || [])
      .filter(t => t.type === 'IPO_SUBSCRIBE' && (t.status || 'pending') === 'pending')
      .map(t => ({
        id: t.id,
        symbol: t.symbol,
        name: t.name || t.symbol,
        shares: t.shares || 0,
        amount: t.amount || 0,
        broker: t.broker || CDC_BROKER,
        date: t.date,
        notes: t.notes || '',
      }));
  }

  function calcFundHoldings(transactions) {
    const funds = {};
    _sortTxs(transactions)
      .filter(t => ['CONTRIBUTION', 'FUND_OUT', 'REDEMPTION'].includes(t.type) && t.symbol)
      .forEach(t => {
        if (!funds[t.symbol]) funds[t.symbol] = { symbol: t.symbol, broker: t.broker || 'Meezan', units: 0, totalInvested: 0 };
        if (t.type === 'CONTRIBUTION') {
          funds[t.symbol].units += (t.units || 0);
          funds[t.symbol].totalInvested += (t.amount || 0);
        } else {
          const prevUnits = funds[t.symbol].units;
          const outUnits = Math.abs(t.units || 0);
          funds[t.symbol].units -= outUnits;
          funds[t.symbol].totalInvested = funds[t.symbol].units > 0
            ? (funds[t.symbol].totalInvested / prevUnits) * funds[t.symbol].units
            : 0;
        }
      });
    return Object.values(funds).filter(f => f.units > 0.0001).map(f => ({
      ...f,
      avgNav: f.units > 0 ? f.totalInvested / f.units : 0,
    }));
  }

  function monthlyContributions(transactions) {
    const monthly = {};
    (transactions || []).filter(t => ['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type) && !t.internal).forEach(t => {
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

  /** Gross cash deployed (includes fund convert-ins). Prefer currentCostBasis for return metrics. */
  function totalInvested(transactions) {
    return (transactions || [])
      .filter(t => ['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type) && !t.internal)
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  /** Net cost basis of open stock + fund positions. */
  function currentCostBasis(transactions) {
    const stocks = calcHoldings(transactions);
    const funds = calcFundHoldings(transactions);
    return stocks.reduce((sum, h) => sum + (h.totalCost || 0), 0)
      + funds.reduce((sum, f) => sum + (f.totalInvested || 0), 0);
  }

  function unrealisedPnl(transactions, priceFn) {
    const px = (sym, fallback) => {
      const p = priceFn ? priceFn(sym, fallback) : fallback;
      return (p && p > 0) ? p : fallback;
    };
    const stocks = calcHoldings(transactions);
    const funds = calcFundHoldings(transactions);
    const stockVal = stocks.reduce((sum, h) => sum + h.shares * px(h.symbol, h.avgCost), 0);
    const fundVal = funds.reduce((sum, f) => sum + f.units * px(f.symbol, f.avgNav), 0);
    return (stockVal + fundVal) - currentCostBasis(transactions);
  }

  function totalDividends(transactions) {
    return (transactions || [])
      .filter(t => t.type === 'DIVIDEND')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  function _walkStockLedger(transactions, onSell) {
    const holdings = {};
    (transactions || [])
      .slice()
      .sort((a, b) => (a.date || '').localeCompare(b.date || '') || String(a.id || '').localeCompare(String(b.id || '')))
      .forEach(t => {
      if (!t.symbol) return;
      const key = _holdingKey(t.symbol, t.type === 'IPO_SUBSCRIBE' ? CDC_BROKER : t.broker);
      if (!holdings[key]) holdings[key] = { shares: 0, totalCost: 0 };
      if (t.type === 'BUY') {
        holdings[key].shares += t.shares || 0;
        holdings[key].totalCost += (t.shares || 0) * (t.price || 0);
      } else if (t.type === 'IPO_SUBSCRIBE' && t.status === 'listed') {
        const shares = t.allottedShares || t.shares || 0;
        holdings[key].shares += shares;
        holdings[key].totalCost += t.amount || shares * (t.listingPrice || 0);
      } else if (t.type === 'SELL') {
        const requested = t.shares || 0;
        const sold = holdings[key].shares > 0 ? Math.min(requested, holdings[key].shares) : 0;
        const avgCost = holdings[key].shares > 0 ? holdings[key].totalCost / holdings[key].shares : 0;
        const sellPnl = ((t.price || 0) - avgCost) * sold;
        if (onSell) onSell(t, sellPnl, avgCost);
        holdings[key].shares -= sold;
        holdings[key].totalCost = holdings[key].shares > 0 ? avgCost * holdings[key].shares : 0;
      }
    });
    return holdings;
  }

  function realisedPnl(transactions) {
    let pnl = 0;
    _walkStockLedger(transactions, (_t, sellPnl) => { pnl += sellPnl; });
    return pnl;
  }

  function realisedPnlByDate(transactions) {
    const byDate = {};
    _walkStockLedger(transactions, (t, sellPnl) => {
      const d = t.date || '';
      if (!d) return;
      byDate[d] = (byDate[d] || 0) + sellPnl;
    });
    return byDate;
  }

  function _portfolioSnapshot(stockHoldings, fundHoldings, priceFn) {
    let value = 0;
    let cost = 0;
    Object.values(stockHoldings).forEach(h => {
      if (h.shares <= 0) return;
      const px = priceFn(h.symbol, h.avgCost, 'stock');
      value += h.shares * px;
      cost += h.totalCost;
    });
    Object.values(fundHoldings).forEach(f => {
      if (f.units <= 0) return;
      const px = priceFn(f.symbol, f.avgNav, 'fund');
      value += f.units * px;
      cost += f.totalInvested;
    });
    return { value, cost, unrealised: value - cost };
  }

  function portfolioValueTimeline(transactions, priceFn) {
    const sorted = (transactions || [])
      .filter(t => t.date && ['BUY', 'SELL', 'CONTRIBUTION', 'FUND_OUT', 'REDEMPTION', 'IPO_SUBSCRIBE'].includes(t.type))
      .sort((a, b) => a.date.localeCompare(b.date) || String(a.id || '').localeCompare(String(b.id || '')));

    const stockLedger = {};
    const fundLedger = {};
    const byDate = {};
    const px = (sym, fallback, _kind) => {
      const p = priceFn ? priceFn(sym, fallback) : fallback;
      return (p && p > 0) ? p : fallback;
    };

    sorted.forEach(t => {
      if (t.type === 'BUY') {
        _addShares(stockLedger, t.symbol, t.broker, t.shares || 0, (t.shares || 0) * (t.price || 0));
      } else if (t.type === 'SELL') {
        _removeShares(stockLedger, t.symbol, t.broker, t.shares || 0);
      } else if (t.type === 'CONTRIBUTION') {
        if (!fundLedger[t.symbol]) fundLedger[t.symbol] = { symbol: t.symbol, units: 0, totalInvested: 0, avgNav: 0 };
        fundLedger[t.symbol].units += (t.units || 0);
        fundLedger[t.symbol].totalInvested += (t.amount || 0);
        fundLedger[t.symbol].avgNav = fundLedger[t.symbol].units > 0
          ? fundLedger[t.symbol].totalInvested / fundLedger[t.symbol].units : 0;
      } else if (t.type === 'FUND_OUT' || t.type === 'REDEMPTION') {
        if (!fundLedger[t.symbol]) fundLedger[t.symbol] = { symbol: t.symbol, units: 0, totalInvested: 0, avgNav: 0 };
        const avgNav = fundLedger[t.symbol].units > 0 ? fundLedger[t.symbol].totalInvested / fundLedger[t.symbol].units : 0;
        fundLedger[t.symbol].units -= Math.abs(t.units || 0);
        fundLedger[t.symbol].totalInvested = fundLedger[t.symbol].units > 0 ? avgNav * fundLedger[t.symbol].units : 0;
        fundLedger[t.symbol].avgNav = fundLedger[t.symbol].units > 0 ? avgNav : 0;
      } else if (t.type === 'IPO_SUBSCRIBE' && t.status === 'listed') {
        const shares = t.allottedShares || t.shares || 0;
        const cost = t.amount || shares * (t.listingPrice || 0);
        _addShares(stockLedger, t.symbol, CDC_BROKER, shares, cost);
      }

      const stockHoldings = {};
      Object.entries(stockLedger).forEach(([key, h]) => {
        if (h.shares > 0) {
          stockHoldings[key] = { ...h, avgCost: h.shares > 0 ? h.totalCost / h.shares : 0 };
        }
      });
      const snap = _portfolioSnapshot(stockHoldings, fundLedger, px);
      byDate[t.date] = { date: t.date, value: snap.value, cost: snap.cost, unrealised: snap.unrealised };
    });

    const points = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
    const today = new Date().toISOString().split('T')[0];
    if (points.length) {
      const holdings = calcHoldings(transactions);
      const funds = calcFundHoldings(transactions);
      const stockMap = {};
      holdings.forEach(h => { stockMap[_holdingKey(h.symbol, h.broker)] = h; });
      const fundMap = {};
      funds.forEach(f => { fundMap[f.symbol] = { ...f, avgNav: f.avgNav }; });
      const live = _portfolioSnapshot(stockMap, fundMap, px);
      const last = points[points.length - 1];
      if (last.date !== today || Math.abs(last.value - live.value) > 1) {
        points.push({ date: today, value: live.value, cost: live.cost, unrealised: live.unrealised });
      }
    }
    return points;
  }

  function dailyPnlSeries(transactions, priceHistory, priceFn) {
    const realised = realisedPnlByDate(transactions);
    const timeline = portfolioValueTimeline(transactions, priceFn);
    const valueByDate = {};
    timeline.forEach((pt, i) => {
      if (i === 0) return;
      const prev = timeline[i - 1];
      const sameDayInvest = (transactions || [])
        .filter(t => t.date === pt.date && ['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type))
        .reduce((s, t) => s + (t.amount || 0), 0);
      const sameDayRedeem = (transactions || [])
        .filter(t => t.date === pt.date && ['REDEMPTION', 'SELL', 'FUND_OUT'].includes(t.type))
        .reduce((s, t) => s + Math.abs(t.amount || 0), 0);
      valueByDate[pt.date] = (pt.value - prev.value) - sameDayInvest + sameDayRedeem;
    });

    (priceHistory || []).forEach((h, i) => {
      if (i > 0) valueByDate[h.date] = h.value - priceHistory[i - 1].value;
    });

    const dates = [...new Set([...Object.keys(realised), ...Object.keys(valueByDate)])].sort();
    return dates.map(date => ({
      date,
      pnl: (realised[date] || 0) + (valueByDate[date] || 0),
      realised: realised[date] || 0,
      markToMarket: valueByDate[date] || 0,
    }));
  }

  function monthlyPnlSeries(transactions, priceHistory, priceFn) {
    const daily = dailyPnlSeries(transactions, priceHistory, priceFn);
    const months = {};
    daily.forEach(d => {
      const dt = new Date(d.date + 'T12:00:00');
      const key = `${dt.toLocaleString('en-US', { month: 'short' })} ${dt.getFullYear()}`;
      if (!months[key]) months[key] = { month: key, pnl: 0, realised: 0, markToMarket: 0, sortKey: d.date.slice(0, 7) };
      months[key].pnl += d.pnl;
      months[key].realised += d.realised;
      months[key].markToMarket += d.markToMarket;
    });
    return Object.values(months).sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  }

  function currentMonthContribution(transactions) {
    const now = new Date();
    const monthKey = now.toISOString().slice(0, 7);
    return (transactions || [])
      .filter(t => (t.date || '').startsWith(monthKey) && ['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type))
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  function investmentTimeline(transactions) {
    const txs = (transactions || [])
      .filter(t => ['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type) && t.amount > 0)
      .sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    let cumulative = 0;
    const byMonth = {};
    const points = [];
    txs.forEach(t => {
      cumulative += t.amount || 0;
      const m = (t.date || '').slice(0, 7);
      if (m) byMonth[m] = cumulative;
      points.push({
        date: t.date,
        month: m,
        amount: t.amount,
        cumulative,
        type: t.type,
        symbol: t.symbol || '',
        broker: t.broker || ''
      });
    });
    return { points, byMonth, total: cumulative, count: txs.length };
  }

  function monthlyInvestmentBars(byMonth, months = 12) {
    const keys = [];
    const now = new Date();
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      keys.push(d.toISOString().slice(0, 7));
    }
    let prev = 0;
    return keys.map(m => {
      const cum = byMonth[m] || prev;
      const added = cum - prev;
      prev = cum;
      return { month: m, added, cumulative: cum };
    });
  }

  function newId() { return 'tx_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6); }

  /** Approximate uninvested cash: salary + dividends + sell proceeds - buys - contributions. */
  function cashBalance(transactions) {
    let cash = 0;
    (transactions || []).forEach(t => {
      if (t.type === 'SALARY')          cash += t.amount || 0;
      else if (t.type === 'DIVIDEND')   cash += t.amount || 0;
      else if (t.type === 'SELL')       cash += (t.shares || 0) * (t.price || 0);
      else if (t.type === 'REDEMPTION') cash += t.amount || 0;
      else if (t.type === 'BUY' && !t.internal)          cash -= t.amount || 0;
      else if (t.type === 'CONTRIBUTION' && !t.internal) cash -= t.amount || 0;
      else if (t.type === 'IPO_SUBSCRIBE' && !t.internal && t.status !== 'refunded') cash -= t.amount || 0;
      else if (t.type === 'INTL_BUY' || t.type === 'CRYPTO_BUY') {
        const usd = t.costUsd != null ? t.costUsd : (t.priceUsd || 0) * (t.shares || t.qty || 0);
        cash -= typeof FxService !== 'undefined' ? FxService.usdToPkr(usd) : usd * 280;
      }
      else if (t.type === 'INTL_SELL' || t.type === 'CRYPTO_SELL') {
        const usd = (t.priceUsd || 0) * (t.shares || t.qty || 0);
        cash += typeof FxService !== 'undefined' ? FxService.usdToPkr(usd) : usd * 280;
      }
    });
    return Math.max(0, cash);
  }

  return { CDC_BROKER, calcHoldings, calcFundHoldings, calcGlobalHoldings, calcIpoPending, monthlyContributions, monthlySalary,
    totalInvested, currentCostBasis, unrealisedPnl, totalDividends, realisedPnl, realisedPnlByDate,
    portfolioValueTimeline, dailyPnlSeries, monthlyPnlSeries, currentMonthContribution,
    investmentTimeline, monthlyInvestmentBars, newId, cashBalance };
})();
window.Ledger = Ledger;
