'use strict';
const Prices = (() => {
  const PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?url=',
    'https://api.allorigins.win/get?url=',
  ];

  const YAHOO_SYMBOL_MAP = {
    'ENGROH': 'ENGROH.KA',
    'MIIETF': null,
    'MZNPETF': null,
    'MIIF-B': null,
    'MIIF-MMKA': null,
    'MAAF': null,
    'MBF': null,
    'MDAAF-MDYP': null,
    'KMIF': null,
    'MIF': null,
  };

  const FUND_SYMBOLS = new Set(['KMIF','MAAF','MBF','MDAAF-MDYP','MIF','MIIF-B','MIIF-MMKA','MIIETF','MZNPETF']);

  function _isHtml(text) {
    const t = (text || '').trim();
    return t.startsWith('<!DOCTYPE') || t.startsWith('<html') || t.startsWith('<HTML');
  }

  function _parseJson(text) {
    if (!text || _isHtml(text)) return null;
    try { return JSON.parse(text); } catch { return null; }
  }

  function _parseTimeseries(data, source) {
    const rows = Array.isArray(data) ? data : (data?.data || []);
    if (!Array.isArray(rows) || !rows.length) return null;
    const last = rows[rows.length - 1];
    if (!Array.isArray(last) || last.length < 2) return null;
    const price = parseFloat(last[1]);
    const prev = parseFloat(last[3] ?? rows[rows.length - 2]?.[1] ?? last[1]);
    if (!price || price <= 0) return null;
    return {
      price,
      prevClose: prev > 0 && prev !== price ? prev : price * 0.999,
      source,
      ts: Date.now(),
    };
  }

  async function _fetchAppProxy(url) {
    const fromState = (typeof State !== 'undefined' && State.get('settings')?.psxProxyUrl) || '';
    const base = (window.LedgerCapConfig?.resolvePsxProxyUrl(fromState) || fromState || window.LEDGERCAP_CONFIG?.psxProxyUrl || '').replace(/\/$/, '');
    if (!base) return null;
    const path = url.replace('https://dps.psx.com.pk/', '');
    const tries = [
      `${base}/${path}`,
      `${base}?url=${encodeURIComponent(url)}`,
    ];
    for (const u of tries) {
      try {
        const res = await fetch(u, { headers: { Accept: 'application/json' } });
        if (!res.ok) continue;
        const text = await res.text();
        if (_isHtml(text)) continue;
        if (text.startsWith('{') && text.includes('"error"')) continue;
        const parsed = _parseJson(text);
        if (parsed) return parsed;
      } catch { continue; }
    }
    return null;
  }

  async function _fetchRaw(url) {
    const appProxy = await _fetchAppProxy(url);
    if (appProxy) return appProxy;

    for (const proxyUrl of PROXIES) {
      try {
        const res = await fetch(proxyUrl + encodeURIComponent(url), {
          headers: { Accept: 'application/json,text/plain,*/*' }
        });
        if (!res.ok) continue;
        const text = await res.text();
        if (_isHtml(text)) continue;
        let payload = text;
        try {
          const j = JSON.parse(text);
          if (j && j.contents !== undefined) payload = j.contents;
          else if (j && typeof j === 'object') return j;
        } catch {}
        if (typeof payload === 'string') {
          const parsed = _parseJson(payload);
          if (parsed) return parsed;
          continue;
        }
        return payload;
      } catch {}
    }
    return null;
  }

  function _extractPrice(item) {
    if (!item) return null;
    const price = parseFloat(
      item.current || item.CURRENT || item.close || item.CLOSE ||
      item.last || item.price || item.Last || item.Price ||
      item.regularMarketPrice || item.nav || item.NAV ||
      item['Last Day Close Price'] || item.ldcp || item.LDCP || 0
    );
    const prevClose = parseFloat(
      item.ldcp || item.LDCP || item.prevClose || item.previousClose ||
      item.chartPreviousClose || item.prev || price
    );
    if (!price || price <= 0) return null;
    return { price, prevClose: prevClose > 0 ? prevClose : price * 0.999 };
  }

  async function fetchPsxSymbol(symbol) {
    const sym = symbol.toUpperCase();
    const urls = [
      { url: `https://dps.psx.com.pk/timeseries/int/${sym}`, source: 'psx_int' },
      { url: `https://dps.psx.com.pk/timeseries/eod/${sym}`, source: 'psx_eod' },
    ];
    for (const { url, source } of urls) {
      const data = await _fetchRaw(url);
      if (!data) continue;
      const parsed = _parseTimeseries(data, source);
      if (parsed) return { ...parsed, symbol: sym };
    }
    return null;
  }

  async function fetchPsxLive(symbols) {
    const results = {};
    const chunks = [];
    for (let i = 0; i < symbols.length; i += 4) chunks.push(symbols.slice(i, i + 4));
    for (const chunk of chunks) {
      await Promise.all(chunk.map(async sym => {
        const data = await _fetchRaw(`https://dps.psx.com.pk/timeseries/int/${sym}`);
        const parsed = _parseTimeseries(data, 'psx_int');
        if (parsed) results[sym] = { ...parsed, symbol: sym };
      }));
    }
    return results;
  }

  function fundNavFallback(symbol) {
    const fund = (window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol);
    const fp = (window.FALLBACK_PRICES || {})[symbol];
    const nav = fund?.currentNav || fp;
    if (!nav) return null;
    return {
      symbol,
      price: nav,
      prevClose: nav * 0.999,
      source: fund ? 'meezan_seed' : 'fallback',
      ts: Date.now() - 3600000
    };
  }

  async function fetchStock(symbol) {
    if (FUND_SYMBOLS.has(symbol)) return fundNavFallback(symbol);

    const psx = await fetchPsxSymbol(symbol);
    if (psx) {
      const ok = _sanityCheck(symbol, psx.price);
      if (ok) return { symbol, ...psx };
    }

    const yahooSym = symbol in YAHOO_SYMBOL_MAP ? YAHOO_SYMBOL_MAP[symbol] : `${symbol}.KA`;
    if (yahooSym === null) return fundNavFallback(symbol);

    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${yahooSym}?interval=1d&range=5d`;
    const data = await _fetchRaw(url);
    const meta = data?.chart?.result?.[0]?.meta;
    const price = meta?.regularMarketPrice;
    const prevClose = meta?.previousClose || meta?.chartPreviousClose;

    if (price && _sanityCheck(symbol, price)) {
      return { symbol, price, prevClose, source: 'yahoo', ts: Date.now() };
    }

    const fp = (window.FALLBACK_PRICES || {})[symbol];
    return fp ? { symbol, price: fp, prevClose: fp * 0.999, source: 'fallback', ts: Date.now() - 86400000 } : null;
  }

  function _sanityCheck(symbol, price) {
    const fallback = (window.FALLBACK_PRICES || {})[symbol] || 0;
    if (fallback > 0 && (price > fallback * 3 || price < fallback * 0.3)) {
      console.warn(`${symbol}: price ${price} rejected (fallback ${fallback})`);
      return false;
    }
    return true;
  }

  async function fetchKSE100() {
    const psxIdx = await _fetchRaw('https://dps.psx.com.pk/timeseries/eod/KSE100');
    const parsed = _parseTimeseries(psxIdx, 'psx_eod');
    if (parsed) {
      const change = parsed.price - parsed.prevClose;
      const changeP = parsed.prevClose ? (change / parsed.prevClose) * 100 : 0;
      return { value: parsed.price, change, changeP, prevClose: parsed.prevClose, ts: Date.now() };
    }
    const url = 'https://query2.finance.yahoo.com/v8/finance/chart/%5EKSE100?interval=1d&range=1d';
    const data = await _fetchRaw(url);
    const meta = data?.chart?.result?.[0]?.meta;
    if (meta?.regularMarketPrice) {
      return {
        value: meta.regularMarketPrice,
        change: meta.regularMarketChange || 0,
        changeP: meta.regularMarketChangePercent || 0,
        prevClose: meta.previousClose || meta.chartPreviousClose,
        ts: Date.now()
      };
    }
    return null;
  }

  async function fetchAll(symbols, onProgress) {
    const results = {};
    const stockSyms = symbols.filter(s => !FUND_SYMBOLS.has(s));
    const fundSyms = symbols.filter(s => FUND_SYMBOLS.has(s));

    const live = await fetchPsxLive(stockSyms);
    Object.assign(results, live);
    if (Object.keys(live).length > 0 && onProgress) {
      onProgress(Object.keys(live).length, symbols.length, 'batch', true, 'psx_int');
    }

    let done = Object.keys(results).length;
    for (const symbol of stockSyms) {
      if (results[symbol]) {
        if (onProgress) onProgress(++done, symbols.length, symbol, true, results[symbol].source || 'psx_int');
        continue;
      }
      const psx = await fetchPsxSymbol(symbol);
      if (psx && _sanityCheck(symbol, psx.price)) {
        results[symbol] = psx;
        if (onProgress) onProgress(++done, symbols.length, symbol, true, psx.source);
        continue;
      }

      const yahooSym = YAHOO_SYMBOL_MAP[symbol];
      if (yahooSym === null) {
        const fb = fundNavFallback(symbol);
        if (fb) results[symbol] = fb;
        if (onProgress) onProgress(++done, symbols.length, symbol, !!fb, 'skip');
        continue;
      }

      const yahooSymbol = yahooSym || `${symbol}.KA`;
      try {
        const url = `https://query2.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=5d`;
        const data = await _fetchRaw(url);
        const meta = data?.chart?.result?.[0]?.meta;
        if (meta?.regularMarketPrice && _sanityCheck(symbol, meta.regularMarketPrice)) {
          results[symbol] = {
            price: meta.regularMarketPrice,
            prevClose: meta.previousClose || meta.chartPreviousClose || meta.regularMarketPrice,
            source: 'yahoo',
            ts: Date.now()
          };
          if (onProgress) onProgress(++done, symbols.length, symbol, true, 'yahoo');
        } else {
          const fp = (window.FALLBACK_PRICES || {})[symbol];
          if (fp) results[symbol] = { price: fp, prevClose: fp * 0.999, source: 'fallback', ts: Date.now() - 86400000 };
          if (onProgress) onProgress(++done, symbols.length, symbol, !!fp, 'fallback');
        }
      } catch {
        if (onProgress) onProgress(++done, symbols.length, symbol, false, 'error');
      }
      await new Promise(r => setTimeout(r, 60));
    }

    for (const symbol of fundSyms) {
      const nav = fundNavFallback(symbol);
      if (nav) results[symbol] = nav;
      done++;
      if (onProgress) onProgress(done, symbols.length, symbol, true, 'meezan_seed');
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

  function sourceLabel(source) {
    const map = {
      psx_live: 'PSX Live',
      psx_int: 'PSX Intraday',
      psx_symbol: 'PSX',
      psx_eod: 'PSX EOD',
      yahoo: 'Yahoo',
      meezan_seed: 'Meezan NAV',
      fallback: 'Last known',
      manual: 'Manual'
    };
    return map[source] || source || '—';
  }

  return { fetchStock, fetchKSE100, fetchAll, formatTs, sourceLabel, fetchPsxSymbol };
})();
window.Prices = Prices;
window.YAHOO_SYMBOL_MAP = {
  'ENGROH': 'ENGROH.KA',
  'MIIETF': null,
  'MZNPETF': null,
  'MIIF-B': null,
  'MIIF-MMKA': null,
  'MAAF': null,
  'MBF': null,
  'MDAAF-MDYP': null,
  'KMIF': null,
  'MIF': null,
};
