// @ts-check
const { expect } = require('@playwright/test');

/** @param {import('@playwright/test').Page} page */
async function dismissOverlays(page) {
  await page.evaluate(() => {
    if (typeof App !== 'undefined' && App.closeBottomSheet) App.closeBottomSheet();
    document.getElementById('lc-cmdk')?.classList.remove('on');
    document.getElementById('proUpgradeModal')?.classList.remove('open');
  });
  await page.locator('#bottom-sheet.on, #lc-cmdk.on, #proUpgradeModal.open').waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
}

/** @param {import('@playwright/test').Page} page */
async function hideDemoBanner(page) {
  await page.evaluate(() => {
    const banner = document.getElementById('demo-banner');
    if (banner) {
      banner.classList.add('hidden');
      banner.style.display = 'none';
    }
  });
}

/** Non-destructive frame polish — safe before modal/sheet screenshots */
/** @param {import('@playwright/test').Page} page */
async function polishGalleryFrame(page) {
  await page.evaluate(() => {
    document.getElementById('splash')?.classList.add('hide');
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
  });
  await page.waitForTimeout(120);
}

/** Dismiss tour modals, sheets — call before screen captures (not form/sheet shots) */
/** @param {import('@playwright/test').Page} page @param {{ preserveOverlays?: boolean }} [options] */
async function prepareGalleryShot(page, options = {}) {
  if (options.preserveOverlays) {
    await polishGalleryFrame(page);
    return;
  }
  await page.evaluate(() => {
    document.getElementById('splash')?.classList.add('hide');
    if (typeof App !== 'undefined' && App.closeBottomSheet) App.closeBottomSheet();
    document.getElementById('lc-cmdk')?.classList.remove('on');
    document.getElementById('proUpgradeModal')?.classList.remove('open');
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
  });
  await page.locator('#bottom-sheet.on, #lc-cmdk.on, #proUpgradeModal.open').waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(120);
}

/** Fast demo unlock for screenshot gallery */
/** @param {import('@playwright/test').Page} page */
async function fastGalleryUnlock(page) {
  await page.addInitScript(() => {
    localStorage.removeItem('ledgercap_pin_v1');
    sessionStorage.removeItem('ledgercap_pin_session');
    sessionStorage.setItem('ledgercap_demo_mode', '1');
    sessionStorage.setItem('ledgercap_demo_dismiss', '1');
  });
  await page.goto('/?demo=1');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForFunction(() => typeof Navigation !== 'undefined' && typeof App !== 'undefined', { timeout: 30000 });
  await page.waitForFunction(() => {
    return !!document.querySelector('#nav .psx-nav-btn') || !!document.querySelector('.psx-sidebar');
  }, { timeout: 20000 });
  await page.waitForSelector('#pin-lock.hidden', { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => {
    document.getElementById('splash')?.classList.add('hide');
    document.getElementById('onboarding')?.remove();
    const banner = document.getElementById('demo-banner');
    if (banner) { banner.classList.add('hidden'); banner.style.display = 'none'; }
    if (typeof Settings !== 'undefined' && Settings.loadSeedData) {
      const has = (State.get().transactions || []).length > 0;
      if (!has) Settings.loadSeedData({ silent: true });
    }
    Navigation.go('home');
  });
  await page.waitForSelector('#screen-home.active', { timeout: 20000 });
  await dismissOverlays(page);
  await hideDemoBanner(page);
  await prepareGalleryShot(page);
}

module.exports = {
  dismissOverlays,
  hideDemoBanner,
  polishGalleryFrame,
  prepareGalleryShot,
  fastGalleryUnlock,
};
