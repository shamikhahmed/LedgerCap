# Fable Audit Report — v3.44.0

**Audited:** 2026-07-02 · **Baseline:** v3.43.0 (4424a1e) · **Shipped:** v3.44.0 / SW `ledgercap-v111`
**Method:** 4 parallel deep audits (250-point checklist re-score · screenshot screen-walk · security/reliability · hub + UX product review), then fix loop. All Critical/High/Medium findings fixed same-day; gates green.

## Executive summary

v3.43 baseline was already strong (214/250 pass, 0 critical UI fails, all tests green). The audit surfaced **3 High-severity security/reliability defects** (XSS via unescaped `innerHTML`, offline shell broken by cache-key mismatch, weak PIN hashing), **1 investor-blocking privacy leak** (personal account numbers rendered in UI), and **1 embarrassing i18n defect** (corrupted Urdu strings). All fixed in v3.44.0.

## Fixed in v3.44.0

| # | Severity | Finding | Fix |
|---|----------|---------|-----|
| 1 | High | XSS: news/announcement/CSV strings interpolated raw into `innerHTML`; `javascript:` URLs possible in news links (hub.js, intelligence.js, announcements.js, research.js, transactions.js) | Global `esc()`/`escUrl()` in config.js; applied at every external-string interpolation; CSV import sanitizes symbol/broker at boundary (import.js) |
| 2 | High | Offline broken on first load: SW precached unversioned URLs but page requests `?v=…` — `caches.match` missed | `ignoreSearch: true` on match; per-asset precache via `Promise.allSettled` (sw.js) |
| 3 | High | PIN = single SHA-256 of `salt:pin` — 4–6 digit space brute-forced <1s from a copied hash | PBKDF2-SHA256 310k iterations (`v2:` prefix), legacy hashes verify-and-upgrade, escalating lockout 30s→30min (pin-vault.js) |
| 4 | High (UX) | Settings unreachable on mobile (5 tabs, sidebar hidden, no hub tile) | Settings tile added to hub tools grid (19 tools) |
| 5 | High (privacy) | Personal account numbers hardcoded in bucket labels (Rafi 6773, AKD COAF55870, Meezan 733102-1) | Removed from all UI labels (portfolio-buckets-service.js) |
| 6 | High (i18n) | Urdu locale mojibake (`پورٹ فولiyo`, `لیجرکیп` w/ Cyrillic, `اسٹاک وach`); 12 ur + 4 roman keys missing | Full ur-locale repair + translations; roman gaps filled; tool count label corrected (was "16"/"9" for 19 tiles) |
| 7 | Medium | Intraday PSX batch quotes merged with no sanity check (10× bad quote flows to portfolio); intl/crypto unchecked | `_sanityCheck` in `fetchPsxLive`; `_sanityCheckUsd` for intl/crypto (prices.js) |
| 8 | Medium | `gnewsApiKey` shipped plaintext in every backup export | Stripped in `stripSensitiveSettings` (secrets-vault.js) |
| 9 | Medium | Telegram worker routes (bot-token-bearing) had `Access-Control-Allow-Origin: *` | Origin allowlist reflection (worker/src/telegram.js) |
| 10 | Medium | SSE `sessionOpen` computed once at connect — pre-market never went live, post-close ticked forever | Re-evaluated per tick (worker/src/sse-prices.js) |
| 11 | Medium | Refresh button no busy state — concurrent fetches on double-tap | `_refreshBusy` guard + `aria-busy`/disabled (app.js) |
| 12 | Medium (a11y) | PIN dots no ARIA; bottom sheet no dialog semantics | `role=progressbar` + `aria-valuenow`; `role=dialog aria-modal aria-labelledby` |
| 13 | Low | Transaction ledger + empty states still emoji (LC-UI-001/007); 4 nav tools shared fallback icon | TYPE_META → LcIcons keys; 8 new SVG paths; distinct icons for market/portfolio/funds/research/screener/dividends/watchlist/performance |
| 14 | Low | Hub greeting showed dev version string; day-1 net-worth chart silently absent | Greeting copy fixed; day-1 stub explains "trend starts tomorrow" |
| 15 | Low | Nav labels no overflow guard (Urdu clip risk); no explicit 44px+ target | Ellipsis + `min-height: 48px` (psx-app.css); RTL line-height 1.75 + table/sheet RTL coverage |
| 16 | Low | `presentation.html` footer said v3.42.0 | Synced (only version-sync defect found) |
| 17 | Low | Legacy holdings screen column titled "AI" (rule-based engine — no-fake-AI rule) | Renamed "Rating" |
| 18 | Low | CSP missing `base-uri`/`form-action` | Added both `'self'` |

