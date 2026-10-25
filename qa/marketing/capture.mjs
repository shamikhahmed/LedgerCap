#!/usr/bin/env node
/**
 * LedgerCap marketing capture — gallery webps (hub paths), App Store PNGs, walkthrough.
 * Invoked by qa/marketing/capture.sh (reviewer runs outside sandbox).
 */
import { createRequire } from 'node:module';
import {
  mkdirSync, writeFileSync, existsSync, unlinkSync, copyFileSync, readFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(import.meta.url);

function loadPlaywright() {
  const candidates = [
    join(ROOT, 'node_modules', 'playwright'),
    join(ROOT, '..', '..', 'LedgerCap', 'node_modules', 'playwright'),
    join(ROOT, '..', 'MasteryCap', 'node_modules', 'playwright'),
  ];
  for (const p of candidates) {
    try {
      return require(p);
    } catch {
      /* try next */
    }
  }
  throw new Error('playwright not found — npm install @playwright/test in LedgerCap first');
}

const { chromium, devices } = loadPlaywright();

const PORT = process.env.LC_MARKETING_PORT || '8850';
const BASE = process.env.LC_MARKETING_BASE || `http://127.0.0.1:${PORT}/?demo=1`;
const LANDING = process.env.LC_MARKETING_LANDING || `http://127.0.0.1:${PORT}/landing.html`;
const SHOTS = join(ROOT, 'shots');
const SITE = join(ROOT, 'site');
const APPSTORE = join(ROOT, 'qa', 'marketing', 'appstore');
const SUMMARY = join(ROOT, 'qa', 'marketing', 'SUMMARY.md');
const CLOCK_MS = Date.parse('2026-10-25T10:00:00.000Z');

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

/** Hub / gallery file names: wealth-home-demo.webp */
function shotName(group, screen) {
  return `${slug(group)}-${slug(screen)}-demo.webp`;
}
function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const VIEWPORTS = {
  // iPhone 15 Pro logical ~393×852; match hub-ish phone framing
  iphone: { width: 393, height: 852, deviceScaleFactor: 3 },
  ipad: { width: 1024, height: 1366, deviceScaleFactor: 2 },
  mac: { width: 1440, height: 900, deviceScaleFactor: 2 },
};

function pngToWebp(pngPath, webpPath) {
  mkdirSync(dirname(webpPath), { recursive: true });
  if (spawnSync('cwebp', ['-q', '82', pngPath, '-o', webpPath], { stdio: 'ignore' }).status === 0 && existsSync(webpPath)) {
    try { unlinkSync(pngPath); } catch { /* */ }
    return 'webp';
  }
  copyFileSync(pngPath, webpPath);
  try { unlinkSync(pngPath); } catch { /* */ }
  return 'png-copied-as-webp';
}

async function bootDemo(page) {
  await page.waitForFunction(() => typeof Navigation !== 'undefined', null, { timeout: 60000 });
  await page.evaluate(() => {
    document.getElementById('splash')?.classList.add('hide');
    document.getElementById('onboarding')?.remove();
    try {
      document.querySelectorAll('.lc-demo-banner,[data-demo-banner]').forEach((el) => el.remove());
    } catch { /* */ }
  });
  await page.waitForTimeout(400);
}

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    if (typeof App !== 'undefined' && App.applyTheme) App.applyTheme(t);
    else if (typeof Navigation !== 'undefined' && Navigation.applyTheme) Navigation.applyTheme(t);
    localStorage.setItem('theme', t);
    document.documentElement.setAttribute('data-theme', t);
    document.body.setAttribute('data-theme', t);
  }, theme);
  await page.waitForTimeout(200);
}

async function goNav(page, navId) {
  await page.evaluate((id) => Navigation.go(id), navId);
  await page.waitForSelector(`#screen-${navId}.active`, { timeout: 20000 }).catch(() => {});
  if (navId === 'commodities') {
    await page.waitForFunction(() => {
      const list = document.getElementById('commodities-list');
      if (!list) return false;
      return !!list.querySelector('.lc-empty-state, .lc-market-row, .lc-cmd-stale');
    }, null, { timeout: 15000 }).catch(() => {});
  }
  await page.waitForTimeout(350);
}

async function openAddSheet(page) {
  await goNav(page, 'home');
  const opened = await page.evaluate(() => {
    const fab = document.querySelector('[data-action="open-add"],#fab-add,.lc-fab,[aria-label*="Add"]');
    if (fab) { fab.click(); return true; }
    if (typeof App !== 'undefined' && App.openAddSheet) { App.openAddSheet(); return true; }
    return false;
  });
  await page.waitForTimeout(500);
  return opened;
}

const log = [];
function note(row) { log.push(row); console.log(row.join('\t')); }

