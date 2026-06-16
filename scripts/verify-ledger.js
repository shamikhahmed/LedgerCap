#!/usr/bin/env node
/**
 * LedgerCap ledger reconciliation — run: node scripts/verify-ledger.js
 */
'use strict';

const fs = require('fs');
const vm = require('vm');

const root = __dirname.replace(/\/scripts$/, '');
const ctx = { window: {} };
vm.createContext(ctx);

vm.runInContext(fs.readFileSync(`${root}/js/data/holdings.js`, 'utf8'), ctx);
vm.runInContext(fs.readFileSync(`${root}/js/engines/ledger.js`, 'utf8'), ctx);

const { INITIAL_TRANSACTIONS, FALLBACK_PRICES, MEEZAN_FUNDS, SEED_DATA_VERSION } = ctx.window;
const L = ctx.window.Ledger;

const txs = INITIAL_TRANSACTIONS;
const costBasis = Math.round(L.currentCostBasis(txs));
const gross = Math.round(L.totalInvested(txs));
const holdings = L.calcHoldings(txs);
const funds = L.calcFundHoldings(txs);

let marketValue = 0;
holdings.forEach(h => {
  const px = FALLBACK_PRICES[h.symbol] || h.avgCost;
  marketValue += h.shares * px;
});
funds.forEach(f => {
  const nav = FALLBACK_PRICES[f.symbol] || f.avgNav;
  marketValue += f.units * nav;
});

const gain = marketValue - costBasis;
const gainPct = costBasis > 0 ? (gain / costBasis) * 100 : 0;

console.log('=== LedgerCap verify-ledger ===');
console.log('Seed version:', SEED_DATA_VERSION);
console.log('Cost basis:   ₨' + costBasis.toLocaleString('en-PK'));
console.log('Gross invested: ₨' + gross.toLocaleString('en-PK'), '(legacy metric — do not use for return %)');
console.log('Market value: ₨' + Math.round(marketValue).toLocaleString('en-PK'), '(fallback prices)');
console.log('Gain:         ₨' + Math.round(gain).toLocaleString('en-PK'), `(${gainPct.toFixed(2)}%)`);

const pasm = holdings.find(h => h.symbol === 'PASM');
console.log('\nPASM:', pasm ? `${pasm.shares} @ ${pasm.avgCost.toFixed(2)}` : 'MISSING');

const miif = funds.find(f => f.symbol === 'MIIF-B');
if (miif) {
  const nav = FALLBACK_PRICES['MIIF-B'];
  const pnlPct = miif.avgNav > 0 ? ((nav - miif.avgNav) / miif.avgNav) * 100 : 0;
  console.log('MIIF-B:', `${miif.units.toFixed(4)} units`, `avgNav ${miif.avgNav.toFixed(4)}`, `gain ${pnlPct.toFixed(2)}%`);
}

console.log('\nMeezan unit check:');
let unitsOk = true;
MEEZAN_FUNDS.forEach(expected => {
  const f = funds.find(x => x.symbol === expected.symbol);
  const match = f && Math.abs(f.units - expected.units) < 0.0002;
  if (!match) unitsOk = false;
  console.log(`  ${expected.symbol}: ${f?.units?.toFixed(4) ?? '—'} (expected ${expected.units}) ${match ? 'OK' : 'MISMATCH'}`);
});

process.exit(unitsOk && pasm?.shares === 1555 ? 0 : 1);
