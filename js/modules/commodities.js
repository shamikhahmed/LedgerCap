'use strict';
const Commodities = (() => {
  let _rows = [];
  let _loading = false;

  function _rowHtml(r) {
    const chgCls = (r.id === 'pkr_gold' && !r.manual) ? PsxUI.chgCls(r.changePct || 0) : (r.manual ? '' : PsxUI.chgCls(r.changePct || 0));
    const sign = (r.changePct || 0) > 0 ? '+' : '';
    const priceLabel = r.manual && r.id !== 'pkr_gold'
      ? PsxUI.fmt(r.price) + '/g'
      : r.id === 'pkr_gold'
        ? PsxUI.fmt(r.price) + '/g'
        : `$${Number(r.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const chgLabel = r.id === 'pkr_gold'
      ? (r.label || 'Auto')
      : r.manual ? 'Manual' : sign + Number(r.changePct || 0).toFixed(2) + '%';
    return `<button type="button" class="lc-market-row" ${r.id === 'pkr_gold' ? 'data-nav="settings"' : ''}>
      <div><div class="lc-market-sym">${r.symbol}</div><div class="lc-market-name">${r.name}</div></div>
      <div class="lc-market-price">${priceLabel}</div>
      <div class="lc-market-meta ${chgCls}">${chgLabel}</div>
    </button>`;
  }

  async function refresh() {
    if (_loading) return;
    _loading = true;
    const list = document.getElementById('commodities-list');
    if (list) list.innerHTML = '<p class="psx-muted">Refreshing spot prices…</p>';
    _rows = await CommoditiesService.fetchAll();
    _loading = false;
    render();
  }

  function render() {
    const screen = document.getElementById('screen-commodities');
    if (!screen) return;
    const usd = FxService.getUsdRate();
    const listInner = _rows.length
      ? _rows.map(_rowHtml).join('')
      : '<p class="psx-muted">Loading commodities…</p>';

    screen.innerHTML = PsxUI.lcDash('Commodities', `Gold · silver · oil · USD/PKR ₨${usd.toLocaleString('en-PK', { maximumFractionDigits: 2 })}`, `
      <div class="lc-pulse-row">
        <div class="lc-pulse-pill"><label>USD/PKR</label><b>₨${usd.toLocaleString('en-PK', { maximumFractionDigits: 2 })}</b></div>
        <div class="lc-pulse-pill"><label>PKR gold</label><b>${PsxUI.fmt((State.get('settings') || {}).goldPricePerGram || 18000)}/g</b></div>
      </div>
      <p class="lc-card-sub">Spot via worker snapshot (Yahoo futures + derived PKR karats + OGRA). Indicative — not jeweller or pump board prices.</p>
      <div class="lc-sector-card" id="commodities-list">${listInner}</div>
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-primary" data-action="Commodities.refresh">Refresh</button>
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="zakat">Zakat calculator →</button>
      </div>
      <div class="lc-disclaimer">Illustrative spot prices — not a trading feed. Verify before zakat or hedging decisions.</div>
    `);

    if (!_rows.length && !_loading) refresh();
    CapMotion.refresh();
  }

  return { render, refresh };
})();
window.Commodities = Commodities;
