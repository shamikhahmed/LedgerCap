'use strict';
/** CSP-safe delegated UI actions — replaces inline onclick handlers. */
const LcEvents = (() => {
  const _segmentMap = {};

  function registerSegment(ns, fn) {
    if (ns && typeof fn === 'function') _segmentMap[ns] = fn;
  }

  function _parsePayload(el) {
    const raw = el.dataset.payload;
    if (!raw) return null;
    try { return JSON.parse(raw.replace(/&#39;/g, "'")); } catch { return null; }
  }

  function _call(path, el, ev) {
    const parts = path.split('.');
    let ctx = window;
    for (let i = 0; i < parts.length - 1; i++) ctx = ctx[parts[i]];
    const fn = ctx?.[parts[parts.length - 1]];
    if (typeof fn !== 'function') return false;
    if (el.dataset.stop) ev.stopPropagation();
    const sym = el.dataset.symbol || el.dataset.sym;
    const tab = el.dataset.tab || el.dataset.navTab || el.dataset.value;
    const mode = el.dataset.mode;
    const broker = el.dataset.broker;
    const payload = _parsePayload(el);

    if (path === 'Navigation.go') fn.call(ctx, tab || el.dataset.nav, false, {});
    else if (path === 'Research.open') fn.call(ctx, sym);
    else if (path === 'Research.pickSymbol') fn.call(ctx, sym);
    else if (path === 'Research.setMode') fn.call(ctx, mode);
    else if (path === 'Research._onSearch') fn.call(ctx, el.value);
    else if (path === 'PilotTools.render') fn.call(ctx, null, tab || el.dataset.value);
    else if (path === 'PilotTools.runScreen') fn.call(ctx, payload || {});
    else if (path === 'PilotTools.calc') fn.call(ctx, tab);
    else if (path === 'PilotTools.setTarget') fn.call(ctx, sym, broker, el.value);
    else if (path === 'PilotTools.setAcquired') fn.call(ctx, sym, broker, el.value);
    else if (path === 'Announcements.setTab') fn.call(ctx, tab || el.dataset.value);
    else if (path === 'Commodities.refresh') fn.call(ctx);
    else if (path === 'Global.setTab') fn.call(ctx, tab || el.dataset.value);
    else if (path === 'Dividends.toggleDrip') fn.call(ctx, sym, el.checked);
    else if (path === 'App.openAddTransaction') fn.call(ctx);
    else if (path === 'App.openAddPortfolio') fn.call(ctx);
    else if (path === 'App.closeBottomSheet') fn.call(ctx);
    else if (path === 'App.refreshPrices') fn.call(ctx);
    else if (path === 'App.dismissDemo') fn.call(ctx);
    else if (path === 'App.toggleDisplayCurrency') fn.call(ctx);
    else if (path === 'App.openPriceAlert') fn.call(ctx, sym);
    else if (path === 'PaperTrade.setTab') window.PaperTrade?.setTab(tab || el.dataset.value);
    else if (path === 'PaperTrade.openBuy') window.PaperTrade?.openBuy(sym);
    else if (path === 'PaperTrade.openSellRow') window.PaperTrade?.openSellRow(el);
    else if (path === 'PaperTrade._submitBuy') window.PaperTrade?._submitBuy();
    else if (path === 'PaperTrade._submitSell') window.PaperTrade?._submitSell(el);
    else if (path === 'PaperTrade.resetLedger') window.PaperTrade?.resetLedger();
    else if (path === 'LcTerminal.toggle') window.LcTerminal?.toggle();
    else if (path === 'LcEvents.closeProModal') document.getElementById('proUpgradeModal')?.classList.remove('open');
    else if (path === 'openProUpgrade') window.openProUpgrade?.();
    else if (path === 'window.toggleTheme') window.toggleTheme?.();
    else if (path === 'StatementExport.exportCgtPdf') StatementExport?.exportCgtPdf?.();
    else if (path === 'StatementExport.exportHtml') StatementExport?.exportHtml?.();
    else if (path === 'StatementExport.exportCsv') StatementExport?.exportCsv?.();
    else if (path === 'Watchlist.openAdd') window.Watchlist?.openAdd();
    else if (path === 'Journal.openNew') window.Journal?.openNew();
    else if (path === 'LcPolish.openCmdk') window.LcPolish?.openCmdk();
    else if (path === 'Performance.setTab') window.Performance?.setTab(tab);
    else if (path === 'Performance.setHistRange') window.Performance?.setHistRange(tab);
    else if (path === 'Navigation.goResearchIntel') {
      Research?.setMode?.('portfolio');
      Navigation.go('research', false, { portfolioIntel: true });
    }
    else if (path === 'Hub.openPortfolio') Hub?.openPortfolio?.(tab);
    else if (path === 'App.deletePortfolio') App?.deletePortfolio?.(tab);
    else if (path === 'App.openAddForPortfolio') App?.openAddForPortfolio?.(tab);
    else if (path === 'App._submitPriceAlert') App?._submitPriceAlert?.(sym);
    else if (path === 'PortfolioScreen.reconcile') PortfolioScreen?.reconcile?.(sym, broker, mode);
    else if (path === 'Transactions.openSymbol') Transactions?.openSymbol?.(sym);
    else if (path === 'Signals.setBook') Signals?.setBook?.(sym, broker, tab);
    else if (path === 'Watchlist.save') Watchlist?.save?.(tab);
    else if (path === 'Watchlist.openEdit') Watchlist?.openEdit?.(tab);
    else if (path === 'Watchlist.remove') Watchlist?.remove?.(tab);
    else if (path === 'Journal.remove') Journal?.remove?.(tab);
    else if (path === 'PriceHealth.dismiss') PriceHealth?.dismiss?.();
    else if (path === 'App.loadDemo') App?.loadDemo?.();
    else fn.call(ctx, el, ev);
    return true;
  }

  function _onClick(ev) {
    const ext = ev.target.closest('[data-external-url]');
    if (ext?.dataset.externalUrl) {
      ev.preventDefault();
      window.open(ext.dataset.externalUrl, '_blank', 'noopener');
      return;
    }
    const nav = ev.target.closest('[data-nav]');
    if (nav?.dataset.nav && window.Navigation) {
      ev.preventDefault();
      Navigation.go(nav.dataset.nav);
      return;
    }
    const act = ev.target.closest('[data-action]');
    if (!act?.dataset.action) return;
    const action = act.dataset.action;
    if (action.includes('.')) {
      ev.preventDefault();
      _call(action, act, ev);
      return;
    }
    const seg = act.closest('[data-segment]');
    if (seg && _segmentMap[seg.dataset.segment]) {
      ev.preventDefault();
      _segmentMap[seg.dataset.segment](action);
    }
  }

  function _onChange(ev) {
    const el = ev.target;
    if (el.dataset.actionChange) {
      _call(el.dataset.actionChange, el, ev);
      return;
    }
    if (el.id === 'rt-search' && window.Research?._onSearch) Research._onSearch(el.value);
    if (el.id === 'global-search' && window.Global?._onSearch) Global._onSearch(el.value);
  }

  function _onInput(ev) {
    const el = ev.target;
    if (el.id === 'rt-search' && window.Research?._onSearch) Research._onSearch(el.value);
    if (el.id === 'global-search' && window.Global?._onSearch) Global._onSearch(el.value);
  }

  function init() {
    document.addEventListener('click', _onClick, true);
    document.addEventListener('change', _onChange, true);
    document.addEventListener('input', _onInput, true);
    registerSegment('Announcements', (id) => Announcements?.setTab?.(id));
    registerSegment('Global', (id) => Global?.setTab?.(id));
    registerSegment('PaperTrade', (id) => PaperTrade?.setTab?.(id));
  }

  return { init, registerSegment, _call, closeProModal: () => document.getElementById('proUpgradeModal')?.classList.remove('open') };
})();
window.LcEvents = LcEvents;
