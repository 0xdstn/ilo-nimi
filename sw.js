const cacheName = 'ilo-nimi-v1';
const appFiles = [
    '/~dustin/ilo-nimi/',
    '/~dustin/ilo-nimi/index.html',
    '/~dustin/ilo-nimi/main.js',
    '/~dustin/ilo-nimi/style.css',
    '/~dustin/ilo-nimi/icon32.png',
    '/~dustin/ilo-nimi/icon144.png',
    '/~dustin/ilo-nimi/icon192.png',
    '/~dustin/ilo-nimi/icon512.png',
    '/~dustin/ilo-nimi/linja-pona-4.9.otf'
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
