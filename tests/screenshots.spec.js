// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  dismissOverlays,
  hideDemoBanner,
  fastGalleryUnlock,
  polishGalleryFrame,
  prepareGalleryShot,
} = require('./demo-unlock');

const SHOT_ROOT = path.join(__dirname, '..', 'assets', 'screenshots');
const THEMES = ['dark', 'light'];
const VIEWPORTS = ['mobile', 'desktop'];
const VIEWPORT_SIZES = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1280, height: 900 },
};
const SCROLL_MIN = 180;

const PRIMARY_NAV = [
  { id: 'home', label: 'Wealth hub' },
  { id: 'market', label: 'Stock watch' },
  { id: 'funds', label: 'Funds' },
  { id: 'portfolio', label: 'Portfolio P&L' },
  { id: 'research', label: 'Research analyzer' },
];

const TOOL_SCREENS = [
  { id: 'more', label: 'Tools index' },
  { id: 'global', label: 'Global markets' },
  { id: 'zakat', label: 'Zakat calculator' },
  { id: 'import', label: 'CSV import' },
  { id: 'screener', label: 'Stock screener' },
  { id: 'dividends', label: 'Dividend center' },
  { id: 'calendar', label: 'Wealth calendar' },
  { id: 'watchlist', label: 'Watchlist' },
  { id: 'signals', label: 'Market signals' },
  { id: 'risk-audit', label: 'Risk audit' },
  { id: 'insights', label: 'Insights' },
  { id: 'pilot-tools', label: 'Tax & rebalance' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'performance', label: 'Performance' },
  { id: 'journal', label: 'Journal' },
  { id: 'settings', label: 'Settings (full)' },
];

const SETTINGS_SECTIONS = [
  { id: 'set-lang', label: 'Settings — language', text: 'Language' },
  { id: 'set-theme', label: 'Settings — theme', text: 'Toggle theme' },
  { id: 'set-number', label: 'Settings — number format', text: 'Number format' },
  { id: 'set-display', label: 'Settings — display & live', text: 'Display & live data' },
  { id: 'set-export', label: 'Settings — tax export', text: 'Tax & audit export' },
  { id: 'set-profile', label: 'Settings — investor profile', text: 'Investor Profile' },
  { id: 'set-cash', label: 'Settings — cash & manual', text: 'Cash & manual assets' },
  { id: 'set-assumptions', label: 'Settings — assumptions', text: 'Return Assumptions' },
  { id: 'set-zakat', label: 'Settings — zakat block', text: 'Zakat Calculator' },
  { id: 'set-live-prices', label: 'Settings — live prices', text: 'Live Prices' },
  { id: 'set-telegram', label: 'Settings — telegram', text: 'Telegram' },
  { id: 'set-nav', label: 'Settings — fund NAV', text: 'Manual Fund NAV' },
  { id: 'set-demo', label: 'Settings — try demo', text: 'Try demo' },
  { id: 'set-pin', label: 'Settings — security PIN', text: 'Security & PIN' },
  { id: 'set-data', label: 'Settings — data management', text: 'Data Management' },
  { id: 'set-pilot', label: 'Settings — portfolio pilot', text: 'Portfolio Pilot' },
  { id: 'set-about', label: 'Settings — about', text: 'About' },
];

const RESEARCH_MODES = [
  { id: 'research-stock', label: 'Research — stock mode', mode: 'stock' },
];

