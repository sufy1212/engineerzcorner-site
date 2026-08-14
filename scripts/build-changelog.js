#!/usr/bin/env node
// Keeps assets/changelog.json current for BOTH new pages and edits to
// existing ones. Unlike a "first added" log, this uses each page's latest
// commit date (same signal build-recent.js already uses) — so editing an
// existing calculator bumps it back to the top of the changelog, not just
// creating a new one. Existing entries are updated in place when a page's
// latest commit date moves forward; nothing is silently dropped.
const fs = require("fs"), path = require("path"), { execSync } = require("child_process"), ROOT = path.join(__dirname, "..");

if (!fs.existsSync(path.join(ROOT, ".git"))) {
  console.error(`
\u2717 ABORTING: no .git folder found at the project root.
  This script needs real git history to compute genuine dates. Run it
  from your actual git checkout / CI build environment, not from an
  extracted zip.
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

// Latest commit date touching this path — same signal build-recent.js uses.
// Reflects edits, not just creation, so a modified page's date moves forward.
function latestCommitDate(relPath) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, { cwd: ROOT, stdio: ["pipe", "pipe", "ignore"] }).toString().trim();
    return out ? out.slice(0, 10) : null;
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
const byUrl = new Map(existing.map(e => [e.u, e]));

let added = 0, updated = 0;
CONTENT_DIRS.forEach(dir => {
  listHtmlFiles(dir).forEach(relPath => {
    const cleanUrl = cleanPathFor(relPath.split(path.sep).join("/"));
    const date = latestCommitDate(relPath);
    if (!date) return; // not yet committed — skip until it lands in history

    const prior = byUrl.get(cleanUrl);
    if (!prior) {
      const entry = { t: extractTitle(relPath), u: cleanUrl, d: date, c: CATEGORY_LABELS[dir] || "", a: "added" };
      byUrl.set(cleanUrl, entry);
      added++;
    } else if (prior.d !== date) {
      prior.d = date;
      prior.t = extractTitle(relPath); // pick up a retitle too
      prior.a = "updated";
      updated++;
    }
  });
});

let result = Array.from(byUrl.values());
result.sort((a, b) => new Date(b.d) - new Date(a.d));
if (result.length > MAX_ENTRIES) result = result.slice(0, MAX_ENTRIES);

fs.writeFileSync(changelogPath, JSON.stringify(result, null, 1));
console.log(`Changelog: ${added} new, ${updated} updated, ${result.length} total (assets/changelog.json).`);
