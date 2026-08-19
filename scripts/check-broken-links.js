#!/usr/bin/env node
// Fails the build if any internal <a href="..."> on the site points to a
// page that doesn't actually exist. Run in CI so a typo'd or renamed link
// gets caught before it ships, instead of surfacing as a 404 in production.
//
// Only checks internal links (relative paths, or absolute paths starting
// with "/", or full URLs on the site's own domain). External links,
// mailto:, tel:, javascript:, and anchor-only hrefs (#foo) are skipped.

const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const SITE_URL = "https://www.engineerzcorner.com";
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

function isInternal(href) {
  if (!href) return false;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return false;
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href.startsWith(SITE_URL);
  }
  return true; // relative or root-relative path
}

// Resolve an href (relative to the page it's found on, or root-relative)
// down to a repo-relative path with no query string / hash, ready to check
// against the filesystem.
function resolveHref(href, fromRel) {
  let clean = href.split("#")[0].split("?")[0];
  if (clean === "") return null; // pure hash link like href="#top"
  if (clean.startsWith(SITE_URL)) clean = clean.slice(SITE_URL.length) || "/";
  const fromDir = path.posix.dirname(fromRel);
  const resolved = clean.startsWith("/")
    ? clean.slice(1)
    : path.posix.normalize(path.posix.join(fromDir, clean));
  return resolved === "" ? "." : resolved;
}

function existsAsPage(resolved) {
  if (resolved === "." || resolved === "") return fs.existsSync(path.join(ROOT, "index.html"));
  const abs = path.join(ROOT, resolved);
  if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return true;              // exact file, e.g. foo.html
  if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) {
    return fs.existsSync(path.join(abs, "index.html"));                          // directory -> index.html
  }
  if (fs.existsSync(abs + ".html")) return true;                                 // "foo" -> "foo.html"
  if (fs.existsSync(path.join(abs, "index.html"))) return true;                  // "foo/" without trailing slash in path.join
  return false;
}

const files = listAllHtmlFiles();
const broken = [];

for (const rel of files) {
  let html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  // Strip <script>...</script> content so JS string literals like
  // `href="' + item.u + '"` inside generated markup aren't mistaken for
  // real anchor tags.
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const hrefs = [...html.matchAll(/<a\s[^>]*href="([^"]+)"/gi)].map(m => m[1]);
  for (const href of hrefs) {
    if (!isInternal(href)) continue;
    const resolved = resolveHref(href, rel);
    if (resolved === null) continue;
    if (!existsAsPage(resolved)) {
      broken.push({ page: rel, href, resolved });
    }
  }
}

if (broken.length > 0) {
  console.error(`\u2717 Found ${broken.length} broken internal link(s):\n`);
  broken.forEach(b => console.error(`  ${b.page}\n    -> href="${b.href}" (resolves to "${b.resolved}", which doesn't exist)\n`));
  process.exit(1); // fail CI so this can't ship silently
} else {
  console.log(`\u2713 Checked ${files.length} page(s) — no broken internal links found.`);
}
