"use client";

import React from "react";
import ApartmentSearch from "../components/ApartmentSearch";
import ApartmentList from "../components/ApartmentList";

const Etap2Page = () => {
    return (
        <div>
            <h1>Mieszkania Etap 2</h1>
            <ApartmentSearch etap="2" />
            <ApartmentList etap="2" />
        </div>
    );
};

export default Etap2Page;
