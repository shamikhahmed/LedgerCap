'use strict';
/** PWA-open scheduler — weekday morning brief + optional alerts (PKT). */
const NotificationScheduler = (() => {
  const INTERVAL_MS = 15 * 60 * 1000;
  const BRIEF_KEY = 'ledgercap_telegram_brief_date';
  const DIVIDEND_KEY = 'ledgercap_telegram_dividend_scan';
  const INTRADAY_KEY = 'ledgercap_telegram_intraday_hour';
  let _timer = null;

  function pktParts() {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Karachi',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    const parts = fmt.formatToParts(now);
    const get = t => parts.find(p => p.type === t)?.value;
    const weekday = get('weekday') || '';
    const hour = parseInt(get('hour') || '0', 10);
    const minute = parseInt(get('minute') || '0', 10);
    const dateKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Karachi' }).format(now);
    return { weekday, hour, minute, dateKey };
  }

  function _isWeekday(wd) {
    return wd && !['Sat', 'Sun'].includes(wd);
  }

  function _isPsxSession(pkt) {
    const mins = pkt.hour * 60 + pkt.minute;
    return mins >= 9 * 60 + 30 && mins < 15 * 60 + 30;
  }

  function _settings() {
    return window.State?.get('settings') || {};
  }

  async function _maybeMorningBrief(pkt) {
    const s = _settings();
    if (!s.telegramMorningEnabled) return;
    if (!window.TelegramService?.isConfigured()) return;
    if (!_isWeekday(pkt.weekday)) return;
    if (pkt.hour !== 9 || pkt.minute >= 15) return;
    if (localStorage.getItem(BRIEF_KEY) === pkt.dateKey) return;
    const res = await TelegramService.sendMorningBriefNow();
    if (res.ok) {
      localStorage.setItem(BRIEF_KEY, pkt.dateKey);
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        try { new Notification('LedgerCap', { body: 'Morning brief sent to Telegram', icon: './assets/icons/icon-192.png' }); } catch (_) {}
      }
    }
  }

  async function _maybeDividendReminders(pkt) {
    const s = _settings();
    if (!s.telegramDividendEnabled || !TelegramService?.isConfigured()) return;
    if (localStorage.getItem(DIVIDEND_KEY) === pkt.dateKey) return;
    if (typeof DividendService === 'undefined') return;
    const upcoming = DividendService.getUpcoming() || [];
    const soon = upcoming
      .map(u => {
        const ex = u.exDate || u.ex_date;
        if (!ex) return null;
        const days = Math.ceil((new Date(ex) - new Date()) / 86400000);
        if (days < 0 || days > 7) return null;
        return { symbol: u.symbol, days, amountPkr: u.dps || u.amount || 0 };
      })
      .filter(Boolean);
    if (!soon.length) return;
    const text = TelegramService.formatDividendReminder(soon);
    if (!text) return;
    const res = await TelegramService.sendMessage(text);
    if (res.ok) localStorage.setItem(DIVIDEND_KEY, pkt.dateKey);
  }

  async function _maybePriceAlerts() {
    const s = _settings();
    if (!s.telegramPriceAlertsEnabled || !TelegramService?.isConfigured()) return;
    const list = State.get('watchlist') || [];
    const fired = JSON.parse(localStorage.getItem('ledgercap_telegram_price_alerts') || '{}');
    const now = Date.now();
    for (const w of list) {
      if (!w.targetPrice || w.targetPrice <= 0) continue;
      const q = MarketDataService.getQuote(w.symbol);
      if (!q.price || q.price > w.targetPrice) continue;
      const key = `${w.id}:${w.targetPrice}`;
      if (fired[key] && now - fired[key] < 86400000) continue;
      const res = await TelegramService.sendMessage(TelegramService.formatPriceAlert({
        symbol: w.symbol,
        price: q.price,
        target: w.targetPrice,
      }));
      if (res.ok) fired[key] = now;
    }
    localStorage.setItem('ledgercap_telegram_price_alerts', JSON.stringify(fired));
  }

  async function tick() {
    if (typeof document !== 'undefined' && document.hidden) return;
    if (!window.TelegramService?.isConfigured()) return;
    const pkt = pktParts();
    await _maybeMorningBrief(pkt);
    await _maybeDividendReminders(pkt);
    if (_settings().telegramIntradayEnabled && _isPsxSession(pkt)) {
      const hourKey = `${pkt.dateKey}-${pkt.hour}`;
      if (localStorage.getItem(INTRADAY_KEY) !== hourKey && typeof IntradaySignals !== 'undefined') {
        const signals = IntradaySignals.scan?.() || [];
        if (signals.length) {
          const res = await TelegramService.sendMessage(TelegramService.formatIntradayDigest(signals));
          if (res.ok) localStorage.setItem(INTRADAY_KEY, hourKey);
        }
      }
    }
    await _maybePriceAlerts();
    if (_settings().telegramCloudSyncEnabled && window.TelegramService?.syncBriefToCloud) {
      await TelegramService.syncBriefToCloud().catch(() => {});
    }
  }

  function init() {
    if (_timer) return;
    tick();
    _timer = setInterval(tick, INTERVAL_MS);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) tick();
    });
  }

  function stop() {
    if (_timer) {
      clearInterval(_timer);
      _timer = null;
    }
  }

  return { init, stop, tick, pktParts };
})();
window.NotificationScheduler = NotificationScheduler;
