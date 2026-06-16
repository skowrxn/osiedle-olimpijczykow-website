"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STEPS = [
  "Rozpoczęcie prac",
  "Stan surowy otwarty",
  "Stan surowy zamknięty",
  "Stan deweloperski",
  "Zamknięcie prac na budowie",
  "Pozwolenie na użytkowanie",
  "Przekazywanie kluczy",
];

export default function PostepyPanel() {
  const [currentStage, setCurrentStage] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/panel/progress")
      .then((r) => r.json())
      .then((d) => {
        setCurrentStage(d.stage ?? 0);
        setSelected(d.stage ?? 0);
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
      const res = await fetch("/api/panel/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: selected }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Błąd zapisu");
      }
      setCurrentStage(selected);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setSaveError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const changed = selected !== currentStage;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", fontFamily: "Poppins, sans-serif" }}>
      {/* Topbar */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #e8e8e8", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/panel/dashboard" style={{ fontSize: "13px", color: "#007CBA", textDecoration: "none", fontWeight: "500" }}>← Powrót</Link>
          <span style={{ color: "#ddd" }}>|</span>
          <span style={{ fontSize: "16px", fontWeight: "600", color: "#111" }}>Postępy w budowie</span>
        </div>
        <button
          onClick={handleLogout}
          style={{ padding: "7px 18px", border: "1px solid #e0e0e0", borderRadius: "7px", backgroundColor: "white", cursor: "pointer", fontSize: "13px", color: "#555", fontFamily: "inherit" }}
        >
          Wyloguj
        </button>
      </div>

      <div style={{ padding: "40px 32px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#111" }}>Etap III — postępy budowy</h2>
            <span style={{ fontSize: "12px", color: "#888", backgroundColor: "#f5f5f5", padding: "3px 10px", borderRadius: "20px" }}>
              kliknij etap, który jest aktualnie osiągnięty
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#aaa" }}>Ładowanie…</div>
          ) : (
            <>
              {/* Timeline */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {STEPS.map((step, index) => {
                  const isCompleted = index < selected;
                  const isActive = index === selected;
                  const isPending = index > selected;

                  return (
                    <div
                      key={index}
                      onClick={() => setSelected(index)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "14px 16px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        backgroundColor: isActive ? "#f0f8ff" : "transparent",
                        border: isActive ? "2px solid #007CBA" : "2px solid transparent",
                        marginBottom: "8px",
                        transition: "all 0.15s",
                      }}
                    >
                      {/* Dot */}
                      <div style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isCompleted ? "#333" : isActive ? "#007CBA" : "#e8e8e8",
                        border: `3px solid ${isCompleted ? "#333" : isActive ? "#007CBA" : "#e8e8e8"}`,
                        transition: "all 0.15s",
                      }}>
                        {isCompleted && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {isActive && (
                          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "white" }} />
                        )}
                      </div>

                      {/* Label */}
                      <div style={{ flex: 1 }}>
                        <span style={{
                          fontSize: "15px",
                          fontWeight: isActive ? "600" : isCompleted ? "500" : "400",
                          color: isActive ? "#007CBA" : isCompleted ? "#111" : "#aaa",
                        }}>
                          {step}
                        </span>
                        {isCompleted && <span style={{ fontSize: "11px", color: "#888", marginLeft: "8px" }}>✓ ukończone</span>}
                        {isActive && <span style={{ fontSize: "11px", color: "#007CBA", marginLeft: "8px", fontWeight: "600" }}>← aktualny</span>}
                      </div>

                      {/* Step number */}
                      <span style={{ fontSize: "12px", color: "#ccc", fontWeight: "500" }}>{index + 1}/{STEPS.length}</span>
                    </div>
                  );
                })}
              </div>

              {/* Save */}
              <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "12px" }}>
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
                {!changed && !saved && (
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
