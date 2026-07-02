# LedgerCap Redesign & Analyzer Roadmap

**Written:** 2026-07-03 · **Baseline:** v3.48.0 (`de3df18`) · Self-contained: any session/agent can pick this up cold.
**North star:** iOS Stocks calm + Apple Health card colour + PSX Stock Analyzer depth-per-stock + Binance/TradingView data density where tables live. No fake AI wording — rule-based = "Smart".

---

## 0. State of play (done, do not redo)

- v3.44.0: security sprint (XSS esc(), PBKDF2 PIN, SW offline `ignoreSearch`, CSP no `unsafe-inline`, Urdu repair, worker CORS/SSE).
- v3.47.0: **9 calculation bugs fixed** (fake day change from synthetic prevClose, buy-day double-profit sign inversion in `dailyPnlSeries`, internal-convert fake flows, all-time return inflated by broker cash, bucket Deployed/Invested mismatch, funds cost=value illusion, Cash chip ₨0, TTWO +0.1%/day, multi-figure total-return divergence). Topbar rebuilt one-row; freshness merged into KSE pill; banner slimmed; whole-rupee display ≥₨1,000; Research defaults to largest holding; refetch on tab-focus if quotes >10 min.
- v3.48.0: portfolio bucket cards → two-line iOS-Stocks rows; `Charts.lineChart` honors `opts.width` (inline 100% was exploding sparklines across screen); hub status = "Pre-market · prices 10m ago" from newest real quote ts; hero 44px/700.
- Verified live both themes at 375px. All gates green (25 playwright + 59 unit).

Key files: `js/modules/hub.js` `portfolio-screen.js` `research.js` `market.js` `funds.js` · `js/services/portfolio-buckets-service.js` `price-health.js` · `js/ui/charts.js` `platform.js` `icons.js` · `css/psx-app.css` (shell/nav) `lc-pro.css` (tokens/hero) `lc-pro-phase.css` (components). Bundle: `npm run bundle` after ANY js/ edit (page loads `js/ledgercap.bundle.js` only). Version sync on ship: VERSION.json + manifest.json + js/data/config.js + sw.js CACHE + index.html `?v=`.

---

## 1. Design system (finish first — everything else inherits)

### 1.1 Type scale (single source, add as CSS vars in `lc-pro.css` `:root`)
| Token | Size/weight | Use |
|---|---|---|
| `--t-display` | 44px / 700 / -0.05em | Hero net worth only |
| `--t-title1` | 28px / 700 / -0.03em | Screen h1 (currently 34 in places — unify) |
| `--t-title2` | 20px / 700 | Section h3, sheet titles |
| `--t-body` | 15px / 500 | Row primary text |
| `--t-sub` | 13px / 500 | Row secondary, labels |
| `--t-caption` | 11px / 600 / +0.04em uppercase | Overlines, table heads |
| Numerals | always `font-variant-numeric: tabular-nums` (`.lc-num`) | any price/qty/P&L |

Checks: no raw `font-size:` px values added outside these tokens in new work; grep periodically `font-size: [0-9]` in css diffs.

### 1.2 Colour discipline
- Base: `--psx-bg` / `--psx-bg-card` / `--psx-bg-muted` / `--psx-border` per theme (exist).
- ONE accent (`--psx-accent` blue). Semantic only: `--psx-up` green / `--psx-down` red — **numbers and change pills only**, never decorative.
- Tone palette for tool tiles (blue/gold/green/violet/cyan/amber/orange/rose/slate) stays but at 10–14% alpha backgrounds, full-strength icon stroke.
- **Known open bug class:** `var(--psx-surface, #hardcoded)` fallbacks — `--psx-surface` is never defined; every fallback renders permanently. Sites: `lc-pro-phase.css` (search `--psx-surface`), `psx-app.css` (`--psx-surface-1/2/3`). FIX: define per-theme or replace with `--psx-bg-card`. This is the #1 remaining light-mode breaker.
- Contrast floor: body text ≥4.5:1, sub-text ≥4.5:1 at <18px. Known fail: `--psx-text-3: #8e8e93` on white ≈3.2:1 — darken to `#6e6e73` in light theme.

### 1.3 Spacing & radius
- Scale: 4/8/12/16/24/32 (`--lc-space-1..6` exist — enforce; kill ad-hoc `margin-top:12px` inline styles, several live in `transactions.js`/`research.js` templates).
- Radius: 12 inputs/buttons, 16 cards, 999 pills. Card = 1px `--psx-border` + `--lc-shadow` subtle; never heavy blur.
- Screen gutter: 16px mobile, 24px ≥720px. Bottom padding on every screen ≥ nav height + 24px — **footer-blank-space / content-clipped-behind-nav class of bug**: verify per screen by scrolling to bottom (checklist §5).

