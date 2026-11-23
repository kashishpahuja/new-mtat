
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandCategories,
  createBrandCategory,
  updateBrandCategory,
  deleteBrandCategory,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductAsset,
} from "../../src/app/lib/productsApi";

// ======================================================
// CONSTANTS
// ======================================================

const tabs = [
  { id: "categories", label: "Categories", icon: "▦" },
  { id: "brands", label: "Brands", icon: "◈" },
  { id: "brandCategories", label: "Brand Categories", icon: "▤" },
  { id: "products", label: "Products", icon: "▣" },
];

const emptyForms = {
  categories: {
    title: "",
    slug: "",
    desc: "",
    sortOrder: 0,
    isActive: true,
  },

  brands: {
    category: "",
    name: "",
    slug: "",
    tagline: "",
    shortDescription: "",
    description: "",
    website: "",
    logo: "",
    heroImage: "",
    aboutTitle: "",
    about: "",
    expertise: "",
    sortOrder: 0,
    isActive: true,
  },

  brandCategories: {
    category: "",
    brand: "",
    title: "",
    slug: "",
    description: "",
    image: "",
    bannerImage: "",
    pageTitle: "",
    pageDescription: "",
    sortOrder: 0,
    isActive: true,
  },

  products: {
    category: "",
    brand: "",
    brandCategory: "",
    name: "",
    slug: "",
    modelNumber: "",
    shortDescription: "",
    description: "",
    images: [],
    specifications: [],
    features: "",
    brochure: "",
    isFeatured: false,
    isActive: true,
    sortOrder: 0,
  },
};

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getId = (value) =>
  typeof value === "object" && value !== null
    ? value._id || ""
    : value || "";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#142033] outline-none transition focus:border-[#467B23] focus:ring-2 focus:ring-[#467B23]/10";

const labelClass =
  "mb-2 block text-sm font-semibold text-gray-700";

// ======================================================
// REUSABLE COMPONENTS
// IMPORTANT: KEEP THESE OUTSIDE ProductsAdmin
// ======================================================

