'use strict';
/** Calm last-close banner — market screens only, while live quotes are unavailable. */
const PriceHealth = (() => {
  const SEED_SOURCES = new Set(['fallback', 'seed', 'meezan_seed', 'none']);
  const MARKET_SCREENS = new Set([
    'home', 'market', 'research', 'screener', 'watchlist', 'signals', 'performance', 'comparison',
  ]);

  function _heldSymbols() {
    if (typeof State === 'undefined' || typeof Ledger === 'undefined') return [];
    const txs = State.get('transactions') || [];
    const stocks = Ledger.calcHoldings(txs).map((h) => h.symbol);
    const funds = Ledger.calcFundHoldings(txs).map((f) => f.symbol);
    return [...new Set([...stocks, ...funds])];
  }

  function audit() {
    const prices = State.get('prices') || {};
    const symbols = _heldSymbols();
    if (!symbols.length) return { total: 0, seeded: 0, stale: 0, live: 0, pctSeeded: 0, showBanner: false };

    let seeded = 0;
    let stale = 0;
    let live = 0;
    const now = Date.now();

    symbols.forEach((sym) => {
      const p = prices[sym];
      const src = p?.source || 'none';
      if (SEED_SOURCES.has(src) || !(p?.price > 0)) {
        seeded++;
        return;
      }
      if (p.ts && now - p.ts > 24 * 3600000) stale++;
      else live++;
    });

    const total = symbols.length;
    const pctSeeded = total ? seeded / total : 0;
    // Live prices unavailable when most holdings are seed/fallback or long-stale.
    const showBanner = pctSeeded >= 0.4 || (stale > 0 && stale >= total * 0.3)
      || !!(window._LC_SNAPSHOT_META?.stale?.psx);

    return { total, seeded, stale, live, pctSeeded, showBanner };
  }

  function _asOfDate() {
    const snapAt = window._LC_SNAPSHOT_META?.psxAt
      || (typeof PriceSnapshotService !== 'undefined' ? PriceSnapshotService.meta()?.psxAt : null);
    if (snapAt) {
      const d = new Date(snapAt);
      if (!Number.isNaN(d.getTime())) {
        return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
      }
    }
    const raw = window.FALLBACK_PRICES_UPDATED;
    if (raw && /^\d{4}-\d{2}-\d{2}/.test(raw)) {
      const d = new Date(`${raw.slice(0, 10)}T12:00:00`);
      if (!Number.isNaN(d.getTime())) {
        return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
      }
    }
    return raw || 'the last session';
  }

  function _onMarketScreen() {
    const tab = typeof Navigation !== 'undefined' && Navigation.current
      ? Navigation.current()
      : 'home';
    return MARKET_SCREENS.has(tab);
  }

  function bannerHtml(rep) {
    if (!_onMarketScreen()) return '';
    if (!rep?.showBanner && !window._LC_SNAPSHOT_META?.stale?.psx) return '';
    const date = _asOfDate();
    const msg = `Prices are from the last close on ${date}. Live prices aren't available right now.`;
    return `<div class="lc-price-health" role="status">
      <span class="lc-price-health-msg">${msg}</span>
      <button type="button" class="lc-price-health-dismiss" data-action="PriceHealth.dismiss" aria-label="Dismiss">${typeof LcIcons !== 'undefined' ? LcIcons.icon('x', 14) : '×'}</button>
    </div>`;
  }

  function mount() {
    if (localStorage.getItem('ledgercap_price_health_dismiss')) {
      const host = document.getElementById('lc-price-health-host');
      if (host) { host.innerHTML = ''; host.classList.add('hidden'); }
      return;
    }
    const host = document.getElementById('lc-price-health-host');
    if (!host) return;
    const rep = audit();
    const html = bannerHtml(rep);
    host.innerHTML = html;
    host.classList.toggle('hidden', !html);
  }

  function dismiss() {
    try { localStorage.setItem('ledgercap_price_health_dismiss', String(Date.now())); } catch (_) {}
    const host = document.getElementById('lc-price-health-host');
    if (host) { host.innerHTML = ''; host.classList.add('hidden'); }
  }

  function clearDismiss() {
    localStorage.removeItem('ledgercap_price_health_dismiss');
  }

  return { audit, mount, dismiss, clearDismiss, bannerHtml };
})();
window.PriceHealth = PriceHealth;
