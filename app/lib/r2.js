import { AwsClient } from "aws4fetch";

// Magazyn zdjęć mieszkań: Cloudflare R2 (API zgodne z S3).
// Zdjęcia serwuje publiczny adres bucketa (r2.dev albo własna domena),
// a zapis i kasowanie idą przez klucz S3 trzymany w zmiennych środowiskowych.
const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET = process.env.R2_BUCKET || "osiedle-olimpijczykow";
const PUBLIC_BASE = (process.env.R2_PUBLIC_BASE_URL || "").replace(/\/+$/, "");

export const PREFIX_MIESZKANIA = "apartments";

export const r2Skonfigurowane = () =>
  Boolean(ACCOUNT_ID && ACCESS_KEY_ID && SECRET_ACCESS_KEY && PUBLIC_BASE);

const bazowyUrl = () => `https://${ACCOUNT_ID}.r2.cloudflarestorage.com/${BUCKET}`;

const klient = () =>
  new AwsClient({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    service: "s3",
    region: "auto",
  });

// Publiczny adres pliku. Nazwy mieszkań zawierają kropki i polskie znaki,
// więc każdy segment ścieżki kodujemy osobno.
export const publicznyUrl = (key) =>
  `${PUBLIC_BASE}/${key.split("/").map(encodeURIComponent).join("/")}`;

const odczytajTagi = (xml, tag) => {
  const out = [];
  const re = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g");
  let m;
  while ((m = re.exec(xml))) out.push(m[1]);
  return out;
};

const odkodujXml = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

// Lista obiektów o danym prefiksie (ListObjectsV2, ze stronicowaniem).
export async function listaObiektow(prefix) {
  if (!r2Skonfigurowane()) return [];
  const aws = klient();
  const klucze = [];
  let token = null;

  do {
    const url = new URL(bazowyUrl());
    url.searchParams.set("list-type", "2");
    url.searchParams.set("prefix", prefix);
    url.searchParams.set("max-keys", "1000");
    if (token) url.searchParams.set("continuation-token", token);

    const res = await aws.fetch(url.toString());
    if (!res.ok) throw new Error(`R2 list ${res.status}: ${await res.text()}`);

    const xml = await res.text();
    for (const zawartosc of odczytajTagi(xml, "Contents")) {
      const key = odczytajTagi(zawartosc, "Key")[0];
      if (key) klucze.push(odkodujXml(key));
    }
    token = odczytajTagi(xml, "NextContinuationToken")[0] || null;
  } while (token);

  return klucze;
}

export async function zapiszObiekt(key, body, contentType) {
  if (!r2Skonfigurowane()) throw new Error("R2 nie jest skonfigurowane");
  const res = await klient().fetch(`${bazowyUrl()}/${key.split("/").map(encodeURIComponent).join("/")}`, {
    method: "PUT",
    body,
    headers: { "Content-Type": contentType || "application/octet-stream" },
  });
  if (!res.ok) throw new Error(`R2 put ${res.status}: ${await res.text()}`);
  return publicznyUrl(key);
}

export async function usunObiekt(key) {
  if (!r2Skonfigurowane()) throw new Error("R2 nie jest skonfigurowane");
  const res = await klient().fetch(`${bazowyUrl()}/${key.split("/").map(encodeURIComponent).join("/")}`, {
    method: "DELETE",
  });
  if (!res.ok && res.status !== 404)
    throw new Error(`R2 delete ${res.status}: ${await res.text()}`);
}

// Zdjęcia pogrupowane po mieszkaniu: { [idMieszkania]: { zdjecia: [], karta } }
export async function zdjeciaMieszkan() {
  const klucze = await listaObiektow(`${PREFIX_MIESZKANIA}/`);
  const wynik = {};

  for (const key of klucze) {
    const czesci = key.split("/");
    if (czesci.length < 3) continue;
    const idMieszkania = czesci[1];
    const nazwa = czesci.slice(2).join("/");

    if (!wynik[idMieszkania]) wynik[idMieszkania] = { zdjecia: [], karta: null };
    if (nazwa.replace(/\.[^.]+$/, "") === "karta") wynik[idMieszkania].karta = publicznyUrl(key);
    else wynik[idMieszkania].zdjecia.push(publicznyUrl(key));
  }

  for (const wpis of Object.values(wynik)) wpis.zdjecia.sort();
  return wynik;
}
