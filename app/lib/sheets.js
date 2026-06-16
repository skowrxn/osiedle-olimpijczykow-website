import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import cloudinary from "./cloudinary";

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

// Fetches all photos from Cloudinary organised by apartment ID.
// Returns { [aptId]: { zdjecia: string[], karta: string|null } }
const getCloudinaryPhotos = async () => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "apartments/",
      max_results: 500,
    });

    const byApt = {};
    for (const r of result.resources) {
      const parts = r.public_id.split("/");
      if (parts.length < 3) continue;
      const aptId = parts[1];
      const filename = parts.slice(2).join("/");

      if (!byApt[aptId]) byApt[aptId] = { zdjecia: [], karta: null };

      if (filename === "karta") {
        byApt[aptId].karta = r.secure_url;
      } else {
        byApt[aptId].zdjecia.push(r.secure_url);
      }
    }
    return byApt;
  } catch (e) {
    console.error("[sheets] Cloudinary fetch failed:", e.message);
    return {};
  }
};

const parseRows = (rows, etap, cldPhotos) =>
  rows.slice(3).reduce((acc, row) => {
    const numer = row[1]?.trim();
    if (!numer || numer === "Numer" || numer.startsWith("Ceny")) return acc;

    const aptId = `${etap}-${numer}`;
    const photos = cldPhotos[aptId] || { zdjecia: [], karta: null };

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
      karta: photos.karta,
    });
    return acc;
  }, []);

const fetchAllApartments = async () => {
  const [etap2Rows, etap3Rows, cldPhotos] = await Promise.all([
    getSheetRows(process.env.GOOGLE_SPREADSHEET_ID_ETAP2, 1101068206),
    getSheetRows(process.env.GOOGLE_SPREADSHEET_ID_ETAP3, 905977375),
    getCloudinaryPhotos(),
  ]);

  return [
    ...parseRows(etap2Rows, "etap2", cldPhotos),
    ...parseRows(etap3Rows, "etap3", cldPhotos),
  ];
};

export const getCachedApartments = unstable_cache(
  fetchAllApartments,
  ["apartments-sheets"],
  { revalidate: 60 }
);
