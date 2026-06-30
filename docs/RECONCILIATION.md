# LedgerCap Reconciliation — 30 Jun 2026

**App 3.17.0** · **Seed v4** · commit after audit pass.

## C1 — Rafi seed double-count (closed)

Seed v4 uses **2026-04-02** opening balances only. No duplicate Rafi CDC layer on top of trade log. Fund converts tagged `internal: true` so `totalInvested()` gross stays legacy-only; UI metrics use `currentCostBasis()`.

Verify:

```bash
cd LedgerCap && node scripts/verify-ledger.js
```

Expected: cost basis ≈ **₨1,697,568**, PASM **1,555 @ 8.41**, all 7 Meezan units OK.

## Live vs local (historical)

| Metric | Live (884bdf7) | Local (v3.17.0) | Notes |
|--------|----------------|-----------------|-------|
| Dashboard “Invested” | Gross ₨2,375,415 | **Cost basis ₨1,697,568** | `State.calcTotalCost()` → `currentCostBasis()` |
| All-time return % | ~−24% (inflated denominator) | **+5.73%** (fallback NAVs) | `(value − cost) / cost` |
| PASM AKD | 1,555 @ 8.41 | **1,555 @ 8.41** | OK |
| Meezan fund units | Match PDF | **All 7 OK** | See verify script |

## Engine changes (v3.5 → v3.17)

| Change | File |
|--------|------|
| `currentCostBasis()` incl. global | `ledger.js`, `state.js` |
| Global txs in portfolio timeline | `ledger.js` |
| Demo mode preserves user ledger | `app.js` |
| Broker cash in net worth | `state.js`, `settings.js` |
| Sell clamping, sorted holdings | `ledger.js` |

## Still approximate (documented)

| Issue | Impact |
|-------|--------|
| Daily/monthly M2M performance | Uses today's prices on past dates — see Performance disclaimer |
| PSX worker 520 | Falls back to Yahoo + `FALLBACK_PRICES` |
| AKD uninvested cash | Manual field in Settings (~₨9k typical) |
| INTL realised P&L tab | PSX only in v3.17; global sells next release |

## Deploy checklist

1. Push to `main` → GitHub Pages
2. Hard refresh (`sw.js` **ledgercap-v82**)
3. `node scripts/verify-ledger.js` && `npm test`
4. Settings → confirm seed version 4, invested ≈ ₨1.70M
