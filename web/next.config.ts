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
      // The singular archive paths, for `next dev` and `next start`. On Netlify
      // the CDN rule in netlify.toml answers these before Next is reached, and
      // has to, because the server function does not carry public/. Keeping
      // them means local and deployed resolve the same URLs.
      {
        source: "/conference/:year(\\d{4})/",
        destination: "/conferences/:year/index.html",
      },
      {
        source: "/conference/:year(\\d{4})/:page",
        destination: "/conferences/:year/:page.html",
      },
      {
        source: "/conference/:year(\\d{4})/:page/",
        destination: "/conferences/:year/:page.html",
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
