## [3.56.0] — 2026-07-20

### Beauty — ledger book / gold foil
- Splash: open ledger object; Cormorant display + paper/ink/brass tokens (light+dark)
- Hub hero: statement stub foil (not iOS blue card); PIN clasp border
- Accent reminted from system blue → brass `#c9a227` / `#d4af37`
- SW `ledgercap-v133`

## [3.55.4] — 2026-07-19

### QA
- Capricorn QR in SW allowlist
- SW `ledgercap-v132`

## [3.55.3] — 2026-07-19

### Pitch
- Premium Capricorn QR (`assets/qr-ledgercap.png`) — H ECC, Capricorn Systems center mark, gold quiet frame on CTA

### Ops
- SW `ledgercap-v131`

# Changelog — LedgerCap

## 3.55.2 (2026-07-19) — Cap Family Mega-Wave brand lock

- **Brand** — Capricorn OS mark wired: `favicon.svg`, `apple-touch-icon-180`, separate any/maskable PWA icons in `manifest.json` + `index.html` / landing; splash uses `mark.svg`
- **Honesty** — live-data copy no longer soft-pedals the Worker: Settings, landing, README, and GUIDE state that live PSX/Yahoo quotes route through Cloudflare Worker; portfolio stays on-device; cached/fallback if unreachable
- **SW** — `ledgercap-v130` precaches brand icon pack; version aligned (`VERSION.json` / `LEDGERCAP_VERSION`)

## 3.55.1 (2026-07-03) — Audit sprint (screener, pulse, NAV, cron hook)

- **Screener** — full PSX catalog + pagination; value/dividend filters require fundamentals seed
- **Market** — pulse movers count priced symbols only; `Priced X/Y` badge on pulse + listed card
- **Funds** — manual Meezan NAV overrides in Settings; `FundNavService` applies on load
- **Worker** — `GET|POST /prices/run` for external cron (`X-LedgerCap-Cron-Key`); batch 240 (800 with `?full=1`)
- **Docs** — `changelog.html`, presentation, CAPRICORN_HANDOFF synced to 3.55.x

## 3.55.0 (2026-07-03) — Full market snapshot + worker cron

- **Worker** — `PRICE_CACHE` KV; `GET /prices/snapshot`; cron piggybacks existing Telegram schedules (catalog 09:00 PKT, PSX batch tick, US 511 Yahoo, commodities)
- **PSX** — full equity catalog (~754) from `dps.psx.com.pk/symbols`; market screener uses catalog + paginated 80 rows; KMI Islamic tags from index scrape
- **US** — 511 curated symbols snapshot during NY session
- **Commodities** — platinum, Brent, nat gas, PKR gold 24k/22k/21k/18k/12k derived, OGRA MS/HSD with fallback
- **Client** — `PriceSnapshotService` merges KV into State; settings toggle; snapshot freshness in price-health
- **Tests** — worker karat/universe/snapshot-shape + existing regression suite

## 3.54.0 (2026-07-03) — Layout polish + auto gold/FX

- **Layout** — watchlist flex cards; market rows mobile stack; screener segment scroll; RTL nav ellipsis; paper-trade lc-dash wrap; calendar/global meta columns
- **Commodities** — PKR gold/gram auto from Yahoo GC=F × USD/PKR (writes Settings for Zakat)
- **FX** — Frankfurter.app fallback when ExchangeRate-API fails
- **Honesty** — price-health banner names PSX dps.psx.com.pk flakiness; hub news labels free-feed limits
- **Motion** — spring tap on market rows, segments, watchlist cards

## 3.53.0 (2026-07-03) — Live prices unblocked + commodities

- **Yahoo live** — worker sent no User-Agent so Yahoo 429'd every US-stock and commodity quote; added browser `YAHOO_HEADERS`. US stocks (TTWO) + commodities (gold/silver/crude/copper) now live; FX already live
- **Price reliability** — proxy no longer retries on saturation statuses (429/502/503/520/522/524); retrying was amplifying rate-limits
- **Commodities** — live spot prices, red/green tinted change, PKR-per-oz noise removed from pill

## 3.52.1 (2026-07-03) — Tool-screen sweep

- **Change pills** — neutral (grey) at exactly 0.00% instead of green; pills actually tint (bg keyed on t-gain/t-loss) and no longer wrap
- **Transactions** — filter chips collapse to one horizontal-scroll row (was a ragged 4-row wrap); empty-state icon
- **Zakat** — gold/g formatted with thousands separator

## 3.52.0 (2026-07-03) — News relevance

- Funds excluded from per-symbol news (Meezan NAVs have no ticker news → global noise); Pakistan-only macro; per-symbol items kept only when the headline names the company (US/crypto pass through); 2-line headline clamp; empty impact hints hidden

## 3.51.1 (2026-07-03) — Bottom-nav clearance

- Playwright asserts no content clipped behind bottom nav on all 5 tabs; `.lc-dash` bottom padding fix

## 3.51.0 (2026-07-03) — Market rows

- Binance-style tinted change pills, per-row freshness badges, company-name ellipsis

## 3.50.0–3.50.1 (2026-07-03) — Analyzer complete + regression tests

- Research per-stock page finished: investor parameters (rule-tinted), dividend-check payout bars, glossary accordion
- `tests/calc-regression.test.js` locks the daily-P&L fixes; P&L screen reorder

## 3.49.0 (2026-07-03) — Analyzer visuals

- `Charts.rangeBar()`; 52-week range bar, price-trend chart with range picker, value-check gauge, tinted verdict banner; 12s history-fetch cap → honest empty state

## 3.47.0–3.48.1 (2026-07-03) — Calc fixes + redesign

