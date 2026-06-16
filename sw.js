const CACHE_NAME = ' buddhist-era-v17.1.5';

const PRECACHE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './astronomy.browser.min.js',
  './icon-192x192.png',
  './style.css',
  './script.js'
];

// Install
self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_FILES))
  );
});

// Activate
self.addEventListener('activate', event => {

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', event => {

  if (event.request.method !== 'GET') return;

  event.respondWith(

    caches.match(event.request).then(cachedResponse => {

      const networkFetch = fetch(event.request)
        .then(networkResponse => {

          if (
            networkResponse &&
            networkResponse.status === 200 &&
            event.request.url.startsWith(self.location.origin)
          ) {

            const clone = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, clone));
          }

          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || networkFetch;
    })
  );
});
