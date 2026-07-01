'use strict';
/** Node unit tests — intraday classification + PSX lot rounding (no browser). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = { window: {}, console };
vm.createContext(ctx);

vm.runInContext(fs.readFileSync(path.join(root, 'js/services/intraday-signals.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/services/buy-recommendations.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/services/risk-audit-service.js'), 'utf8'), ctx);

const Intraday = ctx.window.IntradaySignals;
const Buy = ctx.window.BuyRecommendations;
const Risk = ctx.window.RiskAuditService;

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) { passed++; return; }
  failed++;
  console.error('FAIL:', msg);
}

assert(Intraday.sessionMovePct(110, 100) === 10, 'sessionMovePct +10%');
assert(Intraday.sessionMovePct(95, 100) === -5, 'sessionMovePct -5%');

const gap = Intraday.classifyIntraday({ symbol: 'LUCK', movePct: 5.2, plPct: 2, book: 'core' });
assert(gap && gap.kind === 'GAP_UP', 'classify gap up');

const stop = Intraday.classifyIntraday({ symbol: 'OGDC', movePct: -3, plPct: -12, book: 'swing' });
assert(stop && stop.kind === 'STOP', 'classify stop zone');

const flat = Intraday.classifyIntraday({ symbol: 'MEBL', movePct: 0.5, plPct: 1, book: 'core' });
assert(flat === null, 'classify ignores small move');

assert(Buy.roundPsxLot(50) === 100, 'roundPsxLot min 100');
assert(Buy.roundPsxLot(250) === 200, 'roundPsxLot floor to 100s');
assert(Buy.roundPsxLot(300) === 300, 'roundPsxLot exact lot');

const merged = Buy.mergeBuyRecs(
  [{ symbol: 'LUCK', action: 'ADD', delta_pct: -5, ltp: 500, suggested_shares: 200, delta_value: 100000, book: 'core' }],
  [{ symbol: 'OGDC', action: 'STRONG BUY', rationale: 'Value', ltp: 150, book: 'core' }],
);
assert(merged.length === 2, 'merge two sources');
const both = Buy.mergeBuyRecs(
  [{ symbol: 'LUCK', action: 'ADD', delta_pct: -4, ltp: 500, suggested_shares: 100, delta_value: 50000, book: 'core' }],
  [{ symbol: 'LUCK', action: 'ADD', rationale: 'Cheap PE', ltp: 500, book: 'core' }],
);
assert(both[0].source === 'both', 'merge same symbol → both');

const report = Risk.buildReport({
  intel: { insights: [{ severity: 'high', text: 'Banking 30%', action: 'Trim' }], scores: { risk: 60 }, summary: { sectorAllocation: [{ sector: 'Banking', pct: 32 }], brokers: { Rafi: 800000 }, totalValue: 1000000 } },
  holdings: [{ symbol: 'MEBL', allocPct: 22, kind: 'stock' }],
  cgt: { short_term_count: 1, lots_missing_date: 2 },
  rebalance: { drift_count: 2, summary: '2 drifts' },
  pilotScore: { score: 70, grade: 'B' },
  rafiStocks: [],
  akdStocks: [],
});
assert(report.findings.length >= 3, 'risk report findings');
assert(report.counts.high >= 1, 'risk report high count');

console.log(`signals-logic: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
