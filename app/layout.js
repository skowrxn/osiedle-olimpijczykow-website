import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
import Head from "next/head";
import Script from "next/script";

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
                <Script id="facebook-pixel" strategy="afterInteractive">
                    {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '895598576889746');
                    fbq('track', 'PageView');
                    `}
                </Script>
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src="https://www.facebook.com/tr?id=895598576889746&ev=PageView&noscript=1"
                        alt=""
                    />
                </noscript>
                <ServiceWorkerRegistration />
                <Navigation />
                <main>{children}</main>
                <Footer />
                <CookieBanner />
            </body>
        </html>
    );
}
