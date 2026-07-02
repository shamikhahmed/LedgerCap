# LedgerCap — Premium UI Sprint Inventory (Phase 0)

**Date:** 2026-07-01 · **Target captures:** 86 screens × 2 themes × 2 viewports = 344 PNGs

## Screen routes (22 `screen-*` divs)

| ID | Module | Nav |
|----|--------|-----|
| home | Hub | Bottom tab |
| market | Market | Bottom tab |
| funds | Funds | Bottom tab |
| portfolio | Portfolio | Bottom tab |
| research | Research | Bottom tab |
| more | More | Hash only |
| global | Global | Sidebar |
| zakat | Zakat | Sidebar |
| import | Import | Sidebar |
| screener | Screener | Sidebar |
| dividends | Dividends | Sidebar |
| calendar | Calendar | Sidebar |
| watchlist | Watchlist | Sidebar |
| signals | Signals | Sidebar |
| risk-audit | Risk audit | Sidebar |
| insights | Insights | Sidebar |
| pilot-tools | Pilot tools | Sidebar |
| transactions | Transactions | Sidebar |
| comparison | Comparison | Sidebar |
| performance | Performance | Sidebar |
| journal | Journal | Sidebar |
| settings | Settings | Sidebar |

**Bonus:** `research-portfolio` (Research → portfolio intel mode)

## Settings sections (19 `sec-head` — scroll capture targets)

Language · Theme · Number format · Display & live data · Tax export · Investor profile · Cash & manual assets · Return assumptions · Zakat calculator · Live prices · Telegram · Manual fund NAV · Try demo · Security & PIN · Data management · Portfolio pilot · About

## Forms / sheets / modals (capture open)

| ID | Trigger |
|----|---------|
| add-transaction | `App.openAddTransaction()` |
| add-portfolio | `App.openAddPortfolio()` |
| price-alert | `App.openPriceAlert('LUCK')` |
| watchlist-add | `Watchlist.openAdd()` |
| journal-new | `Journal.openNew()` |
| pin-sheet | `Settings._enablePin()` flow / pin prompt |
| command-palette | `LcPolish.openCmdk()` |
| pro-upgrade | `openProUpgrade()` |
| tx-detail | First tx in demo ledger |
| import-file | Import screen file picker visible |

## Marketing surfaces (6)

`landing.html` · `pitch.html` · `presentation.html` · `changelog.html` · `privacy.html` · `widget-glance.html`

## Auth / chrome

PIN lock overlay · Demo banner (hidden in captures)

## Emoji audit (shell chrome — purge target)

| Surface | Examples |
|---------|----------|
| Topbar | 🌙 ☀️ ⛶ |
| Splash / PIN | ₨ 🔒 |
| Demo banner | 🎯 |
| Tx types | 📈 📉 💰 🏦 🚀 |
| Module empty states | 📊 📈 ⚖️ 🛡 📋 |
| pitch/presentation | 📊 🌐 📱 🔒 (marketing — replace w/ SVG mark) |

## CSS / theme

| File | Role |
|------|------|
| `psx-app.css` | App shell, `data-theme` dark/light |
| `lc-pro.css` | Premium tokens, SF Pro stack |
| `lc-pro-phase.css` | Phase polish |
| `ledger-os.css` | Landing only (`body.light`) |

**Theme API:** `App.applyTheme('dark'|'light')` → `data-theme` on `body` + `documentElement`

## Icon gaps

- ✅ Bottom nav + sidebar primary: inline SVG
- ❌ Sidebar tools (13): text only
- ❌ Topbar theme/fullscreen: emoji/symbol
- ❌ Hub tool grid: letter badges + ★ ⚡
- ❌ Tx ledger: emoji per type

## Gallery infrastructure status

| Asset | Status |
|-------|--------|
| `screen-gallery.html` | Upgrade from VaultCap (strict viewport, offline embed) |
| `scripts/embed-gallery-manifest.mjs` | Add |
| `tests/screenshots.spec.js` | Expand to 86 items |
| `tests/demo-unlock.js` | Add `polishGalleryFrame` / `prepareGalleryShot` |
| `tests/a11y.spec.js` | Port from VaultCap |

## Capture manifest sections (planned)

1. **primary** — 6 items
2. **tools** — 17 items
3. **settings-sections** — 17 items (scroll anchors)
4. **sheets** — 10 items
5. **marketing** — 6 items
6. **system** — 2 items (pin-lock, splash dismissed)

**Total: 58** base + scroll variants on long pages embedded in `scroll` field per item.
