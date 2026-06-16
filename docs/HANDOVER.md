# LedgerCap — Engineering Handover

**Version:** 3.4.5 (seed v3)  
**Last updated:** 16 Jun 2026  
**Owner:** Shamikh Ahmed  
**Live:** https://shamikhahmed.github.io/LedgerCap/  
**Repo:** https://github.com/shamikhahmed/LedgerCap  

---

## 1. What LedgerCap Is

LedgerCap is a **vanilla JS PWA** (no build step for the web app) for tracking a personal Pakistan portfolio:

| Account | Broker / AMC | Asset types |
|---------|--------------|-------------|
| **Rafi** | CDC broker account **6773** | PSX equities + ETFs |
| **AKD** | AKD account **COAF55870** | PSX equities |
| **Meezan** | Al Meezan portfolio **733102-1** | Islamic mutual funds |

Features: dashboard, portfolio, transactions, performance P&L, dividends, research, settings. Data persists in **localStorage** (`ledgercap_v2`).

**Important:** This is a **rules-based** wealth tracker. There is no LLM in production paths. Do not market it as “AI-powered portfolio management.”

---

## 2. Architecture (Ledger-First)

```
index.html
  └── js/data/config.js          # PSX proxy URLs
  └── js/data/holdings.js        # SEED: static arrays + INITIAL_TRANSACTIONS + FALLBACK_PRICES
  └── js/data/fundamentals.js    # Research fundamentals (includes PASM metadata)
  └── js/data/dividends.js
  └── js/engines/ledger.js       # ★ Core: holdings, funds, P&L, timeline
  └── js/engines/prices.js       # Live PSX fetch + fallbacks
  └── js/engines/analytics.js    # XIRR, allocation, totalReturn
  └── js/modules/state.js        # localStorage, calcTotalValue, seed migration
  └── js/modules/*.js            # UI screens
  └── sw.js                      # Service worker (same-origin cache only)
  └── worker/                    # Cloudflare PSX proxy (optional deploy)
```

**Intended model:** `INITIAL_TRANSACTIONS` is source of truth → `Ledger.calcHoldings()` / `calcFundHoldings()` derive positions → `State.calcTotalValue()` marks to market using `state.prices`.

**Actual model today:** Static arrays in `holdings.js` (`RAFI_STOCKS`, etc.) are **display metadata** that can drift from computed ledger. Several metrics use **gross transaction sums**, not cost basis. Performance history uses **today’s prices** on past dates.

---

## 3. Source Documents (Ground Truth)

These are the user’s real statements. Seed data was built from them (with OCR / manual fixes). **Do not invent trades.**

| Account | Source file | As-of date | Notes |
|---------|-------------|------------|-------|
| **Meezan** | `/Users/shamikhahmed/Downloads/733102-1.pdf` | 15-Jun-2026 | Text PDF; full PURCHASE / CONVERT IN / CONVERT OUT history |
| **AKD** | `/Users/shamikhahmed/Documents/IMG_8009.pdf` | 1–16 Jun 2026 | Image-only PDF; trades extracted manually |
| **Rafi** | Screenshot trade log (account 6773) | 3-Apr–12-Jun-2026 | Low-res print preview; OCR unreliable |

### PASM split (AKD) — business rule

- **Jun 8 AKD buy:** 11,000 PASM @ ~₨8.41 (total block in broker account).
- **Friend’s money:** ~₨80,000 ≈ **9,445 shares** — **must NOT** appear in Shamikh’s portfolio, invested total, P&L, or net worth.
- **Shamikh’s portion:** **1,555 shares** @ 8.41 — **must** appear in AKD holdings and one BUY transaction only.

Constants in `holdings.js`: `FRIEND_PASM_SHARES = 9445`, `USER_PASM_SHARES = 1555`, `PASM_AKD_AVG_COST = 8.41`.

---

## 4. Current Seed Data (`js/data/holdings.js`)

| Constant | Purpose |
|----------|---------|
| `PORTFOLIO_SEED_VERSION` / `SEED_DATA_VERSION` | **3** — bump triggers full transaction replace in `state.js` |
| `INITIAL_TRANSACTIONS` | ~149 rows (143 investment + 6 salary) |
| `RAFI_STOCKS` / `AKD_STOCKS` / `MEEZAN_FUNDS` | Static snapshots for names, sectors, display avg costs |
| `FALLBACK_PRICES` | PSX EOD 16-Jun-2026 + Meezan NAVs from statement |

### Rafi data model problem (Critical)