const SCROLL_BOTTOM_SCREENS = [
  { id: 'home-bottom', tab: 'home', label: 'Wealth hub (bottom)' },
  { id: 'market-bottom', tab: 'market', label: 'Stock watch (bottom)' },
  { id: 'funds-bottom', tab: 'funds', label: 'Funds (bottom)' },
  { id: 'portfolio-bottom', tab: 'portfolio', label: 'Portfolio (bottom)' },
  { id: 'research-bottom', tab: 'research', label: 'Research (bottom)' },
  { id: 'global-bottom', tab: 'global', label: 'Global markets (bottom)' },
  { id: 'zakat-bottom', tab: 'zakat', label: 'Zakat (bottom)' },
  { id: 'dividends-bottom', tab: 'dividends', label: 'Dividends (bottom)' },
  { id: 'transactions-bottom', tab: 'transactions', label: 'Transactions (bottom)' },
  { id: 'settings-bottom', tab: 'settings', label: 'Settings (bottom)' },
  { id: 'signals-bottom', tab: 'signals', label: 'Signals (bottom)' },
  { id: 'calendar-bottom', tab: 'calendar', label: 'Calendar (bottom)' },
  { id: 'watchlist-bottom', tab: 'watchlist', label: 'Watchlist (bottom)' },
  { id: 'pilot-bottom', tab: 'pilot-tools', label: 'Pilot tools (bottom)' },
  { id: 'insights-bottom', tab: 'insights', label: 'Insights (bottom)' },
  { id: 'journal-bottom', tab: 'journal', label: 'Journal (bottom)' },
  { id: 'performance-bottom', tab: 'performance', label: 'Performance (bottom)' },
  { id: 'comparison-bottom', tab: 'comparison', label: 'Comparison (bottom)' },
  { id: 'risk-bottom', tab: 'risk-audit', label: 'Risk audit (bottom)' },
  { id: 'import-bottom', tab: 'import', label: 'Import (bottom)' },
  { id: 'screener-bottom', tab: 'screener', label: 'Screener (bottom)' },
  { id: 'more-bottom', tab: 'more', label: 'Tools index (bottom)' },
];

const SHEET_SHOTS = [
  { id: 'add-transaction', label: 'Sheet — add transaction', call: 'App.openAddTransaction()' },
  { id: 'add-portfolio', label: 'Sheet — add portfolio', call: 'App.openAddPortfolio()' },
  { id: 'price-alert', label: 'Sheet — price alert', call: "App.openPriceAlert('LUCK')" },
  { id: 'watchlist-add', label: 'Sheet — watchlist add', call: 'Watchlist.openAdd()' },
  { id: 'journal-new', label: 'Sheet — journal entry', call: 'Journal.openNew()' },
  { id: 'command-palette', label: 'Command palette', call: 'LcPolish.openCmdk()', desktopOnly: true },
  { id: 'pin-lock', label: 'PIN lock screen', pinCapture: true },
  { id: 'csv-import-step', label: 'CSV import — upload step', tab: 'import', importStep: true },
  { id: 'pro-upgrade', label: 'Support modal', call: 'openProUpgrade()' },
];

const MARKETING_PAGES = [
  { id: 'landing', label: 'Marketing — landing', path: '/landing.html' },
  { id: 'pitch', label: 'Marketing — pitch', path: '/pitch.html' },
  { id: 'presentation', label: 'Marketing — presentation', path: '/presentation.html' },
  { id: 'changelog', label: 'Marketing — changelog', path: '/changelog.html' },
  { id: 'privacy', label: 'Marketing — privacy', path: '/privacy.html' },
  { id: 'widget-glance', label: 'Widget — glance', path: '/widget-glance.html' },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function shot(page, filePath) {
  ensureDir(path.dirname(filePath));
  await page.screenshot({ path: filePath, fullPage: false });
}

function md5(filePath) {
  return crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('hex');
}

function ensureItem(section, id, label) {
  let item = section.items.find((i) => i.id === id);
  if (!item) {
    item = { id, label, files: {}, scroll: {} };
    section.items.push(item);
  }
  return item;
}

function setShotRef(item, theme, viewport, relPath, scroll = false) {
  const field = scroll ? 'scroll' : 'files';
  const cur = item[field][theme];
  if (!cur || typeof cur === 'string') {
    item[field][theme] = typeof cur === 'string' ? { mobile: cur } : {};
  }
  item[field][theme][viewport] = relPath;
}

function pickThemePath(files, theme, viewport) {
  const bucket = files?.[theme];
  if (!bucket) return '';
  if (typeof bucket === 'string') return bucket;
  return bucket[viewport] || '';
}

async function setGalleryViewport(page, viewport) {
  await page.setViewportSize(VIEWPORT_SIZES[viewport]);
  await page.evaluate(() => window.dispatchEvent(new Event('resize')));
  await page.waitForTimeout(300);
  if (viewport === 'desktop') {
    await expect(page.locator('.psx-sidebar')).toBeVisible({ timeout: 8000 });
  } else {
    await expect(page.locator('.psx-bottom-nav, #nav.psx-bottom-nav')).toBeVisible({ timeout: 5000 });
  }
}

async function applyTheme(page, theme) {
  await page.evaluate((t) => {
    if (typeof App !== 'undefined' && App.applyTheme) App.applyTheme(t);
    else if (typeof Navigation !== 'undefined') Navigation.applyTheme(t);
    localStorage.setItem('theme', t);
    document.documentElement.setAttribute('data-theme', t);
    document.body.setAttribute('data-theme', t);
  }, theme);
  await page.waitForFunction((t) => document.body.getAttribute('data-theme') === t, theme, { timeout: 5000 });
  await page.waitForTimeout(250);
}

async function applyMarketingTheme(page, theme) {
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t);
    document.body.setAttribute('data-theme', t);
    if (t === 'light') document.body.classList.add('light');
    else document.body.classList.remove('light');
  }, theme);
  await page.waitForTimeout(200);
}

