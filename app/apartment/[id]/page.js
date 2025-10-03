"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Lightbox from "../../components/Lightbox";
import ContactSection from "../../components/ContactSection";
import { buildApiUrl, STRAPI_URL } from "../../lib/strapi";

const ApartmentDetail = () => {
    const params = useParams();
    const { id } = params;
    const [apartment, setApartment] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
                let apiUrl = buildApiUrl("apartments", {
                    "filters[documentId][$eq]": id,
                    populate: "*",
                });

                let response = await fetch(apiUrl);

                console.log(
                    "First attempt - Response status:",
                    response.status
                );

                // Jeśli nie zadziała, spróbuj innego endpointu
                if (!response.ok) {
                    console.log("Trying alternative endpoint...");
                    apiUrl = buildApiUrl(`apartments/${id}`, {
                        populate: "*",
                    });
                    response = await fetch(apiUrl);
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
                <p className="mt-4 text-neutral-600">
                    Ładowanie szczegółów mieszkania...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 text-lg">Błąd: {error}</p>
                <p className="text-neutral-600 mt-2">
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
                <p className="text-neutral-600 text-lg">
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
    const hasImages = attributes.zdjecia && attributes.zdjecia.length > 0;

    // Extract etap number from the enum value (etap2 -> 2, etap3 -> 3)
    const etapNumber = attributes.etap.replace("etap", "");

    const openLightbox = (index) => {
        const imageUrls = attributes.zdjecia.map(
            (img) => img.url.startsWith('http') ? img.url : `${STRAPI_URL}${img.url}`
        );
        setLightboxImages(imageUrls);
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="home wp-singular page-template elementor-default elementor-page">
            <main id="main" className="site-main">
                <div>
                    <section
                        style={{
                            padding: "60px 0",
                            backgroundColor: "#f8f9fa",
                        }}
                    >
                        <div className="elementor-container">
                            <div className="elementor-column elementor-col-100">
                                <div className="elementor-widget-wrap elementor-element-populated">
                                    {/* Navigation breadcrumb */}
                                    <div
                                        style={{
                                            marginBottom: "40px",
                                            paddingLeft: "20px",
                                        }}
                                    >
                                        <Link
                                            href={`/etap${etapNumber}`}
                                            style={{
                                                color: "#232323",
                                                textDecoration: "none",
                                                fontSize: "16px",
                                                fontWeight: "500",
                                                transition: "color 0.3s ease",
                                            }}
                                            onMouseOver={(e) =>
                                                (e.target.style.color = "#666")
                                            }
                                            onMouseOut={(e) =>
                                                (e.target.style.color =
                                                    "#232323")
                                            }
                                        >
                                            ← Powrót do listy mieszkań Etap{" "}
                                            {etapNumber}
                                        </Link>
                                    </div>

                                    {/* Main content */}
                                    <div
                                        style={{
                                            backgroundColor: "white",
                                            borderRadius: "0px",
                                            boxShadow:
                                                "0 4px 20px rgba(0,0,0,0.1)",
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
                                            {/* Left side - Apartment info */}
                                            <div
                                                style={{
                                                    backgroundColor: "#232323",
                                                    color: "white",
                                                    padding: "0px 40px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <h1
                                                    style={{
                                                        fontSize: "42px",
                                                        fontWeight: "600",
                                                        marginBottom: "30px",
                                                        fontFamily:
                                                            "Poppins, sans-serif",
                                                        lineHeight: "1.2",
                                                    }}
                                                >
                                                    Mieszkanie{" "}
                                                    {attributes.rooms}-pokojowe
                                                </h1>

                                                <div>
                                                    <div
                                                        style={{
                                                            display:
                                                                "inline-flex",
                                                            alignItems:
                                                                "center",
                                                            marginBottom:
                                                                "20px",
                                                            gap: "8px",
                                                            padding: "8px 24px",
                                                            borderRadius:
                                                                "20px",
                                                            backgroundColor:
                                                                attributes.dostepnosc ===
                                                                "DOSTEPNE"
                                                                    ? "rgba(34, 197, 94, 0.1)"
                                                                    : attributes.dostepnosc ===
                                                                      "REZERWACJA"
                                                                    ? "rgba(255, 193, 7, 0.1)"
                                                                    : "rgba(239, 68, 68, 0.1)",
                                                            border: `1px solid ${
                                                                attributes.dostepnosc ===
                                                                "DOSTEPNE"
                                                                    ? "rgba(34, 197, 94, 0.2)"
                                                                    : attributes.dostepnosc ===
                                                                      "REZERWACJA"
                                                                    ? "rgba(255, 193, 7, 0.2)"
                                                                    : "rgba(239, 68, 68, 0.2)"
                                                            }`,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "8px",
                                                                height: "8px",
                                                                borderRadius:
                                                                    "50%",
                                                                backgroundColor:
                                                                    attributes.dostepnosc ===
                                                                    "DOSTEPNE"
                                                                        ? "#22c55e"
                                                                        : attributes.dostepnosc ===
                                                                          "REZERWACJA"
                                                                        ? "#ffc107"
                                                                        : "#ef4444",
                                                            }}
                                                        ></div>
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "14px",
                                                                fontWeight:
                                                                    "600",
                                                                fontFamily:
                                                                    "Poppins, sans-serif",
                                                                color:
                                                                    attributes.dostepnosc ===
                                                                    "DOSTEPNE"
                                                                        ? "#15803d"
                                                                        : attributes.dostepnosc ===
                                                                          "REZERWACJA"
                                                                        ? "#ffc107"
                                                                        : "#dc2626",
                                                            }}
                                                        >
                                                            {attributes.dostepnosc ===
                                                            "DOSTEPNE"
                                                                ? "DOSTEPNE"
                                                                : attributes.dostepnosc ===
                                                                  "REZERWACJA"
                                                                ? "Rezerwacja"
                                                                : "Sprzedane"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Cena - wyświetl tylko jeśli mieszkanie DOSTEPNE lub w rezerwacji i cena > 0 */}
                                                {(attributes.dostepnosc ===
                                                    "DOSTEPNE" ||
                                                    attributes.dostepnosc ===
                                                        "REZERWACJA") &&
                                                    attributes.cena > 0 && (
                                                        <div
                                                            style={{
                                                                marginBottom:
                                                                    "40px",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    fontSize:
                                                                        "48px",
                                                                    fontWeight:
                                                                        "700",
                                                                    color: "white",
                                                                    marginBottom:
                                                                        "8px",
                                                                    fontFamily:
                                                                        "Poppins, sans-serif",
                                                                }}
                                                            >
                                                                {formatPrice(
                                                                    attributes.cena
                                                                )}
                                                            </div>
                                                            <p
                                                                style={{
                                                                    color: "#d1d5db",
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                            >
                                                                Cena mieszkania
                                                            </p>
                                                        </div>
                                                    )}

                                                <div
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns:
                                                            "1fr 1fr",
                                                        gap: "30px",
                                                        marginBottom: "40px",
                                                    }}
                                                >
                                                    <div>
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    "32px",
                                                                fontWeight:
                                                                    "600",
                                                                marginBottom:
                                                                    "8px",
                                                                fontFamily:
                                                                    "Poppins, sans-serif",
                                                            }}
                                                        >
                                                            {
                                                                attributes.liczba_pokoi
                                                            }
                                                        </div>
                                                        <p
                                                            style={{
                                                                color: "#d1d5db",
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            {attributes.liczba_pokoi ===
                                                            1
                                                                ? "pokój"
                                                                : "pokoje"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    "32px",
                                                                fontWeight:
                                                                    "600",
                                                                marginBottom:
                                                                    "8px",
                                                                fontFamily:
                                                                    "Poppins, sans-serif",
                                                            }}
                                                        >
                                                            {
                                                                attributes.powierzchnia
                                                            }{" "}
                                                            m²
                                                        </div>
                                                        <p
                                                            style={{
                                                                color: "#d1d5db",
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            powierzchnia
                                                        </p>
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns:
                                                            attributes.elementy_dodatkowe
                                                                ? "1fr 1fr"
                                                                : "1fr",
                                                        gap: "30px",
                                                        marginBottom: "40px",
                                                    }}
                                                >
                                                    <div>
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    "24px",
                                                                fontWeight:
                                                                    "600",
                                                                marginBottom:
                                                                    "8px",
                                                                fontFamily:
                                                                    "Poppins, sans-serif",
                                                            }}
                                                        >
                                                            {formatFloor(
                                                                attributes.kondygnacja
                                                            )}
                                                        </div>
                                                        <p
                                                            style={{
                                                                color: "#d1d5db",
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            lokalizacja
                                                        </p>
                                                    </div>

                                                    {attributes.elementy_dodatkowe && (
                                                        <div>
                                                            <div
                                                                style={{
                                                                    fontSize:
                                                                        "24px",
                                                                    lineHeight:
                                                                        "45px",
                                                                    fontWeight:
                                                                        "600",
                                                                    marginBottom:
                                                                        "8px",
                                                                    fontFamily:
                                                                        "Poppins, sans-serif",
                                                                }}
                                                            >
                                                                {
                                                                    attributes.elementy_dodatkowe
                                                                }
                                                            </div>
                                                            <p
                                                                style={{
                                                                    color: "#d1d5db",
                                                                    fontSize:
                                                                        "14px",
                                                                }}
                                                            >
                                                                dodatkowe
                                                                elementy
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {attributes.karta_mieszkania && (
                                                    <div
                                                        style={{
                                                            marginBottom:
                                                                "40px",
                                                        }}
                                                    >
                                                        <h3
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                                fontWeight:
                                                                    "600",
                                                                marginBottom:
                                                                    "15px",
                                                                fontFamily:
                                                                    "Poppins, sans-serif",
                                                            }}
                                                        >
                                                            Karta mieszkania
                                                        </h3>
                                                        <div
                                                            style={{
                                                                cursor: "pointer",
                                                                borderRadius: "8px",
                                                                overflow: "hidden",
                                                                boxShadow:
                                                                    "0 4px 12px rgba(0,0,0,0.2)",
                                                                transition:
                                                                    "transform 0.3s ease, box-shadow 0.3s ease",
                                                            }}
                                                            onClick={() => {
                                                                const imageUrl = attributes.karta_mieszkania.url.startsWith('http')
                                                                    ? attributes.karta_mieszkania.url
                                                                    : `${STRAPI_URL}${attributes.karta_mieszkania.url}`;
                                                                setLightboxImages([imageUrl]);
                                                                setCurrentImageIndex(0);
                                                                setLightboxOpen(true);
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.currentTarget.style.transform = "scale(1.02)";
                                                                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.currentTarget.style.transform = "scale(1)";
                                                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                                                            }}
                                                        >
                                                            <img
                                                                src={attributes.karta_mieszkania.url.startsWith('http')
                                                                    ? attributes.karta_mieszkania.url
                                                                    : `${STRAPI_URL}${attributes.karta_mieszkania.url}`}
                                                                alt="Karta mieszkania"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "auto",
                                                                    display: "block",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {attributes.opis && (
                                                    <div
                                                        style={{
                                                            marginBottom:
                                                                "40px",
                                                        }}
                                                    >
                                                        <h3
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                                fontWeight:
                                                                    "600",
                                                                marginBottom:
                                                                    "15px",
                                                                fontFamily:
                                                                    "Poppins, sans-serif",
                                                            }}
                                                        >
                                                            Opis
                                                        </h3>
                                                        <p
                                                            style={{
                                                                color: "#d1d5db",
                                                                lineHeight:
                                                                    "1.6",
                                                                fontSize:
                                                                    "16px",
                                                            }}
                                                        >
                                                            {attributes.opis}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right side - Gallery */}
                                            <div
                                                style={{
                                                    padding: "60px 40px",
                                                    backgroundColor: "white",
                                                }}
                                            >
                                                <h2
                                                    style={{
                                                        fontSize: "32px",
                                                        fontWeight: "600",
                                                        marginBottom: "30px",
                                                        fontFamily:
                                                            "Poppins, sans-serif",
                                                        color: "#232323",
                                                    }}
                                                >
                                                    Galeria
                                                </h2>

                                                {hasImages ? (
                                                    <div
                                                        style={{
                                                            display: "grid",
                                                            gridTemplateColumns:
                                                                "repeat(auto-fit, minmax(200px, 1fr))",
                                                            gap: "20px",
                                                        }}
                                                    >
                                                        {attributes.zdjecia.map(
                                                            (image, index) => (
                                                                <div
                                                                    key={index}
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        borderRadius:
                                                                            "8px",
                                                                        overflow:
                                                                            "hidden",
                                                                        boxShadow:
                                                                            "0 4px 12px rgba(0,0,0,0.1)",
                                                                        transition:
                                                                            "transform 0.3s ease, box-shadow 0.3s ease",
                                                                    }}
                                                                    onClick={() =>
                                                                        openLightbox(
                                                                            index
                                                                        )
                                                                    }
                                                                    onMouseOver={(
                                                                        e
                                                                    ) => {
                                                                        e.currentTarget.style.transform =
                                                                            "scale(1.05)";
                                                                        e.currentTarget.style.boxShadow =
                                                                            "0 8px 24px rgba(0,0,0,0.15)";
                                                                    }}
                                                                    onMouseOut={(
                                                                        e
                                                                    ) => {
                                                                        e.currentTarget.style.transform =
                                                                            "scale(1)";
                                                                        e.currentTarget.style.boxShadow =
                                                                            "0 4px 12px rgba(0,0,0,0.1)";
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`}
                                                                        alt={`Mieszkanie - zdjęcie ${
                                                                            index +
                                                                            1
                                                                        }`}
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "200px",
                                                                            objectFit:
                                                                                "cover",
                                                                            display:
                                                                                "block",
                                                                        }}
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            textAlign: "center",
                                                            padding:
                                                                "60px 20px",
                                                            backgroundColor:
                                                                "#f8f9fa",
                                                            borderRadius: "8px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    "64px",
                                                                marginBottom:
                                                                    "20px",
                                                                color: "#9ca3af",
                                                            }}
                                                        >
                                                            🏠
                                                        </div>
                                                        <p
                                                            style={{
                                                                color: "#6b7280",
                                                                fontSize:
                                                                    "18px",
                                                                marginBottom:
                                                                    "8px",
                                                            }}
                                                        >
                                                            Brak zdjęć dla tego
                                                            mieszkania
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
