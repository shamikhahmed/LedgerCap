# Competitor Parity — LedgerCap vs Sarmaaya · PSX Stock Analyzer · Investify

Last updated: **3.43.0** (2026-06-30)

LedgerCap targets feature parity with three Pakistani investor apps while staying offline-first, private, and honest (rule-based “Smart Assistant” — not fake AI).

## Sources

| App | URL | Focus |
|-----|-----|--------|
| Sarmaaya | https://sarmaaya.pk | Portfolio, CGT, benchmarks, multi-asset, alerts |
| PSX Stock Analyzer | https://psxstocksanalyzer.com | Deep stock analysis, peers, technicals |
| Investify | https://investify.pk | Live PSX, bid/ask, charts, Islamic filter, watchlists |

## Feature matrix

| Feature | Sarmaaya | PSX Analyzer | Investify | LedgerCap 3.43 |
|---------|----------|--------------|-----------|----------------|
| Portfolio P&L | ✅ | ⚠️ | ✅ | ✅ |
| KSE-100 live strip | ✅ | ✅ | ✅ | ✅ |
| vs KSE-100 benchmark | ✅ | — | — | ✅ (Insights) |
| CGT estimator + filer toggle | ✅ | — | — | ✅ (Pilot tools) |
| Stock research / fundamentals | ✅ | ✅ | ✅ | ✅ |
| Bid / offer depth | — | — | ✅ | ✅ (Research, PSX) |
| Sector peers | — | ✅ | — | ✅ (Research) |
| RSI / technicals | — | ✅ | ⚠️ | ✅ (rule-based) |
| 52-week range | — | ✅ | — | ✅ (EOD series) |
| Dividends / corporate actions | ✅ | ⚠️ | — | ✅ |
| Announcements feed | ✅ | — | — | ✅ (new screen) |
| Commodities (gold, oil) | ✅ | — | — | ✅ (new screen) |
| Islamic / Shariah flag | ✅ | — | ✅ | ✅ |
| Watchlist + alerts | ✅ | — | ✅ | ✅ |
| Demo / paper trading | — | — | ✅ | ❌ (out of scope) |
| Cloud sync | ✅ | — | ✅ | ❌ (local-first by design) |

Legend: ✅ shipped · ⚠️ partial · ❌ not planned · — unknown / N/A

## Implementation map

| Gap closed in 3.43 | Files |
|--------------------|-------|
| Order book (bid/offer) | `js/services/market-watch-service.js`, `js/modules/research.js` |
| KSE-100 benchmark | `js/modules/insights.js` (`state.kseIndex`) |
| Deeper analyzer | `research.js` — peers, technicals, 52w, corporate snippet |
| Commodities | `js/data/commodities.js`, `js/services/commodities-service.js`, `js/modules/commodities.js` |
| Announcements | `js/modules/announcements.js` + `CorporateActionsService` + `NewsService` |
| Navigation | `navigation.js`, `hub.js`, `more.js`, `index.html` |

## Data sources

- PSX EOD / intraday / trading board: `dps.psx.com.pk` via LedgerCap worker proxy
- Commodity spots: Yahoo (`GC=F`, `SI=F`, `CL=F`, `HG=F`)
- PKR gold: Settings `goldPricePerGram` (Zakat link)
- News: worker Yahoo / Google RSS (`news-service.js`)

## Remaining gaps (future)

1. **Demo trading** — Investify paper portfolio (needs isolated ledger state)
2. **Cloud sync** — optional encrypted backup (Sarmaaya / Investify accounts)
3. **Full order book ladder** — PSX HTML exposes top of book only, not full depth levels
4. **Real-time push** — SSE stream exists (`live-price-stream.js`); depth not wired to stream yet

## Acceptance

- [x] `docs/COMPETITOR_PARITY.md` published
- [x] Commodities screen in nav + hub + gallery
- [x] Announcements screen in nav + more
- [x] Research shows bid/offer for PSX symbols
- [x] Insights benchmarks vs KSE-100
- [x] Version 3.43.0 + SW v110
