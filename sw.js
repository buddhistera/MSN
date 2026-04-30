const cacheName = 'v1';
const cacheAssets = [
  'index.html',
  'style.css',
  'script.js'
];

// ගොනු ගබඩා කිරීම (Install)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(cacheAssets);
    })
  );
});

// Offline අවස්ථාවේදී ගොනු ලබා දීම (Fetch)
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
