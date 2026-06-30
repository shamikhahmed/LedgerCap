'use strict';
const Intelligence = (() => {
  const U = PlatformUI;

  function render(target) {
    const screen = target || document.getElementById('screen-intelligence');
    if (!screen) return;
    const intel = PortfolioAnalyticsService.getIntelligence();
    const { summary, insights, ruleInsights, scores } = intel;

    const fmtScore = n => Math.round(Number(n) || 0);
    screen.innerHTML = `
    ${MarketUI.pageHeader('Intelligence', 'Portfolio analysis', 'Scores · insights · sector exposure')}

    ${U.section('Portfolio Scores', U.metricGrid([
      U.metricCell('Health', fmtScore(scores.health) + '/100', null, scores.health >= 60 ? 't-gain' : 't-loss'),
      U.metricCell('Risk', fmtScore(scores.risk) + '/100', 'Lower is better', scores.risk <= 50 ? 't-gain' : 't-loss'),
      U.metricCell('Diversification', fmtScore(scores.diversification) + '/100'),
      U.metricCell('Dividend Quality', fmtScore(scores.dividendQuality) + '/100'),
      U.metricCell('Growth Quality', fmtScore(scores.growthQuality) + '/100'),
      U.metricCell('Portfolio Yield', summary.portfolioDivYield.toFixed(1) + '%'),
    ], 3))}

    ${U.section('Actionable Insights', insights.length ? insights.map(i => `
      <div class="rt-insight ${i.severity} cap-reveal">
        <div>${i.text}</div>
        <div class="rt-insight-action">→ ${i.action}</div>
      </div>`).join('') : '<div style="color:var(--os-text-secondary);">No critical insights.</div>')}

    ${ruleInsights.length ? U.section('Alerts', ruleInsights.map(i => `
      <div class="os-insight cap-reveal"><div class="os-insight-icon">${i.icon}</div><div class="os-insight-text">${i.text}</div></div>`).join('')) : ''}

    ${U.section('Sector Exposure', (summary.sectorAllocation || []).map(s => `
      <div class="os-row"><div class="os-row-sym">${s.sector}</div><div class="os-row-val">${s.pct.toFixed(1)}% · ${U.fmt(s.value)}</div></div>`).join(''))}

    ${U.section('Broker Exposure', Object.entries(summary.brokers || {}).sort((a, b) => b[1] - a[1]).map(([b, v]) => `
      <div class="os-row"><div class="os-row-sym">${b}</div><div class="os-row-val">${U.fmt(v)} · ${((v / summary.totalValue) * 100).toFixed(1)}%</div></div>`).join(''))}
    <div style="height:20px;"></div>`;
    CapMotion.refresh();
  }

  return { render };
})();
window.Intelligence = Intelligence;
