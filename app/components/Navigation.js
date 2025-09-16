import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
    return (
        <nav className="bg-white shadow-md px-4 py-6">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Image
                    src="/img/logo.png"
                    alt="indelit — Osiedle Olimpijczyków"
                    width={180}
                    height={50}
                    className="rounded-sm"
                    priority
                />

                {/* Navigation Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link
                        href="/"
                        className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                    >
                        Strona Główna
                    </Link>
                    <Link
                        href="/o-inwestycji"
                        className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                    >
                        O inwestycji
                    </Link>
                    <Link
                        href="/lokalizacja"
                        className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                    >
                        Lokalizacja
                    </Link>
                    <Link
                        href="/lista-lokali"
                        className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                    >
                        Lista lokali
                    </Link>
                    <Link
                        href="/galeria"
                        className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                    >
                        Galeria
                    </Link>
                    <Link
                        href="/kontakt"
                        className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                    >
                        Kontakt
                    </Link>
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
