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
  test('PASM AKD — bought and sold (0 shares; friend 9,445 custodial)', () => {
    const { Ledger, txs } = loadLedger();
    const pasm = Ledger.calcHoldings(txs).find(h => h.symbol === 'PASM' && h.broker === 'AKD');
    expect(pasm).toBeFalsy();
    const buy = txs.find(t => t.id === 't_pasm');
    const sell = txs.find(t => t.id === 't_pasm_s');
    expect(buy?.shares).toBe(1555);
    expect(sell?.shares).toBe(1555);
    expect(sell?.price).toBeCloseTo(10.31, 2);
  });

  test('AKD holdings match COAF55870 statement (14 symbols)', () => {
    const { Ledger, txs } = loadLedger();
    const akd = Ledger.calcHoldings(txs).filter(h => h.broker === 'AKD').sort((a, b) => a.symbol.localeCompare(b.symbol));
    expect(akd.length).toBe(14);
    expect(akd.find(h => h.symbol === 'MLCF')?.shares).toBe(200);
    expect(akd.find(h => h.symbol === 'MLCF')?.avgCost).toBeCloseTo(102.22, 2);
    expect(akd.find(h => h.symbol === 'PSO')?.shares).toBe(50);
    expect(akd.find(h => h.symbol === 'PAEL')?.shares).toBe(100);
  });

  test('Meezan fund units match AMC statement 29-Jun-2026', () => {
    const { Ledger, txs } = loadLedger();
    const funds = Ledger.calcFundHoldings(txs);
    const expected = [
      ['KMIF', 1585.2451], ['MAAF', 95.1548], ['MBF', 2184.6673],
      ['MDAAF-MDYP', 129.0669], ['MIF', 816.3851], ['MIIF-B', 2529.8167], ['MIIF-MMKA', 403.5027],
    ];
    for (const [sym, units] of expected) {
      const f = funds.find(x => x.symbol === sym);
      expect(f, sym).toBeTruthy();
      expect(Math.abs(f.units - units)).toBeLessThan(0.001);
    }
  });

  test('cost basis >= gross invested (Meezan internal converts inflate basis)', () => {
    const { Ledger, txs } = loadLedger();
    const basis = Ledger.currentCostBasis(txs);
    const gross = Ledger.totalInvested(txs);
    expect(basis).toBeGreaterThanOrEqual(gross);
    expect(basis).toBeGreaterThan(1_900_000);
    expect(gross).toBeGreaterThan(1_300_000);
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

  test('Rafi portfolio matches vTrade snapshot (21 symbols)', () => {
    const { Ledger, txs } = loadLedger();
    const rafi = Ledger.calcHoldings(txs).filter(h => h.broker === 'Rafi');
    expect(rafi.length).toBe(21);
    expect(rafi.find(h => h.symbol === 'TRG')).toBeFalsy();
    const luck = rafi.find(h => h.symbol === 'LUCK');
    expect(luck?.shares).toBe(275);
    expect(luck?.avgCost).toBeCloseTo(428.68, 2);
    const pso = rafi.find(h => h.symbol === 'PSO');
    expect(pso?.shares).toBe(35);
    expect(pso?.avgCost).toBeCloseTo(331.39, 2);
  });

  test('TTWO IBKR — two buys, fees in cost basis', () => {
    const { Ledger, txs } = loadLedger();
    const ttwo = Ledger.calcGlobalHoldings(txs).find(h => h.symbol === 'TTWO');
    expect(ttwo?.qty).toBeCloseTo(9.67, 2);
    expect(ttwo?.totalCostUsd).toBeCloseTo(2365.45, 2);
    expect(ttwo?.avgCostUsd).toBeCloseTo(244.6174, 2);
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

  test('logged dividends and Meezan taxes in seed v10', () => {
    const { Ledger, txs } = loadLedger();
    const divs = txs.filter(t => t.type === 'DIVIDEND');
    expect(divs.length).toBeGreaterThanOrEqual(9);
    expect(Ledger.totalDividends(txs)).toBeGreaterThan(3000);
    expect(Ledger.totalTaxes(txs)).toBeGreaterThan(2000);
    expect(Ledger.totalFees(txs)).toBeGreaterThan(5000);
    const kmifTax = txs.find(t => t.id === 't_ch_kmif_dtx');
    expect(kmifTax?.relatedId).toBe('t_div_kmif');
    expect(kmifTax?.amount).toBe(453);
  });
});
