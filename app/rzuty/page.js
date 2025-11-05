"use client";

import { useState } from "react";
import Etap2Component from "./components/Etap2Component";
import Etap3Component from "./components/Etap3Component";

export default function RzutyPage() {
    const [selectedStage, setSelectedStage] = useState(null);

    const FloorPlan = ({
        imageSrc,
        desc,
        onClick,
        title,
        stage,
        isGrayedOut = false,
    }) => (
        <div
            className={`relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-103 ${
                onClick ? "cursor-pointer" : ""
            }`}
            onClick={onClick}
        >
            <img
                src={imageSrc}
                alt={title}
                style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    filter: isGrayedOut ? "grayscale(100%)" : "none",
                    opacity: isGrayedOut ? "0.6" : "1",
                }}
                onError={(e) => {
                    console.log(`Error loading image: ${imageSrc}`);
                    e.target.style.backgroundColor = "#f0f0f0";
                    e.target.alt = "Błąd ładowania zdjęcia";
                }}
                onLoad={(e) => {
                    console.log(`Image loaded successfully: ${imageSrc}`);
                }}
            />

            {/* Tytuł na dole bez overlay */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                <div className="w-full p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                    <span className="text-white text-2xl font-bold mb-2">
                        {title}
                    </span>
                    <p
                        className={
                            isGrayedOut
                                ? "text-gray-400 text-md"
                                : "text-neutral-200 text-md"
                        }
                    >
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="pb-16">
            <div
                style={{
                    textAlign: "center",
                    marginBottom: "60px",
                }}
            ></div>

            <div
                className="etapy-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                    gap: "40px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <FloorPlan
                    imageSrc="/img/etap-2.jpg"
                    onClick={() => setSelectedStage("etap2")}
                    desc="Etap zakończony - mieszkania gotowe do odbioru"
                    title="Rzuty kondygnacji - Etap 2"
                    stage="etap2"
                />

                <FloorPlan
                    imageSrc="/img/etap-3.jpg"
                    onClick={null}
                    desc="Sprzedaż już wkrótce"
                    title="Rzuty kondygnacji - Etap 3"
                    stage="etap3"
                    isGrayedOut={true}
                />
            </div>

            {/* Render selected stage component */}
            {selectedStage === "etap2" && (
                <div style={{ marginTop: "60px" }}>
                    <Etap2Component />
                </div>
            )}

            {selectedStage === "etap3" && (
                <div style={{ marginTop: "60px" }}>
                    <Etap3Component />
                </div>
            )}
        </div>
    );
}
