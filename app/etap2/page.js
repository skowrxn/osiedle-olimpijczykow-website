"use client";

import React from "react";
import ApartmentSearch from "../components/ApartmentSearch";
import ApartmentList from "../components/ApartmentList";

const Etap2Page = () => {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Mieszkania Etap 2
                </h1>
                <p className="text-gray-600">
                    Przeglądaj dostępne mieszkania w drugim etapie inwestycji
                    Osiedle Olimpijczyków
                </p>
            </div>

            <ApartmentSearch etap="2" />
            <ApartmentList etap="2" />
        </div>
    );
};

export default Etap2Page;
