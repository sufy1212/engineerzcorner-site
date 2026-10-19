#!/usr/bin/env node
// Fails the build if a post's article content is wrapped in a class that the
// site CSS hides. `.page` is display:none unless it also has `.active` (it is
// the tab pattern used by single-page tools), so a post wrapped in
// <div class="page"> renders its hero and footer but none of the article.
// Posts must wrap their content in <div class="wrap">.

const fs = require("fs"), path = require("path");
const dir = path.join(__dirname, "..", "posts");
const bad = [];
for (const name of fs.readdirSync(dir)) {
  if (!name.endsWith(".html") || name === "index.html") continue;
  const src = fs.readFileSync(path.join(dir, name), "utf8");
  const hasHiddenWrapper = /<div class="page">/.test(src);
  const hasWrap = /<div class="wrap">/.test(src);
  if (hasHiddenWrapper) bad.push(`posts/${name}: wrapped in <div class="page"> (hidden by CSS); use <div class="wrap">`);
  else if (!hasWrap) bad.push(`posts/${name}: no <div class="wrap"> content wrapper found`);
}
if (bad.length) {
  console.error(`✗ ${bad.length} post(s) would render without their article body:`);
  bad.forEach(b => console.error("  " + b));
  process.exit(1);
}
console.log("✓ Checked posts — every post wraps its content in <div class=\"wrap\">.");
