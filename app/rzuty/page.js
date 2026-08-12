"use client";

import { useState } from "react";
import Etap3Component from "./components/Etap3Component";
import StageCard from "../components/StageCard";

export default function RzutyPage() {
    const [selectedStage, setSelectedStage] = useState(null);

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
                <StageCard
                    imageSrc="/img/etap-2.jpg"
                    title="Rzuty kondygnacji - Etap 2"
                    soldOut
                />

                <StageCard
                    imageSrc="/img/etap-3.jpg"
                    onClick={() => setSelectedStage("etap3")}
                    desc="Mieszkania w budowie"
                    title="Rzuty kondygnacji - Etap 3"
                />
            </div>

            {/* Render selected stage component */}
            {selectedStage === "etap3" && (
                <div style={{ marginTop: "60px" }}>
                    <Etap3Component />
                </div>
            )}
        </div>
    );
}
