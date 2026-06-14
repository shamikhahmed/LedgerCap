/* Capricorn motion + LedgerCap page transitions */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function refreshReveals(root) {
    var scope = root || document;
    var reveals = scope.querySelectorAll('.cap-reveal, .cap-reveal-scale, .cap-reveal-lines');
    if (!reveals.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el, i) {
      el.classList.remove('is-visible');
      if (!el.style.getPropertyValue('--cap-stagger-i')) {
        var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : i;
        el.style.setProperty('--cap-stagger-i', String(sib % 8));
      }
      io.observe(el);
    });
  }

  function transitionScreen(prevEl, nextId) {
    if (reduced || !prevEl) return;
    prevEl.classList.add('screen-exit');
    setTimeout(function () { prevEl.classList.remove('screen-exit'); }, 260);
    var next = document.getElementById('screen-' + nextId);
    if (next) {
      next.style.opacity = '0';
      next.style.transform = 'translateY(10px)';
      requestAnimationFrame(function () {
        next.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
        next.style.opacity = '1';
        next.style.transform = 'translateY(0)';
        setTimeout(function () { next.style.transition = ''; next.style.opacity = ''; next.style.transform = ''; }, 300);
      });
    }
  }

  window.CapMotion = { refreshReveals: refreshReveals, transitionScreen: transitionScreen };

  var reveals = document.querySelectorAll('.cap-reveal, .cap-reveal-scale, .cap-reveal-lines');
  if (reveals.length) refreshReveals(document);

  if (reduced || !finePointer) return;

  document.querySelectorAll('.cap-magnetic').forEach(function (el) {
    var strength = parseFloat(el.dataset.capStrength || '0.25');
    el.addEventListener('pointermove', function (ev) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--cap-mx', ((ev.clientX - r.left - r.width / 2) * strength).toFixed(1));
      el.style.setProperty('--cap-my', ((ev.clientY - r.top - r.height / 2) * strength).toFixed(1));
    });
    el.addEventListener('pointerleave', function () {
      el.style.setProperty('--cap-mx', '0');
      el.style.setProperty('--cap-my', '0');
    });
  });

  document.querySelectorAll('[data-cap-tilt]').forEach(function (el) {
    var max = parseFloat(el.dataset.capTilt || '6');
    el.classList.add('cap-depth');
    el.addEventListener('pointermove', function (ev) {
      var r = el.getBoundingClientRect();
      var rx = ((ev.clientY - r.top) / r.height - 0.5) * -2 * max;
      var ry = ((ev.clientX - r.left) / r.width - 0.5) * 2 * max;
      el.style.transform = 'perspective(800px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  });
})();
