const API = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api"
).replace(/\/$/, "");

const API_ORIGIN = new URL(API).origin;

export function getMediaUrl(path) {
  if (!path) return "";

  // Handle localhost URLs saved in MongoDB
  if (
    /^https?:\/\/(localhost|127\.0\.0\.1):8002/i.test(path)
  ) {
    return path.replace(
      /^https?:\/\/(localhost|127\.0\.0\.1):8002/i,
      API_ORIGIN
    );
  }

  // Already an external URL
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // Backend uploaded files
  if (
    path.startsWith("/uploads/") ||
    path.startsWith("uploads/")
  ) {
    return `${API_ORIGIN}/${path.replace(/^\/+/, "")}`;
  }

  // Frontend public assets: /Images, /video, etc.
  return path.startsWith("/") ? path : `/${path}`;
}



// const API =
//   process.env.NEXT_PUBLIC_API_URL ||
//   "http://localhost:8002/api";

// const API_ORIGIN = new URL(API).origin;

// export function getMediaUrl(path) {
//   if (!path) return "";

//   // Fix localhost upload URLs when the website is deployed
//   if (
//     path.startsWith("http://localhost:8002") ||
//     path.startsWith("http://127.0.0.1:8002")
//   ) {
//     return path.replace(
//       /^http:\/\/(localhost|127\.0\.0\.1):8002/,
//       API_ORIGIN
//     );
//   }

//   // Already an external URL
//   if (/^https?:\/\//i.test(path)) {
//     return path;
//   }

//   // Public files such as /Images/banner.webp and /video/intro1.mp4
//   return path;
// }