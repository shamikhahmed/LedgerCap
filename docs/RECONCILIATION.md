# LedgerCap Reconciliation — 16 Jun 2026

v3.5.1 / seed v4 — calculation + UI fixes (local; push to deploy on GitHub Pages).

## Live vs local (commit `884bdf7` vs disk)

| Metric | Live (884bdf7) | Local (v3.5.1) | Notes |
|--------|----------------|----------------|-------|
| Dashboard “Invested” | Gross ₨2,375,415 | **Cost basis ₨1,697,568** | `State.calcTotalCost()` → `currentCostBasis()` |
| All-time return % | ~−24% (inflated denominator) | **+5.73%** (fallback NAVs) | `(value − cost) / cost` |
| MIIF-B gain % | ~−88% (wrong basis / stale) | **+1.64%** | Ledger `avgNav` 55.31 vs NAV 56.22 |
| Growth Quality score | 120/100 | **100/100** (clamped) | Intel scores capped 0–100 |
| Dividend Quality | Long decimals | **Integer /100** | Rounded display |
| PASM AKD | 1,555 @ 8.41 | **1,555 @ 8.41** | OK both |
| Meezan fund units | Match PDF | **All 7 OK** | See verify script |

Run verification:

```bash
cd LedgerCap && node scripts/verify-ledger.js
```

## Engine changes (v3.5.0 → v3.5.1)

| Change | File |
|--------|------|
| `currentCostBasis()` for return metrics | `ledger.js`, `state.js`, `investment.js` |
| Sell clamping, sorted holdings | `ledger.js` |
| Home sparkline stocks + funds | `home.js` |
| Performance cost basis header | `performance.js` |
| Intel scores clamped 0–100 | `portfolio-analytics-service.js`, `intelligence.js` |
| PSX proxy fail → Yahoo/CORS/fallback, no CORS block | `prices.js` |
| Desktop full-width shell (VaultCap pattern) | `app.css`, `ledger-os.css` |
| Proxy timeseries sort-by-timestamp | `prices.js`, `worker/src/index.js` |

## Seed v4 (unchanged version bump)

- Opening date 2026-04-02; EFERT/PPL oversell fixes
- Fund converts tagged `internal: true`

## Still open

| Issue | Impact |
|-------|--------|
| MBF→MIIF Apr-28 convert: ₨35k cost leaves MBF without MIIF-B receipt | **Closed** — portfolio cost basis matches AMC fund `investedValue` totals (₨634,776); internal convert redistributes cost between MBF/MIIF-B without changing portfolio total |
| Daily/monthly M2M performance uses today's prices on past dates | Performance tab approximate |
| PSX worker often returns Cloudflare 520 | App falls back to Yahoo + `FALLBACK_PRICES` |
| Rafi opening + trade log still noisy in transaction history | Gross `totalInvested()` legacy only |

## Deploy checklist

1. Push all modified files to `main`
2. Hard refresh or clear site data (seed v4 migrates on load)
3. Optional: `cd worker && npx wrangler deploy` for sorted proxy response
4. Confirm Settings → seed version 4, dashboard invested ≈ ₨1.70M
