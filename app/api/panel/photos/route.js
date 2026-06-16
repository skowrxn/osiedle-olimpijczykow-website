import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import cloudinary from "../../../lib/cloudinary";

const PANEL_TOKEN = process.env.PANEL_AUTH_TOKEN || "oo-panel-secret-2024";

function checkAuth(request) {
  const cookie = request.cookies.get("panel-auth");
  return cookie?.value === PANEL_TOKEN;
}

export async function GET(request) {
  if (!checkAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: `apartments/${id}/`,
      max_results: 100,
    });
    return NextResponse.json(result.resources || []);
  } catch {
    // Folder doesn't exist yet — return empty list
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  if (!checkAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  const apartmentId = formData.get("apartmentId");

  if (!file || !apartmentId)
    return NextResponse.json({ error: "Missing file or apartmentId" }, { status: 400 });

  const isKarta = formData.get("isKarta") === "true";
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadOptions = isKarta
    ? { public_id: `apartments/${apartmentId}/karta`, overwrite: true }
    : { folder: `apartments/${apartmentId}` };

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  revalidateTag("apartments-sheets");
  return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
}

export async function DELETE(request) {
  if (!checkAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { publicId } = await request.json();
  if (!publicId)
    return NextResponse.json({ error: "Missing publicId" }, { status: 400 });

  await cloudinary.uploader.destroy(publicId);
  revalidateTag("apartments-sheets");
  return NextResponse.json({ success: true });
}
