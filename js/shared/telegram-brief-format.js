'use strict';
/** Browser shim — keep in sync with shared/telegram-brief.mjs */
const TelegramBriefFormat = (() => {
  const MAX_LEN = 4096;

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

  function formatMorningBrief(brief, extras, fmtPkr) {
    extras = extras || {};
    const fmt = fmtPkr || ((n) => '₨' + Math.round(n || 0).toLocaleString('en-PK'));
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
      `📊 *LedgerCap — Daily Brief* (${escapeMarkdown(day)} ${escapeMarkdown(pkt)})`,
    ];
    if (extras.dataAsOf) {
      const stale = extras.dataStale ? ' ⚠️ stale' : '';
      lines.push(`_Data as of ${escapeMarkdown(extras.dataAsOf)}${stale}_`);
    }
    lines.push(`Net worth: *${escapeMarkdown(fmt(netWorth))}* (${sign}${Number(dailyPct).toFixed(1)}% today)`);
    if (extras.invested) lines.push(`Invested: *${escapeMarkdown(fmt(extras.invested))}*`);
    if (extras.dailyPnl != null) {
      const dSign = extras.dailyPnl >= 0 ? '+' : '';
      lines.push(`Today P&L: *${dSign}${escapeMarkdown(fmt(extras.dailyPnl))}*`);
    }
    if (extras.totalPnl != null) {
      const tSign = extras.totalPnl >= 0 ? '+' : '';
      const tPct = extras.totalPnlPct != null ? ` (${tSign}${Number(extras.totalPnlPct).toFixed(1)}%)` : '';
      lines.push(`All-time P&L: *${tSign}${escapeMarkdown(fmt(extras.totalPnl))}*${tPct}`);
    }
    if (extras.usStocks?.length) {
      lines.push('', '*US / Intl holdings*');
      extras.usStocks.slice(0, 6).forEach((h) => {
        lines.push(`• *${escapeMarkdown(h.symbol)}* ${Number(h.qty || 0).toFixed(2)} sh · ${escapeMarkdown(fmt(h.valuePkr))}`);
      });
    }
    if (extras.portfolios?.length) {
      lines.push('', '*Portfolios*');
      extras.portfolios.slice(0, 6).forEach((p) => {
        const ps = (p.pnlPct || 0) >= 0 ? '+' : '';
        lines.push(`• *${escapeMarkdown(p.name)}* ${escapeMarkdown(fmt(p.value))} (${ps}${Number(p.pnlPct || 0).toFixed(1)}%)`);
      });
    }
    if (extras.dividends?.length) {
      lines.push('', '*Upcoming dividends*');
      extras.dividends.slice(0, 5).forEach((d) => {
        lines.push(`• *${escapeMarkdown(d.symbol)}* ex in ${d.days}d · ${escapeMarkdown(fmt(d.amountPkr))}/sh`);
      });
    }
    if (extras.news?.length) {
      lines.push('', '*News — your holdings*');
      extras.news.slice(0, 4).forEach((n) => {
        lines.push(`• [${escapeMarkdown(n.tag || 'News')}] *${escapeMarkdown(n.symbol)}* ${escapeMarkdown(n.title)}`);
      });
    }
    const signals = (brief?.urgent_signals || []).slice(0, 4);
    if (signals.length) {
      lines.push('', '*Signals*');
      signals.forEach((s) => {
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

  function formatPortfolioDigest(row, fmtPkr) {
    const fmt = fmtPkr || ((n) => '₨' + Math.round(n || 0).toLocaleString('en-PK'));
    if (!row || !(row.value > 0)) return '';
    const dSign = (row.dailyPnl || 0) >= 0 ? '+' : '';
    const pSign = (row.pnlPct || 0) >= 0 ? '+' : '';
    const lines = [
      `📊 *${escapeMarkdown(row.name)}*`,
      `Qeemat / Value: *${escapeMarkdown(fmt(row.value))}*`,
      `Aaj / Today: *${dSign}${escapeMarkdown(fmt(row.dailyPnl || 0))}* (${dSign}${Number(row.dailyPct || 0).toFixed(1)}%)`,
      `Kul / All-time: *${pSign}${Number(row.pnlPct || 0).toFixed(1)}%* · Faida ${escapeMarkdown(fmt(row.pnl || 0))}`,
      `Invested: ${escapeMarkdown(fmt(row.invested || 0))} · ${row.positions || 0} positions`,
      '',
      '_Rule-based — not financial advice._',
    ];
    return truncate(lines.join('\n'), 1200);
  }

  function formatNewsDigest(news, title) {
    const rows = (news || []).slice(0, 5);
    if (!rows.length) return '';
    const lines = [`📰 *${escapeMarkdown(title || 'News — your holdings')}*`, ''];
    rows.forEach((n) => {
      const src = n.source ? `[${escapeMarkdown(n.source)}] ` : '';
      lines.push(`• ${src}[${escapeMarkdown(n.tag || 'News')}] *${escapeMarkdown(n.symbol)}* ${escapeMarkdown(n.title)}`);
    });
    lines.push('', '_Rule-based — not financial advice._');
    return truncate(lines.join('\n'));
  }

  function formatPktTimestamp(iso) {
    if (!iso) return 'unknown';
    try {
      return new Intl.DateTimeFormat('en-PK', {
        timeZone: 'Asia/Karachi',
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(iso));
    } catch {
      return String(iso).slice(0, 16);
    }
  }

  return { MAX_LEN, escapeMarkdown, truncate, formatMorningBrief, formatPortfolioDigest, formatNewsDigest, formatPktTimestamp };
})();
window.TelegramBriefFormat = TelegramBriefFormat;
