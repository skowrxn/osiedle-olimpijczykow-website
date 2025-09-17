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
    available: "dostepne",
    number: "numer",
    additionalElements: "elementy_dodatkowe",
};

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
