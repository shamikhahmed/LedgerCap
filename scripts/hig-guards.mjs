#!/usr/bin/env node
/**
 * LedgerCap HIG static guards (no browser, no deps).
 * Scans shipped CSS / HTML / SW for standing rules 1–4. Exit 1 with file:line on hit.
 *
 * Exceptions (inner overflow) must be listed in DESIGN.md “Scroll exceptions”.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const hits = [];

function add(file, line, msg) {
  hits.push(`${path.relative(ROOT, file)}:${line}: ${msg}`);
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function linesOf(rel) {
  return read(rel).split(/\r?\n/);
}

/** Parse DESIGN.md scroll-exception selectors (backtick-wrapped in that section). */
function designExceptions() {
  const md = read('DESIGN.md');
  const section = md.split('### Scroll exceptions')[1] || '';
  const table = section.split(/\n## /)[0] || section;
  const sels = new Set();
  for (const m of table.matchAll(/`([^`]+)`/g)) {
    for (const part of m[1].split(/,\s*/)) {
      const s = part.trim();
      if (s.startsWith('.') || s.startsWith('#')) sels.add(s.split(/\s+/)[0]);
    }
  }
  // Always allow horizontal pill rows (not page scroll roots).
  sels.add('.cap-tab-bar');
  sels.add('.div-tabs');
  sels.add('.sett-tabs');
  sels.add('.perf-tabs');
  sels.add('.tab-scroller');
  sels.add('.psx-sym-row');
  sels.add('.sg-rail');
  return sels;
}

const EXCEPT = designExceptions();

function selectorExcepted(sel) {
  const tokens = sel.match(/[.#]?[a-zA-Z_][\w-]*/g) || [];
  return tokens.some((t) => EXCEPT.has(t) || EXCEPT.has(`.${t}`) || EXCEPT.has(`#${t}`));
}

/** Walk CSS for page-root overflow / html-body / input font-size. */
function scanCss(rel, { rule1 = true } = {}) {
  const text = read(rel);
  const lines = text.split(/\r?\n/);
  const pageRoots =
    /(?:^|[\s,>+~])(#app|#screens|#view|#pg-family|\.screen|\.pb|\.page|\.main|\.psx-screen|\.psx-screens|\.deck|main|html|body)(?=[\s,.{:[>+~]|$)/;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const open = line.indexOf('{');
    if (open === -1) {
      i++;
      continue;
    }
    let sel = line.slice(0, open).trim();
    let j = i - 1;
    while (j >= 0 && !lines[j].includes('{') && !lines[j].includes('}') && lines[j].trim()) {
      sel = `${lines[j].trim()} ${sel}`;
      j--;
    }
    let depth = 0;
    let block = '';
    let k = i;
    for (; k < lines.length; k++) {
      const L = lines[k];
      for (const ch of L) {
        if (ch === '{') depth++;
        else if (ch === '}') depth--;
      }
      block += `${L}\n`;
      if (depth === 0 && L.includes('}')) break;
    }
    const startLine = i + 1;

    // Rule 3: html/body as the rule subject (not an ancestor in a longer selector)
    const subjects = sel.split(',').map((s) => s.trim().split(/[\s>+~]/).pop());
    const htmlBodySubject = subjects.some((s) => /^(html|body)([.#:][\w-]*)*$/.test(s || ''));
    if (htmlBodySubject) {
      if (/overflow\s*:\s*hidden\b/.test(block) || /overflow-y\s*:\s*hidden\b/.test(block)) {
        add(path.join(ROOT, rel), startLine, 'html/body overflow:hidden (rule 3)');
      }
      if (/scroll-behavior\s*:\s*smooth\b/.test(block)) {
        add(path.join(ROOT, rel), startLine, 'html/body scroll-behavior:smooth (rule 3)');
      }
    }

    // Rule 1: page-level overflow auto/scroll (authoritative layers only)
    if (rule1 && pageRoots.test(sel) && /overflow(?:-y)?\s*:\s*(auto|scroll)\b/.test(block)) {
      if (!selectorExcepted(sel)) {
        add(path.join(ROOT, rel), startLine, `page-level overflow auto/scroll on “${sel.slice(0, 80)}” (rule 1)`);
      }
    }

    // Rule 2: input/select/textarea font-size < 16px
    if (
      /(?:^|[\s,>+~])(input|select|textarea)(?=[\s,.{:[>+~]|$)/.test(sel) ||
      /\.(ob-input|field-input|field-select|comp-select|lc-field-input|sg-search|sg-select)\b/.test(sel)
    ) {
      const font = block.match(/font-size\s*:\s*([^;}{]+)/i) || block.match(/font\s*:\s*([^;}{]+)/i);
      if (font) {
        const v = font[1].trim();
        if (!/max\s*\(\s*16px/i.test(v)) {
          const px = v.match(/^(\d+(?:\.\d+)?)\s*px$/i);
          const rem = v.match(/^(\d+(?:\.\d+)?)\s*rem$/i);
          const em = v.match(/^(\d+(?:\.\d+)?)\s*em$/i);
          let bad = false;
          if (px && parseFloat(px[1]) < 16) bad = true;
          if (rem && parseFloat(rem[1]) * 16 < 16) bad = true;
          if (em && parseFloat(em[1]) * 16 < 16) bad = true;
          const sh = v.match(/(^|[\s/])(\d+(?:\.\d+)?)\s*rem\b/);
          if (sh && parseFloat(sh[2]) * 16 < 16) bad = true;
          if (bad) add(path.join(ROOT, rel), startLine, `input font-size < 16px (“${v}”) (rule 2)`);
        }
      }
    }

    i = k + 1;
  }
}

/** Rule 4: no auto skipWaiting / clients.claim outside a message handler. */
function scanSw(rel = 'sw.js') {
  const lines = linesOf(rel);
  let inMessage = false;
  let msgDepth = 0;
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];
    if (/addEventListener\s*\(\s*['"]message['"]/.test(L) || /\bonmessage\s*=/.test(L)) {
      inMessage = true;
      msgDepth = 0;
    }
    if (inMessage) {
      for (const ch of L) {
        if (ch === '{') msgDepth++;
        else if (ch === '}') msgDepth--;
      }
      if (msgDepth <= 0 && L.includes('}') && i > 0) inMessage = false;
    }
    if (/self\.skipWaiting\s*\(/.test(L) || /\.skipWaiting\s*\(/.test(L)) {
      if (!inMessage && !/^\s*\/\//.test(L) && !/No skipWaiting/.test(L)) {
        add(path.join(ROOT, rel), i + 1, 'skipWaiting outside message handler (rule 4)');
      }
    }
    if (/clients\.claim\s*\(/.test(L)) {
      if (!inMessage && !/^\s*\/\//.test(L) && !/No skipWaiting/.test(L)) {
        add(path.join(ROOT, rel), i + 1, 'clients.claim outside message handler (rule 4)');
      }
    }
  }
}

function listCssUnder(dirRel) {
  const out = [];
  const abs = path.join(ROOT, dirRel);
  if (!fs.existsSync(abs)) return out;
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p);
      else if (name.endsWith('.css')) out.push(path.relative(ROOT, p));
    }
  };
  walk(abs);
  return out.sort();
}

// Rule 1: authoritative HIG + marketing layers (legacy @layer files still ship but are overridden).
const rule1Css = [
  ...listCssUnder('css/design'),
  'site/site.css',
  'screen-gallery.css',
].filter((rel) => fs.existsSync(path.join(ROOT, rel)));

for (const rel of rule1Css) scanCss(rel, { rule1: true });

// Rule 2 + 3: all shipped CSS under css/ + marketing
const allCss = new Set([
  ...listCssUnder('css'),
  'site/site.css',
  'screen-gallery.css',
]);
for (const rel of allCss) {
  if (rule1Css.includes(rel)) continue; // already scanned fully
  scanCss(rel, { rule1: false });
}

scanSw('sw.js');

for (const htmlRel of [
  'index.html',
  'landing.html',
  'pitch.html',
  'presentation.html',
  'support.html',
  'privacy.html',
  'terms.html',
  'screen-gallery.html',
]) {
  if (!fs.existsSync(path.join(ROOT, htmlRel))) continue;
  const htmlLines = linesOf(htmlRel);
  for (let i = 0; i < htmlLines.length; i++) {
    const L = htmlLines[i];
    if (/<(html|body)\b/i.test(L) && /overflow\s*:\s*hidden/i.test(L)) {
      add(path.join(ROOT, htmlRel), i + 1, 'html/body overflow:hidden inline (rule 3)');
    }
  }
}

if (hits.length) {
  console.error(`hig-guards: ${hits.length} hit(s)`);
  for (const h of hits) console.error(h);
  process.exit(1);
}
console.log('hig-guards: OK');
