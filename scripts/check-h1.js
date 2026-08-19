#!/usr/bin/env node
// Fails the build if any page has zero <h1> tags or more than one. Every
// page should have exactly one H1 — missing it usually means a template
// was cloned and the heading got deleted or commented out by accident;
// having two usually means a copy-paste left a stray one in, which hurts
// both accessibility and SEO (search engines expect one clear page title).

const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
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

const files = listAllHtmlFiles();
const problems = [];

for (const rel of files) {
  let html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  // Strip <script> content so a JS string containing "<h1" isn't counted.
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const count = (html.match(/<h1[\s>]/gi) || []).length;
  if (count === 0) problems.push({ page: rel, issue: "no <h1> found" });
  else if (count > 1) problems.push({ page: rel, issue: `${count} <h1> tags found (expected exactly 1)` });
}

if (problems.length > 0) {
  console.error(`\u2717 Found ${problems.length} page(s) with an H1 problem:\n`);
  problems.forEach(p => console.error(`  ${p.page} — ${p.issue}`));
  process.exit(1);
} else {
  console.log(`\u2713 Checked ${files.length} page(s) — every page has exactly one <h1>.`);
}
