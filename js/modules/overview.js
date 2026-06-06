'use strict';
const Overview = (() => {

  function fmtPKR(n) {
    if (!n || isNaN(n)) return '₨0';
    if (n >= 1e7) return '₨' + (n/1e7).toFixed(2) + 'Cr';
    if (n >= 1e5) return '₨' + (n/1e5).toFixed(1) + 'L';
    if (n >= 1e3) return '₨' + (n/1e3).toFixed(1) + 'K';
    return '₨' + Math.round(n).toLocaleString();
  }

  function fmtPct(n) {
    if (!n || isNaN(n)) return '0.00%';
    return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
  }

  function greet() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  function dateStr() {
    return new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
  }

  function ruleOfDay() {
    const rules = window.ADVISOR_RULES || [];
    if (!rules.length) return '';
    const idx = new Date().getDate() % rules.length;
    return rules[idx];
  }

  function getSectorBreakdown(stocks) {
    const map = {};
    stocks.forEach(s => {
      if (!s.shares || !s.currentPrice) return;
      const val = s.shares * s.currentPrice;
      if (!map[s.sector]) map[s.sector] = 0;
      map[s.sector] += val;
    });
    return Object.entries(map)
      .map(([sector, value]) => ({ sector, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }

  function getShariahPct(stocks, funds) {
    const shariahVal = [...stocks, ...funds].reduce((sum, h) => {
      if (!h.isShariah) return sum;
      const qty = h.shares || h.units || 0;
      const price = h.currentPrice || h.currentNav || 0;
      return sum + qty * price;
    }, 0);
    const total = State.calcTotalValue();
    return total > 0 ? (shariahVal / total * 100) : 0;
  }

  function render() {
    const el = document.getElementById('screen-overview');
    if (!el) return;

    const stocks = State.get('stocks') || [];
    const funds = State.get('funds') || [];
    const priceHistory = State.get('priceHistory') || [];
    const lastUpdate = State.get('lastPriceUpdate');

    const totalVal = State.calcTotalValue();
    const totalCost = State.calcTotalCost();
    const pnl = totalVal - totalCost;
    const pnlPct = totalCost > 0 ? (pnl / totalCost * 100) : 0;
    const pnlColor = pnl >= 0 ? 'var(--green)' : 'var(--red)';

    const rafiVal  = State.calcBrokerValue('Rafi');
    const rafiCost = State.calcBrokerCost('Rafi');
    const akdVal   = State.calcBrokerValue('AKD');
    const akdCost  = State.calcBrokerCost('AKD');
    const meezanVal  = State.calcBrokerValue('Meezan');
    const meezanCost = State.calcBrokerCost('Meezan');

    const rafiPnl   = rafiVal - rafiCost;
    const akdPnl    = akdVal - akdCost;
    const meezanPnl = meezanVal - meezanCost;

    const stocksVal = State.calcStocksValue();
    const fundsVal  = State.calcFundsValue();

    const sectors = getSectorBreakdown(stocks);
    const shariahPct = getShariahPct(stocks, funds);

    const heldStocks = stocks.filter(s => s.shares > 0 && s.currentPrice > 0);
    const greenPositions = stocks.filter(s => s.shares > 0 && s.currentPrice > 0 && (s.currentPrice - s.avgCost) > 0).length;
    const uniqueSectors = new Set(stocks.filter(s => s.shares > 0).map(s => s.sector)).size;
    const heldFunds = funds.filter(f => f.units > 0);

    const updatedStr = lastUpdate
      ? 'Updated ' + new Date(lastUpdate).toLocaleString('en-US', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })
      : 'Prices not updated yet';

    el.innerHTML = `
      <div class="screen-header">
        <div style="font-size:0.75rem;color:var(--text3)">${dateStr()}</div>
        <div class="screen-title">${greet()}, Shamikh 👋</div>
      </div>

      <!-- Portfolio Hero -->
      <div style="padding:0 18px">
        <div class="card-hero">
          <div class="t-label" style="margin-bottom:8px">Total Portfolio</div>
          <div class="networth-num">${fmtPKR(totalVal)}</div>
          <div style="margin-top:4px;font-size:0.78rem;color:var(--text3)">Cost basis: ${fmtPKR(totalCost)}</div>
          <div style="margin-top:10px;display:flex;align-items:center;gap:16px">
            <div>
              <div style="font-size:1.1rem;font-weight:700;color:${pnlColor}">${pnl >= 0 ? '+' : ''}${fmtPKR(Math.abs(pnl))}</div>
              <div style="font-size:0.72rem;color:${pnlColor}">${fmtPct(pnlPct)} total return</div>
            </div>
            <div style="flex:1;text-align:right">
              <div style="font-size:0.68rem;color:var(--text3)">${updatedStr}</div>
            </div>
          </div>
          <button class="btn btn-primary-sm" style="margin-top:14px;width:100%" onclick="App.openPriceModal()">
            ↻ Update Prices
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="section-header"><span class="section-label">Portfolio Overview</span></div>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${heldStocks.length}</div>
          <div class="stat-label">Stocks held</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${heldFunds.length}</div>
          <div class="stat-label">Funds held</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${uniqueSectors}</div>
          <div class="stat-label">Sectors</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color:var(--green)">${greenPositions}</div>
          <div class="stat-label">Green positions</div>
        </div>
      </div>

      <!-- Allocation Bar -->
      <div class="section-header"><span class="section-label">Broker Allocation</span></div>
      <div style="padding:0 18px">
        <div class="card">
          <div id="alloc-bar-container"></div>
        </div>
      </div>

      <!-- Broker Cards -->
      <div class="section-header"><span class="section-label">By Broker</span></div>
      <div class="broker-cards">
        <div class="broker-card">
          <div class="broker-card-name" style="color:var(--blue)">Rafi</div>
          <div class="broker-card-value">${fmtPKR(rafiVal)}</div>
          <div class="broker-card-pnl" style="color:${rafiPnl>=0?'var(--green)':'var(--red)'}">${rafiPnl>=0?'+':''}${fmtPKR(Math.abs(rafiPnl))}</div>
        </div>
        <div class="broker-card">
          <div class="broker-card-name" style="color:var(--orange)">AKD</div>
          <div class="broker-card-value">${fmtPKR(akdVal)}</div>
          <div class="broker-card-pnl" style="color:${akdPnl>=0?'var(--green)':'var(--red)'}">${akdPnl>=0?'+':''}${fmtPKR(Math.abs(akdPnl))}</div>
        </div>
        <div class="broker-card">
          <div class="broker-card-name" style="color:var(--green)">Meezan</div>
          <div class="broker-card-value">${fmtPKR(meezanVal)}</div>
          <div class="broker-card-pnl" style="color:${meezanPnl>=0?'var(--green)':'var(--red)'}">${meezanPnl>=0?'+':''}${fmtPKR(Math.abs(meezanPnl))}</div>
        </div>
      </div>

      <!-- Asset Class -->
      <div class="section-header"><span class="section-label">Asset Class</span></div>
      <div style="padding:0 18px">
        <div class="card">
          <div class="row-between" style="margin-bottom:10px">
            <div>
              <div style="font-size:0.78rem;color:var(--text3)">Equities</div>
              <div style="font-size:1.1rem;font-weight:700">${fmtPKR(stocksVal)}</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:0.78rem;color:var(--text3)">Funds & ETFs</div>
              <div style="font-size:1.1rem;font-weight:700">${fmtPKR(fundsVal)}</div>
            </div>
          </div>
          <div class="alloc-bar">
            <div class="alloc-segment" style="width:${totalVal>0?(stocksVal/totalVal*100).toFixed(1):50}%;background:var(--blue);min-width:4px"></div>
            <div class="alloc-segment" style="width:${totalVal>0?(fundsVal/totalVal*100).toFixed(1):50}%;background:var(--green);min-width:4px"></div>
          </div>
          <div class="alloc-legend" style="margin-top:8px">
            <div class="alloc-legend-item"><div class="alloc-dot" style="background:var(--blue)"></div>Equities ${totalVal>0?(stocksVal/totalVal*100).toFixed(1):0}%</div>
            <div class="alloc-legend-item"><div class="alloc-dot" style="background:var(--green)"></div>Funds ${totalVal>0?(fundsVal/totalVal*100).toFixed(1):0}%</div>
          </div>
        </div>
      </div>

      <!-- Sector Breakdown -->
      <div class="section-header"><span class="section-label">Sector Concentration</span></div>
      <div style="padding:0 18px">
        <div class="card">
          <div id="sector-bars-container"></div>
        </div>
      </div>

      <!-- Shariah -->
      <div class="section-header"><span class="section-label">Shariah Compliance</span></div>
      <div style="padding:0 18px">
        <div class="card">
          <div class="row-between">
            <div>
              <div style="font-size:0.78rem;color:var(--text3)">Shariah-compliant</div>
              <div style="font-size:1.4rem;font-weight:700;color:var(--green)">${shariahPct.toFixed(0)}%</div>
            </div>
            <div style="font-size:2rem">☪️</div>
          </div>
          <div class="progress-bar-wrap" style="margin-top:10px">
            <div class="progress-bar-fill" style="width:${shariahPct.toFixed(0)}%;background:var(--green)"></div>
          </div>
        </div>
      </div>

      <!-- Portfolio Chart -->
      <div class="section-header"><span class="section-label">Portfolio Value</span></div>
      <div style="padding:0 18px">
        <div class="card">
          <div id="portfolio-chart"></div>
        </div>
      </div>

      <!-- Advisor Note -->
      <div class="section-header"><span class="section-label">Advisor Note</span></div>
      <div class="advisor-note">
        <div class="advisor-note-label">Rule of the Day</div>
        <div class="advisor-note-text">${ruleOfDay()}</div>
      </div>

      <div style="height:24px"></div>
    `;

    // Render allocation bar
    const allocContainer = el.querySelector('#alloc-bar-container');
    if (allocContainer) {
      Charts.allocationBar(allocContainer, [
        { label:'Rafi', value:rafiVal, color:'var(--blue)' },
        { label:'AKD', value:akdVal, color:'var(--orange)' },
        { label:'Meezan', value:meezanVal, color:'var(--green)' },
      ]);
    }

    // Render sector bars
    const sectorContainer = el.querySelector('#sector-bars-container');
    if (sectorContainer) Charts.sectorBars(sectorContainer, sectors);

    // Render chart
    const chartContainer = el.querySelector('#portfolio-chart');
    if (chartContainer) Charts.lineChart(chartContainer, priceHistory);
  }

  return { render };
})();
window.Overview = Overview;
