'use strict';
const Performance = (() => {
  let _tab = 'daily';

  function _priceFn(symbol, fallback) {
    const live = typeof State !== 'undefined' ? State.getPrice(symbol) : 0;
    if (live && live > 0) return live;
    const fp = (window.FALLBACK_PRICES || {})[symbol];
    return fp && fp > 0 ? fp : (fallback || 0);
  }

  function render() {
    const screen = document.getElementById('screen-performance');
    if (!screen) return;

    const state = State.get();
    if (!state.transactions?.length) {
      screen.innerHTML = `<div class="lc-dash"><div class="lc-screen-head"><h1>Performance</h1><p>P&amp;L tracking</p></div>${MarketUI.emptyState('📈', 'No performance data', 'Add holdings to track daily, monthly, and predictive profit.', '<button type="button" class="os-btn os-btn-primary" onclick="App.openAddTransaction()">Add holdings</button>')}</div>`;
      CapMotion.refresh();
      return;
    }

    const dailyData = _calcDailyPnL(state);
    const monthlyData = _calcMonthlyPnL(state);
    const predictiveData = _calcPredictivePnL(state);
    const totalRealised = Ledger.realisedPnl(state.transactions || []);
    const realisedRows = Ledger.realisedTrades ? Ledger.realisedTrades(state.transactions || []) : [];
    const histDays = (state.priceHistory || []).length;
    const m2mSource = histDays >= 2 ? 'logged snapshots' : 'cost-basis until more daily snapshots';
    const costBasis = Ledger.currentCostBasis ? Ledger.currentCostBasis(state.transactions || []) : State.calcTotalCost();
    const marketValue = State.calcTotalValue();
    const unrealised = marketValue - costBasis;

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Performance</h1><p>P&amp;L tracking · daily · monthly · forecast</p></div>
    <div class="perf-header cap-reveal" style="padding-top:0">
      <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;margin-top:var(--space-2);font-size:0.85rem;color:var(--os-text-secondary);">
        <span>Cost basis <strong>${PlatformUI.fmt(costBasis)}</strong></span>
        <span>Unrealised <strong class="${unrealised >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(unrealised)}</strong></span>
        <span>Realised <strong class="${totalRealised >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(totalRealised)}</strong></span>
      </div>
      <div class="perf-tabs cap-tab-bar">
        <button type="button" class="perf-tab cap-tab${_tab === 'daily' ? ' active' : ''}" onclick="Performance.setTab('daily')">Daily</button>
        <button type="button" class="perf-tab cap-tab${_tab === 'monthly' ? ' active' : ''}" onclick="Performance.setTab('monthly')">Monthly</button>
        <button type="button" class="perf-tab cap-tab${_tab === 'realised' ? ' active' : ''}" onclick="Performance.setTab('realised')">Realised</button>
        <button type="button" class="perf-tab cap-tab${_tab === 'predictive' ? ' active' : ''}" onclick="Performance.setTab('predictive')">Forecast</button>
      </div>
      <p class="perf-disclaimer" style="margin:var(--space-2) 0 0;font-size:0.7rem;color:var(--text3);line-height:1.4;">Daily/monthly M2M uses ${m2mSource} (${histDays} day${histDays === 1 ? '' : 's'} logged). Open app after refresh to build history. Realised = closed PSX + US/crypto sells. Forecast uses Settings assumptions.</p>
    </div>

    ${_tab === 'daily' ? `<div class="perf-section cap-reveal">
      <div class="perf-chart" id="daily-chart"></div>
      <div class="perf-stats">
        <div class="perf-stat">
          <div class="perf-stat-label">Realised (total)</div>
          <div class="perf-stat-value ${totalRealised >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(totalRealised)}</div>
        </div>
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
        ${(dailyData.days || []).slice(0, 30).map(d => `
          <div class="perf-item">
            <div class="perf-item-date">${d.date}${d.realised ? `<div style="font-size:0.62rem;color:var(--text3);">Realised ${d.realised >= 0 ? '+' : ''}${PlatformUI.fmt(d.realised)}</div>` : ''}</div>
            <div class="perf-item-value ${d.pnl >= 0 ? 't-gain' : 't-loss'}">${d.pnl >= 0 ? '+' : ''}${PlatformUI.fmt(d.pnl)}</div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}

    ${_tab === 'monthly' ? `<div class="perf-section cap-reveal">
      <div class="perf-chart" id="monthly-chart"></div>
      <div class="perf-stats">
        <div class="perf-stat">
          <div class="perf-stat-label">Realised (total)</div>
          <div class="perf-stat-value ${totalRealised >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(totalRealised)}</div>
        </div>
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
            <div class="perf-item-date">${m.month}${m.realised ? `<div style="font-size:0.62rem;color:var(--text3);">Realised ${m.realised >= 0 ? '+' : ''}${PlatformUI.fmt(m.realised)}</div>` : ''}</div>
            <div class="perf-item-value ${m.pnl >= 0 ? 't-gain' : 't-loss'}">${m.pnl >= 0 ? '+' : ''}${PlatformUI.fmt(m.pnl)}</div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}

    ${_tab === 'realised' ? `<div class="perf-section cap-reveal">
      <div class="perf-stats">
        <div class="perf-stat">
          <div class="perf-stat-label">Total realised</div>
          <div class="perf-stat-value ${totalRealised >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(totalRealised)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Closed trades</div>
          <div class="perf-stat-value">${realisedRows.length}</div>
        </div>
      </div>
      <div class="perf-list">
        ${realisedRows.length ? realisedRows.map(r => `
          <div class="perf-item">
            <div class="perf-item-date">${new Date((r.date || '') + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · ${r.symbol} · ${r.qty} ${r.unit}${r.currency === 'USD' ? ` @ $${Number(r.exitPrice || 0).toFixed(2)}` : ''}</div>
            <div class="perf-item-value ${r.pnl >= 0 ? 't-gain' : 't-loss'}">${r.pnl >= 0 ? '+' : ''}${PlatformUI.fmt(r.pnl)}</div>
          </div>`).join('') : '<p class="lc-empty-note">No closed sells logged yet.</p>'}
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

    </div>`;

    _renderCharts(dailyData, monthlyData, predictiveData);
    CapMotion.refresh();
  }

  function _calcDailyPnL(state) {
    const series = Ledger.dailyPnlSeries(state.transactions, state.priceHistory, _priceFn);
    const days = series.slice().reverse().map(d => ({
      date: new Date(d.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      pnl: d.pnl,
      realised: d.realised,
      markToMarket: d.markToMarket,
    }));
    const values = series.map(d => d.pnl);
    return {
      days,
      best: values.length ? Math.max(...values) : 0,
      worst: values.length ? Math.min(...values) : 0,
      avg: values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0,
    };
  }

  function _calcMonthlyPnL(state) {
    const series = Ledger.monthlyPnlSeries(state.transactions, state.priceHistory, _priceFn);
    const months = series.map(m => ({
      month: m.month,
      pnl: m.pnl,
      realised: m.realised,
      markToMarket: m.markToMarket,
    }));
    const values = months.map(m => m.pnl);
    return {
      months,
      best: values.length ? Math.max(...values) : 0,
      worst: values.length ? Math.min(...values) : 0,
      avg: values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0,
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
      const values = (daily.days || []).slice().reverse().map(d => d.pnl);
      document.getElementById('daily-chart').innerHTML = Charts.barChart ? Charts.barChart(values.slice(-30), { height: 160, color: '#2563eb' }) : '';
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
