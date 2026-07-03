import { fetchPsxQuote } from './sse-prices.js';

const DPS_ORIGIN = 'https://dps.psx.com.pk';
const DPS_HEADERS = {
  Accept: 'application/json, text/html, */*',
  'User-Agent': 'Mozilla/5.0 (compatible; LedgerCap/3.55)',
  Referer: `${DPS_ORIGIN}/`,
  Origin: DPS_ORIGIN,
};

/** Legacy HTML parse — tests + fallback */
export function parsePsxSummaryHtml(html) {
  const symbols = new Set();
  const re = /\|\s*([A-Z][A-Z0-9&.-]{1,11})\s*\|/g;
  let m;
  while ((m = re.exec(String(html || ''))) !== null) {
    const sym = m[1];
    if (!/^(SCRIP|LDCP|OPEN|HIGH|LOW|CURRENT|CHANGE|VOLUME|SYMBOL)$/i.test(sym)) symbols.add(sym);
  }
  const catalog = [...symbols].sort().map((symbol) => ({
    symbol, name: symbol, sector: 'Other', isShariah: false,
  }));
  return { catalog, kmiSymbols: [] };
}

async function fetchKmiSymbols() {
  try {
    const res = await fetch(`${DPS_ORIGIN}/indices/KMIALLSHR`, { headers: DPS_HEADERS, cf: { cacheTtl: 3600 } });
    const html = await res.text();
    const kmi = new Set();
    const re = /<strong>([A-Z][A-Z0-9&.-]{1,11})<\/strong>/g;
    let m;
    while ((m = re.exec(html)) !== null) kmi.add(m[1]);
    return [...kmi].sort();
  } catch (_) {
    return [];
  }
}

export async function fetchPsxCatalog() {
  const res = await fetch(`${DPS_ORIGIN}/symbols`, { headers: DPS_HEADERS, cf: { cacheTtl: 3600 } });
  const rows = await res.json();
  if (!Array.isArray(rows)) throw new Error('invalid symbols json');
  const kmiList = await fetchKmiSymbols();
  const kmiSet = new Set(kmiList);
  const catalog = rows
    .filter((r) => r?.symbol && !r.isDebt)
    .map((r) => ({
      symbol: String(r.symbol).toUpperCase(),
      name: r.name || r.symbol,
      sector: r.sectorName || 'Other',
      isShariah: kmiSet.has(String(r.symbol).toUpperCase()),
      isETF: !!r.isETF,
    }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol));
  return { catalog, kmiSymbols: kmiList };
}

async function mapPool(items, fn, concurrency = 8) {
  const out = {};
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      const sym = items[idx];
      try {
        const q = await fn(sym);
        if (q) out[sym] = q;
      } catch (_) {}
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length || 1) }, () => worker()));
  return out;
}

export async function fetchAllPsxQuotes(symbols, sessionOpen) {
  const list = [...new Set(symbols.map((s) => String(s).trim().toUpperCase()).filter(Boolean))];
  return mapPool(list, async (sym) => {
    const q = await fetchPsxQuote(sym, sessionOpen);
    if (!q?.price) return null;
    const prev = q.prevClose || q.price;
    const changePct = prev ? ((q.price - prev) / prev) * 100 : 0;
    return {
      price: q.price,
      prevClose: prev,
      changePct: Math.round(changePct * 100) / 100,
      quoteKind: q.quoteKind || 'last_close',
      source: q.source || 'dps',
      ts: q.ts || Date.now(),
    };
  }, 8);
}
