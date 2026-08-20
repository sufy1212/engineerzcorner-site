#!/usr/bin/env python3
"""
generate_discipline_og.py — build a 1200x630 og:image social-share card for
a discipline, matching the exact visual style already used by the other
og-<discipline>.png cards on this site (sampled from og-automation.png):
dark charcoal background, faint grid, orange accent bar down the left edge
with a warm glow into the top-right corner, "ENGINEERZ CORNER" eyebrow
label with an underline rule, a large bold white H1, a muted subtitle line,
and a small mono footer tag line bottom-right.

Usage:
    python3 generate_discipline_og.py <output.png> "<Title>" "<Subtitle>" "<TAG1 · TAG2 · TAG3>"
"""
import sys
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (38, 40, 42)          # sampled from og-automation.png background
ORANGE = (193, 102, 43)    # sampled left accent bar / eyebrow color
WHITE = (245, 245, 250)    # sampled title color
MUTED = (140, 144, 163)    # subtitle / footer mono color, matched to site's muted tone
GRID = (46, 48, 51)        # faint grid, slightly lighter than bg

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

def build(out_path, title, subtitle, tags):
    im = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(im)

    # Faint grid
    step = 40
    for x in range(0, W, step):
        draw.line([(x, 0), (x, H)], fill=GRID, width=1)
    for y in range(0, H, step):
        draw.line([(0, y), (W, y)], fill=GRID, width=1)

    # Warm glow into the top-right corner (soft radial approximation via
    # concentric translucent-look bands, drawn light-to-dark by blending)
    glow = Image.new("RGB", (W, H), BG)
    gdraw = ImageDraw.Draw(glow)
    cx, cy, maxr = W - 80, 40, 900
    steps = 40
    for i in range(steps, 0, -1):
        r = maxr * i / steps
        t = 1 - (i / steps)
        col = tuple(int(BG[c] + (ORANGE[c] - BG[c]) * 0.35 * t) for c in range(3))
        gdraw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)
    im = Image.blend(im, glow, 0.5)
    draw = ImageDraw.Draw(im)

    # Left accent bar
    draw.rectangle([0, 0, 6, H], fill=ORANGE)

    # Eyebrow label + underline
    eyebrow_font = ImageFont.truetype(FONT_MONO, 20)
    draw.text((72, 72), "ENGINEERZ CORNER", font=eyebrow_font, fill=ORANGE)
    draw.line([(72, 118), (200, 118)], fill=ORANGE, width=2)

    # Title (auto-shrink to fit width if needed)
    title_size = 64
    title_font = ImageFont.truetype(FONT_BOLD, title_size)
    max_w = W - 72 - 60
    while draw.textlength(title, font=title_font) > max_w and title_size > 36:
        title_size -= 2
        title_font = ImageFont.truetype(FONT_BOLD, title_size)
    draw.text((70, 190), title, font=title_font, fill=WHITE)

    # Subtitle
    sub_font = ImageFont.truetype(FONT_REG, 27)
    draw.text((72, 190 + title_size + 30), subtitle, font=sub_font, fill=(190, 193, 209))

    # Footer tag line, bottom-right, mono, dot-separated
    tag_font = ImageFont.truetype(FONT_MONO, 18)
    tw = draw.textlength(tags, font=tag_font)
    draw.text((W - 72 - tw, H - 72), tags, font=tag_font, fill=MUTED)

    im.save(out_path)
    print(f"Wrote {out_path} ({W}x{H})")

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: generate_discipline_og.py <output.png> <title> <subtitle> <tags>")
        sys.exit(1)
    build(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
