"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function formatPrice(n) {
  if (!n && n !== 0) return "";
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const inputStyle = {
  padding: "11px 14px",
  border: "1.5px solid #e0e0e0",
  borderRadius: "8px",
  fontSize: "15px",
  fontFamily: "Poppins, sans-serif",
  outline: "none",
  width: "200px",
  boxSizing: "border-box",
};

export default function CennikPanel() {
  const [current, setCurrent] = useState(null);
  const [parking, setParking] = useState("");
  const [storage, setStorage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/panel/prices")
      .then((r) => r.json())
      .then((d) => {
        setCurrent({ parkingPrice: d.parkingPrice, storagePrice: d.storagePrice });
        setParking(String(d.parkingPrice));
        setStorage(String(d.storagePrice));
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/panel/auth", { method: "DELETE" });
    router.push("/panel");
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      const parkingVal = Math.round(Number(parking));
      const storageVal = Math.round(Number(storage));
      if (isNaN(parkingVal) || isNaN(storageVal))
        throw new Error("Wprowadź prawidłowe wartości liczbowe");

      const res = await fetch("/api/panel/prices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parkingPrice: parkingVal, storagePrice: storageVal }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Błąd zapisu");
      }
      setCurrent({ parkingPrice: parkingVal, storagePrice: storageVal });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setSaveError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const changed =
    current &&
    (Math.round(Number(parking)) !== current.parkingPrice ||
      Math.round(Number(storage)) !== current.storagePrice);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", fontFamily: "Poppins, sans-serif" }}>
      {/* Topbar */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #e8e8e8", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/panel/dashboard" style={{ fontSize: "13px", color: "#007CBA", textDecoration: "none", fontWeight: "500" }}>
              ← Powrót
            </Link>
            <span style={{ color: "#ddd" }}>|</span>
            <span style={{ fontSize: "16px", fontWeight: "600", color: "#111" }}>Ceny miejsc i komórek</span>
          </div>
          <button
            onClick={handleLogout}
            style={{ padding: "7px 18px", border: "1px solid #e0e0e0", borderRadius: "7px", backgroundColor: "white", cursor: "pointer", fontSize: "13px", color: "#555", fontFamily: "inherit" }}
          >
            Wyloguj
          </button>
        </div>
      </div>

      <div style={{ padding: "40px 32px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", maxWidth: "560px" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: "600", color: "#111" }}>
            Ceny dodatkowych opcji
          </h2>
          <p style={{ margin: "0 0 32px", fontSize: "13px", color: "#888" }}>
            Zmiany widoczne na stronie po odświeżeniu (cache 60s).
          </p>

          {loading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#aaa" }}>Ładowanie…</div>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "32px" }}>
                {/* Parking */}
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600", color: "#444", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Miejsce parkingowe (PLN)
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input
                      type="number"
                      value={parking}
                      onChange={(e) => setParking(e.target.value)}
                      min={0}
                      step={1000}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#007CBA")}
                      onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                    />
                    {parking && !isNaN(Number(parking)) && (
                      <span style={{ fontSize: "15px", color: "#555" }}>
                        = {formatPrice(Number(parking))} zł
                      </span>
                    )}
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "600", color: "#444", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Komórka lokatorska (PLN)
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input
                      type="number"
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      min={0}
                      step={1000}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#007CBA")}
                      onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                    />
                    {storage && !isNaN(Number(storage)) && (
                      <span style={{ fontSize: "15px", color: "#555" }}>
                        = {formatPrice(Number(storage))} zł
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Save */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  onClick={handleSave}
                  disabled={saving || !changed}
                  style={{
                    padding: "10px 28px",
                    backgroundColor: saving || !changed ? "#9ca3af" : "#007CBA",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: saving || !changed ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "inherit",
                    transition: "background-color 0.15s",
                  }}
                >
                  {saving ? "Zapisywanie…" : "Zapisz"}
                </button>

                {saved && (
                  <span style={{ fontSize: "13px", color: "#16a34a", fontWeight: "500" }}>
                    ✓ Zapisano — strona zostanie zaktualizowana
                  </span>
                )}
                {saveError && (
                  <span style={{ fontSize: "13px", color: "#dc2626" }}>{saveError}</span>
                )}
                {!changed && !saved && current && (
                  <span style={{ fontSize: "12px", color: "#aaa" }}>Brak zmian</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
