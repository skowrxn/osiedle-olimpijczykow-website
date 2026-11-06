import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import { zdjeciaMieszkan, r2Skonfigurowane } from "./r2";
import cennikEtap4 from "./cennik-etap4.json";
import kartyEtap3 from "./karty-etap3.json";
import kartyEtap4 from "./karty-etap4.json";
import { ETAP_SHEETS } from "./etapy";

// Karty mieszkan wgrane do repozytorium. Karta wrzucona przez panel
// (wgrana przez panel do R2) ma pierwszenstwo.
const STATIC_KARTY = { etap3: new Set(kartyEtap3), etap4: new Set(kartyEtap4) };

const staticKarta = (etap, numer) =>
  STATIC_KARTY[etap]?.has(numer) ? `/karty_mieszkan/${etap}/${numer}.png` : null;

// Zrodla danych o mieszkaniach - arkusz Google na kazdy etap.
// Etap 4 ma dodatkowo cennik w repozytorium: uzywamy go tylko wtedy, gdy
// arkusza nie da sie odczytac (np. zanim konto serwisowe dostanie do niego
// dostep), zeby lista mieszkan nie znikla ze strony.
const ETAP_SOURCES = [
  { etap: "etap2", ...ETAP_SHEETS.etap2 },
  { etap: "etap3", ...ETAP_SHEETS.etap3 },
  { etap: "etap4", ...ETAP_SHEETS.etap4, fallbackRows: cennikEtap4 },
];

const parsePrice = (s) => {
  if (!s || !String(s).includes("zł")) return null;
  return parseInt(String(s).replace(/\s+/g, "").replace("zł", ""), 10) || null;
};

const parseArea = (s) => {
  const n = parseFloat(String(s || "").replace(",", "."));
  return isNaN(n) ? null : n;
};

const mapStatus = (s) => {
  const u = String(s || "").trim().toUpperCase();
  if (u === "WOLNE") return "DOSTEPNE";
  if (u === "REZERWACJA") return "REZERWACJA";
  return "SPRZEDANE";
};

const getCredentials = () => {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (b64) {
    return JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
  }
  let key = (process.env.GOOGLE_PRIVATE_KEY || "").trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }
  return {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim(),
    private_key: key.replace(/\\n/g, "\n"),
  };
};

const makeAuth = () =>
  new google.auth.GoogleAuth({
    credentials: getCredentials(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

const getSheetRows = async (spreadsheetId, gid) => {
  const sheets = google.sheets({ version: "v4", auth: makeAuth() });

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetMeta = gid != null
    ? meta.data.sheets.find((s) => s.properties.sheetId === gid)
    : meta.data.sheets[0];

  const sheetName = sheetMeta?.properties?.title;
  const range = sheetName ? `'${sheetName}'!A:J` : "A:J";

  console.log(`[sheets] ${spreadsheetId} → tab "${sheetName}" (gid ${gid})`);

  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  return res.data.values || [];
};

// Zdjęcia i karty mieszkań z R2, pogrupowane po id mieszkania.
const pobierzZdjecia = async () => {
  if (!r2Skonfigurowane()) {
    console.warn("[sheets] brak konfiguracji R2 - mieszkania bez zdjec");
    return {};
  }
  try {
    return await zdjeciaMieszkan();
  } catch (e) {
    console.error("[sheets] R2 - blad pobierania zdjec:", e.message);
    return {};
  }
};

const parseRows = (rows, etap, zdjecia) =>
  rows.slice(3).reduce((acc, row) => {
    const numer = row[1]?.trim();
    if (!numer || numer === "Numer" || numer.startsWith("Ceny")) return acc;

    const aptId = `${etap}-${numer}`;
    const photos = zdjecia[aptId] || { zdjecia: [], karta: null };

    acc.push({
      id: aptId,
      numer,
      powierzchnia: parseArea(row[2]),
      kondygnacja: parseInt(row[4], 10) || 0,
      elementy_dodatkowe: row[5]?.trim() || null,
      liczba_pokoi: parseInt(row[6], 10) || null,
      cena: parsePrice(row[8]),
      dostepnosc: mapStatus(row[9]),
      etap,
      zdjecia: photos.zdjecia,
      karta: photos.karta || staticKarta(etap, numer),
    });
    return acc;
  }, []);

const getRowsForEtap = async ({ etap, spreadsheetId, gid, fallbackRows }) => {
  if (!spreadsheetId) {
    if (fallbackRows) {
      console.warn(`[sheets] brak arkusza dla ${etap} - cennik z repozytorium`);
      return fallbackRows;
    }
    throw new Error(`[sheets] brak identyfikatora arkusza dla ${etap}`);
  }

  try {
    return await getSheetRows(spreadsheetId, gid);
  } catch (e) {
    // Etap z cennikiem w repozytorium przezywa awarie arkusza; dla pozostalych
    // wolimy blad niz ciche pokazanie niepelnej listy mieszkan.
    if (fallbackRows) {
      console.error(`[sheets] ${etap} - blad arkusza, uzywam cennika z repozytorium:`, e.message);
      return fallbackRows;
    }
    throw e;
  }
};

const fetchAllApartments = async () => {
  const [zdjecia, ...rowsPerEtap] = await Promise.all([
    pobierzZdjecia(),
    ...ETAP_SOURCES.map(getRowsForEtap),
  ]);

  return ETAP_SOURCES.flatMap((source, i) =>
    parseRows(rowsPerEtap[i], source.etap, zdjecia)
  );
};

export const getCachedApartments = unstable_cache(
  fetchAllApartments,
  ["apartments-sheets"],
  // tag pozwala panelowi odswiezyc liste od razu po zapisie (revalidateTag)
  { revalidate: 60, tags: ["apartments-sheets"] }
);
