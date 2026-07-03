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

  test('375px — no content clipped behind bottom nav on primary tabs', async ({ page }) => {
    await resize(page, 'mobile');
    for (const tab of ['home', 'market', 'funds', 'portfolio', 'research']) {
      await page.evaluate((t) => window.Navigation.go(t), tab);
      await page.waitForTimeout(400);
      const ok = await page.evaluate(() => {
        const screen = document.querySelector('.psx-screen.active');
        const nav = document.querySelector('.psx-bottom-nav');
        if (!screen || !nav) return false;
        const scroller = screen.scrollHeight > screen.clientHeight ? screen : document.getElementById('screens');
        scroller.scrollTop = scroller.scrollHeight;
        const last = screen.lastElementChild?.lastElementChild || screen.lastElementChild;
        if (!last) return true;
        // Last content element must end above the nav top after full scroll.
        return last.getBoundingClientRect().bottom <= nav.getBoundingClientRect().top + 1;
      });
      expect(ok, `tab ${tab}: last element clear of bottom nav`).toBe(true);
    }
  });
});
