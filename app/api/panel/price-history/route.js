import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getAllHistoryRows, addEntry, updateEntry, deleteEntry } from "../../../lib/price-history";

const PANEL_TOKEN = process.env.PANEL_AUTH_TOKEN || "oo-panel-secret-2024";

function checkAuth(request) {
  return request.cookies.get("panel-auth")?.value === PANEL_TOKEN;
}

export async function GET(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const numer = searchParams.get("numer");
  const rows = await getAllHistoryRows();
  const filtered = numer ? rows.filter((r) => r.numer === numer) : rows;
  filtered.sort((a, b) => b.data.localeCompare(a.data));
  return NextResponse.json(filtered);
}

export async function POST(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { numer, data, cena } = await request.json();
  if (!numer || !data || !cena) return NextResponse.json({ error: "Brak wymaganych pól" }, { status: 400 });
  await addEntry(numer, data, Number(cena));
  revalidateTag("price-history");
  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { rowIndex, data, cena } = await request.json();
  if (!rowIndex || !data || !cena) return NextResponse.json({ error: "Brak wymaganych pól" }, { status: 400 });
  await updateEntry(rowIndex, data, Number(cena));
  revalidateTag("price-history");
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { rowIndex } = await request.json();
  if (!rowIndex) return NextResponse.json({ error: "Brak rowIndex" }, { status: 400 });
  await deleteEntry(rowIndex);
  revalidateTag("price-history");
  return NextResponse.json({ success: true });
}
