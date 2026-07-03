import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { parsePsxSummaryHtml } from '../../worker/src/psx-universe.js';

const root = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(root, '../fixtures/psx-market-summary.sample.html'), 'utf8');
let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) { passed++; return; }
  failed++;
  console.error('FAIL:', msg);
}

const { catalog } = parsePsxSummaryHtml(html);
assert(catalog.length >= 3, `parsed symbols (${catalog.length})`);
assert(catalog.some((c) => c.symbol === 'LUCK'), 'LUCK present');
assert(catalog.some((c) => c.symbol === 'OGDC'), 'OGDC present');

console.log(`psx-universe: ${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
