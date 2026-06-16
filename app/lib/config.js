import { google } from "googleapis";
import { unstable_cache } from "next/cache";

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID_ETAP3;
const CONFIG_SHEET = "Config";

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

// Ensures the Config sheet exists with default rows; creates it if missing.
async function ensureConfigSheet(sheets) {
  try {
    await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${CONFIG_SHEET}'!A1`,
    });
  } catch {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: [{ addSheet: { properties: { title: CONFIG_SHEET } } }] },
    });
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        valueInputOption: "RAW",
        data: [
          { range: `'${CONFIG_SHEET}'!A1:B1`, values: [["key", "value"]] },
          { range: `'${CONFIG_SHEET}'!A2:B2`, values: [["etap3_progress", "0"]] },
          { range: `'${CONFIG_SHEET}'!A3:B3`, values: [["parking_price", "50000"]] },
          { range: `'${CONFIG_SHEET}'!A4:B4`, values: [["storage_price", "20000"]] },
        ],
      },
    });
  }
}

const fetchProgress = async () => {
  try {
    const auth = makeAuth();
    const sheets = google.sheets({ version: "v4", auth });
    await ensureConfigSheet(sheets);
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${CONFIG_SHEET}'!B2`,
    });
    return parseInt(res.data.values?.[0]?.[0] ?? "0", 10);
  } catch (e) {
    console.error("[config] fetchProgress failed:", e.message);
    return 0;
  }
};

export const getCachedProgress = unstable_cache(
  fetchProgress,
  ["etap3-progress"],
  { revalidate: 60, tags: ["progress"] }
);

export async function setProgress(stage) {
  const auth = makeAuth();
  const sheets = google.sheets({ version: "v4", auth });
  await ensureConfigSheet(sheets);
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `'${CONFIG_SHEET}'!B2`,
    valueInputOption: "RAW",
    requestBody: { values: [[String(stage)]] },
  });
}

const fetchPrices = async () => {
  try {
    const auth = makeAuth();
    const sheets = google.sheets({ version: "v4", auth });
    await ensureConfigSheet(sheets);
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${CONFIG_SHEET}'!B3:B4`,
    });
    const vals = res.data.values || [];
    return {
      parkingPrice: parseInt(vals[0]?.[0] ?? "50000", 10) || 50000,
      storagePrice: parseInt(vals[1]?.[0] ?? "20000", 10) || 20000,
    };
  } catch (e) {
    console.error("[config] fetchPrices failed:", e.message);
    return { parkingPrice: 50000, storagePrice: 20000 };
  }
};

export const getCachedPrices = unstable_cache(
  fetchPrices,
  ["prices"],
  { revalidate: 60, tags: ["prices"] }
);

export async function setPrices(parkingPrice, storagePrice) {
  const auth = makeAuth();
  const sheets = google.sheets({ version: "v4", auth });
  await ensureConfigSheet(sheets);
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      valueInputOption: "RAW",
      data: [
        { range: `'${CONFIG_SHEET}'!B3`, values: [[String(parkingPrice)]] },
        { range: `'${CONFIG_SHEET}'!B4`, values: [[String(storagePrice)]] },
      ],
    },
  });
}