Seed combines **two incompatible layers**:

1. **22 synthetic “Pre-statement portfolio baseline” buys** dated `2024-08-01` (`t_0001`–`t_0022`).
2. **~82 real trades** from Rafi account 6773 (Apr–Jun 2026), including a large **Apr 20 sell-down** and **Apr 21–22 re-buys** that duplicate baseline quantities.

**Share counts** at end state mostly match `RAFI_STOCKS`, but **gross invested capital and realised P&L are wrong** because the ledger records fictional round-trips (buy → sell → re-buy same names).

**Known oversells in seed (corrupt realised P&L on sell dates):**

| Date | Symbol | Held (approx.) | Sold | Issue |
|------|--------|----------------|------|-------|
| 2026-04-20 | EFERT | 100 | 160 | Oversell by 60 |
| 2026-04-20 | PPL | 40 | 50 | Oversell by 10 |

### Meezan data gap

- `t_mbf_out` (28-Apr-2026): MBF **CONVERT OUT** 1,285.969 units / ₨35,000 to MIIF — **no matching MIIF-B CONTRIBUTION** on that date. Units balance, but ₨35k disappears from fund accounting.

### AKD data

- 13 BUY transactions (Jun 2026 only). No pre-June AKD history in app.
- Cash balance (~₨9,097 on statement) **not modeled** — app is holdings-only.

---

## 5. Known Calculation Bugs (Severity Order)

### Critical

| # | Issue | Where | User-visible symptom |
|---|-------|-------|----------------------|
| C1 | **`totalInvested()` = sum of all BUY + CONTRIBUTION** (no sells, no fund outs; convert-ins double-count) | `ledger.js:104–108` → `State.calcTotalCost()` → `Analytics.totalReturn()` | “Invested” and “All-time % return” massively inflated |
| C2 | **Rafi seed oversells** (EFERT, PPL) with no sell validation | `holdings.js`, `ledger.js:132–137` | Performance “Realised P&L” wrong on Apr 20 |
| C3 | **Home chart broken** — treats `calcHoldings()` array as object, uses `h.units` not `h.shares`, ignores funds | `home.js:165–172` | Home sparkline ~0 or nonsense |
| C4 | **Aug 2024 baseline + Apr 2026 trades** double-count capital flows | `holdings.js:138–231` | Any metric based on gross flows is fiction |

### High

| # | Issue | Where |
|---|-------|-------|
| H1 | `portfolioValueTimeline()` marks **all history at today’s prices** | `ledger.js:177–217` |
| H2 | **No cash ledger** — sell proceeds vanish; salary (₨900k) not in portfolio value | `ledger.js`, `analytics.js:50–62` |
| H3 | `dailyPnlSeries()` flow adjustment **ignores `FUND_OUT`** | `ledger.js:247–249` |
| H4 | PSX proxy configured → **public CORS fallbacks disabled** even when worker fails | `prices.js:91–92`, `config.js:5` |
| H5 | Worker often returns HTML/520 → app stuck on stale `FALLBACK_PRICES` | `worker/src/index.js`, live curl tests |
| H6 | `calcHoldings()` does **not sort by date** (unlike `calcFundHoldings`) | `ledger.js:29–42` |

### Medium

| # | Issue | Where |
|---|-------|-------|
| M1 | `priceHistory` (90-day) overwrites daily P&L deltas | `ledger.js:253–255`, `state.js:270` |
| M2 | `calcDailyPnl()` stocks only — **excludes Meezan funds** | `state.js:298–306` |
| M3 | Duplicate realised P&L logic in `portfolio-analytics-service.js` | unsorted walk |
| M4 | `SEED_DATA_VERSION` bump **wipes all user transactions** | `state.js:96–101` |
| M5 | Static `RAFI_STOCKS.avgCost` ≠ computed weighted average | display vs row P&L mismatch |

---

## 6. Module Map (What Each Screen Uses)

| Screen | Primary data source | Trust level today |
|--------|---------------------|-------------------|
| **Portfolio** | `Ledger.calcHoldings` + `calcFundHoldings` + live prices | **Position rows OK**; footer totals mix good/bad |
| **Dashboard** | `State.calcTotalValue`, `calcTotalCost`, `priceHistory` | **Return % wrong** (C1) |
| **Performance** | `Ledger.dailyPnlSeries`, `realisedPnl` | **Unreliable** (C1–C4, H1–H3) |
| **Home** | `_generateHistoryFromTransactions` | **Broken** (C3) |
| **Transactions** | Raw `state.transactions` | List OK |
| **Settings** | `loadSeedData()`, export/import | Seed reload works |

