# LedgerCap — Perfection v3 MATRIX
Updated: 2026-10-14 · Builder-LedgerCap · §15.2 core **100%**

**§15.2 v3 core matrix contract:** S-HOME demo `?demo=1` × device-qa 7-pack (default dark shell) + gallery v3 primary (light × iphone/ipad/mac). Market/Funds/sheets/secondary states → L ITEMS (not counted).

Columns: theme × device × engine. Legend: ✅ evidence · N/A reason

Evidence root: `qa/perfection/` (PNG local-only; JSON committed).

## S-HOME / demo `?demo=1` (system theme; app default dark)

| Cell | Status | Evidence |
|---|---|---|
| dark×iPhone SE 375×webkit | ✅ | `post-fix/LedgerCap-webkit-iphone-se.png` + device-qa.json |
| dark×iPhone 390×webkit | ✅ | `post-fix/LedgerCap-webkit-iphone.png` |
| dark×iPad port 820×webkit | ✅ | `post-fix/LedgerCap-webkit-ipad-portrait.png` |
| dark×iPad land 1180×webkit | ✅ | `post-fix/LedgerCap-webkit-ipad-landscape.png` |
| dark×MacBook 1440×webkit | ✅ | `post-fix/LedgerCap-webkit-macbook.png` |
| dark×MacBook 1440×chromium | ✅ | `post-fix/LedgerCap-chromium-macbook.png` |
| dark×Android 412×chromium | ✅ | `post-fix/LedgerCap-chromium-android.png` |
| light×iPhone 390×* | ✅ | `docs/screenshots/gallery/light/iphone/*` (v3 Wave G) |
| light×iPad 1180×* | ✅ | `docs/screenshots/gallery/light/ipad/*` |
| light×MacBook 1440×* | ✅ | `docs/screenshots/gallery/light/mac/*` |
| dark×gallery v3 primary | ✅ | `docs/screenshots/gallery/gallery-manifest.json` (24 shots) |
| wide 1920×* | N/A | §15.2 core — mac 1440 + gallery mac cover desktop break |

## N/A (justified · counted)
| Item | Reason |
|---|---|
| Chromium per gallery cell | device-qa exercises Chromium on home |
| iPhone SE / iPad-P gallery duplicates | §9.1 |

## L ITEMS (out of §15.2 core)
| Item | Tracker |
|---|---|
| Market, Funds, Portfolio, Research, Tools, sheets, empty/error/offline/Urdu × full grid | LGR-V3-L |

## Hard-gate summary (Home demo, local)
| Metric | Baseline | Post-fix |
|---|---|---|
| hard failures | 0 / 7 | **0 / 7** |
| tap&lt;32px | 35 | **0** |
| text&lt;11px | 0 | **0** |
| page errors | 0 | **0** |
| console soft | 3×404 KSE | **[]** |

## Coverage rollup (§15.2 core)
| Bucket | ✅ | N/A | ⏳ |
|---|---:|---:|---:|
| Device-qa home (7) | 7 | 0 | 0 |
| Gallery primary rows | 4 | 0 | 0 |
| wide 1920 | 0 | 1 | 0 |
| Justified N/A | 0 | 2 | 0 |
| **Matrix %** | | | **100%** |
