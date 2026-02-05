const CACHE_NAME = "sebha-cache-v6";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  "./recurring-appointment.png",
  "./Alexandria-Regular.woff2",
  "./Alexandria-Regular.woff",
  "./Montserrat-Medium.woff2",
  "./Montserrat-Medium.woff",
  "./Amiri-Regular.woff2",
  "./back.jfif",
  "./8.png"

  // لو عندك أي ملفات محلية ضيفها هنا
];

// عند التثبيت
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// عند التفعيل
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// عند أي طلب
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});













