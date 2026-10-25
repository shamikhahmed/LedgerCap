#!/usr/bin/env node
/**
 * Production-readiness visual/interaction audit (Chromium + iPhone 15 Pro metrics).
 * Usage: static server on BASE → node scripts/prod-ready-audit.mjs [baseUrl]
 * Default BASE: http://127.0.0.1:8850/
 *
 * Env:
 *   PLAYWRIGHT_BROWSERS_PATH, PLAYWRIGHT_CHROMIUM_USE_HEADLESS_SHELL=0
 *   LC_CHROME_PATH — Google Chrome for Testing binary
 *   LC_CDP_URL — optional connectOverCDP (when sandbox blocks launch)
 *
 * Writes:
 *   qa/prod-ready/shots/*.png          (≤40 screenshots)
 *   qa/prod-ready/ios-check-chromium.txt
 *   qa/prod-ready/AUDIT-RAW.json
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

process.env.PLAYWRIGHT_BROWSERS_PATH ||= path.join(os.homedir(), 'Library/Caches/ms-playwright');
process.env.PLAYWRIGHT_CHROMIUM_USE_HEADLESS_SHELL = '0';

const { chromium, devices } = await import('@playwright/test');

const require = createRequire(import.meta.url);
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'qa', 'prod-ready');
const SHOTS = path.join(OUT, 'shots');
const BASE = (process.argv[2] || 'http://127.0.0.1:8850/').replace(/\/?$/, '/');

const CHROME = process.env.LC_CHROME_PATH
  || path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing');

const VALID = [
  'home', 'market', 'funds', 'portfolio', 'research', 'more', 'global', 'commodities',
  'announcements', 'zakat', 'import', 'screener', 'watchlist', 'dividends', 'calendar',
  'settings', 'transactions', 'signals', 'risk-audit', 'insights', 'comparison',
  'performance', 'journal', 'pilot-tools', 'paper-trade',
];

const VIEWPORTS = [
  { id: '375x812', width: 375, height: 812, themes: ['light', 'dark'] },
  { id: '390x844', width: 390, height: 844, themes: ['light', 'dark'] },
  { id: '430x932', width: 430, height: 932, themes: ['light', 'dark'] },
  { id: '744x1133', width: 744, height: 1133, themes: ['dark'] },
  { id: '1180x820', width: 1180, height: 820, themes: ['dark'] },
  { id: '1440x900', width: 1440, height: 900, themes: ['dark'] },
];

fs.mkdirSync(SHOTS, { recursive: true });
for (const f of fs.readdirSync(SHOTS)) {
  if (f.endsWith('.png')) fs.unlinkSync(path.join(SHOTS, f));
}

function iphone15ProCtx() {
  const d = { ...devices['iPhone 15 Pro'] };
  delete d.defaultBrowserType;
  return d;
}

const findings = [];
const checks = [];
const screenshots = [];
const consoleErrors = [];
const cspViolations = [];
const httpErrors = [];
let shotCount = 0;
const MAX_SHOTS = 40;

function attachHttpRecorder(page, screen = '') {
  page.on('response', (res) => {
    const status = res.status();
    if (status >= 400) {
      httpErrors.push({ screen, url: res.url(), status });
    }
  });
}

function attachCspConsole(page, screen = '') {
  page.on('console', (msg) => {
    const text = msg.text();
    if (/Content Security Policy|CSP directive|Refused to execute inline|Refused to load/i.test(text)) {
      cspViolations.push({ screen, text: text.slice(0, 500), source: 'console' });
    }
  });
}

function finding(severity, screen, selector, description, extra = {}) {
  findings.push({ severity, screen, selector, description, ...extra });
}
function check(name, ok, detail = '') {
  checks.push({ name, ok, detail });
}

async function launchChrome() {
  if (process.env.LC_CDP_URL) {
    return { browser: await chromium.connectOverCDP(process.env.LC_CDP_URL), owned: false };
  }
  const opts = { headless: true };
  if (fs.existsSync(CHROME)) opts.executablePath = CHROME;
  return { browser: await chromium.launch(opts), owned: true };
}

async function boot(page, { theme = 'dark', demo = true } = {}) {
  await page.addInitScript(({ t, demoFlag }) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('lc_whats_new_seen', '99');
    localStorage.setItem('theme', t);
    if (!demoFlag) {
      // Empty profile: no demo seed; mark onboarding dismissed if keys exist later
      localStorage.setItem('lc_onboarding_done', '1');
    }
  }, { t: theme, demoFlag: demo });
  const url = demo ? `${BASE}?demo=1` : BASE;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(
    () => typeof window.__lcEnsureDeferred === 'function' && typeof Navigation !== 'undefined',
    { timeout: 45000 },
  );
  await page.evaluate(async () => {
    await window.__lcEnsureDeferred();
    document.getElementById('splash')?.classList.add('hide');
    document.getElementById('proUpgradeModal')?.classList.remove('open');
    document.getElementById('onboarding')?.classList.add('hide');
    document.querySelector('.ob-overlay')?.remove?.();
  });
  await page.waitForTimeout(800);
}

async function go(page, tab) {
  await page.evaluate((t) => {
    if (typeof App !== 'undefined' && App.closeBottomSheet) App.closeBottomSheet();
    Navigation.go(t);
  }, tab);
  await page.waitForTimeout(700);
}

async function maybeShot(page, name) {
  if (shotCount >= MAX_SHOTS) return null;
  const file = `${String(shotCount + 1).padStart(2, '0')}-${name}.png`;
  const full = path.join(SHOTS, file);
  await page.waitForTimeout(250);
  await page.screenshot({ path: full, fullPage: false });
  shotCount++;
  screenshots.push(full);
  return file;
}

async function scanScreen(page, screen, profile) {
  const overflow = await page.evaluate(() => {
    const sw = document.documentElement.scrollWidth;
    const iw = window.innerWidth;
    return { sw, iw, overflow: sw > iw + 1 };
  });
  if (overflow.overflow) {
    finding('high', screen, 'documentElement', `horizontal overflow ${overflow.sw} > ${overflow.iw}`, { profile, metric: overflow });
  }

  const dead = await page.evaluate(() => {
    const deadActions = [];
    const resolve = (path) => {
      if (!path || !path.includes('.')) return { ok: true, reason: 'segment-or-local' };
      const parts = path.split('.');
      let ctx = window;
      for (let i = 0; i < parts.length - 1; i++) {
        ctx = ctx?.[parts[i]];
        if (ctx == null) return { ok: false, reason: `missing ${parts.slice(0, i + 1).join('.')}` };
      }
      const fn = ctx?.[parts[parts.length - 1]];
      if (typeof fn !== 'function') return { ok: false, reason: `not a function: ${path}` };
      return { ok: true };
    };
    for (const el of document.querySelectorAll('[data-action]')) {
      if (el.offsetParent === null && !el.closest('#bottom-sheet')) continue;
      const action = el.getAttribute('data-action') || '';
      const r = resolve(action);
      if (!r.ok) {
        deadActions.push({
          kind: 'data-action',
          selector: el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}[data-action="${action}"]`,
          action,
          reason: r.reason,
        });
      }
    }
    for (const el of document.querySelectorAll('[data-act]')) {
      // data-act is handled locally (pin pad); flag only if no click listener ancestor and not .lc-pin-key
      if (el.classList.contains('lc-pin-key')) continue;
      deadActions.push({
        kind: 'data-act',
        selector: el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}[data-act="${el.getAttribute('data-act')}"]`,
        action: el.getAttribute('data-act'),
        reason: 'orphan data-act (not pin-key)',
      });
    }
    for (const el of document.querySelectorAll('[onclick]')) {
      deadActions.push({
        kind: 'onclick',
        selector: el.id ? `#${el.id}` : el.tagName.toLowerCase(),
        action: (el.getAttribute('onclick') || '').slice(0, 80),
        reason: 'inline onclick present',
      });
    }
    return deadActions;
  });
  for (const d of dead) {
    finding('medium', screen, d.selector, `dead ${d.kind}: ${d.action} (${d.reason})`, { profile, kind: d.kind });
  }

  const unnamed = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('button, [role="button"], a.btn, input[type="button"], input[type="submit"]')) {
      if (el.offsetParent === null) continue;
      if (el.closest('[aria-hidden="true"]')) continue;
      const label = (
        el.getAttribute('aria-label')
        || el.getAttribute('title')
        || el.getAttribute('aria-labelledby')
        || (el.textContent || '').replace(/\s+/g, ' ').trim()
        || (el.value || '')
      );
      if (!label) {
        out.push(el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(/\s+/).slice(0, 2).join('.')}`);
      }
    }
    return out.slice(0, 25);
  });
  for (const sel of unnamed) {
    finding('medium', screen, sel, 'button/control without accessible name', { profile });
  }
}

function resolveAxePath() {
  try {
    return require.resolve('axe-core/axe.min.js');
  } catch {
    const candidates = [
      path.join(ROOT, 'node_modules/axe-core/axe.min.js'),
      path.join(ROOT, '../CookCap/node_modules/axe-core/axe.min.js'),
      path.join(ROOT, '../PrismCap/node_modules/axe-core/axe.min.js'),
      path.join(ROOT, '../../CookCap/node_modules/axe-core/axe.min.js'),
    ];
    return candidates.find((c) => fs.existsSync(c)) || null;
  }
}

/**
 * Axe needs script injection; meta CSP blocks addScriptTag.
 * Use a dedicated context with bypassCSP: true — never on the CSP-recording pass.
 */
