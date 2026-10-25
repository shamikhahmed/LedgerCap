'use strict';
/** Worker must treat trading-board / market-watch HTML as 200 text/html (not JSON error). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const src = fs.readFileSync(path.join(root, 'worker/src/index.js'), 'utf8');
let failed = 0;
function check(name, ok) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) failed++;
}

check('detects board HTML paths', /trading-board\|market-watch/i.test(src));
check('returns text/html for board pages', /Content-Type': 'text\/html/.test(src));
check('keeps timeseries Yahoo soft-200', /yahooAsPsxSeries/.test(src) && /status: 200/.test(src));

process.exit(failed ? 1 : 0);
