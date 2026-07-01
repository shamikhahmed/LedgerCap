'use strict';
/** Price triggers — holdings + watchlist, below/above, toast + Telegram */
const PriceAlertsService = (() => {
  function _firedKey(id) { return `ledgercap_alert_fired:${id}`; }

  function list() {
    const state = State.get();
    const holdingAlerts = (state.priceAlerts || []).filter((a) => a.enabled !== false);
    const watch = (state.watchlist || [])
      .filter((w) => w.alertEnabled !== false && w.targetPrice > 0)
      .map((w) => ({
        id: `wl:${w.id}`,
        symbol: w.symbol,
        direction: 'below',
        price: w.targetPrice,
        source: 'watchlist',
      }));
    return [...holdingAlerts, ...watch];
  }

  function checkAll() {
    const alerts = list();
    if (!alerts.length) return;
    const now = Date.now();
    const fired = JSON.parse(localStorage.getItem('ledgercap_alerts_fired') || '{}');
    alerts.forEach((a) => {
      const q = MarketDataService.getQuote(a.symbol);
      if (!q.price) return;
      const hit = a.direction === 'above'
        ? q.price >= a.price
        : q.price <= a.price;
      if (!hit) return;
      const key = _firedKey(a.id);
      if (fired[key] && now - fired[key] < 86400000) return;
      fired[key] = now;
      const dir = a.direction === 'above' ? 'above' : 'below';
      const msg = `${a.symbol} ${PlatformUI.fmt(q.price)} — ${dir} ${PlatformUI.fmt(a.price)}`;
      if (typeof App !== 'undefined') App.showToast(msg, 'success');
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        try { new Notification('LedgerCap alert', { body: msg, icon: './assets/icons/icon-192.png' }); } catch (_) {}
      }
      if (typeof LcPolish !== 'undefined') LcPolish.hapticConfirm();
      if (typeof TelegramService !== 'undefined' && TelegramService.isConfigured()
        && State.get('settings')?.telegramPriceAlertsEnabled) {
        TelegramService.sendMessage(TelegramService.formatPriceAlert({
          symbol: a.symbol,
          price: q.price,
          target: a.price,
        })).catch(() => {});
      }
    });
    localStorage.setItem('ledgercap_alerts_fired', JSON.stringify(fired));
  }

  function upsert(alert) {
    State.update((s) => {
      if (!s.priceAlerts) s.priceAlerts = [];
      const i = s.priceAlerts.findIndex((x) => x.id === alert.id);
      if (i >= 0) s.priceAlerts[i] = { ...s.priceAlerts[i], ...alert };
      else s.priceAlerts.push(alert);
    });
  }

  function remove(id) {
    State.update((s) => {
      s.priceAlerts = (s.priceAlerts || []).filter((a) => a.id !== id);
    });
  }

  return { list, checkAll, upsert, remove };
})();
window.PriceAlertsService = PriceAlertsService;
