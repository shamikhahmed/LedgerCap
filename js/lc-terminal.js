'use strict';
/** Full-width terminal shell + optional browser fullscreen */
(function () {
  const DESKTOP = window.matchMedia('(min-width: 900px)');

  function syncLayout() {
    document.body.classList.toggle('lc-terminal', DESKTOP.matches);
  }

  function toggle() {
    const root = document.documentElement;
    if (!document.fullscreenElement && root.requestFullscreen) {
      root.requestFullscreen().catch(() => {
        document.body.classList.toggle('lc-terminal-force');
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
      document.body.classList.remove('lc-terminal-force');
    } else {
      document.body.classList.toggle('lc-terminal-force');
    }
  }

  function onFsChange() {
    const host = document.getElementById('lc-fullscreen-icon');
    if (host && typeof LcIcons !== 'undefined') {
      host.innerHTML = LcIcons.icon('fullscreen', 18);
    }
    if (!document.fullscreenElement) document.body.classList.remove('lc-terminal-force');
  }

  if (typeof DESKTOP.addEventListener === 'function') {
    DESKTOP.addEventListener('change', syncLayout);
  } else if (typeof DESKTOP.addListener === 'function') {
    DESKTOP.addListener(syncLayout);
  }
  document.addEventListener('fullscreenchange', onFsChange);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncLayout);
  } else {
    syncLayout();
  }

  window.LcTerminal = { sync: syncLayout, toggle };
})();
