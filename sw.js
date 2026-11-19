/* Waidr Service Worker: App-Hülle (Seite, Icons, Symbolschrift) aus dem Speicher, Daten bleiben beim Server.
   Bei jeder neuen Version von index.html die Zahl in VERSION erhöhen, dann werden alte Speicher gelöscht. */
const VERSION = 'waidr-v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
const CDN = ['cdn.jsdelivr.net'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && CDN.indexOf(url.hostname) < 0) return; // API-Aufrufe (Google, Wetter) nie abfangen
  if (req.mode === 'navigate' || (sameOrigin && /\.(html|webmanifest)$/.test(url.pathname))) {
    // Seite: erst Netz (damit Updates sofort ankommen), ohne Netz aus dem Speicher
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); return r; })
      .catch(() => caches.match(req).then(m => m || caches.match('index.html'))));
    return;
  }
  // Icons, Schrift: aus dem Speicher, im Hintergrund erneuern
  e.respondWith(caches.match(req).then(m => {
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); } return r; }).catch(() => m);
    return m || net;
  }));
});
