'use strict';
const PortfolioAnalyticsService = (() => {

  function _clampScore(n) {
    if (n == null || Number.isNaN(n)) return 0;
    return Math.max(0, Math.min(100, Math.round(n)));
  }

  function _realizedFromLedger(txs) {
    return typeof Ledger !== 'undefined' && Ledger.realisedPnl
      ? Ledger.realisedPnl(txs)
      : 0;
  }

  function getSummary(state) {
    state = state || State.get();
    const txs = state.transactions || [];
    const m = Analytics.dashboardMetrics(state);
    const totalValue = m.totalValue;
    const invested = m.totalCost;
    const unrealized = m.totalReturn.abs;
    const realized = _realizedFromLedger(txs);
    const divs = DividendService.getPortfolioDividends();

    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    let portfolioDivYield = 0;
    let weightedYield = 0;
    holdings.forEach(h => {
      const val = h.shares * (State.getPrice(h.symbol) || h.avgCost);
      const f = (window.FUNDAMENTALS_DB || {})[h.symbol];
      if (f?.divYield && totalValue > 0) {
        weightedYield += (val / totalValue) * f.divYield;
      }
    });
    funds.forEach(f => {
      const nav = State.getPrice(f.symbol) || f.avgNav;
      const val = f.units * nav;
      const fa = (window.FUND_ANALYTICS_DB || {})[f.symbol];
      if (fa?.divYield && totalValue > 0) weightedYield += (val / totalValue) * fa.divYield;
    });
    portfolioDivYield = weightedYield;

    const brokers = {};
    holdings.forEach(h => {
      const b = h.broker || 'Other';
      brokers[b] = (brokers[b] || 0) + h.shares * (State.getPrice(h.symbol) || h.avgCost);
    });
    funds.forEach(f => {
      brokers['Meezan'] = (brokers['Meezan'] || 0) + f.units * (State.getPrice(f.symbol) || f.avgNav);
    });
    (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).forEach(h => {
      const b = h.broker || 'Global';
      const val = h.qty * (State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0));
      brokers[b] = (brokers[b] || 0) + val;
    });

    const geo = { pk: 0, us: 0, crypto: 0, cash: 0, other: 0 };
    holdings.forEach(h => {
      geo.pk += h.shares * (State.getPrice(h.symbol) || h.avgCost);
    });
    funds.forEach(f => {
      geo.pk += f.units * (State.getPrice(f.symbol) || f.avgNav);
    });
    (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).forEach(h => {
      const val = h.qty * (State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0));
      if (h.assetClass === 'crypto') geo.crypto += val;
      else geo.us += val;
    });
    const ma = state.manualAssets || {};
    geo.cash += Ledger.cashBalance(txs) + (ma.usdCash || 0) * FxService.getUsdRate();
    geo.other += (ma.goldGrams || 0) * (state.settings?.goldPricePerGram || 18000) + (ma.realEstate || 0);
    const geoTotal = Object.values(geo).reduce((a, v) => a + v, 0) || 1;
    const geoAllocation = [
      { label: 'Pakistan', value: geo.pk, pct: (geo.pk / geoTotal) * 100 },
      { label: 'US / Intl', value: geo.us, pct: (geo.us / geoTotal) * 100 },
      { label: 'Crypto', value: geo.crypto, pct: (geo.crypto / geoTotal) * 100 },
      { label: 'Cash', value: geo.cash, pct: (geo.cash / geoTotal) * 100 },
      { label: 'Other', value: geo.other, pct: (geo.other / geoTotal) * 100 },
    ].filter(g => g.value > 0).sort((a, b) => b.value - a.value);

    return {
      totalValue, invested, unrealized, realized,
      totalReturn: m.totalReturn, xirr: m.xirr,
      portfolioDivYield, dividendIncome: divs.annual,
      health: m.portfolioHealth, risk: m.riskScore,
      assetAllocation: m.assetAllocation,
      sectorAllocation: m.sectorAllocation,
      brokerAllocation: m.brokerAllocation,
      geoAllocation,
      brokers,
    };
  }

  function getHoldings(state) {
    state = state || State.get();
    const txs = state.transactions || [];
    const total = State.calcTotalValue() || 1;
    const stockRows = Ledger.calcHoldings(txs).map(h => {
      const price = State.getPrice(h.symbol) || h.avgCost;
      const val = h.shares * price;
      const cost = h.shares * h.avgCost;
      const pnl = val - cost;
      const pnlPct = h.avgCost > 0 ? ((price - h.avgCost) / h.avgCost) * 100 : 0;
      const alloc = (val / total) * 100;
      const f = (window.FUNDAMENTALS_DB || {})[h.symbol];
      const ai = AIAnalysis.analyze(h.symbol);
      const meta = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === h.symbol && s.broker === h.broker);
      return {
        symbol: h.symbol, name: meta?.name || h.symbol, broker: h.broker,
        kind: 'stock', quantity: h.shares, price, value: val, costBasis: cost,
        pnl, pnlPct, allocPct: alloc,
        divYield: f?.divYield || 0,
        yieldOnCost: DividendService.getYieldOnCost(h.symbol, h.avgCost, h.shares),
        aiRating: ai.action, aiConfidence: ai.confidence, sector: meta?.sector,
      };
    });

    const fundRows = Ledger.calcFundHoldings(txs).map(f => {
      const nav = State.getPrice(f.symbol) || f.avgNav;
      const val = f.units * nav;
      const pnl = val - f.totalInvested;
      const pnlPct = f.avgNav > 0 ? ((nav - f.avgNav) / f.avgNav) * 100 : 0;
      const mf = (window.MEEZAN_FUNDS || []).find(m => m.symbol === f.symbol);
      const fa = (window.FUND_ANALYTICS_DB || {})[f.symbol];
      const ai = AIAnalysis.analyze(f.symbol);
      return {
        symbol: f.symbol, name: mf?.name || f.symbol, broker: 'Meezan',
        kind: 'fund', quantity: f.units, price: nav, value: val, costBasis: f.totalInvested,
        pnl, pnlPct, allocPct: (val / total) * 100,
        divYield: fa?.divYield || 0, yieldOnCost: null,
        aiRating: ai.action, aiConfidence: ai.confidence, sector: mf?.type,
      };
    });

    const globalRows = (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).map(h => {
      const price = State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0);
      const val = h.qty * price;
      const cost = h.qty * FxService.usdToPkr(h.avgCostUsd || 0);
      const pnl = val - cost;
      const pnlPct = h.avgCostUsd > 0 ? ((FxService.pkrToUsd(price) - h.avgCostUsd) / h.avgCostUsd) * 100 : 0;
      const meta = [...(window.INTL_STOCKS || []), ...(window.CRYPTO_ASSETS || [])].find(x => x.symbol === h.symbol);
      return {
        symbol: h.symbol, name: meta?.name || h.symbol, broker: h.broker,
        kind: h.assetClass === 'crypto' ? 'crypto' : 'intl', quantity: h.qty, price, value: val, costBasis: cost,
        pnl, pnlPct, allocPct: (val / total) * 100,
        divYield: 0, yieldOnCost: null,
        aiRating: '—', aiConfidence: 0, sector: h.assetClass === 'crypto' ? 'Crypto' : 'US',
      };
    });

    return [...stockRows, ...fundRows, ...globalRows].sort((a, b) => b.value - a.value);
  }

  function getWinnersLosers(state) {
    const rows = getHoldings(state);
    const stocks = rows.filter(r => r.kind === 'stock');
    const sorted = [...stocks].sort((a, b) => b.pnlPct - a.pnlPct);
    return {
      winners: sorted.filter(r => r.pnlPct > 0).slice(0, 3),
      losers: sorted.filter(r => r.pnlPct < 0).slice(-3).reverse(),
    };
  }

  function getIntelligence(state) {
    state = state || State.get();
    const summary = getSummary(state);
    const insights = [];
    const sectors = summary.sectorAllocation || [];
    const holdings = getHoldings(state);

    const topSector = sectors[0];
    if (topSector && topSector.pct > 35) {
      insights.push({ type: 'risk', severity: 'high', text: `${topSector.sector} allocation at ${topSector.pct.toFixed(0)}% — sector concentration elevated.`, action: 'Rebalance into underweight sectors.' });
    }

    const banking = sectors.find(s => s.sector === 'Banking');
    if (banking && banking.pct > 25) {
      insights.push({ type: 'sector', severity: 'medium', text: `Banking exposure ${banking.pct.toFixed(0)}% — monitor rate cycle and credit risk.`, action: 'Consider diversifying into industrials or tech.' });
    }

    const tech = sectors.find(s => s.sector === 'Technology');
    if (!tech || tech.pct < 5) {
      insights.push({ type: 'opportunity', severity: 'low', text: 'Technology exposure below 5% — growth sleeve underweight.', action: 'Evaluate TRG or KMIF for tech/growth exposure.' });
    }

    const top = holdings[0];
    if (top && top.allocPct > 20) {
      insights.push({ type: 'concentration', severity: 'high', text: `${top.symbol} is ${top.allocPct.toFixed(0)}% of portfolio — single-name concentration risk.`, action: 'Trim or add complementary positions.' });
    }

    holdings.filter(h => h.divYield > 0).forEach(h => {
      const growth = DividendService.getDividendGrowth(h.symbol);
      if (growth != null && growth < 2) {
        insights.push({ type: 'dividend', severity: 'medium', text: `${h.symbol} dividend growth slowing (${growth.toFixed(1)}% CAGR).`, action: 'Review payout sustainability in Research.' });
      }
    });

    if (summary.portfolioDivYield < 4 && summary.invested > 500000) {
      insights.push({ type: 'income', severity: 'low', text: `Portfolio yield ${summary.portfolioDivYield.toFixed(1)}% — income generation below target.`, action: 'Add high-yield names like MEBL, OGDC, or MIIF.' });
    }

    const ruleInsights = Insights.generate(state) || [];
    const growthNames = holdings.filter(h => {
      const g = (window.FUNDAMENTALS_DB || {})[h.symbol]?.profitGrowth;
      return g != null && g > 10;
    }).length;
    return {
      summary, insights, ruleInsights,
      scores: {
        health: _clampScore(summary.health),
        risk: _clampScore(summary.risk),
        diversification: _clampScore(sectors.length * 12),
        dividendQuality: _clampScore(summary.portfolioDivYield * 8),
        growthQuality: _clampScore(Math.min(8, growthNames) * 12.5),
      },
    };
  }

  return { getSummary, getHoldings, getWinnersLosers, getIntelligence };
})();
window.PortfolioAnalyticsService = PortfolioAnalyticsService;
