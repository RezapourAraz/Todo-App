const staticCashe = "version-1";
const assets = [ '/', '/index.html', '/style.css', '/avatar.svg', '/main.js' ];

// Install Service Worker
self.addEventListener("install", event => {
    console.log("Service Worker inistalled");
    event.waitUntil(
        caches.open(staticCashe).then(cache => {
            cache.addAll(assets)
        }
        )
    )
})

// Listen for Reques  ts
self.addEventListener("fetch", event => {
    console.log("Feched Service Worker");
    event.respondWith(
        caches.match(event.request)
        .then(casheRes => {
            return casheRes || fetch(event.request);
        })
    )
})

// Activate Service Worker
self.addEventListener("Activate", event => {
    console.log("Service Worker Activated");
    const cacheWhitelist = [];
    cacheWhitelist.push(staticCashe);

    event.waitUntil(
        caches.keys().then(cacheName => Promise.all(
            cacheName.map(cacheName => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
})