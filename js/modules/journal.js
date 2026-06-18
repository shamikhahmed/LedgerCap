'use strict';
const Journal = (() => {
  let _editing = null;

  function _form(entry) {
    const e = entry || {};
    return `
    <div class="field"><label class="field-label">Title</label>
      <input class="field-input" id="jr-title" value="${(e.title || '').replace(/"/g, '&quot;')}" placeholder="Investment thesis title"></div>
    <div class="field"><label class="field-label">Symbol (optional)</label>
      <input class="field-input" id="jr-symbol" value="${e.symbol || ''}" placeholder="MEBL"></div>
    <div class="field"><label class="field-label">Thesis</label>
      <textarea class="field-input" id="jr-body" rows="4" placeholder="Why did you make this decision?">${e.body || ''}</textarea></div>
    <div class="field"><label class="field-label">Outcome review</label>
      <textarea class="field-input" id="jr-review" rows="3" placeholder="Was the thesis correct?">${e.review || ''}</textarea></div>
    <button class="os-btn os-btn-primary" style="width:100%;margin-top:8px;" onclick="Journal.save()">Save entry</button>`;
  }

  function openNew() {
    _editing = null;
    App.openBottomSheet('journal-new', 'New Journal Entry', _form());
  }

  function openEdit(id) {
    const entry = (State.get('journal') || []).find(j => j.id === id);
    if (!entry) return;
    _editing = id;
    App.openBottomSheet('journal-edit', 'Edit Entry', _form(entry));
  }

  function save() {
    const title = document.getElementById('jr-title')?.value?.trim();
    const symbol = document.getElementById('jr-symbol')?.value?.trim().toUpperCase();
    const body = document.getElementById('jr-body')?.value?.trim();
    const review = document.getElementById('jr-review')?.value?.trim();
    if (!title && !body) { App.showToast('Add a title or thesis', 'warning'); return; }
    State.update(s => {
      if (_editing) {
        const idx = s.journal.findIndex(j => j.id === _editing);
        if (idx >= 0) s.journal[idx] = { ...s.journal[idx], title, symbol, body, review, updatedAt: Date.now() };
      } else {
        s.journal.push({ id: Ledger.newId(), title, symbol, body, review, createdAt: Date.now(), date: new Date().toISOString().slice(0, 10) });
      }
    });
    App.closeBottomSheet();
    App.showToast('Journal saved', 'success');
    render();
  }

  function remove(id) {
    if (!confirm('Delete this journal entry?')) return;
    State.update(s => { s.journal = s.journal.filter(j => j.id !== id); });
    render();
  }

  function render() {
    const screen = document.getElementById('screen-journal');
    if (!screen) return;
    const entries = [...(State.get('journal') || [])].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    screen.innerHTML = `
    <div class="os-page-header cap-reveal">
      <div class="os-page-title">Investment Journal</div>
      <div class="os-page-sub">Record decisions and review outcomes</div>
    </div>
    <div style="padding:12px 20px;" class="cap-reveal">
      <button class="os-btn os-btn-primary" onclick="Journal.openNew()">+ New entry</button>
    </div>
    ${entries.length ? entries.map(e => `
      <div class="os-card cap-reveal" style="margin:0 20px 12px;cursor:pointer;" onclick="Journal.openEdit('${e.id}')">
        <div style="display:flex;justify-content:space-between;align-items:start;">
          <div>
            <div style="font-weight:700;font-size:1rem;">${e.title || 'Untitled'}</div>
            <div style="font-size:0.72rem;color:var(--os-text-tertiary);margin-top:4px;">${e.date || ''}${e.symbol ? ' · ' + e.symbol : ''}</div>
          </div>
          <button class="os-btn os-btn-ghost" style="padding:4px 8px;font-size:0.7rem;" onclick="event.stopPropagation();Journal.remove('${e.id}')">Delete</button>
        </div>
        ${e.body ? `<p style="font-size:0.85rem;color:var(--os-text-secondary);margin:10px 0 0;line-height:1.5;">${e.body.slice(0, 160)}${e.body.length > 160 ? '…' : ''}</p>` : ''}
        ${e.review ? `<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--os-border);font-size:0.8rem;color:var(--os-gain);">Review: ${e.review.slice(0, 100)}${e.review.length > 100 ? '…' : ''}</div>` : ''}
      </div>`).join('') : `<div class="os-section" style="color:var(--os-text-secondary);">No journal entries yet. Document your investment thesis before you buy.</div>`}
    <div style="height:16px;"></div>`;
    CapMotion.refresh();
  }

  return { render, openNew, openEdit, save, remove };
})();
window.Journal = Journal;
