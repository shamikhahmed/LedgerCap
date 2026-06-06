'use strict';
const Dashboard = (() => {

  function fmt(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    const abs = Math.abs(n);
    if (abs >= 10000000) return '₨' + (n / 10000000).toFixed(2) + 'cr';
    if (abs >= 100000) return '₨' + (n / 100000).toFixed(2) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function fmtPct(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    const sign = n > 0 ? '+' : '';
    return sign + n.toFixed(2) + '%';
  }

  function pnlPill(val, pct, label) {
    const cls = val >= 0 ? 'up' : 'down';
    const sign = val >= 0 ? '+' : '';
    const lbl = label ? `<span style="opacity:0.7;margin-right:2px;">${label}</span>` : '';
    return `<span class="pnl-pill ${cls}">${lbl}${sign}${fmt(Math.abs(val))} (${sign}${pct.toFixed(2)}%)</span>`;
  }

  function render() {
    const screen = document.getElementById('screen-dashboard');
    if (!screen) return;

    const state = State.get();
    const transactions = state.transactions || [];
    const settings = state.settings || {};

    const totalValue = State.calcTotalValue();
    const totalCost = State.calcTotalCost();
    const totalPnl = totalValue - totalCost;
    const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;
    const dailyPnl = State.calcDailyPnl();

    const history = state.priceHistory || [];
    const lastMonthVal = history.length > 20 ? history[history.length - 20]?.value || totalValue : totalValue;
    const monthlyPnl = totalValue - lastMonthVal;

    const ytdEntry = history.find(h => h.date && h.date.startsWith('2026-01'));
    const ytdPnl = ytdEntry ? totalValue - ytdEntry.value : 0;
    const ytdPct = ytdEntry && ytdEntry.value > 0 ? (ytdPnl / ytdEntry.value) * 100 : 0;

    const thisMonthContrib = Ledger.currentMonthContribution(transactions);
    const targetSIP = settings.targetSIP || 75000;
    const contribPct = Math.min(100, Math.round((thisMonthContrib / targetSIP) * 100));

    const holdings = Ledger.calcHoldings(transactions);
    const funds = Ledger.calcFundHoldings(transactions);

    const rafiVal = holdings.filter(h => h.broker === 'Rafi').reduce((a, h) => a + h.shares * (State.getPrice(h.symbol) || h.avgCost), 0);
    const akdVal = holdings.filter(h => h.broker === 'AKD').reduce((a, h) => a + h.shares * (State.getPrice(h.symbol) || h.avgCost), 0);
    const meezanVal = funds.reduce((a, f) => {
      const nav = State.getPrice(f.symbol);
      const mf = (window.MEEZAN_FUNDS || []).find(m => m.symbol === f.symbol);
      return a + f.units * (nav || mf?.currentNav || f.avgNav);
    }, 0);
    const total4alloc = totalValue || 1;

    const movers = holdings.map(h => {
      const curr = State.getPrice(h.symbol);
      const prev = State.getPrevClose(h.symbol);
      if (!curr || !prev || prev === curr) return null;
      return { symbol: h.symbol, changeP: ((curr - prev) / prev) * 100, change: (curr - prev) * h.shares };
    }).filter(Boolean).sort((a, b) => Math.abs(b.changeP) - Math.abs(a.changeP)).slice(0, 4);

    const insights = Insights.generate(state);

    const kse = state.kseIndex || {};
    const allPrices = Object.values(state.prices || {});
    const lastUpdate = allPrices.sort((a, b) => (b.ts || 0) - (a.ts || 0))[0];
    const lastUpdateStr = lastUpdate ? Prices.formatTs(lastUpdate.ts) : 'Not updated';

    const realRet = Projections.realReturn(settings.targetReturn || 0.18, settings.inflationRate || 0.20);
    const ffCorpus = Projections.financialFreedom(settings.freedomTarget || 100000);
    const ffYears = Projections.yearsToFreedom(totalValue, targetSIP, ffCorpus, settings.targetReturn || 0.18);

    screen.innerHTML = `
    <div class="kse-bar">
      <div class="kse-ticker">
        <span class="kse-sym">KSE-100</span>
        <span class="kse-price">${kse.value ? Number(kse.value).toLocaleString('en-PK', { maximumFractionDigits: 0 }) : '—'}</span>
        ${kse.changeP !== undefined ? `<span class="kse-chg ${kse.changeP >= 0 ? 't-gain' : 't-loss'}">${fmtPct(kse.changeP)}</span>` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="t-caption">${lastUpdateStr}</span>
        <button class="btn-ghost" onclick="App.refreshPrices()">⟳ Refresh</button>
      </div>
    </div>

    <div class="dash-hero">
      <div class="hero-label">Net Worth</div>
      <div class="hero-value">${fmt(totalValue)}</div>
      <div class="hero-pnl">
        ${pnlPill(totalPnl, totalPnlPct, 'All time')}
        ${dailyPnl !== 0 ? `<span class="pnl-pill ${dailyPnl >= 0 ? 'up' : 'down'}">Today ${dailyPnl >= 0 ? '+' : ''}${fmt(Math.abs(dailyPnl))}</span>` : ''}
        ${monthlyPnl !== 0 ? `<span class="pnl-pill ${monthlyPnl >= 0 ? 'up' : 'down'}">Month ${monthlyPnl >= 0 ? '+' : ''}${fmt(Math.abs(monthlyPnl))}</span>` : ''}
      </div>
      <div class="t-dim" style="margin-top:6px;font-size:0.68rem;">Invested ${fmt(totalCost)} · Real return ~${(realRet * 100).toFixed(1)}% pa after ${((settings.inflationRate || 0.20) * 100).toFixed(0)}% inflation</div>
    </div>

    <div class="metric-grid">
      <div class="metric-tile">
        <div class="metric-label">YTD Gain</div>
        <div class="metric-value ${ytdPnl >= 0 ? 't-gain' : 't-loss'}">${fmt(Math.abs(ytdPnl))}</div>
        <div class="metric-sub">${ytdPnl >= 0 ? '▲' : '▼'} ${fmtPct(ytdPct)}</div>
      </div>
      <div class="metric-tile">
        <div class="metric-label">This Month SIP</div>
        <div class="metric-value">${fmt(thisMonthContrib)}</div>
        <div class="metric-sub">${contribPct}% of ${fmt(targetSIP)} target</div>
      </div>
      <div class="metric-tile">
        <div class="metric-label">Total Invested</div>
        <div class="metric-value">${fmt(totalCost)}</div>
        <div class="metric-sub">All time</div>
      </div>
      <div class="metric-tile">
        <div class="metric-label">Holdings</div>
        <div class="metric-value">${holdings.length + funds.length}</div>
        <div class="metric-sub">${holdings.length} stocks · ${funds.length} funds</div>
      </div>
    </div>

    <div style="padding:14px 16px;background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span class="t-label">Monthly SIP Progress</span>
        <span style="font-size:0.78rem;font-weight:700;color:var(--orange);">${fmt(thisMonthContrib)} / ${fmt(targetSIP)}</span>
      </div>
      <div class="sip-bar"><div class="sip-fill" style="width:${contribPct}%;"></div></div>
      <div style="margin-top:6px;font-size:0.68rem;color:var(--text3);">${contribPct >= 100 ? '✓ Target reached this month' : `${fmt(targetSIP - thisMonthContrib)} remaining`}</div>
    </div>

    <div class="alloc-wrap">
      <div class="t-label">Portfolio Allocation</div>
      <div class="alloc-bar">
        <div class="alloc-seg" style="width:${((rafiVal / total4alloc) * 100).toFixed(1)}%;background:#1890FF;border-radius:3px 0 0 3px;"></div>
        <div class="alloc-seg" style="width:${((akdVal / total4alloc) * 100).toFixed(1)}%;background:#FF6B35;"></div>
        <div class="alloc-seg" style="width:${((meezanVal / total4alloc) * 100).toFixed(1)}%;background:#0ECB81;border-radius:0 3px 3px 0;"></div>
      </div>
      <div class="alloc-labels">
        <div class="alloc-item"><div class="alloc-dot" style="background:#1890FF;"></div><span>Rafi ${((rafiVal / total4alloc) * 100).toFixed(0)}%</span></div>
        <div class="alloc-item"><div class="alloc-dot" style="background:#FF6B35;"></div><span>AKD ${((akdVal / total4alloc) * 100).toFixed(0)}%</span></div>
        <div class="alloc-item"><div class="alloc-dot" style="background:#0ECB81;"></div><span>Meezan ${((meezanVal / total4alloc) * 100).toFixed(0)}%</span></div>
      </div>
    </div>

    ${movers.length > 0 ? `
    <div class="sec-head"><span class="sec-title">Today's Movers</span></div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--bg4);margin-bottom:1px;">
      ${movers.map(m => `
        <div style="background:var(--bg2);padding:12px 14px;">
          <div style="font-size:0.82rem;font-weight:700;">${m.symbol}</div>
          <div class="${m.changeP >= 0 ? 't-gain' : 't-loss'}" style="font-size:0.78rem;font-weight:700;margin-top:3px;">${m.changeP >= 0 ? '+' : ''}${m.changeP.toFixed(2)}%</div>
          <div style="font-size:0.68rem;color:var(--text3);">${m.change >= 0 ? '+' : ''}${fmt(Math.abs(m.change))}</div>
        </div>`).join('')}
    </div>` : ''}

    ${insights.length > 0 ? `
    <div class="sec-head"><span class="sec-title">Wealth Insights</span><span class="sec-action">${insights.length} alerts</span></div>
    <div class="insights-feed">
      ${insights.map(i => `
        <div class="insight-item">
          <div class="insight-icon" style="background:${i.color}18;">${i.icon}</div>
          <div class="insight-text">${i.text}</div>
        </div>`).join('')}
    </div>` : ''}

    ${history.length > 3 ? `
    <div class="sec-head"><span class="sec-title">Net Worth History</span></div>
    <div class="chart-card"><div id="nw-chart" style="padding:8px 16px 4px;"></div></div>` : `
    <div style="padding:24px 16px;text-align:center;border-bottom:1px solid var(--bg4);">
      <div class="t-caption" style="margin-bottom:12px;">Update prices to build your net worth history</div>
      <button class="btn-primary" style="padding:12px;" onclick="App.refreshPrices()">⟳ Fetch Live Prices</button>
    </div>`}

    <div class="sec-head" style="margin-top:4px;"><span class="sec-title">Wealth Projection</span></div>
    <div class="proj-card">
      <div style="font-size:0.72rem;color:var(--text3);margin-bottom:12px;">${fmt(targetSIP)}/mo SIP · ${((settings.targetReturn || 0.18) * 100).toFixed(0)}% return · ${((settings.inflationRate || 0.20) * 100).toFixed(0)}% inflation</div>
      <div class="proj-tabs" id="proj-tabs">
        ${[5, 10, 15, 20].map((y, i) => `<div class="proj-tab${i === 1 ? ' active' : ''}" data-y="${y}">${y}Y</div>`).join('')}
      </div>
      <div id="proj-result">${_projHTML(totalValue, targetSIP, 10, settings.targetReturn || 0.18)}</div>
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--bg4);">
        <div class="t-label" style="margin-bottom:6px;">Financial Freedom</div>
        <div style="font-size:0.82rem;color:var(--text2);">
          ₨${((settings.freedomTarget || 100000) / 1000).toFixed(0)}k/mo passive income needs
          <span style="color:var(--orange);font-weight:700;">${fmt(ffCorpus)}</span> corpus ·
          <span style="color:var(--orange);font-weight:700;">${ffYears}</span> years at current pace
        </div>
      </div>
    </div>
    <div style="height:8px;"></div>`;

    if (history.length > 3) {
      const chartEl = document.getElementById('nw-chart');
      if (chartEl) chartEl.innerHTML = Charts.lineChart(history.map(h => h.value), { color: '#FF6B35', height: 120, fill: true });
    }

    document.querySelectorAll('.proj-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.proj-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const y = parseInt(tab.dataset.y);
        document.getElementById('proj-result').innerHTML = _projHTML(totalValue, targetSIP, y, settings.targetReturn || 0.18);
      });
    });
  }

  function _projHTML(currentVal, sip, years, ret) {
    const p = Projections.project(currentVal, sip, years, ret);
    return `<div class="proj-big">${fmt(p.total)}</div>
      <div class="t-label" style="margin-top:6px;">in ${years} years</div>
      <div style="font-size:0.7rem;color:var(--text3);margin-top:4px;">Portfolio growth ${fmt(p.fromPortfolio)} + SIP ${fmt(p.fromSIP)}</div>`;
  }

  return { render };
})();
window.Dashboard = Dashboard;
