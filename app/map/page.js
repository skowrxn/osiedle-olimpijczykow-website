"use client";
import { useRef, useEffect, useState } from "react";

export default function Map() {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [hoveredArea, setHoveredArea] = useState(null);

    const areas = [
        {
            coords: [193, 775, 198, 969, 396, 970, 393, 777, 303, 773],
            name: "TOALETA",
            title: "Toaleta",
        },
        {
            coords: [
                410, 670, 404, 966, 1026, 967, 1018, 566, 684, 560, 587, 560,
                596, 643, 537, 642, 537, 668,
            ],
            name: "SALON",
            title: "Salon",
        },
    ];

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

                // Yellow fill - darker on hover
                if (hoveredArea === index) {
                    ctx.fillStyle = "rgba(255, 200, 0, 0.5)"; // Darker yellow on hover
                } else {
                    ctx.fillStyle = "rgba(255, 255, 0, 0.4)"; // Normal yellow
                }
                ctx.fill();

                // Optional: stroke for visibility
                ctx.strokeStyle = "rgba(255, 200, 0, 0.8)";
                ctx.lineWidth = 2;
                ctx.stroke();
            });
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

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

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            areas.forEach((area) => {
                if (area.coords.length === 0) return;

                const scaledCoords = scaleCoords(area.coords);

                ctx.beginPath();
                ctx.moveTo(scaledCoords[0], scaledCoords[1]);
                for (let i = 2; i < scaledCoords.length; i += 2) {
                    ctx.lineTo(scaledCoords[i], scaledCoords[i + 1]);
                }
                ctx.closePath();

                if (ctx.isPointInPath(x, y)) {
                    alert(`Kliknięto: ${area.title}`);
                }
            });
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
    }, [hoveredArea]);

    return (
        <div className="home wp-singular page-template">
            <main id="main" className="site-main">
                <section
                    style={{ padding: "60px 20px", backgroundColor: "#fff" }}
                >
                    <div className="container mx-auto max-w-[1200px]">
                        <h1
                            style={{
                                fontSize: "36px",
                                fontWeight: "700",
                                marginBottom: "30px",
                                textAlign: "center",
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            Mapa Mieszkania
                        </h1>
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                maxWidth: "1200px",
                                margin: "0 auto",
                            }}
                        >
                            <img
                                ref={imageRef}
                                src="/img/image.jpg"
                                alt="Mapa mieszkania"
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
                        </div>
                        {/* {hoveredArea !== null && (
                            <div
                                style={{
                                    marginTop: "20px",
                                    padding: "15px",
                                    backgroundColor: "#fffbea",
                                    border: "2px solid #ffc800",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                }}
                            >
                                {areas[hoveredArea].title}
                            </div>
                        )} */}
                    </div>
                </section>
            </main>
        </div>
    );
}
