'use strict';
/**
 * Dividend data access layer — reads corporate actions dataset + user transactions.
 * Swap adapter for live PSX dividend API without changing UI.
 */
const DividendService = (() => {
  let _adapter = null;

  function setAdapter(adapter) {
    _adapter = adapter;
    if (adapter && CorporateActionsService.setAdapter) {
      CorporateActionsService.setAdapter(adapter);
    }
  }

  function getSymbolData(symbol) {
    return {
      profile: CorporateActionsService.getSymbolProfile(symbol),
      actions: CorporateActionsService.getAllActions(symbol),
      analysis: DividendAnalyticsService.getHoldingAnalysis(symbol),
      historical: DividendAnalyticsService.getHistoricalTable(symbol),
    };
  }

  function getUpcoming() {
    return DividendAnalyticsService.getPortfolioDashboard().upcoming;
  }

  function getCalendar() {
    return DividendAnalyticsService.getCalendar();
  }

  function getPortfolioDividends() {
    const d = DividendAnalyticsService.getPortfolioDashboard();
    return {
      total: d.lifetime,
      annual: d.receivedYtd,
      monthly: d.receivedMtd,
      yieldOnPortfolio: d.portfolioYield,
      expectedThisYear: d.expectedThisYear,
      expectedNextYear: d.expectedNextYear,
      count: (State.get('transactions') || []).filter(t => t.type === 'DIVIDEND').length,
    };
  }

  function getYieldOnCost(symbol, avgCost, shares) {
    const a = DividendAnalyticsService.getHoldingAnalysis(symbol);
    if (avgCost && shares) {
      const annualDps = a.annualDps || 0;
      const cost = avgCost * shares;
      return cost > 0 ? (annualDps * shares / cost) * 100 : null;
    }
    return a.yieldOnCost;
  }

  function getDividendGrowth(symbol) {
    const a = DividendAnalyticsService.getHoldingAnalysis(symbol);
    return a.dividendCagr;
  }

  function loggedBySymbol() {
    return State.dividendsBySymbol();
  }

  function getHistory(symbol) {
    return DividendAnalyticsService.getHistoricalTable(symbol);
  }

  function getPortfolioAnalysis() {
    return DividendAnalyticsService.getPortfolioDashboard();
  }

  function getForecast() {
    return DividendAnalyticsService.getForecast();
  }

  function getTimeline() {
    return DividendAnalyticsService.getTimeline();
  }

  function getGrowthAnalytics() {
    return DividendAnalyticsService.getGrowthAnalytics();
  }

  function getHoldingsAnalysis() {
    return DividendAnalyticsService.getPortfolioHoldingsAnalysis();
  }

  return {
    setAdapter, getSymbolData, getUpcoming, getCalendar, getPortfolioDividends,
    getYieldOnCost, getDividendGrowth, loggedBySymbol, getHistory,
    getPortfolioAnalysis, getForecast, getTimeline, getGrowthAnalytics, getHoldingsAnalysis,
  };
})();
window.DividendService = DividendService;
