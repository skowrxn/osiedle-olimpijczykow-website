import { google } from "googleapis";
import { unstable_cache } from "next/cache";

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID_ETAP3;
const HISTORY_SHEET = "Historia Cen";

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

function makeAuth() {
  return new google.auth.GoogleAuth({
    credentials: getCredentials(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function getSheets() {
  const auth = makeAuth();
  return google.sheets({ version: "v4", auth });
}

async function ensureHistorySheet(sheets) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${HISTORY_SHEET}'!A1`,
    });
    if (!res.data.values) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${HISTORY_SHEET}'!A1:C1`,
        valueInputOption: "RAW",
        requestBody: { values: [["numer", "data", "cena"]] },
      });
    }
  } catch {
    // Sheet doesn't exist — Office files don't support addSheet via API.
    // The user must manually create a tab named "Historia Cen" in the spreadsheet.
  }
}

export async function getAllHistoryRows() {
  const sheets = await getSheets();
  await ensureHistorySheet(sheets);
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${HISTORY_SHEET}'!A2:C`,
    });
    return (res.data.values || [])
      .map((row, i) => ({
        rowIndex: i + 2,
        numer: row[0] || "",
        data: row[1] || "",
        cena: parseInt(row[2] || "0", 10),
      }))
      .filter((r) => r.numer);
  } catch {
    return [];
  }
}

const fetchAllHistory = async () => {
  try {
    const rows = await getAllHistoryRows();
    const byNumer = {};
    for (const row of rows) {
      if (!byNumer[row.numer]) byNumer[row.numer] = [];
      byNumer[row.numer].push({ data: row.data, cena: row.cena });
    }
    for (const numer of Object.keys(byNumer)) {
      byNumer[numer].sort((a, b) => b.data.localeCompare(a.data));
    }
    return byNumer;
  } catch (e) {
    console.error("[price-history] fetchAllHistory failed:", e.message);
    return {};
  }
};

export const getCachedHistory = unstable_cache(
  fetchAllHistory,
  ["price-history"],
  { revalidate: 60, tags: ["price-history"] }
);

export async function addEntry(numer, data, cena) {
  const sheets = await getSheets();
  await ensureHistorySheet(sheets);
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `'${HISTORY_SHEET}'!A:C`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[String(numer), String(data), String(cena)]] },
  });
}

export async function updateEntry(rowIndex, data, cena) {
  const sheets = await getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `'${HISTORY_SHEET}'!B${rowIndex}:C${rowIndex}`,
    valueInputOption: "RAW",
    requestBody: { values: [[String(data), String(cena)]] },
  });
}

export async function deleteEntry(rowIndex) {
  const sheets = await getSheets();
  await ensureHistorySheet(sheets);
  const allRows = await getAllHistoryRows();
  const remaining = allRows.filter((r) => r.rowIndex !== rowIndex);
  await sheets.spreadsheets.values.clear({
    spreadsheetId: SPREADSHEET_ID,
    range: `'${HISTORY_SHEET}'!A2:C`,
  });
  if (remaining.length > 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${HISTORY_SHEET}'!A2:C${remaining.length + 1}`,
      valueInputOption: "RAW",
      requestBody: {
        values: remaining.map((r) => [r.numer, r.data, String(r.cena)]),
      },
    });
  }
}
