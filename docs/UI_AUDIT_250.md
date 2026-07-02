# LedgerCap UI Audit — 250-Point Checklist

**Version:** 3.42.0 · **Audited:** 2026-07-02  
**Legend:** ✅ Pass · ⚠️ Partial · ❌ Fail

## Summary

| Category | Pass | Partial | Fail |
|----------|------|---------|------|
| Navigation & IA | 22 | 3 | 0 |
| Visual design & brand | 23 | 2 | 0 |
| Typography | 20 | 5 | 0 |
| Icons & imagery | 21 | 3 | 1 |
| Layout & responsiveness | 23 | 2 | 0 |
| Forms & modals | 23 | 2 | 0 |
| Accessibility | 19 | 5 | 1 |
| Motion & feedback | 20 | 5 | 0 |
| Gallery & marketing | 23 | 2 | 0 |
| PWA & platform | 20 | 4 | 1 |
| **Total** | **214** | **33** | **3** |

**Score: 214/250 pass (86%) · 247/250 pass-or-partial (99%)**

**Sprint baseline (v3.42.0):** `icons.js`, `brand-mark.css`, shell emoji purge, `screen-gallery.html`, pitch footer mark fixes. **0 Critical/High Fail items open.**

---

## 1. Navigation & IA (25)

| # | Check | Status |
|---|-------|--------|
| 1.1 | Bottom tabs ≤5 primary destinations | ✅ |
| 1.2 | Tab labels concise (Hub · Watch · Funds · P&L · Analyze) | ✅ |
| 1.3 | Active tab visually distinct | ✅ |
| 1.4 | Desktop sidebar mirrors bottom tabs | ✅ |
| 1.5 | Sidebar tool group labeled without emoji | ✅ |
| 1.6 | Monochrome nav icons consistent stroke weight | ✅ |
| 1.7 | Sidebar tools cover all hash-routable modules | ✅ |
| 1.8 | Hash deep links (`#portfolio`, `#zakat`, etc.) | ✅ |
| 1.9 | `popstate` restores tab on back/forward | ✅ |
| 1.10 | Settings reachable from sidebar tools | ✅ |
| 1.11 | More index lists overflow modules | ✅ |
| 1.12 | Legacy hash aliases (`#holdings` → portfolio) | ✅ |
| 1.13 | Currency toggle (PKR/USD) in topbar | ✅ |
| 1.14 | Fullscreen terminal toggle discoverable | ✅ |
| 1.15 | Lock PIN ≤2 taps from Settings | ✅ |
| 1.16 | Nav rebuilds on language change | ✅ |
| 1.17 | No duplicate nav entries | ✅ |
| 1.18 | i18n strings don't clip bottom nav labels (390px) | ⚠️ |
| 1.19 | i18n sidebar tool labels don't clip (Urdu/Roman) | ⚠️ |
| 1.20 | RTL (`ur`) sidebar + tab order usable | ⚠️ |
| 1.21 | Skip link to `#screens` | ✅ |
| 1.22 | `aria-label` on bottom nav buttons | ✅ |
| 1.23 | `role=main` on screen container | ✅ |
| 1.24 | Cmd+K command palette (desktop ≥900px) | ✅ |
| 1.25 | Screen kicker / title on module pages | ✅ |

## 2. Visual design & brand (25)

| # | Check | Status |
|---|-------|--------|
| 2.1 | Dark theme (`data-theme=dark`) palette cohesive | ✅ |
| 2.2 | Light theme palette cohesive | ✅ |
| 2.3 | Accent used sparingly for CTAs | ✅ |
| 2.4 | Card surfaces consistent (`--psx-bg-card`) | ✅ |
| 2.5 | Border tokens consistent | ✅ |
| 2.6 | Card radius consistent (10–18px) | ✅ |
| 2.7 | Demo banner premium (dot + text, no clown emoji) | ✅ |
| 2.8 | Demo banner readable in light/dark | ✅ |
| 2.9 | Wealth hub hero readable in dark theme | ✅ |
| 2.10 | Wealth hub hero readable in light theme | ✅ |
| 2.11 | Splash uses `icon-mark.svg` | ✅ |
| 2.12 | PIN vault screen brand mark | ⚠️ |
| 2.13 | Onboarding welcome uses LcIcons (not emoji) | ✅ |
| 2.14 | Settings chrome consistent | ✅ |
| 2.15 | Empty states styled (`empty-state` / `MarketUI.emptyState`) | ✅ |
| 2.16 | Gain/loss color semantic (green/red) | ✅ |
| 2.17 | Hub tool grid tone badges (gold/blue/green/violet) | ✅ |
| 2.18 | Chip filters readable both themes | ✅ |
| 2.19 | Portfolio P&L hero value hierarchy | ✅ |
| 2.20 | No harsh pure-white flashes in dark | ✅ |
| 2.21 | Light mode warm neutrals (`lc-pro.css`) | ✅ |
| 2.22 | `landing.html` matches product typography | ✅ |
| 2.23 | `pitch.html` footer CTAs use `icon-mark.svg` | ✅ |
| 2.24 | `widget-glance.html` matches app mark | ⚠️ |
| 2.25 | Topbar LedgerCap wordmark consistent | ✅ |

