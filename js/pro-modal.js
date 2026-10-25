'use strict';
(function () {
  window.APP_VERSION = window.LEDGERCAP_VERSION?.app || '3.58.6';

  function closeProModal() {
    const m = document.getElementById('proUpgradeModal');
    if (!m?.classList.contains('open')) return;
    m.classList.remove('open');
    window.LcScrollLock?.unlock();
  }

  window.openProUpgrade = function () {
    const m = document.getElementById('proUpgradeModal');
    if (!m || m.classList.contains('open')) return;
    m.classList.add('open');
    window.LcScrollLock?.lock();
  };
  window.closeProModal = closeProModal;

  const modal = document.getElementById('proUpgradeModal');
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeProModal();
    });
  }
})();
