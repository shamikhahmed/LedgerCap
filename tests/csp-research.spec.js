// @ts-check
const { test, expect } = require('@playwright/test');
const { waitForNavReady } = require('./helpers/viewport-helpers');

/** Screens from Navigation VALID (prod-ready audit inventory). */
const ALL_SCREENS = [
  'home', 'market', 'funds', 'portfolio', 'research', 'more', 'global', 'commodities',
  'announcements', 'zakat', 'import', 'screener', 'watchlist', 'dividends', 'calendar',
  'settings', 'transactions', 'signals', 'risk-audit', 'insights', 'comparison',
  'performance', 'journal', 'pilot-tools', 'paper-trade',
];

test.describe('CSP + Research search', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('typing in Research search filters results', async ({ page }) => {
    await page.goto('/?demo=1');
    await waitForNavReady(page);
    await page.locator('#nav [data-tab="research"]').click();
    await expect(page.locator('#screen-research.active')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#rt-search')).toBeVisible();

    await page.locator('#rt-search').fill('OGDC');
    await expect(page.locator('#rt-search-results .lc-search-hit').first()).toBeVisible({ timeout: 5000 });
    const texts = await page.locator('#rt-search-results .lc-search-hit strong').allTextContents();
    expect(texts.length).toBeGreaterThan(0);
    expect(texts.some((t) => /^OGDC$/i.test(t.trim()))).toBeTruthy();
  });

  test('no CSP violations while visiting every page', async ({ page }) => {
    const csp = [];
    page.on('console', (msg) => {
      const t = msg.text();
      if (/Content Security Policy|CSP directive|Refused to execute inline/i.test(t)) csp.push(t);
    });
    page.on('pageerror', (e) => {
      const t = String(e.message || e);
      if (/Content Security Policy|CSP/i.test(t)) csp.push(t);
    });

    await page.goto('/?demo=1');
    await waitForNavReady(page);

    for (const tab of ALL_SCREENS) {
      await page.evaluate((t) => {
        if (typeof App !== 'undefined' && App.closeBottomSheet) App.closeBottomSheet();
        Navigation.go(t);
      }, tab);
      await page.waitForTimeout(350);
    }

    expect(csp, `CSP violations:\n${csp.slice(0, 8).join('\n')}`).toEqual([]);
  });
});
