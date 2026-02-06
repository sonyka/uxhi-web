/**
 * Seed Sanity CMS with existing hardcoded content.
 *
 * Usage:
 *   1. Add your write token to .env.local:
 *      SANITY_API_WRITE_TOKEN=sk...
 *
 *   2. Run from the /web directory:
 *      node scripts/seed-sanity.mjs
 *
 * Generate a token at: https://www.sanity.io/manage → project → API → Tokens → Add API Token (Editor role)
 */

import { createClient } from "@sanity/client";
import { createReadStream, readFileSync } from "fs";
import { resolve } from "path";

// Parse .env.local manually (no dotenv dependency needed)
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
  if (match) process.env[match[1]] = process.env[match[1]] || match[2];
}

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error(
    "\n❌ Missing SANITY_API_WRITE_TOKEN in .env.local\n" +
      "   Generate one at: https://www.sanity.io/manage → API → Tokens → Add API Token (Editor role)\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId: "evh83z0t",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const PUBLIC = resolve(process.cwd(), "public");

// ── Helpers ──────────────────────────────────────────────────────────────────

async function uploadImage(relativePath) {
  const absPath = resolve(PUBLIC, relativePath.replace(/^\//, ""));
  const ext = absPath.split(".").pop().toLowerCase();
  const mimeTypes = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    svg: "image/svg+xml",
    webp: "image/webp",
  };
  const contentType = mimeTypes[ext] || "image/png";

  const asset = await client.assets.upload("image", createReadStream(absPath), {
    contentType,
    filename: absPath.split("/").pop(),
  });

  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function seedDocuments(label, items, buildDoc) {
  console.log(`\n── ${label} (${items.length} docs) ──`);
  for (const [i, item] of items.entries()) {
    try {
      const doc = await buildDoc(item, i);
      const created = await client.create(doc);
      console.log(`  ✓ ${created._type} "${item.name || item.title}" → ${created._id}`);
    } catch (err) {
      console.error(`  ✗ Failed "${item.name || item.title}": ${err.message}`);
    }
  }
}

// ── Data ─────────────────────────────────────────────────────────────────────

const values = [
  {
    title: "Service",
    description:
      "Committed to serve our members with compassion, integrity, and dedication",
    iconPath: "/images/icons/icon-service.png",
  },
  {
    title: "Community",
    description:
      "Foster an inclusive, supportive environment that encourages collaboration, knowledge-sharing, and growth",
    iconPath: "/images/icons/icon-community.png",
  },
  {
    title: "Empowerment",
    description:
      "Provide and connect members to learning and growth opportunities to take charge of their own success",
    iconPath: "/images/icons/icon-empowerment.png",
  },
  {
    title: "Inspire",
    description:
      "Ignite the continued passion and practice for human-centered design",
    iconPath: "/images/icons/icon-inspire.png",
  },
];

const committees = [
  {
    name: "Educational Outreach",
    description:
      "Fosters UX education at foundational levels. Initiatives focus on engaging K-12 students through introductory workshops and programs, and collaborating with colleges and universities to support their UX curricula, offer guest lectures, and connect with emerging talent.",
    iconPath: "/images/icons/icon-educational-outreach.png",
  },
  {
    name: "Workforce Outreach",
    description:
      "Develop and deliver educational workshops and presentations to companies, helping them integrate UX principles, methodologies, and best practices into their operations.",
    iconPath: "/images/icons/icon-workforce-outreach.png",
  },
  {
    name: "Community Engagement",
    description:
      "Organize social events, networking opportunities, member spotlights, and initiatives to welcome new members and ensure active participation.",
    iconPath: "/images/icons/icon-community-engagement.png",
  },
  {
    name: "Professional Development",
    description:
      "Provides continuous learning and upskilling opportunities for our members through workshops, webinars, speaker events, and hands-on sessions designed to enhance practical UX skills.",
    iconPath: "/images/icons/icon-professional-development.png",
  },
  {
    name: "Communications",
    description:
      "Manages all external and internal communications for the community including maintaining the website, managing social media channels, creating newsletters, promoting events, and ensuring consistent branding and messaging.",
    iconPath: "/images/icons/icon-communications.png",
  },
  {
    name: "Conference",
    description:
      "Plans and executes our annual UXHICon conference, bringing together speakers, sponsors, and attendees for Hawai\u2018i\u2019s premier UX event. Help shape the program, coordinate logistics, and create memorable experiences for our community.",
    iconPath: "/images/icons/icon-conference.png",
  },
];

const partners = [
  { name: "Pi'iku Co.", logo: "/images/company_logos/piiku-logo.png", width: 80 },
  { name: "Hawaii Coworking", logo: "/images/company_logos/hawaii-coworking-logo.jpg", width: 128 },
  { name: "Hub Coworking Hawaii", logo: "/images/company_logos/hub-logo.png", width: 90 },
  { name: "Entrepreneurs Sandbox", logo: "/images/company_logos/sandbox-logo.svg", width: 100 },
  { name: "Vanta", logo: "/images/company_logos/vanta-logo.png", width: 128 },
  { name: "Holoholo App", logo: "/images/company_logos/holoholo-logo.png", width: 128 },
  { name: "Purple Mai'a", logo: "/images/company_logos/purple-maia.png", width: 72 },
  { name: "University of Hawaii", logo: "/images/company_logos/uh-logo.png", width: 80 },
  { name: "AI Hawaii", logo: "/images/company_logos/HiAI-logo.jpg", width: 80 },
  { name: "Honolulu Tech Network", logo: "/images/company_logos/htn-logo.jpeg", width: 80 },
  { name: "Honolulu BitDevs", logo: "/images/company_logos/hnl-bitdevs-logo.jpg", width: 80 },
  { name: "HTW", logo: "/images/company_logos/htw-logo.webp", width: 80 },
];

const sponsors = [
  { name: "HTDC", logo: "/images/company_logos/htdc-logo.svg", width: 80 },
  { name: "Entrepreneurs Sandbox", logo: "/images/company_logos/sandbox-logo.svg", width: 100 },
  { name: "Purple Mai'a", logo: "/images/company_logos/purple-maia.png", width: 72 },
  { name: "Zippy's", logo: "/images/company_logos/Zippy Logo RGB.svg", width: 80, darkGray: true },
  { name: "Servco", logo: "/images/company_logos/servco.svg", width: 80 },
  { name: "Anthology Finn", logo: "/images/company_logos/anthology-finn.png", width: 80 },
  { name: "Terranox", logo: "/images/company_logos/terranox-logo.svg", width: 90 },
  { name: "Shaka Guide", logo: "/images/company_logos/shakaguide-logo.png", width: 128 },
  { name: "Adobe", logo: "/images/company_logos/adobe-logo.svg", width: 90 },
  { name: "Hub Coworking", logo: "/images/company_logos/hub-logo.png", width: 90 },
  { name: "OER", logo: "/images/company_logos/OER Logo.png", width: 80 },
  { name: "Mantle", logo: "/images/company_logos/mantle-logo.svg", width: 90 },
  { name: "KCC NMA", logo: "/images/company_logos/kccnma-logo.png", width: 80 },
  { name: "RVCM", logo: "/images/company_logos/rvcm-logo.svg", width: 72 },
];

// ── Run ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Seeding Sanity CMS...\n");

  // 1. Values
  await seedDocuments("Values", values, async (item, i) => ({
    _type: "value",
    title: item.title,
    description: item.description,
    icon: await uploadImage(item.iconPath),
    order: i + 1,
  }));

  // 2. Committees
  await seedDocuments("Committees", committees, async (item, i) => ({
    _type: "committee",
    name: item.name,
    description: item.description,
    icon: await uploadImage(item.iconPath),
    order: i + 1,
  }));

  // 3. Partners
  await seedDocuments("Partners", partners, async (item, i) => ({
    _type: "partner",
    name: item.name,
    logo: await uploadImage(item.logo),
    displayWidth: item.width,
    darkGray: item.darkGray || false,
    order: i + 1,
  }));

  // 4. Sponsors
  await seedDocuments("Sponsors", sponsors, async (item, i) => ({
    _type: "sponsor",
    name: item.name,
    logo: await uploadImage(item.logo),
    displayWidth: item.width,
    darkGray: item.darkGray || false,
    order: i + 1,
  }));

  console.log("\n✅ Done! Check your Sanity Studio at /studio to verify.\n");
}

main().catch((err) => {
  console.error("\n❌ Seed failed:", err.message);
  process.exit(1);
});
