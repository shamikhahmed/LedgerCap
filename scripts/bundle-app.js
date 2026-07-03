#!/usr/bin/env node
'use strict';
/** Concatenate app modules → js/ledgercap.bundle.js (order preserved). */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const files = [
  'js/data/holdings.js',
  'js/data/us-stocks.js',
  'js/data/global-assets.js',
  'js/data/fundamentals.js',
  'js/data/dividends.js',
  'js/data/commodities.js',
  'js/data/psx-stocks.js',
  'js/data/config.js',
  'js/data/i18n-locales.js',
  'js/core/i18n.js',
  'js/engines/ledger.js',
  'js/engines/prices.js',
  'js/engines/insights.js',
  'js/engines/projections.js',
  'js/engines/analytics.js',
  'js/engines/ai-analysis.js',
  'js/services/market-data.js',
  'js/services/stock-service.js',
  'js/services/corporate-actions-service.js',
  'js/services/market-watch-service.js',
  'js/services/commodities-service.js',
  'js/services/dividend-analytics-service.js',
  'js/services/dividend-service.js',
  'js/services/research-service.js',
  'js/services/portfolio-analytics-service.js',
  'js/services/portfolio-buckets-service.js',
  'js/services/transaction-ledger-service.js',
  'js/services/fx-service.js',
  'js/services/psx-session.js',
  'js/services/price-snapshot.js',
  'js/services/news-service.js',
  'js/shared/telegram-brief-format.js',
  'js/services/secrets-vault.js',
  'js/services/history-series-service.js',
  'js/services/telegram-service.js',
  'js/services/pin-vault.js',
  'js/services/notification-scheduler.js',
  'js/services/glance-bridge.js',
  'js/services/backup-crypto.js',
  'js/services/cloud-backup-service.js',
  'js/services/statement-export.js',
  'js/services/price-alerts-service.js',
  'js/services/live-price-stream.js',
  'js/services/price-health.js',
  'js/services/intraday-signals.js',
  'js/services/buy-recommendations.js',
  'js/services/risk-audit-service.js',
  'js/engines/pilot-engine.js',
  'js/ui/charts.js',
  'js/ui/debounce.js',
  'js/ui/lc-events.js',
  'js/ui/icons.js',
  'js/ui/platform.js',
  'js/ui/psx-ui.js',
  'js/ui/tradingview.js',
  'js/ui/market-ui.js',
  'js/lc-desktop-nav.js',
  'js/lc-terminal.js',
  'js/ui/navigation.js',
  'js/modules/state.js',
  'js/modules/investment.js',
  'js/modules/hub.js',
  'js/modules/market.js',
  'js/modules/portfolio-screen.js',
  'js/modules/funds.js',
  'js/modules/screener.js',
  'js/modules/more.js',
  'js/modules/research.js',
  'js/modules/watchlist.js',
  'js/modules/dividends.js',
  'js/modules/wealth-calendar.js',
  'js/modules/transactions.js',
  'js/modules/settings.js',
  'js/modules/pin-lock.js',
  'js/modules/signals.js',
  'js/modules/risk-audit.js',
  'js/modules/insights.js',
  'js/modules/comparison.js',
  'js/modules/performance.js',
  'js/modules/journal.js',
  'js/modules/pilot-tools.js',
  'js/modules/paper-trade.js',
  'js/modules/onboarding.js',
  'js/modules/whats-new.js',
  'js/modules/global.js',
  'js/modules/commodities.js',
  'js/modules/announcements.js',
  'js/modules/zakat.js',
  'js/modules/import.js',
  'js/modules/intelligence.js',
  'js/capricorn-motion.js',
  'js/ui/motion-polish.js',
  'js/app.js',
];

const parts = [`/* LedgerCap bundle — ${files.length} modules — run: npm run bundle */`];
for (const rel of files) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    console.error('Missing:', rel);
    process.exit(1);
  }
  parts.push(`\n;/* === ${rel} === */\n`);
  parts.push(fs.readFileSync(abs, 'utf8'));
}

const out = path.join(root, 'js/ledgercap.bundle.js');
fs.writeFileSync(out, parts.join(''));
console.log(`Wrote ${out} (${files.length} files, ${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);

function patchBundleVersion() {
  const cfgPath = path.join(root, 'js/data/config.js');
  const cfg = fs.readFileSync(cfgPath, 'utf8');
  const m = cfg.match(/app:\s*'([^']+)'/);
  const ver = m ? m[1] : '0';
  const idxPath = path.join(root, 'index.html');
  let html = fs.readFileSync(idxPath, 'utf8');
  const next = `js/ledgercap.bundle.js?v=${ver}`;
  if (!html.includes(next)) {
    html = html.replace(/js\/ledgercap\.bundle\.js\?v=[^"']+/g, next);
    fs.writeFileSync(idxPath, html);
    console.log(`Patched index.html bundle cache buster → v=${ver}`);
  }
}
patchBundleVersion();
