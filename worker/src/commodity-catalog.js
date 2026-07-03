import { pkrPerGram, KARAT_IDS } from './karat-math.js';
import ograFallback from '../data/ogra-fallback.json';

const YAHOO_HEADERS = {
  Accept: 'application/json, text/plain, */*',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  Referer: 'https://finance.yahoo.com/',
};

const FUTURES = [
  { id: 'GC=F', unit: 'USD/oz' },
  { id: 'SI=F', unit: 'USD/oz' },
  { id: 'PL=F', unit: 'USD/oz' },
  { id: 'CL=F', unit: 'USD/bbl' },
  { id: 'BZ=F', unit: 'USD/bbl' },
  { id: 'NG=F', unit: 'USD/MMBtu' },
  { id: 'HG=F', unit: 'USD/lb' },
];

async function yahooChart(sym) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=5d`;
  const res = await fetch(url, { headers: YAHOO_HEADERS, cf: { cacheTtl: 120 } });
  const data = await res.json();
  const meta = data?.chart?.result?.[0]?.meta;
  if (!meta?.regularMarketPrice) return null;
  const prev = meta.chartPreviousClose || meta.previousClose || meta.regularMarketPrice;
  const chg = meta.regularMarketPrice - prev;
  return {
    price: meta.regularMarketPrice,
    changePct: prev ? (chg / prev) * 100 : 0,
    currency: meta.currency || 'USD',
  };
}

async function fetchFx() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', { cf: { cacheTtl: 300 } });
    const j = await res.json();
    const rate = j?.rates?.PKR;
    if (rate > 0) return { rate, source: 'open.er-api.com', ts: Date.now() };
  } catch (_) {}
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=PKR', { cf: { cacheTtl: 300 } });
    const j = await res.json();
    const rate = j?.rates?.PKR;
    if (rate > 0) return { rate, source: 'frankfurter.app', ts: Date.now() };
  } catch (_) {}
  return { rate: 280, source: 'fallback', ts: Date.now() };
}

export async function fetchOgraPrices() {
  try {
    const res = await fetch('https://www.ogra.org.pk/', { headers: { Accept: 'text/html' }, cf: { cacheTtl: 86400 } });
    const html = await res.text();
    const ms = html.match(/MS[\s\S]{0,200}?(\d{2,3}(?:\.\d+)?)/i);
    const hsd = html.match(/HSD[\s\S]{0,200}?(\d{2,3}(?:\.\d+)?)/i);
    if (ms?.[1] && hsd?.[1]) {
      return {
        ms: parseFloat(ms[1]),
        hsd: parseFloat(hsd[1]),
        asOf: new Date().toISOString().slice(0, 10),
        source: 'OGRA',
      };
    }
  } catch (_) {}
  return { ...ograFallback };
}

export async function fetchCommoditySnapshot() {
  const quotes = {};
  const fx = await fetchFx();
  let gcUsd = 0;
  for (const f of FUTURES) {
    const q = await yahooChart(f.id);
    if (!q) continue;
    if (f.id === 'GC=F') gcUsd = q.price;
    quotes[f.id] = {
      price: q.price,
      unit: f.unit,
      currency: 'USD',
      changePct: Math.round(q.changePct * 100) / 100,
      quoteKind: 'spot',
      source: 'yahoo',
      ts: Date.now(),
    };
  }
  if (gcUsd > 0 && fx.rate > 0) {
    KARAT_IDS.forEach((k) => {
      const pkr = pkrPerGram(gcUsd, fx.rate, k);
      quotes[`GOLD_${k}K_PKR`] = {
        price: pkr,
        unit: 'PKR/g',
        currency: 'PKR',
        changePct: quotes['GC=F']?.changePct || 0,
        quoteKind: 'derived',
        source: 'GC=F×FX',
        ts: Date.now(),
        meta: { karat: k, purity: k / 24 },
      };
    });
  }
  const ogra = await fetchOgraPrices();
  if (ogra.ms > 0) {
    quotes.OGRA_MS = {
      price: ogra.ms,
      unit: 'PKR/L',
      currency: 'PKR',
      quoteKind: 'ogra',
      source: ogra.source || 'OGRA',
      asOf: ogra.asOf,
      ts: Date.now(),
    };
  }
  if (ogra.hsd > 0) {
    quotes.OGRA_HSD = {
      price: ogra.hsd,
      unit: 'PKR/L',
      currency: 'PKR',
      quoteKind: 'ogra',
      source: ogra.source || 'OGRA',
      asOf: ogra.asOf,
      ts: Date.now(),
    };
  }
  return { quotes, fx };
}
