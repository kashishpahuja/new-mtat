
const API = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api"
).replace(/\/+$/, "");

async function getPublicData(endpoint) {
  const response = await fetch(`${API}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error (${endpoint}):`, errorText);
    throw new Error(`Unable to fetch ${endpoint}. Status: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success || !result.data) {
    console.error("Invalid public API response:", result);
    throw new Error("Invalid public API response.");
  }

  return result.data.content ?? result.data;
}

export function getPublicHomepage() {
  return getPublicData("/homepage");
}

export function getPublicAbout() {
  return getPublicData("/about");
}

export function getPublicOurPresence() {
  return getPublicData("/our-presence");
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
