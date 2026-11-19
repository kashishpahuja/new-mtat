"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FiSave, FiRefreshCw, FiPlus, FiTrash2, FiImage, FiEye, FiEyeOff,
  FiChevronUp, FiChevronDown, FiUploadCloud, FiCheck, FiAlertCircle,
  FiLayout, FiUsers, FiGrid, FiTarget, FiHeadphones,
} from "react-icons/fi";
import { apiRequest } from "../../../lib/adminApi";

const EMPTY_CONTENT = {
  hero: { eyebrow: "", title: "", description: "", buttonText: "", buttonLink: "", bottomText: "", image: "" },
  gallery: [],
  teamSection: { eyebrow: "", heading: "", highlightedText: "", description: "", note: "" },
  team: [],
  industriesSection: { eyebrow: "", heading: "", description: "", note: "", backgroundImage: "", columnOne: [], columnTwo: [] },
  approachSection: { eyebrow: "", heading: "", highlightedText: "", description: "", secondaryDescription: "" },
  highlights: [],
  approachCards: [],
  supportSection: { eyebrow: "", heading: "", highlightedText: "", description: "", buttonText: "", buttonLink: "" },
  supportCards: [],
};

const TEMPLATES = {
  gallery: { image: "", alt: "" },
  team: { role: "", description: "", image: "" },
  industry: { title: "", desc: "" },
  highlight: { number: "", title: "", text: "" },
  approachCard: { number: "", title: "", text: "" },
  supportCard: { name: "", role: "", content: "", rating: 5, image: "", machine: "" },
};

const TABS = [
  { id: "hero", label: "Hero", hint: "Main banner", icon: FiLayout },
  { id: "gallery", label: "Gallery", hint: "Our story images", icon: FiImage },
  { id: "team", label: "Our People", hint: "Team section", icon: FiUsers },
  { id: "industries", label: "Industries", hint: "Industries served", icon: FiGrid },
  { id: "approach", label: "Why MTAT", hint: "Highlights & approach", icon: FiTarget },
  { id: "support", label: "Support", hint: "Services & cards", icon: FiHeadphones },
];

const clone = (value) => JSON.parse(JSON.stringify(value));

function mergeContent(loaded = {}) {
  return {
    ...clone(EMPTY_CONTENT), ...loaded,
    hero: { ...EMPTY_CONTENT.hero, ...(loaded.hero || {}) },
    teamSection: { ...EMPTY_CONTENT.teamSection, ...(loaded.teamSection || {}) },
    industriesSection: { ...EMPTY_CONTENT.industriesSection, ...(loaded.industriesSection || {}) },
    approachSection: { ...EMPTY_CONTENT.approachSection, ...(loaded.approachSection || {}) },
    supportSection: { ...EMPTY_CONTENT.supportSection, ...(loaded.supportSection || {}) },
    gallery: Array.isArray(loaded.gallery) ? loaded.gallery : [],
    team: Array.isArray(loaded.team) ? loaded.team : [],
    highlights: Array.isArray(loaded.highlights) ? loaded.highlights : [],
    approachCards: Array.isArray(loaded.approachCards) ? loaded.approachCards : [],
    supportCards: Array.isArray(loaded.supportCards) ? loaded.supportCards : [],
  };
}

function setNestedValue(source, path, value) {
  const next = clone(source);
  let current = next;
  for (let i = 0; i < path.length - 1; i += 1) {
    const key = path[i];
    current[key] = Array.isArray(current[key]) ? [...current[key]] : { ...(current[key] || {}) };
    current = current[key];
  }
  current[path[path.length - 1]] = value;
  return next;
}

function Field({ label, value, onChange, multiline = false, placeholder = "", type = "text", help }) {
  const common = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#467B23] focus:ring-4 focus:ring-[#467B23]/10";
  return (
    <label className="block min-w-0">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      {multiline ? (
        <textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} className={`${common} resize-y leading-6`} />
      ) : (
        <input type={type} value={value ?? ""} onChange={(e) => onChange(type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value)} placeholder={placeholder} className={common} />
      )}
      {help && <span className="mt-1 block text-[11px] text-slate-400">{help}</span>}
    </label>
  );
}

