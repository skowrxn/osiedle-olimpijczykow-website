"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Lightbox from "../../components/Lightbox";
import ContactSection from "../../components/ContactSection";
const ApartmentDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const [apartment, setApartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [parkingPrice, setParkingPrice] = useState(50000);
    const [storagePrice, setStoragePrice] = useState(20000);
    const [priceHistory, setPriceHistory] = useState([]);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/apartments?id=${encodeURIComponent(id)}`)
            .then((res) => {
                if (!res.ok) throw new Error("Błąd serwera");
                return res.json();
            })
            .then((data) => {
                // Etap 2 - sprzedaż zakończona, mieszkania nie są prezentowane
                if (data?.etap === "etap2") {
                    router.replace("/etap2");
                    return;
                }
                setApartment(data || null);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch apartment error:", err);
                setError("Nie udało się pobrać danych mieszkania.");
                setLoading(false);
            });
    }, [id, router]);

    useEffect(() => {
        fetch("/api/prices")
            .then((r) => r.json())
            .then((d) => {
                if (d.parkingPrice) setParkingPrice(d.parkingPrice);
                if (d.storagePrice) setStoragePrice(d.storagePrice);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!apartment?.numer) return;
        fetch(`/api/price-history?numer=${encodeURIComponent(apartment.numer)}`)
            .then((r) => r.json())
            .then((d) => setPriceHistory(Array.isArray(d) ? d : []))
            .catch(() => {});
    }, [apartment?.numer]);

    const formatPrice = (price) =>
        new Intl.NumberFormat("pl-PL", {
            style: "currency",
            currency: "PLN",
            minimumFractionDigits: 0,
        }).format(price);

    const formatFloor = (floor) => (floor === 0 ? "Parter" : `${floor}. piętro`);

    const openLightbox = (images, index = 0) => {
        setLightboxImages(images);
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "120px 0" }}>
                <div
                    style={{
                        display: "inline-block",
                        width: "48px",
                        height: "48px",
                        border: "4px solid #e0e0e0",
                        borderTopColor: "#232323",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                    }}
                />
                <p style={{ color: "#666", marginTop: "20px", fontSize: "18px" }}>
                    Ładowanie…
                </p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p style={{ color: "#dc3545", fontSize: "18px" }}>{error}</p>
                <Link href="/" style={{ display: "inline-block", marginTop: "16px", color: "#232323" }}>
                    Powrót do strony głównej
                </Link>
            </div>
        );
    }

    if (!apartment) {
        return (
            <div className="text-center py-12">
                <p className="text-neutral-600 text-lg">Mieszkanie nie zostało znalezione.</p>
                <Link
                    href="/"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Powrót do strony głównej
                </Link>
            </div>
        );
    }

    const etapNumber = apartment.etap.replace("etap", "");
    const hasImages = apartment.zdjecia && apartment.zdjecia.length > 0;

    const statusBg = apartment.dostepnosc === "DOSTEPNE"
        ? "rgba(34, 197, 94, 0.1)"
        : apartment.dostepnosc === "REZERWACJA"
        ? "rgba(255, 193, 7, 0.1)"
        : "rgba(239, 68, 68, 0.1)";

    const statusBorder = apartment.dostepnosc === "DOSTEPNE"
        ? "rgba(34, 197, 94, 0.2)"
        : apartment.dostepnosc === "REZERWACJA"
        ? "rgba(255, 193, 7, 0.2)"
        : "rgba(239, 68, 68, 0.2)";

    const statusDot = apartment.dostepnosc === "DOSTEPNE"
        ? "#22c55e"
        : apartment.dostepnosc === "REZERWACJA"
        ? "#ffc107"
        : "#ef4444";

    const statusLabel = apartment.dostepnosc === "DOSTEPNE"
        ? "Dostępne"
        : apartment.dostepnosc === "REZERWACJA"
        ? "Rezerwacja"
        : "Sprzedane";

    const statusTextColor = apartment.dostepnosc === "DOSTEPNE"
        ? "#15803d"
        : apartment.dostepnosc === "REZERWACJA"
        ? "#ffc107"
        : "#dc2626";

    return (
        <div className="home wp-singular page-template elementor-default elementor-page">
            <main id="main" className="site-main">
                <div>
                    <section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
                        <div className="elementor-container">
                            <div className="elementor-column elementor-col-100">
                                <div className="elementor-widget-wrap elementor-element-populated">
                                    {/* Breadcrumb */}
                                    <div style={{ marginBottom: "40px", paddingLeft: "20px" }}>
                                        <Link
                                            href={`/etap${etapNumber}`}
                                            style={{
                                                color: "#232323",
                                                textDecoration: "none",
                                                fontSize: "16px",
                                                fontWeight: "500",
                                                transition: "color 0.3s ease",
                                            }}
                                            onMouseOver={(e) => (e.target.style.color = "#666")}
                                            onMouseOut={(e) => (e.target.style.color = "#232323")}
                                        >
                                            ← Powrót do listy mieszkań Etap {etapNumber}
                                        </Link>
                                    </div>

                                    {/* Main content */}
                                    <div
                                        style={{
                                            backgroundColor: "white",
                                            borderRadius: "0px",
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1fr",
                                                minHeight: "600px",
                                            }}
                                            className="apartment-detail-grid"
                                        >
                                            {/* Left – info */}
                                            <div
                                                style={{
                                                    backgroundColor: "#232323",
                                                    color: "white",
                                                    padding: "40px 40px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "start",
                                                }}
                                            >
                                                <h1
                                                    style={{
                                                        fontSize: "42px",
                                                        fontWeight: "600",
                                                        marginBottom: "20px",
                                                        fontFamily: "Poppins, sans-serif",
                                                        lineHeight: "1.2",
                                                    }}
                                                >
                                                    Mieszkanie {apartment.numer}
                                                </h1>

                                                {/* Status badge */}
                                                <div
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        marginBottom: "20px",
                                                        gap: "8px",
                                                        padding: "8px 24px",
                                                        borderRadius: "20px",
                                                        backgroundColor: statusBg,
                                                        border: `1px solid ${statusBorder}`,
                                                        width: "fit-content",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "8px",
                                                            height: "8px",
                                                            borderRadius: "50%",
                                                            backgroundColor: statusDot,
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            fontSize: "14px",
                                                            fontWeight: "600",
                                                            fontFamily: "Poppins, sans-serif",
                                                            color: statusTextColor,
                                                        }}
                                                    >
                                                        {statusLabel}
                                                    </span>
                                                </div>

                                                {/* Price */}
                                                {(apartment.dostepnosc === "DOSTEPNE" ||
                                                    apartment.dostepnosc === "REZERWACJA") &&
                                                    apartment.cena > 0 && (
                                                        <div style={{ marginBottom: "30px" }}>
                                                            <div
                                                                style={{
                                                                    fontSize: "48px",
                                                                    fontWeight: "700",
                                                                    color: "white",
                                                                    marginBottom: "8px",
                                                                    fontFamily: "Poppins, sans-serif",
                                                                }}
                                                            >
                                                                {formatPrice(apartment.cena)}
                                                            </div>
                                                            <p style={{ color: "#d1d5db", fontSize: "16px" }}>
                                                                Cena mieszkania
                                                            </p>
                                                        </div>
                                                    )}

                                                {/* Stats grid */}
                                                <div
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns: "1fr 1fr",
                                                        gap: "30px",
                                                        marginBottom: "30px",
                                                    }}
                                                >
                                                    <div>
                                                        <div
                                                            style={{
                                                                fontSize: "32px",
                                                                fontWeight: "600",
                                                                marginBottom: "8px",
                                                                fontFamily: "Poppins, sans-serif",
                                                            }}
                                                        >
                                                            {apartment.liczba_pokoi}
                                                        </div>
                                                        <p style={{ color: "#d1d5db", fontSize: "14px" }}>
                                                            {apartment.liczba_pokoi === 1 ? "pokój" : "pokoje"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <div
                                                            style={{
                                                                fontSize: "32px",
                                                                fontWeight: "600",
                                                                marginBottom: "8px",
                                                                fontFamily: "Poppins, sans-serif",
                                                            }}
                                                        >
                                                            {apartment.powierzchnia} m²
                                                        </div>
                                                        <p style={{ color: "#d1d5db", fontSize: "14px" }}>
                                                            powierzchnia
                                                        </p>
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns: apartment.elementy_dodatkowe ? "1fr 1fr" : "1fr",
                                                        gap: "30px",
                                                        marginBottom: "30px",
                                                    }}
                                                >
                                                    <div>
                                                        <div
                                                            style={{
                                                                fontSize: "24px",
                                                                fontWeight: "600",
                                                                marginBottom: "8px",
                                                                fontFamily: "Poppins, sans-serif",
                                                            }}
                                                        >
                                                            {formatFloor(apartment.kondygnacja)}
                                                        </div>
                                                        <p style={{ color: "#d1d5db", fontSize: "14px" }}>
                                                            lokalizacja
                                                        </p>
                                                    </div>
                                                    {apartment.elementy_dodatkowe && (
                                                        <div>
                                                            <div
                                                                style={{
                                                                    fontSize: "24px",
                                                                    lineHeight: "45px",
                                                                    fontWeight: "600",
                                                                    marginBottom: "8px",
                                                                    fontFamily: "Poppins, sans-serif",
                                                                }}
                                                            >
                                                                {apartment.elementy_dodatkowe}
                                                            </div>
                                                            <p style={{ color: "#d1d5db", fontSize: "14px" }}>
                                                                dodatkowe elementy
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Apartment card */}
                                                {apartment.karta && (
                                                    <div style={{ marginBottom: "30px" }}>
                                                        <h3
                                                            style={{
                                                                fontSize: "20px",
                                                                fontWeight: "600",
                                                                marginBottom: "15px",
                                                                color: "white",
                                                                fontFamily: "Poppins, sans-serif",
                                                            }}
                                                        >
                                                            Karta mieszkania
                                                        </h3>
                                                        <div
                                                            style={{
                                                                cursor: "pointer",
                                                                borderRadius: "8px",
                                                                overflow: "hidden",
                                                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                            }}
                                                            onClick={() => openLightbox([apartment.karta], 0)}
                                                            onMouseOver={(e) => {
                                                                e.currentTarget.style.transform = "scale(1.02)";
                                                                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.currentTarget.style.transform = "scale(1)";
                                                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                                                            }}
                                                        >
                                                            <Image
                                                                src={apartment.karta}
                                                                alt="Karta mieszkania"
                                                                width={600}
                                                                height={450}
                                                                style={{ width: "100%", height: "auto", display: "block" }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Additional elements pricing */}
                                                <div style={{ marginBottom: "30px" }}>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                padding: "16px 20px",
                                                                backgroundColor: "rgba(255,255,255,0.05)",
                                                                borderRadius: "8px",
                                                                border: "1px solid rgba(255,255,255,0.1)",
                                                            }}
                                                        >
                                                            <span style={{ fontSize: "16px", color: "#d1d5db", fontFamily: "Poppins, sans-serif" }}>
                                                                Miejsce postojowe w garażu podziemnym
                                                            </span>
                                                            <span style={{ fontSize: "20px", fontWeight: "600", color: "white", fontFamily: "Poppins, sans-serif" }}>
                                                                {formatPrice(parkingPrice)}
                                                            </span>
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                padding: "16px 20px",
                                                                backgroundColor: "rgba(255,255,255,0.05)",
                                                                borderRadius: "8px",
                                                                border: "1px solid rgba(255,255,255,0.1)",
                                                            }}
                                                        >
                                                            <span style={{ fontSize: "16px", color: "#d1d5db", fontFamily: "Poppins, sans-serif" }}>
                                                                Komórka lokatorska
                                                            </span>
                                                            <span style={{ fontSize: "20px", fontWeight: "600", color: "white", fontFamily: "Poppins, sans-serif" }}>
                                                                {formatPrice(storagePrice)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price history */}
                                                {priceHistory.length > 0 && (
                                                    <div style={{ marginBottom: "30px" }}>
                                                        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "rgba(255,255,255,0.85)", fontFamily: "Poppins, sans-serif", marginBottom: "10px" }}>
                                                            Historia cen
                                                        </h3>
                                                        <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", overflow: "hidden" }}>
                                                            {priceHistory.map((entry, idx) => (
                                                                <div
                                                                    key={entry.data}
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        alignItems: "center",
                                                                        padding: "11px 16px",
                                                                        borderBottom: idx < priceHistory.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                                                                    }}
                                                                >
                                                                    <span style={{ fontSize: "13px", color: "#9ca3af" }}>
                                                                        {new Date(entry.data + "T12:00:00").toLocaleDateString("pl-PL", { day: "numeric", month: "short", year: "numeric" })}
                                                                    </span>
                                                                    <span style={{ fontSize: "14px", fontWeight: idx === 0 ? "700" : "500", color: idx === 0 ? "white" : "#d1d5db", fontFamily: "Poppins, sans-serif" }}>
                                                                        {new Intl.NumberFormat("pl-PL").format(entry.cena)} zł
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right – gallery */}
                                            <div style={{ padding: "60px 40px", backgroundColor: "white" }}>
                                                <h2
                                                    style={{
                                                        fontSize: "32px",
                                                        fontWeight: "600",
                                                        marginBottom: "30px",
                                                        fontFamily: "Poppins, sans-serif",
                                                        color: "#232323",
                                                    }}
                                                >
                                                    Galeria
                                                </h2>

                                                {hasImages ? (
                                                    <div
                                                        style={{
                                                            display: "grid",
                                                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                                            gap: "20px",
                                                        }}
                                                    >
                                                        {apartment.zdjecia.map((imgPath, index) => (
                                                            <div
                                                                key={index}
                                                                style={{
                                                                    position: "relative",
                                                                    height: "200px",
                                                                    cursor: "pointer",
                                                                    borderRadius: "8px",
                                                                    overflow: "hidden",
                                                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                                }}
                                                                onClick={() => openLightbox(apartment.zdjecia, index)}
                                                                onMouseOver={(e) => {
                                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                                                                }}
                                                                onMouseOut={(e) => {
                                                                    e.currentTarget.style.transform = "scale(1)";
                                                                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                                                                }}
                                                            >
                                                                <Image
                                                                    src={imgPath}
                                                                    alt={`Mieszkanie ${apartment.numer} – zdjęcie ${index + 1}`}
                                                                    fill
                                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                                    style={{ objectFit: "cover" }}
                                                                    priority={index === 0}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            textAlign: "center",
                                                            padding: "60px 20px",
                                                            backgroundColor: "#f8f9fa",
                                                            borderRadius: "8px",
                                                        }}
                                                    >
                                                        <p style={{ color: "#6b7280", fontSize: "18px", marginBottom: "8px" }}>
                                                            Brak wizualizacji dla tego mieszkania
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <ContactSection />
                </div>
            </main>

            <Lightbox
                images={lightboxImages}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                currentIndex={currentImageIndex}
            />

            <style jsx>{`
                @media (max-width: 768px) {
                    .apartment-detail-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ApartmentDetail;
