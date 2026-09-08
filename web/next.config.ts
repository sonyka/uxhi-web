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
  /**
   * Security headers, set here rather than in netlify.toml so staging on
   * Vercel gets the same ones — a header that only exists in production is a
   * header nobody tests.
   *
   * Deliberately the safe subset. A full Content-Security-Policy with a
   * script-src is the one that actually stops cross-site scripting, and it is
   * also the one that silently breaks Next's inline bootstrap, Google
   * Analytics and the embedded Studio if it is written blind. That wants a
   * session with the console open, not a guess.
   *
   * frame-ancestors is here, though, because it is the part that needs local
   * knowledge: Sanity's Presentation tool previews the live site inside an
   * iframe served from the Studio, so a flat X-Frame-Options: DENY would look
   * correct and quietly break visual editing. 'self' covers the Studio
   * embedded at /studio; the sanity.studio entry covers the hosted one.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stop a browser second-guessing a Content-Type. The classic case is
          // a text file sniffed as HTML and run.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send the full URL to ourselves, only the origin to anyone else, and
          // nothing at all downgrading to http.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nothing here needs a camera, a microphone or a location, so no
          // embedded third party gets to ask for one.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Who may frame us. Replaces X-Frame-Options, which cannot express
          // an allowlist.
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://*.sanity.studio",
          },
          // A year of HTTPS-only. No includeSubDomains and no preload on
          // purpose: both are hard to walk back, and this domain carries email
          // and may grow subdomains that are not ours to promise for.
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
        ],
      },
    ];
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
