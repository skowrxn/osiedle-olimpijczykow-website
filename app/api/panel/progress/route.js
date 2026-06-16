import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getCachedProgress, setProgress } from "../../../lib/config";

const PANEL_TOKEN = process.env.PANEL_AUTH_TOKEN || "oo-panel-secret-2024";

function checkAuth(request) {
  return request.cookies.get("panel-auth")?.value === PANEL_TOKEN;
}

export async function GET(request) {
  if (!checkAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stage = await getCachedProgress();
  return NextResponse.json({ stage });
}

export async function PUT(request) {
  if (!checkAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { stage } = await request.json();
  if (typeof stage !== "number" || stage < 0 || stage > 6)
    return NextResponse.json({ error: "Invalid stage (0–6)" }, { status: 400 });

  await setProgress(stage);
  revalidateTag("progress");
  return NextResponse.json({ success: true, stage });
}
