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

function ApartmentRow({ apt }) {
  const color = STATUS_COLOR[apt.dostepnosc] || "#888";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "90px 80px 80px 60px 120px 1fr", alignItems: "center", gap: "16px", padding: "13px 20px", borderBottom: "1px solid #f0f0f0", backgroundColor: "white" }}>
      <span style={{ fontWeight: "600", color: "#111", fontSize: "14px" }}>{apt.numer}</span>
      <span style={{ fontSize: "13px", color: "#555" }}>{apt.powierzchnia ? `${apt.powierzchnia} m²` : "—"}</span>
      <span style={{ fontSize: "13px", color: "#555" }}>{apt.liczba_pokoi ? `${apt.liczba_pokoi} pok.` : "—"}</span>
      <span style={{ fontSize: "13px", color: "#555" }}>{apt.kondygnacja != null ? `K${apt.kondygnacja}` : "—"}</span>
      <span style={{ fontSize: "12px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px", backgroundColor: color + "18", color, display: "inline-block", textAlign: "center" }}>
        {STATUS_LABEL[apt.dostepnosc] || apt.dostepnosc}
      </span>
      <Link
        href={`/panel/apartment/${encodeURIComponent(apt.id)}`}
        style={{ fontSize: "13px", color: "#007CBA", textDecoration: "none", fontWeight: "500", justifySelf: "end" }}
      >
        Zarządzaj mieszkaniem →
      </Link>
    </div>
  );
}

function EtapSection({ label, apartments }) {
  if (!apartments.length) return null;
  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#111" }}>{label}</h3>
        <span style={{ fontSize: "13px", color: "#888" }}>{apartments.length} mieszkań</span>
      </div>
      <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #eee", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "90px 80px 80px 60px 120px 1fr", gap: "16px", padding: "10px 20px", backgroundColor: "#f8f8f8", borderBottom: "1px solid #e8e8e8" }}>
          {["Numer", "Powierzchnia", "Pokoje", "Pietro", "Status", ""].map((h) => (
            <span key={h} style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
          ))}
        </div>
        {apartments.map((apt) => <ApartmentRow key={apt.id} apt={apt} />)}
      </div>
    </div>
  );
}

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
      a.numer?.toLowerCase().includes(filter.toLowerCase())
  );

  const etap2 = filtered.filter((a) => a.etap === "etap2");
  const etap3 = filtered.filter((a) => a.etap === "etap3");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", fontFamily: "Poppins, sans-serif" }}>
      {/* Topbar */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #e8e8e8", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "#111" }}>Panel Zarządzania</span>
            <span style={{ fontSize: "13px", color: "#888" }}>Osiedle Olimpijczyków</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/panel/cennik"
              style={{ fontSize: "13px", color: "#007CBA", textDecoration: "none", fontWeight: "500", padding: "7px 16px", border: "1px solid #007CBA", borderRadius: "7px" }}
            >
              Ceny miejsc
            </Link>
            <Link
              href="/panel/postepy"
              style={{ fontSize: "13px", color: "#007CBA", textDecoration: "none", fontWeight: "500", padding: "7px 16px", border: "1px solid #007CBA", borderRadius: "7px" }}
            >
              Postępy budowy
            </Link>
            <button
              onClick={handleLogout}
              style={{ padding: "7px 18px", border: "1px solid #e0e0e0", borderRadius: "7px", backgroundColor: "white", cursor: "pointer", fontSize: "13px", color: "#555", fontFamily: "inherit" }}
            >
              Wyloguj
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: "32px", maxWidth: "1100px", margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
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
            placeholder="Szukaj numeru…"
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
          <>
            <EtapSection label="Etap 3" apartments={etap3} />
            <EtapSection label="Etap 2" apartments={etap2} />
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px", color: "#aaa" }}>
                Brak wyników dla &ldquo;{filter}&rdquo;
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
