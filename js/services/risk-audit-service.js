'use strict';
/** Rule-based portfolio risk report — pure logic, no network. */
const RiskAuditService = (() => {
  function severityFromPct(pct, warn, crit) {
    if (pct >= crit) return 'critical';
    if (pct >= warn) return 'high';
    if (pct >= warn * 0.75) return 'medium';
    return 'low';
  }

  function buildReport(deps) {
    deps = deps || {};
    const intel = deps.intel || { insights: [], scores: {}, summary: {} };
    const summary = intel.summary || deps.summary || {};
    const holdings = deps.holdings || [];
    const cgt = deps.cgt || {};
    const rebalance = deps.rebalance || {};
    const pilotScore = deps.pilotScore || {};
    const findings = [];

    (summary.sectorAllocation || []).forEach(s => {
      if (s.pct > 25) {
        findings.push({
          id: `sector-${s.sector}`,
          category: 'sector',
          severity: severityFromPct(s.pct, 25, 35),
          title: `${s.sector} ${s.pct.toFixed(0)}%`,
          detail: 'Sector concentration above 25% guideline.',
          action: 'Trim overweight sector or add diversifiers.',
        });
      }
    });

    const top = holdings[0];
    if (top && top.allocPct > 15) {
      findings.push({
        id: `name-${top.symbol}`,
        category: 'concentration',
        severity: severityFromPct(top.allocPct, 20, 30),
        title: `${top.symbol} ${top.allocPct.toFixed(0)}% of portfolio`,
        detail: 'Single-name concentration risk.',
        action: 'Review trim vs conviction in Research.',
      });
    }

    const brokers = summary.brokers || {};
    const brokerTotal = Object.values(brokers).reduce((a, v) => a + v, 0) || 1;
    Object.entries(brokers).forEach(([name, val]) => {
      const pct = (val / brokerTotal) * 100;
      if (pct > 55) {
        findings.push({
          id: `broker-${name}`,
          category: 'broker',
          severity: pct > 75 ? 'high' : 'medium',
          title: `${name} ${pct.toFixed(0)}% at one broker`,
          detail: 'Operational and custody concentration.',
          action: 'Consider splitting new buys across brokers.',
        });
      }
    });

    if ((cgt.short_term_count || 0) > 0) {
      findings.push({
        id: 'cgt-short',
        category: 'tax',
        severity: 'medium',
        title: `${cgt.short_term_count} lot(s) short-term CGT`,
        detail: 'Unrealized gains may attract higher CGT if sold within 365 days.',
        action: 'Verify tiers in Tax & Rebalance before trimming.',
      });
    }

    if ((cgt.lots_missing_date || 0) > 0) {
      findings.push({
        id: 'cgt-missing',
        category: 'tax',
        severity: 'low',
        title: `${cgt.lots_missing_date} position(s) missing buy date`,
        detail: 'CGT tier unknown until acquisition dates are set.',
        action: 'Open Tax & Rebalance → update holding dates.',
      });
    }

    if ((rebalance.drift_count || 0) > 0) {
      findings.push({
        id: 'drift',
        category: 'allocation',
        severity: rebalance.drift_count > 3 ? 'high' : 'medium',
        title: `${rebalance.drift_count} target weight drift(s)`,
        detail: rebalance.summary || 'Positions >3% from target.',
        action: 'Set target weights in Pilot Tools or review Buy more tab.',
      });
    }

    (intel.insights || []).filter(i => i.severity === 'high').forEach((i, idx) => {
      findings.push({
        id: `intel-${idx}`,
        category: 'insight',
        severity: 'high',
        title: (i.text || '').slice(0, 80),
        detail: i.text,
        action: i.action,
      });
    });

    const rafi = deps.rafiStocks || [];
    const akd = deps.akdStocks || [];
    const nonShariah = holdings.filter(h => {
      if (h.kind !== 'stock') return false;
      const sd = [...rafi, ...akd].find(s => s.symbol === h.symbol);
      return sd && sd.isShariah === false;
    });
    if (nonShariah.length) {
      findings.push({
        id: 'shariah',
        category: 'compliance',
        severity: 'low',
        title: `${nonShariah.length} conventional holding(s)`,
        detail: nonShariah.map(h => h.symbol).join(', '),
        action: 'Screen in Research or Zakat view.',
      });
    }

    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    findings.sort((a, b) => (order[a.severity] ?? 9) - (order[b.severity] ?? 9));

    return {
      findings,
      counts: {
        critical: findings.filter(f => f.severity === 'critical').length,
        high: findings.filter(f => f.severity === 'high').length,
        medium: findings.filter(f => f.severity === 'medium').length,
        low: findings.filter(f => f.severity === 'low').length,
      },
      pilotScore,
      scores: intel.scores || {},
      summary: {
        totalValue: summary.totalValue,
        portfolioDivYield: summary.portfolioDivYield,
      },
      disclaimer: 'Rule-based risk checklist — not financial advice.',
    };
  }

  return { buildReport, severityFromPct };
})();
window.RiskAuditService = RiskAuditService;
