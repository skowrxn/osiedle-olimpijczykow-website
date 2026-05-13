"use client";

import React, { useState } from "react";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus("success");
                // Wyczyść formularz po udanym wysłaniu
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                });
                // Ukryj komunikat sukcesu po 5 sekundach
                setTimeout(() => setSubmitStatus(null), 5000);

                // Meta Pixel Event
                if (typeof window !== "undefined" && window.fbq) {
                    window.fbq("track", "Lead");
                }
            } else {
                setSubmitStatus("error");
                console.error("Error response:", data);
            }
        } catch (error) {
            setSubmitStatus("error");
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
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
                            {/* Status messages */}
                            {submitStatus === "success" && (
                                <div
                                    style={{
                                        backgroundColor: "#d4edda",
                                        color: "#155724",
                                        padding: "12px",
                                        borderRadius: "4px",
                                        marginBottom: "15px",
                                        border: "1px solid #c3e6cb",
                                        fontSize: "14px",
                                    }}
                                >
                                    ✓ Wiadomość została wysłana pomyślnie!
                                    Skontaktujemy się z Tobą wkrótce.
                                </div>
                            )}
                            {submitStatus === "error" && (
                                <div
                                    style={{
                                        backgroundColor: "#f8d7da",
                                        color: "#721c24",
                                        padding: "12px",
                                        borderRadius: "4px",
                                        marginBottom: "15px",
                                        border: "1px solid #f5c6cb",
                                        fontSize: "14px",
                                    }}
                                >
                                    ✗ Wystąpił błąd podczas wysyłania
                                    wiadomości. Spróbuj ponownie.
                                </div>
                            )}
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
                                disabled={isSubmitting}
                                style={{
                                    backgroundColor: isSubmitting
                                        ? "#666"
                                        : "#232323",
                                    color: "white",
                                    marginTop: "10px",
                                    padding: "16px 32px",
                                    border: "none",
                                    borderRadius: "50px",
                                    cursor: isSubmitting
                                        ? "not-allowed"
                                        : "pointer",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    fontFamily: "Poppins, sans-serif",
                                    transition: "all 0.3s ease",
                                    width: "100%",
                                    height: "56px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    opacity: isSubmitting ? 0.7 : 1,
                                }}
                                onMouseOver={(e) => {
                                    if (!isSubmitting) {
                                        e.target.style.backgroundColor =
                                            "#3a3a3a";
                                        e.target.style.transform =
                                            "translateY(-1px)";
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!isSubmitting) {
                                        e.target.style.backgroundColor =
                                            "#232323";
                                        e.target.style.transform =
                                            "translateY(0)";
                                    }
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                                border: "2px solid #fff",
                                                borderTop:
                                                    "2px solid transparent",
                                                borderRadius: "50%",
                                                animation:
                                                    "spin 0.8s linear infinite",
                                            }}
                                        ></span>
                                        Wysyłanie...
                                    </>
                                ) : (
                                    "Wyślij"
                                )}
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

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </section>
    );
};

export default ContactSection;
