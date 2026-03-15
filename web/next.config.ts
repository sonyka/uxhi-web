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
      {
        source: "/find-ux-pro/:path*",
        destination: "/find-experts/:path*",
        permanent: true,
      },
      {
        source: "/merch/:path*",
        destination: "/shop/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/conferences/:year(\\d{4})/",
        destination: "/conferences/:year/index.html",
      },
      {
        source: "/conferences/:year(\\d{4})/lineup",
        destination: "/conferences/:year/lineup.html",
      },
      {
        source: "/conferences/:year(\\d{4})/lineup/",
        destination: "/conferences/:year/lineup.html",
      },
    ];
  },
};

export default nextConfig;
