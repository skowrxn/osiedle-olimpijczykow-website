"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ApartmentSearch = ({ etap }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        rooms: "",
        floor: "",
        area: "",
    });

    // Load filters from URL params on component mount
    useEffect(() => {
        setFilters({
            rooms: searchParams.get("rooms") || "",
            floor: searchParams.get("floor") || "",
            area: searchParams.get("area") || "",
        });
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        const params = new URLSearchParams();

        // Only add non-empty filters to URL
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });

        const queryString = params.toString();
        const newUrl = queryString ? `?${queryString}` : "";

        router.push(`/etap${etap}${newUrl}`);
    };

    const clearFilters = () => {
        setFilters({
            rooms: "",
            floor: "",
            area: "",
        });
        router.push(`/etap${etap}`);
    };

    return (
        <div className="bg-neutral-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">
                Wyszukiwarka mieszkań
            </h2>

            <div className="flex flex-wrap gap-4 items-end">
                <div className="flex flex-col min-w-[150px]">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Liczba pokoi:
                    </label>
                    <select
                        name="rooms"
                        value={filters.rooms}
                        onChange={handleFilterChange}
                        className="block w-full px-3 py-2 border border-neutral-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Wszystkie</option>
                        <option value="1">1 pokój</option>
                        <option value="2">2 pokoje</option>
                        <option value="3">3 pokoje</option>
                        <option value="4">4 pokoje</option>
                        <option value="5">5+ pokoi</option>
                    </select>
                </div>

                <div className="flex flex-col min-w-[150px]">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Piętro:
                    </label>
                    <select
                        name="floor"
                        value={filters.floor}
                        onChange={handleFilterChange}
                        className="block w-full px-3 py-2 border border-neutral-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Wszystkie</option>
                        <option value="0">Parter</option>
                        <option value="1">1. piętro</option>
                        <option value="2">2. piętro</option>
                        <option value="3">3. piętro</option>
                        <option value="4">4. piętro i wyżej</option>
                    </select>
                </div>

                <div className="flex flex-col min-w-[150px]">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Powierzchnia:
                    </label>
                    <select
                        name="area"
                        value={filters.area}
                        onChange={handleFilterChange}
                        className="block w-full px-3 py-2 border border-neutral-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Wszystkie</option>
                        <option value="25-35">25-35 m²</option>
                        <option value="35-45">35-45 m²</option>
                        <option value="45-55">45-55 m²</option>
                        <option value="55-65">55-65 m²</option>
                        <option value="65+">65+ m²</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={applyFilters}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Filtruj
                    </button>
                    <button
                        onClick={clearFilters}
                        className="bg-neutral-400 text-white px-6 py-2 rounded-md hover:bg-neutral-500 transition-colors"
                    >
                        Wyczyść
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApartmentSearch;
