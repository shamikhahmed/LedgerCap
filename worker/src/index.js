/**
 * LedgerCap Market Proxy — PSX, Yahoo, CoinGecko, FX, Telegram cron
 * wrangler deploy (from worker/)
 */
import { handleTelegramRequest, runTelegramCron } from './telegram.js';
import { handleNewsRequest } from './news.js';
import { handleSsePrices } from './sse-prices.js';

const PSX_ORIGIN = 'https://dps.psx.com.pk';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Telegram-Bot-Token, X-LedgerCap-Sync-Key',
};

const PSX_HEADERS = {
  Accept: 'application/json, text/plain, */*',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Referer: `${PSX_ORIGIN}/`,
  Origin: PSX_ORIGIN,
};

// Yahoo 429s requests without a browser identity. A real UA + Referer make
// the datacenter IP look like an ordinary browser and unblock quotes/news.
const YAHOO_HEADERS = {
  Accept: 'application/json, text/plain, */*',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  Referer: 'https://finance.yahoo.com/',
  Origin: 'https://finance.yahoo.com',
  'Accept-Language': 'en-US,en;q=0.9',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/^\//, '');

    if (url.pathname === '/health') {
      return json({ ok: true, service: 'ledgercap-market-proxy', routes: ['psx', 'yahoo', 'crypto', 'fx', 'telegram', 'news', 'sse'] });
    }

    const tg = await handleTelegramRequest(request, env, url);
    if (tg) return tg;

    const news = await handleNewsRequest(request, url);
    if (news) return news;

    const sse = await handleSsePrices(request, url);
    if (sse) return sse;

    // FX: USD/PKR
    if (path === 'fx/usdpkr') {
      return proxyFetch('https://open.er-api.com/v6/latest/USD', {}, async (text) => {
        const j = JSON.parse(text);
        const rate = j?.rates?.PKR;
        if (!rate) throw new Error('PKR rate missing');
        return json({ rate, source: 'open.er-api.com', ts: Date.now() });
      });
    }

    // Crypto: /crypto/price?ids=bitcoin,ethereum
    if (path === 'crypto/price') {
      const ids = url.searchParams.get('ids') || 'bitcoin';
      const cgUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd&include_24hr_change=true`;
      return proxyFetch(cgUrl, { headers: { Accept: 'application/json' } }, (text) => okJson(text, 120));
    }

    // Yahoo: /yahoo/chart/AAPL
    if (path.startsWith('yahoo/chart/')) {
      const sym = decodeURIComponent(path.slice('yahoo/chart/'.length));
      const yUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=5d`;
      return proxyFetch(yUrl, { headers: YAHOO_HEADERS, cf: { cacheTtl: 60 } }, (text) => okJson(text, 90));
    }

    // PSX passthrough
    const target = url.searchParams.get('url');
    let fetchUrl = target;
    if (!fetchUrl && (path === 'live' || path === 'kse100' || path === 'index')) {
      fetchUrl = `${PSX_ORIGIN}/timeseries/eod/KSE100`;
    }
    if (!fetchUrl && path) {
      fetchUrl = `${PSX_ORIGIN}/${path}`;
    }
    if (!fetchUrl || !fetchUrl.startsWith(`${PSX_ORIGIN}/`)) {
      return json({ error: 'Unknown route', path }, 404);
    }

    return proxyFetch(fetchUrl, { headers: PSX_HEADERS, cf: { cacheTtl: 90 } }, (text) => {
      const trimmed = text.trim();
      if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html')) {
        return json({ error: 'PSX returned HTML', url: fetchUrl }, 404);
      }
      if (/^error code:\s*\d+/i.test(trimmed)) {
        throw new Error(trimmed.slice(0, 60));
      }
      let out = trimmed;
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed?.data && Array.isArray(parsed.data) && parsed.data.length) {
          const sorted = [...parsed.data].sort((a, b) => (Number(a[0]) || 0) - (Number(b[0]) || 0));
          out = JSON.stringify({ ...parsed, data: sorted });
        }
      } catch { /* raw */ }
      return new Response(out, {
        status: 200,
        headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=90' },
      });
    });
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      runTelegramCron(env)
        .then((r) => { if (r && !r.ok && !r.skipped) console.error('telegram cron', r); })
        .catch((e) => console.error('telegram cron', e)),
    );
  },
};

async function proxyFetch(fetchUrl, opts, handle) {
  let lastErr = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(fetchUrl, opts);
      const text = await res.text();
      if (!text?.trim()) {
        lastErr = 'Empty response';
        if (attempt < 2) { await sleep(200 * (attempt + 1)); continue; }
        return json({ error: lastErr, url: fetchUrl }, 502);
      }
      return await handle(text);
    } catch (e) {
      lastErr = e.message || 'fetch failed';
      if (attempt < 2) { await sleep(250 * (attempt + 1)); continue; }
    }
  }
  return json({ error: lastErr || 'Proxy fetch failed', url: fetchUrl }, 502);
}

function okJson(text, maxAge) {
  return new Response(text, {
    status: 200,
    headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${maxAge}` },
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
