'use strict';
const CACHE = 'ledgercap-v73';
const ASSETS = [
  './css/psx-app.css',
  './', './index.html', './landing.html', './manifest.json', './VERSION.json',
  './assets/icons/icon.svg', './assets/icons/icon-192.png', './assets/icons/icon-512.png',
  './js/data/holdings.js', './js/data/fundamentals.js', './js/data/dividends.js', './js/data/config.js',
  './js/data/i18n-locales.js', './js/core/i18n.js',
  './js/engines/ledger.js', './js/engines/prices.js', './js/engines/insights.js',
  './js/engines/projections.js', './js/engines/analytics.js', './js/engines/ai-analysis.js',
  './js/services/market-data.js', './js/services/stock-service.js',
  './js/services/corporate-actions-service.js', './js/services/dividend-analytics-service.js',
  './js/services/dividend-service.js', './js/services/research-service.js',
  './js/services/portfolio-analytics-service.js', './js/engines/pilot-engine.js',
  './js/ui/charts.js', './js/ui/platform.js', './js/ui/psx-ui.js', './js/ui/market-ui.js',
  './js/lc-desktop-nav.js', './js/ui/navigation.js',
  './js/modules/state.js', './js/modules/investment.js',
  './js/modules/hub.js', './js/modules/market.js', './js/modules/portfolio-screen.js',
  './js/modules/funds.js', './js/modules/screener.js', './js/modules/more.js',
  './js/modules/comparison.js', './js/modules/research.js', './js/modules/watchlist.js',
  './js/modules/dividends.js', './js/modules/intelligence.js', './js/modules/journal.js',
  './js/modules/transactions.js', './js/modules/settings.js', './js/modules/signals.js',
  './js/modules/performance.js', './js/modules/pilot-tools.js',
  './js/capricorn-motion.js', './js/app.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  const networkFirst = e.request.mode === 'navigate'
    || /\.(html|js|css)(\?|$)/i.test(url.pathname);
  if (networkFirst) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
