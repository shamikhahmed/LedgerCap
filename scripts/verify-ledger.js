#!/usr/bin/env node
/**
 * LedgerCap ledger reconciliation — run: node scripts/verify-ledger.js
 */
'use strict';

const fs = require('fs');
const vm = require('vm');

const root = __dirname.replace(/\/scripts$/, '');
const ctx = { window: { FxService: { usdToPkr: usd => usd * 280, pkrToUsd: pkr => pkr / 280 } } };
vm.createContext(ctx);

vm.runInContext(fs.readFileSync(`${root}/js/services/fx-service.js`, 'utf8'), ctx);
vm.runInContext(fs.readFileSync(`${root}/js/data/holdings.js`, 'utf8'), ctx);
vm.runInContext(fs.readFileSync(`${root}/js/engines/ledger.js`, 'utf8'), ctx);

const {
  INITIAL_TRANSACTIONS, FALLBACK_PRICES, MEEZAN_FUNDS, SEED_DATA_VERSION,
  RAFI_BROKER_CASH_PKR, USER_BROKER_CASH_PKR, USER_AKD_CASH_PKR,
  FRIEND_CUSTODIAL_CASH_PKR, AKD_LEDGER_CASH_PKR,
  RAFI_TOTAL_INVESTED_PKR, AKD_TOTAL_INVESTED_PKR, MEEZAN_TOTAL_PURCHASES_PKR, TTWO_TOTAL_INVESTED_USD,
} = ctx.window;
const L = ctx.window.Ledger;

const txs = INITIAL_TRANSACTIONS;
const costBasis = Math.round(L.currentCostBasis(txs));
const gross = Math.round(L.totalInvested(txs));
const holdings = L.calcHoldings(txs);
const funds = L.calcFundHoldings(txs);
const global = L.calcGlobalHoldings ? L.calcGlobalHoldings(txs) : [];

let marketValue = 0;
holdings.forEach(h => {
  const px = FALLBACK_PRICES[h.symbol] || h.avgCost;
  marketValue += h.shares * px;
});
funds.forEach(f => {
  const nav = FALLBACK_PRICES[f.symbol] || f.avgNav;
  marketValue += f.units * nav;
});
global.forEach(h => {
  const usd = (FALLBACK_PRICES[h.symbol] ? FALLBACK_PRICES[h.symbol] / 280 : null) || h.avgCostUsd || 0;
  marketValue += h.qty * ctx.window.FxService.usdToPkr(usd);
});

const gain = marketValue - costBasis;
const gainPct = costBasis > 0 ? (gain / costBasis) * 100 : 0;

console.log('=== LedgerCap verify-ledger ===');
console.log('Seed version:', SEED_DATA_VERSION);
console.log('Cost basis:   ₨' + costBasis.toLocaleString('en-PK'));
console.log('Gross invested: ₨' + gross.toLocaleString('en-PK'), '(legacy metric — do not use for return %)');
console.log('Market value: ₨' + Math.round(marketValue).toLocaleString('en-PK'), '(fallback prices)');
console.log('Gain:         ₨' + Math.round(gain).toLocaleString('en-PK'), `(${gainPct.toFixed(2)}%)`);
console.log('Global positions:', global.length);
console.log('Broker cash (your net worth): ₨' + Math.round(USER_BROKER_CASH_PKR).toLocaleString('en-PK'));
console.log('  Rafi:', RAFI_BROKER_CASH_PKR, '| Your AKD:', USER_AKD_CASH_PKR);
console.log('  AKD ledger total:', AKD_LEDGER_CASH_PKR, '| Friend custodial (excluded):', FRIEND_CUSTODIAL_CASH_PKR);

const miif = funds.find(f => f.symbol === 'MIIF-B');
if (miif) {
  const nav = FALLBACK_PRICES['MIIF-B'];
  const pnlPct = miif.avgNav > 0 ? ((nav - miif.avgNav) / miif.avgNav) * 100 : 0;
  console.log('\nMIIF-B:', `${miif.units.toFixed(4)} units`, `avgNav ${miif.avgNav.toFixed(4)}`, `gain ${pnlPct.toFixed(2)}%`);
}

