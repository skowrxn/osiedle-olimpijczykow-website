"use client";

import { useState } from "react";
import Etap3Component from "./components/Etap3Component";
import Etap4Component from "./components/Etap4Component";
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
                    gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
                    gap: "40px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <StageCard
                    imageSrc="/img/etap-3.jpg"
                    onClick={() => setSelectedStage("etap3")}
                    desc="Mieszkania do odbioru jesienią 2027"
                    title="Rzuty kondygnacji - Etap 3"
                />

                <StageCard
                    imageSrc="/img/etap-4.jpg"
                    onClick={() => setSelectedStage("etap4")}
                    desc="Mieszkania do odbioru wiosną 2029"
                    title="Rzuty kondygnacji - Etap 4"
                />
            </div>

            {/* Render selected stage component */}
            {selectedStage === "etap3" && (
                <div style={{ marginTop: "60px" }}>
                    <Etap3Component />
                </div>
            )}

            {selectedStage === "etap4" && (
                <div style={{ marginTop: "60px" }}>
                    <Etap4Component />
                </div>
            )}
        </div>
    );
}
