// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('LedgerCap smoke', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('loads shell without fatal errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toBeVisible();
    await page.waitForTimeout(800);
    const fatal = errors.filter(e => !/serviceWorker|ResizeObserver|favicon/i.test(e));
    expect(fatal).toEqual([]);
  });

  test('manifest link present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
  });

  test('intelligence tab renders and holdings opens transaction log', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => typeof window.Navigation !== 'undefined');
    await page.waitForTimeout(800);

    await page.locator('#nav [data-tab="intelligence"]').click();
    await expect(page.locator('#screen-intelligence.active')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Portfolio Intelligence')).toBeVisible();

    await page.locator('#nav [data-tab="holdings"]').click();
    await expect(page.locator('#screen-holdings.active')).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: /View log/i }).click();
    await expect(page.locator('#screen-transactions.active')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: /CSV/i })).toBeVisible();
  });

  test('nine primary nav tabs present on mobile', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => typeof window.Navigation !== 'undefined');
    const tabs = page.locator('#nav .nav-tab');
    await expect(tabs).toHaveCount(9);
    await expect(page.locator('#nav [data-tab="dashboard"]')).toBeVisible();
    await expect(page.locator('#nav [data-tab="journal"]')).toBeVisible();
  });
});
