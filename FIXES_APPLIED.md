# Homepage Bug Fixes & Prevention

## What Was Wrong

Your root `index.html` got overwritten with a copy of `/posts/index.html` while its CSS and JS files (`index.inline.css` and `index.inline.js`) were never updated. This caused:

- Unstyled post cards (missing CSS class definitions)
- "0 Posts / 0 Disciplines" stats (wrong JS never loaded)
- Broken "Home" links (wrong target paths)

## What's Fixed

### 1. Restored Homepage Files

- `index.html` — The real homepage (discipline hub, visit streak, note-of-day)
- `index.inline.css` — Correct homepage styling (81KB)
- `index.inline.js` — Correct homepage logic (jokes rotator, OTD, stats)

These are byte-for-byte identical to your original files from the first upload.

### 2. Added Validation Script

`scripts/validate-css-js-match.py` — Automatically checks that:
- Every HTML file's CSS classes are defined in its paired `.inline.css` file
- HTML files load all required shared assets (`common-blocks.css`, `sidebars.css`)
- Reports mismatches with actionable error messages

**Run it locally before pushing:**
```bash
python3 scripts/validate-css-js-match.py
```

Exit code 0 = all OK, 1 = mismatches found.

### 3. Added GitHub Actions Workflow

`.github/workflows/validate-css-js-sync.yml` — Automatically runs the validation on every push and PR to:
- Catch CSS/JS drift before it reaches production
- Prevent this exact bug from happening again

Triggers on any changes to `*.html`, `*.inline.css`, `*.inline.js`, or `assets/`.

## How to Deploy

1. Replace the 3 homepage files at your site root (`index.html`, `index.inline.css`, `index.inline.js`)
2. Add the validation script to `scripts/` and the workflow to `.github/workflows/`
3. Commit and push — GitHub Actions will validate on every future push

## Architecture Note

This bug was possible because `/index.html`, `/posts/index.html`, and their CSS/JS are separate files with identical filenames in different folders. They can drift silently if not all are copied together.

For future-proofing, you might consider:
- Having the root page link directly to `posts/index.inline.css` and `posts/index.inline.js` (eliminating duplication)
- OR documenting that root and posts files are a coupled pair and must always be deployed together

The validation script guards against this either way going forward.