async function runAxeIfPresent(browser, screen = 'home') {
  const axePath = resolveAxePath();
  if (!axePath) {
    check('axe-core available', false, 'not found in node_modules');
    return null;
  }
  const ctx = await browser.newContext({
    ...iphone15ProCtx(),
    viewport: { width: 390, height: 844 },
    serviceWorkers: 'block',
    bypassCSP: true,
  });
  const page = await ctx.newPage();
  try {
    await boot(page, { theme: 'dark', demo: true });
    await go(page, screen);
    await page.addScriptTag({ path: axePath });
    const result = await page.evaluate(async () => {
      // eslint-disable-next-line no-undef
      return axe.run(document, {
        resultTypes: ['violations'],
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'best-practice'] },
      });
    });
    check('axe-core available', true, axePath);
    check('axe-core run', true, `${(result.violations || []).length} violations on ${screen}`);
    for (const v of result.violations || []) {
      const nodes = (v.nodes || []).slice(0, 5);
      for (const n of nodes) {
        finding('a11y', screen, (n.target || []).join(' ') || '(unknown)', `${v.id}: ${v.help}`, {
          impact: v.impact,
          html: (n.html || '').slice(0, 120),
        });
      }
    }
    return result;
  } finally {
    await ctx.close();
  }
}

/** Non-bypassed pass: record CSP console noise + securitypolicyviolation + HTTP >=400. */
async function collectCspPass(browser) {
  const ctx = await browser.newContext({
    ...iphone15ProCtx(),
    viewport: { width: 390, height: 844 },
    serviceWorkers: 'block',
  });
  const page = await ctx.newPage();
  attachHttpRecorder(page, 'csp-pass');
  attachCspConsole(page, 'csp-pass');
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (e) => {
      window.__cspViolations = window.__cspViolations || [];
      window.__cspViolations.push({
        violatedDirective: e.violatedDirective,
        effectiveDirective: e.effectiveDirective,
        blockedURI: e.blockedURI,
        disposition: e.disposition,
      });
    });
  });
  await boot(page, { theme: 'dark', demo: true });
  for (const tab of VALID) {
    try {
      await go(page, tab);
    } catch (e) {
      finding('high', tab, 'Navigation.go', `csp-pass failed: ${String(e.message || e).split('\n')[0]}`, { profile: 'csp-pass' });
    }
  }
  const fromDom = await page.evaluate(() => window.__cspViolations || []);
  for (const v of fromDom) {
    cspViolations.push({
      screen: 'csp-pass',
      text: `${v.violatedDirective || v.effectiveDirective} blocked ${v.blockedURI || '(inline)'}`,
      source: 'securitypolicyviolation',
      ...v,
    });
  }
  check('csp-pass completed', true, `${cspViolations.length} CSP events, ${httpErrors.filter((h) => h.screen === 'csp-pass').length} HTTP>=400`);
  await ctx.close();
}

