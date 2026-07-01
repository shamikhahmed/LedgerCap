'use strict';
/** Node unit tests — chart helpers (no DOM). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'js/ui/charts.js'), 'utf8');
const ctx = { window: {}, document: undefined, console };
vm.createContext(ctx);
vm.runInContext(code, ctx);
const Charts = ctx.window.Charts;

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) { passed++; return; }
  failed++;
  console.error('FAIL:', msg);
}

assert(Charts._chartColor() === '#0a84ff', 'fallback chart color');
const block = Charts.lineChartBlock([100, 110, 105], {
  height: 50,
  color: '#f59e0b',
  caption: 'A → B',
  subcaption: '+5%',
  subcaptionCls: 'up',
});
assert(block.includes('lc-chart-caption'), 'block has caption');
assert(block.includes('A → B'), 'caption text');
assert(block.includes('+5%'), 'subcaption text');
assert(block.includes('#f59e0b'), 'custom stroke color');
assert(!Charts.lineChart([1]).includes('<path'), 'single point empty');

console.log(`\ncharts: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