console.log('\nInvested totals (capital deployed):');
console.log('  Rafi: ₨' + (RAFI_TOTAL_INVESTED_PKR || 0).toLocaleString('en-PK'));
console.log('  AKD:  ₨' + (AKD_TOTAL_INVESTED_PKR || 0).toLocaleString('en-PK'));
console.log('  Meezan: ₨' + (MEEZAN_TOTAL_PURCHASES_PKR || 0).toLocaleString('en-PK'));
const ttwoUsd = TTWO_TOTAL_INVESTED_USD || 0;
console.log('  TTWO: $' + ttwoUsd.toFixed(2) + ' · ₨' + Math.round(ctx.window.FxService.usdToPkr(ttwoUsd)).toLocaleString('en-PK'));
console.log('  Taxes:', '₨' + Math.round(L.totalTaxes(txs)).toLocaleString('en-PK'), '| Fees:', '₨' + Math.round(L.totalFees(txs)).toLocaleString('en-PK'));
console.log('  Dividends logged:', '₨' + Math.round(L.totalDividends(txs)).toLocaleString('en-PK'), '| Tx count:', txs.length);

let unitsOk = true;
console.log('\nMeezan unit check (733102-1, 29-Jun-2026):');
const MEEZAN_EXPECTED = {
  KMIF: 1585.2451, MAAF: 95.1548, MBF: 2184.6673, 'MDAAF-MDYP': 129.0669,
  MIF: 816.3851, 'MIIF-B': 2529.8167, 'MIIF-MMKA': 403.5027,
};
let meezanMv = 0;
MEEZAN_FUNDS.forEach(expected => {
  const f = funds.find(x => x.symbol === expected.symbol);
  const target = MEEZAN_EXPECTED[expected.symbol];
  const match = f && Math.abs(f.units - target) < 0.001;
  if (!match) unitsOk = false;
  const nav = FALLBACK_PRICES[expected.symbol] || expected.currentNav;
  if (f) meezanMv += f.units * nav;
  console.log(`  ${expected.symbol}: ${f?.units?.toFixed(4) ?? '—'} (expected ${target}) ${match ? 'OK' : 'MISMATCH'}`);
});
console.log('  Portfolio value (fallback NAV): ₨' + Math.round(meezanMv).toLocaleString('en-PK'), '(statement ₨661,600)');

const RAFI_EXPECTED = {
  ATRL: { shares: 10, avgCost: 953.3 }, CPHL: { shares: 120, avgCost: 86.67 }, DGKC: { shares: 100, avgCost: 197.98 },
  EFERT: { shares: 90, avgCost: 207.4 }, ENGROH: { shares: 60, avgCost: 287.0 }, FFL: { shares: 300, avgCost: 17.74 },
  HUBC: { shares: 60, avgCost: 225.9 }, LUCK: { shares: 275, avgCost: 428.68 }, MARI: { shares: 20, avgCost: 674.66 },
  MEBL: { shares: 100, avgCost: 491.59 }, MIIETF: { shares: 1500, avgCost: 17.4 }, MLCF: { shares: 150, avgCost: 89.94 },
  MZNPETF: { shares: 3000, avgCost: 21.14 }, NML: { shares: 60, avgCost: 160.75 }, NRL: { shares: 25, avgCost: 382.98 },
  OGDC: { shares: 135, avgCost: 322.64 }, PPL: { shares: 30, avgCost: 241.84 }, PSO: { shares: 35, avgCost: 331.39 },
  PTC: { shares: 100, avgCost: 58.5 }, SEARL: { shares: 930, avgCost: 92.74 }, SSGC: { shares: 200, avgCost: 28.74 },
};
const rafiHoldings = holdings.filter(h => h.broker === 'Rafi');
let rafiMv = 0;
let rafiOk = true;
console.log('\nRafi vTrade check (account 6773, 01 Jul 2026):');
console.log('  Positions:', rafiHoldings.length, '(expected 21)');
if (rafiHoldings.length !== 21) rafiOk = false;
Object.entries(RAFI_EXPECTED).forEach(([sym, exp]) => {
  const h = rafiHoldings.find(x => x.symbol === sym);
  const sharesOk = h && h.shares === exp.shares;
  const avgOk = h && Math.abs(h.avgCost - exp.avgCost) < 0.02;
  if (!sharesOk || !avgOk) rafiOk = false;
  console.log(`  ${sym}: ${h?.shares ?? '—'} @ ${h?.avgCost?.toFixed(2) ?? '—'} ${sharesOk && avgOk ? 'OK' : 'MISMATCH'}`);
  if (h) rafiMv += h.shares * (FALLBACK_PRICES[sym] || h.avgCost);
});
console.log('  Securities MV (fallback): ₨' + Math.round(rafiMv).toLocaleString('en-PK'));
if (rafiHoldings.some(h => h.symbol === 'TRG')) { rafiOk = false; console.log('  TRG should not be in Rafi portfolio'); }

