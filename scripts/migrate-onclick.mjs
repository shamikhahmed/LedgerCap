#!/usr/bin/env node
'use strict';
/** Bulk migrate inline onclick/onchange to data-action / data-nav (CSP-safe). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const GLOBS = ['js/**/*.js', 'index.html', 'pitch.html', 'presentation.html'];

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.name === 'node_modules' || ent.name === '.git') continue;
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(js|html)$/.test(ent.name) && !ent.name.includes('.bundle.')) acc.push(p);
  }
  return acc;
}

function migrateContent(src, file) {
  let n = 0;
  const repl = (match, expr) => {
    n++;
    expr = expr.trim();
    const nav = expr.match(/^Navigation\.go\(['"]([^'"]+)['"]/);
    if (nav) return `data-nav="${nav[1]}"`;
    const open = expr.match(/^Research\.open\(['"]([^'"]+)['"]\)/);
    if (open) return `data-action="Research.open" data-symbol="${open[1]}"`;
    const pick = expr.match(/^Research\.pickSymbol\(['"]([^'"]+)['"]\)/);
    if (pick) return `data-action="Research.pickSymbol" data-symbol="${pick[1]}"`;
    const setTab = expr.match(/^(\w+)\.setTab\(['"]([^'"]+)['"]\)/);
    if (setTab) return `data-action="${setTab[1]}.setTab" data-tab="${setTab[2]}"`;
    const renderTab = expr.match(/^PilotTools\.render\(null,\s*['"]([^'"]+)['"]\)/);
    if (renderTab) return `data-action="PilotTools.render" data-tab="${renderTab[1]}"`;
    const renderNull = expr.match(/^(\w+)\.render\(null,\s*['"]([^'"]+)['"]\)/);
    if (renderNull) return `data-action="${renderNull[1]}.render" data-tab="${renderNull[2]}"`;
    const runScreen = expr.match(/^PilotTools\.runScreen\((\{[^}]+\})\)/);
    if (runScreen) return `data-action="PilotTools.runScreen" data-payload='${runScreen[1].replace(/'/g, '&#39;')}'`;
    const calc = expr.match(/^PilotTools\.calc\(['"]([^'"]+)['"]\)/);
    if (calc) return `data-action="PilotTools.calc" data-tab="${calc[1]}"`;
    const openBuy = expr.match(/^PaperTrade\.openBuy\(['"]?([^'")]+)['"]?\)/);
    if (openBuy) return `data-action="PaperTrade.openBuy" data-symbol="${openBuy[1]}"`;
    const alert = expr.match(/^App\.openPriceAlert\(['"]([^'"]+)['"]\)/);
    if (alert) return `data-action="App.openPriceAlert" data-symbol="${alert[1]}"`;
    const theme = expr.match(/^window\.toggleTheme\?\.\(\)/);
    if (theme) return `data-action="window.toggleTheme"`;
    const dismiss = expr.match(/^App\.dismissDemo\(\)/);
    if (dismiss) return `data-action="App.dismissDemo"`;
    const closeBs = expr.match(/^App\.closeBottomSheet\(\)/);
    if (closeBs) return `data-action="App.closeBottomSheet"`;
    const closeModal = expr.match(/^document\.getElementById\(['"]proUpgradeModal['"]\)\.classList\.remove\(['"]open['"]\)/);
    if (closeModal) return `data-action="LcEvents.closeProModal"`;
    const toggleCur = expr.match(/^App\.toggleDisplayCurrency\(\)/);
    if (toggleCur) return `data-action="App.toggleDisplayCurrency"`;
    const fs = expr.match(/^LcTerminal\.toggle\(\)/);
    if (fs) return `data-action="LcTerminal.toggle"`;
    const openAdd = expr.match(/^App\.openAddTransaction\(\)/);
    if (openAdd) return `data-action="App.openAddTransaction"`;
    const openPort = expr.match(/^App\.openAddPortfolio\(\)/);
    if (openPort) return `data-action="App.openAddPortfolio"`;
    const refresh = expr.match(/^App\.refreshPrices\(\)/);
    if (refresh) return `data-action="App.refreshPrices"`;
    const pro = expr.match(/^openProUpgrade\(\)/);
    if (pro) return `data-action="openProUpgrade"`;
    const fnNoArg = expr.match(/^([\w.]+)\(\)$/);
    if (fnNoArg) return `data-action="${fnNoArg[1]}"`;
    const fnOneStr = expr.match(/^([\w.]+)\(['"]([^'"]*)['"]\)$/);
    if (fnOneStr) return `data-action="${fnOneStr[1]}" data-tab="${fnOneStr[2]}"`;
    console.warn('  unmigrated onclick:', expr.slice(0, 80), 'in', path.basename(file));
    return match;
  };

  src = src.replace(/\bonclick="([^"]+)"/g, repl);

  src = src.replace(/\bonchange="PilotTools\.setTarget\('([^']+)','([^']*)',this\.value\)"/g, (_, sym, broker) => {
    n++;
    return `data-action-change="PilotTools.setTarget" data-symbol="${sym}" data-broker="${broker}"`;
  });
  src = src.replace(/\bonchange="PilotTools\.setAcquired\('([^']+)','([^']*)',this\.value\)"/g, (_, sym, broker) => {
    n++;
    return `data-action-change="PilotTools.setAcquired" data-symbol="${sym}" data-broker="${broker}"`;
  });
  src = src.replace(/\bonchange="([^"]+)"/g, (match, expr) => {
    if (expr.includes('data-action-change')) return match;
    const m = expr.match(/^([\w.]+)\((.+)\)$/);
    if (m) {
      n++;
      return `data-action-change="${m[1]}"`;
    }
    return match;
  });

  return { src, n };
}

const files = walk(root).filter((f) => !f.includes('migrate-onclick') && !f.includes('lc-events.js'));
let total = 0;
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  if (!/\bon(click|change)=/.test(raw)) continue;
  const { src, n } = migrateContent(raw, file);
  if (n) {
    fs.writeFileSync(file, src);
    console.log(path.relative(root, file), n);
    total += n;
  }
}
console.log('migrated', total);
