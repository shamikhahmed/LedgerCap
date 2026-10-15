#!/usr/bin/env node
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync, readFileSync, existsSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const pwRoot =
  process.env.PW_CORE || join(ROOT, '..', 'MasteryCap', 'node_modules', 'playwright-core');
const { chromium } = createRequire(import.meta.url)(pwRoot);
const GALLERY_DIR = join(ROOT, 'docs', 'screenshots', 'gallery');
const MANIFEST = join(GALLERY_DIR, 'gallery-manifest.json');
const BASE = process.env.GALLERY_BASE_URL || 'https://shamikhahmed.github.io/LedgerCap/?demo=1';
const ACCENT = '#34c759';
const CAPTURED_AT = '2026-10-15T10:00:00Z';
const CLOCK_MS = Date.parse('2026-10-15T10:00:00.000Z');

const VIEWPORTS = {
  iphone: { width: 390, height: 844, deviceScaleFactor: 3 },
  ipad: { width: 1180, height: 820, deviceScaleFactor: 2 },
  mac: { width: 1440, height: 900, deviceScaleFactor: 2 },
};

const SCREENS = [
  { nav: 'home', group: 'Wealth', screen: 'Home', caption: 'Net worth in PKR and the morning brief.' },
  { nav: 'portfolio', group: 'Wealth', screen: 'Portfolio', caption: 'Holdings, cost basis and gains.' },
  { nav: 'performance', group: 'Wealth', screen: 'Performance', caption: 'Returns over time.' },
  { nav: 'transactions', group: 'Wealth', screen: 'Transactions', caption: 'Every buy, sell, dividend and deposit.' },
  { nav: 'dividends', group: 'Wealth', screen: 'Dividends', caption: 'Dividend income and history.' },
  { nav: 'calendar', group: 'Wealth', screen: 'Calendar', caption: 'Upcoming dividends and events.' },
  { nav: 'zakat', group: 'Wealth', screen: 'Zakat', caption: 'Zakat on your investments.' },
  { nav: 'market', group: 'Markets', screen: 'Market', caption: 'KSE-100 and market movers (indicative, may be delayed).' },
  { nav: 'watchlist', group: 'Markets', screen: 'Watchlist', caption: 'Symbols you follow.' },
  { nav: 'funds', group: 'Markets', screen: 'Funds', caption: 'Mutual funds, including Islamic funds.' },
  { nav: 'global', group: 'Markets', screen: 'Global', caption: 'Global markets snapshot (indicative).' },
  { nav: 'commodities', group: 'Markets', screen: 'Commodities', caption: 'Gold, silver, oil — live via Worker, or honest empty/offline when unavailable.' },
  { nav: 'announcements', group: 'Markets', screen: 'Announcements', caption: 'Company announcements.' },
  { nav: 'research', group: 'Research', screen: 'Research', caption: 'Research tools — for education, not investment advice.' },
  { nav: 'screener', group: 'Research', screen: 'Screener', caption: 'Filter PSX stocks by your criteria.' },
  { nav: 'signals', group: 'Research', screen: 'Signals', caption: 'Rule-based signals — not investment advice.' },
  { nav: 'insights', group: 'Research', screen: 'Insights', caption: 'Patterns in your own portfolio.' },
  { nav: 'comparison', group: 'Research', screen: 'Compare', caption: 'Compare stocks side by side.' },
  { nav: 'risk-audit', group: 'Research', screen: 'Risk audit', caption: 'Concentration and risk in your holdings.' },
  { nav: 'paper-trade', group: 'Research', screen: 'Paper trading', caption: 'Practise trades without real money.' },
  { nav: 'journal', group: 'Research', screen: 'Journal', caption: 'Your trading notes.' },
  { nav: 'import', group: 'Tools', screen: 'Import', caption: 'Import trades from a CSV.' },
  { nav: 'more', group: 'Tools', screen: 'More', caption: 'Everything else in LedgerCap.' },
  { nav: 'settings', group: 'Tools', screen: 'Settings', caption: 'Language (English · اردو · Roman Urdu), currency and theme.' },
];

function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function shotPath(theme, device, group, screen) {
  return `${theme}/${device}/${slug(group)}--${slug(screen)}--demo.webp`;
}

function pngToWebp(pngPath, webpPath) {
  mkdirSync(dirname(webpPath), { recursive: true });
  if (spawnSync('cwebp', ['-q', '82', pngPath, '-o', webpPath]).status === 0 && existsSync(webpPath)) {
    try {
      unlinkSync(pngPath);
    } catch {
      /* */
    }
    return;
  }
  spawnSync('cp', [pngPath, webpPath]);
}

