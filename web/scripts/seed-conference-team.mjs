// Seeds / syncs the 2026 conference team (conferenceTeam docs) in Sanity to the
// canonical roster below. Existing members keep their 2025 headshots (uploaded
// to Sanity); new members start with name + initials until a collaborator fills
// in title / bio / LinkedIn / photo in Studio.
//
// This is the source of truth for the roster: members not listed here are
// deleted from year 2026 on run. It also migrates off the old conferenceCochair
// type.
//
// ⚠️  Re-running resets bios to the placeholder below — run it to change the
//     ROSTER, not after a collaborator has entered real bios in Studio.
//
// Run from web/:
//   SANITY_API_WRITE_TOKEN=xxx node scripts/seed-conference-team.mjs

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
const PLACEHOLDER_BIO = "Full bio coming soon.";

// name, title, linkedin, and 2025 headshot filename (photo optional for new members)
const TEAM = [
  { name: "Karli Young", title: "Audience Engagement, Kamehameha Schools", linkedin: "https://www.linkedin.com/in/karli-young", photo: "a20ea7a348e5.jpeg" },
  { name: "Micah Chao", title: "Data Specialist, RCUH", linkedin: "https://www.linkedin.com/in/sungyanmicahchao", photo: "45cbff32a88a.jpg" },
  { name: "Sony Atmadjaja", title: "Product Design Director, Doximity", linkedin: "https://www.linkedin.com/in/sonyka", photo: "1aca3fefd6b1.jpeg" },
  { name: "Taryn Fukuji", title: "Events Manager, UXHI", linkedin: "https://www.linkedin.com/in/tarynfukuji", photo: "7e3d34115e9b.jpg" },
  { name: "Pua Pakele" },
  { name: "Richie Galacgac" },
  { name: "Aeryn Yamazaki" },
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const idFor = (name) => `conferenceTeam-${YEAR}-${slug(name)}`;

async function run() {
  if (!client.config().token) {
    console.error("Missing SANITY_API_WRITE_TOKEN — aborting.");
    process.exit(1);
  }

  const rosterIds = TEAM.map((m) => idFor(m.name));

  // Delete: old conferenceCochair docs + any year-2026 conferenceTeam not in roster.
  const stale = await client.fetch(
    `*[_type == "conferenceCochair" || (_type == "conferenceTeam" && year == $y && !(_id in $ids))]._id`,
    { y: YEAR, ids: rosterIds }
  );
  if (stale.length) {
    console.log(`Deleting ${stale.length} stale docs: ${stale.join(", ")}`);
    await Promise.all(stale.map((id) => client.delete(id)));
  }

  console.log(`Seeding ${TEAM.length} conferenceTeam members for ${YEAR}...`);
  for (let i = 0; i < TEAM.length; i++) {
    const m = TEAM[i];
    try {
      const doc = {
        _id: idFor(m.name),
        _type: "conferenceTeam",
        year: YEAR,
        order: i + 1,
        name: m.name,
        title: m.title,
        linkedin: m.linkedin,
        bio: PLACEHOLDER_BIO,
      };
      if (m.photo) {
        const asset = await client.assets.upload("image", readFileSync(join(IMAGES_DIR, m.photo)), {
          filename: `${slug(m.name)}.${m.photo.split(".").pop()}`,
        });
        doc.photo = { _type: "image", alt: m.name, asset: { _type: "reference", _ref: asset._id } };
      }
      const res = await client.createOrReplace(doc);
      console.log(`✓ ${m.name} (${res._id})${m.photo ? " +photo" : ""}`);
    } catch (err) {
      console.error(`✗ ${m.name}:`, err.message);
    }
  }
  console.log("Done.");
}

run();
