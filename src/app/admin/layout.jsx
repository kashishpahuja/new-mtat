"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Brands", "/admin/brands"],
  ["Enquiries", "/admin/enquiries"],
  ["Testimonials", "/admin/testimonials"],
  ["Website Content", "/admin/content"],
];
export default function AdminLayout({ children }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return children;
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        color: "#142033",
        fontFamily: "Arial,sans-serif",
      }}
    >
      <header
        style={{
          background: "#01193B",
          color: "#fff",
          padding: "16px 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>MTAT ADMIN</strong>
        <Link href="/" style={{ color: "#fff" }}>
          View Website ↗
        </Link>
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          minHeight: "calc(100vh - 56px)",
        }}
      >
        <aside
          style={{
            background: "#fff",
            padding: 20,
            borderRight: "1px solid #e5e7eb",
          }}
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "block",
                padding: "12px 10px",
                color: "#23344d",
                textDecoration: "none",
                borderRadius: 8,
              }}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              localStorage.removeItem("mtat_admin_token");
              location.href = "/admin/login";
            }}
            style={{ margin: 10, padding: 10 }}
          >
            Logout
          </button>
        </aside>
        <main style={{ padding: 28, minWidth: 0 }}>{children}</main>
      </div>
    </div>
  );
}
