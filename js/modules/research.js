'use strict';
const Research = (() => {
  let _symbol = null;

  function _meta(symbol) {
    return [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === symbol);
  }

  function open(symbol) {
    _symbol = symbol;
    render();
  }

  function render() {
    const screen = document.getElementById('screen-research');
    if (!screen) return;

    const holdings = Ledger.calcHoldings(State.get('transactions') || []);
    const symbols = [...new Set([
      ...holdings.map(h => h.symbol),
      ...(State.get('watchlist') || []).map(w => w.symbol),
      ...(window.WATCHLIST || []).map(w => w.symbol),
    ])].sort();

    if (!_symbol && symbols.length) _symbol = symbols[0];

    if (!_symbol) {
      screen.innerHTML = `
      <div class="os-page-header"><div class="os-page-title">Research</div>
        <div class="os-page-sub">Add holdings or watchlist symbols to research</div></div>`;
      return;
    }

    const sym = _symbol;
    const meta = _meta(sym);
    const mf = (window.MEEZAN_FUNDS || []).find(f => f.symbol === sym);
    const price = State.getPrice(sym) || (window.FALLBACK_PRICES || {})[sym] || mf?.currentNav || 0;
    const holding = holdings.find(h => h.symbol === sym);
    const advisor = (window.ADVISOR_RATINGS || {})[sym];
    const scenarios = Analytics.scenarioPrices(sym, price);
    const notes = (State.get('researchNotes') || {})[sym] || '';
    const divs = State.getHoldingDividends(sym);

    screen.innerHTML = `
    <div class="os-page-header cap-reveal">
      <div class="os-page-title">${sym}</div>
      <div class="os-page-sub">${meta?.name || mf?.name || sym}${meta?.sector ? ' · ' + meta.sector : ''}</div>
    </div>
    <div style="padding:12px 20px;overflow-x:auto;display:flex;gap:8px;" class="cap-reveal">
      ${symbols.map(s => `<button class="os-btn ${s === sym ? 'os-btn-primary' : 'os-btn-ghost'}" style="flex-shrink:0;" onclick="Research.open('${s}')">${s}</button>`).join('')}
    </div>
    <div class="os-hero cap-reveal" style="padding-top:12px;">
      <div class="os-hero-label">Last Price</div>
      <div class="os-hero-value" style="font-size:2.2rem;">${price ? '₨' + price.toLocaleString() : '—'}</div>
      ${advisor ? `<div class="os-hero-pills"><span class="os-pill neutral">${advisor.rating}</span><span class="os-pill neutral">Target ₨${advisor.target}</span></div>` : ''}
    </div>
    <div class="os-card-grid cap-reveal">
      <div class="os-card"><div class="os-metric-label">Position</div><div class="os-metric-value">${holding ? holding.shares + ' sh' : '—'}</div></div>
      <div class="os-card"><div class="os-metric-label">Avg Cost</div><div class="os-metric-value">${holding ? '₨' + holding.avgCost.toFixed(0) : '—'}</div></div>
      <div class="os-card"><div class="os-metric-label">Dividends</div><div class="os-metric-value">${divs ? '₨' + Math.round(divs).toLocaleString() : '—'}</div></div>
      <div class="os-card"><div class="os-metric-label">Shariah</div><div class="os-metric-value">${meta?.isShariah ? 'Yes' : meta ? 'No' : '—'}</div></div>
    </div>
    <div class="os-section cap-reveal">
      <div class="os-section-title">Valuation Scenarios</div>
      <div class="os-card-grid" style="padding:0;">
        <div class="os-card"><div class="os-metric-label">Bull</div><div class="os-metric-value t-gain">₨${scenarios.bull.toLocaleString()}</div></div>
        <div class="os-card"><div class="os-metric-label">Base</div><div class="os-metric-value">₨${scenarios.base.toLocaleString()}</div></div>
        <div class="os-card"><div class="os-metric-label">Bear</div><div class="os-metric-value t-loss">₨${scenarios.bear.toLocaleString()}</div></div>
      </div>
    </div>
    ${advisor?.thesis ? `
    <div class="os-section cap-reveal">
      <div class="os-section-title">Advisor Thesis</div>
      <div class="os-ai-box" style="margin:0;">${advisor.thesis}</div>
    </div>` : ''}
    <div class="os-section cap-reveal">
      <div class="os-section-title">Your Research Notes</div>
      <textarea class="field-input" id="rs-notes" rows="4" style="width:100%;" placeholder="Your analysis…">${notes}</textarea>
      <button class="os-btn os-btn-primary" style="margin-top:10px;" onclick="Research.saveNotes('${sym}')">Save notes</button>
    </div>`;
    CapMotion.refresh();
  }

  function saveNotes(symbol) {
    const notes = document.getElementById('rs-notes')?.value || '';
    State.update(s => {
      if (!s.researchNotes) s.researchNotes = {};
      s.researchNotes[symbol] = notes;
    });
    App.showToast('Notes saved', 'success');
  }

  return { render, open, saveNotes };
})();
window.Research = Research;
