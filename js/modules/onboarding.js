'use strict';
const Onboarding = (() => {
  let step = 1;

  function isDone() {
    return !!State.get('settings')?.onboardingDone;
  }

  function mount() {
    if (isDone()) return;
    const existing = document.getElementById('onboarding');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.id = 'onboarding';
    el.className = 'onboarding-overlay';
    el.innerHTML = `
      <div class="onboarding-card">
        <div class="onboarding-steps" id="ob-steps">1 / 3</div>
        <div id="ob-panel-1">
          <div class="onboarding-icon">₨</div>
          <h2>Welcome to StundsOS</h2>
          <p>Your personal PK portfolio — PSX stocks, Meezan funds, SIP planning, and freedom math in one place.</p>
          <p class="onboarding-note">Your existing data is safe. This setup only adjusts preferences.</p>
          <button class="btn-primary" onclick="Onboarding.next()">Get started →</button>
          <button class="btn-ghost ob-skip" onclick="Onboarding.skip()">Skip for now</button>
        </div>
        <div id="ob-panel-2" class="hidden">
          <h2>Income & SIP</h2>
          <label>Monthly salary (PKR)</label>
          <input type="number" id="ob-salary" class="inp" value="${State.get('settings').salary}">
          <label>Target monthly SIP (PKR)</label>
          <input type="number" id="ob-sip" class="inp" value="${State.get('settings').targetSIP}">
          <label>Financial freedom target (monthly PKR)</label>
          <input type="number" id="ob-freedom" class="inp" value="${State.get('settings').freedomTarget}">
          <div class="ob-row">
            <button class="btn-ghost" onclick="Onboarding.back()">← Back</button>
            <button class="btn-primary" onclick="Onboarding.next()">Continue →</button>
          </div>
        </div>
        <div id="ob-panel-3" class="hidden">
          <h2>Brokers & refresh</h2>
          <p>StundsOS tracks Rafi, AKD, and Meezan. Prices try PSX live first, then PSX EOD, then last-known values.</p>
          <label>Primary broker</label>
          <select id="ob-broker" class="inp">
            <option value="Rafi">Rafi</option>
            <option value="AKD">AKD</option>
            <option value="Meezan">Meezan</option>
            <option value="Mixed">Mixed</option>
          </select>
          <button class="btn-secondary" onclick="App.refreshPrices()">Try price refresh now</button>
          <div class="ob-row">
            <button class="btn-ghost" onclick="Onboarding.back()">← Back</button>
            <button class="btn-primary" onclick="Onboarding.finish()">Open dashboard ✓</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(el);
    const broker = State.get('settings').primaryBroker || 'Mixed';
    setTimeout(() => {
      const sel = document.getElementById('ob-broker');
      if (sel) sel.value = broker;
    }, 0);
  }

  function _showPanel(n) {
    step = n;
    [1, 2, 3].forEach(i => {
      const p = document.getElementById('ob-panel-' + i);
      if (p) p.classList.toggle('hidden', i !== n);
    });
    const steps = document.getElementById('ob-steps');
    if (steps) steps.textContent = n + ' / 3';
  }

  function next() {
    if (step === 2) {
      const salary = parseFloat(document.getElementById('ob-salary')?.value) || 150000;
      const sip = parseFloat(document.getElementById('ob-sip')?.value) || 75000;
      const freedom = parseFloat(document.getElementById('ob-freedom')?.value) || 100000;
      State.update(s => {
        s.settings.salary = salary;
        s.settings.targetSIP = sip;
        s.settings.freedomTarget = freedom;
      });
    }
    if (step < 3) _showPanel(step + 1);
  }

  function back() {
    if (step > 1) _showPanel(step - 1);
  }

  function skip() {
    State.update(s => { s.settings.onboardingDone = true; });
    const el = document.getElementById('onboarding');
    if (el) el.remove();
    App.showToast('You can change settings anytime', 'info');
  }

  function finish() {
    const broker = document.getElementById('ob-broker')?.value || 'Mixed';
    State.update(s => {
      s.settings.primaryBroker = broker;
      s.settings.onboardingDone = true;
    });
    const el = document.getElementById('onboarding');
    if (el) el.remove();
    App.showToast('Welcome to StundsOS!', 'success');
    if (typeof Navigation !== 'undefined') Navigation.go('dashboard');
  }

  return { mount, next, back, skip, finish, isDone };
})();
window.Onboarding = Onboarding;
