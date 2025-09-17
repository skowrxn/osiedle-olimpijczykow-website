import PropertySearch from "../components/PropertySearch";
import BoxWithIcon from "../components/BoxWithIcon";
import Image from "next/image";

export default function Lokalizacja() {
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
                                        Lokalizacja
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="p-6 flex flex-col md:flex-row gap-8 mx-auto max-w-7xl mt-16">
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
                        className="features-section"
                        style={{ padding: "40px 0" }}
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
                    <section className="flex flex-col">
                        <div className="mx-auto  md:mb-12">
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
