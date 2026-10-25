# LedgerCap — Production-readiness A–Z report

**Branch:** `design/hig-3` · **App:** 3.58.11 · **SW:** `ledgercap-v35811` · **Date:** 2026-10-25  
**Reviewer baseline:** CSP 0 · ios 23/23 · npm test 32 pass / 2 skip · `AUDIT-RAW.json`.

## Round 3 summary (≤20 lines)

1. **Dead control** — `Navigation.goResearchIntel` was not a real method; audit + LcEvents early-return failed. Exported real `goResearchIntel()` (Research portfolio mode → research).
2. **Escape** — Bottom sheet had no Esc handler. Document Esc closes top-most sheet (after dialogs/cmdk); focus returns to opener.
3. **Theme** — Settings Light/Dark passed the button element into `_setTheme` (rejected). LcEvents now passes `data-tab`; `App.applyTheme` persists `localStorage.theme` + `html[data-theme]`.
4. **Market proxy** — Live Worker 404s board/timeseries (stale deploy). Repo Worker already proxies PSX; Round 3 adds HTML 200 passthrough for `trading-board` / `market-watch`. Client prefers Yahoo `.KA` + cached prices; skips board scrape when proxy unhealthy; quiet banner: “Market data unavailable — showing last saved prices (time)”.
5. **axe** — Home large title → `<h1 class="home-value">`; empty home gets `<h1>Home</h1>`; bottom `#nav` is landmark `<nav>` (dropped `role=tablist` override); `#screens` keeps `role="main"`.
6. **Owner must deploy:** `cd worker && wrangler deploy` (from this branch) so live `ledgercap-psx-proxy` serves timeseries/board/HTML-200. App degrades without deploy; board scrape stays off while proxy unhealthy.
7. **Tests:** `tests/lc-events-actions.test.js` + `tests/worker/html-board-passthrough.test.mjs`. Node suites green after `npm run bundle`. Re-run browser audit outside sandbox.

## Checklist A–L

| Gate | Status | Evidence |
|---|---|---|
| **A. Build & gates** | **FIXED** | Bundle + node units (incl. new action/worker tests). |
| **B. Screen inventory** | **PASS** | `INVENTORY.md`. |
| **C. Visual pass** | **pending reviewer** | Re-run audit shots. |
| **D. Interaction pass** | **code FIXED** | Esc / theme / goResearchIntel — browser confirm pending. |
| **E. Core flows** | **code FIXED** | Same; re-run `prod-ready-audit.mjs`. |
| **F. iPhone behaviour** | **PASS** (prior) | ios 23/23 WebKit. |
| **G. Accessibility** | **code FIXED** | Home h1 + nav landmark; axe re-run pending. |
| **H–L** | **unchanged / FIXED** | See Round 1–2. |

## Owner deploy (Worker)

```bash
cd Cap-Apps/_workspace/LedgerCap-hig/worker
wrangler login   # if token expired
wrangler deploy
curl -sS "https://ledgercap-psx-proxy.shamikhahmed.workers.dev/health"
curl -sS -o /dev/null -w "%{http_code}\n" "https://ledgercap-psx-proxy.shamikhahmed.workers.dev/timeseries/eod/LUCK"
```

Expect health 200 and timeseries **200** (JSON or soft empty), not 404.

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
