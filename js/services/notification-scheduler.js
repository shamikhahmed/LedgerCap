'use strict';
/** PWA-open scheduler — weekday alerts (PKT). Scheduled digests use worker cron when cloud sync on. */
const NotificationScheduler = (() => {
  const INTERVAL_MS = 15 * 60 * 1000;
  const LS_PREFIX = 'ledgercap_dedupe_';
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

  function _syncKey() {
    return String(_settings().telegramSyncKey || '').trim();
  }

  function _cloudCronActive() {
    return _syncKey() && !!_settings().telegramCloudSyncEnabled;
  }

  async function _claimOnce(key, ttlSec) {
    if (_syncKey() && window.TelegramService?.claimDedupeKey) {
      const r = await TelegramService.claimDedupeKey(key, ttlSec);
      if (r.via === 'kv') return r.claimed;
    }
    const lsKey = LS_PREFIX + key;
    if (localStorage.getItem(lsKey)) return false;
    localStorage.setItem(lsKey, String(Date.now()));
    return true;
  }

  async function _maybeMorningBrief(pkt) {
    const s = _settings();
    if (!s.telegramMorningEnabled) return;
    if (!window.TelegramService?.isConfigured()) return;
    if (_cloudCronActive()) return;
    if (!_isWeekday(pkt.weekday)) return;
    if (pkt.hour !== 9 || pkt.minute >= 15) return;
    const claimKey = `brief:${pkt.dateKey}`;
    if (!(await _claimOnce(claimKey, 90000))) return;
    const res = await TelegramService.sendMorningBriefNow();
    if (res.ok) {
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        try { new Notification('LedgerCap', { body: 'Morning brief sent to Telegram', icon: './assets/icons/icon-192.png' }); } catch (_) {}
      }
    } else {
      console.warn('LedgerCap: morning brief failed', res.error || 'unknown');
    }
  }

  async function _maybeDividendReminders(pkt) {
    const s = _settings();
    if (!s.telegramDividendEnabled || !TelegramService?.isConfigured()) return;
    const claimKey = `dividend:${pkt.dateKey}`;
    if (!(await _claimOnce(claimKey, 90000))) return;
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
    await TelegramService.sendMessage(text);
  }

  async function _maybePriceAlerts(pkt) {
    const s = _settings();
    if (!s.telegramPriceAlertsEnabled || !TelegramService?.isConfigured()) return;
    const list = State.get('watchlist') || [];
    for (const w of list) {
      if (!w.targetPrice || w.targetPrice <= 0) continue;
      const q = MarketDataService.getQuote(w.symbol);
      if (!q.price || q.price > w.targetPrice) continue;
      const claimKey = `price:${w.id}:${w.targetPrice}:${pkt.dateKey}`;
      if (!(await _claimOnce(claimKey, 86400))) continue;
      await TelegramService.sendMessage(TelegramService.formatPriceAlert({
        symbol: w.symbol,
        price: q.price,
        target: w.targetPrice,
      }));
    }
  }

  async function _maybeIntradayNews(pkt) {
    const s = _settings();
    if (!s.telegramIntradayNewsEnabled || !TelegramService?.isConfigured()) return;
    if (!_isWeekday(pkt.weekday) || !_isPsxSession(pkt)) return;
    const claimKey = `news:${pkt.dateKey}-${pkt.hour}`;
    if (!(await _claimOnce(claimKey, 7200))) return;
    if (typeof NewsService === 'undefined') return;
    const items = await NewsService.fetchPortfolioNews();
    if (!items.length) return;
    const fp = NewsService.newsFingerprint(items);
    const lastFp = localStorage.getItem('ledgercap_last_news_fp');
    if (fp && fp === lastFp) return;
    const rows = NewsService.toTelegramRows(items);
    const text = TelegramBriefFormat.formatNewsDigest(rows, 'Din ki khabrain / Intraday news');
    if (!text) return;
    const res = await TelegramService.sendMessage(text);
    if (res.ok && fp) localStorage.setItem('ledgercap_last_news_fp', fp);
  }

  async function tick() {
    if (typeof document !== 'undefined' && document.hidden) return;
    if (!window.TelegramService?.isConfigured()) return;
    const pkt = pktParts();
    await _maybeMorningBrief(pkt);
    await _maybeDividendReminders(pkt);
    if (_settings().telegramIntradayEnabled && _isPsxSession(pkt)) {
      const claimKey = `intraday:${pkt.dateKey}-${pkt.hour}`;
      if (await _claimOnce(claimKey, 7200) && typeof IntradaySignals !== 'undefined') {
        const signals = IntradaySignals.scan?.() || [];
        if (signals.length) {
          await TelegramService.sendMessage(TelegramService.formatIntradayDigest(signals));
        }
      }
    }
    await _maybePriceAlerts(pkt);
    await _maybeIntradayNews(pkt);
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
