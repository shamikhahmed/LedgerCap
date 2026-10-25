# LedgerCap — Production-readiness screen inventory

Source: `index.html` `#screen-*` + `js/ui/navigation.js` `VALID` / `TABS` / `MORE` · 2026-10-25 · branch `design/hig-3`

Entry: `/?demo=1` (sample) · `/` + cleared storage (empty profile)

## Primary tabs (phone bottom nav · `Navigation.TABS`)

| ID | Hash | Screen host |
|---|---|---|
| home | `#home` | `#screen-home` |
| market | `#market` | `#screen-market` |
| funds | `#funds` | `#screen-funds` |
| portfolio | `#portfolio` / `#portfolio/<bucket>` | `#screen-portfolio` |
| research | `#research` | `#screen-research` |

## More hub + sidebar tools (`Navigation.MORE` + `#screen-more`)

| ID | Hash | Notes |
|---|---|---|
| more | `#more` | Hub of tools (phone: header ⋯) |
| global | `#global` | |
| commodities | `#commodities` | |
| announcements | `#announcements` | |
| zakat | `#zakat` | |
| import | `#import` | CSV |
| screener | `#screener` | |
| dividends | `#dividends` | |
| calendar | `#calendar` | Wealth calendar |
| watchlist | `#watchlist` | |
| signals | `#signals` | Morning / intraday / buy tabs |
| risk-audit | `#risk-audit` | |
| insights | `#insights` | |
| comparison | `#comparison` | |
| performance | `#performance` | |
| journal | `#journal` | |
| pilot-tools | `#pilot-tools` | Tax & rebalance · IPO · calculators |
| paper-trade | `#paper-trade` | |
| transactions | `#transactions` | |
| settings | `#settings` | Theme · PIN · proxy · Telegram · export |

## Chrome / sheets / overlays

| ID | Surface |
|---|---|
| splash | `#splash` bahi clasp |
| pin-lock | `#pin-lock` dialog |
| demo-banner | `#demo-banner` |
| price-health | `#lc-price-health-host` |
| topbar | `.psx-topbar` + ticker + ⋯ More |
| bottom-nav | `#nav` tablist |
| sidebar | `#nav-sidebar` ≥700px |
| bottom-sheet | `#bottom-sheet` (add/sell/edit forms) |
| toast | `#toast-wrap` |
| pro-modal | `#proUpgradeModal` |
| cmd-k | Command palette (when opened) |

## Forms / sheets (seed)

Add/sell transaction · reconcile · add portfolio · watchlist edit · fund NAV · Zakat · paper order · PIN set/change · CSV import · IPO mark listed · settings profile/assumptions/Telegram

## External hosts (CSP `connect-src` / frames)

| Host | Why |
|---|---|
| `ledgercap-psx-proxy.shamikhahmed.workers.dev` | Primary price/news/snapshot Worker |
| `stunds-psx-proxy.shamikhahmed.workers.dev` | Legacy Worker fallback |
| `api.telegram.org` | Optional user Telegram |
| `dps.psx.com.pk` | Via Worker / allowlisted |
| `open.er-api.com` | FX (settings refresh) |
| `gnews.io` | Optional user API key |
| `*.tradingview.com` | Chart frames / symbol search |
