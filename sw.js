'use strict';
const CACHE = 'stundsOS-v1';
const URLS = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/data/holdings.js',
  '/js/modules/state.js',
  '/js/modules/overview.js',
  '/js/modules/stocks.js',
  '/js/modules/funds.js',
  '/js/modules/watchlist.js',
  '/js/modules/you.js',
  '/js/ui/charts.js',
  '/js/ui/navigation.js',
  '/js/app.js',
  '/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('finance.yahoo.com')) return; // skip cache for price fetches
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
