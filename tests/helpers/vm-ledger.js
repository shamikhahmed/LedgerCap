'use strict';
/** Shared Node VM context for LedgerCap unit/spec tests — always loads LCBrand first. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..', '..');

function createLedgerVm(extraWindow = {}) {
  const ctx = {
    window: {
      FxService: { usdToPkr: (usd) => usd * 280, pkrToUsd: (pkr) => pkr / 280, getUsdRate: () => 280 },
      ...extraWindow,
    },
    console,
  };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/brand/colors.js'), 'utf8'), ctx);
  return ctx;
}

function loadHoldingsAndLedger(extraWindow = {}) {
  const ctx = createLedgerVm(extraWindow);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/data/holdings.js'), 'utf8'), ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/engines/ledger.js'), 'utf8'), ctx);
  return ctx;
}

module.exports = { root, createLedgerVm, loadHoldingsAndLedger, vm, fs, path };
