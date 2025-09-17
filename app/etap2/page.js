"use client";

import React, { Suspense } from "react";
import PropertySearch from "../components/PropertySearch";
import ApartmentListCompact from "../components/ApartmentListCompact";

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
                                        style={{
                                            textAlign: "center",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                            Mieszkania Etap 2
                                        </h1>
                                        <p className="text-xl text-gray-600">
                                            Przeglądaj dostępne mieszkania w
                                            drugim etapie inwestycji Osiedle
                                            Olimpijczyków
                                        </p>
                                    </div>

                                    <div className="mt-12 py-4">
                                        <Suspense
                                            fallback={<div>Loading...</div>}
                                        >
                                            <PropertySearch
                                                stayOnPage={true}
                                                showStage={false}
                                            ></PropertySearch>
                                        </Suspense>
                                    </div>
                                    <div className="mt-6 bg-white mb-24">
                                        <ApartmentListCompact
                                            etap="2"
                                            showSearch={false}
                                            limit={50}
                                        />
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
