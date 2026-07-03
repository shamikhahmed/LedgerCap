'use strict';
/** Meezan / AMC fund NAV — manual overrides in settings (no public API). */
const FundNavService = (() => {
  function overrides() {
    const s = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    return s.fundNavOverrides || {};
  }

  function navFor(symbol) {
    const sym = String(symbol || '').toUpperCase();
    const o = overrides()[sym];
    if (o?.nav > 0) return { nav: o.nav, source: 'manual_nav', asOf: o.asOf || null };
    const seed = (window.MEEZAN_FUNDS || []).find((f) => f.symbol === sym);
    const fromState = typeof State !== 'undefined' ? State.getPrice(sym) : 0;
    if (fromState > 0) return { nav: fromState, source: State.getPriceSource?.(sym) || 'seed', asOf: null };
    if (seed?.currentNav > 0) return { nav: seed.currentNav, source: 'meezan_seed', asOf: seed.navAsOf || null };
    return { nav: 0, source: 'none', asOf: null };
  }

  function applyAll() {
    if (typeof State === 'undefined') return 0;
    let n = 0;
    Object.entries(overrides()).forEach(([sym, row]) => {
      if (!(row?.nav > 0)) return;
      State.updatePrice(sym, {
        price: row.nav,
        prevClose: row.nav,
        source: 'manual_nav',
        ts: row.updatedAt ? Date.parse(row.updatedAt) || Date.now() : Date.now(),
      });
      n++;
    });
    return n;
  }

  function saveNav(symbol, nav, asOf) {
    const sym = String(symbol || '').toUpperCase();
    const val = parseFloat(nav);
    if (!(val > 0)) return false;
    State.update((s) => {
      s.settings = s.settings || {};
      s.settings.fundNavOverrides = s.settings.fundNavOverrides || {};
      s.settings.fundNavOverrides[sym] = {
        nav: val,
        asOf: asOf || new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString(),
      };
    });
    State.updatePrice(sym, { price: val, prevClose: val, source: 'manual_nav', ts: Date.now() });
    return true;
  }

  function label(symbol) {
    const { source, asOf } = navFor(symbol);
    if (source === 'manual_nav') return asOf ? `Manual NAV · ${asOf}` : 'Manual NAV';
    if (source === 'meezan_seed') return 'Statement seed';
    return '';
  }

  return { overrides, navFor, applyAll, saveNav, label };
})();
window.FundNavService = FundNavService;
