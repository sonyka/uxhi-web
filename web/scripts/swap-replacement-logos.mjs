/**
 * One-shot: swap in redrawn artwork for the three marks that read as filled
 * blocks in the grid — Holoholo App, Honolulu Tech Network and OER.
 *
 * These are new drawings, not background removals. Holoholo in particular is
 * now the bare ring rather than an app-icon tile, which is the thing the mute
 * could never fix on its own.
 *
 * Unlike the background-removal swap, this one CLEARS `logo.crop`. Those crops
 * were measured against the old assets' padding — Holoholo's took 30% off
 * each edge — and applying them to differently framed artwork would cut into
 * the mark. The replacements are trimmed to their content box instead, so the
 * asset needs no crop and the optical weight describes the mark itself.
 *
 * Run once from /web:  node scripts/swap-replacement-logos.mjs
 *
 * Rollback: restore `oldRef` below, and the crops recorded with it.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(WEB, "public/images/company_logos");

const token = fs
  .readFileSync(path.join(WEB, ".env.local"), "utf8")
  .split("\n")
  .find((l) => l.startsWith("SANITY_API_WRITE_TOKEN="))
  ?.slice("SANITY_API_WRITE_TOKEN=".length)
  .trim()
  .replace(/^["']|["']$/g, "");
if (!token) throw new Error("SANITY_API_WRITE_TOKEN missing from web/.env.local");

const PROJECT = "evh83z0t";
const DATASET = "production";
const API = "2024-01-01";

const TARGETS = [
  {
    id: "XSOtUJdPLrriseaWLGzl8f", name: "Holoholo App", file: "holoholo-logo.png",
    oldRef: "image-4ac1f46eed255c9bc20adb7cd1998a11ca305e71-705x705-png",
    oldCrop: { top: 0.32, bottom: 0.29, left: 0.3, right: 0.29 },
  },
  {
    id: "XSOtUJdPLrriseaWLGznPV", name: "Honolulu Tech Network", file: "htn-logo.png",
    oldRef: "image-6a3bebd379dbe80133fd29add63a521c7b5d0d3a-200x200-png",
    oldCrop: { top: 0.01, bottom: 0.02, left: 0.1, right: 0.1 },
  },
  {
    id: "6XDwlUNdCITiKS3WlhuJ1E", name: "OER", file: "OER Logo.png",
    oldRef: "image-f24698283ead008a87098b194757ed2f918931df-256x256-png",
    oldCrop: null,
  },
];

const mutations = [];
for (const t of TARGETS) {
  const res = await fetch(
    `https://${PROJECT}.api.sanity.io/v${API}/assets/images/${DATASET}?filename=${encodeURIComponent(t.file)}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "image/png" },
      body: fs.readFileSync(path.join(DIR, t.file)),
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(`upload ${t.file}: ${JSON.stringify(json)}`);
  const { _id, metadata } = json.document;
  const { width, height } = metadata.dimensions;
  console.log(`uploaded  ${t.name.padEnd(24)} ${width}x${height}  hasAlpha=${metadata.hasAlpha}`);
  mutations.push({
    patch: { id: t.id, set: { "logo.asset._ref": _id }, unset: ["logo.crop"] },
  });
}

const res = await fetch(`https://${PROJECT}.api.sanity.io/v${API}/data/mutate/${DATASET}?returnIds=true`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ mutations }),
});
const out = await res.json();
if (!res.ok) throw new Error(JSON.stringify(out));
console.log("\npatched (asset swapped, crop cleared):", out.results.map((r) => r.id).join(", "));
