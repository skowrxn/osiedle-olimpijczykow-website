import Link from "next/link";

export default function Footer() {
    return (
        <footer
            className="text-gray-200"
            style={{ backgroundColor: "var(--quere-button-color-idle)" }}
        >
            <div className="container mx-auto px-4 py-8 text-center">
                <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
                    <Link
                        href="/"
                        className="hover:text-white transition-colors"
                    >
                        Strona Główna
                    </Link>
                    <Link
                        href="/o-inwestycji"
                        className="hover:text-white transition-colors"
                    >
                        O inwestycji
                    </Link>
                    <Link
                        href="/lokalizacja"
                        className="hover:text-white transition-colors"
                    >
                        Lokalizacja
                    </Link>
                    <Link
                        href="/lista-lokali"
                        className="hover:text-white transition-colors"
                    >
                        Lista lokali
                    </Link>
                    <Link
                        href="/galeria"
                        className="hover:text-white transition-colors"
                    >
                        Galeria
                    </Link>
                    <Link
                        href="/kontakt"
                        className="hover:text-white transition-colors"
                    >
                        Kontakt
                    </Link>
                    <Link
                        href="/prospekt"
                        className="hover:text-white transition-colors"
                    >
                        Prospekt
                    </Link>
                </nav>

                <div className="mt-6 text-xs text-gray-400">
                    © {new Date().getFullYear()} Osiedle Olimpijczyków. Wszelkie
                    prawa zastrzeżone.
                </div>
            </div>
        </footer>
    );
}
