'use strict';
/**
 * Telegram Bot API — routes via LedgerCap worker in Pakistan (api.telegram.org blocked).
 * Never send full transaction history; briefs use aggregated rule output.
 */
const TelegramService = (() => {
  const DIRECT_API = 'https://api.telegram.org/bot';
  const MAX_LEN = 4096;

  function _settings() {
    return (typeof window !== 'undefined' && window.State)
      ? (window.State.get('settings') || {})
      : {};
  }

  function proxyBase(settings) {
    settings = settings || _settings();
    if (settings.telegramUseDirect) return '';
    const raw = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(settings.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || window.LEDGERCAP_CONFIG?.legacyPsxProxyUrl || '').trim();
    return raw.replace(/\/$/, '');
  }

  function buildProxyUrl(method, settings) {
    const base = proxyBase(settings);
    return base ? `${base}/telegram/bot/${method}` : '';
  }

  async function _botRequest(method, token, payload) {
    token = String(token || '').trim();
    if (!token) return { ok: false, error: 'Bot token required' };

    const proxy = buildProxyUrl(method);
    const attempts = [];

    if (proxy) {
      attempts.push({ mode: 'proxy', url: proxy });
    }
    attempts.push({ mode: 'direct', url: `${DIRECT_API}${token}/${method}` });

    let lastErr = 'Network error';
    for (const attempt of attempts) {
      try {
        const headers = { Accept: 'application/json' };
        const opts = { method: payload == null ? 'GET' : 'POST', headers };
        if (attempt.mode === 'proxy') {
          headers['X-Telegram-Bot-Token'] = token;
        }
        if (payload != null) {
          headers['Content-Type'] = 'application/json';
          opts.body = JSON.stringify(payload);
        }
        const res = await fetch(attempt.url, opts);
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.ok) {
          return { ok: true, data, via: attempt.mode };
        }
        lastErr = data.description || data.error || `HTTP ${res.status}`;
        if (attempt.mode === 'proxy') continue;
      } catch (e) {
        lastErr = e.message || 'Network error';
        if (attempt.mode === 'proxy') continue;
      }
    }

    const hint = proxy
      ? lastErr
      : `${lastErr} — set PSX proxy URL in Settings (required in Pakistan).`;
    return { ok: false, error: hint };
  }

  function escapeMarkdown(text) {
    if (text == null) return '';
    return String(text).replace(/([_*`\[\]])/g, '\\$1');
  }

  function truncate(text, max) {
    max = max || MAX_LEN;
    const s = String(text || '');
    if (s.length <= max) return s;
    return s.slice(0, max - 1) + '…';
  }

  function isConfigured() {
    const s = _settings();
    return !!(String(s.telegramBotToken || '').trim() && String(s.telegramChatId || '').trim());
  }

  function _fmtPkr(n) {
    if (typeof PsxUI !== 'undefined') return PsxUI.fmt(n);
    return '₨' + Math.round(n || 0).toLocaleString('en-PK');
  }

  function formatMorningBrief(brief, extras) {
    extras = extras || {};
    const day = extras.weekdayLabel || '';
    const pkt = extras.pktLabel || '9:00 PKT';
    const netWorth = extras.netWorth || 0;
    const dailyPct = extras.dailyPct ?? 0;
    const sign = dailyPct >= 0 ? '+' : '';
    const actionEmoji = {
      SELL: '🔴', TRIM: '🟠', REDUCE: '🟠', ADD: '🟢',
      STRONG_BUY: '🟢', BUY: '🟢', WATCH: '🟡', HOLD: '⚪',
    };
    const lines = [
      `📊 *LedgerCap — Morning Brief* (${escapeMarkdown(day)} ${escapeMarkdown(pkt)})`,
      `Net worth: *${escapeMarkdown(_fmtPkr(netWorth))}* (${sign}${Number(dailyPct).toFixed(1)}%)`,
      '',
    ];
    (brief?.urgent_signals || []).slice(0, 5).forEach(s => {
      const em = actionEmoji[s.action] || '•';
      const rat = escapeMarkdown((s.rationale || '').slice(0, 140));
      lines.push(`${em} ${escapeMarkdown(s.action)}: *${escapeMarkdown(s.symbol)}* — ${rat}`);
    });
    const counts = brief?.action_counts || {};
    lines.push(
      '',
      `STRONG BUY ${counts['STRONG BUY'] || 0} · ADD ${counts.ADD || 0} · HOLD ${counts.HOLD || 0} · TRIM ${counts.TRIM || 0} · SELL ${counts.SELL || 0}`,
    );
    if (extras.pilotScore) {
      lines.push(`Pilot Score: *${escapeMarkdown(extras.pilotScore.grade)}* (${extras.pilotScore.score}/100)`);
    }
    lines.push('', '_Rule-based brief — not financial advice._');
    return truncate(lines.join('\n'));
  }

  function formatIntradayDigest(signals) {
    const rows = (signals || []).slice(0, 8);
    if (!rows.length) return truncate('⚡ *LedgerCap intraday*\nNo PSX moves above thresholds.');
    const lines = ['⚡ *LedgerCap — Intraday*', ''];
    rows.forEach(s => {
      lines.push(`• *${escapeMarkdown(s.symbol)}* ${s.movePct >= 0 ? '+' : ''}${Number(s.movePct).toFixed(1)}% — ${escapeMarkdown(s.label || s.kind)}`);
    });
    lines.push('', '_Rule-based — not financial advice._');
    return truncate(lines.join('\n'));
  }

  function formatDividendReminder(events) {
    const rows = (events || []).slice(0, 6);
    if (!rows.length) return '';
    const lines = ['💰 *Dividend reminders*', ''];
    rows.forEach(e => {
      lines.push(`Ex-date in ${e.days}d: *${escapeMarkdown(e.symbol)}* — ${escapeMarkdown(_fmtPkr(e.amountPkr))}/share`);
    });
    return truncate(lines.join('\n'));
  }

  function formatPriceAlert(alert) {
    const a = alert || {};
    return truncate([
      '🔔 *Price alert*',
      `*${escapeMarkdown(a.symbol)}* at ${escapeMarkdown(_fmtPkr(a.price))}`,
      `Target ${escapeMarkdown(_fmtPkr(a.target))}`,
    ].join('\n'));
  }

  async function sendMessage(text, opts) {
    opts = opts || {};
    const s = _settings();
    const token = String(s.telegramBotToken || '').trim();
    const chatId = String(s.telegramChatId || '').trim();
    if (!token || !chatId) {
      return { ok: false, error: 'Telegram bot token and chat ID required in Settings.' };
    }
    const body = {
      chat_id: chatId,
      text: truncate(text),
      parse_mode: opts.parseMode || 'Markdown',
      disable_web_page_preview: true,
    };
    const result = await _botRequest('sendMessage', token, body);
    if (!result.ok) return { ok: false, error: result.error };
    return { ok: true, messageId: result.data?.result?.message_id, via: result.via };
  }

  async function sendTestMessage() {
    const pkt = typeof NotificationScheduler !== 'undefined'
      ? NotificationScheduler.pktParts()
      : { dateKey: new Date().toISOString().slice(0, 10) };
    const text = truncate([
      '✅ *LedgerCap test*',
      'Telegram delivery works.',
      `Date (PKT): ${escapeMarkdown(pkt.dateKey)}`,
      '_Rule-based wealth app — portfolio stays on your device._',
    ].join('\n'));
    return sendMessage(text);
  }

  async function sendMorningBriefNow() {
    if (!window.PilotEngine) return { ok: false, error: 'Pilot engine not loaded' };
    const state = window.State.get();
    const brief = PilotEngine.buildMorningBrief(state);
    const score = PilotEngine.buildPilotScore(state);
    const summary = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    const dailyPct = summary.totalValue > 0 ? (daily / summary.totalValue) * 100 : 0;
    const pkt = typeof NotificationScheduler !== 'undefined' ? NotificationScheduler.pktParts() : {};
    const text = formatMorningBrief(brief, {
      netWorth: summary.totalValue,
      dailyPct,
      pilotScore: score,
      weekdayLabel: pkt.weekday || '',
      pktLabel: pkt.hour != null ? `${pkt.hour}:${String(pkt.minute).padStart(2, '0')} PKT` : '9:00 PKT',
    });
    return sendMessage(text);
  }

  async function resolveChatIds() {
    const token = String(_settings().telegramBotToken || '').trim();
    if (!token) return { ok: false, error: 'Bot token required' };
    const result = await _botRequest('getUpdates', token, null);
    if (!result.ok) return { ok: false, error: result.error };
    const data = result.data || {};
    const ids = [];
    const seen = new Set();
    (data.result || []).forEach(u => {
      const chat = u.message?.chat || u.my_chat_member?.chat;
      const id = chat?.id;
      if (id != null && !seen.has(id)) {
        seen.add(id);
        ids.push({ id, type: chat.type, title: chat.username || chat.first_name || chat.title || String(id) });
      }
    });
    return { ok: true, chatIds: ids, via: result.via };
  }

  async function checkProxy() {
    const base = proxyBase();
    if (!base) return { ok: false, error: 'No proxy URL configured' };
    try {
      const res = await fetch(`${base}/telegram/ping`, { headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      return { ok: !!data.ok && !!data.proxy, proxy: base, ...data };
    } catch (e) {
      return { ok: false, error: e.message || 'Proxy unreachable', proxy: base };
    }
  }

  function buildCloudBriefPayload(state) {
    state = state || window.State?.get();
    if (!state || !window.PilotEngine) return null;
    const brief = PilotEngine.buildMorningBrief(state);
    const score = PilotEngine.buildPilotScore(state);
    const summary = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    const dailyPct = summary.totalValue > 0 ? (daily / summary.totalValue) * 100 : 0;
    return {
      updatedAt: new Date().toISOString(),
      brief: {
        urgent_signals: (brief.urgent_signals || []).slice(0, 8),
        action_counts: brief.action_counts || {},
      },
      extras: {
        netWorth: summary.totalValue,
        dailyPct,
        pilotScore: { grade: score.grade, score: score.score },
      },
    };
  }

  async function syncBriefToCloud() {
    const s = _settings();
    const syncKey = String(s.telegramSyncKey || '').trim();
    if (!s.telegramCloudSyncEnabled || !syncKey) {
      return { ok: false, error: 'Enable cloud sync and set sync key in Settings' };
    }
    const payload = buildCloudBriefPayload();
    if (!payload) return { ok: false, error: 'Brief not available' };
    const proxy = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(s.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || '').replace(/\/$/, '');
    if (!proxy) return { ok: false, error: 'PSX proxy URL required for cloud sync' };
    try {
      const res = await fetch(`${proxy}/telegram/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-LedgerCap-Sync-Key': syncKey,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: data.error || `HTTP ${res.status}` };
      return { ok: true, bytes: data.bytes };
    } catch (e) {
      return { ok: false, error: e.message || 'Network error' };
    }
  }

  return {
    escapeMarkdown,
    truncate,
    isConfigured,
    proxyBase,
    buildProxyUrl,
    formatMorningBrief,
    formatIntradayDigest,
    formatDividendReminder,
    formatPriceAlert,
    sendMessage,
    sendTestMessage,
    sendMorningBriefNow,
    resolveChatIds,
    checkProxy,
    buildCloudBriefPayload,
    syncBriefToCloud,
  };
})();
window.TelegramService = TelegramService;
