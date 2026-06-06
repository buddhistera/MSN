const cacheName = 'v11'; // අනිවාර්යයෙන්ම කලින් තිබූ අංකයට වඩා වැඩි අංකයක් ලබා දෙන්න

const cacheAssets = [
  'index.html',
  'manifest.json',
  'suncalc.js',
  'icon-192×192.png',
  './'
];

// Install Event - ගොනු Cache කිරීම
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Caching Files...');
      return cache.addAll(cacheAssets);
    })
  );
});

// Activate Event - පරණ Cache ඉවත් කිරීම
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Offline Refresh ගැටලුව සඳහා නිවැරදිම විසඳුම
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Cache එකේ තිබේ නම් එය වහාම ලබා දෙයි (Refresh ගැටලුව මෙයින් විසඳේ)
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. නැතිනම් පමණක් අන්තර්ජාලයෙන් ලබා ගැනීමට උත්සාහ කරයි
      return fetch(event.request).then((networkResponse) => {
        // ලැබෙන අලුත් දත්ත නැවත Cache එකට දමයි
        if (event.request.method === 'GET') {
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      }).catch(() => {
        // අන්තර්ජාලයත් නැතිනම්, Navigation Request එකක් නම් index.html ලබා දෙයි
        if (event.request.mode === 'navigate') {
          return caches.match('index.html');
        }
      });
    })
  );
});
// Fetch Event - අලුත්ම කේතය ලබා ගැනීමට (Network First Strategy)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // අන්තර්ජාලය තිබේ නම් අලුත් පිටුව පෙන්වයි, එය Cache එකේ Update කරයි
        const resClone = response.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => {
        // අන්තර්ජාලය නැතිනම් පමණක් කලින් Save වූ පිටුව ලබා දෙයි
        return caches.match(event.request);
      })
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // අන්තර්ජාලය තිබේ නම්, ලැබෙන අලුත් පිටුව Cache එකටත් දමයි (Update කරයි)
        const resClone = response.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => {
        // අන්තර්ජාලය නැතිනම් පමණක් Cache එක පරීක්ෂා කරයි
        return caches.match(event.request).then((res) => res);
      })
  );
});
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
