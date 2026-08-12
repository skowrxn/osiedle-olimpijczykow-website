import { NextResponse } from "next/server";
import { getCachedApartments } from "../../lib/sheets";

// Etapy wycofane ze sprzedaży - nie pokazujemy ich mieszkań na stronie.
// Panel administracyjny pobiera je jawnie przez ?includeHidden=1.
const HIDDEN_ETAPY = ["etap2"];

const AREA_RANGES = {
  "35-45": [35, 45],
  "45-55": [45, 55],
  "55-65": [55, 65],
  "65-75": [65, 75],
  "75+": [75, Infinity],
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const etap = searchParams.get("etap");
    const stage = searchParams.get("stage");
    const rooms = searchParams.get("rooms");
    const floor = searchParams.get("floor");
    const area = searchParams.get("area");
    const status = searchParams.get("status");
    const limit = searchParams.get("limit");
    const includeHidden = searchParams.get("includeHidden") === "1";

    let result = await getCachedApartments();

    if (id) {
      const found = result.find((a) => a.id === id);
      return NextResponse.json(found || null);
    }

    if (!includeHidden) {
      result = result.filter((a) => !HIDDEN_ETAPY.includes(a.etap));
    }

    if (etap) result = result.filter((a) => a.etap === `etap${etap}`);
    else if (stage) result = result.filter((a) => a.etap === stage);

    if (rooms) result = result.filter((a) => a.liczba_pokoi === parseInt(rooms, 10));

    if (floor !== null && floor !== "") {
      const floorNum = parseInt(floor, 10);
      if (!isNaN(floorNum)) result = result.filter((a) => a.kondygnacja === floorNum);
    }

    if (area && AREA_RANGES[area]) {
      const [min, max] = AREA_RANGES[area];
      result = result.filter(
        (a) => a.powierzchnia >= min && (max === Infinity || a.powierzchnia <= max)
      );
    }

    if (status) result = result.filter((a) => a.dostepnosc === status);

    if (limit) result = result.slice(0, parseInt(limit, 10));

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Apartments API error:", error?.message, error?.stack);
    return NextResponse.json(
      { error: error?.message || "Unknown error", details: error?.stack },
      { status: 500 }
    );
  }
}
