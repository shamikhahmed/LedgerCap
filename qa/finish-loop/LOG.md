### 2026-09-15 LedgerCap 3.57.2 TIER1 PASS
- CI green: https://github.com/shamikhahmed/LedgerCap/actions/runs/34967963640
- `npm run tier1` → PASS (23 pass, 0 fail, 1 warn matrix:shots)
- VO ⛔ BLOCKED-EXTERNAL — fleet Tier 1 not claimed
- Closing LedgerCap → AuraCap (§14 #10)

### 2026-09-15 LedgerCap 3.57.2 Tier1 drive
- LCBrand · tooling brandOk · finish-loop records · VM test helper

### 2026-09-15 LedgerCap gallery regen
- `npm run gallery` PASS (1 test, ~16.5m)
- Regenerated assets/screenshots/* + embedded screen-gallery.html (83 screens)

### 2026-09-16 C-57 Pages allowlist
- **Problem:** Pages published repo-root internals.
- **Root cause:** deploy copied (nearly) the whole tree.
- **Change:** allowlisted stage script + SW verify; workflow stages public paths only.
- **Verification:** local stage dry-run; live curl after deploy.

## 2026-09-16 — C-43 Step R
### §15 mini-plan
- Problem: multiple refresh controls; Funds $ icon; tab labels <11px; demo toast overlays cards; stale banner truncates; ticker overflows at 320.
- Root cause: strip/compact/section/market/funds each exposed App.refreshPrices; demo toasts still fired on refresh; freshness span unbounded.
- Files: market-ui.js, psx-ui.js, funds.js, market.js, app.js, icons/navigation, lc-pro*.css, price-health.js, bundle
- Change: KSE ticker (+ pull-to-refresh) is the one refresh; pie Funds icon; ≥11px tabs; demo → inline banner only; wrap stale banner; hide freshness ≤360px.
- Risks: users must discover ticker tap for refresh.
- Verification: npm run bundle; node --check; npm test (unit+e2e subset); tier1 honest FAIL.

## 2026-09-16 — Finish Review 3 follow-up (finish/ledgercap-stepR)
- Committed: C-29 tokens.css + CSS var migration; SW/index link tokens+brand; C-31 matrix env-gate + playwright .mjs match; CI-WORKFLOW; screenshots skip-allowlist; honest TIER1 FAIL.
- Left uncommitted: none.
- Not merging (Tier1 FAIL: matrix-results / axe / gallery).
