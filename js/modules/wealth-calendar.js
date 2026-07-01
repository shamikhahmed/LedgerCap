'use strict';
/** Unified wealth calendar — dividends, IPO, corporate actions (rule-based, offline). */
const WealthCalendar = (() => {
  let _month = null;

  function _monthKey(d) {
    return d.toISOString().slice(0, 7);
  }

  function _events(state) {
    state = state || State.get();
    const events = [];

    (typeof DividendService !== 'undefined' ? DividendService.getCalendar() : []).forEach(row => {
      const date = row.exDate || row.paymentDate || row.date;
      if (!date) return;
      events.push({
        date: date.slice(0, 10),
        kind: 'dividend',
        symbol: row.symbol,
        title: `${row.symbol} ex-div`,
        detail: row.amountPerShare ? `₨${Number(row.amountPerShare).toFixed(2)}/sh` : (row.note || 'Dividend'),
        sort: 1,
      });
    });

    (state.ipoEvents || []).forEach(e => {
      const date = e.subscription_end || e.listing_date;
      if (!date) return;
      events.push({
        date: date.slice(0, 10),
        kind: 'ipo',
        symbol: e.symbol || 'IPO',
        title: e.company,
        detail: e.symbol ? `${e.symbol} · subscription` : 'IPO window',
        sort: 0,
      });
    });

    const holdings = new Set((PortfolioAnalyticsService?.getHoldings(state) || []).map(h => h.symbol));
    holdings.forEach(sym => {
      const upcoming = CorporateActionsService?.getUpcomingCash?.(sym) || [];
      upcoming.forEach(u => {
        const date = u.exDate || u.paymentDate;
        if (!date) return;
        events.push({
          date: date.slice(0, 10),
          kind: 'corporate',
          symbol: sym,
          title: `${sym} corporate action`,
          detail: u.type || `₨${Number(u.amountPerShare || 0).toFixed(2)}/sh`,
          sort: 2,
        });
      });
    });

    return events.sort((a, b) => a.date.localeCompare(b.date) || a.sort - b.sort);
  }

  function _monthEvents(events, monthKey) {
    return events.filter(e => e.date.startsWith(monthKey));
  }

  function render() {
    const screen = document.getElementById('screen-calendar');
    if (!screen) return;
    const state = State.get();
    const now = new Date();
    if (!_month) _month = _monthKey(now);
    const events = _events(state);
    const monthEv = _monthEvents(events, _month);
    const [y, m] = _month.split('-').map(Number);
    const label = new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const prev = new Date(y, m - 2, 1);
    const next = new Date(y, m, 1);
    const prevKey = _monthKey(prev);
    const nextKey = _monthKey(next);

    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head">
        <h1>Wealth calendar</h1>
        <p>Dividends · IPO · corporate actions in your portfolio</p>
      </div>
      <div class="lc-filter-bar cap-reveal" style="justify-content:space-between;align-items:center">
        <button type="button" class="btn-ghost btn-sm" onclick="WealthCalendar.setMonth('${prevKey}')">←</button>
        <strong>${label}</strong>
        <button type="button" class="btn-ghost btn-sm" onclick="WealthCalendar.setMonth('${nextKey}')">→</button>
      </div>
      <div class="lc-dash-section">
        ${monthEv.length ? monthEv.map(e => `
          <button type="button" class="lc-market-row cap-reveal" onclick="Research.open('${e.symbol}')">
            <div>
              <div class="lc-market-sym">${e.date.slice(8)} · ${e.title}</div>
              <div class="lc-market-name">${e.kind} · ${e.detail}</div>
            </div>
            <div class="lc-market-chg">${e.symbol}</div>
          </button>`).join('') : '<p class="lc-empty-note">No events this month — check Dividends or add IPO dates in Pilot Tools.</p>'}
      </div>
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-ghost" onclick="Navigation.go('dividends')">Dividends</button>
        <button type="button" class="psx-btn psx-btn-ghost" onclick="Navigation.go('pilot-tools')">IPO calendar</button>
      </div>
    </div>`;
    CapMotion.refresh();
  }

  function setMonth(key) {
    _month = key;
    render();
  }

  return { render, setMonth, _events };
})();
window.WealthCalendar = WealthCalendar;
