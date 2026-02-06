/**
 * Migrate partnerSponsor documents to separate partner and sponsor types.
 *
 * 1. Deletes all existing partnerSponsor documents
 * 2. Re-seeds partners as _type: "partner"
 * 3. Re-seeds sponsors as _type: "sponsor"
 *
 * Usage: node scripts/migrate-partner-sponsor.mjs
 */

import { createClient } from "@sanity/client";
import { createReadStream, readFileSync } from "fs";
import { resolve } from "path";

// Parse .env.local
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
  if (match) process.env[match[1]] = process.env[match[1]] || match[2];
}

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("\n❌ Missing SANITY_API_WRITE_TOKEN in .env.local\n");
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
  const asset = await client.assets.upload("image", createReadStream(absPath), {
    contentType: mimeTypes[ext] || "image/png",
    filename: absPath.split("/").pop(),
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

// Data
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

async function main() {
  // Step 1: Delete all old partnerSponsor documents
  console.log("🗑  Deleting old partnerSponsor documents...");
  const oldDocs = await client.fetch('*[_type == "partnerSponsor"]{ _id }');
  if (oldDocs.length > 0) {
    const tx = client.transaction();
    for (const doc of oldDocs) {
      tx.delete(doc._id);
    }
    await tx.commit();
    console.log(`   Deleted ${oldDocs.length} partnerSponsor documents`);
  } else {
    console.log("   No partnerSponsor documents found (already clean)");
  }

  // Step 2: Create partner documents
  console.log("\n── Partners (12 docs) ──");
  for (const [i, item] of partners.entries()) {
    try {
      const doc = await client.create({
        _type: "partner",
        name: item.name,
        logo: await uploadImage(item.logo),
        displayWidth: item.width,
        darkGray: item.darkGray || false,
        order: i + 1,
      });
      console.log(`  ✓ partner "${item.name}" → ${doc._id}`);
    } catch (err) {
      console.error(`  ✗ Failed "${item.name}": ${err.message}`);
    }
  }

  // Step 3: Create sponsor documents
  console.log("\n── Sponsors (14 docs) ──");
  for (const [i, item] of sponsors.entries()) {
    try {
      const doc = await client.create({
        _type: "sponsor",
        name: item.name,
        logo: await uploadImage(item.logo),
        displayWidth: item.width,
        darkGray: item.darkGray || false,
        order: i + 1,
      });
      console.log(`  ✓ sponsor "${item.name}" → ${doc._id}`);
    } catch (err) {
      console.error(`  ✗ Failed "${item.name}": ${err.message}`);
    }
  }

  console.log("\n✅ Migration complete! Partners and sponsors are now separate types.\n");
}

main().catch((err) => {
  console.error("\n❌ Migration failed:", err.message);
  process.exit(1);
});
