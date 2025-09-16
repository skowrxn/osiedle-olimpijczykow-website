"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";

const ApartmentSearch = ({ etap }) => {
    const router = useRouter();
    const [filters, setFilters] = useState({
        rooms: "",
        floor: "",
        area: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        const query = { etap, ...filters };
        router.push({ pathname: `/etap${etap}`, query });
    };

    return (
        <div>
            <h2>Wyszukiwarka</h2>
            <label>
                Liczba pokoi:
                <select
                    name="rooms"
                    value={filters.rooms}
                    onChange={handleFilterChange}
                >
                    <option value="">Wszystkie</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                </select>
            </label>
            <label>
                Piętro:
                <select
                    name="floor"
                    value={filters.floor}
                    onChange={handleFilterChange}
                >
                    <option value="">Wszystkie</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                </select>
            </label>
            <label>
                Powierzchnia:
                <select
                    name="area"
                    value={filters.area}
                    onChange={handleFilterChange}
                >
                    <option value="">Wszystkie</option>
                    <option value="25-35">25-35 m²</option>
                    <option value="35-45">35-45 m²</option>
                    <option value="45-55">45-55 m²</option>
                </select>
            </label>
            <button onClick={applyFilters}>Filtruj</button>
        </div>
    );
};

export default ApartmentSearch;
