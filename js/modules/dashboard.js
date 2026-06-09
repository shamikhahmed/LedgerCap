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

  function fmtPrice(n) {
    if (!n || n <= 0) return '—';
    if (n >= 100000) return '₨' + (n / 100000).toFixed(2) + 'L';
    return '₨' + n.toLocaleString('en-PK', { maximumFractionDigits: 2 });
  }

  function pnlPill(val, pct, label) {
    const cls = val >= 0 ? 'up' : 'down';
    const sign = val >= 0 ? '+' : '';
    const lbl = label ? `<span style="opacity:0.7;margin-right:2px;">${label}</span>` : '';
    return `<span class="pnl-pill ${cls}">${lbl}${sign}${fmt(Math.abs(val))} (${sign}${pct.toFixed(2)}%)</span>`;
  }

  function _generateSyntheticHistory(currentVal, days) {
    const history = [];
    const startVal = currentVal * 0.97;
    for (let i = 0; i <= days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (days - i));
      const dateStr = d.toISOString().split('T')[0];
      const t = i / days;
      const trend = startVal + (currentVal - startVal) * t;
      const noise = trend * 0.004 * Math.sin(i * 1.7 + 2.3);
      history.push({ date: dateStr, value: Math.round(trend + noise), synthetic: true });
    }
    return history;
  }

  function _priceStatusText(allPrices) {
    const LIVE = ['yahoo','psx_live','psx_symbol','psx_eod'];
    const livePrices = allPrices.filter(p => LIVE.includes(p.source));
    if (!livePrices.length) return `<span style="font-size:0.68rem;color:var(--gold);">Using last-known prices — tap ⟳ Refresh for PSX data</span>`;
    const liveTs = Math.max(...livePrices.map(p => p.ts || 0));
    const diffH = (Date.now() - liveTs) / 3600000;
    const time = new Date(liveTs).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });
    if (diffH < 8) return `<span style="font-size:0.68rem;color:var(--green);">Prices updated today at ${time}</span>`;
    if (diffH < 32) return `<span style="font-size:0.68rem;color:var(--gold);">Updated yesterday — tap ⟳ Refresh</span>`;
    return `<span style="font-size:0.68rem;color:var(--red);">Prices may be outdated — tap ⟳ Refresh</span>`;
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

    const allPrices = Object.values(state.prices || {});
    const LIVE_SRC = ['yahoo', 'psx_live', 'psx_symbol', 'psx_eod', 'manual'];
    const allFallback = allPrices.length === 0 || !allPrices.some(p => LIVE_SRC.includes(p.source));
    const proxyUrl = settings.psxProxyUrl || window.STUNDS_CONFIG?.psxProxyUrl || '';

    const realHistory = state.priceHistory || [];
    const isSynthetic = realHistory.length < 4;
    const history = isSynthetic && totalValue > 0 ? _generateSyntheticHistory(totalValue, 30) : realHistory;

    const lastMonthVal = history.length > 20 ? history[history.length - 20]?.value || totalValue : totalValue;
    const monthlyPnl = totalValue - lastMonthVal;

    const ytdEntry = realHistory.find(h => h.date && h.date.startsWith('2026-01'));
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
      if (!curr || !prev || prev === curr || State.getPriceSource(h.symbol) === 'fallback') return null;
      return { symbol: h.symbol, changeP: ((curr - prev) / prev) * 100, change: (curr - prev) * h.shares };
    }).filter(Boolean).sort((a, b) => Math.abs(b.changeP) - Math.abs(a.changeP)).slice(0, 4);

    const validForPnl = holdings.filter(h => {
      const price = State.getPrice(h.symbol);
      return price > 0 && h.avgCost > 0 && h.shares > 0;
    });
    const withPnl = validForPnl.map(h => {
      const price = State.getPrice(h.symbol);
      const pnlPct = ((price - h.avgCost) / h.avgCost) * 100;
      const pnlAbs = (price - h.avgCost) * h.shares;
      return { ...h, price, pnlPct, pnlAbs };
    });
    const sanityFiltered = withPnl.filter(h => h.avgCost > 5 && Math.abs(h.pnlPct) < 150);
    const sortedByPct = [...sanityFiltered].sort((a, b) => b.pnlPct - a.pnlPct);
    const best = sortedByPct[0] || null;
    const worst = sortedByPct.length > 0 ? sortedByPct[sortedByPct.length - 1] : null;

    const stockRows = holdings.map(h => {
      const curr = State.getPrice(h.symbol) || h.avgCost;
      const val = h.shares * curr;
      const pnl = val - h.shares * h.avgCost;
      return { symbol: h.symbol, val, pnl };
    });
    const mostVal = [...stockRows].sort((a, b) => b.val - a.val)[0];
    const totalUnrealisedPnl = stockRows.reduce((s, r) => s + r.pnl, 0);
    const stocksValue = stockRows.reduce((s, r) => s + r.val, 0);

    const shariahStockVal = holdings.reduce((sum, h) => {
      const staticData = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === h.symbol && s.broker === h.broker);
      if (!staticData?.isShariah) return sum;
      return sum + h.shares * (State.getPrice(h.symbol) || h.avgCost);
    }, 0);
    const shariahPct = totalValue > 0 ? ((shariahStockVal + meezanVal) / totalValue * 100) : 0;
    const miifVal = funds.filter(f => f.symbol.startsWith('MIIF')).reduce((sum, f) => {
      const nav = State.getPrice(f.symbol);
      const mf = (window.MEEZAN_FUNDS || []).find(m => m.symbol === f.symbol);
      return sum + f.units * (nav || mf?.currentNav || f.avgNav);
    }, 0);

    const nominalRetPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;
    const pkrDepPct = (settings.pkrDepreciationRate || 0.15) * 100;
    const usdInflation = 3;
    const realPkr = nominalRetPct - pkrDepPct;
    const realUsd = realPkr - usdInflation;
    const usdRate = settings.usdRate || 280;

    const insights = Insights.generate(state);
    const kse = state.kseIndex || {};
    const lastUpdate = allPrices.sort((a, b) => (b.ts || 0) - (a.ts || 0))[0];
    const lastUpdateStr = lastUpdate ? Prices.formatTs(lastUpdate.ts) : 'Not updated';

    const realRet = Projections.realReturn(settings.targetReturn || 0.18, settings.inflationRate || 0.20);
    const ffCorpus = Projections.financialFreedom(settings.freedomTarget || 100000);
    const ffYears = Projections.yearsToFreedom(totalValue, targetSIP, ffCorpus, settings.targetReturn || 0.18);

    screen.innerHTML = `
    ${allFallback ? `<div style="padding:8px 16px;background:rgba(240,185,11,0.08);border-bottom:1px solid rgba(240,185,11,0.2);display:flex;align-items:center;gap:8px;">
      <span style="color:var(--gold);font-size:0.72rem;">&#9888; Showing approximate prices from last known data &middot; </span>
      <button onclick="App.refreshPrices()" style="color:var(--orange);font-size:0.72rem;background:none;border:none;cursor:pointer;font-weight:700;">Tap to update &rarr;</button>
    </div>` : ''}
    <div class="kse-bar">
      <div class="kse-ticker">
        <span class="kse-sym">KSE-100</span>
        <span class="kse-price">${kse.value ? Number(kse.value).toLocaleString('en-PK', { maximumFractionDigits: 0 }) : '—'}</span>
        ${kse.changeP !== undefined ? `<span class="kse-chg ${kse.changeP >= 0 ? 't-gain' : 't-loss'}">${fmtPct(kse.changeP)}</span>` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button class="btn-ghost" onclick="App.refreshPrices()">⟳ Refresh</button>
      </div>
    </div>
    <div style="padding:4px 16px 8px;background:var(--bg2);border-bottom:1px solid var(--bg4);display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
      ${_priceStatusText(allPrices)}
      ${proxyUrl ? `<span style="font-size:0.62rem;color:var(--green);font-weight:600;">● Proxy on</span>` : ''}
    </div>

    <div class="dash-hero">
      <div class="hero-label">Net Worth</div>
      <div class="hero-value">${fmt(totalValue)}</div>
      <div class="hero-pnl">
        ${pnlPill(totalPnl, totalPnlPct, 'All time')}
        ${!allFallback && dailyPnl !== 0 ? `<span class="pnl-pill ${dailyPnl >= 0 ? 'up' : 'down'}">Today ${dailyPnl >= 0 ? '+' : ''}${fmt(Math.abs(dailyPnl))}</span>` : `<span class="pnl-pill" style="background:rgba(255,255,255,0.05);color:var(--text3);font-size:0.7rem;">Daily P&L: refresh prices</span>`}
        ${!isSynthetic && monthlyPnl !== 0 ? `<span class="pnl-pill ${monthlyPnl >= 0 ? 'up' : 'down'}">Month ${monthlyPnl >= 0 ? '+' : ''}${fmt(Math.abs(monthlyPnl))}</span>` : ''}
      </div>
      <div class="hero-invest-row">
        <span><strong>${fmt(totalCost)}</strong> invested</span>
        <span class="${totalPnl >= 0 ? 't-gain' : 't-loss'}">${totalPnl >= 0 ? '+' : ''}${fmt(totalPnl)} gain</span>
        <span class="t-dim">~${(realRet * 100).toFixed(1)}% real</span>
      </div>
    </div>

    ${typeof Investment !== 'undefined' ? Investment.render(transactions, totalValue) : ''}

    <div class="metric-grid">
      <div class="metric-tile">
        <div class="metric-label">YTD Gain</div>
        <div class="metric-value ${ytdPnl >= 0 ? 't-gain' : 't-loss'}">${ytdPnl !== 0 ? fmt(Math.abs(ytdPnl)) : '—'}</div>
        <div class="metric-sub">${ytdPnl !== 0 ? (ytdPnl >= 0 ? '▲ ' : '▼ ') + fmtPct(ytdPct) : 'From Jan 2026'}</div>
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

    ${stockRows.length > 0 ? `
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bg4);">
        <div style="background:var(--bg2);padding:10px 8px;text-align:center;">
          <div style="font-size:0.58rem;color:var(--text3);margin-bottom:3px;">BEST STOCK</div>
          <div style="font-size:0.78rem;font-weight:700;color:var(--green);">${best ? best.symbol : '—'}</div>
          <div style="font-size:0.62rem;color:var(--green);">${best ? (best.pnlPct >= 0 ? '+' : '') + best.pnlPct.toFixed(1) + '%' : ''}</div>
        </div>
        <div style="background:var(--bg2);padding:10px 8px;text-align:center;">
          <div style="font-size:0.58rem;color:var(--text3);margin-bottom:3px;">WORST STOCK</div>
          <div style="font-size:0.78rem;font-weight:700;color:var(--red);">${worst ? worst.symbol : '—'}</div>
          <div style="font-size:0.62rem;color:var(--red);">${worst ? worst.pnlPct.toFixed(1) + '%' : ''}</div>
        </div>
        <div style="background:var(--bg2);padding:10px 8px;text-align:center;">
          <div style="font-size:0.58rem;color:var(--text3);margin-bottom:3px;">LARGEST</div>
          <div style="font-size:0.78rem;font-weight:700;">${mostVal ? mostVal.symbol : '—'}</div>
          <div style="font-size:0.62rem;color:var(--text3);">${mostVal ? fmt(mostVal.val) : ''}</div>
        </div>
        <div style="background:var(--bg2);padding:10px 8px;text-align:center;">
          <div style="font-size:0.58rem;color:var(--text3);margin-bottom:3px;">TOTAL P&L</div>
          <div style="font-size:0.78rem;font-weight:700;color:${totalUnrealisedPnl >= 0 ? 'var(--green)' : 'var(--red)'};">${totalUnrealisedPnl >= 0 ? '+' : ''}${fmt(totalUnrealisedPnl)}</div>
          <div style="font-size:0.62rem;color:var(--text3);">unrealised</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bg4);">
        <div style="background:var(--bg2);padding:10px 8px;text-align:center;">
          <div style="font-size:0.58rem;color:var(--text3);margin-bottom:3px;">TOTAL STOCKS</div>
          <div style="font-size:0.78rem;font-weight:700;">${holdings.length}</div>
          <div style="font-size:0.62rem;color:var(--text3);">${fmt(stocksValue)}</div>
        </div>
        <div style="background:var(--bg2);padding:10px 8px;text-align:center;">
          <div style="font-size:0.58rem;color:var(--text3);margin-bottom:3px;">TOTAL FUNDS</div>
          <div style="font-size:0.78rem;font-weight:700;">${funds.length}</div>
          <div style="font-size:0.62rem;color:var(--text3);">${fmt(meezanVal)}</div>
        </div>
        <div style="background:var(--bg2);padding:10px 8px;text-align:center;">
          <div style="font-size:0.58rem;color:var(--text3);margin-bottom:3px;">SHARIAH</div>
          <div style="font-size:0.78rem;font-weight:700;color:var(--teal);">${shariahPct.toFixed(0)}%</div>
          <div style="font-size:0.62rem;color:var(--text3);">of portfolio</div>
        </div>
        <div style="background:var(--bg2);padding:10px 8px;text-align:center;">
          <div style="font-size:0.58rem;color:var(--text3);margin-bottom:3px;">CASH EQUIV</div>
          <div style="font-size:0.78rem;font-weight:700;color:var(--blue);">${fmt(miifVal)}</div>
          <div style="font-size:0.62rem;color:var(--text3);">MIIF liquid</div>
        </div>
      </div>
    </div>` : ''}

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

    <div class="sec-head"><span class="sec-title">Today's Movers</span></div>
    ${movers.length > 0 ? `
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--bg4);margin-bottom:1px;">
      ${movers.map(m => `
        <div style="background:var(--bg2);padding:12px 14px;">
          <div style="font-size:0.82rem;font-weight:700;">${m.symbol}</div>
          <div class="${m.changeP >= 0 ? 't-gain' : 't-loss'}" style="font-size:0.78rem;font-weight:700;margin-top:3px;">${m.changeP >= 0 ? '+' : ''}${m.changeP.toFixed(2)}%</div>
          <div style="font-size:0.68rem;color:var(--text3);">${m.change >= 0 ? '+' : ''}${fmt(Math.abs(m.change))}</div>
        </div>`).join('')}
    </div>` : `
    <div style="padding:12px 16px;font-size:0.75rem;color:var(--text3);">Tap ⟳ Refresh to see today's movers</div>`}

    ${typeof Reports !== 'undefined' ? Reports.monthlySnapshot(state) : ''}

    ${insights.length > 0 ? `
    <div class="sec-head"><span class="sec-title">Wealth Insights</span><span class="sec-action">${insights.length} alerts</span></div>
    <div class="insights-feed">
      ${insights.map(i => `
        <div class="insight-item">
          <div class="insight-icon" style="background:${i.color}18;">${i.icon}</div>
          <div class="insight-text">${i.text}</div>
        </div>`).join('')}
    </div>` : ''}

    <div class="sec-head"><span class="sec-title">Net Worth History</span>${isSynthetic ? '<span class="sec-action" style="color:var(--gold);">~Estimated</span>' : ''}</div>
    <div class="chart-card"><div id="nw-chart" style="padding:8px 16px 4px;"></div></div>

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

    <div class="sec-head" style="margin-top:4px;"><span class="sec-title">PKR Reality Check</span></div>
    <div class="proj-card">
      <div style="font-size:0.72rem;color:var(--text3);margin-bottom:12px;">Nominal return vs. purchasing power erosion</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
        <div>
          <div class="metric-label">Nominal Return</div>
          <div style="font-size:1.1rem;font-weight:800;color:${nominalRetPct >= 0 ? 'var(--green)' : 'var(--red)'};">${nominalRetPct >= 0 ? '+' : ''}${nominalRetPct.toFixed(1)}%</div>
          <div style="font-size:0.65rem;color:var(--text3);">On invested capital</div>
        </div>
        <div>
          <div class="metric-label">PKR Depreciation</div>
          <div style="font-size:1.1rem;font-weight:800;color:var(--red);">-${pkrDepPct.toFixed(0)}%/yr</div>
          <div style="font-size:0.65rem;color:var(--text3);">Est. annual (settings)</div>
        </div>
        <div>
          <div class="metric-label">Real Return (PKR)</div>
          <div style="font-size:1.1rem;font-weight:800;color:${realPkr >= 0 ? 'var(--green)' : 'var(--red)'};">${realPkr >= 0 ? '+' : ''}${realPkr.toFixed(1)}%</div>
          <div style="font-size:0.65rem;color:var(--text3);">After currency erosion</div>
        </div>
        <div>
          <div class="metric-label">Portfolio in USD</div>
          <div style="font-size:1.1rem;font-weight:800;color:var(--orange);">$${Math.round(totalValue / usdRate).toLocaleString()}</div>
          <div style="font-size:0.65rem;color:var(--text3);">At ₨${usdRate}/USD</div>
        </div>
      </div>
      <div style="padding:10px 12px;background:rgba(255,107,53,0.08);border-radius:var(--r-sm);border:1px solid rgba(255,107,53,0.15);">
        <div style="font-size:0.75rem;color:var(--text2);">Break-even: You need <strong style="color:var(--orange);">${pkrDepPct.toFixed(0)}%+</strong> nominal return just to preserve purchasing power.</div>
      </div>
    </div>
    <div style="height:8px;"></div>`;

    const chartEl = document.getElementById('nw-chart');
    if (chartEl && history.length > 1) {
      chartEl.innerHTML = Charts.lineChart(history.map(h => h.value), { color: '#FF6B35', height: 120, fill: true });
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

window._debugHoldings = function() {
  const state = State.get();
  const holdings = Ledger.calcHoldings(state.transactions);
  holdings.forEach(h => {
    const price = State.getPrice(h.symbol);
    const pnl = price > 0 ? ((price - h.avgCost) / h.avgCost * 100).toFixed(1) : 'no price';
    console.log(h.symbol, h.broker, '| shares:', h.shares, '| avgCost:', h.avgCost.toFixed(2), '| price:', price, '| P&L%:', pnl);
  });
};
