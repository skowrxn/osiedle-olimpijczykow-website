import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import sharp from "sharp";
import wizualizacje from "../../../lib/wizualizacje-dysk.json";
import { PREFIX_MIESZKANIA, listaObiektow, r2Skonfigurowane, zapiszObiekt } from "../../../lib/r2";

// Jednorazowe przeniesienie wizualizacji mieszkań Etapu 3 z Dysku Google do R2.
// Przypisanie zdjęć do mieszkań pochodzi z nazw folderów na Dysku
// ("0.2 i 1.10 i 2.19" = te same wizualizacje dla trzech mieszkań).
const PANEL_TOKEN = process.env.PANEL_AUTH_TOKEN || "oo-panel-secret-2024";
const ETAP = "etap3";
const MAKS_SZEROKOSC = 1920;

const checkAuth = (request) => request.cookies.get("panel-auth")?.value === PANEL_TOKEN;

const kluczDocelowy = (numer, nazwa) =>
  `${PREFIX_MIESZKANIA}/${ETAP}-${numer}/${nazwa
    .replace(/\.[^.]+$/, "")
    .replace(/[^\p{L}\p{N}._-]+/gu, "-")
    .slice(0, 60)}.jpg`;

export async function GET(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!r2Skonfigurowane())
    return NextResponse.json({ error: "Brak konfiguracji R2" }, { status: 503 });

  const wgrane = await listaObiektow(`${PREFIX_MIESZKANIA}/`);
  const mieszkania = Object.entries(wizualizacje).map(([numer, pliki]) => ({
    numer,
    doWgrania: pliki.length,
    wR2: wgrane.filter((k) => k.startsWith(`${PREFIX_MIESZKANIA}/${ETAP}-${numer}/`)).length,
  }));

  return NextResponse.json({
    mieszkania: mieszkania.sort((a, b) => a.numer.localeCompare(b.numer, "pl", { numeric: true })),
    razemDoWgrania: mieszkania.reduce((s, m) => s + m.doWgrania, 0),
    razemWR2: mieszkania.reduce((s, m) => s + m.wR2, 0),
  });
}

export async function POST(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!r2Skonfigurowane())
    return NextResponse.json({ error: "Brak konfiguracji R2" }, { status: 503 });

  const { numer, od = 0, ile = 3 } = await request.json();
  const pliki = wizualizacje[numer];
  if (!pliki) return NextResponse.json({ error: `Nieznane mieszkanie: ${numer}` }, { status: 400 });

  const partia = pliki.slice(od, od + ile);
  const wgrane = [];

  try {
    for (const plik of partia) {
      const res = await fetch(`https://drive.google.com/uc?export=download&id=${plik.id}`);
      if (!res.ok) throw new Error(`Dysk odpowiedział ${res.status} dla ${plik.nazwa}`);

      const jpeg = await sharp(Buffer.from(await res.arrayBuffer()))
        .rotate()
        .resize({ width: MAKS_SZEROKOSC, withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();

      await zapiszObiekt(kluczDocelowy(numer, plik.nazwa), jpeg, "image/jpeg");
      wgrane.push(plik.nazwa);
    }
  } catch (e) {
    console.error("[panel] migracja zdjec:", e.message);
    return NextResponse.json({ error: e.message, numer, wgrane }, { status: 500 });
  }

  const nastepny = od + partia.length < pliki.length ? od + partia.length : null;
  if (nastepny === null) revalidateTag("apartments-sheets");

  return NextResponse.json({ numer, wgrane, nastepny, wszystkich: pliki.length });
}
