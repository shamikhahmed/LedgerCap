'use strict';
const Onboarding = (() => {
  let step = 1;

  function isDone() {
    const s = State.get('settings') || {};
    if (s.onboardingDone) return true;
    if ((State.get('transactions') || []).length > 0) return true;
    return false;
  }

  function _dots(n) {
    return [1, 2, 3].map(i =>
      `<span class="ob-dot${i === n ? ' on' : ''}"></span>`
    ).join('');
  }

  function mount() {
    if (isDone()) return;
    document.getElementById('onboarding')?.remove();

    const s = State.get('settings') || {};
    const el = document.createElement('div');
    el.id = 'onboarding';
    el.className = 'ob-overlay';
    el.innerHTML = `
      <div class="ob-shell">
        <div class="ob-top">
          <div class="ob-brand">Ledger<em>Cap</em></div>
          <button type="button" class="ob-skip-top" onclick="Onboarding.skip()">Skip</button>
        </div>
        <div class="ob-progress">${_dots(1)}</div>

        <div class="ob-panel on" id="ob-panel-1">
          <div class="ob-hero-icon">₨</div>
          <h1 class="ob-title">Your wealth command center</h1>
          <p class="ob-desc">Track PSX stocks, Meezan funds, SIP goals, and how much you've invested over time — all on your phone.</p>
          <ul class="ob-features">
            <li><span>📈</span> Live portfolio & P&amp;L</li>
            <li><span>💰</span> Investment tracker</li>
            <li><span>🎯</span> SIP &amp; freedom planning</li>
          </ul>
          <button type="button" class="btn-primary ob-cta" onclick="Onboarding.next()">Set up in 30 sec</button>
        </div>

        <div class="ob-panel" id="ob-panel-2">
          <h1 class="ob-title">Income &amp; goals</h1>
          <p class="ob-desc">Used for SIP progress and financial freedom math. Your ledger data stays untouched.</p>
          <div class="field">
            <label class="field-label">Monthly salary</label>
            <div class="field-prefix-wrap">
              <span class="field-prefix">₨</span>
              <input class="field-input" id="ob-salary" type="number" inputmode="numeric" value="${s.salary || 150000}">
            </div>
          </div>
          <div class="field">
            <label class="field-label">Monthly SIP target</label>
            <div class="field-prefix-wrap">
              <span class="field-prefix">₨</span>
              <input class="field-input" id="ob-sip" type="number" inputmode="numeric" value="${s.targetSIP || 75000}">
            </div>
          </div>
          <div class="field">
            <label class="field-label">Freedom income goal / month</label>
            <div class="field-prefix-wrap">
              <span class="field-prefix">₨</span>
              <input class="field-input" id="ob-freedom" type="number" inputmode="numeric" value="${s.freedomTarget || 100000}">
            </div>
          </div>
          <div class="ob-nav">
            <button type="button" class="btn-ghost" onclick="Onboarding.back()">Back</button>
            <button type="button" class="btn-primary" onclick="Onboarding.next()">Continue</button>
          </div>
        </div>

        <div class="ob-panel" id="ob-panel-3">
          <h1 class="ob-title">Almost done</h1>
          <p class="ob-desc">Pick your main broker. We'll pull PSX prices through your secure proxy when markets are open.</p>
          <div class="field">
            <label class="field-label">Primary broker</label>
            <select class="field-input" id="ob-broker">
              <option value="Mixed">Mixed (Rafi + AKD + Meezan)</option>
              <option value="Rafi">Rafi</option>
              <option value="AKD">AKD</option>
              <option value="Meezan">Meezan</option>
            </select>
          </div>
          <div class="ob-proxy-note">
            <span class="ob-proxy-dot"></span>
            PSX proxy ready — prices refresh on open
          </div>
          <div class="ob-nav">
            <button type="button" class="btn-ghost" onclick="Onboarding.back()">Back</button>
            <button type="button" class="btn-primary" onclick="Onboarding.finish()">Open dashboard</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(el);
    const sel = document.getElementById('ob-broker');
    if (sel) sel.value = s.primaryBroker || 'Mixed';
  }

  function _showPanel(n) {
    step = n;
    [1, 2, 3].forEach(i => {
      document.getElementById('ob-panel-' + i)?.classList.toggle('on', i === n);
    });
    const prog = document.querySelector('.ob-progress');
    if (prog) prog.innerHTML = _dots(n);
  }

  function next() {
    if (step === 2) {
      State.update(st => {
        st.settings.salary = parseFloat(document.getElementById('ob-salary')?.value) || 150000;
        st.settings.targetSIP = parseFloat(document.getElementById('ob-sip')?.value) || 75000;
        st.settings.freedomTarget = parseFloat(document.getElementById('ob-freedom')?.value) || 100000;
      });
    }
    if (step < 3) _showPanel(step + 1);
  }

  function back() {
    if (step > 1) _showPanel(step - 1);
  }

  function _close() {
    document.getElementById('onboarding')?.remove();
  }

  function skip() {
    State.update(st => { st.settings.onboardingDone = true; });
    _close();
    App.showToast('Setup skipped — change anytime in Settings', 'info');
  }

  function finish() {
    const broker = document.getElementById('ob-broker')?.value || 'Mixed';
    State.update(st => {
      st.settings.primaryBroker = broker;
      st.settings.onboardingDone = true;
    });
    _close();
    App.showToast('Welcome to LedgerCap', 'success');
    Navigation.go('dashboard');
    setTimeout(() => App.refreshPrices(), 600);
  }

  return { mount, next, back, skip, finish, isDone };
})();
window.Onboarding = Onboarding;
