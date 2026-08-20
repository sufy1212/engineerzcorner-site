#!/usr/bin/env node
// Fails the build if any rule in _redirects points at a source or
// destination path that doesn't correspond to a real page anymore. This is
// the automated fix for the class of bug that caused the
// electrical/engineering-guides 404: a redirect rule was written against
// an old filename, that file got renamed/removed, and the rule silently
// stopped ever matching (or the source it "protects" no longer exists to
// protect). Cloudflare never complains about this — a stale rule just
// quietly does nothing — so nothing catches it except reading every line
// by hand, which is exactly how the old rule survived past two renames.
//
// Checks, per non-comment rule "SOURCE DEST STATUS":
//   1. DEST resolves to a real page on disk (skipped for absolute
//      external URLs, e.g. redirecting to another domain).
//   2. SOURCE does NOT already resolve to a real page on disk — if it
//      does, the rule can never fire for anyone browsing normally (the
//      real file wins), which usually means the rule is protecting
//      against a page that no longer needs protecting, or was written
//      against the wrong path to begin with.
// Both are warnings about intent, not proof of a bug, so mismatches are
// reported clearly rather than silently "fixed" — but the build still
// fails so a human confirms before it ships.

const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const REDIRECTS_FILE = path.join(ROOT, "_redirects");

// Same resolution rules as check-broken-links.js, so "does this path
// exist" means the same thing in both scripts. Used for DEST, where a
// trailing slash is not meaningful (redirect destinations are written
// as clean canonical URLs).
function existsAsPage(resolved) {
  if (resolved === "" || resolved === "/") return fs.existsSync(path.join(ROOT, "index.html"));
  const clean = resolved.replace(/^\/+/, "").replace(/\/+$/, "");
  const abs = path.join(ROOT, clean);
  if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return true;                  // exact file, e.g. foo.html
  if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) {
    return fs.existsSync(path.join(abs, "index.html"));                              // directory -> index.html
  }
  if (fs.existsSync(abs + ".html")) return true;                                     // "foo" -> "foo.html"
  return false;
}

// For SOURCE, a trailing slash IS meaningful: it means "this URL only
// really exists if there's an actual directory here." A source like
// "/general/unit-converter/" is legitimately live-but-unreachable even
// though "/general/unit-converter" (no slash) resolves to a real .html
// file — the two are different URLs, and Cloudflare's own trailing-slash
// canonicalization is exactly why some of these rules exist on purpose
// (see the comments in _redirects). So don't collapse that distinction
// away, or every intentional trailing-slash rule gets flagged as dead.
function isLiveSourcePath(source) {
  const trailingSlash = source.endsWith("/") && source !== "/";
  const clean = source.replace(/^\/+/, "").replace(/\/+$/, "");
  if (clean === "") return fs.existsSync(path.join(ROOT, "index.html"));
  const abs = path.join(ROOT, clean);
  if (trailingSlash) {
    // Trailing slash means "directory" — only counts as live if a real
    // directory with an index.html sits there, not a same-named .html file.
    return fs.existsSync(abs) && fs.statSync(abs).isDirectory() && fs.existsSync(path.join(abs, "index.html"));
  }
  if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return true;
  if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) return fs.existsSync(path.join(abs, "index.html"));
  if (fs.existsSync(abs + ".html")) return true;
  return false;
}

if (!fs.existsSync(REDIRECTS_FILE)) {
  console.log("\u2713 No _redirects file found — nothing to check.");
  process.exit(0);
}

const lines = fs.readFileSync(REDIRECTS_FILE, "utf8").split("\n");
const problems = [];
let ruleCount = 0;

lines.forEach((rawLine, i) => {
  const line = rawLine.trim();
  if (line === "" || line.startsWith("#")) return; // blank line or comment

  const parts = line.split(/\s+/);
  if (parts.length < 2) return; // malformed line, not this script's job to lint syntax
  const [source, dest] = parts;
  ruleCount++;

  // Destination must resolve to something real, unless it's an absolute
  // external URL or the site root.
  const isExternal = /^https?:\/\//i.test(dest);
  const isRoot = dest === "/";
  if (!isExternal && !isRoot && !existsAsPage(dest)) {
    problems.push({
      line: i + 1, source, dest,
      issue: `destination "${dest}" doesn't correspond to any page on disk`,
    });
  }

  // Source shouldn't itself be a live page — if it is, the redirect can
  // never fire (the real file always wins), so the rule is dead weight
  // at best and hiding a mistake at worst.
  if (isLiveSourcePath(source)) {
    problems.push({
      line: i + 1, source, dest,
      issue: `source "${source}" is itself a real page — this rule can never fire`,
    });
  }

  // This site serves clean URLs everywhere (Cloudflare strips ".html"
  // automatically, and no internal link ever includes the extension — see
  // the note at the bottom of _redirects). So a rule whose SOURCE still
  // ends in ".html" is written against a URL nothing will ever actually
  // request: real visitors, internal links, and Google's crawler all hit
  // the extensionless path. This exact mismatch is what let the
  // engineering-guides rule silently stop matching after the file was
  // renamed — the rule looked fine, it just could never fire.
  if (/\.html$/i.test(source)) {
    problems.push({
      line: i + 1, source, dest,
      issue: `source "${source}" ends in ".html" — this site only ever gets requests for the clean URL, so this rule can never match real traffic. Should be "${source.replace(/\.html$/i, "")}".`,
    });
  }
});

if (problems.length > 0) {
  console.error(`\u2717 Found ${problems.length} issue(s) in _redirects:\n`);
  problems.forEach(p => console.error(`  line ${p.line}: ${p.source} -> ${p.dest}\n    -> ${p.issue}\n`));
  process.exit(1); // fail CI so this can't ship silently
} else {
  console.log(`\u2713 Checked ${ruleCount} redirect rule(s) — all sources and destinations look valid.`);
}
