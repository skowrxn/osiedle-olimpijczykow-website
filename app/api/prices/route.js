import { NextResponse } from "next/server";
import { getCachedPrices } from "../../lib/config";

export async function GET() {
  const prices = await getCachedPrices();
  return NextResponse.json(prices);
}
