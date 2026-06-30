'use strict';
const LcDebounce = (() => {
  function debounce(fn, ms) {
    let t = null;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms || 150);
    };
  }
  return { debounce };
})();
window.LcDebounce = LcDebounce;
