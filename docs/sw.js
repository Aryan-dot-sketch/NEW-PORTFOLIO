/**
 * Minimal service worker for offline fallback.
 * Registers and caches the app shell for offline access.
 */
const CACHE_NAME = "aryan-portfolio-v1";
const APP_SHELL = ["/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_NAME)
            .map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Network-first, fall back to cache
  event.respondWith(
    fetch(event.request)
      .then((res) => res)
      .catch(() => caches.match(event.request).then((r) => r || caches.match("/")))
  );
});
