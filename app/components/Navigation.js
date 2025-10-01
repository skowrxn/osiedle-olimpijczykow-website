"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-4 py-6 border-b-1 border-neutral-200">
            <div className="container mx-auto flex justify-around items-center">
                {/* Logo */}
                <Link href="/" className="cursor-pointer">
                    <Image
                        src="/img/2023-07-indelit-logo-gradient-PNG-olimpijczykow.png"
                        alt="indelit — Osiedle Olimpijczyków"
                        width={180}
                        height={50}
                        className="rounded-sm hover:opacity-80 transition-opacity duration-300"
                        priority
                    />
                </Link>
                {/* Navigation Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    {[
                        { href: "/", label: "Strona Główna" },
                        { href: "/o-inwestycji", label: "O inwestycji" },
                        { href: "/lokalizacja", label: "Lokalizacja" },
                        { href: "/lista-lokali", label: "Lista lokali" },
                        { href: "/galeria", label: "Galeria" },
                        { href: "/kontakt", label: "Kontakt" },
                    ].map(({ href, label }, idx, arr) => {
                        const isActive = pathname === href;
                        return (
                            <Fragment key={href}>
                                <Link
                                    href={href}
                                    className="relative text-neutral-800 text-[15px] font-bold leading-normal"
                                    style={{
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    {label}
                                    {/* Underline animation */}
                                    <span
                                        className={`absolute left-0 bottom-0 h-px bg-neutral-800 transition-all duration-300 ease-out ${
                                            isActive
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        }`}
                                        style={{
                                            transformOrigin: "left center",
                                        }}
                                    ></span>
                                </Link>
                                {idx < arr.length - 1 && (
                                    <span className="text-neutral-800 text-sm select-none">
                                        |
                                    </span>
                                )}
                            </Fragment>
                        );
                    })}
                </div>
                {/* Mobile menu button */}
                <button
                    className="md:hidden"
                    aria-label="Otwórz menu"
                    aria-expanded={isMobileOpen}
                    onClick={() => setIsMobileOpen((prev) => !prev)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
            {isMobileOpen && (
                <div className="md:hidden border-t border-neutral-200 mt-1">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
                        {[
                            { href: "/", label: "Strona Główna" },
                            { href: "/o-inwestycji", label: "O inwestycji" },
                            { href: "/lokalizacja", label: "Lokalizacja" },
                            { href: "/lista-lokali", label: "Lista lokali" },
                            { href: "/galeria", label: "Galeria" },
                            { href: "/kontakt", label: "Kontakt" },
                        ].map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-neutral-800 text-base font-semibold py-2"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
