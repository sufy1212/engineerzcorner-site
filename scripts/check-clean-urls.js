#!/usr/bin/env node
// Fails the build if the site publishes a URL that Cloudflare Pages will
// answer with a redirect. Search Console reports those as "Page with
// redirect" (never indexed). Checks:
//   1. Absolute engineerzcorner.com URLs ending in .html (feed.xml, JSON-LD,
//      og:url, ...). Cloudflare 308s /x.html -> /x and /dir/index.html -> /dir/.
//   2. Absolute or root-relative URLs to a directory page without the
//      trailing slash (/electrical -> /electrical/ is a redirect).
//   3. Relative href="dir" links to a directory page without the slash.
//   4. sitemap.xml entries that are noindex, redirect, or have no page.
const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const SKIP = new Set(["scripts", "assets", ".git", "node_modules", ".github"]);
const problems = [];
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })) {
    const rel = path.join(d, e.name);
    if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(rel); }
    else if (/\.(html|xml)$/.test(e.name)) files.push(rel);
  }
})(".");
const isDirPage = p => fs.existsSync(path.join(ROOT, p.replace(/^\//, ""), "index.html"));
for (const f of files) {
  if (f === "404.html") continue;
  const s = fs.readFileSync(path.join(ROOT, f), "utf8");
  for (const m of s.matchAll(/https?:\/\/(?:www\.)?engineerzcorner\.com(\/[^"'\s<>)\\,#?]*)?/g)) {
    const p = m[1] || "/";
    if (p.endsWith(".html")) problems.push(`${f}: absolute URL ends in .html -> ${m[0]}`);
    else if (p !== "/" && !p.endsWith("/") && isDirPage(p)) problems.push(`${f}: directory URL missing trailing slash -> ${m[0]}`);
  }
  if (f.endsWith(".html")) {
    for (const m of s.matchAll(/href="([^"#?:]+)"/g)) {
      const u = m[1];
      if (u.startsWith("//") || /\.[a-z0-9]+$/i.test(u) || u.endsWith("/")) continue;
      const abs = u.startsWith("/") ? u : path.posix.join("/" + path.dirname(f).split(path.sep).join("/"), u);
      if (!fs.existsSync(path.join(ROOT, abs.replace(/^\//, "") + ".html")) && isDirPage(abs))
        problems.push(`${f}: link to directory without trailing slash -> href="${u}"`);
    }
  }
}
const sm = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
for (const m of sm.matchAll(/<loc>https:\/\/www\.engineerzcorner\.com(\/[^<]*)<\/loc>/g)) {
  const p = m[1];
  const file = p === "/" ? "index.html" : p.endsWith("/") ? p.slice(1) + "index.html" : p.slice(1) + ".html";
  const abs = path.join(ROOT, file);
  if (!fs.existsSync(abs)) { problems.push(`sitemap.xml: no page for ${p}`); continue; }
  if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(fs.readFileSync(abs, "utf8"))) problems.push(`sitemap.xml: noindex page listed -> ${p}`);
}
if (problems.length) { console.error(`\u2717 ${problems.length} redirecting/unindexable URL(s):\n  ` + problems.join("\n  ")); process.exit(1); }
console.log(`\u2713 Checked ${files.length} files + sitemap.xml: no redirecting URLs published.`);