- **9 calculation bugs fixed** (ledger-replay verified): fabricated day change, daily-P&L sign inversion, internal-convert fake flows, broker-cash-inflated return, bucket base mismatch, funds cost=value, ₨0 cash chip, TTWO fake move
- Single-row topbar; portfolio bucket cards (iOS-Stocks style); hero 44px; whole-rupee display; hub shortcuts scroll row; price fetch-on-focus

## 3.46.0 (2026-07-02) — Undo, cloud sync, rebalance hub

- **Transactions** — 10-second undo toast after adding a transaction
- **Portfolio** — per-holding ↻ refresh (single symbol via PSX proxy)
- **Cloud backup** — encrypted push/restore via worker `ledger/backup` + sync key
- **Hub** — rebalance summary card (Pilot drift vs target weights)
- **Urdu/RTL** — bottom nav + sidebar label clip fixes
- **Onboarding** — step labels (1/2/3) + demo/import shortcuts on final step

## 3.45.0 (2026-07-02) — UX sprint (Investify + ease-of-use)

- **Portfolio** — search/sort holdings; cards/table toggle; Sell prefills tx sheet; stale price dim per row
- **Import** — CSV preview table before confirm import
- **Hub** — PSX market status strip; CGT / annual PDF / paper trade / import shortcuts; recent tools
- **Deep links** — `#portfolio/akd` opens filtered bucket
- **Backup** — PIN-encrypted `.ledgercap.enc` export + decrypt import
- **Updates** — sticky refresh banner; What's new modal on version bump

## 3.44.2 (2026-07-02) — Portfolio UI (Investify-inspired)

- **Hero P&L** — side-by-side Day and Total gain/loss boxes with value + % (like Investify).
- **Holding cards** — each position shows cost, avg buy, shares, market value, today P&L, and total P&L.
- **Bucket toolbar** — Transaction + Ledger shortcuts when a portfolio is filtered.

## 3.44.1 (2026-07-02) — AKD bucket equity fix

- **AKD / Rafi portfolio value** now includes uninvested broker cash (`USER_AKD_CASH_PKR`, `RAFI_BROKER_CASH_PKR`) in bucket totals and Capital deployed rows.
- **P&L vs deposits** — when gross deployed capital is known (AKD ₨200k, Rafi, Meezan, IBKR), gain/loss is measured against deposits, not stock cost basis alone.
- **Portfolio screen** — "Deployed" pill (not mislabeled "Invested") plus optional Cash line when filtering AKD/Rafi.

## 3.44.0 (2026-07-02) — Security sprint: CSP, paper trade, history series

- **CSP** — removed `script-src 'unsafe-inline'`; theme boot externalized; `LcEvents` delegated `data-action` / `data-nav` handlers across modules
- **SecretsVault** — AES key derived from PIN via PBKDF2 vault salt; legacy random key migrates on unlock
- **Paper trading** — isolated `paperLedger` state + screen (More → Paper trade); buy/sell/reset without touching real ledger
- **History series** — `seriesHistory` per symbol + NAV tab in Performance (1W–5Y ranges via `HistorySeriesService`)
- **CGT export** — `StatementExport.exportCgtPdf()` printable year-end estimate from `PilotEngine.buildCgtReport`
- **DRIP + YoC** — per-holding reinvest toggle + yield-on-cost in Dividends holdings tab
- **Pitch/presentation** — marketing emoji purged; icon-mark SVG badges
- Service worker `ledgercap-v111`; gallery recapture +83 screens

### Prior 3.44.0 items (same release train)

- **Security** — `esc()`/`escUrl()` helpers; all news/announcement/CSV-derived strings escaped before `innerHTML`; `javascript:` URLs blocked in news links; CSV import sanitizes symbol/broker at the boundary
- **PIN vault** — PBKDF2-SHA256 (310k iterations) replaces single SHA-256; legacy hashes verify once and auto-upgrade; escalating lockout (30s → 30min); `gnewsApiKey` stripped from backups
- **Offline fixed** — SW `ignoreSearch` match so `?v=` asset URLs hit precache on first-load-then-offline; per-asset precache (one 404 no longer aborts all); `ledgercap-v111`
- **Price sanity** — intraday PSX batch quotes now sanity-checked (was unchecked); USD guard for intl/crypto quotes
- **Urdu locale repaired** — mixed-script mojibake fixed (`پورٹ فولیو`, `لیجرکیپ`, `اسٹاک واچ`…); 12 missing ur + 4 roman keys translated; RTL line-height + table/sheet coverage
- **Hub** — Settings tile in tools grid (was unreachable on mobile); refresh button busy-state (no double fetch); day-1 net-worth chart stub; greeting no longer shows version string
- **Icons** — transaction ledger emojis → LcIcons SVGs; empty-state emojis replaced; distinct icons for market/portfolio/funds/research/screener/dividends/watchlist/performance
- **A11y** — PIN dots `role=progressbar` + `aria-valuenow`; bottom sheet `role=dialog aria-modal`; nav labels ellipsis + explicit 48px touch target
- **Privacy** — personal account numbers removed from bucket labels
- **Worker** — SSE session re-check per tick (pre-market streams go live, post-close streams idle); Telegram routes CORS restricted to app origins
- **CSP** — `base-uri 'self'; form-action 'self'` added

## 3.43.0 (2026-06-30) — Competitor parity (Sarmaaya · PSX Analyzer · Investify)

