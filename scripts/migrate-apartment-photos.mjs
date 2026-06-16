/**
 * Migracja zdjęć do folderów per-mieszkanie na Cloudinary.
 *
 * Dla każdego mieszkania z etap3 uploaduje:
 *  - wizualizacje → apartments/etap3-{numer}/{filename}
 *  - karta        → apartments/etap3-{numer}/karta (nazwa zarezerwowana)
 *
 * Mieszkania współdzielące ten sam folder wizualizacji dostają kopie.
 *
 * Uruchomienie: node scripts/migrate-apartment-photos.mjs
 */

import { v2 as cloudinary } from "cloudinary";
import { readdir } from "fs/promises";
import { join, extname, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

cloudinary.config({
  cloud_name: "dqsnagbpg",
  api_key: "636843869188837",
  api_secret: "KXiKNSC89Z1cvxBHVec4yVtznjg",
});

// ── Mapping: numer mieszkania → nazwa folderu wizualizacji ──────────────────
// (folder name = vizKey.replace(/-/g, " i "))
const etap3VizKey = {
  "0.1":  "0.1",
  "0.2":  "0.2-1.10-2.19",
  "0.3":  "0.3-3.28",
  "0.4":  "0.4-1.12-2.21",
  "0.5":  "0.5-1.13-2.22",
  "0.6":  "0.6-1.14",
  "0.7":  "0.7-1.15-2.24",
  "0.8":  "0.8",
  "1.9":  "1.9-2.18",
  "1.10": "0.2-1.10-2.19",
  "1.11": "1.11-2.20",
  "1.12": "0.4-1.12-2.21",
  "1.13": "0.5-1.13-2.22",
  "1.14": "0.6-1.14",
  "1.15": "0.7-1.15-2.24",
  "1.16": "1.16-2.25",
  "1.17": "1.17-2.26",
  "2.18": "1.9-2.18",
  "2.19": "0.2-1.10-2.19",
  "2.20": "1.11-2.20",
  "2.21": "0.4-1.12-2.21",
  "2.22": "0.5-1.13-2.22",
  "2.23": "2.23",
  "2.24": "0.7-1.15-2.24",
  "2.25": "1.16-2.25",
  "2.26": "1.17-2.26",
  "3.28": "0.3-3.28",
  "3.31": "3.31",
  // 3.27, 3.29, 3.30 – brak wizualizacji, tylko karta
};

// Kolejność kart: numer → X-{nn}-Layout1-1.png
const cardOrder = [
  "0.1","0.2","0.3","0.4","0.5","0.6","0.7","0.8",
  "1.9","1.10","1.11","1.12","1.13","1.14","1.15","1.16","1.17",
  "2.18","2.19","2.20","2.21","2.22","2.23","2.24","2.25","2.26",
  "3.27","3.28","3.29","3.30","3.31",
];
const cardFile = Object.fromEntries(
  cardOrder.map((numer, i) => {
    const n = String(i + 1).padStart(2, "0");
    return [numer, join(PUBLIC, "karty_mieszkan", `TG_Olimpijczyków_karty mieszkań-Sheet - X-${n}-Layout1-1.png`)];
  })
);

// ── helpers ─────────────────────────────────────────────────────────────────

async function listFiles(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(e.name))
      .map((e) => join(dir, e.name));
  } catch {
    return [];
  }
}

async function upload(filePath, publicId) {
  await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
}

// Process with limited concurrency
async function withConcurrency(tasks, limit = 4) {
  let i = 0;
  async function worker() {
    while (i < tasks.length) {
      const task = tasks[i++];
      await task();
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
}

// ── main ────────────────────────────────────────────────────────────────────

async function main() {
  const allNumerators = cardOrder; // all etap3 apartments

  let ok = 0, fail = 0;
  const tasks = [];

  for (const numer of allNumerators) {
    const aptFolder = `apartments/etap3-${numer}`;

    // 1. Wizualizacje
    const vizKey = etap3VizKey[numer];
    if (vizKey) {
      const vizDir = join(PUBLIC, "wizualizacje", vizKey.replace(/-/g, " i "));
      const files = await listFiles(vizDir);
      for (const filePath of files) {
        const name = basename(filePath, extname(filePath));
        const publicId = `${aptFolder}/${name}`;
        tasks.push(async () => {
          try {
            await upload(filePath, publicId);
            console.log(`✓ ${publicId}`);
            ok++;
          } catch (e) {
            console.error(`✗ ${publicId}: ${e.message}`);
            fail++;
          }
        });
      }
    }

    // 2. Karta (nazwa zarezerwowana: "karta")
    const karta = cardFile[numer];
    if (karta) {
      const publicId = `${aptFolder}/karta`;
      tasks.push(async () => {
        try {
          await upload(karta, publicId);
          console.log(`✓ ${publicId}`);
          ok++;
        } catch (e) {
          console.error(`✗ ${publicId}: ${e.message}`);
          fail++;
        }
      });
    }
  }

  console.log(`Uploading ${tasks.length} files (concurrency=4)…\n`);
  await withConcurrency(tasks, 4);

  console.log(`\n${"─".repeat(60)}`);
  console.log(`Done:  ${ok} uploaded,  ${fail} failed`);
}

main().catch((e) => { console.error(e); process.exit(1); });
