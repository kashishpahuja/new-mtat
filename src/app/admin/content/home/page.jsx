
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../../../lib/adminApi";

const SECTIONS = [
  { key: "hero", label: "Hero Banner", description: "Main homepage banner and call to action." },
  { key: "services", label: "Services", description: "Services heading, descriptions and service cards." },
  { key: "companyStory", label: "Company Story", description: "Company introduction, video and technology partners." },
  { key: "whyUs", label: "Why Choose MTAT", description: "Company strengths, images and closing content." },
  { key: "testimonialsSection", label: "Testimonials", description: "Testimonials section heading and visibility." },
  { key: "enquiry", label: "Enquiry CTA", description: "Bottom enquiry call-to-action section." },
];

const ARRAY_TEMPLATES = {
  items: {
    title: "",
    description: "",
    image: "",
    href: "",
    buttonText: "",
  },
  partners: {
    name: "",
    logo: "",
  },
  strengths: {
    number: "",
    title: "",
    description: "",
    icon: "",
  },
  leftImages: {
    image: "",
    alt: "",
  },
  rightImages: {
    image: "",
    alt: "",
  },
  description: "",
};

const labelize = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());

const clone = (value) => JSON.parse(JSON.stringify(value));

function updateAtPath(source, path, value) {
  if (!path.length) return value;

  const [head, ...rest] = path;

  if (Array.isArray(source)) {
    const copy = [...source];
    copy[head] = updateAtPath(copy[head], rest, value);
    return copy;
  }

  return {
    ...source,
    [head]: updateAtPath(source?.[head], rest, value),
  };
}

function getPathKey(path) {
  return path.join(".");
}

function getArrayTemplate(key, currentValue) {
  if (currentValue.length > 0) {
    const first = currentValue[0];

    if (first && typeof first === "object") {
      return Object.fromEntries(
        Object.keys(first).map((field) => [field, ""])
      );
    }

    return "";
  }

  return clone(ARRAY_TEMPLATES[key] || "");
}

function isImageField(key) {
  return (
    /image|logo|poster/i.test(key) &&
    !/video/i.test(key)
  );
}

function isVideoField(key) {
  return /video/i.test(key);
}

function isLongField(key) {
  return /description|introduction|caption|about|collaboration/i.test(key);
}

