# LedgerCap

**Personal Wealth Operating System — by Capricorn Systems.** PSX stocks, Meezan Islamic funds, portfolio tracking, and financial freedom projections.

🔗 **Live:** https://shamikhahmed.github.io/LedgerCap/  
📁 **Repo:** https://github.com/shamikhahmed/LedgerCap

---

## Features

- **Dashboard** — Bloomberg-style net worth, daily P&L, allocation, wealth insights
- **Portfolio** — PSX + Islamic fund holdings (Rafi, AKD, Meezan) with live prices
- **Transactions** — Ledger for buy, sell, contribution, and salary
- **Income** — Salary log, projections, financial freedom target tracker
- **Insights** — Concentration risk, contribution streaks, sector allocation
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
python3 -m http.server 8765
# → http://localhost:8765
```

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
