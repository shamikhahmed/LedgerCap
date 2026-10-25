# Hub media sync — LedgerCap 3.58.11

Copy these files into `shamikhahmed.github.io/apps/ledgercap/` (hub). Paths below are **source → hub destination**.

## Gallery webps (150)

Copy the entire tree (same relative paths):

| Source (this repo) | Hub path |
| --- | --- |
| `shots/{dark,light}/{iphone,ipad,mac}/*.webp` | `apps/ledgercap/shots/{dark,light}/{iphone,ipad,mac}/*.webp` |

Hub shot names (single hyphen), e.g. `wealth-home-demo.webp`, `markets-market-demo.webp`, `research-paper-trading-demo.webp`, `wealth-add-sheet-demo.webp`.

## App Store PNGs (16) — Connect upload / archive

| Source | Notes |
| --- | --- |
| `qa/marketing/appstore/iphone-6.9-{light,dark}-0{1..5}-*.png` | 1320×2868 |
| `qa/marketing/appstore/ipad-13-{light,dark}-0{1..3}-*.png` | 2064×2752 |

Not required on the hub HTML page; keep for App Store Connect.

## Walkthrough (marketing site + optional hub)

| Source | Hub / Pages path |
| --- | --- |
| `site/walkthrough.mp4` | `apps/ledgercap/walkthrough.mp4` (or leave on app Pages `LedgerCap/site/`) |
| `site/walkthrough-poster.webp` | same basename beside the mp4 |
| `site/walkthrough-poster.jpg` | optional JPEG poster |
| `site/walkthrough.vtt` | captions beside the mp4 |

Landing wires: `<video preload="none" poster="site/walkthrough-poster.webp">` + VTT track.

## Site hero seeds (app Pages `LedgerCap/site/`)

Already updated in-repo from dark iPhone / iPad captures:

- `site/wealth-home-demo.webp`
- `site/wealth-portfolio-demo.webp`
- `site/markets-market-demo.webp`
- `site/markets-funds-demo.webp`
- `site/research-research-demo.webp`
- `site/ipad-home.webp`

## Screen gallery (app repo)

Mirrored for `screen-gallery.html`:

- `docs/screenshots/gallery/{dark,light}/{iphone,ipad,mac}/*--*--demo.webp` (double-dash names)
- `docs/screenshots/gallery/gallery-manifest.json` (+ `assets/screenshots/gallery-manifest.json`)

## Lighthouse note (landing)

Captured scores: performance **84**, accessibility **95**, best-practices **100**, SEO **100**. Perf drag was mainly TBT on the local capture host; a11y link-color fixed in Phase B (`site/site.css` underlines). Re-run Lighthouse outside the sandbox after Pages deploy if a ≥95 perf gate is required.
