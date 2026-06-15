'use strict';
const CACHE = 'ledgercap-v42';
const ASSETS = [
  './css/capricorn-core.css', './css/ledger-os.css', './css/platform.css', './css/app.css',
  './', './index.html', './landing.html', './presentation.html', './pitch.html', './manifest.json',
  './assets/icons/icon.svg', './assets/icons/icon-192.png', './assets/icons/icon-512.png',
  './js/data/holdings.js', './js/data/fundamentals.js', './js/data/dividends.js', './js/data/config.js',
  './js/engines/ledger.js', './js/engines/prices.js', './js/engines/insights.js',
  './js/engines/projections.js', './js/engines/analytics.js', './js/engines/ai-analysis.js',
  './js/services/market-data.js', './js/services/stock-service.js',
  './js/services/corporate-actions-service.js', './js/services/dividend-analytics-service.js',
  './js/services/dividend-service.js',
  './js/services/research-service.js', './js/services/portfolio-analytics-service.js',
  './js/modules/state.js', './js/modules/onboarding.js', './js/modules/investment.js',
  './js/modules/dashboard.js', './js/modules/portfolio.js', './js/modules/holdings.js',
  './js/modules/research.js', './js/modules/watchlist.js', './js/modules/dividends.js',
  './js/modules/intelligence.js', './js/modules/journal.js',
  './js/modules/transactions.js', './js/modules/settings.js',
  './js/ui/charts.js', './js/ui/motion.js', './js/ui/platform.js', './js/ui/navigation.js', './js/app.js'
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
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetched = fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});
