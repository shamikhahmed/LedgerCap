/** Free news feeds — Google News RSS, BBC Business, Yahoo search (no API keys). */

const UA = 'Mozilla/5.0 (compatible; LedgerCap/1.0; +https://shamikhahmed.github.io/LedgerCap/)';

export function parseRssItems(xml, source, symbol) {
  const items = [];
  if (!xml || typeof xml !== 'string') return items;
  const chunks = xml.split(/<item[\s>]/i).slice(1);
  for (const chunk of chunks.slice(0, 12)) {
    const titleM = chunk.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
    const linkM = chunk.match(/<link>([^<]+)<\/link>/i)
      || chunk.match(/<link[^>]+href="([^"]+)"/i);
    const dateM = chunk.match(/<pubDate>([^<]+)<\/pubDate>/i)
      || chunk.match(/<published>([^<]+)<\/published>/i);
    const title = (titleM?.[1] || '').replace(/<[^>]+>/g, '').trim();
    const url = (linkM?.[1] || '').trim();
    if (!title) continue;
    let publishedAt = null;
    if (dateM?.[1]) {
      const d = new Date(dateM[1]);
      if (!Number.isNaN(d.getTime())) publishedAt = d.toISOString();
    }
    items.push({
      id: url || `${source}:${title.slice(0, 80)}`,
      title: title.slice(0, 200),
      url,
      publisher: source,
      publishedAt,
      symbol: symbol || '—',
      source,
    });
  }
  return items;
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/rss+xml, application/xml, text/xml, */*', 'User-Agent': UA },
    cf: { cacheTtl: 300 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

export async function fetchGoogleNewsRss(query, symbol) {
  const q = encodeURIComponent(query);
  const url = `https://news.google.com/rss/search?q=${q}&hl=en-PK&gl=PK&ceid=PK:en`;
  const xml = await fetchText(url);
  return parseRssItems(xml, 'Google News', symbol);
}

export async function fetchBbcBusiness() {
  const xml = await fetchText('https://feeds.bbci.co.uk/news/business/rss.xml');
  return parseRssItems(xml, 'BBC Business', 'Macro');
}

export async function fetchYahooSymbolNews(symbol, kind) {
  const ysym = kind === 'intl' || kind === 'crypto' ? symbol : `${symbol}.KA`;
  const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(ysym)}&newsCount=8`;
  const res = await fetch(url, { headers: {
    Accept: 'application/json, text/plain, */*',
    'User-Agent': UA,
    Referer: 'https://finance.yahoo.com/',
    Origin: 'https://finance.yahoo.com',
    'Accept-Language': 'en-US,en;q=0.9',
  } });
  if (!res.ok) throw new Error(`Yahoo ${res.status}`);
  const j = await res.json();
  return (j.news || []).map((n) => ({
    id: n.uuid || n.link,
    title: n.title,
    url: n.link,
    publisher: n.publisher || 'Yahoo Finance',
    publishedAt: n.providerPublishTime ? new Date(n.providerPublishTime * 1000).toISOString() : null,
    symbol,
    source: 'Yahoo Finance',
  }));
}

function dedupeArticles(rows) {
  const seen = new Set();
  return rows.filter((a) => {
    const key = (a.title || '').toLowerCase().replace(/\W+/g, '').slice(0, 80);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function aggregatePortfolioNews(symbols, opts) {
  opts = opts || {};
  const picks = (symbols || []).slice(0, 5);
  const all = [];

  const macroQueries = [
    fetchBbcBusiness().catch(() => []),
    fetchGoogleNewsRss('KSE-100 Pakistan stock market PSX', 'PSX').catch(() => []),
    fetchGoogleNewsRss('Pakistan rupee economy SBP', 'Macro').catch(() => []),
  ];
  const macro = dedupeArticles((await Promise.all(macroQueries)).flat());
  all.push(...macro.slice(0, 4));

  for (const p of picks) {
    const sym = typeof p === 'string' ? p : p.symbol;
    const kind = typeof p === 'string' ? 'stock' : (p.kind || 'stock');
    const q = kind === 'stock' ? `${sym} Pakistan PSX stock` : sym;
    const batch = await Promise.all([
      fetchYahooSymbolNews(sym, kind).catch(() => []),
      fetchGoogleNewsRss(q, sym).catch(() => []),
    ]);
    batch.flat().forEach((r) => all.push({ ...r, portfolioSymbol: sym }));
  }

  return dedupeArticles(all)
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
    .slice(0, opts.limit || 12);
}

export async function handleNewsRequest(request, url) {
  const path = url.pathname.replace(/^\//, '');
  if (!path.startsWith('news/')) return null;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
      },
    });
  }
  if (request.method !== 'GET') return json({ error: 'GET only' }, 405);

  try {
    if (path === 'news/bbc') {
      return json({ articles: await fetchBbcBusiness() });
    }
    if (path === 'news/google') {
      const q = url.searchParams.get('q') || 'Pakistan stock PSX';
      const sym = url.searchParams.get('symbol') || '—';
      return json({ articles: await fetchGoogleNewsRss(q, sym) });
    }
    if (path.startsWith('news/yahoo/')) {
      const sym = decodeURIComponent(path.slice('news/yahoo/'.length));
      const kind = url.searchParams.get('kind') || 'stock';
      return json({ articles: await fetchYahooSymbolNews(sym, kind) });
    }
    if (path === 'news/aggregate') {
      const raw = url.searchParams.get('symbols') || '';
      const symbols = raw.split(',').map((s) => s.trim()).filter(Boolean);
      const articles = await aggregatePortfolioNews(
        symbols.map((s) => ({ symbol: s, kind: 'stock' })),
        { limit: parseInt(url.searchParams.get('limit') || '12', 10) },
      );
      return json({ articles, ts: Date.now() });
    }
    return json({ error: 'Unknown news route' }, 404);
  } catch (e) {
    return json({ error: e.message || 'News fetch failed' }, 502);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=120',
    },
  });
}
