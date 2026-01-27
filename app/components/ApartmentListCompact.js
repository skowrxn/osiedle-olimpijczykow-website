"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { buildApiUrl, getCachedData, setCachedData } from "../lib/strapi";
import Image from "next/image";
import Lightbox from "./Lightbox";

const ApartmentListCompact = ({
    etap = null,
    showSearch = true,
    limit = null,
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const parkingPrice = 40000;
    const storagePrice = 15000;
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchApartments = async () => {
            setLoading(true);
            setError(null);

            try {
                // Build query parameters for Strapi
                const params = new URLSearchParams();

                // Optymalizacja: pobieraj tylko potrzebne pola
                const fields = [
                    "liczba_pokoi",
                    "powierzchnia",
                    "kondygnacja",
                    "cena",
                    "dostepnosc",
                    "numer",
                    "etap",
                ];
                fields.forEach((field, index) => {
                    params.append(`fields[${index}]`, field);
                });

                // Add etap filter if specified
                if (etap) {
                    params.append("filters[etap][$eq]", `etap${etap}`);
                }

                // Add filter parameters from search
                const rooms = searchParams.get("rooms");
                const floor = searchParams.get("floor");
                const area = searchParams.get("area");
                const stage = searchParams.get("stage");
                const availability = searchParams.get("status");

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

                if (stage && !etap) {
                    params.append("filters[etap][$eq]", stage);
                }

                // Usunieto tymczasowe ukrywanie mieszkan z etapu 3

                if (availability) {
                    params.append("filters[dostepnosc][$eq]", availability);
                }

                // Add limit if specified
                if (limit) {
                    params.append("pagination[limit]", limit.toString());
                }

                const apiUrl = buildApiUrl(
                    "apartments",
                    Object.fromEntries(params),
                );
                console.log("Fetching from:", apiUrl);

                // Sprawdź cache przed fetch
                const cachedResult = getCachedData(apiUrl);
                if (cachedResult) {
                    setApartments(cachedResult.data || []);
                    setLoading(false);
                    return;
                }

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania mieszkań");
                }

                const result = await response.json();

                // Zapisz w cache
                setCachedData(apiUrl, result);

                setApartments(result.data || []);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching apartments:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchApartments();
    }, [etap, searchParams, limit]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("pl-PL", {
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatFloor = (floor) => {
        return floor === 0 ? "Parter" : `${floor} p.`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "DOSTEPNE":
                return "#28a745"; // Zielony
            case "REZERWACJA":
                return "#ffc107"; // Żółty
            case "SPRZEDANE":
                return "#dc3545"; // Czerwony
            default:
                return "#6c757d"; // Szary dla nieznanych statusów
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "DOSTEPNE":
                return "Dostępne";
            case "REZERWACJA":
                return "Rezerwacja";
            case "SPRZEDANE":
                return "Sprzedane";
            default:
                return `Nieznany status (${status})`;
        }
    };

    const openGarageLightbox = () => {
        setLightboxImages(["/img/garaz2.png"]);
        setCurrentImageIndex(0);
        setLightboxOpen(true);
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        border: "4px solid #f3f3f3",
                        borderTop: "4px solid #007cba",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        margin: "0 auto 15px",
                    }}
                ></div>
                <p style={{ color: "#666", fontSize: "16px" }}>
                    Ładowanie mieszkań...
                </p>
                <style jsx>{`
                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p
                    style={{
                        color: "#dc3545",
                        fontSize: "16px",
                        marginBottom: "10px",
                    }}
                >
                    Błąd: {error}
                </p>
                <p style={{ color: "#666", fontSize: "14px" }}>
                    Blad laczenia z CMS
                </p>
            </div>
        );
    }

    if (apartments.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p
                    style={{
                        color: "#666",
                        fontSize: "18px",
                        marginBottom: "10px",
                    }}
                >
                    Nie znaleziono mieszkań spełniających kryteria wyszukiwania.
                </p>
                <p style={{ color: "#999", fontSize: "14px" }}>
                    Spróbuj zmienić filtry lub wyczyść wyszukiwanie.
                </p>
            </div>
        );
    }

    return (
        <div>
            {showSearch && (
                <div style={{ marginBottom: "30px" }}>
                    <h3
                        style={{
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#333",
                            marginBottom: "15px",
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        Wyniki wyszukiwania ({apartments.length})
                    </h3>
                </div>
            )}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {apartments.map((apartment) => {
                    const attrs = apartment;
                    console.log("Apartment dostepnosc:", attrs.dostepnosc);

                    return (
                        <div
                            key={apartment.id}
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: "0",
                                padding: "20px",
                                boxShadow: "0 2px 8px rgba(0,124,186,0.1)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                minHeight: "80px",
                            }}
                            className="apartment-item"
                            onClick={() =>
                                router.push(
                                    `/apartment/${apartment.documentId}`,
                                )
                            }
                        >
                            {" "}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px",
                                }}
                            >
                                {/* Status box */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        flexShrink: 0,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "12px",
                                            height: "60px",
                                            backgroundColor: getStatusColor(
                                                attrs.dostepnosc,
                                            ),
                                            borderRadius: "0",
                                        }}
                                        title={getStatusText(attrs.dostepnosc)}
                                    ></div>
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: getStatusColor(
                                                attrs.dostepnosc,
                                            ),
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        {getStatusText(attrs.dostepnosc)}
                                    </div>
                                </div>

                                {/* Dane mieszkania */}
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "40px",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            textAlign: "center",
                                            minWidth: "60px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "12px",
                                                color: "#666",
                                                marginBottom: "0px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            POKOJE
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                color: "#333",
                                            }}
                                        >
                                            {attrs.liczba_pokoi}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            textAlign: "center",
                                            minWidth: "80px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "12px",
                                                color: "#666",
                                                marginBottom: "0px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            POWIERZCHNIA
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                color: "#333",
                                            }}
                                        >
                                            {attrs.powierzchnia} m²
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            textAlign: "center",
                                            minWidth: "80px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "12px",
                                                color: "#666",
                                                marginBottom: "0px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            PIĘTRO
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                color: "#333",
                                            }}
                                        >
                                            {formatFloor(attrs.kondygnacja)}
                                        </div>
                                    </div>

                                    {attrs.numer && (
                                        <div
                                            style={{
                                                textAlign: "left",
                                                minWidth: "100px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "#666",
                                                    marginBottom: "4px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                NUMER
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "16px",
                                                    fontWeight: "600",
                                                    color: "#333",
                                                }}
                                            >
                                                {attrs.numer}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Prawa strona - cena i przycisk */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "30px",
                                }}
                            >
                                {/* Cena - wyświetl tylko jeśli mieszkanie DOSTEPNE lub w rezerwacji i cena > 0 */}
                                {(attrs.dostepnosc === "DOSTEPNE" ||
                                    attrs.dostepnosc === "REZERWACJA") &&
                                    attrs.cena > 0 && (
                                        <div style={{ textAlign: "right" }}>
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "#666",
                                                    marginBottom: "0px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                CENA
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "22px",
                                                    fontWeight: "600",
                                                    color: "#333",
                                                }}
                                            >
                                                {formatPrice(attrs.cena)} PLN
                                            </div>
                                        </div>
                                    )}

                                <button
                                    style={{
                                        backgroundColor: "#232323",
                                        color: "white",
                                        border: "none",
                                        padding: "12px 24px",
                                        borderRadius: "50px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                        transition:
                                            "background-color 0.3s ease",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(
                                            `/apartment/${apartment.documentId}`,
                                        );
                                    }}
                                >
                                    Zobacz
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Elementy Dodatkowe - na samym dole listy */}
            {(parkingPrice || storagePrice) && (
                <div
                    style={{
                        marginTop: "40px",
                        padding: "30px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            marginBottom: "20px",
                            fontFamily: "Poppins, sans-serif",
                            color: "#333",
                        }}
                    >
                        Elementy dodatkowe
                    </h3>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                        }}
                    >
                        {parkingPrice && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "20px 25px",
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    border: "1px solid #e0e0e0",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "16px",
                                        color: "#333",
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: "500",
                                    }}
                                >
                                    Miejsce postojowe w garażu podziemnym
                                </span>
                                <span
                                    style={{
                                        fontSize: "22px",
                                        fontWeight: "600",
                                        color: "#232323",
                                        fontFamily: "Poppins, sans-serif",
                                    }}
                                >
                                    {formatPrice(parkingPrice)} PLN
                                </span>
                            </div>
                        )}
                        {storagePrice && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "20px 25px",
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    border: "1px solid #e0e0e0",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "16px",
                                        color: "#333",
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: "500",
                                    }}
                                >
                                    Komórka lokatorska
                                </span>
                                <span
                                    style={{
                                        fontSize: "22px",
                                        fontWeight: "600",
                                        color: "#232323",
                                        fontFamily: "Poppins, sans-serif",
                                    }}
                                >
                                    {formatPrice(storagePrice)} PLN
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Rzut garażu - pokazuje się tylko gdy etap jest wybrany */}
            {etap && (
                <div
                    style={{
                        marginTop: "40px",
                        padding: "30px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            marginBottom: "20px",
                            fontFamily: "Poppins, sans-serif",
                            color: "#333",
                        }}
                    >
                        Rzut garażu
                    </h3>
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            padding: "20px",
                            border: "1px solid #e0e0e0",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                        onClick={openGarageLightbox}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.02)";
                            e.currentTarget.style.boxShadow =
                                "0 8px 24px rgba(0,0,0,0.15)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow =
                                "0 2px 8px rgba(0,0,0,0.05)";
                        }}
                    >
                        <img
                            src={`/img/garaz${etap === "2" ? "2" : "3"}.png`}
                            alt={`Rzut garażu - ${etap}`}
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Lightbox */}
            <Lightbox
                images={lightboxImages}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                currentIndex={currentImageIndex}
            />

            <style jsx>{`
                .apartment-item:hover {
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
                    transform: translateY(-1px);
                }
            `}</style>
        </div>
    );
};

export default ApartmentListCompact;
