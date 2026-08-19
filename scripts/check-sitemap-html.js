#!/usr/bin/env node
// Keeps sitemap.html (the human-facing site directory page) permanently in
// sync with what's actually on disk. This is the automated fix for the
// recurring "I added a page but forgot to link it in sitemap.html" problem.
//
// What it does, every time it runs (via GitHub Actions on every push):
//   1. Walks every discipline directory and lists the real .html files.
//   2. Parses sitemap.html and finds which of those files are NOT linked
//      yet, per section.
//   3. Auto-inserts a correctly formatted <a> entry for each missing page,
//      in alphabetical order by URL slug, using the page's own <h1>/<title>
//      for the link text.
//   4. Also strips any hardcoded page count from the search placeholder
//      (e.g. "Search all 197 pages...") back to "Search all pages...", so
//      that text can never go stale again either.
//   5. Writes the file back ONLY if something changed, and logs exactly
//      what it added so it's visible in the Action's run log and in the
//      auto-commit diff.
//
// This intentionally mirrors the CONTENT_DIRS / SKIP_FILES conventions
// already used in build-recent.js and build-changelog.js.

const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");

const SITEMAP_PATH = path.join(ROOT, "sitemap.html");

// Directory name doubles as the sitemap section id ("sm-<dir>"), except
// for the two below whose section ids don't match their folder name.
const DIR_TO_SECTION_ID = {
  electrical: "sm-electrical",
  mechanical: "sm-mechanical",
  hvac: "sm-hvac",
  civil: "sm-civil",
  automation: "sm-automation",
  process: "sm-process",
  solar: "sm-solar",
  pm: "sm-pm",
  general: "sm-general",
  "study-abroad": "sm-study-abroad",
  interview: "sm-interview",
  posts: "sm-blog",
};

if (!fs.existsSync(SITEMAP_PATH)) {
  console.log("No sitemap.html found — skipping sitemap-html check.");
  process.exit(0);
}

function listHtmlFiles(dir) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs).filter(f => f.endsWith(".html")).map(f => path.join(dir, f).split(path.sep).join("/"));
}

function cleanPathFor(rel) {
  const base = path.basename(rel);
  return base === "index.html" ? rel.slice(0, -("index.html".length)).replace(/\/$/, "") : rel.slice(0, -5);
}

function extractTitle(relPath) {
  const html = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let title = h1 ? h1[1] : null;
  if (!title) {
    const t = html.match(/<title>([\s\S]*?)<\/title>/i);
    title = t ? t[1].split(/—|\|/)[0] : path.basename(relPath, ".html");
  }
  return title.replace(/<[^>]+>/g, "").trim();
}

let sitemapHtml = fs.readFileSync(SITEMAP_PATH, "utf8");
let totalAdded = 0;
const addedLog = [];

for (const [dir, sectionId] of Object.entries(DIR_TO_SECTION_ID)) {
  const files = listHtmlFiles(dir);
  if (!files.length) continue;

  // Isolate this section's <div class="sm-card-grid">...</div> block.
  const sectionRe = new RegExp(`(<section class="sm-card" id="${sectionId}"[\\s\\S]*?<div class="sm-card-grid">\\n)([\\s\\S]*?)(\\n?\\s*</div>\\s*\\n\\s*</section>)`);
  const match = sitemapHtml.match(sectionRe);
  if (!match) {
    console.warn(`\u26A0 Could not find section #${sectionId} in sitemap.html for directory "${dir}" — skipping.`);
    continue;
  }

  const [, head, body, tail] = match;
  const existingHrefs = new Set([...body.matchAll(/href="([^"]+)"/g)].map(m => m[1].replace(/^\/|\/$/g, "")));

  const missing = files
    .map(rel => ({ rel, slug: cleanPathFor(rel) }))
    .filter(({ slug }) => !existingHrefs.has(slug) && !existingHrefs.has(slug + "/"));

  if (!missing.length) continue;

  const newLines = missing.map(({ rel, slug }) => {
    const title = extractTitle(rel);
    const label = title.toLowerCase();
    const href = slug === dir ? `${dir}/` : slug; // index page keeps trailing slash style used elsewhere
    return `        <a href="${href}" data-label="${label}">${title}</a>`;
  });

  // Merge + re-sort the whole grid alphabetically by href so the file
  // stays consistent no matter how many auto-fix passes run over time.
  const existingLines = body.split("\n").filter(l => l.trim().startsWith("<a "));
  const allLines = [...existingLines, ...newLines];
  const indexLine = allLines.find(l => /href="[^"]*\/?"\s+data-label="[^"]*index/i.test(l) || l.includes(`href="${dir}/"`));
  const rest = allLines.filter(l => l !== indexLine).sort((a, b) => {
    const ha = (a.match(/href="([^"]+)"/) || ["", ""])[1];
    const hb = (b.match(/href="([^"]+)"/) || ["", ""])[1];
    return ha.localeCompare(hb);
  });
  const finalLines = indexLine ? [indexLine, ...rest] : rest;

  sitemapHtml = sitemapHtml.slice(0, match.index) + head + finalLines.join("\n") + tail + sitemapHtml.slice(match.index + match[0].length);

  totalAdded += missing.length;
  missing.forEach(({ rel }) => addedLog.push(`  + ${rel} → #${sectionId}`));
}

// Self-heal the search placeholder so a hardcoded count can't go stale again.
const staleSearchRe = /(placeholder=")Search all \d+ pages\.\.\.(")/;
if (staleSearchRe.test(sitemapHtml)) {
  sitemapHtml = sitemapHtml.replace(staleSearchRe, "$1Search all pages...$2");
  console.log("Fixed stale hardcoded page count in the search placeholder.");
}

if (totalAdded > 0) {
  fs.writeFileSync(SITEMAP_PATH, sitemapHtml);
  console.log(`\u2713 Auto-added ${totalAdded} missing page(s) to sitemap.html:`);
  addedLog.forEach(l => console.log(l));
} else {
  console.log("sitemap.html is already in sync with every discipline directory. Nothing to do.");
}