function Field({
  label,
  name,
  form,
  updateField,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>

      <input
        className={inputClass}
        type={type}
        required={required}
        placeholder={placeholder || label}
        value={form[name] ?? ""}
        onChange={(e) => updateField(name, e.target.value)}
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  form,
  updateField,
  rows = 4,
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>

      <textarea
        className={inputClass + " resize-y"}
        rows={rows}
        placeholder={label}
        value={form[name] ?? ""}
        onChange={(e) => updateField(name, e.target.value)}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options = [],
  form,
  updateField,
  placeholder,
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>

      <select
        className={inputClass}
        required
        value={form[name] || ""}
        onChange={(e) => updateField(name, e.target.value)}
      >
        <option value="">
          {placeholder || `Select ${label}`}
        </option>

        {options.map((item) => (
          <option key={item._id} value={item._id}>
            {item.title || item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function ImageField({
  label,
  name,
  form,
  updateField,
  handleUpload,
  uploading,
  multiple = false,
}) {
  const value = form[name];

  return (
    <div>
      <label className={labelClass}>{label}</label>

      <div className="rounded-xl border border-dashed border-gray-300 p-4">
        <input
          type="file"
          accept={
            name === "brochure"
              ? "application/pdf"
              : "image/jpeg,image/png,image/webp,image/svg+xml"
          }
          disabled={uploading}
          multiple={multiple}
          className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#467B23]/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#467B23]"
          onChange={async (e) => {
            const files = Array.from(e.target.files || []);

            for (const file of files) {
              await handleUpload(name, file);
            }

            e.target.value = "";
          }}
        />

        {value && (
          <div className="mt-3 space-y-2">
            {(Array.isArray(value) ? value : [value]).map((url, i) => (
              <div
                key={`${url}-${i}`}
                className="flex items-center gap-3 rounded-lg bg-gray-50 p-2"
              >
                {name !== "brochure" && (
                  <img
                    src={url}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-lg object-cover"
                  />
                )}

                <span className="min-w-0 flex-1 truncate text-xs text-gray-600">
                  {url}
                </span>

                <button
                  type="button"
                  className="shrink-0 text-sm text-red-500"
                  onClick={() => {
                    updateField(
                      name,
                      Array.isArray(value)
                        ? value.filter((_, index) => index !== i)
                        : ""
                    );
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {uploading && (
          <p className="mt-2 text-xs text-[#467B23]">
            Uploading...
          </p>
        )}
      </div>
    </div>
  );
}

function StatusField({ form, updateField, activeTab }) {
  return (
    <div className="flex flex-wrap gap-6">
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={!!form.isActive}
          onChange={(e) =>
            updateField("isActive", e.target.checked)
          }
          className="accent-[#467B23]"
        />
        Active / Published
      </label>

      {activeTab === "products" && (
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={!!form.isFeatured}
            onChange={(e) =>
              updateField("isFeatured", e.target.checked)
            }
            className="accent-[#467B23]"
          />
          Featured Product
        </label>
      )}
    </div>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function ProductsAdmin({ initialTab = "categories" }) {
  const [activeTab] = useState(initialTab);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandCategories, setBrandCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({ ...emptyForms.categories });

  // ====================================================
  // LOAD DATA
  // ====================================================

  const loadData = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);

    setError("");

    try {
      const [
        categoryData,
        brandData,
        brandCategoryData,
        productData,
      ] = await Promise.all([
        getCategories(),
        getBrands(),
        getBrandCategories(),
        getProducts(),
      ]);

      setCategories(categoryData || []);
      setBrands(brandData || []);
      setBrandCategories(brandCategoryData || []);
      setProducts(productData || []);
    } catch (err) {
      setError(err.message || "Unable to load product data");
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ====================================================
  // CURRENT DATA AND FILTERING
  // ====================================================

  const currentData = {
    categories,
    brands,
    brandCategories,
    products,
  }[activeTab] || [];

  const filteredData = useMemo(() => {
    return currentData.filter((item) => {
      const query = search.toLowerCase();

      const searchable = [
        item.title,
        item.name,
        item.slug,
        item.modelNumber,
        item.brand?.name,
        item.category?.title,
        item.brandCategory?.title,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchable.includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && item.isActive !== false) ||
        (statusFilter === "inactive" && item.isActive === false);

      return matchesSearch && matchesStatus;
    });
  }, [currentData, search, statusFilter]);

  // ====================================================
  // DEPENDENT DROPDOWNS
  // ====================================================

  const availableBrands = brands.filter(
    (brand) =>
      getId(brand.category) === form.category &&
      brand.isActive !== false
  );

  const availableBrandCategories = brandCategories.filter(
    (item) =>
      getId(item.brand) === form.brand &&
      item.isActive !== false
  );

  // ====================================================
  // MODAL
  // ====================================================

  function openCreate() {
    setEditingId(null);
    setError("");
    setSuccess("");

    setForm({ ...emptyForms[activeTab] });
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditingId(item._id);
    setError("");
    setSuccess("");

    const nextForm = {
      ...emptyForms[activeTab],
      ...item,
    };

    if (activeTab === "brands") {
      nextForm.category = getId(item.category);
      nextForm.expertise = (item.expertise || []).join("\n");
    }

    if (activeTab === "brandCategories") {
      nextForm.category = getId(item.category);
      nextForm.brand = getId(item.brand);
    }

    if (activeTab === "products") {
      nextForm.category = getId(item.category);
      nextForm.brand = getId(item.brand);
      nextForm.brandCategory = getId(item.brandCategory);
      nextForm.images = item.images || [];
      nextForm.features = (item.features || []).join("\n");
      nextForm.specifications = item.specifications || [];
    }

    setForm(nextForm);
    setModalOpen(true);
  }

  function closeModal() {
    if (saving || uploading) return;

    setModalOpen(false);
    setEditingId(null);
  }

  // ====================================================
  // FORM STATE
  // ====================================================

  function updateField(key, value) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };

      if (key === "title" || key === "name") {
        if (!editingId || !prev.slug) {
          next.slug = slugify(value);
        }
      }

      if (key === "category") {
        next.brand = "";
        next.brandCategory = "";
      }

      if (key === "brand") {
        next.brandCategory = "";
      }

      return next;
    });
  }

  // ====================================================
  // FILE UPLOAD
  // ====================================================

  async function handleUpload(key, file) {
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const result = await uploadProductAsset(file);

      if (!result?.url) {
        throw new Error("Upload response did not contain a file URL");
      }

      setForm((prev) => {
        if (key === "images") {
          return {
            ...prev,
            images: [...(prev.images || []), result.url],
          };
        }

        return {
          ...prev,
          [key]: result.url,
        };
      });
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  // ====================================================
  // PRODUCT SPECIFICATIONS
  // ====================================================

  function addSpecification() {
    setForm((prev) => ({
      ...prev,
      specifications: [
        ...(prev.specifications || []),
        { label: "", value: "" },
      ],
    }));
  }

  function updateSpecification(index, key, value) {
    setForm((prev) => {
      const updated = [...(prev.specifications || [])];

      updated[index] = {
        ...updated[index],
        [key]: value,
      };

      return {
        ...prev,
        specifications: updated,
      };
    });
  }

  function removeSpecification(index) {
    setForm((prev) => ({
      ...prev,
      specifications: prev.specifications.filter(
        (_, i) => i !== index
      ),
    }));
  }

  // ====================================================
  // SAVE
  // ====================================================

  async function handleSubmit(e) {
    e.preventDefault();

    if (saving || uploading) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = { ...form };

      // Convert multiline text into arrays ONLY when saving.
      // This keeps the input value and cursor stable while typing.

      if (activeTab === "brands") {
        payload.expertise = String(form.expertise || "")
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean);
      }

      if (activeTab === "products") {
        payload.features = String(form.features || "")
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean);

        payload.specifications = (form.specifications || [])
          .filter((item) => item.label?.trim() || item.value?.trim());
      }

      if (activeTab === "categories") {
        if (editingId) await updateCategory(editingId, payload);
        else await createCategory(payload);
      }

      if (activeTab === "brands") {
        if (editingId) await updateBrand(editingId, payload);
        else await createBrand(payload);
      }

      if (activeTab === "brandCategories") {
        if (editingId) await updateBrandCategory(editingId, payload);
        else await createBrandCategory(payload);
      }

      if (activeTab === "products") {
        if (editingId) await updateProduct(editingId, payload);
        else await createProduct(payload);
      }

      setModalOpen(false);
      setEditingId(null);
      setSuccess("Changes saved successfully.");

      await loadData(false);
    } catch (err) {
      setError(err.message || "Unable to save record");
    } finally {
      setSaving(false);
    }
  }

  // ====================================================
  // DELETE
  // ====================================================

  async function handleDelete(item) {
    const name = item.name || item.title;

    if (
      !window.confirm(
        `Delete "${name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      if (activeTab === "categories") {
        await deleteCategory(item._id);
      }

      if (activeTab === "brands") {
        await deleteBrand(item._id);
      }

      if (activeTab === "brandCategories") {
        await deleteBrandCategory(item._id);
      }

      if (activeTab === "products") {
        await deleteProduct(item._id);
      }

      setSuccess("Record deleted successfully.");

      await loadData(false);
    } catch (err) {
      setError(err.message || "Unable to delete record");
    }
  }

  // ====================================================
  // DISPLAY HELPERS
  // ====================================================

  function getItemName(item) {
    return item.title || item.name || "Untitled";
  }

  function getItemSubtitle(item) {
    if (activeTab === "categories") return item.desc;

    if (activeTab === "brands") {
      return item.category?.title || "No category";
    }

    if (activeTab === "brandCategories") {
      return `${item.brand?.name || "Brand"} · ${item.category?.title || ""}`;
    }

    return `${item.brand?.name || "Brand"} · ${item.brandCategory?.title || ""}`;
  }

  function getCount(id, collection, field) {
    return collection.filter(
      (item) => getId(item[field]) === id
    ).length;
  }

  // ====================================================
  // SHARED FIELD PROPS
  // ====================================================

  const fieldProps = {
    form,
    updateField,
  };

  // ====================================================
  // FORM CONTENT
  // ====================================================

  function renderForm() {
    return (
      <div className="space-y-5">

        {activeTab === "categories" && (
          <>
            <Field label="Category Title" name="title" required {...fieldProps} />
            <Field label="Slug" name="slug" required {...fieldProps} />
            <TextArea label="Short Description" name="desc" rows={3} {...fieldProps} />
            <Field label="Sort Order" name="sortOrder" type="number" {...fieldProps} />
          </>
        )}

        {activeTab === "brands" && (
          <>
            <SelectField
              label="Main Category"
              name="category"
              options={categories}
              {...fieldProps}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Brand Name" name="name" required {...fieldProps} />
              <Field label="Slug" name="slug" required {...fieldProps} />
            </div>

            <Field label="Tagline" name="tagline" {...fieldProps} />
            <Field label="Website URL" name="website" type="url" {...fieldProps} />
            <Field label="Short Description" name="shortDescription" {...fieldProps} />

            <TextArea label="Brand Description" name="description" {...fieldProps} />
            <Field label="About Section Title" name="aboutTitle" {...fieldProps} />
            <TextArea label="About Section Content" name="about" {...fieldProps} />

            <TextArea
              label="Expertise (one item per line)"
              name="expertise"
              rows={4}
              {...fieldProps}
            />

            <ImageField
              label="Brand Logo"
              name="logo"
              {...fieldProps}
              handleUpload={handleUpload}
              uploading={uploading}
            />

            <ImageField
              label="Brand Hero Image"
              name="heroImage"
              {...fieldProps}
              handleUpload={handleUpload}
              uploading={uploading}
            />

            <Field label="Sort Order" name="sortOrder" type="number" {...fieldProps} />
          </>
        )}

        {activeTab === "brandCategories" && (
          <>
            <SelectField
              label="Main Category"
              name="category"
              options={categories}
              {...fieldProps}
            />

            <SelectField
              label="Brand"
              name="brand"
              options={availableBrands}
              {...fieldProps}
            />

            <Field label="Category Title" name="title" required {...fieldProps} />
            <Field label="Slug" name="slug" required {...fieldProps} />

            <TextArea label="Description" name="description" {...fieldProps} />
            <Field label="Page Heading" name="pageTitle" {...fieldProps} />
            <TextArea label="Page Description" name="pageDescription" {...fieldProps} />

            <ImageField
              label="Category Image"
              name="image"
              {...fieldProps}
              handleUpload={handleUpload}
              uploading={uploading}
            />

            <ImageField
              label="Banner Image"
              name="bannerImage"
              {...fieldProps}
              handleUpload={handleUpload}
              uploading={uploading}
            />

            <Field label="Sort Order" name="sortOrder" type="number" {...fieldProps} />
          </>
        )}

        {activeTab === "products" && (
          <>
            <SelectField
              label="Main Category"
              name="category"
              options={categories}
              {...fieldProps}
            />

            <SelectField
              label="Brand"
              name="brand"
              options={availableBrands}
              {...fieldProps}
            />

            <SelectField
              label="Brand Category"
              name="brandCategory"
              options={availableBrandCategories}
              {...fieldProps}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Product Name" name="name" required {...fieldProps} />
              <Field label="Slug" name="slug" required {...fieldProps} />
            </div>

            <Field label="Model Number" name="modelNumber" {...fieldProps} />
            <Field label="Short Description" name="shortDescription" {...fieldProps} />
            <TextArea label="Full Description" name="description" {...fieldProps} />

            <ImageField
              label="Product Images (Multiple)"
              name="images"
              multiple
              {...fieldProps}
              handleUpload={handleUpload}
              uploading={uploading}
            />

            {/* SPECIFICATIONS */}

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className={labelClass}>Specifications</label>

                <button
                  type="button"
                  onClick={addSpecification}
                  className="text-sm font-semibold text-[#467B23]"
                >
                  + Add Specification
                </button>
              </div>

              <div className="space-y-3">
                {(form.specifications || []).map((spec, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]"
                  >
                    <input
                      className={inputClass}
                      placeholder="Label"
                      value={spec.label || ""}
                      onChange={(e) =>
                        updateSpecification(index, "label", e.target.value)
                      }
                    />

                    <input
                      className={inputClass}
                      placeholder="Value"
                      value={spec.value || ""}
                      onChange={(e) =>
                        updateSpecification(index, "value", e.target.value)
                      }
                    />

                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className="px-3 py-2 text-left text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <TextArea
              label="Features (one item per line)"
              name="features"
              rows={4}
              {...fieldProps}
            />

            <ImageField
              label="Product Brochure (PDF)"
              name="brochure"
              {...fieldProps}
              handleUpload={handleUpload}
              uploading={uploading}
            />

            <Field label="Sort Order" name="sortOrder" type="number" {...fieldProps} />
          </>
        )}

        <StatusField
          form={form}
          updateField={updateField}
          activeTab={activeTab}
        />
      </div>
    );
  }

  // ====================================================
  // PAGE UI
  // ====================================================

  return (
    <div className="w-full space-y-7 text-[#142033]">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#467B23]">
            Website Management
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Product Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your categories, brands, machine categories and products.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="rounded-xl bg-[#467B23] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#38631c]"
        >
          + Add{" "}
          {activeTab === "brandCategories"
            ? "Brand Category"
            : activeTab === "categories"
              ? "Category"
              : activeTab === "brands"
                ? "Brand"
                : "Product"}
        </button>
      </div>

      {/* ALERTS */}

      {error && (
        <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button type="button" onClick={() => setError("")}>✕</button>
        </div>
      )}

      {success && (
        <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <span>{success}</span>
          <button type="button" onClick={() => setSuccess("")}>✕</button>
        </div>
      )}

      {/* STATS */}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Main Categories", categories.length],
          ["Brands", brands.length],
          ["Brand Categories", brandCategories.length],
          ["Products", products.length],
        ].map(([label, count]) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
          >
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="mt-2 text-2xl font-bold">{count}</p>
          </div>
        ))}
      </div>


      {/* SEARCH AND FILTER */}

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className={inputClass + " flex-1"}
          placeholder={`Search ${tabs.find((t) => t.id === activeTab)?.label}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={inputClass + " sm:w-48"}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="button"
          onClick={() => loadData()}
          className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold hover:bg-gray-50"
        >
          ↻ Refresh
        </button>
      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="font-bold">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {filteredData.length} records found
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center text-sm text-gray-500">
            Loading records...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-16 text-center">
            <p className="font-semibold text-gray-700">No records found</p>
            <p className="mt-2 text-sm text-gray-400">
              Add your first record to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Hierarchy</th>
                  <th className="px-5 py-4">Slug</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item) => (
                  <tr key={item._id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {item.logo && (
                          <img
                            src={item.logo}
                            alt=""
                            className="h-10 w-10 rounded-lg border border-gray-100 bg-white object-contain p-1"
                          />
                        )}

                        {item.images?.[0] && (
                          <img
                            src={item.images[0]}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        )}

                        <div>
                          <p className="font-semibold text-gray-800">
                            {getItemName(item)}
                          </p>

                          <p className="mt-1 max-w-xs truncate text-xs text-gray-400">
                            {getItemSubtitle(item) || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {activeTab === "brands"
                        ? item.category?.title || "—"
                        : activeTab === "brandCategories"
                          ? item.brand?.name || "—"
                          : activeTab === "products"
                            ? `${item.brand?.name || "—"} / ${item.brandCategory?.title || "—"}`
                            : getCount(item._id, brands, "category") + " brands"}
                    </td>

                    <td className="px-5 py-4 text-xs text-gray-500">
                      {item.slug}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.isActive !== false
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.isActive !== false ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold hover:border-[#467B23] hover:text-[#467B23]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="flex max-h-[92dvh] min-h-0 w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-lg font-bold">
                  {editingId ? "Edit" : "Add"}{" "}
                  {tabs.find((t) => t.id === activeTab)?.label.replace(/s$/, "")}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Enter the information below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving || uploading}
                className="rounded-lg p-2 text-xl text-gray-400 hover:bg-gray-100"
              >
                X
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-5 sm:p-7">
                {renderForm()}
              </div>

              {/* MODAL FOOTER */}

              <div className="flex shrink-0 flex-col-reverse justify-end gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:px-7">
                <button
                  type="button"
                  disabled={saving || uploading}
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="rounded-xl bg-[#467B23] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#38631c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Record"
                      : "Create Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
