"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ApartmentListCompact from "../components/ApartmentListCompact";
import ApartmentSearch from "../components/ApartmentSearch";
import PropertySearch from "../components/PropertySearch";

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

    // Konfigurowalne obszary dla każdego budynku
    const buildingAreas = {
        etap2: [
            {
                id: 1,
                x: 20,
                y: 30,
                width: 25,
                height: 15,
                title: "Mieszkania 1-10",
            },
            {
                id: 2,
                x: 55,
                y: 25,
                width: 20,
                height: 20,
                title: "Mieszkania 11-20",
            },
            {
                id: 3,
                x: 30,
                y: 60,
                width: 30,
                height: 12,
                title: "Mieszkania 21-30",
            },
        ],
        etap3: [
            {
                id: 1,
                x: 15,
                y: 20,
                width: 22,
                height: 18,
                title: "Apartamenty A",
            },
            {
                id: 2,
                x: 45,
                y: 15,
                width: 25,
                height: 25,
                title: "Apartamenty B",
            },
            {
                id: 3,
                x: 25,
                y: 55,
                width: 35,
                height: 15,
                title: "Apartamenty C",
            },
            { id: 4, x: 65, y: 65, width: 20, height: 20, title: "Penthouse" },
        ],
    };

    const FloorPlan = ({ imageSrc, desc, targetRoute, title, stage }) => (
        <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-103 cursor-pointer">
            <a href={targetRoute}>
                <img
                    src={imageSrc}
                    alt={title}
                    style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
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
                        <p className="text-gray-200 text-md">{desc}</p>
                    </div>
                </div>
            </a>
        </div>
    );

    return (
        <div className="home wp-singular page-template elementor-default elementor-page">
            <main id="main" className="site-main">
                <div>
                    {/* filters */}
                    <section
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
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(auto-fit, minmax(500px, 1fr))",
                                            gap: "40px",
                                            maxWidth: "1200px",
                                            margin: "0 auto",
                                        }}
                                    >
                                        <FloorPlan
                                            imageSrc="/img/etap-2.jpg"
                                            areas={buildingAreas.etap2}
                                            targetRoute="/etap2"
                                            desc="Etap zakończony - mieszkania gotowe do odbioru"
                                            title="Mieszkania - Etap 2"
                                            stage="etap2"
                                        />

                                        <FloorPlan
                                            imageSrc="/img/etap-3.jpg"
                                            areas={buildingAreas.etap3}
                                            targetRoute="/etap3"
                                            desc="Etap inwestycji w trakcie realizacji"
                                            title="Mieszkania - Etap 3"
                                            stage="etap3"
                                        />
                                    </div>
                                </div>
                                <div className="mt-12 py-4">
                                    <PropertySearch
                                        stayOnPage={true}
                                        showStage={true}
                                    ></PropertySearch>
                                </div>
                                <div className="mt-6 bg-white mb-24">
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
