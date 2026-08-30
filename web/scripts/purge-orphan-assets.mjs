/**
 * Delete unreferenced (orphaned) image assets from Sanity.
 *
 * Deletes by an EXPLICIT ID ALLOWLIST, matching purge-directory-tests.mjs —
 * never by pattern — so re-running this later cannot widen its own blast radius.
 *
 * Scope: every id below was confirmed unreferenced by any document, and traced
 * to a superseded or discarded original before being listed.
 *   - personal / test uploads
 *   - committee + value icons, superseded by the SVGs in public/images/icons
 *   - community photo tiles, superseded by the 13 currently in use
 *   - sponsor + partner logos, superseded by the assets those docs now point at
 *
 * NOT included: seven member/conference headshots. Each belongs to a real
 * person, so they are left for a human to confirm.
 *
 * Usage:
 *   node scripts/purge-orphan-assets.mjs            # dry run (default)
 *   node scripts/purge-orphan-assets.mjs --commit   # actually delete
 */

import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { homedir } from "os";

const envPath = resolve(process.cwd(), ".env.local");
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const m = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
  if (m) process.env[m[1]] = process.env[m[1]] || m[2];
}

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("\nMissing SANITY_API_WRITE_TOKEN in .env.local\n");
  process.exit(1);
}

const client = createClient({
  projectId: "evh83z0t",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// [assetId, originalFilename]
const DELETE = [
  ["image-c04cb3b62a88150662a13ec51545e6afee8f9680-512x512-png", "icon-communications.png"], // icon, 31 KB
  ["image-8915adf33a53116ba31192ad6d6804f9d2e4723a-512x512-png", "icon-community-engagement.png"], // icon, 25 KB
  ["image-f3d4ddb4ff8cb27126e895f044e7cb72bba04b33-512x512-png", "icon-community.png"], // icon, 43 KB
  ["image-85f7144e43052d443a8bcac4b259f6d2f2593590-512x512-png", "icon-conference.png"], // icon, 42 KB
  ["image-beb74ec9df2880fbe2e4bab10208e41d3a3d6997-512x512-png", "icon-educational-outreach.png"], // icon, 54 KB
  ["image-c5fa66e04d26cb1bf17622032e608bc3417f275d-512x512-png", "icon-empowerment.png"], // icon, 41 KB
  ["image-0dab071f47b7110976d7a673b1654feed32599df-512x512-png", "icon-inspire.png"], // icon, 42 KB
  ["image-50595672f10677d8983edb925cdf435c2561d088-512x512-png", "icon-professional-development.png"], // icon, 16 KB
  ["image-229d310ffddf8c5b4d66cea464c187b804fcdc2f-512x512-png", "icon-service.png"], // icon, 51 KB
  ["image-e8f858368e80fdd7a80dcde4003283b293aff417-512x512-png", "icon-workforce-outreach.png"], // icon, 42 KB
  ["image-b6e3e0055246ca9950a676cfb327ef30fe33e7bc-1271x745-png", "Acquired-Brand_ANTHOLOGY_Logo_Outlines_RGB.png"], // logo, 39 KB
  ["image-59c1791a8f6b8e1458f87f375d06fc5edc69abe7-400x123-svg", "htdcLogo.svg"], // logo, 4 KB
  ["image-494d7680b8febf444486586509efe57ace76af8c-202x188-png", "PurpleMaiaLogo.png"], // logo, 16 KB
  ["image-d7ebd532b0db2eee5665153b43ab424594e34cbc-800x159-png", "PurpleMaiaLogoHoriz.png"], // logo, 13 KB
  ["image-35198aa84268cefb53fb668ce934b2c4666e027c-500x100-png", "PurpleMaiaLogoHoriz.png"], // logo, 8 KB
  ["image-6f2f972435765b6a343bbeaf667c012d5cfe8de8-400x122-png", "SandboxLogo.png"], // logo, 7 KB
  ["image-2db67ffea2569143e2eef6193cd2ec19d2b58cf4-2448x2448-jpg", "2014-06-07 07.05.06.jpg"], // personal, 685 KB
  ["image-e35eb38ce5cd9645540f6288f042e61dcd565a2f-864x1872-jpg", "7e742f3f-8308-4f6c-8f5e-793e5bcbc96e.jpg"], // personal, 124 KB
  ["image-791bf3e76aec702e84ffa6b114b7d2eb3b3335a7-3024x4032-jpg", "\\[EWAXCVBNM,.:.jpg.jpg"], // personal, 896 KB
  ["image-b7270c8332c1bddd856248e5e06d77cb3c441746-1024x683-webp", "Black History Month Flyer.webp"], // personal, 38 KB
  ["image-87dfd6ac59c2c9d8515c5ea5768cc74a392dd64f-512x512-png", "Browser.png"], // personal, 103 KB
  ["image-44d4092475e684808f5d52ec8acb8b079c15ab04-735x978-jpg", "IMG_1367.JPG"], // personal, 162 KB
  ["image-1b8c4e7dd339368a511fecb63b8cda3d2bc0c914-3024x4032-jpg", "IMG_2870.jpg"], // personal, 1724 KB
  ["image-a3f94ce11cc22d0bbb957d3c7ceee2e0615ba105-3024x4032-jpg", "IMG_2871.jpg"], // personal, 1746 KB
  ["image-fd45c221d60fa730342f9591d9128ba75b0478e3-1170x2532-png", "IMG_3823.PNG"], // personal, 9479 KB
  ["image-01140475c4448071c81a304f548458e7a75e9b45-480x640-jpg", "IMG_6513.jpeg"], // personal, 91 KB
  ["image-95127daaf4ec6a4eaef1590e9a7ae06254748c37-3024x4032-jpg", "IMG_7022.jpg"], // personal, 2071 KB
  ["image-2124e2a017311d7254b25ca050a84a3d9396468c-2105x1600-png", "Layer_1.png"], // personal, 125 KB
  ["image-46737ffbe5025a8995eb0236fa3bdf1c32440851-2400x1826-webp", "StockX BHM Branding.webp"], // personal, 959 KB
  ["image-3ea8e911e1d285e4ff43cdd2b726e0e376c8ef5e-200x200-jpg", "test-photo.jpg"], // personal, 1 KB
  ["image-e5e02b4b600ca042e05d0240fbd58a53343720d4-540x675-png", "tile01.png"], // tile, 701 KB
  ["image-cd679f52b2fd91ad8de433a38862f6ba50e55613-540x675-png", "tile01.png"], // tile, 277 KB
  ["image-135417fe1debe347640433aec85791907b97684c-540x675-png", "tile05.png"], // tile, 146 KB
  ["image-5f358fa4e45688f48367de9002fa51e44f84915f-540x675-png", "tile06.png"], // tile, 154 KB
  ["image-576163e4a1427092d166e18f9cf00939c071496b-540x675-png", "tile07.png"], // tile, 165 KB
  ["image-8c10112c0c466517048d8cc0dd6d7d1a3c7d315d-540x675-png", "tile08.png"], // tile, 130 KB
];

const commit = process.argv.includes("--commit");

const run = async () => {
  console.log("\n" + DELETE.length + " orphaned assets targeted.\n");

  const ids = DELETE.map(([id]) => id);
  const stillOrphaned = await client.fetch(
    "*[_id in $ids && count(*[references(^._id)]) == 0]._id",
    { ids }
  );
  const nowReferenced = ids.filter((id) => !stillOrphaned.includes(id));
  if (nowReferenced.length) {
    console.error("Refusing to run — these are referenced now:", nowReferenced);
    process.exit(1);
  }
  console.log("Re-verified: all " + ids.length + " still unreferenced.\n");

  if (!commit) {
    for (const [, name] of DELETE) console.log("  would delete  " + name);
    console.log("\nDry run. Re-run with --commit to delete.\n");
    return;
  }

  const backup = await client.fetch("*[_id in $ids]", { ids });
  const backupPath = resolve(
    homedir(),
    "Documents/FREELANCE/UXHI/orphan-assets-backup-2026-08-29.json"
  );
  writeFileSync(backupPath, JSON.stringify(backup, null, 2));
  console.log("Backed up " + backup.length + " asset records to " + backupPath + "\n");

  let ok = 0;
  const failed = [];
  for (const [id, name] of DELETE) {
    try {
      await client.delete(id);
      ok++;
      console.log("  deleted  " + name);
    } catch (e) {
      failed.push([name, e.message]);
      console.log("  FAILED   " + name + " — " + e.message);
    }
  }
  console.log("\nDeleted " + ok + "/" + DELETE.length + ".");
  if (failed.length) console.log("Failed:", failed);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
