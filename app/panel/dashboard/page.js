"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STATUS_COLOR = {
  DOSTEPNE: "#16a34a",
  REZERWACJA: "#d97706",
  SPRZEDANE: "#dc2626",
};
const STATUS_LABEL = {
  DOSTEPNE: "Dostępne",
  REZERWACJA: "Rezerwacja",
  SPRZEDANE: "Sprzedane",
};

export default function PanelDashboard() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/apartments")
      .then((r) => r.json())
      .then((data) => {
        setApartments(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/panel/auth", { method: "DELETE" });
    router.push("/panel");
  };

  const filtered = apartments.filter(
    (a) =>
      !filter ||
      a.numer?.toLowerCase().includes(filter.toLowerCase()) ||
      a.etap?.includes(filter.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", fontFamily: "Poppins, sans-serif" }}>
      {/* Topbar */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #e8e8e8", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#111" }}>Panel CMS</span>
          <span style={{ fontSize: "13px", color: "#888" }}>Osiedle Olimpijczyków</span>
        </div>
        <button
          onClick={handleLogout}
          style={{ padding: "7px 18px", border: "1px solid #e0e0e0", borderRadius: "7px", backgroundColor: "white", cursor: "pointer", fontSize: "13px", color: "#555", fontFamily: "inherit" }}
        >
          Wyloguj
        </button>
      </div>

      <div style={{ padding: "32px", maxWidth: "1280px", margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111", margin: 0 }}>
            Mieszkania
            {!loading && (
              <span style={{ marginLeft: "10px", fontSize: "14px", fontWeight: "400", color: "#888" }}>
                ({filtered.length} z {apartments.length})
              </span>
            )}
          </h2>
          <input
            type="text"
            placeholder="Szukaj…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "8px 14px", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "13px", fontFamily: "inherit", outline: "none", width: "200px" }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px", color: "#aaa", fontSize: "15px" }}>
            Ładowanie…
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
            {filtered.map((apt) => {
              const color = STATUS_COLOR[apt.dostepnosc] || "#888";
              return (
                <div
                  key={apt.id}
                  style={{ backgroundColor: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: "1px solid #eee", display: "flex", flexDirection: "column", gap: "12px" }}
                >
                  {/* Header row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#111" }}>
                      {apt.numer}
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px", backgroundColor: color + "18", color }}>
                      {STATUS_LABEL[apt.dostepnosc] || apt.dostepnosc}
                    </span>
                  </div>

                  {/* Info row */}
                  <div style={{ fontSize: "13px", color: "#666", display: "flex", gap: "10px" }}>
                    <span>{apt.etap === "etap2" ? "Etap 2" : "Etap 3"}</span>
                    {apt.powierzchnia && <span>{apt.powierzchnia} m²</span>}
                    {apt.liczba_pokoi && <span>{apt.liczba_pokoi} pok.</span>}
                    {apt.kondygnacja !== undefined && <span>K{apt.kondygnacja}</span>}
                  </div>

                  <Link
                    href={`/panel/apartment/${encodeURIComponent(apt.id)}`}
                    style={{ display: "block", textAlign: "center", padding: "9px 0", backgroundColor: "#007CBA", color: "white", borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: "500" }}
                  >
                    Zarządzaj zdjęciami
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
