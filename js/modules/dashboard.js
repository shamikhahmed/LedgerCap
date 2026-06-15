'use strict';
const Dashboard = (() => {
  const U = PlatformUI;

  function render() {
    const screen = document.getElementById('screen-dashboard');
    if (!screen) return;

    const state = State.get();
    const summary = PortfolioAnalyticsService.getSummary(state);
    const { winners, losers } = PortfolioAnalyticsService.getWinnersLosers(state);
    const intel = PortfolioAnalyticsService.getIntelligence(state);
    const dailyPnl = State.calcDailyPnl();
    const aiDaily = intel.insights[0]?.text || Analytics.dashboardMetrics(state).aiSummary;

    screen.innerHTML = `
    <div class="os-hero cap-reveal">
      <div class="os-hero-label">Portfolio Value</div>
      <div class="os-hero-value">${U.fmt(summary.totalValue)}</div>
      <div class="os-hero-pills">
        <span class="os-pill ${U.chgCls(dailyPnl)}">Today ${dailyPnl >= 0 ? '+' : ''}${U.fmt(dailyPnl)}</span>
        <span class="os-pill ${U.chgCls(summary.totalReturn.pct)}">Return ${U.fmt(summary.totalReturn.pct, { pct: true, signed: true })}</span>
        ${summary.xirr != null ? `<span class="os-pill neutral">XIRR ${U.fmt(summary.xirr * 100, { pct: true, signed: true })}</span>` : ''}
        <span class="os-pill neutral">Div ${U.fmt(summary.dividendIncome)}</span>
      </div>
    </div>

    <div class="os-score-row cap-reveal">
      <div class="os-score-card"><div class="os-metric-label">Portfolio Score</div><div class="os-score-num ${summary.health >= 60 ? 'good' : 'warn'}">${summary.health}</div></div>
      <div class="os-score-card"><div class="os-metric-label">Risk Score</div><div class="os-score-num ${summary.risk <= 50 ? 'good' : 'bad'}">${summary.risk}</div></div>
    </div>

    ${U.section('', U.metricGrid([
      U.metricCell('Invested', U.fmt(summary.invested)),
      U.metricCell('Unrealized', U.fmt(summary.unrealized), U.fmt(summary.totalReturn.pct, { pct: true, signed: true }), U.chgCls(summary.unrealized)),
      U.metricCell('Realized', U.fmt(summary.realized)),
      U.metricCell('Div Yield', U.fmt(summary.portfolioDivYield, { pct: true })),
    ], 4))}

    <div class="os-ai-box cap-reveal"><div class="os-metric-label" style="margin-bottom:8px;">AI Daily Summary</div>${aiDaily}</div>

    <div class="os-card-grid cap-reveal">
      <div class="os-card"><div class="os-metric-label">Top Winner</div><div class="os-metric-value t-gain">${winners[0]?.symbol || '—'}</div><div class="os-metric-sub">${winners[0] ? U.fmt(winners[0].pnlPct, { pct: true, signed: true }) : ''}</div></div>
      <div class="os-card"><div class="os-metric-label">Top Loser</div><div class="os-metric-value t-loss">${losers[0]?.symbol || '—'}</div><div class="os-metric-sub">${losers[0] ? U.fmt(losers[0].pnlPct, { pct: true }) : ''}</div></div>
      <div class="os-card"><div class="os-metric-label">Sectors</div><div class="os-metric-value">${summary.sectorAllocation?.length || 0}</div></div>
      <div class="os-card"><div class="os-metric-label">Brokers</div><div class="os-metric-value">${Object.keys(summary.brokers || {}).length}</div></div>
    </div>

    ${summary.sectorAllocation?.length ? `
    <div class="os-section cap-reveal">
      <div class="os-section-title">Sector Exposure</div>
      <div class="os-alloc-bar">${summary.sectorAllocation.slice(0, 6).map((s, i) => `<div class="os-alloc-seg" style="width:${s.pct}%;background:hsl(${i * 55}, 60%, 55%)"></div>`).join('')}</div>
      <div class="os-alloc-legend">${summary.sectorAllocation.slice(0, 5).map(s => `<span>${s.sector} ${s.pct.toFixed(0)}%</span>`).join('')}</div>
    </div>` : ''}

    ${intel.insights.length ? `
    <div class="os-section cap-reveal">
      <div class="os-section-title">Key Insights</div>
      ${intel.insights.slice(0, 3).map(i => `<div class="rt-insight ${i.severity}"><div>${i.text}</div></div>`).join('')}
      <button class="os-btn os-btn-ghost" style="width:100%;margin-top:8px;" onclick="Navigation.go('intelligence')">Full intelligence →</button>
    </div>` : ''}

    ${(state.priceHistory || []).length > 1 ? `
    <div class="os-section cap-reveal"><div class="os-section-title">Portfolio History</div><div class="os-card" id="nw-chart"></div></div>` : ''}
    <div style="height:16px;"></div>`;

    const chartEl = document.getElementById('nw-chart');
    if (chartEl && state.priceHistory?.length > 1) {
      chartEl.innerHTML = Charts.lineChart(state.priceHistory.map(h => h.value), { color: '#6366f1', height: 140, fill: true });
    }
    CapMotion.refresh();
  }

  return { render };
})();
window.Dashboard = Dashboard;
