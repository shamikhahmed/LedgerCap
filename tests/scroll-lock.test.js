'use strict';
/** Static: shared LcScrollLock is wired for sheet / dialogs / cmdk / pro modal. */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
let failed = 0;
function check(name, ok, detail = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : `  (${detail})`}`);
  if (!ok) failed++;
}

const lock = fs.readFileSync(path.join(root, 'js/ui/scroll-lock.js'), 'utf8');
const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
const dialogs = fs.readFileSync(path.join(root, 'js/ui/dialogs.js'), 'utf8');
const polish = fs.readFileSync(path.join(root, 'js/ui/motion-polish.js'), 'utf8');
const pro = fs.readFileSync(path.join(root, 'js/pro-modal.js'), 'utf8');
const bundleScript = fs.readFileSync(path.join(root, 'scripts/bundle-app.js'), 'utf8');

check('LcScrollLock is ref-counted', /let depth = 0/.test(lock) && /depth\+\+/.test(lock) && /depth--/.test(lock));
check('bundle includes scroll-lock.js', /js\/ui\/scroll-lock\.js/.test(bundleScript));
check('App sheet uses LcScrollLock', /LcScrollLock\?\.lock/.test(app) && /LcScrollLock\?\.unlock/.test(app));
check('CapConfirm dialogs use LcScrollLock', /LcScrollLock\?\.lock/.test(dialogs) && /LcScrollLock\?\.unlock/.test(dialogs));
check('Cmd-K uses LcScrollLock', /LcScrollLock\?\.lock/.test(polish) && /LcScrollLock\?\.unlock/.test(polish));
check('Pro modal uses LcScrollLock', /LcScrollLock\?\.lock/.test(pro) && /LcScrollLock\?\.unlock/.test(pro));

const pin = fs.readFileSync(path.join(root, 'js/modules/pin-lock.js'), 'utf8');
check('PIN lock uses LcScrollLock', /LcScrollLock\?\.lock/.test(pin) && /LcScrollLock\?\.unlock/.test(pin));

if (failed) {
  console.error(`\nscroll-lock: ${failed} failed`);
  process.exit(1);
}
console.log('\nscroll-lock: all passed');
