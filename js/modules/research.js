'use strict';
const Research = (() => {
  let _symbol = null;
  let _mode = 'stock';
  let _searchQ = '';

  function setMode(mode) {
    _mode = mode === 'portfolio' ? 'portfolio' : 'stock';
    try { sessionStorage.setItem('ledgercap_research_mode', _mode); } catch (_) {}
    render();
  }

  function open(symbol) {
    _symbol = symbol;
    _searchQ = '';
    _mode = 'stock';
    try { sessionStorage.setItem('ledgercap_research_mode', 'stock'); } catch (_) {}
    if (typeof Navigation !== 'undefined') Navigation.go('research', true);
    render();
  }

  function pickSymbol(sym) {
    if (!sym) return;
    _symbol = sym;
    _searchQ = '';
    render();
  }

  function _catalogSearch(q) {
    const needle = (q || '').trim().toUpperCase();
    if (!needle) return StockService.listSymbols().slice(0, 24);
    const out = [];
    const seen = new Set();
    const push = sym => { if (sym && !seen.has(sym)) { seen.add(sym); out.push(sym); } };
    [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].forEach(s => {
      if (s.symbol.includes(needle) || (s.name || '').toUpperCase().includes(needle)) push(s.symbol);
    });
    (window.INTL_STOCKS || []).forEach(s => {
      if (s.symbol.includes(needle) || (s.name || '').toUpperCase().includes(needle)) push(s.symbol);
    });
    (window.CRYPTO_ASSETS || []).forEach(s => {
      if (s.symbol.includes(needle) || (s.name || '').toUpperCase().includes(needle)) push(s.symbol);
    });
    Object.keys(window.FUNDAMENTALS_DB || {}).forEach(sym => {
      if (sym.includes(needle)) push(sym);
    });
    return out.slice(0, 24);
  }

  function _modeSegment() {
    return `<div class="lc-segment" role="tablist">
      <button type="button" class="lc-segment-btn${_mode === 'stock' ? ' on' : ''}" data-action="Research.setMode" data-tab="stock">Stock</button>
      <button type="button" class="lc-segment-btn${_mode === 'portfolio' ? ' on' : ''}" data-action="Research.setMode" data-tab="portfolio">Portfolio</button>
    </div>`;
  }

  function _metricGrid(cells) {
    return `<div class="lc-metric-grid">${cells.map(c => `
      <div class="lc-metric-cell"><label>${c.l}</label><strong class="${c.cls || ''}">${c.v}</strong></div>
    `).join('')}</div>`;
  }

  function _searchHitsHtml(matches) {
    if (!matches.length) return `<p class="psx-muted lc-search-empty">No symbols match</p>`;
    return matches.map(s => {
      const meta = (window.INTL_STOCKS || []).find(x => x.symbol === s)
        || (window.CRYPTO_ASSETS || []).find(x => x.symbol === s)
        || [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(x => x.symbol === s);
      const name = meta?.name || '';
      return `<button type="button" class="lc-search-hit${s === _symbol ? ' on' : ''}" onmousedown="event.preventDefault();Research.pickSymbol('${s}')">
        <strong>${s}</strong><span>${name}</span>
      </button>`;
    }).join('');
  }

  function _fmtMoney(sym, value, isIntl, isCrypto) {
    if (isIntl || isCrypto) return '$' + Number(value || 0).toFixed(2);
    return PsxUI.fmt(value);
  }

  function _fmtPct(value) {
    const n = Number(value);
    if (!Number.isFinite(n) || Math.abs(n) > 50) return '—';
    return PsxUI.fmt(n, { pct: true, signed: true });
  }

  function _usdDisplay(sym, quote) {
    const st = State.get()?.prices?.[sym];
    if (st?.priceUsd > 0) return st.priceUsd;
    if (quote?.priceUsd > 0) return quote.priceUsd;
    if (quote?.price > 0 && typeof FxService !== 'undefined') return FxService.pkrToUsd(quote.price);
    return (window.GLOBAL_FALLBACK_USD || {})[sym] || 0;
  }

  function _paintQuote(sym) {
    const q = MarketDataService.getQuote(sym);
    const isIntl = (window.INTL_STOCKS || []).some(i => i.symbol === sym);
    const isCrypto = (window.CRYPTO_ASSETS || []).some(c => c.symbol === sym);
    const priceEl = document.querySelector('.lc-research-price');
    const chgEl = document.querySelector('.lc-research-chg');
    const srcEl = document.querySelector('.lc-research-source');
    if (priceEl) {
      priceEl.textContent = (isIntl || isCrypto)
        ? `$${Number(_usdDisplay(sym, q)).toFixed(2)}`
        : PsxUI.fmt(q.price);
    }
    if (chgEl) {
      const chgTxt = _fmtPct(q.changePct);
      const dayLbl = q.sessionOpen ? 'today' : 'vs prev close';
      chgEl.textContent = chgTxt === '—' ? 'Change unavailable' : `${chgTxt} ${dayLbl}`;
      chgEl.className = `lc-research-chg ${q.changePct >= 0 ? 'up' : 'down'}`;
    }
    if (srcEl) {
      const lbl = q.quoteLabel || 'Last close';
      const age = q.ts && typeof Prices !== 'undefined' ? Prices.formatTs(q.ts) : '';
      srcEl.textContent = `${lbl}${age ? ' · ' + age : ''} · ${Prices.sourceLabel(q.source || 'seed')}`;
    }
  }

  async function _refreshQuote(sym) {
    if (!sym) return;
    const isIntl = (window.INTL_STOCKS || []).some(i => i.symbol === sym);
    const isCrypto = (window.CRYPTO_ASSETS || []).some(c => c.symbol === sym);
    let raw = null;
    if (isIntl && typeof Prices !== 'undefined' && Prices.fetchIntlSymbol) {
      raw = await Prices.fetchIntlSymbol(sym);
    } else if (isCrypto && typeof Prices !== 'undefined' && Prices.fetchCryptoSymbol) {
      raw = await Prices.fetchCryptoSymbol(sym);
    } else if (typeof MarketDataService !== 'undefined' && MarketDataService.fetchLiveQuote) {
      await MarketDataService.fetchLiveQuote(sym);
      if (sym === _symbol) _paintQuote(sym);
      return;
    }
    if (raw && (raw.priceUsd > 0 || raw.price > 0)) {
      State.updatePrice(sym, raw);
    }
    if (sym !== _symbol) return;
    _paintQuote(sym);
    const assetClass = isCrypto ? 'crypto' : isIntl ? 'intl' : 'psx';
    if (typeof TradingViewUI !== 'undefined') {
      TradingViewUI.mount('research-tv-chart', sym, assetClass);
    }
  }

  function _portfolioContext(symbol) {
    if (typeof PilotEngine === 'undefined') return '';
    const state = State.get();
    const brief = PilotEngine.buildMorningBrief(state);
    const sig = (brief.all_signals || []).find(s => s.symbol === symbol);
    const reb = PilotEngine.buildRebalancePlan(state).rows.find(r => r.symbol === symbol);
    if (!sig && !reb) return '';
    const rows = [];
    if (sig) {
      rows.push(`<div class="lc-verdict cap-reveal"><strong>Pilot signal:</strong> ${sig.action} — ${sig.rationale}</div>`);
    }
    if (reb && reb.action !== 'OK') {
      rows.push(`<div class="lc-verdict lc-verdict--warn cap-reveal"><strong>Rebalance:</strong> ${reb.action} · actual ${reb.actual_pct.toFixed(1)}%${reb.target_pct != null ? ` vs target ${reb.target_pct.toFixed(1)}%` : ''}</div>`);
    }
    return `<div class="lc-dash-section"><div class="lc-dash-section-head"><h3>Portfolio context</h3><span>Rule-based</span></div>${rows.join('')}</div>`;
  }

  function _onSearch(q) {
    _searchQ = q;
    const el = document.getElementById('rt-search-results');
    if (!el) return;
    el.innerHTML = _searchHitsHtml(_catalogSearch(q));
  }

  function _peersBlock(symbol, sector) {
    if (!sector) return '';
    const peers = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])]
      .filter(s => s.sector === sector && s.symbol !== symbol)
      .slice(0, 6);
    if (!peers.length) return '';
    const rows = peers.map(p => {
      const q = State.getPrice(p.symbol) || (window.FALLBACK_PRICES || {})[p.symbol] || 0;
      const f = (window.FUNDAMENTALS_DB || {})[p.symbol] || {};
      return `<button type="button" class="lc-peer-row" data-action="Research.pickSymbol" data-symbol="${p.symbol}">
        <strong>${p.symbol}</strong><span>${p.name || ''}</span>
        <em>${q ? PsxUI.fmt(q) : '—'}</em><b>${f.pe ? 'P/E ' + Number(f.pe).toFixed(1) : ''}</b>
      </button>`;
    }).join('');
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Sector peers</h3><span>${sector}</span></div>
      <div class="lc-peer-list">${rows}</div>
    </div>`;
  }

  function _technicalBlock(symbol, price, prevClose) {
    if (typeof PilotEngine === 'undefined') return '';
    const t = PilotEngine.buildTechnical(symbol, price, prevClose || price);
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Technicals</h3><span>Rule-based</span></div>
      ${_metricGrid([
        { l: 'RSI (14)', v: t.rsi_14.toFixed(1) },
        { l: 'MA (20 est.)', v: PsxUI.fmt(t.ma_20) },
        { l: '52w position', v: t.position_in_52w_pct.toFixed(0) + '%' },
        { l: 'Day chg', v: _fmtPct(t.day_change_pct), cls: PsxUI.chgCls(t.day_change_pct) },
      ])}
    </div>`;
  }

  function _dividendBlock(symbol) {
    if (typeof CorporateActionsService === 'undefined') return '';
    const up = CorporateActionsService.getUpcomingCash(symbol)[0];
    const paid = CorporateActionsService.getPaidCash(symbol)[0];
    if (!up && !paid) return '';
    const cells = [];
    if (up) cells.push({ l: 'Next dividend', v: up.paymentDate ? up.paymentDate.slice(0, 10) : 'TBD' });
    if (up?.amount) cells.push({ l: 'Amount', v: '₨' + up.amount });
    if (paid) cells.push({ l: 'Last paid', v: (paid.paymentDate || '').slice(0, 10) || '—' });
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Corporate actions</h3><button type="button" class="lc-section-action" data-nav="announcements">All →</button></div>
      ${_metricGrid(cells)}
    </div>`;
  }

  async function _loadOrderBook(sym, isPsx) {
    const host = document.getElementById('research-orderbook');
    if (!host) return;
    if (!isPsx) {
      host.innerHTML = '<p class="psx-muted lc-card-sub">Bid/offer depth available for PSX symbols during market hours.</p>';
      return;
    }
    host.innerHTML = '<p class="psx-muted">Loading order book…</p>';
    const data = typeof MarketWatchService !== 'undefined'
      ? await MarketWatchService.getOrderBook(sym)
      : null;
    host.innerHTML = typeof MarketWatchService !== 'undefined'
      ? MarketWatchService.panelHtml(data)
      : '<p class="psx-muted">Order book unavailable.</p>';
  }

  let _histRange = '6M';
  let _histSeries = null; // cache per symbol
  let _histSymbol = null;

  async function _load52w(sym, price) {
    const host = document.getElementById('research-52w');
    if (!host || typeof Prices === 'undefined') return;
    let series = [];
    try {
      // Proxy fallback chains can hang for minutes — cap the wait so the
      // section degrades honestly instead of spinning forever.
      series = await Promise.race([
        Prices.fetchPriceSeries(sym, 252),
        new Promise(resolve => setTimeout(() => resolve([]), 12000)),
      ]);
    } catch (_) {}
    if (_symbol !== sym) return; // user moved on while we were fetching
    if (series.length < 5) {
      const msg = '<p class="psx-muted lc-card-sub">PSX end-of-day feed unreachable right now — history returns when the feed recovers.</p>';
      host.innerHTML = msg;
      const hist = document.getElementById('research-history');
      if (hist) hist.innerHTML = msg;
      return;
    }
    _histSeries = series;
    _histSymbol = sym;
    const low = Math.min(...series);
    const high = Math.max(...series);
    host.innerHTML = `
      ${Charts.rangeBar(low, high, price, {
        lowLabel: 'Low ' + PsxUI.fmt(low),
        highLabel: 'High ' + PsxUI.fmt(high),
        markerLabel: PsxUI.fmt(price),
        ariaLabel: `52 week range ${PsxUI.fmt(low)} to ${PsxUI.fmt(high)}, current ${PsxUI.fmt(price)}`,
      })}`;
    _paintHistory();
  }

  function setHistRange(r) {
    _histRange = r;
    _paintHistory();
  }

  function _paintHistory() {
    const host = document.getElementById('research-history');
    if (!host || !_histSeries) return;
    const n = _histRange === '1M' ? 22 : _histRange === '6M' ? 126 : 252;
    const slice = _histSeries.slice(-n);
    if (slice.length < 2) { host.innerHTML = ''; return; }
    const up = slice[slice.length - 1] >= slice[0];
    const chg = slice[0] ? ((slice[slice.length - 1] - slice[0]) / slice[0]) * 100 : 0;
    host.innerHTML = `
      <div class="lc-range-picker" role="tablist" aria-label="History range">
        ${['1M', '6M', '1Y'].map(r => `<button type="button" role="tab" class="lc-range-btn${_histRange === r ? ' on' : ''}" aria-selected="${_histRange === r}" data-action="Research.setHistRange" data-tab="${r}">${r}</button>`).join('')}
        <span class="lc-card-sub ${up ? 'psx-up' : 'psx-down'}" style="margin-left:auto">${(chg >= 0 ? '+' : '') + chg.toFixed(1)}% ${_histRange}</span>
      </div>
      ${Charts.lineChart(slice, { height: 120, color: up ? 'var(--psx-up, #30d158)' : 'var(--psx-down, #ff453a)', ariaLabel: `${_histSymbol} price history ${_histRange}` })}`;
  }

  function _valueCheck(price, fairValue) {
    if (!(fairValue > 0) || !(price > 0)) return '';
    const gap = ((price - fairValue) / fairValue) * 100;
    const verdict = gap > 15 ? 'Overvalued' : gap < -15 ? 'Undervalued' : 'Fairly valued';
    const cls = gap > 15 ? 'psx-down' : gap < -15 ? 'psx-up' : '';
    const lo = Math.min(price, fairValue) * 0.85;
    const hi = Math.max(price, fairValue) * 1.15;
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Value check</h3><span>Rule-based estimate — not advice</span></div>
      <div class="lc-sector-card">
        <p class="lc-card-sub"><strong class="${cls}">${verdict}</strong> — price ${PsxUI.fmt(price)} vs estimated fair value ${PsxUI.fmt(fairValue)} (${(gap >= 0 ? '+' : '') + gap.toFixed(1)}%)</p>
        ${Charts.rangeBar(lo, hi, price, { lowLabel: PsxUI.fmt(lo), highLabel: PsxUI.fmt(hi), markerLabel: 'Fair ' + PsxUI.fmt(fairValue) })}
      </div>
    </div>`;
  }

  function render() {
    const screen = document.getElementById('screen-research');
    if (!screen) return;

    if (_mode === 'portfolio') {
      const state = State.get();
      const bucketsHtml = typeof PortfolioBuckets !== 'undefined'
        ? `<div class="lc-dash-section" style="padding:0 var(--lc-space-4)">
            <div class="lc-dash-section-head"><h3>${I18n.t('portfolio.bucketsTitle')}</h3><span>${I18n.t('portfolio.bucketsSub')}</span></div>
            <div class="lc-portfolio-grid">${PortfolioBuckets.cardsHtml(state)}</div>
          </div>`
        : '';
      screen.innerHTML = `
        <div class="lc-dash">
          <div class="lc-screen-head">
            <h1>${I18n.t('analyze.title')}</h1>
            <p>Portfolio intelligence &amp; risk signals</p>
          </div>
          ${_modeSegment()}
          ${bucketsHtml}
          <div class="lc-dash-actions" style="padding:0 var(--lc-space-4) 8px;display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" class="psx-btn psx-btn-ghost" data-nav="risk-audit">Full risk audit →</button>
            <button type="button" class="psx-btn psx-btn-ghost" data-nav="insights">Portfolio insights →</button>
          </div>
          <div id="research-portfolio-host" style="padding:0 var(--lc-space-4)"></div>
        </div>`;
      if (window.Intelligence) Intelligence.render(document.getElementById('research-portfolio-host'));
      return;
    }

    const symbols = StockService.listSymbols();
    if (!_symbol && symbols.length) {
      // Default to the user's largest holding — never a random catalog
      // entry with a $0 seed price.
      try {
        const txs = State.get().transactions || [];
        const held = Ledger.calcHoldings(txs)
          .map(h => ({ symbol: h.symbol, value: h.shares * (State.getPrice(h.symbol) || h.avgCost) }))
          .sort((a, b) => b.value - a.value);
        _symbol = held[0]?.symbol || symbols[0];
      } catch (_) {
        _symbol = symbols[0];
      }
    }
    if (!_symbol) {
      screen.innerHTML = `
        <div class="lc-dash">
          <div class="lc-screen-head">
            <h1>${I18n.t('analyze.title')}</h1>
            <p>Add holdings to analyze</p>
          </div>
          ${_modeSegment()}
          <div class="lc-search-wrap">
            <input type="search" placeholder="Search US, PSX, crypto…" id="rt-search" value="${_searchQ.replace(/"/g, '&quot;')}" oninput="Research._onSearch(this.value)" autocomplete="off" aria-label="Search symbols" aria-controls="rt-search-results">
            <div id="rt-search-results" class="lc-search-results" role="listbox"></div>
          </div>
          <div class="lc-empty-state">
            <h2>No symbols</h2>
            <p>Search above or add holdings / load demo.</p>
            <button type="button" class="psx-btn psx-btn-primary" data-action="App.openAddTransaction">${I18n.t('addHoldings')}</button>
          </div>
        </div>`;
      _onSearch(_searchQ);
      return;
    }

    const r = ResearchService.getStockReport(_symbol);
    const { profile, fundamentals: f, quote, changes, ai, position } = r;
    const isFund = f.type === 'fund';
    const sd = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === r.symbol);
    const shLabel = sd?.isShariah ? I18n.t('analyze.shariahCompliant') : I18n.t('analyze.notShariah');
    const chgCls = quote.changePct >= 0 ? 'up' : 'down';
    const isIntl = (window.INTL_STOCKS || []).some(i => i.symbol === r.symbol);
    const isCrypto = (window.CRYPTO_ASSETS || []).some(c => c.symbol === r.symbol);
    const priceLabel = (isIntl || isCrypto)
      ? `$${Number(_usdDisplay(r.symbol, quote)).toFixed(2)}`
      : PsxUI.fmt(quote.price);

    const fundMetrics = !isFund ? _metricGrid([
      { l: 'P/E', v: f.pe ?? '—' },
      { l: 'Div yield', v: f.divYield ? Number(f.divYield).toFixed(2) + '%' : '—' },
      { l: 'ROE', v: f.roe ? Number(f.roe).toFixed(2) + '%' : '—' },
      { l: 'EPS', v: f.eps ? ((isIntl || isCrypto) ? '$' : '₨') + Number(f.eps).toFixed(2) : '—' },
    ]) : '';

    const fundNote = (!isFund && (isIntl || isCrypto) && !f.available)
      ? `<p class="psx-muted lc-card-sub">US/crypto fundamentals appear after live refresh (Yahoo P/E &amp; yield).</p>`
      : '';

    const perfMetrics = _metricGrid([
      { l: 'Daily', v: _fmtPct(changes.daily), cls: PsxUI.chgCls(changes.daily) },
      { l: 'Weekly', v: _fmtPct(changes.weekly), cls: PsxUI.chgCls(changes.weekly) },
      { l: 'Monthly', v: _fmtPct(changes.monthly), cls: PsxUI.chgCls(changes.monthly) },
      { l: 'Yearly', v: changes.yearly ? _fmtPct(changes.yearly) : '—', cls: PsxUI.chgCls(changes.yearly) },
    ]);

    const positionBlock = position ? `
      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Your position</h3><span>${position.shares} shares</span></div>
      </div>
      ${_metricGrid([
        { l: 'Market value', v: PsxUI.fmt(position.value) },
        { l: 'P&amp;L', v: PsxUI.fmt(position.pnlPct, { pct: true, signed: true }), cls: PsxUI.chgCls(position.pnl) },
      ])}` : '';

    const quickPicks = symbols.slice(0, 16);

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${I18n.t('analyze.title')}</h1>
          <p>${I18n.t('analyze.sub')}</p>
        </div>
        ${_modeSegment()}
        <div class="lc-search-wrap">
          <input type="search" placeholder="Search symbol — type to shortlist" id="rt-search" value="${_searchQ.replace(/"/g, '&quot;')}" oninput="Research._onSearch(this.value)" autocomplete="off" aria-label="Search symbols" aria-controls="rt-search-results">
          <div id="rt-search-results" class="lc-search-results" role="listbox">${_searchHitsHtml(_searchQ ? _catalogSearch(_searchQ) : [])}</div>
        </div>
        <div class="lc-research-hero">
          <div class="lc-research-hero-top">
            <div>
              <h2>${esc(r.symbol)}</h2>
              <p>${esc(profile.name)}${profile.sector ? ' · ' + esc(profile.sector) : ''}</p>
            </div>
          </div>
          <div class="lc-research-price">${priceLabel}</div>
          <span class="lc-research-chg ${chgCls}">${_fmtPct(quote.changePct) === '—' ? 'Change unavailable' : _fmtPct(quote.changePct) + ' today'}</span>
          <p class="lc-card-sub lc-research-source">Source: ${Prices.sourceLabel(quote.source || 'seed')}</p>
        </div>
        <div class="lc-verdict ${ai.action === 'BUY' || ai.action === 'HOLD+' ? 'lc-verdict--healthy' : ai.action === 'SELL' || ai.riskScore > 70 ? 'lc-verdict--risky' : 'lc-verdict--caution'}">
          <h3>${I18n.t('analyze.plainEnglish')}</h3>
          <p>${esc(ai.summary)}</p>
          <div class="lc-verdict-meta">${shLabel}</div>
        </div>
        <div class="lc-sym-scroll" id="rt-pills">${quickPicks.map(s =>
          `<button type="button" class="lc-sym-chip${s === r.symbol ? ' on' : ''}" data-action="Research.pickSymbol" data-symbol="${s}">${s}</button>`
        ).join('')}</div>
        ${_metricGrid([
          { l: 'Smart rating (rules)', v: ai.action },
          { l: 'Confidence', v: ai.confidence + '%' },
          { l: 'Fair value', v: _fmtMoney(r.symbol, ai.fairValue, isIntl, isCrypto) },
          { l: 'Risk', v: ai.riskScore + '/100' },
        ])}
        ${!isFund ? `<div class="lc-dash-section"><div class="lc-dash-section-head"><h3>${I18n.t('analyze.fundamentals')}</h3></div></div>${fundNote}${fundMetrics}` : ''}
        ${!isIntl && !isCrypto ? `<div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>Market depth</h3><span>Bid · offer</span></div>
          <div id="research-orderbook"><p class="psx-muted">Loading…</p></div>
        </div>` : ''}
        ${_technicalBlock(r.symbol, quote.price, quote.prevClose)}
        <div class="lc-dash-section"><div class="lc-dash-section-head"><h3>52-week range</h3><span>EOD history</span></div><div class="lc-sector-card" id="research-52w"><p class="psx-muted lc-card-sub">Loading…</p></div></div>
        <div class="lc-dash-section"><div class="lc-dash-section-head"><h3>Price trend</h3><span>EOD closes</span></div><div class="lc-sector-card" id="research-history"><p class="psx-muted lc-card-sub">Loading…</p></div></div>
        ${_valueCheck(quote.price, ai.fairValue)}
        ${_peersBlock(r.symbol, profile.sector)}
        ${_dividendBlock(r.symbol)}
        <div class="lc-dash-section"><div class="lc-dash-section-head"><h3>Performance</h3><span>% change</span></div></div>
        ${perfMetrics}
        ${_portfolioContext(r.symbol)}
        ${positionBlock}
        <div class="lc-chart-block">
          <div class="lc-dash-section-head"><h3>Price history</h3><span>Last ~30 sessions</span></div>
          <div id="research-tv-chart" style="min-height:320px"></div>
        </div>
      </div>`;

    const assetClass = isCrypto ? 'crypto' : isIntl ? 'intl' : 'psx';
    if (typeof TradingViewUI !== 'undefined') {
      TradingViewUI.destroy('research-tv-chart');
      TradingViewUI.mount('research-tv-chart', r.symbol, assetClass);
    }
    _refreshQuote(r.symbol);
    if (!isIntl && !isCrypto) _loadOrderBook(r.symbol, true);
    else _loadOrderBook(r.symbol, false);
    _load52w(r.symbol, quote.price);
  }

  return { render, open, pickSymbol, setMode, setHistRange, _onSearch };
})();
window.Research = Research;
