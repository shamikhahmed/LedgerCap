'use strict';
/** LedgerCap runtime config — optional PSX proxy (deploy worker/ then paste URL in Settings) */
window.LEDGERCAP_CONFIG = {
  psxProxyUrl: 'https://ledgercap-psx-proxy.shamikhahmed.workers.dev',
};

/** Rewrite legacy proxy hostnames saved before the LedgerCap rebrand. */
function resolvePsxProxyUrl(url) {
  const fallback = window.LEDGERCAP_CONFIG?.psxProxyUrl || '';
  let raw = (url || fallback).trim();
  if (!raw || /stunds-psx-proxy/i.test(raw)) {
    raw = raw.replace(/stunds-psx-proxy/gi, 'ledgercap-psx-proxy') || fallback;
  }
  return raw.replace(/stunds-psx-proxy/gi, 'ledgercap-psx-proxy');
}

window.LedgerCapConfig = { resolvePsxProxyUrl };