---

## 7. Price Feeds

| Source | Symbols | Status |
|--------|---------|--------|
| Cloudflare worker | PSX stocks via `dps.psx.com.pk` | Often fails (520 / HTML) |
| Direct PSX `timeseries/eod/{symbol}` | Works from server/curl; sort by timestamp, take last row | Used to build `FALLBACK_PRICES` |
| Yahoo | Some KSE symbols via `.KA` suffix | Fallback in `prices.js` |
| `FALLBACK_PRICES` / `MEEZAN_FUNDS.currentNav` | All | **Static** 16-Jun-2026 |
| ETFs (MIIETF, MZNPETF) | No live feed | Fallback NAV only |

**Fix direction:** Worker fallback chain: worker → direct PSX (if CORS allows) → Yahoo → `FALLBACK_PRICES`. Do not block public proxies when worker fails.

---

## 8. Deployment & Ops

```bash
# Local
cd LedgerCap && python3 -m http.server 8765

# Tests (requires: npx playwright install)
npm run test:e2e

# PSX proxy
cd worker && npx wrangler deploy

# GitHub Pages
Push to main → auto-deploy to shamikhahmed.github.io/LedgerCap/
```

| File | Version sync |
|------|----------------|
| `VERSION.json` | App version + `swCache` |
| `sw.js` | `CACHE = 'ledgercap-vXX'` must match |
| `js/app.js` | May reference SW cache query param |

**localStorage key:** `ledgercap_v2` (migrates from legacy `stundsOS_v2`).

**Demo load:** `?demo=1` or Settings → Load demo holdings.

---

## 9. What Was Attempted (Jun 2026)

1. Full rebrand StundsOS → LedgerCap (done).
2. Replace portfolio from PDFs/screenshots (partial — **data quality issues remain**).
3. PASM split: friend 9,445 shares excluded; user **1,555** in AKD (done).
4. Performance daily/monthly P&L (partial — **M2M history still unreliable**).
5. Live price refresh (fallbacks updated; **live path brittle**).

### Partial fix — v3.5.0 / seed v4 (after calculation audit)

- `Ledger.currentCostBasis()` wired to dashboard return % and Performance header
- Sell quantity clamping; sorted `calcHoldings`
- Home sparkline fixed
- Seed: opening date 2026-04-02, EFERT/PPL oversells corrected
- See **`docs/RECONCILIATION.md`** for before/after table and remaining gaps

**Latest commit on main:** `884bdf7` — further fixes may be local only until pushed.

---

## 10. Recommended Fix Order (For Next Engineer)

1. **Pick one Rafi history model** — either opening snapshot as of 2-Apr-2026 **or** Aug baseline, **not both**. Reconcile against broker statement; fix EFERT/PPL oversells.
2. **Replace `totalInvested()`** with `currentCostBasis()` = sum of stock `totalCost` + fund `totalInvested` from computed holdings.
3. **Single sorted ledger walk** — one function used by holdings, realised P&L, timeline, XIRR.
4. **Fix `home.js:165–172`** — iterate array, use `shares`, include funds, honest price labeling.
5. **Fund convert pairing** — add MIIF-B CONTRIBUTION for MBF convert-out or model as internal transfer type that nets to zero at portfolio level.
6. **Performance tab** — until historical prices exist, show **realised P&L from sells only** with clear disclaimer; do not claim daily M2M history is accurate.
7. **PSX price resilience** — fix worker + fallback chain.
8. **Add regression tests** for: PASM split, fund unit totals vs Meezan PDF, `calcHoldings` after seed load, `totalReturn` vs manual spreadsheet.

---

## 11. Key Contacts & Constraints

- **User:** Shamikh Ahmed — shamikh73@gmail.com
- **Currency:** PKR
- **Salary assumption in seed:** ₨150,000/month (Jan–Jun 2026 rows)
- **Do not** commit friend’s capital as Shamikh’s
- **Do not** force-push `main`
- **Honesty:** Rules-based assistant only; no fake AI claims

---

## 12. Related Docs

| Doc | Path |
|-----|------|
| User guide | `docs/GUIDE.md` |
| PSX worker | `worker/README.md` |
| Codex repair prompt | `docs/CODEX_PROMPT.md` |
| Changelog | `CHANGELOG.md` |

---

*This handover reflects code and seed state as of commit `884bdf7`. Calculations are known to be wrong in multiple places — treat UI numbers as untrusted until engine + seed are fixed.*
