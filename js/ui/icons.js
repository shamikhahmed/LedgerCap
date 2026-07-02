'use strict';
/** LedgerCap monochrome SVG icon registry (SF Symbol–style) */
const LcIcons = (() => {
  const PATHS = {
    home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z',
    chart: ['M3 3v18h18', 'M7 16l4-4 4 4 5-6'],
    wallet: ['M21 12V7H5a2 2 0 0 1 0-4h14v4', 'M3 5v14a2 2 0 0 0 2 2h16v-5', 'M18 12a2 2 0 1 0 0 4h4v-4h-4Z'],
    briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M2 8h20v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8Z'],
    search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M21 21l-4.3-4.3'],
    globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z'],
    moon: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z',
    sun: ['M12 2v2', 'M12 20v2', 'M4.93 4.93l1.41 1.41', 'M2 12h2', 'M20 12h2', 'M19.07 4.93l-1.41 1.41', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
    lock: ['M7 11V7a5 5 0 0 1 10 0v4', 'M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z'],
    settings: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z'],
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
    calendar: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'],
    list: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
    bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
    book: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z'],
    upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
    scale: ['M12 3v18', 'M5 7h14', 'M7 7l-2 5h4L7 7Z', 'M17 7l-2 5h4l-2-5Z'],
    trending: ['M22 7 13.5 15.5 8.5 10.5 2 17', 'M16 7h6v6'],
    journal: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z', 'M8 7h8', 'M8 11h8'],
    zap: 'M13 2 3 14h9l-1 8 10-12h-9l1-8Z',
    coins: ['M8 6h8', 'M6 10h12', 'M8 14h8', 'M12 18v4', 'M8 2h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8Z'],
    fullscreen: ['M8 3H5a2 2 0 0 0-2 2v3', 'M21 8V5a2 2 0 0 0-2-2h-3', 'M3 16v3a2 2 0 0 0 2 2h3', 'M16 21h3a2 2 0 0 0 2-2v-3'],
    x: ['M18 6 6 18', 'M6 6l12 12'],
    ledger: ['M4 4h16v4H4z', 'M4 12h10', 'M4 20h16', 'M18 12h2'],
  };

  const TOOL_ICONS = {
    global: 'globe',
    zakat: 'scale',
    import: 'upload',
    screener: 'search',
    dividends: 'coins',
    calendar: 'calendar',
    watchlist: 'bell',
    signals: 'zap',
    'risk-audit': 'shield',
    insights: 'chart',
    'pilot-tools': 'trending',
    transactions: 'list',
    comparison: 'scale',
    performance: 'trending',
    journal: 'journal',
    settings: 'settings',
    more: 'list',
  };

  function icon(name, size = 20, extraClass = '') {
    const paths = PATHS[name];
    if (!paths) {
      return `<span class="lc-icon lc-icon--missing ${extraClass}" aria-hidden="true" style="width:${size}px;height:${size}px"></span>`;
    }
    const body = (Array.isArray(paths) ? paths : [paths])
      .map((d) => `<path d="${d}"/>`)
      .join('');
    return `<svg class="lc-icon ${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  function toolIcon(tabId, size = 18) {
    return icon(TOOL_ICONS[tabId] || 'list', size, 'lc-icon--tool');
  }

  return { icon, toolIcon, PATHS, TOOL_ICONS };
})();
window.LcIcons = LcIcons;
