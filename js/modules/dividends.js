'use strict';
const Dividends = (() => {
  const U = PlatformUI;

  function render() {
    const screen = document.getElementById('screen-dividends');
    if (!screen) return;
    const port = DividendService.getPortfolioDividends();
    const upcoming = DividendService.getUpcoming();
    const calendar = DividendService.getCalendar();
    const bySym = DividendService.loggedBySymbol();
    const entries = Object.entries(bySym).filter(([k]) => k !== '_general').sort((a, b) => b[1] - a[1]);

    screen.innerHTML = `
    <div class="os-page-header cap-reveal">
      <div class="os-page-title">Dividend Center</div>
      <div class="os-page-sub">Income tracking & calendar</div>
    </div>

    ${U.section('', U.metricGrid([
      U.metricCell('Annual Income', U.fmt(port.annual), String(new Date().getFullYear())),
      U.metricCell('Monthly Income', U.fmt(port.monthly), 'This month'),
      U.metricCell('Lifetime', U.fmt(port.total), port.count + ' payments'),
      U.metricCell('Portfolio Yield', U.fmt(port.yieldOnPortfolio, { pct: true }), 'On cost basis'),
    ], 4))}

    ${upcoming.length ? U.section('Upcoming Dividends', `
      <div class="rt-div-calendar">
      ${upcoming.map(u => `
        <div class="rt-div-event cap-reveal" onclick="Research.open('${u.symbol}')">
          <div><strong>${u.symbol}</strong><div style="font-size:0.72rem;color:var(--os-text-tertiary)">${u.date} · ${u.shares ? u.shares + ' shares' : 'not held'}</div></div>
          <div style="text-align:right;"><div class="t-gain">${U.fmt(u.estTotal || u.estAmount)}</div><div style="font-size:0.68rem;">₨${u.estAmount}/sh est.</div></div>
        </div>`).join('')}
      </div>`) : ''}

    ${Object.keys(calendar).length ? U.section('Dividend Calendar', Object.entries(calendar).map(([month, items]) => `
      <div style="margin-bottom:12px;"><div style="font-weight:700;font-size:0.85rem;margin-bottom:6px;">${new Date(month + '-01').toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}</div>
      ${items.map(u => `<div class="rt-div-event"><span>${u.symbol}</span><span class="t-gain">${u.date}</span></div>`).join('')}
      </div>`).join('')) : ''}

    ${U.section('Received by Symbol', entries.length ? `
      <div class="rt-table-wrap"><table class="rt-table"><thead><tr><th>Symbol</th><th>Received</th><th>Yield on Cost</th><th>Growth</th></tr></thead><tbody>
      ${entries.map(([sym, amt]) => {
        const h = Ledger.calcHoldings(State.get('transactions') || []).find(x => x.symbol === sym);
        const yoc = h ? DividendService.getYieldOnCost(sym, h.avgCost, h.shares) : null;
        const gr = DividendService.getDividendGrowth(sym);
        return `<tr onclick="Research.open('${sym}')"><td><strong>${sym}</strong></td><td class="t-gain">${U.fmt(amt)}</td><td>${yoc ? yoc.toFixed(1) + '%' : '—'}</td><td>${gr != null ? gr.toFixed(1) + '%' : '—'}</td></tr>`;
      }).join('')}
      </tbody></table></div>` : '<div style="color:var(--os-text-secondary);font-size:0.85rem;">No dividends logged yet.</div>')}
    <div style="height:20px;"></div>`;
    CapMotion.refresh();
  }

  return { render };
})();
window.Dividends = Dividends;
