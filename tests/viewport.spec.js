// @ts-check
const { test, expect } = require('@playwright/test');
const {
  resize,
  assertLedgerCapMobile,
  assertLedgerCapDesktop,
  waitForNavReady,
} = require('./helpers/viewport-helpers');

test.describe('LedgerCap viewport contract', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');
    await waitForNavReady(page);
  });

  test('375px — bottom tab bar, sidebar hidden', async ({ page }) => {
    await resize(page, 'mobile');
    await assertLedgerCapMobile(page, expect);
  });

  test('1280px — desktop sidebar, bottom nav hidden', async ({ page }) => {
    await resize(page, 'desktop');
    await assertLedgerCapDesktop(page, expect);
  });
});
