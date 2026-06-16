"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function ApartmentPhotos() {
  const { id } = useParams();
  const aptId = decodeURIComponent(id);

  const [apartment, setApartment] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    Promise.all([
      fetch(`/api/apartments?id=${encodeURIComponent(aptId)}`).then((r) => r.json()),
      fetchPhotos(),
    ]).then(([apt]) => {
      setApartment(apt);
      setLoading(false);
    });
  }, [aptId, fetchPhotos]);

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

        {/* ── Karta mieszkania ─────────────────────────────────────────── */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#111", marginBottom: "16px" }}>
            Karta mieszkania
          </h3>

          {loading ? (
            <div style={{ textAlign: "center", padding: "32px", color: "#aaa" }}>Ładowanie…</div>
          ) : karta ? (
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f0f0f0", width: "220px", flexShrink: 0 }}>
                <img src={karta.secure_url} alt="Karta" style={{ width: "100%", display: "block" }} />
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

          {/* Uploading karta indicator */}
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
          {loading ? null : gallery.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px", color: "#aaa", backgroundColor: "#fafafa", borderRadius: "8px" }}>
              Brak zdjęć w galerii — dodaj pierwsze powyżej
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
              {gallery.map((photo) => (
                <div
                  key={photo.public_id}
                  style={{ position: "relative", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f0f0f0", aspectRatio: "4/3" }}
                >
                  <img
                    src={photo.secure_url}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <button
                    onClick={() => handleDelete(photo.public_id)}
                    disabled={deleting === photo.public_id}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      backgroundColor: deleting === photo.public_id ? "rgba(150,150,150,0.9)" : "rgba(220,38,38,0.88)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "5px 12px",
                      cursor: deleting === photo.public_id ? "not-allowed" : "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                      fontFamily: "inherit",
                    }}
                  >
                    {deleting === photo.public_id ? "…" : "Usuń"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
