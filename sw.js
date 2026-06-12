'use strict';
const CACHE = 'ledgercap-v34';
const ASSETS = [
  './css/capricorn-core.css',
  './', './index.html', './landing.html', './presentation.html', './pitch.html', './manifest.json', './css/app.css',
  './assets/icons/icon.svg', './assets/icons/icon-192.png', './assets/icons/icon-512.png',
  './js/data/holdings.js', './js/data/config.js', './js/engines/ledger.js', './js/engines/prices.js',
  './js/engines/insights.js', './js/engines/projections.js',
  './js/modules/state.js', './js/modules/onboarding.js', './js/modules/reports.js', './js/modules/investment.js', './js/modules/dashboard.js', './js/modules/portfolio.js',
  './js/modules/transactions.js', './js/modules/income.js', './js/modules/settings.js',
  './js/ui/charts.js', './js/ui/navigation.js', './js/app.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(r =>
      r || fetch(e.request).catch(() => caches.match('./index.html'))
    )
  );
});
