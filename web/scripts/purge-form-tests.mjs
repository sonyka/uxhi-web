/**
 * Purge test submission / membershipApplication documents from Sanity.
 *
 * Deletes by an EXPLICIT ID ALLOWLIST — never by name pattern or date range —
 * so a later re-run against a dataset holding real submissions can't widen its
 * own blast radius.
 *
 * These nine records are all form testing done by the UXHI team in February and
 * April 2026 ("contactus test", "sdfsdf adsfa sdf", and so on). They were the
 * only rows in either type, and they are what made the privacy notice's
 * retention line read as false. See docs/PROJECT-STATE.md.
 *
 * Usage:
 *   node scripts/purge-form-tests.mjs            # dry run (default)
 *   node scripts/purge-form-tests.mjs --commit   # actually delete
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
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

const DELETE = [
  { _id: "llPDZjjzEMLm0bcK1vRrgT", name: "contactus test", type: "submission" },
  { _id: "sM5D4l45bt5xFfQ7DoxCvU", name: "contactus atmadjaja", type: "submission" },
  { _id: "6IFqLXQK07mFWbhNI2510h", name: "sdfsdf adsfa sdf", type: "submission" },
  { _id: "08EUFJXk3wQgRnqiESJUUg", name: "sdf asfas", type: "submission" },
  { _id: "6IFqLXQK07mFWbhNI2kW4C", name: "try 3 asa", type: "submission" },
  { _id: "6IFqLXQK07mFWbhNI2mNKC", name: "try 4 sa", type: "submission" },
  { _id: "6XDwlUNdCITiKS3Wm60jOa", name: "joinus atmadjaja", type: "membershipApplication" },
  { _id: "XSOtUJdPLrriseaWLbZuHt", name: "joinform2 atmadajaj", type: "membershipApplication" },
  { _id: "08EUFJXk3wQgRnqiESOxpm", name: "member test test", type: "membershipApplication" },
];

const commit = process.argv.includes("--commit");
const ids = DELETE.map((d) => d._id);

// Guard: refuse if the dataset holds any submission/application NOT on the
// list. That means real ones have arrived since, and this script is stale.
const strays = await client.fetch(
  `*[_type in ["submission","membershipApplication"] && !(_id in $ids)]{_id, _type}`,
  { ids },
);

if (strays.length > 0) {
  console.error(
    `\n❌ ${strays.length} record(s) exist that are not on the delete list.\n` +
      `   This script is out of date. Review before running:\n` +
      strays.map((s) => `   - ${s._type} ${s._id}`).join("\n") +
      "\n",
  );
  process.exit(1);
}

console.log(`\n${commit ? "DELETING" : "DRY RUN — would delete"} ${DELETE.length} records:\n`);
for (const d of DELETE) console.log(`  ${d.type.padEnd(21)} ${d.name}`);

if (!commit) {
  console.log("\nRe-run with --commit to delete.\n");
  process.exit(0);
}

const tx = DELETE.reduce((t, d) => t.delete(d._id), client.transaction());
await tx.commit();
console.log(`\n✅ Deleted ${DELETE.length} records.\n`);
