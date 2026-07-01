'use strict';
/** USD/PKR — ExchangeRate-API (free, no key) + optional LedgerCap worker fallback. */
const FxService = (() => {
  let _usdPkr = null;
  let _ts = 0;
  let _source = 'default';
  let _updatedAt = null;

  const FREE_FX_URL = 'https://open.er-api.com/v6/latest/USD';
  const CACHE_MS = 3600000;

  function _appState() {
    return (typeof window !== 'undefined' && window.State) ? window.State : null;
  }

  function getUsdRate() {
    const s = _appState()?.get('settings') || {};
    return s?.usdRate || _usdPkr || 280;
  }

  function getMeta() {
    return { source: _source, updatedAt: _updatedAt, rate: getUsdRate() };
  }

  function usdToPkr(usd) {
    return (usd || 0) * getUsdRate();
  }

  function pkrToUsd(pkr) {
    const r = getUsdRate();
    return r > 0 ? (pkr || 0) / r : 0;
  }

  function _persistRate(rate, source) {
    if (!(rate > 0)) return false;
    _usdPkr = rate;
    _ts = Date.now();
    _source = source;
    _updatedAt = new Date().toISOString();
    if (_appState()) {
      _appState().update(s => {
        s.settings.usdRate = rate;
        s.settings.usdRateSource = source;
        s.settings.usdRateUpdatedAt = _updatedAt;
      });
    }
    return true;
  }

  async function _fetchOpenErApi() {
    const res = await fetch(FREE_FX_URL, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`FX HTTP ${res.status}`);
    const j = await res.json();
    const rate = j?.rates?.PKR;
    if (!(rate > 0)) throw new Error('PKR rate missing');
    _persistRate(rate, 'ExchangeRate-API');
    return rate;
  }

  async function _fetchWorkerProxy() {
    const bases = window.LedgerCapConfig?.psxProxyBases?.() || [window.LEDGERCAP_CONFIG?.psxProxyUrl].filter(Boolean);
    for (const base of bases) {
      try {
        const res = await fetch(`${base.replace(/\/$/, '')}/fx/usdpkr`, { headers: { Accept: 'application/json' } });
        if (!res.ok) continue;
        const j = await res.json();
        if (j?.rate > 0 && _persistRate(j.rate, 'LedgerCap worker')) return j.rate;
      } catch (_) {}
    }
    return null;
  }

  async function refreshUsdPkr() {
    if (Date.now() - _ts < CACHE_MS && _usdPkr) return _usdPkr;
    try {
      return await _fetchOpenErApi();
    } catch (_) {
      const worker = await _fetchWorkerProxy();
      if (worker) return worker;
    }
    return getUsdRate();
  }

  function fmtUsdPkr(usd, opts) {
    opts = opts || {};
    const pkr = usdToPkr(usd);
    const usdStr = '$' + Number(usd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const pkrStr = typeof PsxUI !== 'undefined'
      ? PsxUI.fmt(pkr)
      : '₨' + Math.round(pkr).toLocaleString('en-PK');
    if (opts.pkrOnly) return pkrStr;
    if (opts.usdOnly) return usdStr;
    return `${usdStr} · ${pkrStr}`;
  }

  return { getUsdRate, getMeta, usdToPkr, pkrToUsd, refreshUsdPkr, fmtUsdPkr };
})();
window.FxService = FxService;
