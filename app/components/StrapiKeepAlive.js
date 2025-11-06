"use client";

import { useEffect, useState } from "react";
import { STRAPI_URL } from "../lib/strapi";
import { preloadApartments } from "../lib/strapi";

/**
 * Komponent do warm-up serwera Strapi
 * - Natychmiast budzi serwer przy pierwszym załadowaniu strony
 * - Wykonuje preload danych po obudzeniu serwera
 * - Cache 24h zapewnia szybkość, warm-up eliminuje cold start
 */
const StrapiKeepAlive = () => {
    const [serverStatus, setServerStatus] = useState("warming"); // warming | ready | error

    useEffect(() => {
        // Funkcja warm-up - budzi serwer i czeka aż będzie gotowy
        const warmUpServer = async () => {
            console.log("[Warm-Up] Budzenie serwera Strapi...");
            setServerStatus("warming");

            try {
                // Pierwszy ping - może być wolny (cold start)
                const startTime = Date.now();
                const response = await fetch(
                    `${STRAPI_URL}/api/apartments?pagination[limit]=1`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const duration = Date.now() - startTime;

                if (response.ok) {
                    console.log(
                        `[Warm-Up] ✓ Serwer obudzony! (${duration}ms)`
                    );
                    setServerStatus("ready");

                    // Preload danych w tle po obudzeniu serwera
                    setTimeout(() => {
                        console.log("[Warm-Up] Uruchamiam preload danych...");
                        preloadApartments();
                    }, 500); // Odczekaj 500ms po cold start
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.error("[Warm-Up] ✗ Błąd podczas warm-up:", error);
                setServerStatus("error");

                // Spróbuj ponownie za 5 sekund
                setTimeout(warmUpServer, 5000);
            }
        };

        // Uruchom warm-up tylko raz przy montowaniu komponentu
        warmUpServer();
    }, []);

    // Opcjonalny wskaźnik statusu (możesz go ukryć w produkcji)
    if (process.env.NODE_ENV === "development" && serverStatus === "warming") {
        return (
            <div
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    backgroundColor: "#ffc107",
                    color: "#000",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    zIndex: 9999,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
            >
                🔄 Budzenie serwera Strapi...
            </div>
        );
    }

    return null;
};

export default StrapiKeepAlive;
