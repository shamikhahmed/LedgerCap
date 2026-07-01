/** Telegram cron, brief sync, and Bot API proxy (Pakistan-safe). */

const TG_API = 'https://api.telegram.org/bot';
const MAX_LEN = 4096;
const ALLOWED_BOT_METHODS = new Set(['sendMessage', 'getUpdates', 'getMe']);

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Telegram-Bot-Token, X-LedgerCap-Sync-Key',
};

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
  const fmtPkr = n => '₨' + Math.round(n || 0).toLocaleString('en-PK');
  const lines = [
    `📊 *LedgerCap — Daily Brief* (${escapeMarkdown(day)} ${escapeMarkdown(pkt)})`,
    `Net worth: *${escapeMarkdown(fmtPkr(netWorth))}* (${sign}${Number(dailyPct).toFixed(1)}% today)`,
  ];
  if (extras.invested) lines.push(`Invested: *${escapeMarkdown(fmtPkr(extras.invested))}*`);
  if (extras.dailyPnl != null) {
    const dSign = extras.dailyPnl >= 0 ? '+' : '';
    lines.push(`Today P&L: *${dSign}${escapeMarkdown(fmtPkr(extras.dailyPnl))}*`);
  }
  if (extras.totalPnl != null) {
    const tSign = extras.totalPnl >= 0 ? '+' : '';
    const tPct = extras.totalPnlPct != null ? ` (${tSign}${Number(extras.totalPnlPct).toFixed(1)}%)` : '';
    lines.push(`All-time P&L: *${tSign}${escapeMarkdown(fmtPkr(extras.totalPnl))}*${tPct}`);
  }
  if (extras.portfolios?.length) {
    lines.push('', '*Portfolios*');
    extras.portfolios.slice(0, 6).forEach(p => {
      const ps = (p.pnlPct || 0) >= 0 ? '+' : '';
      lines.push(`• *${escapeMarkdown(p.name)}* ${escapeMarkdown(fmtPkr(p.value))} (${ps}${Number(p.pnlPct || 0).toFixed(1)}%)`);
    });
  }
  if (extras.dividends?.length) {
    lines.push('', '*Upcoming dividends*');
    extras.dividends.slice(0, 5).forEach(d => {
      lines.push(`• *${escapeMarkdown(d.symbol)}* ex in ${d.days}d · ${escapeMarkdown(fmtPkr(d.amountPkr))}/sh`);
    });
  }
  if (extras.news?.length) {
    lines.push('', '*News — your holdings*');
    extras.news.slice(0, 4).forEach(n => {
      lines.push(`• [${escapeMarkdown(n.tag || 'News')}] *${escapeMarkdown(n.symbol)}* ${escapeMarkdown(n.title)}`);
    });
  }
  const signals = (brief?.urgent_signals || []).slice(0, 4);
  if (signals.length) {
    lines.push('', '*Signals*');
    signals.forEach(s => {
      const em = actionEmoji[s.action] || '•';
      const rat = escapeMarkdown((s.rationale || '').slice(0, 100));
      lines.push(`${em} ${escapeMarkdown(s.action)}: *${escapeMarkdown(s.symbol)}* — ${rat}`);
    });
  }
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
  return {
    weekday: get('weekday') || '',
    hour: parseInt(get('hour') || '0', 10),
    minute: parseInt(get('minute') || '0', 10),
  };
}

function isWeekday(wd) {
  return wd && !['Sat', 'Sun'].includes(wd);
}

function validBotToken(token) {
  return typeof token === 'string' && /^\d+:[A-Za-z0-9_-]+$/.test(token.trim());
}

/** Forward whitelisted Bot API calls — browser → worker → api.telegram.org */
async function handleBotProxy(request, path) {
  if (!path.startsWith('telegram/bot/')) return null;
  const method = path.slice('telegram/bot/'.length).split('/')[0];
  if (!ALLOWED_BOT_METHODS.has(method)) {
    return json({ ok: false, description: 'Bot API method not allowed' }, 403);
  }

  const token = (request.headers.get('X-Telegram-Bot-Token') || '').trim();
  if (!validBotToken(token)) {
    return json({ ok: false, description: 'Missing or invalid X-Telegram-Bot-Token header' }, 401);
  }

  const tgUrl = `${TG_API}${token}/${method}`;
  const headers = { Accept: 'application/json' };
  let fetchOpts = { method: request.method, headers };

  if (request.method === 'POST') {
    headers['Content-Type'] = 'application/json';
    const body = await request.text();
    if (body.length > 16000) return json({ ok: false, description: 'Payload too large' }, 413);
    fetchOpts.body = body;
  } else if (request.method !== 'GET') {
    return json({ ok: false, description: 'Method not allowed' }, 405);
  }

  try {
    const res = await fetch(tgUrl, fetchOpts);
    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return json({ ok: false, description: e.message || 'Telegram upstream failed' }, 502);
  }
}

export async function handleTelegramRequest(request, env, url) {
  const path = url.pathname.replace(/^\//, '');

  if (request.method === 'OPTIONS' && path.startsWith('telegram/')) {
    return new Response(null, { headers: CORS });
  }

  const proxied = await handleBotProxy(request, path);
  if (proxied) return proxied;

  if (path === 'telegram/sync' && request.method === 'POST') {
    const syncKey = request.headers.get('X-LedgerCap-Sync-Key') || '';
    if (!env.TELEGRAM_SYNC_KEY || syncKey !== env.TELEGRAM_SYNC_KEY) {
      return json({ error: 'Unauthorized' }, 401);
    }
    if (!env.TELEGRAM_BRIEF) {
      return json({ error: 'KV not configured — see worker/README.md' }, 503);
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400);
    }
    const raw = JSON.stringify(body);
    if (raw.length > 12000) return json({ error: 'Payload too large' }, 413);
    if (body.transactions || body.transactions?.length) {
      return json({ error: 'Do not upload transaction history' }, 400);
    }
    await env.TELEGRAM_BRIEF.put('latest', raw, { expirationTtl: 172800 });
    return json({ ok: true, bytes: raw.length });
  }

  if (path === 'telegram/ping' && request.method === 'GET') {
    return json({
      ok: true,
      proxy: true,
      allowedMethods: [...ALLOWED_BOT_METHODS],
      cronConfigured: !!(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID),
      kv: !!env.TELEGRAM_BRIEF,
      syncKeySet: !!env.TELEGRAM_SYNC_KEY,
    });
  }

  return null;
}

export async function runTelegramCron(env) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { skipped: 'secrets missing' };

  const pkt = pktParts();
  if (!isWeekday(pkt.weekday)) return { skipped: 'weekend' };
  if (pkt.hour !== 9 || pkt.minute >= 20) return { skipped: 'outside 9:00–9:20 PKT window' };

  let payload = null;
  if (env.TELEGRAM_BRIEF) {
    const raw = await env.TELEGRAM_BRIEF.get('latest');
    if (raw) {
      try { payload = JSON.parse(raw); } catch { /* ignore */ }
    }
  }

  let text;
  if (payload?.brief) {
    text = formatMorningBrief(payload.brief, {
      ...(payload.extras || {}),
      weekdayLabel: pkt.weekday,
      pktLabel: '9:00 PKT',
    });
  } else {
    text = truncate([
      '📊 *LedgerCap — Morning Brief*',
      'Open the app once to sync your portfolio brief to the cloud (Settings → Telegram).',
      '_Rule-based — not financial advice._',
    ].join('\n'));
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: !!data.ok, messageId: data.result?.message_id, error: data.description };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}
