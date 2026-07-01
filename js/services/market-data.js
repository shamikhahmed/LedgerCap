'use strict';
const MarketDataService = (() => {
  const _cache = {};
  const MAX_SANE_DAILY_PCT = 50;

  function _isGlobal(symbol) {
    return (window.INTL_STOCKS || []).some(s => s.symbol === symbol)
      || (window.CRYPTO_ASSETS || []).some(c => c.symbol === symbol);
  }

  function _rate() {
    return typeof FxService !== 'undefined' ? FxService.getUsdRate() : 280;
  }

  function _price(symbol) {
    const p = State.getPrice(symbol);
    if (p > 0) return p;
    if (_isGlobal(symbol)) {
      const usd = State.get()?.prices?.[symbol]?.priceUsd || (window.GLOBAL_FALLBACK_USD || {})[symbol];
      if (usd > 0) return usd * _rate();
    }
    const fp = (window.FALLBACK_PRICES || {})[symbol];
    if (fp > 0) return fp;
    const mf = (window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol);
    return mf?.currentNav || 0;
  }

  function _prevClose(symbol) {
    const st = State.get()?.prices?.[symbol] || {};
    if (_isGlobal(symbol)) {
      const usd = st.priceUsd || (window.GLOBAL_FALLBACK_USD || {})[symbol];
      const prevUsd = st.prevCloseUsd
        || (st.prevClose > 0 && st.prevClose < Math.max((usd || 0) * 10, 500) ? st.prevClose : null)
        || (usd > 0 ? usd * 0.999 : 0);
      if (prevUsd > 0) return prevUsd * _rate();
    }
    const prev = State.getPrevClose(symbol);
    if (prev > 0) return prev;
    const p = _price(symbol);
    return p * 0.998;
  }

  function _globalQuote(symbol) {
    const st = State.get()?.prices?.[symbol] || {};
    const usd = st.priceUsd || (window.GLOBAL_FALLBACK_USD || {})[symbol];
    if (!(usd > 0)) return null;
    const rate = _rate();
    const prevUsd = st.prevCloseUsd
      || (st.prevClose > 0 && st.prevClose < Math.max(usd * 10, 500) ? st.prevClose : null)
      || usd * 0.999;
    const price = st.price > 0 ? st.price : usd * rate;
    const prevClose = prevUsd * rate;
    const changeUsd = usd - prevUsd;
    let changePct = prevUsd > 0 ? (changeUsd / prevUsd) * 100 : 0;
    if (Math.abs(changePct) > MAX_SANE_DAILY_PCT && !(st.prevCloseUsd > 0)) changePct = 0;
    return {
      symbol,
      price,
      priceUsd: usd,
      prevClose,
      prevCloseUsd: prevUsd,
      change: price - prevClose,
      changePct,
      source: State.getPriceSource(symbol) || 'seed',
      ts: st.ts || Date.now(),
    };
  }

  function getQuote(symbol) {
    if (_isGlobal(symbol)) {
      const g = _globalQuote(symbol);
      if (g) return g;
    }
    const price = _price(symbol);
    const prevClose = _prevClose(symbol);
    const change = price - prevClose;
    let changePct = prevClose > 0 ? (change / prevClose) * 100 : 0;
    if (Math.abs(changePct) > MAX_SANE_DAILY_PCT) changePct = 0;
    const source = State.getPriceSource(symbol) || 'seed';
    return { symbol, price, prevClose, change, changePct, source, ts: Date.now() };
  }

  function getPriceChanges(symbol) {
    const quote = getQuote(symbol);
    const seed = (window.PRICE_CHANGE_SEED || {})[symbol] || {};
    const fund = (window.FUND_ANALYTICS_DB || {})[symbol];
    const daily = Math.abs(quote.changePct) > MAX_SANE_DAILY_PCT ? 0 : quote.changePct;
    return {
      daily,
      weekly: seed.weekly ?? (fund ? fund.ytdReturn * 0.15 : 0),
      monthly: seed.monthly ?? (fund ? fund.ytdReturn * 0.4 : 0),
      yearly: seed.yearly ?? fund?.oneYearReturn ?? seed.monthly * 3 ?? 0,
    };
  }

  async function fetchLiveQuote(symbol) {
    if (typeof Prices !== 'undefined' && Prices.fetchStock) {
      try {
        const r = await Prices.fetchStock(symbol);
        if (r?.price || r?.priceUsd) {
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

  return { getQuote, getPriceChanges, fetchLiveQuote, getAllQuotes, _isGlobal };
})();
window.MarketDataService = MarketDataService;
