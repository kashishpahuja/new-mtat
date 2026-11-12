"use client";
import { useState } from "react";
import { apiRequest } from "../../lib/adminApi";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("mtat_admin_token", data.token);
      location.href = "/admin";
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f4f6f8",
        fontFamily: "Arial",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 14,
          width: "min(420px,92vw)",
          boxShadow: "0 10px 40px #0001",
        }}
      >
        <h1>MTAT Admin Login</h1>
        <p>Sign in to manage website content.</p>
        <label>Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={field}
        />
        <label>Password</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={field}
        />
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        <button disabled={busy} style={button}>
          {busy ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
const field = {
  display: "block",
  width: "100%",
  padding: 12,
  margin: "8px 0 18px",
  border: "1px solid #ccd3dc",
  borderRadius: 7,
};
const button = {
  width: "100%",
  padding: 13,
  background: "#467B23",
  color: "#fff",
  border: 0,
  borderRadius: 7,
  cursor: "pointer",
};
