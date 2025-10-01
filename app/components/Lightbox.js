"use client";

import React, { useState, useEffect, useCallback } from "react";

const Lightbox = ({ images, isOpen, onClose, currentIndex = 0 }) => {
    const [activeIndex, setActiveIndex] = useState(currentIndex);
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);

    useEffect(() => {
        setActiveIndex(currentIndex);
    }, [currentIndex]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "ArrowLeft":
                    setActiveIndex((prevIndex) =>
                        prevIndex === 0 ? images.length - 1 : prevIndex - 1
                    );
                    break;
                case "ArrowRight":
                    setActiveIndex((prevIndex) =>
                        prevIndex === images.length - 1 ? 0 : prevIndex + 1
                    );
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, images.length, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const nextImage = useCallback(() => {
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    const prevImage = useCallback(() => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }, [images.length]);

    const onTouchStart = (e) => {
        setTouchEndX(null);
        setTouchStartX(e.changedTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEndX(e.changedTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStartX || touchEndX === null) return;
        const distance = touchStartX - touchEndX;
        const threshold = 50; // px
        if (distance > threshold) {
            nextImage();
        } else if (distance < -threshold) {
            prevImage();
        }
        setTouchStartX(null);
        setTouchEndX(null);
    };

    if (!isOpen || !images || images.length === 0) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            style={{ zIndex: 9999 }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white text-2xl hover:text-neutral-300 transition-colors z-50"
                style={{
                    background: "rgba(0,0,0,0.5)",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                ✕
            </button>

            {/* Navigation arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-neutral-300 transition-colors"
                        style={{
                            background: "rgba(0,0,0,0.7)",
                            borderRadius: "50%",
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                            cursor: "pointer",
                            zIndex: 60,
                            fontSize: "24px",
                        }}
                        aria-label="Poprzednie zdjęcie"
                    >
                        ❮
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-neutral-300 transition-colors"
                        style={{
                            background: "rgba(0,0,0,0.7)",
                            borderRadius: "50%",
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                            cursor: "pointer",
                            zIndex: 60,
                            fontSize: "24px",
                        }}
                        aria-label="Następne zdjęcie"
                    >
                        ❯
                    </button>
                </>
            )}

            {/* Main image */}
            <div
                className="relative flex items-center justify-center w-full h-full"
                style={{
                    padding: "20px",
                    boxSizing: "border-box",
                    touchAction: "pan-y",
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <img
                    src={images[activeIndex]}
                    alt={`Zdjęcie ${activeIndex + 1}`}
                    style={{
                        maxHeight: "calc(100vh - 40px)",
                        maxWidth: "calc(100vw - 40px)",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        display: "block",
                    }}
                />

                {/* Image counter */}
                {images.length > 1 && (
                    <div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm"
                        style={{
                            background: "rgba(0,0,0,0.7)",
                            padding: "8px 16px",
                            borderRadius: "20px",
                            zIndex: 10,
                        }}
                    >
                        {activeIndex + 1} / {images.length}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lightbox;
