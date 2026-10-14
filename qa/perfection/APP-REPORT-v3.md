# LedgerCap — APP-REPORT v3

**Version / tag:** 3.58.0 / `v3.58.0`  
**Live URL:** https://shamikhahmed.github.io/LedgerCap/?demo=1  
**App SHA (main):** `7f7d524` (merge; release `e95cec8`)  
**Report date:** 2026-10-14

## Gates (§8.2)

| Gate | Result | Notes |
|---|---|---|
| device-qa local (baseline) | PASS 7/7 soft taps/404 | `qa/perfection/baseline/` |
| device-qa post-fix | PASS 7/7 tap=0 text=0 errors=[] | `qa/perfection/post-fix/` |
| device-qa Auditor | ✅ VERIFIED | `qa/perfection/auditor-independent/` @ `5e19190` |
| device-qa **live** 3.58.0 | **PASS 7/7** tap=0 text=0 errors=[] | `qa/perfection/live-v3.58.0/` |
| Deploy Pages | PASS | run `38558125137` |
| LedgerCap CI (e2e) | FAIL (pre-existing) | `viewport.spec.js` 1280px `.psx-sidebar` hidden — also failed on prior `ce92c06` main; 25 passed / 1 failed |
| SW / G-8 | PASS | live VERSION.json **3.58.0** · SW `ledgercap-v141` · register `sw.js?v=141` |
| Gallery G17 | PARTIAL | existing gallery; full v3 capture later |
| Docs truth | PASS (manual) | README §4.1 · CHANGELOG 3.58.0 · privacy Worker honesty |
| Lighthouse §7.11 | OPEN / L | LDG-V3-5 |
| Urdu/RTL §7.16 | OPEN / L | LDG-V3-6 |

## Lighthouse

Not re-run in Phase I (LDG-V3-5 remains L). Prior stepR: ~P33 locally.

## Device-qa summary (live)

All 7 device/engine cells **ok** on `/?demo=1` after Pages deploy. Zero hard failures, zero tap&lt;32, zero text&lt;11, zero console errors.

## Matrix / gallery

- Matrix: Home demo smoke ✅ (7 devices); full inventory × themes × states ⏳
- Gallery: pre-existing shots; v3 completeness later

## Items closed

| ID | Severity | Status |
|---|---|---|
| LDG-V3-1 | P1 | ✅ VERIFIED |
| LDG-V3-2 | P1 | ✅ VERIFIED |
| LDG-V3-3 | P1 | ✅ VERIFIED |
| LDG-V3-4 | P1 | ✅ VERIFIED (Phase 0 merge) |
| LDG-V3-5 | P2 | L (Lighthouse) |
| LDG-V3-6 | P2 | L (Urdu/RTL) |

## Decisions applied

D-09 Worker-only prices labelled indicative · G-8 3.58.0 / `ledgercap-v141` · G-9 no third-party runtime · own Pages deploy

## Docs updated

README · HANDOVER · CHANGELOG · VERSION.json · privacy (prior) · qa/perfection/*

## Remaining

- LDG-V3-5 Lighthouse → §7.11  
- LDG-V3-6 full Urdu/RTL pass  
- CI: `tests/viewport.spec.js` desktop sidebar visibility (pre-existing red on main)  
- Deploy Worker HTML→200 empty mapping (client already avoids KSE100 404 path)  
- Full MATRIX + gallery v3 completeness  
