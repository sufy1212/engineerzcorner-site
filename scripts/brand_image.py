#!/usr/bin/env python3
"""
brand_image.py — stamp a post infographic with EngineerzCorner branding.

Adds:
  - a dark navy footer band across the full width of the image with a
    small diamond logo mark, the site name, and a one-line tagline/URL
  - a thin gold accent rule separating the band from the artwork

IMPORTANT — site rule (see CONTRIBUTING.md "Image policy"): every image
published on the site must be original EngineerzCorner-styled artwork,
built from the site's own navy/flame/gold palette and type system — never
a copied, screenshotted, or reposted image from somewhere else. This
script stamps a footer band on an image; it does not turn a third-party
image into something acceptable to publish. Build the artwork original
first, then run this.

Usage:
    python3 brand_image.py <input_image> [output_image]

If output_image is omitted, the input file is overwritten in place.
This mirrors the Node/sharp version (scripts/brand-images.js) that runs
automatically in CI — see that file for the automated pipeline.
"""
import sys
import os
from PIL import Image, ImageDraw, ImageFont

NAVY = (10, 25, 48)        # #0A1930 — site --navy
GOLD = (240, 180, 41)      # #F0B429 — site --amber
GOLD_DIM = (185, 134, 10)  # #B9860A — site --amber-deep
MUTED = (143, 146, 184)    # #8F92B8 — muted mono text used across the site
WHITE = (246, 241, 228)    # #F6F1E4 — site heading-on-navy color

SITE_NAME = "EngineerzCorner.com"
TAGLINE = "Reference · Engineering, Explained"

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"


def band_height(img_width):
    # Scale the footer band with image width so it reads well at any size.
    return max(64, round(img_width * 0.075))


def draw_logo_mark(draw, x, y, size, ):
    """Small rounded-square + bolt mark, echoing the site favicon."""
    r = size * 0.18
    draw.rounded_rectangle([x, y, x + size, y + size], radius=r, fill=NAVY, outline=GOLD_DIM, width=max(1, size // 22))
    # simplified bolt, scaled to the box
    bolt = [
        (x + size * 0.56, y + size * 0.16),
        (x + size * 0.26, y + size * 0.58),
        (x + size * 0.46, y + size * 0.58),
        (x + size * 0.38, y + size * 0.86),
        (x + size * 0.72, y + size * 0.40),
        (x + size * 0.50, y + size * 0.40),
    ]
    draw.polygon(bolt, fill=GOLD)


def brand(input_path, output_path):
    img = Image.open(input_path).convert("RGB")
    w, h = img.size
    bh = band_height(w)

    canvas = Image.new("RGB", (w, h + bh), NAVY)
    canvas.paste(img, (0, 0))

    draw = ImageDraw.Draw(canvas)

    # gold accent rule between artwork and band
    rule_w = max(2, round(bh * 0.035))
    draw.rectangle([0, h, w, h + rule_w], fill=GOLD)

    band_top = h + rule_w
    band_mid = band_top + (bh - rule_w) // 2

    pad = round(bh * 0.28)
    logo_size = bh - rule_w - pad * 2
    draw_logo_mark(draw, pad, band_top + pad, logo_size)

    text_x = pad + logo_size + pad

    name_font_size = round(bh * 0.34)
    tag_font_size = round(bh * 0.20)
    name_font = ImageFont.truetype(FONT_BOLD, name_font_size)
    tag_font = ImageFont.truetype(FONT_MONO, tag_font_size)

    name_bbox = draw.textbbox((0, 0), SITE_NAME, font=name_font)
    tag_bbox = draw.textbbox((0, 0), TAGLINE, font=tag_font)
    gap = round(bh * 0.06)
    block_h = (name_bbox[3] - name_bbox[1]) + gap + (tag_bbox[3] - tag_bbox[1])
    name_y = band_mid - block_h // 2 - name_bbox[1]
    tag_y = name_y + (name_bbox[3] - name_bbox[1]) + gap - tag_bbox[1]

    draw.text((text_x, name_y), SITE_NAME, font=name_font, fill=WHITE)
    draw.text((text_x, tag_y), TAGLINE, font=tag_font, fill=MUTED)

    canvas.save(output_path, quality=92)
    print(f"Branded: {output_path}  ({w}x{h+bh})")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    src = sys.argv[1]
    dst = sys.argv[2] if len(sys.argv) > 2 else src
    brand(src, dst)
