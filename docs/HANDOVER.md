# LedgerCap — Engineering Handover

**Version:** 3.55.2  
**Service worker:** `ledgercap-v130`  
**Last updated:** 3 Jul 2026  
**Owner:** Shamikh Ahmed  
**Live:** https://shamikhahmed.github.io/LedgerCap/  
**Repo:** https://github.com/shamikhahmed/LedgerCap  
**Latest `main`:** v3.55.2 — Cap Family Mega-Wave brand lock  

### v3.55.2 — Cap Family Mega-Wave
- Brand icon pack wired (favicon, apple-touch-180, any + maskable)
- Honest live-data copy: Worker required for live quotes

### v3.55.1 — Audit sprint

- Screener → full PSX catalog + pagination (value/div filters need fundamentals seed)
- Market pulse → priced symbols only; `Priced X/Y` badge
- `FundNavService` + Settings manual Meezan NAV overrides
- Worker `GET /prices/run` external cron hook (`X-LedgerCap-Cron-Key`)

### v3.55.0 — Market universe cron

- Worker `PRICE_CACHE` KV + `GET /prices/snapshot` (~754 PSX equities from `dps.psx.com.pk/symbols`, US 511, commodities)
- Price cron piggybacks existing Telegram schedules (no extra CF cron quota)
- Client `PriceSnapshotService`; full market screener; KMI Islamic tags; OGRA + derived gold karats
- Settings toggle: Market snapshot; rollback via `SKIP_PRICE_CRON` or disable in app

---

## 0b. Redesign + reliability sprint (v3.47.0 → v3.53.0, 3 Jul 2026)

Durable plan: **`docs/REDESIGN_ROADMAP.md`**. Session state memory: `ledgercap-redesign-state`.

| Area | What shipped |
|------|----------------|
| **Calculation bugs** | Fixed 9 confirmed via ledger replay: fake day change from synthetic prevClose; daily-P&L sign inversion (buy day showed 2× profit); internal fund converts as fake flows; all-time return inflated by broker cash (+4.47%→+2.49%); bucket Deployed/Invested mismatch; funds cost=value; Cash chip ₨0; TTWO +0.1%/day. **Regression-locked** in `tests/calc-regression.test.js` |
| **Chrome** | Single-row topbar (brand / KSE pill / actions); freshness merged into KSE pill; language switcher removed from chrome; slim price-health strip |
| **Redesign** | Portfolio bucket cards (iOS-Stocks two-line rows); hero 44px; whole-rupee ≥₨1,000; hub shortcuts single-scroll row; P&L screen reorder; market/watch rows with tinted change pills + freshness badges |
| **Analyzer (Research)** | Full per-stock page: 52-week range bar, price-trend chart (1M/6M/1Y), value-check gauge, investor-parameters grid (rule-tinted), dividend-check payout bars, verdict banner, glossary accordion. `Charts.rangeBar()` added |
| **Live prices** | **Yahoo unblocked** — worker was sending no User-Agent, Yahoo 429'd all US-stock + commodity quotes. Added `YAHOO_HEADERS` (browser UA + Referer). US stocks (TTWO $255) + commodities (gold/silver/crude/copper) now live. FX already live (₨277.9). PSX EOD still upstream-dependent (dps.psx.com.pk 520s intermittently) |
| **Price reliability** | `_fetchAppProxy` no longer retries on saturation statuses (429/502/503/520/522/524) — retrying amplified rate-limiting |
| **News** | Funds excluded from per-symbol news (no ticker news → global noise); Pakistan-only macro; per-symbol kept only when headline names the company (US/crypto pass); 2-line clamp; empty-hint hidden |
| **Bottom-nav clearance** | `.lc-dash` padding = `calc(84px + safe-area)`; playwright asserts no clipping on all 5 tabs |
| **Chart pills / neutral-at-zero** | `chgCls` returns neutral for values rounding to 0.00% |
| **Dead files** | css/app.css, identity.css, platform.css, js/modules/portfolio.js deleted (kept resurrecting — delete on sight) |

**Worker deploy:** `cd worker && npx wrangler deploy`. Current version `9cd4fd10` (Yahoo headers).

---

## 0. Current status (Jul 2026 — v3.53.0)

### Shipped in this release train (3.44.0 → 3.46.0)

