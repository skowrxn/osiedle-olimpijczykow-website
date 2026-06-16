import { NextResponse } from "next/server";

const PANEL_TOKEN = process.env.PANEL_AUTH_TOKEN || "oo-panel-secret-2024";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // /panel (login) is always accessible; protect everything else under /panel/*
  if (pathname.startsWith("/panel/")) {
    const cookie = request.cookies.get("panel-auth");
    if (!cookie || cookie.value !== PANEL_TOKEN) {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path+"],
};
