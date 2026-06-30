# LedgerCap — Monetization Plan

## Model: Freemium → Pro ($3.99/mo or $29.99/yr)

### Why someone pays
Pakistani investors with PSX portfolios are underserved — no mobile-native terminal tracks stocks, Meezan NAVs, Zakat, and net worth in one place. A user managing ₨500K+ in stocks will pay $3.99/mo without hesitation. PSX live feed + Meezan fund tracking is the core unlock.

### Revenue logic
- Target: 400 MAU at 10% Pro conversion = 40 × $3.99 = **$159/mo**
- Annual plan ($29.99/yr) projected 45% uptake — Pakistani users prefer commitment pricing
- Diaspora segment (US/UK/CA investors in PSX) likely highest conversion

---

## Free vs Pro

| Feature | Free | Pro |
|---------|------|-----|
| Holdings tracked | Up to 10 | ✅ Unlimited |
| PKR net worth | ✅ Basic | ✅ Full |
| Zakat calculator | ✅ | ✅ |
| Offline PWA | ✅ | ✅ |
| PSX live price feed | ❌ | ✅ |
| Meezan fund positions & NAV | ❌ | ✅ |
| IPO tracker | ❌ | ✅ |
| Transaction history | ❌ | ✅ Unlimited |
| Income tracker (salary, freelance) | ❌ | ✅ |
| Signals & screener | ❌ | ✅ |
| Performance analytics | ❌ | ✅ |
| Journal (trade notes) | ❌ | ✅ |
| Multi-language UI (Urdu/Roman Urdu) | ✅ | ✅ |

---

## Implementation gates
- `window.LedgerPro.isPro()` — reads `localStorage.getItem('lc_pro_active') === '1'`
- Demo mode: `isPro() = true` (all features shown)
- Gates at: 11th holding add, Meezan tab, signals/screener, transaction history export
- Gate copy: "Live PSX requires Pro →" + `openProUpgrade()`

## Note on PSX proxy
- `ledgercap-psx-proxy.shamikhahmed.workers.dev` / `stunds-psx-proxy` — Cloudflare Workers
- 520 errors = origin (dps.psx.com.pk) returning non-200; not a LedgerCap bug
- Demo mode bypasses live feed — demo users see cached sample prices

## Payment path (current)
- Waitlist via `openProUpgrade()` modal in-app
- Next: Stripe Checkout (web PWA) or RevenueCat (Capacitor build)

---

*Last updated: 2026-06-28*
