#!/usr/bin/env node
/**
 * Capture axe-core results for finish-loop (C-32).
 * Serves LedgerCap repo root via in-process static server.
 *
 *   npm run axe
 */
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const AXE_OUT = path.join(ROOT, 'qa', 'finish-loop', 'axe');
const ROUTES = [{ id: 'home-demo', path: '/?demo=1' }];
const THEMES = ['light', 'dark'];

// Prefer @axe-core/playwright; fall back to injecting axe-core from MasteryCap/PrismCap
let AxeBuilder;
try {
  AxeBuilder = (await import('@axe-core/playwright')).default;
} catch {
  AxeBuilder = null;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.map': 'application/json',
};

function startStaticServer() {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent((req.url || '/').split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const file = path.join(ROOT, p);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(fs.readFileSync(file));
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, base: `http://127.0.0.1:${port}` });
    });
  });
}

async function waitReady(page) {
  await page.waitForFunction(
    () => window.__APP_READY__ === true || document.documentElement.dataset.appReady === 'true',
    null,
    { timeout: 60000 },
  );
}

async function analyze(page, base) {
  // LedgerCap CSP blocks axe injection — strip CSP for this capture only.
  await page.route('**/*', async (route) => {
    try {
      const response = await route.fetch();
      const headers = { ...response.headers() };
      delete headers['content-security-policy'];
      delete headers['Content-Security-Policy'];
      await route.fulfill({ response, headers });
    } catch {
      await route.continue();
    }
  });

  if (AxeBuilder) {
    return new AxeBuilder({ page }).analyze();
  }
  const axePath = [
    path.join(ROOT, '../CookCap/node_modules/axe-core/axe.min.js'),
    path.join(ROOT, '../PrismCap/node_modules/axe-core/axe.min.js'),
  ].find((c) => fs.existsSync(c));
  if (!axePath) throw new Error('axe-core not found');
  await page.addScriptTag({ path: axePath });
  return page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    return axe.run(document, { resultTypes: ['violations', 'passes', 'incomplete', 'inapplicable'] });
  });
}

fs.mkdirSync(AXE_OUT, { recursive: true });
const { server, base } = await startStaticServer();
const browser = await chromium.launch();
const results = [];

try {
  for (const route of ROUTES) {
    for (const theme of THEMES) {
      const context = await browser.newContext({ viewport: { width: 393, height: 852 } });
      const page = await context.newPage();
      await page.addInitScript((t) => {
        try {
          localStorage.setItem('theme', t);
          localStorage.setItem('lc_theme', t);
          document.documentElement.setAttribute('data-theme', t);
          document.documentElement.classList.toggle('dark', t === 'dark');
        } catch (_) {}
      }, theme);
      await page.goto(base + route.path, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await waitReady(page).catch(async () => {
        await page.waitForTimeout(4000);
      });
      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t);
        document.documentElement.classList.toggle('dark', t === 'dark');
        const banner = document.getElementById('cap-demo-banner');
        if (banner) banner.hidden = true;
      }, theme);
      await page.waitForTimeout(600);

      const axe = await analyze(page, base);
      const outName = `${route.id}-${theme}.json`;
      fs.writeFileSync(
        path.join(AXE_OUT, outName),
        JSON.stringify(
          {
            url: page.url(),
            route: route.id,
            theme,
            timestamp: new Date().toISOString(),
            violations: axe.violations,
            passes: axe.passes?.length ?? 0,
            incomplete: axe.incomplete?.length ?? 0,
            inapplicable: axe.inapplicable?.length ?? 0,
          },
          null,
          2,
        ),
      );
      const serious = (axe.violations || []).filter((v) => v.impact === 'serious' || v.impact === 'critical');
      results.push({
        file: outName,
        violations: (axe.violations || []).length,
        serious: serious.length,
        ids: serious.map((v) => v.id),
      });
      await context.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

console.log(JSON.stringify(results, null, 2));
process.exit(results.some((r) => r.serious > 0) ? 1 : 0);
