# Contributing to Engineerz CorneR

## Image policy — original artwork only

**Every image that ships on this site must be original EngineerzCorner-branded
artwork. Never publish a copy-pasted, screenshotted, or otherwise reused
third-party image — infographic, diagram, or photo — as content.**

This isn't just about attribution. A pasted-in image carries someone else's
layout, typography, and (often) their own logo or watermark — it reads as
reposted content, not something EngineerzCorner made. It also creates
licensing risk, since we don't hold rights to art we didn't create.

### What "original" means in practice

- Diagrams and infographics are built from scratch (SVG, HTML/CSS, or a
  generation script like `scripts/brand_image.py`) using the site's own
  design system: `--navy` / `--flame` / `--gold` palette, Space Grotesk /
  IBM Plex Mono type, and the same card, icon and layout language used
  across `assets/common-blocks.css` and the per-post `.inline.css` files.
- If a third-party image is the only available *reference* for a concept
  (e.g. a photo of real equipment, or a published diagram), redraw the
  concept in the site's own style rather than embedding the source image.
  Cite the concept, not the artwork.
- Equipment photos are the one exception where original illustration isn't
  practical — those should be sourced from properly licensed/stock imagery,
  not lifted from a random blog or social post.

### The auto-brand pipeline is a safety net, not a substitute

`scripts/brand-images.js` (CI) and `scripts/brand_image.py` (local) stamp
every image under a content `img/` folder with a footer band — logo mark,
site name, tagline — before it ships. This exists to catch anything that
slips through, **not** to make a third-party image acceptable by adding a
badge to it. An image that needed the stamp to look "ours" shouldn't have
been added in the first place.

Before adding any image to a post:

1. Build it as original artwork in the site's palette and type system.
2. Save it under the relevant `<discipline>/img/` folder.
3. Let the brand pipeline stamp it (automatic in CI, or run
   `python3 scripts/brand_image.py <path>` locally).
4. Reference it from the post with a descriptive `alt` — no filler like
   "infographic.png" as the visible name.
