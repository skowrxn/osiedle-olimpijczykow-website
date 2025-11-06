// Konfiguracja API Strapi
export const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Mapowanie nowych polskich nazw pól
export const FIELD_MAPPING = {
    // Angielskie -> Polskie (dla zapytań do API)
    rooms: "liczba_pokoi",
    area: "powierzchnia",
    floor: "kondygnacja",
    price: "cena",
    images: "zdjecia",
    description: "opis",
    available: "dostepnosc",
    number: "numer",
    additionalElements: "elementy_dodatkowe",
};

// ===== CACHE/PRELOAD MECHANISM =====
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 godziny cache (bardzo długo)
const cache = new Map();

// Funkcja do generowania klucza cache
const getCacheKey = (url) => url;

// Funkcja sprawdzająca czy cache jest ważny
const isCacheValid = (timestamp) => {
    return Date.now() - timestamp < CACHE_DURATION;
};

// Funkcja do cache'owania danych
export const getCachedData = (url) => {
    const cached = cache.get(getCacheKey(url));
    if (cached && isCacheValid(cached.timestamp)) {
        console.log("[Cache] Hit:", url);
        return cached.data;
    }
    console.log("[Cache] Miss:", url);
    return null;
};

// Funkcja do zapisywania w cache
export const setCachedData = (url, data) => {
    cache.set(getCacheKey(url), {
        data,
        timestamp: Date.now(),
    });
    console.log("[Cache] Saved:", url);
};

// Funkcja do preload'owania najczęściej używanych zapytań
export const preloadApartments = async () => {
    try {
        // Preload wszystkich mieszkań z etapu 2
        const etap2Url = buildApiUrl("apartments", {
            populate: "*",
            "filters[etap][$eq]": "etap2",
        });

        // Preload wszystkich mieszkań z etapu 3
        const etap3Url = buildApiUrl("apartments", {
            populate: "*",
            "filters[etap][$eq]": "etap3",
        });

        // Wykonaj oba zapytania równolegle
        const [etap2Response, etap3Response] = await Promise.all([
            fetch(etap2Url),
            fetch(etap3Url),
        ]);

        if (etap2Response.ok) {
            const etap2Data = await etap2Response.json();
            setCachedData(etap2Url, etap2Data);
        }

        if (etap3Response.ok) {
            const etap3Data = await etap3Response.json();
            setCachedData(etap3Url, etap3Data);
        }

        console.log("[Preload] Apartments preloaded successfully");
    } catch (error) {
        console.warn("[Preload] Failed to preload apartments:", error);
    }
};

// Funkcja do czyszczenia starego cache
export const cleanCache = () => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
        if (!isCacheValid(value.timestamp)) {
            cache.delete(key);
        }
    }
    console.log("[Cache] Cleaned old entries");
};

// Automatyczne czyszczenie cache co 24 godziny (raz dziennie)
if (typeof window !== "undefined") {
    setInterval(cleanCache, 24 * 60 * 60 * 1000);
}

// Funkcja do konwersji parametrów wyszukiwania
export const convertSearchParams = (searchParams) => {
    const converted = new URLSearchParams({ populate: "*" });

    for (const [key, value] of searchParams.entries()) {
        const polishField = FIELD_MAPPING[key] || key;
        converted.append(
            key.replace(/^filters\[(\w+)\]/, `filters[${polishField}]`),
            value
        );
    }

    return converted;
};

// Funkcja do budowania URL API
export const buildApiUrl = (endpoint, params = {}) => {
    const url = new URL(`${STRAPI_URL}/api/${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
        }
    });

    return url.toString();
};
