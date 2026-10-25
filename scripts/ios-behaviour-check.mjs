#!/usr/bin/env node
/**
 * iPhone behaviour check (Cap fleet mobile bugs), adapted from ScentCap scripts/ios-behaviour-check.mjs.
 * Usage: npm run serve  →  node scripts/ios-behaviour-check.mjs [baseUrl]   (default http://127.0.0.1:8769/)
 * Checks: tab bar + header tappable, no sideways overflow, the document (not an inner box) scrolls,
 * navigation opens at top without reloading, sheets keep the page position, inputs ≥16px, SW doesn't self-activate.
 *
 * Browser: WebKit by default. Set LC_IOS_BROWSER=chromium, or when webkit.launch fails, falls back to
 * Chromium with iPhone 15 Pro metrics (defaultBrowserType stripped). Uses PLAYWRIGHT_BROWSERS_PATH Chrome
 * for Testing when present. Optional LC_CDP_URL / LC_CHROME_PATH.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

process.env.PLAYWRIGHT_BROWSERS_PATH ||= path.join(os.homedir(), 'Library/Caches/ms-playwright');
process.env.PLAYWRIGHT_CHROMIUM_USE_HEADLESS_SHELL = '0';

const { webkit, chromium, devices } = await import('@playwright/test');

const BASE = process.argv[2] || 'http://127.0.0.1:8769/';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });
const step = async (name, fn) => {
  try {
    await fn();
  } catch (e) {
    check(name, false, String(e.message || e).split('\n')[0]);
  }
};

const CHROME = process.env.LC_CHROME_PATH
  || path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing');

function iphone15ProChromiumDevice() {
  const d = { ...devices['iPhone 15 Pro'] };
  delete d.defaultBrowserType;
  return d;
}

async function launchChromium() {
  if (process.env.LC_CDP_URL) {
    const browser = await chromium.connectOverCDP(process.env.LC_CDP_URL);
    return { browser, engine: 'chromium-cdp', device: iphone15ProChromiumDevice(), owned: false };
  }
  const opts = { headless: true };
  if (fs.existsSync(CHROME)) opts.executablePath = CHROME;
  const browser = await chromium.launch(opts);
  return { browser, engine: 'chromium', device: iphone15ProChromiumDevice(), owned: true };
}

async function launchBrowser() {
  const preferChromium = String(process.env.LC_IOS_BROWSER || '').toLowerCase() === 'chromium';
  if (preferChromium) return launchChromium();
  try {
    const browser = await webkit.launch();
    return { browser, engine: 'webkit', device: devices['iPhone 15 Pro'], owned: true };
  } catch (e) {
    console.error(`webkit.launch failed (${String(e.message || e).split('\n')[0]}); falling back to Chromium`);
    return launchChromium();
  }
}

const { browser, engine, device, owned } = await launchBrowser();
console.log(`ios-behaviour-check engine=${engine}`);
const ctx = await browser.newContext({ ...device, serviceWorkers: 'block' });
const page = await ctx.newPage();
page.setDefaultTimeout(8000);
await page.addInitScript(() => localStorage.setItem('lc_whats_new_seen', '99'));

await page.goto(BASE.includes('?') ? BASE : BASE.replace(/\/?$/, '/') + '?demo=1');
await page.waitForFunction(() => typeof window.__lcEnsureDeferred === 'function' && typeof Navigation !== 'undefined', { timeout: 45000 });
await page.evaluate(async () => {
  await window.__lcEnsureDeferred();
  document.getElementById('splash')?.classList.add('hide');
  document.getElementById('proUpgradeModal')?.classList.remove('open');
});
await page.waitForTimeout(1500);
await page.evaluate(() => { window.__noReload = 1; });

// 1. Tabs + top-bar controls are the topmost element at their centre, ≥44pt
const covered = await page.evaluate(() =>
  [...document.querySelectorAll('#nav .psx-nav-btn, .psx-topbar button')]
    .filter((t) => t.offsetParent !== null)
    .filter((t) => {
      const r = t.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return !t.contains(hit);
    })
    .map((t) => t.getAttribute('aria-label') || t.textContent.trim()),
);
check('tab bar + top bar tappable', covered.length === 0, covered.join(','));
const small = await page.evaluate(() =>
  [...document.querySelectorAll('#nav .psx-nav-btn, .psx-topbar button')]
    .filter((t) => t.offsetParent !== null)
    .filter((t) => { const r = t.getBoundingClientRect(); return r.width < 44 || r.height < 34; })
    .map((t) => t.getAttribute('aria-label') || t.textContent.trim()),
);
check('hit areas (tabs ≥44pt, pills ≥34pt + slop)', small.length === 0, small.join(','));

// 2. The document scrolls; no sideways overflow
for (const tab of ['home', 'market', 'funds', 'portfolio', 'research', 'settings']) {
  await page.evaluate((t) => Navigation.go(t), tab);
  await page.waitForTimeout(600);
  const m = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    iw: innerWidth,
    docScroll: document.scrollingElement.scrollHeight > innerHeight,
    inner: getComputedStyle(document.querySelector('.psx-screen.active')).overflowY,
  }));
  check(`no sideways overflow · ${tab}`, m.sw <= m.iw + 1, `${m.sw} > ${m.iw}`);
  check(`document scrolls (no inner scroller) · ${tab}`, m.docScroll && m.inner === 'visible', JSON.stringify(m));
}

// 2b. The document really scrolls (and instantly — no smooth-scroll animation)
check('programmatic scroll lands instantly', await page.evaluate(() => { window.scrollTo(0, 300); const y = window.scrollY; window.scrollTo(0, 0); return y >= 250; }));

// 3. Tab tap: new screen at top, no reload
await step('navigation by tapping', async () => {
  await page.evaluate(() => Navigation.go('home'));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(200);
  await page.locator('#nav .psx-nav-btn[data-tab="portfolio"]').tap();
  await page.waitForTimeout(700);
  const nav = await page.evaluate(() => ({ y: scrollY, tab: Navigation.current(), marker: window.__noReload }));
  check('tab tap navigates (no reload)', nav.tab === 'portfolio' && nav.marker === 1, JSON.stringify(nav));
  check('new screen opens at top', nav.y === 0, `scrollY ${nav.y}`);
});

// 4. Sheet keeps the page position (Portfolio → Sell on a visible holding → Cancel)
let smallInputs = 0;
await step('sheet flow', async () => {
  await page.evaluate(() => {
    const btn = document.querySelectorAll('#screen-portfolio .lc-link-btn--sell')[2];
    if (btn) window.scrollTo(0, btn.getBoundingClientRect().top + scrollY - innerHeight / 2);
  });
  await page.waitForTimeout(300);
  const before = await page.evaluate(() => scrollY);
  const idx = await page.evaluate(() =>
    [...document.querySelectorAll('#screen-portfolio .lc-link-btn--sell')].findIndex((el) => {
      const r = el.getBoundingClientRect();
      return r.top > 120 && r.bottom < innerHeight - 120;
    }),
  );
  const sellCount = await page.locator('#screen-portfolio .lc-link-btn--sell').count();
  if (sellCount === 0) throw new Error('no Sell buttons on portfolio');
  await page.locator('#screen-portfolio .lc-link-btn--sell').nth(Math.max(0, idx)).tap();
  await page.locator('#bottom-sheet.open .bs-panel').waitFor();
  await page.waitForTimeout(300);
  const locked = await page.evaluate(() => document.body.style.position);
  smallInputs = await page.evaluate(() =>
    [...document.querySelectorAll('#bottom-sheet input, #bottom-sheet select, #bottom-sheet textarea')]
      .filter((el) => el.offsetParent !== null && parseFloat(getComputedStyle(el).fontSize) < 16).length,
  );
  await page.locator('#bottom-sheet .bs-bar-cancel').tap();
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => scrollY);
  check('page locked behind sheet', locked === 'fixed', `body position "${locked}"`);
  check('sheet keeps scroll position', Math.abs(after - before) < 4, `before ${before} after ${after}`);
});
check('inputs ≥16px (no zoom-on-focus)', smallInputs === 0, `${smallInputs} small`);

// 5. A type chip inside the sheet is tappable (not retargeted)
await step('sheet chips', async () => {
  await page.evaluate(() => App.openAddTransaction('BUY'));
  await page.locator('#bottom-sheet.open .type-btn[data-type="SELL"]').tap();
  const on = await page.evaluate(() => document.querySelector('.type-btn[data-type="SELL"]').classList.contains('active'));
  check('sheet chip tap selects', on);
  await page.evaluate(() => App.closeBottomSheet());
});
check('no reload during session', (await page.evaluate(() => window.__noReload)) === 1);

// 6. Service worker never self-activates over a running app
const sw = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
check('SW: no auto skipWaiting/clients.claim', !/^\s*self\.skipWaiting\(\);|clients\.claim\(\)/m.test(sw));

await ctx.close();
if (owned) await browser.close();
else await browser.close().catch(() => {});

let fail = 0;
for (const r of results) {
  if (!r.ok) fail++;
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : `  (${r.detail})`}`);
}
process.exit(fail ? 1 : 0);