function makeDomId(path) {
  return `homepage-field-${path
    .map(String)
    .join("-")
    .replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

function slugify(value = "") {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function FieldEditor({
  name,
  value,
  path,
  onChange,
  onUpload,
  onAddItem,
  uploadingPath,
  disabled,
}) {
  const pathKey = getPathKey(path);

  const isArray = Array.isArray(value);

  const isObject =
    value !== null &&
    typeof value === "object" &&
    !isArray;

  const imageField = isImageField(name);
  const videoField = isVideoField(name);

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#01193B] outline-none transition focus:border-[#467B23] focus:ring-2 focus:ring-[#467B23]/10 disabled:bg-gray-50";

  if (typeof value === "boolean") {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div>
          <p className="text-sm font-semibold text-[#01193B]">
            {labelize(name)}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {value ? "Enabled" : "Disabled"}
          </p>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange(path, !value)}
          className={`relative h-6 w-11 rounded-full transition disabled:opacity-50 ${
            value ? "bg-[#467B23]" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
              value ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>
    );
  }

  // OBJECT FIELDS
  if (isObject) {
    return (
      <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50/70 p-4 sm:p-5">
        <h4 className="text-sm font-bold text-[#01193B]">
          {labelize(name)}
        </h4>

        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(value).map(([childKey, childValue]) => (
            <FieldEditor
              key={`${pathKey}.${childKey}`}
              name={childKey}
              value={childValue}
              path={[...path, childKey]}
              onChange={onChange}
              onUpload={onUpload}
              onAddItem={onAddItem}
              uploadingPath={uploadingPath}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    );
  }

  // ARRAY FIELDS
  if (isArray) {
    return (
      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-[#01193B]">
              {labelize(name)}
            </h4>

            <p className="mt-1 text-xs text-gray-400">
              {value.length} {value.length === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              const newItem = getArrayTemplate(name, value);
              const nextValue = [...value, newItem];

              const newItemPath = [...path, value.length];

              onAddItem(
                path,
                nextValue,
                makeDomId(newItemPath)
              );
            }}
            className="rounded-lg border border-[#467B23]/20 px-3 py-2 text-xs font-bold text-[#467B23] transition hover:bg-[#467B23]/5 disabled:opacity-50"
          >
            + Add Item
          </button>
        </div>

        {value.length === 0 && (
          <p className="rounded-lg bg-gray-50 p-4 text-center text-xs text-gray-400">
            No items added yet.
          </p>
        )}

        <div className="space-y-4">
          {value.map((item, index) => (
            <div
              id={makeDomId([...path, index])}
              key={`${pathKey}.${index}`}
              className="scroll-mt-28 space-y-4 rounded-xl border border-gray-100 bg-gray-50/70 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#467B23]">
                  Item {index + 1}
                </span>

                <button
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    onChange(
                      path,
                      value.filter((_, i) => i !== index)
                    )
                  }
                  className="text-xs font-semibold text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              {item !== null && typeof item === "object" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {Object.entries(item).map(([childKey, childValue]) => (
                    <FieldEditor
                      key={`${pathKey}.${index}.${childKey}`}
                      name={childKey}
                      value={childValue}
                      path={[...path, index, childKey]}
                      onChange={onChange}
                      onUpload={onUpload}
                      onAddItem={onAddItem}
                      uploadingPath={uploadingPath}
                      disabled={disabled}
                    />
                  ))}
                </div>
              ) : (
                <FieldEditor
                  name={`${name} ${index + 1}`}
                  value={item}
                  path={[...path, index]}
                  onChange={onChange}
                  onUpload={onUpload}
                  onAddItem={onAddItem}
                  uploadingPath={uploadingPath}
                  disabled={disabled}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // NORMAL / MEDIA FIELDS
  const isNumber = typeof value === "number";
  const mediaUrl = typeof value === "string" ? value : "";

  const showMediaUpload =
    (imageField || videoField) &&
    typeof value === "string";

  return (
    <div
      id={makeDomId(path)}
      className="min-w-0 space-y-2 scroll-mt-28"
    >
      <label className="block text-sm font-semibold text-gray-700">
        {labelize(name)}
      </label>

      {showMediaUpload && (
        <div className="space-y-3">
          {mediaUrl ? (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              {imageField ? (
                <img
                  key={mediaUrl}
                  src={mediaUrl}
                  alt={labelize(name)}
                  className="h-44 w-full object-contain p-2"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <video
                  key={mediaUrl}
                  src={mediaUrl}
                  controls
                  preload="metadata"
                  playsInline
                  className="max-h-72 w-full bg-black object-contain"
                />
              )}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 text-center text-xs text-gray-400">
              No {imageField ? "image" : "video"} uploaded yet.
            </p>
          )}

          <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#467B23]/40 bg-[#467B23]/5 px-4 py-3 text-xs font-bold text-[#467B23] transition hover:bg-[#467B23]/10">
            {uploadingPath === pathKey
              ? "Uploading..."
              : imageField
                ? mediaUrl
                  ? "Replace Image"
                  : "Upload Image"
                : mediaUrl
                  ? "Replace Video"
                  : "Upload Video"}

            <input
              type="file"
              accept={
                imageField
                  ? "image/jpeg,image/png,image/webp,image/svg+xml"
                  : "video/mp4,video/webm,.mp4,.webm"
              }
              className="hidden"
              disabled={disabled || uploadingPath === pathKey}
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  onUpload(path, file);
                }

                event.target.value = "";
              }}
            />
          </label>

          <p className="text-xs text-gray-400">
            {imageField
              ? "Images are automatically converted to WebP."
              : "Supported formats: MP4 and WebM. Maximum size: 150 MB."}
          </p>
        </div>
      )}

      {isLongField(name) ? (
        <textarea
          rows={4}
          value={value ?? ""}
          disabled={disabled}
          onChange={(event) =>
            onChange(path, event.target.value)
          }
          className={`${inputClass} resize-y`}
          placeholder={`Enter ${labelize(name).toLowerCase()}`}
        />
      ) : (
        <input
          type={isNumber ? "number" : "text"}
          value={value ?? ""}
          disabled={disabled}
          onChange={(event) =>
            onChange(
              path,
              isNumber
                ? event.target.value === ""
                  ? 0
                  : Number(event.target.value)
                : event.target.value
            )
          }
          className={inputClass}
          placeholder={`Enter ${labelize(name).toLowerCase()}`}
        />
      )}
    </div>
  );
}

