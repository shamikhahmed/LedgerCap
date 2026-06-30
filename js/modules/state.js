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
    kseHistory: [],
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
      numberFormat: 'full',
    },
    holdingMeta: {},
    ipoEvents: [],
    priceAlerts: [],
    pilotSettings: {
      concentrationThresholdPct: 20,
      corePeDiscountPct: 15,
      swingRsiOversold: 35,
      swingRsiOverbought: 65,
      isFiler: true,
      cashBalancePkr: 0,
    },
    cashLedger: [],
    manualAssets: { usdCash: 0, goldGrams: 0, realEstate: 0, brokerCashPkr: 0 },
    portfolios: [],
    version: 8,
    seedDataVersion: 0,
  };

  function _migrateV8() {
    if (!_s.portfolios) _s.portfolios = [];
    _s.version = 8;
  }

  function _migrateV7() {
    if (!_s.manualAssets) _s.manualAssets = { usdCash: 0, goldGrams: 0, realEstate: 0, brokerCashPkr: 0 };
    if (_s.manualAssets.brokerCashPkr == null) _s.manualAssets.brokerCashPkr = 0;
    if (_s.settings.zakatDebts == null) _s.settings.zakatDebts = 0;
    if (!_s.kseHistory) _s.kseHistory = [];
    if (!_s.settings.numberFormat) _s.settings.numberFormat = 'full';
    _s.version = 7;
  }

  function _migrateV6() {
    if (!_s.holdingMeta) _s.holdingMeta = {};
    if (!_s.ipoEvents) _s.ipoEvents = [];
    if (!_s.priceAlerts) _s.priceAlerts = [];
    if (!_s.cashLedger) _s.cashLedger = [];
    if (!_s.pilotSettings) {
      _s.pilotSettings = { ...DEFAULT.pilotSettings };
    } else {
      _s.pilotSettings = { ...DEFAULT.pilotSettings, ..._s.pilotSettings };
    }
    _s.version = 6;
  }

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

  function _seedPriceHistory() {
    if (typeof Ledger === 'undefined' || !Ledger.portfolioValueTimeline) return;
    const fp = window.FALLBACK_PRICES || {};
    const timeline = Ledger.portfolioValueTimeline(_s.transactions, (sym, fallback) => {
      const p = _s.prices[sym]?.price;
      return (p && p > 0) ? p : (fp[sym] || fallback || 0);
    });
    if (timeline.length) {
      _s.priceHistory = timeline.map(p => ({ date: p.date, value: p.value }));
    }
  }

  function _applySeedDataMigration() {
    const target = window.SEED_DATA_VERSION || window.PORTFOLIO_SEED_VERSION || 0;
    if (!target || !window.INITIAL_TRANSACTIONS?.length) return false;
    if (_s.seedDataVersion === target) return false;
    _s.transactions = window.INITIAL_TRANSACTIONS.map(t => ({ ...t, id: t.id || Ledger.newId(), createdAt: Date.now() }));
    _s.seedDataVersion = target;
    _s.settings.onboardingDone = true;
    Object.entries(window.FALLBACK_PRICES || {}).forEach(([sym, price]) => {
      _s.prices[sym] = { price, prevClose: price * 0.998, source: 'seed', ts: Date.now() };
    });
    (window.MEEZAN_FUNDS || []).forEach(f => {
      if (f.currentNav) {
        _s.prices[f.symbol] = { price: f.currentNav, prevClose: f.currentNav * 0.999, source: 'meezan_seed', ts: Date.now() };
      }
    });
    _seedWatchlist();
    _seedPriceHistory();
    return true;
  }

  function _seedTransactions() {
    const init = window.INITIAL_TRANSACTIONS || [];
    if (!init.length) return;
    if (_applySeedDataMigration()) { save(); return; }
    if (!_s.transactions.length) {
      _s.transactions = [...init];
      _seedPriceHistory();
      save();
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
        if (!_s.version || _s.version < 6) {
          _migrateV6();
          shouldPersist = true;
        }
        if (!_s.version || _s.version < 7) {
          _migrateV7();
          shouldPersist = true;
        }
        if (!_s.version || _s.version < 8) {
          _migrateV8();
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
      if (!_s.version || _s.version < 6) _migrateV6();
      if (!_s.version || _s.version < 7) _migrateV7();
      if (!_s.version || _s.version < 8) _migrateV8();
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
    const trusted = ['psx_live', 'psx_int', 'psx_symbol', 'psx_eod', 'yahoo_intl', 'coingecko', 'yahoo', 'manual', 'meezan_seed'].includes(source);
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

  function isPriceStale(symbol, maxHours) {
    if (!_s) load();
    maxHours = maxHours == null ? 24 : maxHours;
    const ts = _s.prices[symbol]?.ts;
    if (!ts) return true;
    return (Date.now() - ts) > maxHours * 3600000;
  }

  function priceAgeLabel(symbol) {
    const ts = _s?.prices?.[symbol]?.ts;
    if (!ts || typeof Prices === 'undefined') return '';
    return Prices.formatTs(ts);
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

    const globalVal = (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(_s.transactions) : []).reduce((sum, h) => {
      const pkr = getPrice(h.symbol);
      const usd = pkr ? FxService.pkrToUsd(pkr) : (window.GLOBAL_FALLBACK_USD || {})[h.symbol] || h.avgCostUsd;
      const px = pkr || FxService.usdToPkr(usd || 0);
      return sum + h.qty * (px || FxService.usdToPkr(h.avgCostUsd || 0));
    }, 0);

    const ma = _s.manualAssets || {};
    const settings = _s.settings || {};
    const manualVal =
      (ma.usdCash || 0) * FxService.getUsdRate() +
      (ma.goldGrams || 0) * (settings.goldPricePerGram || 18000) +
      (ma.realEstate || 0) +
      (ma.brokerCashPkr || 0);

    return stockVal + fundVal + globalVal + manualVal;
  }

  function calcTotalCost() {
    if (!_s) load();
    return Ledger.currentCostBasis
      ? Ledger.currentCostBasis(_s.transactions)
      : Ledger.totalInvested(_s.transactions);
  }

  function calcDailyPnl() {
    if (!_s) load();
    const holdings = Ledger.calcHoldings(_s.transactions);
    const funds = Ledger.calcFundHoldings(_s.transactions);
    const stockPnl = holdings.reduce((sum, h) => {
      const curr = getPrice(h.symbol);
      const prev = getPrevClose(h.symbol);
      if (!curr || !prev) return sum;
      return sum + h.shares * (curr - prev);
    }, 0);
    const fundPnl = funds.reduce((sum, f) => {
      const curr = getPrice(f.symbol);
      const prev = getPrevClose(f.symbol);
      const nav = curr || prev || f.avgNav;
      const prevNav = prev || curr || f.avgNav;
      if (!nav || !prevNav) return sum;
      return sum + f.units * (nav - prevNav);
    }, 0);
    const globalPnl = (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(_s.transactions) : []).reduce((sum, h) => {
      const curr = getPrice(h.symbol);
      const prev = getPrevClose(h.symbol);
      if (!curr || !prev) return sum;
      return sum + h.qty * (curr - prev);
    }, 0);
    return stockPnl + fundPnl + globalPnl;
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

  function recordKseSnapshot(kse) {
    if (!_s) load();
    if (!kse?.value) return;
    if (!_s.kseHistory) _s.kseHistory = [];
    const today = new Date().toISOString().slice(0, 10);
    const idx = _s.kseHistory.findIndex(p => p.date === today);
    const row = { date: today, value: kse.value };
    if (idx >= 0) _s.kseHistory[idx] = row;
    else _s.kseHistory.push(row);
    _s.kseHistory = _s.kseHistory.slice(-30);
    save();
  }

  load();
  return { get, set, update, save, reset, exportJSON, importJSON,
    addTransaction, deleteTransaction, updateTransaction, updatePrice, getPrice, getPriceSource, getPrevClose,
    isPriceStale, priceAgeLabel,
    calcTotalValue, calcTotalCost, calcDailyPnl, dividendsBySymbol, getTotalDividends, getHoldingDividends, recordKseSnapshot };
})();
window.State = State;
