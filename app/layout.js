import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export const metadata = {
    title: "Osiedle Olimpijczyków",
    description: "Mieszkania w Osiedlu Olimpijczyków",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
            <body className="scroll-smooth">
                <Navigation />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
