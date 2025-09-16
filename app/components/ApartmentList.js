"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ApartmentList = ({ etap }) => {
    const router = useRouter();
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        const fetchApartments = async () => {
            const query = new URLSearchParams(router.query).toString();
            const response = await fetch(
                `http://localhost:1337/api/apartments?${query}`
            );
            const data = await response.json();
            setApartments(data);
        };

        fetchApartments();
    }, [router.query]);

    return (
        <div>
            {apartments.map((apartment) => (
                <div
                    key={apartment.id}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        padding: "10px",
                        border: "1px solid #ccc",
                    }}
                >
                    <div>
                        <p>Liczba pokoi: {apartment.attributes.rooms}</p>
                        <p>Piętro: {apartment.attributes.floor}</p>
                        <p>Powierzchnia: {apartment.attributes.area} m²</p>
                    </div>
                    <div>
                        <p>Cena: {apartment.attributes.price} PLN</p>
                        <button
                            onClick={() =>
                                router.push(`/apartment/${apartment.id}`)
                            }
                        >
                            Zobacz
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApartmentList;
