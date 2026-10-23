/* MY WARDROBE V2 - cache-first offline PWA. Update RELEASE when publishing new index.html. */
const RELEASE = 'v2-offline-2026-10-23-01';
const CACHE_NAME = 'my-wardrobe-' + RELEASE;
const APP_ASSETS = [
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];
const ENTRY = new URL('./index.html', self.registration.scope).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((names) => Promise.all(names
        .filter((name) => name.startsWith('my-wardrobe-') && name !== CACHE_NAME)
        .map((name) => caches.delete(name)))),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  // Home screen opens repository root (./), but the cached HTML entry is /index.html.
  // Always prefer the saved 2.8 MB HTML with all 80 embedded looks over the network.
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then((cache) => cache.match(ENTRY))
        .then((cached) => cached || fetch(req))
        .catch(() => new Response('穿搭工具尚未完成離線準備。請先連線開啟一次。', {
          status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        }))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => cache.match(req, {ignoreSearch:true}))
      .then((cached) => cached || fetch(req))
  );
});
