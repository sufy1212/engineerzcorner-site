#!/usr/bin/env node
// Keeps the <nav class="site-nav"> block in sync on every page, sitewide.
// This is the automated fix for the recurring "added a new discipline link
// and forgot to propagate it to 100+ pages" bug (e.g. the Project
// Management + Interview Prep links that went missing sitewide before).
//
// How it works:
//   1. CANONICAL_LINKS below is the single source of truth for what the
//      site nav should contain, in order. Add a new discipline here once,
//      and every page on the site picks it up automatically on next push.
//   2. For every .html file, it finds the <nav class="site-nav">...</nav>
//      block (if present) and rebuilds it from CANONICAL_LINKS, preserving
//      which link should get class="current" based on the file's own path.
//   3. Href depth (./ vs ../) is inferred from how deep the file lives
//      relative to site root, so it works for root pages (about.html) and
//      one-level-deep discipline pages (electrical/xyz.html) alike.
//   4. Only writes a file if its nav block actually changed.
//
// If a page has no site-nav block at all (e.g. some standalone game/tool
// pages by design), it's left alone — this script never adds a nav to a
// page that didn't have one, it only fixes existing ones.

const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");

// slug -> label. "" slug means the site root ("Home").
const CANONICAL_LINKS = [
  ["", "Home"],
  ["electrical/", "Electrical"],
  ["mechanical/", "Mechanical"],
  ["hvac/", "HVAC"],
  ["civil/", "Civil"],
  ["automation/", "Automation"],
  ["process/", "Process"],
  ["solar/", "Solar"],
  ["pm/", "Project Management"],
  ["general/", "General Tools"],
  ["study-abroad/", "Study Abroad"],
  ["interview/", "Interview Prep"],
];

const SKIP_DIRS = new Set(["assets", "scripts", ".git", ".github", "node_modules"]);

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

function depthOf(relPath) {
  // "about.html" -> 0, "electrical/x.html" -> 1, "electrical/sub/x.html" -> 2
  return relPath.split("/").length - 1;
}

function prefixFor(depth) {
  return depth === 0 ? "" : "../".repeat(depth);
}

// Which canonical link (by slug) should be marked current for this file.
function currentSlugFor(relPath) {
  if (relPath === "index.html") return "";
  const top = relPath.split("/")[0];
  const match = CANONICAL_LINKS.find(([slug]) => slug === top + "/");
  return match ? match[0] : null; // null = none should be marked current
}

function buildNav(relPath) {
  const depth = depthOf(relPath);
  const prefix = prefixFor(depth);
  const currentSlug = currentSlugFor(relPath);
  const lines = CANONICAL_LINKS.map(([slug, label]) => {
    const isCurrent = slug === currentSlug;
    // The current section always self-references with "./" regardless of
    // depth (matches the site's existing hand-written convention) — every
    // other link uses the normal depth-prefixed path.
    const href = isCurrent ? "./" : (slug === "" ? (prefix || "./") : prefix + slug);
    const cls = isCurrent ? ` class="current"` : "";
    return `  <a href="${href}"${cls}>${label}</a>`;
  });
  return `<nav class="site-nav" aria-label="Main navigation">\n  <div class="site-nav-inner">\n${lines.join("\n")}\n</div>\n</nav>`;
}

const files = listAllHtmlFiles();
let fixedCount = 0;
const fixedLog = [];

for (const rel of files) {
  const abs = path.join(ROOT, rel);
  const html = fs.readFileSync(abs, "utf8");
  const navRe = /<nav class="site-nav"[\s\S]*?<\/nav>/;
  const match = html.match(navRe);
  if (!match) continue; // page has no site-nav block by design — leave it alone

  const correctNav = buildNav(rel);
  if (match[0] !== correctNav) {
    const updated = html.slice(0, match.index) + correctNav + html.slice(match.index + match[0].length);
    fs.writeFileSync(abs, updated);
    fixedCount++;
    fixedLog.push(rel);
  }
}

if (fixedCount > 0) {
  console.log(`\u2713 Rebuilt the site-nav block on ${fixedCount} page(s) to match the canonical link set:`);
  fixedLog.forEach(f => console.log(`  ${f}`));
} else {
  console.log(`site-nav is already in sync on all ${files.length} page(s). Nothing to do.`);
}
