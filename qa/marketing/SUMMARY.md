# LedgerCap marketing capture — 3.58.11

Generated: 2026-10-25T18:17:44.649Z
Base: http://127.0.0.1:8850/?demo=1
Landing: http://127.0.0.1:8850/landing.html

## Summary

| Step | Result |
| --- | --- |
| Gallery webps | 150 ok / 0 fail → `shots/{dark,light}/{iphone,ipad,mac}/` |
| App Store PNGs | 16 ok / 0 fail → `qa/marketing/appstore/` |
| Walkthrough | site/walkthrough.mp4 |
| Lighthouse landing | {"performance":84,"accessibility":95,"best-practices":100,"seo":100} |

## Phase B notes

- Capture: **0** gallery/appstore fails; walkthrough `site/walkthrough.mp4` + poster + VTT wired on `landing.html` (`preload="none"`).
- Gallery: 150 hub webps mirrored → `docs/screenshots/gallery/` (double-dash) + manifests bumped to **3.58.11** / brass accent.
- Lighthouse: perf 84 (TBT on capture host); a11y 95 → link underline fix in `site/site.css`. Full list for hub copy: `qa/marketing/HUB-MEDIA.md`.

## Hub sync

See `qa/marketing/HUB-MEDIA.md`. Copy `shots/` into `shamikhahmed.github.io/apps/ledgercap/shots/` (same relative paths).

## Log

