import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { google } from "googleapis";

const PANEL_TOKEN = process.env.PANEL_AUTH_TOKEN || "oo-panel-secret-2024";

const ETAP_CONFIG = {
  etap2: { spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID_ETAP2, gid: 1101068206 },
  etap3: { spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID_ETAP3, gid: 905977375 },
};

// Columns (A=1, B=2, …) in the sheet:
// B=numer, C=powierzchnia, E=kondygnacja, F=elementy_dodatkowe, G=liczba_pokoi, I=cena, J=dostepnosc
const COL = { powierzchnia: "C", kondygnacja: "E", elementy_dodatkowe: "F", liczba_pokoi: "G", cena: "I", dostepnosc: "J" };

function checkAuth(request) {
  return request.cookies.get("panel-auth")?.value === PANEL_TOKEN;
}

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

function formatPrice(n) {
  if (!n && n !== 0) return "";
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " zł";
}

function reverseStatus(display) {
  if (display === "DOSTEPNE") return "WOLNE";
  return display; // REZERWACJA or SPRZEDANE → same
}

export async function PUT(request) {
  if (!checkAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, data } = await request.json();
  if (!id || !data) return NextResponse.json({ error: "Missing id or data" }, { status: 400 });

  const etap = id.startsWith("etap2") ? "etap2" : "etap3";
  const numer = id.replace(/^etap[23]-/, "");
  const { spreadsheetId, gid } = ETAP_CONFIG[etap] || {};
  if (!spreadsheetId) return NextResponse.json({ error: "Unknown etap" }, { status: 400 });

  const auth = makeAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // Resolve sheet name from gid
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetMeta = meta.data.sheets.find((s) => s.properties.sheetId === gid) || meta.data.sheets[0];
  const sheetName = sheetMeta.properties.title;

  // Read all rows to find the apartment's row number
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${sheetName}'!A:J` });
  const rows = res.data.values || [];
  const rowIndex = rows.findIndex((row, i) => i >= 3 && row[1]?.trim() === numer);
  if (rowIndex === -1)
    return NextResponse.json({ error: `Apartment ${numer} not found in sheet` }, { status: 404 });

  const sheetRow = rowIndex + 1; // 1-indexed

  // Build batchUpdate data
  const updates = [];
  if (data.powierzchnia !== undefined && data.powierzchnia !== null)
    updates.push({ col: COL.powierzchnia, value: String(data.powierzchnia).replace(".", ",") });
  if (data.kondygnacja !== undefined && data.kondygnacja !== null)
    updates.push({ col: COL.kondygnacja, value: String(data.kondygnacja) });
  if (data.elementy_dodatkowe !== undefined)
    updates.push({ col: COL.elementy_dodatkowe, value: data.elementy_dodatkowe || "" });
  if (data.liczba_pokoi !== undefined && data.liczba_pokoi !== null)
    updates.push({ col: COL.liczba_pokoi, value: String(data.liczba_pokoi) });
  if (data.cena !== undefined)
    updates.push({ col: COL.cena, value: data.cena ? formatPrice(data.cena) : "" });
  if (data.dostepnosc !== undefined)
    updates.push({ col: COL.dostepnosc, value: reverseStatus(data.dostepnosc) });

  if (!updates.length) return NextResponse.json({ success: true });

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: "RAW",
      data: updates.map(({ col, value }) => ({
        range: `'${sheetName}'!${col}${sheetRow}`,
        values: [[value]],
      })),
    },
  });

  revalidateTag("apartments-sheets");
  return NextResponse.json({ success: true });
}
