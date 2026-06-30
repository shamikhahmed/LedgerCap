'use strict';
const Dashboard = (() => {
  const U = PlatformUI;

  function render() {
    const screen = document.getElementById('screen-dashboard');
    if (!screen) return;

    const state = State.get();
    const hasHoldings = (state.transactions || []).length > 0;

    if (!hasHoldings) {
      screen.innerHTML = `
      ${MarketUI.marketStripFull([])}
      ${MarketUI.sectionHead('Dashboard', 'Start here')}
      ${MarketUI.emptyState('📊', 'Your wealth OS starts here', 'Track PSX stocks, Meezan funds, dividends, and net worth — all on your device.',
        `<button type="button" class="os-btn os-btn-primary" onclick="Navigation.go('holdings')">Add holdings</button>
         <button type="button" class="os-btn os-btn-ghost" style="margin-top:10px" onclick="location.search='?demo=1';location.reload()">Load demo portfolio</button>`)}`;
      CapMotion.refresh();
      return;
    }

    const summary = PortfolioAnalyticsService.getSummary(state);
    const intel = PortfolioAnalyticsService.getIntelligence(state);
    const dailyPnl = State.calcDailyPnl();
    const dash = typeof DividendService !== 'undefined' ? DividendService.getPortfolioAnalysis() : null;
    const annualIncome = dash?.expectedThisYear ?? summary.dividendIncome ?? 0;
    const attention = intel.insights.slice(0, 4);

    screen.innerHTML = `
    ${MarketUI.marketStripFull(PortfolioAnalyticsService.getHoldings())}
    <div class="os-hero cap-reveal">
      <div class="os-hero-label">Portfolio Value</div>
      <div class="os-hero-value">${U.fmt(summary.totalValue)}</div>
      <div class="os-hero-pills">
        <span class="os-pill ${U.chgCls(dailyPnl)}">Today ${dailyPnl >= 0 ? '+' : ''}${U.fmt(dailyPnl)}</span>
        <span class="os-pill ${U.chgCls(summary.totalReturn.pct)}">All time ${U.fmt(summary.totalReturn.pct, { pct: true, signed: true })}</span>
      </div>
    </div>

    <div class="os-stat-row cap-reveal">
      <div class="os-stat-item">
        <div class="os-stat-item-label">Passive income (est.)</div>
        <div class="os-stat-item-value t-gain">${U.fmt(annualIncome)}<span style="font-size:var(--type-caption);font-weight:500;color:var(--os-text-secondary);"> /yr</span></div>
      </div>
      <div class="os-stat-item">
        <div class="os-stat-item-label">Yield on cost</div>
        <div class="os-stat-item-value">${U.fmt(summary.portfolioDivYield, { pct: true })}</div>
      </div>
      <div class="os-stat-item">
        <div class="os-stat-item-label">Invested</div>
        <div class="os-stat-item-value">${U.fmt(summary.invested)}</div>
      </div>
      <div class="os-stat-item">
        <div class="os-stat-item-label">Available cash</div>
        <div class="os-stat-item-value">${U.fmt(Ledger.cashBalance(state.transactions || []))}</div>
      </div>
    </div>

    ${attention.length ? `
    <div class="os-section cap-reveal">
      <div class="os-section-title">Requires attention</div>
      ${attention.map(i => `<div class="os-attention-item ${i.severity}">${i.text}</div>`).join('')}
      <button type="button" class="os-btn os-btn-ghost" style="width:100%;margin-top:var(--space-2);" onclick="Navigation.go('research', false, { portfolioIntel: true })">View all insights</button>
    </div>` : ''}

    ${summary.sectorAllocation?.length ? `
    <div class="os-section cap-reveal">
      <div class="os-section-title">Sector exposure</div>
      <div class="os-alloc-bar">${summary.sectorAllocation.slice(0, 6).map((s, i) => `<div class="os-alloc-seg" style="width:${s.pct}%;--seg-i:${i}"></div>`).join('')}</div>
      <div class="os-alloc-legend">${summary.sectorAllocation.slice(0, 5).map(s => `<span>${s.sector} ${s.pct.toFixed(0)}%</span>`).join('')}</div>
    </div>` : ''}

    ${(state.priceHistory || []).length > 1 ? `
    <div class="os-section cap-reveal">
      <div class="os-section-title">Portfolio history</div>
      <div class="os-card" id="nw-chart"></div>
    </div>` : ''}
    <div style="height:var(--space-4);"></div>`;

    const chartEl = document.getElementById('nw-chart');
    if (chartEl && state.priceHistory?.length > 1) {
      chartEl.innerHTML = Charts.lineChart(state.priceHistory.map(h => h.value), { color: '#2563eb', height: 120, fill: false });
    }
    CapMotion.refresh();
  }

  return { render };
})();
window.Dashboard = Dashboard;