- **Commodities** — gold, silver, crude, copper spot + PKR/gram; new screen in hub & tools
- **Announcements** — corporate actions, upcoming dividends, portfolio news feed
- **Market depth** — PSX bid/offer from trading board in Research analyzer
- **Deeper analyzer** — sector peers, rule-based technicals, 52-week EOD range, dividend snippet
- **KSE-100 benchmark** — Insights compares portfolio vs index (MZNPETF secondary)
- **Docs** — `docs/COMPETITOR_PARITY.md` feature matrix
- Service worker `ledgercap-v110`; gallery +82 screens

## 3.42.0 (2026-07-02) — Apple UI polish & premium screen gallery

- **Screen gallery** — VaultCap-grade `screen-gallery.html`: strict viewport, dark/light/compare, lightbox, offline embed (`npm run gallery`)
- **Icon system** — `js/ui/icons.js` monochrome SVG registry; sidebar tools, hub grid, chrome actions; shell emoji purged
- **Brand mark** — `icon-mark.svg`, `css/brand-mark.css`; splash, PIN, demo banner, onboarding
- **PWA icons** — `npm run icons:generate` / `icons:ios`; iOS `AppIcon.appiconset`
- **UI audit** — `docs/UI_AUDIT_250.md` gallery-driven checklist
- Service worker `ledgercap-v109`

## 3.41.0 (2026-07-01) — Honesty, security, bundle CI

- **Fallback staleness banner** — `PriceHealth` audits seed/fallback %; topbar warning + refresh CTA; `npm run refresh-fallbacks` script for EOD snapshot
- **SSE honesty** — worker tries intraday when PSX open, EOD after close; `live-sse` / `live-sse-int` trusted; Settings shows intraday vs last-close label
- **importJSON v10** — `displayCurrency`, `liveStreamEnabled`, `intradayHistory` migration on import
- **Telegram token security** — AES-GCM `SecretsVault`; stripped from JSON export; plaintext auto-migrated on launch
- **Dividends** — expanded `dividends.js` (ATRL, TRG, HINO, SLGL, DGKC, ENGROH, FATIMA, MLCF, NML, NRL, PAEL, PTC, SEARL, SSGC, TREET, CPHL)
- **Bundle CI** — `npm run bundle` in CI; `index.html` cache buster synced to app version from `config.js`
- Service worker `ledgercap-v108`

## 3.40.1 (2026-07-01) — Price alert & staleness fixes

- Price alerts: **PSX session only** (9:15–15:45 PKT), **crossover** not persistent below-target
- Skip alerts on seed/fallback-only quotes; TRG fallback updated to 64.31
- Dividend Telegram: morning window only; fix `amountPerShare` (was Rs0 for FFC)
- `getQuote` returns real `ts` + `quoteLabel` (Live / Last close / Pre-market)
- Topbar + Research show last-close when market closed

## 3.40.0 (2026-07-01) — Live terminal features

- **SSE live prices** — worker `GET /sse/prices` pushes quotes during PSX session; client `LivePriceStream` via EventSource (poll fallback when disconnected)
- **PKR↔USD display toggle** — topbar one-tap + Settings; `PlatformUI.fmt` converts all amounts app-wide
- **P&L hero chart** — range picker 1D/1W/1M/1Y/All on Portfolio; `intradayHistory` + 365-day `priceHistory`
- **Price alerts** — holding-level below/above triggers; unified `PriceAlertsService` (watchlist + holdings); toast, notification, Telegram
- **Tax/audit export** — `StatementExport` CSV + printable HTML/PDF from Settings
- **Glance widget** — `widget-glance.html` + `GlanceBridge` localStorage sync; manifest shortcut (native iOS widget = future Capacitor)
- Service worker `ledgercap-v106`

## 3.39.0 (2026-07-01) — Terminal polish

- Count-up tween on net worth (`data-lc-count`, respects reduced-motion)
- Tabular nums on all price columns; sparkline per holding row
- Skeleton news shimmer; `.lc-error-state` vs empty CTA states
- Haptics off by default (Settings toggle); tap scale feedback
- Theme-var elevation (`--lc-elev-*`); focus-visible rings
- Cmd+K / Ctrl+K quick actions (desktop ≥900px)
- `aria-live` price announcer for screen readers
- Service worker `ledgercap-v105`

## 3.38.0 (2026-07-01) — Multi-source news + test digests + worker deploy

### News (free sources)
- **Yahoo Finance** per holding
- **Google News RSS** (PSX + per symbol) via worker proxy
- **BBC Business** macro feed via worker
- Optional **GNews** API key still supported
- Worker routes: `/news/google`, `/news/bbc`, `/news/yahoo/:sym`, `/news/aggregate`

### Telegram
- **Intraday news** toggle — max 1/hour PKT session (client + worker 10/11/13/14 PKT)
- **Send portfolio digests** + **Send news digest** test buttons in Settings
- Midday cron includes news block
- Sync payload includes `newsSymbols` for worker fetches

### Service worker
- `ledgercap-v104`

## 3.37.0 (2026-07-01) — Cleanup + bundle + KV dedupe

### Cleanup
- Deleted unused CSS: `app.css`, `identity.css`, `platform.css`
- Deleted legacy `portfolio.js` (active: `portfolio-screen.js`)
- Removed cosmetic `investedValue` / `currentValue` from Meezan seed; `funds.js` derives from units × NAV

### Performance
- **72 scripts → 1** `ledgercap.bundle.js` with `defer` (`npm run bundle` before deploy)
- SW precache slimmed to bundle + core CSS

### Telegram dedupe
- Worker `POST /telegram/claim` — KV slot lock (sync key required)
- Client scheduler uses KV claim when sync key set; skips morning brief when cloud cron on
- Fixes duplicate sends from 2 devices / tabs

### Service worker
- `ledgercap-v103`

## 3.36.0 (2026-07-01) — Al Meezan + reconcile + portfolio Telegram

