"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "../components/Lightbox";

export default function Galeria() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // Zdjęcia z folderu realizacja-3
    const realizacja3Images = [
        "wizualizacja_01_rev01.jpg",
        "wizualizacja_02_rev01.jpg",
        "wizualizacja_03_rev01.jpg",
        "wizualizacja_04_rev01.jpg",
    ];

    // Zdjęcia z folderu realizacja-2
    const realizacja2Images = [
        "AKTUALNIE W SPRZEDAŻY (1).png",
        "IMG_6878.JPG",
        "IMG_6885.JPG",
        "IMG_6891.JPG",
        "IMG_6902.JPG",
        "IMG_6909.JPG",
        "IMG_6916.JPG",
    ];

    // Zdjęcia z folderu wizualizacje
    const wizualizacjeImages = [
        "apartament 1.5_strefadzienna_01 (2).jpg",
        "apartament 1.5_strefadzienna_01 (5).jpg",
        "apartament 10_02.jpg",
        "apartament 10_07.jpg",
        "apartament 10_13.jpg",
        "apartament 12_08.jpg",
        "APARTAMENT A2_12_lazienka_02.jpg",
        "APARTAMENT A2_12_strefa dzienna_05.jpg",
        "APARTAMENT A2_12_strefa dzienna_06.jpg",
        "apartament A3.3 11_01 (2).jpg",
        "apartament A3.3 11_01 (9).jpg",
        "APARTAMENT B2_14_lazienka_02.jpg",
        "APARTAMENT B2_14_strefa dzienna_04.jpg",
        "APARTAMENT B2_14_strefa dzienna_06.jpg",
        "APARTAMENT B3_18_lazienka_03.jpg",
        "APARTAMENT B3_18_strefa dzienna_01.jpg",
        "APARTAMENT B3_18_strefa dzienna_04.jpg",
        "APARTAMENT C2_17_lazienka_02.jpg",
        "APARTAMENT C2_17_strefa dzienna_01.jpg",
        "APARTAMENT C2_17_strefa dzienna_05.jpg",
        "APARTAMENT C3_21_strefa dzienna_01.jpg",
        "APARTAMENT C3_21_strefa dzienna_08.jpg",
    ];

    const openLightbox = (images, folder, index) => {
        const imageUrls = images.map((img) => `/img/${folder}/${img}`);
        setLightboxImages(imageUrls);
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const GallerySection = ({ title, images, folder }) => (
        <section className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
                {title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative aspect-square overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        onClick={() => openLightbox(images, folder, index)}
                    >
                        <Image
                            src={`/img/${folder}/${image}`}
                            alt={`${title} - zdjęcie ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                    </div>
                ))}
            </div>
        </section>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <GallerySection
                    title="Wizualizacja budynku - etap III"
                    images={realizacja3Images}
                    folder="realizacja-3"
                />

                <GallerySection
                    title="Wizualizacja budynku - etap II"
                    images={realizacja2Images}
                    folder="realizacja-2"
                />

                <GallerySection
                    title="Wizualizacje mieszkań"
                    images={wizualizacjeImages}
                    folder="wizualizacje"
                />
            </div>

            <Lightbox
                images={lightboxImages}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                currentIndex={currentImageIndex}
            />
        </div>
    );
}
