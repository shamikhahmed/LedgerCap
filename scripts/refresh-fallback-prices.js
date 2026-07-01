#!/usr/bin/env node
'use strict';
/** Refresh FALLBACK_PRICES in js/data/holdings.js from PSX EOD. Run: node scripts/refresh-fallback-prices.js */
const fs = require('fs');
const path = require('path');
const https = require('https');

const HOLDINGS = path.join(__dirname, '..', 'js/data/holdings.js');
const PSX = 'https://dps.psx.com.pk';
const HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'LedgerCap-FallbackRefresh/1.0',
  Referer: `${PSX}/`,
};

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: HEADERS }, (res) => {
      let body = '';
      res.on('data', (c) => { body += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function parseEod(data) {
  const rows = Array.isArray(data) ? data : (data?.data || []);
  if (!rows.length) return null;
  const sorted = [...rows].sort((a, b) => (Number(a[0]) || 0) - (Number(b[0]) || 0));
  const price = parseFloat(sorted[sorted.length - 1][1]);
  return price > 0 ? price : null;
}

async function main() {
  const src = fs.readFileSync(HOLDINGS, 'utf8');
  const blockMatch = src.match(/const FALLBACK_PRICES = \{([\s\S]*?)\n\};/);
  if (!blockMatch) {
    console.error('FALLBACK_PRICES block not found');
    process.exit(1);
  }
  const symRe = /'([A-Z0-9.-]+)':\s*[\d.]+/g;
  const symbols = [];
  let m;
  while ((m = symRe.exec(blockMatch[1])) !== null) symbols.push(m[1]);

  const updated = {};
  for (const sym of symbols) {
    try {
      const data = await fetchJson(`${PSX}/timeseries/eod/${encodeURIComponent(sym)}`);
      const px = parseEod(data);
      if (px) updated[sym] = Math.round(px * 100) / 100;
      else console.warn('skip', sym);
    } catch (e) {
      console.warn('fail', sym, e.message);
    }
    await new Promise((r) => setTimeout(r, 150));
  }

  const today = new Date().toISOString().slice(0, 10);
  let out = src;
  Object.entries(updated).forEach(([sym, px]) => {
    const re = new RegExp(`('${sym.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}':\\s*)[\\d.]+`);
    out = out.replace(re, `$1${px}`);
  });

  if (!out.includes('FALLBACK_PRICES_UPDATED')) {
    out = out.replace(
      'const FALLBACK_PRICES = {',
      `const FALLBACK_PRICES_UPDATED = '${today}';\n\nconst FALLBACK_PRICES = {`,
    );
  } else {
    out = out.replace(/FALLBACK_PRICES_UPDATED = '[^']+'/, `FALLBACK_PRICES_UPDATED = '${today}'`);
  }

  fs.writeFileSync(HOLDINGS, out);
  console.log(`Updated ${Object.keys(updated).length}/${symbols.length} symbols · ${today}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
