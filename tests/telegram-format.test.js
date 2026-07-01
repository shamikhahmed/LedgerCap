'use strict';
/** Node unit tests — Telegram message formatting (no network). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'js/services/telegram-service.js'), 'utf8');
const ctx = {
  window: { LEDGERCAP_CONFIG: { psxProxyUrl: 'https://ledgercap-psx-proxy.example.workers.dev' } },
  resolvePsxProxyUrl: u => (u || 'https://ledgercap-psx-proxy.example.workers.dev').replace(/\/$/, ''),
  console,
};
ctx.window.State = { get: () => ({ settings: {} }) };
vm.createContext(ctx);
vm.runInContext(code, ctx);
const Ts = ctx.window.TelegramService;

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) { passed++; return; }
  failed++;
  console.error('FAIL:', msg);
}

assert(Ts.escapeMarkdown('a_b*c') === 'a\\_b\\*c', 'escapeMarkdown specials');
assert(Ts.truncate('x'.repeat(5000), 4096).length === 4096, 'truncate to 4096');
assert(Ts.truncate('short').length === 5, 'truncate short unchanged');

const brief = {
  urgent_signals: [
    { symbol: 'LUCK', action: 'SELL', rationale: 'Trim — concentration 28%' },
    { symbol: 'OGDC', action: 'ADD', rationale: 'Underweight vs target' },
  ],
  action_counts: { SELL: 1, ADD: 1, HOLD: 10 },
};
const msg = Ts.formatMorningBrief(brief, { netWorth: 2000000, dailyPct: 1.2, pilotScore: { grade: 'B', score: 72 }, weekdayLabel: 'Tue', pktLabel: '9:00 PKT' });
assert(msg.includes('Daily Brief'), 'brief title');
assert(msg.includes('LUCK'), 'brief symbol');
assert(msg.includes('Pilot Score'), 'brief score');
assert(msg.length <= 4096, 'brief within limit');
assert(!msg.includes('a_b'), 'brief escaped content');

const rich = Ts.formatMorningBrief(brief, {
  netWorth: 2000000,
  dailyPct: 1.2,
  invested: 1800000,
  dailyPnl: 24000,
  totalPnl: 49000,
  totalPnlPct: 2.4,
  pilotScore: { grade: 'B', score: 72 },
  portfolios: [{ name: 'Rafi', value: 570000, pnlPct: 2.3 }],
  dividends: [{ symbol: 'HUBC', days: 5, amountPkr: 12.5 }],
  news: [{ symbol: 'LUCK', title: 'Earnings beat', tag: 'Earnings' }],
  weekdayLabel: 'Tue',
  pktLabel: '9:00 PKT',
});
assert(rich.includes('Portfolios'), 'brief portfolios section');
assert(rich.includes('Upcoming dividends'), 'brief dividends section');
assert(rich.includes('News'), 'brief news section');
assert(rich.includes('Today P&L'), 'brief daily pnl');

const div = Ts.formatDividendReminder([{ symbol: 'HUBC', days: 5, amountPkr: 12.5 }]);
assert(div.includes('HUBC'), 'dividend symbol');

assert(Ts.buildProxyUrl('sendMessage') === 'https://ledgercap-psx-proxy.example.workers.dev/telegram/bot/sendMessage', 'proxy url for PK');
assert(Ts.buildProxyUrl('getUpdates')?.includes('/telegram/bot/getUpdates'), 'getUpdates proxy path');

console.log(`telegram-format: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
