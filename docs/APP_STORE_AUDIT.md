# App Store Wrapper Audit — LedgerCap

**Date:** 2026-06-30 · **App version:** 3.14.0

## PWA (GitHub Pages)

| Check | Status | Notes |
|-------|--------|-------|
| `manifest.json` | OK | `theme_color` `#000000`, maskable icons |
| Service worker | OK | `ledgercap-v77`, precaches `us-stocks.js` |
| CSP | OK | TradingView + worker origins allowlisted |
| Offline | OK | Network-first for HTML/JS/CSS |
| Privacy policy link | OK | `privacy.html` linked from landing |

## Capacitor / native wrapper (if shipping)

| Check | Severity | Action |
|-------|----------|--------|
| `NSAllowsArbitraryLoads` | High | Do **not** enable in Cap-DevRoom-style configs; use ATS exceptions only for worker host |
| Privacy manifest | High | Declare UserDefaults (ledger), no tracking |
| In-app purchases | Medium | Pro modal is waitlist only — no StoreKit until SKU exists |
| Account deletion | Low | Local-only app — document “Reset all data” in Settings |
| Guideline 4.2 minimum functionality | OK | Full portfolio OS, not a thin web shell |

## Marketing honesty

- Signals / Pilot = **rule-based**, not LLM
- Research verdict = **Smart Assistant** (heuristics + fundamentals DB)
- Live prices depend on worker + Yahoo/CoinGecko — disclose in Settings

## Pre-submission checklist

1. Run Playwright smoke (`npm test`)
2. Test `?demo=1` on device
3. Verify Urdu RTL in Settings language switch
4. Screenshot: Hub, Market, Global (US search), Zakat
5. App Review notes: offline-first, no server account, PSX proxy URL optional
