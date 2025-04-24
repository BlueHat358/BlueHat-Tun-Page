const CACHE_NAME = "offline-cache-v1";
const urlsToCache = [
  "/", // Halaman utama
  "/index.html", // File HTML utama
  "/style.css", // File Tailwind CSS lokal
  "https://cdn.jsdelivr.net/npm/sweetalert2@11", // SweetAlert2 library
  "https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css", // Flag icons CSS
];

// Install: Simpan aset statis di cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: Bersihkan cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Hapus cache lama
          }
        })
      );
    })
  );
});

// Fetch: Gunakan strategi Network First
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Cache halaman utama dan aset statis
  if (
    url.pathname === "/" ||
    url.pathname === "/index.html" ||
    url.pathname === "/style.css"
  ) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Simpan respons jaringan ke cache untuk digunakan saat offline
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // Jika gagal, gunakan cache sebagai fallback
          return caches.match(event.request);
        })
    );
  } else {
    // Untuk API request atau data dinamis, gunakan IndexedDB
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Simpan respons jaringan ke cache untuk digunakan saat offline
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // Jika gagal, gunakan cache sebagai fallback
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Jika tidak ada cache, tampilkan pesan error
            return new Response("Aset tidak tersedia saat offline.", {
              status: 503,
              statusText: "Service Unavailable",
              headers: { "Content-Type": "text/plain" },
            });
          });
        })
    );
  }
});
