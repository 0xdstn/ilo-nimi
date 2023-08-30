const cacheName = 'ilo-nimi-v5a';
const appFiles = [
    '/ilo-nimi/',
    '/ilo-nimi/index.html',
    '/ilo-nimi/main.js',
    '/ilo-nimi/style.css',
    '/ilo-nimi/icon32.png',
    '/ilo-nimi/icon144.png',
    '/ilo-nimi/icon192.png',
    '/ilo-nimi/icon512.png',
    '/ilo-nimi/sitelen-pona-pona.otf'
];

self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(appFiles);
    })());
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) { return r; }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key === cacheName) { return; }
            return caches.delete(key);
        }))
    }));
});
