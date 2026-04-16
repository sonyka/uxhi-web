import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      // /conferences and /conferences/ always serve the current year's site.
      // Update CURRENT_CONFERENCE_YEAR in middleware.ts when a new year starts.
      {
        source: "/conferences",
        destination: "/conferences/2026/",
        permanent: false,
      },
      {
        source: "/conferences/",
        destination: "/conferences/2026/",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      // Serve static HTML conference sites from public/conferences/:year/
      {
        source: "/conferences/:year(\\d{4})/",
        destination: "/conferences/:year/index.html",
      },
      // Generic subpage rewrite: /conferences/2026/agenda → public/conferences/2026/agenda.html
      {
        source: "/conferences/:year(\\d{4})/:page",
        destination: "/conferences/:year/:page.html",
      },
      {
        source: "/conferences/:year(\\d{4})/:page/",
        destination: "/conferences/:year/:page.html",
      },
    ];
  },
};

export default nextConfig;
