'use strict';
const Watchlist = (() => {
  const U = PlatformUI;

  function _form(item) {
    const w = item || {};
    return `
    <div class="field"><label class="field-label">Symbol</label><input class="field-input" id="wl-symbol" value="${w.symbol || ''}"></div>
    <div class="field"><label class="field-label">Name</label><input class="field-input" id="wl-name" value="${w.name || ''}"></div>
    <div class="field"><label class="field-label">Thesis</label><textarea class="field-input" id="wl-thesis" rows="3">${w.thesis || ''}</textarea></div>
    <div class="field"><label class="field-label">Target price</label><input class="field-input" id="wl-target" type="number" value="${w.targetPrice || ''}"></div>
    <button type="button" class="os-btn os-btn-primary" style="width:100%;margin-top:8px;" onclick="Watchlist.save('${w.id || ''}')">Save</button>`;
  }

  function openAdd() { App.openBottomSheet('watchlist-add', 'Add to Watchlist', _form()); }
  function openEdit(id) { const item = (State.get('watchlist') || []).find(w => w.id === id); if (item) App.openBottomSheet('watchlist-edit', 'Edit', _form(item)); }

  function save(id) {
    const symbol = document.getElementById('wl-symbol')?.value?.trim().toUpperCase();
    if (!symbol) return App.showToast('Symbol required', 'warning');
    const entry = {
      symbol, name: document.getElementById('wl-name')?.value?.trim() || symbol,
      thesis: document.getElementById('wl-thesis')?.value?.trim() || '',
      targetPrice: parseFloat(document.getElementById('wl-target')?.value) || 0,
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
    <div class="lc-screen-head"><h1>Watchlist</h1><p>${list.length} symbols · fair value &amp; upside</p></div>
    <div class="lc-dash-actions cap-reveal"><button type="button" class="lc-btn-primary" onclick="Watchlist.openAdd()">+ Add symbol</button></div>
    ${list.length ? list.map(w => {
      const quote = MarketDataService.getQuote(w.symbol);
      const ai = AIAnalysis.analyze(w.symbol);
      const upside = quote.price > 0 ? ((ai.fairValue - quote.price) / quote.price * 100) : 0;
      return `
      <div class="rt-wl-card cap-reveal" onclick="Research.open('${w.symbol}')">
        <div>
          <div style="font-weight:700;font-size:1rem;">${w.symbol} ${U.ratingBadge(ai.action)}</div>
          <div style="font-size:0.72rem;color:var(--os-text-tertiary);margin-top:4px;">${w.name}${w.thesis ? ' · ' + w.thesis.slice(0, 50) : ''}</div>
          <div style="display:flex;gap:12px;margin-top:8px;font-size:0.78rem;">
            <span>Fair: <strong>${U.fmt(ai.fairValue)}</strong></span>
            <span class="${U.chgCls(upside)}">Upside ${upside >= 0 ? '+' : ''}${upside.toFixed(0)}%</span>
            <span>Risk: ${ai.riskScore}</span>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:700;font-size:1.1rem;">${U.fmt(quote.price)}</div>
          <div class="${U.chgCls(quote.changePct)}" style="font-size:0.78rem;">${quote.changePct >= 0 ? '+' : ''}${quote.changePct.toFixed(2)}%</div>
        </div>
      </div>
      <div style="padding:0 20px 8px;display:flex;gap:8px;">
        <button type="button" class="os-btn os-btn-ghost" style="font-size:0.72rem;padding:6px 10px;" onclick="event.stopPropagation();Watchlist.openEdit('${w.id}')">Edit</button>
        <button type="button" class="os-btn os-btn-ghost" style="font-size:0.72rem;padding:6px 10px;" onclick="event.stopPropagation();Watchlist.remove('${w.id}')">Remove</button>
      </div>`;
    }).join('') : `<div class="lc-empty-note">Empty watchlist. Track symbols before you buy.</div>`}
    </div>`;
    CapMotion.refresh();
  }

  return { render, openAdd, openEdit, save, remove };
})();
window.Watchlist = Watchlist;