## 3. Typography (25)

| # | Check | Status |
|---|-------|--------|
| 3.1 | System font stack with fallbacks (`lc-pro.css`) | ✅ |
| 3.2 | Large title on module pages (`lc-screen-head h1`) | ✅ |
| 3.3 | Kicker / uppercase tracked labels | ✅ |
| 3.4 | Body 15px minimum on inputs | ✅ |
| 3.5 | Meta text ≥11px | ✅ |
| 3.6 | Line-height readable on dense tables | ✅ |
| 3.7 | Letter-spacing on headlines | ✅ |
| 3.8 | Tabular nums on prices (`font-variant-numeric`) | ✅ |
| 3.9 | No emoji in page titles (shell chrome) | ✅ |
| 3.10 | Wealth hub greet / hero hierarchy | ✅ |
| 3.11 | Modal titles sized correctly | ✅ |
| 3.12 | Settings `sec-head` section titles | ✅ |
| 3.13 | Onboarding titles scaled | ✅ |
| 3.14 | Truncation on long symbol names | ✅ |
| 3.15 | Bottom tab labels don't wrap awkwardly (en) | ✅ |
| 3.16 | Urdu Nastaliq line-height in nav | ⚠️ |
| 3.17 | Roman Urdu mixed-script labels | ⚠️ |
| 3.18 | High contrast / `prefers-contrast` tokens | ⚠️ |
| 3.19 | PKR / USD number formatting consistent | ✅ |
| 3.20 | Currency display aligned in tables | ✅ |
| 3.21 | Section headers in sector cards | ✅ |
| 3.22 | Inset grouped list style (settings) | ✅ |
| 3.23 | Label/input pairing in forms | ✅ |
| 3.24 | Placeholder contrast WCAG (light theme) | ⚠️ |
| 3.25 | Link styles distinguishable in prose | ⚠️ |

## 4. Icons & imagery (25)

| # | Check | Status |
|---|-------|--------|
| 4.1 | LcIcons system (`js/ui/icons.js` stroke SVG) | ✅ |
| 4.2 | Bottom nav icons monochrome SVG | ✅ |
| 4.3 | Sidebar primary icons monochrome | ✅ |
| 4.4 | Sidebar tool icons via `LcIcons.toolIcon` | ✅ |
| 4.5 | Topbar theme toggle (moon/sun SVG) | ✅ |
| 4.6 | Topbar fullscreen icon (SVG) | ✅ |
| 4.7 | Demo dismiss icon (SVG) | ✅ |
| 4.8 | Hub tool grid icons via LcIcons | ✅ |
| 4.9 | Module registry icon keys in `TOOL_ICONS` | ✅ |
| 4.10 | PWA `icon.svg` squircle mark | ✅ |
| 4.11 | PNG icons 192/512/1024 generated | ✅ |
| 4.12 | iOS `AppIcon.appiconset` generated | ✅ |
| 4.13 | `apple-touch-icon` linked | ✅ |
| 4.14 | favicon SVG + PNG | ✅ |
| 4.15 | `icon-mark.svg` product mark asset | ✅ |
| 4.16 | Price-health dismiss icon | ✅ |
| 4.17 | Onboarding feature list icons | ✅ |
| 4.18 | Shell emoji purged (nav, settings headers, chrome) | ✅ |
| 4.19 | Marketing pitch hero still uses emoji accents | ⚠️ |
| 4.20 | `presentation.html` slide card emojis (content) | ⚠️ |
| 4.21 | Module empty-state emojis (insights, risk, compare…) | ⚠️ |
| 4.22 | Transaction ledger type icons still emoji | ❌ |
| 4.23 | Telegram brief format emojis (out-of-app) | ✅ |
| 4.24 | Icon size tokens (14/18/20/36) | ✅ |
| 4.25 | Missing icon fallback (`lc-icon--missing`) | ✅ |

