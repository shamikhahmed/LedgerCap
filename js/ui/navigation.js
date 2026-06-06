'use strict';
const Navigation = (() => {
  const RENDERERS = {
    overview: () => Overview && Overview.render(),
    stocks:   () => Stocks   && Stocks.render(),
    funds:    () => Funds    && Funds.render(),
    advisor:  () => Advisor  && Advisor.render(),
    you:      () => You      && You.render(),
  };

  let current = null;

  function go(tabId) {
    if (!RENDERERS[tabId]) return;

    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    // Deactivate all tabs
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

    const screen = document.getElementById('screen-' + tabId);
    if (screen) screen.classList.add('active');

    const tab = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
    if (tab) tab.classList.add('active');

    current = tabId;
    try { sessionStorage.setItem('stundsOS_tab', tabId); } catch {}

    // Render the tab
    RENDERERS[tabId]();
  }

  function getCurrent() { return current; }

  function restoreLast() {
    let last = 'overview';
    try { last = sessionStorage.getItem('stundsOS_tab') || 'overview'; } catch {}
    go(last);
  }

  return { go, getCurrent, restoreLast };
})();
window.Navigation = Navigation;
