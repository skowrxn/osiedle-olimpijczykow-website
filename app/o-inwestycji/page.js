import PropertySearch from "../components/PropertySearch";
import BoxWithIcon from "../components/BoxWithIcon";
import Image from "next/image";

export default function OInwestycji() {
    return (
        <div className="home wp-singular page-template elementor-default elementor-page">
            {/* Main Content */}
            <main id="main" className="site-main">
                <div className="elementor elementor-4773">
                    <section
                        className="elementor-section elementor-top-section elementor-section-full_width sub-hero"
                        style={{
                            backgroundImage: "url(/img/hero-bg.jpg)",
                            backgroundPosition: "center center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            minHeight: "40vh",
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
                                            fontFamily: "Poppins, sans-serif",
                                            color: "white",
                                            textAlign: "left",
                                        }}
                                    >
                                        O inwestycji
                                    </h2>
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
                                            title="Bliskość rekreacji"
                                            description="Aquapark, hala sportowa i park miejski w pobliżu osiedla zapewniają aktywny wypoczynek dla całej rodziny. Dodatkowo w pobliżu znajdziemy sklepy, punkty usługowe oraz placówki edukacyjne - co czyni codzienne życie jeszcze bardziej wygodnym."
                                        >
                                            <img
                                                src="/img/park.jpg"
                                                alt="Bliskość rekreacji"
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    marginBottom: "12px",
                                                }}
                                            />
                                        </BoxWithIcon>

                                        <BoxWithIcon
                                            title="Różnorodność mieszkań"
                                            description="Na naszym osiedlu, każdy znajdzie idealne mieszkanie dla swoich potrzeb. Od przytulnych 35 m² po przestronne 130 m² – różnorodność mieszkań, która spełnia oczekiwania najbardziej wymagających."
                                        >
                                            <img
                                                src="/img/wizualizacja-1.jpg"
                                                alt="Różnorodność mieszkań"
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    marginBottom: "12px",
                                                }}
                                            />
                                        </BoxWithIcon>

                                        <BoxWithIcon
                                            title="Komfort mieszkania"
                                            description="Komfort na pierwszym miejscu – tworzymy jasne, funkcjonalne i przyjazne przestrzenie, które zapewniają wygodę zarówno w mieszkaniach, jak i w częściach wspólnych."
                                        >
                                            <img
                                                src="/img/wizualizacja-4.jpg"
                                                alt="Komfort mieszkania"
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    marginBottom: "12px",
                                                }}
                                            />
                                        </BoxWithIcon>

                                        <BoxWithIcon
                                            title="Dogodna lokalizacja"
                                            description="Lokalizacja osiedla zapewnia szybki dojazd zarówno do centrum Tarnowskich Gór, jak i innych miast aglomeracji śląskiej – dzięki drodze DK78 oraz Obwodnicy Tarnowskich Gór."
                                        >
                                            <img
                                                src="/img/budynek-2.jpg"
                                                alt="Dogodna lokalizacja"
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    marginBottom: "12px",
                                                }}
                                            />
                                        </BoxWithIcon>

                                        <BoxWithIcon
                                            title="Nowoczesny design"
                                            description="Nasze budynki wyróżnia ponadczasowa architektura, łącząca styl i wysoki standard wykonania, a przy tym doskonale komponująca się z otoczeniem."
                                        >
                                            <img
                                                src="/img/budynek-1.jpg"
                                                alt="Nowoczesny design"
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    marginBottom: "12px",
                                                }}
                                            />
                                        </BoxWithIcon>

                                        <BoxWithIcon
                                            title="Udogodnienia"
                                            description="Wygoda na co dzień – każda klatka wyposażona jest w windę prowadzącą prosto do garażu. Oferujemy także komórki lokatorskie, które pozwalają bardziej cieszyć się przestrzenią w mieszkaniu."
                                        >
                                            <img
                                                src="/img/partner.jpg"
                                                alt="Udogodnienia"
                                                style={{
                                                    width: "100%",
                                                    objectPosition: "top",
                                                    height: "200px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    marginBottom: "12px",
                                                }}
                                            />
                                        </BoxWithIcon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section
                        className="about-section"
                        style={{ padding: "20px 20px" }}
                    >
                        <div className="elementor-container">
                            <div
                                className="about-grid"
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
                                            O nas
                                        </h3>
                                    </div>

                                    <div
                                        className="about-content"
                                        style={{
                                            display: "flex",
                                            gap: "40px",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <div style={{ flex: "1" }}>
                                            <img
                                                src="/img/partner.jpg"
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
                                                    padding: "20px",
                                                    fontSize: "17px",
                                                    marginBottom: "30px",
                                                    fontFamily:
                                                        "Poppins, sans-serif",
                                                }}
                                            >
                                                Zarządzająca firmą kadra wraz z
                                                doświadczoną grupą architektów,
                                                inżynierów i rzetelnych
                                                wykonawców od lat umiejętnie
                                                wykorzystuje potencjał lokalnego
                                                krajobrazu, realizując
                                                inwestycje mieszkaniowe. Rosnące
                                                grono zadowolonych klientów
                                                potwierdza naszą solidność i
                                                jakość inwestycji tworzonych dla
                                                Was z myślą o Was.
                                            </p>

                                            <a
                                                href="/lista-lokali"
                                                className="rounded-4xl border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white bg-w color-neutral-800"
                                                style={{
                                                    display: "inline-block",
                                                    border: "1px solid",
                                                    padding: "15px 30px",
                                                    textDecoration: "none",
                                                    fontWeight: "600",
                                                    transition: "all 0.3s ease",
                                                }}
                                            >
                                                Lista lokali
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="about-right"
                                    style={{
                                        flex: "1",
                                        marginTop: "-50px",
                                    }}
                                >
                                    <img
                                        src="/img/doswiadczenie.jpg"
                                        alt="Wnętrze apartamentu"
                                        style={{
                                            width: "100%",
                                            height: "400px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="p-6 items-center flex flex-col md:flex-row gap-8 mx-auto max-w-7xl mt-16">
                        <div className="w-80 md:w-1/2">
                            <Image
                                src="/img/mapka.png"
                                width="1000"
                                height="500"
                            ></Image>
                        </div>
                        <div style={{ flex: "1" }}>
                            <p
                                style={{
                                    color: "#6B6B6B",
                                    lineHeight: "1.8",
                                    padding: "0px",
                                    fontSize: "16px",
                                    marginBottom: "30px",
                                    fontFamily: "Poppins, sans-serif",
                                }}
                            >
                                Osiedle Olimpijczyków to nowoczesny kompleks
                                mieszkaniowy położony w sercu Tarnowskich Gór,
                                przy ul. Olimpijczyków – w bezpośrednim
                                sąsiedztwie aquaparku, hali sportowej oraz
                                urokliwego parku miejskiego. W najbliższej
                                okolicy znajdują się sklepy, punkty usługowe
                                oraz placówki edukacyjne – w tym szkoły i
                                przedszkola – co czyni codzienne życie jeszcze
                                bardziej wygodnym. Na terenie osiedla
                                zaplanowano lokale usługowe, które zwiększą
                                codzienny komfort mieszkańców. Dogodna
                                lokalizacja inwestycji zapewnia szybki i wygodny
                                dojazd zarówno do centrum Tarnowskich Gór, jak i
                                innych miast aglomeracji śląskiej. W pobliżu
                                znajdują się główne drogi komunikacyjne, w tym
                                Obwodnica Tarnowskich Gór i DK78. Osiedle mieści
                                się w spokojnej, kameralnej dzielnicy z przewagą
                                zabudowy jednorodzinnej, co gwarantuje komfort
                                życia z dala od zgiełku miasta. Zamieszkanie w
                                tej części Tarnowskich Gór to idealne
                                rozwiązanie dla osób w każdym wieku – zarówno
                                osób młodych, rodzin z dziećmi, jak i seniorów
                                poszukujących spokoju i wygody.
                            </p>
                        </div>
                    </section>
                    <section
                        className="elementor-section elementor-top-section elementor-section-boxed"
                        style={{
                            padding: "80px 0",
                        }}
                    >
                        <div className="elementor-container">
                            <div className="elementor-column elementor-col-100">
                                <div className="flex flex-col">
                                    <div className="mb-15 items-center flex flex-col">
                                        <h3
                                            style={{
                                                fontSize: "36px",
                                                fontWeight: "600",
                                                fontFamily:
                                                    "Poppins, sans-serif",
                                                textAlign: "center",
                                                marginBottom: "20px",
                                                color: "#333",
                                            }}
                                        >
                                            Sprawdź postępy w budowie
                                        </h3>

                                        <div
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "4px",
                                                padding: "4px 18px",
                                                borderRadius: "20px",
                                                backgroundColor:
                                                    "rgba(108, 117, 125, 0.1)",
                                                border: "1px solid rgba(108, 117, 125, 0.2)",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "8px",
                                                    height: "8px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "#6c757d",
                                                }}
                                            ></div>
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    fontFamily:
                                                        "Poppins, sans-serif",
                                                    color: "#6c757d",
                                                }}
                                            >
                                                ETAP III
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            position: "relative",
                                            maxWidth: "1000px",
                                            margin: "0 auto",
                                            padding: "0 20px",
                                        }}
                                    >
                                        {/* Timeline line */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "-20%",
                                                left: "40px",
                                                right: "40px",
                                                height: "2px",
                                                backgroundColor: "#DAA520",
                                                zIndex: 1,
                                            }}
                                        ></div>

                                        {[
                                            "Rozpoczęcie prac",
                                            "Stan surowy otwarty",
                                            "Stan surowy zamknięty",
                                            "Stan deweloperski",
                                            "Zamknięcie prac na budowie",
                                            "Pozwolenie na użytkowanie",
                                            "Przekazywanie kluczy",
                                        ].map((step, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    position: "relative",
                                                    zIndex: 2,
                                                    flex: 1,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        borderRadius: "50%",
                                                        backgroundColor:
                                                            index === 0
                                                                ? "#333"
                                                                : "#e0e0e0",
                                                        marginBottom: "15px",
                                                        border: "3px solid white",
                                                        boxShadow:
                                                            "0 2px 8px rgba(0,0,0,0.1)",
                                                    }}
                                                ></div>
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                        fontFamily:
                                                            "Poppins, sans-serif",
                                                        color:
                                                            index === 0
                                                                ? "#333"
                                                                : "#7e7e7e",
                                                        fontWeight:
                                                            index === 0
                                                                ? "600"
                                                                : "400",
                                                        maxWidth: "110px",
                                                        lineHeight: "1.3",
                                                    }}
                                                >
                                                    {step}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="flex flex-col mt-12">
                        <div className="mx-auto md:mb-12">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5086.683515454682!2d18.832443000000016!3d50.439849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471129674a919f67%3A0x3ddb75d40836ae69!2sOlimpijczyk%C3%B3w%2013%2C%2042-612%20Tarnowskie%20G%C3%B3ry%2C%20Polska!5e0!3m2!1spl!2sus!4v1758072504304!5m2!1spl!2sus"
                                width="1200"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
