'use strict';
(function () {
  window.APP_VERSION = window.LEDGERCAP_VERSION?.app || '3.44.0';
  window.openProUpgrade = function () {
    const m = document.getElementById('proUpgradeModal');
    if (m) m.classList.add('open');
  };
  const modal = document.getElementById('proUpgradeModal');
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
})();
