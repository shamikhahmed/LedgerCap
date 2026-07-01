/** Telegram cron, brief sync, and Bot API proxy (Pakistan-safe). */

import {
  escapeMarkdown,
  truncate,
  formatMorningBrief,
  formatPktTimestamp,
  formatPortfolioDigest,
  formatMarketOpenDigest,
  formatNewsDigest,
} from '../../shared/telegram-brief.mjs';
import { aggregatePortfolioNews } from './news.js';

const TG_API = 'https://api.telegram.org/bot';
const ALLOWED_BOT_METHODS = new Set(['sendMessage', 'getUpdates', 'getMe']);

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Telegram-Bot-Token, X-LedgerCap-Sync-Key',
};

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
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const dateKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Karachi' }).format(now);
  return {
    weekday: get('weekday') || '',
    hour: parseInt(get('hour') || '0', 10),
    minute: parseInt(get('minute') || '0', 10),
    dateKey,
  };
}

function isWeekday(wd) {
  return wd && !['Sat', 'Sun'].includes(wd);
}

function validBotToken(token) {
  return typeof token === 'string' && /^\d+:[A-Za-z0-9_-]+$/.test(token.trim());
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fmtPkr(n) {
  return '₨' + Math.round(n || 0).toLocaleString('en-PK');
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
  const fetchOpts = { method: request.method, headers };

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

async function postTelegramMessage(token, chatId, text) {
  let lastErr = 'send failed';
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${TG_API}${token}/sendMessage`, {
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
      if (data.ok) return { ok: true, messageId: data.result?.message_id };
      lastErr = data.description || `HTTP ${res.status}`;
    } catch (e) {
      lastErr = e.message || 'network error';
    }
    if (attempt < 2) await sleep(400 * (attempt + 1));
  }
  return { ok: false, error: lastErr };
}

export async function handleTelegramRequest(request, env, url) {
  const path = url.pathname.replace(/^\//, '');

  if (request.method === 'OPTIONS' && path.startsWith('telegram/')) {
    return new Response(null, { headers: CORS });
  }

  const proxied = await handleBotProxy(request, path);
  if (proxied) return proxied;

  if (path === 'telegram/claim' && request.method === 'POST') {
    const syncKey = request.headers.get('X-LedgerCap-Sync-Key') || '';
    if (!env.TELEGRAM_SYNC_KEY || syncKey !== env.TELEGRAM_SYNC_KEY) {
      return json({ error: 'Unauthorized' }, 401);
    }
    if (!env.TELEGRAM_BRIEF) {
      return json({ error: 'KV not configured' }, 503);
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400);
    }
    const key = String(body.key || '').slice(0, 120);
    if (!key) return json({ error: 'key required' }, 400);
    const ttl = Math.min(Math.max(parseInt(body.ttlSec, 10) || 86400, 300), 604800);
    const kvKey = `claim:${key}`;
    const existing = await env.TELEGRAM_BRIEF.get(kvKey);
    if (existing) return json({ ok: true, claimed: false, via: 'kv' });
    await env.TELEGRAM_BRIEF.put(kvKey, String(Date.now()), { expirationTtl: ttl });
    return json({ ok: true, claimed: true, via: 'kv' });
  }

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
    return json({ ok: true, bytes: raw.length, updatedAt: body.updatedAt || new Date().toISOString() });
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

function detectSlot(pkt) {
  if (pkt.hour === 9 && pkt.minute < 25) return 'pre_open';
  if (pkt.hour === 9 && pkt.minute >= 30) return 'open';
  if (pkt.hour === 12 && pkt.minute >= 25 && pkt.minute < 45) return 'midday';
  if (pkt.hour === 15 && pkt.minute >= 25 && pkt.minute < 45) return 'close';
  if ([10, 11, 13, 14].includes(pkt.hour) && pkt.minute < 20) return 'news_intraday';
  return null;
}

async function loadPayload(env) {
  if (!env.TELEGRAM_BRIEF) return null;
  const raw = await env.TELEGRAM_BRIEF.get('latest');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

async function markSent(env, key) {
  if (env.TELEGRAM_BRIEF) {
    await env.TELEGRAM_BRIEF.put(key, String(Date.now()), { expirationTtl: 90000 });
  }
}

export async function runTelegramCron(env) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { skipped: 'secrets missing' };

  const pkt = pktParts();
  if (!isWeekday(pkt.weekday)) return { skipped: 'weekend' };

  const slot = detectSlot(pkt);
  if (!slot) return { skipped: 'outside schedule window' };

  const sentKey = slot === 'news_intraday'
    ? `sent:${slot}:${pkt.dateKey}-${pkt.hour}`
    : `sent:${slot}:${pkt.dateKey}`;
  if (env.TELEGRAM_BRIEF) {
    const already = await env.TELEGRAM_BRIEF.get(sentKey);
    if (already) return { skipped: `already sent ${slot}` };
  }

  const payload = await loadPayload(env);
  const extras = payload?.extras || {};
  const updatedAt = payload?.updatedAt;
  const ageMs = updatedAt ? Date.now() - new Date(updatedAt).getTime() : null;
  const staleNote = ageMs != null && ageMs > 24 * 3600000
    ? `\n_Data as of ${formatPktTimestamp(updatedAt)} — stale, open app to sync_`
    : updatedAt ? `\n_Data as of ${formatPktTimestamp(updatedAt)}_` : '';

  const portfolioRows = extras.portfolioDigests || extras.portfolios || [];
  const sent = [];

  if (slot === 'pre_open' || slot === 'close') {
    const label = slot === 'pre_open' ? 'Pre-open' : 'Close';
    for (const row of portfolioRows) {
      if (!(row.value > 0)) continue;
      let text = formatPortfolioDigest(row, fmtPkr);
      if (!text) continue;
      if (slot === 'close') text = `🌙 *${label} — ${row.name}*${staleNote}\n\n${text}`;
      else text = `${text}${staleNote}`;
      const r = await postTelegramMessage(token, chatId, text);
      sent.push(r);
      if (!r.ok) break;
      await sleep(350);
    }
    if (!portfolioRows.length) {
      const r = await postTelegramMessage(token, chatId, truncate([
        `📊 *LedgerCap — ${label}*`,
        'Open the app once → Settings → Telegram → sync brief.',
        '_Rule-based — not financial advice._',
      ].join('\n')));
      sent.push(r);
    }
  } else if (slot === 'open') {
    let text = formatMarketOpenDigest(extras);
    if (text) {
      text += staleNote;
      sent.push(await postTelegramMessage(token, chatId, text));
    }
    const news = formatNewsDigest(extras.news, 'Subah ki khabrain / Morning news');
    if (news) sent.push(await postTelegramMessage(token, chatId, news + staleNote));
  } else if (slot === 'midday') {
    const net = extras.netWorth || 0;
    const daily = extras.dailyPnl || 0;
    const sign = daily >= 0 ? '+' : '';
    const text = truncate([
      '☀️ *Dopahar pulse / Midday*',
      `Net worth: *${fmtPkr(net)}*`,
      `Aaj / Today: *${sign}${fmtPkr(daily)}* (${sign}${Number(extras.dailyPct || 0).toFixed(1)}%)`,
      staleNote.trim(),
      '',
      '_Rule-based — not financial advice._',
    ].filter(Boolean).join('\n'));
    sent.push(await postTelegramMessage(token, chatId, text));
    const middayNews = formatNewsDigest(extras.news, 'Dopahar ki khabrain / Midday news');
    if (middayNews) sent.push(await postTelegramMessage(token, chatId, middayNews + staleNote));
  } else if (slot === 'news_intraday') {
    const syms = extras.newsSymbols || [];
    const uniq = [...new Set(syms.filter((s) => s && !['—', 'PSX', 'Macro'].includes(s)))].slice(0, 6);
    let rows = [];
    try {
      const articles = await aggregatePortfolioNews(uniq.map((s) => ({ symbol: s, kind: 'stock' })), { limit: 8 });
      rows = articles.slice(0, 5).map((a) => ({
        symbol: a.portfolioSymbol || a.symbol || '—',
        title: (a.title || '').slice(0, 72),
        tag: 'News',
        source: a.source || a.publisher,
      }));
    } catch (_) {}
    if (!rows.length && extras.news?.length) rows = extras.news.slice(0, 5);
    const news = formatNewsDigest(rows, 'Din ki khabrain / Intraday news');
    if (news) sent.push(await postTelegramMessage(token, chatId, news + staleNote));
  }

  const ok = sent.length > 0 && sent.every((r) => r.ok);
  if (ok) await markSent(env, sentKey);
  else if (sent.some((r) => !r.ok) && env.TELEGRAM_BRIEF) {
    const err = sent.find((r) => !r.ok)?.error || 'send failed';
    await env.TELEGRAM_BRIEF.put(`cron_fail:${slot}:${pkt.dateKey}`, JSON.stringify({ error: err, ts: new Date().toISOString() }), { expirationTtl: 604800 });
    console.error('telegram cron send failed', slot, err);
  }
  return { ok, slot, messages: sent.length, errors: sent.filter((r) => !r.ok).map((r) => r.error) };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

export { escapeMarkdown, truncate, formatMorningBrief };
