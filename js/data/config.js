'use strict';
/** Bump app + sw + cache together (also sync VERSION.json). */
window.LEDGERCAP_VERSION = {
  app: '3.51.1',
  sw: 123,
  cache: 'ledgercap-v123',
};

/** LedgerCap runtime config — optional PSX proxy (deploy worker/ then paste URL in Settings) */
window.LEDGERCAP_CONFIG = {
  /** Primary LedgerCap worker (preferred) */
  psxProxyUrl: 'https://ledgercap-psx-proxy.shamikhahmed.workers.dev',
  /** Legacy worker hostname — kept as silent fallback until all users migrate */
  legacyPsxProxyUrl: 'https://stunds-psx-proxy.shamikhahmed.workers.dev',
};

/** Normalize saved proxy URLs and prefer the LedgerCap worker hostname. */
function resolvePsxProxyUrl(url) {
  const primary = window.LEDGERCAP_CONFIG?.psxProxyUrl || '';
  const legacy = window.LEDGERCAP_CONFIG?.legacyPsxProxyUrl || '';
  let raw = (url || primary || legacy).trim();
  if (/stunds-psx-proxy/i.test(raw)) {
    raw = primary || raw.replace(/stunds-psx-proxy/gi, 'ledgercap-psx-proxy');
  }
  return raw.replace(/\/$/, '');
}

/** Proxy bases to try in order (primary, then legacy). */
function psxProxyBases() {
  const bases = [
    window.LEDGERCAP_CONFIG?.psxProxyUrl,
    window.LEDGERCAP_CONFIG?.legacyPsxProxyUrl,
  ].filter(Boolean).map(u => resolvePsxProxyUrl(u));
  return [...new Set(bases)];
}

window.LedgerCapConfig = { resolvePsxProxyUrl, psxProxyBases };

/**
 * Escape a string for safe interpolation into innerHTML.
 * Use on every API-derived or user-imported string (news titles,
 * announcement text, CSV symbols/brokers, AI summaries).
 */
window.esc = function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/** Allow only http(s) URLs for interpolated hrefs; everything else → '#'. */
window.escUrl = function escUrl(u) {
  const s = String(u ?? '').trim();
  return /^https?:\/\//i.test(s) ? window.esc(s) : '#';
};