function ImageField({ label, value, onChange, onUpload, uploading, onRemove }) {
  const inputRef = useRef(null);
  const [previewError, setPreviewError] = useState(false);
  useEffect(() => setPreviewError(false), [value]);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image file.");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      window.alert("Please select an image smaller than 15 MB.");
      return;
    }
    await onUpload(file);
  };

  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-600">{label}</span>
        {value && <button type="button" onClick={onRemove} className="text-xs font-medium text-red-500 hover:text-red-700">Remove image</button>}
      </div>
      <div className="mt-2 overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">
        {value && !previewError ? (
          <div className="relative flex min-h-36 items-center justify-center bg-slate-100 p-2">
            <img src={value} alt={`${label} preview`} className="max-h-64 w-full rounded-lg object-contain" onError={() => setPreviewError(true)} />
            <span className="absolute bottom-3 left-3 rounded-md bg-black/65 px-2 py-1 text-[10px] font-medium text-white">Current image</span>
          </div>
        ) : (
          <div className="flex min-h-36 flex-col items-center justify-center px-4 py-6 text-center">
            <FiImage className="text-2xl text-slate-300" />
            <p className="mt-2 text-xs font-medium text-slate-500">{previewError ? "Image could not be previewed" : "No image selected"}</p>
            <p className="mt-1 text-[11px] text-slate-400">Upload a new image or paste an image URL below.</p>
          </div>
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-lg bg-[#467B23] px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#365f1b] disabled:cursor-wait disabled:opacity-60">
          {uploading ? <FiRefreshCw className="animate-spin" /> : <FiUploadCloud />}
          {uploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
        </button>
        <span className="text-[11px] text-slate-400">JPG, PNG, WEBP · Max 15 MB</span>
      </div>
      <Field label="Image URL" value={value} onChange={onChange} placeholder="https://... or /uploads/image.webp" help="You can also paste an existing image URL." />
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <h2 className="font-semibold text-[#01193B]">{title}</h2>
        {description && <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>}
      </div>
      <div className="space-y-6 p-5 sm:p-6">{children}</div>
    </section>
  );
}

function RepeatableList({ title, description, items = [], template, onAdd, onRemove, onMove, renderItem }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
          <p className="mt-1 text-[11px] text-slate-400">{items.length} {items.length === 1 ? "item" : "items"}</p>
        </div>
        <button type="button" onClick={() => onAdd(template)} className="inline-flex items-center gap-2 rounded-lg border border-[#467B23]/20 bg-[#467B23]/5 px-3.5 py-2.5 text-xs font-semibold text-[#467B23] hover:bg-[#467B23]/10"><FiPlus /> Add item</button>
      </div>
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-400">Nothing added yet. Use “Add item” to create your first entry.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={`${title}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title} {index + 1}</span>
                <div className="flex items-center gap-1">
                  <button type="button" title="Move up" disabled={index === 0} onClick={() => onMove(index, index - 1)} className="rounded-lg p-2 text-slate-500 hover:bg-white disabled:opacity-30"><FiChevronUp /></button>
                  <button type="button" title="Move down" disabled={index === items.length - 1} onClick={() => onMove(index, index + 1)} className="rounded-lg p-2 text-slate-500 hover:bg-white disabled:opacity-30"><FiChevronDown /></button>
                  <button type="button" title="Remove item" onClick={() => onRemove(index)} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><FiTrash2 /></button>
                </div>
              </div>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OurPresenceAdminPage() {
  const [content, setContent] = useState(EMPTY_CONTENT);
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updatedAt, setUpdatedAt] = useState(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [uploadingPath, setUploadingPath] = useState("");
  const savedSnapshot = useRef({ content: JSON.stringify(EMPTY_CONTENT), published: true });

  const isDirty = useMemo(
    () => JSON.stringify(content) !== savedSnapshot.current.content || published !== savedSnapshot.current.published,
    [content, published]
  );

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const response = await apiRequest("/our-presence/admin");
      const data = response?.data || {};
      const loadedContent = mergeContent(data.content || data);
      const loadedPublished = data.published ?? true;
      setContent(loadedContent);
      setPublished(loadedPublished);
      setUpdatedAt(data.updatedAt || null);
      savedSnapshot.current = { content: JSON.stringify(loadedContent), published: loadedPublished };
    } catch (err) {
      setError(err.message || "Unable to load Our Presence content.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadContent(); }, [loadContent]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const update = (path, value) => {
    setContent((current) => setNestedValue(current, path, value));
    setSuccess("");
    setError("");
  };

  const uploadImage = async (path, file) => {
    const pathKey = path.join(".");
    try {
      setUploadingPath(pathKey);
      setError("");
      setSuccess("");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fieldName", `our-presence-${pathKey.replaceAll(".", "-")}`);
      const response = await apiRequest("/uploads", { method: "POST", body: formData });
      if (!response?.url) throw new Error(response?.message || "Upload completed but no image URL was returned.");
      update(path, response.url);
    } catch (err) {
      setError(err.message || "Image upload failed. Please try again.");
    } finally {
      setUploadingPath("");
    }
  };

  const addItem = (path, template) => {
    const current = path.reduce((value, key) => value?.[key], content) || [];
    update(path, [...current, clone(template)]);
  };
  const removeItem = (path, index) => {
    const current = path.reduce((value, key) => value?.[key], content) || [];
    update(path, current.filter((_, i) => i !== index));
  };
  const moveItem = (path, from, to) => {
    const current = [...(path.reduce((value, key) => value?.[key], content) || [])];
    if (to < 0 || to >= current.length) return;
    const [item] = current.splice(from, 1);
    current.splice(to, 0, item);
    update(path, current);
  };

  const saveContent = async () => {
    if (!isDirty || saving || uploadingPath) return;
    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await apiRequest("/our-presence/admin", {
        method: "PUT",
        body: JSON.stringify({ content, published }),
      });
      savedSnapshot.current = { content: JSON.stringify(content), published };
      setSuccess("Your Our Presence changes have been saved.");
      setUpdatedAt(new Date().toISOString());
    } catch (err) {
      setError(err.message || "Unable to save Our Presence content.");
    } finally {
      setSaving(false);
    }
  };

  const field = (path, label, options = {}) => {
    const value = path.reduce((current, key) => current?.[key], content);
    const pathKey = path.join(".");
    if (options.image) {
      return <ImageField key={pathKey} label={label} value={value} onChange={(next) => update(path, next)} onUpload={(file) => uploadImage(path, file)} uploading={uploadingPath === pathKey} onRemove={() => update(path, "")} />;
    }
    return <Field key={pathKey} label={label} value={value} onChange={(next) => update(path, next)} multiline={options.multiline} type={options.type} placeholder={options.placeholder} help={options.help} />;
  };

  const list = (title, path, template, renderItem, description) => {
    const items = path.reduce((value, key) => value?.[key], content) || [];
    return <RepeatableList title={title} description={description} items={items} template={template} onAdd={(item) => addItem(path, item)} onRemove={(index) => removeItem(path, index)} onMove={(from, to) => moveItem(path, from, to)} renderItem={(item, index) => renderItem(item, index, path)} />;
  };

  if (loading) return <div className="flex min-h-[420px] items-center justify-center gap-3 text-sm text-slate-500"><FiRefreshCw className="animate-spin text-lg" /> Loading Our Presence content...</div>;

  const renderTab = () => {
    switch (activeTab) {
      case "hero":
        return <div className="space-y-5">
          <Section title="Hero content" description="Edit the main banner heading, supporting text and call-to-action.">
            <div className="grid gap-5 md:grid-cols-2">
              {field(["hero", "eyebrow"], "Eyebrow / small heading")}
              {field(["hero", "title"], "Main heading")}
              {field(["hero", "buttonText"], "Button label")}
              {field(["hero", "buttonLink"], "Button link")}
              <div className="md:col-span-2">{field(["hero", "description"], "Description", { multiline: true })}</div>
              <div className="md:col-span-2">{field(["hero", "bottomText"], "Bottom caption")}</div>
            </div>
          </Section>
          <Section title="Hero image" description="Upload a replacement image or paste a URL.">
            {field(["hero", "image"], "Hero background image", { image: true })}
          </Section>
        </div>;

      case "gallery":
        return <Section title="Image gallery" description="Manage the images used in the Our Story collage. Reorder them with the arrow controls.">
          {list("Gallery images", ["gallery"], TEMPLATES.gallery, (item, index, base) => <div className="grid gap-5 md:grid-cols-2">
            {field([...base, index, "image"], "Gallery image", { image: true })}
            {field([...base, index, "alt"], "Image alt text", { help: "Describe the image for accessibility." })}
          </div>)}
        </Section>;

      case "team":
        return <div className="space-y-5">
          <Section title="Our people section" description="Edit the heading and introduction shown above the team cards.">
            <div className="grid gap-5 md:grid-cols-2">
              {field(["teamSection", "eyebrow"], "Eyebrow")}
              {field(["teamSection", "heading"], "Heading")}
              {field(["teamSection", "highlightedText"], "Highlighted heading")}
              <div className="md:col-span-2">{field(["teamSection", "description"], "Description", { multiline: true })}</div>
              <div className="md:col-span-2">{field(["teamSection", "note"], "Optional note")}</div>
            </div>
          </Section>
          <Section title="Team cards" description="Add, edit, remove or reorder the people and team information shown on the page.">
            {list("Team members", ["team"], TEMPLATES.team, (item, index, base) => <div className="grid gap-5 md:grid-cols-2">
              {field([...base, index, "role"], "Role / team title")}
              {field([...base, index, "description"], "Description", { multiline: true })}
              <div className="md:col-span-2">{field([...base, index, "image"], "Team image", { image: true })}</div>
            </div>)}
          </Section>
        </div>;

      case "industries":
        return <div className="space-y-5">
          <Section title="Industries section" description="Edit the banner, heading and introduction for the industries section.">
            <div className="grid gap-5 md:grid-cols-2">
              {field(["industriesSection", "eyebrow"], "Eyebrow")}
              {field(["industriesSection", "heading"], "Heading")}
              {field(["industriesSection", "note"], "Supporting note")}
              <div className="md:col-span-2">{field(["industriesSection", "description"], "Description", { multiline: true })}</div>
              <div className="md:col-span-2">{field(["industriesSection", "backgroundImage"], "Background image", { image: true })}</div>
            </div>
          </Section>
          <Section title="Industry lists" description="Manage the two industry columns independently.">
            <div className="grid gap-7 xl:grid-cols-2">
              {list("Column one", ["industriesSection", "columnOne"], TEMPLATES.industry, (item, index, base) => <div className="grid gap-4">
                {field([...base, index, "title"], "Industry title")}
                {field([...base, index, "desc"], "Industry description", { multiline: true })}
              </div>)}
              {list("Column two", ["industriesSection", "columnTwo"], TEMPLATES.industry, (item, index, base) => <div className="grid gap-4">
                {field([...base, index, "title"], "Industry title")}
                {field([...base, index, "desc"], "Industry description", { multiline: true })}
              </div>)}
            </div>
          </Section>
        </div>;

      case "approach":
        return <div className="space-y-5">
          <Section title="Why choose MTAT" description="Edit the main statement and supporting descriptions.">
            <div className="grid gap-5 md:grid-cols-2">
              {field(["approachSection", "eyebrow"], "Eyebrow")}
              {field(["approachSection", "heading"], "Heading")}
              {field(["approachSection", "highlightedText"], "Highlighted heading")}
              <div className="md:col-span-2">{field(["approachSection", "description"], "Primary description", { multiline: true })}</div>
              <div className="md:col-span-2">{field(["approachSection", "secondaryDescription"], "Secondary description", { multiline: true })}</div>
            </div>
          </Section>
          <Section title="Highlights" description="Manage the key figures or highlights displayed in this section.">
            {list("Highlights", ["highlights"], TEMPLATES.highlight, (item, index, base) => <div className="grid gap-4 md:grid-cols-3">
              {field([...base, index, "number"], "Number / label")}
              {field([...base, index, "title"], "Title")}
              {field([...base, index, "text"], "Description", { multiline: true })}
            </div>)}
          </Section>
          <Section title="Approach cards" description="Edit the supporting cards that explain MTAT's approach.">
            {list("Approach cards", ["approachCards"], TEMPLATES.approachCard, (item, index, base) => <div className="grid gap-4 md:grid-cols-3">
              {field([...base, index, "number"], "Number / label")}
              {field([...base, index, "title"], "Title")}
              {field([...base, index, "text"], "Description", { multiline: true })}
            </div>)}
          </Section>
        </div>;

      case "support":
        return <div className="space-y-5">
          <Section title="Sales, service & support" description="Edit the support section heading, description and call-to-action.">
            <div className="grid gap-5 md:grid-cols-2">
              {field(["supportSection", "eyebrow"], "Eyebrow")}
              {field(["supportSection", "heading"], "Heading")}
              {field(["supportSection", "highlightedText"], "Highlighted heading")}
              {field(["supportSection", "buttonText"], "Button label")}
              {field(["supportSection", "buttonLink"], "Button link")}
              <div className="md:col-span-2">{field(["supportSection", "description"], "Description", { multiline: true })}</div>
            </div>
          </Section>
          <Section title="Support cards" description="Manage the cards displayed in the support carousel.">
            {list("Support cards", ["supportCards"], TEMPLATES.supportCard, (item, index, base) => <div className="grid gap-5 md:grid-cols-2">
              {field([...base, index, "name"], "Card title / name")}
              {field([...base, index, "role"], "Subtitle / role")}
              {field([...base, index, "machine"], "Category label")}
              {field([...base, index, "rating"], "Rating (1–5)", { type: "number" })}
              <div className="md:col-span-2">
                {field([...base, index, "content"], "Card content", { multiline: true })}
                {field([...base, index, "image"], "Card image", { image: true })}
              </div>
            </div>)}
          </Section>
        </div>;

      default: return null;
    }
  };

  const currentTab = TABS.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-[#f5f7f8] pb-28">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#467B23]">Website content / Pages</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#01193B] sm:text-3xl">Our Presence</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Update page content, upload images and manage each section from one place.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold ${published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{published ? <FiEye /> : <FiEyeOff />}{published ? "Published" : "Unpublished"}</span>
            <button type="button" onClick={() => setPublished((v) => !v)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">{published ? "Unpublish page" : "Publish page"}</button>
            <button type="button" onClick={loadContent} disabled={saving || loading} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"><FiRefreshCw /> Reload</button>
          </div>
        </header>

        {error && <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"><FiAlertCircle className="mt-0.5 shrink-0" /><span>{error}</span></div>}
        {success && <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"><FiCheck className="shrink-0" />{success}</div>}

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:sticky lg:top-5">
            <p className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Page sections</p>
            <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
              {TABS.map((tab, index) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`flex min-w-fit items-center gap-3 rounded-xl px-3 py-3 text-left transition lg:w-full ${active ? "bg-[#01193B] text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${active ? "bg-white/10 text-white" : "bg-slate-100 text-slate-500"}`}><Icon /></span>
                  <span className="min-w-0"><span className="block whitespace-nowrap text-xs font-semibold">{tab.label}</span><span className={`mt-0.5 hidden text-[10px] lg:block ${active ? "text-white/60" : "text-slate-400"}`}>{tab.hint}</span></span>
                  <span className={`ml-auto hidden text-[10px] lg:block ${active ? "text-white/50" : "text-slate-300"}`}>{String(index + 1).padStart(2, "0")}</span>
                </button>;
              })}
            </nav>
            <div className="mt-3 hidden rounded-xl bg-slate-50 p-3 lg:block"><p className="text-[11px] font-semibold text-slate-600">Editing tip</p><p className="mt-1 text-[11px] leading-5 text-slate-400">Changes stay as drafts until you click Save Changes.</p></div>
          </aside>

          <main className="min-w-0 space-y-5">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#467B23]">Section {String(TABS.findIndex((tab) => tab.id === activeTab) + 1).padStart(2, "0")} of 06</p><h2 className="mt-1 text-xl font-bold text-[#01193B]">{currentTab?.label}</h2></div>
              <p className="text-xs text-slate-400">{updatedAt ? `Last saved ${new Date(updatedAt).toLocaleString()}` : "Not saved yet"}</p>
            </div>
            {renderTab()}
          </main>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${isDirty ? "bg-amber-500" : "bg-emerald-500"}`} />
            <div className="min-w-0"><p className="text-xs font-semibold text-slate-700">{isDirty ? "You have unsaved changes" : "All changes saved"}</p><p className="text-[11px] text-slate-400">{isDirty ? "Save to apply your latest edits to the page." : "Make an edit to enable the save button."}</p></div>
          </div>
          <button type="button" onClick={saveContent} disabled={!isDirty || saving || Boolean(uploadingPath)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#467B23] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#365f1b] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none sm:w-auto">
            {saving ? <FiRefreshCw className="animate-spin" /> : <FiSave />}{saving ? "Saving changes..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
