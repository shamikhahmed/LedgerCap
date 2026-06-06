'use strict';
const CACHE_NAME = 'stundsOS-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/data/holdings.js',
  '/js/modules/state.js',
  '/js/modules/overview.js',
  '/js/modules/stocks.js',
  '/js/modules/funds.js',
  '/js/modules/advisor.js',
  '/js/modules/you.js',
  '/js/ui/charts.js',
  '/js/ui/navigation.js',
  '/js/app.js',
  '/manifest.json',
  '/assets/icons/icon.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Network-first for external (Yahoo Finance), cache-first for local
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => cached || caches.match('/index.html'));
      return cached || network;
    })
  );
});
