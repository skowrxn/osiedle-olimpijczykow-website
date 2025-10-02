"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PropertySearch({
    stayOnPage = false,
    showStage = false,
}) {
    const router = useRouter();
    const [searchFilters, setSearchFilters] = useState({
        rooms: "",
        area: "",
        floor: "",
        stage: "", // Dodano pole etapu
        availability: "", // Dodano pole dostępności
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();

        // Map the form values to the ApartmentSearch component's expected format
        const params = new URLSearchParams();

        if (searchFilters.rooms) {
            params.set("rooms", searchFilters.rooms);
        }

        if (searchFilters.area) {
            params.set("area", searchFilters.area);
        }

        if (searchFilters.floor) {
            params.set("floor", searchFilters.floor);
        }

        if (searchFilters.stage) {
            params.set("stage", searchFilters.stage);
        }

        if (searchFilters.availability) {
            params.set("status", searchFilters.availability);
        }

        const queryString = params.toString();

        if (stayOnPage) {
            // Pozostań na tej samej stronie, tylko zmień URL
            const currentPath = window.location.pathname;
            const newUrl = queryString
                ? `${currentPath}?${queryString}`
                : currentPath;
            router.push(newUrl);
        } else {
            // Domyślne zachowanie - przekieruj na etap3
            const newUrl = queryString ? `/etap3?${queryString}` : "/etap3";
            router.push(newUrl);
        }
    };

    return (
        <div
            className="wgl-properties_search elementor-search"
            style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                padding: "30px 30px",
                maxWidth: "1200px",
                margin: "0",
                borderRadius: "0px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
        >
            <form className="form-search-properties" onSubmit={handleSearch}>
                <div
                    className="wgl-properties_search-fields"
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        alignItems: "end",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Etap - pokazuje tylko gdy showStage jest true */}
                    {showStage && (
                        <div style={{ flex: "1", minWidth: "140px", maxWidth: "160px" }}>
                            <div
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginBottom: "8px",
                                    color: "#666",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                }}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M3 21V7l9-4 9 4v14" />
                                    <path d="M6 21V10l6-3 6 3v11" />
                                </svg>
                                Etap
                            </div>
                            <select
                                name="stage"
                                value={searchFilters.stage}
                                onChange={handleFilterChange}
                                style={{
                                    width: "100%",
                                    padding: "16px 15px",
                                    border: "none",
                                    borderBottom: "1px solid #333",
                                    borderRadius: "0px",
                                    backgroundColor: "transparent",
                                    color: "#333",
                                    fontSize: "16px",
                                    appearance: "none",
                                    backgroundImage:
                                        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M6 9L1.5 4.5h9z" fill="%23333"/></svg>\')',
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 15px center",
                                    outline: "none",
                                    fontFamily: "Poppins, sans-serif",
                                }}
                            >
                                <option value="">Wszystkie</option>
                                <option value="etap2">Etap 2</option>
                                <option value="etap3">Etap 3</option>
                            </select>
                        </div>
                    )}

                    {/* Liczba pokoi */}
                    <div style={{ flex: "1", minWidth: showStage ? "140px" : "200px", maxWidth: showStage ? "160px" : "none" }}>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "8px",
                                color: "#666",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9,22 9,12 15,12 15,22" />
                            </svg>
                            Liczba pokoi
                        </div>
                        <select
                            name="rooms"
                            value={searchFilters.rooms}
                            onChange={handleFilterChange}
                            style={{
                                width: "100%",
                                padding: "16px 15px",
                                border: "none",
                                borderBottom: "1px solid #333",
                                borderRadius: "0px",
                                backgroundColor: "transparent",
                                color: "#333",
                                fontSize: "16px",
                                appearance: "none",
                                backgroundImage:
                                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M6 9L1.5 4.5h9z" fill="%23333"/></svg>\')',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 15px center",
                                outline: "none",
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            <option value="">Wszystkie</option>
                            <option value="1">1 pokój</option>
                            <option value="2">2 pokoje</option>
                            <option value="3">3 pokoje</option>
                            <option value="4">4 pokoje</option>
                            <option value="5">5+ pokoi</option>
                        </select>
                    </div>

                    {/* Powierzchnia */}
                    <div style={{ flex: "1", minWidth: showStage ? "140px" : "200px", maxWidth: showStage ? "160px" : "none" }}>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "8px",
                                color: "#666",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    ry="2"
                                />
                                <path d="M9 9h6v6H9z" />
                            </svg>
                            Powierzchnia
                        </div>
                        <select
                            name="area"
                            value={searchFilters.area}
                            onChange={handleFilterChange}
                            style={{
                                width: "100%",
                                borderRadius: "0px",
                                padding: "16px 15px",
                                border: "none",
                                borderBottom: "1px solid #333",
                                backgroundColor: "transparent",
                                color: "#333",
                                fontSize: "16px",
                                appearance: "none",
                                backgroundImage:
                                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M6 9L1.5 4.5h9z" fill="%23333"/></svg>\')',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 15px center",
                                outline: "none",
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            <option value="">Wszystkie</option>
                            <option value="25-35">25-35 m²</option>
                            <option value="35-45">35-45 m²</option>
                            <option value="45-55">45-55 m²</option>
                            <option value="55-65">55-65 m²</option>
                            <option value="65+">65+ m²</option>
                        </select>
                    </div>

                    {/* Piętro */}
                    <div style={{ flex: "1", minWidth: showStage ? "140px" : "200px", maxWidth: showStage ? "160px" : "none" }}>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "8px",
                                color: "#666",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M3 21V7l9-4 9 4v14" />
                                <path d="M6 21V10l6-3 6 3v11" />
                                <path d="M9 21v-7h6v7" />
                            </svg>
                            Piętro
                        </div>
                        <select
                            name="floor"
                            value={searchFilters.floor}
                            onChange={handleFilterChange}
                            style={{
                                width: "100%",
                                padding: "16px 15px",
                                border: "none",
                                borderRadius: "0px",
                                borderBottom: "1px solid #333",
                                backgroundColor: "transparent",
                                color: "#333",
                                fontSize: "16px",
                                appearance: "none",
                                backgroundImage:
                                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M6 9L1.5 4.5h9z" fill="%23333"/></svg>\')',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 15px center",
                                outline: "none",
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            <option value="">Wszystkie</option>
                            <option value="0">Parter</option>
                            <option value="1">1. piętro</option>
                            <option value="2">2. piętro</option>
                            <option value="3">3. piętro</option>
                            <option value="4">4. piętro i wyżej</option>
                        </select>
                    </div>

                    {/* Dostępność */}
                    <div style={{ flex: "1", minWidth: showStage ? "140px" : "200px", maxWidth: showStage ? "160px" : "none" }}>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "8px",
                                color: "#666",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6" />
                                <path d="m21 12-6 0m-6 0-6 0" />
                            </svg>
                            Dostępność
                        </div>
                        <select
                            name="availability"
                            value={searchFilters.availability}
                            onChange={handleFilterChange}
                            style={{
                                width: "100%",
                                padding: "16px 15px",
                                border: "none",
                                borderRadius: "0px",
                                borderBottom: "1px solid #333",
                                backgroundColor: "transparent",
                                color: "#333",
                                fontSize: "16px",
                                appearance: "none",
                                backgroundImage:
                                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M6 9L1.5 4.5h9z" fill="%23333"/></svg>\')',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 15px center",
                                outline: "none",
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            <option value="">Wszystkie</option>
                            <option value="DOSTĘPNE">Dostępne</option>
                            <option value="REZERWACJA">Rezerwacja</option>
                            <option value="SPRZEDANE">Sprzedane</option>
                        </select>
                    </div>

                    {/* Przycisk wyszukiwania */}
                    <button
                        type="submit"
                        className="search-submit"
                        style={{
                            backgroundColor: "#232323",
                            color: "white",
                            padding: "16px 32px",
                            border: "none",
                            borderRadius: "50px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "500",
                            fontFamily: "Poppins, sans-serif",
                            transition: "all 0.3s ease",
                            minWidth: "140px",
                            height: "56px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#3a3a3a";
                            e.target.style.transform = "translateY(-1px)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#232323";
                            e.target.style.transform = "translateY(0)";
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        SZUKAJ
                    </button>
                </div>
            </form>
        </div>
    );
}