async function verifyThemeBeforeShot(page, theme) {
  const ok = await page.evaluate((t) => document.body.getAttribute('data-theme') === t, theme);
  if (!ok) throw new Error(`Theme mismatch before shot: wanted ${theme}`);
}

async function scrollActiveTop(page) {
  await page.evaluate(() => {
    const el = document.querySelector('#screens .psx-screen.active');
    if (el) el.scrollTop = 0;
  });
}

async function maybeScrollShot(page, relPath, item, theme, viewport) {
  const overflow = await page.evaluate(() => {
    const el = document.querySelector('#screens .psx-screen.active');
    if (!el) return 0;
    return el.scrollHeight - el.clientHeight;
  });
  if (overflow < SCROLL_MIN) return null;
  await page.evaluate(() => {
    const el = document.querySelector('#screens .psx-screen.active');
    if (el) el.scrollTop = el.scrollHeight;
  });
  await page.waitForTimeout(250);
  const scrollRel = relPath.replace(/\.png$/, '-scroll.png');
  await shot(page, path.join(SHOT_ROOT, scrollRel));
  setShotRef(item, theme, viewport, scrollRel, true);
  return scrollRel;
}

async function goScreen(page, tabId) {
  await prepareGalleryShot(page);
  await hideDemoBanner(page);
  await page.evaluate((id) => Navigation.go(id), tabId);
  await expect(page.locator(`#screen-${tabId}.active`)).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(350);
}

async function captureViewport(page, theme, viewport, section, id, label, relPath, allowScroll = true) {
  await scrollActiveTop(page);
  await verifyThemeBeforeShot(page, theme);
  await polishGalleryFrame(page);
  await page.waitForTimeout(150);
  await shot(page, path.join(SHOT_ROOT, relPath));
  const item = ensureItem(section, id, label);
  setShotRef(item, theme, viewport, relPath, false);
  if (allowScroll) await maybeScrollShot(page, relPath, item, theme, viewport);
}

async function scrollSettingsSection(page, text) {
  await goScreen(page, 'settings');
  await page.evaluate((needle) => {
    const heads = [...document.querySelectorAll('#screen-settings .sec-head, #screen-settings .sec-title')];
    const el = heads.find((h) => h.textContent && h.textContent.includes(needle));
    el?.scrollIntoView({ block: 'start', behavior: 'instant' });
    const screen = document.querySelector('#screen-settings');
    if (screen && el) screen.scrollTop = Math.max(0, el.offsetTop - 8);
  }, text);
  await page.waitForTimeout(300);
}

async function captureScrollBottom(page, theme, viewport, section, screen) {
  await goScreen(page, screen.tab);
  await page.evaluate(() => {
    const el = document.querySelector('#screens .psx-screen.active');
    if (el) el.scrollTop = el.scrollHeight;
  });
  await page.waitForTimeout(250);
  const rel = `${theme}/${viewport}/scroll-bottom/${screen.id}.png`;
  await verifyThemeBeforeShot(page, theme);
  await polishGalleryFrame(page);
  await shot(page, path.join(SHOT_ROOT, rel));
  setShotRef(ensureItem(section, screen.id, screen.label), theme, viewport, rel, false);
}

