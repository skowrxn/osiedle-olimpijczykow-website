"use client";

import React, { useState } from "react";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Tu można dodać logikę wysyłania formularza
        alert("Formularz został wysłany! (funkcjonalność do implementacji)");
    };

    return (
        <section
            className="elementor-section elementor-top-section"
            style={{
                padding: "80px 0",
                backgroundImage: "url(/img/wizualizacja-4.jpg)",
                backgroundPositionY: "center",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                position: "relative",
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
                style={{
                    position: "relative",
                    zIndex: 2,
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 20px",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "60px",
                        alignItems: "center",
                    }}
                    className="contact-grid"
                >
                    <div>
                        <h3
                            style={{
                                fontSize: "46px",
                                color: "#ffffff",
                                fontWeight: "600",
                                marginBottom: "20px",
                                fontFamily: "Poppins, sans-serif",
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
                            Postaramy się odpowiedzieć tak szybko jak to możliwe
                        </p>
                    </div>

                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "40px",
                            boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                            borderRadius: "8px",
                        }}
                    >
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

                        <form className="wpcf7-form" onSubmit={handleSubmit}>
                            <div style={{ marginBottom: "20px" }}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Imię"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        fontSize: "16px",
                                        transition: "border-color 0.3s ease",
                                    }}
                                    onFocus={(e) =>
                                        (e.target.style.borderColor = "#232323")
                                    }
                                    onBlur={(e) =>
                                        (e.target.style.borderColor = "#ddd")
                                    }
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Adres Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        fontSize: "16px",
                                        transition: "border-color 0.3s ease",
                                    }}
                                    onFocus={(e) =>
                                        (e.target.style.borderColor = "#232323")
                                    }
                                    onBlur={(e) =>
                                        (e.target.style.borderColor = "#ddd")
                                    }
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Telefon"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        fontSize: "16px",
                                        transition: "border-color 0.3s ease",
                                    }}
                                    onFocus={(e) =>
                                        (e.target.style.borderColor = "#232323")
                                    }
                                    onBlur={(e) =>
                                        (e.target.style.borderColor = "#ddd")
                                    }
                                />
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <textarea
                                    name="message"
                                    placeholder="Wiadomość"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        resize: "vertical",
                                        fontSize: "16px",
                                        fontFamily: "inherit",
                                        transition: "border-color 0.3s ease",
                                    }}
                                    onFocus={(e) =>
                                        (e.target.style.borderColor = "#232323")
                                    }
                                    onBlur={(e) =>
                                        (e.target.style.borderColor = "#ddd")
                                    }
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "#232323",
                                    color: "white",
                                    padding: "12px 30px",
                                    border: "none",
                                    borderRadius: "4px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    width: "100%",
                                    fontSize: "16px",
                                    transition: "background-color 0.3s ease",
                                }}
                                onMouseOver={(e) =>
                                    (e.target.style.backgroundColor = "#3a3a3a")
                                }
                                onMouseOut={(e) =>
                                    (e.target.style.backgroundColor = "#232323")
                                }
                            >
                                Wyślij wiadomość
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .contact-grid {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default ContactSection;
