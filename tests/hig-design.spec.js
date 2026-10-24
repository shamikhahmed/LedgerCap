// @ts-check
/**
 * HIG design gate — shell, home, portfolio list, add sheet, settings (light + dark), iPad sidebar.
 * Captures before/after evidence when HIG_SHOTS=<label> (writes build/qa/hig/<label>/).
 */
const { test, expect } = require('@playwright/test');
const path = require('path');
const { waitForNavReady } = require('./helpers/viewport-helpers');

const LABEL = process.env.HIG_SHOTS || '';
const OUT = path.join(__dirname, '..', 'build', 'qa', 'hig', LABEL || 'tmp');

async function shot(page, name) {
  if (!LABEL) return;
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, name + '.png') });
}

async function boot(page, theme) {
  await page.addInitScript((t) => {
    localStorage.setItem('theme', t);
    localStorage.setItem('lc_whats_new_seen', '99');
  }, theme);
  await page.goto('/?demo=1');
  await waitForNavReady(page);
  await page.evaluate(async () => {
    document.getElementById('splash')?.classList.add('hide');
    if (window.__lcEnsureDeferred) await window.__lcEnsureDeferred();
    document.getElementById('proUpgradeModal')?.classList.remove('open');
  });
  await page.waitForTimeout(800);
}

async function go(page, tab) {
  await page.evaluate((t) => {
    if (typeof App !== 'undefined' && App.closeBottomSheet) App.closeBottomSheet();
    Navigation.go(t);
  }, tab);
  await page.waitForTimeout(900);
}

for (const theme of ['dark', 'light']) {
  test.describe(`HIG phone · ${theme}`, () => {
    test.use({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true });

    test(`home, portfolio, add, settings (${theme})`, async ({ page }) => {
      await boot(page, theme);
      await go(page, 'home');
      await shot(page, `phone-${theme}-01-home`);

      const tabs = page.locator('#nav .psx-nav-btn');
      await expect(tabs).toHaveCount(5);
      for (const h of await tabs.evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height))) {
        expect(h).toBeGreaterThanOrEqual(44);
      }

      await go(page, 'portfolio');
      await shot(page, `phone-${theme}-02-portfolio`);

      await page.evaluate(() => App.openAddTransaction('BUY'));
      await page.waitForTimeout(700);
      await shot(page, `phone-${theme}-03-add`);
      await page.evaluate(() => App.closeBottomSheet && App.closeBottomSheet());

      await go(page, 'settings');
      await shot(page, `phone-${theme}-04-settings`);

      await go(page, 'market');
      await shot(page, `phone-${theme}-05-market`);
    });
  });
}

test.describe('HIG iPad · sidebar', () => {
  test.use({ viewport: { width: 1180, height: 820 } });

  test('sidebar shell + home + portfolio', async ({ page }) => {
    await boot(page, 'dark');
    await go(page, 'home');
    await expect(page.locator('#nav-sidebar')).toBeVisible();
    await shot(page, 'ipad-dark-01-home');
    await go(page, 'portfolio');
    await shot(page, 'ipad-dark-02-portfolio');
  });
});
