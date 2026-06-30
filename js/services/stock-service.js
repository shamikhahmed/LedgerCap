'use strict';
const StockService = (() => {

  function _meta(symbol) {
    return [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === symbol);
  }

  function _fundMeta(symbol) {
    return (window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol);
  }

  function isFund(symbol) {
    return !!_fundMeta(symbol) || ['KMIF','MAAF','MBF','MIF','MIIF-B','MIIF-MMKA','MDAAF-MDYP','MIIETF','MZNPETF'].includes(symbol);
  }

  function getProfile(symbol) {
    const stock = _meta(symbol);
    const fund = _fundMeta(symbol);
    const intl = (window.INTL_STOCKS || []).find(s => s.symbol === symbol);
    const crypto = (window.CRYPTO_ASSETS || []).find(c => c.symbol === symbol);
    const quote = MarketDataService.getQuote(symbol);
    if (fund) {
      const analytics = (window.FUND_ANALYTICS_DB || {})[symbol] || {};
      return {
        symbol, name: fund.name, type: 'fund', sector: fund.type, broker: 'Meezan',
        isShariah: fund.isShariah, price: quote.price, ...analytics,
      };
    }
    const f = (window.FUNDAMENTALS_DB || {})[symbol] || {};
    if (intl || crypto) {
      return {
        symbol,
        name: intl?.name || crypto?.name || symbol,
        type: crypto ? 'crypto' : 'intl',
        sector: intl?.sector || 'Global',
        currency: intl?.currency || crypto?.currency || 'USD',
        price: quote.price,
        marketCap: intl?.marketCap,
      };
    }
    return {
      symbol,
      name: stock?.name || symbol,
      type: 'stock',
      sector: stock?.sector || 'Other',
      isShariah: stock?.isShariah,
      price: quote.price,
      marketCap: f.marketCap,
      shares: f.shares,
    };
  }

  function getFundamentals(symbol) {
    if (isFund(symbol)) {
      const a = (window.FUND_ANALYTICS_DB || {})[symbol] || {};
      const fund = _fundMeta(symbol);
      return {
        type: 'fund',
        nav: MarketDataService.getQuote(symbol).price,
        category: a.category,
        expenseRatio: a.expenseRatio,
        ytdReturn: a.ytdReturn,
        oneYearReturn: a.oneYearReturn,
        threeYearReturn: a.threeYearReturn,
        divYield: a.divYield,
        sharpe: a.sharpe,
        beta: a.beta,
        name: fund?.name,
      };
    }
    const f = (window.FUNDAMENTALS_DB || {})[symbol];
    if (!f) return { type: 'stock', available: false };
    const quote = MarketDataService.getQuote(symbol);
    return {
      type: 'stock',
      available: true,
      marketCap: f.marketCap,
      pe: f.pe,
      pb: f.pb,
      roe: f.roe,
      roa: f.roa,
      eps: f.eps,
      divYield: f.divYield,
      payout: f.payout,
      revGrowth: f.revGrowth,
      profitGrowth: f.profitGrowth,
      debtToEquity: f.debtToEquity,
      freeCashFlow: f.freeCashFlow,
      bookValue: f.bookValue,
      priceToSales: f.marketCap && f.revGrowth ? null : null,
      evEbitda: null,
      fairValuePe: f.eps && f.pe ? f.eps * (f.pe * 0.95) : null,
      currentPrice: quote.price,
    };
  }

  function listSymbols() {
    const fromHoldings = Ledger.calcHoldings(State.get('transactions') || []).map(h => h.symbol);
    const fromFunds = Ledger.calcFundHoldings(State.get('transactions') || []).map(f => f.symbol);
    const fromGlobal = Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(State.get('transactions') || []).map(h => h.symbol) : [];
    const fromWatch = (State.get('watchlist') || []).map(w => w.symbol);
    const fromDb = Object.keys(window.FUNDAMENTALS_DB || {});
    const fromIntl = (window.INTL_STOCKS || []).slice(0, 120).map(s => s.symbol);
    return [...new Set([...fromHoldings, ...fromFunds, ...fromGlobal, ...fromWatch, ...fromDb, ...fromIntl])].sort();
  }

  return { getProfile, getFundamentals, isFund, listSymbols };
})();
window.StockService = StockService;
