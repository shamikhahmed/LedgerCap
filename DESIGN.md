# LedgerCap — Design system

Sober, Apple HIG-aligned, ported from the ScentCap 3.0 system (`ScentCap/src/design/system.css`, `DESIGN.md`) via VaultCap.
Content first; chrome stays quiet. LedgerCap keeps its own accent: **bahi-khata brass**.

Source of truth:

| File | Role | Loading |
|---|---|---|
| `css/design/tokens.css` | Semantic tokens (light / dark / increased contrast) + legacy bridge | render-blocking, unlayered |
| `css/design/system.css` | `ui-*` primitives (ScentCap port) | `@layer components` via `css/app.css` |
| `css/design/ledgercap.css` | Reskin of 3.x shell + shared classes (`.psx-*`, `.lc-*`, `.os-*`, settings, sheet) | `@layer components` |
| `css/app.css` | Cascade orchestrator: 3.x CSS demoted to `@layer legacy` (files preloaded in `index.html`) | render-blocking |

## Principles

1. **Content first.** Numbers and names carry the screen; surfaces are grey/white (light) or black/graphite (dark).
2. **One accent.** Gold (`--tint`) marks the single primary action per screen, selection and links. Never decorative.
3. **System type.** SF (`--font-ui`) at 17pt body; SF Rounded (`--font-rounded`) only for hero amounts. Tabular figures for money.
4. **Native patterns.** Large titles on top-level screens, inset-grouped lists for settings and records, segmented controls,
   sheets with grabber + Cancel / Title / Done, floating glass tab bar (phone) / glass sidebar (≥700px).
5. **Accessible by default.** 44pt targets, AA contrast in light / dark / increased contrast, reduced motion + transparency honoured,
   colour never the only signal, every icon button has `aria-label`.

## Accent

| Appearance | `--tint` | Contrast |
|---|---|---|
| Dark (default) | `#d4af37` brass, `--on-tint: #000` | 8.1:1 on `#1c1c1e`; 10:1 black on brass |
| Light | `#806614` deep brass, `--on-tint: #fff` | 5.5:1 on white, 4.9:1 on `#f2f2f7` |
| Increased contrast | `#6a5410` light / `#e2c15a` dark | — |

Theme is `data-theme` on `<html>` and `<body>` (`js/theme-boot.js`, `App.applyTheme`).

## Tokens

Same names as ScentCap: `--bg`, `--surface(-2|-elevated)`, `--fill(-2)`, `--separator`, `--label(-2|-3|-4)`,
`--tint(-hover|-soft)`, `--on-tint`, `--success/--warning/--danger`, `--t-large … --t-caption2`, `--r-sm/md/lg/xl`,
`--shadow-1/2/3`, `--ease`, `--hit`, `--gutter`, `--tabbar-h`. The glass material is `--glass-material`
(`--glass` is a legacy name, bridged to `--surface`).

**Do not** use hex values or legacy tokens (`--psx-*`, `--lc-brass/maroon/folio`, `--lc-<hex>`, `--text*`) in new code.
They are bridged in `tokens.css` so 3.x screens inherit the palette, and will be removed once every screen is migrated.

## Primitives (`ui-*`)

Identical to ScentCap minus the bottle-specific classes (`ui-plinth`, `ui-bottle*`, `ui-grid`, `ui-tabbar`, `ui-sidebar`):
`ui-page`, `ui-header`, `ui-eyebrow`, `ui-largetitle`, `ui-section(-head|-title|-link)`, `ui-card(--lg)`, `ui-list`,
`ui-row(--media|--icon)`, `ui-row__main/__title/__sub/__value/__icon`, `ui-chevron`, `ui-list-header/-footer`,
`ui-btn` + `--primary/--secondary/--gray/--plain/--danger/--sm/--block`, `ui-icon-btn(--tint)`, `ui-chip`, `ui-tag(--tint)`,
`ui-segmented`, `ui-search`, `ui-field(--left)`, `ui-switch`, `ui-widgets`, `ui-widget(__label|__value|__unit)`, `ui-meter`,
`ui-scroller`, `ui-skeleton`, `ui-rise`, `ui-sheet*`, plus `.num` (tabular figures).

## Kit

LedgerCap renders through `MarketUI` / `PsxUI` helpers (`js/ui/market-ui.js`, `js/ui/psx-ui.js`); new markup should use the
`ui-*` classes above. `PsxUI.pageTitle` → large title, `.lc-dash-section` → section, `.lc-*-card` → grouped surfaces.

## Shell

- Phone (<700px): floating glass tab bar — Home · Watchlist · Funds · Portfolio · Research. The document scrolls (no inner
  `.psx-screen` scrollers); a new screen opens at the top.
- ≥700px: sticky glass sidebar (`js/lc-desktop-nav.js` toggles `body.lc-desktop-nav` at 700px, was 900px).
- Sheets (`App.openBottomSheet`): grabber on phone, centred card ≥700px, Cancel / Title / Done bar. A single trailing
  `.btn-primary` in the body is promoted to the bar (one-word label, full label kept as `aria-label`). The page is pinned
  under the sheet and restored exactly on close.
- iPhone: every `data-action` / `data-nav` element gets its own click listener (WebKit touch adjustment otherwise sends taps
  to a nearby button); a `data-action` inside a `data-nav` card wins. Check with `npm run ios:check`.

## Copy

Plain, warm, short. Sentence case. No exclamation marks. Fictional data is always labelled ("Sample · Fictional data only").
