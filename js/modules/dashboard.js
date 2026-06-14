'use strict';
const Dashboard = (() => {

  function fmt(n) {
    if (n == null || isNaN(n)) return '—';
    const abs = Math.abs(n);
    if (abs >= 1e7) return '₨' + (n / 1e7).toFixed(2) + 'cr';
    if (abs >= 1e5) return '₨' + (n / 1e5).toFixed(2) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function fmtPct(n, signed) {
    if (n == null || isNaN(n)) return '—';
    const s = signed && n > 0 ? '+' : '';
    return s + (n * (Math.abs(n) <= 1 ? 100 : 1)).toFixed(1) + '%';
  }

  function _allocSection(title, items, colors) {
    if (!items.length) return '';
    const total = items.reduce((a, i) => a + i.pct, 0) || 1;
    return `
    <div class="os-section cap-reveal">
      <div class="os-section-title">${title}</div>
      <div class="os-alloc-bar">
        ${items.map((item, i) => `<div class="os-alloc-seg" style="width:${item.pct.toFixed(1)}%;background:${colors[i % colors.length]}"></div>`).join('')}
      </div>
      <div class="os-alloc-legend">
        ${items.slice(0, 6).map((item, i) => `<span><span class="os-alloc-dot" style="background:${colors[i % colors.length]}"></span>${item.broker || item.sector} ${item.pct.toFixed(0)}%</span>`).join('')}
      </div>
    </div>`;
  }

  function render() {
    const screen = document.getElementById('screen-dashboard');
    if (!screen) return;

    const state = State.get();
    const m = Analytics.dashboardMetrics(state);
    const history = state.priceHistory || [];
    const dailyCls = m.dailyPnl >= 0 ? 'gain' : 'loss';
    const retCls = m.totalReturn.pct >= 0 ? 'gain' : 'loss';
    const annual = m.annualReturn;
    const xirr = m.xirr;
    const healthCls = m.portfolioHealth >= 70 ? 'good' : m.portfolioHealth >= 45 ? 'warn' : 'bad';
    const riskCls = m.riskScore <= 40 ? 'good' : m.riskScore <= 65 ? 'warn' : 'bad';
    const allocColors = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

    screen.innerHTML = `
    <div class="os-hero cap-reveal">
      <div class="os-hero-label">Portfolio Value</div>
      <div class="os-hero-value">${fmt(m.totalValue)}</div>
      <div class="os-hero-pills">
        <span class="os-pill ${dailyCls}">Today ${m.dailyPnl >= 0 ? '+' : ''}${fmt(m.dailyPnl)}</span>
        <span class="os-pill ${retCls}">Total ${m.totalReturn.pct >= 0 ? '+' : ''}${m.totalReturn.pct.toFixed(1)}%</span>
        ${annual != null ? `<span class="os-pill neutral">Annual ${fmtPct(annual, true)}</span>` : ''}
        ${xirr != null ? `<span class="os-pill neutral">XIRR ${fmtPct(xirr, true)}</span>` : ''}
      </div>
    </div>

    <div class="os-score-row cap-reveal">
      <div class="os-score-card">
        <div class="os-metric-label">Portfolio Health</div>
        <div class="os-score-num ${healthCls}">${m.portfolioHealth}</div>
      </div>
      <div class="os-score-card">
        <div class="os-metric-label">Risk Score</div>
        <div class="os-score-num ${riskCls}">${m.riskScore}</div>
      </div>
    </div>

    <div class="os-card-grid cap-reveal">
      <div class="os-card">
        <div class="os-metric-label">Total Return</div>
        <div class="os-metric-value ${retCls === 'gain' ? 't-gain' : 't-loss'}">${m.totalReturn.pct >= 0 ? '+' : ''}${m.totalReturn.pct.toFixed(1)}%</div>
        <div class="os-metric-sub">${fmt(m.totalReturn.abs)}</div>
      </div>
      <div class="os-card">
        <div class="os-metric-label">Dividend Income</div>
        <div class="os-metric-value">${fmt(m.dividendIncome)}</div>
        <div class="os-metric-sub">Lifetime collected</div>
      </div>
      <div class="os-card">
        <div class="os-metric-label">Invested</div>
        <div class="os-metric-value">${fmt(m.totalCost)}</div>
        <div class="os-metric-sub">Cost basis</div>
      </div>
      <div class="os-card">
        <div class="os-metric-label">SIP Progress</div>
        <div class="os-metric-value">${Math.round(m.sipProgress)}%</div>
        <div class="os-metric-sub">This month</div>
      </div>
    </div>

    <div class="os-ai-box cap-reveal">
      <div class="os-metric-label" style="margin-bottom:8px;">AI Summary</div>
      ${m.aiSummary}
    </div>

    ${_allocSection('Asset Allocation', [
      { sector: 'Stocks', pct: m.assetAllocation.stocksPct },
      { sector: 'Funds', pct: m.assetAllocation.fundsPct },
    ], ['#6366f1', '#22c55e'])}

    ${_allocSection('Broker Allocation', m.brokerAllocation.map(b => ({ broker: b.broker, pct: b.pct })), allocColors)}

    ${_allocSection('Sector Allocation', m.sectorAllocation.map(s => ({ sector: s.sector, pct: s.pct })), allocColors)}

    ${m.insights.length ? `
    <div class="os-section cap-reveal">
      <div class="os-section-title">Portfolio Insights</div>
      ${m.insights.slice(0, 5).map(i => `
        <div class="os-insight">
          <div class="os-insight-icon">${i.icon}</div>
          <div class="os-insight-text">${i.text}</div>
        </div>`).join('')}
      <button class="os-btn os-btn-ghost" style="width:100%;margin-top:8px;" onclick="Navigation.go('intelligence')">View all intelligence →</button>
    </div>` : ''}

    ${history.length > 1 ? `
    <div class="os-section cap-reveal">
      <div class="os-section-title">Portfolio History</div>
      <div class="os-card" id="nw-chart"></div>
    </div>` : ''}

    <div style="height:16px;"></div>`;

    const chartEl = document.getElementById('nw-chart');
    if (chartEl && history.length > 1) {
      chartEl.innerHTML = Charts.lineChart(history.map(h => h.value), { color: '#6366f1', height: 140, fill: true });
    }
    CapMotion.refresh();
  }

  return { render };
})();
window.Dashboard = Dashboard;
