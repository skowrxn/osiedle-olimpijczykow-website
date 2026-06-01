"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem("cookieConsent", "rejected");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-sm text-white p-6 z-50 border-t border-neutral-700 shadow-2xl">
            <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-sm text-neutral-300">
                    <p>
                        Strona wykorzystuje pliki cookies (ciasteczka) w celach
                        analitycznych, marketingowych oraz do prawidłowego
                        działania serwisu. Więcej informacji o przetwarzaniu
                        danych osobowych i plikach cookies znajdziesz w naszej{" "}
                        <Link
                            href="/polityka-prywatnosci"
                            className="underline hover:text-white transition-colors"
                        >
                            Polityce Prywatności
                        </Link>
                        .
                    </p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <button
                        onClick={handleReject}
                        className="px-5 py-2 border border-neutral-500 rounded text-sm hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                        Odrzuć
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-5 py-2 rounded text-sm transition-all text-white font-medium hover:brightness-110"
                        style={{
                            backgroundColor:
                                "var(--quere-button-color-idle, #4b5563)",
                        }}
                    >
                        Akceptuj
                    </button>
                </div>
            </div>
        </div>
    );
}
