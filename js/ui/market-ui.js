'use strict';
/** PSX Tactics–inspired shared chrome — live strip, section kickers, dense tables */
const MarketUI = (() => {
  function fmtNum(n, decimals) {
    if (n == null || Number.isNaN(n)) return '—';
    return Number(n).toLocaleString('en-PK', { maximumFractionDigits: decimals ?? 0 });
  }

  function timeAgo(ts) {
    if (!ts) return null;
    const mins = Math.floor((Date.now() - ts) / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  function dailyChgPct(symbol, price) {
    if (typeof State === 'undefined') return null;
    const prev = State.getPrevClose(symbol);
    if (!prev || !price) return null;
    return ((price - prev) / prev) * 100;
  }

  function kseSnapshot() {
    const state = typeof State !== 'undefined' ? State.get() : {};
    const kse = state.kseIndex || {};
    const chg = kse.changeP ?? kse.change ?? null;
    return {
      value: kse.value,
      changeP: chg,
      ts: kse.ts,
      cls: chg == null ? '' : (chg >= 0 ? 't-gain' : 't-loss'),
      sign: chg != null && chg >= 0 ? '+' : '',
    };
  }

  function liveBadge(ts) {
    const ago = timeAgo(ts);
    return `<div class="lc-live-badge" aria-live="polite"><span class="lc-live-dot" aria-hidden="true"></span>Live market${ago ? ` · ${ago}` : ''}</div>`;
  }

  function compactStrip() {
    const k = kseSnapshot();
    const ago = timeAgo(k.ts);
    return `<div class="lc-compact-strip cap-reveal" role="status">
      <span class="lc-compact-label">KSE-100</span>
      <strong class="lc-compact-val">${k.value ? fmtNum(k.value) : '—'}</strong>
      <span class="lc-compact-chg ${k.cls}">${k.changeP != null ? `${k.sign}${Number(k.changeP).toFixed(2)}%` : '…'}</span>
      <span class="lc-compact-sep" aria-hidden="true">·</span>
      <span class="lc-compact-live"><span class="lc-live-dot lc-live-dot--sm" aria-hidden="true"></span>${ago ? ago : 'Live'}</span>
      <button type="button" class="lc-compact-refresh" onclick="App.refreshPrices()" title="Refresh prices">↻</button>
    </div>`;
  }

  function sectionHead(label, accent, actionHtml) {
    const accentPart = accent ? ` <span>· ${accent}</span>` : '';
    return `<div class="lc-section-head cap-reveal">
      <div class="lc-section-kicker">${label}${accentPart}</div>
      ${actionHtml || ''}
    </div>`;
  }

  function pageHeader(kicker, title, sub) {
    const h = title || kicker;
    const p = sub || (title ? kicker : '');
    return `${typeof PsxUI !== 'undefined' ? PsxUI.strip() : compactStrip()}${typeof PsxUI !== 'undefined' ? PsxUI.pageTitle(h, p) : `<div class="lc-page-head"><div class="lc-section-kicker">${h}</div>${p ? `<p class="lc-page-sub">${p}</p>` : ''}</div>`}`;
  }

  function emptyState(icon, title, body, primaryAction) {
    const btn = primaryAction ? primaryAction.replace(/os-btn os-btn-primary|btn-primary/g, 'psx-btn psx-btn-primary') : '';
    return `<div class="psx-empty">
      <div class="psx-empty-icon">${icon}</div>
      <div class="psx-empty-title">${title}</div>
      <div class="psx-empty-body">${body}</div>
      ${btn}
    </div>`;
  }

  function marketStripFull(holdings) {
    const state = State.get();
    const k = kseSnapshot();
    let adv = 0;
    let dec = 0;
    let topDay = null;
    let topDayChg = -Infinity;
    let worstDay = null;
    let worstDayChg = Infinity;

    (holdings || []).forEach(h => {
      const chg = dailyChgPct(h.symbol, h.price);
      if (chg == null) return;
      if (chg > 0.05) adv++;
      else if (chg < -0.05) dec++;
      if (chg > topDayChg) { topDayChg = chg; topDay = h; }
      if (chg < worstDayChg) { worstDayChg = chg; worstDay = h; }
    });

    const wl = holdings?.length ? PortfolioAnalyticsService.getWinnersLosers() : { winners: [], losers: [] };
    const topHold = wl.winners[0];
    const worstHold = wl.losers[0];
    const summary = holdings?.length ? PortfolioAnalyticsService.getSummary(state) : null;

    return `
    <div class="lc-home-top cap-reveal">
      ${liveBadge(k.ts)}
      <button type="button" class="lc-section-action" onclick="App.refreshPrices()">Refresh prices</button>
    </div>
    <div class="lc-market-strip cap-reveal">
      <div class="lc-index-card lc-index-card--hero">
        <div class="lc-index-kicker">
          <span class="lc-index-label">KSE-100</span>
          <span class="lc-index-tag">Index · Live</span>
        </div>
        <div class="lc-index-value">${k.value ? fmtNum(k.value) : '—'}</div>
        <div class="lc-index-meta">
          <span class="${k.cls}">${k.changeP != null ? `${k.sign}${Number(k.changeP).toFixed(2)}%` : 'Loading…'}</span>
          <span>${holdings?.length ? `${holdings.length} tracked positions` : 'PSX market index'}</span>
        </div>
      </div>
      <div class="lc-index-card">
        <div class="lc-index-kicker"><span class="lc-index-label">Your positions</span></div>
        <div class="lc-pulse-grid">
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Advancing</div><div class="lc-pulse-item-value t-gain">${holdings?.length ? adv : '—'}${holdings?.length ? ' ▲' : ''}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Declining</div><div class="lc-pulse-item-value t-loss">${holdings?.length ? dec : '—'}${holdings?.length ? ' ▼' : ''}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Top today</div><div class="lc-pulse-item-value">${topDay ? `${topDay.symbol} ${topDayChg >= 0 ? '+' : ''}${topDayChg.toFixed(1)}%` : (topHold ? `${topHold.symbol} +${topHold.pnlPct.toFixed(1)}%` : '—')}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Weakest</div><div class="lc-pulse-item-value">${worstDay ? `${worstDay.symbol} ${worstDayChg.toFixed(1)}%` : (worstHold ? `${worstHold.symbol} ${worstHold.pnlPct.toFixed(1)}%` : '—')}</div></div>
        </div>
      </div>
      <div class="lc-index-card">
        <div class="lc-index-kicker"><span class="lc-index-label">Portfolio pulse</span></div>
        <div class="lc-pulse-grid">
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Annual yield</div><div class="lc-pulse-item-value t-gain">${summary ? `${summary.portfolioDivYield.toFixed(1)}%` : '—'}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Positions</div><div class="lc-pulse-item-value">${holdings?.length || '—'}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Sectors</div><div class="lc-pulse-item-value">${holdings?.length ? [...new Set(holdings.map(h => h.sector).filter(Boolean))].length : '—'}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Brokers</div><div class="lc-pulse-item-value">${holdings?.length ? [...new Set(holdings.map(h => h.broker))].length : '—'}</div></div>
        </div>
      </div>
    </div>`;
  }

  function toolsGrid(items) {
    return `<div class="lc-tools-grid cap-reveal">${items.map(t =>
      `<button type="button" class="lc-tool-card" onclick="${t.on}"><strong>${t.title}</strong><span>${t.sub}</span></button>`
    ).join('')}</div>`;
  }

  function defaultTools() {
    return toolsGrid([
      { title: 'Signals', sub: 'AI stance on your holdings', on: "Navigation.go('signals')" },
      { title: 'Dividends', sub: 'Income calendar & yield', on: "Navigation.go('dividends')" },
      { title: 'Research', sub: 'Charts, DMA, and AI stats', on: "Navigation.go('research')" },
      { title: 'Performance', sub: 'XIRR & benchmark compare', on: "Navigation.go('performance')" },
      { title: 'Compare', sub: 'Side-by-side holdings', on: "Navigation.go('comparison')" },
      { title: 'Transactions', sub: 'Full buy/sell log', on: "Navigation.go('transactions')" },
    ]);
  }

  function morningBriefCard() {
    if (!window.PilotEngine) return '';
    const brief = PilotEngine.buildMorningBrief();
    const counts = brief.action_counts || {};
    const urgent = brief.urgent_signals || [];
    const top = urgent[0];
    const pills = ['STRONG BUY', 'ADD', 'HOLD', 'WATCH', 'TRIM', 'SELL']
      .filter(a => counts[a])
      .map(a => `<span class="lc-brief-pill">${a} ${counts[a]}</span>`).join('');
    return `<div class="lc-brief-card cap-reveal">
      <div class="lc-brief-head">
        <div>
          <div class="lc-index-label">Today&apos;s pulse</div>
          <div class="lc-brief-title">Rule-based action queue</div>
        </div>
        <button type="button" class="lc-section-action" onclick="Navigation.go('signals')">Open →</button>
      </div>
      <div class="lc-brief-pills">${pills || '<span class="lc-brief-pill lc-brief-pill--muted">HOLD zone</span>'}</div>
      ${top
        ? `<p class="lc-brief-copy"><strong>${top.symbol}</strong> — ${top.action}: ${top.rationale.slice(0, 140)}…</p>`
        : '<p class="lc-brief-copy">No urgent actions — portfolio in hold zone.</p>'}
      <p class="lc-brief-disclaimer">${brief.disclaimer}</p>
    </div>`;
  }

  function renderAppTicker() {
    const el = document.getElementById('lc-app-ticker');
    if (!el) return;
    const k = kseSnapshot();
    el.innerHTML = `<span class="lc-ticker-label">KSE-100</span>
      <strong>${k.value ? fmtNum(k.value) : '—'}</strong>
      <span class="${k.cls}">${k.changeP != null ? `${k.sign}${Number(k.changeP).toFixed(2)}%` : ''}</span>`;
  }

  return {
    fmtNum, timeAgo, dailyChgPct, kseSnapshot, liveBadge, compactStrip,
    sectionHead, pageHeader, marketStripFull, toolsGrid, defaultTools,
    morningBriefCard, renderAppTicker, emptyState,
  };
})();
window.MarketUI = MarketUI;
