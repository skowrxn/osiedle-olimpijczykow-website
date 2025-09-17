"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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

                if (rooms) {
                    params.append("filters[rooms][$eq]", rooms);
                }

                if (floor) {
                    if (floor === "0") {
                        params.append("filters[floor][$eq]", "0");
                    } else if (floor === "4+") {
                        params.append("filters[floor][$gte]", "4");
                    } else {
                        params.append("filters[floor][$eq]", floor);
                    }
                }

                if (area) {
                    if (area === "30-50") {
                        params.append("filters[area][$gte]", "30");
                        params.append("filters[area][$lte]", "50");
                    } else if (area === "50-70") {
                        params.append("filters[area][$gte]", "50");
                        params.append("filters[area][$lte]", "70");
                    } else if (area === "70-90") {
                        params.append("filters[area][$gte]", "70");
                        params.append("filters[area][$lte]", "90");
                    } else if (area === "90+") {
                        params.append("filters[area][$gte]", "90");
                    }
                }

                if (stage && !etap) {
                    params.append("filters[etap][$eq]", stage);
                }

                // Add limit if specified
                if (limit) {
                    params.append("pagination[limit]", limit.toString());
                }

                const response = await fetch(
                    `http://localhost:1337/api/apartments?${params.toString()}`
                );

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

    const getStatusColor = (available) => {
        return available ? "#28a745" : "#dc3545"; // Zielony dla dostępnych, czerwony dla sprzedanych
    };

    const getStatusText = (available) => {
        return available ? "Dostępne" : "Sprzedane";
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
                            onMouseEnter={(e) => {
                                e.target.style.borderColor = "#007cba";
                                e.target.style.boxShadow =
                                    "0 4px 20px rgba(0,0,0,0.1)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.borderColor = "#e0e0e0";
                                e.target.style.boxShadow =
                                    "0 2px 8px rgba(0,124,186,0.1)";
                            }}
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
                                                attrs.available
                                            ),
                                            borderRadius: "0",
                                        }}
                                        title={getStatusText(attrs.available)}
                                    ></div>
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: getStatusColor(
                                                attrs.available
                                            ),
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        {getStatusText(attrs.available)}
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
                                            {attrs.rooms}
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
                                            {attrs.area} m²
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
                                            {formatFloor(attrs.floor)}
                                        </div>
                                    </div>

                                    {attrs.apartmentNumber && (
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
                                                    color: "#007cba",
                                                }}
                                            >
                                                {attrs.apartmentNumber}
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
                                        {formatPrice(attrs.price)} PLN
                                    </div>
                                </div>

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
        </div>
    );
};

export default ApartmentListCompact;
