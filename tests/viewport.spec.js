// @ts-check
const { test, expect } = require('@playwright/test');
const {
  resize,
  assertLedgerCapMobile,
  assertLedgerCapDesktop,
} = require('../../capricorn-tooling/shared/testing/viewport-helpers');

test.describe('LedgerCap viewport contract', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => typeof window.Navigation !== 'undefined');
    await page.waitForTimeout(600);
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
