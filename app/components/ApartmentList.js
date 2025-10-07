"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { buildApiUrl } from "../lib/strapi";

const ApartmentList = ({ etap }) => {
    const searchParams = useSearchParams();
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApartments = async () => {
            setLoading(true);
            setError(null);

            try {
                // Build query parameters for Strapi
                const params = new URLSearchParams({
                    populate: "*",
                    "filters[etap][$eq]": `etap${etap}`,
                    "filters[dostepnosc][$eq]": "DOSTEPNE",
                });

                // Add filter parameters from search
                const rooms = searchParams.get("rooms");
                const floor = searchParams.get("floor");
                const area = searchParams.get("area");

                if (rooms) {
                    params.append("filters[liczba_pokoi][$eq]", rooms);
                }

                if (floor) {
                    params.append("filters[kondygnacja][$eq]", floor);
                }

                if (area) {
                    if (area === "35-45") {
                        params.append("filters[powierzchnia][$gte]", "35");
                        params.append("filters[powierzchnia][$lte]", "45");
                    } else if (area === "45-55") {
                        params.append("filters[powierzchnia][$gte]", "45");
                        params.append("filters[powierzchnia][$lte]", "55");
                    } else if (area === "55-65") {
                        params.append("filters[powierzchnia][$gte]", "55");
                        params.append("filters[powierzchnia][$lte]", "65");
                    } else if (area === "65-75") {
                        params.append("filters[powierzchnia][$gte]", "65");
                        params.append("filters[powierzchnia][$lte]", "75");
                    } else if (area === "75+") {
                        params.append("filters[powierzchnia][$gte]", "75");
                    }
                }

                const apiUrl = buildApiUrl(
                    "apartments",
                    Object.fromEntries(params)
                );
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania mieszkań");
                }

                const result = await response.json();
                console.log("API Response:", result); // Debug log
                setApartments(result.data || []);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching apartments:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchApartments();
    }, [etap, searchParams]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("pl-PL", {
            style: "currency",
            currency: "PLN",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatFloor = (floor) => {
        return floor === 0 ? "Parter" : `${floor}. piętro`;
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-neutral-600">Ładowanie mieszkań...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-600">Błąd: {error}</p>
                <p className="text-neutral-600 mt-2">
                    Sprawdź czy Strapi CMS jest uruchomione na porcie 1337
                </p>
            </div>
        );
    }

    if (apartments.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-neutral-600 text-lg">
                    Nie znaleziono mieszkań spełniających kryteria wyszukiwania.
                </p>
                <p className="text-neutral-500 mt-2">
                    Spróbuj zmienić filtry lub wyczyść wyszukiwanie.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-neutral-800 mb-4">
                Znaleziono {apartments.length} mieszkań
            </h3>

            {apartments.map((apartment) => {
                // Debug log for individual apartment
                console.log("Individual apartment:", apartment);

                // Safety check
                if (!apartment || typeof apartment !== "object") {
                    console.warn("Invalid apartment data:", apartment);
                    return null;
                }

                // W Strapi 5.x dane przychodzą bezpośrednio w obiekcie
                const attrs = apartment;

                return (
                    <div
                        key={apartment.id}
                        className="border border-neutral-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-neutral-700">
                                            Pokoje:
                                        </span>
                                        <p className="text-lg font-semibold text-neutral-900">
                                            {attrs.liczba_pokoi}{" "}
                                            {attrs.liczba_pokoi === 1
                                                ? "pokój"
                                                : "pokoje"}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-neutral-700">
                                            Powierzchnia:
                                        </span>
                                        <p className="text-lg font-semibold text-neutral-900">
                                            {attrs.powierzchnia} m²
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-neutral-700">
                                            Piętro:
                                        </span>
                                        <p className="text-lg font-semibold text-neutral-900">
                                            {formatFloor(attrs.kondygnacja)}
                                        </p>
                                    </div>
                                </div>
                                {attrs.opis && (
                                    <p className="text-neutral-600 mt-2 text-sm">
                                        {attrs.opis}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col items-end ml-6">
                                {/* Cena - wyświetl tylko jeśli mieszkanie DOSTEPNE lub w rezerwacji i cena > 0 */}
                                {(attrs.dostepnosc === "DOSTEPNE" ||
                                    attrs.dostepnosc === "REZERWACJA") &&
                                    attrs.cena > 0 && (
                                        <div className="text-right mb-3">
                                            <span className="text-sm font-medium text-neutral-700">
                                                Cena:
                                            </span>
                                            <p className="text-2xl font-bold text-green-600">
                                                {formatPrice(attrs.cena)}
                                            </p>
                                        </div>
                                    )}
                                <Link
                                    href={`/apartment/${apartment.documentId}`}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Zobacz
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ApartmentList;
