import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getCachedPrices, setPrices } from "../../../lib/config";

const PANEL_TOKEN = process.env.PANEL_AUTH_TOKEN || "oo-panel-secret-2024";

function checkAuth(request) {
  return request.cookies.get("panel-auth")?.value === PANEL_TOKEN;
}

export async function GET(request) {
  if (!checkAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const prices = await getCachedPrices();
  return NextResponse.json(prices);
}

export async function PUT(request) {
  if (!checkAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { parkingPrice, storagePrice } = await request.json();
  if (typeof parkingPrice !== "number" || parkingPrice < 0)
    return NextResponse.json({ error: "Nieprawidłowa cena parkingu" }, { status: 400 });
  if (typeof storagePrice !== "number" || storagePrice < 0)
    return NextResponse.json({ error: "Nieprawidłowa cena komórki" }, { status: 400 });

  await setPrices(parkingPrice, storagePrice);
  revalidateTag("prices");
  return NextResponse.json({ success: true, parkingPrice, storagePrice });
}
