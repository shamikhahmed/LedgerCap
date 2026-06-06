'use strict';
const Prices = (() => {
  const PROXY1 = 'https://corsproxy.io/?';
  const PROXY2 = 'https://api.allorigins.win/raw?url=';

  async function _fetchWithProxy(url) {
    for (const proxy of [PROXY1, PROXY2, '']) {
      try {
        const res = await fetch(proxy + encodeURIComponent(url));
        if (res.ok) { const data = await res.json(); return data; }
      } catch {}
    }
    return null;
  }

  async function fetchStock(symbol) {
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}.KA?interval=1d&range=1d`;
    const data = await _fetchWithProxy(url);
    const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    const prevClose = data?.chart?.result?.[0]?.meta?.previousClose || data?.chart?.result?.[0]?.meta?.chartPreviousClose;
    return price ? { symbol, price, prevClose, source: 'yahoo', ts: Date.now() } : null;
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

  return { fetchStock, fetchKSE100, fetchAll, formatTs };
})();
window.Prices = Prices;
