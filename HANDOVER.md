# LedgerCap — Handover

> Read this + `ROADMAP.md` + `~/Capricorn-Brain/01 Projects/LedgerCap.md` before working here.  
> Last updated: 2026-10-25 · Active branch: `marketing/3.58.11` (post-release marketing + docs)

## What this is
Track your PSX stocks and mutual funds in one place. (Never “wealth OS” / “operating system” — G-3.)

## Facts
**Version:** 3.58.11 / SW `ledgercap-v35811`  
**Live:** https://shamikhahmed.github.io/LedgerCap/  
**Repo:** https://github.com/shamikhahmed/LedgerCap  
**Stack:** Vanilla JS PWA + Cloudflare Worker price proxy (KV market snapshot). Playwright tests. Brass accent HIG shell (`DESIGN.md`).  
**Data:** Local browser storage for portfolio; Worker for indicative market prices (D-09). Prices may be delayed — not investment advice (§4.2).  
**Marketing:** `landing.html` / `pitch.html` / `presentation.html` / `support.html` / `privacy.html` / `terms.html` + `site/site.css`. Capture: `bash qa/marketing/capture.sh`.

## Run & verify
```bash
python3 -m http.server 8850   # or 8769 (playwright default)
npm test                      # unit + version-coherence + playwright
npm run ios:check             # WebKit; or LC_IOS_BROWSER=chromium …
npm run bundle                # after editing js/modules or js/data — commits bundled JS
bash qa/marketing/capture.sh  # reviewer: gallery + App Store + walkthrough (outside sandbox)
```

Prod-ready report: `qa/prod-ready/REPORT.md`. Inventory: `qa/prod-ready/INVENTORY.md`.

## Architecture
- App: vanilla JS modules → `ledgercap.bundle.js` (cold) + `ledgercap.deferred.js` (non-Home)
- HIG: `css/design/tokens.css` + `system.css` + `ledgercap.css`; legacy under `@layer legacy` via `css/app.css`
- Worker: `ledgercap-psx-proxy.shamikhahmed.workers.dev`
- Optional Telegram; TradingView frames (CSP allowlist)
- Hub shots: `shots/{dark,light}/{iphone,ipad,mac}/<group>-<screen>-demo.webp`

## Gotchas
- “0 servers” is false — price Worker is required for live/indicative quotes.
- Bump `VERSION.json`, `js/data/config.js`, `sw.js` CACHE, `manifest.json`, index `?v=`, then `npm run bundle` together.
- Header ⋯ opens **More** hub (not Settings directly).
- Support: fleet page + GitHub Issues only — no personal email (G-4).

## Where decisions live
- Binding: Cap-Apps `docs/audit-2026-09-14/DECISIONS.md` (D-09, §4.1, §4.2, G-3, G-4)
- Changelog: `CHANGELOG.md`
- Design: `DESIGN.md`
