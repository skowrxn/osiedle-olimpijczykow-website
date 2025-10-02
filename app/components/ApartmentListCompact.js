"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "../lib/strapi";

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

    useEffect(() => {
        const fetchApartments = async () => {
            setLoading(true);
            setError(null);

            try {
                // Build query parameters for Strapi
                const params = new URLSearchParams({
                    populate: "*",
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
                    if (floor === "0") {
                        params.append("filters[kondygnacja][$eq]", "0");
                    } else if (floor === "4+") {
                        params.append("filters[kondygnacja][$gte]", "4");
                    } else {
                        params.append("filters[kondygnacja][$eq]", floor);
                    }
                }

                if (area) {
                    if (area === "25-35") {
                        params.append("filters[powierzchnia][$gte]", "25");
                        params.append("filters[powierzchnia][$lte]", "35");
                    } else if (area === "35-45") {
                        params.append("filters[powierzchnia][$gte]", "35");
                        params.append("filters[powierzchnia][$lte]", "45");
                    } else if (area === "45-55") {
                        params.append("filters[powierzchnia][$gte]", "45");
                        params.append("filters[powierzchnia][$lte]", "55");
                    } else if (area === "55-65") {
                        params.append("filters[powierzchnia][$gte]", "55");
                        params.append("filters[powierzchnia][$lte]", "65");
                    } else if (area === "65+") {
                        params.append("filters[powierzchnia][$gte]", "65");
                    }
                }

                if (stage && !etap) {
                    params.append("filters[etap][$eq]", stage);
                }

                if (availability) {
                    params.append("filters[status][$eq]", availability);
                }

                // Add limit if specified
                if (limit) {
                    params.append("pagination[limit]", limit.toString());
                }

                const apiUrl = buildApiUrl(
                    "apartments",
                    Object.fromEntries(params)
                );
                console.log("Fetching from:", apiUrl);

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania mieszkań");
                }

                const result = await response.json();
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
            case "DOSTĘPNE":
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
            case "DOSTĘPNE":
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
                    Sprawdź czy Strapi CMS jest uruchomione na porcie 1337
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
                                    `/apartment/${apartment.documentId}`
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
                                                attrs.dostepnosc
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
                                                attrs.dostepnosc
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
                                {/* Cena - wyświetl tylko jeśli mieszkanie DOSTĘPNE lub w rezerwacji i cena > 0 */}
                                {(attrs.dostepnosc === "DOSTĘPNE" ||
                                    attrs.dostepnosc === "DOSTEPNE" ||
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
                                            `/apartment/${apartment.documentId}`
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
