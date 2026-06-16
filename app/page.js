"use client";

import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import PropertySearch from "./components/PropertySearch";
import BoxWithIcon from "./components/BoxWithIcon";
import Lightbox from "./components/Lightbox";
import ContactSection from "./components/ContactSection";
import Poppins from "next/font/google/";

export default function Home() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Zdjęcia wizualizacji na stronie głównej
    const visualizationImages = [
        "/img/wizualizacja-1.jpg",
        "/img/wizualizacja-2.jpg",
        "/img/budynek-4.jpg",
        "/img/2025-08-wizualizacja_01_rev01-1220x1220.jpg",
        "/img/2025-08-wizualizacja_04_rev01-1220x1220.jpg",
        "/img/2025-08-apartament-1.5_strefadzienna_01-2-2500x1250.jpg",
        "/img/wizualizacja-3.jpg",
        "/img/wizualizacja-4.jpg",
    ];

    const openLightbox = (index) => {
        setLightboxImages(visualizationImages);
        setCurrentImageIndex(index);
        setLightboxOpen(true);
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
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Poppins:400,600,500,400,500,600,700%7CPlayfair%20Display:600,400,500,600,700,600italic&display=swap&ver=1755862490"
                ></link>
            </Head>

            <div className="home wp-singular page-template elementor-default elementor-page">
                {/* Main Content */}
                <main id="main" className="site-main">
                    <div className="elementor elementor-4773">
                        {/* Hero Section */}
                        <section
                            className="elementor-section elementor-top-section elementor-section-full_width hero-section"
                            style={{
                                backgroundImage: "url(/img/hero-bg.jpg)",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                minHeight: "70vh",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <div
                                className="elementor-background-overlay"
                                style={{
                                    background: "rgba(0,0,0,0.4)",
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
                                        className="elementor-widget-wrap elementor-element-populated hero-inner"
                                        style={{
                                            textAlign: "left",
                                            color: "white",
                                        }}
                                    >
                                        <h2
                                            className="elementor-heading-title hero-title"
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
                                        <PropertySearch />
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
                                                padding: "20px",
                                            }}
                                        >
                                            <BoxWithIcon
                                                iconClass="fi-rr-terrace"
                                                title="Tarasy i balkony"
                                                description="Urokliwe ogródki, balkony oraz przestronne tarasy na ostatnich piętrach. To idealne miejsce na poranną kawę, odpoczynek po pracy czy spotkania z bliskimi."
                                            >
                                                <Image
                                                    src="https://img.icons8.com/?size=80&id=gQ4rIzkU1Og3&format=png"
                                                    width={80}
                                                    height={80}
                                                    alt="Terrace icon"
                                                />
                                            </BoxWithIcon>

                                            <BoxWithIcon
                                                iconClass="fi-rr-swimming"
                                                title="Hala sportowa i Aquapark"
                                                description="Czas relaksu oraz rekreacji dostępne od ręki – aquapark, siłownia oraz nowoczesna hala sportowa w odległości kilku minut spacerem."
                                            >
                                                <Image
                                                    src="https://img.icons8.com/?size=80&id=fk2FuaspJu3M&format=png"
                                                    width={80}
                                                    height={80}
                                                    alt="Aquapark icon"
                                                />
                                            </BoxWithIcon>

                                            <BoxWithIcon
                                                iconClass="fi-rr-car-garage"
                                                title="Parking podziemny"
                                                description="Dla każdego budynku przewidziano wielostanowiskowy parking podziemny. Dzięki temu mieszkańcy i ich goście nie muszą się martwić o miejsce postojowe."
                                            >
                                                <Image
                                                    src="https://img.icons8.com/?size=80&id=JfBZnogY095Z&format=png"
                                                    width={80}
                                                    height={80}
                                                    alt="Parking icon"
                                                />
                                            </BoxWithIcon>

                                            <BoxWithIcon
                                                iconClass="fi-rr-trees"
                                                title="Tereny zielone"
                                                description="Osiedle w spokojnej okolicy, otoczone domami jednorodzinnymi i terenami zielonymi. Bliskość Parku Miejskiego sprawia, że to idealne miejsce dla osób ceniących ciszę i naturę."
                                            >
                                                <Image
                                                    src="https://img.icons8.com/?size=80&id=15803&format=png"
                                                    width={80}
                                                    height={80}
                                                    alt="Leaf icon"
                                                />
                                            </BoxWithIcon>

                                            <BoxWithIcon
                                                iconClass="fi-rr-shopping-bag"
                                                title="W pobliżu sklepów"
                                                description="Codzienne zakupy jeszcze nigdy nie były tak wygodne – sklepy oraz punkty usługowe w zasięgu krótkiego spaceru."
                                            >
                                                <Image
                                                    src="https://img.icons8.com/?size=80&id=HCYlvAbwfEfd&format=png"
                                                    width={80}
                                                    height={80}
                                                    alt="Shopping Bag icon"
                                                />
                                            </BoxWithIcon>

                                            <BoxWithIcon
                                                iconClass="fi-rr-camera-security"
                                                title="Monitorowane osiedle"
                                                description="System monitoringu na osiedlu zwiększa bezpieczeństwo jego mieszkańców. Nowoczesne kamery obejmują kluczowe części osiedla, zapewniając spokój i komfort."
                                            >
                                                <Image
                                                    src="https://img.icons8.com/?size=80&id=xBQkk9hOrt1r&format=png"
                                                    width={80}
                                                    height={80}
                                                    alt="Cctv icon"
                                                />
                                            </BoxWithIcon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section
                            className="elementor-section elementor-top-section design-section"
                            style={{ padding: "40px 0" }}
                        >
                            <div className="elementor-container">
                                <div
                                    className="design-grid"
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
                                                    fontSize: "16px",
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
                                            className="design-content"
                                            style={{
                                                display: "flex",
                                                gap: "40px",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <div style={{ flex: "1" }}>
                                                <Image
                                                    src="/img/wizualizacja-1.jpg"
                                                    alt="Wnętrze apartamentu"
                                                    width={1200}
                                                    height={900}
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => openLightbox(0)}
                                                    className="hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div style={{ flex: "1" }}>
                                                <p
                                                    style={{
                                                        color: "#6B6B6B",
                                                        lineHeight: "1.8",
                                                        fontSize: "16px",
                                                        marginBottom: "30px",
                                                        fontFamily:
                                                            "Poppins, sans-serif",
                                                    }}
                                                >
                                                    Nasze motto to: Budujemy dla
                                                    Was z myślą o Was. Dlatego
                                                    każda nasza inwestycja
                                                    wyróżnia się estetyką i
                                                    najwyższą jakością
                                                    wykonania. Osiedle zostało
                                                    zaprojektowane tak, aby
                                                    łączyć nowoczesny styl z
                                                    codzienną wygodą
                                                    mieszkańców. Jasne i
                                                    przestronne wnętrza
                                                    gwarantują komfort życia, a
                                                    tarasy i balkony pozwalają
                                                    cieszyć się chwilą relaksu
                                                    na świeżym powietrzu.
                                                    Tworzymy przestrzeń, która
                                                    jest jednocześnie estetyczna
                                                    i funkcjonalna – idealna
                                                    zarówno dla rodzin, jak i
                                                    osób pracujących zdalnie czy
                                                    wszystkich, którzy cenią
                                                    wysokie standardy
                                                    mieszkania. Z roku na rok
                                                    powiększa się grono naszych
                                                    zadowolonych klientów, a
                                                    zdobywane doświadczenie
                                                    pozwala nam rozwijać
                                                    portfolio naszych
                                                    inwestycji, zawsze
                                                    budowanych na miarę Waszych
                                                    potrzeb.
                                                </p>

                                                <a
                                                    href="/o-inwestycji"
                                                    className="rounded-4xl border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white bg-w color-neutral-800"
                                                    style={{
                                                        display: "inline-block",
                                                        border: "1px solid",
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
                                    <div
                                        className="design-right"
                                        style={{
                                            flex: "1",
                                        }}
                                    >
                                        <Image
                                            src="/img/wizualizacja-2.jpg"
                                            alt="Wnętrze apartamentu"
                                            width={1200}
                                            height={900}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => openLightbox(1)}
                                            className="hover:scale-105 transition-transform duration-300"
                                        />
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
                                        <div
                                            style={{ position: "relative", height: "300px", cursor: "pointer", overflow: "hidden" }}
                                            onClick={() => openLightbox(2)}
                                        >
                                            <Image
                                                src="/img/budynek-4.jpg"
                                                alt="Wizualizacja budynku"
                                                fill
                                                style={{ objectFit: "cover" }}
                                                className="hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div
                                            style={{ position: "relative", height: "300px", cursor: "pointer", overflow: "hidden" }}
                                            onClick={() => openLightbox(3)}
                                        >
                                            <Image
                                                src="/img/2025-08-wizualizacja_01_rev01-1220x1220.jpg"
                                                alt="Wizualizacja budynku"
                                                fill
                                                style={{ objectFit: "cover" }}
                                                className="hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div
                                            style={{ position: "relative", height: "300px", cursor: "pointer", overflow: "hidden" }}
                                            onClick={() => openLightbox(4)}
                                        >
                                            <Image
                                                src="/img/2025-08-wizualizacja_04_rev01-1220x1220.jpg"
                                                alt="Wizualizacja osiedla"
                                                fill
                                                style={{ objectFit: "cover" }}
                                                className="hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div
                                            style={{ position: "relative", height: "300px", cursor: "pointer", overflow: "hidden" }}
                                            onClick={() => openLightbox(5)}
                                        >
                                            <Image
                                                src="/img/2025-08-apartament-1.5_strefadzienna_01-2-2500x1250.jpg"
                                                alt="Wnętrze apartamentu"
                                                fill
                                                style={{ objectFit: "cover" }}
                                                className="hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div
                                            style={{ position: "relative", height: "300px", cursor: "pointer", overflow: "hidden" }}
                                            onClick={() => openLightbox(6)}
                                        >
                                            <Image
                                                src="/img/wizualizacja-3.jpg"
                                                alt="Salon apartamentu"
                                                fill
                                                style={{ objectFit: "cover" }}
                                                className="hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div
                                            style={{ position: "relative", height: "300px", cursor: "pointer", overflow: "hidden" }}
                                            onClick={() => openLightbox(7)}
                                        >
                                            <Image
                                                src="/img/wizualizacja-4.jpg"
                                                alt="Łazienka apartamentu"
                                                fill
                                                style={{ objectFit: "cover" }}
                                                className="hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <ContactSection />
                    </div>
                </main>
            </div>

            <Lightbox
                images={lightboxImages}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                currentIndex={currentImageIndex}
            />
        </>
    );
}
