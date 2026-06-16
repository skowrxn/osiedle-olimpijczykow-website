"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Lightbox from "../../components/Lightbox";

export default function Etap2Component() {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [hoveredArea, setHoveredArea] = useState(null);
    const [apartmentData, setApartmentData] = useState({});
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const router = useRouter();

    const areas = useMemo(() => [
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
            coords: [2145, 2127, 2148, 3027, 2658, 3034, 2654, 2127],
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
    ], []);

    // Fetch all etap2 apartments at once and build numer → apartment map
    useEffect(() => {
        setIsLoadingData(true);
        fetch("/api/apartments?etap=2")
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

    useEffect(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!canvas || !image) return;

        const ctx = canvas.getContext("2d");

        const scaleCoords = (coords) => {
            const scaleX = canvas.width / image.naturalWidth;
            const scaleY = canvas.height / image.naturalHeight;
            return coords.map((coord, index) =>
                index % 2 === 0 ? coord * scaleX : coord * scaleY
            );
        };

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
                ctx.fillStyle = hoveredArea === index && !area.unavailable
                    ? "rgba(0, 124, 186, 0.4)"
                    : "rgba(0, 124, 186, 0.15)";
                ctx.fill();
            });
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
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
                if (ctx.isPointInPath(x, y)) foundArea = index;
            });

            canvas.style.cursor = foundArea !== null ? "pointer" : "default";
            if (foundArea !== hoveredArea) setHoveredArea(foundArea);
        };

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            for (const area of areas) {
                if (area.coords.length === 0 || area.unavailable) continue;
                const scaledCoords = scaleCoords(area.coords);
                ctx.beginPath();
                ctx.moveTo(scaledCoords[0], scaledCoords[1]);
                for (let i = 2; i < scaledCoords.length; i += 2) {
                    ctx.lineTo(scaledCoords[i], scaledCoords[i + 1]);
                }
                ctx.closePath();
                if (ctx.isPointInPath(x, y)) {
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
            image.onload = updateCanvasSize;
        }

        window.addEventListener("resize", updateCanvasSize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("click", handleClick);
        };
    }, [hoveredArea, apartmentData, areas, router]);

    const hovered = hoveredArea !== null ? areas[hoveredArea] : null;
    const hoveredApt = hovered && !hovered.unavailable
        ? apartmentData[hovered.apartmentNumber]
        : null;

    const statusColor = (s) =>
        s === "DOSTEPNE" ? "#28a745" : s === "REZERWACJA" ? "#ffc107" : "#dc3545";
    const statusLabel = (s) =>
        s === "DOSTEPNE" ? "Dostępne" : s === "REZERWACJA" ? "Rezerwacja" : "Sprzedane";

    return (
        <section style={{ padding: "60px 20px", backgroundColor: "#fff" }}>
            <div className="container mx-auto max-w-[900px]">
                <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "30px", textAlign: "center", fontFamily: "Poppins, sans-serif" }}>
                    Rzut Kondygnacji - Etap 2
                </h2>

                <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
                    <div style={{ maxWidth: "400px", width: "100%" }}>
                        <select
                            value={0}
                            disabled
                            style={{ width: "100%", padding: "18px 24px", border: "2px solid #e0e0e0", borderRadius: "12px", backgroundColor: "#f9f9f9", color: "#333", fontSize: "16px", fontWeight: "500", appearance: "none", outline: "none", fontFamily: "Poppins, sans-serif", cursor: "not-allowed", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                        >
                            <option value={0}>Kondygnacja 0 (Parter)</option>
                        </select>
                    </div>
                </div>

                <div style={{ position: "relative", width: "100%", maxWidth: "900px", margin: "0 auto" }}>
                    <Image
                        ref={imageRef}
                        src="/img/rzuty/rzut-etap2-0.png"
                        alt="Rzut kondygnacji"
                        width={900}
                        height={600}
                        style={{ display: "block", width: "100%", height: "auto" }}
                        unoptimized
                    />
                    <canvas
                        ref={canvasRef}
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    />

                    {hovered && (
                        <div style={{ position: "fixed", left: `${tooltipPosition.x + 15}px`, top: `${tooltipPosition.y + 15}px`, backgroundColor: "#2d2d2d", color: "white", padding: "12px 16px", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", fontFamily: "Poppins, sans-serif", fontSize: "13px", pointerEvents: "none", zIndex: 1000, minWidth: "160px" }}>
                            {hovered.unavailable ? (
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#999" }} />
                                    <span>Niedostępne</span>
                                </div>
                            ) : isLoadingData || !hoveredApt ? (
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                                    <span>Ładowanie…</span>
                                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                                </div>
                            ) : (
                                <>
                                    <div style={{ fontWeight: "600", marginBottom: "8px", fontSize: "14px" }}>
                                        Mieszkanie {hovered.apartmentNumber}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: statusColor(hoveredApt.dostepnosc) }} />
                                        <span>{statusLabel(hoveredApt.dostepnosc)}</span>
                                    </div>
                                    {hoveredApt.cena > 0 && (
                                        <div style={{ fontSize: "15px", fontWeight: "600", marginTop: "6px" }}>
                                            {new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", minimumFractionDigits: 0 }).format(hoveredApt.cena)}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div style={{ marginTop: "60px", padding: "30px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
                    <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px", fontFamily: "Poppins, sans-serif", color: "#333", textAlign: "center" }}>
                        Rzut garażu - Etap 2
                    </h3>
                    <div
                        style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", border: "1px solid #e0e0e0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", cursor: "pointer", transition: "all 0.3s ease" }}
                        onClick={() => { setLightboxImages(["/img/garaz2.png"]); setLightboxOpen(true); }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; }}
                    >
                        <Image src="/img/garaz2.png" alt="Rzut garażu - Etap 2" width={900} height={600} style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }} unoptimized />
                    </div>
                </div>
            </div>

            <Lightbox images={lightboxImages} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} currentIndex={0} />
        </section>
    );
}
