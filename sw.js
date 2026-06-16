const CACHE_NAME = "buddhist-era-v17.3.2";

// Offline සඳහා අත්‍යවශ්‍ය ගොනු පමණක්
const PRECACHE_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./suncalc.js",
  "./icon-192x192.png",  
];

// Install
self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_FILES))
  );
});

// Activate
self.addEventListener("activate", event => {

  event.waitUntil(
    (async () => {

      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );

      await self.clients.claim();

    })()
  );
});

// Stale While Revalidate
self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // External requests cache නොකරන්න
  if (url.origin !== location.origin) return;

  event.respondWith(

    (async () => {

      const cache = await caches.open(CACHE_NAME);

      const cachedResponse =
        await cache.match(event.request);

      const networkFetch =
        fetch(event.request)
          .then(response => {

            if (
              response &&
              response.status === 200
            ) {

              cache.put(
                event.request,
                response.clone()
              );
            }

            return response;

          })
          .catch(() => cachedResponse);

      return cachedResponse || networkFetch;

    })()

  );

});
