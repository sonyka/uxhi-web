/**
 * One-shot: replace four opaque partner logos with transparent-background PNGs.
 *
 * The grid mutes logos with `grayscale brightness-75 contrast-75`, which darkens
 * an opaque white background into a visible grey rectangle. These four assets
 * were JPEGs, so their white field was part of the image. The replacements are
 * the same pixel dimensions, so every existing Sanity `crop` and every optical
 * weight in lib/logoWeights.ts stays valid.
 *
 * Run once from /web:  node scripts/swap-transparent-logos.mjs
 *
 * Rollback: re-point logo.asset._ref at the `oldRef` recorded below.
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
  { id: "XSOtUJdPLrriseaWLGzhdh", name: "Hawaii Coworking",      file: "hawaii-coworking-logo.png", oldRef: "image-ce5c351075098c8a433ce51be8f775931d92b13d-500x167-jpg" },
  { id: "XSOtUJdPLrriseaWLGzmfp", name: "AI Hawaii",             file: "HiAI-logo.png",             oldRef: "image-fb0f2ceee2d0520c57ff9cc983f0b44f1b6c186b-500x500-jpg" },
  { id: "XSOtUJdPLrriseaWLGznPV", name: "Honolulu Tech Network", file: "htn-logo.png",              oldRef: "image-dba8151fd6a26fd5ad401ef82bbed4dda4d9c19a-200x200-jpg" },
  { id: "XSOtUJdPLrriseaWLGzo9B", name: "Honolulu BitDevs",      file: "hnl-bitdevs-logo.png",      oldRef: "image-0011d776df6ffdfaa378c191614133f33382a72a-400x400-jpg" },
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
  mutations.push({ patch: { id: t.id, set: { "logo.asset._ref": _id } } });
}

const res = await fetch(`https://${PROJECT}.api.sanity.io/v${API}/data/mutate/${DATASET}?returnIds=true`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ mutations }),
});
const out = await res.json();
if (!res.ok) throw new Error(JSON.stringify(out));
console.log("\npatched:", out.results.map((r) => r.id).join(", "));
