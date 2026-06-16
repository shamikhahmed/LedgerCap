# Codex Prompt — LedgerCap Calculation & Portfolio Repair

Copy everything below the line into Codex (or another coding agent). Attach the repo and source PDFs if available.

---

## Progress already applied locally (v3.5.0 / seed v4)

If resuming work, **read `docs/RECONCILIATION.md` first**. These are done:

- [x] `Ledger.currentCostBasis()` + `State.calcTotalCost()` uses it
- [x] Sell clamping in ledger walk
- [x] `calcHoldings` sorted by date/id
- [x] `home.js` portfolio value at date fixed
- [x] Seed v4: opening date 2026-04-02, EFERT/PPL oversell fixes, `internal` on fund converts
- [x] Performance header: cost basis / unrealised / realised
- [x] Dashboard daily P&L includes funds

**Still required (your main job):**

- [ ] Rebuild Rafi seed without capital double-count (single history model)
- [ ] Honest performance history OR realised-only daily tab
- [ ] PSX proxy fallback chain
- [ ] MBF→MIIF Apr-28 pairing vs AMC PDF
- [ ] `tests/ledger.spec.js` + `docs/RECONCILIATION.md` filled with manual vs app numbers

---

## Mission

Fix **LedgerCap** (`/Users/shamikhahmed/Desktop/Projects/LedgerCap` or cloned from https://github.com/shamikhahmed/LedgerCap) so that **portfolio values, cost basis, invested capital, realised P&L, and performance charts are mathematically correct** for Shamikh Ahmed’s real accounts. The current implementation looks complete but **calculations are materially wrong**. Read `docs/HANDOVER.md` first.

**Do not** add fake AI features. **Do not** rebrand. **Do not** force-push `main`. Minimize scope to reliability fixes.

---

## Product Context

LedgerCap is a vanilla JS PWA tracking:

| Account | ID | Assets |
|---------|-----|--------|
| Rafi (CDC) | 6773 | ~22 PSX symbols + ETFs |
| AKD | COAF55870 | 13 PSX symbols incl. split PASM |
| Meezan | 733102-1 | 7 Islamic funds (~₨665,365 statement value) |

Data lives in `localStorage` key `ledgercap_v2`. Seed data is in `js/data/holdings.js` as `INITIAL_TRANSACTIONS`.

---

## Ground-Truth Source Files

1. **Meezan:** `733102-1.pdf` — balance summary 15-Jun-2026, full transaction detail Jun-2025–Jun-2026
2. **AKD:** `IMG_8009.pdf` — image statements Jun 1–16 2026
3. **Rafi:** Trade log screenshot — account 6773, 3-Apr-2026 through 12-Jun-2026 (OCR unreliable; manual verification required)

### Non-negotiable business rules

1. **Friend PASM at AKD:** Of the Jun-8 block of 11,000 PASM @ ~8.41, only **9,445 shares (~₨80,000)** belong to a friend. **Exclude from Shamikh’s portfolio, invested total, P&L, net worth.** Shamikh owns **1,555 shares** only.
2. **Friend’s ₨80,000 Raast deposit** is not Shamikh’s capital — do not model as salary/deposit in Shamikh’s ledger.
3. **Meezan fund units** must match statement balances on 15-Jun-2026:
   - KMIF 1534.3564, MAAF 95.1548, MBF 2118.7307, MDAF-MDYP 129.0669, MIF 812.9073, MIIF-B 2384.5933, MIIF-MMKA 377.9407
4. **Prices:** Use PSX EOD for stocks (as of deploy date); Meezan NAVs from AMC statement unless live API added later.

---

## Known Bugs You Must Fix

### A. Seed data (`js/data/holdings.js`)

**Problem:** Rafi seed combines Aug-2024 “baseline” buys (`t_0001`–`t_0022`) **plus** Apr–Jun-2026 broker trades. This creates fictional round-trips and inflates gross capital while end share counts accidentally match.

**Required fix (choose ONE approach and implement fully):**

- **Option 1 (preferred):** Delete Aug-2024 baseline. Add **opening balance BUY rows dated 2026-04-02** per symbol for holdings that existed before the trade log window, derived by reverse-calculating from end holdings minus net trades in the log. Then append all verified trades from the log.
- **Option 2:** Keep baseline only for symbols **not traded** in Apr–Jun window; remove baseline rows for symbols that are sold/re-bought in the log.

**Also fix:**
- **EFERT sell 160 on 2026-04-20** when only ~100 held → correct to broker truth
- **PPL sell 50 on 2026-04-20** when only ~40 held → correct to broker truth
- **MBF convert-out 28-Apr** (`t_mbf_out`): add paired MIIF-B `CONTRIBUTION` or model internal transfer so ₨35,000 does not vanish
- Regenerate `RAFI_STOCKS`, `AKD_STOCKS`, `MEEZAN_FUNDS` **from computed ledger**, not hand-maintained duplicates
- Bump `SEED_DATA_VERSION`; document in comment

### B. Ledger engine (`js/engines/ledger.js`)

**Problem:** `totalInvested()` sums all BUY + CONTRIBUTION amounts — ignores SELL, FUND_OUT, and double-counts fund convert-ins.

**Required fix:**
```javascript
// Replace totalInvested semantics for return metrics with:
function currentCostBasis(transactions) {
  const stocks = calcHoldings(transactions);  // must sort txs by (date, id)
  const funds = calcFundHoldings(transactions);
  return stocks.reduce((s, h) => s + h.totalCost, 0)
       + funds.reduce((s, f) => s + f.totalInvested, 0);
}
```
- Sort **all** ledger walks by `(date, id)` consistently
- **Validate sells:** `sellQty = min(requested, held)`; log/warn on oversell
- **Fund converts:** CONTRIBUTION + FUND_OUT pairs should net to zero at portfolio `currentCostBasis` level (internal transfer), or use explicit `FUND_TRANSFER` type
- `realisedPnl` / `realisedPnlByDate`: use same sorted walk; unit test Apr-20 sells after seed fix

**Problem:** `portfolioValueTimeline()` and `dailyPnlSeries()` use **today’s prices** for every historical date and have **no cash ledger**.

**Required fix (minimum viable):**
- Split metrics:
  - **Realised P&L** — accurate from sells (after seed fix)
  - **Unrealised P&L** — current value minus `currentCostBasis`
  - **Daily history** — either (a) store daily snapshots with that day’s prices when available, or (b) **remove misleading daily M2M chart** and label Performance tab honestly: “Realised by sell date only” until historical prices exist
- Include `FUND_OUT` in same-day flow adjustments in `dailyPnlSeries`
- Do not merge `priceHistory` over timeline deltas with inconsistent methodology

### C. State (`js/modules/state.js`)

- `calcTotalCost()` must call `currentCostBasis()`, not gross `totalInvested()`
- `calcDailyPnl()` must include **fund** NAV change, not stocks only
- Seed migration: consider **patching** transactions by id instead of full wipe when possible; document behavior

### D. Home module (`js/modules/home.js`) — **Critical bug**

```javascript
// BROKEN (lines ~165-172):
Object.entries(holdings).forEach(([symbol, h]) => {
  value += (h.units || 0) * price;  // wrong: calcHoldings returns array, uses shares not units
});
```

**Fix:** Iterate `Ledger.calcHoldings()` array using `h.shares * price`; add `Ledger.calcFundHoldings()` with NAV; use fallback prices when `state.prices` missing.

### E. Analytics (`js/engines/analytics.js`)

- `totalReturn()` uses `State.calcTotalCost()` — will fix when cost basis fixed
- `buildCashflows()` for XIRR: exclude internal fund converts; include `FUND_OUT` as positive flow if external redemption; treat salary separately (not investment unless user configures auto-invest)
- Remove duplicate realised logic in `js/services/portfolio-analytics-service.js` — delegate to `Ledger.realisedPnl`

### F. Prices (`js/engines/prices.js`, `worker/`)

- When app proxy is configured but returns error/HTML, **fall through** to Yahoo and public CORS proxies — do not return null immediately
- Fix worker if PSX endpoint moved (test `timeseries/eod/{symbol}` — sort by timestamp, take latest)
- Update `FALLBACK_PRICES` after seed fix; sync `VERSION.json` + `sw.js` cache

### G. Performance UI (`js/modules/performance.js`)

- Until historical M2M is honest, show:
  - Total realised P&L (from ledger)
  - Realised by day / month (sell dates only)
  - Current unrealised (market value − cost basis)
- Remove or relabel “Predictive” tab if it uses fixed 18% on inflated numbers

---

## Acceptance Criteria (Must All Pass)

### Data reconciliation

- [ ] `Ledger.calcHoldings(seed txs)` share counts match broker statements for every symbol (Rafi, AKD)
- [ ] `Ledger.calcFundHoldings(seed txs)` units match Meezan PDF to 4 decimal places
- [ ] AKD PASM = **1,555 shares** only; friend 9,445 nowhere in app totals
- [ ] No oversell possible in ledger walk (EFERT/PPL fixed in seed)

### Calculation reconciliation

- [ ] `currentCostBasis` ≈ sum of (shares × avgCost) + (units × avgNav) for all open positions
- [ ] `totalReturn.pct` = `(marketValue - costBasis) / costBasis` matches manual spreadsheet within 0.5%
- [ ] `realisedPnl` matches manual FIFO calc on all SELL rows
- [ ] Dashboard “Invested” equals **cost basis**, not gross buys
- [ ] Home sparkline non-zero and monotonic-ish when holdings grow

### Tests

- [ ] Add `tests/ledger.spec.js` (or Node script) with fixtures:
  - PASM split
  - Meezan unit totals
  - One Rafi sell P&L case
  - `currentCostBasis` vs gross `totalInvested` regression
- [ ] Existing `tests/smoke.spec.js` still passes (`npx playwright install && npm run test:e2e`)

### Docs

- [ ] Update `CHANGELOG.md` with calculation fixes
- [ ] Update `docs/HANDOVER.md` “Known bugs” section to reflect resolved items
- [ ] Do not inflate marketing claims

---

## Suggested Implementation Order

1. Read entire codebase + `docs/HANDOVER.md`
2. Rewrite Rafi seed (single history model) + fix AKD/Meezan pairs
3. Refactor `ledger.js` (sorted walk, cost basis, sell validation)
4. Wire `state.js`, `analytics.js`, `performance.js`, `home.js` to new APIs
5. Fix price fallback chain
6. Add ledger unit tests
7. Manual verify against spreadsheets (provide test spreadsheet or console script output in PR description)

---

## Files You Will Touch

| Priority | File |
|----------|------|
| P0 | `js/data/holdings.js` |
| P0 | `js/engines/ledger.js` |
| P0 | `js/modules/state.js` |
| P0 | `js/modules/home.js` |
| P1 | `js/engines/analytics.js` |
| P1 | `js/modules/performance.js` |
| P1 | `js/modules/dashboard.js` |
| P1 | `js/engines/prices.js` |
| P2 | `js/services/portfolio-analytics-service.js` |
| P2 | `worker/src/index.js` |
| P2 | `tests/ledger.spec.js` (new) |
| P2 | `CHANGELOG.md`, `docs/HANDOVER.md` |

---

## Out of Scope (Unless Trivial)

- New features (Compare tab enhancements, AI analysis)
- iOS Capacitor changes
- Full cash + salary auto-invest modeling (document as future work)
- Live Meezan NAV API integration
- Historical PSX price database (acceptable to ship honest realised-only performance first)

---

## Commit Message Style

Recent commits:
```
Integrate real portfolio data with P&L history and PASM split.
Fix PSX proxy reliability and silence CORS fallback noise.
LedgerCap rebrand, desktop layout, and proxy/CSP fixes.
```

Use complete sentences, focus on **why**.

---

## Deliverables

1. Working fix on branch or main (user will review on https://shamikhahmed.github.io/LedgerCap/)
2. Short **RECONCILIATION.md** in `docs/` with table: Metric | Manual calc | App calc | Match?
3. Updated handover section listing remaining gaps

**Success = Shamikh opens the app and trusts the numbers.**
