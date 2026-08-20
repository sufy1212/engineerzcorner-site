#!/usr/bin/env node
// Fails the build if any page's <link rel="canonical"> or <meta
// property="og:url"> doesn't point at ITSELF — i.e. the page's own clean
// URL, derived from its actual file path.
//
// Same failure class as the tool-number and <!-- PAGE: --> bugs already
// fixed on this site: a page gets created by copying an existing one as a
// starting template, and every field that should have been updated to
// match the new page gets updated EXCEPT this one, because it's buried in
// <head> and never rendered visibly — nothing about a wrong canonical
// looks broken when you view the page. The consequence is worse than a
// cosmetic bug though: a wrong canonical actively tells Google "please
// index the OLD page instead of this one," which can suppress the new
// page from search results entirely while looking completely fine to a
// human visitor.
//
// Both tags are matched attribute-order-agnostically (match the whole
// <link>/<meta> tag first, then pull the href/content out of it) because
// this site doesn't write them in a single consistent attribute order —
// see interview/civil.html, which writes href before rel.
//
// noindex pages are skipped, same exemption used in check-orphan-pages.js
// and check-meta-length.js — their canonical/og:url aren't meaningful.

const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const SITE_URL = "https://www.engineerzcorner.com";
const SKIP_DIRS = new Set(["assets", "scripts", ".git", ".github", "node_modules"]);

// 404.html is served automatically for any bad URL — it has no "own" URL
// to self-reference, so it's exempt the same way it is in
// check-orphan-pages.js.
const EXEMPT = new Set(["404.html"]);

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

function isNoindex(html) {
  return /<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"/i.test(html);
}

function getAttr(tag, name) {
  const m = tag.match(new RegExp(name + '="([^"]*)"', "i"));
  return m ? m[1] : null;
}

// A page's own expected clean URL slug, derived from its file path —
// "mechanical/index.html" -> "mechanical", "about.html" -> "about",
// root "index.html" -> "".
function expectedSlugFor(rel) {
  const stripped = rel === "index.html"
    ? ""
    : rel.endsWith("/index.html")
      ? rel.slice(0, -"index.html".length)
      : rel.slice(0, -".html".length);
  return stripped.replace(/\/$/, "");
}

const files = listAllHtmlFiles();
const problems = [];

for (const rel of files) {
  if (EXEMPT.has(rel)) continue;
  const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  if (isNoindex(html)) continue;

  const expected = expectedSlugFor(rel);

  const canonTag = html.match(/<link\s+[^>]*rel="canonical"[^>]*>/i);
  if (!canonTag) {
    problems.push({ page: rel, issue: "missing <link rel=\"canonical\">" });
  } else {
    const href = getAttr(canonTag[0], "href");
    if (!href) {
      problems.push({ page: rel, issue: "canonical tag has no href" });
    } else if (href.startsWith(SITE_URL)) {
      const slug = href.slice(SITE_URL.length).replace(/^\/+|\/+$/g, "");
      if (slug !== expected) {
        problems.push({ page: rel, issue: `canonical points to "${href}", expected slug "${expected}"` });
      }
    }
  }

  const ogTag = html.match(/<meta\s+[^>]*property="og:url"[^>]*>/i);
  if (ogTag) {
    // og:url is checked only if present — unlike canonical, it's not
    // universally required across every page template on this site.
    const content = getAttr(ogTag[0], "content");
    if (content && content.startsWith(SITE_URL)) {
      const slug = content.slice(SITE_URL.length).replace(/^\/+|\/+$/g, "");
      if (slug !== expected) {
        problems.push({ page: rel, issue: `og:url points to "${content}", expected slug "${expected}"` });
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`\u2717 Found ${problems.length} canonical/og:url issue(s):\n`);
  problems.forEach(p => console.error(`  ${p.page}\n    -> ${p.issue}\n`));
  process.exit(1); // fail CI so this can't ship silently
} else {
  console.log(`\u2713 Checked ${files.length} page(s) — every canonical/og:url tag self-references correctly.`);
}