| Area | What shipped |
|------|----------------|
| **AKD / Rafi equity** | Broker cash in bucket totals; P&L vs deposits when `deployedPkr` known (3.44.1) |
| **Portfolio UI** | Investify-style holding cards (day + total P&L); search/sort; cards/table toggle; per-row ↻ refresh (3.44.2–3.46.0) |
| **Transactions** | 10s undo toast after add; Sell shortcut from holding cards |
| **Hub** | Market status strip; quick actions (CGT, PDF, paper trade, import); rebalance drift card; recent tools |
| **Backup** | PIN-encrypted `.ledgercap.enc`; cloud push/restore via worker `ledger/backup` + sync key |
| **Security** | CSP hardening; PBKDF2 PIN vault; `LcEvents` delegated actions (3.44.0) |
| **Paper trade** | Isolated `paperLedger` screen — does not touch real ledger |
| **Deep links** | `#portfolio/akd` (and other buckets) |
| **Import** | CSV preview before merge |
| **i18n** | Urdu locale repair + RTL nav clip fixes |
| **Updates** | Sticky SW refresh banner; What's new modal on version bump |
| **Gallery** | 83 screens recaptured (`npm run gallery`) |

### Build & test

```bash
npm run bundle          # → js/ledgercap.bundle.js (91 modules)
npm run test:e2e        # Playwright incl. ledger.spec.js (12 tests)
npm run gallery         # ~6 min screenshot recapture
```

### Version sync checklist

| File | Must match |
|------|------------|
| `VERSION.json` | `version`, `swCache` |
| `js/data/config.js` | `LEDGERCAP_VERSION.app`, `.sw`, `.cache` |
| `sw.js` | `CACHE = 'ledgercap-v115'` |
| `manifest.json` | `"version": "3.46.0"` |
| `index.html` | `ledgercap.bundle.js?v=3.46.0`, `sw.js?v=115` |
| `CHANGELOG.md` | Top entry |
| `changelog.html` | Public changelog page |
| `docs/HANDOVER.md` | This file |

### Cloud backup (new)

Client: `js/services/cloud-backup-service.js` — `PUT/GET ${proxy}/ledger/backup` with header `X-LedgerCap-Sync-Key`. Payload is AES-GCM encrypted via `BackupCrypto.encryptWithPassphrase` (sync key as passphrase). **Worker must expose `/ledger/backup`** — deploy `worker/` after adding route if push returns 404.

Settings → Data Management → **Push cloud backup** / **Restore from cloud** (reuses Telegram sync key).

---

## 1. What LedgerCap Is

LedgerCap is a **vanilla JS PWA** (no build step for the web app) for tracking a personal Pakistan portfolio:

| Account | Broker / AMC | Asset types |
|---------|--------------|-------------|
| **Rafi** | CDC broker account **6773** | PSX equities + ETFs |
| **AKD** | AKD account **COAF55870** | PSX equities |
| **Meezan** | Al Meezan portfolio **733102-1** | Islamic mutual funds |

Features: hub dashboard, stock watch (market), Meezan funds, portfolio P&L, research analyzer, screener, dividends, transactions, settings. Data persists in **localStorage** (`ledgercap_v2`).

**UI:** PSX Tactics design (`psx-app.css`) — 5-tab mobile nav + desktop sidebar at ≥900px (`lc-desktop-nav.js`).

**Important:** This is a **rules-based** wealth tracker. There is no LLM in production paths. Do not market it as “AI-powered portfolio management.”

---

## 2. Architecture (Ledger-First)

