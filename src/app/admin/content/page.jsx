"use client";
import { useState } from "react";
import { apiRequest } from "../../lib/adminApi";
export default function ContentAdmin() {
  const [key, setKey] = useState("homepage"),
    [value, setValue] = useState(
      '{\n  "heroTitle": "Advance Machine tools & Industrial Solutions",\n  "heroDescription": "MTAT Technologies delivers advanced machine tools and industrial manufacturing solutions."\n}',
    ),
    [message, setMessage] = useState("");
  async function save(e) {
    e.preventDefault();
    try {
      const parsed = JSON.parse(value);
      const existing = await apiRequest("/admin/content");
      const found = existing.items.find((x) => x.key === key);
      if (found)
        await apiRequest("/admin/content/" + found._id, {
          method: "PUT",
          body: JSON.stringify({ key, value: parsed }),
        });
      else
        await apiRequest("/admin/content", {
          method: "POST",
          body: JSON.stringify({ key, value: parsed }),
        });
      setMessage(
        "Content saved. Connect this key to the public page to display updates.",
      );
    } catch (e) {
      setMessage(e.message);
    }
  }
  return (
    <>
      <h1>Website Content</h1>
      <p>
        Store editable content as JSON. Keep a backup before changing live page
        content.
      </p>
      <form
        onSubmit={save}
        style={{
          background: "#fff",
          padding: 18,
          borderRadius: 10,
          display: "grid",
          gap: 12,
        }}
      >
        <label>Content key</label>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ padding: 10 }}
        />
        <label>Content JSON</label>
        <textarea
          rows={12}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ padding: 10, fontFamily: "monospace" }}
        />
        <button>Save Content</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}
