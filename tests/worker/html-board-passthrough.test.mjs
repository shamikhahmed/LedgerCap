'use strict';
/** Worker must pass trading-board / market-watch HTML as safe text/plain (not text/html + ACAO *). */
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

const boardBlock = (src.match(/isHtml && \/\^\(trading-board\|market-watch\)[\s\S]*?Cache-Control[\s\S]*?\}\);/) || [])[0] || '';

check('detects board HTML paths', /trading-board\|market-watch/i.test(src));
check('serves board pages as text/plain', /Content-Type': 'text\/plain; charset=utf-8'/.test(boardBlock));
check('sets X-Content-Type-Options nosniff', /X-Content-Type-Options': 'nosniff'/.test(boardBlock));
check('sets CSP sandbox', /Content-Security-Policy': 'sandbox'/.test(boardBlock));
check('does not serve board as text/html', !/Content-Type': 'text\/html/.test(boardBlock));
check('keeps timeseries Yahoo soft-200', /yahooAsPsxSeries/.test(src) && /status: 200/.test(src));

process.exit(failed ? 1 : 0);
