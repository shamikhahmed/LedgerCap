# Capricorn Workspace Audit — 16 Jun 2026

Full pass across hub + 8 Cap apps after performance fast-mode rollout.

## Executive summary

| Area | Status |
|------|--------|
| **Tab / navigation speed** | Fixed — GSAP + 3D scene removed from app shells (`data-cap-app="1"`) |
| **LedgerCap financial math** | Improved — cost basis for returns; gross invested excludes internal fund converts |
| **Desktop layout (LedgerCap)** | Fixed — full-width shell ≥900px |
| **PSX live prices** | Degraded — worker often 520; fallbacks active |
| **Performance history charts** | Labeled approximate (today's prices on past dates) |

---

## LedgerCap

### Fixed this audit
- Gross `totalInvested()` excludes `internal` fund converts (₨2.07M vs ₨2.38M)
- Performance tab disclaimer + renamed Predictive → **Forecast**
- Research: **Smart rating** label (not fake AI)
- Portfolio intel mode **persists** in sessionStorage across tab switches
- Intelligence scores rounded to integers

### Open issues

| Severity | Issue | Notes |
|----------|-------|-------|
| High | PSX proxy 520 errors | Fallback NAVs used; Settings shows proxy health |
| High | Rafi seed double-history | Share counts OK; transaction history noisy |
| Medium | MBF→MIIF Apr-28 orphan convert | ~₨35k cost basis gap vs AMC books |
| Medium | Daily/monthly M2M charts | Indicative only — disclaimer added |
| Medium | `screen-intelligence` orphan DOM | Intel only via Research → Portfolio intel |
| Low | XIRR / analytics not revalidated | Uses cost basis where wired |

**Verify:** `cd LedgerCap && node scripts/verify-ledger.js`

---

## VaultCap

| Severity | Issue | Status |
|----------|-------|--------|
| — | Fast mode on shell | ✓ |
| Medium | Large `app.js` single bundle | Acceptable; lazy-load future |
| Medium | Lock screen decorative blur orbs | CSS only; no RAF |
| Low | External CDN scripts (xlsx, jsqr) | Required for import features |

---

## PulseCap / PrismCap / SteadyCap / DeePonyCap

| Check | Status |
|-------|--------|
| `data-cap-app="1"` | ✓ |
| No GSAP on index | ✓ |
| capricorn-core + app-fast | ✓ |

Per-app functional audits delegated — see git commits on each repo for any fixes applied.

---

## ScentCap / AuraCap (React + Vite)

| Check | Status |
|-------|--------|
| `npm run build` | ✓ passes |
| `data-cap-app` on body | ✓ |
| Bundle size | Warning: main chunk ~820KB — code-split recommended |
| capricorn-core in public | ✓ synced |

---

## Hub (shamikhahmed.github.io)

| Check | Status |
|-------|--------|
| PRODUCTS catalog | Single source in `js/products-data.js` |
| Launch links | Point to `*.github.io/{App}/` |
| Marketing cinematic | GSAP allowed on hub (not app shell) |

---

## How to re-run audit

```bash
cd capricorn-tooling
node scripts/workspace-audit.mjs
node scripts/sync-design-system.mjs
node scripts/enable-app-fast-mode.mjs
```

---

## Recommended next session

1. Rebuild Rafi broker 6773 seed as single timeline
2. Historical price cache for honest performance charts
3. React apps: lazy routes to cut 800KB main bundle
4. PSX worker: alternate upstream or cache layer on KV

---

*Generated during autonomous audit session. Update after each major release.*
