'use strict';
const State = (() => {
  const KEY = 'stundsOS_v1';
  const DEFAULT = {
    stocks: [],
    funds: [],
    prices: {},
    priceHistory: [],
    sipLog: [],
    customMemos: [],
    kseIndex: { value: null, change: null, changeP: null, updated: null },
    settings: { showShariah: false },
    setupComplete: false,
    lastPriceUpdate: null,
  };
  let _s = null;

  function _initData() {
    const stocks = [
      ...(window.RAFI_STOCKS || []).map(s => ({ ...s, currentPrice: 0 })),
      ...(window.AKD_STOCKS || []).map(s => ({ ...s, currentPrice: 0 })),
    ];
    const funds = (window.MEEZAN_FUNDS || []).map(f => ({ ...f }));
    return { stocks, funds };
  }

  function load() {
    try {
      const r = localStorage.getItem(KEY);
      if (r) {
        _s = { ...DEFAULT, ...JSON.parse(r) };
      } else {
        _s = { ...DEFAULT };
        const { stocks, funds } = _initData();
        _s.stocks = stocks;
        _s.funds = funds;
        save();
      }
    } catch {
      _s = { ...DEFAULT };
      const { stocks, funds } = _initData();
      _s.stocks = stocks;
      _s.funds = funds;
    }
  }

  function get(k) { if (!_s) load(); return k ? _s[k] : _s; }
  function set(k, v) { if (!_s) load(); _s[k] = v; save(); }
  function update(fn) { if (!_s) load(); fn(_s); save(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(_s)); } catch(e) { console.warn('StundsOS save error', e); } }
  function reset() { localStorage.removeItem(KEY); _s = null; load(); }
  function exportJSON() { if (!_s) load(); return JSON.stringify(_s, null, 2); }
  function importJSON(str) {
    try { const d = JSON.parse(str); _s = { ...DEFAULT, ...d }; save(); return true; }
    catch { return false; }
  }

  function updateStockPrice(symbol, price) {
    if (!_s) load();
    _s.prices[symbol] = price;
    _s.stocks.forEach(s => { if (s.symbol === symbol) s.currentPrice = parseFloat(price); });
    _s.lastPriceUpdate = new Date().toISOString();
    _logPortfolioValue();
    save();
  }

  function updateFundNav(symbol, nav) {
    if (!_s) load();
    _s.funds.forEach(f => {
      if (f.symbol === symbol) {
        f.currentNav = parseFloat(nav);
        f.currentValue = f.units * parseFloat(nav);
      }
    });
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
    _s.priceHistory = _s.priceHistory.slice(-90);
  }

  function calcStocksValue() {
    if (!_s) load();
    return (_s.stocks || []).reduce((sum, s) => sum + (s.shares || 0) * (s.currentPrice || 0), 0);
  }

  function calcStocksCost() {
    if (!_s) load();
    return (_s.stocks || []).reduce((sum, s) => sum + (s.shares || 0) * (s.avgCost || 0), 0);
  }

  function calcFundsValue() {
    if (!_s) load();
    return (_s.funds || []).reduce((sum, f) => sum + (f.currentValue || 0), 0);
  }

  function calcFundsCost() {
    if (!_s) load();
    return (_s.funds || []).reduce((sum, f) => sum + (f.investedValue || 0), 0);
  }

  function calcTotalValue() { return calcStocksValue() + calcFundsValue(); }
  function calcTotalCost() { return calcStocksCost() + calcFundsCost(); }

  load();
  return {
    get, set, update, save, reset, exportJSON, importJSON,
    updateStockPrice, updateFundNav,
    calcStocksValue, calcStocksCost, calcFundsValue, calcFundsCost,
    calcTotalValue, calcTotalCost
  };
})();
window.State = State;
