/** SSE price push during PSX session — intraday when open, EOD after close. */

const PSX_ORIGIN = 'https://dps.psx.com.pk';
const PSX_HEADERS = {
  Accept: 'application/json, text/plain, */*',
  'User-Agent': 'Mozilla/5.0 (compatible; LedgerCap/1.0)',
  Referer: `${PSX_ORIGIN}/`,
  Origin: PSX_ORIGIN,
};

const CORS_SSE = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Accept, Cache-Control',
};

async function fetchPsxSeries(symbol, kind) {
  const sym = String(symbol || '').trim().toUpperCase();
  if (!sym || sym.length > 12) return null;
  const path = kind === 'int' ? 'timeseries/int' : 'timeseries/eod';
  const url = `${PSX_ORIGIN}/${path}/${encodeURIComponent(sym)}`;
  const res = await fetch(url, { headers: PSX_HEADERS, cf: { cacheTtl: kind === 'int' ? 10 : 60 } });
  const text = await res.text();
  if (!text?.trim() || text.trim().startsWith('<')) return null;
  let data;
  try { data = JSON.parse(text); } catch { return null; }
  const rows = Array.isArray(data) ? data : (data?.data || []);
  if (!rows.length) return null;
  const sorted = [...rows].sort((a, b) => (Number(a[0]) || 0) - (Number(b[0]) || 0));
  const last = sorted[sorted.length - 1];
  const price = parseFloat(last[1]);
  const prev = parseFloat(last[3] ?? sorted[sorted.length - 2]?.[1] ?? last[1]);
  if (!(price > 0)) return null;
  return {
    price,
    prevClose: prev > 0 ? prev : price,
    ts: Date.now(),
    quoteKind: kind === 'int' ? 'intraday' : 'last_close',
    source: kind === 'int' ? 'live-sse-int' : 'live-sse',
  };
}

async function fetchPsxQuote(symbol, sessionOpen) {
  if (sessionOpen) {
    const intraday = await fetchPsxSeries(symbol, 'int');
    if (intraday) return intraday;
  }
  return fetchPsxSeries(symbol, 'eod');
}

function pktSessionOpen() {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const wd = get('weekday') || '';
  if (['Sat', 'Sun'].includes(wd)) return false;
  const mins = parseInt(get('hour') || '0', 10) * 60 + parseInt(get('minute') || '0', 10);
  return mins >= 9 * 60 + 15 && mins < 15 * 60 + 45;
}

export async function handleSsePrices(request, url) {
  const path = url.pathname.replace(/^\//, '');
  if (path !== 'sse/prices') return null;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_SSE });
  }
  if (request.method !== 'GET') {
    return new Response('GET only', { status: 405, headers: CORS_SSE });
  }

  const raw = url.searchParams.get('symbols') || '';
  const symbols = [...new Set(raw.split(',').map((s) => s.trim().toUpperCase()).filter((s) => /^[A-Z0-9.-]{1,12}$/.test(s)))].slice(0, 24);
  if (!symbols.length) {
    return new Response('symbols query required', { status: 400, headers: CORS_SSE });
  }

  const intervalMs = Math.min(Math.max(parseInt(url.searchParams.get('interval') || '20', 10) || 20, 10), 120) * 1000;
  const sessionOpen = pktSessionOpen();

  const stream = new ReadableStream({
    start(controller) {
      const enc = new TextEncoder();
      let closed = false;
      let timer = null;

      const close = () => {
        if (closed) return;
        closed = true;
        if (timer) clearInterval(timer);
        try { controller.close(); } catch (_) {}
      };

      const tick = async () => {
        if (closed) return;
        if (!sessionOpen) {
          controller.enqueue(enc.encode(`: psx session closed\n\n`));
          return;
        }
        const quotes = {};
        await Promise.all(symbols.map(async (sym) => {
          try {
            const q = await fetchPsxQuote(sym, true);
            if (q) quotes[sym] = q;
          } catch (_) {}
        }));
        const payload = JSON.stringify({
          quotes,
          ts: Date.now(),
          count: Object.keys(quotes).length,
          sessionOpen: true,
          quoteKind: 'intraday',
        });
        controller.enqueue(enc.encode(`data: ${payload}\n\n`));
      };

      request.signal?.addEventListener('abort', close);
      tick();
      timer = setInterval(tick, intervalMs);
    },
  });

  return new Response(stream, {
    headers: {
      ...CORS_SSE,
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
