'use strict';
const Research = (() => {
  let _symbol = null;
  let _mode = 'stock';

  function setMode(mode) {
    _mode = mode === 'portfolio' ? 'portfolio' : 'stock';
    try { sessionStorage.setItem('ledgercap_research_mode', _mode); } catch (_) {}
    render();
  }

  function open(symbol) {
    _symbol = symbol;
    _mode = 'stock';
    try { sessionStorage.setItem('ledgercap_research_mode', 'stock'); } catch (_) {}
    if (typeof Navigation !== 'undefined') Navigation.go('research', true);
    render();
  }

  function _modeSegment() {
    return `<div class="lc-segment" role="tablist">
      <button type="button" class="lc-segment-btn${_mode === 'stock' ? ' on' : ''}" onclick="Research.setMode('stock')">Stock</button>
      <button type="button" class="lc-segment-btn${_mode === 'portfolio' ? ' on' : ''}" onclick="Research.setMode('portfolio')">Portfolio</button>
    </div>`;
  }

  function _metricGrid(cells) {
    return `<div class="lc-metric-grid">${cells.map(c => `
      <div class="lc-metric-cell"><label>${c.l}</label><strong class="${c.cls || ''}">${c.v}</strong></div>
    `).join('')}</div>`;
  }

  function render() {
    const screen = document.getElementById('screen-research');
    if (!screen) return;

    if (_mode === 'portfolio') {
      screen.innerHTML = `
        <div class="lc-dash">
          <div class="lc-screen-head">
            <h1>${I18n.t('analyze.title')}</h1>
            <p>Portfolio intelligence &amp; risk signals</p>
          </div>
          ${_modeSegment()}
          <div id="research-portfolio-host" style="padding:0 var(--lc-space-4)"></div>
        </div>`;
      if (window.Intelligence) Intelligence.render(document.getElementById('research-portfolio-host'));
      return;
    }

    const symbols = StockService.listSymbols();
    if (!_symbol && symbols.length) _symbol = symbols[0];
    if (!_symbol) {
      screen.innerHTML = `
        <div class="lc-dash">
          <div class="lc-screen-head">
            <h1>${I18n.t('analyze.title')}</h1>
            <p>Add holdings to analyze</p>
          </div>
          ${_modeSegment()}
          <div class="lc-empty-state">
            <h2>No symbols</h2>
            <p>Import transactions or load demo portfolio first.</p>
            <button type="button" class="psx-btn psx-btn-primary" onclick="App.openAddTransaction()">${I18n.t('addHoldings')}</button>
          </div>
        </div>`;
      return;
    }

    const r = ResearchService.getStockReport(_symbol);
    const { profile, fundamentals: f, quote, changes, ai, position } = r;
    const isFund = f.type === 'fund';
    const sd = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === r.symbol);
    const shLabel = sd?.isShariah ? I18n.t('analyze.shariahCompliant') : I18n.t('analyze.notShariah');
    const chgCls = quote.changePct >= 0 ? 'up' : 'down';

    const fundMetrics = !isFund ? _metricGrid([
      { l: 'P/E', v: f.pe ?? '—' },
      { l: 'Div yield', v: f.divYield ? f.divYield + '%' : '—' },
      { l: 'ROE', v: f.roe ? f.roe + '%' : '—' },
      { l: 'EPS', v: f.eps ? '₨' + f.eps : '—' },
    ]) : '';

    const perfMetrics = _metricGrid([
      { l: 'Daily', v: PsxUI.fmt(changes.daily, { pct: true, signed: true }), cls: PsxUI.chgCls(changes.daily) },
      { l: 'Weekly', v: PsxUI.fmt(changes.weekly, { pct: true, signed: true }), cls: PsxUI.chgCls(changes.weekly) },
      { l: 'Monthly', v: PsxUI.fmt(changes.monthly, { pct: true, signed: true }), cls: PsxUI.chgCls(changes.monthly) },
      { l: 'Yearly', v: PsxUI.fmt(changes.yearly, { pct: true, signed: true }), cls: PsxUI.chgCls(changes.yearly) },
    ]);

    const positionBlock = position ? `
      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Your position</h3><span>${position.shares} shares</span></div>
      </div>
      ${_metricGrid([
        { l: 'Market value', v: PsxUI.fmt(position.value) },
        { l: 'P&amp;L', v: PsxUI.fmt(position.pnlPct, { pct: true, signed: true }), cls: PsxUI.chgCls(position.pnl) },
      ])}` : '';

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${I18n.t('analyze.title')}</h1>
          <p>${I18n.t('analyze.sub')}</p>
        </div>
        ${_modeSegment()}
        <div class="lc-research-hero">
          <div class="lc-research-hero-top">
            <div>
              <h2>${r.symbol}</h2>
              <p>${profile.name}${profile.sector ? ' · ' + profile.sector : ''}</p>
            </div>
          </div>
          <div class="lc-research-price">${PsxUI.fmt(quote.price)}</div>
          <span class="lc-research-chg ${chgCls}">${PsxUI.fmt(quote.changePct, { pct: true, signed: true })} today</span>
          <p class="lc-card-sub">Source: ${Prices.sourceLabel(quote.source || 'seed')}</p>
        </div>
        <div class="lc-verdict">
          <h3>${I18n.t('analyze.plainEnglish')}</h3>
          <p>${ai.summary}</p>
          <div class="lc-verdict-meta">${shLabel}</div>
        </div>
        <div class="lc-search">
          <input type="search" placeholder="Search symbol…" id="rt-search" oninput="Research._onSearch(this.value)" aria-label="Search symbols">
        </div>
        <div class="lc-sym-scroll" id="rt-pills">${symbols.slice(0, 28).map(s =>
          `<button type="button" class="lc-sym-chip${s === r.symbol ? ' on' : ''}" onclick="Research.open('${s}')">${s}</button>`
        ).join('')}</div>
        ${_metricGrid([
          { l: 'Rating', v: ai.action },
          { l: 'Confidence', v: ai.confidence + '%' },
          { l: 'Fair value', v: PsxUI.fmt(ai.fairValue) },
          { l: 'Risk', v: ai.riskScore + '/100' },
        ])}
        ${!isFund ? `<div class="lc-dash-section"><div class="lc-dash-section-head"><h3>${I18n.t('analyze.fundamentals')}</h3></div></div>${fundMetrics}` : ''}
        <div class="lc-dash-section"><div class="lc-dash-section-head"><h3>Performance</h3><span>% change</span></div></div>
        ${perfMetrics}
        ${positionBlock}
        <div class="lc-chart-block">
          <div class="lc-dash-section-head"><h3>Chart</h3><span>TradingView</span></div>
          <div id="research-tv-chart" style="min-height:400px"></div>
        </div>
      </div>`;

    const assetClass = (window.CRYPTO_ASSETS || []).some(c => c.symbol === r.symbol) ? 'crypto'
      : (window.INTL_STOCKS || []).some(i => i.symbol === r.symbol) ? 'intl' : 'psx';
    if (typeof TradingViewUI !== 'undefined') {
      TradingViewUI.mount('research-tv-chart', r.symbol, assetClass);
    }
  }

  function _onSearch(q) {
    const el = document.getElementById('rt-pills');
    if (!el) return;
    el.innerHTML = ResearchService.search(q).slice(0, 28).map(s =>
      `<button type="button" class="lc-sym-chip${s === _symbol ? ' on' : ''}" onclick="Research.open('${s}')">${s}</button>`
    ).join('');
  }

  return { render, open, setMode, _onSearch };
})();
window.Research = Research;
