'use strict';
const Nav = (() => {
  const TABS = [
    { id:'overview',  label:'Overview', icon:'📊' },
    { id:'stocks',    label:'Stocks',   icon:'📈' },
    { id:'funds',     label:'Funds',    icon:'💰' },
    { id:'watchlist', label:'Watchlist',icon:'🎯' },
    { id:'you',       label:'You',      icon:'👤' },
  ];

  let _current = null;

  function init() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    nav.innerHTML = TABS.map(t => `
      <div class="nav-tab" data-tab="${t.id}" onclick="Nav.go('${t.id}')">
        <div class="nav-icon">${t.icon}</div>
        <div class="nav-label">${t.label}</div>
      </div>
    `).join('');

    const saved = sessionStorage.getItem('stundsOS_tab') || 'overview';
    go(saved);
  }

  function go(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

    const screen = document.getElementById('screen-' + id);
    const tab = document.querySelector(`.nav-tab[data-tab="${id}"]`);

    if (screen) screen.classList.add('active');
    if (tab) tab.classList.add('active');

    _current = id;
    sessionStorage.setItem('stundsOS_tab', id);

    if (id === 'overview' && window.Overview) Overview.render();
    if (id === 'stocks' && window.Stocks) Stocks.render();
    if (id === 'funds' && window.Funds) Funds.render();
    if (id === 'watchlist' && window.Watchlist) Watchlist.render();
    if (id === 'you' && window.You) You.render();
  }

  function current() { return _current; }

  return { init, go, current };
})();
window.Nav = Nav;
