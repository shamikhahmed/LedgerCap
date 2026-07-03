'use strict';
/** Worker KV snapshot → State.prices */
const PriceSnapshotService = (() => {
  const POLL_MS = 5 * 60 * 1000;
  let _timer = null;
  let _meta = { psxAt: null, usAt: null, cmdAt: null };

  function enabled() {
    const s = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    if (s.snapshotEnabled === false) return false;
    return window.LEDGERCAP_CONFIG?.snapshotEnabled !== false;
  }

  function _proxyBase() {
    const settings = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    const raw = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(settings.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || '').trim();
    return raw.replace(/\/$/, '');
  }

  async function _fetchSnapshot(bucket) {
    const base = _proxyBase();
    if (!base) return null;
    const url = `${base}/prices/snapshot?bucket=${encodeURIComponent(bucket || 'all')}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    return res.json();
  }

  function applyToState(data) {
    if (!data?.ok || typeof State === 'undefined') return 0;
    let n = 0;
    const rate = data.fx?.rate || (typeof FxService !== 'undefined' ? FxService.getUsdRate() : 280);

    if (data.catalog?.length && typeof PsxStocksCatalog !== 'undefined') {
      PsxStocksCatalog.hydrate(data.catalog);
    }

    if (data.psx?.quotes && typeof Prices !== 'undefined' && Prices.applySnapshotPsx) {
      n += Prices.applySnapshotPsx(data.psx.quotes);
    } else if (data.psx?.quotes) {
      Object.entries(data.psx.quotes).forEach(([sym, q]) => {
        if (!q?.price) return;
        State.updatePrice(sym, { ...q, source: q.source || 'snapshot-psx' });
        n++;
      });
    }

    if (data.us?.quotes && typeof Prices !== 'undefined' && Prices.applySnapshotUs) {
      n += Prices.applySnapshotUs(data.us.quotes, rate);
    } else if (data.us?.quotes) {
      Object.entries(data.us.quotes).forEach(([sym, q]) => {
        if (!(q?.priceUsd > 0)) return;
        State.updatePrice(sym, {
          priceUsd: q.priceUsd,
          prevCloseUsd: q.prevCloseUsd,
          price: q.priceUsd * rate,
          prevClose: (q.prevCloseUsd || q.priceUsd) * rate,
          source: q.source || 'snapshot-us',
          ts: q.ts || Date.now(),
        });
        n++;
      });
    }

    if (data.fx?.rate > 0 && typeof FxService !== 'undefined') {
      FxService.setUsdRate?.(data.fx.rate, data.fx.source);
    }

    if (data.commodities?.quotes) {
      window._LC_CMD_SNAPSHOT = data.commodities.quotes;
    }

    _meta = {
      psxAt: data.psx?.updatedAt || null,
      usAt: data.us?.updatedAt || null,
      cmdAt: data.commodities?.updatedAt || null,
      stale: data.stale || {},
      session: data.session || {},
    };
    window._LC_SNAPSHOT_META = _meta;

    if (n > 0 && typeof PriceHealth !== 'undefined') PriceHealth.mount();
    return n;
  }

  async function refresh(bucket) {
    if (!enabled()) return 0;
    try {
      const data = await _fetchSnapshot(bucket || 'all');
      return applyToState(data);
    } catch (_) {
      return 0;
    }
  }

  function init() {
    if (!enabled()) return;
    refresh('all');
    if (_timer) clearInterval(_timer);
    _timer = setInterval(() => refresh('all'), POLL_MS);
  }

  function meta() { return { ..._meta }; }

  function freshnessLabel() {
    const at = _meta.psxAt || _meta.usAt;
    if (!at) return '';
    const d = new Date(at);
    const pkt = d.toLocaleTimeString('en-PK', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit' });
    return `snapshot ${pkt} PKT`;
  }

  return { init, refresh, applyToState, meta, freshnessLabel, enabled };
})();
window.PriceSnapshotService = PriceSnapshotService;
