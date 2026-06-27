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
    <div class="os-page-header cap-reveal">
      <div class="os-page-title">Pilot Tools</div>
      <div class="os-page-sub">From Portfolio Pilot — rebalance, tax, screen & plan</div>
    </div>
    <div class="home-filters cap-reveal" style="padding:0 16px 12px;overflow-x:auto;display:flex;gap:8px">
      ${tabs.map(([id, label]) => `<button class="home-view-btn ${_tab === id ? 'active' : ''}" onclick="PilotTools.render(null,'${id}')">${label}</button>`).join('')}
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
      (plan.rows.length ? plan.rows.map(r => `
        <div class="os-row cap-reveal">
          <div><div class="os-row-sym">${r.symbol}</div>
          <div style="font-size:11px;color:var(--os-text-tertiary)">${r.actual_pct.toFixed(1)}% actual${r.target_pct != null ? ' · target ' + r.target_pct.toFixed(1) + '%' : ''}</div></div>
          <div style="text-align:right"><span class="badge">${r.action}</span>
          ${r.suggested_pkr ? `<div style="font-size:11px;margin-top:4px">~${U.fmt(r.suggested_pkr)}</div>` : ''}</div>
        </div>`).join('') : '<div style="padding:12px;color:var(--os-text-secondary)">Set target weights in Signals → book tags (coming: per-symbol targets in holdings).</div>') +
      `<div style="padding:12px 16px;font-size:12px;color:var(--os-text-tertiary)">Tip: assign <code>targetWeight</code> in holding meta via Settings → Pilot for drift alerts.</div>`;
  }

  function _cgt() {
    const r = PilotEngine.buildCgtReport();
    return U.section('Capital gains (estimate)', r.disclaimer) +
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
        <button class="btn-sm btn-secondary" onclick="PilotTools.runScreen({min_yield:6})">High yield 6%+</button>
        <button class="btn-sm btn-secondary" onclick="PilotTools.runScreen({max_pe:10})">Value P/E &lt;10</button>
        <button class="btn-sm btn-secondary" onclick="PilotTools.runScreen({max_rsi:35})">RSI oversold</button>
        <button class="btn-sm btn-secondary" onclick="PilotTools.runScreen({portfolio_only:true})">My holdings</button>
      </div>
      <div id="screener-results"></div>`;
  }

  function runScreen(filters) {
    const res = PilotEngine.runScreener(filters);
    const el = document.getElementById('screener-results');
    if (!el) return;
    el.innerHTML = U.section(`Results (${res.rows.length} / ${res.scanned})`, res.rows.slice(0, 15).map(r => `
      <div class="os-row cap-reveal" onclick="Research.open('${r.symbol}')" style="cursor:pointer">
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
        <button class="btn-secondary" onclick="PilotTools.calc('cagr')">CAGR — principal → final value</button>
        <button class="btn-secondary" onclick="PilotTools.calc('position_size')">Position size — risk & stop %</button>
        <button class="btn-secondary" onclick="PilotTools.calc('sip_future')">SIP future value</button>
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
        <button class="btn-primary btn-sm" onclick="PilotTools.addIpo()">+ Add IPO</button>
      </div>` +
      (events.length ? events.map(e => `
        <div class="os-row cap-reveal">
          <div><div class="os-row-sym">${e.company}</div>
          <div style="font-size:11px;color:var(--os-text-tertiary)">${e.symbol || '—'} · ${e.subscription_end || e.listing_date || 'TBD'}</div></div>
          <button class="btn-ghost btn-sm" onclick="PilotTools.delIpo('${e.id}')">✕</button>
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
      `<div style="padding:0 16px 12px"><button class="btn-sm btn-secondary" onclick="PilotTools.addCash('deposit')">+ Deposit</button>
      <button class="btn-sm btn-ghost" onclick="PilotTools.addCash('withdraw')">− Withdraw</button></div>` +
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

  return { render, runScreen, calc, addIpo, delIpo, addCash };
})();
window.PilotTools = PilotTools;
