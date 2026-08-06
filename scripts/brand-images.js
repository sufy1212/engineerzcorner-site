#!/usr/bin/env node
/**
 * brand-images.js — auto-watermark every content image with EngineerzCorner
 * branding, so any image added to the repo (infographic, diagram, screenshot)
 * automatically gets turned into "our own" — a gold accent rule + a footer
 * band carrying the site name and tagline — before it ever ships.
 *
 * Runs in CI on every push (see .github/workflows/brand-images.yml) and is
 * idempotent: a manifest of post-brand file hashes (assets/branded-images-manifest.json)
 * means an already-branded, unchanged image is skipped on the next run, and
 * only genuinely new or edited images get processed.
 *
 * Local/manual use:
 *   npm install sharp
 *   node scripts/brand-images.js
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const MANIFEST_PATH = path.join(ROOT, "assets", "branded-images-manifest.json");

// Every folder in the repo that holds content images. Add a new discipline's
// img folder here and it's covered automatically — no other wiring needed.
const IMAGE_DIRS = [
  "posts/img",
  "electrical/img",
  "mechanical/img",
  "hvac/img",
  "civil/img",
  "automation/img",
  "solar/img",
  "general/img",
  "pm/img",
];

const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const SITE_NAME = "EngineerzCorner.com";
const TAGLINE = "Reference · Engineering, Explained";

const NAVY = "#0A1930";
const GOLD = "#F0B429";
const GOLD_DIM = "#B9860A";
const MUTED = "#8F92B8";
const WHITE = "#F6F1E4";

function listImages() {
  const files = [];
  for (const dir of IMAGE_DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs)) {
      const ext = path.extname(f).toLowerCase();
      if (IMG_EXT.has(ext)) files.push(path.join(dir, f));
    }
  }
  return files;
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch {
    return {};
  }
}

function hashFile(absPath) {
  return crypto.createHash("sha256").update(fs.readFileSync(absPath)).digest("hex");
}

function bandSvg(width, bandHeight, ruleH) {
  const pad = Math.round(bandHeight * 0.28);
  const logo = bandHeight - ruleH - pad * 2;
  const logoX = pad;
  const logoY = ruleH + pad;
  const textX = logoX + logo + pad;
  const nameSize = Math.round(bandHeight * 0.34);
  const tagSize = Math.round(bandHeight * 0.2);
  const nameY = ruleH + Math.round(bandHeight * 0.46);
  const tagY = nameY + Math.round(bandHeight * 0.28);
  const r = logo * 0.18;

  // Simple bolt mark echoing the site favicon, scaled to the logo box.
  const bx = logoX, by = logoY, s = logo;
  const bolt = [
    [bx + s * 0.56, by + s * 0.16],
    [bx + s * 0.26, by + s * 0.58],
    [bx + s * 0.46, by + s * 0.58],
    [bx + s * 0.38, by + s * 0.86],
    [bx + s * 0.72, by + s * 0.4],
    [bx + s * 0.5, by + s * 0.4],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return `
<svg width="${width}" height="${bandHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${width}" height="${ruleH}" fill="${GOLD}"/>
  <rect x="0" y="${ruleH}" width="${width}" height="${bandHeight - ruleH}" fill="${NAVY}"/>
  <rect x="${logoX}" y="${logoY}" width="${logo}" height="${logo}" rx="${r}" fill="${NAVY}" stroke="${GOLD_DIM}" stroke-width="${Math.max(1, logo / 22)}"/>
  <polygon points="${bolt}" fill="${GOLD}"/>
  <text x="${textX}" y="${nameY}" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${nameSize}" fill="${WHITE}">${SITE_NAME}</text>
  <text x="${textX}" y="${tagY}" font-family="Consolas, 'Courier New', monospace" font-size="${tagSize}" fill="${MUTED}">${TAGLINE}</text>
</svg>`;
}

async function brandOne(relPath) {
  const abs = path.join(ROOT, relPath);
  const img = sharp(abs);
  const meta = await img.metadata();
  const w = meta.width;
  const h = meta.height;
  const bandHeight = Math.max(64, Math.round(w * 0.075));
  const ruleH = Math.max(2, Math.round(bandHeight * 0.035));

  const svg = Buffer.from(bandSvg(w, bandHeight, ruleH));

  const out = await sharp({
    create: { width: w, height: h + bandHeight, channels: 3, background: NAVY },
  })
    .composite([
      { input: await img.toBuffer(), top: 0, left: 0 },
      { input: svg, top: h, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toBuffer();

  fs.writeFileSync(abs, out);
  return hashFile(abs);
}

async function main() {
  const manifest = loadManifest();
  const images = listImages();
  let branded = 0;

  for (const relPath of images) {
    const abs = path.join(ROOT, relPath);
    const currentHash = hashFile(abs);
    if (manifest[relPath] === currentHash) continue; // already branded, unchanged

    const newHash = await brandOne(relPath);
    manifest[relPath] = newHash;
    branded++;
    console.log(`Branded: ${relPath}`);
  }

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log(
    branded
      ? `Done — branded ${branded} image(s).`
      : "Done — no new or changed images to brand."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
