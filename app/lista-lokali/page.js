import Link from "next/link";

export default function ListaLokali() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center py-12">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">
                    Lista Lokali
                </h1>
                <p className="text-xl text-gray-600 mb-12">
                    Wybierz etap, aby przeglądać dostępne mieszkania
                </p>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Link href="/etap2" className="block">
                        <div className="bg-blue-100 hover:bg-blue-200 p-8 rounded-lg transition-colors">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">
                                Mieszkania Etap 2
                            </h2>
                            <p className="text-blue-600">
                                Przeglądaj dostępne mieszkania w drugim etapie
                                inwestycji
                            </p>
                        </div>
                    </Link>

                    <Link href="/etap3" className="block">
                        <div className="bg-green-100 hover:bg-green-200 p-8 rounded-lg transition-colors">
                            <h2 className="text-2xl font-bold text-green-800 mb-4">
                                Mieszkania Etap 3
                            </h2>
                            <p className="text-green-600">
                                Przeglądaj dostępne mieszkania w trzecim etapie
                                inwestycji
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
