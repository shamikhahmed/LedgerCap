Track your PSX stocks and mutual funds in one place.

# LedgerCap

PSX stocks, Meezan Islamic funds, portfolio tracking, and research tools — by Capricorn Systems. (Never “wealth OS” — G-3.)

**Version:** 3.58.11 · **SW:** `ledgercap-v35811` · **Live:** https://shamikhahmed.github.io/LedgerCap/?demo=1

🔗 **Live:** https://shamikhahmed.github.io/LedgerCap/  
📁 **Repo:** https://github.com/shamikhahmed/LedgerCap  
📣 **Marketing:** [landing.html](landing.html) · [pitch.html](pitch.html) · [presentation.html](presentation.html) — refresh branch `marketing/3.58.11`

---

## Example stories

Illustrative day-in-the-life stories (**fictional examples**) with screenshots and captions:

- App stories: https://shamikhahmed.github.io/apps/ledgercap/
- All Cap stories: https://shamikhahmed.github.io/stories/

## Features

- **Hub** — Net worth hero, KSE-100 strip, rebalance teaser, market status, quick actions, tools grid
- **Stock Watch** — PSX sector tables with live/cached prices, Islamic filter
- **Funds** — Meezan Islamic fund NAV table with 1Y/3Y/yield
- **Portfolio** — Holding cards, search/sort, cards/table toggle, per-symbol refresh, Sell shortcut
- **Transactions** — Ledger with undo toast after add
- **Research** — Plain-English stock analyzer + portfolio intel mode
- **Screener** — P/E, yield, growth filters (Islamic, high div, value)
- **Backup** — JSON export, PIN-encrypted `.ledgercap.enc`, optional cloud sync via worker
- **Paper trade** — Isolated sandbox (More → Paper trade)
- **i18n** — English + Urdu + Roman Urdu (Settings)
- **PSX Proxy** — Cloudflare Worker for live Yahoo/PSX quotes (portfolio stays on-device; cached/fallback if unreachable)

## Install on iPhone

1. Open the live URL in **Safari**
2. **Share → Add to Home Screen**
3. Launch from home screen for full-screen PWA mode

## Local dev

```bash
cd LedgerCap
python3 -m http.server 8850   # marketing ports 8850–8859; playwright default 8769
# → http://127.0.0.1:8850
```

### Marketing capture (reviewer)

```bash
bash qa/marketing/capture.sh   # gallery + App Store + walkthrough + optional Lighthouse
```

### Screen gallery

```bash
npm run gallery          # capture + embed manifest
npm run gallery:open     # offline file:// viewer
npm run test:a11y        # baseline accessibility
```

## PSX live prices

Deploy the Cloudflare Worker in `worker/` — see [worker/README.md](worker/README.md). Paste the Workers URL in **Settings → PSX Proxy URL**.

## Documentation

| Resource | Path |
|----------|------|
| User guide | [docs/GUIDE.md](docs/GUIDE.md) |
| Engineering handover | [HANDOVER.md](HANDOVER.md) |
| Changelog | [CHANGELOG.md](CHANGELOG.md) |
| Privacy | [privacy.html](privacy.html) |
| Support | [support.html](support.html) |
| Terms | [terms.html](terms.html) |

## Stack

Vanilla JS PWA · HIG 3.0 tokens · brass accent (`#d4af37` dark / `#806614` light) · localStorage · Cloudflare Worker price proxy

---

Built by Capricorn Systems.
