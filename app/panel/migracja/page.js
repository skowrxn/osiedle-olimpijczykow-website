"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

// Jednorazowe przeniesienie wizualizacji mieszkań z Dysku Google do R2.
// Pliki idą partiami, żeby zmieścić się w limicie czasu funkcji.
const PARTIA = 3;

export default function MigracjaPanel() {
  const [status, setStatus] = useState(null);
  const [blad, setBlad] = useState(null);
  const [dziala, setDziala] = useState(false);
  const [log, setLog] = useState([]);

  const pobierzStatus = useCallback(async () => {
    const res = await fetch("/api/panel/migracja");
    const dane = await res.json();
    if (!res.ok) {
      setBlad(dane.error || "Nie udało się pobrać statusu");
      setStatus(null);
      return null;
    }
    setBlad(null);
    setStatus(dane);
    return dane;
  }, []);

  useEffect(() => {
    pobierzStatus();
  }, [pobierzStatus]);

  const uruchom = async () => {
    setDziala(true);
    setBlad(null);
    setLog([]);

    try {
      const dane = await pobierzStatus();
      if (!dane) return;

      for (const mieszkanie of dane.mieszkania) {
        if (mieszkanie.wR2 >= mieszkanie.doWgrania) {
          setLog((l) => [...l, `${mieszkanie.numer}: już wgrane (${mieszkanie.wR2})`]);
          continue;
        }

        let od = 0;
        while (od !== null) {
          const res = await fetch("/api/panel/migracja", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numer: mieszkanie.numer, od, ile: PARTIA }),
          });
          const wynik = await res.json();
          if (!res.ok) throw new Error(`${mieszkanie.numer}: ${wynik.error || "błąd wgrywania"}`);

          setLog((l) => [
            ...l,
            `${mieszkanie.numer}: ${od + wynik.wgrane.length}/${wynik.wszystkich}`,
          ]);
          od = wynik.nastepny;
        }
      }

      setLog((l) => [...l, "Gotowe."]);
      await pobierzStatus();
    } catch (e) {
      setBlad(e.message);
    } finally {
      setDziala(false);
    }
  };

  const postep = status ? `${status.razemWR2} / ${status.razemDoWgrania}` : "—";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", fontFamily: "Poppins, sans-serif" }}>
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #e8e8e8", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", gap: "16px" }}>
        <Link href="/panel/dashboard" style={{ fontSize: "13px", color: "#007CBA", textDecoration: "none", fontWeight: "500" }}>← Powrót</Link>
        <span style={{ color: "#ddd" }}>|</span>
        <span style={{ fontSize: "16px", fontWeight: "600", color: "#111" }}>Wizualizacje mieszkań z Dysku</span>
      </div>

      <div style={{ padding: "32px", maxWidth: "820px", margin: "0 auto" }}>
        <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}>
          Przenosi wizualizacje mieszkań Etapu 3 z folderu <strong>ETAP 3 / WIZUALIZACJE MIESZKAŃ</strong> na
          Dysku do magazynu zdjęć strony. Przypisanie do mieszkań bierze się z nazw folderów. Zdjęcia już
          wgrane są pomijane, więc migrację można bezpiecznie powtórzyć.
        </p>

        <div style={{ backgroundColor: "white", border: "1px solid #eee", borderRadius: "10px", padding: "20px", marginTop: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "13px", color: "#888" }}>Wgrane zdjęcia</div>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "#111" }}>{postep}</div>
            </div>
            <button
              onClick={uruchom}
              disabled={dziala || !status}
              style={{
                padding: "11px 24px", borderRadius: "8px", border: "none", fontFamily: "inherit",
                fontSize: "14px", fontWeight: "600", color: "white",
                backgroundColor: dziala || !status ? "#9bbfd4" : "#007CBA",
                cursor: dziala || !status ? "not-allowed" : "pointer",
              }}
            >
              {dziala ? "Wgrywanie…" : "Uruchom migrację"}
            </button>
          </div>

          {blad && (
            <div style={{ marginTop: "16px", padding: "12px 14px", borderRadius: "8px", backgroundColor: "#fdecec", color: "#b3261e", fontSize: "13px" }}>
              {blad}
            </div>
          )}
        </div>

        {status && (
          <div style={{ backgroundColor: "white", border: "1px solid #eee", borderRadius: "10px", marginTop: "20px", overflow: "hidden" }}>
            {status.mieszkania.map((m) => (
              <div key={m.numer} style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid #f3f3f3", fontSize: "13px" }}>
                <span style={{ fontWeight: "600", color: "#111" }}>{m.numer}</span>
                <span style={{ color: m.wR2 >= m.doWgrania ? "#16a34a" : "#888" }}>
                  {m.wR2} / {m.doWgrania}
                </span>
              </div>
            ))}
          </div>
        )}

        {log.length > 0 && (
          <pre style={{ marginTop: "20px", padding: "16px", backgroundColor: "#111", color: "#ddd", borderRadius: "10px", fontSize: "12px", maxHeight: "320px", overflow: "auto" }}>
            {log.join("\n")}
          </pre>
        )}
      </div>
    </div>
  );
}
