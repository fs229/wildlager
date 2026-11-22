/* Waidr Service Worker: App startet auch ohne Netz, Icons und Scanner-Bibliothek werden lokal vorgehalten */
const V = 'waidr-v3';
const SHELL = ['./', 'manifest.webmanifest', 'apple-touch-icon.png'];
const CDN = [
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.52.0/dist/tabler-icons.min.css',
  'https://cdn.jsdelivr.net/npm/barcode-detector@3.2.4/dist/iife/ponyfill.js'
];
const okish = r => r && (r.ok || r.type === 'opaque');

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil((async () => {
    const c = await caches.open(V);
    await Promise.all(SHELL.map(u => c.add(u).catch(() => {})));
    for (const u of CDN) {
      try {
        const r = await fetch(u); if (!r.ok) continue;
        await c.put(u, r.clone());
        if (/\.css$/.test(u)) {   // Schriftdatei der Icons mit vorhalten
          const t = await r.text();
          const fonts = [...new Set([...t.matchAll(/url\(([^)]+)\)/g)].map(m => m[1].replace(/['"]/g, '')).filter(x => /\.woff2(\?|$)/.test(x)).map(x => new URL(x, u).href))];
          await Promise.all(fonts.map(f => fetch(f).then(rr => { if (rr.ok) return c.put(f, rr); }).catch(() => {})));
        }
      } catch (_) {}
    }
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== V) await caches.delete(k);
    await self.clients.claim();
  })());
});

// Seite: Netz zuerst (max. 4 s), sonst gespeicherte Version
async function nav(q) {
  const c = await caches.open(V);
  const p = fetch(q).then(r => { if (r.ok) c.put('./', r.clone()); return r; });
  p.catch(() => {});
  try { return await Promise.race([p, new Promise((_, j) => setTimeout(j, 4000))]); }
  catch (_) { const m = await c.match('./'); return m || p; }
}
// Eigene Dateien: gespeicherte Version sofort, im Hintergrund auffrischen
async function swr(q) {
  const c = await caches.open(V), m = await c.match(q);
  const p = fetch(q).then(r => { if (r.ok) c.put(q, r.clone()); return r; }).catch(() => null);
  return m || (await p) || Response.error();
}
// CDN-Dateien (Icons, Scanner, deren Nachladedateien): einmal geladen, immer lokal
async function cdn(q) {
  const c = await caches.open(V), m = await c.match(q);
  if (m) return m;
  const r = await fetch(q);
  if (okish(r)) c.put(q, r.clone());
  return r;
}

self.addEventListener('fetch', e => {
  const q = e.request;
  if (q.method !== 'GET') return;
  const u = new URL(q.url);
  if (q.mode === 'navigate') e.respondWith(nav(q));
  else if (u.origin === location.origin) e.respondWith(swr(q));
  else if (u.hostname === 'cdn.jsdelivr.net') e.respondWith(cdn(q));
});
