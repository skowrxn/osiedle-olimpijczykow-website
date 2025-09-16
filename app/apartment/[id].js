import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ApartmentDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [apartment, setApartment] = useState(null);

    useEffect(() => {
        const fetchApartment = async () => {
            const response = await fetch(
                `http://localhost:1337/api/apartments/${id}`
            );
            const data = await response.json();
            setApartment(data);
        };

        if (id) {
            fetchApartment();
        }
    }, [id]);

    if (!apartment) return <p>Loading...</p>;

    return (
        <div style={{ display: "flex", padding: "20px" }}>
            <div
                style={{
                    flex: 1,
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "20px",
                }}
            >
                <h2>Szczegóły mieszkania</h2>
                <p>Cena: {apartment.attributes.price} PLN</p>
                <p>Liczba pokoi: {apartment.attributes.rooms}</p>
                <p>Piętro: {apartment.attributes.floor}</p>
                <p>Powierzchnia: {apartment.attributes.area} m²</p>
            </div>
            <div style={{ flex: 1, padding: "20px" }}>
                <h2>Galeria</h2>
                {apartment.attributes.images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Apartment image ${index + 1}`}
                        style={{ width: "100%", marginBottom: "10px" }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ApartmentDetail;
