/* Okane 日本語 — service worker (offline + instalável como PWA).
   Estratégia: conteúdo do próprio site (index.html, words.json) = network-first
   (sempre atualizado quando online, cai pro cache offline). Bibliotecas de CDN
   (versões fixas) = cache-first. */
const CACHE = "okane-cache-v1";

const CORE = [
  "./",
  "./index.html",
  "./words.json",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
];

const CDN = [
  "https://cdn.tailwindcss.com",
  "https://unpkg.com/react@18.3.1/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone@7/babel.min.js",
  "https://unpkg.com/lucide@1.21.0/dist/umd/lucide.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);                                   // local: precisa ter sucesso
    await Promise.allSettled(CDN.map((u) => cache.add(u)));     // CDN: melhor-esforço
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  if (sameOrigin) {
    // network-first
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        const cached = await cache.match(req, { ignoreSearch: true });
        if (cached) return cached;
        if (req.mode === "navigate") {
          const shell = await cache.match("./index.html");
          if (shell) return shell;
        }
        throw e;
      }
    })());
  } else {
    // cache-first (CDN)
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      if (cached) return cached;
      const res = await fetch(req);
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
      return res;
    })());
  }
});
