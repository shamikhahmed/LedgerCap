# StundsOS — Product Presentation

---

## Slide 1 — Title

# StundsOS
### Personal Wealth Operating System

*PSX · Meezan Funds · Net Worth · Financial Freedom*

**Live:** shamikhahmed.github.io/LedgerCap

---

## Slide 2 — Problem

Pakistani investors split wealth across:

- Multiple brokers (Rafi, AKD…)
- Islamic funds (Meezan, etc.)
- Spreadsheets that drift from reality

No single **offline** view of true net worth.

---

## Slide 3 — Solution

**StundsOS** — ledger-first wealth OS:

- Bloomberg-density dashboard on iPhone
- PSX + fund holdings with live prices
- Transaction ledger as source of truth
- Financial freedom projection

Orange `#FF6B35` on `#0B0E11` — OS family DNA.

---

## Slide 4 — Dashboard

- Net worth hero
- Daily P&L (green `#0ECB81` / red `#F6465D`)
- Allocation breakdown
- Wealth insights: concentration, streaks

*Terminal aesthetics. Consumer simplicity.*

---

## Slide 5 — Ledger engine

Every buy, sell, contribution, salary → recalculated:

- Average cost
- Unrealised gain
- Portfolio weight

**Transactions are truth.** Dashboard is a view.

---

## Slide 6 — Live prices

- Yahoo Finance via Cloudflare Worker proxy
- PSX symbol mapping
- Fallback prices when CORS blocks
- 6-hour sensible cache behaviour

Deploy once from `worker/` — paste URL in Settings.

---

## Slide 7 — Financial freedom

Set target annual passive income.

StundsOS projects:

- Months to freedom at current contribution rate
- Salary vs investment ratio
- Contribution streak gamification

---

## Slide 8 — Pre-loaded reality

Shipped with real holdings scaffold:

- Rafi: 22 stocks
- AKD: 8 stocks
- Meezan: 7 funds

Fork and replace with your portfolio in minutes.

---

## Slide 9 — Architecture

```
app.js           — Router, splash, install hint
engines/ledger   — Cost basis, P&L
engines/prices   — Yahoo + proxy
modules/         — dashboard, portfolio, transactions…
worker/          — Cloudflare PSX proxy
```

Vanilla JS PWA. No npm for the app itself.

---

## Slide 10 — Privacy

- localStorage only
- No brokerage login credentials stored
- Optional Worker sees only public ticker URLs
- Export JSON anytime

---

## Slide 11 — iPhone

Safari → Add to Home Screen

Safe area nav · tabular nums · 430px max width

Feels like a native finance app.

---

## Slide 12 — Close

> *Know your net worth. Own your ledger. Reach financial freedom.*

**StundsOS** — github.com/shamikhahmed/LedgerCap

*Shamikh Ahmed · Karachi*