export default function HomeContentPage() {
  const [homepage, setHomepage] = useState(null);
  const [savedSections, setSavedSections] = useState({});

  const [activeSection, setActiveSection] = useState("hero");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPath, setUploadingPath] = useState("");

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [scrollTarget, setScrollTarget] = useState("");

  const activeConfig = useMemo(
    () => SECTIONS.find((section) => section.key === activeSection),
    [activeSection]
  );

  const currentSection = homepage?.[activeSection];
  const savedSection = savedSections?.[activeSection];

  // Compare current data with the last saved version.
  const isDirty =
    currentSection !== undefined &&
    JSON.stringify(currentSection) !== JSON.stringify(savedSection);

  // LOAD HOMEPAGE
  const loadHomepage = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiRequest("/admin/homepage");

      if (!response?.data) {
        throw new Error("Homepage data was not returned by the server.");
      }

      setHomepage(response.data);
      setSavedSections(clone(response.data));

    } catch (err) {
      setError(err.message || "Unable to load homepage content.");

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHomepage();
  }, [loadHomepage]);

  // SCROLL TO THE NEWLY ADDED ARRAY ITEM AFTER RENDER.
  useEffect(() => {
    if (!scrollTarget) return;

    const frame = requestAnimationFrame(() => {
      document
        .getElementById(scrollTarget)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

      setScrollTarget("");
    });

    return () => cancelAnimationFrame(frame);
  }, [scrollTarget, homepage]);

  // CHANGE FIELD
  const handleChange = useCallback(
    (path, value) => {
      setHomepage((previous) => {
        if (!previous) return previous;

        return {
          ...previous,
          [activeSection]: updateAtPath(
            previous[activeSection],
            path,
            value
          ),
        };
      });

      setNotice("");
    },
    [activeSection]
  );

  // ADD ARRAY ITEM
  const handleAddItem = useCallback(
    (path, nextValue, targetId) => {
      setHomepage((previous) => {
        if (!previous) return previous;

        return {
          ...previous,
          [activeSection]: updateAtPath(
            previous[activeSection],
            path,
            nextValue
          ),
        };
      });

      setScrollTarget(targetId);
      setNotice("");
    },
    [activeSection]
  );

  // UPLOAD IMAGE / VIDEO
  const handleUpload = async (path, file) => {
    const sectionAtUpload = activeSection;
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    const pathKey = getPathKey(path);

    const allowedTypes = new Set([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "video/mp4",
      "video/webm",
    ]);

    if (!allowedTypes.has(file.type)) {
      setError("Please upload JPG, PNG, WEBP, SVG, MP4 or WebM.");
      return;
    }

    const maxSize = isVideo
      ? 150 * 1024 * 1024
      : 8 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        isVideo
          ? "Video size must be 150 MB or less."
          : "Image size must be 8 MB or less."
      );
      return;
    }

    const previousValue = path.reduce(
      (current, key) => current?.[key],
      currentSection
    );

    // Instant local preview while the server processes the upload.
    const localPreview = URL.createObjectURL(file);

    const fieldName = [
      sectionAtUpload,
      ...path.map((part) =>
        typeof part === "number"
          ? `item-${part + 1}`
          : part
      ),
    ]
      .map(slugify)
      .filter(Boolean)
      .join("-");

    setUploadingPath(pathKey);
    setError("");
    setNotice("");

    try {
      const formData = new FormData();

      // Append fieldName BEFORE file for Multer.
      formData.append("fieldName", fieldName || "homepage-media");
      formData.append("file", file);

      const response = await apiRequest("/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response?.success || !response?.url) {
        throw new Error(
          response?.message ||
            "The server did not return a permanent file URL."
        );
      }

      // Save the permanent URL directly into homepage state.
      // The preview will therefore remain visible after upload AND save.
      setHomepage((previous) => {
        if (!previous) return previous;

        return {
          ...previous,
          [sectionAtUpload]: updateAtPath(
            previous[sectionAtUpload],
            path,
            response.url
          ),
        };
      });

      setNotice(
        `${isImage ? "Image" : "Video"} uploaded successfully as ${response.filename}. Save Changes to store it in the homepage.`
      );

    } catch (err) {
      // Restore the previous value if upload fails.
      setHomepage((previous) => {
        if (!previous) return previous;

        return {
          ...previous,
          [sectionAtUpload]: updateAtPath(
            previous[sectionAtUpload],
            path,
            previousValue
          ),
        };
      });

      setError(err.message || "File upload failed.");

    } finally {
      URL.revokeObjectURL(localPreview);
      setUploadingPath("");
    }
  };

  // SAVE SECTION
  const saveSection = async () => {
    if (!currentSection || !isDirty || saving || uploadingPath) {
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await apiRequest("/admin/homepage", {
        method: "PUT",
        body: JSON.stringify({
          [activeSection]: currentSection,
        }),
      });

      const updatedSection =
        response?.data?.[activeSection] ?? currentSection;

      setHomepage((previous) => ({
        ...previous,
        ...(response?.data || {}),
        [activeSection]: updatedSection,
      }));

      // Update only this section's saved baseline.
      setSavedSections((previous) => ({
        ...previous,
        [activeSection]: clone(updatedSection),
      }));

      setNotice(
        response?.message || "Changes saved successfully."
      );

      // Do not reload the page or scroll to the top.

    } catch (err) {
      setError(
        err.message || "Unable to save homepage content."
      );

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-[#467B23]" />

          <p className="mt-4 text-sm text-gray-500">
            Loading homepage content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7 pb-28">
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#467B23]">
            Website Content / Home
          </p>

          <h1 className="text-2xl font-bold text-[#01193B] sm:text-3xl">
            Home Page Management
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Manage homepage content, images, service cards,
            company information and enquiry sections.
          </p>
        </div>

        <button
          type="button"
          onClick={loadHomepage}
          disabled={saving || !!uploadingPath}
          className="w-fit rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#01193B] transition hover:bg-gray-50 disabled:opacity-50"
        >
          ↻ Refresh
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>

          <button
            type="button"
            onClick={() => setError("")}
            className="font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* SUCCESS */}
      {notice && (
        <div className="flex items-start justify-between gap-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <p className="break-words">{notice}</p>

          <button
            type="button"
            onClick={() => setNotice("")}
            className="font-bold"
          >
            ×
          </button>
        </div>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* SIDEBAR */}
        <aside className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
          <p className="px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            Homepage Sections
          </p>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {SECTIONS.map((section, index) => {
              const selected = activeSection === section.key;

              return (
                <button
                  type="button"
                  key={section.key}
                  disabled={!!uploadingPath || saving}
                  onClick={() => {
                    setActiveSection(section.key);
                    setError("");
                    setNotice("");
                  }}
                  className={`rounded-xl p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    selected
                      ? "bg-[#467B23] text-white shadow-sm"
                      : "text-[#01193B] hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        selected
                          ? "bg-white/15 text-white"
                          : "bg-gray-100 text-[#467B23]"
                      }`}
                    >
                      0{index + 1}
                    </span>

                    <span className="text-xs font-bold sm:text-sm">
                      {section.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* EDITOR */}
        <main className="min-w-0 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:p-7">
            <div>
              <h2 className="text-lg font-bold text-[#01193B]">
                {activeConfig?.label}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {activeConfig?.description}
              </p>
            </div>

            <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-[#467B23]">
              Connected to API
            </span>
          </div>

          {currentSection ? (
            <div className="space-y-6 p-5 sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                {Object.entries(currentSection).map(([key, value]) => (
                  <div
                    key={`${activeSection}.${key}`}
                    className={
                      Array.isArray(value) ||
                      (value !== null && typeof value === "object") ||
                      isLongField(key)
                        ? "sm:col-span-2"
                        : ""
                    }
                  >
                    <FieldEditor
                      name={key}
                      value={value}
                      path={[key]}
                      onChange={handleChange}
                      onUpload={handleUpload}
                      onAddItem={handleAddItem}
                      uploadingPath={uploadingPath}
                      disabled={saving || !!uploadingPath}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-gray-500">
              No data found for this section.
            </div>
          )}
        </main>
      </div>

      {/* STICKY SAVE BAR */}
      <div className="sticky bottom-0 z-30 -mx-4 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(1,25,59,0.06)] backdrop-blur sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-screen-2xl flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#01193B]">
              {saving
                ? "Saving changes..."
                : isDirty
                  ? "You have unsaved changes"
                  : "All changes saved"}
            </p>

            <p className="text-xs text-gray-500">
              {uploadingPath
                ? "Please wait for the upload to finish."
                : isDirty
                  ? "Save to update this section on the website."
                  : "Edit a field to enable Save Changes."}
            </p>
          </div>

          <button
            type="button"
            onClick={saveSection}
            disabled={!isDirty || saving || !!uploadingPath}
            className="shrink-0 rounded-xl bg-[#467B23] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#365f1c] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
