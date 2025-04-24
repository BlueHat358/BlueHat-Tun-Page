// service-worker.js

const CACHE_NAME = "offline-cache-v1";
const urlsToCache = [
  "/", // Halaman utama
  "/index.html", // File HTML utama
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css", // Tailwind CSS via CDN
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

// Fetch: Gunakan cache jika tersedia, jika tidak, ambil dari jaringan
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Cache halaman utama dan aset statis
  if (url.pathname === "/" || url.pathname === "/index.html") {
    event.respondWith(
      caches.match("/").then((response) => response || fetch(event.request))
    );
  } else {
    // Untuk API request atau data dinamis, gunakan IndexedDB
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
