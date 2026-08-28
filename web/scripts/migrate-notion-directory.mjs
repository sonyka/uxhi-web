/**
 * Import the UXHI member directory from Notion into Sanity.
 *
 * Notion is the SOURCE OF TRUTH — this is a full replace, not a merge. Re-running
 * it is safe and expected: document IDs are derived from the Notion row id, so a
 * second run updates the same docs rather than duplicating them.
 *
 * Safety properties, in rough order of importance:
 *   - Dry run by default. Nothing is written without --commit or --publish.
 *   - HALTS on any Notion value not in the mapping tables below, rather than
 *     guessing or silently dropping it. Notion's option lists grow over time; a
 *     new option must be a deliberate decision, not a silent data loss.
 *   - Validates every mapping TARGET against components/directory/constants.ts at
 *     startup, so this script cannot drift from the UI's option lists.
 *   - Deletion of the old records is NOT part of this script. Import first, verify
 *     63 landed, then run purge-directory-tests.mjs --include-placeholders.
 *
 * Field mapping, option lists and the archived wholesale Notion taxonomy:
 *   docs/notion-directory-taxonomy.md
 *   docs/notion-directory-migration.md
 *
 * Usage (from the /web directory):
 *   node scripts/migrate-notion-directory.mjs                  # dry run
 *   node scripts/migrate-notion-directory.mjs --verbose        # dry run, per-row detail
 *   node scripts/migrate-notion-directory.mjs --commit         # write as DRAFTS
 *   node scripts/migrate-notion-directory.mjs --publish        # write as PUBLISHED
 *   node scripts/migrate-notion-directory.mjs --limit 3 --commit   # try a few first
 *   node scripts/migrate-notion-directory.mjs --promote        # publish existing drafts
 *
 * --promote is the normal way to publish after a --commit run. It moves the
 * drafts that are already in the dataset to their published ids and does NOT
 * touch Notion — so photos are not re-downloaded and re-uploaded, which would
 * orphan the assets already attached. Use --publish only for a fresh sync.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

// ── Notion identifiers (public, stable) ──────────────────────────────────────
const NOTION_HOST = "https://uxhi.notion.site";
const PAGE_ID = "4ee43831-f57d-4909-801d-c3528de957b6";
const SPACE_ID = "fd0c316e-4782-4c7d-85f0-7dee2c3a93c6";
const COLLECTION_ID = "c22969fd-21e9-4f28-9e41-3e63d3b3696e";
const VIEW_ID_ALL = "f1d2868d-19ee-4d61-882a-ad5f6d2ae999";

// ── Mapping tables ───────────────────────────────────────────────────────────
// Every Notion option that appears on at least one row must have an entry here.
// `null` means "deliberately dropped" — distinct from "unknown", which halts.

const FOCUS_MAP = {
  "Accessibility Design": "accessibility-design",
  "AR/VR Design": "ar-vr-design",
  "Brand Identity": "brand-identity",
  "Content Strategy": "content-strategy",
  DesignOps: "design-ops",
  "Information Architecture": "information-architecture",
  "Interaction Design": "interaction-design",
  "Product Design": "product-design",
  "Product Strategy": "product-strategy",
  "Product Management": "product-management",
  "Service Design": "service-design",
  "UI Design": "ui-design",
  "Usability Evaluation": "usability-evaluation",
  "User Research": "user-research",
  "UX Leadership": "ux-leadership",
  "UX Strategy": "ux-strategy",
  "UX Writing": "ux-writing",
  "Visual Design": "visual-design",
  // folded into a near neighbour
  "Voice User Interface Design": "interaction-design",
  "Marketing / Branding": "brand-identity",
  "Print Design": "brand-identity",
  "User Assistance": "content-strategy",
  // deliberately dropped — not UX disciplines
  "Artificial Intelligence": null,
  "Software Development": null,
  "Business Development": null,
  "AI Consciousness": null,
};

const INDUSTRY_MAP = {
  "Web Design": "web-design",
  "Internet / Technology": "technology",
  "Software Development": "technology",
  "Artificial Intelligence": "technology",
  Telecommunication: "technology",
  "Information Architecture": "technology",
  "Product Design": "technology",
  Education: "education",
  "Marketing / Branding": "marketing-branding",
  Consulting: "consulting",
  Healthcare: "healthcare",
  Biomedical: "healthcare",
  "Travel & Tourism": "travel-tourism",
  Hospitality: "travel-tourism",
  Government: "government",
  "Civic Tech": "government",
  Entertainment: "entertainment",
  "Video Games": "entertainment",
  Finance: "finance",
  Insurance: "finance",
  "Customer Relationship Management": "crm",
  Retail: "retail",
  Restaurants: "food-beverage",
  "Bars & Food": "food-beverage",
  "Restaurants Bars & Food": "food-beverage",
  "Indigenous Tech": "indigenous-tech",
  "Transportation & Logistics": "transportation-logistics",
  Cybersecurity: "cybersecurity",
  Nonprofit: "nonprofit",
  "Non-profit": "nonprofit",
  "Social Impact": "nonprofit",
  Automotive: "automotive",
  "Real Estate": "real-estate",
  Energy: "energy-sustainability",
  "Sustainability & Infrastructure": "energy-sustainability",
  "Energy Sustainability & Infrastructure": "energy-sustainability",
  Aerospace: "aerospace",
  Architecture: "architecture",
  "Museums + Institutions": "arts-culture",
  "Fine Art": "arts-culture",
  Photography: "arts-culture",
  "E-commerce": "ecommerce",
  "Human Resources": "human-resources",
  "Community Management": "other",
};

const ISLAND_MAP = {
  "Oʻahu": "oahu",
  "Big Island": "hawaii",
  Maui: "maui",
  Kauai: "kauai",
  "Molokaʻi": "molokai",
  Lanai: "lanai",
  Mainland: "mainland-international",
};

const EXPERIENCE_MAP = {
  "Student or Transitioning": "student-transitioning",
  "<1 year": "less-than-1-year",
  "1 - 2 years": "1-2-years",
  "3 - 4 years": "3-4-years",
  "5 - 9 years": "5-9-years",
  "10 - 19 years": "10-19-years",
  "20+ years": "20-plus-years",
};

// Island inferred from the free-text Location column, used only when the Island
// column is empty. Checked longest-first so "Big Island" wins over "island".
const LOCATION_ISLAND_HINTS = [
  ["big island", "hawaii"],
  ["kailua-kona", "hawaii"],
  ["honolulu", "oahu"],
  ["waikiki", "oahu"],
  ["waikīkī", "oahu"],
  ["kailua", "oahu"],
  ["kaneohe", "oahu"],
  ["kāneʻohe", "oahu"],
  ["kapolei", "oahu"],
  ["mililani", "oahu"],
  ["oahu", "oahu"],
  ["oʻahu", "oahu"],
  ["waialua", "oahu"],
  ["maunawili", "oahu"],
  ["ewa beach", "oahu"],
  ["laie", "oahu"],
  ["maui", "maui"],
  ["kahului", "maui"],
  ["lahaina", "maui"],
  ["kihei", "maui"],
  ["kaanapali", "maui"],
  ["wailuku", "maui"],
  ["kauai", "kauai"],
  ["kauaʻi", "kauai"],
  ["lihue", "kauai"],
  ["kapaa", "kauai"],
  ["princeville", "kauai"],
  ["volcano", "hawaii"],
  ["holualoa", "hawaii"],
  ["molokai", "molokai"],
  ["molokaʻi", "molokai"],
  ["lanai", "lanai"],
  ["lānaʻi", "lanai"],
  ["hilo", "hawaii"],
];

// Location strings that name an island/state rather than a city — not a `city`.
// Compared with apostrophes stripped, since Notion mixes ʻokina (ʻ), curly (’)
// and straight (') apostrophes for the same place.
const NOT_A_CITY = new Set([
  "hawaii", "hi", "oahu", "maui", "kauai",
  "molokai", "lanai", "big island", "mainland", "usa", "us",
]);

/** Lowercase and strip every apostrophe variant, so Kauaʻi / Kaua’i / Kaua'i all match. */
const deApostrophe = (s) => (s || "").toLowerCase().replace(/[ʻʼ‘’']/g, "").trim();

// ── CLI ──────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const publish = has("--publish");
const promote = has("--promote");
const commit = has("--commit") || publish;
const verbose = has("--verbose");
const limitArg = argv.indexOf("--limit");
const LIMIT = limitArg !== -1 ? parseInt(argv[limitArg + 1], 10) : Infinity;

const fail = (msg) => {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
};

// ── Drift guard: mapping targets must exist in the UI's option lists ─────────
function loadUiOptions() {
  const src = readFileSync(resolve(process.cwd(), "src/components/directory/constants.ts"), "utf-8");
  const grab = (name) => {
    const i = src.indexOf(`export const ${name}`);
    if (i === -1) fail(`Could not find ${name} in constants.ts`);
    const end = src.indexOf("] as const", i);
    return new Set([...src.slice(i, end).matchAll(/value: "([^"]+)"/g)].map((m) => m[1]));
  };
  return {
    focus: grab("FOCUS_OPTIONS"),
    industries: grab("INDUSTRY_OPTIONS"),
    island: grab("ISLAND_OPTIONS"),
    experience: grab("EXPERIENCE_LEVEL_OPTIONS"),
  };
}

function assertNoDrift(ui) {
  const check = (label, map, allowed) => {
    const bad = [...new Set(Object.values(map).filter((v) => v && !allowed.has(v)))];
    if (bad.length) {
      fail(
        `${label} mapping targets missing from constants.ts: ${bad.join(", ")}\n` +
          `   The script and the UI have drifted. Fix constants.ts + the Sanity schema first.`
      );
    }
  };
  check("FOCUS", FOCUS_MAP, ui.focus);
  check("INDUSTRY", INDUSTRY_MAP, ui.industries);
  check("ISLAND", ISLAND_MAP, ui.island);
  check("EXPERIENCE", EXPERIENCE_MAP, ui.experience);
  const islandValues = new Set(Object.values(ISLAND_MAP));
  const badHints = LOCATION_ISLAND_HINTS.filter(([, v]) => !islandValues.has(v)).map(([k]) => k);
  if (badHints.length) fail(`Location hints point at unknown islands: ${badHints.join(", ")}`);
}

// ── Notion extraction ────────────────────────────────────────────────────────
async function notionPost(endpoint, body) {
  const r = await fetch(`${NOTION_HOST}/api/v3/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) fail(`Notion ${endpoint} returned HTTP ${r.status}`);
  return r.json();
}

const plain = (v) => (v ? v.map((seg) => seg[0]).join("") : null);

const fileUrls = (v) => {
  if (!v) return [];
  const urls = [];
  for (const seg of v) for (const d of seg[1] || []) if (d[0] === "a" && d[1]) urls.push(d[1]);
  return urls;
};

async function fetchNotionRows() {
  const chunk = await notionPost("loadPageChunk", {
    pageId: PAGE_ID,
    limit: 200,
    cursor: { stack: [] },
    chunkNumber: 0,
    verticalColumns: false,
  });
  const colRec = chunk.recordMap.collection?.[COLLECTION_ID];
  if (!colRec) fail("Could not read the Notion collection schema — has the page moved?");
  const schema = (colRec.value?.value || colRec.value).schema;
  const pid = {};
  for (const [id, def] of Object.entries(schema)) pid[def.name] = { id, type: def.type };

  const res = await notionPost("queryCollection?src=initial_load", {
    source: { type: "collection", id: COLLECTION_ID, spaceId: SPACE_ID },
    collectionView: { id: VIEW_ID_ALL, spaceId: SPACE_ID },
    loader: {
      type: "reducer",
      reducers: { collection_group_results: { type: "results", limit: 500 } },
      searchQuery: "",
      userTimeZone: "Pacific/Honolulu",
    },
  });
  const blocks = res.recordMap.block;
  const ids = res.result.reducerResults.collection_group_results.blockIds;

  return ids
    .map((id) => {
      const val = blocks[id]?.value?.value || blocks[id]?.value;
      if (!val) return null;
      const p = val.properties || {};
      const get = (name) => p[pid[name]?.id];
      const multi = (name) => {
        const t = plain(get(name));
        return t ? t.split(",").map((s) => s.trim()).filter(Boolean) : [];
      };
      return {
        notionId: val.id,
        name: (plain(get("Name")) || "").trim(),
        jobTitle: plain(get("Job Title")),
        headShot: fileUrls(get("Head Shot")),
        openToWork: plain(get("Open to work")) === "Yes",
        focus: multi("Focus"),
        experience: plain(get("Experience")),
        industry: multi("Industry"),
        island: plain(get("Island")),
        location: plain(get("Location")),
        education: plain(get("Education Institution Attended")),
        bootcamp: plain(get("Bootcamp Attended")),
        linkedIn: plain(get("LinkedIn")),
        website: plain(get("Website")),
      };
    })
    .filter(Boolean);
}

// ── Normalization ────────────────────────────────────────────────────────────
const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

/** Case/punctuation-tolerant lookup, so "Student or transitioning" still matches. */
function lookup(map, value, label, row, problems) {
  if (value in map) return map[value];
  const hit = Object.keys(map).find((k) => norm(k) === norm(value));
  if (hit !== undefined) return map[hit];
  problems.push(`${row.name}: unknown ${label} value "${value}"`);
  return undefined;
}

function parseLocation(row) {
  if (!row.location) return { city: undefined, hintedIsland: undefined };
  const first = row.location.split(",")[0].trim();
  const city = first && !NOT_A_CITY.has(deApostrophe(first)) ? first : undefined;
  const hay = deApostrophe(row.location);
  const hint = [...LOCATION_ISLAND_HINTS]
    .sort((a, b) => b[0].length - a[0].length)
    .find(([needle]) => hay.includes(deApostrophe(needle)));
  return { city, hintedIsland: hint?.[1] };
}

const cleanUrl = (u) => {
  if (!u) return undefined;
  const t = u.trim();
  if (!t) return undefined;
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
};

function normalizeRow(row, problems) {
  const focus = [];
  for (const v of row.focus) {
    const m = lookup(FOCUS_MAP, v, "Focus", row, problems);
    if (m) focus.push(m);
  }
  const industries = [];
  for (const v of row.industry) {
    const m = lookup(INDUSTRY_MAP, v, "Industry", row, problems);
    if (m) industries.push(m);
  }

  let island;
  if (row.island) island = lookup(ISLAND_MAP, row.island, "Island", row, problems);

  let experienceLevel;
  if (row.experience) {
    experienceLevel = lookup(EXPERIENCE_MAP, row.experience, "Experience", row, problems);
  }

  const { city, hintedIsland } = parseLocation(row);
  const islandInferred = !island && !!hintedIsland;
  if (islandInferred) island = hintedIsland;
  // Notion's Island column disagrees with its own Location text. The column
  // wins (it's the structured field), but surface it — it's usually a real
  // data error that should be fixed at the source.
  const islandConflict =
    !islandInferred && island && hintedIsland && island !== hintedIsland
      ? { column: row.island, location: row.location }
      : undefined;

  const education = [row.education, row.bootcamp].map((s) => (s || "").trim()).filter(Boolean).join(" · ");

  return {
    _id: `directory-notion-${row.notionId}`,
    _type: "directoryMember",
    name: row.name,
    title: row.jobTitle?.trim() || "",
    openToWork: row.openToWork,
    focus: [...new Set(focus)],
    experienceLevel,
    industries: [...new Set(industries)],
    island,
    city,
    educationBootcamp: education,
    linkedIn: cleanUrl(row.linkedIn) || "",
    portfolio: cleanUrl(row.website) || "",
    order: 0,
    _meta: { islandInferred, islandConflict, headShot: row.headShot[0], notionId: row.notionId },
  };
}

// ── Photos ───────────────────────────────────────────────────────────────────
const proxyUrl = (s3Url, rowId) =>
  `${NOTION_HOST}/image/${encodeURIComponent(s3Url)}?table=block&id=${rowId}&cache=v2`;

const EXT_MIME = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

async function downloadHeadshot(s3Url, rowId) {
  const r = await fetch(proxyUrl(s3Url, rowId), { redirect: "follow" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const contentType = (r.headers.get("content-type") || "").split(";")[0].trim();
  if (!Object.values(EXT_MIME).includes(contentType)) {
    throw new Error(`unsupported type ${contentType || "unknown"}`);
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (!buf.length) throw new Error("empty response");
  const filename = decodeURIComponent(s3Url.split("/").pop().split("?")[0]) || "headshot";
  return { buf, contentType, filename };
}

function sanityClient() {
  const envPath = resolve(process.cwd(), ".env.local");
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
    if (m) process.env[m[1]] = process.env[m[1]] || m[2];
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) fail("Missing SANITY_API_WRITE_TOKEN in .env.local");
  return createClient({
    projectId: "evh83z0t",
    dataset: "production",
    apiVersion: "2024-01-01",
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  });
}

/**
 * Publish the drafts a previous --commit run created, by copying each to its
 * published id and deleting the draft. Reuses the already-uploaded photo
 * assets, so this is cheap and leaves nothing orphaned.
 */
async function promoteDrafts() {
  const client = sanityClient();
  const drafts = await client.fetch(
    '*[_type == "directoryMember" && _id match "drafts.directory-notion-*"] | order(name asc)'
  );
  if (!drafts.length) fail("No imported drafts found — run --commit first.");

  console.log(`Found ${drafts.length} imported drafts.\n`);
  const tx = client.transaction();
  for (const d of drafts) {
    const { _id, _rev, _createdAt, _updatedAt, ...doc } = d;
    tx.createOrReplace({ ...doc, _id: _id.replace(/^drafts\./, "") });
    tx.delete(_id);
  }
  await tx.commit();

  const published = await client.fetch(
    'count(*[_type == "directoryMember" && _id match "directory-notion-*" && !(_id in path("drafts.**"))])'
  );
  const leftover = await client.fetch(
    'count(*[_type == "directoryMember" && _id match "drafts.directory-notion-*"])'
  );
  console.log(`✅ Published ${published} member records. ${leftover} drafts remaining.`);
  console.log(
    "\nNext: remove the old pre-migration records with\n" +
      "  node scripts/purge-directory-tests.mjs --commit --include-placeholders\n"
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (promote) {
    console.log("\n📤 Publishing imported drafts\n");
    return promoteDrafts();
  }

  const mode = publish ? "PUBLISH" : commit ? "COMMIT (drafts)" : "DRY RUN";
  console.log(`\n${publish || commit ? "📥" : "🔍"} Notion → Sanity directory import — ${mode}\n`);

  const ui = loadUiOptions();
  assertNoDrift(ui);
  console.log(
    `✓ Mapping targets validated against constants.ts ` +
      `(${ui.focus.size} focus, ${ui.industries.size} industry options)`
  );

  const client = commit ? sanityClient() : null;

  console.log("… fetching from Notion");
  const rows = await fetchNotionRows();
  console.log(`✓ ${rows.length} rows\n`);

  // Normalize everything BEFORE writing anything, so an unknown value halts the
  // run while the dataset is still untouched.
  const problems = [];
  const docs = rows.map((r) => normalizeRow(r, problems));

  const unnamed = docs.filter((d) => !d.name);
  if (unnamed.length) problems.push(`${unnamed.length} row(s) have no Name`);

  const seen = new Set();
  for (const d of docs) {
    const k = d.name.toLowerCase();
    if (seen.has(k)) problems.push(`duplicate name in Notion: "${d.name}"`);
    seen.add(k);
  }

  if (problems.length) {
    console.error(`❌ ${problems.length} problem(s) — nothing was written:\n`);
    for (const p of problems) console.error("   • " + p);
    console.error(
      "\n   Unknown values mean Notion gained an option since the mapping was written.\n" +
        "   Add it to the map in this script AND to constants.ts + the Sanity schema,\n" +
        "   then re-run. See docs/notion-directory-taxonomy.md.\n"
    );
    process.exit(1);
  }
  console.log("✓ All Notion values mapped cleanly — no unknowns\n");

  const targets = docs.slice(0, LIMIT);
  if (targets.length < docs.length) {
    console.log(`⚠️  --limit ${LIMIT}: importing ${targets.length} of ${docs.length}\n`);
  }

  // Reporting
  const noPhoto = targets.filter((d) => !d._meta.headShot);
  const inferred = targets.filter((d) => d._meta.islandInferred);
  const noFocus = targets.filter((d) => !d.focus.length);
  const noIsland = targets.filter((d) => !d.island);

  const list = (label, arr) => {
    if (!arr.length) return;
    console.log(`── ${label} (${arr.length}) ──`);
    for (const d of arr) console.log("   · " + d.name);
    console.log("");
  };
  list("No headshot — will show an initials tile", noPhoto);
  list("Island inferred from Location", inferred);
  list("No focus tags", noFocus);
  list("No island — location will not display", noIsland);

  const conflicts = targets.filter((d) => d._meta.islandConflict);
  if (conflicts.length) {
    console.log(`── ⚠️  Island column disagrees with Location (${conflicts.length}) ──`);
    console.log("   Importing the Island column as-is; worth correcting in Notion.");
    for (const d of conflicts) {
      const c = d._meta.islandConflict;
      console.log(`   · ${d.name}: Island="${c.column}" but Location="${c.location}"`);
    }
    console.log("");
  }

  if (verbose) {
    console.log("── Per-row ──");
    for (const d of targets) {
      console.log(
        `   ${d.name} — ${d.title || "(no title)"} — ${[d.city, d.island].filter(Boolean).join(", ") || "(no location)"}` +
          `\n      focus: ${d.focus.join(", ") || "—"}` +
          `\n      industries: ${d.industries.join(", ") || "—"}`
      );
    }
    console.log("");
  }

  if (!commit) {
    console.log(`🔍 Dry run — nothing written. ${targets.length} docs would be created.`);
    console.log("   --commit to write as drafts, --publish to write as published.\n");
    return;
  }

  // Write
  console.log(`── Importing ${targets.length} docs as ${publish ? "PUBLISHED" : "DRAFTS"} ──`);
  let ok = 0;
  const failed = [];
  for (const [i, d] of targets.entries()) {
    const { _meta, ...doc } = d;
    const label = `[${String(i + 1).padStart(2)}/${targets.length}] ${d.name}`;
    try {
      let photo;
      if (_meta.headShot) {
        try {
          const { buf, contentType, filename } = await downloadHeadshot(_meta.headShot, _meta.notionId);
          const asset = await client.assets.upload("image", buf, { filename, contentType });
          photo = {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
            alt: `Headshot of ${d.name}`,
          };
        } catch (e) {
          console.log(`${label}  ⚠️  headshot failed (${e.message}) — importing without`);
        }
      }

      const finalDoc = { ...doc, ...(photo ? { photo } : {}) };
      // Strip undefined so Sanity stores absent rather than null
      for (const k of Object.keys(finalDoc)) if (finalDoc[k] === undefined) delete finalDoc[k];
      if (!finalDoc.focus?.length) delete finalDoc.focus;
      if (!finalDoc.industries?.length) delete finalDoc.industries;

      finalDoc._id = publish ? doc._id : `drafts.${doc._id}`;
      await client.createOrReplace(finalDoc);
      ok++;
      console.log(`${label}  ✓${photo ? "" : "  (no photo)"}`);
    } catch (err) {
      failed.push({ name: d.name, error: err.message });
      console.log(`${label}  ✗ ${err.message}`);
    }
  }

  const total = await client.fetch('count(*[_type == "directoryMember"])');
  console.log(`\n✅ Imported ${ok}/${targets.length}. Dataset now holds ${total} directoryMember docs.`);
  if (failed.length) {
    console.log(`\n⚠️  ${failed.length} failed:`);
    for (const f of failed) console.log(`   · ${f.name}: ${f.error}`);
  }
  console.log(
    "\nNext: verify the imported records in Studio, then remove the old ones with\n" +
      "  node scripts/purge-directory-tests.mjs --commit --include-placeholders\n"
  );
}

main().catch((err) => {
  console.error("\n❌ Import failed:", err.message);
  process.exit(1);
});
