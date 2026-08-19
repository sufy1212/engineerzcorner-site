#!/usr/bin/env node
// Fails the build if any page's <link rel="stylesheet"> tags are out of
// order. The site's documented convention (see project notes) is:
//   Google Fonts  ->  common-blocks.css  ->  [page].inline.css  ->  sidebars.css
// Loading a page's own inline.css BEFORE common-blocks.css means shared
// rules can silently override page-specific styles later in the cascade —
// this bit 4 pages sitewide before being caught by hand. This check makes
// sure it can't happen silently again.
//
// Only pages that actually opt into the shared stylesheet stack (i.e. link
// common-blocks.css) are checked — standalone/prototype pages that ship
// their own fully self-contained <style> block are left alone by design.

const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const SKIP_DIRS = new Set(["assets", "scripts", ".git", ".github", "node_modules"]);

const RANK = { font: 0, common: 1, inline: 2, sidebars: 3 };

function classify(href) {
  if (href.includes("fonts.googleapis") || href.includes("fonts.gstatic")) return "font";
  if (href.includes("common-blocks.css")) return "common";
  if (href.includes("sidebars.css")) return "sidebars";
  if (href.endsWith(".inline.css")) return "inline";
  return null; // unrelated stylesheet (e.g. share-result.css, style.css) — not part of this ordering rule
}

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

const files = listAllHtmlFiles();
const violations = [];

for (const rel of files) {
  const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) continue;
  const linkHrefs = [...headMatch[1].matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/gi)].map(m => m[1]);

  const usesSharedStack = linkHrefs.some(h => h.includes("common-blocks.css"));
  if (!usesSharedStack) continue; // standalone page, not subject to this rule

  const ranks = linkHrefs.map(classify).filter(c => c !== null).map(c => RANK[c]);
  const isSorted = ranks.every((r, i) => i === 0 || r >= ranks[i - 1]);
  if (!isSorted) {
    violations.push({ page: rel, order: linkHrefs });
  }
}

if (violations.length > 0) {
  console.error(`\u2717 Found ${violations.length} page(s) with stylesheets out of order (expected: fonts \u2192 common-blocks.css \u2192 [page].inline.css \u2192 sidebars.css):\n`);
  violations.forEach(v => {
    console.error(`  ${v.page}`);
    v.order.forEach(h => console.error(`    ${h}`));
    console.error("");
  });
  process.exit(1);
} else {
  console.log(`\u2713 Checked ${files.length} page(s) — stylesheet load order is correct everywhere it applies.`);
}
