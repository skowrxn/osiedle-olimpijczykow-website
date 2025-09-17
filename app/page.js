"use client";

import Head from "next/head";
import PropertySearch from "./components/PropertySearch";
import BoxWithIcon from "./components/BoxWithIcon";

export default function Home() {
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
                                                <img
                                                    srcset="https://img.icons8.com/?size=80&amp;id=gQ4rIzkU1Og3&amp;format=png 1x, https://img.icons8.com/?size=160&amp;id=gQ4rIzkU1Og3&amp;format=png 2x"
                                                    width="80"
                                                    height="80"
                                                    alt="Terrace icon"
                                                    data-v-42ed8b2f=""
                                                />
                                            </BoxWithIcon>

                                            <BoxWithIcon
                                                iconClass="fi-rr-swimming"
                                                title="Hala sportowa i Aquapark"
                                                description="Czas relaksu oraz rekreacji dostępne od ręki – aquapark, siłownia oraz nowoczesna hala sportowa w odległości kilku minut spacerem."
                                            >
                                                <img
                                                    srcset="https://img.icons8.com/?size=80&amp;id=fk2FuaspJu3M&amp;format=png 1x, https://img.icons8.com/?size=160&amp;id=fk2FuaspJu3M&amp;format=png 2x"
                                                    width="80"
                                                    height="80"
                                                    alt="Aquapark icon"
                                                    data-v-42ed8b2f=""
                                                />
                                            </BoxWithIcon>

                                            <BoxWithIcon
                                                iconClass="fi-rr-car-garage"
                                                title="Parking podziemny"
                                                description="Dla każdego budynku przewidziano wielostanowiskowy parking podziemny. Dzięki temu mieszkańcy i ich goście nie muszą się martwić o miejsce postojowe."
                                            >
                                                <img
                                                    data-image-id="JfBZnogY095Z"
                                                    srcset="https://img.icons8.com/?size=80&amp;id=JfBZnogY095Z&amp;format=png 1x, https://img.icons8.com/?size=160&amp;id=JfBZnogY095Z&amp;format=png 2x"
                                                    width="80"
                                                    height="80"
                                                    alt="Parking icon"
                                                    class="loaded"
                                                />
                                            </BoxWithIcon>

                                            <BoxWithIcon
                                                iconClass="fi-rr-trees"
                                                title="Tereny zielone"
                                                description="Nasze osiedle położone jest w spokojnej okolicy, w otoczeniu domów jednorodzinnych. Bliskość Parku Miejskiego oraz otoczenie terenami zielonymi sprawiają, że to idealne miejsce dla osób ceniących ciszę i harmonię z naturą."
                                            >
                                                <img
                                                    data-v-42ed8b2f=""
                                                    srcset="https://img.icons8.com/?size=50&amp;id=15803&amp;format=png 1x, https://img.icons8.com/?size=100&amp;id=15803&amp;format=png 2x"
                                                    width="80"
                                                    height="80"
                                                    alt="Leaf icon"
                                                    class="loaded"
                                                />
                                            </BoxWithIcon>

                                            <BoxWithIcon
                                                iconClass="fi-rr-shopping-bag"
                                                title="W pobliżu sklepów"
                                                description="Codzienne zakupy jeszcze nigdy nie były tak wygodne – sklepy oraz punkty usługowe w zasięgu krótkiego spaceru."
                                            >
                                                <img
                                                    data-v-42ed8b2f=""
                                                    data-image-id="HCYlvAbwfEfd"
                                                    srcset="https://img.icons8.com/?size=80&amp;id=HCYlvAbwfEfd&amp;format=png 1x, https://img.icons8.com/?size=160&amp;id=HCYlvAbwfEfd&amp;format=png 2x"
                                                    width="80"
                                                    height="80"
                                                    alt="Shopping Bag icon"
                                                    class="loaded"
                                                />
                                            </BoxWithIcon>

                                            <BoxWithIcon
                                                iconClass="fi-rr-camera-security"
                                                title="Monitorowane osiedle"
                                                description="System monitoringu na osiedlu zwiększa bezpieczeństwo jego mieszkańców. Nowoczesne kamery obejmują kluczowe części osiedla, zapewniając spokój i komfort."
                                            >
                                                <img
                                                    data-v-42ed8b2f=""
                                                    data-image-id="xBQkk9hOrt1r"
                                                    srcset="https://img.icons8.com/?size=80&amp;id=xBQkk9hOrt1r&amp;format=png 1x, https://img.icons8.com/?size=160&amp;id=xBQkk9hOrt1r&amp;format=png 2x"
                                                    width="80"
                                                    height="80"
                                                    alt="Cctv icon"
                                                    class="loaded"
                                                />
                                            </BoxWithIcon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
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
                                            style={{
                                                display: "flex",
                                                gap: "40px",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <div style={{ flex: "1" }}>
                                                <img
                                                    src="/img/wizualizacja-1.jpg"
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
                                                    className="rounded-4xl border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white bg-w color-gray-800"
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
                                        style={{
                                            flex: "1",
                                            marginTop: "-250px",
                                        }}
                                    >
                                        <img
                                            src="/img/wizualizacja-2.jpg"
                                            alt="Wnętrze apartamentu"
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                            }}
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
                                        <div>
                                            <img
                                                src="/img/budynek-4.jpg"
                                                alt="Wizualizacja budynku"
                                                style={{
                                                    width: "100%",
                                                    height: "300px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src="/img/2025-08-wizualizacja_01_rev01-1220x1220.jpg"
                                                alt="Wizualizacja budynku"
                                                style={{
                                                    width: "100%",
                                                    height: "300px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src="/img/2025-08-wizualizacja_04_rev01-1220x1220.jpg"
                                                alt="Wizualizacja osiedla"
                                                style={{
                                                    width: "100%",
                                                    height: "300px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src="/img/2025-08-apartament-1.5_strefadzienna_01-2-2500x1250.jpg"
                                                alt="Wnętrze apartamentu"
                                                style={{
                                                    width: "100%",
                                                    height: "300px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src="/img/wizualizacja-3.jpg"
                                                alt="Salon apartamentu"
                                                style={{
                                                    width: "100%",
                                                    height: "300px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src="/img/wizualizacja-4.jpg"
                                                alt="Łazienka apartamentu"
                                                style={{
                                                    width: "100%",
                                                    height: "300px",
                                                    objectFit: "cover",
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
                                backgroundImage: "url(/img/wizualizacja-4.jpg)",
                                backgroundPositionY: "center",
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
                                    zIndex: 1,
                                }}
                            ></div>
                            <div
                                className="elementor-container"
                                style={{ position: "relative", zIndex: 2 }}
                            >
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
                                                fontSize: "46px",
                                                color: "#ffffff",
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
                                                color: "#d7d7d7",
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
