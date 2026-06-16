'use strict';
const Performance = (() => {
  let _tab = 'daily';

  function render() {
    const screen = document.getElementById('screen-performance');
    if (!screen) return;

    const state = State.get();
    if (!state.transactions?.length) {
      screen.innerHTML = `<div class="os-empty cap-reveal"><div class="os-empty-icon">📈</div><div class="os-empty-title">No performance data</div><div class="os-empty-body">Add holdings to track daily, monthly, and predictive profit.</div><button class="os-btn os-btn-primary" onclick="App.openAddTransaction()">Add holdings</button></div>`;
      CapMotion.refresh();
      return;
    }

    const dailyData = _calcDailyPnL(state);
    const monthlyData = _calcMonthlyPnL(state);
    const predictiveData = _calcPredictivePnL(state);

    screen.innerHTML = `
    <div class="perf-header cap-reveal">
      <div class="perf-title">Portfolio Performance</div>
      <div class="perf-tabs">
        <button class="perf-tab${_tab === 'daily' ? ' active' : ''}" onclick="Performance.setTab('daily')">Daily</button>
        <button class="perf-tab${_tab === 'monthly' ? ' active' : ''}" onclick="Performance.setTab('monthly')">Monthly</button>
        <button class="perf-tab${_tab === 'predictive' ? ' active' : ''}" onclick="Performance.setTab('predictive')">Predictive</button>
      </div>
    </div>

    ${_tab === 'daily' ? `<div class="perf-section cap-reveal">
      <div class="perf-chart" id="daily-chart"></div>
      <div class="perf-stats">
        <div class="perf-stat">
          <div class="perf-stat-label">Best Day</div>
          <div class="perf-stat-value t-gain">${PlatformUI.fmt(dailyData.best || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Worst Day</div>
          <div class="perf-stat-value t-loss">${PlatformUI.fmt(dailyData.worst || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Avg Daily</div>
          <div class="perf-stat-value">${PlatformUI.fmt(dailyData.avg || 0)}</div>
        </div>
      </div>
      <div class="perf-list">
        ${(dailyData.days || []).slice(0, 20).map(d => `
          <div class="perf-item">
            <div class="perf-item-date">${d.date}</div>
            <div class="perf-item-value ${d.pnl >= 0 ? 't-gain' : 't-loss'}">${d.pnl >= 0 ? '+' : ''}${PlatformUI.fmt(d.pnl)}</div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}

    ${_tab === 'monthly' ? `<div class="perf-section cap-reveal">
      <div class="perf-chart" id="monthly-chart"></div>
      <div class="perf-stats">
        <div class="perf-stat">
          <div class="perf-stat-label">Best Month</div>
          <div class="perf-stat-value t-gain">${PlatformUI.fmt(monthlyData.best || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Worst Month</div>
          <div class="perf-stat-value t-loss">${PlatformUI.fmt(monthlyData.worst || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Avg Monthly</div>
          <div class="perf-stat-value">${PlatformUI.fmt(monthlyData.avg || 0)}</div>
        </div>
      </div>
      <div class="perf-list">
        ${(monthlyData.months || []).map(m => `
          <div class="perf-item">
            <div class="perf-item-date">${m.month}</div>
            <div class="perf-item-value ${m.pnl >= 0 ? 't-gain' : 't-loss'}">${m.pnl >= 0 ? '+' : ''}${PlatformUI.fmt(m.pnl)}</div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}

    ${_tab === 'predictive' ? `<div class="perf-section cap-reveal">
      <div class="perf-chart" id="predictive-chart"></div>
      <div class="perf-stats">
        <div class="perf-stat">
          <div class="perf-stat-label">Est. 3M Profit</div>
          <div class="perf-stat-value t-gain">${PlatformUI.fmt(predictiveData.m3 || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Est. 1Y Profit</div>
          <div class="perf-stat-value t-gain">${PlatformUI.fmt(predictiveData.y1 || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Est. 5Y Profit</div>
          <div class="perf-stat-value t-gain">${PlatformUI.fmt(predictiveData.y5 || 0)}</div>
        </div>
      </div>
      <div class="perf-prediction">
        <div class="perf-pred-item">
          <div class="perf-pred-label">Based on</div>
          <div class="perf-pred-value">18% annual return + dividend yield</div>
        </div>
        <div class="perf-pred-item">
          <div class="perf-pred-label">Current Portfolio</div>
          <div class="perf-pred-value">${PlatformUI.fmt(predictiveData.currentValue || 0)}</div>
        </div>
      </div>
    </div>` : ''}

    <div style="height:var(--space-4);"></div>`;

    _renderCharts(dailyData, monthlyData, predictiveData);
    CapMotion.refresh();
  }

  function _calcDailyPnL(state) {
    const days = {};
    (state.priceHistory || []).forEach((h, i) => {
      if (i > 0) {
        const prev = state.priceHistory[i - 1];
        const pnl = h.value - prev.value;
        const date = new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        days[date] = pnl;
      }
    });
    const values = Object.values(days);
    return {
      days: Object.entries(days).reverse().map(([date, pnl]) => ({ date, pnl })),
      best: Math.max(...values, 0),
      worst: Math.min(...values, 0),
      avg: values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
    };
  }

  function _calcMonthlyPnL(state) {
    const months = {};
    (state.priceHistory || []).forEach(h => {
      const date = new Date(h.date);
      const key = `${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;
      if (!months[key]) months[key] = [];
      months[key].push(h.value);
    });
    const monthlyPnL = Object.entries(months).map(([month, values]) => ({
      month,
      pnl: values[values.length - 1] - (values[0] || 0)
    }));
    const values = monthlyPnL.map(m => m.pnl);
    return {
      months: monthlyPnL,
      best: Math.max(...values, 0),
      worst: Math.min(...values, 0),
      avg: values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
    };
  }

  function _calcPredictivePnL(state) {
    const current = State.calcTotalValue();
    const annualReturn = 0.18;
    const divYield = (PortfolioAnalyticsService?.getSummary(state)?.portfolioDivYield || 0) / 100;
    const totalYield = annualReturn + divYield;
    return {
      currentValue: current,
      m3: current * (totalYield * 0.25),
      y1: current * totalYield,
      y5: current * (Math.pow(1 + totalYield, 5) - 1)
    };
  }

  function _renderCharts(daily, monthly, predictive) {
    if (_tab === 'daily' && document.getElementById('daily-chart')) {
      const values = (daily.days || []).map(d => d.pnl);
      document.getElementById('daily-chart').innerHTML = Charts.barChart ? Charts.barChart(values.slice(0, 30), { height: 160, color: '#2563eb' }) : '';
    }
    if (_tab === 'monthly' && document.getElementById('monthly-chart')) {
      const values = (monthly.months || []).map(m => m.pnl);
      document.getElementById('monthly-chart').innerHTML = Charts.barChart ? Charts.barChart(values, { height: 160, color: '#2563eb' }) : '';
    }
    if (_tab === 'predictive' && document.getElementById('predictive-chart')) {
      const projections = [predictive.currentValue, predictive.currentValue * 1.18, predictive.currentValue * Math.pow(1.18, 2), predictive.currentValue * Math.pow(1.18, 5)];
      document.getElementById('predictive-chart').innerHTML = Charts.lineChart ? Charts.lineChart(projections, { height: 160, color: '#10b981' }) : '';
    }
  }

  function setTab(tab) {
    _tab = tab;
    render();
  }

  return { render, setTab };
})();
window.Performance = Performance;
