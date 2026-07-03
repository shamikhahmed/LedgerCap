import usSymbols from '../data/us-symbols.json';

const YAHOO_HEADERS = {
  Accept: 'application/json, text/plain, */*',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  Referer: 'https://finance.yahoo.com/',
  Origin: 'https://finance.yahoo.com',
};

const BATCH = 85;

export function getUsSymbolList() {
  return [...usSymbols];
}

export async function fetchUsQuotes(symbols = getUsSymbolList()) {
  const list = [...new Set(symbols.map((s) => String(s).trim().toUpperCase()).filter(Boolean))];
  const quotes = {};
  for (let i = 0; i < list.length; i += BATCH) {
    const chunk = list.slice(i, i + BATCH);
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(chunk.join(','))}`;
    try {
      const res = await fetch(url, { headers: YAHOO_HEADERS, cf: { cacheTtl: 60 } });
      const data = await res.json();
      const rows = data?.quoteResponse?.result || [];
      rows.forEach((r) => {
        const sym = r.symbol;
        const price = r.regularMarketPrice ?? r.postMarketPrice;
        const prev = r.regularMarketPreviousClose ?? r.previousClose ?? price;
        if (!(sym && price > 0)) return;
        const changePct = prev ? ((price - prev) / prev) * 100 : 0;
        quotes[sym] = {
          priceUsd: price,
          prevCloseUsd: prev > 0 ? prev : price,
          changePct: Math.round(changePct * 100) / 100,
          quoteKind: r.marketState === 'REGULAR' ? 'intraday' : 'last_close',
          source: 'yahoo-v7',
          ts: Date.now(),
        };
      });
    } catch (_) {}
    if (i + BATCH < list.length) await new Promise((r) => setTimeout(r, 1000));
  }
  return quotes;
}
