'use strict';
/** Gate: VERSION.json ↔ sw.js CACHE ↔ LEDGERCAP_VERSION ↔ package.json ↔ manifest. */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
let failed = 0;
function check(name, ok, detail = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : `  (${detail})`}`);
  if (!ok) failed++;
}

const ver = JSON.parse(fs.readFileSync(path.join(root, 'VERSION.json'), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const man = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const cfg = fs.readFileSync(path.join(root, 'js/data/config.js'), 'utf8');
const bundle = fs.readFileSync(path.join(root, 'js/ledgercap.bundle.js'), 'utf8');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const boot = fs.readFileSync(path.join(root, 'js/boot-deferred.js'), 'utf8');

const swCache = (sw.match(/const CACHE = '([^']+)'/) || [])[1];
const cfgApp = (cfg.match(/app:\s*'([^']+)'/) || [])[1];
const cfgCache = (cfg.match(/cache:\s*'([^']+)'/) || [])[1];
const bundleApp = (bundle.match(/app:\s*'([^']+)'/) || [])[1];
const bundleCache = (bundle.match(/cache:\s*'([^']+)'/) || [])[1];

check('VERSION.json version === package.json', ver.version === pkg.version, `${ver.version} vs ${pkg.version}`);
check('VERSION.json version === manifest', ver.version === man.version, `${ver.version} vs ${man.version}`);
check('VERSION.json swCache === sw.js CACHE', ver.swCache === swCache, `${ver.swCache} vs ${swCache}`);
check('config LEDGERCAP_VERSION.app === VERSION', cfgApp === ver.version, `${cfgApp} vs ${ver.version}`);
check('config LEDGERCAP_VERSION.cache === swCache', cfgCache === ver.swCache, `${cfgCache} vs ${ver.swCache}`);
check('bundle mirrors config app', bundleApp === ver.version, `${bundleApp} vs ${ver.version}`);
check('bundle mirrors config cache', bundleCache === ver.swCache, `${bundleCache} vs ${ver.swCache}`);
check('index.html cache-bust matches version', index.includes(`?v=${ver.version}`), ver.version);
check('manifest description avoids wealth OS (G-3)', !/wealth\s+operating\s+system/i.test(man.description || ''));
check('SW precaches theme-boot.js', /theme-boot\.js/.test(sw));
check('SW precaches hig-dt.js', /hig-dt\.js/.test(sw));
check('SW precaches pro-modal.js', /pro-modal\.js/.test(sw));
check('SW precaches boot-deferred.js', /boot-deferred\.js/.test(sw));
check('index loads boot-deferred.js (no inline idle-load script)', /boot-deferred\.js\?v=/.test(index) && !/<script>\s*\/\* Idle-load/.test(index));
check('SW no auto skipWaiting/clients.claim', !/^\s*self\.skipWaiting\(\);|clients\.claim\(\)/m.test(sw));
check(
  'boot-deferred derives deferred ?v= from LEDGERCAP_VERSION (matches VERSION via config)',
  /LEDGERCAP_VERSION/.test(boot)
    && /ledgercap\.deferred\.js/.test(boot)
    && !/ledgercap\.deferred\.js\?v=\d+\.\d+\.\d+/.test(boot)
    && cfgApp === ver.version,
  ver.version,
);

if (failed) {
  console.error(`\nversion-coherence: ${failed} failed`);
  process.exit(1);
}
console.log('\nversion-coherence: all passed');
