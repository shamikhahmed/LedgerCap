# LedgerCap — Production-readiness A–Z report

**Branch:** `design/hig-3` · **App:** 3.58.11 · **SW:** `ledgercap-v35811` · **Date:** 2026-10-25  
**Ports:** 8850 (audit server) · **ios:check:** WebKit-only (`scripts/ios-behaviour-check.mjs`).  
**Reviewer (outside sandbox):** WebKit ios-check **23/23 PASS**; `npm test` **30 passed / 2 skipped**; audit raw in `qa/prod-ready/AUDIT-RAW.json` (36 console errors, all CSP — addressed in Round 2 below). Agent sandbox still cannot launch browsers; re-verify after Round 2.

## Checklist A–L

| Gate | Status | Evidence |
|---|---|---|
| **A. Build & gates** | **FIXED** | Unit suites + version-coherence (incl. `boot-deferred.js`). Versions aligned **3.58.11** / `ledgercap-v35811`. |
| **B. Screen inventory** | **PASS** | `qa/prod-ready/INVENTORY.md` (25 routes + chrome). |
| **C. Visual pass** | **pending reviewer run** | Shots/matrix exist from prior reviewer audit; agent cannot re-capture. Re-run `scripts/prod-ready-audit.mjs`. |
| **D. Interaction pass** | **pending reviewer run** | Code fixes in (More hub, Research search CSP). Full tap matrix needs Chromium audit re-run. |
| **E. Core flows** | **pending reviewer run** | Smoke + new Research/CSP Playwright specs authored; browser re-run required to confirm green. |
| **F. iPhone behaviour** | **PASS** (reviewer) | WebKit ios-check **23/23**. Keep WebKit-only (no engine fallback / `LC_*` path switches). |
| **G. Accessibility** | **pending reviewer run** | Audit script now injects axe via `bypassCSP: true` context only. Re-run audit / `npm run test:a11y`. |
| **H. PWA/offline** | **FIXED** | SW precache: theme-boot, hig-dt, pro-modal, **boot-deferred**. No auto skipWaiting/claim. |
| **I. Performance** | **PASS** (static) | Deferred bundle on demand via external `boot-deferred.js` (CSP-safe). |
| **J. Robustness & privacy** | **FIXED** (CSP Round 2) | No inline boot script; no Research `oninput`/`onmousedown`. CSP `script-src` stays without `unsafe-inline`. |
| **K. Content** | **FIXED** | Manifest G-3; demo labelled. |
| **L. Docs** | **FIXED** | README / HANDOVER / CHANGELOG / this report. |

## Round 2 — CSP / audit (2026-10-25)

| Sev | Issue | Fix |
|---|---|---|
| High | Inline `<script>` idle-loader in `index.html` blocked by CSP → deferred never defined cleanly | `js/boot-deferred.js` + `<script defer src>` + SW precache |
| High | Research `oninput` / search-hit `onmousedown` blocked → search dead in production | Remove inline handlers; LcEvents `#rt-search` input + `data-action` hits; mousedown preventDefault on `.lc-search-hit` |
| Medium | axe `addScriptTag` blocked by meta CSP (route header strip ineffective) | Dedicated context `bypassCSP: true` for axe only; separate non-bypassed CSP pass |
| Medium | HTTP failures not inventoried | Audit records every response status ≥400 into `AUDIT-RAW.json` (`httpErrors`) |
| Test | Regression risk | Playwright: Research search filters; no CSP console noise across all VALID screens |

**Still needing browser evidence (pending reviewer run):** C visual matrix, D full interaction, E e2e confirmation, G axe findings after bypassCSP fix. Prior AUDIT-RAW CSP console noise should clear once Round 2 is re-audited.

## Defects found & fixed (Round 1)

| Sev | Screen | Cause | Fix commit |
|---|---|---|---|
| High | Top bar ⋯ | More opened Settings | `fix(nav): header More opens More hub` |
| Medium | More hub / sidebar | Missing pilot/paper/compare tools | `fix(nav): sync More hub and sidebar tools` |
| High | Version/PWA | Version drift across artifacts | `fix(version): align 3.58.11 with SW cache` |
| Medium | Offline shell | Boot scripts not precached | `fix(sw): precache shell boot scripts` |
| Medium | Manifest | “Wealth Operating System”; bg mismatch | same version commit |
| Medium | Calendar / watchlist | Unescaped fields | `fix(a11y): escape calendar and watchlist fields` |

## Test counts

| Suite | Round 1 | Round 2 (expected after reviewer) |
|---|---|---|
| Unit (node) | 86 pass (version-coherence) | +2 asserts (boot-deferred) |
| ios:check WebKit | — | **23/23** (reviewer) |
| Playwright e2e | +1 More smoke | +2 CSP/Research specs (agent authored; run pending) |

## Commands for reviewer

```bash
cd Cap-Apps/_workspace/LedgerCap-hig
python3 -m http.server 8850 &
export PLAYWRIGHT_BROWSERS_PATH=$HOME/Library/Caches/ms-playwright
export PLAYWRIGHT_CHROMIUM_USE_HEADLESS_SHELL=0
node scripts/ios-behaviour-check.mjs http://127.0.0.1:8850/
node scripts/prod-ready-audit.mjs http://127.0.0.1:8850/
npm test
```
