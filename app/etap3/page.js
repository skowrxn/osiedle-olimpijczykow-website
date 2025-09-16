"use client";

import React from "react";
import ApartmentSearch from "../components/ApartmentSearch";
import ApartmentList from "../components/ApartmentList";

const Etap3Page = () => {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Mieszkania Etap 3
                </h1>
                <p className="text-gray-600">
                    Przeglądaj dostępne mieszkania w trzecim etapie inwestycji
                    Osiedle Olimpijczyków
                </p>
            </div>

            <ApartmentSearch etap="3" />
            <ApartmentList etap="3" />
        </div>
    );
};

export default Etap3Page;
