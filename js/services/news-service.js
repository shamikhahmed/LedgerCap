'use strict';
/**
 * Portfolio news — Yahoo, Google News RSS, BBC Business (via worker proxy), optional GNews key.
 * Rule-based impact tags for decision support (not AI advice).
 */
const NewsService = (() => {
  const CACHE_MS = 900000;
  const _cache = new Map();

  const IMPACT_RULES = [
    { id: 'earnings', re: /earnings|profit|revenue|eps|quarterly results/i, label: 'Earnings', severity: 'high', bias: 'neutral' },
    { id: 'dividend', re: /dividend|payout|yield|interim|final cash/i, label: 'Dividend', severity: 'medium', bias: 'positive' },
    { id: 'upgrade', re: /upgrade|outperform|buy rating|raised target/i, label: 'Upgrade', severity: 'medium', bias: 'positive' },
    { id: 'downgrade', re: /downgrade|underperform|sell rating|cut target/i, label: 'Downgrade', severity: 'high', bias: 'negative' },
    { id: 'macro', re: /fed |interest rate|inflation|imf|sbp|rupee|dollar|oil price|kse-100/i, label: 'Macro', severity: 'medium', bias: 'neutral' },
    { id: 'regulatory', re: /sec |secp|fine|investigation|lawsuit|regulator/i, label: 'Regulatory', severity: 'high', bias: 'negative' },
    { id: 'merger', re: /merger|acquisition|takeover|buyout|m&a/i, label: 'M&A', severity: 'high', bias: 'neutral' },
  ];

  function _proxyBase() {
    const settings = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    const raw = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(settings.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || '').trim();
    return raw.replace(/\/$/, '');
  }

  function _yahooSymbol(sym, kind) {
    if (kind === 'intl' || kind === 'crypto') return sym;
    return `${sym}.KA`;
  }

  function _tagImpact(title, summary) {
    const text = `${title || ''} ${summary || ''}`;
    const hits = IMPACT_RULES.filter(r => r.re.test(text));
    if (!hits.length) return { tags: ['General'], severity: 'low', bias: 'neutral', hint: '' };
    const top = hits.sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.severity] - { high: 0, medium: 1, low: 2 }[b.severity]))[0];
    const bias = hits.some(h => h.bias === 'negative') ? 'negative' : hits.some(h => h.bias === 'positive') ? 'positive' : 'neutral';
    const hint = bias === 'positive'
      ? 'Potentially supportive for holders — verify against your thesis.'
      : bias === 'negative'
        ? 'Headline risk — review position size and stop-loss discipline.'
        : 'Material event — read full story before trading.';
    return { tags: hits.map(h => h.label), severity: top.severity, bias, hint };
  }

  function _normalizeItem(it, symbol) {
    return {
      id: it.id || it.url || `${it.source}:${it.title}`,
      title: it.title,
      url: it.url,
      publisher: it.publisher || it.source,
      publishedAt: it.publishedAt,
      symbol: it.symbol || symbol,
      portfolioSymbol: it.portfolioSymbol || symbol,
      source: it.source || 'News',
      impact: it.impact || _tagImpact(it.title),
    };
  }

  async function _fetchWorkerNews(path) {
    const base = _proxyBase();
    if (!base) return [];
    try {
      const res = await fetch(`${base}/${path}`, { headers: { Accept: 'application/json' } });
      if (!res.ok) return [];
      const j = await res.json();
      return j.articles || [];
    } catch (_) {
      return [];
    }
  }

  async function _fetchYahooNews(symbol, kind) {
    const viaWorker = await _fetchWorkerNews(`news/yahoo/${encodeURIComponent(symbol)}?kind=${encodeURIComponent(kind || 'stock')}`);
    if (viaWorker.length) return viaWorker;
    const ysym = _yahooSymbol(symbol, kind);
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(ysym)}&newsCount=6`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Yahoo ${res.status}`);
    const j = await res.json();
    return (j.news || []).map(n => ({
      id: n.uuid || n.link,
      title: n.title,
      url: n.link,
      publisher: n.publisher,
      publishedAt: n.providerPublishTime ? new Date(n.providerPublishTime * 1000).toISOString() : null,
      symbol,
      source: 'Yahoo Finance',
    }));
  }

  async function _fetchGoogleNewsRss(query, symbol) {
    const q = encodeURIComponent(query);
    const sym = encodeURIComponent(symbol || '—');
    const viaWorker = await _fetchWorkerNews(`news/google?q=${q}&symbol=${sym}`);
    if (viaWorker.length) return viaWorker;
    return [];
  }

  async function _fetchBbcBusiness() {
    return _fetchWorkerNews('news/bbc');
  }

  async function _fetchGNews(query, apiKey) {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=6&apikey=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GNews ${res.status}`);
    const j = await res.json();
    return (j.articles || []).map(a => ({
      id: a.url,
      title: a.title,
      url: a.url,
      publisher: a.source?.name,
      publishedAt: a.publishedAt,
      symbol: query,
      source: 'GNews',
    }));
  }

  function _dedupe(items) {
    const seen = new Set();
    return items.filter(a => {
      const key = (a.title || '').toLowerCase().replace(/\W+/g, '').slice(0, 80);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  async function fetchForSymbol(symbol, opts) {
    opts = opts || {};
    const kind = opts.kind || 'stock';
    const key = `${symbol}:${kind}`;
    const hit = _cache.get(key);
    if (hit && Date.now() - hit.ts < CACHE_MS) return hit.items;

    const q = kind === 'stock' ? `${symbol} Pakistan PSX stock` : symbol;
    const batches = await Promise.all([
      _fetchYahooNews(symbol, kind).catch(() => []),
      _fetchGoogleNewsRss(q, symbol).catch(() => []),
    ]);
    let items = batches.flat();

    const gKey = typeof State !== 'undefined' ? State.get('settings')?.gnewsApiKey : '';
    if (gKey) {
      try {
        const gq = kind === 'stock' ? `${symbol} Pakistan stock PSX` : symbol;
        items = items.concat(await _fetchGNews(gq, gKey));
      } catch (_) {}
    }

    items = _dedupe(items).map(it => _normalizeItem(it, symbol));
    _cache.set(key, { ts: Date.now(), items });
    return items;
  }

  function portfolioSymbols(state) {
    state = state || (typeof State !== 'undefined' ? State.get() : {});
    const txs = state.transactions || [];
    const syms = [];
    // Funds (Meezan NAVs) have no per-security news — querying their ticker
    // returns unrelated global headlines. They are covered by macro PSX news.
    Ledger.calcHoldings(txs).forEach(h => syms.push({ symbol: h.symbol, kind: 'stock', weight: h.shares * (State.getPrice(h.symbol) || h.avgCost) }));
    (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).forEach(h => syms.push({ symbol: h.symbol, kind: h.assetClass === 'crypto' ? 'crypto' : 'intl', weight: h.qty }));
    return syms.sort((a, b) => (b.weight || 0) - (a.weight || 0)).slice(0, 8);
  }

  async function fetchMacroNews() {
    const key = '__macro__';
    const hit = _cache.get(key);
    if (hit && Date.now() - hit.ts < CACHE_MS) return hit.items;
    // Pakistan-specific only — generic BBC business was drowning out
    // relevant PSX/economy headlines.
    const batches = await Promise.all([
      _fetchGoogleNewsRss('KSE-100 Pakistan stock market PSX', 'PSX'),
      _fetchGoogleNewsRss('Pakistan rupee economy SBP inflation', 'Macro'),
      _fetchGoogleNewsRss('Pakistan Stock Exchange listed companies', 'PSX'),
    ]);
    const items = _dedupe(batches.flat()).map(it => _normalizeItem(it, it.symbol || 'PSX'));
    _cache.set(key, { ts: Date.now(), items });
    return items;
  }

  async function fetchPortfolioNews(state) {
    state = state || (typeof State !== 'undefined' ? State.get() : {});
    const picks = portfolioSymbols(state);
    const base = _proxyBase();

    // PSX macro news (KSE-100, rupee, SBP) is always relevant — it leads.
    const macro = (await fetchMacroNews().catch(() => [])) || [];

    // Per-symbol items are only kept when the headline actually names the
    // company/ticker — PSX tickers aren't in global news indexes, so raw
    // per-ticker feeds return unrelated noise otherwise.
    const kindOf = {};
    picks.forEach(p => { kindOf[p.symbol] = p.kind; });

    let perSymbol = [];
    if (picks.length && base) {
      const syms = picks.slice(0, 6).map(p => p.symbol).join(',');
      const viaAgg = await _fetchWorkerNews(`news/aggregate?symbols=${encodeURIComponent(syms)}&limit=14`).catch(() => []);
      perSymbol = viaAgg.map(it => _normalizeItem(it, it.portfolioSymbol || it.symbol));
    }
    const nameFor = (sym) => {
      const s = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(x => x.symbol === sym);
      return (s?.name || '').split(/\s+/).filter(w => w.length > 3).slice(0, 2);
    };
    const relevant = perSymbol.filter(n => {
      const sym = n.portfolioSymbol || n.symbol || '';
      // Yahoo indexes US/crypto tickers — their per-symbol news is genuine.
      if (kindOf[sym] === 'intl' || kindOf[sym] === 'crypto') return true;
      // PSX tickers aren't indexed — require the headline to name the company.
      const title = (n.title || '').toUpperCase();
      if (sym && title.includes(sym.toUpperCase())) return true;
      return nameFor(sym).some(w => title.includes(w.toUpperCase()));
    });

    const merged = _dedupe(macro.concat(relevant))
      .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
      .slice(0, 12);
    return merged;
  }

  function newsFingerprint(items) {
    return (items || []).slice(0, 6).map(n => (n.title || '').slice(0, 40)).join('|');
  }

  function toTelegramRows(items) {
    return (items || []).slice(0, 6).map(n => ({
      symbol: n.portfolioSymbol || n.symbol || '—',
      title: (n.title || '').slice(0, 72),
      tag: (n.impact?.tags || [])[0] || 'News',
      source: n.source || n.publisher || 'News',
    }));
  }

  function impactBadge(impact) {
    if (!impact) return '';
    const cls = impact.bias === 'positive' ? 'psx-up' : impact.bias === 'negative' ? 'psx-down' : '';
    const tags = (impact.tags || []).slice(0, 2).join(' · ');
    return `<span class="lc-news-impact ${cls}">${tags}</span>`;
  }

  return {
    fetchForSymbol,
    fetchPortfolioNews,
    fetchMacroNews,
    portfolioSymbols,
    newsFingerprint,
    toTelegramRows,
    impactBadge,
    _tagImpact,
    IMPACT_RULES,
  };
})();
window.NewsService = NewsService;