```
index.html
  └── js/data/config.js          # Version + PSX proxy URLs
  └── js/data/holdings.js        # SEED: static arrays + INITIAL_TRANSACTIONS + FALLBACK_PRICES
  └── js/ledgercap.bundle.js     # ★ Bundled app (npm run bundle — 91 modules)
  └── js/engines/ledger.js       # Core: holdings, funds, P&L, timeline
  └── js/engines/prices.js       # Live PSX fetch + fallbacks
  └── js/services/backup-crypto.js      # PIN + passphrase AES backup
  └── js/services/cloud-backup-service.js # Encrypted cloud sync
  └── js/modules/hub.js          # Home hub (net worth, rebalance teaser, tools)
  └── js/modules/portfolio-screen.js # Holdings cards/table, search, refresh
  └── js/modules/state.js        # localStorage, calcTotalValue, seed migration
  └── js/ui/navigation.js        # Tab routing + #portfolio/{bucket} deep links
  └── js/ui/lc-events.js         # Delegated data-action handlers
  └── sw.js                      # Service worker (ledgercap-v115)
  └── worker/                    # Cloudflare PSX proxy + Telegram + ledger backup
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

> **Note (Jul 2026):** Many items below were addressed in v3.5.x–v3.44.x (cost basis wiring, sell clamping, AKD cash in buckets, home sparkline). See `CHANGELOG.md` for fixes. This section retains **historical audit context** — verify against current code before treating as open.

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

**localStorage key:** `ledgercap_v2` (migrates from legacy pre-LedgerCap storage key).

**Demo load:** `?demo=1` or Settings → Load demo holdings.

---

## 9. What Was Attempted (Jun–Jul 2026)

1. Full rebrand to LedgerCap (done).
2. Replace portfolio from PDFs/screenshots (partial — **data quality issues remain**).
3. PASM split: friend 9,445 shares excluded; user **1,555** in AKD (done).
4. Performance daily/monthly P&L (partial — **M2M history still unreliable**).
5. Live price refresh (fallbacks updated; **live path brittle**).

### v3.5.0 / seed v4 (calculation audit)

- `Ledger.currentCostBasis()` wired to dashboard return % and Performance header
- Sell quantity clamping; sorted `calcHoldings`
- Home sparkline fixed
- Seed: opening date 2026-04-02, EFERT/PPL oversells corrected
- See **`docs/RECONCILIATION.md`** for before/after table and remaining gaps

### v3.44.0 — Security sprint

- CSP without `unsafe-inline`; theme boot externalized
- Paper trading sandbox; history series; CGT PDF export
- Urdu locale repair; gallery 83 screens

### v3.44.1–3.46.0 — Portfolio UX sprint

- AKD/Rafi broker cash in bucket equity and P&L vs deposits
- Investify-style portfolio cards; undo tx; cloud encrypted backup
- Hub rebalance teaser; CSV import preview; deep links `#portfolio/akd`

**Latest commit on main:** `2633510` (2 Jul 2026).

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
| Public changelog | `changelog.html` |
| Cloud backup client | `js/services/cloud-backup-service.js` |

---

*Updated 2026-07-02 · v3.46.0 · UI: production-ready · Engine: see CHANGELOG for resolved items; section 5 retains historical audit.*

---

## 13. UI Polish Pass — 2026-06-29 (v3.6.0)

**Status:** All 16 screens now styled and functional in both light and dark mode.

### What was fixed

| Issue | Fix |
|-------|-----|
| `CapMotion is not defined` crash on 7+ screens | Added `capricorn-motion.js` to `index.html`; `window.CapMotion = window.CapricornMotion` alias added inline |
| Comparison, Performance, Journal, Pilot-tools, Watchlist, Market Strategy unreachable (crash on nav) | Above fix |
| ~20 CSS component classes missing (comp-*, perf-*, rt-*, os-btn, badge, cap-tab-bar, etc.) | All added to `psx-app.css v4` |
| Watchlist cards, BUY/SELL badges unstyled | `rt-wl-card`, `rt-badge`, `rt-buy/sell` added |
| Comparison screen metrics wall-of-text | `comp-grid`, `comp-card`, `comp-metric`, `comp-verdict` layout added |
| Performance stats unstructured | `perf-stat`, `perf-stat-label`, `perf-stat-value`, `perf-list` added |
| Market Strategy action badges (REDUCE/TRIM/HOLD) unstyled | `badge` with colour variants added |

### Screens verified (light + dark mode)
Hub · Watch · Funds · P&L · Analyze · Stock Screener · Dividends · Watchlist · Market Strategy · Transactions · Comparison · Performance · Journal · Pilot-tools · Settings · More

### What is NOT fixed (engine bugs remain)
UI is polished but **calculation bugs C1–C4 and H1–H6 documented above are still present**. Numbers displayed are unreliable until engine + seed are repaired (see section 10 for fix order).

---

*Updated 2026-06-29. UI: production-ready. Data engine: known bugs remain — see section 5.*
