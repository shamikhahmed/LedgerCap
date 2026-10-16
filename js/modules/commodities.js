'use strict';
const Commodities = (() => {
  let _rows = [];
  let _loading = false;
  let _attempted = false;

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

  function _offlineEmptyHtml() {
    const online = typeof navigator === 'undefined' || navigator.onLine !== false;
    const body = online
      ? 'Commodity spot prices need a network connection to the price Worker. The Worker is unavailable right now — no last-known quotes on this device.'
      : 'You appear offline. Commodity prices need network access to the price Worker — no last-known quotes on this device.';
    return `<div class="lc-empty-state" role="status" aria-live="polite">
      <div class="lc-empty-icon" aria-hidden="true">◇</div>
      <h2>Spot prices unavailable</h2>
      <p>${body}</p>
    </div>`;
  }

  function _staleBannerHtml() {
    const meta = typeof CommoditiesService !== 'undefined' && CommoditiesService.getMeta
      ? CommoditiesService.getMeta()
      : {};
    const when = meta.asOf
      ? new Date(meta.asOf).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' })
      : '';
    return `<div class="lc-cmd-stale" role="status" aria-live="polite">
      <p class="lc-cmd-stale-msg">Showing last-known prices${when ? ` · as of ${when}` : ''}. Live quotes need the price Worker — tap Refresh when network is available.</p>
    </div>`;
  }

  function _listInner() {
    if (_loading && !_rows.length) {
      return `<div role="status" aria-busy="true" aria-label="Loading commodities"><p class="psx-muted">Loading commodities…</p></div>`;
    }
    if (!_rows.length) {
      return _offlineEmptyHtml();
    }
    const meta = typeof CommoditiesService !== 'undefined' && CommoditiesService.getMeta
      ? CommoditiesService.getMeta()
      : { source: 'live' };
    const banner = meta.source === 'last-known' ? _staleBannerHtml() : '';
    return `${banner}${_rows.map(_rowHtml).join('')}`;
  }

  function _goldPillLabel() {
    const settings = (typeof State !== 'undefined' ? State.get('settings') : null) || {};
    const pkrRow = _rows.find((r) => r.id === 'pkr_gold' || r.id === 'gold_24k');
    if (pkrRow?.price > 0) return `${PsxUI.fmt(pkrRow.price)}/g`;
    if (settings.goldPriceSource && settings.goldPricePerGram > 0) {
      return `${PsxUI.fmt(settings.goldPricePerGram)}/g`;
    }
    return '—';
  }

  async function refresh() {
    if (_loading) return;
    _loading = true;
    _attempted = true;
    const list = document.getElementById('commodities-list');
    if (list && !_rows.length) {
      list.innerHTML = `<div role="status" aria-busy="true" aria-label="Refreshing spot prices"><p class="psx-muted">Refreshing spot prices…</p></div>`;
    }
    _rows = await CommoditiesService.fetchAll();
    _loading = false;
    render();
  }

  function render() {
    const screen = document.getElementById('screen-commodities');
    if (!screen) return;
    const usd = FxService.getUsdRate();
    const meta = typeof CommoditiesService !== 'undefined' && CommoditiesService.getMeta
      ? CommoditiesService.getMeta()
      : { source: _rows.length ? 'live' : 'empty' };
    const sub = meta.source === 'last-known'
      ? 'Last-known quotes · Worker unavailable'
      : meta.source === 'empty' && _attempted
        ? 'Prices need network · Worker unavailable'
        : `Gold · silver · oil · USD/PKR ₨${usd.toLocaleString('en-PK', { maximumFractionDigits: 2 })}`;

    screen.innerHTML = PsxUI.lcDash('Commodities', sub, `
      <div class="lc-pulse-row">
        <div class="lc-pulse-pill"><label>USD/PKR</label><b>₨${usd.toLocaleString('en-PK', { maximumFractionDigits: 2 })}</b></div>
        <div class="lc-pulse-pill"><label>PKR gold</label><b>${_goldPillLabel()}</b></div>
      </div>
      <p class="lc-card-sub">Spot from market snapshot (Yahoo futures + derived PKR karats + OGRA). Indicative — not jeweller or pump board prices.</p>
      <div class="lc-sector-card" id="commodities-list">${_listInner()}</div>
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-primary" data-action="Commodities.refresh">Refresh</button>
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="zakat">Zakat calculator →</button>
      </div>
      <div class="lc-disclaimer">Illustrative spot prices — not a trading feed. Verify before zakat or hedging decisions.</div>
    `);

    if (!_attempted && !_loading) refresh();
    CapMotion.refresh();
  }

  return { render, refresh };
})();
window.Commodities = Commodities;
