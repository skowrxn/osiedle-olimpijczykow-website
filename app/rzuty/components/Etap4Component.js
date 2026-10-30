"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Lightbox from "../../components/Lightbox";

export default function Etap4Component() {
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
            image: "/img/rzuty/rzut-etap4-0.png",
            title: "Kondygnacja 0 (Parter)",
            areas: [
                {
                    coords: [
                        773, 804, 1242, 804, 1242, 846, 1262, 847, 1262, 1178, 1165,
                        1178, 1164, 1135, 1119, 1135, 1118, 1178, 773, 1178, 773, 805
                    ],
                    apartmentNumber: "B.01",
                    title: "Mieszkanie nr. 0.B.01",
                },
                {
                    coords: [
                        941, 453, 1483, 456, 1483, 764, 1455, 764, 1454, 784, 1262, 784,
                        1261, 766, 1233, 766, 1232, 784, 773, 784, 773, 456, 941, 454
                    ],
                    apartmentNumber: "B.02",
                    title: "Mieszkanie nr. 0.B.02",
                },
                {
                    coords: [
                        1526, 453, 2125, 456, 2125, 784, 1503, 784, 1503, 456, 1526, 454
                    ],
                    apartmentNumber: "B.03",
                    title: "Mieszkanie nr. 0.B.03",
                },
                {
                    coords: [
                        1624, 804, 1814, 804, 1815, 823, 1856, 823, 1857, 804, 2125, 804,
                        2125, 1178, 1771, 1178, 1770, 1141, 1723, 1141, 1722, 1178, 1624,
                        1178, 1624, 805
                    ],
                    apartmentNumber: "B.04",
                    title: "Mieszkanie nr. 0.B.04",
                },
                {
                    coords: [
                        1503, 1198, 1637, 1198, 1638, 1240, 1668, 1239, 1668, 1198, 2125,
                        1198, 2125, 1632, 1624, 1632, 1623, 1541, 1503, 1541, 1503, 1427,
                        1533, 1426, 1533, 1383, 1501, 1373, 1503, 1199
                    ],
                    apartmentNumber: "B.05",
                    title: "Mieszkanie nr. 0.B.05",
                },
                {
                    coords: [
                        1294, 1558, 1604, 1561, 1604, 1877, 773, 1877, 773, 1561, 1004,
                        1561, 1005, 1591, 1051, 1591, 1052, 1561, 1293, 1559
                    ],
                    apartmentNumber: "B.06",
                    title: "Mieszkanie nr. 0.B.06",
                },
            ],
        },
        1: {
            image: "/img/rzuty/rzut-etap4-1.png",
            title: "Kondygnacja 1 (Piętro 1)",
            areas: [
                {
                    coords: [
                        1295, 1547, 1605, 1549, 1605, 1866, 774, 1866, 774, 1549, 1002,
                        1549, 1006, 1579, 1053, 1579, 1054, 1549, 1294, 1548
                    ],
                    apartmentNumber: "B.07",
                    title: "Mieszkanie nr. 1.B.07",
                },
                {
                    coords: [
                        691, 1186, 1095, 1186, 1096, 1205, 1144, 1205, 1145, 1186, 1246,
                        1186, 1263, 1203, 1263, 1503, 1217, 1503, 1216, 1529, 774, 1529,
                        774, 1340, 691, 1339, 691, 1187
                    ],
                    apartmentNumber: "B.08",
                    title: "Mieszkanie nr. 1.B.08",
                },
                {
                    coords: [
                        774, 792, 1243, 792, 1243, 834, 1263, 835, 1263, 1166, 1166,
                        1166, 1165, 1124, 1120, 1124, 1119, 1166, 774, 1166, 774, 793
                    ],
                    apartmentNumber: "B.09",
                    title: "Mieszkanie nr. 1.B.09",
                },
                {
                    coords: [
                        942, 441, 1484, 444, 1484, 752, 1456, 752, 1455, 772, 1359, 775,
                        1264, 772, 1263, 754, 1234, 754, 1233, 772, 774, 772, 774, 444,
                        942, 442
                    ],
                    apartmentNumber: "B.10",
                    title: "Mieszkanie nr. 1.B.10",
                },
                {
                    coords: [
                        1539, 441, 2126, 444, 2126, 637, 2216, 638, 2216, 772, 1505, 772,
                        1504, 444, 1539, 442
                    ],
                    apartmentNumber: "B.11",
                    title: "Mieszkanie nr. 1.B.11",
                },
                {
                    coords: [
                        1625, 792, 1815, 792, 1817, 812, 1857, 812, 1858, 792, 2126, 792,
                        2126, 1166, 1772, 1166, 1771, 1130, 1724, 1130, 1723, 1166, 1625,
                        1166, 1625, 793
                    ],
                    apartmentNumber: "B.12",
                    title: "Mieszkanie nr. 1.B.12",
                },
                {
                    coords: [
                        1504, 1186, 1639, 1186, 1640, 1228, 1670, 1227, 1670, 1186, 2126,
                        1186, 2126, 1620, 1625, 1620, 1624, 1529, 1504, 1529, 1504, 1417,
                        1535, 1414, 1535, 1371, 1502, 1361, 1504, 1187
                    ],
                    apartmentNumber: "B.13",
                    title: "Mieszkanie nr. 1.B.13",
                },
            ],
        },
        2: {
            image: "/img/rzuty/rzut-etap4-2.png",
            title: "Kondygnacja 2 (Piętro 2)",
            areas: [
                {
                    coords: [
                        1295, 1562, 1605, 1565, 1605, 1881, 774, 1881, 774, 1565, 1005,
                        1565, 1006, 1595, 1052, 1595, 1053, 1565, 1294, 1563
                    ],
                    apartmentNumber: "B.14",
                    title: "Mieszkanie nr. 2.B.14",
                },
                {
                    coords: [
                        690, 1201, 1094, 1201, 1095, 1221, 1144, 1221, 1145, 1201, 1246,
                        1201, 1263, 1218, 1263, 1518, 1216, 1518, 1215, 1545, 774, 1545,
                        774, 1356, 690, 1355, 690, 1202
                    ],
                    apartmentNumber: "B.15",
                    title: "Mieszkanie nr. 2.B.15",
                },
                {
                    coords: [
                        774, 808, 1243, 808, 1243, 850, 1263, 851, 1263, 1181, 1166,
                        1181, 1165, 1139, 1120, 1139, 1119, 1181, 774, 1181, 774, 809
                    ],
                    apartmentNumber: "B.16",
                    title: "Mieszkanie nr. 2.B.16",
                },
                {
                    coords: [
                        942, 457, 1484, 459, 1484, 768, 1456, 768, 1455, 788, 1263, 788,
                        1262, 769, 1234, 769, 1233, 788, 774, 788, 774, 459, 942, 458
                    ],
                    apartmentNumber: "B.17",
                    title: "Mieszkanie nr. 2.B.17",
                },
                {
                    coords: [
                        1528, 458, 2126, 459, 2126, 652, 2216, 653, 2216, 788, 1504, 788,
                        1504, 459, 1527, 459
                    ],
                    apartmentNumber: "B.18",
                    title: "Mieszkanie nr. 2.B.18",
                },
                {
                    coords: [
                        1625, 808, 1815, 808, 1816, 827, 1857, 827, 1858, 808, 2126, 808,
                        2126, 1181, 1772, 1181, 1771, 1145, 1724, 1145, 1723, 1181, 1625,
                        1181, 1625, 809
                    ],
                    apartmentNumber: "B.19",
                    title: "Mieszkanie nr. 2.B.19",
                },
                {
                    coords: [
                        1504, 1201, 1638, 1201, 1639, 1244, 1669, 1243, 1669, 1201, 2126,
                        1201, 2126, 1636, 1625, 1636, 1624, 1545, 1504, 1545, 1504, 1431,
                        1534, 1430, 1534, 1386, 1502, 1377, 1504, 1202
                    ],
                    apartmentNumber: "B.20",
                    title: "Mieszkanie nr. 2.B.20",
                },
            ],
        },
        3: {
            image: "/img/rzuty/rzut-etap4-3.png",
            title: "Kondygnacja 3 (Piętro 3)",
            areas: [
                {
                    coords: [
                        1389, 1408, 1465, 1411, 1466, 1428, 1484, 1428, 1485, 1562, 1605,
                        1562, 1605, 1836, 1264, 1836, 1254, 1880, 774, 1878, 774, 1562,
                        999, 1562, 1000, 1592, 1035, 1592, 1036, 1543, 1011, 1542, 1011,
                        1411, 1388, 1409
                    ],
                    apartmentNumber: "B.21",
                    title: "Mieszkanie nr. 3.B.21",
                },
                {
                    coords: [
                        832, 805, 1228, 805, 1228, 847, 1263, 848, 1263, 1187, 1246,
                        1188, 1246, 1215, 1263, 1216, 1263, 1391, 992, 1391, 991, 1542,
                        774, 1542, 774, 1199, 832, 1198, 832, 806
                    ],
                    apartmentNumber: "B.22",
                    title: "Mieszkanie nr. 3.B.22",
                },
                {
                    coords: [
                        1294, 454, 1605, 457, 1605, 785, 1494, 785, 1493, 765, 1349, 788,
                        1261, 785, 1260, 767, 1234, 767, 1233, 785, 774, 785, 774, 518,
                        1048, 518, 1049, 457, 1294, 455
                    ],
                    apartmentNumber: "B.23",
                    title: "Mieszkanie nr. 3.B.23",
                },
                {
                    coords: [
                        1691, 454, 2036, 457, 2036, 804, 2126, 805, 2129, 826, 2126,
                        1179, 1773, 1179, 1771, 1143, 1725, 1143, 1724, 1179, 1625, 1179,
                        1625, 460, 1691, 455
                    ],
                    apartmentNumber: "B.24",
                    title: "Mieszkanie nr. 3.B.24",
                },
                {
                    coords: [
                        1504, 1199, 1639, 1199, 1640, 1241, 1670, 1240, 1670, 1199, 2126,
                        1199, 2127, 1585, 1803, 1585, 1802, 1633, 1625, 1633, 1624, 1542,
                        1504, 1542, 1504, 1430, 1534, 1429, 1534, 1384, 1502, 1374, 1504,
                        1200
                    ],
                    apartmentNumber: "B.25",
                    title: "Mieszkanie nr. 3.B.25",
                },
            ],
        },
    };

    const areas = useMemo(
        () => floorData[selectedFloor].areas,
        [selectedFloor],
    );

    // Fetch all etap4 apartments once and build numer → apartment map
    useEffect(() => {
        setIsLoadingData(true);
        fetch("/api/apartments?etap=4")
            .then((r) => r.json())
            .then((list) => {
                const map = {};
                if (Array.isArray(list)) {
                    list.forEach((a) => { map[a.numer] = a; });
                }
                setApartmentData(map);
                setIsLoadingData(false);
            })
            .catch(() => setIsLoadingData(false));
    }, []);

    // Reset hovered area when floor changes
    useEffect(() => {
        setHoveredArea(null);
    }, [selectedFloor]);

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
                    if (apartment?.id) {
                        router.push(`/apartment/${encodeURIComponent(apartment.id)}`);
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
                    Rzuty Kondygnacji - Etap 4
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

                {/* Rzut garażu - Etap 4 */}
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
                        Rzut garażu - Etap 4
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
                            setLightboxImages(["/img/garaz4.png"]);
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
                            src="/img/garaz4.png"
                            alt="Rzut garażu - Etap 4"
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
