// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('LedgerCap smoke', () => {
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

  test('reports tab renders and transactions has CSV export', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => typeof window.Navigation !== 'undefined');
    await page.waitForTimeout(800);

    await page.locator('[data-tab="reports"]').click();
    await expect(page.locator('#screen-reports.active')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Reports & Insights')).toBeVisible();
    await expect(page.getByText('Monthly snapshot')).toBeVisible();

    await page.locator('[data-tab="transactions"]').click();
    await expect(page.locator('#screen-transactions.active')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: /CSV/i })).toBeVisible();
  });
});
