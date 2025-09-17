"use client";

import React, { Suspense } from "react";
import PropertySearch from "../components/PropertySearch";
import ApartmentListCompact from "../components/ApartmentListCompact";

const Etap3Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
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
                                                Mieszkania Etap 3
                                            </h1>
                                            <p className="text-xl text-gray-600">
                                                Przeglądaj dostępne mieszkania w
                                                trzecim etapie inwestycji
                                                Osiedle Olimpijczyków
                                            </p>
                                        </div>

                                        <div className="mt-12 py-4">
                                            <PropertySearch
                                                stayOnPage={true}
                                                showStage={false}
                                            ></PropertySearch>
                                        </div>
                                        <div className="mt-6 bg-white mb-24">
                                            <ApartmentListCompact
                                                etap="3"
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
        </Suspense>
    );
};

export default Etap3Page;
