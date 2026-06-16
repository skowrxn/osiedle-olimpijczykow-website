"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const STATUS_LABEL = { DOSTEPNE: "Dostępne", REZERWACJA: "Rezerwacja", SPRZEDANE: "Sprzedane" };
const STATUS_COLOR = { DOSTEPNE: "#16a34a", REZERWACJA: "#d97706", SPRZEDANE: "#dc2626" };

function Field({ label, value, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <span style={{ fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: "600" }}>{label}</span>
      <span style={{ fontSize: "14px", color: "#111", fontWeight: "500" }}>{children ?? value ?? "—"}</span>
    </div>
  );
}

function formatPrice(n) {
  if (!n) return "";
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " zł";
}

export default function ApartmentPhotos() {
  const { id } = useParams();
  const aptId = decodeURIComponent(id);

  const [apartment, setApartment] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Photo state
  const [uploading, setUploading] = useState(false);
  const [uploadKarta, setUploadKarta] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleting, setDeleting] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const kartaInputRef = useRef(null);
  const router = useRouter();

  const fetchPhotos = useCallback(async () => {
    const res = await fetch(`/api/panel/photos?id=${encodeURIComponent(aptId)}`);
    const data = await res.json();
    setPhotos(Array.isArray(data) ? data : []);
  }, [aptId]);

  const fetchApartment = useCallback(async () => {
    const apt = await fetch(`/api/apartments?id=${encodeURIComponent(aptId)}`).then((r) => r.json());
    setApartment(apt);
    return apt;
  }, [aptId]);

  useEffect(() => {
    Promise.all([fetchApartment(), fetchPhotos()]).then(() => setLoading(false));
  }, [fetchApartment, fetchPhotos]);

  // ── Edit handlers ─────────────────────────────────────────────────────────

  const startEdit = () => {
    setEditData({
      dostepnosc: apartment.dostepnosc || "DOSTEPNE",
      cena: apartment.cena || "",
      powierzchnia: apartment.powierzchnia || "",
      liczba_pokoi: apartment.liczba_pokoi || "",
      kondygnacja: apartment.kondygnacja ?? "",
      elementy_dodatkowe: apartment.elementy_dodatkowe || "",
    });
    setSaveError(null);
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditData(null);
    setSaveError(null);
  };

  const saveEdit = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/panel/apartment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: aptId,
          data: {
            dostepnosc: editData.dostepnosc,
            cena: editData.cena ? Number(editData.cena) : null,
            powierzchnia: editData.powierzchnia ? Number(editData.powierzchnia) : null,
            liczba_pokoi: editData.liczba_pokoi ? Number(editData.liczba_pokoi) : null,
            kondygnacja: editData.kondygnacja !== "" ? Number(editData.kondygnacja) : null,
            elementy_dodatkowe: editData.elementy_dodatkowe,
          },
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Błąd zapisu");
      }
      await fetchApartment();
      setEditMode(false);
      setEditData(null);
    } catch (e) {
      setSaveError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const setField = (key, value) => setEditData((prev) => ({ ...prev, [key]: value }));

  // ── Photo handlers ────────────────────────────────────────────────────────

  const doUpload = async (files, isKarta = false) => {
    if (!files.length) return;
    setUploading(true);
    setUploadKarta(isKarta);
    setUploadProgress(0);
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append("file", files[i]);
      fd.append("apartmentId", aptId);
      if (isKarta) fd.append("isKarta", "true");
      await fetch("/api/panel/photos", { method: "POST", body: fd });
      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
    }
    await fetchPhotos();
    setUploading(false);
    setUploadKarta(false);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (kartaInputRef.current) kartaInputRef.current.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    doUpload(files, false);
  };

  const handleDelete = async (publicId) => {
    if (!confirm("Usunąć to zdjęcie?")) return;
    setDeleting(publicId);
    await fetch("/api/panel/photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
    setPhotos((prev) => prev.filter((p) => p.public_id !== publicId));
    setDeleting(null);
  };

  const handleLogout = async () => {
    await fetch("/api/panel/auth", { method: "DELETE" });
    router.push("/panel");
  };

  const karta = photos.find((p) => p.public_id.endsWith("/karta"));
  const gallery = photos.filter((p) => !p.public_id.endsWith("/karta"));

  const inputStyle = {
    padding: "8px 12px",
    border: "1.5px solid #e0e0e0",
    borderRadius: "7px",
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", fontFamily: "Poppins, sans-serif" }}>
      {/* Topbar */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #e8e8e8", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/panel/dashboard" style={{ fontSize: "13px", color: "#007CBA", textDecoration: "none", fontWeight: "500" }}>
            ← Powrót
          </Link>
          <span style={{ color: "#ddd" }}>|</span>
          <span style={{ fontSize: "16px", fontWeight: "600", color: "#111" }}>
            {loading ? "…" : `Mieszkanie ${apartment?.numer || aptId}`}
          </span>
          {apartment && (
            <span style={{ fontSize: "12px", color: "#888" }}>
              {apartment.etap === "etap2" ? "Etap 2" : "Etap 3"}
              {apartment.powierzchnia && ` · ${apartment.powierzchnia} m²`}
            </span>
          )}
        </div>
        <button
          onClick={handleLogout}
          style={{ padding: "7px 18px", border: "1px solid #e0e0e0", borderRadius: "7px", backgroundColor: "white", cursor: "pointer", fontSize: "13px", color: "#555", fontFamily: "inherit" }}
        >
          Wyloguj
        </button>
      </div>

      <div style={{ padding: "32px", maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* ── Dane mieszkania ──────────────────────────────────────────────── */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: editMode ? "20px" : "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#111", margin: 0 }}>Dane mieszkania</h3>
            {!loading && !editMode && (
              <button
                onClick={startEdit}
                style={{ padding: "7px 18px", border: "1.5px solid #007CBA", borderRadius: "8px", backgroundColor: "white", color: "#007CBA", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}
              >
                Edytuj
              </button>
            )}
          </div>

          {loading ? (
            <div style={{ color: "#aaa", fontSize: "14px" }}>Ładowanie…</div>
          ) : !editMode ? (
            /* ── View mode ── */
            <div style={{ display: "flex", flexWrap: "wrap", gap: "28px" }}>
              <Field label="Status">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: STATUS_COLOR[apartment.dostepnosc] || "#888", display: "inline-block" }} />
                  {STATUS_LABEL[apartment.dostepnosc] || apartment.dostepnosc}
                </span>
              </Field>
              <Field label="Cena" value={formatPrice(apartment.cena) || "—"} />
              <Field label="Powierzchnia" value={apartment.powierzchnia ? `${apartment.powierzchnia} m²` : "—"} />
              <Field label="Pokoje" value={apartment.liczba_pokoi ?? "—"} />
              <Field label="Kondygnacja" value={apartment.kondygnacja != null ? `K${apartment.kondygnacja}` : "—"} />
              <Field label="Elementy dodatkowe" value={apartment.elementy_dodatkowe || "—"} />
            </div>
          ) : (
            /* ── Edit mode ── */
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px" }}>
                {/* Status */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#888", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "5px" }}>Status</label>
                  <select
                    value={editData.dostepnosc}
                    onChange={(e) => setField("dostepnosc", e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="DOSTEPNE">Dostępne</option>
                    <option value="REZERWACJA">Rezerwacja</option>
                    <option value="SPRZEDANE">Sprzedane</option>
                  </select>
                </div>

                {/* Cena */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#888", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "5px" }}>Cena (zł)</label>
                  <input
                    type="number"
                    value={editData.cena}
                    onChange={(e) => setField("cena", e.target.value)}
                    placeholder="np. 650000"
                    style={inputStyle}
                  />
                </div>

                {/* Powierzchnia */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#888", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "5px" }}>Powierzchnia (m²)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editData.powierzchnia}
                    onChange={(e) => setField("powierzchnia", e.target.value)}
                    placeholder="np. 62.5"
                    style={inputStyle}
                  />
                </div>

                {/* Pokoje */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#888", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "5px" }}>Liczba pokoi</label>
                  <input
                    type="number"
                    value={editData.liczba_pokoi}
                    onChange={(e) => setField("liczba_pokoi", e.target.value)}
                    placeholder="np. 3"
                    style={inputStyle}
                  />
                </div>

                {/* Kondygnacja */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#888", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "5px" }}>Kondygnacja</label>
                  <input
                    type="number"
                    value={editData.kondygnacja}
                    onChange={(e) => setField("kondygnacja", e.target.value)}
                    placeholder="np. 3"
                    style={inputStyle}
                  />
                </div>

                {/* Elementy dodatkowe — full width */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "11px", color: "#888", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "5px" }}>Elementy dodatkowe</label>
                  <input
                    type="text"
                    value={editData.elementy_dodatkowe}
                    onChange={(e) => setField("elementy_dodatkowe", e.target.value)}
                    placeholder="np. parking, komórka lokatorska"
                    style={inputStyle}
                  />
                </div>
              </div>

              {saveError && (
                <div style={{ padding: "10px 14px", backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", fontSize: "13px", color: "#dc2626" }}>
                  {saveError}
                </div>
              )}

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={saveEdit}
                  disabled={saving}
                  style={{ padding: "9px 24px", backgroundColor: saving ? "#9ca3af" : "#007CBA", color: "white", border: "none", borderRadius: "8px", cursor: saving ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}
                >
                  {saving ? "Zapisywanie…" : "Zapisz zmiany"}
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={saving}
                  style={{ padding: "9px 20px", backgroundColor: "white", color: "#555", border: "1px solid #e0e0e0", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontFamily: "inherit" }}
                >
                  Anuluj
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Karta mieszkania ─────────────────────────────────────────── */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#111", marginBottom: "16px" }}>Karta mieszkania</h3>

          {loading ? (
            <div style={{ textAlign: "center", padding: "32px", color: "#aaa" }}>Ładowanie…</div>
          ) : karta ? (
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ borderRadius: "8px", overflow: "hidden", backgroundColor: "#f0f0f0", width: "220px", flexShrink: 0 }}>
                <Image
                    src={karta.secure_url}
                    alt="Karta"
                    width={400}
                    height={300}
                    style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  onClick={() => kartaInputRef.current?.click()}
                  disabled={uploading}
                  style={{ padding: "9px 20px", backgroundColor: "#007CBA", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}
                >
                  Zmień kartę
                </button>
                <button
                  onClick={() => handleDelete(karta.public_id)}
                  disabled={!!deleting}
                  style={{ padding: "9px 20px", backgroundColor: "white", color: "#dc2626", border: "1px solid #dc2626", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}
                >
                  Usuń kartę
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
              <p style={{ color: "#aaa", margin: 0, fontSize: "14px" }}>Brak karty mieszkania</p>
              <button
                onClick={() => kartaInputRef.current?.click()}
                disabled={uploading}
                style={{ padding: "9px 20px", backgroundColor: "#007CBA", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "inherit" }}
              >
                Dodaj kartę
              </button>
            </div>
          )}

          {uploading && uploadKarta && (
            <div style={{ marginTop: "12px", color: "#007CBA", fontSize: "13px" }}>
              Przesyłanie karty… {uploadProgress}%
            </div>
          )}

          <input
            ref={kartaInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const files = Array.from(e.target.files);
              if (files.length) doUpload([files[0]], true);
            }}
          />
        </div>

        {/* ── Galeria wizualizacji ─────────────────────────────────────── */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#111", marginBottom: "16px" }}>
            Galeria
            <span style={{ fontWeight: "400", color: "#888", marginLeft: "8px" }}>({gallery.length})</span>
          </h3>

          {/* Upload zone */}
          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragOver ? "#007CBA" : "#d0d0d0"}`,
              borderRadius: "10px",
              padding: "32px 24px",
              textAlign: "center",
              cursor: uploading ? "default" : "pointer",
              backgroundColor: dragOver ? "#f0f8ff" : "#fafafa",
              transition: "all 0.2s",
              marginBottom: "20px",
            }}
          >
            {uploading && !uploadKarta ? (
              <div>
                <p style={{ color: "#007CBA", fontWeight: "500", marginBottom: "10px" }}>
                  Przesyłanie… {uploadProgress}%
                </p>
                <div style={{ width: "180px", height: "5px", backgroundColor: "#e0e0e0", borderRadius: "3px", margin: "0 auto" }}>
                  <div style={{ width: `${uploadProgress}%`, height: "100%", backgroundColor: "#007CBA", borderRadius: "3px", transition: "width 0.3s" }} />
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>📷</div>
                <p style={{ fontWeight: "500", color: "#333", marginBottom: "4px" }}>Kliknij lub przeciągnij zdjęcia</p>
                <p style={{ fontSize: "12px", color: "#999" }}>JPG, PNG, WEBP — można wybrać wiele</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => doUpload(Array.from(e.target.files), false)}
            />
          </div>

          {/* Gallery grid */}
          {!loading && (gallery.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px", color: "#aaa", backgroundColor: "#fafafa", borderRadius: "8px" }}>
              Brak zdjęć w galerii — dodaj pierwsze powyżej
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
              {gallery.map((photo) => (
                <div key={photo.public_id} style={{ position: "relative", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f0f0f0", aspectRatio: "4/3" }}>
                  <Image
                    src={photo.secure_url}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <button
                    onClick={() => handleDelete(photo.public_id)}
                    disabled={deleting === photo.public_id}
                    style={{
                      position: "absolute", top: "8px", right: "8px",
                      backgroundColor: deleting === photo.public_id ? "rgba(150,150,150,0.9)" : "rgba(220,38,38,0.88)",
                      color: "white", border: "none", borderRadius: "6px", padding: "5px 12px",
                      cursor: deleting === photo.public_id ? "not-allowed" : "pointer",
                      fontSize: "12px", fontWeight: "600", fontFamily: "inherit",
                    }}
                  >
                    {deleting === photo.public_id ? "…" : "Usuń"}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
