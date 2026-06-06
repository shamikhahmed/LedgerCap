'use strict';
const Overview = (() => {
  function fmt(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    if (Math.abs(n) >= 10000000) return '₨' + (n / 10000000).toFixed(2) + 'cr';
    if (Math.abs(n) >= 100000) return '₨' + (n / 100000).toFixed(2) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function fmtPct(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
  }

  function pnlClass(n) { return n >= 0 ? 't-gain' : 't-loss'; }
  function pnlSign(n) { return n >= 0 ? '+' : ''; }

  function render() {
    const screen = document.getElementById('screen-overview');
    if (!screen) return;

    const totalValue = State.calcTotalValue();
    const totalCost = State.calcTotalCost();
    const totalPnl = totalValue - totalCost;
    const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

    const stocksValue = State.calcStocksValue();
    const stocksCost = State.calcStocksCost();
    const stocksPnl = stocksValue - stocksCost;
    const stocksPnlPct = stocksCost > 0 ? (stocksPnl / stocksCost) * 100 : 0;

    const fundsValue = State.calcFundsValue();
    const fundsCost = State.calcFundsCost();
    const fundsPnl = fundsValue - fundsCost;
    const fundsPnlPct = fundsCost > 0 ? (fundsPnl / fundsCost) * 100 : 0;

    const rafiValue = (State.get('stocks') || []).filter(s => s.broker === 'Rafi').reduce((a, s) => a + (s.shares || 0) * (s.currentPrice || 0), 0);
    const akdValue  = (State.get('stocks') || []).filter(s => s.broker === 'AKD').reduce((a, s) => a + (s.shares || 0) * (s.currentPrice || 0), 0);

    const lastUpdate = State.get('lastPriceUpdate');
    const lastUpdateStr = lastUpdate
      ? 'Updated ' + new Date(lastUpdate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })
      : 'Prices not updated';

    const totalForAlloc = totalValue || 1;
    const rafiPct    = ((rafiValue / totalForAlloc) * 100).toFixed(1);
    const akdPct     = ((akdValue / totalForAlloc) * 100).toFixed(1);
    const meezanPct  = ((fundsValue / totalForAlloc) * 100).toFixed(1);

    const sectorMap = {};
    (State.get('stocks') || []).forEach(s => {
      const val = (s.shares || 0) * (s.currentPrice || 0);
      if (val > 0) sectorMap[s.sector] = (sectorMap[s.sector] || 0) + val;
    });
    const topSectors = Object.entries(sectorMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const sharahStocksVal = (State.get('stocks') || []).filter(s => s.isShariah).reduce((a, s) => a + (s.shares || 0) * (s.currentPrice || 0), 0);
    const sharahFundsVal  = (State.get('funds') || []).reduce((a, f) => a + (f.currentValue || 0), 0);
    const sharahTotal = sharahStocksVal + sharahFundsVal;
    const sharahPct   = totalValue > 0 ? ((sharahTotal / totalValue) * 100).toFixed(0) : 0;

    const sipMonthly   = 75000;
    const annualReturn = 0.18;

    const kse = State.get('kseIndex') || {};
    const history = State.get('priceHistory') || [];

    screen.innerHTML = `
    <div class="market-bar">
      <div class="market-bar-left">
        <span class="kse-label">KSE-100</span>
        <span class="kse-value">${kse.value ? Number(kse.value).toLocaleString('en-PK') : '—'}</span>
        ${kse.changeP !== null && kse.changeP !== undefined
          ? `<span class="kse-change ${kse.changeP >= 0 ? 't-gain' : 't-loss'}">${fmtPct(kse.changeP)}</span>`
          : ''}
      </div>
      <span class="last-updated">${lastUpdateStr}</span>
    </div>

    <div class="portfolio-hero">
      <div class="portfolio-label">Total Portfolio Value</div>
      <div class="portfolio-value">${fmt(totalValue)}</div>
      <div class="portfolio-pnl-row">
        <span class="pnl-badge ${totalPnl >= 0 ? 'gain' : 'loss'}">
          ${pnlSign(totalPnl)}${fmt(Math.abs(totalPnl))} (${fmtPct(totalPnlPct)})
        </span>
        <span class="portfolio-meta">Invested: ${fmt(totalCost)}</span>
      </div>
      <button class="btn-primary" style="margin-top:16px;padding:12px;" onclick="App.openPriceModal()">⟳ Update Prices</button>
    </div>

    <div style="padding:0 16px 16px;">
      <div class="t-label" style="margin-bottom:10px;">Portfolio Allocation</div>
      <div class="alloc-bar">
        <div class="alloc-seg" style="width:${rafiPct}%;background:#1890FF;"></div>
        <div class="alloc-seg" style="width:${akdPct}%;background:#FF6B35;"></div>
        <div class="alloc-seg" style="width:${meezanPct}%;background:#0ECB81;"></div>
      </div>
      <div class="alloc-legend">
        <div class="alloc-item">
          <div class="alloc-dot" style="background:#1890FF;"></div>
          Rafi <span class="alloc-val" style="margin-left:6px;">${fmt(rafiValue)} (${rafiPct}%)</span>
        </div>
        <div class="alloc-item">
          <div class="alloc-dot" style="background:#FF6B35;"></div>
          AKD <span class="alloc-val" style="margin-left:6px;">${fmt(akdValue)} (${akdPct}%)</span>
        </div>
        <div class="alloc-item">
          <div class="alloc-dot" style="background:#0ECB81;"></div>
          Meezan <span class="alloc-val" style="margin-left:6px;">${fmt(fundsValue)} (${meezanPct}%)</span>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0 16px;margin-bottom:16px;">
      <div class="card-dark" style="padding:12px;text-align:center;">
        <div class="t-label" style="color:#1890FF;margin-bottom:6px;">RAFI</div>
        <div style="font-size:0.85rem;font-weight:700;font-variant-numeric:tabular-nums;">${fmt(rafiValue)}</div>
        <div class="${pnlClass(stocksPnlPct)}" style="font-size:0.7rem;">${fmtPct(stocksPnlPct)}</div>
      </div>
      <div class="card-dark" style="padding:12px;text-align:center;">
        <div class="t-label" style="color:var(--orange);margin-bottom:6px;">AKD</div>
        <div style="font-size:0.85rem;font-weight:700;font-variant-numeric:tabular-nums;">${fmt(akdValue)}</div>
      </div>
      <div class="card-dark" style="padding:12px;text-align:center;">
        <div class="t-label" style="color:var(--green);margin-bottom:6px;">MEEZAN</div>
        <div style="font-size:0.85rem;font-weight:700;font-variant-numeric:tabular-nums;">${fmt(fundsValue)}</div>
        <div class="${pnlClass(fundsPnlPct)}" style="font-size:0.7rem;">${fmtPct(fundsPnlPct)}</div>
      </div>
    </div>

    <div class="stat-grid" style="margin-bottom:16px;">
      <div class="stat-card">
        <div class="stat-val">${(State.get('stocks') || []).length}</div>
        <div class="stat-label">Total Stocks</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">${(State.get('funds') || []).length}</div>
        <div class="stat-label">Meezan Funds</div>
      </div>
      <div class="stat-card">
        <div class="stat-val t-gain">${sharahPct}%</div>
        <div class="stat-label">Shariah</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">${topSectors.length}</div>
        <div class="stat-label">Sectors</div>
      </div>
    </div>

    ${history.length > 1 ? `
    <div class="chart-card">
      <div class="chart-title">Portfolio Value History</div>
      <div id="portfolio-chart"></div>
    </div>` : ''}

    ${topSectors.length > 0 ? `
    <div class="sec-head"><span class="sec-title">Sector Concentration</span></div>
    <div style="padding:0 16px;margin-bottom:16px;">
      ${topSectors.map(([sector, val]) => {
        const pct = ((val / totalValue) * 100).toFixed(1);
        return `<div class="sector-row">
          <div class="sector-row-head">
            <span class="t-caption">${sector}</span>
            <span class="t-caption t-mono">${fmt(val)} (${pct}%)</span>
          </div>
          <div class="sip-bar"><div class="sip-fill" style="width:${pct}%;"></div></div>
        </div>`;
      }).join('')}
    </div>` : ''}

    <div class="sec-head"><span class="sec-title">Wealth Projection</span></div>
    <div class="projection-card">
      <div class="t-caption" style="margin-bottom:12px;">Based on ₨75,000/month SIP + 18% annual return</div>
      <div class="proj-years-row" id="proj-years">
        ${[5, 10, 15, 20].map((y, i) => `<div class="proj-year-btn${i === 1 ? ' active' : ''}" data-years="${y}">${y}Y</div>`).join('')}
      </div>
      <div class="proj-result" id="proj-result">
        ${buildProjection(totalValue, 10, sipMonthly, annualReturn)}
      </div>
    </div>

    <div class="sec-head" style="margin-top:8px;"><span class="sec-title">Shariah Compliance</span></div>
    <div style="padding:0 16px 20px;">
      <div class="card-dark" style="padding:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
          <span class="t-body">Shariah-compliant holdings</span>
          <span class="t-gain" style="font-weight:700;">${sharahPct}%</span>
        </div>
        <div class="sip-bar"><div class="sip-fill" style="width:${sharahPct}%;background:var(--green);"></div></div>
        <div class="t-caption" style="margin-top:8px;">${fmt(sharahTotal)} of ${fmt(totalValue)} is Shariah-compliant. All Meezan funds are Shariah. Some Rafi/AKD stocks (EFERT, HUBC, PSO, SSGC, OGDC etc.) are non-compliant.</div>
      </div>
    </div>`;

    if (history.length > 1) {
      const chartEl = document.getElementById('portfolio-chart');
      if (chartEl && window.Charts) {
        chartEl.innerHTML = Charts.lineChart(history.map(h => h.value), { color: '#FF6B35', height: 120, fill: true });
      }
    }

    document.querySelectorAll('.proj-year-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.proj-year-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const years = parseInt(btn.dataset.years);
        document.getElementById('proj-result').innerHTML = buildProjection(totalValue, years, sipMonthly, annualReturn);
      });
    });
  }

  function buildProjection(currentValue, years, sipMonthly, annualReturn) {
    const monthlyRate = annualReturn / 12;
    const months = years * 12;
    const futurePortfolio = currentValue * Math.pow(1 + annualReturn, years);
    const futureSIP = sipMonthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const total = futurePortfolio + futureSIP;
    return `<div class="proj-amount">${fmt(total)}</div>
      <div class="t-label" style="margin-top:6px;">Projected in ${years} years</div>
      <div class="t-caption" style="margin-top:4px;">Portfolio ${fmt(futurePortfolio)} + SIP corpus ${fmt(futureSIP)}</div>`;
  }

  return { render };
})();
window.Overview = Overview;
