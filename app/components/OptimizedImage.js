"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Komponent obrazka z optymalizacją, lazy loading i cache
 * Automatycznie wykrywa czy obrazek jest z Strapi czy lokalny
 */
const OptimizedImage = ({
    src,
    alt = "",
    width,
    height,
    priority = false,
    className = "",
    style = {},
    onClick,
    onMouseOver,
    onMouseOut,
    fill = false,
    sizes,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Sprawdź czy obrazek jest absolutnym URL (ze Strapi)
    const isAbsoluteUrl = src?.startsWith("http");

    // Jeśli src nie istnieje, pokaż placeholder
    if (!src || hasError) {
        return (
            <div
                className={className}
                style={{
                    ...style,
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: height || "200px",
                }}
            >
                <span style={{ color: "#999", fontSize: "14px" }}>
                    Brak obrazka
                </span>
            </div>
        );
    }

    // Dla absolutnych URL (Strapi) używamy unoptimized=false (domyślnie optymalizuje)
    // Dla lokalnych plików również optymalizujemy
    const imageProps = {
        src,
        alt,
        priority, // First screen images should have priority
        quality: 85, // Kompresja 85% (dobra jakość + mały rozmiar)
        loading: priority ? "eager" : "lazy", // Lazy loading dla nie-priority obrazków
        onLoadingComplete: () => setIsLoading(false),
        onError: () => {
            setHasError(true);
            setIsLoading(false);
        },
        onClick,
        onMouseOver,
        onMouseOut,
        className,
        style: {
            ...style,
            opacity: isLoading ? 0.5 : 1,
            transition: "opacity 0.3s ease",
        },
        sizes: sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    };

    // Jeśli używamy fill, nie podajemy width/height
    if (fill) {
        return <Image {...imageProps} fill />;
    }

    // Jeśli width i height są podane
    if (width && height) {
        return <Image {...imageProps} width={width} height={height} />;
    }

    // Fallback - użyj fill
    return (
        <div style={{ position: "relative", ...style }} className={className}>
            <Image {...imageProps} fill style={{ objectFit: "cover" }} />
        </div>
    );
};

export default OptimizedImage;
