import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pkrPerGram } from '../../worker/src/karat-math.js';

const root = dirname(fileURLToPath(import.meta.url));
let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) { passed++; return; }
  failed++;
  console.error('FAIL:', msg);
}

const g24 = pkrPerGram(3300, 280, 24);
const g12 = pkrPerGram(3300, 280, 12);
assert(g24 > 0, '24k positive');
assert(Math.abs(g12 - g24 / 2) < 2, '12k half of 24k');
assert(pkrPerGram(0, 280, 24) === 0, 'zero spot');

console.log(`karat-math: ${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