### Portfolio
- **Islamic Funds** renamed **Al Meezan Investments** (Meezan AMC · 733102-1)
- Holdings **Edit** → reconcile sheet (`POSITION_ADJUST` audit row)
- Edit qty, avg cost/NAV, manual last price, broker

### Telegram (Roman Urdu + English)
- **9:00 PKT** — separate msg per portfolio (like P&L card)
- **9:30** — market open + morning news
- **12:30** — midday pulse
- **15:30** — close recap per portfolio
- Worker crons: `0/30 4/7/10 * * 1-5` UTC

### Service worker
- `ledgercap-v102`

## 3.35.0 (2026-07-01) — Trust audit fixes

### Telegram
- Shared `shared/telegram-brief.mjs` — client + worker one formatter
- Cron: KV dedupe per day, 3× retry on send, failure logged to KV
- Stale sync disclosure: `Data as of …` line when using cached brief
- US/Intl holdings block in morning brief
- Client scheduler logs failed sends

### Holdings / data
- `brokerAllocation()` includes global (IBKR etc.)
- Removed fake `$100` fallback for unknown US tickers — shows **Unpriced** badge
- Price entries tag `currency: 'USD'` on global normalize

### UI / PWA
- `--psx-surface*` + `--text2` defined for light/dark
- Light mode `--psx-text-3` contrast fix
- Topbar freshness chip (offline / stale / updated)
- `history.pushState` + `popstate` for in-app back nav
- Chart color uses theme (no hardcoded blue)
- SW precache: news, transaction-ledger, telegram-brief

### Service worker
- `ledgercap-v101`

## 3.34.0 (2026-07-01) — Research / Analyze data accuracy

### Fixes
- **US/crypto daily %** — prevClose was stored in USD while price was PKR, causing absurd moves (e.g. +27735%). Quotes now normalize USD/PKR on save and compute % in USD.
- **Fair value currency** — US stocks show `$` fair value; PSX stays in ₨.
- **Fundamentals** — Yahoo P/E and dividend yield for US tickers after live refresh.
- **Price chart** — stale symbol race fixed when switching tickers quickly.
- **Pilot signal** — removed duplicate `TRIM — TRIM` in portfolio context text.
- **State migration v9** — repairs corrupted global price entries on load.

### Service worker
- `ledgercap-v100`

## 3.33.0 (2026-07-01) — Hub UI + rich Telegram daily brief

### Hub UI
- Capital deployed table — clear Deployed / Value / P&L columns, separate Txs buttons
- KSE-100 ticker pill — readable in light and dark mode
- Market breadth pills — borders and contrast fixes
- Light/dark theme polish across deploy grid and pulse row

### Telegram
- Daily brief now includes portfolios, P&L, upcoming dividends, holding news, signals
- Cloud sync payload carries full extras for worker cron

### Service worker
- `ledgercap-v99`

## 3.32.0 (2026-06-30) — Phase 4 UI polish

### Design
- Hub tool icons — color-coded tones (gold / blue / green / violet) instead of mixed emoji
- Net worth chart — period caption, start→end values, % change row
- Charts use theme `--psx-accent` / `--lc-chart-stroke` (no hardcoded blue)
- Design tokens: `--lc-brand`, `--lc-chart-stroke`, light-mode icon tones
- Settings Security section uses `lc-pro` surface tokens

### Version sync
- `manifest.json`, `VERSION.json`, landing footer, presentation slide

### Service worker
- `ledgercap-v98`

## 3.31.0 (2026-06-30) — App PIN lock (Phase 6)

### Security
- Optional **4–6 digit PIN** — SHA-256 hash in `localStorage`, never plaintext
- Full-screen lock overlay on launch + **auto-lock** (1 / 5 / 15 / 60 min or never)
- **Decoy PIN** — masked balances (`₨ —`); export/reset blocked
- 5 wrong attempts → 30s lockout
- Settings: set / change / disable PIN, lock now

### Service worker
- `ledgercap-v97`

## 3.30.0 (2026-07-01) — Telegram Pakistan proxy

### Bot API via worker (permanent PK fix)
- All client Telegram calls route through `…/telegram/bot/{method}` on the LedgerCap Cloudflare worker
- Worker forwards to `api.telegram.org` from edge (not blocked in Pakistan)
- Whitelist: `sendMessage`, `getUpdates`, `getMe` only
- Settings: **Test proxy** button; direct API fallback only if proxy fails

### Deploy required
- `cd worker && npx wrangler deploy` to activate `/telegram/bot/*` routes

### Service worker
- `ledgercap-v96`

## 3.29.0 (2026-06-30) — Phase 2.4–2.6 + Telegram cloud (3.3)

### Pilot / rebalance (2.4)
- **Target weights UI** in Tax & Rebalance — per-symbol target % + acquisition date for CGT

### Wealth calendar (2.5)
- **Wealth calendar** screen — dividends, IPO, corporate actions by month

### Research (2.6)
- **Portfolio context** on stock Research — Pilot signal + rebalance row when held

### Telegram cloud (3.3)
- Settings: **Detect chat ID**, link to @LedgerCap_Bot, cloud sync key + brief upload
- Worker: `POST /telegram/sync`, cron weekdays 9:00 PKT, `GET /telegram/ping`
- Syncs urgent signals only — never full transaction ledger

### Service worker
- `ledgercap-v95`

## 3.28.0 (2026-06-30) — Phase 2.1–2.3 signals & risk

### Signals (3 tabs)
- **Morning** — existing Pilot brief (unchanged content)
- **Intraday** — `intraday-signals.js` session scan vs prev close (≥2% / gap 4%)
- **Buy more** — `buy-recommendations.js` merges rebalance ADD + morning STRONG BUY / ADD, PSX 100-lot rounding

