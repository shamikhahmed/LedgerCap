'use strict';
const Prices = (() => {
  const PROXY1 = 'https://corsproxy.io/?url=';
  const PROXY2 = 'https://thingproxy.freeboard.io/fetch/';
  const PROXY3 = 'https://api.codetabs.com/v1/proxy?quest=';

  // null = skip Yahoo entirely (funds/ETFs not listed)
  const YAHOO_SYMBOL_MAP = {
    'ENGROH': 'ENGRO.KA',
    'MIIETF': null,
    'MZNPETF': null,
    'MIIF-B': null,
    'MIIF-MMKA': null,
    'MAAF': null,
    'MBF': null,
    'MDAAF-MDYP': null,
    'KMIF': null,
    'MIF': null,
    'MLCF': 'MLCF.KA',
    'PIBTL': 'PIBTL.KA',
    'PICT': 'PICT.KA',
    'PNSC': 'PNSC.KA',
    'SEARL': 'SEARL.KA',
    'LUCK': 'LUCK.KA',
    'MEBL': 'MEBL.KA',
    'OGDC': 'OGDC.KA',
    'PPL': 'PPL.KA',
    'PSO': 'PSO.KA',
    'FFC': 'FFC.KA',
    'HUBC': 'HUBC.KA',
    'MARI': 'MARI.KA',
    'ATRL': 'ATRL.KA',
    'DGKC': 'DGKC.KA',
    'EFERT': 'EFERT.KA',
    'FFL': 'FFL.KA',
    'HINO': 'HINO.KA',
    'NML': 'NML.KA',
    'NRL': 'NRL.KA',
    'PTC': 'PTC.KA',
    'SLGL': 'SLGL.KA',
    'PASM': 'PASM.KA',
    'SSGC': 'SSGC.KA',
    'TRG': 'TRG.KA',
    'CPHL': 'CPHL.KA',
  };

  const FALLBACK_PRICES = {
    'ATRL': 872.46, 'CPHL': 77.75, 'DGKC': 197.20, 'EFERT': 200.40,
    'ENGROH': 262.21, 'FFL': 17.84, 'HUBC': 214.12, 'LUCK': 431.50,
    'MARI': 649.67, 'MEBL': 489.31, 'MLCF': 87.40, 'NML': 144.23,
    'NRL': 364.66, 'OGDC': 320.31, 'PPL': 228.73, 'PSO': 351.50,
    'PTC': 67.54, 'SEARL': 90.93, 'SSGC': 26.83, 'TRG': 71.61,
    'FFC': 499.00, 'HINO': 350.00, 'PIBTL': 16.50, 'PICT': 38.00,
    'PNSC': 500.00, 'SLGL': 15.00, 'PASM': 8.00, 'MZNPETF': 20.50,
    'MIIETF': 17.02,
  };

  async function _fetchWithProxy(url) {
    for (const proxy of [PROXY1, PROXY2, PROXY3]) {
      try {
        const res = await fetch(proxy + encodeURIComponent(url));
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch {}
    }
    return null;
  }

  async function fetchStock(symbol) {
    // Resolve Yahoo symbol; null means skip
    const yahooSym = symbol in YAHOO_SYMBOL_MAP
      ? YAHOO_SYMBOL_MAP[symbol]
      : `${symbol}.KA`;

    if (yahooSym === null) {
      const fallback = FALLBACK_PRICES[symbol];
      return fallback ? { symbol, price: fallback, prevClose: fallback, source: 'fallback', ts: Date.now() } : null;
    }

    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${yahooSym}?interval=1d&range=1d`;
    const data = await _fetchWithProxy(url);
    const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    const prevClose = data?.chart?.result?.[0]?.meta?.previousClose || data?.chart?.result?.[0]?.meta?.chartPreviousClose;

    if (price) return { symbol, price, prevClose, source: 'yahoo', ts: Date.now() };

    // Fall back to hardcoded price if Yahoo fails
    const fallback = FALLBACK_PRICES[symbol];
    return fallback ? { symbol, price: fallback, prevClose: fallback, source: 'fallback', ts: Date.now() } : null;
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
      if (onProgress) onProgress(done, symbols.length, sym, !!r);
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

  return { fetchStock, fetchKSE100, fetchAll, formatTs, FALLBACK_PRICES };
})();
window.Prices = Prices;
