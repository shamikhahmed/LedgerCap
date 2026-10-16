#!/usr/bin/env node
'use strict';
/**
 * Split LedgerCap into:
 *   js/ledgercap.bundle.js     — Home / hub cold path
 *   js/ledgercap.deferred.js   — non-Home screens + bulky catalogs (idle-loaded)
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

/** Cold path: hub, portfolio shell, demo seed, polish. */
const CORE = [
  'js/data/holdings.js',
  'js/data/config.js',
  'js/data/i18n-locales.js',
  'js/core/i18n.js',
  'js/engines/ledger.js',
  'js/engines/prices.js',
  'js/engines/insights.js',
  'js/engines/analytics.js',
  'js/services/market-data.js',
  'js/services/stock-service.js',
  'js/services/portfolio-buckets-service.js',
  'js/services/portfolio-analytics-service.js',
  'js/services/fx-service.js',
  'js/services/psx-session.js',
  'js/services/price-snapshot.js',
  'js/services/secrets-vault.js',
  'js/services/pin-vault.js',
  'js/ui/debounce.js',
  'js/ui/dialogs.js',
  'js/ui/lc-events.js',
  'js/ui/icons.js',
  'js/ui/platform.js',
  'js/ui/psx-ui.js',
  'js/ui/market-ui.js',
  'js/lc-desktop-nav.js',
  'js/lc-terminal.js',
  'js/ui/navigation.js',
  'js/modules/state.js',
  'js/modules/investment.js',
  'js/modules/hub.js',
  'js/modules/portfolio-screen.js',
  'js/modules/settings.js',
  'js/modules/pin-lock.js',
  'js/modules/onboarding.js',
  'js/modules/whats-new.js',
  'js/app.js',
];

/** Loaded after first paint / before leaving Home. */
const DEFERRED = [
  'js/ui/charts.js',
  'js/ui/tradingview.js',
  'js/services/fund-nav-service.js',
  'js/services/news-service.js',
  'js/services/notification-scheduler.js',
  'js/services/glance-bridge.js',
  'js/services/price-alerts-service.js',
  'js/services/live-price-stream.js',
  'js/services/price-health.js',
  'js/capricorn-motion.js',
  'js/ui/motion-polish.js',
  'js/data/us-stocks.js',
  'js/data/global-assets.js',
  'js/data/fundamentals.js',
  'js/data/dividends.js',
  'js/data/commodities.js',
  'js/data/psx-stocks.js',
  'js/engines/projections.js',
  'js/engines/ai-analysis.js',
  'js/services/corporate-actions-service.js',
  'js/services/market-watch-service.js',
  'js/services/commodities-service.js',
  'js/services/dividend-analytics-service.js',
  'js/services/dividend-service.js',
  'js/services/research-service.js',
  'js/services/transaction-ledger-service.js',
  'js/shared/telegram-brief-format.js',
  'js/services/history-series-service.js',
  'js/services/telegram-service.js',
  'js/services/backup-crypto.js',
  'js/services/cloud-backup-service.js',
  'js/services/statement-export.js',
  'js/services/intraday-signals.js',
  'js/services/buy-recommendations.js',
  'js/services/risk-audit-service.js',
  'js/engines/pilot-engine.js',
  'js/modules/market.js',
  'js/modules/funds.js',
  'js/modules/screener.js',
  'js/modules/more.js',
  'js/modules/research.js',
  'js/modules/watchlist.js',
  'js/modules/dividends.js',
  'js/modules/wealth-calendar.js',
  'js/modules/transactions.js',
  'js/modules/signals.js',
  'js/modules/risk-audit.js',
  'js/modules/insights.js',
  'js/modules/comparison.js',
  'js/modules/performance.js',
  'js/modules/journal.js',
  'js/modules/pilot-tools.js',
  'js/modules/paper-trade.js',
  'js/modules/global.js',
  'js/modules/commodities.js',
  'js/modules/announcements.js',
  'js/modules/zakat.js',
  'js/modules/import.js',
  'js/modules/intelligence.js',
];

function concat(files, banner) {
  const parts = [banner];
  for (const rel of files) {
    const abs = path.join(root, rel);
    if (!fs.existsSync(abs)) {
      console.error('Missing:', rel);
      process.exit(1);
    }
    parts.push(`\n;/* === ${rel} === */\n`);
    parts.push(fs.readFileSync(abs, 'utf8'));
  }
  return parts.join('');
}

const coreOut = path.join(root, 'js/ledgercap.bundle.js');
const defOut = path.join(root, 'js/ledgercap.deferred.js');
fs.writeFileSync(coreOut, concat(CORE, `/* LedgerCap CORE — ${CORE.length} modules — run: npm run bundle */`));
fs.writeFileSync(defOut, concat(DEFERRED, `/* LedgerCap DEFERRED — ${DEFERRED.length} modules — idle-loaded after Home */`));
console.log(`Wrote ${coreOut} (${CORE.length} files, ${(fs.statSync(coreOut).size / 1024).toFixed(0)} KB)`);
console.log(`Wrote ${defOut} (${DEFERRED.length} files, ${(fs.statSync(defOut).size / 1024).toFixed(0)} KB)`);

function patchBundleVersion() {
  const cfgPath = path.join(root, 'js/data/config.js');
  const cfg = fs.readFileSync(cfgPath, 'utf8');
  const m = cfg.match(/app:\s*'([^']+)'/);
  const ver = m ? m[1] : '0';
  const idxPath = path.join(root, 'index.html');
  let html = fs.readFileSync(idxPath, 'utf8');
  let changed = false;
  const nextCore = `js/ledgercap.bundle.js?v=${ver}`;
  const nextDef = `js/ledgercap.deferred.js?v=${ver}`;
  if (!html.includes(nextCore)) {
    html = html.replace(/js\/ledgercap\.bundle\.js\?v=[^"']+/g, nextCore);
    changed = true;
  }
  if (html.includes('ledgercap.deferred.js') && !html.includes(nextDef)) {
    html = html.replace(/js\/ledgercap\.deferred\.js\?v=[^"']+/g, nextDef);
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(idxPath, html);
    console.log(`Patched index.html bundle cache busters → v=${ver}`);
  }
}
patchBundleVersion();
