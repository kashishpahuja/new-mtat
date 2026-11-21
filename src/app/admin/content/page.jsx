
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FiSave,
  FiImage,
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiX,
  FiRefreshCw,
  FiCheck,
} from "react-icons/fi";

const API = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api"
).replace(/\/$/, "");

const TABS = [
  { id: "hero", label: "Hero" },
  { id: "gallery", label: "Gallery" },
  { id: "team", label: "Our People" },
  { id: "industries", label: "Industries" },
  { id: "approach", label: "Why MTAT" },
  { id: "support", label: "Support" },
];

const EMPTY_CONTENT = {
  hero: {},
  gallery: [],
  teamSection: {},
  team: [],
  industriesSection: {
    columnOne: [],
    columnTwo: [],
  },
  approachSection: {},
  highlights: [],
  approachCards: [],
  supportSection: {},
  supportCards: [],
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function updatePath(source, path, value) {
  const result = clone(source);
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

function TextField({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
  type = "text",
  rows = 3,
}) {
  const common =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-[#01193B] outline-none transition placeholder:text-slate-400 focus:border-[#467B23] focus:ring-2 focus:ring-[#467B23]/10";

  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      {textarea ? (
        <textarea
          rows={rows}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          className={`${common} resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          className={common}
        />
      )}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onUpload,
  uploading,
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <div className="relative flex min-h-40 items-center justify-center bg-slate-100">
          {value ? (
            <img
              src={value}
              alt={label}
              className="max-h-64 w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <FiImage size={28} />
              <span className="text-xs">No image selected</span>
            </div>
          )}
        </div>

        <div className="space-y-3 p-3">
          <input
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-[#467B23]"
          />

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#01193B] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#467B23]">
              {uploading ? (
                <FiRefreshCw className="animate-spin" />
              ) : (
                <FiUploadCloud />
              )}
              {uploading ? "Uploading..." : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUpload(file);
                  e.target.value = "";
                }}
              />
            </label>

            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                <FiTrash2 />
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ title, description, action }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <h2 className="text-lg font-semibold text-[#01193B]">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

function AddButton({ onClick, children = "Add Item" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-[#467B23]/30 bg-[#467B23]/5 px-3 py-2 text-xs font-semibold text-[#467B23] transition hover:bg-[#467B23]/10"
    >
      <FiPlus />
      {children}
    </button>
  );
}

function RemoveButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Remove item"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
    >
      <FiTrash2 size={15} />
    </button>
  );
}

export default function OurPresenceAdminPage() {
  const [data, setData] = useState(EMPTY_CONTENT);
  const [published, setPublished] = useState(true);
  const [activeTab, setActiveTab] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const originalRef = useRef(null);

  const currentSnapshot = useMemo(
    () => JSON.stringify({ content: data, published }),
    [data, published]
  );

  const isDirty =
    originalRef.current !== null &&
    currentSnapshot !== originalRef.current;

  const setValue = useCallback((path, value) => {
    setData((previous) => updatePath(previous, path, value));
  }, []);

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("mtat_admin_token");
  };

  const request = async (endpoint, options = {}) => {
    const token = getToken();

    if (!token) {
      window.location.href = "/admin/login";
      throw new Error("Your admin session has expired.");
    }

    const response = await fetch(`${API}${endpoint}`, {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const result = await response.json().catch(() => ({}));

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("mtat_admin_token");
      window.location.href = "/admin/login";
      throw new Error("Your admin session has expired.");
    }

    if (!response.ok || result.success === false) {
      throw new Error(result.message || "Something went wrong.");
    }

    return result;
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await request("/our-presence/admin");
      const content = {
        ...clone(EMPTY_CONTENT),
        ...(result.data?.content || {}),
      };

      setData(content);
      setPublished(result.data?.published ?? true);

      originalRef.current = JSON.stringify({
        content,
        published: result.data?.published ?? true,
      });
    } catch (err) {
      setError(err.message || "Unable to load Our Presence content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const uploadImage = async (file, path) => {
    try {
      setError("");
      setSuccess("");

      if (!file.type.startsWith("image/")) {
        throw new Error("Please select a valid image file.");
      }

      if (file.size > 15 * 1024 * 1024) {
        throw new Error("Image size must be below 15 MB.");
      }

      setUploadingKey(path);

      const formData = new FormData();
      formData.append("file", file);

      const result = await request("/uploads", {
        method: "POST",
        body: formData,
      });

      const imageUrl =
        result.data?.url ||
        result.data?.file?.url ||
        result.data?.path ||
        result.file?.url ||
        result.url ||
        result.path;

      if (!imageUrl) {
        throw new Error(
          "Upload succeeded but no image URL was returned. Check your upload API response."
        );
      }

      setValue(path, imageUrl);
      setSuccess("Image uploaded. Click Save Changes to apply it.");
    } catch (err) {
      setError(err.message || "Image upload failed.");
    } finally {
      setUploadingKey("");
    }
  };

  const saveChanges = async () => {
    if (!isDirty || saving) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const result = await request("/our-presence/admin", {
        method: "PUT",
        body: JSON.stringify({
          content: data,
          published,
        }),
      });

      const savedContent = {
        ...clone(EMPTY_CONTENT),
        ...(result.data?.content || data),
      };

      const savedPublished = result.data?.published ?? published;

      setData(savedContent);
      setPublished(savedPublished);

      originalRef.current = JSON.stringify({
        content: savedContent,
        published: savedPublished,
      });

      setSuccess("Our Presence page saved successfully.");
    } catch (err) {
      setError(err.message || "Unable to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const addItem = (path, item) => {
    const keys = path.split(".");
    let current = data;

    keys.forEach((key) => {
      current = current?.[key];
    });

    setValue(path, [...(Array.isArray(current) ? current : []), item]);
  };

  const removeItem = (path, index) => {
    const keys = path.split(".");
    let current = data;

    keys.forEach((key) => {
      current = current?.[key];
    });

    if (!Array.isArray(current)) return;

    setValue(
      path,
      current.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const field = (label, path, options = {}) => (
    <TextField
      label={label}
      value={path.split(".").reduce((obj, key) => obj?.[key], data)}
      onChange={(value) => setValue(path, value)}
      {...options}
    />
  );

  const imageField = (label, path) => (
    <ImageField
      label={label}
      value={path.split(".").reduce((obj, key) => obj?.[key], data)}
      onChange={(value) => setValue(path, value)}
      uploading={uploadingKey === path}
      onUpload={(file) => uploadImage(file, path)}
    />
  );

  const renderHero = () => (
    <div className="space-y-7">
      <SectionHeading
        title="Hero Section"
        description="Manage the main banner content shown at the top of the page."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {field("Eyebrow", "hero.eyebrow")}
        {field("Main Heading", "hero.title")}
        {field("Button Text", "hero.buttonText")}
        {field("Button Link", "hero.buttonLink")}
        {field("Bottom Caption", "hero.bottomText")}
      </div>

      {field("Description", "hero.description", {
        textarea: true,
        rows: 4,
      })}

      {imageField("Hero Background Image", "hero.image")}
    </div>
  );

  const renderGallery = () => (
    <div>
      <SectionHeading
        title="Image Gallery"
        description="Add, replace or remove images from the introduction collage."
        action={
          <AddButton
            onClick={() =>
              addItem("gallery", {
                image: "",
                alt: "MTAT manufacturing and company",
              })
            }
          >
            Add Gallery Image
          </AddButton>
        }
      />

      <div className="grid gap-5 md:grid-cols-2">
        {(data.gallery || []).map((item, index) => (
          <div
            key={index}
            className="space-y-4 rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#01193B]">
                Gallery Image {index + 1}
              </p>
              <RemoveButton
                onClick={() => removeItem("gallery", index)}
              />
            </div>

            {imageField("Image", `gallery.${index}.image`)}

            {field(
              "Image Alt Text",
              `gallery.${index}.alt`
            )}
          </div>
        ))}
      </div>

      {!data.gallery?.length && (
        <p className="rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500">
          No gallery images added.
        </p>
      )}
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-8">
      <div>
        <SectionHeading title="Our People — Section Content" />
        <div className="grid gap-5 md:grid-cols-2">
          {field("Eyebrow", "teamSection.eyebrow")}
          {field("Heading", "teamSection.heading")}
          {field(
            "Highlighted Heading",
            "teamSection.highlightedText"
          )}
        </div>

        <div className="mt-5 grid gap-5">
          {field("Description", "teamSection.description", {
            textarea: true,
          })}
          {field("Note", "teamSection.note", {
            textarea: true,
          })}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-7">
        <SectionHeading
          title="Team Cards"
          description="Manage the four team/service cards displayed below the section heading."
          action={
            <AddButton
              onClick={() =>
                addItem("team", {
                  role: "",
                  description: "",
                  image: "",
                })
              }
            />
          }
        />

        <div className="grid gap-5 md:grid-cols-2">
          {(data.team || []).map((item, index) => (
            <div
              key={index}
              className="space-y-4 rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#01193B]">
                  Team Card {index + 1}
                </p>
                <RemoveButton
                  onClick={() => removeItem("team", index)}
                />
              </div>

              {field("Role / Title", `team.${index}.role`)}
              {field(
                "Description",
                `team.${index}.description`,
                { textarea: true }
              )}
              {imageField("Team Image", `team.${index}.image`)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIndustries = () => {
    const renderColumn = (title, path) => {
      const items = path
        .split(".")
        .reduce((obj, key) => obj?.[key], data) || [];

      return (
        <div className="space-y-4 rounded-xl border border-slate-200 p-4">
          <SectionHeading
            title={title}
            action={
              <AddButton
                onClick={() =>
                  addItem(path, { title: "", desc: "" })
                }
              />
            }
          />

          {items.map((item, index) => (
            <div
              key={index}
              className="space-y-3 rounded-lg bg-slate-50 p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Industry {index + 1}
                </span>
                <RemoveButton
                  onClick={() => removeItem(path, index)}
                />
              </div>

              {field(
                "Industry Name",
                `${path}.${index}.title`
              )}
              {field(
                "Description",
                `${path}.${index}.desc`,
                { textarea: true, rows: 2 }
              )}
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className="space-y-7">
        <SectionHeading
          title="Industries We Serve"
          description="Edit the section content, background and scrolling industry columns."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {field("Eyebrow", "industriesSection.eyebrow")}
          {field("Heading", "industriesSection.heading")}
          {field("Note", "industriesSection.note")}
        </div>

        {field(
          "Description",
          "industriesSection.description",
          { textarea: true }
        )}

        {imageField(
          "Section Background Image",
          "industriesSection.backgroundImage"
        )}

        <div className="grid gap-5 xl:grid-cols-2">
          {renderColumn(
            "Scrolling Column One",
            "industriesSection.columnOne"
          )}
          {renderColumn(
            "Scrolling Column Two",
            "industriesSection.columnTwo"
          )}
        </div>
      </div>
    );
  };

  const renderCardArray = (title, path, fields) => {
    const items =
      path.split(".").reduce((obj, key) => obj?.[key], data) || [];

    return (
      <div className="space-y-4">
        <SectionHeading
          title={title}
          action={
            <AddButton
              onClick={() => {
                const item = {};
                fields.forEach((fieldConfig) => {
                  item[fieldConfig.key] = fieldConfig.defaultValue ?? "";
                });
                addItem(path, item);
              }}
            />
          }
        />

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="space-y-4 rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#01193B]">
                  {title} {index + 1}
                </p>
                <RemoveButton
                  onClick={() => removeItem(path, index)}
                />
              </div>

              {fields.map((fieldConfig) => {
                const itemPath = `${path}.${index}.${fieldConfig.key}`;

                if (fieldConfig.type === "image") {
                  return (
                    <div key={itemPath}>
                      {imageField(fieldConfig.label, itemPath)}
                    </div>
                  );
                }

                return (
                  <div key={itemPath}>
                    {field(fieldConfig.label, itemPath, {
                      textarea: fieldConfig.type === "textarea",
                      type: fieldConfig.type === "number" ? "number" : "text",
                      rows: fieldConfig.rows || 3,
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderApproach = () => (
    <div className="space-y-9">
      <div>
        <SectionHeading
          title="Why Choose MTAT — Main Content"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {field("Eyebrow", "approachSection.eyebrow")}
          {field("Heading", "approachSection.heading")}
          {field(
            "Highlighted Heading",
            "approachSection.highlightedText"
          )}
        </div>
        <div className="mt-5 space-y-5">
          {field(
            "Main Description",
            "approachSection.description",
            { textarea: true }
          )}
          {field(
            "Secondary Description",
            "approachSection.secondaryDescription",
            { textarea: true }
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-7">
        {renderCardArray("Main Highlights", "highlights", [
          { key: "number", label: "Number" },
          { key: "title", label: "Title" },
          { key: "text", label: "Description", type: "textarea" },
        ])}
      </div>

      <div className="border-t border-slate-200 pt-7">
        {renderCardArray("Approach Cards", "approachCards", [
          { key: "number", label: "Number" },
          { key: "title", label: "Title" },
          { key: "text", label: "Description", type: "textarea" },
        ])}
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-9">
      <div>
        <SectionHeading
          title="Support Section Content"
          description="Manage the heading, description and contact button."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {field("Eyebrow", "supportSection.eyebrow")}
          {field("Heading", "supportSection.heading")}
          {field(
            "Highlighted Heading",
            "supportSection.highlightedText"
          )}
          {field("Button Text", "supportSection.buttonText")}
          {field("Button Link", "supportSection.buttonLink")}
        </div>

        <div className="mt-5">
          {field(
            "Description",
            "supportSection.description",
            { textarea: true }
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-7">
        {renderCardArray("Support Cards", "supportCards", [
          { key: "name", label: "Title" },
          { key: "role", label: "Subtitle" },
          { key: "content", label: "Content", type: "textarea" },
          { key: "machine", label: "Category Tag" },
          { key: "rating", label: "Rating (1–5)", type: "number" },
          { key: "image", label: "Card Image", type: "image" },
        ])}
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "hero":
        return renderHero();
      case "gallery":
        return renderGallery();
      case "team":
        return renderTeam();
      case "industries":
        return renderIndustries();
      case "approach":
        return renderApproach();
      case "support":
        return renderSupport();
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <FiRefreshCw className="animate-spin text-2xl text-[#467B23]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#467B23]">
              Website Content Management
            </p>
            <h1 className="mt-2 text-2xl font-bold text-[#01193B] sm:text-3xl">
              Our Presence
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage every section of your Our Presence page.
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <span className="text-sm font-medium text-slate-700">
              Published
            </span>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 accent-[#467B23]"
            />
          </label>
        </div>

        {error && (
          <div className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>
            <button onClick={() => setError("")}>
              <FiX />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <FiCheck />
            {success}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto border-b border-slate-200 bg-slate-50">
            <div className="flex min-w-max gap-1 p-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-[#01193B] text-white shadow-sm"
                      : "text-slate-600 hover:bg-white hover:text-[#01193B]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[500px] p-4 sm:p-6 lg:p-8">
            {renderActiveTab()}
          </div>
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-8px_25px_rgba(15,23,42,0.06)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#01193B]">
              {isDirty ? "Unsaved changes" : "All changes saved"}
            </p>
            <p className="text-xs text-slate-500">
              {isDirty
                ? "Save your changes to update the live page."
                : "Edit any field to enable the save button."}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              disabled={!isDirty || saving}
              onClick={loadData}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Discard
            </button>

            <button
              type="button"
              disabled={!isDirty || saving}
              onClick={saveChanges}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#467B23] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#365f1b] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {saving ? (
                <FiRefreshCw className="animate-spin" />
              ) : (
                <FiSave />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
