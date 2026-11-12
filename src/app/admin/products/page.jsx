"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/adminApi";
export default function ProductsAdmin() {
  const [items, setItems] = useState([]),
    [name, setName] = useState(""),
    [category, setCategory] = useState("Metal Cutting"),
    [error, setError] = useState("");
  async function load() {
    try {
      const d = await apiRequest("/admin/products");
      setItems(d.items);
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
      await apiRequest("/admin/products", {
        method: "POST",
        body: JSON.stringify({ name, category, isActive: true }),
      });
      setName("");
      load();
    } catch (e) {
      setError(e.message);
    }
  }
  async function del(id) {
    if (confirm("Delete this product?")) {
      await apiRequest("/admin/products/" + id, { method: "DELETE" });
      load();
    }
  }
  return (
    <>
      <h1>Products</h1>
      <form onSubmit={add} style={form}>
        <input
          required
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={input}
        >
          {[
            "Metal Cutting",
            "Metal Forming",
            "Metrology",
            "Tool Room & Accessories",
            "Software",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <button style={btn}>Add Product</button>
      </form>
      {error && <p>{error}</p>}
      <div style={panel}>
        {items.map((x) => (
          <div key={x._id} style={line}>
            <span>
              <b>{x.name}</b>
              <small> — {x.category}</small>
            </span>
            <button onClick={() => del(x._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
const form = { display: "flex", gap: 8, flexWrap: "wrap", margin: "20px 0" },
  input = { padding: 11, border: "1px solid #ccd3dc", borderRadius: 7 },
  btn = {
    padding: "10px 16px",
    background: "#467B23",
    color: "#fff",
    border: 0,
    borderRadius: 7,
  },
  panel = { background: "#fff", padding: 16, borderRadius: 10 },
  line = {
    display: "flex",
    justifyContent: "space-between",
    padding: 12,
    borderBottom: "1px solid #eee",
  };