/** Chromium adaptation of ios-behaviour-check — writes qa/prod-ready/ios-check-chromium.txt */
async function runIosCheckChromium(browser) {
  const lines = [];
  const results = [];
  const checkI = (name, ok, detail = '') => {
    results.push({ name, ok, detail });
    lines.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : `  (${detail})`}`);
  };
  const step = async (name, fn) => {
    try {
      await fn();
    } catch (e) {
      checkI(name, false, String(e.message || e).split('\n')[0]);
    }
  };

  const ctx = await browser.newContext({ ...iphone15ProCtx(), serviceWorkers: 'block' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(10000);
  const errs = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errs.push(msg.text());
  });
  page.on('pageerror', (e) => errs.push(String(e.message || e)));

  await boot(page, { theme: 'dark', demo: true });
  await page.evaluate(() => { window.__noReload = 1; });

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
  checkI('tab bar + top bar tappable', covered.length === 0, covered.join(','));

  const small = await page.evaluate(() =>
    [...document.querySelectorAll('#nav .psx-nav-btn, .psx-topbar button')]
      .filter((t) => t.offsetParent !== null)
      .filter((t) => {
        const r = t.getBoundingClientRect();
        return r.width < 44 || r.height < 34;
      })
      .map((t) => t.getAttribute('aria-label') || t.textContent.trim()),
  );
  checkI('hit areas (tabs ≥44pt, pills ≥34pt + slop)', small.length === 0, small.join(','));

  for (const tab of ['home', 'market', 'funds', 'portfolio', 'research', 'settings']) {
    await go(page, tab);
    const m = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      iw: innerWidth,
      docScroll: document.scrollingElement.scrollHeight > innerHeight,
      inner: getComputedStyle(document.querySelector('.psx-screen.active') || document.body).overflowY,
    }));
    checkI(`no sideways overflow · ${tab}`, m.sw <= m.iw + 1, `${m.sw} > ${m.iw}`);
    checkI(`document scrolls (no inner scroller) · ${tab}`, m.docScroll && m.inner === 'visible', JSON.stringify(m));
  }

  checkI(
    'programmatic scroll lands instantly',
    await page.evaluate(() => {
      window.scrollTo(0, 300);
      const y = window.scrollY;
      window.scrollTo(0, 0);
      return y >= 250;
    }),
  );

  await step('navigation by tapping', async () => {
    await go(page, 'home');
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(200);
    await page.locator('#nav .psx-nav-btn[data-tab="portfolio"]').tap();
    await page.waitForTimeout(700);
    const nav = await page.evaluate(() => ({ y: scrollY, tab: Navigation.current(), marker: window.__noReload }));
    checkI('tab tap navigates (no reload)', nav.tab === 'portfolio' && nav.marker === 1, JSON.stringify(nav));
    checkI('new screen opens at top', nav.y === 0, `scrollY ${nav.y}`);
  });

  let smallInputs = 0;
  await step('sheet flow', async () => {
    await go(page, 'portfolio');
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
    if (sellCount === 0) throw new Error('no Sell buttons');
    await page.locator('#screen-portfolio .lc-link-btn--sell').nth(Math.max(0, idx)).tap();
    await page.locator('#bottom-sheet.open .bs-panel').waitFor({ timeout: 8000 });
    await page.waitForTimeout(300);
    const locked = await page.evaluate(() => document.body.style.position);
    smallInputs = await page.evaluate(() =>
      [...document.querySelectorAll('#bottom-sheet input, #bottom-sheet select, #bottom-sheet textarea')]
        .filter((el) => el.offsetParent !== null && parseFloat(getComputedStyle(el).fontSize) < 16).length,
    );
    await page.locator('#bottom-sheet .bs-bar-cancel').tap();
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => scrollY);
    checkI('page locked behind sheet', locked === 'fixed', `body position "${locked}"`);
    checkI('sheet keeps scroll position', Math.abs(after - before) < 4, `before ${before} after ${after}`);
  });
  checkI('inputs ≥16px (no zoom-on-focus)', smallInputs === 0, `${smallInputs} small`);

  await step('sheet chips', async () => {
    await page.evaluate(() => App.openAddTransaction('BUY'));
    await page.locator('#bottom-sheet.open .type-btn[data-type="SELL"]').tap();
    const on = await page.evaluate(() => document.querySelector('.type-btn[data-type="SELL"]')?.classList.contains('active'));
    checkI('sheet chip tap selects', on);
    await page.evaluate(() => App.closeBottomSheet());
  });
  checkI('no reload during session', (await page.evaluate(() => window.__noReload)) === 1);

  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  checkI('SW: no auto skipWaiting/clients.claim', !/^\s*self\.skipWaiting\(\);|clients\.claim\(\)/m.test(sw));

  if (errs.length) {
    checkI('no console errors during ios-check', false, errs.slice(0, 5).join(' | '));
  } else {
    checkI('no console errors during ios-check', true);
  }

  await ctx.close();
  const fail = results.filter((r) => !r.ok).length;
  const pass = results.filter((r) => r.ok).length;
  const header = [
    `engine=chromium`,
    `device=iPhone 15 Pro metrics (defaultBrowserType removed)`,
    `base=${BASE}`,
    `pass=${pass} fail=${fail}`,
    '',
  ];
  const text = [...header, ...lines].join('\n') + '\n';
  fs.writeFileSync(path.join(OUT, 'ios-check-chromium.txt'), text);
  return { pass, fail, results, lines };
}

async function runCoreFlows(page) {
  // Open add transaction sheet
  await go(page, 'home');
  await page.evaluate(() => App.openAddTransaction('BUY'));
  await page.locator('#bottom-sheet.open').waitFor({ timeout: 8000 });
  const open = await page.evaluate(() => document.getElementById('bottom-sheet')?.classList.contains('open'));
  check('core: open add transaction sheet', open);
  if (!open) finding('high', 'home', '#bottom-sheet', 'openAddTransaction did not open sheet');

  // Esc closes
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  const closed = await page.evaluate(() => !document.getElementById('bottom-sheet')?.classList.contains('open'));
  check('core: Esc closes add sheet', closed);
  if (!closed) {
    finding('high', 'home', '#bottom-sheet', 'Escape did not close bottom sheet');
    await page.evaluate(() => App.closeBottomSheet?.());
  }

  // Settings theme toggle
  await go(page, 'settings');
  await page.waitForTimeout(400);
  const before = await page.evaluate(() => document.body.getAttribute('data-theme') || 'dark');
  const target = before === 'dark' ? 'light' : 'dark';
  const themeBtn = page.locator(`.os-theme-btn[data-action="Settings._setTheme"][data-tab="${target}"]`);
  if (await themeBtn.count()) {
    await themeBtn.click();
    await page.waitForTimeout(300);
  } else {
    await page.evaluate((t) => Settings._setTheme(t), target);
    await page.waitForTimeout(300);
  }
  const after = await page.evaluate(() => document.body.getAttribute('data-theme') || 'dark');
  check('core: settings theme toggle', after === target, `before=${before} after=${after} want=${target}`);
  if (after !== target) {
    finding('high', 'settings', `.os-theme-btn[data-tab="${target}"]`, `theme toggle failed: stayed ${after}`);
  }
}

async function main() {
  console.log(`prod-ready-audit BASE=${BASE}`);
  console.log(`Chrome: ${fs.existsSync(CHROME) ? CHROME : '(playwright default)'}`);

  const { browser, owned } = await launchChrome();

  // --- iOS check (chromium) ---
  console.log('Running ios-check (chromium)…');
  const ios = await runIosCheckChromium(browser);
  for (const r of ios.results) {
    if (!r.ok) finding('high', 'ios-check', '(suite)', r.name + (r.detail ? `: ${r.detail}` : ''));
  }

  // --- CSP / HTTP>=400 pass (no bypassCSP) ---
  console.log('Recording CSP violations + HTTP >=400 (non-bypassed)…');
  await collectCspPass(browser);

  // --- Demo profile: visit all VALID screens at 390x844 dark ---
  console.log('Scanning VALID screens (demo)…');
  {
    const ctx = await browser.newContext({
      ...iphone15ProCtx(),
      viewport: { width: 390, height: 844 },
      serviceWorkers: 'block',
    });
    const page = await ctx.newPage();
    attachHttpRecorder(page, 'demo-scan');
    attachCspConsole(page, 'demo-scan');
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push({ screen: 'demo-scan', text: msg.text() });
    });
    page.on('pageerror', (e) => consoleErrors.push({ screen: 'demo-scan', text: String(e.message || e) }));
    await boot(page, { theme: 'dark', demo: true });

    for (const tab of VALID) {
      try {
        await go(page, tab);
        await scanScreen(page, tab, 'demo');
      } catch (e) {
        finding('high', tab, 'Navigation.go', `failed to open: ${String(e.message || e).split('\n')[0]}`, { profile: 'demo' });
      }
    }

    await runCoreFlows(page);
    await ctx.close();
  }

  // --- Axe on dedicated bypassCSP context (does not affect CSP recording) ---
  console.log('Running axe (bypassCSP context only)…');
  try {
    await runAxeIfPresent(browser, 'home');
  } catch (e) {
    check('axe-core run', false, String(e.message || e).split('\n')[0]);
  }

  // --- Empty profile scan (subset + home/portfolio) ---
  console.log('Scanning empty profile…');
  {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      serviceWorkers: 'block',
    });
    const page = await ctx.newPage();
    attachHttpRecorder(page, 'empty-scan');
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push({ screen: 'empty-scan', text: msg.text() });
    });
    await boot(page, { theme: 'light', demo: false });
    for (const tab of ['home', 'market', 'funds', 'portfolio', 'research', 'more', 'settings', 'transactions']) {
      try {
        await go(page, tab);
        await scanScreen(page, tab, 'empty');
      } catch (e) {
        finding('high', tab, 'Navigation.go', `empty profile failed: ${String(e.message || e).split('\n')[0]}`, { profile: 'empty' });
      }
    }
    await maybeShot(page, 'empty-390-light-home');
    await go(page, 'portfolio');
    await maybeShot(page, 'empty-390-light-portfolio');
    await ctx.close();
  }

  // --- Representative screenshots across viewports (≤40) ---
  console.log('Capturing screenshots…');
  const shotPlan = [
    // phone 375 light+dark
    { vp: '375x812', theme: 'light', screens: ['home', 'portfolio'] },
    { vp: '375x812', theme: 'dark', screens: ['home', 'settings'] },
    // phone 390 light+dark (primary)
    { vp: '390x844', theme: 'light', screens: ['home', 'market', 'funds', 'portfolio', 'research', 'settings', 'add'] },
    { vp: '390x844', theme: 'dark', screens: ['home', 'portfolio', 'settings', 'add', 'more'] },
    // phone 430
    { vp: '430x932', theme: 'light', screens: ['home', 'portfolio'] },
    { vp: '430x932', theme: 'dark', screens: ['home', 'market'] },
    // tablet / desktop
    { vp: '744x1133', theme: 'dark', screens: ['home', 'portfolio', 'settings'] },
    { vp: '1180x820', theme: 'dark', screens: ['home', 'portfolio', 'settings'] },
    { vp: '1440x900', theme: 'dark', screens: ['home', 'portfolio'] },
    // extra VALID tools at 390 dark (fill remaining budget)
    {
      vp: '390x844',
      theme: 'dark',
      screens: [
        'global', 'commodities', 'announcements', 'zakat', 'import', 'screener',
        'watchlist', 'dividends', 'calendar', 'transactions', 'signals',
        'risk-audit', 'insights', 'comparison', 'performance', 'journal',
        'pilot-tools', 'paper-trade',
      ],
    },
  ];

  for (const plan of shotPlan) {
    if (shotCount >= MAX_SHOTS) break;
    const vp = VIEWPORTS.find((v) => v.id === plan.vp);
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.width <= 430 ? 2 : 1,
      isMobile: vp.width <= 430,
      hasTouch: vp.width <= 744,
      serviceWorkers: 'block',
    });
    const page = await ctx.newPage();
    await boot(page, { theme: plan.theme, demo: true });
    for (const screen of plan.screens) {
      if (shotCount >= MAX_SHOTS) break;
      if (screen === 'add') {
        await go(page, 'portfolio');
        await page.evaluate(() => App.openAddTransaction('BUY'));
        await page.waitForTimeout(500);
        await maybeShot(page, `${plan.vp}-${plan.theme}-add`);
        await page.evaluate(() => App.closeBottomSheet?.());
      } else {
        await go(page, screen);
        await maybeShot(page, `${plan.vp}-${plan.theme}-${screen}`);
      }
    }
    await ctx.close();
  }

  // Deduplicate console errors into findings
  const seenErr = new Set();
  for (const e of consoleErrors) {
    const key = `${e.screen}|${e.text}`;
    if (seenErr.has(key)) continue;
    seenErr.add(key);
    // Ignore noisy favicon / third-party
    if (/favicon|Failed to load resource.*404/i.test(e.text) && /favicon/i.test(e.text)) continue;
    finding('medium', e.screen, 'console', e.text.slice(0, 300));
  }

  const seenHttp = new Set();
  for (const h of httpErrors) {
    const key = `${h.status}|${h.url}`;
    if (seenHttp.has(key)) continue;
    seenHttp.add(key);
    finding('medium', h.screen || 'http', h.url, `HTTP ${h.status}`, { status: h.status });
  }

  const seenCsp = new Set();
  for (const v of cspViolations) {
    const key = v.text;
    if (seenCsp.has(key)) continue;
    seenCsp.add(key);
    finding('high', v.screen || 'csp', 'CSP', v.text.slice(0, 300), { source: v.source });
  }

  if (owned) await browser.close();
  else await browser.close().catch(() => {});

  const pass = checks.filter((c) => c.ok).length;
  const fail = checks.filter((c) => !c.ok).length;
  const audit = {
    meta: {
      base: BASE,
      engine: 'chromium',
      chrome: fs.existsSync(CHROME) ? CHROME : 'playwright-default',
      device: 'iPhone 15 Pro metrics (defaultBrowserType removed)',
      generatedAt: new Date().toISOString(),
      screenshotCount: screenshots.length,
      maxShots: MAX_SHOTS,
    },
    iosCheck: { pass: ios.pass, fail: ios.fail },
    checks: { pass, fail, items: checks },
    findings,
    screenshots: screenshots.map((p) => path.relative(ROOT, p)),
    consoleErrors,
    cspViolations,
    httpErrors,
  };
  fs.writeFileSync(path.join(OUT, 'AUDIT-RAW.json'), JSON.stringify(audit, null, 2));

  console.log('\n=== SUMMARY ===');
  console.log(`checks: ${pass} pass / ${fail} fail`);
  console.log(`ios-check: ${ios.pass} pass / ${ios.fail} fail`);
  console.log(`findings: ${findings.length}`);
  console.log(`cspViolations: ${cspViolations.length}`);
  console.log(`httpErrors (>=400): ${httpErrors.length}`);
  console.log(`screenshots: ${screenshots.length}`);
  console.log(`wrote ${path.join(OUT, 'AUDIT-RAW.json')}`);
  console.log(`wrote ${path.join(OUT, 'ios-check-chromium.txt')}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
