const cacheName = 'v13';// 👈 අපි Version එක 12 දක්වා වැඩි කළා (Cache එක අලුත් වීමට)

// Offline වැඩ කිරීමට අවශ්‍ය ප්‍රධාන ගොනු ලැයිස්තුව
const cacheAssets = [
  './',
  'index.html',
  'manifest.json',
  'suncalc.js',
  'icon-192×192.png'
];

// Install Event - ඇප් එක මුලින්ම Install වන විට ගොනු Cache කිරීම
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('PWA: Caching Files for Offline Use...');
      return cache.addAll(cacheAssets);
    })
  );
});

// Activate Event - පැරණි Cache ගොනු ඉවත් කර පිරිසිදු කිරීම
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('PWA: Clearing Old Cache...', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - 100% Offline සහ වේගවත් Refresh සඳහා නිවැරදිම තනි කේතය (Cache First Strategy)
self.addEventListener('fetch', (event) => {
  // බාහිර ලොකේෂන් API Request (Nominatim) Cache කිරීම මඟ හැරීම
  if (event.request.url.includes('nominatim.openstreetmap.org')) {
    return; 
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. ගොනුව දැනටමත් Cache එකේ තිබේ නම්, Online/Offline භේදයකින් තොරව එය වහාම ලබා දෙයි
      if (cachedResponse) {
        // පසුබිමෙන් අලුත් දත්ත තිබේදැයි පරීක්ෂා කර Cache එක Update කර තැබීම (Stale-While-Revalidate)
        fetch(event.request).then((networkResponse) => {
          if (event.request.method === 'GET' && networkResponse.status === 200) {
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => { /* Offline විට පසුබිම් Error මඟ හරියි */ });

        return cachedResponse;
      }

      // 2. ගොනුව Cache එකේ නැතිනම් පමණක් අන්තර්ජාලයෙන් ලබා ගනී
      return fetch(event.request).then((networkResponse) => {
        // ලැබෙන අලුත් ගොනු (උදා: පින්තූර/වෙනත් පිටු) ස්වයංක්‍රීයව Cache එකට එකතු කරයි
        if (event.request.method === 'GET' && networkResponse.status === 200) {
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      }).catch(() => {
        // සම්පූර්ණයෙන්ම Offline වී, සොයන ගොනුවත් නැතිනම් index.html වෙත යොමු කරයි
        if (event.request.mode === 'navigate') {
          return caches.match('index.html');
        }
      });
    })
  );
});
