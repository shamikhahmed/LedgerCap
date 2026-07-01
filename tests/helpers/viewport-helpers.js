// @ts-check
/** LedgerCap viewport contract helpers (vendored — was capricorn-tooling). */

/**
 * @param {import('@playwright/test').Page} page
 * @param {'mobile' | 'desktop'} mode
 */
async function resize(page, mode) {
  if (mode === 'mobile') {
    await page.setViewportSize({ width: 375, height: 812 });
  } else {
    await page.setViewportSize({ width: 1280, height: 900 });
  }
  await page.waitForTimeout(200);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Expect} expect
 */
async function assertLedgerCapMobile(page, expect) {
  await expect(page.locator('.psx-bottom-nav')).toBeVisible();
  await expect(page.locator('.psx-sidebar')).toBeHidden();
  await expect(page.locator('#nav .psx-nav-btn')).toHaveCount(5);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Expect} expect
 */
async function assertLedgerCapDesktop(page, expect) {
  await expect(page.locator('.psx-sidebar')).toBeVisible();
  await expect(page.locator('.psx-bottom-nav')).toBeHidden();
}

/** Wait until bottom nav is rendered (launch() is async). */
async function waitForNavReady(page) {
  await page.waitForFunction(() => typeof window.Navigation !== 'undefined');
  await page.waitForSelector('#nav .psx-nav-btn', { state: 'attached', timeout: 15000 });
}

module.exports = { resize, assertLedgerCapMobile, assertLedgerCapDesktop, waitForNavReady };
