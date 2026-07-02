'use strict';
const CommoditiesService = (() => {
  const CACHE_MS = 300000;
  let _cache = { ts: 0, rows: [] };

  async function _yahooQuote(yahoo) {
    let data = null;
    if (typeof Prices !== 'undefined' && Prices.fetchPriceSeries) {
      const bases = window.LedgerCapConfig?.psxProxyBases?.() || [];
      for (const base of bases) {
        try {
          const res = await fetch(`${base.replace(/\/$/, '')}/yahoo/chart/${encodeURIComponent(yahoo)}`, { headers: { Accept: 'application/json' } });
          if (res.ok) { data = await res.json(); break; }
        } catch (_) {}
      }
    }
    if (!data) {
      data = await fetch(`https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahoo)}?interval=1d&range=5d`)
        .then(r => r.ok ? r.json() : null).catch(() => null);
    }
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta?.regularMarketPrice) return null;
    const prev = meta.chartPreviousClose || meta.previousClose || meta.regularMarketPrice;
    const chg = meta.regularMarketPrice - prev;
    const chgPct = prev ? (chg / prev) * 100 : 0;
    return {
      price: meta.regularMarketPrice,
      prevClose: prev,
      change: chg,
      changePct: chgPct,
      currency: meta.currency || 'USD',
      ts: Date.now(),
    };
  }

  async function fetchAll() {
    if (_cache.rows.length && Date.now() - _cache.ts < CACHE_MS) return _cache.rows;
    const settings = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    const goldPkr = settings.goldPricePerGram || 18000;
    const usd = typeof FxService !== 'undefined' ? FxService.getUsdRate() : 280;
    const rows = [];

    for (const c of window.COMMODITY_ASSETS || []) {
      if (c.manual && c.id === 'pkr_gold') {
        rows.push({
          ...c,
          price: goldPkr,
          changePct: 0,
          pkr: goldPkr,
          label: 'Settings · manual',
        });
        continue;
      }
      const q = c.yahoo ? await _yahooQuote(c.yahoo) : null;
      const pkr = q?.price ? q.price * usd : 0;
      rows.push({
        ...c,
        price: q?.price || 0,
        change: q?.change || 0,
        changePct: q?.changePct || 0,
        pkr,
        label: q ? 'Yahoo spot' : 'Unavailable',
      });
    }

    _cache = { ts: Date.now(), rows };
    return rows;
  }

  return { fetchAll };
})();
window.CommoditiesService = CommoditiesService;
