const cacheName = "portfolio-v1";
const assetsToCache = [
  "home.html",
  "about.html",
  "contact.html",
  "services.html",
  "blog-light.html",
  "blog-detail.html",
  "portfolio-light.html",
  "manifest.json",
  "assets/css/main.css", // Add your CSS or other assets
  "assets/logo-dark.png"", // Replace with your actual icons
  "assets/logo-dark.png""
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
