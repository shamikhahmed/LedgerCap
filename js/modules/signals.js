'use strict';
const Signals = (() => {
  const U = PlatformUI;
  let _tab = 'morning';

  function _actionClass(action) {
    const a = (action || '').toUpperCase();
    if (a.includes('SELL') || a === 'REDUCE' || a === 'TRIM') return 't-loss';
    if (a.includes('BUY') || a === 'ADD') return 't-gain';
    if (a === 'WATCH') return 't-warn';
    return '';
  }

  function _segment() {
    return `<div class="lc-segment perf-tabs cap-tab-bar" role="tablist" style="margin-bottom:12px">
      <button type="button" class="lc-segment-btn perf-tab cap-tab${_tab === 'morning' ? ' on active' : ''}" role="tab" aria-selected="${_tab === 'morning'}" data-action="Signals.setTab" data-tab="morning">Morning</button>
      <button type="button" class="lc-segment-btn perf-tab cap-tab${_tab === 'intraday' ? ' on active' : ''}" role="tab" aria-selected="${_tab === 'intraday'}" data-action="Signals.setTab" data-tab="intraday">Intraday</button>
      <button type="button" class="lc-segment-btn perf-tab cap-tab${_tab === 'buy' ? ' on active' : ''}" role="tab" aria-selected="${_tab === 'buy'}" data-action="Signals.setTab" data-tab="buy">Buy more</button>
    </div>`;
  }

  function _signalRow(s, onSymbol) {
    const click = onSymbol ? `data-action="Research.open" data-symbol="${s.symbol}"` : '';
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
        <div class="${s.pl_pct >= 0 ? 't-gain' : 't-loss'}" style="font-weight:700;font-size:13px">${s.pl_pct >= 0 ? '+' : ''}${Number(s.pl_pct).toFixed(1)}%</div>
        <div style="font-size:11px;color:var(--os-text-tertiary)">${Number(s.weight_pct).toFixed(1)}% wt</div>
      </div>
    </div>`;
  }

  function _intradayRow(s) {
    const cls = s.movePct >= 0 ? 't-gain' : 't-loss';
    return `<div class="os-row cap-reveal" style="cursor:pointer" data-action="Research.open" data-symbol="${s.symbol}">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="os-row-sym">${s.symbol}</span>
          <span class="badge" style="font-size:10px">${s.kind}</span>
          <span class="badge" style="font-size:10px;opacity:.8">${s.book === 'swing' ? 'Swing' : 'Core'}</span>
        </div>
        <div style="font-size:12px;color:var(--os-text-secondary);margin-top:4px">${s.label}</div>
      </div>
      <div class="${cls}" style="font-weight:700;font-size:13px">${s.movePct >= 0 ? '+' : ''}${Number(s.movePct).toFixed(1)}%</div>
    </div>`;
  }

  function _buyRow(r) {
    const src = r.source === 'both' ? 'Rebalance + morning' : r.source === 'morning' ? 'Morning brief' : 'Rebalance';
    return `<div class="os-row cap-reveal" style="cursor:pointer" data-action="Research.open" data-symbol="${r.symbol}">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="os-row-sym">${r.symbol}</span>
          <span class="badge t-gain" style="font-size:10px;font-weight:700">${r.action}</span>
          <span class="badge" style="font-size:10px;opacity:.75">${src}</span>
        </div>
        <div style="font-size:12px;color:var(--os-text-secondary);margin-top:4px;line-height:1.45">${r.rationale}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-weight:700;font-size:13px">${r.buy_shares} sh</div>
        <div style="font-size:11px;color:var(--os-text-tertiary)">${PsxUI.fmt(r.buy_pkr)} @ ${PsxUI.fmt(r.ltp)}</div>
      </div>
    </div>`;
  }

  function renderBriefCard() {
    return typeof MarketUI !== 'undefined' ? MarketUI.morningBriefCard() : '';
  }

  function _renderMorning(screen) {
    const brief = PilotEngine.buildMorningBrief();
    const score = PilotEngine.buildPilotScore();
    const summary = PilotEngine.portfolioSummary();

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Signals</h1><p>Morning brief · Core &amp; Swing books</p></div>
    ${_segment()}
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

    <div class="lc-disclaimer">${brief.disclaimer}</div>
    </div>`;
  }

  function _renderIntraday(screen) {
    const rows = typeof IntradaySignals !== 'undefined' ? IntradaySignals.scan() : [];
    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head"><h1>Signals</h1><p>PSX session moves vs previous close</p></div>
      ${_segment()}
      ${U.metricGrid([
        U.metricCell('Flags', String(rows.length), '≥2% move or rule hit'),
        U.metricCell('Threshold', '2%', 'Session change'),
        U.metricCell('Gap', '4%', 'Gap up/down'),
        U.metricCell('Source', 'Cached prices', 'No paid API'),
      ], 2)}
      ${U.section('Intraday flags', rows.length
        ? rows.map(_intradayRow).join('')
        : '<div style="color:var(--os-text-secondary);padding:8px 0">No PSX moves above thresholds in your holdings.</div>')}
      <div class="lc-disclaimer">Rule-based session scan — refresh prices during market hours. Not financial advice.</div>
    </div>`;
  }

  function _renderBuy(screen) {
    const recs = typeof BuyRecommendations !== 'undefined' ? BuyRecommendations.getRecommendations() : [];
    const totalPkr = recs.reduce((a, r) => a + (r.buy_pkr || 0), 0);
    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head"><h1>Signals</h1><p>Buy more — rebalance ADD + morning STRONG BUY / ADD</p></div>
      ${_segment()}
      ${U.metricGrid([
        U.metricCell('Ideas', String(recs.length), 'Merged sources'),
        U.metricCell('Est. deploy', PsxUI.fmt(totalPkr), 'PSX 100-lot rounded'),
        U.metricCell('Lot rule', '100 shares', 'PSX minimum'),
        U.metricCell('Targets', 'Optional', 'Set in Pilot Tools'),
      ], 2)}
      ${U.section('Buy list', recs.length
        ? recs.map(_buyRow).join('')
        : '<div style="color:var(--os-text-secondary);padding:8px 0">No ADD signals — set target weights in Tax &amp; Rebalance or wait for morning brief upgrades.</div>')}
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="pilot-tools">Set target weights</button>
      </div>
      <div class="lc-disclaimer">Illustrative lot sizes — verify cash and broker limits before trading.</div>
    </div>`;
  }

  function render(target) {
    const screen = target || document.getElementById('screen-signals');
    if (!screen) return;
    if (_tab === 'intraday') _renderIntraday(screen);
    else if (_tab === 'buy') _renderBuy(screen);
    else _renderMorning(screen);
    CapMotion.refresh();
  }

  function setTab(tab) {
    _tab = tab === 'intraday' || tab === 'buy' ? tab : 'morning';
    render();
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
          <button type="button" class="btn-sm ${book === 'core' ? 'btn-primary' : 'btn-ghost'}" data-action="Signals.setBook" data-symbol="${h.symbol}" data-broker="${h.broker}" data-tab="core">Core</button>
          <button type="button" class="btn-sm ${book === 'swing' ? 'btn-primary' : 'btn-ghost'}" data-action="Signals.setBook" data-symbol="${h.symbol}" data-broker="${h.broker}" data-tab="swing">Swing</button>
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

  return { render, renderBriefCard, setBook, setTab };
})();
window.Signals = Signals;
