'use strict';
const App = (() => {
  let _refreshTimer = null;
  let _activeSheet = null;

  function _priceRef(sym) {
    const fp = window.FALLBACK_PRICES || {};
    if (fp[sym] > 0) return fp[sym];
    const mf = (window.MEEZAN_FUNDS || []).find(f => f.symbol === sym);
    return mf?.currentNav > 0 ? mf.currentNav : 0;
  }

  function _isBadPrice(sym, stored) {
    if (!Number.isFinite(stored) || stored <= 0) return true;
    const ref = _priceRef(sym);
    if (ref > 0 && (stored > ref * 3 || stored < ref * 0.3)) return true;
    return false;
  }

  function _validateAndCleanPrices() {
    const state = State.get();
    let cleaned = 0;
    let changed = false;
    Object.keys(state.prices || {}).forEach(sym => {
      const entry = state.prices[sym];
      const stored = entry?.price;
      if (!entry || typeof entry !== 'object' || _isBadPrice(sym, stored)) {
        delete state.prices[sym];
        cleaned++;
        changed = true;
      }
    });
    if (changed) {
      State.save();
      console.log(`Cleared ${cleaned} invalid cached prices on init`);
    }
  }

  function clearWrongPrices() {
    let cleaned = 0;
    State.update(s => {
      Object.keys(s.prices || {}).forEach(sym => {
        const stored = s.prices[sym]?.price;
        if (_isBadPrice(sym, stored)) {
          console.log(`Clearing bad price for ${sym}: ${stored} (ref: ${_priceRef(sym)})`);
          delete s.prices[sym];
          cleaned++;
        }
      });
    });
    showToast('Cleared invalid prices — using corrected fallback data', 'info');
    if (cleaned > 0) renderCurrent();
  }

  function _renderTicker() {
    const el = document.getElementById('lc-app-ticker');
    if (!el || typeof PsxUI === 'undefined') return;
    const k = PsxUI.kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    el.innerHTML = `KSE-100 <strong>${k.value ? PsxUI.fmt(k.value) : '—'}</strong> <span class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : ''}</span>`;
  }

  function _hideSplash() {
    const el = document.getElementById('splash');
    setTimeout(() => { if (el) el.classList.add('hide'); }, 480);
  }

  function dismissInstall() {
    localStorage.setItem('ledgercap_install_dismiss', '1');
    const h = document.getElementById('install-hint');
    if (h) h.classList.add('hidden');
  }

  function dismissDemo() {
    sessionStorage.setItem('ledgercap_demo_dismiss', '1');
    const b = document.getElementById('demo-banner');
    if (b) b.classList.add('hidden');
  }

  function _maybeDemoBanner() {
    const demo = new URLSearchParams(location.search).get('demo') === '1'
      || sessionStorage.getItem('ledgercap_demo_mode') === '1';
    if (!demo || sessionStorage.getItem('ledgercap_demo_dismiss')) return;
    const b = document.getElementById('demo-banner');
    if (b) {
      b.classList.remove('hidden');
      b.classList.add('demo-banner--active');
    }
  }

  function _maybeInstallHint() {
    if (localStorage.getItem('ledgercap_install_dismiss')) return;
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    const ios = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (!standalone && ios) {
      const h = document.getElementById('install-hint');
      if (h) h.classList.remove('hidden');
    }
  }

  function _migrateLegacyBranding() {
    const legacyTab = sessionStorage.getItem('stundsOS_tab');
    if (legacyTab && !sessionStorage.getItem('ledgercap_tab')) {
      sessionStorage.setItem('ledgercap_tab', legacyTab);
    }
    sessionStorage.removeItem('stundsOS_tab');
    if (localStorage.getItem('stundsOS_install_dismiss') && !localStorage.getItem('ledgercap_install_dismiss')) {
      localStorage.setItem('ledgercap_install_dismiss', '1');
    }
    localStorage.removeItem('stundsOS_install_dismiss');
    const settings = State.get('settings') || {};
    if (/stunds-psx-proxy/i.test(settings.psxProxyUrl || '')) {
      State.update(s => {
        s.settings.psxProxyUrl = window.LEDGERCAP_CONFIG?.psxProxyUrl || window.LedgerCapConfig.resolvePsxProxyUrl(s.settings.psxProxyUrl);
      });
    } else if (settings.psxProxyUrl && window.LedgerCapConfig?.resolvePsxProxyUrl) {
      const normalized = window.LedgerCapConfig.resolvePsxProxyUrl(settings.psxProxyUrl);
      if (normalized !== settings.psxProxyUrl) {
        State.update(s => { s.settings.psxProxyUrl = normalized; });
      }
    }
  }

  function launch() {
    const demo = new URLSearchParams(location.search).get('demo') === '1';
    if (demo) {
      try { sessionStorage.setItem('ledgercap_demo_mode', '1'); } catch (_) {}
    }
    _applyTheme(localStorage.getItem('theme') || State.get('settings')?.theme || 'light');
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      document.documentElement.classList.add('standalone');
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js?v=75').then(reg => reg.update()).catch(() => {});
    }
    _validateAndCleanPrices();
    _migrateLegacyBranding();
    const cfg = State.get('settings')?.psxProxyUrl;
    if (cfg && window.LEDGERCAP_CONFIG) {
      window.LEDGERCAP_CONFIG.psxProxyUrl = window.LedgerCapConfig?.resolvePsxProxyUrl(cfg) || cfg;
    }
    _hideSplash();
    if (typeof I18n !== 'undefined') {
      I18n.init();
      const langHost = document.getElementById('lc-header-lang');
      if (langHost) {
        langHost.innerHTML = I18n.langSwitcher('lc-header-lang-inner');
        I18n.bindLangSwitch(langHost);
      }
    }
    Navigation.init();
    window.CapMotion = window.CapMotion || { refresh: () => {} };
    if (demo && window.Settings && Settings.loadSeedData) {
      Settings.loadSeedData({ silent: true });
    }
    if (demo && typeof CapDemo !== 'undefined') {
      CapDemo.markActive();
    }
    Navigation.go('home');
    _renderTicker();
    if (typeof Onboarding !== 'undefined') Onboarding.mount();
    _scheduleAutoRefresh();
    _fetchMarketIndex();
    const hasProxy = State.get('settings')?.psxProxyUrl || window.LEDGERCAP_CONFIG?.psxProxyUrl;
    if (hasProxy && !demo) {
      setTimeout(() => refreshPrices(), 1200);
      if (typeof FxService !== 'undefined') FxService.refreshUsdPkr();
    }
    else if (demo) setTimeout(() => showToast('Demo portfolio — sample NAVs; live PSX refresh skipped', 'info'), 800);
    _maybeDemoBanner();
    _maybeInstallHint();
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) _scheduleAutoRefresh();
    });
  }

  function showToast(msg, type) {
    type = type || 'info';
    const wrap = document.getElementById('toast-wrap');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }, 3000);
  }

  async function _fetchMarketIndex() {
    try {
      const kse = await Prices.fetchKSE100();
      if (kse) {
        State.set('kseIndex', kse);
        _renderTicker();
        if (typeof Home !== 'undefined' && Navigation?.current?.() === 'home') Home.render();
      }
    } catch (_) { /* offline / blocked */ }
  }

  async function refreshPrices() {
    const isDemo = new URLSearchParams(location.search).get('demo') === '1'
      || sessionStorage.getItem('ledgercap_demo_mode') === '1';
    if (isDemo) {
      showToast('Demo mode — showing seed NAVs. Remove ?demo=1 for live PSX refresh.', 'info');
      return;
    }

    const state = State.get();
    const transactions = state.transactions || [];
    const holdings = Ledger.calcHoldings(transactions);
    const fundHoldings = Ledger.calcFundHoldings(transactions);
    const symbols = [...new Set([
      ...holdings.map(h => h.symbol),
      ...fundHoldings.map(f => f.symbol),
      ...(Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(transactions).map(h => h.symbol) : []),
    ])];

    if (typeof FxService !== 'undefined') await FxService.refreshUsdPkr();

    if (symbols.length === 0) {
      const kse = await Prices.fetchKSE100();
      if (kse) State.set('kseIndex', kse);
      showToast(kse ? 'Market index updated' : 'No holdings — add transactions to refresh prices', kse ? 'success' : 'warning');
      renderCurrent();
      return;
    }

    showToast(`Fetching ${symbols.length} prices…`, 'info');

    let liveOk = 0;
    const sources = new Set();
    const results = await Prices.fetchAll(symbols, (d, total, sym, success, source) => {
      if (success && source && !['skip','error','rejected','miss','fallback'].includes(source)) {
        liveOk++;
        sources.add(source);
      }
    });

    let updated = 0;
    Object.entries(results).forEach(([sym, data]) => {
      State.updatePrice(sym, data);
      updated++;
    });

    const globalHoldings = Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(transactions) : [];
    if (globalHoldings.length) {
      const gResults = await Prices.fetchAllGlobal(globalHoldings);
      Object.entries(gResults).forEach(([sym, data]) => {
        const pkr = FxService.usdToPkr(data.priceUsd || data.price);
        State.updatePrice(sym, { ...data, price: pkr, priceUsd: data.priceUsd || data.price });
        updated++;
        if (data.source) sources.add(data.source);
      });
    }

    const kse = await Prices.fetchKSE100();
    if (kse) State.set('kseIndex', kse);
    _renderTicker();

    if (updated > 0) {
      const srcList = [...sources].map(s => Prices.sourceLabel(s)).join(', ') || 'cached';
      showToast(`Updated ${updated} prices (${srcList})`, liveOk > 0 ? 'success' : 'info');
    } else {
      showToast('Could not reach live feeds — using last known prices', 'warning');
    }

    renderCurrent();
  }

  function _scheduleAutoRefresh() {
    clearTimeout(_refreshTimer);
    _refreshTimer = setTimeout(() => {
      if (!document.hidden && navigator.onLine) refreshPrices();
    }, 30 * 60 * 1000);
  }

  function openBottomSheet(id, title, content) {
    closeBottomSheet();
    const sheet = document.getElementById('bottom-sheet');
    if (!sheet) return;
    document.getElementById('bs-title').textContent = title || '';
    document.getElementById('bs-body').innerHTML = content || '';
    sheet.classList.add('open');
    _activeSheet = id;
    sheet.querySelector('.bs-backdrop').onclick = closeBottomSheet;
  }

  function closeBottomSheet() {
    const sheet = document.getElementById('bottom-sheet');
    if (sheet) sheet.classList.remove('open');
    _activeSheet = null;
  }

  function openAddTransaction(type, symbol, broker) {
    const txState = State.get();
    const currentHoldings = Ledger.calcHoldings(txState.transactions || []);
    const allSymbols = [
      ...(window.RAFI_STOCKS || []).map(s => ({ symbol: s.symbol, broker: s.broker })),
      ...(window.AKD_STOCKS || []).map(s => ({ symbol: s.symbol, broker: s.broker })),
    ];
    const allWithFunds = [
      ...allSymbols,
      ...(window.MEEZAN_FUNDS || []).map(f => ({ symbol: f.symbol, broker: 'Meezan' })),
    ];

    const typeOpts = ['BUY', 'SELL', 'INTL_BUY', 'INTL_SELL', 'CRYPTO_BUY', 'CRYPTO_SELL', 'DIVIDEND', 'SALARY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'];
    const selType = type || 'BUY';
    const brokers = ['Rafi', 'AKD', 'CDC', 'Meezan', 'Other'];
    const globalBrokers = window.GLOBAL_BROKERS || ['IBKR', 'Binance', 'Other'];
    const typeLabels = {
      BUY: '📈 BUY', SELL: '📉 SELL', INTL_BUY: '🌎 US BUY', INTL_SELL: '🌎 US SELL',
      CRYPTO_BUY: '₿ CRYPTO BUY', CRYPTO_SELL: '₿ CRYPTO SELL',
      DIVIDEND: '💰 DIV', SALARY: '💼 SALARY',
      CONTRIBUTION: '🏦 FUND', IPO_SUBSCRIBE: '🚀 IPO',
    };

    const content = `
    <div id="tx-form">
      <div class="type-selector">
        ${typeOpts.map(t => `<div class="type-btn${t === selType ? ' active' : ''}" data-type="${t}">${typeLabels[t] || t}</div>`).join('')}
      </div>
      <div id="tx-fields">${_txFields(selType, symbol, broker, allSymbols, allWithFunds, brokers, globalBrokers, currentHoldings)}</div>
      <button class="btn-primary" onclick="App._submitTransaction()">Add Transaction</button>
    </div>`;

    openBottomSheet('add-tx', 'Add Transaction', content);

    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const t = btn.dataset.type;
        document.getElementById('tx-fields').innerHTML = _txFields(t, symbol, broker, allSymbols, allWithFunds, brokers, globalBrokers, currentHoldings);
        _bindFieldListeners(t);
      });
    });

    _bindFieldListeners(selType);
  }

  function _bindFieldListeners(type) {
    if (type === 'BUY') {
      const symSel = document.getElementById('tx-symbol');
      const priceInput = document.getElementById('tx-price');
      const sharesInput = document.getElementById('tx-shares');
      if (symSel) symSel.addEventListener('change', () => {
        const sym = symSel.value;
        const p = State.getPrice(sym);
        if (p && priceInput) priceInput.value = p.toFixed(2);
        _updateBuyTotal();
      });
      if (priceInput) priceInput.addEventListener('input', _updateBuyTotal);
      if (sharesInput) sharesInput.addEventListener('input', _updateBuyTotal);
    } else if (type === 'SELL') {
      const symSel = document.getElementById('tx-symbol');
      const priceInput = document.getElementById('tx-price');
      const sharesInput = document.getElementById('tx-shares');
      if (symSel) symSel.addEventListener('change', () => _onSellSymbolChange());
      if (priceInput) priceInput.addEventListener('input', _updateSellPnl);
      if (sharesInput) sharesInput.addEventListener('input', _updateSellPnl);
    }
  }

  function _updateBuyTotal() {
    const shares = parseFloat(document.getElementById('tx-shares')?.value) || 0;
    const price = parseFloat(document.getElementById('tx-price')?.value) || 0;
    const el = document.getElementById('tx-total-display');
    if (el) el.textContent = shares > 0 && price > 0 ? `Total: ₨${Math.round(shares * price).toLocaleString('en-PK')}` : '';
  }

  function _onSellSymbolChange() {
    const sel = document.getElementById('tx-symbol');
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const avgCost = parseFloat(opt?.dataset.avgcost) || 0;
    const priceInput = document.getElementById('tx-price');
    const sym = sel.value;
    const currPrice = State.getPrice(sym);
    if (currPrice && priceInput) priceInput.value = currPrice.toFixed(2);
    _updateSellPnl();
  }

  function _updateSellPnl() {
    const sel = document.getElementById('tx-symbol');
    const opt = sel?.options[sel.selectedIndex];
    const avgCost = parseFloat(opt?.dataset.avgcost) || 0;
    const sellPrice = parseFloat(document.getElementById('tx-price')?.value) || 0;
    const shares = parseFloat(document.getElementById('tx-shares')?.value) || 0;
    const el = document.getElementById('tx-pnl-display');
    if (el && shares > 0 && sellPrice > 0 && avgCost > 0) {
      const pnl = (sellPrice - avgCost) * shares;
      const pct = (sellPrice - avgCost) / avgCost * 100;
      el.textContent = `P&L: ${pnl >= 0 ? '+' : ''}₨${Math.round(pnl).toLocaleString('en-PK')} (${pnl >= 0 ? '+' : ''}${pct.toFixed(1)}%)`;
      el.style.color = pnl >= 0 ? 'var(--green)' : 'var(--red)';
    } else if (el) {
      el.textContent = '';
    }
  }

  function _txFields(type, symbol, broker, allSymbols, allWithFunds, brokers, globalBrokers, currentHoldings) {
    const symOpts = allSymbols.map(s => `<option value="${s.symbol}" data-broker="${s.broker}"${symbol === s.symbol ? ' selected' : ''}>${s.symbol} (${s.broker})</option>`).join('');
    const brokerOpts = brokers.map(b => `<option value="${b}"${broker === b ? ' selected' : ''}>${b}</option>`).join('');
    const today = new Date().toISOString().slice(0, 10);
    const settings = State.get().settings || {};

    if (type === 'SALARY') {
      return `
        <div class="field"><label class="field-label">Amount (₨)</label><input class="field-input" id="tx-amount" type="number" value="${settings.salary || 150000}" placeholder="150000"></div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }

    if (type === 'DIVIDEND') {
      const holdingSymOpts = currentHoldings.length > 0
        ? currentHoldings.map(h => `<option value="${h.symbol}"${symbol === h.symbol ? ' selected' : ''}>${h.symbol}</option>`).join('')
        : allWithFunds.map(s => `<option value="${s.symbol}"${symbol === s.symbol ? ' selected' : ''}>${s.symbol}</option>`).join('');
      return `
        <div class="field"><label class="field-label">Symbol</label><select class="field-select" id="tx-symbol">${holdingSymOpts}</select></div>
        <div class="field"><label class="field-label">Amount Received (₨)</label><input class="field-input" id="tx-amount" type="number" placeholder="5000"></div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }

    if (type === 'IPO_SUBSCRIBE') {
      return `
        <div class="field"><label class="field-label">Symbol</label><input class="field-input" id="tx-symbol" type="text" value="${symbol || ''}" placeholder="e.g. SYS" style="text-transform:uppercase;"></div>
        <div class="field"><label class="field-label">Company Name</label><input class="field-input" id="tx-name" type="text" placeholder="Optional"></div>
        <div class="field-row">
          <div class="field"><label class="field-label">Shares Applied</label><input class="field-input" id="tx-shares" type="number" placeholder="500"></div>
          <div class="field"><label class="field-label">Amount Paid (₨)</label><input class="field-input" id="tx-amount" type="number" placeholder="50000"></div>
        </div>
        <div class="field"><label class="field-label">Subscription Broker</label><select class="field-select" id="tx-broker">${brokerOpts}</select></div>
        <div class="field"><label class="field-label">Subscription Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="IPO name, book-building, etc."></div>
        <div style="padding:8px 12px;background:rgba(139,92,246,0.08);border-radius:var(--r-sm);font-size:0.72rem;color:var(--text2);line-height:1.4;">Shares stay pending until listed. When listed, holdings move to your <strong>CDC</strong> custody account.</div>`;
    }

    if (type === 'CONTRIBUTION') {
      const fundOpts = (window.MEEZAN_FUNDS || []).map(f => `<option value="${f.symbol}"${symbol === f.symbol ? ' selected' : ''}>${f.symbol} — ${f.name}</option>`).join('');
      return `
        <div class="field"><label class="field-label">Fund</label><select class="field-select" id="tx-symbol">${fundOpts}</select></div>
        <div class="field-row">
          <div class="field"><label class="field-label">Units</label><input class="field-input" id="tx-units" type="number" step="0.0001" placeholder="0.0000"></div>
          <div class="field"><label class="field-label">NAV (₨)</label><input class="field-input" id="tx-nav" type="number" step="0.01" placeholder="0.00"></div>
        </div>
        <div class="field"><label class="field-label">Amount Invested (₨)</label><input class="field-input" id="tx-amount" type="number" placeholder="40000"></div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }

    if (type === 'INTL_BUY' || type === 'INTL_SELL' || type === 'CRYPTO_BUY' || type === 'CRYPTO_SELL') {
      const isCrypto = type.startsWith('CRYPTO');
      const catalog = isCrypto ? (window.CRYPTO_ASSETS || []) : (window.INTL_STOCKS || []);
      const symOpts = catalog.map(s => `<option value="${s.symbol}"${symbol === s.symbol ? ' selected' : ''}>${s.symbol} — ${s.name}</option>`).join('');
      const gbOpts = (globalBrokers || []).map(b => `<option value="${b}"${broker === b ? ' selected' : ''}>${b}</option>`).join('');
      const fb = symbol ? (window.GLOBAL_FALLBACK_USD || {})[symbol] : '';
      return `
        <div class="field"><label class="field-label">Symbol</label><select class="field-select" id="tx-symbol">${symOpts}</select></div>
        <div class="field"><label class="field-label">Broker</label><select class="field-select" id="tx-broker">${gbOpts}</select></div>
        <div class="field-row">
          <div class="field"><label class="field-label">Quantity</label><input class="field-input" id="tx-shares" type="number" step="any" placeholder="0"></div>
          <div class="field"><label class="field-label">Price (USD)</label><input class="field-input" id="tx-price-usd" type="number" step="0.01" value="${fb || ''}" placeholder="0.00"></div>
        </div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }

    if (type === 'SELL') {
      const sellOpts = currentHoldings.length > 0
        ? currentHoldings.map(h => `<option value="${h.symbol}" data-broker="${h.broker}" data-shares="${h.shares}" data-avgcost="${h.avgCost.toFixed(2)}"${symbol === h.symbol ? ' selected' : ''}>${h.symbol} (${h.broker}) — ${h.shares} shares</option>`).join('')
        : '<option value="">No holdings found</option>';
      const firstH = currentHoldings.find(h => !symbol || h.symbol === symbol) || currentHoldings[0];
      const defaultPrice = firstH ? (State.getPrice(firstH.symbol) || firstH.avgCost).toFixed(2) : '';
      return `
        <div class="field"><label class="field-label">Stock</label><select class="field-select" id="tx-symbol">${sellOpts}</select></div>
        <div class="field-row">
          <div class="field"><label class="field-label">Shares to Sell</label><input class="field-input" id="tx-shares" type="number" placeholder="0" max="${firstH?.shares || ''}"></div>
          <div class="field"><label class="field-label">Sell Price (₨)</label><input class="field-input" id="tx-price" type="number" step="0.01" value="${defaultPrice}" placeholder="0.00"></div>
        </div>
        <div id="tx-pnl-display" style="padding:6px 0;font-size:0.82rem;font-weight:700;min-height:20px;"></div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }

    // BUY (default)
    const initialPrice = symbol ? (State.getPrice(symbol) || '') : '';
    return `
      <div class="field"><label class="field-label">Symbol</label><select class="field-select" id="tx-symbol">${symOpts}</select></div>
      <div class="field"><label class="field-label">Broker</label><select class="field-select" id="tx-broker">${brokerOpts}</select></div>
      <div class="field-row">
        <div class="field"><label class="field-label">Shares</label><input class="field-input" id="tx-shares" type="number" placeholder="100"></div>
        <div class="field"><label class="field-label">Price (₨)</label><input class="field-input" id="tx-price" type="number" step="0.01" value="${initialPrice ? Number(initialPrice).toFixed(2) : ''}" placeholder="0.00"></div>
      </div>
      <div id="tx-total-display" style="padding:6px 0;font-size:0.82rem;font-weight:700;color:var(--orange);min-height:20px;"></div>
      <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
      <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
  }

  function _submitTransaction() {
    const activeTypeBtn = document.querySelector('.type-btn.active');
    if (!activeTypeBtn) return;
    const type = activeTypeBtn.dataset.type;

    const g = id => document.getElementById(id)?.value?.trim() || '';

    const tx = { type, date: g('tx-date') || new Date().toISOString().slice(0, 10) };
    if (g('tx-notes')) tx.notes = g('tx-notes');

    if (type === 'SALARY') {
      const amount = parseFloat(g('tx-amount'));
      if (!amount) { showToast('Enter salary amount', 'error'); return; }
      tx.amount = amount;
    } else if (type === 'DIVIDEND') {
      const sym = g('tx-symbol');
      const amount = parseFloat(g('tx-amount'));
      if (!sym || !amount) { showToast('Fill in symbol and amount', 'error'); return; }
      tx.symbol = sym;
      tx.amount = amount;
    } else if (type === 'IPO_SUBSCRIBE') {
      const sym = g('tx-symbol').toUpperCase();
      const shares = parseFloat(g('tx-shares'));
      const amount = parseFloat(g('tx-amount'));
      const subBroker = g('tx-broker') || 'CDC';
      if (!sym || !shares || !amount) { showToast('Fill in symbol, shares, and amount', 'error'); return; }
      tx.symbol = sym;
      tx.name = g('tx-name') || sym;
      tx.shares = shares;
      tx.amount = amount;
      tx.broker = subBroker;
      tx.status = 'pending';
    } else if (type === 'CONTRIBUTION') {
      const sym = g('tx-symbol');
      const units = parseFloat(g('tx-units'));
      const nav = parseFloat(g('tx-nav'));
      const amount = parseFloat(g('tx-amount'));
      if (!sym || !units || !amount) { showToast('Fill in fund, units, and amount', 'error'); return; }
      tx.symbol = sym;
      tx.units = units;
      if (nav) tx.nav = nav;
      tx.amount = amount;
      tx.broker = 'Meezan';
    } else if (type === 'SELL') {
      const sel = document.getElementById('tx-symbol');
      const sym = sel?.value;
      const broker = sel?.options[sel.selectedIndex]?.dataset.broker || 'Unknown';
      const shares = parseFloat(g('tx-shares'));
      const price = parseFloat(g('tx-price'));
      if (!sym || !shares || !price) { showToast('Fill in symbol, shares, and price', 'error'); return; }
      tx.symbol = sym;
      tx.broker = broker;
      tx.shares = shares;
      tx.price = price;
      tx.amount = shares * price;
    } else if (type === 'INTL_BUY' || type === 'INTL_SELL' || type === 'CRYPTO_BUY' || type === 'CRYPTO_SELL') {
      const sym = g('tx-symbol').toUpperCase();
      const br = g('tx-broker') || (type.startsWith('CRYPTO') ? 'Binance' : 'IBKR');
      const qty = parseFloat(g('tx-shares'));
      const priceUsd = parseFloat(g('tx-price-usd'));
      if (!sym || !qty || !priceUsd) { showToast('Fill symbol, quantity, and USD price', 'error'); return; }
      tx.symbol = sym;
      tx.broker = br;
      tx.shares = qty;
      tx.qty = qty;
      tx.priceUsd = priceUsd;
      tx.costUsd = qty * priceUsd;
      tx.currency = 'USD';
      tx.assetClass = type.startsWith('CRYPTO') ? 'crypto' : 'intl';
    } else {
      const sym = g('tx-symbol');
      const broker = g('tx-broker');
      const shares = parseFloat(g('tx-shares'));
      const price = parseFloat(g('tx-price'));
      if (!sym || !shares || !price) { showToast('Fill in symbol, shares, and price', 'error'); return; }
      tx.symbol = sym;
      tx.broker = broker;
      tx.shares = shares;
      tx.price = price;
      tx.amount = shares * price;
    }

    State.addTransaction(tx);
    closeBottomSheet();
    showToast('Transaction added', 'success');
    renderCurrent();
  }

  function deleteTransaction(id) {
    if (!confirm('Delete this transaction?')) return;
    State.deleteTransaction(id);
    closeBottomSheet();
    showToast('Transaction deleted', 'warning');
    renderCurrent();
  }

  function openMarkIpoListed(id) {
    const state = State.get();
    const tx = (state.transactions || []).find(t => t.id === id);
    if (!tx || tx.type !== 'IPO_SUBSCRIBE') return;

    const today = new Date().toISOString().slice(0, 10);
    const defaultPrice = tx.listingPrice || (tx.amount && tx.shares ? (tx.amount / tx.shares).toFixed(2) : '');

    const content = `
    <div style="padding:0 16px 16px;">
      <div style="padding:10px 12px;background:rgba(139,92,246,0.08);border-radius:var(--r-sm);font-size:0.78rem;color:var(--text2);margin-bottom:14px;line-height:1.4;">
        <strong>${tx.symbol}</strong> will move to <strong>CDC</strong> custody when listed.
      </div>
      <div class="field"><label class="field-label">Listing Date</label><input class="field-input" id="ipo-listed-date" type="date" value="${today}"></div>
      <div class="field-row">
        <div class="field"><label class="field-label">Allotted Shares</label><input class="field-input" id="ipo-allotted" type="number" value="${tx.shares || ''}" placeholder="0"></div>
        <div class="field"><label class="field-label">Listing Price (₨)</label><input class="field-input" id="ipo-list-price" type="number" step="0.01" value="${defaultPrice}" placeholder="0.00"></div>
      </div>
      <button class="btn-primary" onclick="App._submitIpoListed('${id}')">Mark as Listed → CDC</button>
    </div>`;

    openBottomSheet('ipo-list-sheet', `🚀 List ${tx.symbol}`, content);
  }

  function _submitIpoListed(id) {
    const listedDate = document.getElementById('ipo-listed-date')?.value;
    const allottedShares = parseFloat(document.getElementById('ipo-allotted')?.value);
    const listingPrice = parseFloat(document.getElementById('ipo-list-price')?.value);
    if (!listedDate || !allottedShares || !listingPrice) {
      showToast('Fill in listing date, shares, and price', 'error');
      return;
    }
    const ok = State.updateTransaction(id, {
      status: 'listed',
      listedDate,
      allottedShares,
      listingPrice,
      broker: Ledger.CDC_BROKER,
    });
    if (!ok) { showToast('Could not update IPO', 'error'); return; }
    const sym = State.get().transactions.find(t => t.id === id)?.symbol || 'IPO';
    closeBottomSheet();
    showToast(`${sym} listed — moved to CDC`, 'success');
    renderCurrent();
  }

  function _applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (window.Navigation?.applyTheme) Navigation.applyTheme(theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#fafafa' : '#09090b';
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  function applyTheme(theme) {
    State.update(s => { s.settings.theme = theme; });
    _applyTheme(theme);
  }

  window.toggleTheme = function() {
    const current = document.body.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    App.applyTheme(next);
    localStorage.setItem('theme', next);
  };

  function renderCurrent() {
    Navigation.go(Navigation.current(), true);
  }

  return { launch, showToast, refreshPrices, clearWrongPrices, openBottomSheet, closeBottomSheet,
    openAddTransaction, _submitTransaction, _updateBuyTotal, _onSellSymbolChange, _updateSellPnl,
    deleteTransaction, openMarkIpoListed, _submitIpoListed, renderCurrent, dismissInstall, dismissDemo, applyTheme };
})();
window.App = App;

document.addEventListener('DOMContentLoaded', App.launch);
