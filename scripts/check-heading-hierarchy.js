#!/usr/bin/env node
// Fails the build if a page's headings skip a level — h1 straight to h3,
// h2 straight to h4, etc. check-h1.js already guarantees exactly one h1
// per page; this catches the next layer of the same problem.
//
// Found this live on the site: several UI elements were using a heading
// tag purely to get its default font size/weight rather than to mark a
// real section of the document — a "Contact me" CTA box, game-card
// titles, footer nav columns, and "add new item" form labels inside
// interactive builder tools all skipped straight from h1 to h3 (or h2 to
// h4) with nothing at the level in between. A sighted user never notices
// (the text still looks fine), but a screen reader user navigating by
// heading level hits a gap that makes the page harder to scan, and it's
// a minor on-page SEO signal too.
//
// This check only looks at level structure (does a jump skip a rank),
// not visual styling — fixing a real flag means either promoting the
// skipped-past element to close the gap, or (as done on this site) giving
// the "heading used as a style hook" element a dedicated CSS class and
// promoting its tag so it fits the real outline without changing how it
// looks.

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
  // Strip script/comment content so text inside them (e.g. a JS template
  // string containing "<h3>") never gets counted as a real heading.
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<!--[\s\S]*?-->/g, "");

  const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map(m => parseInt(m[1], 10));
  if (levels.length === 0) continue;

  let prev = 0;
  for (const level of levels) {
    if (prev > 0 && level > prev + 1) {
      problems.push({ page: rel, issue: `heading jumps from h${prev} to h${level} with nothing in between` });
    }
    prev = level;
  }
}

if (problems.length > 0) {
  console.error(`\u2717 Found ${problems.length} skipped heading level(s):\n`);
  problems.forEach(p => console.error(`  ${p.page}\n    -> ${p.issue}\n`));
  process.exit(1); // fail CI so this can't ship silently
} else {
  console.log(`\u2713 Checked ${files.length} page(s) — no skipped heading levels found.`);
}
