/** @type {import('next').NextConfig} */
const nextConfig = {
  //  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "mtaindia.in",
        pathname: "/wp-content/uploads/**",
      },
    ],
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
