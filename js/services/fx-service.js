'use strict';
const FxService = (() => {
  let _usdPkr = null;
  let _ts = 0;

  function getUsdRate() {
    const s = typeof State !== 'undefined' ? State.get('settings') : {};
    return s?.usdRate || 280;
  }

  function usdToPkr(usd) {
    return (usd || 0) * getUsdRate();
  }

  function pkrToUsd(pkr) {
    const r = getUsdRate();
    return r > 0 ? (pkr || 0) / r : 0;
  }

  async function refreshUsdPkr() {
    if (Date.now() - _ts < 3600000 && _usdPkr) return _usdPkr;
    const bases = window.LedgerCapConfig?.psxProxyBases?.() || [window.LEDGERCAP_CONFIG?.psxProxyUrl].filter(Boolean);
    for (const base of bases) {
      try {
        const res = await fetch(`${base.replace(/\/$/, '')}/fx/usdpkr`, { headers: { Accept: 'application/json' } });
        if (!res.ok) continue;
        const j = await res.json();
        if (j?.rate > 0) {
          _usdPkr = j.rate;
          _ts = Date.now();
          if (typeof State !== 'undefined') {
            State.update(s => { s.settings.usdRate = j.rate; });
          }
          return _usdPkr;
        }
      } catch (_) {}
    }
    return getUsdRate();
  }

  return { getUsdRate, usdToPkr, pkrToUsd, refreshUsdPkr };
})();
window.FxService = FxService;
