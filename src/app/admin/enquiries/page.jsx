
"use client";

import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../../lib/adminApi";
import {
  FiSearch,
  FiPhone,
  FiMail,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiMessageSquare,
  FiRefreshCw,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";

const statuses = ["new", "in-progress", "responded", "closed"];

const statusStyles = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  "in-progress": "bg-amber-50 text-amber-700 border-amber-200",
  responded: "bg-emerald-50 text-emerald-700 border-emerald-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function EnquiriesAdmin() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  async function load() {
    try {
      setError("");
      setLoading(true);

      const result = await apiRequest("/enquiries/admin");

      setItems(
        Array.isArray(result.data)
          ? result.data
          : Array.isArray(result.items)
            ? result.items
            : []
      );
    } catch (e) {
      setError(e.message || "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id, status) {
    try {
      setUpdatingId(id);
      setError("");

      const result = await apiRequest(`/enquiries/admin/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      if (result.success === false) {
        throw new Error(result.message || "Unable to update status.");
      }

      setItems((previous) =>
        previous.map((item) =>
          item._id === id ? { ...item, status } : item
        )
      );
    } catch (e) {
      setError(e.message || "Unable to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        [
          item.name,
          item.email,
          item.phone,
          item.company,
          item.subject,
          item.message,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));

      const matchesStatus =
        filter === "all" || item.status === filter;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, filter]);

  const counts = useMemo(() => {
    return {
      all: items.length,
      new: items.filter((x) => x.status === "new").length,
      "in-progress": items.filter((x) => x.status === "in-progress").length,
      responded: items.filter((x) => x.status === "responded").length,
      closed: items.filter((x) => x.status === "closed").length,
    };
  }, [items]);

  function formatDate(date) {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getPhoneLink(phone) {
    return String(phone || "").replace(/[^\d+]/g, "");
  }

  return (
    <div className="min-h-screen bg-[#f5f7f5] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#467B23]">
              Admin Dashboard
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#01193B] sm:text-3xl">
              Website Enquiries
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage enquiries, review candidate details and contact applicants.
            </p>
          </div>

          <button
            onClick={load}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-[#01193B] shadow-sm transition hover:border-[#467B23] hover:text-[#467B23] disabled:opacity-50"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: "Total Enquiries", value: counts.all, key: "all" },
            { label: "New", value: counts.new, key: "new" },
            { label: "In Progress", value: counts["in-progress"], key: "in-progress" },
            { label: "Responded", value: counts.responded, key: "responded" },
            { label: "Closed", value: counts.closed, key: "closed" },
          ].map((stat) => (
            <button
              key={stat.key}
              onClick={() => setFilter(stat.key)}
              className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                filter === stat.key
                  ? "border-[#467B23] ring-1 ring-[#467B23]"
                  : "border-gray-100"
              }`}
            >
              <p className="text-xs font-medium text-gray-500">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-[#01193B]">
                {stat.value}
              </p>
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone or subject..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#467B23] focus:bg-white"
            />
          </div>

          <div className="relative sm:w-52">
            <FiFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-10 text-sm font-medium text-[#01193B] outline-none focus:border-[#467B23]"
            >
              <option value="all">All Enquiries</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>

            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>
            <button
              onClick={load}
              className="font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Candidate List */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#01193B]">
              Enquiry Profiles
            </h2>

            <span className="text-sm text-gray-500">
              {filteredItems.length} results
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
              <FiRefreshCw className="mx-auto animate-spin text-2xl text-[#467B23]" />
              <p className="mt-3 text-sm text-gray-500">
                Loading enquiry profiles...
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <FiUser className="mx-auto text-4xl text-gray-300" />
              <h3 className="mt-4 font-semibold text-[#01193B]">
                No enquiries found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filter.
              </p>
              {(search || filter !== "all") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setFilter("all");
                  }}
                  className="mt-4 text-sm font-semibold text-[#467B23] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredItems.map((x) => (
                <article
                  key={x._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:border-gray-200 hover:shadow-md"
                >
                  {/* Profile Header */}
                  <div className="border-b border-gray-100 p-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#467B23]/10 text-lg font-bold text-[#467B23]">
                          {x.name?.trim()?.charAt(0)?.toUpperCase() || "?"}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-bold text-[#01193B]">
                            {x.name || "Unnamed Candidate"}
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
                            Enquiry ID: {x._id?.slice(-8) || "N/A"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`w-fit shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${
                          statusStyles[x.status] || statusStyles.new
                        }`}
                      >
                        {(x.status || "new").replace("-", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-4 p-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="rounded-lg bg-gray-50 p-2 text-gray-500">
                          <FiMail />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-wide text-gray-400">
                            Email Address
                          </p>
                          <a
                            href={`mailto:${x.email}`}
                            className="block truncate text-sm font-medium text-[#01193B] hover:text-[#467B23]"
                          >
                            {x.email || "Not provided"}
                          </a>
                        </div>
                      </div>

                      <div className="flex min-w-0 items-center gap-3">
                        <div className="rounded-lg bg-gray-50 p-2 text-gray-500">
                          <FiPhone />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-wide text-gray-400">
                            Phone Number
                          </p>
                          <p className="truncate text-sm font-medium text-[#01193B]">
                            {x.phone || "Not provided"}
                          </p>
                        </div>
                      </div>

                      {x.company && (
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="rounded-lg bg-gray-50 p-2 text-gray-500">
                            <FiBriefcase />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-wide text-gray-400">
                              Company
                            </p>
                            <p className="truncate text-sm font-medium text-[#01193B]">
                              {x.company}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex min-w-0 items-center gap-3">
                        <div className="rounded-lg bg-gray-50 p-2 text-gray-500">
                          <FiCalendar />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-wide text-gray-400">
                            Received On
                          </p>
                          <p className="text-sm font-medium text-[#01193B]">
                            {formatDate(x.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Subject */}
                    {x.subject && (
                      <div className="rounded-xl bg-[#f7f9f6] p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                          Subject
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#01193B]">
                          {x.subject}
                        </p>
                      </div>
                    )}

                    {/* Message */}
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        <FiMessageSquare />
                        Message
                      </div>

                      <p className="whitespace-pre-wrap break-words rounded-xl border border-gray-100 bg-white p-3 text-sm leading-6 text-gray-600">
                        {x.message || "No message provided."}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {x.phone && (
                          <a
                            href={`tel:${getPhoneLink(x.phone)}`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#467B23] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#365f1b]"
                          >
                            <FiPhone />
                            Call Now
                          </a>
                        )}

                        {x.email && (
                          <a
                            href={`mailto:${x.email}`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#01193B] transition hover:border-[#467B23] hover:text-[#467B23]"
                          >
                            <FiMail />
                            Email
                          </a>
                        )}
                      </div>

                      <div className="relative w-full sm:w-40">
                        <select
                          value={x.status || "new"}
                          disabled={updatingId === x._id}
                          onChange={(e) =>
                            updateStatus(x._id, e.target.value)
                          }
                          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 pr-9 text-sm font-semibold capitalize text-[#01193B] outline-none transition focus:border-[#467B23] disabled:cursor-wait disabled:opacity-60"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status.replace("-", " ")}
                            </option>
                          ))}
                        </select>

                        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        {updatingId === x._id && (
                          <span className="mt-1 block text-xs text-[#467B23]">
                            Updating status...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
