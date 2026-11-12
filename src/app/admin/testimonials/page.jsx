"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/adminApi";
export default function TestimonialsAdmin() {
  const [items, setItems] = useState([]),
    [name, setName] = useState(""),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  async function load() {
    try {
      setItems((await apiRequest("/admin/testimonials")).items);
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
      await apiRequest("/admin/testimonials", {
        method: "POST",
        body: JSON.stringify({ name, message, rating: 5, isPublished: false }),
      });
      setName("");
      setMessage("");
      load();
    } catch (e) {
      setError(e.message);
    }
  }
  async function publish(x) {
    await apiRequest("/admin/testimonials/" + x._id, {
      method: "PUT",
      body: JSON.stringify({ isPublished: !x.isPublished }),
    });
    load();
  }
  return (
    <>
      <h1>Testimonials</h1>
      <p>
        New testimonials are hidden from the public website until published.
      </p>
      <form
        onSubmit={add}
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 10,
          display: "grid",
          gap: 10,
          margin: "18px 0",
        }}
      >
        <input
          required
          placeholder="Customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 10 }}
        />
        <textarea
          required
          placeholder="Review"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: 10 }}
        />
        <button>Add testimonial (draft)</button>
      </form>
      {error && <p>{error}</p>}
      {items.map((x) => (
        <div
          key={x._id}
          style={{
            background: "#fff",
            padding: 15,
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          <b>{x.name}</b>
          <p>{x.message}</p>
          <button onClick={() => publish(x)}>
            {x.isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      ))}
    </>
  );
}
