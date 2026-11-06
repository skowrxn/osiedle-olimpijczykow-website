import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import sharp from "sharp";
import {
  PREFIX_MIESZKANIA,
  listaObiektow,
  publicznyUrl,
  r2Skonfigurowane,
  usunObiekt,
  zapiszObiekt,
} from "../../../lib/r2";

const PANEL_TOKEN = process.env.PANEL_AUTH_TOKEN || "oo-panel-secret-2024";

// Zdjęcia trzymamy w rozsądnym rozmiarze - oryginały z aparatu potrafią mieć
// kilkanaście MB, a na stronie i tak są skalowane.
export const MAKS_SZEROKOSC = 1920;
export const MAKS_WEJSCIE_MB = 25;

function checkAuth(request) {
  return request.cookies.get("panel-auth")?.value === PANEL_TOKEN;
}

const brakKonfiguracji = () =>
  NextResponse.json(
    { error: "Magazyn zdjęć (R2) nie jest skonfigurowany - uzupełnij zmienne R2_* w Vercelu." },
    { status: 503 }
  );

// Panel oczekuje listy { public_id, secure_url } - zachowujemy ten kształt.
const naWpis = (key) => ({ public_id: key, secure_url: publicznyUrl(key) });

export async function GET(request) {
  if (!checkAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (!r2Skonfigurowane()) return NextResponse.json([]);

  try {
    const klucze = await listaObiektow(`${PREFIX_MIESZKANIA}/${id}/`);
    return NextResponse.json(klucze.sort().map(naWpis));
  } catch (e) {
    console.error("[panel] R2 - blad listowania zdjec:", e.message);
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  if (!checkAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!r2Skonfigurowane()) return brakKonfiguracji();

  const formData = await request.formData();
  const file = formData.get("file");
  const apartmentId = formData.get("apartmentId");
  if (!file || !apartmentId)
    return NextResponse.json({ error: "Missing file or apartmentId" }, { status: 400 });

  if (file.size > MAKS_WEJSCIE_MB * 1024 * 1024)
    return NextResponse.json(
      { error: `Plik jest za duży (limit ${MAKS_WEJSCIE_MB} MB).` },
      { status: 413 }
    );

  const isKarta = formData.get("isKarta") === "true";

  try {
    const zrodlo = Buffer.from(await file.arrayBuffer());
    const jpeg = await sharp(zrodlo)
      .rotate()
      .resize({ width: MAKS_SZEROKOSC, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    const nazwa = isKarta
      ? "karta.jpg"
      : `${Date.now()}-${(file.name || "zdjecie")
          .replace(/\.[^.]+$/, "")
          .replace(/[^\p{L}\p{N}._-]+/gu, "-")
          .slice(0, 60)}.jpg`;

    const key = `${PREFIX_MIESZKANIA}/${apartmentId}/${nazwa}`;
    const url = await zapiszObiekt(key, jpeg, "image/jpeg");

    revalidateTag("apartments-sheets");
    return NextResponse.json({ url, secure_url: url, publicId: key, public_id: key });
  } catch (e) {
    console.error("[panel] R2 - blad wgrywania zdjecia:", e.message);
    return NextResponse.json({ error: e.message || "Nie udało się wgrać zdjęcia" }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!checkAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!r2Skonfigurowane()) return brakKonfiguracji();

  const { publicId } = await request.json();
  if (!publicId) return NextResponse.json({ error: "Missing publicId" }, { status: 400 });

  try {
    await usunObiekt(publicId);
    revalidateTag("apartments-sheets");
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[panel] R2 - blad kasowania zdjecia:", e.message);
    return NextResponse.json({ error: e.message || "Nie udało się usunąć zdjęcia" }, { status: 500 });
  }
}
