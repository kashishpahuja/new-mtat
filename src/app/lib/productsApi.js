
import { apiRequest } from "./adminApi";

// ==========================================
// HELPERS
// ==========================================

const buildQuery = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const result = query.toString();
  return result ? `?${result}` : "";
};

// ==========================================
// PUBLIC APIs
// These can be used by the website frontend too.
// ==========================================

// Complete navbar hierarchy
export const getProductNavigation = () =>
  apiRequest("/products/navigation");

// Main categories
export const getPublicCategories = () =>
  apiRequest("/products/public/categories");

// Public brands
export const getPublicBrands = (params = {}) =>
  apiRequest(`/products/public/brands${buildQuery(params)}`);

// Single brand with its inner categories
export const getPublicBrand = (slug) =>
  apiRequest(`/products/public/brands/${encodeURIComponent(slug)}`);

// Public brand categories
export const getPublicBrandCategories = (params = {}) =>
  apiRequest(
    `/products/public/brand-categories${buildQuery(params)}`
  );

// Public individual products
export const getPublicProducts = (params = {}) =>
  apiRequest(`/products/public/items${buildQuery(params)}`);

// Single product
export const getPublicProduct = (slug) =>
  apiRequest(`/products/public/items/${encodeURIComponent(slug)}`);

// ==========================================
// ADMIN CATEGORY APIs
// ==========================================

export const getCategories = () =>
  apiRequest("/products/admin/categories");

export const createCategory = (data) =>
  apiRequest("/products/admin/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateCategory = (id, data) =>
  apiRequest(`/products/admin/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteCategory = (id) =>
  apiRequest(`/products/admin/categories/${id}`, {
    method: "DELETE",
  });

// ==========================================
// ADMIN BRAND APIs
// ==========================================

export const getBrands = (params = {}) =>
  apiRequest(`/products/admin/brands${buildQuery(params)}`);

export const createBrand = (data) =>
  apiRequest("/products/admin/brands", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateBrand = (id, data) =>
  apiRequest(`/products/admin/brands/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteBrand = (id) =>
  apiRequest(`/products/admin/brands/${id}`, {
    method: "DELETE",
  });

// ==========================================
// ADMIN BRAND CATEGORY APIs
// ==========================================

export const getBrandCategories = (params = {}) =>
  apiRequest(
    `/products/admin/brand-categories${buildQuery(params)}`
  );

export const createBrandCategory = (data) =>
  apiRequest("/products/admin/brand-categories", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateBrandCategory = (id, data) =>
  apiRequest(`/products/admin/brand-categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteBrandCategory = (id) =>
  apiRequest(`/products/admin/brand-categories/${id}`, {
    method: "DELETE",
  });

// ==========================================
// ADMIN INDIVIDUAL PRODUCT APIs
// ==========================================

export const getProducts = (params = {}) =>
  apiRequest(`/products/admin/items${buildQuery(params)}`);

export const createProduct = (data) =>
  apiRequest("/products/admin/items", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateProduct = (id, data) =>
  apiRequest(`/products/admin/items/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteProduct = (id) =>
  apiRequest(`/products/admin/items/${id}`, {
    method: "DELETE",
  });

// ==========================================
// ADMIN UPLOAD API
// ==========================================

export const uploadProductAsset = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest("/uploads", {
    method: "POST",
    body: formData,
  });
};
