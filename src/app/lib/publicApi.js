
const API = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api"
).replace(/\/+$/, "");

// Generic public API request
async function fetchPublic(endpoint) {
  const response = await fetch(`${API}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error(`Invalid API response from ${endpoint}`);
  }

  if (!response.ok) {
    console.error(`API Error (${endpoint}):`, result);

    throw new Error(
      result.message || `API error: ${response.status}`
    );
  }

  if (result.success === false) {
    throw new Error(
      result.message || "Unable to fetch public data"
    );
  }

  return result.data ?? result;
}

// Existing content API request
async function getPublicData(endpoint) {
  const result = await fetchPublic(endpoint);

  return result.content ?? result;
}

// Homepage
export function getPublicHomepage() {
  return getPublicData("/public/homepage");
}

// About
export function getPublicAbout() {
  return getPublicData("/about");
}

// Our Presence
export function getPublicOurPresence() {
  return getPublicData("/our-presence");
}

// Get single brand with its categories and featured products
export async function getPublicBrand(slug) {
  return fetchPublic(
    `/products/public/brands/${encodeURIComponent(slug)}`
  );
}

// Get public product list with optional filters
export async function getPublicItems({
  brand,
  category,
  brandCategory,
  featured,
} = {}) {
  const params = new URLSearchParams();

  if (brand) {
    params.set("brand", brand);
  }

  if (category) {
    params.set("category", category);
  }

  if (brandCategory) {
    params.set("brandCategory", brandCategory);
  }

  if (featured !== undefined) {
    params.set("featured", String(featured));
  }

  const query = params.toString();

  return fetchPublic(
    `/products/public/items${query ? `?${query}` : ""}`
  );
}

// Get dynamic product navigation hierarchy
export async function getPublicNavigation() {
  return fetchPublic("/products/navigation");
}


// const API = (
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api"
// ).replace(/\/$/, "");

// async function getPublicData(endpoint) {
//   const response = await fetch(`${API}${endpoint}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error(`API Error (${endpoint}):`, errorText);

//     throw new Error(`Unable to fetch ${endpoint}. Status: ${response.status}`);
//   }

//   const result = await response.json();

//   if (!result.success || !result.data) {
//     console.error("Invalid API response:", result);
//     throw new Error("Invalid public API response.");
//   }

//   // Supports both { data: content } and { data: { content } }
//   return result.data.content ?? result.data;
// }

// export async function getPublicHomepage() {
//   return getPublicData("/homepage");
// }

// export async function getPublicAbout() {
//   return getPublicData("/about");
// }

// const API =
//   process.env.NEXT_PUBLIC_API_URL ||
//   "http://localhost:8002/api";

// export async function getPublicHomepage() {
//   const response = await fetch(`${API}/public/homepage`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error("Unable to fetch homepage content.");
//   }

//   const result = await response.json();

//   if (!result.success || !result.data) {
//     throw new Error("Invalid homepage response.");
//   }

//   return result.data;
// }