### 1.4 Components to normalise (one implementation each)
- Stat card (label/value/delta) — currently 3 variants (`lc-dash-market-card`, `psx-stat`, `lc-pulse-pill`). Merge → one `.lc-stat`.
- Row (list item): icon? · title+sub · right value+delta — portfolio card pattern from v3.48. Apply to market rows, funds rows, watchlist, dividends.
- Section head: h3 + optional right link — exists (`lc-dash-section-head`), enforce everywhere (some screens use bare h3).
- Segment control, search field, sheet, toast: fine — audit focus states only.

---

## 2. Per-screen redesign backlog (order = user impact)

### 2.1 Hub (mostly done; remaining)
- [ ] Quick-action chips (CGT & tax / Annual PDF / Paper trade / Import CSV) float unanchored under hero → group into one horizontal-scroll "Shortcuts" row w/ caption, or fold into tools grid. Currently 2×2 wrap = ragged.
- [ ] Refresh + Add holdings buttons: full-width blue pill too heavy → compact pair, or promote Refresh into hero card corner.
- [ ] Section rhythm: KSE/yield stat pair → unify to `.lc-stat`; Capital-deployed table cramped at 375 (5-col grid) → collapse to 2-line rows on mobile.
- [ ] Net worth chart: add range picker like P&L tab (1W/1M/1Y) once seriesHistory has depth.
- [ ] Rebalance card + news + buckets + movers + tools grid: verify order tells a story: value → change → actions → market → holdings → intel → tools.

### 2.2 Market (Watch)
- [ ] Row layout → shared Row component: symbol+name left, price + change% pill right (Binance style). Currently price and change split columns misaligned across sectors.
- [ ] Sector headers sticky (exists) — verify light theme bg (`--psx-surface` bug hits here).
- [ ] Volume + 52w range: add compact sub-line per row (data exists in EOD).
- [ ] Advancing/Declining/Flat/Listed pills: keep, restyle to `.lc-stat` mini.
- [ ] Search: debounce exists; add clear-x button; empty result state styled.

### 2.3 Funds
- [ ] Rows now show P&L (v3.47) — restyle to shared Row; NAV date sub-line ("NAV 2026-07-02").
- [ ] Header stat cards (Total invested / Portfolio value / Funds count) → `.lc-stat`, third card clipped at 375 (horizontal scroll cue or 2+1 wrap).
- [ ] Per-fund detail: navigate to Research fund mode — verify fund research shows units, cost, value, DRIP.

### 2.4 P&L (Portfolio)
- [ ] Hero duplication: bucket cards AND hero value AND day/total boxes AND chart = long. Reorder: hero+chart first, buckets second, holdings third.
- [ ] Holding cards (`_holdingCard`): apply Row pattern; today + total P&L as two compact pills; per-holding ↻ icon keep.
- [ ] Table mode: tabular-nums check, right-align numerics, sticky header.
- [ ] Range chart: 1D uses intradayHistory only when session open — verify empty-state copy otherwise.

### 2.5 Research/Analyze — **flagship: per-stock auditor page (PSX Stock Analyzer parity)**
Layout as sections, each a card, ordered:
1. **Header**: symbol, name, sector chip, Shariah chip, price (32px), change pill, source+freshness line.
2. **52-week range bar**: horizontal gradient bar w/ current-price marker (data: 52w high/low already fetched in research). Build small component `Charts.rangeBar(min, max, current)`.
3. **Price history**: line chart + range picker (1M/6M/1Y) from seriesHistory/EOD.
4. **Trading info**: LDCP, open, day range, volume vs avg, bid/offer depth (exists — restyle grid 2×3 `.lc-stat`).
5. **Money talk** (fundamentals): revenue / profit / EPS by year as mini bar charts (`Charts.barChart` exists) — data from `fundamentals.js`; where absent show honest "No filings data".
6. **Investor parameters**: dividend yield, P/E vs sector, P/B, ROE, debt/equity — grid of `.lc-stat` w/ good/bad tint (rule thresholds, label "rule-based").
7. **Dividend check**: payout history from `dividends.js`, yes/no consistency verdict, next ex-date if known.
8. **Final verdict**: existing plain-English verdict + Smart rating + confidence + risk — restyle as verdict banner (green healthy / amber caution / red risky) + reasons list (already generated by `ai-analysis.js`).
9. **Value check**: fair value vs price → over/under-valued bar with % gap (fairValue exists).
10. **Learn the basics**: collapsible glossary accordion (static content, i18n later).
Tests: every section renders for (a) held PSX stock, (b) non-held PSX stock, (c) fund, (d) US/TTWO, (e) crypto — no `undefined`, no `$0.00`, missing data says "—" with reason.

