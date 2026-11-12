"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/adminApi";
export default function BrandsAdmin() {
  const [items, setItems] = useState([]),
    [name, setName] = useState(""),
    [error, setError] = useState("");
  async function load() {
    try {
      setItems((await apiRequest("/admin/brands")).items);
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function add(e) {
    e.preventDefault();
    try {
      await apiRequest("/admin/brands", {
        method: "POST",
        body: JSON.stringify({ name, isActive: true }),
      });
      setName("");
      load();
    } catch (e) {
      setError(e.message);
    }
  }
  async function del(id) {
    if (confirm("Delete this brand?")) {
      await apiRequest("/admin/brands/" + id, { method: "DELETE" });
      load();
    }
  }
  return (
    <>
      <h1>Brands</h1>
      <form
        onSubmit={add}
        style={{ display: "flex", gap: 8, margin: "20px 0" }}
      >
        <input
          required
          placeholder="Brand name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 11 }}
        />
        <button style={{ padding: 11 }}>Add Brand</button>
      </form>
      {error && <p>{error}</p>}
      <div style={{ background: "#fff", padding: 16, borderRadius: 10 }}>
        {items.map((x) => (
          <div
            key={x._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 12,
              borderBottom: "1px solid #eee",
            }}
          >
            {x.name}
            <button onClick={() => del(x._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
