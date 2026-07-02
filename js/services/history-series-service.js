'use strict';
/** Per-symbol + index price history for 1M/1Y/5Y charts (local storage). */
const HistorySeriesService = (() => {
  const MAX_POINTS = 1260;

  function _ensure(state) {
    if (!state.seriesHistory) state.seriesHistory = {};
    if (!state.fundNavHistory) state.fundNavHistory = {};
    return state;
  }

  function recordSymbol(symbol, price, date) {
    if (!symbol || !(price > 0)) return;
    const state = _ensure(State.get());
    const sym = symbol.toUpperCase();
    const d = date || new Date().toISOString().slice(0, 10);
    if (!state.seriesHistory[sym]) state.seriesHistory[sym] = [];
    const rows = state.seriesHistory[sym];
    const idx = rows.findIndex((r) => r.date === d);
    const row = { date: d, price: Number(price) };
    if (idx >= 0) rows[idx] = row;
    else rows.push(row);
    rows.sort((a, b) => a.date.localeCompare(b.date));
    state.seriesHistory[sym] = rows.slice(-MAX_POINTS);
    State.set(state);
  }

  function recordFromPrices(prices) {
    if (!prices || typeof prices !== 'object') return;
    Object.entries(prices).forEach(([sym, row]) => {
      const p = typeof row === 'number' ? row : row?.price;
      if (p > 0) recordSymbol(sym, p);
    });
  }

  function recordFundNav(symbol, nav, date) {
    if (!symbol || !(nav > 0)) return;
    const state = _ensure(State.get());
    const sym = symbol.toUpperCase();
    const d = date || new Date().toISOString().slice(0, 10);
    if (!state.fundNavHistory[sym]) state.fundNavHistory[sym] = [];
    const rows = state.fundNavHistory[sym];
    const idx = rows.findIndex((r) => r.date === d);
    const row = { date: d, nav: Number(nav) };
    if (idx >= 0) rows[idx] = row;
    else rows.push(row);
    rows.sort((a, b) => a.date.localeCompare(b.date));
    state.fundNavHistory[sym] = rows.slice(-MAX_POINTS);
    State.set(state);
  }

  function getSeries(symbol, rangeDays) {
    const sym = (symbol || '').toUpperCase();
    const state = State.get();
    const rows = state.seriesHistory?.[sym] || [];
    if (!rangeDays || rangeDays <= 0) return rows.map((r) => r.price);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - rangeDays);
    const cut = cutoff.toISOString().slice(0, 10);
    return rows.filter((r) => r.date >= cut).map((r) => r.price);
  }

  function getPortfolioSeries(rangeDays) {
    const hist = State.get().priceHistory || [];
    if (!rangeDays) return hist.map((h) => h.value).filter((v) => v > 0);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - rangeDays);
    const cut = cutoff.toISOString().slice(0, 10);
    return hist.filter((h) => h.date >= cut).map((h) => h.value).filter((v) => v > 0);
  }

  function ranges() {
    return [
      { id: '1w', label: '1W', days: 7 },
      { id: '1m', label: '1M', days: 30 },
      { id: '3m', label: '3M', days: 90 },
      { id: '1y', label: '1Y', days: 365 },
      { id: '5y', label: '5Y', days: 1260 },
      { id: 'all', label: 'All', days: 0 },
    ];
  }

  return { recordSymbol, recordFromPrices, recordFundNav, getSeries, getPortfolioSeries, ranges };
})();
window.HistorySeriesService = HistorySeriesService;
