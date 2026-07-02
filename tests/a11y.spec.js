// @ts-check
const { test, expect } = require('@playwright/test');
const { fastGalleryUnlock, hideDemoBanner, prepareGalleryShot } = require('./demo-unlock');

test.describe('LedgerCap accessibility baseline', () => {
  test('shell landmarks and controls', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');
    await fastGalleryUnlock(page);
    await hideDemoBanner(page);
    await prepareGalleryShot(page);

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('.psx-skip-link')).toHaveCount(1);
    await expect(page.locator('#nav[role="tablist"], .psx-bottom-nav[role="tablist"]').first()).toBeVisible();
    await expect(page.locator('#screens[role="main"]')).toBeVisible();
    await expect(page.locator('#lc-currency-toggle')).toBeVisible();
  });

  test('reduced motion CSS present', async ({ page }) => {
    await page.goto('/');
    const reduced = await page.evaluate(() => {
      return [...document.styleSheets].some((sheet) => {
        try {
          return [...sheet.cssRules].some((r) => r.cssText && r.cssText.includes('prefers-reduced-motion'));
        } catch { return false; }
      });
    });
    expect(reduced).toBe(true);
  });
});