### 2.6 Tool screens sweep (after 5 tabs)
Zakat, screener, dividends, calendar, watchlist, signals, risk-audit, insights, pilot-tools, paper-trade, transactions, import, settings, global, commodities, announcements: apply Row/stat/section-head components + §5 checklist each. Est. 2–3 screens per sitting.

---

## 3. Typography/visibility micro-audit (found from screenshots, fix in passing)
- [ ] Topbar KSE pill truncates change % at 375 ("-0.1") — drop "KSE-100" overline label at <380px, keep number+change.
- [ ] `.lc-pulse-pill` labels 10px uppercase — bump 11px; grey `#8e8e93` on light fails contrast (see §1.2).
- [ ] Screen h1 inconsistent (Portfolio 34px vs Stock Watch 34px vs Settings ~28) — token it.
- [ ] Chip text vertical centering off by ~1px in `.lc-dash-chip` (line-height) — set `line-height:1` + padding balance.
- [ ] Sub-text `Your P&L · holdings · allocation` duplicated info w/ section heads — shorten or drop per screen.
- [ ] Numbers: sweep remaining `.toFixed(2)` on PKR amounts in templates (grep `toFixed(2)` in js/modules — several bypass PlatformUI.fmt).

## 4. Overlap/blank-space bug class (root causes to check per screen)
1. Inline `style="width:100%"` in shared components overriding layout (the sparkline bug) — grep `style="width:100%` in js/.
2. Absolute/fixed elements over content: demo banner, update bar, price-health host — each must push content (they do via normal flow) — re-verify after any topbar change.
3. Bottom nav overlap: every screen's last element needs clearance; playwright check: scroll to bottom, assert last element bottom < nav top. Add to `tests/viewport.spec.js`.
4. Footer blank space: `.psx-screens` min-height vs content — screens shorter than viewport leave dead grey below last card ON PURPOSE (bg) but if it renders as *different colour* block = missing bg var (light-mode `--psx-surface` class of bug).
5. Long Urdu strings: nav fixed (ellipsis) — sheets/settings labels unverified → RTL walk at 390px.

## 5. Per-screen QA checklist (run for EVERY redesigned screen)
```
[ ] dark 375 · light 375 · dark 1280 · light 1280 screenshots
[ ] scroll to bottom: no clipped content behind nav, no odd blank band
[ ] zero console errors on navigate + interact
[ ] numbers: tabular-nums, whole rupees, correct sign/colour
[ ] freshness: any price shown has source+age available on tap/title
[ ] empty state (fresh profile), loading state, error state (proxy off)
[ ] touch targets ≥44px; focus-visible rings on all interactives
[ ] en/ur/roman: no clip at 390px, RTL alignment sane
[ ] npm run bundle && npx playwright test tests/smoke.spec.js tests/viewport.spec.js tests/a11y.spec.js
```

## 6. Data/live-price roadmap (after visual work)
- [ ] SSE auto-connect on session open (currently Settings toggle) + hub Live dot.
- [ ] US quotes: Yahoo 15-min-delayed during US session (18:30–01:00 PKT) — label "delayed 15m"; TTWO gets this today via proxy.
- [ ] Crypto: CoinGecko ~1min — fine; label source.
- [ ] Commodities: worker route periodic — add ts + as-of.
- [ ] True realtime PSX = paid vendor (scope separately; not free).
- [ ] Per-symbol freshness dot on every row (green live / grey close / amber stale) — one helper `Prices.freshnessDot(sym)`.

## 7. Test debt
- [ ] Add unit test: `dailyPnlSeries` buy-day ≈ 0 (regression for sign-inversion bug).
- [ ] Add unit test: `calcDailyPnl` returns 0 on seed/fallback sources.
- [ ] Add unit test: `totalReturn` excludes manual assets.
- [ ] Playwright: bottom-clearance assertion (see §4.3); light-theme smoke pass (currently dark only).
- [ ] `npm run gallery` recapture after each screen batch (or defer to user's other AI — user said they'll handle recapture).

## 8. Shipping protocol per batch
1. Edit source under js// css/ (never bundle directly) → `npm run bundle`.
2. Gates: unit + `npx playwright test tests/ledger.spec.js tests/smoke.spec.js tests/viewport.spec.js tests/a11y.spec.js`.
3. Preview-verify (see §5) before claiming done.
4. Version bump (all 5 files) + CHANGELOG + commit + push main (user authorized push-when-green).
5. Worker changes: `cd worker && npx wrangler deploy`, curl /health after.
