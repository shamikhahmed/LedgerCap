'use strict';
/** PSX catalog — hydrated from worker snapshot meta:psx_catalog */
window.PSX_STOCKS_CATALOG = window.PSX_STOCKS_CATALOG || [];

window.PsxStocksCatalog = (() => {
  const LS_KEY = 'lc_psx_catalog_v1';

  function _seedFromHoldings() {
    const seen = new Set();
    const rows = [];
    [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].forEach((s) => {
      if (seen.has(s.symbol)) return;
      seen.add(s.symbol);
      rows.push({
        symbol: s.symbol,
        name: s.name || s.symbol,
        sector: s.sector || 'Other',
        isShariah: !!s.isShariah,
      });
    });
    return rows;
  }

  function hydrate(catalog) {
    if (!Array.isArray(catalog) || !catalog.length) return;
    window.PSX_STOCKS_CATALOG = catalog;
    try { localStorage.setItem(LS_KEY, JSON.stringify({ catalog, ts: Date.now() })); } catch (_) {}
  }

  function loadLocal() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return _seedFromHoldings();
      const j = JSON.parse(raw);
      if (j?.catalog?.length) return j.catalog;
    } catch (_) {}
    return _seedFromHoldings();
  }

  function rows() {
    const cat = window.PSX_STOCKS_CATALOG?.length ? window.PSX_STOCKS_CATALOG : loadLocal();
    if (!window.PSX_STOCKS_CATALOG?.length) window.PSX_STOCKS_CATALOG = cat;
    return cat;
  }

  return { hydrate, loadLocal, rows };
})();
