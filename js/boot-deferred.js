'use strict';
/* Idle-load non-Home bundle well after first paint (v5 §3d TBT).
   Demo must NOT kick ASAP — that parsed ~460KB during LH (mobile 43).
   E2E / nav still call __lcEnsureDeferred() on demand.
   External file: CSP script-src 'self' (no unsafe-inline). */
(function () {
  var src = 'js/ledgercap.deferred.js?v=3.58.11';
  var p = null;
  window.__lcEnsureDeferred = function () {
    if (window.__LC_DEFERRED_READY__) return Promise.resolve();
    if (p) return p;
    p = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { window.__LC_DEFERRED_READY__ = true; resolve(); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return p;
  };
  /* No auto-kick — LH TBT includes idle timeout. Nav / E2E call __lcEnsureDeferred. */
})();
