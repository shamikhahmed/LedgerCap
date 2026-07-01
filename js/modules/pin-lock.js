'use strict';
const PinLock = (() => {
  let _gatePromise = null;
  let _digits = '';
  let _busy = false;

  function _el(id) {
    return document.getElementById(id);
  }

  function _renderDots() {
    const dots = _el('pin-dots');
    if (!dots) return;
    const n = _digits.length;
    dots.innerHTML = Array.from({ length: 6 }, (_, i) =>
      `<span class="lc-pin-dot${i < n ? ' lc-pin-dot--on' : ''}"></span>`
    ).join('');
  }

  function _setError(msg) {
    const err = _el('pin-error');
    if (!err) return;
    if (!msg) {
      err.classList.add('hidden');
      err.textContent = '';
      return;
    }
    err.textContent = msg;
    err.classList.remove('hidden');
  }

  function _showOverlay() {
    const root = _el('pin-lock');
    if (!root) return;
    root.classList.remove('hidden');
    root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lc-pin-active');
    _digits = '';
    _renderDots();
    _setError('');
    _buildPad();
  }

  function _hideOverlay() {
    const root = _el('pin-lock');
    if (!root) return;
    root.classList.add('hidden');
    root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lc-pin-active');
    _digits = '';
    _gatePromise = null;
  }

  function _buildPad() {
    const pad = _el('pin-pad');
    if (!pad || pad.dataset.built) return;
    pad.dataset.built = '1';
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];
    pad.innerHTML = keys.map(k => {
      if (!k) return '<span class="lc-pin-key lc-pin-key--spacer"></span>';
      const act = k === '⌫' ? 'back' : 'digit';
      return `<button type="button" class="lc-pin-key" data-act="${act}" data-val="${k === '⌫' ? '' : k}">${k}</button>`;
    }).join('');
    pad.addEventListener('click', e => {
      const btn = e.target.closest('.lc-pin-key');
      if (!btn || _busy) return;
      const act = btn.dataset.act;
      if (act === 'back') {
        _digits = _digits.slice(0, -1);
        _renderDots();
        _setError('');
        return;
      }
      if (_digits.length >= 6) return;
      _digits += btn.dataset.val;
      _renderDots();
      _setError('');
      _scheduleSubmit();
    });
  }

  let _pendingSubmit = null;

  function _scheduleSubmit() {
    if (_pendingSubmit) clearTimeout(_pendingSubmit);
    if (_digits.length >= 6) {
      _submitPin();
      return;
    }
    if (_digits.length >= 4) {
      _pendingSubmit = setTimeout(() => {
        _pendingSubmit = null;
        if (_digits.length >= 4 && _digits.length <= 6) _submitPin();
      }, 550);
    }
  }

  async function _submitPin() {
    if (_pendingSubmit) {
      clearTimeout(_pendingSubmit);
      _pendingSubmit = null;
    }
    if (_busy || _digits.length < 4) return;
    _busy = true;
    const pin = _digits;
    const waitMs = PinVault.lockoutRemaining();
    if (waitMs > 0) {
      _setError(`Locked — wait ${Math.ceil(waitMs / 1000)}s`);
      _digits = '';
      _renderDots();
      _busy = false;
      return;
    }
    const res = await PinVault.verifyPin(pin);
    if (res.ok) {
      PinVault.unlock(res.decoy);
      _hideOverlay();
      if (res.decoy && typeof App !== 'undefined') {
        App.showToast('Private view — decoy PIN', 'info', 4000);
      }
      if (_gatePromise?.resolve) _gatePromise.resolve();
      _busy = false;
      return;
    }
    _digits = '';
    _renderDots();
    if (res.locked) {
      _setError('Too many attempts — wait 30s');
    } else if (res.attemptsLeft != null) {
      _setError(res.attemptsLeft > 0 ? `Wrong PIN — ${res.attemptsLeft} left` : 'Wrong PIN');
    } else {
      _setError('Wrong PIN');
    }
    _busy = false;
  }

  function gate() {
    if (!PinVault.isEnabled()) return Promise.resolve();
    if (PinVault.isUnlocked()) return Promise.resolve();
    if (_gatePromise) return _gatePromise.promise;
    let resolve;
    const promise = new Promise(r => { resolve = r; });
    _gatePromise = { promise, resolve };
    _showOverlay();
    return promise;
  }

  function show() {
    PinVault.lock();
    return gate();
  }

  return { gate, show };
})();

window.PinLock = PinLock;
