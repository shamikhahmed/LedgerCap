'use strict';
(function () {
  const theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  window.toggleTheme = function () {
    const body = document.body;
    const next = (body.getAttribute('data-theme') || 'light') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    if (window.Navigation?.applyTheme) Navigation.applyTheme(next);
  };
  document.addEventListener('DOMContentLoaded', () => {
    window.CapMotion = window.CapricornMotion || window.CapMotion;
  });
})();
