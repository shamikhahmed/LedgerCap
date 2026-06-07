'use strict';
const Prices = (() => {
  const PROXIES = [
    { url: 'https://corsproxy.io/?url=',              parse: r => r },
    { url: 'https://api.allorigins.win/get?url=',     parse: r => JSON.parse(r.contents) },
    { url: 'https://corsproxy.io/?',                  parse: r => r },
  ];

  // null = skip Yahoo entirely (funds/ETFs not on Yahoo Finance)
  const YAHOO_SYMBOL_MAP = {
    'ENGROH':      'ENGRO.KA',
    'MIIETF':      null,
    'MZNPETF':     null,
    'MIIF-B':      null,
    'MIIF-MMKA':   null,
    'MAAF':        null,
    'MBF':         null,
    'MDAAF-MDYP':  null,
    'KMIF':        null,
    'MIF':         null,
  };

  async function _fetchWithProxy(url) {
    for (const proxy of PROXIES) {
      try {
        const res = await fetch(proxy.url + encodeURIComponent(url));
        if (!res.ok) continue;
        const raw = await res.json();
        const data = proxy.parse(raw);
        if (data) return data;
      } catch {}
    }
    return null;
  }

  async function fetchStock(symbol) {
    const yahooSym = symbol in YAHOO_SYMBOL_MAP
      ? YAHOO_SYMBOL_MAP[symbol]
      : `${symbol}.KA`;

    if (yahooSym === null) {
      const fp = (window.FALLBACK_PRICES || {})[symbol];
      return fp ? { symbol, price: fp, prevClose: fp * 0.999, source: 'fallback', ts: Date.now() } : null;
    }

    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${yahooSym}?interval=1d&range=1d`;
    const data = await _fetchWithProxy(url);
    const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    const prevClose = data?.chart?.result?.[0]?.meta?.previousClose
      || data?.chart?.result?.[0]?.meta?.chartPreviousClose;

    if (price) return { symbol, price, prevClose, source: 'yahoo', ts: Date.now() };

    const fp = (window.FALLBACK_PRICES || {})[symbol];
    return fp ? { symbol, price: fp, prevClose: fp * 0.999, source: 'fallback', ts: Date.now() } : null;
  }

  async function fetchKSE100() {
    const url = 'https://query2.finance.yahoo.com/v8/finance/chart/%5EKMEX?interval=1d&range=1d';
    const data = await _fetchWithProxy(url);
    const meta = data?.chart?.result?.[0]?.meta;
    return meta?.regularMarketPrice ? {
      value: meta.regularMarketPrice,
      change: meta.regularMarketChange || 0,
      changeP: meta.regularMarketChangePercent || 0,
      prevClose: meta.previousClose || meta.chartPreviousClose,
      ts: Date.now()
    } : null;
  }

  async function fetchAll(symbols, onProgress) {
    const results = {};
    let done = 0;
    for (const sym of symbols) {
      const r = await fetchStock(sym);
      if (r) results[sym] = r;
      done++;
      if (onProgress) onProgress(done, symbols.length, sym, !!r, r?.source);
      await new Promise(res => setTimeout(res, 120));
    }
    return results;
  }

  function formatTs(ts) {
    if (!ts) return 'never';
    const d = new Date(ts);
    const now = new Date();
    const diffMin = Math.floor((now - d) / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
    return d.toLocaleDateString('en-PK', { day: 'numeric', month: 'short' });
  }

  return { fetchStock, fetchKSE100, fetchAll, formatTs };
})();
window.Prices = Prices;
