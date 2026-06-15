'use strict';
const Dividends = (() => {
  const U = PlatformUI;
  let _tab = 'overview';

  function _tabs() {
    return [
      { id: 'overview', label: 'Overview' },
      { id: 'upcoming', label: 'Upcoming' },
      { id: 'calendar', label: 'Calendar' },
      { id: 'holdings', label: 'Holdings' },
      { id: 'history', label: 'History' },
      { id: 'forecast', label: 'Forecast' },
      { id: 'growth', label: 'Growth' },
    ];
  }

  function _tabBar() {
    return `<div class="div-tabs cap-reveal">${_tabs().map(t =>
      `<button class="div-tab${_tab === t.id ? ' active' : ''}" onclick="Dividends.setTab('${t.id}')">${t.label}</button>`
    ).join('')}</div>`;
  }

  function setTab(id) { _tab = id; render(); }

  function _overview(dash, forecast) {
    return `
    ${U.section('', U.metricGrid([
      U.metricCell('Expected ' + new Date().getFullYear(), U.fmt(dash.expectedThisYear), 'This year forecast'),
      U.metricCell('Expected ' + (new Date().getFullYear() + 1), U.fmt(dash.expectedNextYear), 'Next year forecast'),
      U.metricCell('Received YTD', U.fmt(dash.receivedYtd), 'Logged payments'),
      U.metricCell('Portfolio Yield', U.fmt(dash.portfolioYield, { pct: true }), 'On cost basis'),
      U.metricCell('Monthly Forecast', U.fmt(dash.monthlyForecast), 'Avg this year'),
      U.metricCell('Lifetime', U.fmt(dash.lifetime), dash.holdingsCount + ' dividend stocks'),
    ], 3))}

    ${dash.upcoming.filter(u => u.isHeld).length ? U.section('Next Dividend Events', `
      <div class="rt-table-wrap"><table class="rt-table"><thead><tr>
        <th>Company</th><th>Amount/sh</th><th>Ex-Date</th><th>Record</th><th>Payment</th><th>Your Income</th>
      </tr></thead><tbody>
      ${dash.upcoming.filter(u => u.isHeld).slice(0, 8).map(u => `
        <tr onclick="Research.open('${u.symbol}')">
          <td><strong>${u.symbol}</strong><div style="font-size:0.68rem;color:var(--os-text-tertiary)">${u.companyName || ''}</div></td>
          <td>₨${u.amountPerShare}</td>
          <td>${u.exDate || '—'}</td>
          <td>${u.recordDate || '—'}</td>
          <td>${u.paymentDate || '—'}</td>
          <td class="t-gain">${U.fmt(u.expectedIncome)}</td>
        </tr>`).join('')}
      </tbody></table></div>`) : ''}

    ${U.section('Income by Stock', dash.byStock.length ? `
      <div class="rt-table-wrap"><table class="rt-table"><thead><tr>
        <th>Stock</th><th>Annual Income</th><th>Received</th><th>YoC</th><th>Yield</th><th>CAGR</th>
      </tr></thead><tbody>
      ${dash.byStock.map(h => `
        <tr onclick="Research.open('${h.symbol}')">
          <td><strong>${h.symbol}</strong><div style="font-size:0.68rem;color:var(--os-text-tertiary)">${h.sector}</div></td>
          <td class="t-gain">${U.fmt(h.annualIncome)}</td>
          <td>${U.fmt(h.totalReceived)}</td>
          <td>${h.yieldOnCost != null ? h.yieldOnCost.toFixed(1) + '%' : '—'}</td>
          <td>${h.currentYield != null ? h.currentYield.toFixed(1) + '%' : '—'}</td>
          <td>${h.cagr != null ? h.cagr.toFixed(1) + '%' : '—'}</td>
        </tr>`).join('')}
      </tbody></table></div>` : '<div style="color:var(--os-text-secondary);font-size:0.85rem;">No dividend-paying holdings.</div>')}

    ${U.section('Income by Sector', dash.bySector.length ? dash.bySector.map(s => `
      <div class="os-row"><div><div class="os-row-sym">${s.sector}</div><div class="os-row-sub">${s.symbols.join(', ')}</div></div>
      <div class="os-row-val t-gain">${U.fmt(s.annualIncome)} · ${s.pct.toFixed(0)}%</div></div>`).join('') : '')}`;
  }

  function _upcoming(dash) {
    const all = dash.upcoming;
    return U.section('All Upcoming Dividends', all.length ? `
      <div class="rt-table-wrap"><table class="rt-table"><thead><tr>
        <th>Company</th><th>Amount/sh</th><th>Ex-Dividend</th><th>Record Date</th><th>Payment Date</th><th>Shares</th><th>Expected Income</th>
      </tr></thead><tbody>
      ${all.map(u => `
        <tr onclick="Research.open('${u.symbol}')">
          <td><strong>${u.symbol}</strong><div style="font-size:0.68rem;color:var(--os-text-tertiary)">${u.companyName || ''}</div></td>
          <td>₨${u.amountPerShare}</td>
          <td>${u.exDate}</td>
          <td>${u.recordDate}</td>
          <td>${u.paymentDate}</td>
          <td>${u.isHeld ? u.shares : '<span style="color:var(--os-text-tertiary)">—</span>'}</td>
          <td class="${u.isHeld ? 't-gain' : ''}">${u.isHeld ? U.fmt(u.expectedIncome) : '—'}</td>
        </tr>`).join('')}
      </tbody></table></div>` : '<div style="color:var(--os-text-secondary);">No upcoming dividends in dataset.</div>');
  }

  function _calendar(cal) {
    return cal.length ? cal.map(m => `
      <div class="div-cal-month cap-reveal">
        <div class="div-cal-month-title">${new Date(m.month + '-01').toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}</div>
        ${m.paymentEvents.length ? `<div class="div-cal-section-label">Payment dates</div>` + m.paymentEvents.map(e => `
          <div class="rt-div-event" onclick="Research.open('${e.symbol}')">
            <div><strong>${e.symbol}</strong> · ${e.paymentDate}<div style="font-size:0.68rem;color:var(--os-text-tertiary)">₨${e.amountPerShare}/sh${e.isHeld ? ' · ' + e.shares + ' shares' : ''}</div></div>
            <div class="t-gain">${e.isHeld ? U.fmt(e.expectedIncome) : '—'}</div>
          </div>`).join('') : ''}
        ${m.exEvents.length ? `<div class="div-cal-section-label">Ex-dividend dates</div>` + m.exEvents.map(e => `
          <div class="rt-div-event" onclick="Research.open('${e.symbol}')">
            <div><strong>${e.symbol}</strong> · Ex ${e.exDate}</div>
            <div style="font-size:0.72rem;color:var(--os-text-tertiary)">Record ${e.recordDate}</div>
          </div>`).join('') : ''}
      </div>`).join('') : '<div class="os-section" style="color:var(--os-text-secondary);">No calendar events.</div>';
  }

  function _holdings(holdings) {
    return holdings.length ? `
      <div class="rt-table-wrap cap-reveal"><table class="rt-table"><thead><tr>
        <th>Holding</th><th>Shares</th><th>Annual Income</th><th>Monthly</th><th>YoC</th><th>Current Yield</th><th>CAGR</th><th>Received</th>
      </tr></thead><tbody>
      ${holdings.map(h => `
        <tr onclick="Research.open('${h.symbol}')">
          <td><strong>${h.symbol}</strong><div style="font-size:0.68rem;color:var(--os-text-tertiary)">${h.companyName}</div></td>
          <td>${h.shares}</td>
          <td class="t-gain">${U.fmt(h.annualIncome)}</td>
          <td>${U.fmt(h.monthlyIncome)}</td>
          <td>${h.yieldOnCost != null ? h.yieldOnCost.toFixed(1) + '%' : '—'}</td>
          <td>${h.currentYield != null ? h.currentYield.toFixed(1) + '%' : '—'}</td>
          <td>${h.dividendCagr != null ? h.dividendCagr.toFixed(1) + '%' : '—'}</td>
          <td>${U.fmt(h.totalReceived)}</td>
        </tr>`).join('')}
      </tbody></table></div>` : '<div class="os-section" style="color:var(--os-text-secondary);">No holdings with dividend data.</div>';
  }

  function _history(timeline) {
    const corp = [];
    Object.keys(window.DIVIDEND_DATA || {}).forEach(sym => {
      const h = DividendService.getHistory(sym);
      h.timeline.forEach(t => corp.push({ ...t, symbol: sym }));
    });
    corp.sort((a, b) => {
      const da = a.paymentDate || a.creditDate || a.exDate || '';
      const db = b.paymentDate || b.creditDate || b.exDate || '';
      return db.localeCompare(da);
    });

    let body = '';
    if (timeline.months.length) {
      body += U.section('Received Over Time', `
        <div class="rt-table-wrap"><table class="rt-table"><thead><tr><th>Month</th><th>Received</th><th>Cumulative</th><th>Payments</th></tr></thead><tbody>
        ${timeline.months.map(m => `
          <tr><td>${new Date(m.month + '-01').toLocaleDateString('en-PK', { month: 'short', year: 'numeric' })}</td>
          <td class="t-gain">${U.fmt(m.total)}</td><td>${U.fmt(m.cumulative)}</td><td>${m.events.length}</td></tr>`).join('')}
        </tbody></table></div>`);
    }

    body += U.section('Corporate Actions Timeline', `
      <div class="rt-table-wrap"><table class="rt-table"><thead><tr>
        <th>Symbol</th><th>Type</th><th>Amount</th><th>Ex-Date</th><th>Record</th><th>Payment</th><th>Status</th>
      </tr></thead><tbody>
      ${corp.slice(0, 40).map(c => `
        <tr onclick="Research.open('${c.symbol}')">
          <td><strong>${c.symbol}</strong></td>
          <td>${c.actionType}</td>
          <td>${typeof c.amount === 'number' ? '₨' + c.amount : c.amount}</td>
          <td>${c.exDate || '—'}</td>
          <td>${c.recordDate || '—'}</td>
          <td>${c.paymentDate || c.creditDate || '—'}</td>
          <td>${c.status || '—'}</td>
        </tr>`).join('')}
      </tbody></table></div>`);

    const logged = (State.get('transactions') || []).filter(t => t.type === 'DIVIDEND').sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    if (logged.length) {
      body += U.section('Your Logged Payments', `
        <div class="rt-table-wrap"><table class="rt-table"><thead><tr><th>Date</th><th>Symbol</th><th>Amount</th></tr></thead><tbody>
        ${logged.map(t => `<tr><td>${t.date}</td><td><strong>${t.symbol || 'General'}</strong></td><td class="t-gain">${U.fmt(t.amount)}</td></tr>`).join('')}
        </tbody></table></div>`);
    }
    return body;
  }

  function _forecast(forecast, dash) {
    return `
    ${U.section('Income Forecast', U.metricGrid([
      U.metricCell('This Year', U.fmt(forecast.expectedThisYear), 'Received + upcoming'),
      U.metricCell('Next Year', U.fmt(forecast.expectedNextYear), 'DPS × growth × shares'),
      U.metricCell('Monthly Avg', U.fmt(forecast.monthlyForecast), 'This year'),
      U.metricCell('Held Stocks', dash.holdingsCount, 'With dividend data'),
    ], 4))}
    ${U.section('Per-Holding Forecast', forecast.holdings.length ? `
      <div class="rt-table-wrap"><table class="rt-table"><thead><tr>
        <th>Symbol</th><th>Annual DPS</th><th>Shares</th><th>Annual Income</th><th>Next Event</th><th>Next Income</th>
      </tr></thead><tbody>
      ${forecast.holdings.map(h => `
        <tr onclick="Research.open('${h.symbol}')">
          <td><strong>${h.symbol}</strong></td>
          <td>₨${h.annualDps.toFixed(2)}</td>
          <td>${h.shares}</td>
          <td class="t-gain">${U.fmt(h.annualIncome)}</td>
          <td>${h.nextEvent ? h.nextEvent.paymentDate : '—'}</td>
          <td class="t-gain">${h.expectedNext ? U.fmt(h.expectedNext) : '—'}</td>
        </tr>`).join('')}
      </tbody></table></div>` : '')}`;
  }

  function _growth(growth) {
    return growth.length ? growth.map(g => `
      <div class="os-card cap-reveal" style="margin:0 20px 12px;cursor:pointer;" onclick="Research.open('${g.symbol}')">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div><strong>${g.symbol}</strong> <span class="rt-badge rt-${g.trend === 'growing' ? 'buy' : g.trend === 'declining' ? 'sell' : 'hold'}">${g.trend}</span></div>
          <div style="text-align:right;"><div class="t-gain" style="font-weight:700;">${g.cagr != null ? g.cagr.toFixed(1) + '% CAGR' : '—'}</div>
          <div style="font-size:0.72rem;color:var(--os-text-tertiary);">YoC ${g.yieldOnCost != null ? g.yieldOnCost.toFixed(1) + '%' : '—'} · Yield ${g.currentYield != null ? g.currentYield.toFixed(1) + '%' : '—'}</div></div>
        </div>
        ${g.yieldHistory.length ? `<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
          ${g.yieldHistory.map(y => `<span style="font-size:0.72rem;padding:4px 8px;background:var(--os-bg-hover);border-radius:6px;">${y.date.slice(0,4)}: ${y.yield}%</span>`).join('')}
        </div>` : ''}
      </div>`).join('') : '<div class="os-section" style="color:var(--os-text-secondary);">No growth data for held stocks.</div>';
  }

  function render() {
    const screen = document.getElementById('screen-dividends');
    if (!screen) return;

    const dash = DividendService.getPortfolioAnalysis();
    const forecast = DividendService.getForecast();
    const holdings = DividendService.getHoldingsAnalysis().filter(h => h.isHeld);
    const timeline = DividendService.getTimeline();
    const calendar = DividendService.getCalendar();
    const growth = DividendService.getGrowthAnalytics();

    const panels = {
      overview: _overview(dash, forecast),
      upcoming: _upcoming(dash),
      calendar: _calendar(calendar),
      holdings: _holdings(holdings),
      history: _history(timeline),
      forecast: _forecast(forecast, dash),
      growth: _growth(growth),
    };

    screen.innerHTML = `
    <div class="os-page-header cap-reveal">
      <div class="os-page-title">Dividend Center</div>
      <div class="os-page-sub">Professional dividend research & portfolio income</div>
    </div>
    ${_tabBar()}
    <div class="div-panel cap-reveal">${panels[_tab] || panels.overview}</div>
    <div style="height:24px;"></div>`;
    CapMotion.refresh();
  }

  return { render, setTab };
})();
window.Dividends = Dividends;
