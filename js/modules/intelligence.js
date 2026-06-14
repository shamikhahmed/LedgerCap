'use strict';
const Intelligence = (() => {
  function fmt(n) {
    if (n == null || isNaN(n)) return '—';
    if (Math.abs(n) >= 1e5) return '₨' + (n / 1e5).toFixed(2) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function render() {
    const screen = document.getElementById('screen-intelligence');
    if (!screen) return;
    const state = State.get();
    const m = Analytics.dashboardMetrics(state);
    const sectors = m.sectorAllocation;
    const brokers = m.brokerAllocation;

    const strengths = [];
    const weaknesses = [];
    if (m.portfolioHealth >= 65) strengths.push('Portfolio health is strong — returns and consistency are on track.');
    else weaknesses.push('Portfolio health needs attention — review SIP consistency and concentration.');
    if (m.riskScore <= 45) strengths.push('Risk profile is moderate with acceptable diversification.');
    else weaknesses.push(`Elevated risk score (${m.riskScore}) — consider reducing concentration.`);
    if (m.totalReturn.pct > 10) strengths.push(`Total return of ${m.totalReturn.pct.toFixed(1)}% exceeds typical inflation hurdles.`);
    if (sectors.length >= 4) strengths.push(`Sector spread across ${sectors.length} industries reduces single-sector risk.`);
    else weaknesses.push('Limited sector diversity — explore complementary industries.');
    if (m.dividendIncome > 0) strengths.push(`Dividend income of ${fmt(m.dividendIncome)} provides cash-flow cushion.`);
    const top = sectors[0];
    if (top && top.pct > 40) weaknesses.push(`${top.sector} represents ${top.pct.toFixed(0)}% of portfolio — sector imbalance detected.`);

    screen.innerHTML = `
    <div class="os-page-header cap-reveal">
      <div class="os-page-title">Portfolio Intelligence</div>
      <div class="os-page-sub">Actionable insights for your wealth</div>
    </div>
    <div class="os-ai-box cap-reveal">${m.aiSummary}</div>
    <div class="os-card-grid cap-reveal">
      <div class="os-card"><div class="os-metric-label">Health</div><div class="os-metric-value">${m.portfolioHealth}/100</div></div>
      <div class="os-card"><div class="os-metric-label">Risk</div><div class="os-metric-value">${m.riskScore}/100</div></div>
      <div class="os-card"><div class="os-metric-label">XIRR</div><div class="os-metric-value">${m.xirr != null ? (m.xirr * 100).toFixed(1) + '%' : '—'}</div></div>
      <div class="os-card"><div class="os-metric-label">Sectors</div><div class="os-metric-value">${sectors.length}</div></div>
    </div>
    <div class="os-section cap-reveal">
      <div class="os-section-title">Strengths</div>
      ${strengths.map(s => `<div class="os-insight"><div class="os-insight-icon">✓</div><div class="os-insight-text">${s}</div></div>`).join('')}
    </div>
    <div class="os-section cap-reveal">
      <div class="os-section-title">Areas to Improve</div>
      ${weaknesses.map(s => `<div class="os-insight"><div class="os-insight-icon">!</div><div class="os-insight-text">${s}</div></div>`).join('')}
    </div>
    <div class="os-section cap-reveal">
      <div class="os-section-title">Alerts</div>
      ${m.insights.map(i => `<div class="os-insight"><div class="os-insight-icon">${i.icon}</div><div class="os-insight-text">${i.text}</div></div>`).join('') || '<div style="color:var(--os-text-secondary);">No alerts right now.</div>'}
    </div>
    <div class="os-section cap-reveal">
      <div class="os-section-title">Broker Exposure</div>
      ${brokers.map(b => `<div class="os-row"><div class="os-row-sym">${b.broker}</div><div class="os-row-val">${b.pct.toFixed(1)}% · ${fmt(b.value)}</div></div>`).join('')}
    </div>`;
    CapMotion.refresh();
  }

  return { render };
})();
window.Intelligence = Intelligence;
