'use strict';
const State = (() => {
  const KEY = 'stundsOS_v1';
  const DEFAULT = {
    stocks: [],
    funds: [],
    prices: {},
    navs: {},
    priceHistory: [],
    watchlist: [],
    notes: [],
    sipLog: [],
    settings: { currency: 'PKR', showShariah: false },
    setupComplete: false,
    lastPriceUpdate: null,
    netCash: 0,
  };
  let _s = null;

  function _initStocks() {
    const all = [];
    const seen = new Set();
    Object.values(window.INITIAL_HOLDINGS || {}).forEach(broker => {
      broker.forEach(h => {
        if (!h.units && h.units !== 0) {
          all.push({ ...h, currentPrice: 0 });
        }
        seen.add(h.id);
      });
    });
    return all;
  }

  function _initFunds() {
    const funds = [];
    (window.INITIAL_HOLDINGS.meezan || []).forEach(f => {
      funds.push({ ...f, currentNav: 0, annualReturn: null });
    });
    return funds;
  }

  function load() {
    try {
      const r = localStorage.getItem(KEY);
      _s = r ? { ...DEFAULT, ...JSON.parse(r) } : { ...DEFAULT };
      if (!_s.stocks || !_s.stocks.length) {
        _s.stocks = _initStocks();
        save();
      }
      if (!_s.funds || !_s.funds.length) {
        _s.funds = _initFunds();
        save();
      }
    } catch(e) {
      console.warn('State load error', e);
      _s = { ...DEFAULT };
      _s.stocks = _initStocks();
      _s.funds = _initFunds();
    }
  }

  function get(k) { if (!_s) load(); return k ? _s[k] : _s; }
  function set(k, v) { if (!_s) load(); _s[k] = v; save(); }

  function update(fn) { if (!_s) load(); fn(_s); save(); }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(_s)); } catch(e) { console.warn('State save error', e); }
  }

  function reset() {
    localStorage.removeItem(KEY);
    _s = { ...DEFAULT };
    _s.stocks = _initStocks();
    _s.funds = _initFunds();
    save();
  }

  function exportJSON() { return JSON.stringify(_s, null, 2); }

  function importJSON(str) {
    try {
      const parsed = JSON.parse(str);
      _s = { ...DEFAULT, ...parsed };
      save();
      return true;
    } catch { return false; }
  }

  function updatePrice(symbol, price) {
    if (!_s) load();
    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) return;
    _s.prices[symbol] = p;
    _s.stocks.forEach(s => { if (s.symbol === symbol) s.currentPrice = p; });
    _s.lastPriceUpdate = new Date().toISOString();
    _logPortfolioValue();
    save();
  }

  function updateNav(symbol, nav) {
    if (!_s) load();
    const n = parseFloat(nav);
    if (isNaN(n) || n <= 0) return;
    _s.navs[symbol] = n;
    _s.funds.forEach(f => { if (f.symbol === symbol) f.currentNav = n; });
    _s.lastPriceUpdate = new Date().toISOString();
    _logPortfolioValue();
    save();
  }

  function _logPortfolioValue() {
    const total = calcTotalValue();
    const today = new Date().toISOString().split('T')[0];
    const idx = _s.priceHistory.findIndex(p => p.date === today);
    if (idx >= 0) _s.priceHistory[idx].value = total;
    else _s.priceHistory.push({ date: today, value: total });
    if (_s.priceHistory.length > 90) _s.priceHistory = _s.priceHistory.slice(-90);
  }

  function calcStocksValue() {
    if (!_s) load();
    return (_s.stocks || []).reduce((sum, s) => {
      const qty = s.shares || 0;
      const price = s.currentPrice || _s.prices[s.symbol] || 0;
      return sum + (qty * price);
    }, 0);
  }

  function calcFundsValue() {
    if (!_s) load();
    return (_s.funds || []).reduce((sum, f) => {
      const qty = f.units || 0;
      const nav = f.currentNav || _s.navs[f.symbol] || 0;
      return sum + (qty * nav);
    }, 0);
  }

  function calcTotalValue() {
    return calcStocksValue() + calcFundsValue();
  }

  function calcStocksCost() {
    if (!_s) load();
    return (_s.stocks || []).reduce((sum, s) => {
      return sum + ((s.shares || 0) * (s.avgCost || 0));
    }, 0);
  }

  function calcFundsCost() {
    if (!_s) load();
    return (_s.funds || []).reduce((sum, f) => {
      return sum + ((f.units || 0) * (f.avgNav || 0));
    }, 0);
  }

  function calcTotalCost() {
    return calcStocksCost() + calcFundsCost();
  }

  function calcBrokerValue(broker) {
    if (!_s) load();
    const stocksVal = (_s.stocks || [])
      .filter(s => s.broker === broker)
      .reduce((sum, s) => sum + ((s.shares || 0) * (s.currentPrice || _s.prices[s.symbol] || 0)), 0);
    const fundsVal = (_s.funds || [])
      .filter(f => f.broker === broker)
      .reduce((sum, f) => sum + ((f.units || 0) * (f.currentNav || _s.navs[f.symbol] || 0)), 0);
    return stocksVal + fundsVal;
  }

  function calcBrokerCost(broker) {
    if (!_s) load();
    const stocksCost = (_s.stocks || [])
      .filter(s => s.broker === broker)
      .reduce((sum, s) => sum + ((s.shares || 0) * (s.avgCost || 0)), 0);
    const fundsCost = (_s.funds || [])
      .filter(f => f.broker === broker)
      .reduce((sum, f) => sum + ((f.units || 0) * (f.avgNav || 0)), 0);
    return stocksCost + fundsCost;
  }

  load();

  return {
    get, set, update, save, reset,
    exportJSON, importJSON,
    updatePrice, updateNav,
    calcTotalValue, calcTotalCost,
    calcStocksValue, calcFundsValue,
    calcStocksCost, calcFundsCost,
    calcBrokerValue, calcBrokerCost,
  };
})();
window.State = State;
