#!/usr/bin/env python3
"""
Regenerates two derived files from the site's own HTML source, so they never
have to be hand-edited again:

  - assets/recent.json   (powers the homepage "Updates" ticker)
  - sitemap.xml           (search engine sitemap)

Run this from the repo root:
    python3 scripts/generate-derived-files.py

It is meant to be run automatically by the GitHub Actions workflow in
.github/workflows/auto-update.yml on every push to main.
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE_URL = "https://www.engineerzcorner.com"

EXCLUDE_DIRS = {".git", "node_modules", "scripts", ".github"}
EXCLUDE_FILES = set()  # add filenames here to skip them entirely

TITLE_RE = re.compile(r"<title>(.*?)</title>", re.S)
DATE_PUBLISHED_RE = re.compile(r'"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})"')
CANONICAL_RE = re.compile(r'<link rel="canonical" href="([^"]+)">')
NOINDEX_RE = re.compile(r'name="robots"[^>]*content="[^"]*noindex', re.I)

MAX_TICKER_ITEMS = 30


def find_html_files():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.startswith(".")]
        for fn in filenames:
            if fn.endswith(".html") and fn not in EXCLUDE_FILES:
                yield os.path.join(dirpath, fn)


def url_for(path):
    """Convert a filesystem path to the site's clean pretty-URL form."""
    rel = os.path.relpath(path, ROOT).replace(os.sep, "/")
    if rel == "index.html":
        return SITE_URL + "/"
    if rel.endswith("/index.html"):
        return SITE_URL + "/" + rel[: -len("index.html")]
    if rel.endswith(".html"):
        return SITE_URL + "/" + rel[: -len(".html")]
    return SITE_URL + "/" + rel


def git_lastmod(path):
    """Last commit date touching this file (YYYY-MM-DD), falls back to mtime."""
    try:
        out = subprocess.run(
            ["git", "log", "-1", "--format=%cd", "--date=short", "--", path],
            cwd=ROOT, capture_output=True, text=True, timeout=10,
        )
        d = out.stdout.strip()
        if d:
            return d
    except Exception:
        pass
    import datetime
    return datetime.date.fromtimestamp(os.path.getmtime(path)).isoformat()


def priority_for(url):
    if url == SITE_URL + "/":
        return "1.0"
    # discipline landing pages (one path segment, trailing slash)
    path = url[len(SITE_URL):]
    segs = [s for s in path.split("/") if s]
    if len(segs) == 1 and path.endswith("/"):
        return "0.8"
    return "0.6"


def build_sitemap(files):
    entries = []
    for f in files:
        try:
            content = open(f, encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        if NOINDEX_RE.search(content):
            continue
        url = url_for(f)
        lastmod = git_lastmod(f)
        entries.append((url, lastmod, priority_for(url)))

    entries.sort(key=lambda e: e[0])

    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url, lastmod, priority in entries:
        lines.append(f"  <url><loc>{url}</loc><lastmod>{lastmod}</lastmod><priority>{priority}</priority></url>")
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def build_recent_json(files):
    items = []
    for f in files:
        try:
            content = open(f, encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        if NOINDEX_RE.search(content):
            continue
        m_date = DATE_PUBLISHED_RE.search(content)
        if not m_date:
            continue  # only pages with structured datePublished are eligible for the ticker
        m_title = TITLE_RE.search(content)
        if not m_title:
            continue
        title = m_title.group(1)
        title = re.sub(r"\s*[|\u2014-]\s*Engineerz Corne?R.*$", "", title, flags=re.I).strip()

        m_canon = CANONICAL_RE.search(content)
        if m_canon:
            url = m_canon.group(1)
            rel_url = url[len(SITE_URL):] if url.startswith(SITE_URL) else url
        else:
            full = url_for(f)
            rel_url = full[len(SITE_URL) + 1:]

        items.append({"t": title, "u": rel_url, "d": m_date.group(1)})

    items.sort(key=lambda i: i["d"], reverse=True)
    return items[:MAX_TICKER_ITEMS]


def main():
    files = list(find_html_files())

    sitemap_xml = build_sitemap(files)
    sitemap_path = os.path.join(ROOT, "sitemap.xml")
    with open(sitemap_path, "w", encoding="utf-8") as fh:
        fh.write(sitemap_xml)
    print(f"Wrote {sitemap_path} ({len(files)} files scanned)")

    recent_items = build_recent_json(files)
    recent_path = os.path.join(ROOT, "assets", "recent.json")
    with open(recent_path, "w", encoding="utf-8") as fh:
        json.dump(recent_items, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    print(f"Wrote {recent_path} ({len(recent_items)} items)")


if __name__ == "__main__":
    sys.exit(main())
