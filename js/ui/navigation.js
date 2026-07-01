'use strict';
const Navigation = (() => {
  const TABS = [
    { id: 'home', labelKey: 'nav.hub', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/></svg>` },
    { id: 'market', labelKey: 'nav.watch', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
    { id: 'funds', labelKey: 'nav.funds', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
    { id: 'portfolio', labelKey: 'nav.pnl', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>` },
    { id: 'research', labelKey: 'nav.analyze', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>` },
  ];

  const MORE = [
    { id: 'global', labelKey: 'tools.global.t' },
    { id: 'zakat', labelKey: 'tools.zakat.t' },
    { id: 'import', labelKey: 'tools.import.t' },
    { id: 'screener', labelKey: 'tools.screener.t' },
    { id: 'dividends', labelKey: 'tools.dividends.t' },
    { id: 'calendar', labelKey: 'tools.calendar.t' },
    { id: 'watchlist', labelKey: 'tools.watchlist.t' },
    { id: 'signals', labelKey: 'tools.signals.t' },
    { id: 'risk-audit', labelKey: 'tools.riskAudit.t' },
    { id: 'insights', labelKey: 'tools.insightsTool.t' },
    { id: 'pilot-tools', labelKey: 'tools.pilotTools.t' },
    { id: 'transactions', labelKey: 'tools.transactions.t' },
    { id: 'settings', labelKey: 'more.title' },
  ];

  const LEGACY = { dashboard: 'home', holdings: 'portfolio', income: 'dividends', intelligence: 'research', reports: 'research' };
  const VALID = new Set(['home', 'market', 'funds', 'portfolio', 'research', 'more', 'global', 'zakat', 'import', 'screener', 'watchlist', 'dividends', 'calendar', 'settings', 'transactions', 'signals', 'risk-audit', 'insights', 'comparison', 'performance', 'journal', 'pilot-tools']);

  let _current = 'home';

  function _t(k) { return typeof I18n !== 'undefined' ? I18n.t(k) : k; }

  function _navBtn(t) {
    const on = t.id === _current ? ' active' : '';
    return `<button type="button" class="psx-nav-btn${on}" data-tab="${t.id}" aria-label="${_t(t.labelKey)}">
      <span class="psx-nav-icon-wrap">${t.icon}</span>
      <span>${_t(t.labelKey)}</span>
    </button>`;
  }

  function init() {
    const nav = document.getElementById('nav');
    if (nav) {
      nav.innerHTML = TABS.map(_navBtn).join('');
      nav.querySelectorAll('.psx-nav-btn').forEach(b => b.addEventListener('click', () => go(b.dataset.tab)));
    }
    const sidebar = document.getElementById('nav-sidebar');
    if (sidebar) {
      sidebar.innerHTML = `
        <div class="psx-brand" style="padding:4px 12px 24px;font-size:18px">Ledger<span>Cap</span></div>
        <nav aria-label="Primary">${TABS.map(t => `<button type="button" class="psx-side-btn" data-tab="${t.id}">${t.icon}<span>${_t(t.labelKey)}</span></button>`).join('')}</nav>
        <div style="height:1px;background:var(--psx-border);margin:16px 8px"></div>
        <nav aria-label="Tools">${MORE.map(t => `<button type="button" class="psx-side-btn" data-tab="${t.id}"><span>${_t(t.labelKey)}</span></button>`).join('')}</nav>
        <button type="button" class="psx-side-btn nav-theme-btn" style="margin-top:auto" onclick="window.toggleTheme?.()">${_t('theme.toggle')}</button>`;
      sidebar.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => go(b.dataset.tab)));
    }
    const saved = sessionStorage.getItem('ledgercap_tab');
    const hashTab = (location.hash || '').replace(/^#/, '');
    if (hashTab && VALID.has(LEGACY[hashTab] || hashTab)) go(LEGACY[hashTab] || hashTab, true);
    else if (saved) go(LEGACY[saved] || saved, true);
    window.addEventListener('popstate', (e) => {
      const tab = e.state?.tab || (location.hash || '').replace(/^#/, '') || sessionStorage.getItem('ledgercap_tab') || 'home';
      go(LEGACY[tab] || tab, true);
    });
  }

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  function go(tabId, silent, opts) {
    tabId = LEGACY[tabId] || tabId;
    if (!VALID.has(tabId)) tabId = 'home';
    _current = tabId;
    document.querySelectorAll('.psx-screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.psx-nav-btn, .psx-side-btn[data-tab]').forEach(b => b.classList.remove('active'));
    const el = document.getElementById('screen-' + tabId);
    if (el) {
      el.classList.add('active', 'lc-screen-enter');
      el.scrollTop = 0;
      requestAnimationFrame(() => el.classList.remove('lc-screen-enter'));
    }
    document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(b => b.classList.add('active'));
    if (!silent) {
      sessionStorage.setItem('ledgercap_tab', tabId);
      const hash = '#' + tabId;
      if (location.hash !== hash) history.pushState({ tab: tabId }, '', hash);
    }
    const tabLabel = tabId.charAt(0).toUpperCase() + tabId.slice(1).replace(/-/g, ' ');
    document.title = tabLabel + ' — LedgerCap';
    _render(tabId, opts || {});
    if (typeof PsxUI !== 'undefined') PsxUI.refreshPortfolioMini?.();
    if (typeof CapMotion !== 'undefined') CapMotion.refresh();
  }

  function _render(id, opts) {
    const map = {
      home: () => Hub.render(),
      market: () => Market.render(),
      funds: () => Funds.render(),
      portfolio: () => PortfolioScreen.render(opts),
      research: () => { Research.setMode(opts.portfolioIntel ? 'portfolio' : 'stock'); Research.render(); },
      more: () => More.render(),
      global: () => Global.render(),
      zakat: () => Zakat.render(),
      import: () => ImportCsv.render(),
      screener: () => Screener.render(),
      watchlist: () => Watchlist.render(),
      dividends: () => Dividends.render(),
      calendar: () => WealthCalendar.render(),
      settings: () => Settings.render(),
      transactions: () => Transactions.render(),
      signals: () => Signals.render(),
      'risk-audit': () => RiskAudit.render(),
      insights: () => InsightsScreen.render(),
      comparison: () => Comparison.render(),
      performance: () => Performance.render(),
      journal: () => Journal.render(),
      'pilot-tools': () => PilotTools.render(),
    };
    if (map[id]) map[id]();
  }

  function current() { return _current; }
  return { init, go, current, applyTheme, TABS };
})();
window.Navigation = Navigation;
