#!/usr/bin/env node
// Fails the build if any discipline's tool cards reuse a tool number
// (e.g. two cards both stamped "MH.06" on mechanical/index.html). Each
// <div class="tool-card-num"> on a discipline hub is supposed to be a
// unique ID within that page — a duplicate almost always means one card
// was copy-pasted for a new tool and its number never got updated, so the
// two tools become indistinguishable in links, notes, and cross-references.
//
// Scans every top-level */index.html that actually uses tool-card-num
// (some hub pages, like notes/ and posts/, don't use the scheme at all
// and are skipped automatically since they'll just have zero matches).

const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const SKIP_DIRS = new Set(["assets", "scripts", ".git", ".github", "node_modules"]);

function listDisciplineIndexFiles() {
  return fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(e => e.isDirectory() && !SKIP_DIRS.has(e.name) && !e.name.startsWith("."))
    .map(e => path.join(e.name, "index.html"))
    .filter(rel => fs.existsSync(path.join(ROOT, rel)));
}

const files = listDisciplineIndexFiles();
const problems = [];
let totalNumbers = 0;

for (const rel of files) {
  const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const nums = [...html.matchAll(/<div\s+class="tool-card-num">([^<]+)<\/div>/g)].map(m => m[1].trim());
  if (nums.length === 0) continue; // page doesn't use the tool-card-num scheme

  totalNumbers += nums.length;
  const seen = new Map(); // number -> count
  for (const n of nums) seen.set(n, (seen.get(n) || 0) + 1);

  for (const [num, count] of seen) {
    if (count > 1) problems.push({ page: rel, num, count });
  }
}

if (problems.length > 0) {
  console.error(`\u2717 Found ${problems.length} duplicate tool number(s):\n`);
  problems.forEach(p => console.error(`  ${p.page}\n    -> "${p.num}" used ${p.count} times\n`));
  process.exit(1); // fail CI so this can't ship silently
} else {
  console.log(`\u2713 Checked ${totalNumbers} tool number(s) across ${files.length} discipline page(s) — no duplicates found.`);
}
