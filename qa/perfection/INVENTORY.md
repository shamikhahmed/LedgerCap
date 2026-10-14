# LedgerCap — Perfection v3 INVENTORY
Seeded from §13.5 + `index.html` screens + `js/ui/navigation.js` · 2026-10-14

Live entry: `/LedgerCap/?demo=1` · Stack: static JS PWA + CF Worker (prices) · Own Pages  
D-09: prices Worker-only, labelled indicative / delayed.

## Primary tabs (bottom nav)
| ID | Screen | Route |
|---|---|---|
| S-HOME | Home / net worth · deploy buckets · morning brief | `#home` |
| S-MARKET | Market / watch (KSE strip, pulse) | `#market` |
| S-FUNDS | Funds (Meezan / Islamic) | `#funds` |
| S-PORT | Portfolio (holdings, CAGR, performance) | `#portfolio` / `#portfolio/<bucket>` |
| S-RESEARCH | Research / analyze | `#research` |

## Tools / More (sidebar + More hub)
| ID | Screen |
|---|---|
| S-GLOBAL | Global / US + crypto |
| S-CMD | Commodities |
| S-ANN | Announcements |
| S-ZAKAT | Zakat |
| S-IMPORT | Import (CSV) |
| S-SCREEN | Screener |
| S-DIV | Dividends |
| S-CAL | Calendar |
| S-WL | Watchlist |
| S-SIG | Signals |
| S-RISK | Risk audit |
| S-INS | Insights |
| S-PILOT | Pilot tools (CAGR, SIP, IPO, cash) |
| S-PAPER | Paper trade |
| S-TX | Transactions |
| S-SET | Settings (EN · اردو · Roman Urdu, currency, theme — P-LDG-1) |
| S-MORE | More hub |
| S-COMP | Compare |
| S-PERF | Performance |
| S-JOURNAL | Journal |

## Chrome / sheets
| ID | Surface |
|---|---|
| C-SPLASH | Splash / bahi clasp |
| C-PIN | PIN lock |
| C-DEMO | Demo banner + Dismiss |
| C-TICKER | KSE-100 ticker pill (refresh) |
| C-HEALTH | Price-health banner + Dismiss |
| C-SHEET | Bottom sheet |
| C-TOAST | Toast |
| C-PRO | Pro waitlist modal (G-2: GitHub star, no paywall) |

## Forms (seed)
add transaction (all types) · CSV import mapping · watchlist add · fund units · Zakat · paper order · settings (language/theme/currency/PIN) · IPO / cash (pilot)

## States (§7.9)
demo (`?demo=1`) · empty · loading · error/retry · offline · stale snapshot · first-run · long holdings · RTL/Urdu (LDG-V3-6 later)

## Network (must match privacy + CSP)
| Destination | Why |
|---|---|
| `ledgercap-psx-proxy.shamikhahmed.workers.dev` | PSX / Yahoo / crypto / FX / news / snapshot (D-09) |
| `dps.psx.com.pk` | via Worker only |
| `api.telegram.org` | optional Telegram (user-configured) |
| TradingView frames | charts (CSP allowlist) |

## Notes
58 analyzer screen nodes historically; VALID set in `navigation.js` is source of truth for hash routes.
