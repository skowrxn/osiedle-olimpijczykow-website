"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PARKING_PRICE, STORAGE_PRICE } from "../lib/apartments";
import Lightbox from "./Lightbox";

const ApartmentListCompact = ({ etap = null, showSearch = true, limit = null }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const params = new URLSearchParams();
        if (etap) params.set("etap", etap);

        const rooms = searchParams.get("rooms");
        const floor = searchParams.get("floor");
        const area = searchParams.get("area");
        const stage = searchParams.get("stage");
        const status = searchParams.get("status");

        if (rooms) params.set("rooms", rooms);
        if (floor) params.set("floor", floor);
        if (area) params.set("area", area);
        if (stage && !etap) params.set("stage", stage);
        if (status) params.set("status", status);
        if (limit) params.set("limit", limit);

        setLoading(true);
        setError(null);

        fetch(`/api/apartments?${params.toString()}`)
            .then((res) => {
                if (!res.ok) throw new Error("Błąd serwera");
                return res.json();
            })
            .then((data) => {
                setApartments(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch apartments error:", err);
                setError("Nie udało się pobrać listy mieszkań.");
                setLoading(false);
            });
    }, [etap, searchParams, limit]);

    const formatPrice = (price) =>
        new Intl.NumberFormat("pl-PL", { minimumFractionDigits: 0 }).format(price);

    const formatFloor = (floor) => (floor === 0 ? "Parter" : `${floor} p.`);

    const getStatusColor = (status) => {
        switch (status) {
            case "DOSTEPNE":   return "#28a745";
            case "REZERWACJA": return "#ffc107";
            case "SPRZEDANE":  return "#dc3545";
            default:           return "#6c757d";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "DOSTEPNE":   return "Dostępne";
            case "REZERWACJA": return "Rezerwacja";
            case "SPRZEDANE":  return "Sprzedane";
            default:           return status;
        }
    };

    const openGarageLightbox = () => {
        setLightboxImages([`/img/garaz${etap === "2" ? "2" : "3"}.png`]);
        setCurrentImageIndex(0);
        setLightboxOpen(true);
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div
                    style={{
                        display: "inline-block",
                        width: "40px",
                        height: "40px",
                        border: "4px solid #e0e0e0",
                        borderTopColor: "#232323",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                    }}
                />
                <p style={{ color: "#666", marginTop: "16px", fontSize: "16px" }}>
                    Ładowanie mieszkań…
                </p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p style={{ color: "#dc3545", fontSize: "18px" }}>{error}</p>
            </div>
        );
    }

    if (apartments.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p style={{ color: "#666", fontSize: "18px", marginBottom: "10px" }}>
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

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {apartments.map((apartment) => (
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
                        onClick={() => router.push(`/apartment/${encodeURIComponent(apartment.id)}`)}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            {/* Status bar */}
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                                <div
                                    style={{
                                        width: "12px",
                                        height: "60px",
                                        backgroundColor: getStatusColor(apartment.dostepnosc),
                                        borderRadius: "0",
                                    }}
                                    title={getStatusText(apartment.dostepnosc)}
                                />
                                <div
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        color: getStatusColor(apartment.dostepnosc),
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    {getStatusText(apartment.dostepnosc)}
                                </div>
                            </div>

                            {/* Apartment data */}
                            <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
                                <div style={{ textAlign: "center", minWidth: "60px" }}>
                                    <div style={{ fontSize: "12px", color: "#666", fontWeight: "500" }}>POKOJE</div>
                                    <div style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>
                                        {apartment.liczba_pokoi}
                                    </div>
                                </div>
                                <div style={{ textAlign: "center", minWidth: "80px" }}>
                                    <div style={{ fontSize: "12px", color: "#666", fontWeight: "500" }}>POWIERZCHNIA</div>
                                    <div style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>
                                        {apartment.powierzchnia} m²
                                    </div>
                                </div>
                                <div style={{ textAlign: "center", minWidth: "80px" }}>
                                    <div style={{ fontSize: "12px", color: "#666", fontWeight: "500" }}>PIĘTRO</div>
                                    <div style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>
                                        {formatFloor(apartment.kondygnacja)}
                                    </div>
                                </div>
                                {apartment.numer && (
                                    <div style={{ textAlign: "left", minWidth: "100px" }}>
                                        <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px", fontWeight: "500" }}>NUMER</div>
                                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>
                                            {apartment.numer}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right side – price and button */}
                        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                            {(apartment.dostepnosc === "DOSTEPNE" || apartment.dostepnosc === "REZERWACJA") &&
                                apartment.cena > 0 && (
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontSize: "12px", color: "#666", fontWeight: "500" }}>CENA</div>
                                        <div style={{ fontSize: "22px", fontWeight: "600", color: "#333" }}>
                                            {formatPrice(apartment.cena)} PLN
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
                                    transition: "background-color 0.3s ease",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/apartment/${encodeURIComponent(apartment.id)}`);
                                }}
                            >
                                Zobacz
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional elements */}
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
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
                        <span style={{ fontSize: "16px", color: "#333", fontFamily: "Poppins, sans-serif", fontWeight: "500" }}>
                            Miejsce postojowe w garażu podziemnym
                        </span>
                        <span style={{ fontSize: "22px", fontWeight: "600", color: "#232323", fontFamily: "Poppins, sans-serif" }}>
                            {formatPrice(PARKING_PRICE)} PLN
                        </span>
                    </div>
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
                        <span style={{ fontSize: "16px", color: "#333", fontFamily: "Poppins, sans-serif", fontWeight: "500" }}>
                            Komórka lokatorska
                        </span>
                        <span style={{ fontSize: "22px", fontWeight: "600", color: "#232323", fontFamily: "Poppins, sans-serif" }}>
                            {formatPrice(STORAGE_PRICE)} PLN
                        </span>
                    </div>
                </div>
            </div>

            {/* Garage floor plan */}
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
                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                        }}
                    >
                        <img
                            src={`/img/garaz${etap === "2" ? "2" : "3"}.png`}
                            alt={`Rzut garażu – etap ${etap}`}
                            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
                        />
                    </div>
                </div>
            )}

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
