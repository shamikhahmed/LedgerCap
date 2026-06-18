'use strict';
const Navigation = (() => {
  const TABS = [
    { id: 'home',       label: 'Home',       short: 'Home', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/></svg>` },
    { id: 'research',   label: 'Research',   short: 'Res',  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>` },
    { id: 'watchlist',  label: 'Watchlist',  short: 'Watch',icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>` },
    { id: 'dividends',  label: 'Dividends',  short: 'Div',  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
    { id: 'settings',   label: 'Settings',   short: 'Set',  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>` },
  ];

  const SIDEBAR_EXTRA = [
    { id: 'performance', label: 'Performance', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
    { id: 'comparison',  label: 'Compare',     icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>` },
    { id: 'transactions', label: 'Transactions', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>` },
  ];

  const LEGACY_REDIRECT = {
    income: 'home',
    reports: 'research',
    intelligence: 'research',
    dashboard: 'home',
    holdings: 'home',
    portfolio: 'home',
  };

  const VALID_SCREENS = new Set([
    ...TABS.map(t => t.id),
    ...SIDEBAR_EXTRA.map(t => t.id),
    'dashboard', 'holdings', 'portfolio', 'journal',
  ]);

  let _current = 'home';

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
      const theme = document.body.getAttribute('data-theme') || 'dark';
      sidebar.innerHTML = `
        <div class="os-brand">LedgerCap</div>
        ${TABS.map(t => _tabBtn(t, 'nav-side-btn')).join('')}
        <div class="nav-side-divider" aria-hidden="true"></div>
        ${SIDEBAR_EXTRA.map(t => _tabBtn(t, 'nav-side-btn')).join('')}
        <div class="nav-side-footer">
          <button type="button" class="nav-side-btn nav-theme-btn" onclick="window.toggleTheme?.()" aria-label="Toggle theme">
            <span class="nav-icon">${theme === 'dark' ? '🌙' : '☀️'}</span>
            <span class="nav-label">${theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
          </button>
        </div>`;
      sidebar.querySelectorAll('.nav-side-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => go(btn.dataset.tab));
      });
    }

    document.body.classList.add('os-theme');
    const saved = sessionStorage.getItem('ledgercap_tab');
    if (saved) go(_resolveTab(saved), true);
  }

  function applyTheme(theme) {
    if (typeof App !== 'undefined' && App.applyTheme) App.applyTheme(theme);
    const btn = document.querySelector('.nav-theme-btn');
    if (btn) {
      const isDark = theme === 'dark';
      btn.querySelector('.nav-icon').textContent = isDark ? '🌙' : '☀️';
      btn.querySelector('.nav-label').textContent = isDark ? 'Dark mode' : 'Light mode';
    }
  }

  function go(tabId, silent, opts) {
    const portfolioIntel = tabId === 'intelligence' || tabId === 'reports'
      || (opts && opts.portfolioIntel)
      || (tabId === 'research' && sessionStorage.getItem('ledgercap_research_mode') === 'portfolio');
    tabId = _resolveTab(tabId);
    if (!VALID_SCREENS.has(tabId)) tabId = 'home';
    _current = tabId;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-tab, .nav-side-btn[data-tab]').forEach(b => b.classList.remove('active'));
    const screen = document.getElementById('screen-' + tabId);
    if (screen) screen.classList.add('active');
    document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(b => b.classList.add('active'));

    const fab = document.getElementById('fab');
    if (fab) fab.classList.toggle('hidden', !['home', 'research', 'transactions'].includes(tabId));

    if (!silent) sessionStorage.setItem('ledgercap_tab', tabId);
    _renderScreen(tabId, { portfolioIntel: portfolioIntel || !!(opts && opts.portfolioIntel) });
    _refreshMotion();
  }

  function _refreshMotion() {
    if (typeof CapMotion !== 'undefined' && CapMotion.refresh) CapMotion.refresh();
  }

  function _renderScreen(id, opts) {
    const o = opts || {};
    const map = {
      home: () => { if (window.Home) Home.render(); else if (window.Dashboard) Dashboard.render(); },
      dashboard: () => { if (window.Dashboard) Dashboard.render(); else if (window.Home) Home.render(); },
      research: () => {
        if (window.Research) {
          Research.setMode(o.portfolioIntel ? 'portfolio' : 'stock');
          Research.render();
        }
      },
      watchlist: () => { if (window.Watchlist) Watchlist.render(); },
      dividends: () => { if (window.Dividends) Dividends.render(); },
      settings: () => { if (window.Settings) Settings.render(); },
      transactions: () => { if (window.Transactions) Transactions.render(); },
      performance: () => { if (window.Performance) Performance.render(); },
      comparison: () => { if (window.Comparison) Comparison.render(); },
      holdings: () => { if (window.Holdings) Holdings.render(); },
      portfolio: () => { if (window.Portfolio) Portfolio.render(); },
      journal: () => { if (window.Journal) Journal.render(); },
    };
    if (map[id]) map[id]();
  }

  function current() { return _current; }

  return { init, go, current, applyTheme, TABS };
})();
window.Navigation = Navigation;
