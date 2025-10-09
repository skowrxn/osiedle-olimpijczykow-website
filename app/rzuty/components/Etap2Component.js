"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "../../lib/strapi";

export default function Etap2Component() {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [hoveredArea, setHoveredArea] = useState(null);
    const [apartmentData, setApartmentData] = useState({});
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const router = useRouter();

    const areas = [
        {
            coords: [
                2460, 460, 2457, 835, 2658, 838, 2658, 763, 3138, 759, 3138,
                463, 2832, 462,
            ],
            apartmentNumber: "B0.2",
            title: "Mieszkanie nr. B0.2",
        },
        {
            coords: [
                2099, 1712, 2099, 1913, 2148, 1916, 2148, 1985, 2165, 1985,
                2165, 2064, 2142, 2064, 2148, 2113, 2658, 2113, 2658, 1712,
            ],
            apartmentNumber: "C0.4",
            title: "Mieszkanie nr. C0.4",
        },
        // Unavailable areas
        {
            coords: [1379, 454, 606, 447, 597, 108, 1372, 112],
            unavailable: true,
            title: "Niedostępne",
        },
        {
            coords: [610, 726, 606, 1213, 1701, 1210, 1695, 726],
            unavailable: true,
            title: "Niedostępne",
        },
        {
            coords: [1737, 463, 1737, 835, 2086, 835, 2086, 463],
            unavailable: true,
            title: "Niedostępne",
        },
        {
            coords: [
                2674, 779, 2671, 1114, 2102, 1108, 2096, 1900, 2142, 1919, 2148,
                3027, 2658, 3034, 2658, 1349, 3134, 1351, 3131, 772,
            ],
            unavailable: true,
            title: "Niedostępne",
        },
        {
            coords: [
                1415, 1929, 1422, 3034, 1780, 3034, 1780, 2850, 1872, 2846,
                1869, 1929,
            ],
            unavailable: true,
            title: "Niedostępne",
        },
    ];

    // Fetch apartment data by number
    const getApartmentDataByNumber = async (apartmentNumber) => {
        try {
            const response = await fetch(
                buildApiUrl("apartments", {
                    "filters[numer][$eq]": apartmentNumber,
                    "filters[etap][$eq]": "etap2",
                })
            );
            const data = await response.json();
            if (data.data && data.data.length > 0) {
                return data.data[0];
            }
            return null;
        } catch (err) {
            console.error("Error fetching apartment:", err);
            return null;
        }
    };

    // Preload apartment data for all areas
    useEffect(() => {
        const loadApartmentData = async () => {
            const data = {};
            for (const area of areas) {
                if (!area.unavailable) {
                    const apartment = await getApartmentDataByNumber(
                        area.apartmentNumber
                    );
                    if (apartment) {
                        data[area.apartmentNumber] = apartment;
                    }
                }
            }
            setApartmentData(data);
        };
        loadApartmentData();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!canvas || !image) return;

        const ctx = canvas.getContext("2d");

        // Original image dimensions (from image-map.net)
        const originalWidth = image.naturalWidth;
        const originalHeight = image.naturalHeight;

        // Scale coordinates based on displayed image size
        const scaleCoords = (coords) => {
            const scaleX = canvas.width / originalWidth;
            const scaleY = canvas.height / originalHeight;
            return coords.map((coord, index) =>
                index % 2 === 0 ? coord * scaleX : coord * scaleY
            );
        };

        // Set canvas size to match image
        const updateCanvasSize = () => {
            canvas.width = image.offsetWidth;
            canvas.height = image.offsetHeight;
            drawAreas();
        };

        const drawAreas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            areas.forEach((area, index) => {
                if (area.coords.length === 0) return;

                const scaledCoords = scaleCoords(area.coords);

                ctx.beginPath();
                ctx.moveTo(scaledCoords[0], scaledCoords[1]);
                for (let i = 2; i < scaledCoords.length; i += 2) {
                    ctx.lineTo(scaledCoords[i], scaledCoords[i + 1]);
                }
                ctx.closePath();

                // Subtle color overlay - visible on normal, stronger on hover (only for available apartments)
                if (hoveredArea === index && !area.unavailable) {
                    ctx.fillStyle = "rgba(0, 124, 186, 0.4)"; // Stronger blue on hover
                } else {
                    ctx.fillStyle = "rgba(0, 124, 186, 0.15)"; // Subtle blue overlay - visible but not too strong
                }
                ctx.fill();
            });
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update tooltip position (global coordinates for absolute positioning)
            setTooltipPosition({ x: e.clientX, y: e.clientY });

            let foundArea = null;
            areas.forEach((area, index) => {
                if (area.coords.length === 0) return;

                const scaledCoords = scaleCoords(area.coords);

                ctx.beginPath();
                ctx.moveTo(scaledCoords[0], scaledCoords[1]);
                for (let i = 2; i < scaledCoords.length; i += 2) {
                    ctx.lineTo(scaledCoords[i], scaledCoords[i + 1]);
                }
                ctx.closePath();

                if (ctx.isPointInPath(x, y)) {
                    foundArea = index;
                    canvas.style.cursor = "pointer";
                }
            });

            if (foundArea === null) {
                canvas.style.cursor = "default";
            }

            if (foundArea !== hoveredArea) {
                setHoveredArea(foundArea);
            }
        };

        const handleClick = async (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            for (const area of areas) {
                if (area.coords.length === 0) continue;

                const scaledCoords = scaleCoords(area.coords);

                ctx.beginPath();
                ctx.moveTo(scaledCoords[0], scaledCoords[1]);
                for (let i = 2; i < scaledCoords.length; i += 2) {
                    ctx.lineTo(scaledCoords[i], scaledCoords[i + 1]);
                }
                ctx.closePath();

                if (ctx.isPointInPath(x, y)) {
                    // Skip click action for unavailable areas
                    if (area.unavailable) {
                        break;
                    }

                    const apartment = apartmentData[area.apartmentNumber];
                    if (apartment && apartment.documentId) {
                        router.push(`/apartment/${apartment.documentId}`);
                    } else {
                        alert(
                            `Nie znaleziono mieszkania ${area.apartmentNumber}`
                        );
                    }
                    break;
                }
            }
        };

        if (image.complete && image.naturalWidth > 0) {
            updateCanvasSize();
        } else {
            image.onload = () => {
                updateCanvasSize();
            };
        }

        window.addEventListener("resize", updateCanvasSize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("click", handleClick);
        };
    }, [hoveredArea, areas]);

    return (
        <section style={{ padding: "60px 20px", backgroundColor: "#fff" }}>
            <div className="container mx-auto max-w-[900px]">
                <h2
                    style={{
                        fontSize: "32px",
                        fontWeight: "700",
                        marginBottom: "30px",
                        textAlign: "center",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    Rzut Kondygnacji - Etap 2
                </h2>

                {/* Floor selector (tylko Kondygnacja 0) */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "40px",
                    }}
                >
                    <div style={{ maxWidth: "400px", width: "100%" }}>
                        <select
                            value={0}
                            disabled
                            style={{
                                width: "100%",
                                padding: "18px 24px",
                                border: "2px solid #e0e0e0",
                                borderRadius: "12px",
                                backgroundColor: "#f9f9f9",
                                color: "#333",
                                fontSize: "16px",
                                fontWeight: "500",
                                appearance: "none",
                                backgroundImage:
                                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path d="M7 10L2 5h10z" fill="%23666"/></svg>\')',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 20px center",
                                outline: "none",
                                fontFamily: "Poppins, sans-serif",
                                cursor: "not-allowed",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            }}
                        >
                            <option value={0}>Kondygnacja 0 (Parter)</option>
                        </select>
                    </div>
                </div>

                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "900px",
                        margin: "0 auto",
                    }}
                >
                    <img
                        ref={imageRef}
                        src="/img/rzuty/rzut-etap2-0.png"
                        alt="Rzut kondygnacji etap 2"
                        style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                        }}
                    />
                    <canvas
                        ref={canvasRef}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        }}
                    />

                    {/* Tooltip nad kursorem */}
                    {hoveredArea !== null &&
                        (areas[hoveredArea].unavailable ? (
                            // Uproszczony tooltip dla niedostępnych
                            <div
                                style={{
                                    position: "fixed",
                                    left: `${tooltipPosition.x + 15}px`,
                                    top: `${tooltipPosition.y + 15}px`,
                                    backgroundColor: "#2d2d2d",
                                    color: "white",
                                    padding: "10px 14px",
                                    borderRadius: "6px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "13px",
                                    pointerEvents: "none",
                                    zIndex: 1000,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            backgroundColor: "#999",
                                        }}
                                    ></div>
                                    <span>{areas[hoveredArea].title}</span>
                                </div>
                            </div>
                        ) : (
                            apartmentData[
                                areas[hoveredArea].apartmentNumber
                            ] && (
                                // Pełny tooltip dla dostępnych mieszkań
                                <div
                                    style={{
                                        position: "fixed",
                                        left: `${tooltipPosition.x + 15}px`,
                                        top: `${tooltipPosition.y + 15}px`,
                                        backgroundColor: "#2d2d2d",
                                        color: "white",
                                        padding: "12px 16px",
                                        borderRadius: "6px",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                        fontFamily: "Poppins, sans-serif",
                                        fontSize: "13px",
                                        pointerEvents: "none",
                                        zIndex: 1000,
                                        minWidth: "180px",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Mieszkanie nr.{" "}
                                        {areas[hoveredArea].apartmentNumber}
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            marginBottom: "4px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "8px",
                                                height: "8px",
                                                borderRadius: "50%",
                                                backgroundColor:
                                                    apartmentData[
                                                        areas[hoveredArea]
                                                            .apartmentNumber
                                                    ].dostepnosc === "DOSTEPNE"
                                                        ? "#28a745"
                                                        : apartmentData[
                                                              areas[hoveredArea]
                                                                  .apartmentNumber
                                                          ].dostepnosc ===
                                                          "REZERWACJA"
                                                        ? "#ffc107"
                                                        : "#dc3545",
                                            }}
                                        ></div>
                                        <span style={{ fontSize: "12px" }}>
                                            {apartmentData[
                                                areas[hoveredArea]
                                                    .apartmentNumber
                                            ].dostepnosc === "DOSTEPNE"
                                                ? "Dostępne"
                                                : apartmentData[
                                                      areas[hoveredArea]
                                                          .apartmentNumber
                                                  ].dostepnosc === "REZERWACJA"
                                                ? "Rezerwacja"
                                                : "Sprzedane"}
                                        </span>
                                    </div>
                                    {apartmentData[
                                        areas[hoveredArea].apartmentNumber
                                    ].cena > 0 && (
                                        <div
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "600",
                                                marginTop: "6px",
                                            }}
                                        >
                                            {new Intl.NumberFormat("pl-PL", {
                                                style: "currency",
                                                currency: "PLN",
                                                minimumFractionDigits: 0,
                                            }).format(
                                                apartmentData[
                                                    areas[hoveredArea]
                                                        .apartmentNumber
                                                ].cena
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                </div>
            </div>
        </section>
    );
}
