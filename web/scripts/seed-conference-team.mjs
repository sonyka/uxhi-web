// Seeds the 2026 conference team (conferenceTeam docs) into Sanity.
// Names, titles, LinkedIn URLs, and headshots are carried over from the 2025
// conference site; bios are placeholders. Photos are uploaded to Sanity so they
// live in the CMS (editable in Studio). Also migrates off the old
// `conferenceCochair` type by deleting those docs.
//
// Run from web/:
//   SANITY_API_WRITE_TOKEN=xxx node scripts/seed-conference-team.mjs
// Idempotent: deterministic _ids + Sanity dedupes identical image uploads.

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, "..", "public", "conferences", "2025", "assets", "images");

const client = createClient({
  projectId: "evh83z0t",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN,
});

const YEAR = 2026;

// name, title, linkedin, and the 2025 headshot filename (mapped by card order)
const TEAM = [
  { name: "Jennifer Kumura", title: "Co-Founder, UXHI", linkedin: "https://www.linkedin.com/in/jenniferkumura", photo: "6add82dd76f1.png" },
  { name: "Karli Young", title: "Audience Engagement, Kamehameha Schools", linkedin: "https://www.linkedin.com/in/karli-young", photo: "a20ea7a348e5.jpeg" },
  { name: "Micah Chao", title: "Data Specialist, RCUH", linkedin: "https://www.linkedin.com/in/sungyanmicahchao", photo: "45cbff32a88a.jpg" },
  { name: "Sony Atmadjaja", title: "Product Design Director, Doximity", linkedin: "https://www.linkedin.com/in/sonyka", photo: "1aca3fefd6b1.jpeg" },
  { name: "Taryn Fukuji", title: "Events Manager, UXHI", linkedin: "https://www.linkedin.com/in/tarynfukuji", photo: "7e3d34115e9b.jpg" },
  { name: "Yiting Wang, Ph.D.", title: "Researcher, UH Mānoa", linkedin: "https://www.linkedin.com/in/dr-yiting-wang", photo: "bd9367234dc1.jpg" },
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function run() {
  if (!client.config().token) {
    console.error("Missing SANITY_API_WRITE_TOKEN — aborting.");
    process.exit(1);
  }

  // Migrate: remove the old conferenceCochair docs.
  const oldIds = await client.fetch(`*[_type == "conferenceCochair"]._id`);
  if (oldIds.length) {
    console.log(`Deleting ${oldIds.length} old conferenceCochair docs...`);
    await Promise.all(oldIds.map((id) => client.delete(id)));
  }

  console.log(`Seeding ${TEAM.length} conferenceTeam members for ${YEAR}...`);
  for (let i = 0; i < TEAM.length; i++) {
    const m = TEAM[i];
    try {
      const asset = await client.assets.upload("image", readFileSync(join(IMAGES_DIR, m.photo)), {
        filename: `${slug(m.name)}.${m.photo.split(".").pop()}`,
      });
      const doc = {
        _id: `conferenceTeam-${YEAR}-${slug(m.name)}`,
        _type: "conferenceTeam",
        year: YEAR,
        order: i + 1,
        name: m.name,
        title: m.title,
        linkedin: m.linkedin,
        bio: "Full bio coming soon.",
        photo: { _type: "image", alt: m.name, asset: { _type: "reference", _ref: asset._id } },
      };
      const res = await client.createOrReplace(doc);
      console.log(`✓ ${m.name} (${res._id}) photo=${asset._id}`);
    } catch (err) {
      console.error(`✗ ${m.name}:`, err.message);
    }
  }
  console.log("Done.");
}

run();
