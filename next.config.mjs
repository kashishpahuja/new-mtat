/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "export",
   images: {
    unoptimized: true,
  },
  // experimental: {
  //   agentFeedback: true,
  // },
  // cacheComponents: true,
  // partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
