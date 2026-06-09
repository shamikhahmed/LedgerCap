# StundsOS — User Guide

StundsOS is your **Personal Wealth Operating System** — track PSX stocks, Meezan Islamic funds, net worth, and the path to financial freedom.

**Live app:** https://shamikhahmed.github.io/StundsOS/

---

## Getting started

1. Open StundsOS in Safari on iPhone.
2. Complete onboarding — set income, contribution targets, and financial freedom goal.
3. Review pre-loaded holdings (customise in Settings).
4. Land on **Dashboard** — Bloomberg-style net worth and P&L.
5. Install: **Share → Add to Home Screen**.

---

## Navigation

| Tab | Purpose |
|-----|---------|
| **Dashboard** | Net worth, daily P&L, allocation, insights |
| **Portfolio** | Holdings by broker (Rafi, AKD, Meezan) |
| **Transactions** | Buy, sell, contribution, salary ledger |
| **Income** | Salary log, projections, financial freedom tracker |
| **Settings** | PSX proxy URL, holdings seed, export |

---

## Portfolio

Holdings grouped by custodian:

- **Rafi** — PSX equities
- **AKD** — PSX equities  
- **Meezan** — Islamic mutual funds

Each holding shows:

- Quantity and average cost
- Live price (Yahoo Finance via optional Cloudflare Worker proxy)
- Unrealised P&L and weight in portfolio

Tap a holding for detail and transaction history.

---

## Transactions

Tap **+** FAB to add:

| Type | Use for |
|------|---------|
| Buy | New shares or fund units |
| Sell | Disposals |
| Contribution | Monthly investment |
| Salary | Income credited |

The ledger engine recalculates cost basis and portfolio totals automatically.

---

## Live prices

PSX symbols fetch via a **Cloudflare Worker proxy** (bypasses CORS):

1. Deploy worker from `worker/` (see `worker/README.md`)
2. Settings → **PSX Proxy URL** → paste Workers URL → Save
3. Prices refresh on dashboard load

Fallback prices apply when proxy is unset or Yahoo blocks a symbol.

---

## Income & financial freedom

- Log monthly salary
- Set **financial freedom target** (annual passive income goal)
- View projection chart — months to target at current contribution rate
- **Contribution streak** tracked in insights

---

## Insights engine

Dashboard surfaces:

- Concentration risk (single-stock weight warnings)
- Contribution streaks
- Sector allocation
- Net worth trend

---

## Settings

- **PSX Proxy URL** — Cloudflare Worker endpoint
- **Holdings** — edit seed data in `js/data/holdings.js` or via UI
- **Export** — backup ledger state
- **Reset** — clear all local data

---

## Data & privacy

- All data in `localStorage` on your device
- No accounts; optional Worker only for public price feeds
- Works offline with last-known prices

---

## Tips

- Deploy the PSX proxy for accurate live PSX quotes.
- Log salary the same day each month for clean income charts.
- Watch concentration insights — PK portfolios often overweight 2–3 names.
- Export JSON before iOS storage cleanup.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Prices show ₹0 or stale | Configure PSX Proxy URL in Settings |
| ENGROH wrong price | Check symbol map in `js/data/config.js` |
| Net worth mismatch | Reconcile via Transactions tab — ledger is source of truth |
| FAB missing | Ensure you're on Dashboard or Transactions screen |

---

*StundsOS © 2026 Shamikh Ahmed*
