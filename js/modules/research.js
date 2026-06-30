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

  function _modeBar() {
    return `<div class="psx-filters">
      <button type="button" class="psx-filter${_mode === 'stock' ? ' on' : ''}" onclick="Research.setMode('stock')">Stock</button>
      <button type="button" class="psx-filter${_mode === 'portfolio' ? ' on' : ''}" onclick="Research.setMode('portfolio')">Portfolio intel</button>
    </div>`;
  }

  function render() {
    const screen = document.getElementById('screen-research');
    if (!screen) return;

    if (_mode === 'portfolio') {
      screen.innerHTML = `${PsxUI.strip()}${_modeBar()}<div id="research-portfolio-host" style="padding:0 16px"></div>`;
      if (window.Intelligence) Intelligence.render(document.getElementById('research-portfolio-host'));
      return;
    }

    const symbols = StockService.listSymbols();
    if (!_symbol && symbols.length) _symbol = symbols[0];
    if (!_symbol) {
      screen.innerHTML = `${PsxUI.strip()}${PsxUI.pageTitle(I18n.t('analyze.title'), 'Add holdings to analyze')}`;
      return;
    }

    const r = ResearchService.getStockReport(_symbol);
    const { profile, fundamentals: f, quote, changes, ai, position } = r;
    const isFund = f.type === 'fund';
    const sd = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === r.symbol);
    const shLabel = sd?.isShariah ? I18n.t('analyze.shariahCompliant') : I18n.t('analyze.notShariah');

    screen.innerHTML = `
      ${PsxUI.strip()}
      ${_modeBar()}
      <div class="psx-page-title">
        <h1>${r.symbol}</h1>
        <p>${profile.name} · ${profile.sector || profile.category || ''}</p>
      </div>
      <div class="psx-hero" style="margin-top:0">
        <div class="psx-hero-val">${PsxUI.fmt(quote.price)}</div>
        <div class="psx-hero-pills"><span class="psx-pill ${quote.changePct >= 0 ? 'up' : 'down'}">${PsxUI.fmt(quote.changePct, { pct: true, signed: true })} today</span></div>
      </div>
      <div class="psx-analyze">
        <h3>${I18n.t('analyze.plainEnglish')}</h3>
        <p>${ai.summary}</p>
        <p style="margin-top:8px;font-size:13px;color:var(--psx-text-3)">${shLabel}</p>
      </div>
      <div class="psx-search"><input type="search" placeholder="Search symbol…" id="rt-search" oninput="Research._onSearch(this.value)"></div>
      <div class="psx-sym-row" id="rt-pills">${symbols.slice(0, 24).map(s => `<button type="button" class="psx-sym-chip${s === r.symbol ? ' on' : ''}" onclick="Research.open('${s}')">${s}</button>`).join('')}</div>
      <div class="psx-metrics">
        <div class="psx-metric"><div class="psx-metric-l">Smart rating</div><div class="psx-metric-v">${ai.action}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">Confidence</div><div class="psx-metric-v">${ai.confidence}%</div></div>
        <div class="psx-metric"><div class="psx-metric-l">Fair value</div><div class="psx-metric-v">${PsxUI.fmt(ai.fairValue)}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">Risk</div><div class="psx-metric-v">${ai.riskScore}/100</div></div>
      </div>
      ${!isFund ? `<div class="psx-section"><h2>${I18n.t('analyze.fundamentals')}</h2></div>
      <div class="psx-metrics">
        <div class="psx-metric"><div class="psx-metric-l">P/E</div><div class="psx-metric-v">${f.pe ?? '—'}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">Div yield</div><div class="psx-metric-v">${f.divYield ? f.divYield + '%' : '—'}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">ROE</div><div class="psx-metric-v">${f.roe ? f.roe + '%' : '—'}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">EPS</div><div class="psx-metric-v">${f.eps ? '₨' + f.eps : '—'}</div></div>
      </div>` : ''}
      <div class="psx-metrics">
        <div class="psx-metric"><div class="psx-metric-l">Daily</div><div class="psx-metric-v ${PsxUI.chgCls(changes.daily)}">${PsxUI.fmt(changes.daily, { pct: true, signed: true })}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">Weekly</div><div class="psx-metric-v ${PsxUI.chgCls(changes.weekly)}">${PsxUI.fmt(changes.weekly, { pct: true, signed: true })}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">Monthly</div><div class="psx-metric-v ${PsxUI.chgCls(changes.monthly)}">${PsxUI.fmt(changes.monthly, { pct: true, signed: true })}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">Yearly</div><div class="psx-metric-v ${PsxUI.chgCls(changes.yearly)}">${PsxUI.fmt(changes.yearly, { pct: true, signed: true })}</div></div>
      </div>
      ${position ? `<div class="psx-section"><h2>Your position</h2></div>
      <div class="psx-metrics">
        <div class="psx-metric"><div class="psx-metric-l">Shares</div><div class="psx-metric-v">${position.shares}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">Value</div><div class="psx-metric-v">${PsxUI.fmt(position.value)}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">P&L</div><div class="psx-metric-v ${PsxUI.chgCls(position.pnl)}">${PsxUI.fmt(position.pnlPct, { pct: true, signed: true })}</div></div>
      </div>` : ''}
      <div class="psx-section"><h2>Chart</h2></div>
      <div id="research-tv-chart" style="min-height:420px;margin:0 16px 24px"></div>
      <div style="height:24px"></div>`;
    const assetClass = (window.CRYPTO_ASSETS || []).some(c => c.symbol === r.symbol) ? 'crypto'
      : (window.INTL_STOCKS || []).some(i => i.symbol === r.symbol) ? 'intl' : 'psx';
    if (typeof TradingViewUI !== 'undefined') {
      TradingViewUI.mount('research-tv-chart', r.symbol, assetClass);
    }
  }

  function _onSearch(q) {
    const el = document.getElementById('rt-pills');
    if (!el) return;
    el.innerHTML = ResearchService.search(q).slice(0, 24).map(s =>
      `<button type="button" class="psx-sym-chip${s === _symbol ? ' on' : ''}" onclick="Research.open('${s}')">${s}</button>`
    ).join('');
  }

  return { render, open, setMode, _onSearch };
})();
window.Research = Research;
