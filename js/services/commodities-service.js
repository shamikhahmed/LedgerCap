'use strict';
const CommoditiesService = (() => {
  const CACHE_MS = 300000;
  const TROY_OZ_GRAMS = 31.1034768;
  let _cache = { ts: 0, rows: [] };

  function _fromSnapshot(snapId) {
    const snap = window._LC_CMD_SNAPSHOT || {};
    const q = snap[snapId];
    if (!q?.price) return null;
    return {
      price: q.price,
      changePct: q.changePct || 0,
      label: q.source === 'OGRA-fallback' ? `OGRA fallback · ${q.asOf || ''}` : (q.quoteKind === 'derived' ? 'Spot-derived' : 'Worker snapshot'),
      asOf: q.asOf,
      manual: q.quoteKind === 'ogra' && q.source === 'OGRA-fallback',
    };
  }

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
      label: 'Yahoo spot',
    };
  }

  async function _pkrGoldFromSpot() {
    const snap = _fromSnapshot('GOLD_24K_PKR');
    if (snap) return { ...snap, pkr: snap.price, label: snap.label || 'Snapshot 24k' };
    const q = await _yahooQuote('GC=F');
    if (!q?.price) return null;
    const usd = typeof FxService !== 'undefined' ? FxService.getUsdRate() : 280;
    const pkrPerGram = Math.round((q.price * usd) / TROY_OZ_GRAMS);
    if (pkrPerGram > 0 && typeof State !== 'undefined') {
      State.update((s) => {
        s.settings.goldPricePerGram = pkrPerGram;
        s.settings.goldPriceSource = 'Yahoo GC=F';
        s.settings.goldPriceUpdatedAt = new Date().toISOString();
      });
    }
    return { price: pkrPerGram, changePct: q.changePct || 0, pkr: pkrPerGram, label: 'Yahoo GC=F · auto' };
  }

  async function fetchAll() {
    if (_cache.rows.length && Date.now() - _cache.ts < CACHE_MS) return _cache.rows;
    if (typeof PriceSnapshotService !== 'undefined' && PriceSnapshotService.enabled()) {
      await PriceSnapshotService.refresh('commodities').catch(() => {});
    }
    if (typeof FxService !== 'undefined') await FxService.refreshUsdPkr().catch(() => {});
    const settings = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    const goldAuto = await _pkrGoldFromSpot();
    const usd = typeof FxService !== 'undefined' ? FxService.getUsdRate() : 280;
    const rows = [];

    for (const c of window.COMMODITY_ASSETS || []) {
      if (c.id === 'pkr_gold') {
        const g = goldAuto || { price: settings.goldPricePerGram || 18000, changePct: 0 };
        rows.push({
          ...c,
          price: g.price,
          changePct: g.changePct || 0,
          pkr: g.price,
          label: g.label || 'Settings · manual fallback',
          manual: !goldAuto,
        });
        continue;
      }
      const snap = c.snapId ? _fromSnapshot(c.snapId) : null;
      if (snap) {
        rows.push({
          ...c,
          price: snap.price,
          changePct: snap.changePct || 0,
          pkr: c.unit === 'PKR/g' || c.unit === 'PKR/L' ? snap.price : snap.price * usd,
          label: snap.label,
          asOf: snap.asOf,
          manual: !!snap.manual,
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
