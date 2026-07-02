'use strict';
/** Fallback / stale price audit + topbar banner */
const PriceHealth = (() => {
  const SEED_SOURCES = new Set(['fallback', 'seed', 'meezan_seed', 'none']);

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
    const showBanner = pctSeeded >= 0.4 || (stale > 0 && stale >= total * 0.3);

    return { total, seeded, stale, live, pctSeeded, showBanner };
  }

  function bannerHtml(rep) {
    if (!rep?.showBanner) return '';
    const updated = window.FALLBACK_PRICES_UPDATED || 'unknown date';
    const pct = Math.round((rep.pctSeeded || 0) * 100);
    const msg = rep.pctSeeded >= 0.4
      ? `${pct}% of holdings on seed/fallback prices (snapshot ${updated}). Tap refresh or open during PSX session.`
      : `${rep.stale} holding(s) have prices older than 24h. Tap refresh for latest close.`;
    return `<div class="lc-price-health" role="status">
      <span>${msg}</span>
      <button type="button" class="lc-price-health-btn" onclick="App.refreshPrices()">Refresh</button>
      <button type="button" class="lc-price-health-dismiss" onclick="PriceHealth.dismiss()" aria-label="Dismiss">${typeof LcIcons !== 'undefined' ? LcIcons.icon('x', 14) : '×'}</button>
    </div>`;
  }

  function mount() {
    if (localStorage.getItem('ledgercap_price_health_dismiss')) return;
    const host = document.getElementById('lc-price-health-host');
    if (!host) return;
    const rep = audit();
    host.innerHTML = bannerHtml(rep);
    host.classList.toggle('hidden', !rep.showBanner);
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
