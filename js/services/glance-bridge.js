'use strict';
/** Home-screen / lock-screen glance snapshot (localStorage + BroadcastChannel). */
const GlanceBridge = (() => {
  const KEY = 'ledgercap_glance';
  const CH = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('ledgercap_glance') : null;

  function publish() {
    if (typeof State === 'undefined' || typeof PortfolioAnalyticsService === 'undefined') return;
    const s = PortfolioAnalyticsService.getSummary(State.get());
    const daily = State.calcDailyPnl();
    const settings = State.get('settings') || {};
    const payload = {
      netWorth: s.totalValue,
      dailyPnl: daily,
      dailyPct: s.totalValue > 0 ? (daily / s.totalValue) * 100 : 0,
      currency: settings.displayCurrency || 'PKR',
      usdRate: settings.usdRate || FxService?.getUsdRate?.() || 280,
      ts: Date.now(),
      live: typeof LivePriceStream !== 'undefined' ? LivePriceStream.status() : {},
    };
    try {
      localStorage.setItem(KEY, JSON.stringify(payload));
      CH?.postMessage(payload);
    } catch (_) {}
    return payload;
  }

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || 'null');
    } catch { return null; }
  }

  return { publish, read, KEY };
})();
window.GlanceBridge = GlanceBridge;
