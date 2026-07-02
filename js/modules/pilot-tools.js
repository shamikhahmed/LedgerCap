'use strict';
const PilotTools = (() => {
  const U = PlatformUI;
  let _tab = 'rebalance';

  function render(target, tab) {
    if (tab) _tab = tab;
    const screen = target || document.getElementById('screen-pilot-tools');
    if (!screen) return;

    const tabs = [
      ['rebalance', 'Rebalance'], ['cgt', 'CGT'], ['screener', 'Screener'],
      ['calculators', 'Calc'], ['ipo', 'IPO'], ['cash', 'Cash'],
    ];

    screen.innerHTML = `
    ${MarketUI.pageHeader('Pilot tools', 'Rebalance & tax', 'CGT · screener · IPO · cash plan')}
    <div class="lc-filter-bar cap-reveal" style="border-top:none">
      ${tabs.map(([id, label]) => `<button type="button" class="lc-view-pill ${_tab === id ? 'active' : ''}" data-action="PilotTools.render" data-tab="${id}">${label}</button>`).join('')}
    </div>
    <div id="pilot-tools-body"></div>
    <div style="height:24px"></div>`;

    const body = document.getElementById('pilot-tools-body');
    if (!body) return;
    const panels = {
      rebalance: _rebalance,
      cgt: _cgt,
      screener: _screener,
      calculators: _calculators,
      ipo: _ipo,
      cash: _cash,
    };
    body.innerHTML = (panels[_tab] || _rebalance)();
    CapMotion.refresh();
  }

  function _rebalance() {
    const plan = PilotEngine.buildRebalancePlan();
    return U.section('Target weight drift', plan.summary) +
      _targetWeightEditor() +
      (plan.rows.length ? plan.rows.map(r => `
        <div class="os-row cap-reveal">
          <div><div class="os-row-sym">${r.symbol}</div>
          <div style="font-size:11px;color:var(--os-text-tertiary)">${r.actual_pct.toFixed(1)}% actual${r.target_pct != null ? ' · target ' + r.target_pct.toFixed(1) + '%' : ''}</div></div>
          <div style="text-align:right"><span class="badge">${r.action}</span>
          ${r.suggested_pkr ? `<div style="font-size:11px;margin-top:4px">~${U.fmt(r.suggested_pkr)}</div>` : ''}</div>
        </div>`).join('') : '<div style="padding:12px;color:var(--os-text-secondary)">Set target % below to enable drift alerts.</div>');
  }

  function _targetWeightEditor() {
    const rows = PortfolioAnalyticsService.getHoldings().filter(h => h.kind === 'stock').slice(0, 24);
    if (!rows.length) return '';
    return U.section('Target weights &amp; CGT dates', `
      <p style="font-size:12px;color:var(--os-text-secondary);margin:0 0 10px;line-height:1.45">Set target % for rebalance ADD/TRIM. Acquisition date improves CGT tier estimates.</p>
      ${rows.map(h => {
        const meta = PilotEngine.holdingMeta(h.symbol, h.broker);
        const tw = meta.targetWeight != null ? meta.targetWeight : '';
        const acq = meta.acquiredAt || '';
        const broker = (h.broker || 'default').replace(/'/g, '');
        return `<div class="os-row cap-reveal" style="flex-wrap:wrap;gap:8px">
          <div class="os-row-sym" style="min-width:64px">${h.symbol}</div>
          <label style="font-size:11px;color:var(--os-text-tertiary)">Target %
            <input type="number" class="field-input" style="width:72px;margin-left:4px;padding:6px 8px" min="0" max="100" step="0.5" value="${tw}" placeholder="—"
              data-action-change="PilotTools.setTarget" data-symbol="${h.symbol}" data-broker="${broker}">
          </label>
          <label style="font-size:11px;color:var(--os-text-tertiary)">Bought
            <input type="date" class="field-input" style="width:130px;margin-left:4px;padding:6px 8px" value="${acq}"
              data-action-change="PilotTools.setAcquired" data-symbol="${h.symbol}" data-broker="${broker}">
          </label>
        </div>`;
      }).join('')}
    `);
  }

  function setTarget(symbol, broker, pct) {
    const v = parseFloat(pct);
    PilotEngine.setHoldingMeta(symbol, broker, { targetWeight: Number.isFinite(v) && v > 0 ? v : null });
    if (window.App?.showToast) App.showToast(`${symbol} target ${v > 0 ? v + '%' : 'cleared'}`, 'ok');
    render(null, 'rebalance');
  }

  function setAcquired(symbol, broker, date) {
    PilotEngine.setHoldingMeta(symbol, broker, { acquiredAt: date || null });
    if (window.App?.showToast) App.showToast(`${symbol} buy date saved`, 'ok');
    render(null, 'rebalance');
  }

  function _cgt() {
    const r = PilotEngine.buildCgtReport();
    return U.section('Capital gains (estimate)', r.disclaimer) +
      `<div style="padding:0 16px 12px;display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" class="btn-sm btn-secondary" data-action="StatementExport.exportCgtPdf">Export CGT PDF</button>
      </div>` +
      U.metricGrid([
        U.metricCell('Unrealized gain', U.fmt(r.total_unrealized_gain)),
        U.metricCell('Est. tax', U.fmt(r.total_estimated_tax)),
        U.metricCell('Short-term lots', String(r.short_term_count)),
        U.metricCell('Missing dates', String(r.lots_missing_date), null, r.lots_missing_date ? 't-loss' : ''),
      ], 2) +
      (r.lots.filter(l => l.pl > 0).map(l => `
        <div class="os-row cap-reveal">
          <div class="os-row-sym">${l.symbol}</div>
          <div style="font-size:12px;text-align:right">
            <div class="${l.pl >= 0 ? 't-gain' : 't-loss'}">${U.fmt(l.pl)}</div>
            <div style="color:var(--os-text-tertiary)">${l.tier}${l.estimated_tax ? ' · tax ' + U.fmt(l.estimated_tax) : ''}</div>
          </div>
        </div>`).join('') || '<div style="padding:12px;color:var(--os-text-secondary)">No taxable unrealized gains.</div>');
  }

  function _screener() {
    return U.section('PSX screener', 'Filter seed fundamentals database') + `
      <div style="padding:0 16px 12px;display:flex;flex-wrap:wrap;gap:8px">
        <button type="button" class="btn-sm btn-secondary" data-action="PilotTools.runScreen" data-payload='{min_yield:6}'>High yield 6%+</button>
        <button type="button" class="btn-sm btn-secondary" data-action="PilotTools.runScreen" data-payload='{max_pe:10}'>Value P/E &lt;10</button>
        <button type="button" class="btn-sm btn-secondary" data-action="PilotTools.runScreen" data-payload='{max_rsi:35}'>RSI oversold</button>
        <button type="button" class="btn-sm btn-secondary" data-action="PilotTools.runScreen" data-payload='{portfolio_only:true}'>My holdings</button>
      </div>
      <div id="screener-results"></div>`;
  }

  function runScreen(filters) {
    const res = PilotEngine.runScreener(filters);
    const el = document.getElementById('screener-results');
    if (!el) return;
    el.innerHTML = U.section(`Results (${res.rows.length} / ${res.scanned})`, res.rows.slice(0, 15).map(r => `
      <div class="os-row cap-reveal" data-action="Research.open" data-symbol="${r.symbol}" style="cursor:pointer">
        <div class="os-row-sym">${r.symbol}${r.in_portfolio ? ' ★' : ''}</div>
        <div style="font-size:12px;text-align:right;color:var(--os-text-secondary)">
          P/E ${r.pe_ratio ?? '—'} · Yld ${r.dividend_yield_pct ?? '—'}% · RSI ${r.rsi_14?.toFixed(0) ?? '—'}
        </div>
      </div>`).join('') || 'No matches.');
    CapMotion.refresh();
  }

  function _calculators() {
    return U.section('Calculators', '') + `
      <div style="padding:0 16px;display:flex;flex-direction:column;gap:12px">
        <button type="button" class="btn-secondary" data-action="PilotTools.calc" data-tab="cagr">CAGR — principal → final value</button>
        <button type="button" class="btn-secondary" data-action="PilotTools.calc" data-tab="position_size">Position size — risk & stop %</button>
        <button type="button" class="btn-secondary" data-action="PilotTools.calc" data-tab="sip_future">SIP future value</button>
        <div id="calc-result" style="font-size:13px;color:var(--os-text-secondary)"></div>
      </div>`;
  }

  function calc(kind) {
    const prompts = {
      cagr: [['Principal ₨', 'principal', 100000], ['Final value ₨', 'final_value', 250000], ['Years', 'years', 5]],
      position_size: [['Risk ₨', 'risk_pkr', 10000], ['Stop loss %', 'stop_loss_pct', 5], ['Price ₨', 'price', 500]],
      sip_future: [['Monthly ₨', 'monthly', 50000], ['Rate %', 'rate_pct', 14], ['Years', 'years', 10]],
    };
    const fields = prompts[kind] || [];
    const input = {};
    for (const [label, key, def] of fields) {
      const v = prompt(label, String(def));
      if (v === null) return;
      input[key] = parseFloat(v) || 0;
    }
    const r = PilotEngine.calculator(kind, input);
    const el = document.getElementById('calc-result');
    if (el) el.innerHTML = `<strong>${r.label}:</strong> ${typeof r.result === 'number' ? r.result.toLocaleString(undefined, { maximumFractionDigits: 2 }) : r.result}<br>${r.detail}`;
  }

  function _ipo() {
    const events = State.get('ipoEvents') || [];
    return U.section('IPO calendar', 'Manual entries — subscription & listing reminders') + `
      <div style="padding:0 16px 12px">
        <button type="button" class="btn-primary btn-sm" data-action="PilotTools.addIpo">+ Add IPO</button>
      </div>` +
      (events.length ? events.map(e => `
        <div class="os-row cap-reveal">
          <div><div class="os-row-sym">${e.company}</div>
          <div style="font-size:11px;color:var(--os-text-tertiary)">${e.symbol || '—'} · ${e.subscription_end || e.listing_date || 'TBD'}</div></div>
          <button type="button" class="btn-ghost btn-sm" aria-label="Delete IPO entry" data-action="PilotTools.delIpo" data-tab="${e.id}">✕</button>
        </div>`).join('') : '<div style="padding:12px 16px;color:var(--os-text-secondary)">No IPO events — add PSX primary offerings you are tracking.</div>');
  }

  function addIpo() {
    const company = prompt('Company name');
    if (!company) return;
    const symbol = prompt('Symbol (optional)') || '';
    const end = prompt('Subscription end (YYYY-MM-DD)', '') || '';
    State.update(s => {
      if (!s.ipoEvents) s.ipoEvents = [];
      s.ipoEvents.push({ id: 'ipo_' + Date.now(), company, symbol: symbol.toUpperCase(), subscription_end: end || null, listing_date: null, notes: '' });
    });
    if (window.App?.showToast) App.showToast('IPO added', 'ok');
    render(null, 'ipo');
  }

  function delIpo(id) {
    State.update(s => { s.ipoEvents = (s.ipoEvents || []).filter(e => e.id !== id); });
    render(null, 'ipo');
  }

  function _cash() {
    const cfg = PilotEngine.settings();
    const entries = State.get('cashLedger') || [];
  const net = entries.reduce((a, e) => a + (e.entry_type === 'withdraw' ? -e.amount : e.amount), 0);
    return U.section('Cash ledger', `Settings cash: ${U.fmt(cfg.cashBalancePkr)} · Ledger net: ${U.fmt(net)}`) +
      `<div style="padding:0 16px 12px"><button type="button" class="btn-sm btn-secondary" data-action="PilotTools.addCash" data-tab="deposit">+ Deposit</button>
      <button type="button" class="btn-sm btn-ghost" data-action="PilotTools.addCash" data-tab="withdraw">− Withdraw</button></div>` +
      (entries.slice(-10).reverse().map(e => `
        <div class="os-row"><div>${e.entry_type}</div><div>${U.fmt(e.amount)}</div></div>`).join('') || '<div style="padding:12px 16px;color:var(--os-text-secondary)">No cash movements logged.</div>');
  }

  function addCash(type) {
    const amount = parseFloat(prompt(type === 'deposit' ? 'Deposit amount ₨' : 'Withdraw amount ₨', '0'));
    if (!amount || amount <= 0) return;
    State.update(s => {
      if (!s.cashLedger) s.cashLedger = [];
      s.cashLedger.push({ id: 'c_' + Date.now(), entry_type: type, amount, entry_at: new Date().toISOString().slice(0, 10), notes: '' });
    });
    render(null, 'cash');
  }

  return { render, runScreen, calc, addIpo, delIpo, addCash, setTarget, setAcquired };
})();
window.PilotTools = PilotTools;
