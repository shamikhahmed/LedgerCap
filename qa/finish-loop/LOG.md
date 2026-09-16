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

## 2026-09-16 — C-43 finish/ledgercap-r3
- One refresh (KSE ticker); remove hub Refresh + health Refresh + stale chip button
- Funds tab pie icon; tab labels ≥11px; inline demo banner (no toast)
- Stale banner wraps; sentence-case greet; ticker freshness hides ≤360px

### 2026-09-16 C-57 Pages allowlist
- **Problem:** Pages published repo-root internals (HANDOVER/CLAUDE/qa/worker/package.json).
- **Root cause:** deploy copied (nearly) the whole tree.
- **Change:** `scripts/stage-pages-site.sh` + `verify-pages-artifact.cjs`; workflow stages allowlisted paths only.
- **Verification:** local stage dry-run + SW precache check; live curl after deploy.
