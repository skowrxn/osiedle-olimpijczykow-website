import { NextResponse } from "next/server";

const USERNAME = "admin";
const PASSWORD = "admin";
const PANEL_TOKEN = process.env.PANEL_AUTH_TOKEN || "oo-panel-secret-2024";

export async function POST(request) {
  const { username, password } = await request.json();

  if (username === USERNAME && password === PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("panel-auth", PANEL_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  }

  return NextResponse.json(
    { error: "Nieprawidłowy login lub hasło" },
    { status: 401 }
  );
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("panel-auth", "", { maxAge: 0, path: "/" });
  return response;
}
