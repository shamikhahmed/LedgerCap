'use strict';
const StockComparison = (() => {
  let _symbol1 = '';
  let _symbol2 = '';

  function render() {
    const screen = document.getElementById('screen-comparison');
    if (!screen) return;

    const holdings = PortfolioAnalyticsService ? PortfolioAnalyticsService.getHoldings() : [];
    const symbols = holdings.map(h => h.symbol);

    if (symbols.length < 2) {
      screen.innerHTML = `<div class="lc-dash"><div class="lc-screen-head"><h1>Compare</h1><p>Side by side</p></div>${MarketUI.emptyState('⚖️', 'Need 2+ holdings to compare', 'Add more stocks or funds to compare side-by-side performance.', '<button type="button" class="os-btn os-btn-primary" onclick="App.openAddTransaction()">Add holdings</button>')}</div>`;
      CapMotion.refresh();
      return;
    }

    // Use selected symbols if available, otherwise use first two
    const sym1 = _symbol1 || symbols[0];
    const sym2 = _symbol2 || symbols[1];
    const comp1 = _buildComparison(sym1);
    const comp2 = _buildComparison(sym2);

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Compare</h1><p>Side by side · ${sym1} vs ${sym2}</p></div>
    <div class="comp-header cap-reveal" style="padding-top:0">
      <div class="comp-selectors">
        <select class="comp-select" onchange="StockComparison._selectSymbol(1, this.value)">
          <option value="">Select Stock 1</option>
          ${symbols.map(s => `<option value="${s}" ${sym1 === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
        <select class="comp-select" onchange="StockComparison._selectSymbol(2, this.value)">
          <option value="">Select Stock 2</option>
          ${symbols.map(s => `<option value="${s}" ${sym2 === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>

    ${sym1 && sym2 ? `
    <div class="comp-grid cap-reveal">
      <div class="comp-card">
        <div class="comp-card-title">${sym1}</div>
        ${_renderComparisonCard(comp1)}
      </div>
      <div class="comp-card">
        <div class="comp-card-title">${sym2}</div>
        ${_renderComparisonCard(comp2)}
      </div>
    </div>

    <div class="comp-verdict cap-reveal">
      <div class="comp-verdict-title">Comparison Results</div>
      ${_renderVerdict(comp1, comp2)}
    </div>
    ` : '<div class="os-empty-body cap-reveal">Select two stocks to compare</div>'}

    </div>`;
    CapMotion.refresh();
  }

  function _buildComparison(symbol) {
    const holdings = PortfolioAnalyticsService ? PortfolioAnalyticsService.getHoldings() : [];
    const h = holdings.find(holding => holding.symbol === symbol) || {};
    const price = State.getPrice(symbol);
    const prevClose = State.getPrevClose(symbol);
    const change = price - prevClose;
    const changePct = prevClose > 0 ? (change / prevClose) * 100 : 0;
    const totalValue = h.value || 0;
    const totalCost = h.costBasis || h.cost || h.invested || 0;
    const totalReturn = totalValue - totalCost;
    const returnPct = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;
    const divPaid = (typeof State !== 'undefined' && State.dividendsBySymbol)
      ? (State.dividendsBySymbol()[symbol] || 0)
      : (h.dividend || 0);
    const yieldPct = h.divYield || 0;

    return {
      symbol,
      price,
      change,
      changePct,
      totalValue,
      totalCost,
      totalReturn,
      returnPct,
      divPaid,
      yieldPct,
      units: h.quantity || 0
    };
  }

  function _renderComparisonCard(comp) {
    return `
      <div class="comp-metric">
        <div class="comp-metric-label">Current Price</div>
        <div class="comp-metric-value">${PlatformUI.fmt(comp.price)}</div>
        <div class="comp-metric-sub ${comp.changePct >= 0 ? 't-gain' : 't-loss'}">${comp.changePct >= 0 ? '+' : ''}${PlatformUI.fmt(comp.changePct, { pct: true })}</div>
      </div>
      <div class="comp-metric">
        <div class="comp-metric-label">Total Return</div>
        <div class="comp-metric-value ${comp.returnPct >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(comp.totalReturn)}</div>
        <div class="comp-metric-sub">${comp.returnPct >= 0 ? '+' : ''}${PlatformUI.fmt(comp.returnPct, { pct: true })}</div>
      </div>
      <div class="comp-metric">
        <div class="comp-metric-label">Dividend Yield</div>
        <div class="comp-metric-value">${PlatformUI.fmt(comp.yieldPct, { pct: true })}</div>
        <div class="comp-metric-sub">₨${PlatformUI.fmt(comp.divPaid)}</div>
      </div>
      <div class="comp-metric">
        <div class="comp-metric-label">Position Value</div>
        <div class="comp-metric-value">${PlatformUI.fmt(comp.totalValue)}</div>
        <div class="comp-metric-sub">${PlatformUI.fmt(comp.units)} units</div>
      </div>
    `;
  }

  function _renderVerdict(comp1, comp2) {
    let score1 = 0, score2 = 0;
    if (comp1.returnPct > comp2.returnPct) score1++; else score2++;
    if (comp1.yieldPct > comp2.yieldPct) score1++; else score2++;
    if (comp1.changePct > comp2.changePct) score1++; else score2++;
    if (comp1.price / comp1.totalCost > comp2.price / comp2.totalCost) score1++; else score2++;
    const winner = score1 > score2 ? 'winner-left' : score2 > score1 ? 'winner-right' : 'tie';
    return `
      <div class="comp-verdict-row">
        <div class="comp-verdict-metric">
          <div class="comp-verdict-name">Return</div>
          <div class="comp-verdict-score ${score1 > score2 ? 'winner' : ''}">${comp1.symbol}</div>
          <div class="comp-verdict-vs">vs</div>
          <div class="comp-verdict-score ${score2 > score1 ? 'winner' : ''}">${comp2.symbol}</div>
        </div>
      </div>
      <div class="comp-verdict-winner ${winner}">
        ${winner === 'tie' ? '🤝 Tied Performance' : (score1 > score2 ? `🏆 ${comp1.symbol} Leads` : `🏆 ${comp2.symbol} Leads`)}
      </div>
    `;
  }

  function _selectSymbol(n, symbol) {
    if (n === 1) _symbol1 = symbol;
    if (n === 2) _symbol2 = symbol;
    render();
  }

  return { render, _selectSymbol };
})();
window.StockComparison = StockComparison;
window.Comparison = StockComparison;
