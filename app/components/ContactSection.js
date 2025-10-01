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
                        gridTemplateColumns: "3fr 2fr",
                        gap: "60px",
                        alignItems: "center",
                    }}
                    className="contact-grid"
                >
                    <div>
                        <h3
                            style={{
                                fontSize: "70px",
                                lineHeight: "80px",
                                color: "#ffffff",
                                fontWeight: "500",
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
                        className="bg-white p-10 max-w-md"
                        style={{
                            boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
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

                        <form
                            className="wpcf7-form space-y-2"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Imię"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    padding: "8px 0px",
                                    border: "none",
                                    borderBottom: "1px solid #232323",
                                    borderRadius: "0px",
                                    backgroundColor: "transparent",
                                    color: "#333",
                                    fontSize: "16px",
                                    outline: "none",
                                    fontFamily: "Poppins, sans-serif",
                                    transition: "border-color 0.3s ease",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderBottomColor = "#000";
                                    e.target.placeholder = "";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderBottomColor =
                                        "#232323";
                                    if (!e.target.value) {
                                        e.target.placeholder = "Imię";
                                    }
                                }}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Adres Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    padding: "8px 0px",
                                    border: "none",
                                    borderBottom: "1px solid #232323",
                                    borderRadius: "0px",
                                    backgroundColor: "transparent",
                                    color: "#333",
                                    fontSize: "16px",
                                    outline: "none",
                                    fontFamily: "Poppins, sans-serif",
                                    transition: "border-color 0.3s ease",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderBottomColor = "#000";
                                    e.target.placeholder = "";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderBottomColor = "#333";
                                    if (!e.target.value) {
                                        e.target.placeholder = "Adres Email";
                                    }
                                }}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Telefon"
                                value={formData.phone}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    padding: "5px 0px",
                                    border: "none",
                                    borderBottom: "1px solid #232323",
                                    borderRadius: "0px",
                                    backgroundColor: "transparent",
                                    color: "#333",
                                    fontSize: "16px",
                                    outline: "none",
                                    fontFamily: "Poppins, sans-serif",
                                    transition: "border-color 0.3s ease",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderBottomColor = "#000";
                                    e.target.placeholder = "";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderBottomColor = "#333";
                                    if (!e.target.value) {
                                        e.target.placeholder = "Telefon";
                                    }
                                }}
                            />
                            <textarea
                                name="message"
                                placeholder="Wiadomość"
                                rows="3"
                                value={formData.message}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    padding: "5px 0px",
                                    border: "none",
                                    borderBottom: "1px solid #232323",
                                    borderRadius: "0px",
                                    backgroundColor: "transparent",
                                    color: "#333",
                                    resize: "vertical",
                                    fontSize: "16px",
                                    fontFamily: "Poppins, sans-serif",
                                    outline: "none",
                                    transition: "border-color 0.3s ease",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderBottomColor = "#000";
                                    e.target.placeholder = "";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderBottomColor = "#333";
                                    if (!e.target.value) {
                                        e.target.placeholder = "Wiadomość";
                                    }
                                }}
                            ></textarea>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "#232323",
                                    color: "white",
                                    marginTop: "10px",
                                    padding: "16px 32px",
                                    border: "none",
                                    borderRadius: "50px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    fontFamily: "Poppins, sans-serif",
                                    transition: "all 0.3s ease",
                                    width: "100%",
                                    height: "56px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = "#3a3a3a";
                                    e.target.style.transform =
                                        "translateY(-1px)";
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = "#232323";
                                    e.target.style.transform = "translateY(0)";
                                }}
                            >
                                Wyślij
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

                input::placeholder,
                textarea::placeholder {
                    color: #232323;
                    opacity: 1;
                    font-size: 14px;
                }
            `}</style>
        </section>
    );
};

export default ContactSection;
