/**
 * One-time migration script: uploads all images from public/wizualizacje
 * and public/karty_mieszkan to Cloudinary, preserving the folder structure.
 *
 * Run: node scripts/upload-cloudinary.mjs
 */

import { v2 as cloudinary } from "cloudinary";
import { readdir } from "fs/promises";
import { join, relative, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

cloudinary.config({
  cloud_name: "dqsnagbpg",
  api_key: "636843869188837",
  api_secret: "KXiKNSC89Z1cvxBHVec4yVtznjg",
});

// ─── helpers ────────────────────────────────────────────────────────────────

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function uploadOne(filePath) {
  const rel = relative(PUBLIC, filePath).replace(/\\/g, "/");
  const publicId = rel.slice(0, -extname(rel).length); // strip extension

  try {
    await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: "image",
    });
    return { ok: true, rel };
  } catch (err) {
    return { ok: false, rel, msg: err.message };
  }
}

// Process files with limited concurrency
async function uploadAll(files, concurrency = 5) {
  let index = 0;
  let ok = 0;
  let fail = 0;
  const total = files.length;

  async function worker() {
    while (index < total) {
      const i = index++;
      const file = files[i];
      const result = await uploadOne(file);
      const prefix = `[${String(i + 1).padStart(3)}/${total}]`;
      if (result.ok) {
        console.log(`${prefix} ✓  ${result.rel}`);
        ok++;
      } else {
        console.error(`${prefix} ✗  ${result.rel}  →  ${result.msg}`);
        fail++;
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return { ok, fail };
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  const dirs = [join(PUBLIC, "wizualizacje"), join(PUBLIC, "karty_mieszkan")];

  console.log("Scanning…");
  const allFiles = [];
  for (const dir of dirs) {
    const files = await walk(dir);
    const label = dir.split(/[\\/]/).pop();
    console.log(`  ${label}: ${files.length} files`);
    allFiles.push(...files);
  }
  console.log(`\nUploading ${allFiles.length} files (concurrency=5)…\n`);

  const { ok, fail } = await uploadAll(allFiles, 5);

  console.log(`\n${"─".repeat(60)}`);
  console.log(`Done:  ${ok} uploaded,  ${fail} failed`);
  if (fail > 0) console.log("Re-run the script to retry failed uploads.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
