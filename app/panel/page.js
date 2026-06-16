"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PanelLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/panel/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/panel/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Błąd logowania");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f0f2f5", fontFamily: "Poppins, sans-serif" }}>
      <div style={{ backgroundColor: "white", padding: "48px", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", width: "100%", maxWidth: "420px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111", margin: 0 }}>
            Panel CMS
          </h1>
          <p style={{ color: "#888", marginTop: "6px", fontSize: "14px" }}>
            Osiedle Olimpijczyków
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "500", color: "#444" }}>
              Login
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s" }}
              onFocus={(e) => (e.target.style.borderColor = "#007CBA")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "500", color: "#444" }}>
              Hasło
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s" }}
              onFocus={(e) => (e.target.style.borderColor = "#007CBA")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
          </div>

          {error && (
            <div style={{ backgroundColor: "#fff0f0", border: "1px solid #ffd0d0", borderRadius: "8px", padding: "12px 14px", marginBottom: "16px", color: "#c0392b", fontSize: "13px" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "13px", backgroundColor: "#007CBA", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.75 : 1, transition: "opacity 0.2s" }}
          >
            {loading ? "Logowanie…" : "Zaloguj się"}
          </button>
        </form>
      </div>
    </div>
  );
}
