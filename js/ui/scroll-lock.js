'use strict';
/** Ref-counted body pin for overlays (sheet, Cmd-K, pro modal, CapConfirm). Nested-safe. */
window.LcScrollLock = (() => {
  let depth = 0;
  let lockedY = null;
  let pendingRestoreY = null;

  function lock() {
    if (depth === 0) {
      lockedY = window.scrollY;
      Object.assign(document.body.style, {
        position: 'fixed',
        top: -lockedY + 'px',
        left: '0',
        right: '0',
        width: '100%',
      });
    }
    depth++;
  }

  /** @param {number} [restoreY] land here on final unlock (e.g. navigate out of a sheet) */
  function unlock(restoreY) {
    if (depth === 0) return;
    if (typeof restoreY === 'number') pendingRestoreY = restoreY;
    depth--;
    if (depth > 0) return;
    const y = pendingRestoreY == null ? lockedY : pendingRestoreY;
    lockedY = null;
    pendingRestoreY = null;
    Object.assign(document.body.style, { position: '', top: '', left: '', right: '', width: '' });
    window.scrollTo(0, y);
  }

  function isLocked() {
    return depth > 0;
  }

  return { lock, unlock, isLocked };
})();
