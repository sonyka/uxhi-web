// Seeds the 2026 conference co-chairs into Sanity (conferenceCochair docs).
// Content carried over from the 2025 conference site: names, titles, LinkedIn.
// Bios are placeholders; photos are added later in Studio.
//
// Run from web/:
//   SANITY_API_WRITE_TOKEN=xxx node scripts/seed-conference-cochairs.mjs
// (idempotent — uses deterministic _ids, so re-running updates in place)

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "evh83z0t",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN,
});

const YEAR = 2026;

const COCHAIRS = [
  { name: "Jennifer Kumura", title: "Co-Founder, UXHI", linkedin: "https://www.linkedin.com/in/jenniferkumura" },
  { name: "Karli Young", title: "Audience Engagement, Kamehameha Schools", linkedin: "https://www.linkedin.com/in/karli-young" },
  { name: "Micah Chao", title: "Data Specialist, RCUH", linkedin: "https://www.linkedin.com/in/sungyanmicahchao" },
  { name: "Sony Atmadjaja", title: "Product Design Director, Doximity", linkedin: "https://www.linkedin.com/in/sonyka" },
  { name: "Taryn Fukuji", title: "Events Manager, UXHI", linkedin: "https://www.linkedin.com/in/tarynfukuji" },
  { name: "Yiting Wang, Ph.D.", title: "Researcher, UH Mānoa", linkedin: "https://www.linkedin.com/in/dr-yiting-wang" },
];

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function run() {
  if (!client.config().token) {
    console.error("Missing SANITY_API_WRITE_TOKEN — aborting.");
    process.exit(1);
  }
  console.log(`Seeding ${COCHAIRS.length} co-chairs for ${YEAR}...`);
  for (let i = 0; i < COCHAIRS.length; i++) {
    const c = COCHAIRS[i];
    const doc = {
      _id: `conferenceCochair-${YEAR}-${slug(c.name)}`,
      _type: "conferenceCochair",
      year: YEAR,
      order: i + 1,
      name: c.name,
      title: c.title,
      linkedin: c.linkedin,
      bio: "Full bio coming soon.",
    };
    try {
      const res = await client.createOrReplace(doc);
      console.log(`✓ ${c.name} (${res._id})`);
    } catch (err) {
      console.error(`✗ ${c.name}:`, err.message);
    }
  }
  console.log("Done.");
}

run();