## 5. Layout & responsiveness (25)

| # | Check | Status |
|---|-------|--------|
| 5.1 | Mobile 390px usable | ✅ |
| 5.2 | Desktop 1280px sidebar layout | ✅ |
| 5.3 | Bottom tabs hidden ≥769px | ✅ |
| 5.4 | Sidebar hidden ≤768px | ✅ |
| 5.5 | Safe area insets (`viewport-fit=cover`) | ✅ |
| 5.6 | Demo banner offsets app shell | ✅ |
| 5.7 | Price-health bar doesn't obscure nav | ✅ |
| 5.8 | Modal / sheet max-height scroll | ✅ |
| 5.9 | Settings long page scroll | ✅ |
| 5.10 | Hub tool grid 2-col mobile | ✅ |
| 5.11 | Desktop max-width content shell | ✅ |
| 5.12 | Landscape lock screen usable | ⚠️ |
| 5.13 | Global markets table overflow on 390px | ✅ |
| 5.14 | PSX market table horizontal scroll | ✅ |
| 5.15 | Gallery mobile aspect 9:19.5 | ✅ |
| 5.16 | Gallery desktop aspect 16:10 | ✅ |
| 5.17 | Gallery strict viewport (no loose fallback) | ✅ |
| 5.18 | Lightbox responsive | ✅ |
| 5.19 | Compare mode side-by-side dark/light | ✅ |
| 5.20 | Missing shot placeholder pill | ✅ |
| 5.21 | Portfolio holdings table overflow | ✅ |
| 5.22 | Research mode tabs fit mobile | ✅ |
| 5.23 | Bottom tab spacer / safe-area padding | ✅ |
| 5.24 | Collapsed sidebar N/A (icon-only future) | ⚠️ |
| 5.25 | Ticker strip horizontal scroll | ✅ |

## 6. Forms & modals (25)

| # | Check | Status |
|---|-------|--------|
| 6.1 | Modal overlay dismiss | ✅ |
| 6.2 | Bottom sheet handle on mobile | ✅ |
| 6.3 | Form fields 44px touch target | ✅ |
| 6.4 | Primary action right/bottom | ✅ |
| 6.5 | Cancel / destructive clear | ✅ |
| 6.6 | Input focus ring visible | ✅ |
| 6.7 | Select styling dark/light | ✅ |
| 6.8 | Date inputs `color-scheme` | ✅ |
| 6.9 | Zakat calculator form label contrast | ✅ |
| 6.10 | Zakat calculator input contrast (light mode) | ✅ |
| 6.11 | Zakat debts/gold/USD fields usable | ✅ |
| 6.12 | Add-transaction sheet | ✅ |
| 6.13 | Add-portfolio sheet | ✅ |
| 6.14 | PIN keypad layout | ✅ |
| 6.15 | PIN enable flow in Settings | ✅ |
| 6.16 | Import CSV file picker | ✅ |
| 6.17 | Modal titles no shell emoji | ✅ |
| 6.18 | Long settings forms scroll | ✅ |
| 6.19 | Price alert form | ✅ |
| 6.20 | Watchlist add form | ✅ |
| 6.21 | Journal new entry form | ✅ |
| 6.22 | Pro upgrade sheet | ⚠️ |
| 6.23 | Theme picker live preview | ✅ |
| 6.24 | Language switcher in Settings | ✅ |
| 6.25 | Telegram token field (masked) | ⚠️ |

## 7. Accessibility (25)

