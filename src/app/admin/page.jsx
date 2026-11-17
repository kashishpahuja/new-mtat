
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "../lib/adminApi";

const quickLinks = [
  {
    title: "Manage Categories",
    description: "Create and organize main product categories.",
    href: "/admin/products/categories",
    icon: "▦",
  },
  {
    title: "Manage Brands",
    description: "Update manufacturer and brand information.",
    href: "/admin/products/brands",
    icon: "◈",
  },
  {
    title: "Brand Categories",
    description: "Manage categories under each brand.",
    href: "/admin/products/brand-categories",
    icon: "▤",
  },
  {
    title: "Manage Products",
    description: "Add products, specifications and brochures.",
    href: "/admin/products/items",
    icon: "▣",
  },
  {
    title: "Enquiries",
    description: "Review customer enquiries and requests.",
    href: "/admin/enquiries",
    icon: "✉",
  },
  {
    title: "Website Content",
    description: "Manage the content displayed across your website.",
    href: "/admin/content",
    icon: "▤",
  },
];

const statConfig = [
  { key: "products", label: "Total Products", icon: "▣" },
  { key: "brands", label: "Total Brands", icon: "◈" },
  { key: "enquiries", label: "All Enquiries", icon: "✉" },
  { key: "newEnquiries", label: "New Enquiries", icon: "●" },
  { key: "testimonials", label: "Testimonials", icon: "☆" },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    apiRequest("/admin/dashboard")
      .then((data) => {
        if (mounted) setStats(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Unable to load dashboard");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl bg-[#01193B] p-6 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a4c58c]">
          MTAT Technologies
        </p>

        <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome to your Dashboard
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
              Manage your products, brands, enquiries and website content
              from one place.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#01193B] transition hover:bg-slate-100"
          >
            Visit Website ↗
          </Link>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Website Overview</h2>
          <p className="mt-1 text-sm text-gray-500">
            Current records in your website database.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {statConfig.map((stat) => (
            <div
              key={stat.key}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl text-[#467B23]">{stat.icon}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Records
                </span>
              </div>

              <p className="mt-5 text-2xl font-bold text-[#01193B]">
                {loading ? "—" : stats?.[stat.key] ?? 0}
              </p>
              <p className="mt-1 text-xs font-medium text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Quick Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a section to manage your website.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#467B23]/30 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#467B23]/10 text-xl text-[#467B23]">
                  {item.icon}
                </span>
                <span className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#467B23]">
                  →
                </span>
              </div>

              <h3 className="mt-5 font-bold text-[#01193B]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
