import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import { getVizImages, getCardImage } from "./apartments";

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
  // Fallback: separate env vars (legacy)
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

  // Resolve gid → sheet name (needed when data is not on the first tab)
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

const parseRows = (rows, etap) =>
  rows.slice(3).reduce((acc, row) => {
    const numer = row[1]?.trim();
    if (!numer || numer === "Numer" || numer.startsWith("Ceny")) return acc;

    acc.push({
      id: `${etap}-${numer}`,
      numer,
      powierzchnia: parseArea(row[2]),
      kondygnacja: parseInt(row[4], 10) || 0,
      elementy_dodatkowe: row[5]?.trim() || null,
      liczba_pokoi: parseInt(row[6], 10) || null,
      cena: parsePrice(row[8]),
      dostepnosc: mapStatus(row[9]),
      etap,
      zdjecia: etap === "etap3" ? getVizImages(numer) : [],
      karta: etap === "etap3" ? getCardImage(numer) : null,
    });
    return acc;
  }, []);

const fetchAllApartments = async () => {
  const [etap2Rows, etap3Rows] = await Promise.all([
    getSheetRows(process.env.GOOGLE_SPREADSHEET_ID_ETAP2, 1101068206),
    getSheetRows(process.env.GOOGLE_SPREADSHEET_ID_ETAP3, 905977375),
  ]);

  return [
    ...parseRows(etap2Rows, "etap2"),
    ...parseRows(etap3Rows, "etap3"),
  ];
};

export const getCachedApartments = unstable_cache(
  fetchAllApartments,
  ["apartments-sheets"],
  { revalidate: 60 }
);