async function bootDemo(page) {
  await page.waitForFunction(() => typeof Navigation !== 'undefined', null, { timeout: 45000 });
  await page.evaluate(() => {
    document.getElementById('splash')?.classList.add('hide');
    document.getElementById('onboarding')?.remove();
    const b = document.getElementById('demo-banner');
    if (b) {
      b.classList.add('hidden');
      b.style.display = 'none';
    }
    sessionStorage.setItem('ledgercap_demo_mode', '1');
    sessionStorage.setItem('ledgercap_demo_dismiss', '1');
    if (typeof Settings !== 'undefined' && Settings.loadSeedData) {
      const has = (State.get().transactions || []).length > 0;
      if (!has) Settings.loadSeedData({ silent: true });
    }
  });
  await page.waitForSelector('#pin-lock.hidden', { timeout: 15000 }).catch(() => {});
}

async function setTheme(page, theme) {
  await page.emulateMedia({ colorScheme: theme });
  await page.evaluate((t) => {
    if (typeof App !== 'undefined' && App.applyTheme) App.applyTheme(t);
    else if (typeof Navigation !== 'undefined') Navigation.applyTheme(t);
    localStorage.setItem('theme', t);
    document.documentElement.setAttribute('data-theme', t);
    document.body.setAttribute('data-theme', t);
  }, theme);
  await page.waitForTimeout(200);
}

async function goNav(page, navId) {
  await page.evaluate((id) => Navigation.go(id), navId);
  await page.waitForSelector(`#screen-${navId}.active`, { timeout: 20000 });
  // Commodities: wait for offline empty state or price rows after Worker attempt
  if (navId === 'commodities') {
    await page.waitForFunction(() => {
      const list = document.getElementById('commodities-list');
      if (!list) return false;
      return !!list.querySelector('.lc-empty-state, .lc-market-row, .lc-cmd-stale');
    }, null, { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(400);
    return;
  }
  await page.waitForTimeout(300);
}

async function main() {
  const shots = [];
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [device, vp] of Object.entries(VIEWPORTS)) {
      for (const theme of ['light', 'dark']) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: vp.deviceScaleFactor,
          colorScheme: theme,
          isMobile: device !== 'mac',
          hasTouch: device !== 'mac',
        });
        await context.addInitScript((ms) => {
          const RealDate = Date;
          class FakeDate extends RealDate {
            constructor(...args) {
              if (args.length === 0) super(ms);
              else super(...args);
            }
            static now() {
              return ms;
            }
          }
          FakeDate.prototype = RealDate.prototype;
          window.Date = FakeDate;
        }, CLOCK_MS);
        const page = await context.newPage();
        await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await bootDemo(page);
        await setTheme(page, theme);

        for (const scr of SCREENS) {
          try {
            await goNav(page, scr.nav);
          } catch (err) {
            process.stdout.write(`skip ${theme}/${device} ${scr.nav || scr.path}: unreachable — skipped\n`);
            continue;
          }
          await setTheme(page, theme);
          const rel = shotPath(theme, device, scr.group, scr.screen);
          const webpPath = join(GALLERY_DIR, rel);
          const pngPath = webpPath.replace(/\.webp$/, '.png');
          mkdirSync(dirname(pngPath), { recursive: true });
          await page.screenshot({ path: pngPath, animations: 'disabled' });
          pngToWebp(pngPath, webpPath);
          shots.push({
            id: `${slug(scr.group)}--${slug(scr.screen)}--demo`,
            group: scr.group,
            screen: scr.screen,
            state: 'demo',
            theme,
            device,
            file: rel,
            route: `#${scr.nav}`,
            caption: scr.caption,
            w: vp.width * vp.deviceScaleFactor,
            h: vp.height * vp.deviceScaleFactor,
          });
          process.stdout.write(`✓ ${theme}/${device}/${scr.nav}\n`);
        }
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  const version = JSON.parse(readFileSync(join(ROOT, 'VERSION.json'), 'utf8')).version;
  writeFileSync(
    MANIFEST,
    JSON.stringify(
      { app: 'LedgerCap', version, capturedAt: CAPTURED_AT, accent: ACCENT, schema: 2, shots },
      null,
      2,
    ),
  );
  console.log(`\nLedgerCap gallery v3: ${shots.length} shots`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
