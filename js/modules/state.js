'use strict';
const State = (() => {
  const KEY = 'stundsOS_v2';

  const DEFAULT = {
    transactions: [],
    prices: {},
    kseIndex: {},
    priceHistory: [],
    settings: {
      salary: 150000,
      targetSIP: 75000,
      currency: 'PKR',
      inflationRate: 0.20,
      targetReturn: 0.18,
      freedomTarget: 100000,
    },
    version: 2,
  };

  let _s = null;

  function _seed() {
    if ((window.INITIAL_TRANSACTIONS || []).length > 0 && !_s.transactions.length) {
      _s.transactions = [...(window.INITIAL_TRANSACTIONS || [])];
    }
  }

  function load() {
    try {
      const r = localStorage.getItem(KEY);
      if (r) {
        const parsed = JSON.parse(r);
        _s = { ...DEFAULT, ...parsed };
        _s.settings = { ...DEFAULT.settings, ...(parsed.settings || {}) };
      } else {
        _s = JSON.parse(JSON.stringify(DEFAULT));
        _seed();
      }
    } catch {
      _s = JSON.parse(JSON.stringify(DEFAULT));
      _seed();
    }
  }

  function get(k) { if (!_s) load(); return k ? _s[k] : _s; }
  function set(k, v) { if (!_s) load(); _s[k] = v; save(); }
  function update(fn) { if (!_s) load(); fn(_s); save(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(_s)); } catch(e) { console.warn(e); } }
  function reset() { localStorage.removeItem(KEY); _s = null; load(); }
  function exportJSON() { if (!_s) load(); return JSON.stringify(_s, null, 2); }
  function importJSON(str) { try { _s = { ...DEFAULT, ...JSON.parse(str) }; _s.settings = { ...DEFAULT.settings, ...(_s.settings || {}) }; save(); return true; } catch { return false; } }

  function addTransaction(tx) {
    if (!_s) load();
    _s.transactions.push({ ...tx, id: tx.id || Ledger.newId(), createdAt: Date.now() });
    _logPortfolioValue();
    save();
  }

  function deleteTransaction(id) {
    if (!_s) load();
    _s.transactions = _s.transactions.filter(t => t.id !== id);
    save();
  }

  function updatePrice(symbol, priceData) {
    if (!_s) load();
    _s.prices[symbol] = typeof priceData === 'number'
      ? { price: priceData, ts: Date.now(), source: 'manual' }
      : { ...priceData, ts: Date.now() };
    _logPortfolioValue();
    save();
  }

  function getPrice(symbol) {
    if (!_s) load();
    return _s.prices[symbol]?.price || 0;
  }

  function getPrevClose(symbol) {
    if (!_s) load();
    return _s.prices[symbol]?.prevClose || _s.prices[symbol]?.price || 0;
  }

  function _logPortfolioValue() {
    const total = calcTotalValue();
    if (total <= 0) return;
    const today = new Date().toISOString().split('T')[0];
    const idx = _s.priceHistory.findIndex(p => p.date === today);
    if (idx >= 0) _s.priceHistory[idx].value = total;
    else _s.priceHistory.push({ date: today, value: total });
    _s.priceHistory = _s.priceHistory.slice(-90);
  }

  function calcTotalValue() {
    if (!_s) load();
    const stockHoldings = Ledger.calcHoldings(_s.transactions);
    const fundHoldings = Ledger.calcFundHoldings(_s.transactions);

    const stockVal = stockHoldings.reduce((sum, h) => {
      const p = getPrice(h.symbol);
      return sum + h.shares * (p || h.avgCost);
    }, 0);

    const fundVal = fundHoldings.reduce((sum, f) => {
      const nav = getPrice(f.symbol);
      const meezanFund = (window.MEEZAN_FUNDS || []).find(mf => mf.symbol === f.symbol);
      const fallbackNav = meezanFund?.currentNav || f.avgNav;
      return sum + f.units * (nav || fallbackNav);
    }, 0);

    return stockVal + fundVal;
  }

  function calcTotalCost() {
    if (!_s) load();
    return Ledger.totalInvested(_s.transactions);
  }

  function calcDailyPnl() {
    if (!_s) load();
    const holdings = Ledger.calcHoldings(_s.transactions);
    return holdings.reduce((sum, h) => {
      const curr = getPrice(h.symbol);
      const prev = getPrevClose(h.symbol);
      if (!curr || !prev) return sum;
      return sum + h.shares * (curr - prev);
    }, 0);
  }

  load();
  return { get, set, update, save, reset, exportJSON, importJSON,
    addTransaction, deleteTransaction, updatePrice, getPrice, getPrevClose,
    calcTotalValue, calcTotalCost, calcDailyPnl };
})();
window.State = State;
