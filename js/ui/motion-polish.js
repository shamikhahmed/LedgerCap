'use strict';
/** Count-up, haptics, tap feedback, Cmd-K palette, post-render polish */
const LcPolish = (() => {
  const _countStore = new Map();
  let _cmdkOpen = false;

  const CMD_ACTIONS = () => [
    { q: 'hub home', label: 'Hub', run: () => Navigation.go('home') },
    { q: 'portfolio pnl', label: 'P&L / Portfolio', run: () => Navigation.go('portfolio') },
    { q: 'market watch stocks', label: 'Stock watch', run: () => Navigation.go('market') },
    { q: 'funds meezan nav', label: 'Fund NAVs', run: () => Navigation.go('funds') },
    { q: 'research analyze', label: 'Research', run: () => Navigation.go('research') },
    { q: 'transactions ledger', label: 'Transactions', run: () => Navigation.go('transactions') },
    { q: 'settings', label: 'Settings', run: () => Navigation.go('settings') },
    { q: 'refresh prices', label: 'Refresh all prices', run: () => App.refreshPrices() },
    { q: 'add holding buy', label: 'Add holding', run: () => App.openAddTransaction() },
    { q: 'import csv', label: 'Import CSV', run: () => Navigation.go('import') },
    { q: 'telegram', label: 'Telegram settings', run: () => Navigation.go('settings') },
    { q: 'zakat', label: 'Zakat calculator', run: () => Navigation.go('zakat') },
    { q: 'dividends', label: 'Dividends', run: () => Navigation.go('dividends') },
    { q: 'signals pilot', label: 'Market strategy', run: () => Navigation.go('signals') },
  ];

  function hapticsOn() {
    return !!(typeof State !== 'undefined' && State.get('settings')?.hapticsEnabled);
  }

  function haptic(ms) {
    if (!hapticsOn()) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(ms || 10); } catch (_) {}
    }
  }

  function hapticConfirm() { haptic([8, 40, 12]); }
  function hapticDelete() { haptic([12, 30, 18]); }

  function bindTapFeedback(root) {
    root = root || document;
    root.querySelectorAll('.psx-btn, .psx-nav-btn, .psx-side-btn, .lc-tool-card, .lc-link-btn, .lc-pulse-pill--btn, .lc-dash-market-card--btn, .lc-market-row, .lc-segment-btn, .rt-wl-card').forEach((el) => {
      if (el.dataset.lcTapBound) return;
      el.dataset.lcTapBound = '1';
      el.addEventListener('pointerdown', () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        el.classList.add('lc-tap-active');
      }, { passive: true });
      el.addEventListener('pointerup', () => el.classList.remove('lc-tap-active'), { passive: true });
      el.addEventListener('pointerleave', () => el.classList.remove('lc-tap-active'), { passive: true });
      el.addEventListener('click', () => haptic(8), { passive: true });
    });
  }

  function animateCounts(root) {
    root = root || document;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.querySelectorAll('[data-lc-count]').forEach((el) => {
      const target = parseFloat(el.getAttribute('data-lc-count'));
      if (!Number.isFinite(target)) return;
      const key = el.getAttribute('data-lc-count-key') || el.id || 'c';
      const prev = _countStore.has(key) ? _countStore.get(key) : target;
      _countStore.set(key, target);
      const isPct = el.getAttribute('data-lc-count-pct') === '1';
      const signed = el.getAttribute('data-lc-count-signed') === '1';
      const fmt = (v) => {
        if (isPct) return `${v >= 0 && signed ? '+' : ''}${v.toFixed(2)}%`;
        if (typeof PsxUI !== 'undefined') return PsxUI.fmt(v, { signed: signed && v !== 0 });
        return Math.round(v).toLocaleString('en-PK');
      };
      if (reduced || Math.abs(target - prev) < 0.005) {
        el.textContent = fmt(target);
        return;
      }
      const start = performance.now();
      const dur = parseInt(el.getAttribute('data-lc-count-ms') || '520', 10);
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(prev + (target - prev) * ease);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = fmt(target);
      };
      requestAnimationFrame(step);
    });
  }

  function _ensureCmdk() {
    if (document.getElementById('lc-cmdk')) return;
    const el = document.createElement('div');
    el.id = 'lc-cmdk';
    el.className = 'lc-cmdk hidden';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Quick actions');
    el.innerHTML = `
      <div class="lc-cmdk-backdrop" data-cmdk-close></div>
      <div class="lc-cmdk-panel">
        <input type="search" class="lc-cmdk-input" id="lc-cmdk-input" placeholder="Go to… or refresh prices" autocomplete="off" aria-label="Search actions">
        <ul class="lc-cmdk-list" id="lc-cmdk-list" role="listbox"></ul>
        <p class="lc-cmdk-hint"><kbd>↑</kbd><kbd>↓</kbd> navigate · <kbd>↵</kbd> run · <kbd>esc</kbd> close</p>
      </div>`;
    document.body.appendChild(el);
    el.querySelector('[data-cmdk-close]').addEventListener('click', closeCmdk);
    const inp = el.querySelector('#lc-cmdk-input');
    inp.addEventListener('input', () => _paintCmdk(inp.value));
    inp.addEventListener('keydown', (e) => {
      const items = [...el.querySelectorAll('.lc-cmdk-item')];
      const idx = items.findIndex((n) => n.classList.contains('on'));
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = items[Math.min(items.length - 1, idx + 1)] || items[0];
        items.forEach((n) => n.classList.remove('on'));
        if (next) next.classList.add('on');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = items[Math.max(0, idx - 1)] || items[items.length - 1];
        items.forEach((n) => n.classList.remove('on'));
        if (prev) prev.classList.add('on');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const on = items.find((n) => n.classList.contains('on')) || items[0];
        if (on) on.click();
      }
    });
  }

  function _paintCmdk(q) {
    const list = document.getElementById('lc-cmdk-list');
    if (!list) return;
    const qq = (q || '').trim().toLowerCase();
    const rows = CMD_ACTIONS().filter((a) => !qq || a.label.toLowerCase().includes(qq) || a.q.includes(qq));
    list.innerHTML = rows.map((a, i) =>
      `<li><button type="button" class="lc-cmdk-item${i === 0 ? ' on' : ''}" role="option">${a.label}</button></li>`
    ).join('');
    list.querySelectorAll('.lc-cmdk-item').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        closeCmdk();
        hapticConfirm();
        rows[i].run();
      });
    });
  }

  function openCmdk() {
    if (window.innerWidth < 900) return;
    _ensureCmdk();
    const el = document.getElementById('lc-cmdk');
    if (!el) return;
    el.classList.remove('hidden');
    _cmdkOpen = true;
    const inp = document.getElementById('lc-cmdk-input');
    if (inp) { inp.value = ''; inp.focus(); }
    _paintCmdk('');
  }

  function closeCmdk() {
    const el = document.getElementById('lc-cmdk');
    if (el) el.classList.add('hidden');
    _cmdkOpen = false;
  }

  function init() {
    _ensureCmdk();
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (_cmdkOpen) closeCmdk();
        else openCmdk();
      } else if (e.key === 'Escape' && _cmdkOpen) {
        closeCmdk();
      }
    });
    bindTapFeedback();
  }

  function afterRender() {
    bindTapFeedback();
    animateCounts();
  }

  function announcePrices(netWorth, daily) {
    const el = document.getElementById('lc-price-announcer');
    if (!el || typeof PsxUI === 'undefined') return;
    const dSign = daily >= 0 ? '+' : '';
    el.textContent = `Net worth updated: ${PsxUI.fmt(netWorth)}. Today ${dSign}${PsxUI.fmt(Math.abs(daily))}.`;
  }

  return {
    init, afterRender, haptic, hapticConfirm, hapticDelete, announcePrices, openCmdk, closeCmdk,
  };
})();
window.LcPolish = LcPolish;
