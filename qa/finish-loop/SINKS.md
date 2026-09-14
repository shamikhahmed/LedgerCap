# LedgerCap innerHTML sinks (LDG-P0-03)

Generated: 2026-09-14T20:40:59.081Z

Source modules only (not bundle). Edit sources then `npm run bundle`.

## Policy
- Static UI chrome templates: OK
- User notes / titles / CSV / portfolio names / thesis: must use `esc()`
- Remote news / announcements / AI copy: must use `esc()` / `escUrl()`
- Prefer `textContent` when appending single values

## Counts

| Class | Count |
|-------|------:|
| static-template | 104 |
| escaped-user-remote | 2 |

## Inventory

| File | Line | Class |
|------|-----:|-------|
| app.js | 63 | static-template |
| app.js | 239 | static-template |
| app.js | 352 | static-template |
| app.js | 354 | static-template |
| app.js | 356 | static-template |
| app.js | 358 | static-template |
| app.js | 389 | static-template |
| app.js | 503 | static-template |
| app.js | 762 | static-template |
| app.js | 817 | static-template |
| app.js | 1254 | static-template |
| cap-demo-mode.js | 55 | static-template |
| core/i18n.js | 82 | escaped-user-remote |
| core/i18n.js | 84 | static-template |
| core/i18n.js | 91 | static-template |
| data/config.js | 42 | static-template |
| lc-terminal.js | 27 | static-template |
| modules/announcements.js | 93 | static-template |
| modules/announcements.js | 116 | static-template |
| modules/commodities.js | 28 | static-template |
| modules/commodities.js | 42 | static-template |
| modules/comparison.js | 14 | static-template |
| modules/comparison.js | 25 | static-template |
| modules/dashboard.js | 13 | static-template |
| modules/dashboard.js | 30 | static-template |
| modules/dashboard.js | 83 | static-template |
| modules/dividends.js | 290 | static-template |
| modules/funds.js | 46 | static-template |
| modules/funds.js | 59 | static-template |
| modules/global.js | 48 | static-template |
| modules/global.js | 64 | static-template |
| modules/holdings.js | 11 | static-template |
| modules/home.js | 18 | static-template |
| modules/home.js | 36 | static-template |
| modules/home.js | 92 | static-template |
| modules/hub.js | 178 | static-template |
| modules/hub.js | 385 | static-template |
| modules/hub.js | 439 | static-template |
| modules/import.js | 20 | static-template |
| modules/import.js | 73 | static-template |
| modules/import.js | 76 | static-template |
| modules/income.js | 123 | static-template |
| modules/insights.js | 62 | static-template |
| modules/insights.js | 77 | static-template |
| modules/intelligence.js | 10 | static-template |
| modules/intelligence.js | 69 | static-template |
| modules/journal.js | 62 | static-template |
| modules/market.js | 124 | static-template |
| modules/market.js | 141 | static-template |
| modules/more.js | 26 | static-template |
| modules/onboarding.js | 29 | static-template |
| modules/onboarding.js | 119 | static-template |
| modules/paper-trade.js | 151 | static-template |
| modules/performance.js | 19 | static-template |
| modules/performance.js | 35 | static-template |
| modules/performance.js | 228 | static-template |
| modules/performance.js | 232 | static-template |
| modules/performance.js | 236 | static-template |
| modules/performance.js | 240 | static-template |
| modules/pilot-tools.js | 16 | static-template |
| modules/pilot-tools.js | 34 | static-template |
| modules/pilot-tools.js | 126 | static-template |
| modules/pilot-tools.js | 161 | escaped-user-remote |
| modules/pin-lock.js | 21 | static-template |
| modules/pin-lock.js | 66 | static-template |
| modules/portfolio-screen.js | 221 | static-template |
| modules/portfolio-screen.js | 270 | static-template |
| modules/reports.js | 112 | static-template |
| modules/research.js | 166 | static-template |
| modules/research.js | 281 | static-template |
| modules/research.js | 284 | static-template |
| modules/research.js | 288 | static-template |
| modules/research.js | 312 | static-template |
| modules/research.js | 314 | static-template |
| modules/research.js | 321 | static-template |
| modules/research.js | 341 | static-template |
| modules/research.js | 344 | static-template |
| modules/research.js | 380 | static-template |
| modules/research.js | 413 | static-template |
| modules/research.js | 475 | static-template |
| modules/risk-audit.js | 31 | static-template |
| modules/risk-audit.js | 41 | static-template |
| modules/screener.js | 75 | static-template |
| modules/screener.js | 90 | static-template |
| modules/settings.js | 100 | static-template |
| modules/signals.js | 82 | static-template |
| modules/signals.js | 111 | static-template |
| modules/signals.js | 131 | static-template |
| modules/transactions.js | 59 | static-template |
| modules/watchlist.js | 46 | static-template |
| modules/wealth-calendar.js | 80 | static-template |
| modules/whats-new.js | 30 | static-template |
| modules/zakat.js | 24 | static-template |
| services/price-health.js | 70 | static-template |
| services/price-health.js | 77 | static-template |
| ui/market-ui.js | 193 | static-template |
| ui/motion-polish.js | 94 | static-template |
| ui/motion-polish.js | 131 | static-template |
| ui/navigation.js | 65 | static-template |
| ui/navigation.js | 70 | static-template |
| ui/navigation.js | 106 | static-template |
| ui/navigation.js | 107 | static-template |
| ui/tradingview.js | 19 | static-template |
| ui/tradingview.js | 26 | static-template |
| ui/tradingview.js | 34 | static-template |
| ui/tradingview.js | 49 | static-template |

## Fixes applied this finish loop
- Journal titles/body/review escaped
- Watchlist name/thesis/symbol escaped
- CSV import preview + portfolio options escaped
- Research search hit names escaped
- News/announcements already used esc()
