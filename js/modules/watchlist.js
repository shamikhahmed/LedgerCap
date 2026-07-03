'use strict';
const Watchlist = (() => {
  const U = PlatformUI;

  function _form(item) {
    const w = item || {};
    return `
    <div class="field"><label class="field-label">Symbol</label><input class="field-input" id="wl-symbol" value="${w.symbol || ''}"></div>
    <div class="field"><label class="field-label">Name</label><input class="field-input" id="wl-name" value="${w.name || ''}"></div>
    <div class="field"><label class="field-label">Thesis</label><textarea class="field-input" id="wl-thesis" rows="3">${w.thesis || ''}</textarea></div>
    <div class="field"><label class="field-label">Alert target price (PKR)</label><input class="field-input" id="wl-target" type="number" step="0.01" value="${w.targetPrice || ''}" placeholder="Buy below this price"></div>
    <label class="lc-check-row"><input type="checkbox" id="wl-alert" ${w.alertEnabled !== false ? 'checked' : ''}> Alert on crossover ≤ target (PSX session)</label>
    <button type="button" class="os-btn os-btn-primary" style="width:100%;margin-top:8px;" data-action="Watchlist.save" data-tab="${w.id || ''}">Save</button>`;
  }

  function openAdd() { App.requestAlertPermission?.(); App.openBottomSheet('watchlist-add', 'Add to Watchlist', _form()); }
  function openEdit(id) { const item = (State.get('watchlist') || []).find(w => w.id === id); if (item) App.openBottomSheet('watchlist-edit', 'Edit', _form(item)); }

  function save(id) {
    const symbol = document.getElementById('wl-symbol')?.value?.trim().toUpperCase();
    if (!symbol) return App.showToast('Symbol required', 'warning');
    const targetPrice = parseFloat(document.getElementById('wl-target')?.value) || 0;
    const alertEnabled = document.getElementById('wl-alert')?.checked !== false;
    if (alertEnabled && targetPrice > 0) App.requestAlertPermission?.();
    const entry = {
      symbol, name: document.getElementById('wl-name')?.value?.trim() || symbol,
      thesis: document.getElementById('wl-thesis')?.value?.trim() || '',
      targetPrice,
      alertEnabled,
      priority: 'MEDIUM',
    };
    State.update(s => {
      if (id) { const i = s.watchlist.findIndex(w => w.id === id); if (i >= 0) s.watchlist[i] = { ...s.watchlist[i], ...entry }; }
      else s.watchlist.push({ ...entry, id: Ledger.newId(), addedAt: Date.now() });
    });
    App.closeBottomSheet(); render();
  }

  function remove(id) { State.update(s => { s.watchlist = s.watchlist.filter(w => w.id !== id); }); render(); }

  function render() {
    const screen = document.getElementById('screen-watchlist');
    if (!screen) return;
    const list = State.get('watchlist') || [];

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Watchlist</h1><p>${list.length} symbols · alerts when target hit</p></div>
    <div class="lc-dash-actions cap-reveal"><button type="button" class="lc-btn-primary" data-action="Watchlist.openAdd">+ Add symbol</button></div>
    ${list.length ? list.map(w => {
      const quote = MarketDataService.getQuote(w.symbol);
      const ai = AIAnalysis.analyze(w.symbol);
      const upside = quote.price > 0 ? ((ai.fairValue - quote.price) / quote.price * 100) : 0;
      const alertHit = w.targetPrice > 0 && quote.price > 0 && quote.price <= w.targetPrice;
      return `
      <div class="rt-wl-card cap-reveal${alertHit ? ' lc-alert-hit' : ''}">
        <div class="rt-wl-card-main" data-action="Research.open" data-symbol="${w.symbol}">
          <div class="rt-wl-head">
            <strong>${w.symbol}</strong>
            ${U.ratingBadge(ai.action)}
            ${alertHit ? '<span class="lc-alert-badge">Target hit</span>' : ''}
          </div>
          <div class="lc-card-sub">${w.name}${w.thesis ? ' · ' + w.thesis.slice(0, 50) : ''}</div>
          <div class="lc-card-meta">
            <span>Fair: <strong>${U.fmt(ai.fairValue)}</strong></span>
            <span class="${U.chgCls(upside)}">Upside ${U.fmt(upside, { pct: true, signed: true })}</span>
            ${w.targetPrice ? `<span>Target ${U.fmt(w.targetPrice)}</span>` : ''}
          </div>
        </div>
        <div class="rt-wl-price" data-action="Research.open" data-symbol="${w.symbol}">
          <div class="rt-wl-price-val">${U.fmt(quote.price)}</div>
          <div class="${U.chgCls(quote.changePct)} rt-wl-price-chg">${U.fmt(quote.changePct, { pct: true, signed: true })}</div>
          <div class="lc-card-sub">${Prices.sourceLabel?.(quote.source) || quote.source || ''}</div>
        </div>
        <div class="rt-wl-foot">
          <button type="button" class="os-btn os-btn-ghost rt-wl-foot-btn" data-action="Watchlist.openEdit" data-tab="${w.id}" data-stop="1">Edit</button>
          <button type="button" class="os-btn os-btn-ghost rt-wl-foot-btn" data-action="Watchlist.remove" data-tab="${w.id}" data-stop="1">Remove</button>
        </div>
      </div>`;
    }).join('') : `<div class="lc-empty-note">Empty watchlist. Track symbols before you buy.</div>`}
    </div>`;
    CapMotion.refresh();
  }

  return { render, openAdd, openEdit, save, remove };
})();
window.Watchlist = Watchlist;
