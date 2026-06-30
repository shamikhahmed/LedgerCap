'use strict';
/** Toggle body.lc-desktop-nav at ≥900px — Playwright viewport contract + sidebar/bottom nav */
(function () {
  const MQ = window.matchMedia('(min-width: 900px)');
  function sync() {
    document.body.classList.toggle('lc-desktop-nav', MQ.matches);
  }
  if (typeof MQ.addEventListener === 'function') {
    MQ.addEventListener('change', sync);
  } else if (typeof MQ.addListener === 'function') {
    MQ.addListener(sync);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sync);
  } else {
    sync();
  }
  window.LcDesktopNav = { sync, mq: MQ };
})();
