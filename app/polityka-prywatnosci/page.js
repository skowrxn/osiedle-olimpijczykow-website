import Head from "next/head";

export default function PolitykaPrywatnosci() {
    return (
        <div className="min-h-screen bg-gray-50 py-16 md:py-24">
            <Head>
                <title>Polityka Prywatności | Osiedle Olimpijczyków</title>
                <meta name="robots" content="noindex, follow" />
            </Head>

            <div className="container max-w-4xl mx-auto px-4 md:px-8">
                <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-6 md:p-12 text-gray-800">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 border-b pb-4">
                        Polityka Prywatności
                    </h1>

                    <div className="space-y-6 text-[15px] leading-relaxed">
                        <p>
                            <strong>Serwis:</strong> osiedleolimpijczykow.pl{" "}
                            <br />
                            <strong>Data ostatniej aktualizacji:</strong> 1
                            czerwca 2025 r.
                        </p>

                        <hr className="border-gray-200" />

                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                                1. Administrator danych osobowych
                            </h2>
                            <p>Administratorem danych osobowych jest:</p>
                            <p className="mt-2 text-gray-700">
                                <strong>
                                    Indelit Olimpijczyków Sp. z o.o.
                                </strong>
                                <br />
                                ul. Olimpijczyków 13A/24
                                <br />
                                42-612 Tarnowskie Góry
                            </p>
                            <p className="mt-2 text-gray-700">
                                E-mail:{" "}
                                <a
                                    href="mailto:biuro@indelit.pl"
                                    className="text-blue-600 hover:underline"
                                >
                                    biuro@indelit.pl
                                </a>
                                <br />
                                Tel.:{" "}
                                <a
                                    href="tel:+48692492166"
                                    className="text-blue-600 hover:underline"
                                >
                                    +48 692 492 166
                                </a>
                            </p>
                            <p className="mt-2 text-gray-700">
                                KRS: 0000713432
                                <br />
                                NIP: 6452554332
                                <br />
                                REGON: 369242326
                            </p>
                        </section>

                        <hr className="border-gray-200" />

                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                                2. Cel i podstawa przetwarzania danych osobowych
                            </h2>
                            <p className="mb-4">
                                Administrator przetwarza dane osobowe w
                                następujących celach:
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-800">
                                2.1 Formularz kontaktowy
                            </h3>
                            <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700">
                                <li>
                                    <strong>Cel:</strong> Odpowiedź na
                                    wiadomości przesłane przez formularz
                                    kontaktowy, w tym udzielenie informacji o
                                    ofercie mieszkaniowej, dostępnych lokalach
                                    oraz przebiegu inwestycji.
                                </li>
                                <li>
                                    <strong>Podstawa prawna:</strong> Art. 6
                                    ust. 1 lit. b RODO (niezbędność do podjęcia
                                    działań na żądanie osoby, której dane
                                    dotyczą, przed zawarciem umowy) lub art. 6
                                    ust. 1 lit. f RODO (prawnie uzasadniony
                                    interes administratora – obsługa
                                    korespondencji).
                                </li>
                                <li>
                                    <strong>Zakres danych:</strong> imię i
                                    nazwisko, adres e-mail, numer telefonu
                                    (jeśli podany), treść wiadomości.
                                </li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-800">
                                2.2 Marketing i remarketing (Meta Pixel / Meta
                                Ads)
                            </h3>
                            <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700">
                                <li>
                                    <strong>Cel:</strong> Wyświetlanie
                                    spersonalizowanych reklam w serwisach
                                    społecznościowych Meta (Facebook, Instagram)
                                    osobom, które odwiedziły serwis lub wyraziły
                                    zainteresowanie ofertą.
                                </li>
                                <li>
                                    <strong>Podstawa prawna:</strong> Art. 6
                                    ust. 1 lit. a RODO (zgoda wyrażona poprzez
                                    akceptację plików cookies w bannerze
                                    cookie).
                                </li>
                                <li>
                                    <strong>Zakres danych:</strong> dane
                                    behawioralne zbierane przez Meta Pixel
                                    (odwiedzone podstrony, wykonane działania,
                                    adres IP, identyfikatory cookies).
                                </li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-800">
                                2.3 Analityka i statystyki serwisu
                            </h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                <li>
                                    <strong>Cel:</strong> Analiza ruchu na
                                    stronie i optymalizacja jej działania.
                                </li>
                                <li>
                                    <strong>Podstawa prawna:</strong> Art. 6
                                    ust. 1 lit. f RODO (prawnie uzasadniony
                                    interes administratora) lub art. 6 ust. 1
                                    lit. a RODO (zgoda na cookies).
                                </li>
                            </ul>
                        </section>

                        <hr className="border-gray-200" />

                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                                3. Pliki cookies i Meta Pixel
                            </h2>

                            <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-800">
                                3.1 Czym są pliki cookies?
                            </h3>
                            <p className="mb-4 text-gray-700">
                                Pliki cookies (ciasteczka) to małe pliki
                                tekstowe zapisywane na urządzeniu użytkownika
                                przez przeglądarkę internetową. Serwis korzysta
                                z cookies własnych oraz cookies podmiotów
                                trzecich.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-800">
                                3.2 Meta Pixel
                            </h3>
                            <p className="mb-2 text-gray-700">
                                Na stronie osiedleolimpijczykow.pl zainstalowany
                                jest <strong>Meta Pixel</strong> — narzędzie
                                analityczno-reklamowe firmy Meta Platforms
                                Ireland Limited (4 Grand Canal Square, Dublin 2,
                                Irlandia).
                            </p>
                            <p className="mb-2 text-gray-700">
                                Meta Pixel zbiera informacje o działaniach
                                podejmowanych przez użytkowników na stronie i
                                przekazuje je do Meta w celu:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700">
                                <li>
                                    mierzenia skuteczności kampanii reklamowych
                                    (Meta Ads),
                                </li>
                                <li>
                                    budowania grup odbiorców remarketingowych,
                                </li>
                                <li>
                                    wyświetlania spersonalizowanych reklam na
                                    platformach Facebook i Instagram.
                                </li>
                            </ul>
                            <p className="mb-4 text-gray-700">
                                Dane zbierane przez Meta Pixel mogą być
                                przekazywane do USA i innych krajów poza EOG.
                                Więcej informacji:{" "}
                                <a
                                    href="https://www.facebook.com/privacy/policy/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    https://www.facebook.com/privacy/policy/
                                </a>
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-800">
                                3.3 Rodzaje plików cookies stosowanych w
                                serwisie
                            </h3>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border p-2 font-semibold">
                                                Rodzaj
                                            </th>
                                            <th className="border p-2 font-semibold">
                                                Cel
                                            </th>
                                            <th className="border p-2 font-semibold">
                                                Podstawa
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border p-2">
                                                Niezbędne
                                            </td>
                                            <td className="border p-2">
                                                Poprawne działanie strony
                                            </td>
                                            <td className="border p-2">
                                                Prawnie uzasadniony interes
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2">
                                                Analityczne
                                            </td>
                                            <td className="border p-2">
                                                Statystyki odwiedzin
                                            </td>
                                            <td className="border p-2">
                                                Zgoda
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2">
                                                Marketingowe / Meta Pixel
                                            </td>
                                            <td className="border p-2">
                                                Remarketing, reklamy Meta Ads
                                            </td>
                                            <td className="border p-2">
                                                Zgoda
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-700">
                                Użytkownik może zarządzać zgodą na cookies
                                poprzez baner cookie wyświetlany przy pierwszej
                                wizycie na stronie lub w ustawieniach
                                przeglądarki internetowej.
                            </p>
                        </section>

                        <hr className="border-gray-200" />

                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                                4. Odbiorcy danych osobowych
                            </h2>
                            <p className="mb-2 text-gray-700">
                                Dane osobowe mogą być udostępniane:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700">
                                <li>
                                    <strong>
                                        Meta Platforms Ireland Limited
                                    </strong>{" "}
                                    – w zakresie danych zbieranych przez Meta
                                    Pixel (jeśli użytkownik wyraził zgodę na
                                    cookies marketingowe),
                                </li>
                                <li>
                                    <strong>
                                        dostawcom usług IT i hostingowych
                                    </strong>{" "}
                                    – w zakresie niezbędnym do utrzymania i
                                    obsługi serwisu,
                                </li>
                                <li>
                                    <strong>
                                        podmiotom świadczącym usługi księgowe,
                                        prawne i administracyjne
                                    </strong>{" "}
                                    – gdy jest to niezbędne dla działalności
                                    Administratora.
                                </li>
                            </ul>
                            <p className="text-gray-700">
                                Administrator nie sprzedaje danych osobowych
                                użytkowników.
                            </p>
                        </section>

                        <hr className="border-gray-200" />

                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                                5. Przekazywanie danych do państw trzecich
                            </h2>
                            <p className="text-gray-700">
                                W związku z korzystaniem z Meta Pixel dane mogą
                                być przekazywane do Stanów Zjednoczonych i
                                innych krajów poza Europejskim Obszarem
                                Gospodarczym. Transfer danych odbywa się na
                                podstawie standardowych klauzul umownych
                                zatwierdzonych przez Komisję Europejską lub
                                innych mechanizmów przewidzianych przez RODO.
                            </p>
                        </section>

                        <hr className="border-gray-200" />

                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                                6. Okres przechowywania danych
                            </h2>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border p-2 font-semibold">
                                                Kategoria danych
                                            </th>
                                            <th className="border p-2 font-semibold">
                                                Okres przechowywania
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border p-2">
                                                Dane z formularza kontaktowego
                                            </td>
                                            <td className="border p-2">
                                                Do czasu obsługi zapytania, a
                                                następnie do wygaśnięcia
                                                ewentualnych roszczeń (max. 3
                                                lata)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2">
                                                Dane zbierane przez Meta Pixel
                                            </td>
                                            <td className="border p-2">
                                                Zgodnie z polityką Meta – do 180
                                                dni lub dłużej, w zależności od
                                                ustawień kampanii
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border p-2">
                                                Dane analityczne (cookies)
                                            </td>
                                            <td className="border p-2">
                                                Do 2 lat lub do wycofania zgody
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <hr className="border-gray-200" />

                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                                7. Prawa osób, których dane dotyczą
                            </h2>
                            <p className="mb-2 text-gray-700">
                                Każda osoba, której dane są przetwarzane, ma
                                prawo do:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700">
                                <li>
                                    <strong>dostępu</strong> do swoich danych
                                    (art. 15 RODO),
                                </li>
                                <li>
                                    <strong>sprostowania</strong> danych
                                    nieprawidłowych lub niekompletnych (art. 16
                                    RODO),
                                </li>
                                <li>
                                    <strong>usunięcia</strong> danych („prawo do
                                    bycia zapomnianym&rdquo;) (art. 17 RODO),
                                </li>
                                <li>
                                    <strong>ograniczenia przetwarzania</strong>{" "}
                                    (art. 18 RODO),
                                </li>
                                <li>
                                    <strong>przenoszenia danych</strong> (art.
                                    20 RODO),
                                </li>
                                <li>
                                    <strong>wniesienia sprzeciwu</strong> wobec
                                    przetwarzania opartego na prawnie
                                    uzasadnionym interesie (art. 21 RODO),
                                </li>
                                <li>
                                    <strong>wycofania zgody</strong> w dowolnym
                                    momencie, bez wpływu na zgodność z prawem
                                    przetwarzania dokonanego przed jej
                                    wycofaniem,
                                </li>
                                <li>
                                    <strong>wniesienia skargi</strong> do
                                    Prezesa Urzędu Ochrony Danych Osobowych (ul.
                                    Stawki 2, 00-193 Warszawa, uodo.gov.pl).
                                </li>
                            </ul>
                            <p className="text-gray-700">
                                W celu realizacji swoich praw prosimy o kontakt:{" "}
                                <br />
                                <strong>E-mail:</strong>{" "}
                                <a
                                    href="mailto:biuro@indelit.pl"
                                    className="text-blue-600 hover:underline"
                                >
                                    biuro@indelit.pl
                                </a>{" "}
                                <br />
                                <strong>Tel.:</strong>{" "}
                                <a
                                    href="tel:+48692492166"
                                    className="text-blue-600 hover:underline"
                                >
                                    +48 692 492 166
                                </a>
                            </p>
                        </section>

                        <hr className="border-gray-200" />

                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                                8. Bezpieczeństwo danych
                            </h2>
                            <p className="text-gray-700">
                                Administrator stosuje odpowiednie środki
                                techniczne i organizacyjne zapewniające
                                bezpieczeństwo przetwarzanych danych osobowych,
                                w tym ochronę przed nieuprawnionym dostępem,
                                ujawnieniem, zmianą lub zniszczeniem.
                            </p>
                        </section>

                        <hr className="border-gray-200" />

                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                                9. Dobrowolność podania danych
                            </h2>
                            <p className="text-gray-700">
                                Podanie danych osobowych w formularzu
                                kontaktowym jest dobrowolne, jednak niezbędne do
                                udzielenia odpowiedzi na zapytanie. Brak podania
                                danych uniemożliwi nawiązanie kontaktu.
                            </p>
                        </section>

                        <hr className="border-gray-200" />

                        <section>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                                10. Zmiany polityki prywatności
                            </h2>
                            <p className="text-gray-700">
                                Administrator zastrzega sobie prawo do
                                wprowadzania zmian w niniejszej Polityce
                                Prywatności. O wszelkich istotnych zmianach
                                użytkownicy zostaną poinformowani poprzez
                                aktualizację treści na stronie internetowej.
                                Aktualna wersja polityki jest zawsze dostępna
                                pod adresem:{" "}
                                <a
                                    href="https://www.osiedleolimpijczykow.pl/polityka-prywatnosci"
                                    className="text-blue-600 hover:underline"
                                >
                                    https://www.osiedleolimpijczykow.pl/polityka-prywatnosci
                                </a>
                            </p>
                        </section>

                        <hr className="border-gray-200" />

                        <footer className="text-sm text-gray-500 italic mt-8 pt-4 border-t">
                            <p>
                                Indelit Olimpijczyków Sp. z o.o. | ul.
                                Olimpijczyków 13A/24, 42-612 Tarnowskie Góry |
                                biuro@indelit.pl
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}
