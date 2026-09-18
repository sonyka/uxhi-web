/**
 * One-shot: add Boom Photobooth to the 2026 conference as the first Swag sponsor.
 *
 * The logo is the 2025 site's asset with the "Photo Booth" wordmark recoloured
 * from white to near-black — the original was drawn for a dark ground and the
 * wordmark vanished on the white 2026 sponsor cards. The burst is untouched.
 *
 * Run once from /web:  node scripts/add-boom-sponsor.mjs
 *
 * Rollback: delete the document id this prints (and its asset, via
 * purge-orphan-assets.mjs).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOGO = path.join(WEB, "public/images/company_logos/boom-photobooth-logo.png");

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
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const auth = { Authorization: `Bearer ${token}` };

// Guard against a second run creating a duplicate.
const existing = await fetch(
  `${BASE}/data/query/${DATASET}?query=${encodeURIComponent(
    '*[_type == "conferenceSponsor" && year == 2026 && name == "Boom Photobooth"][0]._id',
  )}`,
  { headers: auth },
).then((r) => r.json());
if (existing.result) {
  console.log(`Already exists: ${existing.result} — nothing to do.`);
  process.exit(0);
}

const upload = await fetch(
  `${BASE}/assets/images/${DATASET}?filename=boom-photobooth-logo.png`,
  { method: "POST", headers: { ...auth, "Content-Type": "image/png" }, body: fs.readFileSync(LOGO) },
).then((r) => r.json());
const assetId = upload.document?._id;
if (!assetId) throw new Error(`Logo upload failed: ${JSON.stringify(upload)}`);

const _id = crypto.randomUUID();
const res = await fetch(`${BASE}/data/mutate/${DATASET}`, {
  method: "POST",
  headers: { ...auth, "Content-Type": "application/json" },
  body: JSON.stringify({
    mutations: [
      {
        create: {
          _id,
          _type: "conferenceSponsor",
          year: 2026,
          order: 0,
          name: "Boom Photobooth",
          tier: "swag",
          url: "https://www.boomphotobooth.com/",
          description:
            "Photo booth rentals with pro-quality photos, fun props, and instant sharing for weddings, parties, and corporate events.",
          logo: {
            _type: "image",
            alt: "Boom Photo Booth",
            asset: { _type: "reference", _ref: assetId },
          },
        },
      },
    ],
  }),
}).then((r) => r.json());
if (res.error) throw new Error(JSON.stringify(res.error));

console.log(`Created ${_id} (logo ${assetId})`);
