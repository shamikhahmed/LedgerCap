'use strict';
/** Merge rebalance ADD rows with morning STRONG BUY / ADD — PSX 100-share lots. */
const BuyRecommendations = (() => {
  const BUY_ACTIONS = new Set(['STRONG BUY', 'ADD']);

  function roundPsxLot(shares) {
    const n = Math.floor(Number(shares) || 0);
    if (n < 100) return 100;
    return Math.floor(n / 100) * 100;
  }

  function mergeBuyRecs(rebalanceRows, morningSignals) {
    const map = new Map();

    (rebalanceRows || []).filter(r => r.action === 'ADD').forEach(r => {
      map.set(r.symbol, {
        symbol: r.symbol,
        source: 'rebalance',
        action: 'ADD',
        rationale: `Underweight by ${Math.abs(r.delta_pct || 0).toFixed(1)}% vs target`,
        ltp: r.ltp,
        suggested_shares: r.suggested_shares,
        delta_value: Math.abs(r.delta_value || 0),
        book: r.book,
      });
    });

    (morningSignals || []).filter(s => BUY_ACTIONS.has(s.action)).forEach(s => {
      if (map.has(s.symbol)) {
        const row = map.get(s.symbol);
        row.source = 'both';
        row.morning_action = s.action;
        row.rationale = `${row.rationale}; ${(s.rationale || '').slice(0, 120)}`;
      } else {
        map.set(s.symbol, {
          symbol: s.symbol,
          source: 'morning',
          action: s.action,
          rationale: s.rationale,
          ltp: s.ltp,
          morning_action: s.action,
          book: s.book,
          suggested_shares: 0,
          delta_value: 0,
        });
      }
    });

    return [...map.values()];
  }

  function getRecommendations(state) {
    if (typeof window !== 'undefined' && window.State && !state) state = State.get();
    if (typeof PilotEngine === 'undefined') return [];

    const rebalance = PilotEngine.buildRebalancePlan(state);
    const brief = PilotEngine.buildMorningBrief(state);
    const merged = mergeBuyRecs(rebalance.rows, brief.all_signals);

    return merged.map(row => {
      const ltp = row.ltp || (typeof State !== 'undefined' ? State.getPrice(row.symbol) : 0) || 100;
      const basis = row.suggested_shares > 0
        ? row.suggested_shares
        : roundPsxLot((row.delta_value || 50000) / ltp);
      const shares = roundPsxLot(basis);
      return { ...row, buy_shares: shares, buy_pkr: shares * ltp, ltp };
    }).sort((a, b) => b.buy_pkr - a.buy_pkr);
  }

  return { getRecommendations, roundPsxLot, mergeBuyRecs, BUY_ACTIONS };
})();
window.BuyRecommendations = BuyRecommendations;
