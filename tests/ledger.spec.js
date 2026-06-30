// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadLedger() {
  const root = path.join(__dirname, '..');
  const ctx = { window: { FxService: { usdToPkr: usd => usd * 280, pkrToUsd: pkr => pkr / 280, getUsdRate: () => 280 } } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/data/holdings.js'), 'utf8'), ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/engines/ledger.js'), 'utf8'), ctx);
  return { Ledger: ctx.window.Ledger, txs: ctx.window.INITIAL_TRANSACTIONS };
}

test.describe('Ledger math (seed)', () => {
  test('PASM AKD shares = 1555 only', () => {
    const { Ledger, txs } = loadLedger();
    const pasm = Ledger.calcHoldings(txs).find(h => h.symbol === 'PASM');
    expect(pasm?.shares).toBe(1555);
    expect(pasm?.avgCost).toBeCloseTo(8.41, 2);
  });

  test('Meezan fund units match AMC statement', () => {
    const { Ledger, txs } = loadLedger();
    const funds = Ledger.calcFundHoldings(txs);
    const expected = [
      ['KMIF', 1534.3564], ['MAAF', 95.1548], ['MBF', 2118.7307],
      ['MDAAF-MDYP', 129.0669], ['MIF', 812.9073], ['MIIF-B', 2384.5933], ['MIIF-MMKA', 377.9407],
    ];
    for (const [sym, units] of expected) {
      const f = funds.find(x => x.symbol === sym);
      expect(f, sym).toBeTruthy();
      expect(Math.abs(f.units - units)).toBeLessThan(0.001);
    }
  });

  test('currentCostBasis is less than gross totalInvested (no double-count fiction)', () => {
    const { Ledger, txs } = loadLedger();
    const basis = Ledger.currentCostBasis(txs);
    const gross = Ledger.totalInvested(txs);
    expect(basis).toBeLessThan(gross);
    expect(basis).toBeGreaterThan(1_500_000);
  });

  test('sell clamping prevents negative holdings', () => {
    const { Ledger } = loadLedger();
    const txs = [
      { id: '1', type: 'BUY', date: '2026-01-01', symbol: 'TEST', broker: 'CDC', shares: 10, price: 100, amount: 1000 },
      { id: '2', type: 'SELL', date: '2026-01-02', symbol: 'TEST', broker: 'CDC', shares: 50, price: 110, amount: 5500 },
    ];
    const h = Ledger.calcHoldings(txs);
    expect(h.find(x => x.symbol === 'TEST')).toBeFalsy();
  });

  test('global cost included in currentCostBasis', () => {
    const { Ledger } = loadLedger();
    const txs = [
      { id: 'g1', type: 'INTL_BUY', date: '2026-01-01', symbol: 'AAPL', broker: 'IBKR', shares: 10, qty: 10, priceUsd: 200, costUsd: 2000, assetClass: 'intl' },
    ];
    const basis = Ledger.currentCostBasis(txs);
    expect(basis).toBe(2000 * 280);
  });

  test('global sell realised PnL in PKR', () => {
    const { Ledger } = loadLedger();
    const txs = [
      { id: 'b1', type: 'INTL_BUY', date: '2026-01-01', symbol: 'AAPL', broker: 'IBKR', shares: 10, qty: 10, priceUsd: 100, costUsd: 1000, assetClass: 'intl' },
      { id: 's1', type: 'INTL_SELL', date: '2026-02-01', symbol: 'AAPL', broker: 'IBKR', shares: 5, qty: 5, priceUsd: 120, assetClass: 'intl' },
    ];
    const pnl = Ledger.realisedPnl(txs);
    expect(pnl).toBe((120 - 100) * 5 * 280);
    const trades = Ledger.realisedTrades(txs);
    expect(trades.length).toBe(1);
    expect(trades[0].symbol).toBe('AAPL');
  });

  test('PSX txs split by broker bucket', () => {
    const root = path.join(__dirname, '..');
    const ctx = { window: { FxService: { usdToPkr: usd => usd * 280, pkrToUsd: pkr => pkr / 280, getUsdRate: () => 280 } } };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(root, 'js/data/holdings.js'), 'utf8'), ctx);
    vm.runInContext(fs.readFileSync(path.join(root, 'js/engines/ledger.js'), 'utf8'), ctx);
    vm.runInContext(fs.readFileSync(path.join(root, 'js/services/portfolio-buckets-service.js'), 'utf8'), ctx);
    const PB = ctx.window.PortfolioBuckets;
    const state = { transactions: [
      { id: '1', type: 'BUY', date: '2026-01-01', symbol: 'LUCK', broker: 'Rafi', shares: 10, price: 100, amount: 1000 },
      { id: '2', type: 'BUY', date: '2026-01-02', symbol: 'PASM', broker: 'AKD', shares: 5, price: 8, amount: 40 },
    ]};
    expect(PB.inferBuiltinId(state.transactions[0])).toBe('rafi');
    expect(PB.inferBuiltinId(state.transactions[1])).toBe('akd');
    expect(PB.txsForBucket(state, 'rafi').length).toBe(1);
    expect(PB.txsForBucket(state, 'akd').length).toBe(1);
  });
});
