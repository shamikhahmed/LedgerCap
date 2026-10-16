'use strict';
/** Cold-path demo portfolio seed — keeps Settings pack deferred (v5 §3d). */
const DemoSeed = {
  async load(opts) {
    const silent = opts && opts.silent;
    const seed = window.INITIAL_TRANSACTIONS || [];
    if (!seed.length) {
      if (!silent && typeof App !== 'undefined') App.showToast('Seed data unavailable', 'error');
      return false;
    }
    if (!silent && typeof CapConfirm === 'function') {
      const ok = await CapConfirm({
        title: 'Load demo portfolio?',
        body: `Load ${seed.length} portfolio transactions? Existing ledger will be replaced.`,
        confirmLabel: 'Load demo',
      });
      if (!ok) return false;
    }
    State.update(s => {
      s.transactions = seed.map(t => ({ ...t, id: t.id || Ledger.newId(), createdAt: Date.now() }));
      s.settings.onboardingDone = true;
      s.seedDataVersion = window.SEED_DATA_VERSION || 0;
      if (window.USER_BROKER_CASH_PKR != null) {
        s.manualAssets = s.manualAssets || {};
        s.manualAssets.brokerCashPkr = window.USER_BROKER_CASH_PKR;
      } else if (window.RAFI_BROKER_CASH_PKR != null) {
        s.manualAssets = s.manualAssets || {};
        s.manualAssets.brokerCashPkr = window.RAFI_BROKER_CASH_PKR;
      }
      if (window.MEEZAN_FUNDS) {
        (window.MEEZAN_FUNDS || []).forEach(f => {
          if (f.currentNav) {
            s.prices[f.symbol] = { price: f.currentNav, prevClose: f.currentNav * 0.999, source: 'meezan_seed', ts: Date.now() };
          }
        });
      }
      if (window.FALLBACK_PRICES) {
        Object.entries(window.FALLBACK_PRICES).forEach(([sym, price]) => {
          s.prices[sym] = { price, prevClose: price * 0.998, source: 'seed', ts: Date.now() };
        });
      }
      if (Ledger.portfolioValueTimeline) {
        const timeline = Ledger.portfolioValueTimeline(s.transactions, (sym, fallback) => {
          const p = s.prices[sym]?.price;
          return (p && p > 0) ? p : ((window.FALLBACK_PRICES || {})[sym] || fallback || 0);
        });
        s.priceHistory = timeline.map(p => ({ date: p.date, value: p.value }));
      }
    });
    if (!silent && typeof App !== 'undefined') App.showToast('Portfolio loaded ✓', 'success');
    if (typeof App !== 'undefined' && App.renderCurrent) App.renderCurrent();
    return true;
  }
};
window.DemoSeed = DemoSeed;
