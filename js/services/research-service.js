'use strict';
const ResearchService = (() => {

  function getStockReport(symbol) {
    const profile = StockService.getProfile(symbol);
    const fundamentals = StockService.getFundamentals(symbol);
    const changes = MarketDataService.getPriceChanges(symbol);
    const quote = MarketDataService.getQuote(symbol);
    const ai = AIAnalysis.analyze(symbol);
    const divHist = DividendService.getHistory(symbol);
    const yoc = null;

    const holdings = Ledger.calcHoldings(State.get('transactions') || []);
    const h = holdings.find(x => x.symbol === symbol);
    const position = h ? {
      shares: h.shares, avgCost: h.avgCost, broker: h.broker,
      value: h.shares * quote.price,
      pnl: h.shares * (quote.price - h.avgCost),
      pnlPct: h.avgCost > 0 ? ((quote.price - h.avgCost) / h.avgCost) * 100 : 0,
      yieldOnCost: DividendService.getYieldOnCost(symbol, h.avgCost, h.shares),
    } : null;

    return {
      symbol, profile, fundamentals, quote, changes, ai, divHist, position,
      notes: (State.get('researchNotes') || {})[symbol] || '',
      updatedAt: Date.now(),
    };
  }

  function search(query) {
    const q = (query || '').trim().toUpperCase();
    return StockService.listSymbols().filter(s =>
      s.includes(q) || StockService.getProfile(s).name?.toUpperCase().includes(q)
    );
  }

  return { getStockReport, search };
})();
window.ResearchService = ResearchService;
