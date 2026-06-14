'use strict';
const Navigation = (() => {
  const TABS = [
    { id: 'dashboard',    label: 'Home',    short: 'Home', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/></svg>` },
    { id: 'portfolio',    label: 'Portfolio',short: 'Port', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>` },
    { id: 'holdings',     label: 'Holdings', short: 'Hold', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>` },
    { id: 'research',     label: 'Research', short: 'Res',  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>` },
    { id: 'watchlist',    label: 'Watchlist',short: 'Watch',icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>` },
    { id: 'dividends',    label: 'Dividends',short: 'Div',  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
    { id: 'intelligence', label: 'Intel',    short: 'Intel',icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.2 4.7-3 6.1V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1.9A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/><line x1="9" y1="22" x2="15" y2="22"/></svg>` },
    { id: 'journal',      label: 'Journal',  short: 'Jrnl', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>` },
    { id: 'settings',     label: 'Settings', short: 'Set',  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>` },
  ];

  const LEGACY_REDIRECT = { income: 'dashboard', reports: 'intelligence' };

  let _current = 'dashboard';

  function _resolveTab(tabId) {
    return LEGACY_REDIRECT[tabId] || tabId;
  }

  function _tabBtn(t, cls) {
    const active = t.id === _current ? ' active' : '';
    const label = cls === 'nav-tab' ? t.short : t.label;
    return `<button class="${cls}${active}" data-tab="${t.id}" aria-label="${t.label}">
      <span class="nav-icon">${t.icon}</span>
      <span class="nav-label">${label}</span>
    </button>`;
  }

  function init() {
    const nav = document.getElementById('nav');
    const sidebar = document.getElementById('nav-sidebar');
    if (nav) {
      nav.innerHTML = TABS.map(t => _tabBtn(t, 'nav-tab')).join('');
      nav.querySelectorAll('.nav-tab').forEach(btn => {
        btn.addEventListener('click', () => go(btn.dataset.tab));
      });
    }
    if (sidebar) {
      sidebar.innerHTML = `<div class="os-brand">LedgerCap</div>` + TABS.map(t => _tabBtn(t, 'nav-side-btn')).join('');
      sidebar.querySelectorAll('.nav-side-btn').forEach(btn => {
        btn.addEventListener('click', () => go(btn.dataset.tab));
      });
    }

    document.body.classList.add('os-theme');
    const saved = sessionStorage.getItem('ledgercap_tab') || sessionStorage.getItem('stundsOS_tab');
    if (saved) go(_resolveTab(saved), true);
  }

  function applyTheme(theme) {
    if (typeof App !== 'undefined' && App.applyTheme) App.applyTheme(theme);
  }

  function go(tabId, silent) {
    tabId = _resolveTab(tabId);
    if (tabId !== 'transactions' && !TABS.some(t => t.id === tabId)) tabId = 'dashboard';
    _current = tabId;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-tab, .nav-side-btn').forEach(b => b.classList.remove('active'));
    const screen = document.getElementById('screen-' + tabId);
    if (screen) screen.classList.add('active');
    document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(b => b.classList.add('active'));

    const fab = document.getElementById('fab');
    if (fab) fab.classList.toggle('hidden', !['holdings', 'portfolio', 'transactions'].includes(tabId));

    if (!silent) sessionStorage.setItem('ledgercap_tab', tabId);
    _renderScreen(tabId);
    _refreshMotion();
  }

  function _refreshMotion() {
    if (typeof CapMotion !== 'undefined' && CapMotion.refresh) CapMotion.refresh();
  }

  function _renderScreen(id) {
    const map = {
      dashboard: () => Dashboard.render(),
      portfolio: () => Portfolio.render(),
      holdings: () => Holdings.render(),
      research: () => Research.render(),
      watchlist: () => Watchlist.render(),
      dividends: () => Dividends.render(),
      intelligence: () => Intelligence.render(),
      journal: () => Journal.render(),
      settings: () => Settings.render(),
      transactions: () => Transactions.render(),
    };
    if (map[id]) map[id]();
  }

  function current() { return _current; }

  return { init, go, current, applyTheme, TABS };
})();
window.Navigation = Navigation;