```
OK	gallery	light/iphone/wealth-home-demo.webp
OK	gallery	light/iphone/wealth-portfolio-demo.webp
OK	gallery	light/iphone/wealth-performance-demo.webp
OK	gallery	light/iphone/wealth-transactions-demo.webp
OK	gallery	light/iphone/wealth-dividends-demo.webp
OK	gallery	light/iphone/wealth-calendar-demo.webp
OK	gallery	light/iphone/wealth-zakat-demo.webp
OK	gallery	light/iphone/markets-market-demo.webp
OK	gallery	light/iphone/markets-watchlist-demo.webp
OK	gallery	light/iphone/markets-funds-demo.webp
OK	gallery	light/iphone/markets-global-demo.webp
OK	gallery	light/iphone/markets-commodities-demo.webp
OK	gallery	light/iphone/markets-announcements-demo.webp
OK	gallery	light/iphone/research-research-demo.webp
OK	gallery	light/iphone/research-screener-demo.webp
OK	gallery	light/iphone/research-signals-demo.webp
OK	gallery	light/iphone/research-insights-demo.webp
OK	gallery	light/iphone/research-compare-demo.webp
OK	gallery	light/iphone/research-risk-audit-demo.webp
OK	gallery	light/iphone/research-paper-trading-demo.webp
OK	gallery	light/iphone/research-journal-demo.webp
OK	gallery	light/iphone/tools-import-demo.webp
OK	gallery	light/iphone/tools-more-demo.webp
OK	gallery	light/iphone/tools-settings-demo.webp
OK	gallery	light/iphone/wealth-add-sheet-demo.webp
OK	gallery	dark/iphone/wealth-home-demo.webp
OK	gallery	dark/iphone/wealth-portfolio-demo.webp
OK	gallery	dark/iphone/wealth-performance-demo.webp
OK	gallery	dark/iphone/wealth-transactions-demo.webp
OK	gallery	dark/iphone/wealth-dividends-demo.webp
OK	gallery	dark/iphone/wealth-calendar-demo.webp
OK	gallery	dark/iphone/wealth-zakat-demo.webp
OK	gallery	dark/iphone/markets-market-demo.webp
OK	gallery	dark/iphone/markets-watchlist-demo.webp
OK	gallery	dark/iphone/markets-funds-demo.webp
OK	gallery	dark/iphone/markets-global-demo.webp
OK	gallery	dark/iphone/markets-commodities-demo.webp
OK	gallery	dark/iphone/markets-announcements-demo.webp
OK	gallery	dark/iphone/research-research-demo.webp
OK	gallery	dark/iphone/research-screener-demo.webp
OK	gallery	dark/iphone/research-signals-demo.webp
OK	gallery	dark/iphone/research-insights-demo.webp
OK	gallery	dark/iphone/research-compare-demo.webp
OK	gallery	dark/iphone/research-risk-audit-demo.webp
OK	gallery	dark/iphone/research-paper-trading-demo.webp
OK	gallery	dark/iphone/research-journal-demo.webp
OK	gallery	dark/iphone/tools-import-demo.webp
OK	gallery	dark/iphone/tools-more-demo.webp
OK	gallery	dark/iphone/tools-settings-demo.webp
OK	gallery	dark/iphone/wealth-add-sheet-demo.webp
OK	gallery	light/ipad/wealth-home-demo.webp
OK	gallery	light/ipad/wealth-portfolio-demo.webp
OK	gallery	light/ipad/wealth-performance-demo.webp
OK	gallery	light/ipad/wealth-transactions-demo.webp
OK	gallery	light/ipad/wealth-dividends-demo.webp
OK	gallery	light/ipad/wealth-calendar-demo.webp
OK	gallery	light/ipad/wealth-zakat-demo.webp
OK	gallery	light/ipad/markets-market-demo.webp
OK	gallery	light/ipad/markets-watchlist-demo.webp
OK	gallery	light/ipad/markets-funds-demo.webp
OK	gallery	light/ipad/markets-global-demo.webp
OK	gallery	light/ipad/markets-commodities-demo.webp
OK	gallery	light/ipad/markets-announcements-demo.webp
OK	gallery	light/ipad/research-research-demo.webp
OK	gallery	light/ipad/research-screener-demo.webp
OK	gallery	light/ipad/research-signals-demo.webp
OK	gallery	light/ipad/research-insights-demo.webp
OK	gallery	light/ipad/research-compare-demo.webp
OK	gallery	light/ipad/research-risk-audit-demo.webp
OK	gallery	light/ipad/research-paper-trading-demo.webp
OK	gallery	light/ipad/research-journal-demo.webp
OK	gallery	light/ipad/tools-import-demo.webp
OK	gallery	light/ipad/tools-more-demo.webp
OK	gallery	light/ipad/tools-settings-demo.webp
OK	gallery	light/ipad/wealth-add-sheet-demo.webp
OK	gallery	dark/ipad/wealth-home-demo.webp
OK	gallery	dark/ipad/wealth-portfolio-demo.webp
OK	gallery	dark/ipad/wealth-performance-demo.webp
OK	gallery	dark/ipad/wealth-transactions-demo.webp
OK	gallery	dark/ipad/wealth-dividends-demo.webp
OK	gallery	dark/ipad/wealth-calendar-demo.webp
OK	gallery	dark/ipad/wealth-zakat-demo.webp
OK	gallery	dark/ipad/markets-market-demo.webp
OK	gallery	dark/ipad/markets-watchlist-demo.webp
OK	gallery	dark/ipad/markets-funds-demo.webp
OK	gallery	dark/ipad/markets-global-demo.webp
OK	gallery	dark/ipad/markets-commodities-demo.webp
OK	gallery	dark/ipad/markets-announcements-demo.webp
OK	gallery	dark/ipad/research-research-demo.webp
OK	gallery	dark/ipad/research-screener-demo.webp
OK	gallery	dark/ipad/research-signals-demo.webp
OK	gallery	dark/ipad/research-insights-demo.webp
OK	gallery	dark/ipad/research-compare-demo.webp
OK	gallery	dark/ipad/research-risk-audit-demo.webp
OK	gallery	dark/ipad/research-paper-trading-demo.webp
OK	gallery	dark/ipad/research-journal-demo.webp
OK	gallery	dark/ipad/tools-import-demo.webp
OK	gallery	dark/ipad/tools-more-demo.webp
OK	gallery	dark/ipad/tools-settings-demo.webp
OK	gallery	dark/ipad/wealth-add-sheet-demo.webp
OK	gallery	light/mac/wealth-home-demo.webp
OK	gallery	light/mac/wealth-portfolio-demo.webp
OK	gallery	light/mac/wealth-performance-demo.webp
OK	gallery	light/mac/wealth-transactions-demo.webp
OK	gallery	light/mac/wealth-dividends-demo.webp
OK	gallery	light/mac/wealth-calendar-demo.webp
OK	gallery	light/mac/wealth-zakat-demo.webp
OK	gallery	light/mac/markets-market-demo.webp
OK	gallery	light/mac/markets-watchlist-demo.webp
OK	gallery	light/mac/markets-funds-demo.webp
OK	gallery	light/mac/markets-global-demo.webp
OK	gallery	light/mac/markets-commodities-demo.webp
OK	gallery	light/mac/markets-announcements-demo.webp
OK	gallery	light/mac/research-research-demo.webp
OK	gallery	light/mac/research-screener-demo.webp
OK	gallery	light/mac/research-signals-demo.webp
OK	gallery	light/mac/research-insights-demo.webp
OK	gallery	light/mac/research-compare-demo.webp
OK	gallery	light/mac/research-risk-audit-demo.webp
OK	gallery	light/mac/research-paper-trading-demo.webp
OK	gallery	light/mac/research-journal-demo.webp
OK	gallery	light/mac/tools-import-demo.webp
OK	gallery	light/mac/tools-more-demo.webp
OK	gallery	light/mac/tools-settings-demo.webp
OK	gallery	light/mac/wealth-add-sheet-demo.webp
OK	gallery	dark/mac/wealth-home-demo.webp
OK	gallery	dark/mac/wealth-portfolio-demo.webp
OK	gallery	dark/mac/wealth-performance-demo.webp
OK	gallery	dark/mac/wealth-transactions-demo.webp
OK	gallery	dark/mac/wealth-dividends-demo.webp
OK	gallery	dark/mac/wealth-calendar-demo.webp
OK	gallery	dark/mac/wealth-zakat-demo.webp
OK	gallery	dark/mac/markets-market-demo.webp
OK	gallery	dark/mac/markets-watchlist-demo.webp
OK	gallery	dark/mac/markets-funds-demo.webp
OK	gallery	dark/mac/markets-global-demo.webp
OK	gallery	dark/mac/markets-commodities-demo.webp
OK	gallery	dark/mac/markets-announcements-demo.webp
OK	gallery	dark/mac/research-research-demo.webp
OK	gallery	dark/mac/research-screener-demo.webp
OK	gallery	dark/mac/research-signals-demo.webp
OK	gallery	dark/mac/research-insights-demo.webp
OK	gallery	dark/mac/research-compare-demo.webp
OK	gallery	dark/mac/research-risk-audit-demo.webp
OK	gallery	dark/mac/research-paper-trading-demo.webp
OK	gallery	dark/mac/research-journal-demo.webp
OK	gallery	dark/mac/tools-import-demo.webp
OK	gallery	dark/mac/tools-more-demo.webp
OK	gallery	dark/mac/tools-settings-demo.webp
OK	gallery	dark/mac/wealth-add-sheet-demo.webp
OK	appstore	qa/marketing/appstore/iphone-6.9-light-01-home.png
OK	appstore	qa/marketing/appstore/iphone-6.9-light-02-portfolio.png
OK	appstore	qa/marketing/appstore/iphone-6.9-light-03-market.png
OK	appstore	qa/marketing/appstore/iphone-6.9-light-04-funds.png
OK	appstore	qa/marketing/appstore/iphone-6.9-light-05-research.png
OK	appstore	qa/marketing/appstore/iphone-6.9-dark-01-home.png
OK	appstore	qa/marketing/appstore/iphone-6.9-dark-02-portfolio.png
OK	appstore	qa/marketing/appstore/iphone-6.9-dark-03-market.png
OK	appstore	qa/marketing/appstore/iphone-6.9-dark-04-funds.png
OK	appstore	qa/marketing/appstore/iphone-6.9-dark-05-research.png
OK	appstore	qa/marketing/appstore/ipad-13-light-01-home.png
OK	appstore	qa/marketing/appstore/ipad-13-light-02-portfolio.png
OK	appstore	qa/marketing/appstore/ipad-13-light-03-market.png
OK	appstore	qa/marketing/appstore/ipad-13-dark-01-home.png
OK	appstore	qa/marketing/appstore/ipad-13-dark-02-portfolio.png
OK	appstore	qa/marketing/appstore/ipad-13-dark-03-market.png
OK	walkthrough	site/walkthrough.mp4
OK	lighthouse	{"performance":84,"accessibility":95,"best-practices":100,"seo":100}
```
