'use strict';
const Research = (() => {
  let _symbol = null;
  let _mode = 'stock';
  const U = PlatformUI;

  function setMode(mode) {
    _mode = mode === 'portfolio' ? 'portfolio' : 'stock';
    try { sessionStorage.setItem('ledgercap_research_mode', _mode); } catch (_) {}
    render();
  }

  function open(symbol) {
    _symbol = symbol;
    _mode = 'stock';
    try { sessionStorage.setItem('ledgercap_research_mode', 'stock'); } catch (_) {}
    render();
  }

  function modeBar() {
    return `<div class="rt-mode-bar cap-tab-bar--segmented cap-reveal">
      <button type="button" class="rt-mode-btn cap-tab${_mode === 'stock' ? ' active' : ''}" onclick="Research.setMode('stock')">Stock analysis</button>
      <button type="button" class="rt-mode-btn cap-tab${_mode === 'portfolio' ? ' active' : ''}" onclick="Research.setMode('portfolio')">Portfolio intel</button>
    </div>`;
  }

  function render() {
    const screen = document.getElementById('screen-research');
    if (!screen) return;

    if (_mode === 'stock') {
      try {
        const saved = sessionStorage.getItem('ledgercap_research_mode');
        if (saved === 'portfolio') _mode = 'portfolio';
      } catch (_) {}
    }

    if (_mode === 'portfolio') {
      screen.innerHTML = `${modeBar()}<div id="research-portfolio-host"></div>`;
      if (window.Intelligence) Intelligence.render(document.getElementById('research-portfolio-host'));
      return;
    }

    const symbols = StockService.listSymbols();
    if (!_symbol && symbols.length) _symbol = symbols[0];

    if (!_symbol) {
      screen.innerHTML = `${modeBar()}<div class="rt-terminal"><div class="rt-header"><div class="rt-sym">Research</div><div class="rt-name">Add holdings to begin stock analysis</div></div></div>`;
      return;
    }

    const r = ResearchService.getStockReport(_symbol);
    const { profile, fundamentals: f, quote, changes, ai, divHist, position } = r;
    const isFund = f.type === 'fund';

    screen.innerHTML = `
    ${modeBar()}
    <div class="rt-terminal">
      <div class="rt-header cap-reveal">
        <div class="rt-header-top">
          <div>
            <div class="rt-sym">${r.symbol}</div>
            <div class="rt-name">${profile.name} · ${profile.sector || profile.category || ''}</div>
          </div>
          <div>
            <div class="rt-price">${U.fmt(quote.price)}</div>
            <div class="rt-chg ${U.chgCls(quote.changePct)}">${quote.changePct >= 0 ? '+' : ''}${quote.changePct.toFixed(2)}% today</div>
          </div>
        </div>
      </div>

      <div class="rt-search"><input type="search" placeholder="Search symbol…" id="rt-search" oninput="Research._onSearch(this.value)"></div>
      <div class="rt-sym-pills" id="rt-pills">
        ${symbols.slice(0, 20).map(s => `<button class="rt-pill${s === r.symbol ? ' active' : ''}" onclick="Research.open('${s}')">${s}</button>`).join('')}
      </div>

      <div class="rt-ai-bar">
        <div class="rt-ai-stat"><div class="rt-ai-stat-lbl">Smart rating</div><div class="rt-ai-stat-val">${U.ratingBadge(ai.action)}</div></div>
        <div class="rt-ai-stat"><div class="rt-ai-stat-lbl">Confidence</div><div class="rt-ai-stat-val">${ai.confidence}%</div></div>
        <div class="rt-ai-stat"><div class="rt-ai-stat-lbl">Fair Value</div><div class="rt-ai-stat-val">${U.fmt(ai.fairValue)}</div></div>
        <div class="rt-ai-stat"><div class="rt-ai-stat-lbl">Risk</div><div class="rt-ai-stat-val">${ai.riskScore}/100</div></div>
      </div>

      ${U.section('Price Performance', U.metricGrid([
        U.metricCell('Daily', U.fmt(changes.daily, { pct: true, signed: true }), null, U.chgCls(changes.daily)),
        U.metricCell('Weekly', U.fmt(changes.weekly, { pct: true, signed: true }), null, U.chgCls(changes.weekly)),
        U.metricCell('Monthly', U.fmt(changes.monthly, { pct: true, signed: true }), null, U.chgCls(changes.monthly)),
        U.metricCell('Yearly', U.fmt(changes.yearly, { pct: true, signed: true }), null, U.chgCls(changes.yearly)),
      ], 4))}

      ${isFund ? U.section('Fund Analytics', U.metricGrid([
        U.metricCell('NAV', U.fmt(f.nav)),
        U.metricCell('Category', f.category || '—'),
        U.metricCell('1Y Return', U.fmt(f.oneYearReturn, { pct: true }), null, U.chgCls(f.oneYearReturn)),
        U.metricCell('3Y Return', U.fmt(f.threeYearReturn, { pct: true })),
        U.metricCell('YTD', U.fmt(f.ytdReturn, { pct: true, signed: true }), null, U.chgCls(f.ytdReturn)),
        U.metricCell('Expense', (f.expenseRatio || '—') + '%'),
        U.metricCell('Div Yield', U.fmt(f.divYield, { pct: true })),
        U.metricCell('Sharpe', f.sharpe ?? '—'),
      ], 4)) : U.section('Fundamentals', U.metricGrid([
        U.metricCell('Market Cap', f.marketCap ? U.fmt(f.marketCap * 1000, { compact: true }) : '—', '₨ thousands'),
        U.metricCell('P/E', f.pe ?? '—'),
        U.metricCell('P/B', f.pb ?? '—'),
        U.metricCell('ROE', f.roe ? f.roe + '%' : '—'),
        U.metricCell('Div Yield', f.divYield ? f.divYield + '%' : '—'),
        U.metricCell('EPS', f.eps ? '₨' + f.eps : '—'),
        U.metricCell('Rev Growth', f.revGrowth ? f.revGrowth + '%' : '—', null, U.chgCls(f.revGrowth)),
        U.metricCell('Profit Growth', f.profitGrowth ? f.profitGrowth + '%' : '—', null, U.chgCls(f.profitGrowth)),
      ], 4))}

      ${!isFund && f.available ? U.section('Valuation Scenarios', `
        <div class="rt-scenario">
          <div class="rt-scenario-card bull"><div class="rt-metric-lbl">Bull Case</div><div class="rt-metric-val t-gain">${U.fmt(ai.bull)}</div><div class="rt-metric-sub">+${((ai.bull - quote.price) / quote.price * 100).toFixed(0)}%</div></div>
          <div class="rt-scenario-card"><div class="rt-metric-lbl">Base Case</div><div class="rt-metric-val">${U.fmt(ai.base)}</div></div>
          <div class="rt-scenario-card bear"><div class="rt-metric-lbl">Bear Case</div><div class="rt-metric-val t-loss">${U.fmt(ai.bear)}</div><div class="rt-metric-sub">${((ai.bear - quote.price) / quote.price * 100).toFixed(0)}%</div></div>
        </div>`) : ''}

      ${position ? U.section('Your Position', U.metricGrid([
        U.metricCell('Shares', position.shares),
        U.metricCell('Avg Cost', U.fmt(position.avgCost)),
        U.metricCell('Value', U.fmt(position.value)),
        U.metricCell('P&L', U.fmt(position.pnl, { signed: false }), U.fmt(position.pnlPct, { pct: true, signed: true }), U.chgCls(position.pnl)),
        U.metricCell('Yield on Cost', position.yieldOnCost ? position.yieldOnCost.toFixed(1) + '%' : '—'),
        U.metricCell('Broker', position.broker),
      ], 3)) : ''}

      ${!isFund && divHist.seedAnnual?.length ? U.section('Dividend History', `
        <div class="rt-table-wrap"><table class="rt-table"><thead><tr><th>Year</th><th>Annual DPS</th><th>Growth</th></tr></thead><tbody>
        ${divHist.seedAnnual.map((d, i) => {
          const prev = divHist.seedAnnual[i + 1];
          const g = prev ? ((d.amount - prev.amount) / prev.amount * 100).toFixed(1) : '—';
          return `<tr><td>${d.year}</td><td>₨${d.amount}</td><td class="${typeof g === 'string' ? '' : U.chgCls(parseFloat(g))}">${g}${typeof g === 'number' || (g !== '—' && !isNaN(g)) ? '%' : ''}</td></tr>`;
        }).join('')}
        </tbody></table></div>`) : ''}

      ${U.section('Analysis', `<div class="os-ai-box" style="margin:0;">${ai.summary}</div>`)}

      ${U.section('Research Notes', `
        <textarea class="field-input" id="rs-notes" rows="4" style="width:100%;">${r.notes}</textarea>
        <button class="os-btn os-btn-primary" style="margin-top:10px;" onclick="Research.saveNotes('${r.symbol}')">Save notes</button>`)}
    </div>`;
    CapMotion.refresh();
  }

  function _onSearch(q) {
    const el = document.getElementById('rt-pills');
    if (!el) return;
    const hits = ResearchService.search(q).slice(0, 20);
    el.innerHTML = hits.map(s => `<button class="rt-pill${s === _symbol ? ' active' : ''}" onclick="Research.open('${s}')">${s}</button>`).join('');
  }

  function saveNotes(symbol) {
    State.update(s => { if (!s.researchNotes) s.researchNotes = {}; s.researchNotes[symbol] = document.getElementById('rs-notes')?.value || ''; });
    App.showToast('Notes saved', 'success');
  }

  return { render, open, setMode, saveNotes, _onSearch };
})();
window.Research = Research;
