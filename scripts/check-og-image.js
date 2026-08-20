#!/usr/bin/env node
// Fails the build if a page's og:image or twitter:image doesn't match its
// own discipline's branded card (assets/og/og-<discipline>.png). Found
// this class of bug live on the site: every page under process/ was
// pointing at og-automation.png (the wrong discipline entirely — process
// and automation just happen to sit next to each other in whatever list
// this got copied down), and interview/civil.html pointed at a generic
// root-level og-image.png while all eight of its sibling interview pages
// correctly use og-interview.png. Same class of bug as the tool-number
// and canonical-URL checks: a value that's invisible when you view the
// page (nobody sees the OG image unless they share the link) so it never
// gets noticed until someone actually posts a process/ link somewhere and
// the wrong picture shows up.
//
// Only checks pages under a top-level discipline folder that has its own
// assets/og/og-<discipline>.png — pages outside that (root-level pages,
// posts/, etc.) aren't held to this convention and are skipped.

const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const OG_DIR = path.join(ROOT, "assets", "og");

function getAttr(tag, name) {
  const m = tag.match(new RegExp(name + '="([^"]*)"', "i"));
  return m ? m[1] : null;
}

function listAllHtmlFiles() {
  const SKIP_DIRS = new Set(["assets", "scripts", ".git", ".github", "node_modules"]);
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

// Which discipline folders actually have their own branded OG card —
// built from whatever og-*.png files exist, so a new discipline card just
// needs to be dropped in assets/og/ and this check picks it up automatically.
// "posts" is excluded even though og-posts.png exists: individual blog
// posts legitimately override with their own custom infographic, or with
// whichever discipline's card best matches the post's topic (e.g. a
// PM-tagged post using og-pm.png) — that's intentional editorial choice,
// not drift, so it isn't held to the "must match its own folder" rule the
// tool-discipline pages are.
const brandedDisciplines = new Set(
  fs.readdirSync(OG_DIR)
    .filter(f => /^og-[\w-]+\.png$/i.test(f))
    .map(f => f.replace(/^og-/, "").replace(/\.png$/i, ""))
    .filter(d => d !== "posts")
);

const files = listAllHtmlFiles();
const problems = [];

for (const rel of files) {
  const topDir = rel.includes("/") ? rel.split("/")[0] : null;
  if (!topDir || !brandedDisciplines.has(topDir)) continue; // not a disciplined-branded page, skip

  const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  if (/<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"/i.test(html)) continue;

  const expected = `og-${topDir}.png`;

  for (const [attrName, propMatch] of [
    ["content", /<meta\s+[^>]*property="og:image"[^>]*>/i],
    ["content", /<meta\s+[^>]*name="twitter:image"[^>]*>/i],
  ]) {
    const tag = html.match(propMatch);
    if (!tag) continue; // not every page template necessarily has both
    const value = getAttr(tag[0], attrName);
    if (value && !value.endsWith(`/${expected}`)) {
      problems.push({
        page: rel,
        issue: `${propMatch.source.includes("og:image") ? "og:image" : "twitter:image"} is "${value}", expected it to end in "/${expected}"`,
      });
    }
  }
}

if (problems.length > 0) {
  console.error(`\u2717 Found ${problems.length} og:image/twitter:image discipline mismatch(es):\n`);
  problems.forEach(p => console.error(`  ${p.page}\n    -> ${p.issue}\n`));
  process.exit(1); // fail CI so this can't ship silently
} else {
  console.log(`\u2713 Checked ${files.length} page(s) — every og:image/twitter:image matches its own discipline.`);
}
