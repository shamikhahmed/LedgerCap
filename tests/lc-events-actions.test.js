'use strict';
/** Static checks for data-action wiring + a11y/shell contracts (prod-ready gates). */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
let failed = 0;
function check(name, ok, detail = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : `  (${detail})`}`);
  if (!ok) failed++;
}

const nav = fs.readFileSync(path.join(root, 'js/ui/navigation.js'), 'utf8');
const events = fs.readFileSync(path.join(root, 'js/ui/lc-events.js'), 'utf8');
const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
const home = fs.readFileSync(path.join(root, 'js/modules/home.js'), 'utf8');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const worker = fs.readFileSync(path.join(root, 'worker/src/index.js'), 'utf8');
const health = fs.readFileSync(path.join(root, 'js/services/price-health.js'), 'utf8');

check('Navigation exports goResearchIntel', /function goResearchIntel\s*\(/.test(nav) && /return \{ init, go, goResearchIntel,/.test(nav));
check('lc-events routes Settings._setTheme via data-tab', /path === 'Settings\._setTheme'\) Settings\?\._setTheme\?\.\(tab\)/.test(events));
check('App Escape closes bottom sheet', /e\.key !== 'Escape'/.test(app) && /closeBottomSheet\(\)/.test(app) && /_sheetOpener/.test(app));
check('Home large title is h1', /<h1 class="home-value"/.test(home));
check('Home empty state has h1', /<h1>Home<\/h1>/.test(home));
check('Bottom nav is landmark <nav> without role=tablist', /<nav id="nav" class="psx-bottom-nav" aria-label="Main"><\/nav>/.test(index));
check('Screens use role=main landmark', /id="screens"[^>]*role="main"/.test(index));
check('Worker HTML passthrough for trading-board', /trading-board\|market-watch/.test(worker));
check('PriceHealth unavailable copy gated on _LC_MARKET_UNAVAILABLE', /_LC_MARKET_UNAVAILABLE[\s\S]*Market data unavailable — showing last saved prices/.test(health));
check('PriceHealth stale/seeded uses last-close copy', /Some prices are from the last close/.test(health));

process.exit(failed ? 1 : 0);
