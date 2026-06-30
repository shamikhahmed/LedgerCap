'use strict';
const MarketDataService = (() => {
  const _cache = {};

  function _price(symbol) {
    const p = State.getPrice(symbol);
    if (p > 0) return p;
    const fp = (window.FALLBACK_PRICES || {})[symbol];
    if (fp > 0) return fp;
    const mf = (window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol);
    return mf?.currentNav || 0;
  }

  function _prevClose(symbol) {
    const prev = State.getPrevClose(symbol);
    if (prev > 0) return prev;
    const p = _price(symbol);
    return p * 0.998;
  }

  function getQuote(symbol) {
    const price = _price(symbol);
    const prevClose = _prevClose(symbol);
    const change = price - prevClose;
    const changePct = prevClose > 0 ? (change / prevClose) * 100 : 0;
    const source = State.getPriceSource(symbol) || 'seed';
    return { symbol, price, prevClose, change, changePct, source, ts: Date.now() };
  }

  function getPriceChanges(symbol) {
    const quote = getQuote(symbol);
    const seed = (window.PRICE_CHANGE_SEED || {})[symbol] || {};
    const fund = (window.FUND_ANALYTICS_DB || {})[symbol];
    return {
      daily: quote.changePct,
      weekly: seed.weekly ?? (fund ? fund.ytdReturn * 0.15 : 0),
      monthly: seed.monthly ?? (fund ? fund.ytdReturn * 0.4 : 0),
      yearly: seed.yearly ?? fund?.oneYearReturn ?? seed.monthly * 3 ?? 0,
    };
  }

  async function fetchLiveQuote(symbol) {
    if (typeof Prices !== 'undefined' && Prices.fetchStock) {
      try {
        const r = await Prices.fetchStock(symbol);
        if (r?.price) {
          State.updatePrice(symbol, r);
          _cache[symbol] = { ...r, ts: Date.now() };
          return getQuote(symbol);
        }
      } catch (_) {}
    }
    return getQuote(symbol);
  }

  function getAllQuotes(symbols) {
    return (symbols || []).map(s => getQuote(s));
  }

  return { getQuote, getPriceChanges, fetchLiveQuote, getAllQuotes };
})();
window.MarketDataService = MarketDataService;
