/* Simple service worker for basic offline support */
const CACHE_NAME = "meisemdor-static-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  // @ts-ignore
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // only handle GET requests
  if (req.method !== "GET") return;
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        // optionally cache new requests (basic runtime caching)
        if (req.url.startsWith(self.location.origin)) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => {
        // fallback to index.html for SPA navigation when offline
        if (req.headers.get("accept")?.includes("text/html")) {
          return caches.match("/index.html");
        }
        return new Response("Offline", { status: 503 });
      });
    })
  );
});