| # | Check | Status |
|---|-------|--------|
| 7.1 | Skip to content link | ✅ |
| 7.2 | `aria-live` toasts | ✅ |
| 7.3 | `aria-label` on icon buttons | ⚠️ |
| 7.4 | `role=tablist` on chart range picker | ✅ |
| 7.5 | `aria-selected` on range tabs | ✅ |
| 7.6 | Focus visible styles (`focus-visible`) | ✅ |
| 7.7 | `color-scheme` meta | ✅ |
| 7.8 | Reduced motion respect | ✅ |
| 7.9 | Screen reader modal titles | ⚠️ |
| 7.10 | Keyboard nav command palette | ✅ |
| 7.11 | Escape closes overlays | ✅ |
| 7.12 | PIN dots accessible name | ❌ |
| 7.13 | Form labels associated (`lc-field-label`) | ✅ |
| 7.14 | Error messages `role=alert` (PIN) | ✅ |
| 7.15 | Contrast dark text on bg | ✅ |
| 7.16 | Contrast light text on bg | ⚠️ |
| 7.17 | Touch targets 44px | ✅ |
| 7.18 | Gain/loss not color-only (sign + label) | ✅ |
| 7.19 | Decorative marks `aria-hidden` | ✅ |
| 7.20 | `lang` + `dir` on `<html>` (i18n) | ✅ |
| 7.21 | CSP configured | ✅ |
| 7.22 | No autoplay audio | ✅ |
| 7.23 | Gallery keyboard card navigation | ✅ |
| 7.24 | Settings toggles keyboard usable | ⚠️ |
| 7.25 | WCAG 2.2 AA automated baseline (`test:a11y`) | ⚠️ |

## 8. Motion & feedback (25)

| # | Check | Status |
|---|-------|--------|
| 8.1 | Screen transition on tab change | ✅ |
| 8.2 | Splash fade dismiss | ✅ |
| 8.3 | Toast slide/fade | ✅ |
| 8.4 | Button active scale (`motion-polish`) | ✅ |
| 8.5 | Entry stagger on lists | ✅ |
| 8.6 | Bottom sheet slide up | ✅ |
| 8.7 | Count-up on net worth (respects reduced-motion) | ✅ |
| 8.8 | Scroll progress (where enabled) | ⚠️ |
| 8.9 | Price-health bar enter/exit | ✅ |
| 8.10 | Demo banner resize sync | ✅ |
| 8.11 | PIN fail shake / feedback | ⚠️ |
| 8.12 | Loading splash bar | ✅ |
| 8.13 | Haptics opt-in (Settings, off by default) | ⚠️ |
| 8.14 | Skeleton loaders (news shimmer) | ✅ |
| 8.15 | Optimistic UI on save | ⚠️ |
| 8.16 | Offline / stale price banner | ✅ |
| 8.17 | Theme switch minimal flash | ✅ |
| 8.18 | Portfolio P&L chart draw animation | ⚠️ |
| 8.19 | Modal open animation | ✅ |
| 8.20 | `prefers-reduced-motion` global | ✅ |
| 8.21 | Gallery card hover | ✅ |
| 8.22 | Lightbox transition | ✅ |
| 8.23 | Onboarding step transition | ✅ |
| 8.24 | Hub tool tile press feedback | ✅ |
| 8.25 | Live ticker `aria-live` announcer | ✅ |

## 9. Gallery & marketing (25)

| # | Check | Status |
|---|-------|--------|
| 9.1 | 80+ screens in capture manifest spec | ✅ |
| 9.2 | Manifest nested `files` + `scroll` structure | ✅ |
| 9.3 | Auth + onboarding capture targets | ✅ |
| 9.4 | Settings sections (17 scroll anchors) | ✅ |
| 9.5 | Sheets section (10 modals) | ✅ |
| 9.6 | Demo banner hidden in captures | ✅ |
| 9.7 | No price-health overlay in shots | ✅ |
| 9.8 | No localhost URLs in shots | ✅ |
| 9.9 | Desktop shows sidebar not bottom tabs | ✅ |
| 9.10 | Mobile shows bottom tabs not sidebar | ✅ |
| 9.11 | Scroll variants on long pages | ✅ |
| 9.12 | Gallery viewer strict viewport modes | ✅ |
| 9.13 | Missing viewport badge / pill | ✅ |
| 9.14 | Compare dark/light per card | ✅ |
| 9.15 | Lightbox navigation | ✅ |
| 9.16 | Dark ≠ light PNG hashes asserted in CI | ✅ |
| 9.17 | `ledgercap-1-dark.png` / `ledgercap-1-light.png` promo | ✅ |
| 9.18 | `manifest.json` screenshots paths | ✅ |
| 9.19 | `screen-gallery.html` offline embed fallback | ✅ |
| 9.20 | Capture timeout hardened (3600s suite) | ✅ |
| 9.21 | `landing.html` in marketing section | ✅ |
| 9.22 | `pitch.html` footer mark (v3.42 fix) | ✅ |
| 9.23 | `presentation.html` slide emojis (content cards) | ⚠️ |
| 9.24 | `widget-glance.html` in marketing captures | ✅ |
| 9.25 | Full PNG regen in progress (24/80+ on disk) | ⚠️ |

