#!/usr/bin/env node
/**
 * auto-push-watcher.js
 * ---------------------
 * Run this in your project folder while you work:
 *
 *   node scripts/auto-push-watcher.js
 *
 * It watches every file in the repo. Whenever you save a change,
 * it waits a few seconds (in case you're saving multiple files),
 * then automatically runs:
 *
 *   git add -A
 *   git commit -m "chore: auto-update <timestamp>"
 *   git pull --rebase origin <branch>
 *   git push origin <branch>
 *
 * That push is what triggers your existing GitHub Action
 * (build-recent.yml), which regenerates assets/recent.json,
 * assets/site-stats.json, sitemap.xml and feed.xml from real git
 * history, commits them back, and Cloudflare Pages deploys it.
 *
 * This script does NOT replace that workflow — it just removes the
 * "remember to git add/commit/push" step so any save effectively
 * flows straight through to a live update.
 *
 * Setup (one-time):
 *   npm install chokidar --save-dev
 *
 * Stop it any time with Ctrl+C.
 */

const { execSync, exec } = require("child_process");
const path = require("path");

let chokidar;
try {
  chokidar = require("chokidar");
} catch {
  console.error(
    "\nMissing dependency 'chokidar'. Install it once with:\n\n  npm install chokidar --save-dev\n"
  );
  process.exit(1);
}

const ROOT = path.join(__dirname, "..");
const DEBOUNCE_MS = 8000; // wait this long after the last change before pushing
const BRANCH = getCurrentBranch();

// Anything matching these is ignored — mainly the files the GitHub
// Action itself regenerates and writes back, so we don't fight it
// or create a push loop.
const IGNORED = [
  /(^|[\/\\])\.git([\/\\]|$)/,
  /(^|[\/\\])node_modules([\/\\]|$)/,
  /(^|[\/\\])assets[\/\\]recent\.json$/,
  /(^|[\/\\])assets[\/\\]site-stats\.json$/,
  /(^|[\/\\])sitemap\.xml$/,
  /(^|[\/\\])feed\.xml$/,
];

function getCurrentBranch() {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT })
      .toString()
      .trim();
  } catch {
    console.error(
      "\u2717 Not inside a git repo (or git isn't installed). Run this from your site's git checkout."
    );
    process.exit(1);
  }
}

function run(cmd) {
  return execSync(cmd, { cwd: ROOT, stdio: "pipe" }).toString().trim();
}

let timer = null;
let pending = false;
let running = false;

function scheduleSync(reason) {
  console.log(`  \u270e change detected: ${reason}`);
  pending = true;
  if (timer) clearTimeout(timer);
  timer = setTimeout(syncNow, DEBOUNCE_MS);
}

function syncNow() {
  if (running) {
    // A sync is already in progress; the pending flag will trigger
    // another pass right after it finishes.
    return;
  }
  if (!pending) return;
  pending = false;
  running = true;

  try {
    const status = run("git status --porcelain");
    if (!status) {
      console.log("  (nothing to commit)");
      running = false;
      return;
    }

    run("git add -A");

    const stamp = new Date().toISOString().replace("T", " ").slice(0, 19);
    run(`git commit -m "chore: auto-update ${stamp}"`);
    console.log(`  \u2713 committed local changes (${stamp})`);

    try {
      run(`git pull --rebase origin ${BRANCH}`);
    } catch (e) {
      console.error(
        "  \u26A0 git pull --rebase failed \u2014 resolve conflicts manually, then this watcher will pick up again on the next save.\n",
        e.message
      );
      running = false;
      return;
    }

    run(`git push origin ${BRANCH}`);
    console.log(`  \u2713 pushed to origin/${BRANCH} \u2014 GitHub Action will rebuild recent.json/sitemap/feed now\n`);
  } catch (err) {
    console.error("  \u2717 sync failed:", err.message);
  } finally {
    running = false;
    // If more changes came in while we were syncing, run again.
    if (pending) setTimeout(syncNow, 500);
  }
}

console.log(`Watching ${ROOT} for changes on branch "${BRANCH}"...`);
console.log(`Changes will auto-commit + push ${DEBOUNCE_MS / 1000}s after your last save. Ctrl+C to stop.\n`);

const watcher = chokidar.watch(ROOT, {
  ignored: (p) => IGNORED.some((re) => re.test(p)),
  ignoreInitial: true,
  persistent: true,
  awaitWriteFinish: { stabilityThreshold: 500, pollInterval: 100 },
});

watcher
  .on("add", (p) => scheduleSync(`added ${path.relative(ROOT, p)}`))
  .on("change", (p) => scheduleSync(`changed ${path.relative(ROOT, p)}`))
  .on("unlink", (p) => scheduleSync(`removed ${path.relative(ROOT, p)}`))
  .on("error", (e) => console.error("watcher error:", e));
