# LedgerCap — Handover

> Read this + `ROADMAP.md` + `~/Capricorn-Brain/01 Projects/LedgerCap.md` before working here.  
> Last updated: 2026-10-14 · Fleet: `capricorn-tooling/docs/perfection-2026-10/CURSOR-PERFECTION-LOOP.md`

## What this is
Track your PSX stocks and mutual funds in one place. (Never “wealth OS” / “operating system” — G-3.)

## Facts
**Version:** 3.58.4 / SW `ledgercap-v145`  
**Live:** https://shamikhahmed.github.io/LedgerCap/  
**Repo:** https://github.com/shamikhahmed/LedgerCap  
**Branch (active):** `perfection/ledgercap-v3`  
**Stack:** Vanilla JS PWA + Cloudflare Worker price proxy (KV market snapshot). Playwright tests.  
**Data:** Local browser storage for portfolio; Worker for indicative market prices (D-09). Prices may be delayed — not investment advice (§4.2).

## Run & verify
```bash
npm install
npm test
npm run verify   # if present — see package.json / ci.yml
# Device QA (fleet):
# PW_CORE=…/MasteryCap/node_modules/playwright-core \
# PLAYWRIGHT_BROWSERS_PATH=$HOME/Library/Caches/ms-playwright \
# node ../capricorn-tooling/scripts/device-qa.mjs qa/perfection/check \
#   --apps=LedgerCap --url=LedgerCap=http://127.0.0.1:8769/LedgerCap/
```

Perfection state: `qa/perfection/STATE.md`.

## Architecture
- App: vanilla JS modules, bottom-nav shell
- Worker: `ledgercap-psx-proxy.shamikhahmed.workers.dev` — PSX / Yahoo / crypto / FX / news / snapshot (client never hits Yahoo/PSX directly)
- Optional Telegram alerts if the user configures a bot token (stays client-side until send)
- TradingView chart frames where allowed by CSP

## Gotchas
- “0 servers” is false — price Worker is required for live/indicative quotes.
- LDG-V3-5 Lighthouse and LDG-V3-6 Urdu are Later (L), not blocking Auditor on V3-1/2/3.

## Where decisions live
- Binding: `capricorn-tooling/docs/audit-2026-09-14/DECISIONS.md` (D-09, §4.1, §4.2)
- Perfection items: `qa/perfection/ITEMS.md`
- Changelog: `CHANGELOG.md`
