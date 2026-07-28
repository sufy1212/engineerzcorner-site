#!/usr/bin/env node
/**
 * build-recent.js
 * -----------------------------------------------------------------------
 * Generates everything below from the ACTUAL files on disk, so none of it
 * ever needs to be hand-maintained again:
 *
 *   assets/recent.json      — "Recently Added" side-rail widget
 *   assets/site-stats.json  — live counts for "N new"/"N posts"/"N symbols"
 *   sitemap.xml             — regenerated to match exactly what pages exist,
 *                             with a real lastmod date on every URL (SEO)
 *   feed.xml                — RSS feed of Posts, auto-built from every post
 *                             page (title/description/date) — lets people
 *                             subscribe/get new posts in a feed reader
 *                             instead of you announcing them by hand
 *   (console warning)       — flags any post file that exists but isn't
 *                             linked from posts/index.html yet, so a post
 *                             never silently goes undiscoverable
 *
 * Run this as part of your Cloudflare Pages build command, e.g. set the
 * build command to:
 *     node scripts/build-recent.js
 * (or, if you already have a build command, just add
 *  "&& node scripts/build-recent.js" to the end of it)
 *
 * After that, adding/updating a page and pushing is the ONLY step —
 * nothing here ever needs to be touched by hand again.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SITE_URL = 'https://www.engineerzcorner.com';

// Folders to scan for content pages. Edit this list as the site grows.
const CONTENT_DIRS = [
  'electrical', 'mechanical', 'hvac', 'civil', 'automation', 'solar',
  'general', 'study-abroad', 'posts', 'pm'
];

// Filenames to skip everywhere — these are hub/reference pages, not
// individually "shipped" items.
const SKIP_FILES = new Set([
  'index.html', 'notes.html', 'guides.html', 'comparisons.html',
  'symbols.html', 'engineering-guides.html', 'symbol-library.html'
]);

const MAX_ITEMS = 3;

function listHtmlFiles(dir) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs)
    .filter(f => f.endsWith('.html') && !SKIP_FILES.has(f))
    .map(f => path.join(dir, f));
}

function gitDate(relPath) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: ROOT, stdio: ['pipe', 'pipe', 'ignore']
    }).toString().trim();
    return out || null;
  } catch (e) {
    return null;
  }
}

function fileDate(relPath) {
  const g = gitDate(relPath);
  if (g) return g;
  const stat = fs.statSync(path.join(ROOT, relPath));
  return stat.mtime.toISOString();
}

function extractTitle(relPath) {
  const html = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let title = h1 ? h1[1] : null;
  if (!title) {
    const t = html.match(/<title>([\s\S]*?)<\/title>/i);
    title = t ? t[1].split(/—|\|/)[0] : relPath;
  }
  return title.replace(/<[^>]+>/g, '').trim();
}

function extractDescription(relPath) {
  const html = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  const m = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  return m ? m[1].trim() : '';
}

function escapeXml(str) {
  return String(str)
    .replace(/&(?!amp;|lt;|gt;|quot;|#39;|apos;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Every .html file on the site (excluding the ones passed in skipDirs),
// used for the sitemap. 404 pages are never included in a sitemap.
function listAllHtmlFiles() {
  const skipDirs = new Set(['assets', 'scripts', '.git']);
  const results = [];
  (function walk(dir) {
    fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).forEach(entry => {
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!skipDirs.has(entry.name)) walk(rel);
      } else if (entry.name.endsWith('.html') && entry.name !== '404.html') {
        results.push(rel);
      }
    });
  })('.');
  return results.map(p => p.split(path.sep).join('/'));
}

let items = [];
CONTENT_DIRS.forEach(dir => {
  listHtmlFiles(dir).forEach(relPath => {
    items.push({
      t: extractTitle(relPath),
      u: relPath.split(path.sep).join('/'),
      d: fileDate(relPath).slice(0, 10) // YYYY-MM-DD
    });
  });
});

items.sort((a, b) => new Date(b.d) - new Date(a.d));
items = items.slice(0, MAX_ITEMS);

const outPath = path.join(ROOT, 'assets', 'recent.json');
fs.writeFileSync(outPath, JSON.stringify(items, null, 2));
console.log(`Wrote ${items.length} item(s) to assets/recent.json:`);
items.forEach(i => console.log(`  ${i.d}  ${i.t}  (${i.u})`));

// -----------------------------------------------------------------------
// site-stats.json — live counts for homepage badges. A post/page only
// counts as "new" if it's within POSTS_NEW_DAYS of today, so this number
// naturally drops back down on its own as posts age — no manual resets.
// -----------------------------------------------------------------------
const POSTS_NEW_DAYS = 30;

const postFiles = listHtmlFiles('posts');
const postDates = postFiles.map(fileDate);
const now = new Date();
const postsTotal = postFiles.length;
const postsNew = postDates.filter(d => (now - new Date(d)) / 86400000 <= POSTS_NEW_DAYS).length;

let flashcardSymbols = 0;
const flashcardsPath = path.join(ROOT, 'flashcards.html');
if (fs.existsSync(flashcardsPath)) {
  const fcHtml = fs.readFileSync(flashcardsPath, 'utf8');
  const matches = fcHtml.match(/\{cat\s*:/g);
  flashcardSymbols = matches ? matches.length : 0;
}

const stats = { postsTotal, postsNew, flashcardSymbols };
const statsPath = path.join(ROOT, 'assets', 'site-stats.json');
fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
console.log(`Wrote assets/site-stats.json:`, stats);

// -----------------------------------------------------------------------
// sitemap.xml — regenerated from the actual file tree every build, with a
// real lastmod date on each URL, so it can never drift from what pages
// actually exist (and Google always sees an accurate freshness signal).
// -----------------------------------------------------------------------
const allPages = listAllHtmlFiles();
const sitemapEntries = allPages.map(rel => {
  const base = path.basename(rel);
  const priority = rel === 'index.html' ? '1.0' : (base === 'index.html' ? '0.8' : '0.6');
  // Cloudflare Pages serves .html files without their extension and
  // folder/index.html as folder/ — sitemap URLs must match that canonical
  // form (same form used in each page's <link rel="canonical">), or Google
  // sees a redirect on every URL it tries to crawl from this sitemap.
  let cleanPath;
  if (rel === 'index.html') {
    cleanPath = '';
  } else if (base === 'index.html') {
    cleanPath = rel.slice(0, -'index.html'.length);
  } else {
    cleanPath = rel.slice(0, -'.html'.length);
  }
  return `  <url><loc>${SITE_URL}/${cleanPath}</loc><lastmod>${fileDate(rel).slice(0,10)}</lastmod><priority>${priority}</priority></url>`;
}).sort();

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemapXml);
console.log(`Wrote sitemap.xml with ${allPages.length} URLs.`);

// -----------------------------------------------------------------------
// feed.xml — RSS 2.0 feed of Posts, built entirely from the post pages
// themselves (title, meta description, real date). Lets anyone subscribe
// in a feed reader and get new posts automatically, with zero manual step
// on your end beyond publishing the post page itself.
// -----------------------------------------------------------------------
const feedPosts = postFiles
  .map(rel => ({
    title: extractTitle(rel),
    desc: extractDescription(rel),
    url: `${SITE_URL}/${rel.split(path.sep).join('/')}`,
    date: fileDate(rel)
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 30); // most recent 30 posts, standard feed practice

const feedItems = feedPosts.map(p => `  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${p.url}</link>
    <guid>${p.url}</guid>
    <description>${escapeXml(p.desc)}</description>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  </item>`).join('\n');

const feedXml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>\n  <title>EngineerzCorneR — Posts</title>\n  <link>${SITE_URL}/posts/index.html</link>\n  <description>Deep-dive technical write-ups across Electrical, Mechanical, HVAC, Automation, Civil and Solar.</description>\n${feedItems}\n</channel></rss>\n`;
fs.writeFileSync(path.join(ROOT, 'feed.xml'), feedXml);
console.log(`Wrote feed.xml with ${feedPosts.length} post(s).`);

// -----------------------------------------------------------------------
// Orphan-post check — warns (doesn't fail the build) if a post file
// exists but posts/index.html doesn't link to it yet, so a published post
// never silently stays undiscoverable from the posts page.
// -----------------------------------------------------------------------
const postsIndexPath = path.join(ROOT, 'posts', 'index.html');
if (fs.existsSync(postsIndexPath)) {
  const postsIndexHtml = fs.readFileSync(postsIndexPath, 'utf8');
  const orphans = postFiles
    .map(rel => path.basename(rel))
    .filter(name => !postsIndexHtml.includes(name));
  if (orphans.length) {
    console.warn(`\n⚠ ${orphans.length} post(s) exist but aren't linked from posts/index.html yet:`);
    orphans.forEach(name => console.warn(`  - posts/${name}`));
    console.warn(`  (posts/index.html card text is hand-written, so this script won't add\n   cards automatically — just a heads-up so nothing gets missed.)\n`);
  }
}
