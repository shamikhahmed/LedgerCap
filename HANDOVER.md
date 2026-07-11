# LedgerCap — Handover

> Read this + `ROADMAP.md` + `~/Capricorn-Brain/01 Projects/LedgerCap.md` before working here.
> Last updated: 2026-07-11 · Fleet-wide standard: `capricorn-tooling/shared/CAP-STANDARD.md`

## What this is
Personal wealth OS — PSX stocks, Meezan funds, portfolio, analyzer, screener.

## Facts
**Version:** 3.55.1
**Live:** https://shamikhahmed.github.io/LedgerCap/
**Repo:** https://github.com/shamikhahmed/LedgerCap
**Stack:** Vanilla JS PWA + Cloudflare Worker price cron (KV market snapshot). Yahoo live quotes. Playwright tests.
**Data:** Local browser storage for portfolio; Cloudflare KV for market snapshot cache.

## Run & verify
```bash
# check package.json scripts — has test suite + ci.yml
npm install
npm test   # or see ci.yml for the real entrypoints
```

## Architecture
- App: vanilla JS modules, bottom-nav shell
- Worker: price cron -> KV full-market snapshot (v3.55.0); Yahoo live unblock path (v3.53.0)
- `tests/` — calc regression + nav clearance guard tests
- `.github/workflows/ci.yml` — CI exists (check what it runs before extending)

## Cap Standard status (2026-07-11)
| Cap Standard item | Status |
|---|---|
| Docs pack | ✅ |
| Screen gallery | ❌ |
| Version discipline | ✅ |
| QA / e2e | ✅ |
| CI gate | ✅ |
| PWA polish | ✅ |
| Demo mode | ✅ |

Gaps are tracked as tasks in `ROADMAP.md`.

## Gotchas — read before coding
- Price data path has fallbacks (live Yahoo -> KV snapshot -> stale) — test all three before touching fetch code.
- 128 commits of rapid v3.4x-v3.5x iteration — read recent CHANGELOG before assuming behavior.

## Where decisions live
- Dated decisions: Capricorn-Brain project note (path above)
- Release history: `CHANGELOG.md`
- Fleet-level events: `Cap-Apps/docs/CHANGELOG.md` (master)
