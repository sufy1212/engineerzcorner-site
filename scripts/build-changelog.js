#!/usr/bin/env node
// Accumulates assets/changelog.json over time — unlike build-recent.js (which
// snapshots only the newest 10 items), this script APPENDS: any page not
// already logged gets added with its real git first-commit date, and existing
// entries are left untouched. Run this after build-recent.js on every deploy
// so the changelog grows into a genuine history instead of resetting.
const fs = require("fs"), path = require("path"), { execSync } = require("child_process"), ROOT = path.join(__dirname, "..");

if (!fs.existsSync(path.join(ROOT, ".git"))) {
  console.error(`
\u2717 ABORTING: no .git folder found at the project root.
  This script needs real git history to compute genuine "first added"
  dates. Run it from your actual git checkout / CI build environment,
  not from an extracted zip.
`);
  process.exit(1);
}

const CONTENT_DIRS = ["electrical","mechanical","hvac","civil","automation","process","solar","general","study-abroad","pm","posts"];
const SKIP_FILES = new Set(["index.html","notes.html","guides.html","comparisons.html","symbols.html","symbol-library.html"]);
const MAX_ENTRIES = 300;
const CATEGORY_LABELS = {
  electrical: "Electrical", mechanical: "Mechanical", hvac: "HVAC", civil: "Civil",
  automation: "Automation", process: "Process", solar: "Solar", pm: "Project Management",
  general: "General Tools", "study-abroad": "Study Abroad", posts: "Blog"
};

function listHtmlFiles(dir) {
  const abs = path.join(ROOT, dir);
  return fs.existsSync(abs)
    ? fs.readdirSync(abs).filter(f => f.endsWith(".html") && !SKIP_FILES.has(f)).map(f => path.join(dir, f))
    : [];
}

function firstCommitDate(relPath) {
  try {
    const out = execSync(`git log --follow --format=%cI --diff-filter=A -- "${relPath}"`, { cwd: ROOT, stdio: ["pipe", "pipe", "ignore"] }).toString().trim();
    const lines = out.split("\n").filter(Boolean);
    return lines.length ? lines[lines.length - 1].slice(0, 10) : null;
  } catch { return null; }
}

function extractTitle(relPath) {
  const html = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let title = h1 ? h1[1] : null;
  if (!title) {
    const t = html.match(/<title>([\s\S]*?)<\/title>/i);
    title = t ? t[1].split(/—|\|/)[0] : relPath;
  }
  return title.replace(/<[^>]+>/g, "").trim();
}

function cleanPathFor(rel) {
  const base = path.basename(rel);
  return rel === "index.html" ? "" : base === "index.html" ? rel.slice(0, -10) : rel.slice(0, -5);
}

const changelogPath = path.join(ROOT, "assets", "changelog.json");
let existing = [];
if (fs.existsSync(changelogPath)) {
  try { existing = JSON.parse(fs.readFileSync(changelogPath, "utf8")); } catch { existing = []; }
}
const known = new Set(existing.map(e => e.u));

let added = 0;
CONTENT_DIRS.forEach(dir => {
  listHtmlFiles(dir).forEach(relPath => {
    const cleanUrl = cleanPathFor(relPath.split(path.sep).join("/"));
    if (known.has(cleanUrl)) return;
    const date = firstCommitDate(relPath);
    if (!date) return; // not yet committed — skip until it lands in history
    existing.push({
      t: extractTitle(relPath),
      u: cleanUrl,
      d: date,
      c: CATEGORY_LABELS[dir] || ""
    });
    known.add(cleanUrl);
    added++;
  });
});

existing.sort((a, b) => new Date(b.d) - new Date(a.d));
if (existing.length > MAX_ENTRIES) existing = existing.slice(0, MAX_ENTRIES);

fs.writeFileSync(changelogPath, JSON.stringify(existing, null, 1));
console.log(`Changelog: added ${added} new entr${added === 1 ? "y" : "ies"}, ${existing.length} total (assets/changelog.json).`);