### New screens
- **Risk audit** (`risk-audit.js` + `risk-audit-service.js`) — sector/name/broker/CGT/drift checklist
- **Insights** (`insights.js` / `InsightsScreen`) — Pilot score, MZNPETF proxy benchmark, value chart, Zakat snapshot
- Hub + Research portfolio links; sidebar More entries

### Tests
- `tests/signals-logic.test.js` — intraday classify + lot rounding + risk report

### Service worker
- `ledgercap-v94`

## 3.27.0 (2026-06-30) — Telegram client (Phase 3.1–3.2)

### Telegram (free Bot API)
- **Settings → Telegram**: bot token, chat_id, toggles (morning / intraday / dividend / price)
- `telegram-service.js` — send test, format morning brief, Markdown escape, 4096 cap
- `notification-scheduler.js` — weekday 9:00–9:15 PKT brief while PWA open; dividend + watchlist hooks
- CSP: `api.telegram.org` connect-src
- Unit test: `tests/telegram-format.test.js`

### Service worker
- `ledgercap-v93`

## 3.26.0 (2026-06-30) — Phase 1 critical fixes

### Navigation & tools
- **Tax & Rebalance** (`pilot-tools`) in Hub tools grid + sidebar More — ≤2 taps from Hub
- i18n EN + Urdu for pilot tools label

### Portfolio buckets
- Bucket cards show **cost basis (invested)** + **P&L** per Rafi, AKD, Funds, US
- Hub footnote: invested = cost basis, not gross deposits

### Onboarding
- `onboarding.js` loaded + styled 3-step first-run flow (skip if ledger exists)

### Honesty & UX
- Rule-based copy: no “AI stance” on Signals/Research tools
- Pro modal → **Support development** (no fake $3.99 paywall)

### CI & cache
- Vendored `tests/helpers/viewport-helpers.js` (Playwright viewport contract)
- Single version constant in `js/data/config.js` → SW `ledgercap-v92`
- Fix `window.State` bootstrap before seed load (strict-mode `FxService` + TTWO seed)

## 3.25.0 (2026-07-01) — Full transaction ledger + taxes (seed v10)

### Transactions
- **All types** shown: buys, sells, dividends, deposits, fees, taxes, fund converts, US/IBKR, internal (toggle)
- Summary bar: cash in/out, net flow, dividends, taxes, fees
- **Linked detail**: portfolio bucket, related fee/tax rows, Research + filter shortcuts
- Meezan **AMC fees & taxes** from statement 733102-1 (~50 linked rows)
- Portfolio / Hub / Dividends screens link to filtered transaction views

### Ledger
- `TAX` type in cash balance · `totalTaxes()` / `totalFees()` helpers
- `TransactionLedger` service — single source for display math

### Service worker
- `ledgercap-v91`

## 3.24.0 (2026-07-01) — Invested totals, live FX, news, dividends (seed v9)

### Capital deployed per bucket
- **Rafi** ₨540,000 · **AKD** ₨200,000 (your deposits) · **Meezan** ₨634,000 · **TTWO** $2,365.45 (shown in USD + PKR)
- Bucket cards, Hub “Capital deployed”, Portfolio pulse, Funds & Global screens

