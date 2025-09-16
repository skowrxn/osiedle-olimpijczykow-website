"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const ApartmentDetail = () => {
    const params = useParams();
    const { id } = params;
    const [apartment, setApartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApartment = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                console.log("Fetching apartment with documentId:", id);

                // Spróbujmy kilku różnych endpointów
                let response = await fetch(
                    `http://localhost:1337/api/apartments?filters[documentId][$eq]=${id}&populate=*`
                );

                console.log(
                    "First attempt - Response status:",
                    response.status
                );

                // Jeśli nie zadziała, spróbuj innego endpointu
                if (!response.ok) {
                    console.log("Trying alternative endpoint...");
                    response = await fetch(
                        `http://localhost:1337/api/apartments/${id}?populate=*`
                    );
                    console.log(
                        "Second attempt - Response status:",
                        response.status
                    );
                }

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log("Error response:", errorText);
                    throw new Error("Mieszkanie nie zostało znalezione");
                }

                const result = await response.json();
                console.log("API Result:", result);

                // Jeśli to jest wynik z filtrem, weź pierwszy element z array
                if (result.data && Array.isArray(result.data)) {
                    setApartment(result.data[0]);
                } else {
                    setApartment(result.data);
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching apartment:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchApartment();
    }, [id]);

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
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">
                    Ładowanie szczegółów mieszkania...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 text-lg">Błąd: {error}</p>
                <p className="text-gray-600 mt-2">
                    Sprawdź czy Strapi CMS jest uruchomione na porcie 1337
                </p>
                <Link
                    href="/"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Powrót do strony głównej
                </Link>
            </div>
        );
    }

    if (!apartment) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                    Mieszkanie nie zostało znalezione.
                </p>
                <Link
                    href="/"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Powrót do strony głównej
                </Link>
            </div>
        );
    }

    // W Strapi 5.x dane przychodzą bezpośrednio w obiekcie, nie w attributes
    const attributes = apartment;
    const hasImages = attributes.images && attributes.images.length > 0;

    // Extract etap number from the enum value (etap2 -> 2, etap3 -> 3)
    const etapNumber = attributes.etap.replace("etap", "");

    return (
        <div className="max-w-7xl mx-auto py-6">
            <div className="mb-6">
                <Link
                    href={`/etap${etapNumber}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    ← Powrót do listy mieszkań Etap {etapNumber}
                </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left side - Apartment info on dark background */}
                <div className="bg-gray-800 text-white p-8 rounded-lg">
                    <h1 className="text-3xl font-bold mb-6">
                        Mieszkanie {attributes.rooms}-pokojowe
                    </h1>

                    <div className="space-y-4">
                        <div className="border-b border-gray-600 pb-4">
                            <div className="text-4xl font-bold text-green-400 mb-2">
                                {formatPrice(attributes.price)}
                            </div>
                            <p className="text-gray-300">Cena mieszkania</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-2xl font-bold">
                                    {attributes.rooms}
                                </div>
                                <p className="text-gray-300">
                                    {attributes.rooms === 1
                                        ? "pokój"
                                        : "pokoje"}
                                </p>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {attributes.area} m²
                                </div>
                                <p className="text-gray-300">powierzchnia</p>
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-bold">
                                {formatFloor(attributes.floor)}
                            </div>
                            <p className="text-gray-300">lokalizacja</p>
                        </div>

                        <div className="pt-4 border-t border-gray-600">
                            <div className="text-lg font-semibold">
                                Etap {etapNumber}
                            </div>
                            <p className="text-gray-300">inwestycji</p>
                        </div>

                        {attributes.description && (
                            <div className="pt-4 border-t border-gray-600">
                                <h3 className="text-lg font-semibold mb-2">
                                    Opis
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {attributes.description}
                                </p>
                            </div>
                        )}

                        <div className="pt-6">
                            <div className="flex items-center space-x-2 mb-2">
                                <div
                                    className={`w-3 h-3 rounded-full ${
                                        attributes.available
                                            ? "bg-green-400"
                                            : "bg-red-400"
                                    }`}
                                ></div>
                                <span className="font-medium">
                                    {attributes.available
                                        ? "Dostępne"
                                        : "Sprzedane"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Gallery */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Galeria</h2>

                    {hasImages ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {attributes.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={`http://localhost:1337${image.url}`}
                                        alt={`Mieszkanie - zdjęcie ${
                                            index + 1
                                        }`}
                                        className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-100 rounded-lg">
                            <div className="text-gray-400 text-6xl mb-4">
                                🏠
                            </div>
                            <p className="text-gray-600">
                                Brak zdjęć dla tego mieszkania
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                Zdjęcia będą dostępne wkrótce
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApartmentDetail;
