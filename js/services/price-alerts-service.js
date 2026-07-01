'use strict';
/** Price triggers — crossover during PSX session; toast + Telegram */
const PriceAlertsService = (() => {
  const ARM_PREFIX = 'ledgercap_alert_arm:';
  const FIRED_PREFIX = 'ledgercap_alert_fired:';
  const SEED_SOURCES = new Set(['fallback', 'seed', 'meezan_seed']);

  function _armKey(id) { return ARM_PREFIX + id; }
  function _firedKey(id) { return FIRED_PREFIX + id; }

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

  function _quoteReliable(q) {
    if (!q?.price) return false;
    if (q.seeded) return false;
    if (SEED_SOURCES.has(q.source) && !(q.ts > 0)) return false;
    return true;
  }

  /** Arm/re-arm — fire only on crossover into hit zone */
  function _crossed(a, price) {
    const key = _armKey(a.id);
    let armed = localStorage.getItem(key);
    if (armed === null) {
      if (a.direction === 'above') armed = price < a.price ? '1' : '0';
      else armed = price > a.price ? '1' : '0';
      localStorage.setItem(key, armed);
      return false;
    }
    armed = armed === '1';
    if (a.direction === 'below') {
      if (price > a.price) {
        localStorage.setItem(key, '1');
        return false;
      }
      if (armed && price <= a.price) {
        localStorage.setItem(key, '0');
        return true;
      }
      return false;
    }
    if (price < a.price) {
      localStorage.setItem(key, '1');
      return false;
    }
    if (armed && price >= a.price) {
      localStorage.setItem(key, '0');
      return true;
    }
    return false;
  }

  function checkAll(opts) {
    opts = opts || {};
    const pkt = typeof PsxSession !== 'undefined' ? PsxSession.pktParts() : null;
    const sessionOpen = opts.forceSession || (pkt && PsxSession.isOpen(pkt));
    if (!opts.skipSession && !sessionOpen) return { skipped: 'market closed' };

    const alerts = list();
    if (!alerts.length) return { checked: 0 };

    const now = Date.now();
    const fired = JSON.parse(localStorage.getItem('ledgercap_alerts_fired') || '{}');
    let n = 0;

    alerts.forEach((a) => {
      const q = MarketDataService.getQuote(a.symbol);
      if (!_quoteReliable(q)) return;
      if (!_crossed(a, q.price)) return;

      const key = _firedKey(a.id);
      if (fired[key] && now - fired[key] < 3600000) return;
      fired[key] = now;
      n++;

      const dir = a.direction === 'above' ? 'above' : 'below';
      const stale = q.quoteLabel === 'Last close' ? ' (last close)' : '';
      const msg = `${a.symbol} ${PlatformUI.fmt(q.price)}${stale} — crossed ${dir} ${PlatformUI.fmt(a.price)}`;

      if (!opts.telegramOnly) {
        if (typeof App !== 'undefined') App.showToast(msg, 'success');
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          try { new Notification('LedgerCap alert', { body: msg, icon: './assets/icons/icon-192.png' }); } catch (_) {}
        }
        if (typeof LcPolish !== 'undefined') LcPolish.hapticConfirm();
      }

      const sendTg = opts.telegram !== false
        && typeof TelegramService !== 'undefined'
        && TelegramService.isConfigured()
        && State.get('settings')?.telegramPriceAlertsEnabled;

      if (sendTg) {
        TelegramService.sendMessage(TelegramService.formatPriceAlert({
          symbol: a.symbol,
          price: q.price,
          target: a.price,
          direction: dir,
          quoteLabel: q.quoteLabel,
        })).catch(() => {});
      }
    });

    localStorage.setItem('ledgercap_alerts_fired', JSON.stringify(fired));
    return { checked: alerts.length, fired: n };
  }

  function upsert(alert) {
    State.update((s) => {
      if (!s.priceAlerts) s.priceAlerts = [];
      const i = s.priceAlerts.findIndex((x) => x.id === alert.id);
      if (i >= 0) s.priceAlerts[i] = { ...s.priceAlerts[i], ...alert };
      else s.priceAlerts.push(alert);
    });
    try { localStorage.removeItem(_armKey(alert.id)); } catch (_) {}
  }

  function remove(id) {
    State.update((s) => {
      s.priceAlerts = (s.priceAlerts || []).filter((a) => a.id !== id);
    });
    try {
      localStorage.removeItem(_armKey(id));
      localStorage.removeItem(_firedKey(id));
    } catch (_) {}
  }

  return { list, checkAll, upsert, remove, _crossed };
})();
window.PriceAlertsService = PriceAlertsService;
