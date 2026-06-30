# LedgerCap UI Phases

| Phase | Scope | Version |
|-------|--------|---------|
| 0 | PSX terminal, worker proxy, scroll fix | 3.10.x |
| 1–2 | `lc-pro` design system, Hub, Portfolio, More | 3.12.0 |
| 3 | Market + Research Pro screens | 3.13.0 |
| 4 | Funds, Screener, Dividends, Global + **US S&P 500 catalog (511)** | 3.14.0 |
| 5 | Transactions, Settings, Import, Zakat Pro layout | 3.14.0 |
| 6 | Signals, Watchlist, Comparison, Performance, Journal | 3.14.0 |
| 7 | Bottom sheet, toasts, onboarding, Pro modal (`lc-pro-phase.css`) | 3.14.0 |
| 8 | Tab motion (`lc-screen-enter`), skeleton helpers, `CapMotion.refresh` on nav | 3.14.0 |
| 9 | Landing copy, manifest `theme_color`, App Store audit doc | 3.14.0 |
| 10 | A11y `focus-visible`, RTL Urdu (`lc-rtl`), `prefers-reduced-motion`, list `contain` | 3.14.0 |

## US stocks

- `js/data/us-stocks.js` — generated S&P 500 + major ETFs
- `js/data/global-assets.js` — merges into `INTL_STOCKS` + `GLOBAL_FALLBACK_USD`
- Global screen + `INTL_BUY` / `INTL_SELL` transactions use full catalog

## Design tokens

Primary stylesheet: `css/lc-pro.css`  
Phase 4–10 polish: `css/lc-pro-phase.css`
