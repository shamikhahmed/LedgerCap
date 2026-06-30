# Changelog — LedgerCap

## 3.10.0 (2026-06-30) — PSX terminal ship, desktop nav contract, proxy /live fix

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
