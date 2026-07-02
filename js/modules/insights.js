'use strict';
/** Portfolio insights screen — distinct from engines/insights.js rule engine. */
const InsightsScreen = (() => {
  const SECONDARY_BENCH = 'MZNPETF';

  function _benchmarkCompare(state) {
    const summary = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    const portPct = summary.totalValue > 0 ? (daily / summary.totalValue) * 100 : 0;

    const kse = state.kseIndex || {};
    let benchPct = kse.changeP;
    if (benchPct == null && kse.value && kse.prevClose) {
      benchPct = ((kse.value - kse.prevClose) / kse.prevClose) * 100;
    }
    benchPct = benchPct != null ? benchPct : 0;
    const alpha = portPct - benchPct;

    const mznPrice = State.getPrice(SECONDARY_BENCH) || 0;
    const mznPrev = State.getPrevClose(SECONDARY_BENCH) || mznPrice;
    const mznPct = mznPrev > 0 ? ((mznPrice - mznPrev) / mznPrev) * 100 : 0;

    return {
      portPct,
      benchPct,
      alpha,
      benchSymbol: 'KSE-100',
      benchValue: kse.value,
      secondarySymbol: SECONDARY_BENCH,
      secondaryPct: mznPct,
    };
  }

  function _valueSeries(state) {
    const hist = state.priceHistory || [];
    if (hist.length >= 2) {
      return hist.map(h => h.totalValue || h.value || 0).filter(v => v > 0);
    }
    const now = State.calcTotalValue();
    const cost = State.calcTotalCost();
    if (now > 0 && cost > 0) return [cost, now];
    return now > 0 ? [now] : [];
  }

  function _zakatDue(state) {
    const settings = state.settings || {};
    const ma = state.manualAssets || {};
    const goldG = settings.goldPricePerGram || 18000;
    const nisab = 87.48 * goldG;
    const s = PortfolioAnalyticsService.getSummary(state);
    const zakatable = Math.max(0, s.totalValue + (ma.usdCash || 0) * FxService.getUsdRate()
      + (ma.goldGrams || 0) * goldG + (ma.realEstate || 0) - (settings.zakatDebts || 0));
    return { due: zakatable >= nisab ? zakatable * 0.025 : 0, zakatable, nisab };
  }

  function render() {
    const screen = document.getElementById('screen-insights');
    if (!screen) return;
    const state = State.get();

    if (!state.transactions?.length) {
      screen.innerHTML = `<div class="lc-dash"><div class="lc-screen-head"><h1>Insights</h1><p>Pilot score · benchmark · history</p></div>
        ${MarketUI.emptyState(LcIcons.icon('chart', 28), 'No insights yet', 'Add holdings to see score, benchmark, and value history.', '<button type="button" class="os-btn os-btn-primary" onclick="App.openAddTransaction()">Add holdings</button>')}
      </div>`;
      CapMotion.refresh();
      return;
    }

    const pilot = PilotEngine.buildPilotScore(state);
    const bench = _benchmarkCompare(state);
    const zakat = _zakatDue(state);
    const series = _valueSeries(state);
    const ruleInsights = (typeof Insights !== 'undefined' ? Insights.generate(state) : []) || [];
    const histDays = (state.priceHistory || []).length;
    const alphaCls = bench.alpha >= 0 ? 't-gain' : 't-loss';

    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head">
        <h1>Insights</h1>
        <p>Pilot score · KSE-100 benchmark · zakatable wealth</p>
      </div>

      <div class="lc-dash-hero cap-reveal">
        <div class="lc-dash-hero-label">Pilot Score</div>
        <div class="lc-dash-hero-val">${pilot.grade} · ${pilot.score}/100</div>
        <div class="lc-dash-hero-row">
          ${(pilot.highlights || []).slice(0, 2).map(h => `<span class="lc-dash-chip">${h}</span>`).join('')}
        </div>
      </div>

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>vs ${bench.benchSymbol} (today)</h3><span>PSX index</span></div>
        <div class="lc-metric-grid">
          <div class="lc-metric-cell"><label>Your portfolio</label><strong class="${bench.portPct >= 0 ? 't-gain' : 't-loss'}">${bench.portPct >= 0 ? '+' : ''}${bench.portPct.toFixed(2)}%</strong></div>
          <div class="lc-metric-cell"><label>${bench.benchSymbol}</label><strong class="${bench.benchPct >= 0 ? 't-gain' : 't-loss'}">${bench.benchPct >= 0 ? '+' : ''}${bench.benchPct.toFixed(2)}%</strong></div>
          <div class="lc-metric-cell"><label>Alpha (est.)</label><strong class="${alphaCls}">${bench.alpha >= 0 ? '+' : ''}${bench.alpha.toFixed(2)}%</strong></div>
        </div>
        <div class="lc-metric-grid" style="margin-top:8px">
          <div class="lc-metric-cell"><label>${bench.secondarySymbol}</label><strong class="${bench.secondaryPct >= 0 ? 't-gain' : 't-loss'}">${bench.secondaryPct >= 0 ? '+' : ''}${bench.secondaryPct.toFixed(2)}%</strong></div>
          <div class="lc-metric-cell"><label>Index level</label><strong>${bench.benchValue ? PsxUI.fmtIndex(bench.benchValue) : '—'}</strong></div>
        </div>
        <p class="lc-card-sub" style="margin-top:8px">KSE-100 primary benchmark (Sarmaaya-style). ${bench.secondarySymbol} shown as Shariah ETF proxy.</p>
      </div>

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Portfolio value</h3><span>${histDays} day${histDays === 1 ? '' : 's'} logged</span></div>
        <div class="lc-chart-wrap">${typeof Charts !== 'undefined' ? Charts.lineChartBlock(series, { height: 120, ariaLabel: 'Portfolio insight trend' }) : ''}</div>
        <p class="lc-card-sub" style="margin-top:8px">Open app after price refresh to build daily snapshots.</p>
      </div>

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Zakat snapshot</h3><button type="button" class="lc-section-action" onclick="Navigation.go('zakat')">Calculator →</button></div>
        <div class="lc-metric-grid">
          <div class="lc-metric-cell"><label>Est. due</label><strong>${PsxUI.fmt(zakat.due)}</strong></div>
          <div class="lc-metric-cell"><label>Zakatable</label><strong>${PsxUI.fmt(zakat.zakatable)}</strong></div>
          <div class="lc-metric-cell"><label>Nisab</label><strong>${PsxUI.fmt(zakat.nisab)}</strong></div>
        </div>
      </div>

      ${ruleInsights.length ? `<div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Contribution insights</h3><span>Rule-based</span></div>
        ${ruleInsights.map(i => `
          <div class="lc-verdict cap-reveal">
            <p>${i.text || i.message || ''}</p>
            ${i.action ? `<small>→ ${i.action}</small>` : ''}
          </div>`).join('')}
      </div>` : ''}

      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-ghost" onclick="Navigation.go('risk-audit')">Risk audit</button>
        <button type="button" class="psx-btn psx-btn-ghost" onclick="Navigation.go('performance')">Performance</button>
      </div>
      <div class="lc-disclaimer">Smart Assistant summary — not financial advice. Benchmark is illustrative only.</div>
    </div>`;
    CapMotion.refresh();
  }

  return { render, _benchmarkCompare, _valueSeries };
})();
window.InsightsScreen = InsightsScreen;
