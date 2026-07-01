'use strict';
/**
 * Portfolio Pilot rule engine — ported for LedgerCap (offline, no AI API).
 * Morning brief, Core/Swing books, CGT, rebalance, screener, pilot score.
 */
const PilotEngine = (() => {
  const SECTOR_PE_MEDIAN = {
    Banking: 8, Cement: 11, 'Oil & Gas': 7, Technology: 18, Textile: 12,
    Power: 9, Chemical: 10, Food: 14, Pharmaceutical: 16, Engineering: 13,
    Securities: 8, Other: 12, Unclassified: 12,
  };

  const ACTION_ORDER = ['SELL', 'REDUCE', 'TRIM', 'WATCH', 'HOLD', 'ADD', 'STRONG BUY'];

  function settings(state) {
    const s = state || State.get();
    return {
      concentrationThresholdPct: s.pilotSettings?.concentrationThresholdPct ?? 20,
      corePeDiscountPct: s.pilotSettings?.corePeDiscountPct ?? 15,
      swingRsiOversold: s.pilotSettings?.swingRsiOversold ?? 35,
      swingRsiOverbought: s.pilotSettings?.swingRsiOverbought ?? 65,
      isFiler: s.pilotSettings?.isFiler !== false,
      cashBalancePkr: s.pilotSettings?.cashBalancePkr ?? s.settings?.cashBalance ?? 0,
      goldPricePerGram: s.pilotSettings?.goldPricePerGram ?? s.settings?.goldPricePerGram ?? 18000,
    };
  }

  function holdingMeta(symbol, broker, state) {
    const s = state || State.get();
    const key = `${symbol}_${broker || 'default'}`;
    return (s.holdingMeta || {})[key] || { book: 'core', targetWeight: null, acquiredAt: null };
  }

  function setHoldingMeta(symbol, broker, patch) {
    State.update(st => {
      if (!st.holdingMeta) st.holdingMeta = {};
      const key = `${symbol}_${broker || 'default'}`;
      st.holdingMeta[key] = { ...holdingMeta(symbol, broker, st), ...patch };
    });
  }

  function isMutualFund(symbol) {
    return !!(window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol)
      || /^(KMIF|MIF|MIIF|MAAF|MBF|MDAAF)/i.test(symbol);
  }

  function sectorFor(symbol) {
    const meta = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(x => x.symbol === symbol);
    return meta?.sector || 'Other';
  }

  function sectorMedianPe(sector) {
    return SECTOR_PE_MEDIAN[sector] || 12;
  }

  function scoreToAction(score) {
    if (score >= 75) return 'STRONG BUY';
    if (score >= 60) return 'ADD';
    if (score >= 45) return 'HOLD';
    if (score >= 35) return 'WATCH';
    if (score >= 25) return 'TRIM';
    if (score >= 15) return 'REDUCE';
    return 'SELL';
  }

  function buildTechnical(symbol, price, prevClose) {
    const seed = (window.PRICE_CHANGE_SEED || {})[symbol] || {};
    const dayChg = prevClose > 0 ? ((price - prevClose) / prevClose) * 100 : (seed.weekly || 0);
    const yearly = seed.yearly || 0;
    const pos52 = Math.max(5, Math.min(95, 50 + yearly / 2));
    const rsi = Math.max(18, Math.min(82, 50 - (seed.monthly || 0) * 1.2));
    const ma20 = price * (1 - (seed.monthly || 0) / 200);
    return { rsi_14: rsi, ma_20: ma20, position_in_52w_pct: pos52, day_change_pct: dayChg };
  }

  function scoreCore(ctx) {
    let score = 50;
    const reasons = [];
    const cfg = ctx.settings;

    if (ctx.weightPct > cfg.concentrationThresholdPct) {
      score -= 25;
      reasons.push({ rule: 'concentration', detail: `Position ${ctx.weightPct.toFixed(1)}% exceeds ${cfg.concentrationThresholdPct}% threshold`, score_delta: -25 });
    }

    const pe = ctx.fundamentals?.pe;
    const median = sectorMedianPe(ctx.sector);
    if (pe && pe < median * (1 - cfg.corePeDiscountPct / 100)) {
      score += 15;
      reasons.push({ rule: 'value_pe', detail: `P/E ${pe.toFixed(1)} below sector median ${median}`, score_delta: 15 });
    } else if (pe && pe > median * 1.3) {
      score -= 10;
      reasons.push({ rule: 'expensive_pe', detail: `P/E ${pe.toFixed(1)} above sector median ${median}`, score_delta: -10 });
    }

    if (ctx.technical.position_in_52w_pct < 40) {
      score += 10;
      reasons.push({ rule: '52w_value', detail: `Lower ${ctx.technical.position_in_52w_pct.toFixed(0)}% of 52-week range`, score_delta: 10 });
    } else if (ctx.technical.position_in_52w_pct > 85) {
      score -= 8;
      reasons.push({ rule: '52w_high', detail: 'Near 52-week high — limited upside', score_delta: -8 });
    }

    const growth = ctx.fundamentals?.profitGrowth;
    if (growth > 10) {
      score += 12;
      reasons.push({ rule: 'eps_growth', detail: `Profit growth +${growth.toFixed(1)}% YoY`, score_delta: 12 });
    } else if (growth < -5) {
      score -= 12;
      reasons.push({ rule: 'eps_decline', detail: `Profit growth ${growth.toFixed(1)}% YoY`, score_delta: -12 });
    }

    const yld = ctx.fundamentals?.divYield;
    if (yld > 5) {
      score += 8;
      reasons.push({ rule: 'dividend_yield', detail: `Dividend yield ${yld.toFixed(1)}%`, score_delta: 8 });
    }

    if (ctx.plPct > 15) {
      score -= ctx.daysHeld != null && ctx.daysHeld < 730 ? 12 : 5;
      reasons.push({
        rule: 'cgt_awareness',
        detail: ctx.daysHeld != null && ctx.daysHeld < 730
          ? `Held ${ctx.daysHeld}d with +${ctx.plPct.toFixed(1)}% — short-term CGT applies`
          : `+${ctx.plPct.toFixed(1)}% gain — review CGT before trimming`,
        score_delta: -5,
      });
    }

    return { score: Math.max(0, Math.min(100, score)), reasons, action: scoreToAction(score) };
  }

  function scoreSwing(ctx) {
    let score = 50;
    const reasons = [];
    const cfg = ctx.settings;
    const t = ctx.technical;

    if (t.rsi_14 < cfg.swingRsiOversold) {
      score += 20;
      reasons.push({ rule: 'rsi_oversold', detail: `RSI ${t.rsi_14.toFixed(0)} — oversold`, score_delta: 20 });
    } else if (t.rsi_14 > cfg.swingRsiOverbought) {
      score -= 20;
      reasons.push({ rule: 'rsi_overbought', detail: `RSI ${t.rsi_14.toFixed(0)} — overbought`, score_delta: -20 });
    }

    if (t.ma_20 && ctx.price > t.ma_20 * 1.02) {
      score += 8;
      reasons.push({ rule: 'above_ma20', detail: `Above 20-day MA (${t.ma_20.toFixed(2)})`, score_delta: 8 });
    } else if (t.ma_20 && ctx.price < t.ma_20 * 0.96) {
      score -= 8;
      reasons.push({ rule: 'below_ma20', detail: `Below 20-day MA (${t.ma_20.toFixed(2)})`, score_delta: -8 });
    }

    if (t.day_change_pct < -4) {
      score += 6;
      reasons.push({ rule: 'gap_down', detail: `Gap down ${t.day_change_pct.toFixed(1)}% — mean reversion watch`, score_delta: 6 });
    }

    if (ctx.plPct < -8) {
      score -= 25;
      reasons.push({ rule: 'stop_loss', detail: `Unrealized loss ${ctx.plPct.toFixed(1)}% — stop discipline`, score_delta: -25 });
    }

    if (ctx.plPct > 10 && t.position_in_52w_pct > 80) {
      score -= 15;
      reasons.push({ rule: 'take_profit', detail: `+${ctx.plPct.toFixed(1)}% near 52w high — consider trim`, score_delta: -15 });
    }

    return { score: Math.max(0, Math.min(100, score)), reasons, action: scoreToAction(score) };
  }

  function evaluateRow(row, totalValue, cfg, state) {
    if (row.kind === 'fund' || isMutualFund(row.symbol)) {
      const action = row.pnlPct < -2 ? 'WATCH' : 'HOLD';
      return {
        symbol: row.symbol, book: 'core', action, score: 50,
        rationale: `${row.symbol} mutual fund — track NAV, long-term hold`,
        reasons: [{ rule: 'mutual_fund_nav', detail: 'Fund units — equity technicals not applied', score_delta: 0 }],
        ltp: row.price, pl_pct: row.pnlPct, weight_pct: totalValue > 0 ? (row.value / totalValue) * 100 : 0,
        is_mutual_fund: true,
      };
    }

    const meta = holdingMeta(row.symbol, row.broker, state);
    const f = (window.FUNDAMENTALS_DB || {})[row.symbol] || {};
    const sector = row.sector || sectorFor(row.symbol);
    const prev = State.getPrice(row.symbol);
    const quote = State.get().prices?.[row.symbol];
    const technical = buildTechnical(row.symbol, row.price, quote?.prevClose || prev);
    let daysHeld = null;
    if (meta.acquiredAt) {
      const acq = new Date(meta.acquiredAt);
      if (!isNaN(acq)) daysHeld = Math.floor((Date.now() - acq.getTime()) / 86400000);
    }

    const ctx = {
      settings: cfg,
      weightPct: totalValue > 0 ? (row.value / totalValue) * 100 : 0,
      plPct: row.pnlPct,
      price: row.price,
      fundamentals: f,
      sector,
      technical,
      daysHeld,
    };

    const scored = meta.book === 'swing' ? scoreSwing(ctx) : scoreCore(ctx);
    const top = scored.reasons.slice(0, 2).map(r => r.detail).join('; ');
    const rationale = top
      ? `${top}; ${row.pnlPct.toFixed(1)}% P&L`
      : `${row.symbol} position, ${row.pnlPct.toFixed(1)}% P&L`;

    return {
      symbol: row.symbol, book: meta.book || 'core', action: scored.action, score: scored.score,
      rationale, reasons: scored.reasons, ltp: row.price, pl_pct: row.pnlPct,
      weight_pct: ctx.weightPct, is_mutual_fund: false, broker: row.broker,
    };
  }

  function buildMorningBrief(state) {
    state = state || State.get();
    const cfg = settings(state);
    const holdings = PortfolioAnalyticsService.getHoldings(state);
    const total = holdings.reduce((a, h) => a + h.value, 0) || 1;
    const signals = holdings.map(h => evaluateRow(h, total, cfg, state));
    const core = signals.filter(s => s.book !== 'swing' && !s.is_mutual_fund);
    const swing = signals.filter(s => s.book === 'swing');
    const urgent = [...signals].sort((a, b) => ACTION_ORDER.indexOf(a.action) - ACTION_ORDER.indexOf(b.action)).slice(0, 5);

    const counts = {};
    signals.forEach(s => { counts[s.action] = (counts[s.action] || 0) + 1; });

    return {
      date: new Date().toISOString().slice(0, 10),
      generated_at: new Date().toISOString(),
      core_signals: core,
      swing_signals: swing,
      all_signals: signals,
      urgent_signals: urgent,
      action_counts: counts,
      macro_notes: [
        `SBP policy context — review rate-sensitive banks if policy shifts.`,
        `USD/PKR ${state.settings?.usdRate || 280} — imported cost pressure on industrials.`,
      ],
      ipo_reminders: (state.ipoEvents || []).filter(e => {
        const d = e.subscription_end || e.listing_date;
        if (!d) return false;
        const diff = (new Date(d) - new Date()) / 86400000;
        return diff >= 0 && diff <= 14;
      }).map(e => `${e.company}${e.symbol ? ' (' + e.symbol + ')' : ''} — check subscription window`),
      disclaimer: 'Rule-based research summary only — not financial advice.',
    };
  }

  function buildCgtReport(state) {
    state = state || State.get();
    const cfg = settings(state);
    const shortRate = cfg.isFiler ? 15 : 20;
    const longRate = cfg.isFiler ? 0 : 10;
    const holdings = PortfolioAnalyticsService.getHoldings(state).filter(h => h.kind === 'stock');
    const lots = [];
    let totalGain = 0, totalTax = 0, missing = 0, st = 0, lt = 0;

    holdings.forEach(h => {
      const meta = holdingMeta(h.symbol, h.broker, state);
      if (h.pnl <= 0) {
        lots.push({ symbol: h.symbol, quantity: h.quantity, pl: h.pnl, pl_pct: h.pnlPct, tier: 'no_gain', estimated_tax: 0, days_held: null, acquired_at: meta.acquiredAt });
        if (!meta.acquiredAt) missing++;
        return;
      }
      let days = null, tier = 'unknown', rate = null;
      if (meta.acquiredAt) {
        days = Math.floor((Date.now() - new Date(meta.acquiredAt).getTime()) / 86400000);
        if (days < 365) { tier = 'short'; rate = shortRate; st++; }
        else { tier = 'long'; rate = longRate; lt++; }
      } else { missing++; }
      const tax = rate != null ? h.pnl * rate / 100 : 0;
      if (rate != null) totalTax += tax;
      totalGain += h.pnl;
      lots.push({ symbol: h.symbol, quantity: h.quantity, pl: h.pnl, pl_pct: h.pnlPct, tier, tax_rate_pct: rate, estimated_tax: tax, days_held: days, acquired_at: meta.acquiredAt });
    });

    return {
      lots, total_unrealized_gain: totalGain, total_estimated_tax: totalTax,
      lots_missing_date: missing, short_term_count: st, long_term_count: lt,
      short_term_rate_pct: shortRate, long_term_rate_pct: longRate, is_filer: cfg.isFiler,
      disclaimer: 'Estimated CGT only — verify with your tax advisor. Pakistan rules change; 365-day holding applies.',
    };
  }

  function buildRebalancePlan(state) {
    state = state || State.get();
    const holdings = PortfolioAnalyticsService.getHoldings(state).filter(h => h.kind === 'stock');
    const total = holdings.reduce((a, h) => a + h.value, 0);
    if (total <= 0) return { total_value: 0, rows: [], summary: 'No holdings loaded.', drift_count: 0 };

    const bySym = {};
    holdings.forEach(h => {
      const meta = holdingMeta(h.symbol, h.broker, state);
      if (!bySym[h.symbol]) bySym[h.symbol] = { value: 0, target: meta.targetWeight, book: meta.book, ltp: h.price };
      bySym[h.symbol].value += h.value;
      if (meta.targetWeight != null) bySym[h.symbol].target = meta.targetWeight;
    });

    const rows = [];
    let drift = 0;
    Object.entries(bySym).forEach(([symbol, d]) => {
      const actual = (d.value / total) * 100;
      const target = d.target;
      let action = 'OK', delta = 0, deltaVal = 0;
      if (target != null) {
        delta = actual - target;
        deltaVal = (delta / 100) * total;
        if (delta > 3) { action = 'TRIM'; drift++; }
        else if (delta < -3) { action = 'ADD'; drift++; }
      } else {
        action = actual > 25 ? 'REVIEW' : 'OK';
      }
      const shares = d.ltp > 0 ? Math.max(100, Math.floor(Math.abs(deltaVal) / d.ltp / 100) * 100) : 0;
      rows.push({
        symbol, book: d.book || 'core', actual_pct: actual, target_pct: target,
        delta_pct: target != null ? delta : null, delta_value: deltaVal, action,
        ltp: d.ltp, suggested_shares: shares, suggested_pkr: shares * d.ltp,
      });
    });

    return {
      total_value: total, rows: rows.sort((a, b) => Math.abs(b.delta_pct || 0) - Math.abs(a.delta_pct || 0)),
      drift_count: drift,
      summary: drift ? `${drift} position(s) drifted >3% from target weights.` : 'Portfolio weights within target bands.',
    };
  }

  function buildPilotScore(state) {
    state = state || State.get();
    const brief = buildMorningBrief(state);
    const intel = PortfolioAnalyticsService.getIntelligence(state);
    let divPts = 25, riskPts = 25, sigPts = 25, compPts = 25;
    const highlights = [], improvements = [];

    const topSector = intel.summary?.sectorAllocation?.[0];
    if (topSector && topSector.pct > 35) {
      divPts -= 10;
      improvements.push(`Top sector ${topSector.sector} at ${topSector.pct.toFixed(0)}% — consider trimming.`);
    } else highlights.push('Sector diversification looks reasonable.');

    const urgent = brief.urgent_signals.filter(s => ['SELL', 'REDUCE', 'TRIM'].includes(s.action)).length;
    if (urgent === 0) { sigPts = 25; highlights.push('No urgent trim/sell signals.'); }
    else if (urgent <= 2) { sigPts = 18; improvements.push(`${urgent} position(s) flagged for review.`); }
    else { sigPts = 8; improvements.push(`${urgent} urgent signals — open Signals tab.`); }

    const highRisk = intel.insights.filter(i => i.severity === 'high').length;
    riskPts = highRisk === 0 ? 25 : highRisk <= 2 ? 15 : 8;
    if (highRisk) improvements.push(`${highRisk} high-severity insight(s) on dashboard.`);

    compPts = 25;
    highlights.push('Shariah screening available in Research & Zakat.');

    const score = divPts + riskPts + sigPts + compPts;
    const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : score >= 40 ? 'D' : 'F';
    return { score, grade, diversification_pts: divPts, risk_pts: riskPts, signals_pts: sigPts, compliance_pts: compPts, highlights, improvements };
  }

  function runScreener(filters, state) {
    state = state || State.get();
    filters = filters || {};
    const holdings = new Set(PortfolioAnalyticsService.getHoldings(state).map(h => h.symbol));
    const rows = [];
    Object.entries(window.FUNDAMENTALS_DB || {}).forEach(([symbol, f]) => {
      const price = State.getPrice(symbol) || 100;
      const tech = buildTechnical(symbol, price, price);
      if (filters.min_yield != null && (f.divYield || 0) < filters.min_yield) return;
      if (filters.max_pe != null && f.pe > filters.max_pe) return;
      if (filters.min_rsi != null && tech.rsi_14 < filters.min_rsi) return;
      if (filters.max_rsi != null && tech.rsi_14 > filters.max_rsi) return;
      if (filters.portfolio_only && !holdings.has(symbol)) return;
      rows.push({
        symbol, ltp: price, pe_ratio: f.pe, dividend_yield_pct: f.divYield,
        rsi_14: tech.rsi_14, sector: sectorFor(symbol), in_portfolio: holdings.has(symbol),
        risk_level: f.debtToEquity > 0.8 ? 'High' : f.profitGrowth < 0 ? 'Elevated' : 'Moderate',
      });
    });
    return { rows: rows.sort((a, b) => (b.dividend_yield_pct || 0) - (a.dividend_yield_pct || 0)), scanned: Object.keys(window.FUNDAMENTALS_DB || {}).length };
  }

  function calculator(kind, input) {
    input = input || {};
    if (kind === 'cagr') {
      const p = input.principal || 0, fv = input.final_value || 0, y = input.years || 1;
      const cagr = p > 0 && y > 0 ? (Math.pow(fv / p, 1 / y) - 1) * 100 : 0;
      return { kind, result: cagr, label: 'CAGR %', detail: `${p.toLocaleString()} → ${fv.toLocaleString()} over ${y}y` };
    }
    if (kind === 'position_size') {
      const risk = input.risk_pkr || 10000, stop = input.stop_loss_pct || 5, price = input.price || 100;
      const shares = stop > 0 ? Math.floor((risk / (price * stop / 100)) / 100) * 100 : 0;
      return { kind, result: shares, label: 'Shares (PSX lot)', detail: `Risk ₨${risk.toLocaleString()} at ${stop}% stop` };
    }
    if (kind === 'sip_future') {
      const m = input.monthly || 0, r = (input.rate_pct || 12) / 100 / 12, n = (input.years || 10) * 12;
      const fv = r > 0 ? m * ((Math.pow(1 + r, n) - 1) / r) : m * n;
      return { kind, result: fv, label: 'Future value ₨', detail: `₨${m.toLocaleString()}/mo for ${input.years || 10}y @ ${input.rate_pct || 12}%` };
    }
    return { kind, result: 0, label: '—', detail: '' };
  }

  function portfolioSummary(state) {
    const holdings = PortfolioAnalyticsService.getHoldings(state);
    const total = holdings.reduce((a, h) => a + h.value, 0);
    const cost = holdings.reduce((a, h) => a + h.costBasis, 0);
    let coreVal = 0, swingVal = 0;
    holdings.forEach(h => {
      const book = holdingMeta(h.symbol, h.broker, state).book;
      if (book === 'swing') swingVal += h.value; else coreVal += h.value;
    });
    return {
      total_value: total, total_cost: cost, total_pl: total - cost,
      total_pl_pct: cost > 0 ? ((total - cost) / cost) * 100 : 0,
      core_pct: total > 0 ? (coreVal / total) * 100 : 0,
      swing_pct: total > 0 ? (swingVal / total) * 100 : 0,
      holdings_count: holdings.length,
    };
  }

  return {
    settings, holdingMeta, setHoldingMeta, isMutualFund,
    buildMorningBrief, buildCgtReport, buildRebalancePlan, buildPilotScore,
    runScreener, calculator, portfolioSummary, evaluateRow, scoreToAction,
  };
})();
window.PilotEngine = PilotEngine;
