# LedgerCap — Production-readiness A–Z report

**Branch:** `design/hig-3` · **App:** 3.58.11 · **SW:** `ledgercap-v35811` · **Date:** 2026-10-25  
**Reviewer baseline:** CSP 0 · ios 23/23 · npm test (node suites) · `AUDIT-RAW.json`.

## Final review (gate fixes)

1. **PSX first** — Official PSX feed is first for PSX symbols when `proxyHealthy()`; Yahoo `.KA` only while the breaker is open or as fallback. Quiet degradation kept.
2. **Sheet bar label** — Primary moved to the bar keeps its full label (Urdu / multi-word / icons); optional `data-bar-label`. CSS ellipsis tightens.
3. **Sheet backdrop** — Removed per-open click listener; closes via existing `data-action` + LcEvents.
4. **boot-deferred version** — Deferred `?v=` from `LEDGERCAP_VERSION` (config ↔ VERSION.json); no hardcoded `3.58.11`.
5. **PriceHealth copy** — “Market data unavailable…” only when `_LC_MARKET_UNAVAILABLE`; otherwise “Some prices are from the last close (…)”.
6. **Scroll lock** — Shared ref-counted `LcScrollLock` for bottom sheet, CapConfirm, Cmd-K, and pro modal.
7. **#rt-search** — Handled on `input` only (no duplicate `change`).
8. **iOS tappable** — Dropped body-wide MutationObserver; `[data-action],[data-nav]` use `cursor:pointer` (WebKit clickable). ios:check still WebKit-only for reviewer.
9. **SECURITY Worker** — `trading-board` / `market-watch` served as `text/plain; charset=utf-8` + `X-Content-Type-Options: nosniff` + `Content-Security-Policy: sandbox` (not `text/html` with ACAO `*`). **Owner must `cd worker && wrangler deploy`.**

## Round 3 summary (≤20 lines)

1. **Dead control** — `Navigation.goResearchIntel` exported; Research portfolio → research.
2. **Escape** — Document Esc closes top-most sheet (after dialogs/cmdk).
3. **Theme** — Settings Light/Dark via `data-tab`; persists `localStorage.theme` + `html[data-theme]`.
4. **Market proxy** — Repo Worker proxies PSX; board HTML now safe text/plain. Client prefers PSX when healthy, Yahoo/cache otherwise.
5. **axe** — Home `<h1>`; bottom `#nav` landmark; `#screens` `role="main"`.
6. **Owner must deploy:** `cd worker && wrangler deploy` so live proxy serves timeseries + safe board text.
7. **Tests:** prices-source-order, scroll-lock, version-coherence boot-deferred, worker html-board text/plain, lc-events gates. Re-run browser audit / ios:check outside sandbox.

## Checklist A–L

| Gate | Status | Evidence |
|---|---|---|
| **A. Build & gates** | **FIXED** | Bundle + node units (incl. final-review tests). |
| **B. Screen inventory** | **PASS** | `INVENTORY.md`. |
| **C. Visual pass** | **pending reviewer** | Re-run audit shots. |
| **D. Interaction pass** | **code FIXED** | Esc / theme / sheet / scroll lock — browser confirm pending. |
| **E. Core flows** | **code FIXED** | Same; re-run `prod-ready-audit.mjs`. |
| **F. iPhone behaviour** | **PASS** (prior) | ios 23/23 WebKit; re-check after cursor:pointer change. |
| **G. Accessibility** | **code FIXED** | Home h1 + nav landmark; axe re-run pending. |
| **H–L** | **unchanged / FIXED** | See Round 1–2. |

## Owner deploy (Worker)

```bash
cd Cap-Apps/_workspace/LedgerCap-hig/worker
wrangler login   # if token expired
wrangler deploy
curl -sS "https://ledgercap-psx-proxy.shamikhahmed.workers.dev/health"
curl -sS -D- -o /dev/null "https://ledgercap-psx-proxy.shamikhahmed.workers.dev/trading-board/REG/main" | head -20
# Expect: Content-Type: text/plain; charset=utf-8, X-Content-Type-Options: nosniff, CSP: sandbox
curl -sS -o /dev/null -w "%{http_code}\n" "https://ledgercap-psx-proxy.shamikhahmed.workers.dev/timeseries/eod/LUCK"
```

Expect health 200, board **text/plain** (not text/html), timeseries **200**.

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
