'use strict';
/** PSX session move scanner — rule-based intraday flags (no live API). */
const IntradaySignals = (() => {
  const MOVE_THRESHOLD = 2.0;
  const GAP_THRESHOLD = 4.0;

  function sessionMovePct(price, prevClose) {
    if (!price || !prevClose || prevClose <= 0) return 0;
    return ((price - prevClose) / prevClose) * 100;
  }

  function classifyIntraday(ctx) {
    const { symbol, movePct, plPct, morningAction, book } = ctx || {};
    if (!symbol) return null;
    const abs = Math.abs(movePct || 0);
    let kind = 'MOVE';
    let label = `${movePct >= 0 ? '+' : ''}${Number(movePct).toFixed(1)}% session`;

    if (movePct >= GAP_THRESHOLD) {
      kind = 'GAP_UP';
      label = `Gap up ${movePct.toFixed(1)}%`;
    } else if (movePct <= -GAP_THRESHOLD) {
      kind = 'GAP_DOWN';
      label = `Gap down ${movePct.toFixed(1)}%`;
    } else if (plPct != null && plPct < -8 && movePct < -2) {
      kind = 'STOP';
      label = 'Stop-loss zone — review swing book';
    } else if (plPct != null && plPct > 10 && movePct > 3) {
      kind = 'TAKE_PROFIT';
      label = 'Take-profit window';
    } else if (['STRONG BUY', 'ADD'].includes(morningAction) && movePct > 2) {
      kind = 'BREAKOUT';
      label = 'Morning buy + positive momentum';
    } else if (['SELL', 'TRIM', 'REDUCE'].includes(morningAction) && movePct < -2) {
      kind = 'CONFIRM_TRIM';
      label = 'Morning trim confirmed by price';
    }

    if (abs < MOVE_THRESHOLD && kind === 'MOVE') return null;

    return {
      symbol,
      movePct,
      label,
      kind,
      book: book || 'core',
      morningAction: morningAction || null,
      plPct: plPct ?? null,
    };
  }

  function scan(state) {
    if (typeof window !== 'undefined' && window.State && !state) state = State.get();
    state = state || {};
    if (typeof PilotEngine === 'undefined') return [];

    const brief = PilotEngine.buildMorningBrief(state);
    const morningMap = {};
    (brief.all_signals || []).forEach(s => { morningMap[s.symbol] = s.action; });

    const holdings = (typeof PortfolioAnalyticsService !== 'undefined'
      ? PortfolioAnalyticsService.getHoldings(state)
      : []).filter(h => h.kind === 'stock');

    const out = [];
    holdings.forEach(h => {
      const price = (typeof State !== 'undefined' ? State.getPrice(h.symbol) : h.price) || 0;
      const prev = (typeof State !== 'undefined' ? State.getPrevClose(h.symbol) : price) || price;
      const movePct = sessionMovePct(price, prev);
      const meta = PilotEngine.holdingMeta(h.symbol, h.broker, state);
      const sig = classifyIntraday({
        symbol: h.symbol,
        movePct,
        plPct: h.pnlPct,
        morningAction: morningMap[h.symbol],
        book: meta.book || 'core',
      });
      if (sig) out.push(sig);
    });

    return out.sort((a, b) => Math.abs(b.movePct) - Math.abs(a.movePct));
  }

  return { scan, sessionMovePct, classifyIntraday, MOVE_THRESHOLD, GAP_THRESHOLD };
})();
window.IntradaySignals = IntradaySignals;
