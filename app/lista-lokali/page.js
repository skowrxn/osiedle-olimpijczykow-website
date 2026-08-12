"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ApartmentListCompact from "../components/ApartmentListCompact";
import PropertySearch from "../components/PropertySearch";
import StageCard from "../components/StageCard";

function ListaLokaliContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchFilters, setSearchFilters] = useState({
        rooms: "",
        area: "",
        floor: "",
        stage: "",
    });

    // Wczytaj parametry z URL przy inicjalizacji
    useEffect(() => {
        const rooms = searchParams.get("rooms") || "";
        const area = searchParams.get("area") || "";
        const floor = searchParams.get("floor") || "";
        const stage = searchParams.get("stage") || "";

        setSearchFilters({
            rooms,
            area,
            floor,
            stage,
        });
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchFilters.rooms) params.set("rooms", searchFilters.rooms);
        if (searchFilters.area) params.set("area", searchFilters.area);
        if (searchFilters.floor) params.set("floor", searchFilters.floor);
        if (searchFilters.stage) params.set("stage", searchFilters.stage);

        const queryString = params.toString();
        const newUrl = queryString
            ? `/lista-lokali?${queryString}`
            : `/lista-lokali`;

        // Aktualizuj URL bez przekierowania na inną stronę
        router.push(newUrl, { scroll: false });
    };

    return (
        <div className="home wp-singular page-template elementor-default elementor-page">
            <main id="main" className="site-main">
                <div>
                    {/* filters */}
                    <section
                        className="lista-lokali-section"
                        style={{
                            padding: 0,
                        }}
                    >
                        <div className="elementor-container">
                            <div className="elementor-column elementor-col-100">
                                <div className="elementor-widget-wrap elementor-element-populated">
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
                                            gridTemplateColumns:
                                                "repeat(auto-fit, minmax(500px, 1fr))",
                                            gap: "40px",
                                            maxWidth: "1200px",
                                            margin: "0 auto",
                                        }}
                                    >
                                        <StageCard
                                            imageSrc="/img/etap-2.jpg"
                                            title="Mieszkania - Etap 2"
                                            soldOut
                                        />

                                        <StageCard
                                            imageSrc="/img/etap-3.jpg"
                                            href="/etap3"
                                            desc="Mieszkania w budowie"
                                            title="Mieszkania - Etap 3"
                                        />
                                    </div>
                                </div>
                                <div className="mt-12 py-4 results-search">
                                    <PropertySearch
                                        stayOnPage={true}
                                        showStage={false}
                                    ></PropertySearch>
                                </div>
                                <div className="mt-6 bg-white mb-24 results-wrapper">
                                    <ApartmentListCompact
                                        showSearch={true}
                                        limit={50}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default function ListaLokali() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ListaLokaliContent />
        </Suspense>
    );
}
