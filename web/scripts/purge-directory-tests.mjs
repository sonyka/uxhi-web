/**
 * Purge test/junk directoryMember documents from Sanity.
 *
 * Deletes by an EXPLICIT ID ALLOWLIST — never by name pattern — so this script
 * can't widen its own blast radius if someone re-runs it later against a dataset
 * that has since filled up with real members.
 *
 * Real profiles are listed in KEEP below purely as documentation; the script
 * never touches anything that isn't in DELETE.
 *
 * Backup of all 17 pre-purge docs:
 *   /Users/sonyka/Documents/FREELANCE/UXHI/directory-backup-2026-08-27.json
 *
 * Usage:
 *   node scripts/purge-directory-tests.mjs            # dry run (default)
 *   node scripts/purge-directory-tests.mjs --commit   # actually delete
 *   node scripts/purge-directory-tests.mjs --commit --include-placeholders
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

// Pre-migration profiles, superseded by the Notion import (2026-08-28).
// Notion is the source of truth: Sony's profile now comes from Notion under a
// `directory-notion-*` id, and Gustavo was confirmed not to be a member.
// Deleted together with the placeholders, behind the same flag and guard.
const PRE_MIGRATION = [
  { _id: "1ae609c1-2d31-4599-98fe-a10b9a7585b2", name: "Sony Atmadjaja", why: "superseded by the Notion-imported record" },
  { _id: "6d76b8bb-dc6c-49b8-94f2-d70db34a8518", name: "Gustavo Ambrozio", why: "not in Notion; confirmed not a member" },
];

// Nothing is protected unconditionally any more — the guard below (imported
// records must already be live) is what prevents emptying the directory.
const KEEP = [];

// Unambiguous test junk — fake names, keyboard mashes, form-test submissions.
const DELETE = [
  { _id: "8a15cd98-5f43-4621-ab76-789c40639856", name: "Lani Atmadjaja sdfdsf ", why: "keyboard mash in name; title 'Doggie in Chief'" },
  { _id: "31132320-8a7f-4db6-b90c-8cd0306ebddd", name: "Bobby Joe", why: "fake name; title 'Xero Boss'" },
  { _id: "6415df08-eb51-43d1-b58d-adb5bd40d58e", name: "Lani banani", why: "fake name; title 'Cheese monger'" },
  { _id: "directory-1770495472547", name: "Test User", why: "form test submission" },
  { _id: "directory-1770495984105", name: "sanity test", why: "form test submission" },
  { _id: "directory-1770510488224", name: "Test User", why: "form test submission (duplicate)" },
  { _id: "directory-1770532350728", name: "dlfkj asdfa", why: "keyboard mash in name and title" },
  { _id: "directory-1770581057645", name: "finduxpro test", why: "form test submission" },
  { _id: "directory-1770584832968", name: "memberdirectory atmadjaja", why: "form test submission; title 'sdlkf'" },
  { _id: "directory-1772319168334", name: "island test", why: "island-filter test; linkedIn points at google.com" },
  { _id: "drafts.directory-1776391236535", name: "test  member directory", why: "form test submission (draft)" },
];

// Seeded demo rows (order 900-903, shared placeholder photo). Deliberately
// created to populate the grid for review — deleted only with --include-placeholders.
const PLACEHOLDERS = [
  { _id: "qEcETyhJpLY4DZsj0JbvC1", name: "Placeholder Member 1", why: "seeded demo row" },
  { _id: "qEcETyhJpLY4DZsj0JbvE3", name: "Placeholder Member 2", why: "seeded demo row" },
  { _id: "qEcETyhJpLY4DZsj0JbvG5", name: "Placeholder Member 3", why: "seeded demo row" },
  { _id: "qEcETyhJpLY4DZsj0JbvI7", name: "Placeholder Member 4", why: "seeded demo row" },
];

const commit = process.argv.includes("--commit");
const includePlaceholders = process.argv.includes("--include-placeholders");
const targets = includePlaceholders
  ? [...DELETE, ...PLACEHOLDERS, ...PRE_MIGRATION]
  : DELETE;

// Removing the placeholders and pre-migration records is only safe once the
// Notion import is live — otherwise the directory would be left empty.
const MIN_IMPORTED = 60;

async function main() {
  console.log(`\n${commit ? "🗑  PURGE" : "🔍 DRY RUN"} — directoryMember cleanup\n`);

  // Verify current state before touching anything
  const live = await client.fetch('*[_type == "directoryMember"]{ _id, name }');
  const liveIds = new Set(live.map((d) => d._id));
  console.log(`Dataset currently holds ${live.length} directoryMember docs.\n`);

  // Guard: refuse to delete anything on the KEEP list
  const collision = targets.filter((t) => KEEP.some((k) => k._id === t._id));
  if (collision.length) {
    console.error("❌ Abort: delete list overlaps the keep list:", collision);
    process.exit(1);
  }

  // Guard: never strip the directory back to empty.
  if (includePlaceholders) {
    const imported = await client.fetch(
      'count(*[_type == "directoryMember" && _id match "directory-notion-*" && !(_id in path("drafts.**"))])'
    );
    console.log(`Published Notion-imported members: ${imported}`);
    if (imported < MIN_IMPORTED) {
      console.error(
        `\n❌ Abort: only ${imported} imported members are published (need ≥ ${MIN_IMPORTED}).\n` +
          `   Removing the placeholders now would leave the directory near-empty.\n` +
          `   Run the import first:  node scripts/migrate-notion-directory.mjs --commit && … --promote\n`
      );
      process.exit(1);
    }
    console.log("  ✓ Import is live — safe to remove the pre-migration records\n");
  }

  if (KEEP.length) {
    console.log("── Keeping ──");
    for (const k of KEEP) {
      console.log(`  ✓ ${k.name}${liveIds.has(k._id) ? "" : "   ⚠️  NOT FOUND IN DATASET"}`);
    }
  }

  console.log(`\n── Deleting (${targets.length}) ──`);
  const missing = [];
  for (const t of targets) {
    if (!liveIds.has(t._id)) {
      missing.push(t);
      console.log(`  – ${t.name}  ⚠️  already gone, skipping`);
      continue;
    }
    console.log(`  ✗ ${t.name}  — ${t.why}`);
  }

  if (!includePlaceholders) {
    const held = [...PLACEHOLDERS, ...PRE_MIGRATION];
    console.log(`\n── Left in place (${held.length}) ──`);
    for (const p of held) console.log(`  · ${p.name} — ${p.why}`);
    console.log("  Re-run with --include-placeholders to remove these too.");
  }

  const toDelete = targets.filter((t) => liveIds.has(t._id));

  if (!commit) {
    console.log(`\n🔍 Dry run — nothing was deleted. ${toDelete.length} docs would be removed.`);
    console.log("   Re-run with --commit to execute.\n");
    return;
  }

  const tx = client.transaction();
  for (const t of toDelete) tx.delete(t._id);
  await tx.commit();

  const after = await client.fetch('*[_type == "directoryMember"]{ _id, name } | order(name asc)');
  console.log(`\n✅ Deleted ${toDelete.length} docs. ${after.length} directoryMember docs remain:`);
  for (const d of after) console.log(`   · ${d.name}`);
  console.log(
    "\nNote: the image assets those docs referenced are now unreferenced but still stored.\n" +
      "Clean them up in Studio (Vision/Assets) if you want the space back.\n"
  );
}

main().catch((err) => {
  console.error("\n❌ Purge failed:", err.message);
  process.exit(1);
});
