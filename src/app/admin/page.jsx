"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../lib/adminApi";
export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    apiRequest("/admin/dashboard")
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <p>Manage your MTAT website from one place.</p>
      {error && (
        <p style={{ color: "crimson" }}>{error} — please log in again.</p>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        {stats &&
          Object.entries({
            Products: stats.products,
            Brands: stats.brands,
            "All Enquiries": stats.enquiries,
            "New Enquiries": stats.newEnquiries,
            Testimonials: stats.testimonials,
          }).map(([k, v]) => (
            <div key={k} style={card}>
              <small>{k}</small>
              <h2>{v}</h2>
            </div>
          ))}
      </div>
    </>
  );
}
const card = {
  background: "#fff",
  padding: 22,
  borderRadius: 12,
  boxShadow: "0 2px 12px #00008",
};
