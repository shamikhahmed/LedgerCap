/**
 * StundsOS PSX Price Proxy — deploy to Cloudflare Workers
 * wrangler deploy (from worker/ folder)
 * Then set STUNDS_CONFIG.psxProxyUrl in js/data/config.js or Settings
 */
export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    const url = new URL(request.url);
    const target = url.searchParams.get('url');
    const path = url.pathname.replace(/^\//, '');

    let fetchUrl = target;
    if (!fetchUrl && path) {
      fetchUrl = `https://dps.psx.com.pk/${path}`;
    }

    if (!fetchUrl || !fetchUrl.startsWith('https://dps.psx.com.pk/')) {
      return json({ error: 'Invalid url — only dps.psx.com.pk allowed' }, 400);
    }

    try {
      const res = await fetch(fetchUrl, {
        headers: { Accept: 'application/json, text/plain, */*', 'User-Agent': 'StundsOS-Proxy/1.0' },
      });
      const body = await res.text();
      return new Response(body, {
        status: res.status,
        headers: {
          'Content-Type': res.headers.get('Content-Type') || 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=120',
        },
      });
    } catch (e) {
      return json({ error: e.message }, 502);
    }
  },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