const AKD_EXPECTED = {
  FATIMA: { shares: 100, avgCost: 141.4 }, FFC: { shares: 20, avgCost: 559.95 }, HINO: { shares: 20, avgCost: 360 },
  LUCK: { shares: 50, avgCost: 435 }, MLCF: { shares: 200, avgCost: 102.22 }, MUGHAL: { shares: 120, avgCost: 87.16 },
  PAEL: { shares: 100, avgCost: 43.76 }, PIBTL: { shares: 620, avgCost: 17.43 }, PICT: { shares: 160, avgCost: 38.47 },
  PNSC: { shares: 25, avgCost: 509.99 }, PPL: { shares: 70, avgCost: 226.5 }, PSO: { shares: 50, avgCost: 367.8 },
  SLGL: { shares: 200, avgCost: 15.88 }, TREET: { shares: 200, avgCost: 24.81 },
};
const akdHoldings = holdings.filter(h => h.broker === 'AKD');
let akdOk = true;
console.log('\nAKD COAF55870 check (01 Jul 2026):');
console.log('  Positions:', akdHoldings.length, '(expected 14, no PASM)');
if (akdHoldings.length !== 14) akdOk = false;
if (akdHoldings.some(h => h.symbol === 'PASM')) { akdOk = false; console.log('  PASM should be fully sold'); }
Object.entries(AKD_EXPECTED).forEach(([sym, exp]) => {
  const h = akdHoldings.find(x => x.symbol === sym);
  const sharesOk = h && h.shares === exp.shares;
  const avgOk = h && Math.abs(h.avgCost - exp.avgCost) < 0.05;
  if (!sharesOk || !avgOk) akdOk = false;
  console.log(`  ${sym}: ${h?.shares ?? '—'} @ ${h?.avgCost?.toFixed(2) ?? '—'} ${sharesOk && avgOk ? 'OK' : 'MISMATCH'}`);
});

const ttwo = global.find(h => h.symbol === 'TTWO');
let ttwoOk = true;
console.log('\nTTWO IBKR check:');
if (!ttwo || Math.abs(ttwo.qty - 9.67) > 0.001) {
  ttwoOk = false;
  console.log('  qty:', ttwo?.qty ?? '—', '(expected 9.67) MISMATCH');
} else {
  console.log('  qty:', ttwo.qty, 'OK');
}
const ttwoCost = 1110.45 + 1255;
if (!ttwo || Math.abs(ttwo.totalCostUsd - ttwoCost) > 0.02) {
  ttwoOk = false;
  console.log('  cost USD:', ttwo?.totalCostUsd?.toFixed(2) ?? '—', `(expected ${ttwoCost}) MISMATCH`);
} else {
  console.log('  cost USD:', ttwo.totalCostUsd.toFixed(2), 'OK');
}

const cashOk = Math.abs(USER_BROKER_CASH_PKR - (RAFI_BROKER_CASH_PKR + USER_AKD_CASH_PKR)) < 0.02
  && Math.abs(AKD_LEDGER_CASH_PKR - (USER_AKD_CASH_PKR + FRIEND_CUSTODIAL_CASH_PKR)) < 0.02;
if (!cashOk) console.log('\nCash split MISMATCH');

process.exit(unitsOk && rafiOk && akdOk && ttwoOk && cashOk ? 0 : 1);
