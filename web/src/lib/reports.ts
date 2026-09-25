/**
 * Canonical URLs for the State of UX in Hawaiʻi report PDFs.
 *
 * These are served from the Sanity CDN rather than `public/reports/`, and the
 * reason is deployment storage, not delivery. At 8.3 MB and 5.2 MB they were
 * the two largest assets in every Vercel deployment — larger than any chunk of
 * the application itself — and a deployment stores its own copy of every static
 * file. Two PDFs that have not changed since publication were therefore being
 * re-stored on every staging push, against a 10 GB free-tier ceiling we hit in
 * Sept 2026. See "Vercel deployment-storage limit" in CLAUDE.md.
 *
 * They are content rather than code, so the CDN is where they belong anyway;
 * the storage limit only forced the question.
 *
 * The hashed filenames are Sanity asset IDs and are immutable — re-uploading a
 * PDF produces a new URL, so replacing a report means changing the value here.
 * Kept in one module so both the /resources listing and the /state-of-ux/2025
 * preview page cite the same file.
 */
export const REPORT_PDFS = {
  2025: "https://cdn.sanity.io/files/evh83z0t/production/ba752f715f94bfe3fa2da09501809721efbcfeb5.pdf",
  2023: "https://cdn.sanity.io/files/evh83z0t/production/4f87e28a97f261c6630a87325ce485043adb375d.pdf",
} as const;
