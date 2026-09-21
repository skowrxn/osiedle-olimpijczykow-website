"use client";

import React from "react";
import Image from "next/image";

// Etapy, ktore nie sa aktualnie w sprzedazy - kafelek jest wyszarzony,
// nieklikalny i zamiast opisu pokazuje komunikat o statusie sprzedazy.
const STATUS_LABELS = {
    sold: "Sprzedaż zakończona",
    soon: "Sprzedaż wkrótce",
};

/**
 * Kafelek etapu używany na stronach "Lista lokali" oraz "Rzuty".
 *
 * status = "sold" / "soon" wyłącza kafelek i wyświetla na nim komunikat,
 * brak statusu oznacza etap aktywny (klikalny, z tytułem i opisem na dole).
 */
const StageCard = ({
    imageSrc,
    title,
    desc,
    href = null,
    onClick = null,
    status = null,
}) => {
    const statusLabel = STATUS_LABELS[status] || null;
    const isClickable = !statusLabel && (href || onClick);

    const content = (
        <div className="relative w-full" style={{ height: "400px" }}>
            <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                style={{
                    objectFit: "cover",
                    filter: statusLabel ? "grayscale(100%)" : "none",
                }}
            />

            {statusLabel ? (
                <>
                    {/* Przyciemnienie całego kafelka */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Informacja o statusie sprzedaży */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
                        <span
                            className="text-white text-3xl md:text-4xl font-bold uppercase leading-tight"
                            style={{ maxWidth: "320px" }}
                        >
                            {statusLabel}
                        </span>
                        <p className="text-gray-300 text-lg mt-3">{title}</p>
                    </div>
                </>
            ) : (
                /* Tytuł na dole bez overlay */
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <div className="w-full p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                        <span className="text-white text-2xl font-bold mb-2">
                            {title}
                        </span>
                        <p className="text-neutral-200 text-md">{desc}</p>
                    </div>
                </div>
            )}
        </div>
    );

    const wrapperClass = `block relative overflow-hidden rounded-lg shadow-lg ${
        isClickable
            ? "cursor-pointer transition-transform duration-300 hover:scale-103"
            : "cursor-default"
    }`;

    if (statusLabel) {
        return (
            <div className={wrapperClass} aria-disabled="true">
                {content}
            </div>
        );
    }

    if (href) {
        return (
            <a href={href} className={wrapperClass}>
                {content}
            </a>
        );
    }

    return (
        <div className={wrapperClass} onClick={onClick}>
            {content}
        </div>
    );
};

export default StageCard;
