import Image from "next/image";
import Link from "next/link";

const navLinks = [
    { href: "/", label: "Strona Główna" },
    { href: "/o-inwestycji", label: "O inwestycji" },
    { href: "/lokalizacja", label: "Lokalizacja" },
    { href: "/lista-lokali", label: "Lista lokali" },
    { href: "/galeria", label: "Galeria" },
    { href: "/kontakt", label: "Kontakt" },
    { href: "/prospekt", label: "Prospekt" },
];

export default function Footer() {
    return (
        <footer
            className="text-neutral-300"
            style={{ backgroundColor: "var(--quere-button-color-idle)" }}
        >
            <div className="container max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row gap-6 lg:gap-12 justify-between items-start">
                    {/* Column 1: Logo and Description */}
                    <div
                        className="flex flex-col items-start flex-shrink-0"
                        style={{ width: "280px" }}
                    >
                        <p className="text-white text-lg font-semibold mb-4 w-full">
                            Osiedle Olimpijczyków
                        </p>
                        <p className="text-neutral-400 text-[15px] mt-2 text-left">
                            Nowa inwestycja w sercu Tarnowskich Gór o wysokim
                            standardzie wykonania, nawiązująca do nowoczesnych
                            trendów, łącząc funkcjonalność i prostotę,
                            jednocześnie zachowując elegancję oraz szerokie
                            możliwości aranżacji.
                        </p>
                    </div>

                    {/* Column 2: Contact Info */}
                    <div
                        className="flex flex-col items-start flex-shrink-0"
                        style={{ width: "240px" }}
                    >
                        <p className="text-white text-lg font-semibold mb-4 w-full">
                            INDELIT Sp. z o.o.
                        </p>
                        <address className="text-neutral-400 text-[15px] not-italic text-left">
                            42-612 Tarnowskie Góry
                            <br />
                            ul. Olimpijczyków 13A
                            <br />
                            email:{" "}
                            <a
                                href="mailto:biuro@indelit.pl"
                                className="hover:text-white transition-colors"
                            >
                                biuro@indelit.pl
                            </a>
                            <br />
                            Tel.{" "}
                            <a
                                href="tel:+48692492166"
                                className="hover:text-white transition-colors"
                            >
                                +48 692 492 166
                            </a>
                        </address>
                    </div>

                    {/* Column 3: Navigation Links */}
                    <div
                        className="flex flex-col items-start flex-shrink-0"
                        style={{ width: "200px" }}
                    >
                        <p
                            style={{ color: "white" }}
                            className="text-white text-lg font-semibold mb-4 w-full"
                        >
                            Podstrony
                        </p>
                        <nav className="flex flex-col items-start space-y-1">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="text-neutral-400 text-[15px] hover:text-white transition-colors"
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Column 4: Partners */}
                    <div
                        className="flex flex-col items-start flex-shrink-0"
                        style={{ width: "260px" }}
                    >
                        <p className="text-white text-lg font-semibold mb-4 w-full">
                            Nasi Partnerzy
                        </p>
                        <div className="text-neutral-400 text-[15px] mb-2 text-left">
                            W Swoim Stylu Anna Swoboda
                            <br />
                            Projektowanie wnętrz domowych
                        </div>
                        <Image
                            src="/img/projektowanie-wnetrz-logo.png"
                            alt="Projektowanie wnętrz logo"
                            width={100}
                            height={40}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}