async function captureGallery(browser) {
  let ok = 0; let fail = 0;
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
          constructor(...args) { if (args.length === 0) super(ms); else super(...args); }
          static now() { return ms; }
        }
        FakeDate.prototype = RealDate.prototype;
        window.Date = FakeDate;
      }, CLOCK_MS);
      const page = await context.newPage();
      try {
        await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 90000 });
        await bootDemo(page);
        await setTheme(page, theme);

        for (const scr of SCREENS) {
          try {
            await goNav(page, scr.nav);
            await setTheme(page, theme);
            const name = shotName(scr.group, scr.screen);
            const dir = join(SHOTS, theme, device);
            mkdirSync(dir, { recursive: true });
            const png = join(dir, name.replace(/\.webp$/, '.png'));
            const webp = join(dir, name);
            await page.screenshot({ path: png, animations: 'disabled' });
            pngToWebp(png, webp);
            ok++;
            note(['OK', 'gallery', `${theme}/${device}/${name}`]);
          } catch (err) {
            fail++;
            note(['FAIL', 'gallery', `${theme}/${device}/${scr.nav}`, String(err.message || err).slice(0, 120)]);
          }
        }

        // Key sheet: Add transaction
        try {
          await openAddSheet(page);
          await setTheme(page, theme);
          const name = 'wealth-add-sheet-demo.webp';
          const dir = join(SHOTS, theme, device);
          mkdirSync(dir, { recursive: true });
          const png = join(dir, name.replace(/\.webp$/, '.png'));
          const webp = join(dir, name);
          await page.screenshot({ path: png, animations: 'disabled' });
          pngToWebp(png, webp);
          ok++;
          note(['OK', 'gallery', `${theme}/${device}/${name}`]);
        } catch (err) {
          fail++;
          note(['FAIL', 'gallery', `${theme}/${device}/add-sheet`, String(err.message || err).slice(0, 120)]);
        }
      } finally {
        await context.close();
      }
    }
  }
  return { ok, fail };
}

async function captureAppStore(browser) {
  const specs = [
    { id: 'iphone-6.9', width: 1320, height: 2868, dpr: 1, screens: ['home', 'portfolio', 'market', 'funds', 'research'] },
    { id: 'ipad-13', width: 2064, height: 2752, dpr: 1, screens: ['home', 'portfolio', 'market'] },
  ];
  let ok = 0; let fail = 0;
  mkdirSync(APPSTORE, { recursive: true });
  for (const spec of specs) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width: Math.round(spec.width / (spec.dpr || 1)), height: Math.round(spec.height / (spec.dpr || 1)) },
        deviceScaleFactor: spec.dpr || 1,
        colorScheme: theme,
        isMobile: true,
        hasTouch: true,
      });
      const page = await context.newPage();
      try {
        await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 90000 });
        await bootDemo(page);
        await setTheme(page, theme);
        let i = 1;
        for (const nav of spec.screens) {
          try {
            await goNav(page, nav);
            await setTheme(page, theme);
            const out = join(APPSTORE, `${spec.id}-${theme}-${String(i).padStart(2, '0')}-${nav}.png`);
            await page.screenshot({
              path: out,
              animations: 'disabled',
              clip: { x: 0, y: 0, width: Math.round(spec.width / (spec.dpr || 1)), height: Math.round(spec.height / (spec.dpr || 1)) },
            });
            ok++;
            note(['OK', 'appstore', out.replace(ROOT + '/', '')]);
            i++;
          } catch (err) {
            fail++;
            note(['FAIL', 'appstore', `${spec.id}/${theme}/${nav}`, String(err.message || err).slice(0, 120)]);
          }
        }
      } finally {
        await context.close();
      }
    }
  }
  return { ok, fail };
}

async function captureWalkthrough(browser) {
  mkdirSync(SITE, { recursive: true });
  const videoDir = join(ROOT, 'qa', 'marketing', 'video-raw');
  mkdirSync(videoDir, { recursive: true });
  const iphone = devices['iPhone 15 Pro'] || devices['iPhone 14 Pro'];
  const context = await browser.newContext({
    ...iphone,
    recordVideo: { dir: videoDir, size: { width: 390, height: 844 } },
    colorScheme: 'dark',
  });
  const page = await context.newPage();
  try {
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await bootDemo(page);
    await setTheme(page, 'dark');
    const sequence = ['home', 'portfolio', 'market', 'funds', 'research', 'more'];
    for (const nav of sequence) {
      await goNav(page, nav);
      await page.waitForTimeout(2800);
    }
    await page.waitForTimeout(1500);
  } finally {
    await context.close();
  }

  // Find newest webm in videoDir
  const { readdirSync, statSync } = await import('node:fs');
  const files = readdirSync(videoDir).filter((f) => f.endsWith('.webm'));
  if (!files.length) {
    note(['FAIL', 'walkthrough', 'no webm recorded']);
    return { ok: 0, fail: 1, path: null };
  }
  files.sort((a, b) => statSync(join(videoDir, b)).mtimeMs - statSync(join(videoDir, a)).mtimeMs);
  const webm = join(videoDir, files[0]);
  const mp4 = join(SITE, 'walkthrough.mp4');
  const poster = join(SITE, 'walkthrough-poster.jpg');
  const posterWebp = join(SITE, 'walkthrough-poster.webp');

  // Poster from home shot if present
  const homeShot = join(SHOTS, 'dark', 'iphone', 'wealth-home-demo.webp');
  if (existsSync(homeShot)) {
    copyFileSync(homeShot, posterWebp);
  }

  const ff = spawnSync('ffmpeg', [
    '-y', '-i', webm, '-vf', 'scale=1080:-2', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
    '-an', '-movflags', '+faststart', mp4,
  ], { encoding: 'utf8' });
  if (ff.status === 0 && existsSync(mp4)) {
    // Extract poster frame
    spawnSync('ffmpeg', ['-y', '-i', mp4, '-ss', '00:00:02', '-vframes', '1', poster], { stdio: 'ignore' });
    note(['OK', 'walkthrough', 'site/walkthrough.mp4']);
    return { ok: 1, fail: 0, path: mp4 };
  }
  const fallback = join(SITE, 'walkthrough.webm');
  copyFileSync(webm, fallback);
  note(['WARN', 'walkthrough', 'ffmpeg missing or failed — kept site/walkthrough.webm']);
  return { ok: 1, fail: 0, path: fallback };
}