async function captureSheet(page, theme, viewport, section, sheet, relPath) {
  await prepareGalleryShot(page, { preserveOverlays: true });
  await hideDemoBanner(page);
  await verifyThemeBeforeShot(page, theme);

  if (sheet.pinCapture) {
    await goScreen(page, 'home');
    await page.evaluate(() => {
      const root = document.getElementById('pin-lock');
      if (!root) return;
      root.classList.remove('hidden');
      root.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lc-pin-active');
      const host = document.getElementById('pin-logo-host');
      if (host) host.innerHTML = '<img src="assets/icons/icon-mark.svg" alt="" width="48" height="48">';
      const dots = document.getElementById('pin-dots');
      if (dots) {
        dots.innerHTML = Array.from({ length: 6 }, (_, i) =>
          `<span class="lc-pin-dot${i < 2 ? ' lc-pin-dot--on' : ''}"></span>`
        ).join('');
      }
      const pad = document.getElementById('pin-pad');
      if (pad && !pad.dataset.built) {
        pad.dataset.built = '1';
        const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];
        pad.innerHTML = keys.map((k) => {
          if (!k) return '<span class="lc-pin-key lc-pin-key--spacer"></span>';
          if (k === 'del') return '<button type="button" class="lc-pin-key lc-pin-key--del" aria-label="Delete">Del</button>';
          return `<button type="button" class="lc-pin-key" data-key="${k}">${k}</button>`;
        }).join('');
      }
    });
    await expect(page.locator('#pin-lock:not(.hidden)')).toBeVisible({ timeout: 5000 });
  } else if (sheet.importStep) {
    await goScreen(page, 'import');
    await page.evaluate(() => {
      const ta = document.getElementById('csv-input');
      if (ta) ta.value = 'date,symbol,type,quantity,price,broker\n2026-01-15,LUCK,BUY,100,450.5,CDC';
    });
  } else {
    await goScreen(page, 'home');
    await page.evaluate((call) => { eval(call); }, sheet.call);
    if (sheet.id === 'command-palette') {
      await expect(page.locator('#lc-cmdk:not(.hidden)')).toBeVisible({ timeout: 10000 });
    } else if (sheet.id === 'pro-upgrade') {
      await expect(page.locator('#proUpgradeModal.open')).toBeVisible({ timeout: 10000 });
    } else {
      await expect(page.locator('#bottom-sheet.open')).toBeVisible({ timeout: 10000 });
    }
  }

  await page.waitForTimeout(300);
  await polishGalleryFrame(page);
  await shot(page, path.join(SHOT_ROOT, relPath));
  setShotRef(ensureItem(section, sheet.id, sheet.label), theme, viewport, relPath, false);
  if (sheet.pinCapture) {
    await page.evaluate(() => {
      const root = document.getElementById('pin-lock');
      if (root) { root.classList.add('hidden'); root.setAttribute('aria-hidden', 'true'); }
      document.body.classList.remove('lc-pin-active');
      if (typeof PinVault !== 'undefined') PinVault.unlock(false);
    });
  } else {
    await dismissOverlays(page);
  }
}

