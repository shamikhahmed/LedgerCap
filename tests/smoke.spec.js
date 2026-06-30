// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('LedgerCap smoke', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('loads shell without fatal errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body.psx-app')).toBeVisible();
    await page.waitForTimeout(800);
    const fatal = errors.filter(e => !/serviceWorker|ResizeObserver|favicon/i.test(e));
    expect(fatal).toEqual([]);
  });

  test('manifest link present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
  });

  test('portfolio intel in research tab is accessible', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => typeof window.Navigation !== 'undefined');
    await page.waitForTimeout(800);

    await page.locator('#nav [data-tab="research"]').click();
    await page.evaluate(() => Research.setMode('portfolio'));
    await expect(page.locator('#screen-research.active')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Portfolio analysis')).toBeVisible();
  });

  test('five primary nav tabs present on mobile', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => typeof window.Navigation !== 'undefined');
    const tabs = page.locator('#nav .psx-nav-btn');
    await expect(tabs).toHaveCount(5);
    await expect(page.locator('#nav [data-tab="home"]')).toBeVisible();
    await expect(page.locator('#nav [data-tab="market"]')).toBeVisible();
    await expect(page.locator('#nav [data-tab="funds"]')).toBeVisible();
    await expect(page.locator('#nav [data-tab="portfolio"]')).toBeVisible();
    await expect(page.locator('#nav [data-tab="research"]')).toBeVisible();
  });

  test('research shows plain-English analyzer for demo stock', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForFunction(() => typeof window.ResearchService !== 'undefined');
    await page.waitForTimeout(800);
    await page.locator('#nav [data-tab="research"]').click();
    await expect(page.getByText('Plain-English verdict')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.psx-metric-l').filter({ hasText: 'Smart rating' })).toBeVisible();
  });

  test('comparison tab renders side-by-side holdings', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForFunction(() => typeof window.Comparison !== 'undefined');
    await page.waitForTimeout(800);
    await page.evaluate(() => Navigation.go('comparison'));
    await expect(page.locator('#screen-comparison.active')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Side by side')).toBeVisible();
    await expect(page.locator('.comp-grid')).toBeVisible();
  });

  test('dividend center reachable via hub tools', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForFunction(() => typeof window.DividendService !== 'undefined');
    await page.waitForTimeout(800);
    await page.locator('#nav [data-tab="home"]').click();
    await page.evaluate(() => Navigation.go('dividends'));
    await expect(page.locator('#screen-dividends.active')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Income center')).toBeVisible();
    await expect(page.getByText('Portfolio Yield')).toBeVisible();
  });

  test('market stock watch renders sector table', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForFunction(() => typeof window.Market !== 'undefined');
    await page.waitForTimeout(800);
    await page.locator('#nav [data-tab="market"]').click();
    await expect(page.locator('#screen-market.active')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#screen-market.active h1')).toHaveText('Stock Watch');
    await expect(page.locator('.psx-table tbody tr').first()).toBeVisible();
  });
});
