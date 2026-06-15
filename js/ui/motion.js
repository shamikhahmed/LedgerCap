'use strict';
const CapMotion = (() => {
  function refresh() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = document.querySelectorAll('.cap-reveal:not(.is-visible)');
    if (!reveals.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -2% 0px' });
    reveals.forEach(el => io.observe(el));
  }
  return { refresh };
})();
window.CapMotion = CapMotion;