test.describe('LedgerCap screen gallery', () => {
  test.skip(() => process.env.CAPTURE_SCREENSHOTS !== '1', 'set CAPTURE_SCREENSHOTS=1 to regenerate');

  test('capture all screens for gallery', async ({ page }) => {
    test.setTimeout(3600000);

    const manifest = { generatedAt: new Date().toISOString(), themes: THEMES, viewports: VIEWPORTS, sections: [] };
    const sectionMap = {};
    const getSection = (id, title) => {
      if (!sectionMap[id]) {
        sectionMap[id] = { id, title, label: title, items: [] };
        manifest.sections.push(sectionMap[id]);
      }
      return sectionMap[id];
    };

    await fastGalleryUnlock(page);

    for (const theme of THEMES) {
      for (const viewport of VIEWPORTS) {
        await setGalleryViewport(page, viewport);
        await applyTheme(page, theme);
        await hideDemoBanner(page);

        const primarySection = getSection('primary', 'Primary navigation');
        for (const screen of PRIMARY_NAV) {
          await goScreen(page, screen.id);
          await captureViewport(page, theme, viewport, primarySection, screen.id, screen.label, `${theme}/${viewport}/primary/${screen.id}.png`);
        }

        await goScreen(page, 'research');
        await page.evaluate(() => { if (typeof Research !== 'undefined') Research.setMode('portfolio'); });
        await page.waitForTimeout(400);
        await captureViewport(page, theme, viewport, primarySection, 'research-portfolio', 'Portfolio analysis', `${theme}/${viewport}/primary/research-portfolio.png`);

        for (const rm of RESEARCH_MODES) {
          await goScreen(page, 'research');
          await page.evaluate((mode) => { if (typeof Research !== 'undefined') Research.setMode(mode); }, rm.mode);
          await page.waitForTimeout(400);
          await captureViewport(page, theme, viewport, primarySection, rm.id, rm.label, `${theme}/${viewport}/primary/${rm.id}.png`);
        }

        const toolsSection = getSection('tools', 'Tools & modules');
        for (const screen of TOOL_SCREENS) {
          await goScreen(page, screen.id);
          await captureViewport(page, theme, viewport, toolsSection, screen.id, screen.label, `${theme}/${viewport}/tools/${screen.id}.png`);
        }

        const scrollSection = getSection('scroll-bottom', 'Scroll — page bottom');
        for (const sb of SCROLL_BOTTOM_SCREENS) {
          await captureScrollBottom(page, theme, viewport, scrollSection, sb);
        }

        const settingsSection = getSection('settings-sections', 'Settings sections');
        for (const sec of SETTINGS_SECTIONS) {
          await scrollSettingsSection(page, sec.text);
          await captureViewport(page, theme, viewport, settingsSection, sec.id, sec.label, `${theme}/${viewport}/settings/${sec.id}.png`, false);
        }

        const sheetsSection = getSection('sheets', 'Sheets & forms');
        for (const sheet of SHEET_SHOTS) {
          if (sheet.desktopOnly && viewport === 'mobile') continue;
          await captureSheet(page, theme, viewport, sheetsSection, sheet, `${theme}/${viewport}/sheets/${sheet.id}.png`);
        }

        const systemSection = getSection('system', 'System chrome');
        await goScreen(page, 'home');
        await page.evaluate(() => {
          const splash = document.getElementById('splash');
          if (splash) { splash.classList.remove('hide'); splash.style.display = ''; }
        });
        await captureViewport(page, theme, viewport, systemSection, 'splash', 'Splash screen', `${theme}/${viewport}/system/splash.png`, false);
        await page.evaluate(() => document.getElementById('splash')?.classList.add('hide'));

        await page.evaluate(() => {
          if (typeof Onboarding !== 'undefined' && Onboarding.mount) Onboarding.mount();
        });
        await page.waitForTimeout(400);
        const hasOnboarding = await page.locator('#onboarding').count();
        if (hasOnboarding) {
          await captureViewport(page, theme, viewport, systemSection, 'onboarding', 'Onboarding wizard', `${theme}/${viewport}/system/onboarding.png`, false);
          await page.evaluate(() => document.getElementById('onboarding')?.remove());
        }

        await page.evaluate(() => {
          const b = document.getElementById('demo-banner');
          if (b) { b.classList.remove('hidden'); b.style.display = 'flex'; }
        });
        await captureViewport(page, theme, viewport, systemSection, 'demo-banner', 'Demo mode banner', `${theme}/${viewport}/system/demo-banner.png`, false);
        await hideDemoBanner(page);

        const marketingSection = getSection('marketing', 'Marketing surfaces');
        for (const m of MARKETING_PAGES) {
          await page.goto(m.path);
          await page.waitForLoadState('domcontentloaded');
          await applyMarketingTheme(page, theme);
          await polishGalleryFrame(page);
          await shot(page, path.join(SHOT_ROOT, `${theme}/${viewport}/marketing/${m.id}.png`));
          setShotRef(ensureItem(marketingSection, m.id, m.label), theme, viewport, `${theme}/${viewport}/marketing/${m.id}.png`, false);
        }

        await page.goto('/?demo=1');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForFunction(() => typeof Navigation !== 'undefined', { timeout: 30000 });
        await hideDemoBanner(page);
        await prepareGalleryShot(page);
        await setGalleryViewport(page, viewport);
        await applyTheme(page, theme);
      }
    }

    fs.writeFileSync(path.join(SHOT_ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2));

    const home = manifest.sections.find((s) => s.id === 'primary')?.items.find((i) => i.id === 'home');
    const homeDarkMob = pickThemePath(home?.files, 'dark', 'mobile');
    const homeLightMob = pickThemePath(home?.files, 'light', 'mobile');
    if (homeDarkMob && homeLightMob) {
      const darkPath = path.join(SHOT_ROOT, homeDarkMob);
      const lightPath = path.join(SHOT_ROOT, homeLightMob);
      expect(md5(darkPath)).not.toBe(md5(lightPath));
      fs.copyFileSync(darkPath, path.join(SHOT_ROOT, 'ledgercap-1-dark.png'));
      fs.copyFileSync(lightPath, path.join(SHOT_ROOT, 'ledgercap-1-light.png'));
    }

    const screenCount = manifest.sections.reduce((n, s) => n + (s.items?.length || 0), 0);
    expect(screenCount).toBeGreaterThanOrEqual(80);
  });
});
