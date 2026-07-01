'use strict';
const RiskAudit = (() => {
  const U = PlatformUI;

  function _sevClass(sev) {
    if (sev === 'critical' || sev === 'high') return 'lc-verdict--high';
    if (sev === 'medium') return 'lc-verdict--warn';
    return '';
  }

  function _report(state) {
    const intel = PortfolioAnalyticsService.getIntelligence(state);
    return RiskAuditService.buildReport({
      intel,
      summary: intel.summary,
      holdings: PortfolioAnalyticsService.getHoldings(state),
      cgt: PilotEngine.buildCgtReport(state),
      rebalance: PilotEngine.buildRebalancePlan(state),
      pilotScore: PilotEngine.buildPilotScore(state),
      rafiStocks: window.RAFI_STOCKS || [],
      akdStocks: window.AKD_STOCKS || [],
    });
  }

  function render() {
    const screen = document.getElementById('screen-risk-audit');
    if (!screen) return;
    const state = State.get();

    if (!state.transactions?.length) {
      screen.innerHTML = `<div class="lc-dash"><div class="lc-screen-head"><h1>Risk audit</h1><p>Concentration · tax · allocation drift</p></div>
        ${MarketUI.emptyState('🛡', 'No holdings', 'Load your ledger to run a rule-based risk audit.', '<button type="button" class="os-btn os-btn-primary" onclick="App.openAddTransaction()">Add holdings</button>')}
      </div>`;
      CapMotion.refresh();
      return;
    }

    const report = _report(state);
    const ps = report.pilotScore || {};

    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head">
        <h1>Risk audit</h1>
        <p>Rule-based checklist — sector · name · broker · CGT · drift</p>
      </div>
      ${U.metricGrid([
        U.metricCell('Pilot Score', `${ps.grade || '—'} · ${ps.score ?? '—'}`, 'Composite health'),
        U.metricCell('Critical', String(report.counts.critical), 'Immediate review'),
        U.metricCell('High', String(report.counts.high), 'This week'),
        U.metricCell('Findings', String(report.findings.length), 'All categories'),
      ], 2)}

      ${report.findings.length ? U.section('Findings', report.findings.map(f => `
        <div class="lc-verdict ${_sevClass(f.severity)} cap-reveal">
          <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            <strong>${f.title}</strong>
            <span class="badge" style="font-size:10px;text-transform:uppercase">${f.severity} · ${f.category}</span>
          </div>
          <p style="margin:0 0 6px;font-size:13px;line-height:1.45">${f.detail}</p>
          <small>→ ${f.action}</small>
        </div>`).join('')) : U.section('Findings', '<p class="lc-empty-note">No elevated risks flagged — keep monitoring weekly.</p>')}

      ${U.section('Score breakdown', `
        <div class="lc-metric-grid">
          <div class="lc-metric-cell"><label>Diversification</label><strong>${report.scores.diversification ?? '—'}/100</strong></div>
          <div class="lc-metric-cell"><label>Risk</label><strong>${report.scores.risk ?? '—'}/100</strong></div>
          <div class="lc-metric-cell"><label>Dividend quality</label><strong>${report.scores.dividendQuality ?? '—'}/100</strong></div>
          <div class="lc-metric-cell"><label>Growth quality</label><strong>${report.scores.growthQuality ?? '—'}/100</strong></div>
        </div>
        ${(ps.improvements || []).length ? `<p style="font-size:12px;color:var(--os-text-secondary);margin-top:12px">${ps.improvements.map(i => `• ${i}`).join('<br>')}</p>` : ''}
      `)}

      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-ghost" onclick="Navigation.go('pilot-tools')">Tax &amp; Rebalance</button>
        <button type="button" class="psx-btn psx-btn-ghost" onclick="Navigation.go('signals')">Signals</button>
        <button type="button" class="psx-btn psx-btn-primary" onclick="Research.setMode('portfolio');Navigation.go('research', false, { portfolioIntel: true })">Portfolio intel</button>
      </div>
      <div class="lc-disclaimer">${report.disclaimer}</div>
    </div>`;
    CapMotion.refresh();
  }

  return { render, _report };
})();
window.RiskAudit = RiskAudit;
