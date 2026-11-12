const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api";
export function getAdminToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("mtat_admin_token")
    : null;
}
export async function apiRequest(path, options = {}) {
  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };
  const token = getAdminToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}
export { API };
