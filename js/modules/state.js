'use strict';
const State = (() => {
  const KEY = 'ledgercap_v2';
  const LEGACY_KEYS = ['stundsOS_v2'];

  function _readStorage() {
    let raw = localStorage.getItem(KEY);
    if (raw) return raw;
    for (const lk of LEGACY_KEYS) {
      raw = localStorage.getItem(lk);
      if (raw) {
        localStorage.setItem(KEY, raw);
        return raw;
      }
    }
    return null;
  }

  const DEFAULT = {
    transactions: [],
    prices: {},
    kseIndex: {},
    priceHistory: [],
    watchlist: [],
    journal: [],
    researchNotes: {},
    sectorMap: {},
    settings: {
      salary: 150000,
      targetSIP: 75000,
      currency: 'PKR',
      inflationRate: 0.20,
      targetReturn: 0.18,
      freedomTarget: 100000,
      usdRate: 280,
      goldPricePerGram: 18000,
      pkrDepreciationRate: 0.15,
      primaryBroker: 'Mixed',
      onboardingDone: false,
      psxProxyUrl: '',
      theme: 'dark',
    },
    version: 5,
  };

  function _migrateV5() {
    if (!_s.watchlist) _s.watchlist = [];
    if (!_s.journal) _s.journal = [];
    if (!_s.researchNotes) _s.researchNotes = {};
    if (!_s.sectorMap) _s.sectorMap = {};
    if (!_s.settings.theme) _s.settings.theme = 'dark';
    _seedWatchlist();
    _s.version = 5;
  }

  function _seedWatchlist() {
    if (_s.watchlist.length) return;
    const staticList = window.WATCHLIST || [];
    if (!staticList.length) return;
    _s.watchlist = staticList.map(w => ({
      ...w,
      id: typeof Ledger !== 'undefined' && Ledger.newId ? Ledger.newId() : 'wl_' + w.symbol,
      addedAt: Date.now(),
    }));
  }

  let _s = null;

  function _seedFallbackPrices() {
    const fp = window.FALLBACK_PRICES || {};
    Object.entries(fp).forEach(([symbol, price]) => {
      if (!_s.prices[symbol]) {
        _s.prices[symbol] = { price, prevClose: price * 0.998, ts: Date.now() - 86400000, source: 'fallback' };
      }
    });
    (window.MEEZAN_FUNDS || []).forEach(f => {
      if (!_s.prices[f.symbol] && f.currentNav) {
        _s.prices[f.symbol] = { price: f.currentNav, prevClose: f.currentNav * 0.999, ts: Date.now() - 86400000, source: 'fallback' };
      }
    });
  }

  function _seedTransactions() {
    const init = window.INITIAL_TRANSACTIONS || [];
    if (!init.length) return;
    if (!_s.transactions.length) {
      _s.transactions = [...init];
      return;
    }
    // Patch amounts for initial transactions already stored (corrects historical data errors)
    const initById = {};
    init.forEach(t => { initById[t.id] = t; });
    let patched = false;
    _s.transactions = _s.transactions.map(t => {
      const src = initById[t.id];
      if (src && t.amount !== src.amount) { patched = true; return { ...t, amount: src.amount, notes: src.notes }; }
      return t;
    });
    if (patched) save();
  }

  function load() {
    let shouldPersist = false;
    try {
      const r = _readStorage();
      if (r) {
        const parsed = JSON.parse(r);
        _s = { ...DEFAULT, ...parsed };
        _s.settings = { ...DEFAULT.settings, ...(parsed.settings || {}) };
        if (parsed.transactions?.length > 0 && !_s.settings.onboardingDone) {
          _s.settings.onboardingDone = true;
        }
        const prevProxy = _s.settings.psxProxyUrl || '';
        if (!_s.settings.psxProxyUrl && window.LEDGERCAP_CONFIG?.psxProxyUrl) {
          _s.settings.psxProxyUrl = window.LEDGERCAP_CONFIG.psxProxyUrl;
          shouldPersist = true;
        }
        if (window.LedgerCapConfig?.resolvePsxProxyUrl) {
          const normalized = window.LedgerCapConfig.resolvePsxProxyUrl(_s.settings.psxProxyUrl);
          if (normalized && normalized !== prevProxy) {
            _s.settings.psxProxyUrl = normalized;
            shouldPersist = true;
          }
        }
        if (!_s.version || _s.version < 5) {
          _migrateV5();
          shouldPersist = true;
        }
      } else {
        _s = JSON.parse(JSON.stringify(DEFAULT));
      }
    } catch {
      _s = JSON.parse(JSON.stringify(DEFAULT));
    }
    _seedTransactions();
    _seedFallbackPrices();
    if (shouldPersist) save();
  }

  function get(k) { if (!_s) load(); return k ? _s[k] : _s; }
  function set(k, v) { if (!_s) load(); _s[k] = v; save(); }
  function update(fn) { if (!_s) load(); fn(_s); save(); }
  function save() {
    try {
      const json = JSON.stringify(_s);
      localStorage.setItem(KEY, json);
      if (!localStorage.getItem(KEY)) console.error('LedgerCap: localStorage write failed silently');
    } catch(e) {
      console.warn('LedgerCap save error:', e.message);
    }
  }
  function reset() {
    localStorage.removeItem(KEY);
    LEGACY_KEYS.forEach(k => localStorage.removeItem(k));
    _s = null;
    load();
  }
  function exportJSON() { if (!_s) load(); return JSON.stringify(_s, null, 2); }
  function importJSON(str) {
    try {
      const parsed = JSON.parse(str);
      _s = { ...DEFAULT, ...parsed };
      _s.settings = { ...DEFAULT.settings, ...(parsed.settings || {}) };
      if (!_s.version || _s.version < 5) _migrateV5();
      save();
      return true;
    } catch { return false; }
  }

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

  function updateTransaction(id, patch) {
    if (!_s) load();
    const idx = _s.transactions.findIndex(t => t.id === id);
    if (idx < 0) return false;
    _s.transactions[idx] = { ..._s.transactions[idx], ...patch, updatedAt: Date.now() };
    _logPortfolioValue();
    save();
    return true;
  }

  function updatePrice(symbol, priceData) {
    if (!_s) load();
    const price = typeof priceData === 'number' ? priceData : priceData.price;
    const source = typeof priceData === 'object' ? priceData.source : 'manual';
    const trusted = ['psx_live', 'psx_int', 'psx_symbol', 'psx_eod', 'manual', 'meezan_seed'].includes(source);
    const fallback = (window.FALLBACK_PRICES || {})[symbol];
    if (!trusted && fallback && price && price > 0) {
      if (price > fallback * 2.5 || price < fallback * 0.4) {
        console.warn(`Rejected bad price for ${symbol}: ₨${price} (fallback: ₨${fallback})`);
        return;
      }
    }
    _s.prices[symbol] = typeof priceData === 'number'
      ? { price, prevClose: _s.prices[symbol]?.price || price, ts: Date.now(), source: 'manual' }
      : { ...priceData, ts: Date.now() };
    _logPortfolioValue();
    save();
  }

  function getPrice(symbol) {
    if (!_s) load();
    return _s.prices[symbol]?.price || 0;
  }

  function getPriceSource(symbol) {
    if (!_s) load();
    return _s.prices[symbol]?.source || null;
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

  function dividendsBySymbol() {
    if (!_s) load();
    const map = {};
    (_s.transactions || []).filter(t => t.type === 'DIVIDEND').forEach(t => {
      const sym = (t.symbol || '').trim() || '_general';
      map[sym] = (map[sym] || 0) + (t.amount || 0);
    });
    return map;
  }

  function getTotalDividends() {
    if (!_s) load();
    return Ledger.totalDividends(_s.transactions);
  }

  function getHoldingDividends(symbol, broker) {
    if (!_s) load();
    return (_s.transactions || [])
      .filter(t => t.type === 'DIVIDEND' && t.symbol === symbol && (!t.broker || !broker || t.broker === broker))
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  load();
  return { get, set, update, save, reset, exportJSON, importJSON,
    addTransaction, deleteTransaction, updateTransaction, updatePrice, getPrice, getPriceSource, getPrevClose,
    calcTotalValue, calcTotalCost, calcDailyPnl, dividendsBySymbol, getTotalDividends, getHoldingDividends };
})();
window.State = State;
