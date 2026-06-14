'use strict';
const Dividends = (() => {
  function fmt(n) {
    if (n == null || isNaN(n)) return '—';
    if (Math.abs(n) >= 1e5) return '₨' + (n / 1e5).toFixed(2) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function render() {
    const screen = document.getElementById('screen-dividends');
    if (!screen) return;
    const state = State.get();
    const total = State.getTotalDividends();
    const bySym = State.dividendsBySymbol();
    const entries = Object.entries(bySym).filter(([k]) => k !== '_general').sort((a, b) => b[1] - a[1]);
    const txs = (state.transactions || []).filter(t => t.type === 'DIVIDEND').sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    screen.innerHTML = `
    <div class="os-page-header cap-reveal">
      <div class="os-page-title">Dividends</div>
      <div class="os-page-sub">Income from your portfolio</div>
    </div>
    <div class="os-hero cap-reveal" style="padding-top:16px;">
      <div class="os-hero-label">Total Dividend Income</div>
      <div class="os-hero-value" style="font-size:2.4rem;">${fmt(total)}</div>
    </div>
    <div class="os-section cap-reveal">
      <div class="os-section-title">By Symbol</div>
      ${entries.length ? entries.map(([sym, amt]) => `
        <div class="os-row" onclick="Navigation.go('research');Research.open('${sym}')">
          <div><div class="os-row-sym">${sym}</div></div>
          <div class="os-row-val t-gain">${fmt(amt)}</div>
        </div>`).join('') : '<div style="color:var(--os-text-secondary);font-size:0.85rem;">No dividends logged yet.</div>'}
    </div>
    <div class="os-section cap-reveal">
      <div class="os-section-title">Recent Payments</div>
      ${txs.slice(0, 12).map(t => `
        <div class="os-row">
          <div>
            <div class="os-row-sym">${t.symbol || 'General'}</div>
            <div class="os-row-sub">${t.date || ''}</div>
          </div>
          <div class="os-row-val t-gain">${fmt(t.amount)}</div>
        </div>`).join('') || '<div style="color:var(--os-text-secondary);">—</div>'}
    </div>`;
    CapMotion.refresh();
  }

  return { render };
})();
window.Dividends = Dividends;
