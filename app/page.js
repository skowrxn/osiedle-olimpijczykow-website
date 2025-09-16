"use client";

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [searchFilters, setSearchFilters] = useState({
        status: "",
        rooms: "",
        floor: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();

        // Map the form values to the ApartmentSearch component's expected format
        const params = new URLSearchParams();

        if (searchFilters.rooms) {
            params.set("rooms", searchFilters.rooms);
        }

        if (searchFilters.floor) {
            params.set("floor", searchFilters.floor);
        }

        const queryString = params.toString();
        const newUrl = queryString ? `/etap3?${queryString}` : "/etap3";

        router.push(newUrl);
    };

    return (
        <>
            <Head>
                <title>Osiedle Olimpijczyków</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                {/* WordPress Styles */}
                <link rel="stylesheet" href="/css/quere-style.css" />
                <link rel="stylesheet" href="/css/quere-css-main.css" />
                <link rel="stylesheet" href="/css/quere-css-responsive.css" />
                <link rel="stylesheet" href="/css/quere-css-dynamic.css" />
                <link
                    rel="stylesheet"
                    href="/css/elementor-css-custom-frontend.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/css/elementor-css-post-4773.css"
                />
                <link
                    rel="stylesheet"
                    href="/css/elementor-assets-css-widget-heading.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/css/elementor-assets-css-widget-image.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/css/elementor-assets-css-widget-spacer.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/css/elementor-assets-lib-eicons-css-elementor-icons.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/css/quere-fonts-flaticon-flaticon.css"
                />
                <link
                    rel="stylesheet"
                    href="/css/contact-form-7-includes-css-styles.css"
                />

                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="home wp-singular page-template elementor-default elementor-page">
                {/* Main Content */}
                <main id="main" className="site-main">
                    <div className="elementor elementor-4773">
                        {/* Hero Section */}
                        <section
                            className="elementor-section elementor-top-section elementor-section-full_width"
                            style={{
                                backgroundImage:
                                    "url(/img/2025-08-wizualizacja_02_rev01-1.jpg)",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                minHeight: "60vh",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <div
                                className="elementor-background-overlay"
                                style={{
                                    background: "rgba(0,0,0,0.6)",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                }}
                            ></div>
                            <div
                                className="elementor-container"
                                style={{ position: "relative", zIndex: 2 }}
                            >
                                <div className="elementor-column elementor-col-100">
                                    <div
                                        className="elementor-widget-wrap elementor-element-populated"
                                        style={{
                                            textAlign: "left",
                                            color: "white",
                                        }}
                                    >
                                        <h2
                                            className="elementor-heading-title"
                                            style={{
                                                fontSize: "48px",
                                                fontWeight: "600",
                                                marginBottom: "30px",
                                                fontFamily:
                                                    "Poppins, sans-serif",
                                                color: "white",
                                                textAlign: "left",
                                            }}
                                        >
                                            Osiedle Olimpijczyków
                                        </h2>

                                        {/* Search Form */}
                                        <div
                                            className="wgl-properties_search elementor-search"
                                            style={{
                                                backgroundColor:
                                                    "rgba(255,255,255,0.95)",
                                                padding: "30px",
                                                maxWidth: "1200px",
                                                margin: "0",
                                            }}
                                        >
                                            <form
                                                className="form-search-properties"
                                                onSubmit={handleSearch}
                                            >
                                                <div
                                                    className="wgl-properties_search-fields"
                                                    style={{
                                                        display: "flex",
                                                        gap: "15px",
                                                        flexWrap: "wrap",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <select
                                                        name="status"
                                                        value={
                                                            searchFilters.status
                                                        }
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        style={{
                                                            padding:
                                                                "15px 40px 15px 15px",
                                                            border: "none",
                                                            borderBottom:
                                                                "2px solid #ddd",
                                                            backgroundColor:
                                                                "transparent",
                                                            flex: "1",
                                                            minWidth: "180px",
                                                            color: "#000",
                                                            fontSize: "16px",
                                                            appearance: "none",
                                                            backgroundImage:
                                                                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M6 9L1.5 4.5h9z" fill="%23666"/></svg>\')',
                                                            backgroundRepeat:
                                                                "no-repeat",
                                                            backgroundPosition:
                                                                "right 15px center",
                                                            outline: "none",
                                                        }}
                                                    >
                                                        <option value="">
                                                            Status
                                                        </option>
                                                        <option value="dostepne">
                                                            Dostępne
                                                        </option>
                                                        <option value="sprzedane">
                                                            Sprzedane
                                                        </option>
                                                    </select>

                                                    <select
                                                        name="rooms"
                                                        value={
                                                            searchFilters.rooms
                                                        }
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        style={{
                                                            padding:
                                                                "15px 40px 15px 15px",
                                                            border: "none",
                                                            borderBottom:
                                                                "2px solid #ddd",
                                                            backgroundColor:
                                                                "transparent",
                                                            flex: "1",
                                                            minWidth: "180px",
                                                            color: "#000",
                                                            fontSize: "16px",
                                                            appearance: "none",
                                                            backgroundImage:
                                                                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M6 9L1.5 4.5h9z" fill="%23666"/></svg>\')',
                                                            backgroundRepeat:
                                                                "no-repeat",
                                                            backgroundPosition:
                                                                "right 15px center",
                                                            outline: "none",
                                                        }}
                                                    >
                                                        <option value="">
                                                            Liczba pokoi
                                                        </option>
                                                        <option value="1">
                                                            1 pokój
                                                        </option>
                                                        <option value="2">
                                                            2 pokoje
                                                        </option>
                                                        <option value="3">
                                                            3 pokoje
                                                        </option>
                                                        <option value="4">
                                                            4 pokoje
                                                        </option>
                                                        <option value="5">
                                                            5+ pokoi
                                                        </option>
                                                    </select>

                                                    <select
                                                        name="floor"
                                                        value={
                                                            searchFilters.floor
                                                        }
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        style={{
                                                            padding:
                                                                "15px 40px 15px 15px",
                                                            border: "none",
                                                            borderBottom:
                                                                "2px solid #ddd",
                                                            backgroundColor:
                                                                "transparent",
                                                            flex: "1",
                                                            minWidth: "180px",
                                                            color: "#000",
                                                            fontSize: "16px",
                                                            appearance: "none",
                                                            backgroundImage:
                                                                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M6 9L1.5 4.5h9z" fill="%23666"/></svg>\')',
                                                            backgroundRepeat:
                                                                "no-repeat",
                                                            backgroundPosition:
                                                                "right 15px center",
                                                            outline: "none",
                                                        }}
                                                    >
                                                        <option value="">
                                                            Piętro
                                                        </option>
                                                        <option value="0">
                                                            Parter
                                                        </option>
                                                        <option value="1">
                                                            1. piętro
                                                        </option>
                                                        <option value="2">
                                                            2. piętro
                                                        </option>
                                                        <option value="3">
                                                            3. piętro
                                                        </option>
                                                        <option value="4">
                                                            4. piętro i wyżej
                                                        </option>
                                                    </select>

                                                    <button
                                                        type="submit"
                                                        style={{
                                                            backgroundColor:
                                                                "#232323",
                                                            color: "white",
                                                            padding:
                                                                "12px 30px",
                                                            border: "none",
                                                            fontWeight: "600",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Szukaj mieszkania
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Features Section */}
                        <section
                            className="elementor-section elementor-top-section elementor-section-boxed"
                            style={{ padding: "80px 0" }}
                        >
                            <div className="elementor-container">
                                <div className="elementor-column elementor-col-100">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    "repeat(auto-fit, minmax(300px, 1fr))",
                                                gap: "40px",
                                            }}
                                        >
                                            {/* Feature 1 */}
                                            <div
                                                className="wgl-infobox"
                                                style={{ textAlign: "center" }}
                                            >
                                                <div
                                                    className="media-wrapper icon-wrapper"
                                                    style={{
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    <span
                                                        className="wgl-icon"
                                                        style={{
                                                            fontSize: "48px",
                                                            color: "#232323",
                                                        }}
                                                    >
                                                        <i className="flaticon-weights"></i>
                                                    </span>
                                                </div>
                                                <h3
                                                    className="wgl-infobox_title"
                                                    style={{
                                                        fontSize: "24px",
                                                        marginBottom: "15px",
                                                        fontFamily:
                                                            "Poppins, sans-serif",
                                                    }}
                                                >
                                                    Hala Sportowa
                                                </h3>
                                                <p
                                                    className="wgl-infobox_content"
                                                    style={{
                                                        color: "#6B6B6B",
                                                        lineHeight: "1.6",
                                                    }}
                                                >
                                                    W zasięgu spaceru znajduje
                                                    się nowoczesna hala sportowa
                                                    – idealna dla aktywnych
                                                    mieszkańców lubiących różne
                                                    formy ruchu.
                                                </p>
                                            </div>

                                            {/* Feature 2 */}
                                            <div
                                                className="wgl-infobox"
                                                style={{ textAlign: "center" }}
                                            >
                                                <div
                                                    className="media-wrapper icon-wrapper"
                                                    style={{
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    <span
                                                        className="wgl-icon"
                                                        style={{
                                                            fontSize: "48px",
                                                            color: "#232323",
                                                        }}
                                                    >
                                                        <i className="flaticon-swimming-pool"></i>
                                                    </span>
                                                </div>
                                                <h3
                                                    className="wgl-infobox_title"
                                                    style={{
                                                        fontSize: "24px",
                                                        marginBottom: "15px",
                                                        fontFamily:
                                                            "Poppins, sans-serif",
                                                    }}
                                                >
                                                    Aquapark
                                                </h3>
                                                <p
                                                    className="wgl-infobox_content"
                                                    style={{
                                                        color: "#6B6B6B",
                                                        lineHeight: "1.6",
                                                    }}
                                                >
                                                    Chwile zabawy i rekreacji
                                                    dostępne od ręki –
                                                    nowoczesny aquapark w
                                                    odległości kilku minut
                                                    spacerem.
                                                </p>
                                            </div>

                                            {/* Feature 3 */}
                                            <div
                                                className="wgl-infobox"
                                                style={{ textAlign: "center" }}
                                            >
                                                <div
                                                    className="media-wrapper icon-wrapper"
                                                    style={{
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    <span
                                                        className="wgl-icon"
                                                        style={{
                                                            fontSize: "48px",
                                                            color: "#232323",
                                                        }}
                                                    >
                                                        <i className="flaticon-palm"></i>
                                                    </span>
                                                </div>
                                                <h3
                                                    className="wgl-infobox_title"
                                                    style={{
                                                        fontSize: "24px",
                                                        marginBottom: "15px",
                                                        fontFamily:
                                                            "Poppins, sans-serif",
                                                    }}
                                                >
                                                    Tereny Zielone
                                                </h3>
                                                <p
                                                    className="wgl-infobox_content"
                                                    style={{
                                                        color: "#6B6B6B",
                                                        lineHeight: "1.6",
                                                    }}
                                                >
                                                    Bliskość parków oraz osiedle
                                                    w sąsiedztwie domów
                                                    jednorodzinnych gwarantują
                                                    ciszę i kontakt z naturą.
                                                </p>
                                            </div>

                                            {/* Feature 4 */}
                                            <div
                                                className="wgl-infobox"
                                                style={{ textAlign: "center" }}
                                            >
                                                <div
                                                    className="media-wrapper icon-wrapper"
                                                    style={{
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    <span
                                                        className="wgl-icon"
                                                        style={{
                                                            fontSize: "48px",
                                                            color: "#232323",
                                                        }}
                                                    >
                                                        <i className="flaticon-house"></i>
                                                    </span>
                                                </div>
                                                <h3
                                                    className="wgl-infobox_title"
                                                    style={{
                                                        fontSize: "24px",
                                                        marginBottom: "15px",
                                                        fontFamily:
                                                            "Poppins, sans-serif",
                                                    }}
                                                >
                                                    Nowoczesne technologie
                                                </h3>
                                                <p
                                                    className="wgl-infobox_content"
                                                    style={{
                                                        color: "#6B6B6B",
                                                        lineHeight: "1.6",
                                                    }}
                                                >
                                                    Inwestycja wykorzystuje
                                                    innowacyjne rozwiązania dla
                                                    większego komfortu,
                                                    energooszczędności i
                                                    bezpieczeństwa.
                                                </p>
                                            </div>

                                            {/* Feature 5 */}
                                            <div
                                                className="wgl-infobox"
                                                style={{ textAlign: "center" }}
                                            >
                                                <div
                                                    className="media-wrapper icon-wrapper"
                                                    style={{
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    <span
                                                        className="wgl-icon"
                                                        style={{
                                                            fontSize: "48px",
                                                            color: "#232323",
                                                        }}
                                                    >
                                                        <i className="flaticon-shopping-bag"></i>
                                                    </span>
                                                </div>
                                                <h3
                                                    className="wgl-infobox_title"
                                                    style={{
                                                        fontSize: "24px",
                                                        marginBottom: "15px",
                                                        fontFamily:
                                                            "Poppins, sans-serif",
                                                    }}
                                                >
                                                    W pobliżu sklepów
                                                </h3>
                                                <p
                                                    className="wgl-infobox_content"
                                                    style={{
                                                        color: "#6B6B6B",
                                                        lineHeight: "1.6",
                                                    }}
                                                >
                                                    Codzienne zakupy bez
                                                    konieczności długich
                                                    dojazdów – sklepy i punkty
                                                    usługowe w pobliżu osiedla.
                                                </p>
                                            </div>

                                            {/* Feature 6 */}
                                            <div
                                                className="wgl-infobox"
                                                style={{ textAlign: "center" }}
                                            >
                                                <div
                                                    className="media-wrapper icon-wrapper"
                                                    style={{
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    <span
                                                        className="wgl-icon"
                                                        style={{
                                                            fontSize: "48px",
                                                            color: "#232323",
                                                        }}
                                                    >
                                                        <i className="flaticon-slider"></i>
                                                    </span>
                                                </div>
                                                <h3
                                                    className="wgl-infobox_title"
                                                    style={{
                                                        fontSize: "24px",
                                                        marginBottom: "15px",
                                                        fontFamily:
                                                            "Poppins, sans-serif",
                                                    }}
                                                >
                                                    Plac Zabaw
                                                </h3>
                                                <p
                                                    className="wgl-infobox_content"
                                                    style={{
                                                        color: "#6B6B6B",
                                                        lineHeight: "1.6",
                                                    }}
                                                >
                                                    Bezpieczny, nowoczesny plac
                                                    zabaw to przestrzeń, w
                                                    której dzieci mogą spędzać
                                                    czas aktywnie i bezpiecznie.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* About Section */}
                        <section
                            className="elementor-section elementor-top-section"
                            style={{ padding: "80px 0" }}
                        >
                            <div className="elementor-container">
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "2fr 1fr",
                                        gap: "60px",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        <div
                                            className="wgl-double-heading"
                                            style={{ marginBottom: "40px" }}
                                        >
                                            <div
                                                className="dblh__subtitle"
                                                style={{
                                                    color: "#7E7E7E",
                                                    fontSize: "14px",
                                                    textTransform: "uppercase",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                osiedle olimpijczyków
                                            </div>
                                            <h3
                                                className="dblh__title-wrapper"
                                                style={{
                                                    fontSize: "36px",
                                                    fontWeight: "600",
                                                    fontFamily:
                                                        "Poppins, sans-serif",
                                                    lineHeight: "1.3",
                                                }}
                                            >
                                                Przemyślane przestrzenie i
                                                nowoczesny design
                                            </h3>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "40px",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <div style={{ flex: "1" }}>
                                                <img
                                                    src="/img/uploads-2025-08-APARTAMENT-A2_12_strefa-dzienna_06.jpg"
                                                    alt="Wnętrze apartamentu"
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                />
                                            </div>
                                            <div style={{ flex: "1" }}>
                                                <p
                                                    style={{
                                                        color: "#6B6B6B",
                                                        lineHeight: "1.8",
                                                        fontSize: "16px",
                                                        marginBottom: "30px",
                                                    }}
                                                >
                                                    Budynki osiedla
                                                    zaprojektowano z myślą o
                                                    harmonijnym połączeniu
                                                    nowoczesnego stylu z wygodą
                                                    mieszkańców. Jasne,
                                                    przestronne wnętrza
                                                    zapewniają komfort
                                                    codziennego życia, a tarasy
                                                    i balkony umożliwiają relaks
                                                    na świeżym powietrzu. Całość
                                                    tworzy estetyczną,
                                                    funkcjonalną przestrzeń,
                                                    idealną dla rodzin, osób
                                                    pracujących zdalnie oraz
                                                    wszystkich ceniących wysoką
                                                    jakość mieszkania.
                                                </p>

                                                <a
                                                    href="/o-inwestycji"
                                                    className="wgl-button btn-size-lg"
                                                    style={{
                                                        display: "inline-block",
                                                        backgroundColor:
                                                            "#232323",
                                                        color: "white",
                                                        padding: "15px 30px",
                                                        textDecoration: "none",
                                                        fontWeight: "600",
                                                        transition:
                                                            "all 0.3s ease",
                                                    }}
                                                >
                                                    O inwestycji
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Gallery Section */}
                        <section
                            className="elementor-section elementor-top-section"
                            style={{ padding: "80px 0" }}
                        >
                            <div className="elementor-container">
                                <div className="wgl-gallery">
                                    <div
                                        className="wgl-gallery_items gallery-masonry-2"
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(auto-fit, minmax(300px, 1fr))",
                                            gap: "20px",
                                        }}
                                    >
                                        <div className="wgl-gallery_item-wrapper">
                                            <img
                                                src="/img/2025-08-wizualizacja_01_rev01-1220x1220.jpg"
                                                alt="Wizualizacja budynku"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                            />
                                        </div>
                                        <div className="wgl-gallery_item-wrapper">
                                            <img
                                                src="/img/2025-08-wizualizacja_04_rev01-1220x1220.jpg"
                                                alt="Wizualizacja osiedla"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                            />
                                        </div>
                                        <div className="wgl-gallery_item-wrapper">
                                            <img
                                                src="/img/2025-08-apartament-1.5_strefadzienna_01-2-2500x1250.jpg"
                                                alt="Wnętrze apartamentu"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                            />
                                        </div>
                                        <div className="wgl-gallery_item-wrapper">
                                            <img
                                                src="/img/2025-08-APARTAMENT-C3_21_strefa-dzienna_08-scaled-1220x1220.jpg"
                                                alt="Salon apartamentu"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                            />
                                        </div>
                                        <div className="wgl-gallery_item-wrapper">
                                            <img
                                                src="/img/2025-08-APARTAMENT-B2_14_lazienka_02-1220x1220.jpg"
                                                alt="Łazienka apartamentu"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section
                            className="elementor-section elementor-top-section"
                            style={{
                                padding: "80px 0",
                                backgroundColor: "#F5F5F5",
                            }}
                        >
                            <div className="elementor-container">
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "60px",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        <h3
                                            style={{
                                                fontSize: "36px",
                                                fontWeight: "600",
                                                marginBottom: "20px",
                                                fontFamily:
                                                    "Poppins, sans-serif",
                                            }}
                                        >
                                            Skontaktuj się z nami
                                        </h3>
                                        <p
                                            style={{
                                                color: "#6B6B6B",
                                                fontSize: "16px",
                                                lineHeight: "1.6",
                                            }}
                                        >
                                            Postaramy się odpowiedzieć tak
                                            szybko jak to możliwe
                                        </p>
                                    </div>

                                    <div
                                        style={{
                                            backgroundColor: "white",
                                            padding: "40px",
                                            boxShadow:
                                                "0 5px 20px rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontSize: "24px",
                                                fontWeight: "600",
                                                marginBottom: "10px",
                                                fontFamily:
                                                    "Poppins, sans-serif",
                                            }}
                                        >
                                            Formularz kontaktowy
                                        </h3>
                                        <p
                                            style={{
                                                color: "#6B6B6B",
                                                fontSize: "14px",
                                                marginBottom: "30px",
                                            }}
                                        >
                                            Przetwarzamy dane osobowe zgodnie z
                                            naszą polityką prywatności
                                        </p>

                                        <form className="wpcf7-form">
                                            <div
                                                style={{ marginBottom: "20px" }}
                                            >
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Imię"
                                                    style={{
                                                        width: "100%",
                                                        padding: "12px",
                                                        border: "1px solid #ddd",
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div
                                                style={{ marginBottom: "20px" }}
                                            >
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Adres Email"
                                                    style={{
                                                        width: "100%",
                                                        padding: "12px",
                                                        border: "1px solid #ddd",
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div
                                                style={{ marginBottom: "20px" }}
                                            >
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Telefon"
                                                    style={{
                                                        width: "100%",
                                                        padding: "12px",
                                                        border: "1px solid #ddd",
                                                    }}
                                                />
                                            </div>
                                            <div
                                                style={{ marginBottom: "20px" }}
                                            >
                                                <textarea
                                                    name="message"
                                                    placeholder="Wiadomość"
                                                    rows="4"
                                                    style={{
                                                        width: "100%",
                                                        padding: "12px",
                                                        border: "1px solid #ddd",
                                                        resize: "vertical",
                                                    }}
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                style={{
                                                    backgroundColor: "#232323",
                                                    color: "white",
                                                    padding: "12px 30px",
                                                    border: "none",
                                                    fontWeight: "600",
                                                    cursor: "pointer",
                                                    width: "100%",
                                                }}
                                            >
                                                Wyślij wiadomość
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
