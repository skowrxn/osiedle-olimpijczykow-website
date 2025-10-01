import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Head from "next/head";

export const metadata = {
    title: "Osiedle Olimpijczyków",
    description: "Mieszkania w Osiedlu Olimpijczyków",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Poppins:400,600,500,400,500,600,700%7CPlayfair%20Display:600,400,500,600,700,600italic&display=swap"
                />
            </head>
            <body className="scroll-smooth">
                <Navigation />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
