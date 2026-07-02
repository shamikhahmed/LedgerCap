# LedgerCap

**Personal Wealth Operating System — by Capricorn Systems.** PSX stocks, Meezan Islamic funds, portfolio tracking, and financial freedom projections.

🔗 **Live:** https://shamikhahmed.github.io/LedgerCap/  
📁 **Repo:** https://github.com/shamikhahmed/LedgerCap

---

## Features

- **Hub** — Net worth hero, KSE-100 strip, tools grid (market, funds, portfolio, research, screener, dividends, signals, watchlist, transactions)
- **Stock Watch** — PSX sector tables with live/cached prices, Islamic filter
- **Funds** — Meezan Islamic fund NAV table with 1Y/3Y/yield
- **Portfolio** — Holdings, P&L, allocation, cash estimate
- **Research** — Plain-English stock analyzer + portfolio intel mode
- **Screener** — P/E, yield, growth filters (Islamic, high div, value)
- **Income** — Dividend center, salary log, financial freedom tracker
- **i18n** — English + Urdu (header switcher)
- **PSX Proxy** — Optional Cloudflare Worker for live Yahoo/PSX quotes

## Install on iPhone

1. Open the live URL in **Safari**
2. **Share → Add to Home Screen**
3. Launch from home screen for full-screen PWA mode

## iPhone test checklist

- [ ] Onboarding completes and dashboard loads
- [ ] Portfolio shows holdings with P&L colours (green/red)
- [ ] Add transaction via FAB updates net worth
- [ ] Income projection chart renders
- [ ] PSX proxy URL saves in Settings (if using live prices)
- [ ] App works offline with cached/fallback prices
- [ ] Safe area: bottom nav clears home indicator

## Local dev

```bash
cd LedgerCap
python3 -m http.server 8769
# → http://127.0.0.1:8769
```

### Screen gallery (UI sprint)

```bash
npm run gallery          # capture + embed manifest
npm run gallery:open     # offline file:// viewer
npm run gallery:view     # serve on :8769
npm run test:a11y        # baseline accessibility
npm run icons:generate   # PWA PNGs from icon.svg
```

See [docs/UI_AUDIT_250.md](docs/UI_AUDIT_250.md) and [screen-gallery.html](screen-gallery.html).

## PSX live prices

Deploy the Cloudflare Worker in `worker/` — see [worker/README.md](worker/README.md). Paste the Workers URL in **Settings → PSX Proxy URL**.

## Documentation

| Resource | Path |
|----------|------|
| User guide | [docs/GUIDE.md](docs/GUIDE.md) |
| Presentation | [docs/PRESENTATION.md](docs/PRESENTATION.md) |
| Landing page | [landing.html](landing.html) |

## Stack

Vanilla JS PWA · `#0B0E11` dark · `#FF6B35` accent · localStorage · ledger-first architecture

---

Built by Shamikh Ahmed.
