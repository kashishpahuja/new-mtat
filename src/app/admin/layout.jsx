
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AdminAuthGuard from "./AdminAuthGuard";

const menu = [
  {
    label: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/admin", icon: "▦" },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      {
        label: "Products",
        icon: "▣",
        children: [
          { label: "Categories", href: "/admin/products/categories", icon: "▦" },
          { label: "Brands", href: "/admin/products/brands", icon: "◈" },
          { label: "Brand Categories", href: "/admin/products/brand-categories", icon: "▤" },
          { label: "Products", href: "/admin/products/items", icon: "▣" },
        ],
      },
      { label: "Enquiries", href: "/admin/enquiries", icon: "✉" },
      { label: "Testimonials", href: "/admin/testimonials", icon: "☆" },
    ],
  },
  {
    label: "WEBSITE",
    items: [
      {
        label: "Website Content",
        icon: "▤",
        children: [
          { label: "Home Page", href: "/admin/content/home" },
          { label: "About Us", href: "/admin/content/about" },
          { label: "Contact Page", href: "/admin/content/contact" },
          { label: "Our Presence", href: "/admin/content/presence" },
        ],
      },
    ],
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLogin = pathname === "/admin/login";

  if (isLogin) return children;

  function logout() {
    localStorage.removeItem("mtat_admin_token");
    router.replace("/admin/login");
  }

  function isActive(href) {
    return href === "/admin"
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");
  }

  function renderMenu() {
    return menu.map((group) => (
      <div key={group.label} className="mb-7">
        <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.2em] text-slate-500">
          {group.label}
        </p>

        <div className="space-y-1">
          {group.items.map((item) => {
            const hasChildren = !!item.children;
            const expanded =
              hasChildren &&
              item.children.some((child) => isActive(child.href));

            if (hasChildren) {
              return (
                <div key={item.label}>
                  <div
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${
                      expanded
                        ? "bg-white/10 text-white"
                        : "text-slate-300"
                    }`}
                  >
                    <span className="w-5 text-center text-base">{item.icon}</span>
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs">
                      {expanded ? "⌄" : "›"}
                    </span>
                  </div>

                  <div className="ml-5 mt-1 space-y-1 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] transition ${
                          isActive(child.href)
                            ? "bg-[#467B23] font-semibold text-white"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {child.icon && (
                          <span className="w-4 text-center">{child.icon}</span>
                        )}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? "bg-[#467B23] text-white shadow-lg shadow-black/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="w-5 text-center text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    ));
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#142033]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 flex h-[70px] items-center justify-between border-b border-white/10 text-[#01193B] px-4 bg-slate-100 shadow-md sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg border border-white/15 px-3 py-2 text-lg lg:hidden"
          >
            ☰
          </button>

             <Link href="/">
          <img
            src="/Images/logo.webp"
            alt="MTAT Technologies Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        </div>

        <div className="flex items-center gap-3 sm:gap-5">
      

          <Link
            href="/"
            target="_blank"
            className="text-xs font-medium text- transition hover:text-black sm:text-sm"
          >
            View Website ↗
          </Link>

          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-black/60 px-3 py-2 text-xs font-semibold transition hover:bg-white/10 sm:text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-70px)]">
        {/* Desktop Sidebar */}
        <aside className="sticky top-[70px] hidden h-[calc(100vh-70px)] w-[260px] shrink-0 overflow-y-auto bg-[#01193B] px-4 py-7 lg:block">
    

          {renderMenu()}
        </aside>

        {/* Mobile Sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            />

            <aside className="relative h-full w-[285px] overflow-y-auto bg-[#01193B] px-4 py-7 shadow-2xl">
              <div className="mb-7 flex items-center justify-between">
                <span className="font-bold text-white">MTAT ADMIN</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl text-white"
                >
                  ×
                </button>
              </div>
              {renderMenu()}
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
             <AdminAuthGuard>
               {children}
              
              </AdminAuthGuard>  
          </div>
        </main>
      </div>
    </div>
  );
}
