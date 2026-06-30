'use strict';
const Signals = (() => {
  const U = PlatformUI;

  function _actionClass(action) {
    const a = (action || '').toUpperCase();
    if (a.includes('SELL') || a === 'REDUCE' || a === 'TRIM') return 't-loss';
    if (a.includes('BUY') || a === 'ADD') return 't-gain';
    if (a === 'WATCH') return 't-warn';
    return '';
  }

  function _signalRow(s, onSymbol) {
    const click = onSymbol ? `onclick="Research.open('${s.symbol}')"` : '';
    return `<div class="os-row cap-reveal" style="cursor:pointer" ${click}>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="os-row-sym">${s.symbol}</span>
          <span class="badge" style="font-size:10px;opacity:.8">${s.book === 'swing' ? 'Swing' : 'Core'}</span>
          <span class="badge ${_actionClass(s.action)}" style="font-size:10px;font-weight:700">${s.action}</span>
        </div>
        <div style="font-size:12px;color:var(--os-text-secondary);margin-top:4px;line-height:1.45">${s.rationale}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div class="${s.pl_pct >= 0 ? 't-gain' : 't-loss'}" style="font-weight:700;font-size:13px">${s.pl_pct >= 0 ? '+' : ''}${s.pl_pct.toFixed(1)}%</div>
        <div style="font-size:11px;color:var(--os-text-tertiary)">${s.weight_pct.toFixed(1)}% wt</div>
      </div>
    </div>`;
  }

  function renderBriefCard() {
    return typeof MarketUI !== 'undefined' ? MarketUI.morningBriefCard() : '';
  }

  function render(target) {
    const screen = target || document.getElementById('screen-signals');
    if (!screen) return;
    const brief = PilotEngine.buildMorningBrief();
    const score = PilotEngine.buildPilotScore();
    const summary = PilotEngine.portfolioSummary();

    screen.innerHTML = `
    ${MarketUI.pageHeader('Signals', 'Morning brief', 'Core & Swing books · transparent rules')}

    ${U.metricGrid([
      U.metricCell('Pilot Score', score.grade + ' · ' + score.score, null, score.score >= 70 ? 't-gain' : 't-warn'),
      U.metricCell('Core book', summary.core_pct.toFixed(0) + '%', 'Long-term positions'),
      U.metricCell('Swing book', summary.swing_pct.toFixed(0) + '%', 'Tactical trades'),
      U.metricCell('Positions', String(summary.holdings_count), 'Stocks + funds'),
    ], 2)}

    ${U.section('Urgent actions', (brief.urgent_signals || []).length
      ? brief.urgent_signals.map(s => _signalRow(s, true)).join('')
      : '<div style="color:var(--os-text-secondary);padding:8px 0">No urgent trim/sell signals today.</div>')}

    ${U.section('Core book', (brief.core_signals || []).slice(0, 12).map(s => _signalRow(s, true)).join('') || '<div style="color:var(--os-text-secondary)">No core equity signals.</div>')}

    ${brief.swing_signals?.length ? U.section('Swing book', brief.swing_signals.map(s => _signalRow(s, true)).join('')) : ''}

    ${brief.ipo_reminders?.length ? U.section('IPO reminders', brief.ipo_reminders.map(t => `<div class="os-insight cap-reveal"><div class="os-insight-icon">📅</div><div class="os-insight-text">${t}</div></div>`).join('')) : ''}

    ${U.section('Book tags', _bookTagEditor())}

    <div style="font-size:11px;color:var(--os-text-tertiary);padding:16px;line-height:1.5">${brief.disclaimer}</div>
    <div style="height:20px"></div>`;
    CapMotion.refresh();
  }

  function _bookTagEditor() {
    const rows = PortfolioAnalyticsService.getHoldings().filter(h => h.kind === 'stock').slice(0, 20);
    if (!rows.length) return '<div style="color:var(--os-text-secondary)">Add stock holdings to tag Core vs Swing.</div>';
    return rows.map(h => {
      const meta = PilotEngine.holdingMeta(h.symbol, h.broker);
      const book = meta.book || 'core';
      return `<div class="os-row">
        <div class="os-row-sym">${h.symbol}</div>
        <div style="display:flex;gap:6px">
          <button type="button" class="btn-sm ${book === 'core' ? 'btn-primary' : 'btn-ghost'}" onclick="Signals.setBook('${h.symbol}','${h.broker}','core')">Core</button>
          <button type="button" class="btn-sm ${book === 'swing' ? 'btn-primary' : 'btn-ghost'}" onclick="Signals.setBook('${h.symbol}','${h.broker}','swing')">Swing</button>
        </div>
      </div>`;
    }).join('');
  }

  function setBook(symbol, broker, book) {
    PilotEngine.setHoldingMeta(symbol, broker, { book });
    if (window.App?.showToast) App.showToast(`${symbol} → ${book} book`, 'ok');
    render();
    if (window.Home) Home.render();
  }

  return { render, renderBriefCard, setBook };
})();
window.Signals = Signals;
