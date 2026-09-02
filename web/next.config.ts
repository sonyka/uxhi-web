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
      // /conference and /conference/ always serve the current year's site.
      // Update CURRENT_CONFERENCE_YEAR in middleware.ts when a new year starts.
      {
        source: "/conference",
        destination: "/conference/2026/",
        permanent: false,
      },
      {
        source: "/conference/",
        destination: "/conference/2026/",
        permanent: false,
      },
      // The plural was the public path until the nav and the URL were brought
      // into line. Only the entry points redirect: anything deeper still has to
      // resolve under /conferences/, because that is where the files live and
      // the archived sites reference their own assets by absolute path.
      {
        source: "/conferences",
        destination: "/conference/2026/",
        permanent: false,
      },
      {
        source: "/conferences/",
        destination: "/conference/2026/",
        permanent: false,
      },
      // A year root under the old spelling moves to the new one. Safe to
      // redirect because the pattern ends at the year: it cannot swallow
      // /conferences/:year/assets/..., which must keep resolving as a path.
      {
        source: "/conferences/:year(\\d{4})/",
        destination: "/conference/:year/",
        permanent: false,
      },
      // /volunteer was an earlier, unlinked version of the volunteer section on
      // /get-involved. The page is gone; this keeps any bookmarked or shared
      // link working instead of 404ing. Permanent, because it is not coming back.
      {
        source: "/volunteer",
        // Trailing slash matches the site's canonical form, so this lands in one
        // hop — otherwise the slash redirect fires again and drops the fragment
        // from the Location header.
        destination: "/get-involved/#volunteer",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      // The URL is singular; the files are not. public/conferences/ keeps its
      // name because the archived 2024 and 2025 sites carry ~700 absolute
      // /conferences/... references baked into their frozen HTML, CSS and JS,
      // and rewriting those to chase a folder rename is a poor trade.
      // Serve static HTML conference sites from public/conferences/:year/
      {
        source: "/conference/:year(\\d{4})/",
        destination: "/conferences/:year/index.html",
      },
      // Generic subpage rewrite: /conference/2025/lineup → public/conferences/2025/lineup.html
      {
        source: "/conference/:year(\\d{4})/:page",
        destination: "/conferences/:year/:page.html",
      },
      {
        source: "/conference/:year(\\d{4})/:page/",
        destination: "/conferences/:year/:page.html",
      },
      // Plural deep links stay served rather than redirected. A redirect here
      // would also catch /conferences/:year/assets/..., and the archives ask
      // for their assets by exactly that path.
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
