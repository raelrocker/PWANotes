let cacheName = 'notes-son.v.1.0.0';
let filesToCache = [
    '',
    'index.html',
    'css/colors.css',
    'css/styles.css',
    'js/array.observe.polyfill.js',
    'js/object.observe.polyfill.js',
    'js/scripts.js'
];

self.addEventListener('install', async event => {
    console.log('[ServiceWorker] caching');
    const cache = await caches.open(cacheName);
    cache.addAll(filesToCache)
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] removing old cache');
                    return caches.delete(key);
                }
            }))
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});