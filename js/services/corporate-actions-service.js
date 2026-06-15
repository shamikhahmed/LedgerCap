'use strict';
const CorporateActionsService = (() => {
  let _adapter = null;

  function setAdapter(adapter) {
    _adapter = adapter;
  }

  function _data(symbol) {
    if (_adapter?.getSymbolData) return _adapter.getSymbolData(symbol);
    return (window.DIVIDEND_DATA || {})[symbol] || null;
  }

  function _companyName(symbol, data) {
    if (data?.companyName) return data.companyName;
    const meta = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === symbol);
    return meta?.name || symbol;
  }

  function _sector(symbol, data) {
    if (data?.sector) return data.sector;
    const meta = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === symbol);
    return meta?.sector || 'Other';
  }

  function getSymbolProfile(symbol) {
    const data = _data(symbol);
    return {
      symbol,
      companyName: _companyName(symbol, data),
      sector: _sector(symbol, data),
      hasData: !!data,
    };
  }

  function getCashDividends(symbol) {
    const data = _data(symbol);
    if (!data) return [];
    return (data.cashDividends || []).map(d => ({
      ...d,
      symbol,
      type: 'cash',
      companyName: data.companyName,
    })).sort((a, b) => (b.paymentDate || '').localeCompare(a.paymentDate || ''));
  }

  function getBonusShares(symbol) {
    const data = _data(symbol);
    if (!data) return [];
    return (data.bonusShares || []).map(b => ({
      ...b, symbol, type: 'bonus', companyName: data.companyName,
    })).sort((a, b) => (b.creditDate || '').localeCompare(a.creditDate || ''));
  }

  function getRightsIssues(symbol) {
    const data = _data(symbol);
    if (!data) return [];
    return (data.rightsIssues || []).map(r => ({
      ...r, symbol, type: 'rights', companyName: data.companyName,
    })).sort((a, b) => (b.exDate || '').localeCompare(a.exDate || ''));
  }

  function getYieldHistory(symbol) {
    const data = _data(symbol);
    return (data?.yieldHistory || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  function getAllActions(symbol) {
    return {
      cash: getCashDividends(symbol),
      bonus: getBonusShares(symbol),
      rights: getRightsIssues(symbol),
      yieldHistory: getYieldHistory(symbol),
    };
  }

  function getUpcomingCash(symbol) {
    return getCashDividends(symbol).filter(d => d.status === 'upcoming');
  }

  function getPaidCash(symbol) {
    return getCashDividends(symbol).filter(d => d.status === 'paid');
  }

  function listSymbolsWithData() {
    if (_adapter?.listSymbols) return _adapter.listSymbols();
    return Object.keys(window.DIVIDEND_DATA || {});
  }

  function getAllUpcoming() {
    const symbols = listSymbolsWithData();
    const items = [];
    symbols.forEach(sym => {
      getUpcomingCash(sym).forEach(d => items.push({ ...d, sector: _sector(sym, _data(sym)) }));
    });
    return items.sort((a, b) => (a.paymentDate || '').localeCompare(b.paymentDate || ''));
  }

  return {
    setAdapter, getSymbolProfile, getCashDividends, getBonusShares, getRightsIssues,
    getYieldHistory, getAllActions, getUpcomingCash, getPaidCash,
    listSymbolsWithData, getAllUpcoming,
  };
})();
window.CorporateActionsService = CorporateActionsService;
