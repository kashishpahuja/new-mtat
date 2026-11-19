
"use client";

import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../../../lib/adminApi";

const EMPTY_CONTENT = {
  seo: {
    title: "",
    description: "",
    ogTitle: "",
    ogDescription: "",
  },
  hero: {
    company: "",
    title: "",
    tagline: "",
    image: { url: "", alt: "" },
    scrollHint: "SCROLL TO EXPLORE",
  },
  intro: {
    label: "",
    heading: "",
    paragraphs: [],
    image: { url: "", alt: "" },
    caption: "",
  },
  timeline: {
    label: "",
    heading: "",
    description: "",
    milestones: [],
  },
  expertise: {
    label: "",
    heading: "",
    intro: "",
    items: [],
  },
  partners: {
    label: "Our Technology Partners",
    description: "",
    logos: [],
  },
  industries: {
    label: "",
    heading: "",
    intro: "",
    items: [],
  },
  cta: {
    eyebrow: "",
    title: "",
    description: "",
    buttonText: "Enquire Now",
    buttonLink: "/contact",
    backgroundImage: { url: "", alt: "" },
  },
};

const SECTIONS = [
  {
    id: "seo",
    label: "SEO Settings",
    description: "Manage search engine and social sharing information.",
    fields: [
      { name: "title", label: "Page Title" },
      { name: "description", label: "Meta Description", type: "textarea" },
      { name: "ogTitle", label: "Open Graph Title" },
      { name: "ogDescription", label: "Open Graph Description", type: "textarea" },
    ],
  },
  {
    id: "hero",
    label: "Hero Section",
    description: "Main About page banner and introductory content.",
    fields: [
      { name: "company", label: "Company Name" },
      { name: "title", label: "Hero Heading", type: "textarea" },
      { name: "tagline", label: "Tagline", type: "textarea" },
      { name: "scrollHint", label: "Scroll Hint" },
      { name: "image", label: "Hero Background Image", type: "image" },
    ],
  },
  {
    id: "intro",
    label: "Company Introduction",
    description: "Tell visitors about MTAT and its background.",
    fields: [
      { name: "label", label: "Section Label" },
      { name: "heading", label: "Section Heading", type: "textarea" },
      { name: "image", label: "Company Image", type: "image" },
      { name: "caption", label: "Image Caption" },
    ],
    arrays: [
      {
        name: "paragraphs",
        label: "Introduction Paragraphs",
        fields: [
          { name: "text", label: "Paragraph", type: "textarea", value: true },
        ],
        simple: true,
      },
    ],
  },
  {
    id: "timeline",
    label: "Company Timeline",
    description: "Manage company milestones and achievements.",
    fields: [
      { name: "label", label: "Section Label" },
      { name: "heading", label: "Section Heading" },
      { name: "description", label: "Section Description", type: "textarea" },
    ],
    arrays: [
      {
        name: "milestones",
        label: "Timeline Milestones",
        fields: [
          { name: "year", label: "Year" },
          { name: "title", label: "Milestone Title" },
          { name: "text", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "expertise",
    label: "Technology Expertise",
    description: "Manage technology categories and expertise cards.",
    fields: [
      { name: "label", label: "Section Label" },
      { name: "heading", label: "Section Heading" },
      { name: "intro", label: "Section Description", type: "textarea" },
    ],
    arrays: [
      {
        name: "items",
        label: "Expertise Cards",
        fields: [
          { name: "id", label: "Unique ID" },
          { name: "title", label: "Card Title" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Card Image", type: "image" },
          { name: "items", label: "Tags (comma separated)", type: "tags" },
        ],
      },
    ],
  },
  {
    id: "partners",
    label: "Technology Partners",
    description: "Manage manufacturer and technology partner logos.",
    fields: [
      { name: "label", label: "Section Label" },
      { name: "description", label: "Section Description", type: "textarea" },
    ],
    arrays: [
      {
        name: "logos",
        label: "Partner Logos",
        fields: [
          { name: "name", label: "Partner Name" },
          { name: "url", label: "Partner Website", type: "url" },
          { name: "image", label: "Partner Logo", type: "image" },
        ],
      },
    ],
  },
  {
    id: "industries",
    label: "Industries",
    description: "Manage the industries served by MTAT.",
    fields: [
      { name: "label", label: "Section Label" },
      { name: "heading", label: "Section Heading" },
      { name: "intro", label: "Section Description", type: "textarea" },
    ],
    arrays: [
      {
        name: "items",
        label: "Industry Cards",
        fields: [
          { name: "id", label: "Unique ID" },
          { name: "title", label: "Industry Name" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Industry Image", type: "image" },
        ],
      },
    ],
  },
  {
    id: "cta",
    label: "Enquiry Section",
    description: "Manage the final enquiry banner and call to action.",
    fields: [
      { name: "eyebrow", label: "Eyebrow Text" },
      { name: "title", label: "Heading" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "buttonText", label: "Button Text" },
      { name: "buttonLink", label: "Button Link" },
      { name: "backgroundImage", label: "Background Image", type: "image" },
    ],
  },
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getValue(object, path) {
  return path.split(".").reduce(
    (value, key) => value?.[key],
    object
  );
}

function setValue(object, path, value) {
  const result = clone(object);
  const keys = path.split(".");
  let current = result;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = current[key] ?? {};
      current = current[key];
    }
  });

  return result;
}

function createEmptyItem(fields) {
  const item = {};

  fields.forEach((field) => {
    if (field.type === "image") {
      item[field.name] = { url: "", alt: "" };
    } else if (field.type === "tags") {
      item[field.name] = [];
    } else {
      item[field.name] = "";
    }
  });

  return item;
}

function Field({ field, value, onChange, name }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  if (field.type === "image") {
    const image = typeof value === "string"
      ? { url: value, alt: "" }
      : value || { url: "", alt: "" };

    async function uploadImage(file) {
      if (!file) return;

      setUploading(true);
      setUploadError("");

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fieldName", name || "about-image");

        const result = await apiRequest("/uploads", {
          method: "POST",
          body: formData,
        });

        onChange({
          ...image,
          url: result.url,
          alt: image.alt || file.name.replace(/\.[^.]+$/, ""),
        });
      } catch (error) {
        setUploadError(error.message);
      } finally {
        setUploading(false);
      }
    }

    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">
          {field.label}
        </label>

        {image.url ? (
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <img
              src={image.url}
              alt={image.alt || field.label}
              className="h-48 w-full object-cover"
            />

            <button
              type="button"
              onClick={() => onChange({ ...image, url: "" })}
              className="absolute right-3 top-3 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-red-600 shadow"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-[#467B23] hover:bg-green-50/40">
            <span className="text-3xl text-slate-400">+</span>
            <span className="mt-2 text-sm font-semibold text-slate-700">
              {uploading ? "Uploading..." : "Click to upload image"}
            </span>
            <span className="mt-1 text-xs text-slate-400">
              JPG, PNG, WEBP or SVG
            </span>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              disabled={uploading}
              className="hidden"
              onChange={(e) => {
                uploadImage(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
        )}

        <input
          type="text"
          value={image.alt || ""}
          onChange={(e) =>
            onChange({ ...image, alt: e.target.value })
          }
          placeholder="Image alt text"
          className="admin-input"
        />

        {uploadError && (
          <p className="text-sm text-red-600">{uploadError}</p>
        )}
      </div>
    );
  }

  if (field.type === "tags") {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {field.label}
        </label>
        <input
          value={Array.isArray(value) ? value.join(", ") : value || ""}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
            )
          }
          placeholder="CNC, VMC, HMC"
          className="admin-input"
        />
        <p className="mt-1 text-xs text-slate-400">
          Separate each tag with a comma.
        </p>
      </div>
    );
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {field.label}
      </label>

      {field.type === "textarea" ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={`Enter ${field.label.toLowerCase()}...`}
          className="admin-input min-h-24 resize-y"
        />
      ) : (
        <input
          type={field.type === "url" ? "url" : "text"}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${field.label.toLowerCase()}...`}
          className="admin-input"
        />
      )}
    </div>
  );
}

export default function AboutContentPage() {
  const [content, setContent] = useState(clone(EMPTY_CONTENT));
  const [activeSection, setActiveSection] = useState("seo");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const currentSection = SECTIONS.find(
    (section) => section.id === activeSection
  );

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await apiRequest("/about/admin");

      setContent({
        ...clone(EMPTY_CONTENT),
        ...(result.data || {}),
      });

      setPublished(Boolean(result.published));
    } catch (err) {
      setError(err.message || "Unable to load About page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  function updateSection(section, path, value) {
    setContent((previous) =>
      setValue(
        previous,
        `${section}.${path}`,
        value
      )
    );

    setMessage("");
  }

  function updateArray(section, arrayName, index, path, value) {
    setContent((previous) => {
      const updated = clone(previous);
      const item = updated[section][arrayName][index];

      updated[section][arrayName][index] =
        path ? setValue(item, path, value) : value;

      return updated;
    });

    setMessage("");
  }

  function addArrayItem(section, arrayConfig) {
    setContent((previous) => {
      const updated = clone(previous);

      updated[section][arrayConfig.name] = [
        ...(updated[section][arrayConfig.name] || []),
        arrayConfig.simple ? "" : createEmptyItem(arrayConfig.fields),
      ];

      return updated;
    });
  }

  function removeArrayItem(section, arrayName, index) {
    setContent((previous) => {
      const updated = clone(previous);

      updated[section][arrayName].splice(index, 1);

      return updated;
    });
  }

  async function saveContent(shouldPublish = false) {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const result = await apiRequest("/about", {
        method: "PUT",
        body: JSON.stringify({
          content,
          ...(shouldPublish ? { published: true } : {}),
        }),
      });

      setContent({
        ...clone(EMPTY_CONTENT),
        ...(result.data || content),
      });

      setPublished(Boolean(result.published));

      setMessage(
        shouldPublish
          ? "About page published successfully."
          : "Changes saved successfully."
      );
    } catch (err) {
      setError(err.message || "Unable to save About page.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#467B23]" />
          <p className="mt-4 text-sm text-slate-500">
            Loading About page content...
          </p>
        </div>
      </div>
    );
  }

  if (!currentSection) return null;

  return (
    <div className="min-h-screen bg-[#f6f7f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">

        {/* HEADER */}
        <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              <span>Content Management</span>
              <span>/</span>
              <span className="text-[#467B23]">About Page</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#01193B] sm:text-3xl">
              About Page Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your company story, expertise, partners and industries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                published
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {published ? "● Published" : "● Unpublished"}
            </span>

            <button
              type="button"
              onClick={() => saveContent(false)}
              disabled={saving}
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => saveContent(true)}
              disabled={saving}
              className="rounded-lg bg-[#467B23] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#365f1c] disabled:opacity-50"
            >
              {saving ? "Please wait..." : published ? "Update Live Page" : "Publish Page"}
            </button>
          </div>
        </div>

        {/* ALERTS */}
        {message && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
            <button
              onClick={loadContent}
              className="shrink-0 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* LEFT NAVIGATION */}
          <aside className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-6">
            <p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Page Sections
            </p>

            <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {SECTIONS.map((section, index) => {
                const active = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(section.id);
                      setMessage("");
                    }}
                    className={`flex min-w-max items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition lg:w-full ${
                      active
                        ? "bg-[#467B23]/10 font-semibold text-[#467B23]"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-md text-xs ${
                        active
                          ? "bg-[#467B23] text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {section.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 hidden rounded-lg bg-slate-50 p-4 lg:block">
              <p className="text-xs font-semibold text-slate-700">
                Content Management
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Changes are saved to your MTAT database through the admin API.
              </p>
            </div>
          </aside>

          {/* RIGHT EDITOR */}
          <main className="min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#467B23]">
                    Section Editor
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-[#01193B] sm:text-2xl">
                    {currentSection.label}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {currentSection.description}
                  </p>
                </div>

                <span className="rounded-md bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500">
                  {currentSection.id.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-8 p-5 sm:p-8">

              {/* REGULAR FIELDS */}
              {currentSection.fields?.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {currentSection.fields.map((field) => (
                    <div
                      key={field.name}
                      className={
                        field.type === "image" ||
                        field.type === "textarea"
                          ? "md:col-span-2"
                          : ""
                      }
                    >
                      <Field
                        field={field}
                        value={content[currentSection.id]?.[field.name]}
                        name={`about-${currentSection.id}-${field.name}`}
                        onChange={(value) =>
                          updateSection(
                            currentSection.id,
                            field.name,
                            value
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* REPEATABLE ARRAYS */}
              {currentSection.arrays?.map((arrayConfig) => {
                const items =
                  content[currentSection.id]?.[arrayConfig.name] || [];

                return (
                  <section
                    key={arrayConfig.name}
                    className="border-t border-slate-200 pt-7"
                  >
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {arrayConfig.label}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          {items.length} {items.length === 1 ? "entry" : "entries"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addArrayItem(currentSection.id, arrayConfig)
                        }
                        className="rounded-lg border border-[#467B23]/30 bg-[#467B23]/5 px-4 py-2.5 text-sm font-semibold text-[#467B23] transition hover:bg-[#467B23]/10"
                      >
                        + Add {arrayConfig.simple ? "Paragraph" : "Item"}
                      </button>
                    </div>

                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <div
                          key={`${arrayConfig.name}-${index}`}
                          className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
                        >
                          <div className="mb-5 flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-700">
                              {arrayConfig.label.replace(/s$/, "")} {index + 1}
                            </p>

                            <button
                              type="button"
                              onClick={() =>
                                removeArrayItem(
                                  currentSection.id,
                                  arrayConfig.name,
                                  index
                                )
                              }
                              className="rounded-md px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                            >
                              Remove
                            </button>
                          </div>

                          {arrayConfig.simple ? (
                            <Field
                              field={{
                                name: "paragraph",
                                label: "Paragraph Content",
                                type: "textarea",
                              }}
                              value={item}
                              name={`about-${arrayConfig.name}-${index}`}
                              onChange={(value) =>
                                updateArray(
                                  currentSection.id,
                                  arrayConfig.name,
                                  index,
                                  "",
                                  value
                                )
                              }
                            />
                          ) : (
                            <div className="grid gap-5 md:grid-cols-2">
                              {arrayConfig.fields.map((field) => (
                                <div
                                  key={field.name}
                                  className={
                                    field.type === "image" ||
                                    field.type === "textarea" ||
                                    field.type === "tags"
                                      ? "md:col-span-2"
                                      : ""
                                  }
                                >
                                  <Field
                                    field={field}
                                    value={item?.[field.name]}
                                    name={`about-${currentSection.id}-${arrayConfig.name}-${index}-${field.name}`}
                                    onChange={(value) =>
                                      updateArray(
                                        currentSection.id,
                                        arrayConfig.name,
                                        index,
                                        field.name,
                                        value
                                      )
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      {items.length === 0 && (
                        <div className="rounded-xl border-2 border-dashed border-slate-200 px-5 py-12 text-center">
                          <p className="text-sm font-medium text-slate-600">
                            No entries added yet.
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            Use the Add button to create your first entry.
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* EDITOR FOOTER */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-5 py-5 sm:px-8">
              <button
                type="button"
                disabled={SECTIONS[0].id === activeSection}
                onClick={() => {
                  const index = SECTIONS.findIndex(
                    (section) => section.id === activeSection
                  );
                  setActiveSection(SECTIONS[index - 1].id);
                }}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              <button
                type="button"
                disabled={SECTIONS[SECTIONS.length - 1].id === activeSection}
                onClick={() => {
                  const index = SECTIONS.findIndex(
                    (section) => section.id === activeSection
                  );
                  setActiveSection(SECTIONS[index + 1].id);
                }}
                className="rounded-lg bg-[#01193B] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#12335b] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next Section →
              </button>
            </div>
          </main>
        </div>
      </div>

      <style jsx global>{`
        .admin-input {
          display: block;
          width: 100%;
          border: 1px solid #dbe1e8;
          border-radius: 8px;
          background: #fff;
          padding: 12px 14px;
          font-size: 14px;
          color: #1e293b;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .admin-input:focus {
          border-color: #467b23;
          box-shadow: 0 0 0 3px rgba(70, 123, 35, 0.1);
        }

        .admin-input::placeholder {
          color: #a0a8b3;
        }
      `}</style>
    </div>
  );
}
