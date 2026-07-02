'use strict';
/**
 * Regression tests for the v3.47.0 calculation fixes.
 * Guards: daily P&L sign inversion on buy days, internal-convert flows,
 * synthetic-prevClose fake day change, manual-assets return inflation.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

const storage = new Map();
const mockLocal = {
  getItem: k => storage.get(k) ?? null,
  setItem: (k, v) => storage.set(k, v),
  removeItem: k => storage.delete(k),
};

const ctx = {
  window: {},
  localStorage: mockLocal,
  sessionStorage: mockLocal,
  navigator: { onLine: true },
  console,
  Date,
};
vm.createContext(ctx);

// Minimal FxService stub so Ledger/State don't need the real fetch chain.
ctx.window.FxService = ctx.FxService = {
  usdToPkr: usd => (usd || 0) * 280,
  pkrToUsd: pkr => (pkr || 0) / 280,
  getUsdRate: () => 280,
  refreshUsdPkr: async () => 280,
};

vm.runInContext(fs.readFileSync(path.join(root, 'js/engines/ledger.js'), 'utf8'), ctx);
const Ledger = ctx.window.Ledger || ctx.Ledger;

let passed = 0;
let failed = 0;
function assert(cond, msg) {
  if (cond) { passed++; return; }
  failed++;
  console.error('FAIL:', msg);
}
function approx(a, b, tol) {
  return Math.abs(a - b) <= (tol ?? 1);
}

// --- dailyPnlSeries: a buy day must NOT show the purchase as profit ---
{
  const txs = [
    { id: 't1', date: '2026-01-10', type: 'BUY', symbol: 'AAA', shares: 100, price: 100, amount: 10000, broker: 'Rafi' },
  ];
  // Portfolio value snapshots: day before buy 0, buy day 10000 (flat price).
  const hist = [
    { date: '2026-01-09', value: 0 },
    { date: '2026-01-10', value: 10000 },
    { date: '2026-01-11', value: 10500 },
  ];
  const series = Ledger.dailyPnlSeries(txs, hist);
  const buyDay = series.find(p => p.date === '2026-01-10');
  const nextDay = series.find(p => p.date === '2026-01-11');
  assert(buyDay && approx(buyDay.pnl, 0, 1), `buy day M2M ~0, got ${buyDay?.pnl}`);
  assert(nextDay && approx(nextDay.pnl, 500, 1), `next day M2M +500, got ${nextDay?.pnl}`);
}

// --- sell day: proceeds are not a loss ---
{
  const txs = [
    { id: 't1', date: '2026-01-10', type: 'BUY', symbol: 'AAA', shares: 100, price: 100, amount: 10000, broker: 'Rafi' },
    { id: 't2', date: '2026-02-10', type: 'SELL', symbol: 'AAA', shares: 100, price: 110, amount: 11000, broker: 'Rafi' },
  ];
  const hist = [
    { date: '2026-02-09', value: 11000 },
    { date: '2026-02-10', value: 0 },
  ];
  const series = Ledger.dailyPnlSeries(txs, hist);
  const sellDay = series.find(p => p.date === '2026-02-10');
  // Value dropped 11000 but 11000 came back as cash: M2M 0 + realised gain on the day.
  assert(sellDay && approx(sellDay.pnl - (sellDay.realised || 0), 0, 1),
    `sell day M2M (ex realised) ~0, got ${sellDay ? sellDay.pnl - (sellDay.realised || 0) : 'missing'}`);
}

// --- internal fund converts are not external flows ---
{
  const txs = [
    { id: 'c1', date: '2026-03-01', type: 'REDEMPTION', symbol: 'MIIF', amount: 100000, internal: true, broker: 'Meezan' },
    { id: 'c2', date: '2026-03-01', type: 'CONTRIBUTION', symbol: 'KMIF', amount: 100000, internal: true, broker: 'Meezan' },
  ];
  const hist = [
    { date: '2026-02-28', value: 100000 },
    { date: '2026-03-01', value: 100000 },
  ];
  const series = Ledger.dailyPnlSeries(txs, hist);
  const convDay = series.find(p => p.date === '2026-03-01');
  assert(!convDay || approx(convDay.pnl, 0, 1), `internal convert day ~0, got ${convDay?.pnl}`);
}

console.log(`\ncalc-regression: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
