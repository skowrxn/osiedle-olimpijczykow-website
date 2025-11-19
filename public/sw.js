// Service Worker dla cache'owania obrazków
const CACHE_NAME = "osiedle-olimpijczykow-images-v1";
const IMAGE_CACHE_NAME = "osiedle-images-cache-v1";

// Obrazki z Strapi do cache
const STRAPI_IMAGE_PATTERN =
    /https:\/\/admin-panel-olimpijczykow-dlpb9\.ondigitalocean\.app\/uploads\/.*/;
const LOCAL_IMAGE_PATTERN = /\/_next\/image\?url=.*/;
const STATIC_IMAGE_PATTERN = /\/img\/.*/;

self.addEventListener("install", (event) => {
    console.log("[SW] Installing service worker...");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("[SW] Activating service worker...");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Usuń stare cache jeśli wersja się zmieniła
                    if (
                        cacheName !== CACHE_NAME &&
                        cacheName !== IMAGE_CACHE_NAME
                    ) {
                        console.log("[SW] Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Cache tylko obrazki
    if (
        STRAPI_IMAGE_PATTERN.test(request.url) ||
        LOCAL_IMAGE_PATTERN.test(request.url) ||
        STATIC_IMAGE_PATTERN.test(url.pathname)
    ) {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                if (cachedResponse) {
                    console.log("[SW] Image from cache:", request.url);
                    return cachedResponse;
                }

                // Nie ma w cache - pobierz i zapisz
                return fetch(request)
                    .then((response) => {
                        // Sprawdź czy odpowiedź jest OK
                        if (
                            !response ||
                            response.status !== 200 ||
                            response.type === "error"
                        ) {
                            return response;
                        }

                        // Sklonuj odpowiedź (można użyć tylko raz)
                        const responseToCache = response.clone();

                        caches.open(IMAGE_CACHE_NAME).then((cache) => {
                            console.log("[SW] Caching image:", request.url);
                            cache.put(request, responseToCache);
                        });

                        return response;
                    })
                    .catch((error) => {
                        console.error("[SW] Fetch failed:", error);
                        throw error;
                    });
            })
        );
    }
    // Inne requesty - normalna obsługa
});
