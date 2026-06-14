'use strict';
const Watchlist = (() => {

  function _form(item) {
    const w = item || {};
    return `
    <div class="field"><label class="field-label">Symbol</label>
      <input class="field-input" id="wl-symbol" value="${w.symbol || ''}" placeholder="MEBL"></div>
    <div class="field"><label class="field-label">Name</label>
      <input class="field-input" id="wl-name" value="${w.name || ''}" placeholder="Meezan Bank"></div>
    <div class="field"><label class="field-label">Thesis</label>
      <textarea class="field-input" id="wl-thesis" rows="3">${w.thesis || ''}</textarea></div>
    <div class="field"><label class="field-label">Target price</label>
      <input class="field-input" id="wl-target" type="number" value="${w.targetPrice || ''}"></div>
    <div class="field"><label class="field-label">Priority</label>
      <select class="field-select" id="wl-priority">
        <option value="HIGH" ${w.priority === 'HIGH' ? 'selected' : ''}>High</option>
        <option value="MEDIUM" ${w.priority === 'MEDIUM' ? 'selected' : ''}>Medium</option>
        <option value="LOW" ${w.priority === 'LOW' ? 'selected' : ''}>Low</option>
      </select></div>
    <button class="os-btn os-btn-primary" style="width:100%;margin-top:8px;" onclick="Watchlist.save('${w.id || ''}')">Save</button>`;
  }

  function openAdd() {
    App.openBottomSheet('Add to Watchlist', _form());
  }

  function openEdit(id) {
    const item = (State.get('watchlist') || []).find(w => w.id === id);
    if (!item) return;
    App.openBottomSheet('Edit Watchlist', _form(item));
  }

  function save(id) {
    const symbol = document.getElementById('wl-symbol')?.value?.trim().toUpperCase();
    if (!symbol) { App.showToast('Symbol required', 'warning'); return; }
    const entry = {
      symbol,
      name: document.getElementById('wl-name')?.value?.trim() || symbol,
      thesis: document.getElementById('wl-thesis')?.value?.trim() || '',
      targetPrice: parseFloat(document.getElementById('wl-target')?.value) || 0,
      priority: document.getElementById('wl-priority')?.value || 'MEDIUM',
    };
    State.update(s => {
      if (id) {
        const idx = s.watchlist.findIndex(w => w.id === id);
        if (idx >= 0) s.watchlist[idx] = { ...s.watchlist[idx], ...entry, updatedAt: Date.now() };
      } else {
        s.watchlist.push({ ...entry, id: Ledger.newId(), addedAt: Date.now() });
      }
    });
    App.closeBottomSheet();
    render();
  }

  function remove(id) {
    State.update(s => { s.watchlist = s.watchlist.filter(w => w.id !== id); });
    render();
  }

  function render() {
    const screen = document.getElementById('screen-watchlist');
    if (!screen) return;
    const list = [...(State.get('watchlist') || [])].sort((a, b) => {
      const p = { HIGH: 0, MEDIUM: 1, LOW: 2 };
      return (p[a.priority] || 1) - (p[b.priority] || 1);
    });

    screen.innerHTML = `
    <div class="os-page-header cap-reveal">
      <div class="os-page-title">Watchlist</div>
      <div class="os-page-sub">Stocks you're tracking</div>
    </div>
    <div style="padding:12px 20px;" class="cap-reveal">
      <button class="os-btn os-btn-primary" onclick="Watchlist.openAdd()">+ Add symbol</button>
    </div>
    ${list.length ? list.map(w => {
      const price = State.getPrice(w.symbol) || (window.FALLBACK_PRICES || {})[w.symbol] || 0;
      const upside = w.targetPrice && price ? ((w.targetPrice - price) / price * 100) : null;
      return `
      <div class="os-row cap-reveal" onclick="Navigation.go('research');Research.open('${w.symbol}')">
        <div>
          <div class="os-row-sym">${w.symbol}</div>
          <div class="os-row-sub">${w.name} · ${w.priority}${w.thesis ? ' · ' + w.thesis.slice(0, 40) : ''}</div>
        </div>
        <div style="text-align:right;">
          <div class="os-row-val">${price ? '₨' + price.toLocaleString() : '—'}</div>
          ${upside != null ? `<div class="os-row-sub ${upside >= 0 ? 't-gain' : 't-loss'}">Target ${upside >= 0 ? '+' : ''}${upside.toFixed(0)}%</div>` : ''}
        </div>
      </div>
      <div style="padding:0 20px 8px;display:flex;gap:8px;">
        <button class="os-btn os-btn-ghost" style="font-size:0.72rem;padding:6px 10px;" onclick="event.stopPropagation();Watchlist.openEdit('${w.id}')">Edit</button>
        <button class="os-btn os-btn-ghost" style="font-size:0.72rem;padding:6px 10px;" onclick="event.stopPropagation();Watchlist.remove('${w.id}')">Remove</button>
      </div>`;
    }).join('') : `<div class="os-section" style="color:var(--os-text-secondary);">Watchlist empty. Add symbols you want to research.</div>`}
    <div style="height:16px;"></div>`;
    CapMotion.refresh();
  }

  return { render, openAdd, openEdit, save, remove };
})();
window.Watchlist = Watchlist;
