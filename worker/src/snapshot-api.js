import { pktSessionOpen, usSessionOpen, sessionLabels } from './us-session.js';
import { fetchPsxCatalog } from './psx-universe.js';
import { fetchCommoditySnapshot } from './commodity-catalog.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Accept, Cache-Control',
};

const STALE_PSX_MS = 30 * 60 * 1000;
const STALE_US_MS = 45 * 60 * 1000;
const STALE_CMD_MS = 60 * 60 * 1000;

async function kvJson(kv, key, fallback = null) {
  if (!kv) return fallback;
  const raw = await kv.get(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
}

function isStale(updatedAt, thresholdMs, sessionOpen) {
  if (!updatedAt) return true;
  if (!sessionOpen) return false;
  return Date.now() - new Date(updatedAt).getTime() > thresholdMs;
}

export async function handleSnapshot(request, env, url) {
  const path = url.pathname.replace(/^\//, '');
  if (path !== 'prices/snapshot') return null;

  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (request.method !== 'GET') return new Response('GET only', { status: 405, headers: CORS });

  const kv = env.PRICE_CACHE;
  if (!kv) {
    return json({ ok: false, error: 'PRICE_CACHE not configured' }, 503);
  }

  let catalog = await kvJson(kv, 'meta:psx_catalog', []);
  if (!catalog.length) {
    try {
      const fresh = await fetchPsxCatalog();
      catalog = fresh.catalog;
      if (catalog.length) {
        await kv.put('meta:psx_catalog', JSON.stringify(catalog));
        await kv.put('meta:kmi_symbols', JSON.stringify(fresh.kmiSymbols || []));
      }
      const { quotes, fx } = await fetchCommoditySnapshot();
      await kv.put('cmd:quotes', JSON.stringify(quotes));
      await kv.put('fx:usdpkr', JSON.stringify(fx));
      await kv.put('meta:last_run:cmd', new Date().toISOString());
    } catch (_) {}
  }

  const bucket = (url.searchParams.get('bucket') || 'all').toLowerCase();
  const valid = new Set(['all', 'psx', 'us', 'commodities', 'fx', 'meta']);
  if (!valid.has(bucket)) return json({ ok: false, error: 'invalid bucket' }, 400);

  const symFilter = url.searchParams.get('symbols')
    ? url.searchParams.get('symbols').split(',').map((s) => s.trim().toUpperCase()).filter(Boolean).slice(0, 50)
    : null;

  const [kmiSymbols, psxQuotes, usQuotes, cmdQuotes, fx, psxAt, usAt, cmdAt] = await Promise.all([
    kvJson(kv, 'meta:kmi_symbols', []),
    kvJson(kv, 'psx:quotes', {}),
    kvJson(kv, 'us:quotes', {}),
    kvJson(kv, 'cmd:quotes', {}),
    kvJson(kv, 'fx:usdpkr', null),
    kv.get('meta:last_run:psx'),
    kv.get('meta:last_run:us'),
    kv.get('meta:last_run:cmd'),
  ]);

  const session = sessionLabels();
  const stale = {
    psx: isStale(psxAt, STALE_PSX_MS, session.psxOpen),
    us: isStale(usAt, STALE_US_MS, session.usOpen),
    cmd: isStale(cmdAt, STALE_CMD_MS, true),
  };

  const filterQuotes = (quotes) => {
    if (!symFilter?.length) return quotes;
    const out = {};
    symFilter.forEach((s) => { if (quotes[s]) out[s] = quotes[s]; });
    return out;
  };

  const body = {
    ok: true,
    schema: 1,
    bucket,
    updatedAt: psxAt || usAt || cmdAt || new Date().toISOString(),
    session,
    stale,
    counts: {
      psx: Object.keys(psxQuotes).length,
      us: Object.keys(usQuotes).length,
      commodities: Object.keys(cmdQuotes).length,
      catalog: catalog.length,
    },
  };

  if (bucket === 'meta' || bucket === 'all') {
    body.catalog = catalog;
    body.kmiSymbols = kmiSymbols;
  }
  if (bucket === 'fx' || bucket === 'all') body.fx = fx;
  if (bucket === 'psx' || bucket === 'all') {
    body.psx = { updatedAt: psxAt, quotes: filterQuotes(psxQuotes) };
  }
  if (bucket === 'us' || bucket === 'all') {
    body.us = { updatedAt: usAt, quotes: filterQuotes(usQuotes) };
  }
  if (bucket === 'commodities' || bucket === 'all') {
    body.commodities = { updatedAt: cmdAt, quotes: cmdQuotes };
  }

  if (!catalog.length && !Object.keys(psxQuotes).length && bucket !== 'meta') {
    return json({ ok: false, error: 'KV empty', bucket }, 404);
  }

  return json(body, 200, 60);
}

function json(data, status = 200, maxAge = 0) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...CORS,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': maxAge ? `public, max-age=${maxAge}` : 'no-store',
    },
  });
}
