"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { buildApiUrl } from "../../lib/strapi";
import Lightbox from "../../components/Lightbox";

export default function Etap3Component() {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [hoveredArea, setHoveredArea] = useState(null);
    const [apartmentData, setApartmentData] = useState({});
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [selectedFloor, setSelectedFloor] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const router = useRouter();

    const floorData = {
        0: {
            image: "/img/rzuty/rzut-etap3-0.png",
            title: "Kondygnacja 0 (Parter)",
            areas: [
                {
                    coords: [1423, 1724, 1420, 2058, 2115, 2058, 2115, 1724],
                    apartmentNumber: "0.1",
                    title: "Mieszkanie nr. 0.1",
                },
                {
                    coords: [
                        1592, 1389, 1592, 1630, 1613, 1632, 1615, 1704, 2115,
                        1704, 2117, 1391,
                    ],
                    apartmentNumber: "0.2",
                    title: "Mieszkanie nr. 0.2",
                },
                {
                    coords: [1592, 1021, 1592, 1370, 2113, 1370, 2115, 1021],
                    apartmentNumber: "0.3",
                    title: "Mieszkanie nr. 0.3",
                },
                {
                    coords: [1590, 653, 1590, 1000, 2115, 1005, 2115, 650],
                    apartmentNumber: "0.4",
                    title: "Mieszkanie nr. 0.4",
                },
                {
                    coords: [1478, 175, 1478, 633, 2115, 633, 2115, 172],
                    apartmentNumber: "0.5",
                    title: "Mieszkanie nr. 0.5",
                },
                {
                    coords: [791, 174, 791, 718, 1460, 722, 1460, 174],
                    apartmentNumber: "0.6",
                    title: "Mieszkanie nr. 0.6",
                },
                {
                    coords: [
                        791, 738, 793, 1088, 1314, 1088, 1314, 1067, 1349, 1067,
                        1349, 738,
                    ],
                    apartmentNumber: "0.7",
                    title: "Mieszkanie nr. 0.7",
                },
                {
                    coords: [
                        791, 1105, 793, 1205, 409, 1207, 409, 1703, 969, 1705,
                        971, 1105, 953, 1105,
                    ],
                    apartmentNumber: "0.8",
                    title: "Mieszkanie nr. 0.8",
                },
            ],
        },
        1: {
            image: "/img/rzuty/rzut-etap3-1.png",
            title: "Kondygnacja 1 (Piętro 1)",
            areas: [
                {
                    coords: [1401, 1657, 1404, 1979, 2068, 1976, 2066, 1657],
                    apartmentNumber: "1.9",
                    title: "Mieszkanie nr. 1.9",
                },
                {
                    coords: [
                        1563, 1335, 1566, 1569, 1589, 1569, 1589, 1643, 2066,
                        1643, 2066, 1338,
                    ],
                    apartmentNumber: "1.10",
                    title: "Mieszkanie nr. 1.10",
                },
                {
                    coords: [
                        1563, 981, 1566, 1321, 2068, 1321, 2066, 1132, 2154,
                        1134, 2154, 986,
                    ],
                    apartmentNumber: "1.11",
                    title: "Mieszkanie nr. 1.11",
                },
                {
                    coords: [1563, 629, 1566, 965, 2066, 967, 2066, 629],
                    apartmentNumber: "1.12",
                    title: "Mieszkanie nr. 1.12",
                },
                {
                    coords: [2066, 171, 2066, 611, 1459, 613, 1457, 171],
                    apartmentNumber: "1.13",
                    title: "Mieszkanie nr. 1.13",
                },
                {
                    coords: [1443, 174, 1441, 697, 800, 697, 800, 171],
                    apartmentNumber: "1.14",
                    title: "Mieszkanie nr. 1.14",
                },
                {
                    coords: [800, 715, 800, 1046, 1332, 1048, 1330, 715],
                    apartmentNumber: "1.15",
                    title: "Mieszkanie nr. 1.15",
                },
                {
                    coords: [
                        969, 1067, 971, 1641, 432, 1641, 434, 1462, 346, 1462,
                        346, 1338, 432, 1333, 429, 1164, 804, 1162, 797, 1067,
                    ],
                    apartmentNumber: "1.16",
                    title: "Mieszkanie nr. 1.16",
                },
                {
                    coords: [985, 1340, 1443, 1340, 1443, 1641, 985, 1641],
                    apartmentNumber: "1.17",
                    title: "Mieszkanie nr. 1.17",
                },
            ],
        },
        2: {
            image: "/img/rzuty/rzut-etap3-2.png",
            title: "Kondygnacja 2 (Piętro 2)",
            areas: [
                {
                    coords: [1401, 1657, 1404, 1979, 2068, 1976, 2066, 1657],
                    apartmentNumber: "2.18",
                    title: "Mieszkanie nr. 2.18",
                },
                {
                    coords: [
                        1563, 1335, 1566, 1569, 1589, 1569, 1589, 1643, 2066,
                        1643, 2066, 1338,
                    ],
                    apartmentNumber: "2.19",
                    title: "Mieszkanie nr. 2.19",
                },
                {
                    coords: [
                        1563, 981, 1566, 1321, 2068, 1321, 2066, 1132, 2154,
                        1134, 2154, 986,
                    ],
                    apartmentNumber: "2.20",
                    title: "Mieszkanie nr. 2.20",
                },
                {
                    coords: [1563, 629, 1566, 965, 2066, 967, 2066, 629],
                    apartmentNumber: "2.21",
                    title: "Mieszkanie nr. 2.21",
                },
                {
                    coords: [2066, 171, 2066, 611, 1459, 613, 1457, 171],
                    apartmentNumber: "2.22",
                    title: "Mieszkanie nr. 2.22",
                },
                {
                    coords: [1443, 174, 1441, 697, 800, 697, 800, 171],
                    apartmentNumber: "2.23",
                    title: "Mieszkanie nr. 2.23",
                },
                {
                    coords: [800, 715, 800, 1046, 1332, 1048, 1330, 715],
                    apartmentNumber: "2.24",
                    title: "Mieszkanie nr. 2.24",
                },
                {
                    coords: [
                        969, 1067, 971, 1641, 432, 1641, 434, 1462, 346, 1462,
                        346, 1338, 432, 1333, 429, 1164, 804, 1162, 797, 1067,
                    ],
                    apartmentNumber: "2.26",
                    title: "Mieszkanie nr. 2.26",
                },
                {
                    coords: [985, 1340, 1443, 1340, 1443, 1641, 985, 1641],
                    apartmentNumber: "2.25",
                    title: "Mieszkanie nr. 2.25",
                },
            ],
        },
        3: {
            image: "/img/rzuty/rzut-etap3-3.png",
            title: "Kondygnacja 3 (Piętro 3)",
            areas: [
                {
                    coords: [
                        1415, 1688, 1417, 2021, 1810, 2023, 1812, 1961, 2108,
                        1961, 2108, 1686, 2108, 1353, 1473, 1351, 1473, 1684,
                    ],
                    apartmentNumber: "3.27",
                    title: "Mieszkanie nr. 3.27",
                },
                {
                    coords: [1584, 983, 2108, 983, 2108, 1336, 1584, 1336],
                    apartmentNumber: "3.28",
                    title: "Mieszkanie nr. 3.28",
                },
                {
                    coords: [
                        1470, 135, 1473, 599, 1584, 597, 1584, 967, 2108, 967,
                        2108, 403, 1988, 403, 1988, 137,
                    ],
                    apartmentNumber: "3.29",
                    title: "Mieszkanie nr. 3.29",
                },
                {
                    coords: [
                        1309, 1052, 782, 1050, 782, 403, 930, 405, 932, 137,
                        1452, 135, 1456, 685, 1339, 687, 1339, 1031, 1309, 1031,
                    ],
                    apartmentNumber: "3.30",
                    title: "Mieszkanie nr. 3.30",
                },
                {
                    coords: [
                        784, 1068, 784, 1168, 403, 1172, 401, 1332, 461, 1336,
                        465, 1669, 1456, 1669, 1454, 1352, 964, 1352, 964, 1068,
                    ],
                    apartmentNumber: "3.31",
                    title: "Mieszkanie nr. 3.31",
                },
            ],
        },
    };

    const areas = useMemo(
        () => floorData[selectedFloor].areas,
        [selectedFloor],
    );

    // Fetch apartment data by number
    const getApartmentDataByNumber = async (apartmentNumber) => {
        try {
            const response = await fetch(
                buildApiUrl("apartments", {
                    "filters[numer][$eq]": apartmentNumber,
                    "filters[etap][$eq]": "etap3",
                }),
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

    // Preload apartment data for all areas when floor changes
    useEffect(() => {
        // Reset hovered area when floor changes
        setHoveredArea(null);

        const loadApartmentData = async () => {
            setIsLoadingData(true);
            const data = {};
            for (const area of areas) {
                if (!area.unavailable) {
                    const apartment = await getApartmentDataByNumber(
                        area.apartmentNumber,
                    );
                    if (apartment) {
                        data[area.apartmentNumber] = apartment;
                    }
                }
            }
            setApartmentData(data);
            setIsLoadingData(false);
        };
        loadApartmentData();
    }, [selectedFloor, areas]);

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
                index % 2 === 0 ? coord * scaleX : coord * scaleY,
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
                            `Nie znaleziono mieszkania ${area.apartmentNumber}`,
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
    }, [hoveredArea, selectedFloor, areas, apartmentData, router]);

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
                    Rzuty Kondygnacji - Etap 3
                </h2>

                {/* Floor selector */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "40px",
                    }}
                >
                    <div style={{ maxWidth: "400px", width: "100%" }}>
                        <select
                            value={selectedFloor}
                            onChange={(e) =>
                                setSelectedFloor(parseInt(e.target.value))
                            }
                            style={{
                                width: "100%",
                                padding: "18px 24px",
                                border: "2px solid #e0e0e0",
                                borderRadius: "12px",
                                backgroundColor: "#ffffff",
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
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.borderColor = "#333";
                                e.target.style.boxShadow =
                                    "0 4px 12px rgba(0,0,0,0.1)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.borderColor = "#e0e0e0";
                                e.target.style.boxShadow =
                                    "0 2px 8px rgba(0,0,0,0.05)";
                            }}
                        >
                            {Object.keys(floorData).map((floor) => (
                                <option key={floor} value={floor}>
                                    {floorData[floor].title}
                                </option>
                            ))}
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
                    <Image
                        ref={imageRef}
                        src={floorData[selectedFloor].image}
                        alt={`Rzut kondygnacji ${floorData[selectedFloor].title}`}
                        width={900}
                        height={600}
                        style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                        }}
                        unoptimized
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

                    {/* Tooltip */}
                    {hoveredArea !== null &&
                        areas[hoveredArea] &&
                        (areas[hoveredArea].unavailable ? (
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
                        ) : isLoadingData ||
                          !apartmentData[areas[hoveredArea].apartmentNumber] ? (
                            // Loading spinner gdy dane się ładują
                            <div
                                style={{
                                    position: "fixed",
                                    left: `${tooltipPosition.x + 15}px`,
                                    top: `${tooltipPosition.y + 15}px`,
                                    backgroundColor: "#2d2d2d",
                                    color: "white",
                                    padding: "20px",
                                    borderRadius: "6px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                    fontFamily: "Poppins, sans-serif",
                                    pointerEvents: "none",
                                    zIndex: 1000,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        border: "3px solid rgba(255,255,255,0.3)",
                                        borderTop: "3px solid white",
                                        borderRadius: "50%",
                                        animation: "spin 0.8s linear infinite",
                                    }}
                                ></div>
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
                        ) : (
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
                                            areas[hoveredArea].apartmentNumber
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
                                            ].cena,
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>

                {/* Rzut garażu - Etap 3 */}
                <div
                    style={{
                        marginTop: "60px",
                        padding: "30px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "24px",
                            fontWeight: "600",
                            marginBottom: "20px",
                            fontFamily: "Poppins, sans-serif",
                            color: "#333",
                            textAlign: "center",
                        }}
                    >
                        Rzut garażu - Etap 3
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
                        onClick={() => {
                            setLightboxImages(["/img/garaz3.png"]);
                            setLightboxOpen(true);
                        }}
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
                        <Image
                            src="/img/garaz3.png"
                            alt="Rzut garażu - Etap 3"
                            width={900}
                            height={600}
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                            unoptimized
                        />
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                images={lightboxImages}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                currentIndex={0}
            />
        </section>
    );
}
