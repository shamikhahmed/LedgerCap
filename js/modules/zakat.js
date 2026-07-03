'use strict';
const Zakat = (() => {
  const NISAB_GOLD_G = 87.48;

  function _zakatable(state) {
    const s = PortfolioAnalyticsService.getSummary(state);
    const settings = state.settings || {};
    const ma = state.manualAssets || {};
    const total = s.totalValue + (ma.usdCash || 0) * FxService.getUsdRate() + (ma.goldGrams || 0) * (settings.goldPricePerGram || 18000) + (ma.realEstate || 0);
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

    screen.innerHTML = PsxUI.lcDash('Zakat calculator', 'Hanafi nisab · 2.5% on zakatable wealth', `
      <div class="lc-dash-hero">
        <div class="lc-dash-hero-label">Estimated Zakat due</div>
        <div class="lc-dash-hero-val">${PsxUI.fmt(due)}</div>
        <div class="lc-dash-hero-row">
          <span class="lc-dash-chip">Nisab ${PsxUI.fmt(nisab)}</span>
          <span class="lc-dash-chip">Zakatable ${PsxUI.fmt(zakatable)}</span>
        </div>
      </div>
      <div class="lc-metric-grid">
        <div class="lc-metric-cell"><label>Gold nisab</label><strong>${NISAB_GOLD_G}g</strong></div>
        <div class="lc-metric-cell"><label>Gold / g</label><strong>${PsxUI.fmt(goldG)}</strong></div>
        <div class="lc-metric-cell"><label>Haul date</label><strong>${haul}</strong></div>
        <div class="lc-metric-cell"><label>Debts offset</label><strong>${PsxUI.fmt(settings.zakatDebts || 0)}</strong></div>
      </div>
      <div class="lc-verdict"><h3>Disclaimer</h3><p>Rules-based estimate only — not a fatwa. Consult a scholar for crypto, inventory, and mixed portfolios. Data stays on device.</p></div>
      <div class="lc-form-block">
        <label class="lc-field-label">Debts to subtract (₨)</label>
        <input class="lc-field-input" id="zk-debts" type="number" value="${settings.zakatDebts || 0}" data-action-change="Zakat._saveDebts">
        <label class="lc-field-label">Gold grams (manual)</label>
        <input class="lc-field-input" id="zk-gold" type="number" step="0.01" value="${(state.manualAssets || {}).goldGrams || 0}" data-action-change="Zakat._saveGold">
        <label class="lc-field-label">USD cash (manual)</label>
        <input class="lc-field-input" id="zk-usd" type="number" step="0.01" value="${(state.manualAssets || {}).usdCash || 0}" data-action-change="Zakat._saveUsd">
      </div>
    `);
  }

  function _saveDebts(v) { State.update(s => { s.settings.zakatDebts = parseFloat(v) || 0; }); render(); }
  function _saveGold(v) { State.update(s => { s.manualAssets = { ...(s.manualAssets || {}), goldGrams: parseFloat(v) || 0 }; }); render(); }
  function _saveUsd(v) { State.update(s => { s.manualAssets = { ...(s.manualAssets || {}), usdCash: parseFloat(v) || 0 }; }); render(); }
  return { render, _saveDebts, _saveGold, _saveUsd };
})();
window.Zakat = Zakat;
