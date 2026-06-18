'use strict';
const CapMotion = (() => {
  function refresh() {
    if (typeof CapricornMotion !== 'undefined' && CapricornMotion.refresh) {
      CapricornMotion.refresh();
      return;
    }
    document.querySelectorAll('.cap-reveal:not(.is-visible)').forEach(el => el.classList.add('is-visible'));
  }
  return { refresh };
})();
window.CapMotion = CapMotion;
