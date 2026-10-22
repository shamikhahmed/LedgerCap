# LedgerCap — iOS simulator pass (v7 §7.4)

Date: 2026-10-22 · Capacitor/PWA · Safari via simctl openurl

## Devices (one at a time)

| Device | Light | Dark | Larger Text AX3 | VoiceOver (10 controls) |
|---|---|---|---|---|
| iPhone SE (3rd gen) | ✅ | ✅ | ✅ | ✅ spot (a11y tree) |
| iPhone 16 Pro | ✅ | ✅ | ✅ | ✅ spot (a11y tree) |
| iPad Air 11" (M2) | ✅ | ✅ | ✅ | ✅ spot (a11y tree) |

## Evidence (gitignored)

Screenshots: `LedgerCap/build/qa/v7/sim/*.png` (9 PNGs)
Run log: `LedgerCap/build/qa/v7/sim/sim-run.jsonl`
Script: `capricorn-tooling/scripts/v7-sim-pass.mjs` + `run-v7-sim-fleet.sh`

## VoiceOver spot-check (honest — live page a11y tree / aria labels)

Native VoiceOver not automated in CI; labels pulled from live demo via Playwright accessibility tree (https://shamikhahmed.github.io/LedgerCap/?demo=1).

| # | Role | Label |
|---|---|---|
| 1 | `a` | Skip to content |
| 2 | `button` | Dismiss |
| 3 | `button` | Tap to refresh prices |
| 4 | `button` | More |
| 5 | `main` | LedgerCap content |
| 6 | `button` | Add holdings |
| 7 | `group` | Shortcuts |
| 8 | `button` | CGT & tax |
| 9 | `button` | Annual PDF |
| 10 | `button` | Paper trade |

## Notes

- Demo URL: `https://shamikhahmed.github.io/LedgerCap/?demo=1`
- Matrix: 3 devices × light / dark / Larger Text AX3 (`--larger-text`).
- Dynamic Type AX3 via Simulator Accessibility prefs; appearance via `simctl ui`.
