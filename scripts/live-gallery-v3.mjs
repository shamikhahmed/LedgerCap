#!/usr/bin/env node
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync, readFileSync, existsSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const GALLERY_DIR = join(ROOT, 'docs', 'screenshots', 'gallery');
const MANIFEST = join(GALLERY_DIR, 'gallery-manifest.json');
const BASE = process.env.GALLERY_BASE_URL || 'https://shamikhahmed.github.io/LedgerCap/?demo=1';
const ACCENT = '#34c759';
const CAPTURED_AT = '2026-10-14T09:41:00Z';
const CLOCK_MS = Date.parse('2026-10-14T09:41:00.000Z');

const VIEWPORTS = {
  iphone: { width: 390, height: 844, deviceScaleFactor: 3 },
  ipad: { width: 1180, height: 820, deviceScaleFactor: 2 },
  mac: { width: 1440, height: 900, deviceScaleFactor: 2 },
};

const SCREENS = [
  { nav: 'home', group: 'Wealth', screen: 'Home', caption: 'Net worth and morning brief (demo).' },
  { nav: 'market', group: 'Markets', screen: 'Market', caption: 'KSE watch and pulse.' },
  { nav: 'funds', group: 'Markets', screen: 'Funds', caption: 'Islamic and mutual funds.' },
  { nav: 'portfolio', group: 'Wealth', screen: 'Portfolio', caption: 'Holdings and performance.' },
  { nav: 'research', group: 'Research', screen: 'Research', caption: 'Stock analyzer and insights.' },
  { nav: 'settings', group: 'System', screen: 'Settings', caption: 'Theme, language, currency.' },
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
          await goNav(page, scr.nav);
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
