'use strict';
const DividendAnalyticsService = (() => {

  function _holdingsMap() {
    const map = {};
    Ledger.calcHoldings(State.get('transactions') || []).forEach(h => {
      const k = h.symbol;
      if (!map[k]) map[k] = { symbol: k, shares: 0, totalCost: 0, brokers: [] };
      map[k].shares += h.shares;
      map[k].totalCost += h.shares * h.avgCost;
      map[k].brokers.push(h.broker);
    });
    return map;
  }

  function _holdingFor(symbol) {
    const holdings = Ledger.calcHoldings(State.get('transactions') || []).filter(h => h.symbol === symbol);
    if (!holdings.length) return null;
    const shares = holdings.reduce((s, h) => s + h.shares, 0);
    const totalCost = holdings.reduce((s, h) => s + h.shares * h.avgCost, 0);
    return { symbol, shares, avgCost: shares > 0 ? totalCost / shares : 0, totalCost, brokers: holdings.map(h => h.broker) };
  }

  function _loggedForSymbol(symbol) {
    return (State.get('transactions') || [])
      .filter(t => t.type === 'DIVIDEND' && t.symbol === symbol);
  }

  function _annualDps(symbol) {
    const paid = CorporateActionsService.getPaidCash(symbol);
    const thisYear = new Date().getFullYear();
    const lastYear = paid.filter(d => (d.paymentDate || '').startsWith(String(thisYear)));
    if (lastYear.length) return lastYear.reduce((s, d) => s + d.amountPerShare, 0);
    const fy = paid.slice(0, 2);
    return fy.reduce((s, d) => s + d.amountPerShare, 0);
  }

  function _cagrFromCash(symbol) {
    const paid = CorporateActionsService.getPaidCash(symbol);
    if (paid.length < 2) return null;
    const byYear = {};
    paid.forEach(d => {
      const y = (d.paymentDate || '').slice(0, 4);
      if (!byYear[y]) byYear[y] = 0;
      byYear[y] += d.amountPerShare;
    });
    const years = Object.keys(byYear).sort();
    if (years.length < 2) return null;
    const first = byYear[years[0]];
    const last = byYear[years[years.length - 1]];
    if (!first || first <= 0) return null;
    const n = years.length - 1;
    return (Math.pow(last / first, 1 / n) - 1) * 100;
  }

  function getHoldingAnalysis(symbol) {
    const holding = _holdingFor(symbol);
    const price = MarketDataService.getQuote(symbol).price;
    const profile = CorporateActionsService.getSymbolProfile(symbol);
    const annualDps = _annualDps(symbol);
    const shares = holding?.shares || 0;
    const annualIncome = annualDps * shares;
    const monthlyIncome = annualIncome / 12;
    const logged = _loggedForSymbol(symbol);
    const totalReceived = logged.reduce((s, t) => s + (t.amount || 0), 0);
    const avgCost = holding?.avgCost || 0;
    const costBasis = holding?.totalCost || 0;
    const yieldOnCost = costBasis > 0 ? (annualIncome / costBasis) * 100 : null;
    const currentYield = price > 0 && annualDps > 0 ? (annualDps / price) * 100 : null;
    const cagr = _cagrFromCash(symbol);
    const upcoming = CorporateActionsService.getUpcomingCash(symbol);
    const nextEvent = upcoming[0] || null;
    const expectedNext = nextEvent && shares ? nextEvent.amountPerShare * shares : null;

    return {
      symbol, companyName: profile.companyName, sector: profile.sector,
      shares, avgCost, costBasis, price,
      annualDps, annualIncome, monthlyIncome,
      yieldOnCost, currentYield, dividendCagr: cagr,
      totalReceived, loggedCount: logged.length,
      nextEvent, expectedNext,
      isHeld: !!holding,
    };
  }

  function getPortfolioHoldingsAnalysis() {
    const held = Object.keys(_holdingsMap());
    return held.map(sym => getHoldingAnalysis(sym)).sort((a, b) => b.annualIncome - a.annualIncome);
  }

  function getForecast() {
    const holdings = getPortfolioHoldingsAnalysis();
    const thisYear = new Date().getFullYear();
    let expectedThisYear = 0;
    let expectedNextYear = 0;

    holdings.forEach(h => {
      const paid = CorporateActionsService.getPaidCash(h.symbol);
      const upcoming = CorporateActionsService.getUpcomingCash(h.symbol);
      const receivedYtd = (State.get('transactions') || [])
        .filter(t => t.type === 'DIVIDEND' && t.symbol === h.symbol && (t.date || '').startsWith(String(thisYear)))
        .reduce((s, t) => s + (t.amount || 0), 0);

      const upcomingIncome = upcoming.reduce((s, u) => s + u.amountPerShare * h.shares, 0);
      expectedThisYear += receivedYtd + upcomingIncome;

      const lastAnnualDps = _annualDps(h.symbol);
      const growth = h.dividendCagr != null ? 1 + h.dividendCagr / 100 : 1.05;
      expectedNextYear += lastAnnualDps * growth * h.shares;
    });

    const monthlyForecast = expectedThisYear / 12;
    return { expectedThisYear, expectedNextYear, monthlyForecast, holdings };
  }

  function getPortfolioDashboard() {
    const holdings = getPortfolioHoldingsAnalysis();
    const forecast = getForecast();
    const txs = (State.get('transactions') || []).filter(t => t.type === 'DIVIDEND');
    const thisYear = new Date().getFullYear();
    const receivedYtd = txs.filter(t => (t.date || '').startsWith(String(thisYear))).reduce((s, t) => s + (t.amount || 0), 0);
    const thisMonth = new Date().toISOString().slice(0, 7);
    const receivedMtd = txs.filter(t => (t.date || '').startsWith(thisMonth)).reduce((s, t) => s + (t.amount || 0), 0);
    const lifetime = State.getTotalDividends();
    const invested = State.calcTotalCost();
    const portfolioYield = invested > 0 ? (forecast.expectedThisYear / invested) * 100 : 0;

    const byStock = holdings.map(h => ({
      symbol: h.symbol, companyName: h.companyName, sector: h.sector,
      annualIncome: h.annualIncome, totalReceived: h.totalReceived,
      yieldOnCost: h.yieldOnCost, currentYield: h.currentYield, cagr: h.dividendCagr,
    })).filter(h => h.annualIncome > 0 || h.totalReceived > 0);

    const bySector = {};
    byStock.forEach(h => {
      const sec = h.sector || 'Other';
      if (!bySector[sec]) bySector[sec] = { sector: sec, annualIncome: 0, totalReceived: 0, symbols: [] };
      bySector[sec].annualIncome += h.annualIncome;
      bySector[sec].totalReceived += h.totalReceived;
      bySector[sec].symbols.push(h.symbol);
    });
    const sectorBreakdown = Object.values(bySector).sort((a, b) => b.annualIncome - a.annualIncome);
    const totalAnnual = byStock.reduce((s, h) => s + h.annualIncome, 0);
    sectorBreakdown.forEach(s => { s.pct = totalAnnual > 0 ? (s.annualIncome / totalAnnual) * 100 : 0; });

    const upcoming = CorporateActionsService.getAllUpcoming().map(u => {
      const h = _holdingFor(u.symbol);
      return {
        ...u,
        shares: h?.shares || 0,
        expectedIncome: h ? u.amountPerShare * h.shares : 0,
        isHeld: !!h,
      };
    });

    return {
      receivedYtd, receivedMtd, lifetime, portfolioYield,
      expectedThisYear: forecast.expectedThisYear,
      expectedNextYear: forecast.expectedNextYear,
      monthlyForecast: forecast.monthlyForecast,
      byStock, bySector: sectorBreakdown, upcoming,
      holdingsCount: holdings.filter(h => h.isHeld).length,
    };
  }

  function getTimeline() {
    const txs = (State.get('transactions') || [])
      .filter(t => t.type === 'DIVIDEND')
      .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

    const byMonth = {};
    txs.forEach(t => {
      const m = (t.date || '').slice(0, 7);
      if (!byMonth[m]) byMonth[m] = { month: m, total: 0, events: [] };
      byMonth[m].total += t.amount || 0;
      byMonth[m].events.push(t);
    });

    let cumulative = 0;
    const months = Object.values(byMonth).sort((a, b) => a.month.localeCompare(b.month));
    months.forEach(m => { cumulative += m.total; m.cumulative = cumulative; });

    return { months, totalEvents: txs.length, cumulative };
  }

  function getCalendar() {
    const upcoming = CorporateActionsService.getAllUpcoming();
    const byMonth = {};
    upcoming.forEach(u => {
      const h = _holdingFor(u.symbol);
      const entry = {
        ...u,
        shares: h?.shares || 0,
        expectedIncome: h ? u.amountPerShare * h.shares : 0,
        isHeld: !!h,
      };
      const payMonth = (u.paymentDate || '').slice(0, 7);
      const exMonth = (u.exDate || '').slice(0, 7);
      [payMonth, exMonth].forEach(m => {
        if (!m) return;
        if (!byMonth[m]) byMonth[m] = { month: m, paymentEvents: [], exEvents: [] };
        if (m === payMonth) byMonth[m].paymentEvents.push(entry);
        if (m === exMonth && m !== payMonth) byMonth[m].exEvents.push(entry);
      });
    });
    return Object.values(byMonth).sort((a, b) => a.month.localeCompare(b.month));
  }

  function getGrowthAnalytics() {
    const held = Object.keys(_holdingsMap());
    return held.map(sym => {
      const h = getHoldingAnalysis(sym);
      const yieldHist = CorporateActionsService.getYieldHistory(sym);
      const paid = CorporateActionsService.getPaidCash(sym);
      const dpsByYear = {};
      paid.forEach(d => {
        const y = (d.paymentDate || '').slice(0, 4);
        dpsByYear[y] = (dpsByYear[y] || 0) + d.amountPerShare;
      });
      return {
        symbol: sym, companyName: h.companyName, cagr: h.dividendCagr,
        yieldOnCost: h.yieldOnCost, currentYield: h.currentYield,
        yieldHistory: yieldHist, dpsByYear,
        trend: h.dividendCagr != null ? (h.dividendCagr >= 5 ? 'growing' : h.dividendCagr >= 0 ? 'stable' : 'declining') : 'unknown',
      };
    }).filter(g => g.cagr != null || g.yieldHistory.length).sort((a, b) => (b.cagr || 0) - (a.cagr || 0));
  }

  function getHistoricalTable(symbol) {
    const cash = CorporateActionsService.getCashDividends(symbol);
    const bonus = CorporateActionsService.getBonusShares(symbol);
    const rights = CorporateActionsService.getRightsIssues(symbol);
    const logged = symbol ? _loggedForSymbol(symbol) : (State.get('transactions') || []).filter(t => t.type === 'DIVIDEND');

    const timeline = [
      ...cash.map(c => ({ ...c, actionType: 'Cash Dividend', amount: c.amountPerShare })),
      ...bonus.map(b => ({ ...b, actionType: 'Bonus Shares', amount: b.ratio })),
      ...rights.map(r => ({ ...r, actionType: 'Rights Issue', amount: r.issuePrice })),
    ].sort((a, b) => {
      const da = a.paymentDate || a.creditDate || a.exDate || '';
      const db = b.paymentDate || b.creditDate || b.exDate || '';
      return db.localeCompare(da);
    });

    return { timeline, logged, cash, bonus, rights };
  }

  return {
    getHoldingAnalysis, getPortfolioHoldingsAnalysis, getForecast, getPortfolioDashboard,
    getTimeline, getCalendar, getGrowthAnalytics, getHistoricalTable,
  };
})();
window.DividendAnalyticsService = DividendAnalyticsService;
