import { google } from "googleapis";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID_ETAP3;
const HISTORY_SHEET = "Historia Cen";

// Data from CSV (deduplicated, dates converted to Warsaw local date)
const HISTORY_DATA = [
  { numer: "0.3",  data: "2026-03-10", cena: 418352 },
  { numer: "0.3",  data: "2026-03-04", cena: 408844 },
  { numer: "0.6",  data: "2026-03-10", cena: 782773 },
  { numer: "1.16", data: "2026-03-10", cena: 688430 },
  { numer: "3.27", data: "2026-05-13", cena: 955944 },
  { numer: "3.27", data: "2026-03-11", cena: 934218 },
  { numer: "3.31", data: "2026-05-13", cena: 974864 },
  { numer: "3.31", data: "2026-03-11", cena: 952708 },
  { numer: "B0.2", data: "2025-09-04", cena: 562526 },
  { numer: "C0.4", data: "2025-09-04", cena: 547008 },
];

function getCredentials() {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (b64) return JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
  let key = (process.env.GOOGLE_PRIVATE_KEY || "").trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) key = key.slice(1, -1);
  return {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim(),
    private_key: key.replace(/\\n/g, "\n"),
  };
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    credentials: getCredentials(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const values = [
    ["numer", "data", "cena"],
    ...HISTORY_DATA.map((e) => [e.numer, e.data, String(e.cena)]),
  ];

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${HISTORY_SHEET}'!A1:C${values.length}`,
      valueInputOption: "RAW",
      requestBody: { values },
    });
    console.log(`✓ Zapisano ${HISTORY_DATA.length} wpisów historii cen do zakładki "${HISTORY_SHEET}"`);
  } catch (e) {
    if (e.status === 400 || e.code === 400) {
      console.error(`\n❌ Zakładka "${HISTORY_SHEET}" nie istnieje w arkuszu.`);
      console.error(`Otwórz swój arkusz Google Sheets, utwórz ręcznie zakładkę o nazwie "Historia Cen", a następnie uruchom skrypt ponownie.\n`);
    } else {
      throw e;
    }
  }
}

main().catch(console.error);
