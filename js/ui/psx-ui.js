'use strict';
/** PSX Tactics UI — single component layer */
const PsxUI = (() => {
  function fmt(n, opts) {
    if (typeof PlatformUI !== 'undefined') return PlatformUI.fmt(n, opts);
    if (n == null || Number.isNaN(n)) return '—';
    return Number(n).toLocaleString('en-PK');
  }

  function chgCls(v) {
    if (typeof PlatformUI !== 'undefined') return PlatformUI.chgCls(v);
    if (v == null) return '';
    return v >= 0 ? 'psx-up' : 'psx-down';
  }

  function kse() {
    const k = (typeof State !== 'undefined' ? State.get() : {}).kseIndex || {};
    const chg = k.changeP ?? k.change ?? null;
    return { value: k.value, changeP: chg, ts: k.ts, cls: chg == null ? '' : (chg >= 0 ? 'psx-up' : 'psx-down') };
  }

  function strip(onRefresh) {
    const k = kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    return `<div class="psx-strip">
      <div><span class="psx-live"><span class="psx-live-dot"></span>${I18n.t('liveMarket')}</span></div>
      <div><strong>KSE-100</strong> ${k.value ? fmt(k.value) : '—'} <span class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : ''}</span></div>
      <button type="button" class="psx-strip-refresh" onclick="${onRefresh || 'App.refreshPrices()'}">${I18n.t('refresh')}</button>
    </div>`;
  }

  function indexRow() {
    const k = kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    return `<div class="psx-index-row">
      <div class="psx-index-card">
        <div class="psx-index-label">KSE-100 · Index · live</div>
        <div class="psx-index-val">${k.value ? fmt(k.value) : '—'}</div>
        <div class="psx-index-meta"><span class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : I18n.t('loading')}</span></div>
      </div>
      <div class="psx-index-card">
        <div class="psx-index-label">${I18n.t('portfolio.value')}</div>
        <div class="psx-index-val" id="psx-portfolio-mini">—</div>
        <div class="psx-index-meta" id="psx-portfolio-mini-sub">${I18n.t('hub.sub').slice(0, 40)}…</div>
      </div>
    </div>`;
  }

  function statGrid(stats) {
    return `<div class="psx-stats">
      <div class="psx-stat"><div class="psx-stat-l">${I18n.t('market.advancing')}</div><div class="psx-stat-v psx-up">${stats.adv ?? '—'}</div></div>
      <div class="psx-stat"><div class="psx-stat-l">${I18n.t('market.declining')}</div><div class="psx-stat-v psx-down">${stats.dec ?? '—'}</div></div>
      <div class="psx-stat"><div class="psx-stat-l">${I18n.t('market.unchanged')}</div><div class="psx-stat-v">${stats.unch ?? '—'}</div></div>
      <div class="psx-stat"><div class="psx-stat-l">Listed</div><div class="psx-stat-v">${stats.listed ?? '—'}</div></div>
    </div>`;
  }

  function panel(title, desc, openOn, inner) {
    return `<div class="psx-panel">
      <div class="psx-panel-head">
        <div><strong>${title}</strong><span>${desc}</span></div>
        ${openOn ? `<button type="button" class="psx-open" onclick="${openOn}">${I18n.t('open')}</button>` : ''}
      </div>
      ${inner || ''}
    </div>`;
  }

  function sectorTable(sectors, onRow) {
    return Object.keys(sectors).sort().map(sec => `
      <div class="psx-sector"><span>${sec}</span><span>${sectors[sec].length} stocks</span></div>
      <div class="psx-table-wrap"><table class="psx-table"><thead><tr>
        <th>${I18n.t('market.symbol')}</th><th>${I18n.t('market.last')}</th><th>${I18n.t('market.chg')}</th>
      </tr></thead><tbody>
      ${sectors[sec].map(r => `
        <tr onclick="${onRow ? onRow(r.symbol) : ''}">
          <td><div class="psx-sym">${r.symbol}</div><div class="psx-sym-sub">${r.name}</div></td>
          <td>${fmt(r.price)}</td>
          <td class="${chgCls(r.chg)}">${fmt(r.chg, { pct: true, signed: true })}</td>
        </tr>`).join('')}
      </tbody></table></div>`).join('');
  }

  function filters(items, active, ns) {
    return `<div class="psx-filters">${items.map(it => `
      <button type="button" class="psx-filter${active === it.id ? ' on' : ''}" onclick="${ns}.setFilter('${it.id}')">${it.label}</button>
    `).join('')}</div>`;
  }

  function pageTitle(title, sub) {
    return `<div class="lc-screen-head"><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>`;
  }

  function lcDash(title, sub, inner) {
    return `<div class="lc-dash"><div class="lc-screen-head"><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${inner || ''}</div>`;
  }

  function segment(items, active, ns, method) {
    method = method || 'setFilter';
    return `<div class="lc-segment" role="tablist">${items.map(it =>
      `<button type="button" class="lc-segment-btn${active === it.id ? ' on' : ''}" role="tab" onclick="${ns}.${method}('${it.id}')">${it.label}</button>`
    ).join('')}</div>`;
  }

  function skeleton(lines) {
    lines = lines || 4;
    return `<div class="lc-skeleton-wrap" aria-hidden="true">${Array.from({ length: lines }, () => '<div class="lc-skeleton-line"></div>').join('')}</div>`;
  }

  function refreshPortfolioMini() {
    const el = document.getElementById('psx-portfolio-mini');
    const sub = document.getElementById('psx-portfolio-mini-sub');
    if (!el || typeof State === 'undefined') return;
    const txs = State.get('transactions') || [];
    if (!txs.length) { el.textContent = '—'; if (sub) sub.textContent = I18n.t('addHoldings'); return; }
    const s = PortfolioAnalyticsService.getSummary(State.get());
    el.textContent = fmt(s.totalValue);
    if (sub) sub.textContent = `${I18n.t('portfolio.allTime')} ${fmt(s.totalReturn.pct, { pct: true, signed: true })}`;
  }

  return { fmt, chgCls, kse, strip, indexRow, statGrid, panel, sectorTable, filters, pageTitle, lcDash, segment, skeleton, refreshPortfolioMini };
})();
window.PsxUI = PsxUI;
