# LedgerCap — Roadmap

> Updated 2026-07-11. Fleet order & standard: `capricorn-tooling/shared/CAP-STANDARD.md`.

## Now — v3.55.1
Current shipped state. See `CHANGELOG.md` for how we got here.

## Cap Standard gaps
| Cap Standard item | Status |
|---|---|
| Docs pack | ✅ |
| Screen gallery | ❌ |
| Version discipline | ✅ |
| QA / e2e | ✅ |
| CI gate | ✅ |
| PWA polish | ✅ |
| Demo mode | ✅ |

## Next (ordered)
1. Screen gallery: adapt ScentCap gallery spec to hub/market/portfolio/analyzer/tools screens
2. Align script names to Cap Standard contract (`verify`, `gallery`)
3. Document the Worker: deploy command, KV namespace, cron schedule (currently only in git history)

## Later
- Meezan funds NAV automation hardening
- Dividend calendar

## Ground rules
- No dirty trees: commit or discard before ending a session.
- CI green before tag; tag `vX.Y.Z` per release.
- Bump SW cache with any asset change (PWA apps).
- Never commit `.env` / secrets.
