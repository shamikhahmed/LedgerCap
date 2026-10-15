'use strict';
const CommoditiesService = (() => {
  const CACHE_MS = 300000;
  const TROY_OZ_GRAMS = 31.1034768;
  let _cache = { ts: 0, rows: [] };
  let _meta = { source: 'empty', asOf: null };

  function getMeta() {
    return { source: _meta.source, asOf: _meta.asOf, count: _cache.rows.length };
  }

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

  function _hasPricedQuote(row) {
    return row && Number(row.price) > 0;
  }

  async function fetchAll() {
    if (_cache.rows.length && Date.now() - _cache.ts < CACHE_MS && _meta.source === 'live') {
      return _cache.rows;
    }
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
        // Honest: only show PKR gold when we have a live/derived quote or an explicit source — never invent ₨18000 as spot.
        if (goldAuto) {
          rows.push({
            ...c,
            price: goldAuto.price,
            changePct: goldAuto.changePct || 0,
            pkr: goldAuto.price,
            label: goldAuto.label || 'Spot-derived',
            manual: false,
          });
        } else if (settings.goldPriceSource && settings.goldPricePerGram > 0) {
          rows.push({
            ...c,
            price: settings.goldPricePerGram,
            changePct: 0,
            pkr: settings.goldPricePerGram,
            label: settings.goldPriceSource === 'Yahoo GC=F' ? 'Settings · last auto' : 'Settings · manual',
            manual: true,
          });
        }
        continue;
      }
      const snap = c.snapId ? _fromSnapshot(c.snapId) : null;
      if (snap && _hasPricedQuote(snap)) {
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
      if (q && _hasPricedQuote(q)) {
        rows.push({
          ...c,
          price: q.price,
          change: q.change || 0,
          changePct: q.changePct || 0,
          pkr: q.price * usd,
          label: 'Yahoo spot',
        });
      }
      // No zero-price placeholders — unavailable symbols stay out of the list.
    }

    if (rows.length) {
      _cache = { ts: Date.now(), rows };
      _meta = { source: 'live', asOf: _cache.ts };
      return rows;
    }
    if (_cache.rows.length) {
      _meta = { source: 'last-known', asOf: _cache.ts };
      return _cache.rows;
    }
    _meta = { source: 'empty', asOf: null };
    return [];
  }

  return { fetchAll, getMeta };
})();
window.CommoditiesService = CommoditiesService;
