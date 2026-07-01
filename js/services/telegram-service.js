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
    return TelegramBriefFormat.escapeMarkdown(text);
  }

  function truncate(text, max) {
    return TelegramBriefFormat.truncate(text, max);
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
    return TelegramBriefFormat.formatMorningBrief(brief, extras, _fmtPkr);
  }

  async function gatherBriefContext(state) {
    state = state || (typeof window !== 'undefined' && window.State ? window.State.get() : null);
    if (!state || !window.PilotEngine) return null;

    const brief = PilotEngine.buildMorningBrief(state);
    const score = PilotEngine.buildPilotScore(state);
    const summary = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    const dailyPct = summary.totalValue > 0 ? (daily / summary.totalValue) * 100 : 0;

    let portfolios = [];
    if (typeof PortfolioBuckets !== 'undefined') {
      if (PortfolioBuckets.bucketBriefRows) {
        portfolios = PortfolioBuckets.bucketBriefRows(state);
      } else {
        portfolios = PortfolioBuckets.list(state)
          .filter(b => b.builtin)
          .map(b => {
            const s = PortfolioBuckets.statsForBucket(state, b.id);
            return { name: b.name, value: s.value, pnl: s.pnl, pnlPct: s.pnlPct };
          })
          .filter(p => p.value > 0);
      }
    }

    let dividends = [];
    if (typeof DividendService !== 'undefined') {
      dividends = (DividendService.getUpcoming() || []).map(u => {
        const ex = u.exDate || u.ex_date;
        if (!ex) return null;
        const days = Math.ceil((new Date(ex) - new Date()) / 86400000);
        if (days < 0 || days > 21) return null;
        const amountPkr = u.amountPerShare ?? u.dps ?? u.amount ?? 0;
        if (!(amountPkr > 0)) return null;
        return { symbol: u.symbol, days, amountPkr };
      }).filter(Boolean);
    }

    let news = [];
    let newsSymbols = [];
    if (typeof NewsService !== 'undefined') {
      newsSymbols = NewsService.portfolioSymbols(state).map((p) => p.symbol);
      try {
        const items = await NewsService.fetchPortfolioNews(state);
        news = NewsService.toTelegramRows ? NewsService.toTelegramRows(items) : items.slice(0, 6).map(n => ({
          symbol: n.portfolioSymbol || n.symbol || '—',
          title: (n.title || '').slice(0, 72),
          tag: (n.impact?.tags || [])[0] || 'News',
          source: n.source || n.publisher || 'News',
        }));
      } catch (_) {}
    }

    const txSum = typeof TransactionLedger !== 'undefined'
      ? TransactionLedger.summary(state.transactions || []) : null;

    const usStocks = (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(state.transactions) : [])
      .filter((h) => h.assetClass !== 'crypto')
      .map((h) => ({
        symbol: h.symbol,
        qty: h.qty,
        valuePkr: h.qty * (State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0)),
      }))
      .filter((h) => h.valuePkr > 0);

    return {
      brief,
      extras: {
        netWorth: summary.totalValue,
        invested: summary.invested,
        dailyPnl: daily,
        dailyPct,
        totalPnl: summary.totalReturn?.abs ?? summary.unrealized,
        totalPnlPct: summary.totalReturn?.pct,
        pilotScore: { grade: score.grade, score: score.score },
        portfolios,
        portfolioDigests: portfolios,
        usStocks,
        kse100: state.kseIndex || {},
        movers: PortfolioAnalyticsService.getHoldings(state)
          .filter((h) => h.kind === 'stock')
          .map((h) => ({ symbol: h.symbol, movePct: h.pnlPct }))
          .sort((a, b) => Math.abs(b.movePct) - Math.abs(a.movePct))
          .slice(0, 8),
        dividends,
        news,
        newsSymbols,
        taxes: txSum?.taxes,
        loggedDividends: txSum?.loggedDividends,
      },
    };
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
    const dir = a.direction === 'above' ? 'crossed above' : 'crossed below';
    const stale = a.quoteLabel === 'Last close' ? ' (last close)' : '';
    return truncate([
      '🔔 *Price alert*',
      `*${escapeMarkdown(a.symbol)}* ${dir} ${escapeMarkdown(_fmtPkr(a.target))}`,
      `Now ${escapeMarkdown(_fmtPkr(a.price))}${escapeMarkdown(stale)}`,
      '_PSX session crossover — rule-based, not financial advice._',
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
    const ctx = await gatherBriefContext();
    if (!ctx) return { ok: false, error: 'Brief not available' };
    const pkt = typeof NotificationScheduler !== 'undefined' ? NotificationScheduler.pktParts() : {};
    const text = formatMorningBrief(ctx.brief, {
      ...ctx.extras,
      weekdayLabel: pkt.weekday || '',
      pktLabel: pkt.hour != null ? `${pkt.hour}:${String(pkt.minute).padStart(2, '0')} PKT` : '9:00 PKT',
    });
    return sendMessage(text);
  }

  async function sendPortfolioDigestsNow() {
    const ctx = await gatherBriefContext();
    if (!ctx) return { ok: false, error: 'Brief not available' };
    const rows = ctx.extras.portfolioDigests || ctx.extras.portfolios || [];
    if (!rows.length) return { ok: false, error: 'No portfolio rows' };
    const results = [];
    for (const row of rows) {
      if (!(row.value > 0)) continue;
      const text = TelegramBriefFormat.formatPortfolioDigest(row, _fmtPkr);
      if (!text) continue;
      results.push(await sendMessage(text));
      if (!results[results.length - 1].ok) break;
    }
    const ok = results.length > 0 && results.every((r) => r.ok);
    return { ok, sent: results.length, error: ok ? undefined : results.find((r) => !r.ok)?.error };
  }

  async function sendIntradayNewsNow() {
    if (typeof NewsService === 'undefined') return { ok: false, error: 'News service not loaded' };
    const items = await NewsService.fetchPortfolioNews();
    const rows = NewsService.toTelegramRows(items);
    if (!rows.length) return { ok: false, error: 'No headlines right now' };
    const text = TelegramBriefFormat.formatNewsDigest(rows, 'Test — Din ki khabrain / Intraday news');
    if (!text) return { ok: false, error: 'Could not format news' };
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

  async function buildCloudBriefPayload(state) {
    const ctx = await gatherBriefContext(state);
    if (!ctx) return null;
    return {
      updatedAt: new Date().toISOString(),
      brief: {
        urgent_signals: (ctx.brief.urgent_signals || []).slice(0, 8),
        action_counts: ctx.brief.action_counts || {},
      },
      extras: ctx.extras,
    };
  }

  async function claimDedupeKey(key, ttlSec) {
    const s = _settings();
    const syncKey = String(s.telegramSyncKey || '').trim();
    if (!syncKey) return { claimed: false, via: 'none' };
    const proxy = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(s.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || '').replace(/\/$/, '');
    if (!proxy) return { claimed: false, via: 'none' };
    try {
      const res = await fetch(`${proxy}/telegram/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-LedgerCap-Sync-Key': syncKey,
        },
        body: JSON.stringify({ key: String(key).slice(0, 120), ttlSec: ttlSec || 86400 }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { claimed: false, via: 'kv', error: data.error };
      return { claimed: !!data.claimed, via: 'kv' };
    } catch (e) {
      return { claimed: false, via: 'kv', error: e.message };
    }
  }

  async function syncBriefToCloud() {
    const s = _settings();
    const syncKey = String(s.telegramSyncKey || '').trim();
    if (!s.telegramCloudSyncEnabled || !syncKey) {
      return { ok: false, error: 'Enable cloud sync and set sync key in Settings' };
    }
    const payload = await buildCloudBriefPayload();
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
    gatherBriefContext,
    formatIntradayDigest,
    formatDividendReminder,
    formatPriceAlert,
    sendMessage,
    sendTestMessage,
    sendMorningBriefNow,
    sendPortfolioDigestsNow,
    sendIntradayNewsNow,
    resolveChatIds,
    checkProxy,
    buildCloudBriefPayload,
    claimDedupeKey,
    syncBriefToCloud,
  };
})();
window.TelegramService = TelegramService;
