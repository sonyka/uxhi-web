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
      // The singular spelling is for the live conference, which is a real
      // route. The archives keep the plural, because they are folders of frozen
      // files and Netlify serves public/ from the CDN without bundling it into
      // the server function — a Next rewrite pointing at one resolves inside a
      // function that cannot see it. Serving them where they actually live
      // needs no rewrite, no per-year CDN rule, and cannot drift.
      //
      // Years are named rather than matched: the pattern would otherwise catch
      // /conference/2026/, which is the live route.
      {
        source: "/conference/2025/",
        destination: "/conferences/2025/",
        permanent: false,
      },
      {
        source: "/conference/2024/",
        destination: "/conferences/2024/",
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
      // Serve the frozen archives out of public/conferences/:year/.
      //
      // These exist for `next dev` and `next start`, which do not resolve a
      // directory to its index or an extensionless path to its .html file.
      // On Netlify the CDN does both before the Next handler is reached, so in
      // production these never fire. Keeping them is what makes local and
      // deployed behaviour agree.
      {
        source: "/conferences/:year(\\d{4})/",
        destination: "/conferences/:year/index.html",
      },
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
