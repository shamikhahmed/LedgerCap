'use strict';
/** Gate: PSX official feed is tried before Yahoo .KA when proxyHealthy. */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'js/engines/prices.js'), 'utf8');
let failed = 0;
function check(name, ok, detail = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : `  (${detail})`}`);
  if (!ok) failed++;
}

const fetchStock = (src.match(/async function fetchStock\(symbol\) \{[\s\S]*?\n  \}/) || [])[0] || '';
const fetchLive = (src.match(/async function fetchPsxLive\(symbols\) \{[\s\S]*?\n  \}/) || [])[0] || '';

const psxIdx = fetchStock.indexOf('if (proxyHealthy())');
const yahooIdx = fetchStock.indexOf('const yahoo = await _fetchYahoo');
check('fetchStock: proxyHealthy PSX block before Yahoo', psxIdx >= 0 && yahooIdx > psxIdx);
check('fetchStock: fetchPsxSymbol inside healthy path', /proxyHealthy\(\)[\s\S]*fetchPsxSymbol/.test(fetchStock));

const livePsx = fetchLive.indexOf('if (proxyHealthy())');
const liveYahoo = fetchLive.indexOf('const y = await _fetchYahoo');
check('fetchPsxLive: PSX before Yahoo fallback', livePsx >= 0 && liveYahoo > livePsx);

if (failed) {
  console.error(`\nprices-source-order: ${failed} failed`);
  process.exit(1);
}
console.log('\nprices-source-order: all passed');
