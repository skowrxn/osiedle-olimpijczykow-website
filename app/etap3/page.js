import React from "react";
import ApartmentSearch from "../components/ApartmentSearch";
import ApartmentList from "../components/ApartmentList";

const Etap3Page = () => {
    return (
        <div>
            <h1>Mieszkania Etap 3</h1>
            <ApartmentSearch etap="3" />
            <ApartmentList etap="3" />
        </div>
    );
};

export default Etap3Page;