function runLighthouse() {
  const outDir = join(ROOT, 'qa', 'marketing', 'lighthouse');
  mkdirSync(outDir, { recursive: true });
  const jsonOut = join(outDir, 'landing.json');
  const probe = spawnSync('npx', ['--offline', 'lighthouse', '--version'], { encoding: 'utf8' });
  if (probe.status !== 0) {
    note(['SKIP', 'lighthouse', 'npx lighthouse not available offline']);
    return null;
  }
  const r = spawnSync('npx', [
    '--offline', 'lighthouse', LANDING,
    '--only-categories=performance,accessibility,best-practices,seo',
    '--chrome-flags=--headless --no-sandbox',
    '--output=json', `--output-path=${jsonOut}`,
    '--quiet',
  ], { encoding: 'utf8', timeout: 180000 });
  if (r.status !== 0 || !existsSync(jsonOut)) {
    note(['FAIL', 'lighthouse', (r.stderr || r.stdout || 'failed').slice(0, 160)]);
    return null;
  }
  try {
    const data = JSON.parse(readFileSync(jsonOut, 'utf8'));
    const cats = data.categories || {};
    const scores = {};
    for (const [k, v] of Object.entries(cats)) scores[k] = Math.round((v.score || 0) * 100);
    note(['OK', 'lighthouse', JSON.stringify(scores)]);
    return scores;
  } catch (err) {
    note(['FAIL', 'lighthouse', String(err.message || err)]);
    return null;
  }
}

function writeSummary({ gallery, appstore, walkthrough, lighthouse, version }) {
  const lines = [
    `# LedgerCap marketing capture — ${version}`,
    '',
    `Generated: ${new Date().toISOString()}`,
    `Base: ${BASE}`,
    `Landing: ${LANDING}`,
    '',
    '## Summary',
    '',
    '| Step | Result |',
    '| --- | --- |',
    `| Gallery webps | ${gallery.ok} ok / ${gallery.fail} fail → \`shots/{dark,light}/{iphone,ipad,mac}/\` |`,
    `| App Store PNGs | ${appstore.ok} ok / ${appstore.fail} fail → \`qa/marketing/appstore/\` |`,
    `| Walkthrough | ${walkthrough.path ? walkthrough.path.replace(ROOT + '/', '') : 'missing'} |`,
    `| Lighthouse landing | ${lighthouse ? JSON.stringify(lighthouse) : 'skipped / unavailable'} |`,
    '',
    '## Hub sync',
    '',
    'Copy `shots/` into `shamikhahmed.github.io/apps/ledgercap/shots/` (same relative paths).',
    '',
    '## Log',
    '',
    '```',
    ...log.map((r) => r.join('\t')),
    '```',
    '',
  ];
  writeFileSync(SUMMARY, lines.join('\n'));
  console.log('\n' + lines.slice(0, 16).join('\n'));
}

async function main() {
  const version = JSON.parse(readFileSync(join(ROOT, 'VERSION.json'), 'utf8')).version;
  console.log(`LedgerCap marketing capture ${version}`);
  console.log(`BASE=${BASE}`);

  const browser = await chromium.launch({ headless: true });
  let gallery; let appstore; let walkthrough;
  try {
    gallery = await captureGallery(browser);
    appstore = await captureAppStore(browser);
    walkthrough = await captureWalkthrough(browser);
  } finally {
    await browser.close();
  }
  const lighthouse = runLighthouse();
  writeSummary({ gallery, appstore, walkthrough, lighthouse, version });

  // Seed site hero from fresh dark iphone shots when present
  for (const name of [
    'wealth-home-demo.webp',
    'wealth-portfolio-demo.webp',
    'markets-market-demo.webp',
    'markets-funds-demo.webp',
    'research-research-demo.webp',
  ]) {
    const src = join(SHOTS, 'dark', 'iphone', name);
    if (existsSync(src)) copyFileSync(src, join(SITE, name));
  }
  const ipadHome = join(SHOTS, 'dark', 'ipad', 'wealth-home-demo.webp');
  if (existsSync(ipadHome)) copyFileSync(ipadHome, join(SITE, 'ipad-home.webp'));

  if (gallery.fail || appstore.fail) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
