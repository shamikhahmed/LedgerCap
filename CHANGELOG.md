# Changelog — LedgerCap

## 3.5.1 (2026-06-16)
- Fix return metrics: dashboard and holdings use ledger cost basis, not gross invested.
- Portfolio intel scores clamped 0–100; dividend/growth quality display rounded.
- PSX price chain: when Cloudflare proxy fails (520), fall through to Yahoo and CORS proxies without console spam; skip bad `.KA` symbols after first failure.
- Desktop layout: full-width sidebar + content shell (VaultCap pattern) on ≥900px; mobile stays 430px column.
- Service worker cache `ledgercap-v51`; `scripts/verify-ledger.js` for reconciliation.

## 3.5.0 (2026-06-16)
- Seed v4, `currentCostBasis()`, performance header, home sparkline fix (partial audit — see docs/RECONCILIATION.md).

## 3.4.3 (2026-06-16)
- Complete legacy rebrand to LedgerCap: config (`LEDGERCAP_CONFIG`), PSX proxy worker name, landing logo, docs, backup format (`.ledgercap`).
- Legacy localStorage/session keys and proxy URLs migrate automatically on launch.
- Desktop shell layout fix; Home / Performance / Compare / Transactions navigation wired.
- Service worker cache `ledgercap-v47`; offline cache includes home, performance, comparison modules.

## 3.4.1 (2026-06-15)
- Restore pre–Capricorn identity home-screen icons; service worker cache bump.

## 3.4.0 (2026-06-15)
- Merge Intel into Research: Stock analysis + Portfolio intel modes; Intel tab removed (8 tabs).
- Empty dashboard state with Add holdings and demo portfolio CTAs.
- Legacy `intelligence` / `reports` routes open Portfolio intel inside Research.

## 3.3.0 (2026-06-15) — Product quality pass
- Design token system: typography scale, spacing vars, calm light/dark palette, blue interactive accent
- Dashboard focused on portfolio value, today P&L, passive income, and attention items
- Portfolio, research, and dividend screens simplified; reduced gradients, shadows, and motion
- Service worker cache `ledgercap-v43`

## 3.0.0 (2026-06-10) — LedgerCap 2.0
- Complete product redesign: premium investment OS with 9-section navigation
- New sections: Holdings, Research, Watchlist, Dividends, Portfolio Intelligence, Investment Journal
- Dashboard centerpiece: portfolio value, XIRR, risk score, health, allocations, AI summary
- Analytics engine: XIRR, annual return, sector/broker/asset allocation
- Design system: `ledger-os.css` with light/dark themes
- State v5 migration: watchlist, journal, researchNotes preserved alongside existing `ledgercap_v2` data
- Progressive reveal animations via CapMotion

## 2.4.2 (2026-06-12)
- Phase P4: Playwright tests for Reports tab and CSV export on transactions; service worker cache bump.

## 2.3.0 (2026-06-10)
- Portfolio CTO pass: PWA icons (192/512 maskable), service worker cache bump (`ledgercap-v8`)
- Truth sprint: docs aligned with shipped features
- Holdings seed UI, Zakat docs, pitch expansion

### Phase 2 — Quality (2026-06-10)
- Playwright smoke tests (2/2 pass)
- Pitch expanded: security, competition, tech moat, roadmap, OS family
- Landing footer with privacy/changelog HTML pages
