#!/usr/bin/env node
// Checks every page's <title> and <meta name="description"> tags.
//
// Two different severities, on purpose:
//
//   MISSING/EMPTY tag  -> hard failure, fails the build.
//     A page with no title or no description is a real, unambiguous bug —
//     it shows up broken in search results and browser tabs. This should
//     never happen and is cheap to always keep at zero.
//
//   TOO LONG (title > 60 chars, description > 160 chars) -> reported, but
//     does NOT fail the build.
//     These are Google's typical search-result truncation points, so a
//     longer tag isn't broken, just risks being cut off. At the time this
//     check was written the site already had ~90 older post pages past
//     160 characters — pre-existing content debt, not a new regression —
//     so failing the build on length would block every future push until
//     someone rewrites all of them. Reporting it here keeps the debt
//     visible (and stops new pages from adding to it, if whoever's
//     pushing reads the log) without blocking unrelated work.
//     Once the backlog below is cleared, flip TOO_LONG to fail the build
//     too by moving its check into the `hardFailures` list.

const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const SKIP_DIRS = new Set(["assets", "scripts", ".git", ".github", "node_modules"]);
const TITLE_MAX = 60;
const DESC_MAX = 160;

function listAllHtmlFiles() {
  const results = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(rel);
      } else if (entry.name.endsWith(".html")) {
        results.push(rel.split(path.sep).join("/"));
      }
    }
  })(".");
  return results;
}

function decodeEntities(s) {
  return s.replace(/&amp;/g, "&").replace(/&mdash;/g, "—").replace(/&ndash;/g, "–");
}

function isNoindex(html) {
  return /<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"/i.test(html);
}

// Attribute order on <meta> tags isn't guaranteed (some pages write
// name="description" content="..." and others content="..."
// name="description"), so match a whole <meta ...> tag first, then pull
// the content attribute out of it — order-agnostic either way.
function getMetaDescription(html) {
  const tag = html.match(/<meta\s+[^>]*name="description"[^>]*>/i);
  if (!tag) return null;
  const content = tag[0].match(/content="([^"]*)"/i);
  return content ? content[1] : null;
}

function getTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1] : null;
}

const files = listAllHtmlFiles();
const hardFailures = [];
const lengthWarnings = [];

for (const rel of files) {
  const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  if (isNoindex(html)) continue; // draft/preview pages are exempt, same as check-orphan-pages.js

  const rawTitle = getTitle(html);
  const rawDesc = getMetaDescription(html);
  const title = rawTitle ? decodeEntities(rawTitle).trim() : null;
  const desc = rawDesc ? decodeEntities(rawDesc).trim() : null;

  if (!title) hardFailures.push({ page: rel, issue: "missing or empty <title>" });
  if (!desc) hardFailures.push({ page: rel, issue: 'missing or empty <meta name="description">' });

  if (title && title.length > TITLE_MAX) {
    lengthWarnings.push({ page: rel, issue: `title is ${title.length} chars (over ${TITLE_MAX}): "${title}"` });
  }
  if (desc && desc.length > DESC_MAX) {
    lengthWarnings.push({ page: rel, issue: `description is ${desc.length} chars (over ${DESC_MAX})` });
  }
}

if (lengthWarnings.length > 0) {
  console.log(`\u26A0 ${lengthWarnings.length} page(s) have a title/description over the recommended length (reported, not blocking):`);
  lengthWarnings.forEach(w => console.log(`  ${w.page}\n    -> ${w.issue}`));
  console.log("");
}

if (hardFailures.length > 0) {
  console.error(`\u2717 Found ${hardFailures.length} missing/empty title or description:\n`);
  hardFailures.forEach(f => console.error(`  ${f.page}\n    -> ${f.issue}\n`));
  process.exit(1); // fail CI so this can't ship silently
} else {
  console.log(`\u2713 Checked ${files.length} page(s) — every page has a title and description.`);
}
