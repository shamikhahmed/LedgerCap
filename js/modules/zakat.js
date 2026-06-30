'use strict';
const Zakat = (() => {
  const NISAB_GOLD_G = 87.48;

  function _zakatable(state) {
    const s = PortfolioAnalyticsService.getSummary(state);
    const settings = state.settings || {};
    const ma = state.manualAssets || {};
    let total = s.totalValue + (ma.usdCash || 0) * FxService.getUsdRate() + (ma.goldGrams || 0) * (settings.goldPricePerGram || 18000) + (ma.realEstate || 0);
    if (!(settings.zakatIncludeCrypto !== false)) {
      /* crypto included in portfolio via global holdings */
    }
    return Math.max(0, total - (settings.zakatDebts || 0));
  }

  function render() {
    const screen = document.getElementById('screen-zakat');
    if (!screen) return;
    const state = State.get();
    const settings = state.settings || {};
    const goldG = settings.goldPricePerGram || 18000;
    const nisab = NISAB_GOLD_G * goldG;
    const zakatable = _zakatable(state);
    const due = zakatable >= nisab ? zakatable * 0.025 : 0;
    const haul = settings.zakatHaulDate || new Date().toISOString().slice(0, 10);

    screen.innerHTML = `
      ${PsxUI.strip()}
      ${PsxUI.pageTitle('Zakat calculator', 'Hanafi nisab · 2.5% on zakatable wealth')}
      <div class="psx-hero">
        <div class="psx-hero-label">Estimated Zakat due</div>
        <div class="psx-hero-val">${PsxUI.fmt(due)}</div>
        <div class="psx-hero-pills">
          <span class="psx-pill">Nisab ${PsxUI.fmt(nisab)}</span>
          <span class="psx-pill">Zakatable ${PsxUI.fmt(zakatable)}</span>
        </div>
      </div>
      <div class="psx-metrics">
        <div class="psx-metric"><div class="psx-metric-l">Gold nisab</div><div class="psx-metric-v">${NISAB_GOLD_G}g</div></div>
        <div class="psx-metric"><div class="psx-metric-l">Gold / g</div><div class="psx-metric-v">₨${goldG}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">Haul date</div><div class="psx-metric-v">${haul}</div></div>
        <div class="psx-metric"><div class="psx-metric-l">Debts offset</div><div class="psx-metric-v">${PsxUI.fmt(settings.zakatDebts || 0)}</div></div>
      </div>
      <div class="psx-analyze" style="margin:16px">
        <p>Rules-based estimate only — not a fatwa. Consult a scholar for crypto, business inventory, and mixed portfolios. Ledger stays on device.</p>
      </div>
      <div style="padding:0 16px 24px">
        <label class="field-label">Debts to subtract (₨)</label>
        <input class="field-input" id="zk-debts" type="number" value="${settings.zakatDebts || 0}" onchange="Zakat._saveDebts(this.value)">
        <label class="field-label" style="margin-top:12px">Gold grams (manual)</label>
        <input class="field-input" id="zk-gold" type="number" step="0.01" value="${(state.manualAssets || {}).goldGrams || 0}" onchange="Zakat._saveGold(this.value)">
        <label class="field-label" style="margin-top:12px">USD cash (manual)</label>
        <input class="field-input" id="zk-usd" type="number" step="0.01" value="${(state.manualAssets || {}).usdCash || 0}" onchange="Zakat._saveUsd(this.value)">
      </div>`;
  }

  function _saveDebts(v) {
    State.update(s => { s.settings.zakatDebts = parseFloat(v) || 0; });
    render();
  }
  function _saveGold(v) {
    State.update(s => { s.manualAssets = { ...(s.manualAssets || {}), goldGrams: parseFloat(v) || 0 }; });
    render();
  }
  function _saveUsd(v) {
    State.update(s => { s.manualAssets = { ...(s.manualAssets || {}), usdCash: parseFloat(v) || 0 }; });
    render();
  }

  return { render, _saveDebts, _saveGold, _saveUsd };
})();
window.Zakat = Zakat;
