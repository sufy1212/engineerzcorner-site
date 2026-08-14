#!/usr/bin/env node
// Regenerates assets/search-index.json by scanning every published .html page.
// Run this after adding/removing pages (alongside build-recent.js).
const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");

const SKIP_DIRS = new Set(["assets", "scripts", ".git"]);
const CATEGORY_LABELS = {
  electrical: "Electrical", mechanical: "Mechanical", hvac: "HVAC", civil: "Civil",
  automation: "Automation", process: "Process", solar: "Solar", pm: "Project Management",
  general: "General Tools", "study-abroad": "Study Abroad", interview: "Interview Prep",
  posts: "Blog", notes: "Notes"
};

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "\u2014", ndash: "\u2013", hellip: "\u2026",
  lsquo: "\u2018", rsquo: "\u2019", ldquo: "\u201C", rdquo: "\u201D",
  copy: "\u00A9", reg: "\u00AE", trade: "\u2122"
};
function unescapeHtml(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => (name in NAMED_ENTITIES ? NAMED_ENTITIES[name] : m));
}
function normWs(s) { return s.replace(/\s+/g, " ").trim(); }

function cleanPathFor(rel) {
  const base = path.basename(rel);
  if (rel === "index.html") return "";
  if (base === "index.html") return rel.slice(0, -"index.html".length);
  return rel.slice(0, -".html".length);
}

function extractTitle(html, fallback) {
  const t = html.match(/<title>([\s\S]*?)<\/title>/i);
  let title = t ? t[1].split(/—|\|/)[0] : null;
  if (!title) {
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    title = h1 ? h1[1] : fallback;
  }
  title = title.replace(/<[^>]+>/g, " ");
  return normWs(unescapeHtml(title));
}

function extractDescription(html) {
  const m = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  return m ? normWs(unescapeHtml(m[1])) : "";
}

function isNoindex(html) {
  return /name=["']robots["']\s+content=["'][^"']*noindex/i.test(html);
}

function listAllHtmlFiles() {
  const results = [];
  (function walk(dir) {
    fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).forEach(entry => {
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(rel);
      } else if (entry.name.endsWith(".html") && entry.name !== "404.html") {
        results.push(rel);
      }
    });
  })(".");
  return results.map(p => p.split(path.sep).join("/")).sort();
}

const items = [];
listAllHtmlFiles().forEach(relPath => {
  const html = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  if (isNoindex(html)) return;
  const title = extractTitle(html, relPath);
  const desc = extractDescription(html);
  const url = cleanPathFor(relPath);
  const parts = relPath.split("/");
  const catKey = parts.length > 1 ? parts[0] : "";
  const category = CATEGORY_LABELS[catKey] || "";
  items.push({ t: title, u: url, d: desc, c: category });
});

const outPath = path.join(ROOT, "assets", "search-index.json");
fs.writeFileSync(outPath, JSON.stringify(items));
console.log(`Wrote ${items.length} item(s) to assets/search-index.json`);
