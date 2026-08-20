#!/usr/bin/env node
// Fails the build if any page exists on disk but has zero incoming links
// from anywhere else on the site. This is the mirror image of
// check-broken-links.js: that script makes sure every href points at a
// real page; this one makes sure every real page has an href pointing at
// it. A page nobody links to still gets built and deployed, but a visitor
// can only ever find it by typing the exact URL or via search-index.json —
// it never surfaces from browsing, which is how pages quietly go stale or
// get "lost" after a rename.
//
// A page counts as reachable if ANY <a href="..."> anywhere on the site
// (discipline hub cards, site-nav, sitemap.html, footers, cross-links in
// post bodies, etc.) resolves to it. That's deliberately broad — it
// doesn't matter which specific place links to it, only that some real
// path to it exists from browsing the site.

const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const SITE_URL = "https://www.engineerzcorner.com";
const SKIP_DIRS = new Set(["assets", "scripts", ".git", ".github", "node_modules"]);

// Pages that are real and correctly un-linked from normal browsing by
// design — Cloudflare/browsers reach these through mechanisms other than
// an <a> tag on the site, so flagging them would just be noise.
const EXPECTED_UNLINKED = new Set([
  "404.html", // served automatically by Cloudflare Pages on a bad URL, never linked to
]);

// A page tagged <meta name="robots" content="noindex, nofollow"> is the
// site's own signal that it's a scratch/preview/draft page not meant to
// be discoverable — e.g. a design mockup being iterated on before it
// becomes a real page. Respecting that tag means any future draft page
// gets the same pass automatically, instead of needing its filename
// added to EXPECTED_UNLINKED by hand every time.
function isNoindex(relPath) {
  const html = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  return /<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"/i.test(html);
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

function isInternal(href) {
  if (!href) return false;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return false;
  if (href.startsWith("http://") || href.startsWith("https://")) return href.startsWith(SITE_URL);
  return true;
}

// Same resolution logic as check-broken-links.js, so both scripts agree
// on what a link "means" on disk.
function resolveHref(href, fromRel) {
  let clean = href.split("#")[0].split("?")[0];
  if (clean === "") return null;
  if (clean.startsWith(SITE_URL)) clean = clean.slice(SITE_URL.length) || "/";
  const fromDir = path.posix.dirname(fromRel);
  const resolved = clean.startsWith("/")
    ? clean.slice(1)
    : path.posix.normalize(path.posix.join(fromDir, clean));
  return resolved === "" ? "." : resolved;
}

// Map a resolved link target down to the actual .html file it points at
// (mirrors the file-resolution rules used for checking broken links), so
// "electrical/", "electrical", and "electrical/index.html" all mark the
// same file as reached.
function resolvedToFile(resolved) {
  if (resolved === "." || resolved === "") return "index.html";
  const clean = resolved.replace(/\/+$/, "");
  if (fs.existsSync(path.join(ROOT, clean)) && fs.statSync(path.join(ROOT, clean)).isFile()) return clean;
  if (fs.existsSync(path.join(ROOT, clean)) && fs.statSync(path.join(ROOT, clean)).isDirectory()) {
    const idx = path.posix.join(clean, "index.html");
    return fs.existsSync(path.join(ROOT, idx)) ? idx : null;
  }
  if (fs.existsSync(path.join(ROOT, clean + ".html"))) return clean + ".html";
  return null;
}

const files = listAllHtmlFiles();
const reached = new Set(["index.html"]); // the site root is always reachable by definition

for (const rel of files) {
  let html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const hrefs = [...html.matchAll(/<a\s[^>]*href="([^"]+)"/gi)].map(m => m[1]);
  for (const href of hrefs) {
    if (!isInternal(href)) continue;
    const resolved = resolveHref(href, rel);
    if (resolved === null) continue;
    const target = resolvedToFile(resolved);
    if (target) reached.add(target);
  }
}

const orphans = files.filter(f => !reached.has(f) && !EXPECTED_UNLINKED.has(f) && !isNoindex(f));

if (orphans.length > 0) {
  console.error(`\u2717 Found ${orphans.length} orphan page(s) — they exist on disk but nothing on the site links to them:\n`);
  orphans.forEach(o => console.error(`  ${o}`));
  console.error("");
  process.exit(1); // fail CI so this can't ship silently
} else {
  console.log(`\u2713 Checked ${files.length} page(s) — every page is reachable from somewhere on the site.`);
}
