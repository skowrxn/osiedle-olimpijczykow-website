"use client";

export default function Kontakt() {
    return (
        <section>
            <div className="container mx-auto px-4 py-12 flex justify-evenly mt-6 contact-grid">
                <div className="max-w-4xl">
                    <h1 className="text-7xl font-light mb-16 text-neutral-800">
                        Skontaktuj się
                    </h1>
                    <span className="font-bold my-12 text-neutral-700 text-xl">
                        Indelit Olimpijczyków Sp. z o.o.
                    </span>
                    <p className="leading-10">
                        42-612 Tarnowskie Góry <br />
                        Olimpijczyków 13A/24 <br /> email: biuro@indelit.pl{" "}
                        <br />
                        Tel. +48 692 492 166
                    </p>
                </div>
                <div className="contact-form">
                    <h3
                        style={{
                            fontSize: "24px",
                            fontWeight: "600",
                            marginBottom: "10px",
                            fontFamily: "Poppins, sans-serif",
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
                        Przetwarzamy dane osobowe zgodnie z naszą polityką
                        prywatności
                    </p>

                    <form className="wpcf7-form">
                        <div style={{ marginBottom: "10px" }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Imię"
                                style={{
                                    width: "100%",
                                    borderRadius: 0,
                                    padding: "12px 0",
                                    border: "none",
                                    borderBottom: "1px solid #333",
                                    background: "transparent",
                                    outline: "none",
                                    fontSize: "16px",
                                    transition: "border-color 0.3s ease",
                                }}
                                onFocus={(e) =>
                                    (e.target.style.borderBottomColor =
                                        "#007acc")
                                }
                                onBlur={(e) =>
                                    (e.target.style.borderBottomColor = "#333")
                                }
                                required
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Adres Email"
                                style={{
                                    width: "100%",
                                    padding: "12px 0",
                                    borderRadius: 0,
                                    border: "none",
                                    borderBottom: "1px solid #333",
                                    background: "transparent",
                                    outline: "none",
                                    fontSize: "16px",
                                    transition: "border-color 0.3s ease",
                                }}
                                onFocus={(e) =>
                                    (e.target.style.borderBottomColor =
                                        "#007acc")
                                }
                                onBlur={(e) =>
                                    (e.target.style.borderBottomColor = "#333")
                                }
                                required
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Telefon"
                                style={{
                                    width: "100%",
                                    padding: "12px 0",
                                    border: "none",
                                    borderRadius: 0,
                                    borderBottom: "1px solid #333",
                                    background: "transparent",
                                    outline: "none",
                                    fontSize: "16px",
                                    transition: "border-color 0.3s ease",
                                }}
                                onFocus={(e) =>
                                    (e.target.style.borderBottomColor =
                                        "#007acc")
                                }
                                onBlur={(e) =>
                                    (e.target.style.borderBottomColor = "#333")
                                }
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <textarea
                                name="message"
                                placeholder="Wiadomość"
                                rows="4"
                                style={{
                                    width: "100%",
                                    padding: "12px 0",
                                    borderRadius: 0,
                                    border: "none",
                                    borderBottom: "1px solid #333",
                                    background: "transparent",
                                    outline: "none",
                                    fontSize: "16px",
                                    resize: "vertical",
                                    transition: "border-color 0.3s ease",
                                    fontFamily: "inherit",
                                }}
                                onFocus={(e) =>
                                    (e.target.style.borderBottomColor =
                                        "#007acc")
                                }
                                onBlur={(e) =>
                                    (e.target.style.borderBottomColor = "#333")
                                }
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            style={{
                                borderRadius: "50px",
                                display: "inline-block",
                                border: "1px solid",
                                padding: "15px 30px",
                                textDecoration: "none",
                                fontWeight: "600",
                                transition: "all 0.3s ease",
                            }}
                        >
                            Wyślij wiadomość
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
