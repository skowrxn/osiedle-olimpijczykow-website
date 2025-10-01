import ApartmentSearch from "./ApartmentSearch";

export default function Hero() {
    return (
        <div className="relative bg-neutral-900 text-white">
            {/* Background image placeholder - you can replace with actual image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
                style={{
                    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23374151"/></svg>')`,
                }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-20 min-h-[500px] flex flex-col justify-center">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Osiedle Olimpijczyków
                    </h1>
                </div>

                {/* Search Form */}
                <div className="max-w-4xl mx-auto w-full">
                    <div className="bg-white rounded-lg p-6 shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            {/* Status Filter */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Status
                                </label>
                                <select className="px-3 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-neutral-700">
                                    <option value="">Wszystkie</option>
                                    <option value="available">Dostępne</option>
                                    <option value="reserved">
                                        Zarezerwowane
                                    </option>
                                    <option value="sold">Sprzedane</option>
                                </select>
                            </div>

                            {/* Type Filter */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    Type
                                </label>
                                <select className="px-3 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-neutral-700">
                                    <option value="">Wszystkie</option>
                                    <option value="1">1 pokój</option>
                                    <option value="2">2 pokoje</option>
                                    <option value="3">3 pokoje</option>
                                    <option value="4">4+ pokoje</option>
                                </select>
                            </div>

                            {/* Location Filter */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Location
                                </label>
                                <select className="px-3 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-neutral-700">
                                    <option value="">Wszystkie</option>
                                    <option value="etap3">Etap 3</option>
                                </select>
                            </div>

                            {/* Search Button */}
                            <div className="flex flex-col">
                                <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-neutral-800 transition-colors font-medium">
                                    Search Property
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
