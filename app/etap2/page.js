"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Etap2Page = () => {
    return (
        <div className="home wp-singular page-template elementor-default elementor-page">
            <main id="main" className="site-main">
                <div>
                    <section
                        style={{
                            padding: "40px 0",
                        }}
                    >
                        <div className="elementor-container">
                            <div className="elementor-column elementor-col-100">
                                <div className="elementor-widget-wrap elementor-element-populated">
                                    <div
                                        className="relative overflow-hidden rounded-lg shadow-lg"
                                        style={{
                                            height: "400px",
                                            maxWidth: "1200px",
                                            margin: "0 auto",
                                        }}
                                    >
                                        <Image
                                            src="/img/etap-2.jpg"
                                            alt="Mieszkania - Etap 2"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 1200px"
                                            style={{
                                                objectFit: "cover",
                                                filter: "grayscale(100%)",
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/50" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
                                            <span
                                                className="text-white text-3xl md:text-4xl font-bold uppercase leading-tight"
                                                style={{ maxWidth: "320px" }}
                                            >
                                                Sprzedaż zakończona
                                            </span>
                                            <p className="text-gray-300 text-lg mt-3">
                                                Mieszkania - Etap 2
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="text-center mt-12 mb-24"
                                        style={{
                                            maxWidth: "1200px",
                                            margin: "48px auto 96px",
                                        }}
                                    >
                                        <h1 className="text-4xl font-bold text-neutral-800 mb-4">
                                            Mieszkania Etap 2
                                        </h1>
                                        <p className="text-xl text-neutral-600 mb-8">
                                            Sprzedaż mieszkań w drugim etapie
                                            inwestycji Osiedle Olimpijczyków
                                            została zakończona. Zapraszamy do
                                            zapoznania się z ofertą trzeciego
                                            etapu.
                                        </p>
                                        <Link
                                            href="/etap3"
                                            className="inline-block"
                                            style={{
                                                backgroundColor: "#232323",
                                                color: "white",
                                                padding: "16px 32px",
                                                borderRadius: "50px",
                                                fontSize: "16px",
                                                fontWeight: "500",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            Zobacz mieszkania - Etap 3
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Etap2Page;
