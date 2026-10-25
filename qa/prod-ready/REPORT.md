# LedgerCap — Production-readiness A–Z report

**Branch:** `design/hig-3` · **App:** 3.58.11 · **SW:** `ledgercap-v35811` · **Date:** 2026-10-25  
**Ports:** 8850 (audit server) · **Browser note:** Cursor sandbox blocked Chromium/WebKit launch (`all` permission rejected). Visual/interaction re-run: `qa/prod-ready/run-outside-sandbox.sh` or `LC_IOS_BROWSER=chromium node scripts/ios-behaviour-check.mjs http://127.0.0.1:8850/`. Reviewer should re-run WebKit. Prior HIG gate on this branch: **22/22** (`qa/prod-ready/ios-check-prior-hig.txt`). Screenshots: representative prior HIG pairs in `qa/prod-ready/shots/` (3 PNGs); full matrix not captured this session.

## Checklist A–L

| Gate | Status | Evidence |
|---|---|---|
| **A. Build & gates** | **FIXED** | Unit suites green (73 asserts + version-coherence 13). No separate lint/tsc. `VERSION.json` ↔ SW ↔ config ↔ package ↔ manifest ↔ index `?v=` aligned to **3.58.11** / `ledgercap-v35811`. E2E Playwright not re-run here (browser launch blocked); smoke gains “header More → More hub”. |
| **B. Screen inventory** | **PASS** | `qa/prod-ready/INVENTORY.md` from `navigation.js` VALID + `index.html` screens (25 routes + chrome). |
| **C. Visual pass** | **FAIL*** | *Environment: no live multi-viewport capture. Representative HIG phone/iPad shots copied. Code/CSS: document scroll + tabbar padding `tabbar-h+48+safe` already in `ledgercap.css`. Re-run `scripts/prod-ready-audit.mjs` for ≤40 shots. |
| **D. Interaction pass** | **FIXED** (partial) | Defect: ⋯ More → Settings (**fixed** → More hub). Pilot/paper missing from More tiles (**fixed**). Sell/Research precedence fixed in prior HIG. Full tap matrix needs Chromium audit script. |
| **E. Core flows** | **PASS** (prior + static) | Existing e2e/smoke cover demo nav, portfolio, research, dividends, pilot, comparison. Persistence/edge-data deep pass not re-executed without browser. |
| **F. iPhone behaviour** | **PASS** (prior) / **FAIL*** this session | Prior: 22/22. This session WebKit Abort trap; Chromium sandbox kill. Script now supports `LC_IOS_BROWSER=chromium`. |
| **G. Accessibility** | **N/A** this session | axe not run (no browser). Sheet has `aria-modal` + `aria-labelledby`; PIN dialog labelled. Re-run `npm run test:a11y` / `scripts/capture-axe.mjs`. |
| **H. PWA/offline** | **FIXED** | Manifest icons + maskable; theme/bg `#000000`; G-3 description. SW precache added `theme-boot.js`, `hig-dt.js`, `pro-modal.js`. No auto skipWaiting/claim. Design CSS already precached. |
| **I. Performance** | **PASS** (static) | Tokens + app.css render-blocking only; deferred bundle on demand; no double-load of design CSS beyond cascade imports. |
| **J. Robustness & privacy** | **FIXED** (partial) | Calendar/watchlist escapes; no secrets in repo (Telegram via wrangler secrets only). External hosts listed in INVENTORY. `target=_blank` uses `rel=noopener`. |
| **K. Content** | **FIXED** | Manifest no longer “Wealth Operating System”. Demo labelled. No user-visible lorem/TODO found in shell copy. |
| **L. Docs** | **FIXED** | README / HANDOVER / CHANGELOG Unreleased+3.58.11 / DESIGN.md still accurate to HIG brass. |

\*FAIL only for evidence not collectible in this agent sandbox — not claimed product regressions.

## Defects found & fixed

| Sev | Screen | Cause | Fix commit |
|---|---|---|---|
| High | Top bar ⋯ | `App.openHeaderMenu` called `Navigation.go('settings')` while control is labelled More | `fix(nav): header More opens More hub` |
| Medium | More hub / sidebar | Phone More missing pilot-tools & paper-trade; sidebar missing compare/performance/journal | `fix(nav): sync More hub and sidebar tools` |
| High | Version/PWA | VERSION `v35810` / config `3.58.9` / SW `v35811` / manifest `3.58.6` drift | `fix(version): align 3.58.11 with SW cache` |
| Medium | Offline shell | `theme-boot.js`, `hig-dt.js`, `pro-modal.js` not in SW ASSETS | `fix(sw): precache shell boot scripts` |
| Medium | Manifest | “Wealth Operating System” (G-3); bg `#0B0E11` ≠ `--bg` | same version commit |
| Medium | Calendar / watchlist | Unescaped symbol/title in HTML / attr | `fix(a11y): escape calendar and watchlist fields` |

## Still FAIL / blocked

| Item | Why |
|---|---|
| Live C/D/F/G matrix + axe + offline reload proof | Browser cannot launch under Cursor seatbelt; user/reviewer must run `run-outside-sandbox.sh` |
| E2E Playwright count this session | Same |

## Test counts

| Suite | Before | After |
|---|---|---|
| Unit (node) | 73 pass (9 files) | **86** pass (10 files: +13 version-coherence) |
| ios:check (prior HIG) | 22/22 | 22/22 retained |
| ios:check this session | — | blocked |
| Playwright e2e | (not re-run) | +1 smoke test authored |

## Commands for reviewer

```bash
cd Cap-Apps/_workspace/LedgerCap-hig
python3 -m http.server 8850 &
export PLAYWRIGHT_BROWSERS_PATH=$HOME/Library/Caches/ms-playwright
export PLAYWRIGHT_CHROMIUM_USE_HEADLESS_SHELL=0
export LC_IOS_BROWSER=chromium
node scripts/ios-behaviour-check.mjs http://127.0.0.1:8850/
node scripts/prod-ready-audit.mjs http://127.0.0.1:8850/
npm test
```
