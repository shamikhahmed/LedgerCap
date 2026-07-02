# LedgerCap — User Guide

LedgerCap is your **Personal Wealth Operating System** — track PSX stocks, Meezan Islamic funds, net worth, and the path to financial freedom.

**Live app:** https://shamikhahmed.github.io/LedgerCap/

---

## Getting started

1. Open LedgerCap in Safari on iPhone.
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
- **Holdings Seed** — **Settings → Load Demo Holdings** loads anonymized PSX + Meezan ledger (`INITIAL_TRANSACTIONS`)
- **Export** — backup ledger state (`.ledgercap`)
- **Reset** — clear all local data

---

## Zakat calculator

In **Settings → Zakat**:

1. Enter **Nisab** threshold (gold/silver equivalent in PKR).
2. Review **zakatable assets** — cash, gold, funds, stocks (per your methodology).
3. App computes **2.5% Zakat due** on eligible assets.
4. Disclaimer shown in-app: **estimates only — consult a qualified scholar** for religious obligations.

Zakat inputs are local-only; no data is sent to any server.

---

## IPO subscribe → list workflow

Track primary-market subscriptions in the ledger:

1. **Subscribe** — log IPO application (symbol, shares, amount blocked).
2. While pending, position shows as **IPO subscribed** (not yet listed).
3. **Mark listed** — when shares allot and trade, convert to normal holding with cost basis.
4. Net worth and insights update from ledger — same source of truth as PSX stocks.

This is record-keeping only — not a securities offering or brokerage service.

---

## Data & privacy

- All data in `localStorage` on your device
- No accounts; optional Worker only for public price feeds and encrypted cloud backup (opt-in)
- Works offline with last-known prices

---

## Backup & sync

| Method | Where | Notes |
|--------|-------|-------|
| **JSON export** | Settings → Export `.ledgercap` | Plain backup file |
| **Encrypted export** | Settings → Encrypted backup (PIN) | `.ledgercap.enc` — AES-GCM |
| **Cloud backup** | Settings → Push / Restore cloud | Uses Telegram sync key; encrypted payload on worker |

After adding a transaction, tap **Undo** on the toast within 10 seconds to revert.

---

## Portfolio tips

- Use **↻** on a holding card to refresh that symbol only (faster than full refresh).
- Open `#portfolio/akd` (or Rafi/Meezan) to jump straight to a broker bucket.
- Toggle **Cards / Table** on the portfolio screen for dense vs scan-friendly views.

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

*LedgerCap © 2026 Shamikh Ahmed*
