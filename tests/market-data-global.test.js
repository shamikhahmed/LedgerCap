'use strict';
/** Global quote math — USD prevClose must not mix with PKR price (regression for +27735% bug). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = {
  window: {
    INTL_STOCKS: [{ symbol: 'A', name: 'Agilent' }],
    CRYPTO_ASSETS: [],
    GLOBAL_FALLBACK_USD: { A: 150 },
    FALLBACK_PRICES: {},
    MEEZAN_FUNDS: [],
    FUND_ANALYTICS_DB: {},
    PRICE_CHANGE_SEED: {},
  },
  console,
};
vm.createContext(ctx);

vm.runInContext(fs.readFileSync(path.join(root, 'js/services/fx-service.js'), 'utf8'), ctx);
vm.runInContext(`
const State = (() => {
  let _s = { prices: {}, settings: { usdRate: 280 } };
  return {
    get: () => _s,
    getPrice: (sym) => _s.prices[sym]?.price || 0,
    getPrevClose: (sym) => _s.prices[sym]?.prevClose || _s.prices[sym]?.price || 0,
    getPriceSource: (sym) => _s.prices[sym]?.source || null,
    updatePrice(sym, data) {
      const isGlobal = (window.INTL_STOCKS || []).some(s => s.symbol === sym);
      if (isGlobal && data.priceUsd > 0) {
        const rate = FxService.getUsdRate();
        const usd = data.priceUsd;
        let prevUsd = data.prevCloseUsd;
        if (!(prevUsd > 0) && data.prevClose > 0 && data.prevClose < usd * 10) prevUsd = data.prevClose;
        if (!(prevUsd > 0)) prevUsd = usd * 0.999;
        _s.prices[sym] = {
          ...data,
          priceUsd: usd,
          price: usd * rate,
          prevCloseUsd: prevUsd,
          prevClose: prevUsd * rate,
        };
        return;
      }
      _s.prices[sym] = { ...data };
    },
  };
})();
window.State = State;
`, ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/services/market-data.js'), 'utf8'), ctx);

const MDS = ctx.window.MarketDataService;
const State = ctx.window.State;
let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) { passed++; return; }
  failed++;
  console.error('FAIL:', msg);
}

// Simulate legacy bug: price in PKR, prevClose left in USD
State.updatePrice('A', { priceUsd: 150, price: 42000, prevClose: 149.5, source: 'yahoo_intl' });
const q = MDS.getQuote('A');
assert(Math.abs(q.changePct) < 5, `daily change sane (${q.changePct})`);
assert(q.priceUsd === 150, 'priceUsd preserved');
assert(Math.abs(q.price - 42000) < 1, 'PKR price kept');

const changes = MDS.getPriceChanges('A');
assert(Math.abs(changes.daily) < 5, `getPriceChanges daily sane (${changes.daily})`);

console.log(`market-data global: ${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
