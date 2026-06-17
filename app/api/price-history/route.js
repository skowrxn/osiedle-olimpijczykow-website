import { NextResponse } from "next/server";
import { getCachedHistory } from "../../lib/price-history";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const numer = searchParams.get("numer");
  const allHistory = await getCachedHistory();
  const history = numer ? (allHistory[numer] || []) : allHistory;
  return NextResponse.json(history);
}
