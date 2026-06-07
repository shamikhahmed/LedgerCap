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

    if (price) {
      const fallback = (window.FALLBACK_PRICES || {})[symbol] || 0;
      if (fallback > 0 && (price > fallback * 3 || price < fallback * 0.3)) {
        console.warn(`${symbol}: Yahoo price ${price} rejected (fallback: ${fallback}) — using fallback`);
        const fp = (window.FALLBACK_PRICES || {})[symbol];
        return fp ? { symbol, price: fp, prevClose: fp * 0.999, source: 'fallback', ts: Date.now() } : null;
      }
      return { symbol, price, prevClose, source: 'yahoo', ts: Date.now() };
    }

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

    // Try PSX live endpoint — gets ALL stocks in one call
    try {
      const psxUrl = 'https://dps.psx.com.pk/live';
      const psxProxies = [
        'https://corsproxy.io/?url=',
        'https://corsproxy.io/?',
      ];

      for (const proxyUrl of psxProxies) {
        try {
          const res = await fetch(proxyUrl + encodeURIComponent(psxUrl), {
            headers: { 'Accept': 'application/json' }
          });
          if (!res.ok) continue;
          const data = await res.json();

          const items = Array.isArray(data) ? data : (data.data || data.result || []);

          if (items.length > 0) {
            symbols.forEach(sym => {
              const item = items.find(i =>
                (i.symbol || i.SYMBOL || i.Symbol || '').toUpperCase() === sym.toUpperCase()
              );
              if (item) {
                const price = parseFloat(
                  item.current || item.CURRENT || item.ldcp || item.LDCP ||
                  item.close || item.CLOSE || item.last || item.price || 0
                );
                const prevClose = parseFloat(
                  item.ldcp || item.LDCP || item.prev || item.prevClose || price
                );
                if (price > 0) {
                  results[sym] = { price, prevClose, source: 'psx_live', ts: Date.now() };
                }
              }
            });

            if (Object.keys(results).length > 0) {
              if (onProgress) onProgress(Object.keys(results).length, symbols.length, 'PSX Live', true, 'psx_live');
              return results;
            }
          }
        } catch {}
      }
    } catch {}

    // PSX failed — fall back to Yahoo per-symbol with sanity check
    let done = 0;
    for (const symbol of symbols) {
      const yahooSym = YAHOO_SYMBOL_MAP[symbol];
      if (yahooSym === null) {
        done++;
        if (onProgress) onProgress(done, symbols.length, symbol, false, 'skip');
        continue;
      }
      const yahooSymbol = yahooSym || (symbol + '.KA');

      try {
        const url = `https://query2.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=1d`;
        const data = await _fetchWithProxy(url);
        const meta = data?.chart?.result?.[0]?.meta;

        if (meta?.regularMarketPrice) {
          const fallback = (window.FALLBACK_PRICES || {})[symbol] || 0;
          const yahooPrice = meta.regularMarketPrice;

          if (fallback > 0 && (yahooPrice > fallback * 3 || yahooPrice < fallback * 0.3)) {
            console.warn(`${symbol}: Yahoo price ${yahooPrice} rejected (fallback: ${fallback})`);
            done++;
            if (onProgress) onProgress(done, symbols.length, symbol, false, 'rejected');
            continue;
          }

          results[symbol] = {
            price: yahooPrice,
            prevClose: meta.previousClose || meta.chartPreviousClose || yahooPrice,
            source: 'yahoo',
            ts: Date.now()
          };
          done++;
          if (onProgress) onProgress(done, symbols.length, symbol, true, 'yahoo');
        } else {
          done++;
          if (onProgress) onProgress(done, symbols.length, symbol, false, 'miss');
        }
      } catch {
        done++;
        if (onProgress) onProgress(done, symbols.length, symbol, false, 'error');
      }
      await new Promise(r => setTimeout(r, 80));
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
window.YAHOO_SYMBOL_MAP = {
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
