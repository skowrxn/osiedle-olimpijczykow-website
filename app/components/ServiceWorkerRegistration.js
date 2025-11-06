"use client";

import { useEffect } from "react";

/**
 * Rejestruje Service Worker dla cache'owania obrazków
 * Agresywnie cache'uje wszystkie obrazki z Strapi i lokalne
 */
const ServiceWorkerRegistration = () => {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.log(
                        "[SW] Service Worker zarejestrowany:",
                        registration.scope
                    );

                    // Sprawdź aktualizacje co 1 godzinę
                    setInterval(() => {
                        registration.update();
                    }, 60 * 60 * 1000);
                })
                .catch((error) => {
                    console.error(
                        "[SW] Błąd rejestracji Service Worker:",
                        error
                    );
                });
        } else {
            console.warn("[SW] Service Worker nie jest wspierany w tej przeglądarce");
        }
    }, []);

    return null;
};

export default ServiceWorkerRegistration;
