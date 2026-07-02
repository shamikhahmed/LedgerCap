'use strict';
const WhatsNew = (() => {
  const NOTES = {
    '3.46.0': [
      'Undo last transaction (10s toast)',
      'Per-holding price refresh (↻ on cards)',
      'Cloud encrypted backup push/restore',
      'Hub rebalance summary card',
      'Urdu nav clip fixes',
    ],
    '3.45.0': [
      'Portfolio: search, sort, cards/table toggle, Sell shortcut',
      'Import CSV preview before merge',
      'Hub: market status, CGT & paper trade shortcuts',
      'PIN-encrypted backup export',
      'Update banner when new version live',
    ],
  };

  function maybeShow() {
    const v = window.LEDGERCAP_VERSION?.app || '';
    if (!v || !NOTES[v]) return;
    const seen = localStorage.getItem('lc_seen_version');
    if (seen === v) return;
    localStorage.setItem('lc_seen_version', v);
    const items = NOTES[v].map((t) => `<li>${t}</li>`).join('');
    const el = document.createElement('div');
    el.id = 'lc-whats-new';
    el.className = 'lc-whats-new';
    el.innerHTML = `
      <div class="lc-whats-new-card" role="dialog" aria-modal="true" aria-label="What's new">
        <h2>What's new · v${v}</h2>
        <ul>${items}</ul>
        <button type="button" class="psx-btn psx-btn-primary" data-action="WhatsNew.dismiss">Got it</button>
      </div>`;
    document.body.appendChild(el);
  }

  function dismiss() {
    document.getElementById('lc-whats-new')?.remove();
  }

  return { maybeShow, dismiss };
})();
window.WhatsNew = WhatsNew;
