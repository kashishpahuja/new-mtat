
const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8002/api";

export function getAdminToken() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("mtat_admin_token");
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("mtat_admin_token");

  if (window.location.pathname !== "/admin/login") {
    window.location.replace("/admin/login?session=expired");
  }
}

export async function apiRequest(path, options = {}) {
  const token = getAdminToken();

  // Redirect if admin token is missing
  if (
    typeof window !== "undefined" &&
    !token &&
    !path.startsWith("/auth/login")
  ) {
    if (window.location.pathname !== "/admin/login") {
      window.location.replace("/admin/login");
    }

    throw new Error("Please log in to continue.");
  }

  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API}${path}`, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch {
    throw new Error("Unable to connect to the server.");
  }

  const data = await response.json().catch(() => ({}));

  if (
    response.status === 401 &&
    !path.startsWith("/auth/login")
  ) {
    clearAdminSession();

    throw new Error(
      "Your session has expired. Please log in again."
    );
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export { API };
