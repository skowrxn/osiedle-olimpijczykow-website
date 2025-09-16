"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="bg-white shadow-md px-4 py-6">
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
                                    className="relative text-gray-800 text-sm font-bold group"
                                    style={{
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    {label}
                                    {/* Underline animation */}
                                    <span
                                        className={`absolute left-0 bottom-0 h-px bg-gray-800 transition-all duration-300 ease-out ${
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
                                    <span className="text-gray-800 text-lg select-none">
                                        |
                                    </span>
                                )}
                            </Fragment>
                        );
                    })}
                </div>
                {/* Mobile menu button */}
                <button className="md:hidden">
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
        </nav>
    );
}
