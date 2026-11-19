
const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8002/api";

export async function getPublicHomepage() {
  const response = await fetch(`${API}/public/homepage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch homepage content.");
  }

  const result = await response.json();

  if (!result.success || !result.data) {
    throw new Error("Invalid homepage response.");
  }

  return result.data;
}
