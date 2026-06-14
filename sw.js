const CACHE_NAME = 'buddhist-era-v17.3';

const CACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './suncalc.js',
  './astronomy.browser.min.js',
  './icon-192x192.png',
    
];

// INSTALL
self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CACHE_ASSETS))
  );
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// FETCH
self.addEventListener('fetch', (event) => {

  // Google Analytics requests ignore
  if (
    event.request.url.includes('googletagmanager.com') ||
    event.request.url.includes('google-analytics.com')
  ) {
    return;
  }

  event.respondWith(

    caches.match(event.request)
      .then((cachedResponse) => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((networkResponse) => {

            if (
              event.request.method === 'GET' &&
              networkResponse.status === 200
            ) {

              const responseClone = networkResponse.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }

            return networkResponse;

          })
          .catch(() => {

            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }

          });

      })

  );

});
