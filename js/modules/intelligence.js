'use strict';
const Intelligence = (() => {
  function render(target) {
    const screen = target || document.getElementById('screen-intelligence');
    if (!screen) return;
    const intel = PortfolioAnalyticsService.getIntelligence();
    const { summary, insights, ruleInsights, scores } = intel;
    const fmtScore = n => Math.round(Number(n) || 0);

    screen.innerHTML = PsxUI.lcDash('Intelligence', 'Rule-based portfolio analysis — not AI advice', `
      <div class="lc-pulse-row">
        ${[
          { label: 'Health', value: fmtScore(scores.health) + '/100', cls: scores.health >= 60 ? 'psx-up' : 'psx-down' },
          { label: 'Risk', value: fmtScore(scores.risk) + '/100' },
          { label: 'Diversification', value: fmtScore(scores.diversification) + '/100' },
          { label: 'Dividend quality', value: fmtScore(scores.dividendQuality) + '/100' },
          { label: 'Growth quality', value: fmtScore(scores.growthQuality) + '/100' },
          { label: 'Portfolio yield', value: summary.portfolioDivYield.toFixed(1) + '%' },
        ].map(c => `<div class="lc-pulse-pill"><label>${c.label}</label><b class="${c.cls || ''}">${c.value}</b></div>`).join('')}
      </div>

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Insights</h3><span>Actionable</span></div>
        ${insights.length ? insights.map(i => `
          <div class="lc-verdict lc-verdict--${i.severity || 'info'}">
            <p>${i.text}</p>
            <small>→ ${i.action}</small>
          </div>`).join('') : '<p class="lc-empty-note">No critical insights.</p>'}
      </div>

      ${ruleInsights.length ? `<div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Alerts</h3></div>
        ${ruleInsights.map(i => `<div class="lc-verdict"><p>${i.icon || '•'} ${i.text}</p></div>`).join('')}
      </div>` : ''}

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Sector exposure</h3></div>
        <div class="lc-sector-card">
          ${(summary.sectorAllocation || []).map(s => `
            <div class="lc-market-row" style="cursor:default">
              <div><div class="lc-market-sym">${s.sector}</div></div>
              <div class="lc-market-price">${s.pct.toFixed(1)}%</div>
              <div class="lc-market-chg">${PsxUI.fmt(s.value)}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Broker exposure</h3></div>
        <div class="lc-sector-card">
          ${Object.entries(summary.brokers || {}).sort((a, b) => b[1] - a[1]).map(([b, v]) => `
            <div class="lc-market-row" style="cursor:default">
              <div><div class="lc-market-sym">${b}</div></div>
              <div class="lc-market-price">${PsxUI.fmt(v)}</div>
              <div class="lc-market-chg">${summary.totalValue > 0 ? ((v / summary.totalValue) * 100).toFixed(1) : 0}%</div>
            </div>`).join('')}
        </div>
      </div>
    `);
    CapMotion.refresh();
  }

  return { render };
})();
window.Intelligence = Intelligence;