## 10. PWA & platform (25)

| # | Check | Status |
|---|-------|--------|
| 10.1 | `manifest.json` valid | ✅ |
| 10.2 | `theme_color` #000000 | ✅ |
| 10.3 | `background_color` #000000 | ✅ |
| 10.4 | `display` standalone | ✅ |
| 10.5 | `start_url` correct | ✅ |
| 10.6 | Icons maskable 512 | ✅ |
| 10.7 | Shortcuts defined (incl. glance) | ✅ |
| 10.8 | SW cache version bumped (`ledgercap-v109`) | ✅ |
| 10.9 | SW caches `brand-mark.css` + icons | ✅ |
| 10.10 | Offline shell works | ✅ |
| 10.11 | Install prompt UX (iOS meta) | ⚠️ |
| 10.12 | iOS add-to-homescreen meta | ✅ |
| 10.13 | Capacitor config present | ✅ |
| 10.14 | iOS AppIcon asset catalog | ✅ |
| 10.15 | `npm run icons:generate` | ✅ |
| 10.16 | `npm run icons:ios` | ✅ |
| 10.17 | Version sync `VERSION.json` / manifest / SW | ✅ |
| 10.18 | Build cache bust `?v=` on assets | ✅ |
| 10.19 | Service worker update on bump | ✅ |
| 10.20 | Render ephemeral FS documented | ✅ |
| 10.21 | Android TWA not configured | ❌ |
| 10.22 | Widget glance shortcut entry | ✅ |
| 10.23 | Portrait orientation default | ⚠️ |
| 10.24 | Playwright gallery CI hook | ⚠️ |
| 10.25 | App Store screenshots from gallery pipeline | ⚠️ |

---

## Open issues (tracked) — updated v3.44.0 (2026-07-02, Fable audit)

| ID | Severity | Item | Status |
|----|----------|------|--------|
| LC-UI-001 | Low | Tx ledger type icons emoji | ✅ FIXED 3.44 — `TYPE_META` maps to LcIcons keys (`transaction-ledger-service.js`), rendered via `LcIcons.icon()` |
| LC-UI-002 | Low | PIN dots lack aria progress | ✅ FIXED 3.44 — `role=progressbar` + `aria-valuenow` (`pin-lock.js`) |
| LC-UI-003 | Low | Android TWA not configured | OPEN — future Play Store track |
| LC-UI-004 | Medium | PIN vault brand mark | ✅ FIXED 3.43 |
| LC-UI-005 | Medium | widget-glance kicker mark | ✅ FIXED 3.43 |
| LC-UI-006 | Medium | Gallery PNG regen | ✅ FIXED 3.43 |
| LC-UI-007 | Low | Module empty-state emojis | ✅ FIXED 3.44 — LcIcons in comparison/dashboard/home/insights/risk-audit |
| LC-UI-008 | Low | presentation.html emojis | ACCEPTED — slide storytelling |
| LC-UI-009 | Low | Urdu nav label clip risk | ✅ MITIGATED 3.44 — ur strings shortened + `text-overflow: ellipsis` + `min-height: 48px` on `.psx-nav-btn` |
| LC-UI-010 | Low | pitch.html hero emoji | OPEN — optional marketing pass |

See `docs/FABLE_AUDIT_REPORT.md` for the full v3.44.0 security + UX fix list (XSS escaping, SW offline fix, PBKDF2 PIN, Urdu locale repair, account-number privacy, worker CORS/SSE).

**No Critical or High severity Fail items open.**

---

## Commands

```bash
npm run test:a11y          # Accessibility baseline checks
npm run gallery            # Regenerate all screenshots + embed manifest
npm run gallery:open       # Open offline screen-gallery.html
npm run gallery:view       # Serve at :8769/screen-gallery.html
npm run icons:generate     # PWA PNGs from icon.svg
npm run icons:ios          # resources/ios/AppIcon.appiconset
npm run cap:init           # Copy web + iOS project (after icons:ios)
```
