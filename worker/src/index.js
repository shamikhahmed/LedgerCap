/**
 * LedgerCap PSX Price Proxy — deploy to Cloudflare Workers
 * wrangler deploy (from worker/ folder)
 * Then set LEDGERCAP_CONFIG.psxProxyUrl in js/data/config.js or Settings
 */
const PSX_ORIGIN = 'https://dps.psx.com.pk';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const PSX_HEADERS = {
  Accept: 'application/json, text/plain, */*',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Referer: `${PSX_ORIGIN}/`,
  Origin: PSX_ORIGIN,
};

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    if (url.pathname === '/health') {
      return json({ ok: true, service: 'ledgercap-psx-proxy' });
    }

    const target = url.searchParams.get('url');
    const path = url.pathname.replace(/^\//, '');
    let fetchUrl = target;

    // Legacy /live alias — PSX removed bare /live; map to KSE-100 EOD
    if (!fetchUrl && (path === 'live' || path === 'kse100' || path === 'index')) {
      fetchUrl = `${PSX_ORIGIN}/timeseries/eod/KSE100`;
    }
    if (!fetchUrl && path) {
      fetchUrl = `${PSX_ORIGIN}/${path}`;
    }

    if (!fetchUrl || !fetchUrl.startsWith(`${PSX_ORIGIN}/`)) {
      return json({ error: 'Invalid url — only dps.psx.com.pk allowed' }, 400);
    }

    try {
      let lastErr = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch(fetchUrl, {
            headers: PSX_HEADERS,
            cf: { cacheTtl: 90 },
          });
          const body = await res.text();
          const trimmed = body.trim();
          if (!trimmed) {
            lastErr = 'Empty PSX response';
            if (attempt < 2) { await new Promise(r => setTimeout(r, 200 * (attempt + 1))); continue; }
            return json({ error: lastErr, url: fetchUrl }, 502);
          }
          if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html')) {
            return json({ error: 'PSX returned HTML (endpoint may have moved)', url: fetchUrl }, 404);
          }
          if (/^error code:\s*\d+/i.test(trimmed)) {
            lastErr = trimmed;
            if (attempt < 2) { await new Promise(r => setTimeout(r, 250 * (attempt + 1))); continue; }
            return json({ error: 'PSX upstream error', detail: trimmed.slice(0, 80), url: fetchUrl }, 502);
          }
          let out = trimmed;
          try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed) || parsed?.data) {
              const rows = Array.isArray(parsed) ? parsed : parsed.data;
              if (Array.isArray(rows) && rows.length) {
                const sorted = [...rows].sort((a, b) => (Number(a[0]) || 0) - (Number(b[0]) || 0));
                out = JSON.stringify(Array.isArray(parsed) ? sorted : { ...parsed, data: sorted });
              }
            }
          } catch { /* pass through raw */ }
          return new Response(out, {
            status: 200,
            headers: {
              ...CORS,
              'Content-Type': res.headers.get('Content-Type') || 'application/json',
              'Cache-Control': 'public, max-age=90',
            },
          });
        } catch (e) {
          lastErr = e.message || 'Proxy fetch failed';
          if (attempt < 2) { await new Promise(r => setTimeout(r, 200 * (attempt + 1))); continue; }
        }
      }
      return json({ error: lastErr || 'Proxy fetch failed', url: fetchUrl }, 502);
    } catch (e) {
      return json({ error: e.message || 'Proxy fetch failed', url: fetchUrl }, 502);
    }
  },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}
