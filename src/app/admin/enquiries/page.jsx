"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/adminApi";
export default function EnquiriesAdmin() {
  const [items, setItems] = useState([]),
    [error, setError] = useState("");
  async function load() {
    try {
      setItems((await apiRequest("/admin/enquiries")).items);
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function update(id, status) {
    await apiRequest("/admin/enquiries/" + id, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    load();
  }
  return (
    <>
      <h1>Website Enquiries</h1>
      <p>Review customer messages and update their status.</p>
      {error && <p>{error}</p>}
      <div style={{ display: "grid", gap: 12 }}>
        {items.map((x) => (
          <article
            key={x._id}
            style={{ background: "#fff", padding: 18, borderRadius: 10 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <b>{x.name}</b>
              <select
                value={x.status}
                onChange={(e) => update(x._id, e.target.value)}
              >
                {["new", "in-progress", "responded", "closed"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <p>
              {x.email} {x.phone && ` · ${x.phone}`}
            </p>
            <b>{x.subject}</b>
            <p>{x.message}</p>
            <small>{new Date(x.createdAt).toLocaleString()}</small>
          </article>
        ))}
      </div>
    </>
  );
}
