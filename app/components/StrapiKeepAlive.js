"use client";

import { useEffect } from "react";
import { STRAPI_URL } from "../lib/strapi";

/**
 * Komponent utrzymujący Strapi Cloud "żywym"
 * Wysyła ping co 10 minut aby zapobiec uśpieniu serwera na darmowym planie
 */
const StrapiKeepAlive = () => {
    useEffect(() => {
        // Funkcja ping do Strapi
        const pingStrapi = async () => {
            try {
                // Lekkie zapytanie do health check lub minimalnego endpointu
                await fetch(`${STRAPI_URL}/api/apartments?pagination[limit]=1`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log(
                    "[Keep-Alive] Ping wysłany:",
                    new Date().toLocaleTimeString()
                );
            } catch (error) {
                console.warn("[Keep-Alive] Ping nie powiódł się:", error);
            }
        };

        // Wyślij pierwszy ping po 10 minutach
        const interval = setInterval(
            () => {
                pingStrapi();
            },
            10 * 60 * 1000
        ); // 10 minut

        // Opcjonalnie: wyślij ping przy załadowaniu strony
        pingStrapi();

        // Cleanup
        return () => clearInterval(interval);
    }, []);

    return null; // Ten komponent nic nie renderuje
};

export default StrapiKeepAlive;
