'use strict';
/**
 * Portfolio news — Yahoo Finance (no key) + optional GNews API key in Settings.
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

  function _yahooSymbol(sym, kind) {
    if (kind === 'intl' || kind === 'crypto') return sym;
    return `${sym}.KA`;
  }

  function _tagImpact(title, summary) {
    const text = `${title || ''} ${summary || ''}`;
    const hits = IMPACT_RULES.filter(r => r.re.test(text));
    if (!hits.length) return { tags: ['General'], severity: 'low', bias: 'neutral', hint: 'Monitor — no strong signal in headline.' };
    const top = hits.sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.severity] - { high: 0, medium: 1, low: 2 }[b.severity]))[0];
    const bias = hits.some(h => h.bias === 'negative') ? 'negative' : hits.some(h => h.bias === 'positive') ? 'positive' : 'neutral';
    const hint = bias === 'positive'
      ? 'Potentially supportive for holders — verify against your thesis.'
      : bias === 'negative'
        ? 'Headline risk — review position size and stop-loss discipline.'
        : 'Material event — read full story before trading.';
    return { tags: hits.map(h => h.label), severity: top.severity, bias, hint };
  }

  async function _fetchYahooNews(symbol, kind) {
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

  async function fetchForSymbol(symbol, opts) {
    opts = opts || {};
    const kind = opts.kind || 'stock';
    const key = `${symbol}:${kind}`;
    const hit = _cache.get(key);
    if (hit && Date.now() - hit.ts < CACHE_MS) return hit.items;

    let items = [];
    try {
      items = await _fetchYahooNews(symbol, kind);
    } catch (_) {}

    const gKey = typeof State !== 'undefined' ? State.get('settings')?.gnewsApiKey : '';
    if (!items.length && gKey) {
      try {
        const q = kind === 'stock' ? `${symbol} Pakistan stock PSX` : symbol;
        items = await _fetchGNews(q, gKey);
      } catch (_) {}
    }

    items = items.map(it => ({ ...it, impact: _tagImpact(it.title) }));
    _cache.set(key, { ts: Date.now(), items });
    return items;
  }

  function portfolioSymbols(state) {
    state = state || (typeof State !== 'undefined' ? State.get() : {});
    const txs = state.transactions || [];
    const syms = [];
    Ledger.calcHoldings(txs).forEach(h => syms.push({ symbol: h.symbol, kind: 'stock', weight: h.shares * (State.getPrice(h.symbol) || h.avgCost) }));
    Ledger.calcFundHoldings(txs).forEach(f => syms.push({ symbol: f.symbol, kind: 'fund', weight: f.units * (State.getPrice(f.symbol) || f.avgNav) }));
    (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).forEach(h => syms.push({ symbol: h.symbol, kind: h.assetClass === 'crypto' ? 'crypto' : 'intl', weight: h.qty }));
    return syms.sort((a, b) => (b.weight || 0) - (a.weight || 0)).slice(0, 8);
  }

  async function fetchPortfolioNews(state) {
    const picks = portfolioSymbols(state);
    const all = [];
    for (const p of picks.slice(0, 5)) {
      try {
        const rows = await fetchForSymbol(p.symbol, { kind: p.kind });
        rows.forEach(r => all.push({ ...r, portfolioSymbol: p.symbol }));
      } catch (_) {}
    }
    const seen = new Set();
    return all.filter(a => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    }).sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || '')).slice(0, 12);
  }

  function impactBadge(impact) {
    if (!impact) return '';
    const cls = impact.bias === 'positive' ? 'psx-up' : impact.bias === 'negative' ? 'psx-down' : '';
    const tags = (impact.tags || []).slice(0, 2).join(' · ');
    return `<span class="lc-news-impact ${cls}">${tags}</span>`;
  }

  return { fetchForSymbol, fetchPortfolioNews, portfolioSymbols, impactBadge, _tagImpact, IMPACT_RULES };
})();
window.NewsService = NewsService;