### FX
- Live **USD/PKR** via [ExchangeRate-API](https://open.er-api.com) (free, no key) + worker fallback
- Settings → refresh rate · TTWO and IBKR values in PKR

### News
- **Yahoo Finance** headlines for your holdings + rule-based impact tags (earnings, dividend, macro, etc.)
- Optional **GNews** API key in Settings for PSX coverage
- Hub + Intelligence “News impact” sections

### Dividends logged (your data)
- PSX Rafi: PPL, OGDC, MEBL, EFERT + ₨255 May 14 (symbol TBC)
- Meezan cash: KMIF, MIF, MBF, MDYP (27-Jun-2026)
- TTWO buys dated **24-Jun-2026**

### Service worker
- `ledgercap-v90`

## 3.23.0 (2026-07-01) — Meezan AMC statement 733102-1 (seed v8)

### Meezan portfolio 733102-1 (as at 29-Jun-2026)
- **7 funds** reconciled to AMC statement: KMIF, MAAF, MBF, MDAAF-MDYP, MIF, MIIF GROWTH-B, MIIF MMKA
- **Total portfolio value:** ₨661,600 | **Total purchases (Jun-25–Jun-26):** ₨634,000 | **Withdrawals:** ₨0
- **Unit balances** updated; **6 corporate actions** (ROC + dividend reinvest) as internal `CONTRIBUTION` txs
- Verify script + tests assert exact units and ₨661,600 fallback NAV total

### Service worker
- `ledgercap-v89`

## 3.22.0 (2026-07-01) — AKD COAF55870 full statement (seed v7)

### AKD account COAF55870 (Apr–Jul 2026)
- **All trades** from statement: HINO, Jun-8 block, FATIMA, Jun-15 block, MUGHAL, **PAEL**, **PSO**, MLCF sell/rebuy, **PASM exit**
- **Deposits:** ₨150k (May 22), ₨50k (Jun 16), friend ₨80k (Jun 5, custodial)
- **PASM:** your **1,555** bought @ 8.41, sold @ **10.31** (Jun 24) — **0 shares** now
- **Friend 9,445 sh:** funded via ₨80k RAAST — **₨97,945.50 custodial cash** in AKD ledger (excluded from your net worth)
- **AKD ledger cash:** ₨138,045 | **Your AKD cash:** ₨40,099.50 | **Broker cash (net worth):** ₨40,959.75 (Rafi + your AKD)
- **14 holdings:** FATIMA, FFC, HINO, LUCK, MLCF×200@102.22, MUGHAL, PAEL, PIBTL, PICT, PNSC, PPL, PSO, SLGL, TREET

### Service worker
- `ledgercap-v88`

## 3.21.0 (2026-07-01) — TTWO IBKR seed

### Seed v6
- **TTWO** (Take-Two Interactive) — two IBKR `INTL_BUY` rows:
  - 4.7 shares @ $235.68, fees $2.77, total **$1,110.45**
  - 4.97 shares, total **$1,255.00**
- Blended position: **9.67 shares** · **$2,365.45** cost · **~$244.62** avg
- `GLOBAL_FALLBACK_USD.TTWO` set to $245

### Service worker
- `ledgercap-v87`

## 3.20.0 (2026-07-01) — Rafi vTrade reconciliation (seed v5)

### Fix
- **Rafi portfolio** — replaced inflated trade-log seed with exact **vTrade snapshot** (account 6773, 01 Jul 2026): **21 holdings**, correct qty/avg (PSO 35@331.39, PTC 100@58.50, SSGC 200@28.74, etc.)
- Removed **TRG** from Rafi seed (sold; not in vTrade)
- **Fallback prices** updated to Jul 1 market prices from vTrade
- **Broker cash** seeds to **₨860.25** on seed load / migration (Settings → Cash & manual assets)

### Verify
- `node scripts/verify-ledger.js` — Rafi position + PASM + Meezan checks

### Service worker
- `ledgercap-v86` — hard refresh after deploy

## 3.19.0 (2026-06-30) — Rafi / AKD / CDC split + US picker fix

### Portfolios
- **Rafi Securities**, **AKD Securities**, **CDC Custody** — separate hub cards (was one “Pakistan PSX” bucket)
- Holdings filtered by `broker` on each transaction
- Add-holding pre-selects broker when opened from a bucket

### Bug fix
- **US stock picker** — type ticker OR tap row; search syncs hidden symbol; mobile tap targets 44px; fallback catalog if `INTL_STOCKS` empty

## 3.18.0 (2026-06-30) — Performance M2M + global realised

### Fixes
- **Daily/monthly M2M** — uses logged `priceHistory` snapshots (real net-worth deltas), not today's prices on past dates
- **INTL/CRYPTO realised** — `realisedTrades()`, Performance Realised tab lists US/crypto sells in PKR
- **Deploy visibility** — hub shows `v3.18.0`, toast if `VERSION.json` newer than cached app
- **Snapshot on launch** — logs today's portfolio value for M2M history

### Service worker
- `ledgercap-v83` — hard refresh after deploy

## 3.17.0 (2026-06-30) — Audit completion (C/H/M/L)

### Critical
- **C1** Seed v4 documented — no Rafi double-count; `docs/RECONCILIATION.md` updated
- **C2** `?demo=1` no longer overwrites saved ledger
- **C3** `portfolioValueTimeline` includes INTL/CRYPTO transactions
- **C4** `currentCostBasis()` includes global holdings

### High
- **H1** Performance Realised tab (PSX sells by date) + M2M disclaimer
- **H2** Stale price badges, hub stale chip, watchlist symbols in refresh
- **H3** Delete/rename custom portfolios
- **H4** CSV import portfolio picker
- **H5** `docs/HANDOVER.md` version sync
- **H6** Broker cash field (`manualAssets.brokerCashPkr`) in Settings

### Medium
- **M1** Design tokens consolidated in `lc-pro-phase.css` (legacy CSS noted)
- **M2** Hub tool icons use geometric glyphs (no emoji hub grid)
- **M3** Light mode polish for portfolio cards and badges
- **M5** Search debounce (`LcDebounce`) on Market + Global
- **M6** Intelligence screen restyled to `lc-pro` dash layout
- **M7** i18n keys unchanged; English-first audit items closed

### Low
- **L1** Per-portfolio sparklines on hub cards
- **L2** GitHub Actions CI — `verify-ledger.js` + Playwright
- **L3** Version sync — app `3.17.0`, SW `ledgercap-v82`

### Tests
- `tests/ledger.spec.js` — PASM, Meezan units, cost basis, global holdings

## 3.16.0 (2026-06-30) — Multi-portfolio hub

### Features
- **Three portfolio ledgers** — Pakistan PSX, Islamic Funds, and US Equities shown as cards on Hub, P&L, and Analyze → Portfolio
- **Add portfolio** — create custom ledgers (e.g. USA IBKR account) and assign transactions to them
- Tap a portfolio card to filter holdings and add holdings to that ledger

## 3.15.1 (2026-06-30) — Search focus + chart reliability

### Bug fixes
- **Stock search** — typing now shortlists in place on Global, Market, Screener, Funds, and Research (no full-screen re-render / lost focus)
- **US transaction search** — picker no longer hijacks the input on first keystroke
- **Charts** — TTWO and other US symbols use Yahoo price history SVG instead of offline TradingView embed
- **US quote price** — intl symbols (e.g. TTWO) show USD live/fallback price instead of ₨0.00

### UX
- Search dropdown styles (`.lc-search-wrap`, hit list, hints)

## 3.13.0 (2026-06-30) — Pro UI phase 2: Market + Research

### Design
- Market: KSE header cards, iOS segment filter, search, sector grouped rows
- Research: hero price block, verdict card, metric grid, TradingView in card chrome

## 3.12.0 (2026-06-30) — Pro UI redesign (Apple HIG)

### Design
- New `lc-pro.css` design system — SF-style typography, iOS colors, blur chrome, card shadows
- Dashboard rebuilt — hero net worth, market cards, tool grid, pulse pills
- Portfolio + More screens restyled to match
- Default dark theme; system font stack

## 3.11.1 (2026-06-30) — Scroll fix on desktop / fullscreen

### Bug fix
- Restore bounded `overflow-y: auto` on active screen at ≥900px (relative positioning clipped content inside `overflow: hidden` shell)

## 3.11.0 (2026-06-30) — Global markets, Zakat, CSV import, fullscreen terminal

### Features
- **Global markets** — US equities + crypto via worker (Yahoo + CoinGecko); `INTL_BUY/SELL`, `CRYPTO_BUY/SELL` transactions; USD/PKR FX
- **TradingView charts** in Research (widget embed, not scrape)
- **Zakat calculator** — nisab, debts, manual gold/USD
- **CSV import** — IBKR/Binance/generic trade logs
- **Portfolio geography** — PK / US / Crypto / Cash allocation bars
- **Fullscreen terminal** — desktop full-width shell (`lc-terminal`) + browser fullscreen toggle

### Worker
- Market proxy routes: `/yahoo/chart/{sym}`, `/crypto/price`, `/fx/usdpkr`

### Version sync
- App `3.11.0` · SW `ledgercap-v75` · CSS `psx-app.css v18`

## 3.10.1 (2026-06-30) — PSX CORS / proxy hardening


### Features (PSX terminal redesign)
- Hub, Market (Stock Watch), Funds, Screener, More hub — 5-tab bottom nav + desktop sidebar
- i18n (EN/UR) with header language switcher
- Research terminal: stock + portfolio intel modes, plain-English analyzer
- Comparison, signals, dividend center, watchlist, transactions — reachable from hub tools

### Bug fixes
- `lc-desktop-nav.js` restores Playwright viewport contract at ≥900px
- PSX proxy `/live` alias maps to `timeseries/eod/KSE100` (PSX removed bare `/live`)
- Cash est. on Hub hero + Portfolio screen (`Ledger.cashBalance`)
- Service worker cache includes all new modules + `lc-desktop-nav.js` + `capricorn-motion.js`

### Version sync
- App `3.10.0` · SW `ledgercap-v73` · CSS `psx-app.css v17`

## 3.9.0 (2026-06-29) — H2 fix, font async, alloc colors, A11y micro-pass

### Bug fix (H2)
- `cashBalance()` added to `ledger.js` engine — computes salary + dividends + sell proceeds minus buys/contributions
- Cash balance displayed on Dashboard ("Available cash"), Home ("Cash est."), Portfolio stats

### Performance
- Inter font now loads non-blocking (`media="print" onload` pattern) — eliminates render-blocking on cold load
- SW bumped to `ledgercap-v72`
- CSS bumped to `psx-app.css v16`

### Design
- Sector allocation bar segments colored: 6 distinct hues (indigo, emerald, orange, rose, blue, amber)

### Accessibility
- `pilot-tools.js` delete button now has `aria-label="Delete IPO entry"`

### Score
- Overall: 81 → 83 (+2)
- Performance: 78 → 82
- Design: 86 → 87
- UX: 82 → 84 (H2 fully wired)

## 3.8.0 (2026-06-29) — Complete CSS coverage pass (`psx-app.css v13`)

### New CSS — zero unstyled classes achieved
- `inv-*` — Analyze: bars chart, stat tiles, recent transactions
- `div-cal-*`, `div-panel` — Dividends calendar
- `os-insight-*`, `rt-insight-*` — Intelligence screen
- `lc-brief-*`, `lc-compact-*`, `lc-index-*`, `lc-live-*`, `lc-pulse-*`, `lc-ticker-*`, `lc-page-head/sub` — Watch screen
- `lc-tool-card` — Pilot-tools
- `pt-*` — Pilot-tools table
- `holding-*`, `holdings-grid`, `home-*`, `lc-stat-card` — Home screen
- `os-alloc-*`, `os-hero-value/label/pills`, `os-stat-item-*`, `os-section-title` — Dashboard
- `ob-*` — Onboarding flow
- `income-*`, `sip-bar/fill` — Income screen
- `perf-chart`, `perf-pred-*` — Performance predictions
- `port-summary-*`, `port-table`, `filter-tabs`, `card-highlight`, `ht-icon`, `os-broker-*` — Portfolio
- `detail-stat-*`, `os-metric-*`, `os-row-sub/val`, `rt-div-event` — shared utilities
- `type-selector`, `field-select`, `field-prefix-wrap` — form components
- `metric-grid/tile/value/sub`, `hero-label`, `sec-action` — Reports
- `btn-danger` — Settings
- `empty-state-*`, `.psx-skel` skeleton, `.psx-empty` — empty/loading states
- `t-dim`, `t-orange`, `price-ind`, `lc-live-dot/badge` — colour + indicator helpers
- Desktop scrollbar, `::selection` highlight

### PWA
- SW: `ledgercap-v69`
- CSS: `psx-app.css?v=13`

## 3.7.0 (2026-06-29) — A11y + PWA polish pass

### Accessibility (`psx-app.css v5`)
- `focus-visible` outlines (indigo accent, 2px) on all interactive elements
- `prefers-reduced-motion` block collapses all animations/transitions
- Skip-link `.psx-skip-link` added to `index.html` (slides in on focus)
- `<div id="screens">` gets `role="main" aria-label="LedgerCap content"`

### Design (`psx-app.css v5`)
- Skeleton shimmer system: `.psx-skel`, `.psx-skel-text`, `.psx-skel-card`, `.psx-skel-pill`, `.psx-skel-row`
- Empty state helpers: `.psx-empty`, `.psx-empty-icon`, `.psx-empty-title`, `.psx-empty-sub`
- Desktop custom scrollbar (4px, border-tinted)
- `::selection` highlight (indigo-tinted)

### PWA (`manifest.json`, `sw.js`)
- Manifest: added `categories` (`finance`, `productivity`) + `shortcuts` (Portfolio, Watchlist)
- Service worker bumped to `ledgercap-v61`

### Engine bug audit
- C1–C4, H3, H4, H6: **confirmed already fixed** in v3.5.0
- H1: inherent limitation — disclaimer present on Performance tab
- H2, H5: remain as known issues

### Score
- Overall: 72 → 76 (+4)
- A11y: 52 → 78

## 3.6.0 (2026-06-29) — Full-app UI polish pass

### Bug fixes
- `capricorn-motion.js` now loaded in `index.html` — fixes `CapMotion is not defined` crash on Comparison, Performance, Journal, Pilot-tools, Watchlist, Market Strategy, and Home screens
- Added `window.CapMotion = window.CapricornMotion` alias; all 18 module calls now resolve correctly

### CSS — new component styles (`psx-app.css v4`)
- `comp-*` — Comparison screen: cards, metric rows, verdict section, winner highlight
- `perf-*` — Performance screen: stat tiles, chart container, daily list rows
- `os-btn`, `os-btn-primary`, `os-btn-ghost` — shared action buttons (Journal, Watchlist, Pilot-tools)
- `btn-sm`, `btn-primary`, `btn-ghost` — secondary button scale
- `rt-wl-card`, `rt-badge`, `rt-buy/sell` — Watchlist cards with BUY/SELL badges
- `rt-grid`, `rt-grid-2`, `rt-metric` — 2-col metric tile grid (Signals / Market Strategy)
- `rt-section`, `lc-section-head`, `lc-section-kicker`, `lc-section-body`, `os-row` — shared section layout
- `badge` — inline pill with buy/sell/hold/reduce/trim colour variants
- `t-gain`, `t-loss` — explicit green/red colour helpers
- `cap-tab-bar`, `cap-tab`, `perf-tab` — tab bar pills (Performance, Pilot-tools)
- `perf-disclaimer` — muted note block in Performance

### Screens now fully functional and styled
All 16 screens verified in both light and dark mode: Hub, Watch, Funds, P&L, Analyze, Stock Screener, Dividends, Watchlist, Market Strategy, Transactions, Comparison, Performance, Journal, Pilot-tools, Settings, More.

## 3.5.1 (2026-06-16)
- Fix return metrics: dashboard and holdings use ledger cost basis, not gross invested.
- Portfolio intel scores clamped 0–100; dividend/growth quality display rounded.
- PSX price chain: when Cloudflare proxy fails (520), fall through to Yahoo and CORS proxies without console spam; skip bad `.KA` symbols after first failure.
- Desktop layout: full-width sidebar + content shell (VaultCap pattern) on ≥900px; mobile stays 430px column.
- Service worker cache `ledgercap-v51`; `scripts/verify-ledger.js` for reconciliation.

## 3.5.0 (2026-06-16)
- Seed v4, `currentCostBasis()`, performance header, home sparkline fix (partial audit — see docs/RECONCILIATION.md).

## 3.4.3 (2026-06-16)
- Complete legacy rebrand to LedgerCap: config (`LEDGERCAP_CONFIG`), PSX proxy worker name, landing logo, docs, backup format (`.ledgercap`).
- Legacy localStorage/session keys and proxy URLs migrate automatically on launch.
- Desktop shell layout fix; Home / Performance / Compare / Transactions navigation wired.
- Service worker cache `ledgercap-v47`; offline cache includes home, performance, comparison modules.

## 3.4.1 (2026-06-15)
- Restore pre–Capricorn identity home-screen icons; service worker cache bump.

## 3.4.0 (2026-06-15)
- Merge Intel into Research: Stock analysis + Portfolio intel modes; Intel tab removed (8 tabs).
- Empty dashboard state with Add holdings and demo portfolio CTAs.
- Legacy `intelligence` / `reports` routes open Portfolio intel inside Research.

## 3.3.0 (2026-06-15) — Product quality pass
- Design token system: typography scale, spacing vars, calm light/dark palette, blue interactive accent
- Dashboard focused on portfolio value, today P&L, passive income, and attention items
- Portfolio, research, and dividend screens simplified; reduced gradients, shadows, and motion
- Service worker cache `ledgercap-v43`

## 3.0.0 (2026-06-10) — LedgerCap 2.0
- Complete product redesign: premium investment OS with 9-section navigation
- New sections: Holdings, Research, Watchlist, Dividends, Portfolio Intelligence, Investment Journal
- Dashboard centerpiece: portfolio value, XIRR, risk score, health, allocations, AI summary
- Analytics engine: XIRR, annual return, sector/broker/asset allocation
- Design system: `ledger-os.css` with light/dark themes
- State v5 migration: watchlist, journal, researchNotes preserved alongside existing `ledgercap_v2` data
- Progressive reveal animations via CapMotion

## 2.4.2 (2026-06-12)
- Phase P4: Playwright tests for Reports tab and CSV export on transactions; service worker cache bump.

## 2.3.0 (2026-06-10)
- Portfolio CTO pass: PWA icons (192/512 maskable), service worker cache bump (`ledgercap-v8`)
- Truth sprint: docs aligned with shipped features
- Holdings seed UI, Zakat docs, pitch expansion

### Phase 2 — Quality (2026-06-10)
- Playwright smoke tests (2/2 pass)
- Pitch expanded: security, competition, tech moat, roadmap, OS family
- Landing footer with privacy/changelog HTML pages
