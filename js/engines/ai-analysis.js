'use strict';
const AIAnalysis = (() => {

  function _isGlobal(symbol) {
    return (window.INTL_STOCKS || []).some(s => s.symbol === symbol)
      || (window.CRYPTO_ASSETS || []).some(c => c.symbol === symbol);
  }

  function _ratingToAction(rating) {
    const r = (rating || '').toUpperCase();
    if (r.includes('STRONG BUY') || r === 'BUY') return 'BUY';
    if (r.includes('SELL')) return 'SELL';
    return 'HOLD';
  }

  function analyze(symbol) {
    const advisor = (window.ADVISOR_RATINGS || {})[symbol];
    const f = (window.FUNDAMENTALS_DB || {})[symbol];
    const fundA = (window.FUND_ANALYTICS_DB || {})[symbol];
    const quote = MarketDataService.getQuote(symbol);
    const isGlobal = _isGlobal(symbol);
    const priceUsd = quote.priceUsd || (isGlobal && typeof FxService !== 'undefined' ? FxService.pkrToUsd(quote.price) : null);
    const price = isGlobal ? (priceUsd || quote.price) : quote.price;

    if (fundA) {
      const action = fundA.oneYearReturn > 15 ? 'BUY' : fundA.oneYearReturn > 8 ? 'HOLD' : 'HOLD';
      const confidence = Math.min(95, Math.round(50 + fundA.sharpe * 20));
      const fairValue = price * (1 + (fundA.oneYearReturn - 10) / 100);
      return {
        action, confidence, fairValue: Math.round(fairValue * 100) / 100,
        currency: 'PKR',
        riskScore: Math.round((fundA.beta || 0.5) * 40),
        bull: Math.round(price * 1.15 * 100) / 100,
        base: Math.round(price * 1.06 * 100) / 100,
        bear: Math.round(price * 0.88 * 100) / 100,
        summary: `${symbol} fund: ${fundA.category} category, ${fundA.oneYearReturn}% 1Y return, ${fundA.divYield}% yield. ${action} with ${confidence}% confidence.`,
      };
    }

    let action = advisor ? _ratingToAction(advisor.rating) : 'HOLD';
    let confidence = advisor?.conviction ? advisor.conviction * 10 : 50;

    if (f) {
      if (f.profitGrowth > 15 && f.pe < 12) { action = 'BUY'; confidence = Math.max(confidence, 72); }
      if (f.debtToEquity > 1 || f.profitGrowth < -5) { action = action === 'BUY' ? 'HOLD' : action; confidence = Math.min(confidence, 45); }
      if (f.divYield > 8 && f.payout < 80) confidence = Math.min(95, confidence + 8);
    }

    const fairFromPe = f?.eps && f?.pe ? f.eps * (f.pe < 10 ? f.pe * 1.15 : f.pe * 0.92) : null;
    const fairFromAdvisor = advisor?.target;
    const fairValue = Math.round((fairFromAdvisor || fairFromPe || price * 1.08) * 100) / 100;

    let riskScore = 40;
    if (f) {
      if (f.debtToEquity > 0.8) riskScore += 22;
      else if (f.debtToEquity > 0.4) riskScore += 10;
      if (f.profitGrowth < 0) riskScore += 15;
      if (f.pe > 20) riskScore += 8;
      if (f.divYield > 6) riskScore -= 8;
    }
    riskScore = Math.min(100, Math.max(0, riskScore));

    const bull = advisor?.target ? advisor.target * 1.1 : (fairValue * 1.2);
    const base = fairValue;
    const bear = price * 0.75;

    const parts = [];
    parts.push(`${symbol}: ${action} (${confidence}% confidence).`);
    if (f) parts.push(`P/E ${f.pe}, yield ${f.divYield}%, profit growth ${f.profitGrowth}%.`);
    if (advisor?.thesis) parts.push(advisor.thesis.slice(0, 120));
    else if (isGlobal) {
      parts.push(`Fair value est. $${fairValue.toFixed(2)} vs current $${Number(price).toFixed(2)}.`);
    } else if (f) {
      parts.push(`Fair value est. ₨${fairValue.toLocaleString()} vs current ₨${price.toLocaleString()}.`);
    }

    return {
      action, confidence, fairValue, currency: isGlobal ? 'USD' : 'PKR',
      riskScore,
      upside: price > 0 ? ((fairValue - price) / price) * 100 : 0,
      bull: Math.round(bull * 100) / 100,
      base: Math.round(base * 100) / 100,
      bear: Math.round(bear * 100) / 100,
      summary: parts.join(' '),
      rating: advisor?.rating || action,
    };
  }

  return { analyze };
})();
window.AIAnalysis = AIAnalysis;