## Deferred (documented, not blocking)

- `script-src 'unsafe-inline'` — required by `onclick=` architecture; migration to `addEventListener` is a structural project.
- Worker rate limiting — recommend Cloudflare WAF rate rule (dashboard config, not code).
- Third-party CORS proxies (`allorigins`, `corsproxy.io`) in fallback chain can read Yahoo quote traffic — used only when own worker fails.
- SecretsVault master key stored plaintext in localStorage (obfuscation, not encryption at rest) — future: derive from PIN.
- Android TWA (LC-UI-003), `prefers-contrast`, orientation media queries, App Store screenshot pipeline — unchanged ⚠️ backlog.

## Gates at ship

- Unit: telegram-format 20 · signals 12 · pin-vault 17 (+2 new KDF tests) · charts 6 · market-data-global 4 — **0 failed**
- Playwright: ledger + smoke + viewport + a11y — **24 passed**
- Bundle: 85 files, 760 KB · SW `ledgercap-v111`
- Live preview: zero console errors; hub, Urdu locale, 19-tool grid, esc() verified in-browser

## 250-point checklist delta (v3.42 → v3.44)

- Fixed: 2.12, 2.24, 9.25, 6.25 (v3.43 work) + 4.22, 7.12, 7.9 partial, 1.18, 1.19, 3.16, 4.21 (this sprint)
- LC-UI issues: **001 ✅ 002 ✅ 004 ✅ 005 ✅ 006 ✅ 007 ✅ 009 ✅ (mitigated: short ur strings + ellipsis guard)** · 003 open (TWA) · 008 accepted (presentation storytelling) · 010 open (pitch emoji, marketing)

## Competitor verdict

| Capability | LedgerCap | Sarmaaya | PSX Analyzer | Investify |
|---|---|---|---|---|
| Portfolio + multi-broker P&L | ✅ local-first, 3 brokers + funds + US/crypto | ✅ account | ✗ | ✅ account |
| CGT / tax tools | ✅ filer-aware | ✅ | ✗ | ✗ |
| KSE-100 benchmark | ✅ | ✅ | ✗ | ✗ |
| Commodities (PKR/gram) | ✅ | ✅ | ✗ | ✗ |
| Announcements/corp actions | ✅ | ✅ | partial | partial |
| Live prices + SSE stream | ✅ session-aware | ✗ delayed | ✗ | ✅ |
| Depth (bid/offer) | ✅ Research panel | ✗ | ✗ | ✅ |
| Islamic/Shariah filter | ✅ + Zakat calc | partial | ✗ | ✅ |
| Urdu / Roman Urdu | ✅ (repaired this release) | ✗ | ✗ | ✗ |
| Telegram briefings | ✅ cron + dedupe | ✗ | ✗ | ✗ |
| Privacy (no account, on-device) | ✅ | ✗ | ✗ | ✗ |
| Offline PWA | ✅ (fixed this release) | ✗ | ✗ | ✗ |

Differentiators none of the three have: local-first privacy, Telegram automation, Zakat, tri-lingual UI, offline. Gaps vs them: none functional; paper trading and full order-book ladder remain documented out-of-scope.
