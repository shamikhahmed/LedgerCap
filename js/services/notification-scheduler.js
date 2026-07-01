'use strict';
/** PWA-open scheduler — weekday alerts (PKT). Scheduled digests use worker cron when cloud sync on. */
const NotificationScheduler = (() => {
  const INTERVAL_MS = 15 * 60 * 1000;
  const LS_PREFIX = 'ledgercap_dedupe_';
  let _timer = null;

  function pktParts() {
    return typeof PsxSession !== 'undefined'
      ? PsxSession.pktParts()
      : { weekday: '', hour: 0, minute: 0, dateKey: '', mins: 0 };
  }

  function _isWeekday(pkt) {
    return typeof PsxSession !== 'undefined' ? PsxSession.isWeekday(pkt) : false;
  }

  function _isPsxSession(pkt) {
    return typeof PsxSession !== 'undefined' ? PsxSession.isOpen(pkt) : false;
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
    if (!_isWeekday(pkt)) return;
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
    if (!_isWeekday(pkt)) return;
    if (pkt.hour !== 9 || pkt.minute >= 30) return;
    const claimKey = `dividend:${pkt.dateKey}`;
    if (!(await _claimOnce(claimKey, 90000))) return;
    if (typeof DividendService === 'undefined') return;
    const upcoming = DividendService.getUpcoming() || [];
    const soon = upcoming
      .map((u) => {
        const ex = u.exDate || u.ex_date;
        if (!ex) return null;
        const days = Math.ceil((new Date(ex + 'T12:00:00') - new Date()) / 86400000);
        if (days < 0 || days > 7) return null;
        const amountPkr = u.amountPerShare ?? u.dps ?? u.amount ?? 0;
        if (!(amountPkr > 0)) return null;
        return { symbol: u.symbol, days, amountPkr };
      })
      .filter(Boolean);
    if (!soon.length) return;
    const text = TelegramService.formatDividendReminder(soon);
    if (!text) return;
    await TelegramService.sendMessage(text);
  }

  async function _maybePriceAlerts(pkt) {
    const s = _settings();
    if (!s.telegramPriceAlertsEnabled) return;
    if (!_isWeekday(pkt) || !_isPsxSession(pkt)) return;
    if (typeof PriceAlertsService !== 'undefined') {
      PriceAlertsService.checkAll({ telegramOnly: true });
    }
  }

  async function _maybeIntradayNews(pkt) {
    const s = _settings();
    if (!s.telegramIntradayNewsEnabled || !TelegramService?.isConfigured()) return;
    if (!_isWeekday(pkt) || !_isPsxSession(pkt)) return;
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
