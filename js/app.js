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
    const fresh = _freshnessLabel();
    // One compact pill: index, change, freshness. Tap = refresh.
    el.innerHTML = `<button type="button" class="lc-ticker-pill${fresh.cls ? ' ' + fresh.cls : ''}" data-action="App.refreshPrices" title="Tap to refresh prices">
      <span class="lc-ticker-label">KSE-100</span>
      <strong>${k.value ? PsxUI.fmtIndex(k.value) : '—'}</strong>
      <span class="lc-ticker-chg ${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : ''}</span>
      ${fresh.label ? `<span class="lc-ticker-fresh">· ${fresh.label}</span>` : ''}
    </button>`;
  }

  function _freshnessLabel() {
    if (typeof State === 'undefined') return { label: '', cls: '' };
    const prices = State.get('prices') || {};
    const ts = Object.values(prices).map((p) => p?.ts).filter(Boolean).sort((a, b) => b - a)[0];
    const offline = typeof navigator !== 'undefined' && !navigator.onLine;
    if (!ts && !offline) return { label: '', cls: '' };
    const age = ts && typeof Prices !== 'undefined' ? Prices.formatTs(ts) : 'never';
    const stale = ts && (Date.now() - ts > 24 * 3600000);
    const sessionOpen = typeof PsxSession !== 'undefined' && PsxSession.isOpen();
    const live = sessionOpen && typeof LivePriceStream !== 'undefined' && LivePriceStream.status().connected;
    const pktLabel = typeof PsxSession !== 'undefined' ? PsxSession.priceLabel() : null;
    if (offline) return { label: 'Offline', cls: 'lc-ticker-pill--warn' };
    if (live) return { label: 'Live', cls: 'lc-ticker-pill--live' };
    if (pktLabel === 'Last close' || pktLabel === 'Pre-market') return { label: `${pktLabel} ${age}`, cls: stale ? 'lc-ticker-pill--warn' : '' };
    return { label: age, cls: stale ? 'lc-ticker-pill--warn' : '' };
  }

  function _priceFreshnessChip() {
    if (typeof State === 'undefined') return '';
    const prices = State.get('prices') || {};
    const ts = Object.values(prices).map((p) => p?.ts).filter(Boolean).sort((a, b) => b - a)[0];
    const offline = typeof navigator !== 'undefined' && !navigator.onLine;
    if (!ts && !offline) return '';
    const age = ts && typeof Prices !== 'undefined' ? Prices.formatTs(ts) : 'never';
    const stale = ts && (Date.now() - ts > 24 * 3600000);
    const sessionOpen = typeof PsxSession !== 'undefined' && PsxSession.isOpen();
    const live = sessionOpen && typeof LivePriceStream !== 'undefined' && LivePriceStream.status().connected;
    const pktLabel = typeof PsxSession !== 'undefined' ? PsxSession.priceLabel() : null;
    let label;
    if (offline) label = 'Offline';
    else if (live) label = 'Live';
    else if (pktLabel === 'Last close' || pktLabel === 'Pre-market') label = `${pktLabel} · ${age}`;
    else label = stale ? `Prices ${age}` : `Updated ${age}`;
    const cls = live ? 'lc-freshness--live' : offline || stale || pktLabel === 'Last close' ? 'lc-freshness--warn' : 'lc-freshness--ok';
    return `<button type="button" class="lc-freshness-chip ${cls}" data-action="App.refreshPrices" title="Tap to refresh prices">${label}</button>`;
  }

  function checkPriceAlerts() {
    if (typeof PriceAlertsService !== 'undefined') PriceAlertsService.checkAll();
  }

  function requestAlertPermission() {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }

  let _intlCatalog = [];
  let _pendingPortfolioId = null;
  let _pendingBroker = null;

  function openAddPortfolio() {
    openBottomSheet('add-portfolio', 'Add portfolio', `
      <div class="field"><label class="field-label">Portfolio name</label>
        <input class="field-input" id="pf-name" type="text" placeholder="e.g. USA Growth · IBKR" autocomplete="off"></div>
      <div class="field"><label class="field-label">Type</label>
        <select class="field-select" id="pf-kind">
          <option value="intl">US / International stocks</option>
          <option value="crypto">Cryptocurrency</option>
          <option value="psx">Pakistan PSX stocks</option>
          <option value="funds">Islamic / mutual funds</option>
        </select></div>
      <button type="button" class="btn-primary" data-action="App._submitPortfolio">Create portfolio</button>`);
  }

  function _submitPortfolio() {
    const name = document.getElementById('pf-name')?.value?.trim();
    const kind = document.getElementById('pf-kind')?.value || 'intl';
    if (!name) { showToast('Enter a portfolio name', 'error'); return; }
    State.update(s => {
      if (!s.portfolios) s.portfolios = [];
      s.portfolios.push({ id: Ledger.newId(), name, kind, createdAt: Date.now() });
    });
    closeBottomSheet();
    showToast(`Portfolio “${name}” created`, 'success');
    if (typeof Hub !== 'undefined') Hub.render();
    if (typeof PortfolioScreen !== 'undefined') PortfolioScreen.render();
  }

  function deletePortfolio(id) {
    if (typeof PortfolioBuckets === 'undefined') return;
    const b = PortfolioBuckets.list().find(x => x.id === id);
    if (!b || b.builtin) { showToast('Built-in portfolios cannot be deleted', 'warning'); return; }
    const txs = PortfolioBuckets.txsForBucket(State.get(), id);
    if (txs.length && !confirm(`Delete “${b.name}” and ${txs.length} transaction(s)? Cannot undo.`)) return;
    State.update(s => {
      s.portfolios = (s.portfolios || []).filter(p => p.id !== id);
      if (txs.length) s.transactions = (s.transactions || []).filter(t => t.portfolioId !== id);
    });
    showToast(`Deleted ${b.name}`, 'success');
    if (typeof Hub !== 'undefined') Hub.render();
    if (typeof PortfolioScreen !== 'undefined') PortfolioScreen.render();
  }

  function renamePortfolio(id) {
    const b = PortfolioBuckets.list().find(x => x.id === id);
    if (!b || b.builtin) return;
    const name = prompt('Portfolio name', b.name);
    if (!name || !name.trim()) return;
    State.update(s => {
      const p = (s.portfolios || []).find(x => x.id === id);
      if (p) p.name = name.trim();
    });
    showToast('Portfolio renamed', 'success');
    renderCurrent();
  }

  function openAddForPortfolio(bucketId) {
    const buckets = typeof PortfolioBuckets !== 'undefined' ? PortfolioBuckets.list() : [];
    const b = (bucketId && buckets.find(x => x.id === bucketId)) || buckets.find(x => x.id === 'rafi');
    _pendingPortfolioId = b && !b.builtin ? b.id : null;
    _pendingBroker = b?.brokerFilter || PortfolioBuckets.defaultBroker?.(bucketId) || null;
    const txType = b ? PortfolioBuckets.defaultTxType(b.kind) : 'BUY';
    openAddTransaction(txType, null, _pendingBroker);
  }

  function _portfolioFieldForType(type) {
    if (typeof PortfolioBuckets === 'undefined') return '';
    const kindMap = {
      BUY: 'psx', SELL: 'psx', DIVIDEND: 'psx', IPO_SUBSCRIBE: 'psx',
      CONTRIBUTION: 'funds', INTL_BUY: 'intl', INTL_SELL: 'intl',
      CRYPTO_BUY: 'crypto', CRYPTO_SELL: 'crypto',
    };
    const kind = kindMap[type];
    if (!kind) return '';
    const custom = PortfolioBuckets.list().filter(p => !p.builtin && p.kind === kind);
    if (!custom.length) return '';
    const opts = custom.map(p =>
      `<option value="${p.id}"${(_pendingPortfolioId === p.id) ? ' selected' : ''}>${p.name}</option>`
    ).join('');
    return `<div class="field"><label class="field-label">Portfolio</label>
      <select class="field-select" id="tx-portfolio-id">
        <option value="">Default ledger</option>${opts}
      </select></div>`;
  }

  function _ensureIntlCatalog(isCrypto) {
    if (isCrypto) return window.CRYPTO_ASSETS || [];
    const catalog = window.INTL_STOCKS || window.US_STOCKS_CATALOG || [];
    if (catalog.length) return catalog;
    return [
      { symbol: 'AAPL', name: 'Apple' }, { symbol: 'MSFT', name: 'Microsoft' }, { symbol: 'NVDA', name: 'NVIDIA' },
      { symbol: 'GOOGL', name: 'Alphabet' }, { symbol: 'AMZN', name: 'Amazon' }, { symbol: 'META', name: 'Meta' },
      { symbol: 'TSLA', name: 'Tesla' }, { symbol: 'TTWO', name: 'Take-Two' }, { symbol: 'VOO', name: 'Vanguard S&P 500' },
      { symbol: 'QQQ', name: 'Invesco QQQ' }, { symbol: 'SPY', name: 'SPDR S&P 500' },
    ];
  }

  function _filterIntlSymbols(q) {
    const pick = document.getElementById('tx-symbol-pick');
    const hidden = document.getElementById('tx-symbol');
    if (!pick) return;
    const needle = (q || '').trim().toUpperCase();
    const rows = _intlCatalog.filter(s =>
      !needle || s.symbol.includes(needle) || (s.name || '').toUpperCase().includes(needle)
    ).slice(0, 12);
    pick.innerHTML = rows.map(s =>
      `<button type="button" class="lc-intl-pick" data-sym="${s.symbol}"><strong>${s.symbol}</strong><span>${s.name || ''}</span></button>`
    ).join('') || '<p class="psx-muted">No matches — type a valid ticker (e.g. AAPL, TTWO)</p>';
    if (needle && /^[A-Z.^-]{1,10}$/.test(needle)) {
      const exact = _intlCatalog.find(s => s.symbol === needle);
      if (exact) _pickIntlSymbol(exact.symbol);
      else if (hidden) hidden.value = needle;
    }
  }

  function _bindIntlSearch() {
    const search = document.getElementById('tx-symbol-search');
    const pick = document.getElementById('tx-symbol-pick');
    if (!search || search.dataset.bound) return;
    search.dataset.bound = '1';
    search.addEventListener('input', () => _filterIntlSymbols(search.value));
    if (pick) {
      pick.addEventListener('click', (e) => {
        const btn = e.target.closest('.lc-intl-pick');
        if (!btn?.dataset?.sym) return;
        e.preventDefault();
        _pickIntlSymbol(btn.dataset.sym);
      });
    }
  }

  function _resolveIntlSymbol() {
    const search = document.getElementById('tx-symbol-search')?.value?.trim().toUpperCase() || '';
    const hidden = document.getElementById('tx-symbol')?.value?.trim().toUpperCase() || '';
    return search || hidden;
  }

  function _pickIntlSymbol(sym) {
    const hidden = document.getElementById('tx-symbol');
    const search = document.getElementById('tx-symbol-search');
    const price = document.getElementById('tx-price-usd');
    if (hidden) hidden.value = sym;
    if (search) search.value = sym;
    const fb = (window.GLOBAL_FALLBACK_USD || {})[sym];
    if (price && fb) price.value = Number(fb).toFixed(2);
    document.querySelectorAll('.lc-intl-pick').forEach(b => b.classList.toggle('on', b.querySelector('strong')?.textContent === sym));
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

  function loadDemo() {
    location.search = '?demo=1';
    location.reload();
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

  function _wireChromeIcons() {
    if (typeof LcIcons === 'undefined') return;
    const theme = document.body.getAttribute('data-theme') || 'dark';
    const pin = document.getElementById('pin-logo-host');
    if (pin) pin.innerHTML = '<img src="assets/icons/icon-mark.svg" alt="" width="48" height="48">';
    const fs = document.getElementById('lc-fullscreen-icon');
    if (fs) fs.innerHTML = LcIcons.icon('fullscreen', 18);
    const dismiss = document.getElementById('demo-dismiss-icon');
    if (dismiss) dismiss.innerHTML = LcIcons.icon('x', 16);
    const themeHost = document.getElementById('theme-toggle-icon');
    if (themeHost) themeHost.innerHTML = LcIcons.icon(theme === 'dark' ? 'moon' : 'sun', 20);
  }

  async function launch() {
    const demo = new URLSearchParams(location.search).get('demo') === '1';
    if (demo) {
      try { sessionStorage.setItem('ledgercap_demo_mode', '1'); } catch (_) {}
    }
    if (typeof SecretsVault !== 'undefined') await SecretsVault.migratePlaintextToken();
    _applyTheme(localStorage.getItem('theme') || window.State?.get('settings')?.theme || 'dark');
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      document.documentElement.classList.add('standalone');
    }
    if ('serviceWorker' in navigator) {
      const swV = window.LEDGERCAP_VERSION?.sw || 93;
      navigator.serviceWorker.register(`./sw.js?v=${swV}`).then(reg => reg.update()).catch(() => {});
    }
    _validateAndCleanPrices();
    _migrateLegacyBranding();
    const cfg = State.get('settings')?.psxProxyUrl;
    if (cfg && window.LEDGERCAP_CONFIG) {
      window.LEDGERCAP_CONFIG.psxProxyUrl = window.LedgerCapConfig?.resolvePsxProxyUrl(cfg) || cfg;
    }
    _hideSplash();
    if (typeof PinLock !== 'undefined' && typeof PinVault !== 'undefined' && PinVault.isEnabled()) {
      await PinLock.gate();
    }
    if (typeof I18n !== 'undefined') {
      I18n.init();
      const langHost = document.getElementById('lc-header-lang');
      if (langHost) {
        langHost.innerHTML = I18n.langSwitcher('lc-header-lang-inner');
        I18n.bindLangSwitch(langHost);
      }
    }
    Navigation.init();
    if (typeof LcEvents !== 'undefined') LcEvents.init();
    _wireChromeIcons();
    window.CapMotion = window.CapMotion || { refresh: () => {} };
    if (demo && window.Settings && Settings.loadSeedData) {
      const hasLedger = (State.get().transactions || []).length > 0;
      if (!hasLedger) Settings.loadSeedData({ silent: true });
      else showToast('Demo mode — your saved ledger was kept. Clear data in Settings to load sample portfolio.', 'info');
    }
    if (demo && typeof CapDemo !== 'undefined') {
      CapDemo.markActive();
    }
    Navigation.go('home');
    if ((State.get().transactions || []).length) State.logPortfolioSnapshot?.();
    _checkDeployVersion();
    _renderTicker();
    if (typeof Onboarding !== 'undefined') Onboarding.mount();
    if (typeof WhatsNew !== 'undefined') WhatsNew.maybeShow();
    if (typeof NotificationScheduler !== 'undefined') NotificationScheduler.init();
    if (typeof LcPolish !== 'undefined') LcPolish.init();
    if (typeof LivePriceStream !== 'undefined') LivePriceStream.init();
    if (typeof PriceSnapshotService !== 'undefined') PriceSnapshotService.init();
    if (typeof FundNavService !== 'undefined') FundNavService.applyAll();
    if (typeof GlanceBridge !== 'undefined') GlanceBridge.publish();
    _updateCurrencyToggleBtn();
    _scheduleAutoRefresh();
    _fetchMarketIndex();
    const hasProxy = State.get('settings')?.psxProxyUrl || window.LEDGERCAP_CONFIG?.psxProxyUrl;
    if (typeof FxService !== 'undefined') FxService.refreshUsdPkr().then(() => _renderTicker());
    if (hasProxy && !demo) {
      setTimeout(() => refreshPrices(), 1200);
    }
    else if (!demo && (State.get().transactions || []).length) {
      setTimeout(() => refreshPrices(), 1200);
    }
    else if (demo) setTimeout(() => showToast('Demo portfolio — sample NAVs; live PSX refresh skipped', 'info'), 800);
    _maybeDemoBanner();
    _maybeInstallHint();
    if (typeof PriceHealth !== 'undefined') PriceHealth.mount();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        PinVault?.noteBackground?.();
      } else {
        if (PinVault?.isEnabled?.() && PinVault.shouldReLock()) {
          PinVault.lock();
          PinLock?.gate?.();
        }
        _scheduleAutoRefresh();
        // Returning to the tab: refetch if newest quote is >10 min old so
        // the user never reads stale numbers without a fetch attempt.
        const prices = State.get('prices') || {};
        const newest = Object.values(prices).map(p => p?.ts).filter(Boolean).sort((a, b) => b - a)[0] || 0;
        if (navigator.onLine && Date.now() - newest > 10 * 60000) refreshPrices();
      }
    });
    setInterval(() => {
      if (PinVault?.isEnabled?.() && PinVault.isUnlocked() && PinVault.shouldReLock()) {
        PinVault.lock();
        PinLock?.gate?.();
      }
    }, 20000);
  }

  function _checkDeployVersion() {}

  function _showUpdateBanner() {}

  function reloadForUpdate() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => reg?.waiting?.postMessage({ type: 'SKIP_WAITING' }));
    }
    location.reload();
  }

  let _pendingUndo = null;
  let _undoTimer = null;

  function showToast(msg, type, msOrOpts) {
    type = type || 'info';
    let ms = 3000;
    let opts = {};
    if (typeof msOrOpts === 'number') ms = msOrOpts;
    else if (msOrOpts && typeof msOrOpts === 'object') {
      opts = msOrOpts;
      ms = opts.ms || 3000;
    }
    const wrap = document.getElementById('toast-wrap');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = `toast ${type}${opts.undo ? ' toast--undo' : ''}`;
    if (opts.undo) {
      el.innerHTML = `<span class="lc-toast-msg">${msg}</span><button type="button" class="lc-toast-undo" data-action="App._runUndo">Undo</button>`;
      _pendingUndo = opts.undo;
      clearTimeout(_undoTimer);
      _undoTimer = setTimeout(() => { _pendingUndo = null; }, ms);
    } else {
      el.textContent = msg;
    }
    wrap.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }, ms);
  }

  function _runUndo() {
    const fn = _pendingUndo;
    _pendingUndo = null;
    clearTimeout(_undoTimer);
    if (typeof fn === 'function') {
      fn();
      showToast('Transaction undone', 'info', 2500);
    }
  }

  async function refreshSymbolPrice(symbol) {
    if (!symbol) return;
    const isDemo = new URLSearchParams(location.search).get('demo') === '1'
      || sessionStorage.getItem('ledgercap_demo_mode') === '1';
    if (isDemo) {
      showToast('Demo mode — live refresh disabled', 'info');
      return;
    }
    document.querySelectorAll(`[data-refresh-symbol="${symbol}"]`).forEach((b) => {
      b.disabled = true;
      b.setAttribute('aria-busy', 'true');
    });
    showToast(`Refreshing ${symbol}…`, 'info', 2000);
    try {
      const q = await Prices.fetchStock(symbol);
      if (q?.price) {
        State.updatePrice(symbol, {
          price: q.price,
          prevClose: q.prevClose || q.price,
          source: q.source,
          ts: Date.now(),
        });
        showToast(`${symbol} · ${Prices.sourceLabel(q.source)}`, 'success');
        renderCurrent();
      } else {
        showToast(`${symbol} — no live quote`, 'warning');
      }
    } catch (e) {
      showToast(e.message || `${symbol} refresh failed`, 'error');
    } finally {
      document.querySelectorAll(`[data-refresh-symbol="${symbol}"]`).forEach((b) => {
        b.disabled = false;
        b.removeAttribute('aria-busy');
      });
    }
  }

  async function _fetchMarketIndex() {
    try {
      const kse = await Prices.fetchKSE100();
      if (kse) {
        State.set('kseIndex', kse);
        State.recordKseSnapshot?.(kse);
        _renderTicker();
        if (typeof Home !== 'undefined' && Navigation?.current?.() === 'home') Home.render();
      }
    } catch (_) { /* offline / blocked */ }
  }

  function _scheduleAutoRefresh() {
    clearTimeout(_refreshTimer);
    _refreshTimer = setTimeout(() => {
      if (!document.hidden && navigator.onLine) refreshPrices();
    }, 30 * 60 * 1000);
  }

  let _refreshBusy = false;

  async function refreshPrices() {
    const isDemo = new URLSearchParams(location.search).get('demo') === '1'
      || sessionStorage.getItem('ledgercap_demo_mode') === '1';
    if (isDemo) {
      showToast('Demo mode — showing seed NAVs. Remove ?demo=1 for live PSX refresh.', 'info');
      return;
    }
    if (_refreshBusy) return;
    _refreshBusy = true;
    document.querySelectorAll('[data-action="App.refreshPrices"]').forEach(b => { b.disabled = true; b.setAttribute('aria-busy', 'true'); });
    try {
      await _refreshPricesInner();
    } finally {
      _refreshBusy = false;
      document.querySelectorAll('[data-action="App.refreshPrices"]').forEach(b => { b.disabled = false; b.removeAttribute('aria-busy'); });
    }
  }

  async function _refreshPricesInner() {

    const state = State.get();
    const transactions = state.transactions || [];
    const holdings = Ledger.calcHoldings(transactions);
    const fundHoldings = Ledger.calcFundHoldings(transactions);
    const watchlist = (state.watchlist || []).map(w => w.symbol).filter(Boolean);
    const symbols = [...new Set([
      ...holdings.map(h => h.symbol),
      ...fundHoldings.map(f => f.symbol),
      ...(Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(transactions).map(h => h.symbol) : []),
      ...watchlist,
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
    if (kse) {
      State.set('kseIndex', kse);
      State.recordKseSnapshot?.(kse);
    }
    _renderTicker();
    checkPriceAlerts();

    if (updated > 0) {
      const srcList = [...sources].map(s => Prices.sourceLabel(s)).join(', ') || 'cached';
      showToast(`Updated ${updated} prices (${srcList})`, liveOk > 0 ? 'success' : 'info');
    } else {
      showToast('Could not reach live feeds — using last known prices', 'warning');
    }

    renderCurrent();
    State.logPortfolioSnapshot?.();
    State.recordIntradaySnapshot?.();
    if (typeof GlanceBridge !== 'undefined') GlanceBridge.publish();
    if (typeof LcPolish !== 'undefined' && typeof PortfolioAnalyticsService !== 'undefined') {
      const sum = PortfolioAnalyticsService.getSummary(State.get());
      LcPolish.announcePrices(sum.totalValue, State.calcDailyPnl());
      LcPolish.afterRender();
    }
    if (liveOk > 0 && typeof PriceHealth !== 'undefined') PriceHealth.clearDismiss();
    if (typeof PriceHealth !== 'undefined') PriceHealth.mount();
    _scheduleAutoRefresh();
  }

  function _updateCurrencyToggleBtn() {
    const btn = document.getElementById('lc-currency-toggle');
    if (!btn) return;
    const cur = State.get('settings')?.displayCurrency || 'PKR';
    btn.textContent = cur;
    btn.setAttribute('aria-label', `Display currency ${cur}. Tap to switch.`);
    btn.title = `Show ${cur === 'PKR' ? 'USD' : 'PKR'}`;
  }

  function toggleDisplayCurrency() {
    const cur = State.get('settings')?.displayCurrency || 'PKR';
    const next = cur === 'USD' ? 'PKR' : 'USD';
    State.update((s) => { s.settings.displayCurrency = next; });
    _updateCurrencyToggleBtn();
    if (typeof GlanceBridge !== 'undefined') GlanceBridge.publish();
    renderCurrent();
    showToast(`Showing ${next}`, 'success');
    if (typeof LcPolish !== 'undefined') LcPolish.hapticConfirm();
  }

  function openPriceAlert(symbol) {
    const holdings = PortfolioAnalyticsService.getHoldings(State.get());
    const row = holdings.find((x) => x.symbol === symbol) || { symbol, price: State.getPrice(symbol) };
    const existing = (State.get('priceAlerts') || []).find((a) => a.symbol === symbol && a.enabled !== false);
    const dir = existing?.direction || 'below';
    const price = existing?.price || row.price || '';
    openBottomSheet('price-alert', `Alert — ${symbol}`, `
      <p class="field-hint" style="margin-bottom:12px">Notify when price crosses target. Toast, notification, optional Telegram.</p>
      <div class="field">
        <label class="field-label">Direction</label>
        <select class="field-select" id="pa-dir">
          <option value="below" ${dir === 'below' ? 'selected' : ''}>At or below</option>
          <option value="above" ${dir === 'above' ? 'selected' : ''}>At or above</option>
        </select>
      </div>
      <div class="field">
        <label class="field-label">Target price (PKR)</label>
        <input class="field-input" id="pa-price" type="number" step="0.01" value="${price}">
      </div>
      <button type="button" class="btn-primary" style="width:100%;margin-top:12px" data-action="App._submitPriceAlert" data-symbol="${symbol.replace(/"/g, '&quot;')}">Save alert</button>
      ${existing ? `<button type="button" class="btn-ghost" style="width:100%;margin-top:8px" data-action="App._removePriceAlert" data-tab="${existing.id}">Remove alert</button>` : ''}
    `);
    requestAlertPermission();
  }

  function _submitPriceAlert(symbol) {
    const dir = document.getElementById('pa-dir')?.value || 'below';
    const price = parseFloat(document.getElementById('pa-price')?.value);
    if (!(price > 0)) {
      showToast('Enter valid target price', 'warning');
      return;
    }
    if (typeof PriceAlertsService === 'undefined') {
      showToast('Alerts service not loaded', 'error');
      return;
    }
    PriceAlertsService.upsert({
      id: `pa:${symbol}`,
      symbol,
      direction: dir,
      price,
      enabled: true,
      source: 'holding',
      createdAt: Date.now(),
    });
    closeBottomSheet();
    showToast(`Alert set for ${symbol}`, 'success');
    if (typeof LcPolish !== 'undefined') LcPolish.hapticConfirm();
  }

  function _removePriceAlert(id) {
    if (typeof PriceAlertsService !== 'undefined') PriceAlertsService.remove(id);
    closeBottomSheet();
    showToast('Alert removed', 'info');
  }

  function openBottomSheet(id, title, content) {
    closeBottomSheet();
    const sheet = document.getElementById('bottom-sheet');
    if (!sheet) return;
    document.getElementById('bs-title').textContent = title || '';
    document.getElementById('bs-body').innerHTML = content || '';
    sheet.classList.add('open');
    _activeSheet = id;
    sheet.querySelector('.bs-backdrop')?.addEventListener('click', closeBottomSheet);
  }

  function closeBottomSheet() {
    const sheet = document.getElementById('bottom-sheet');
    if (sheet) sheet.classList.remove('open');
    _activeSheet = null;
  }

  function openSellHolding(symbol, broker, type) {
    openAddTransaction(type || 'SELL', symbol, broker);
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
      <button class="btn-primary" data-action="App._submitTransaction">Add Transaction</button>
    </div>`;

    openBottomSheet('add-tx', 'Add Transaction', content);

    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const t = btn.dataset.type;
        document.getElementById('tx-fields').innerHTML = _txFields(t, symbol, broker, allSymbols, allWithFunds, brokers, globalBrokers, currentHoldings);
        _bindFieldListeners(t);
        if (t.startsWith('INTL') || t.startsWith('CRYPTO')) {
          _filterIntlSymbols(document.getElementById('tx-symbol-search')?.value || '');
          _bindIntlSearch();
        }
      });
    });

    _bindFieldListeners(selType);
    if (selType.startsWith('INTL') || selType.startsWith('CRYPTO')) {
      _filterIntlSymbols(symbol || '');
      _bindIntlSearch();
    }
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
    if (el) el.textContent = shares > 0 && price > 0 ? `Total: ${PlatformUI.fmt(shares * price)}` : '';
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
      el.textContent = `P&L: ${PlatformUI.fmt(pnl, { signed: true })} (${pnl >= 0 ? '+' : ''}${pct.toFixed(2)}%)`;
      el.style.color = pnl >= 0 ? 'var(--green)' : 'var(--red)';
    } else if (el) {
      el.textContent = '';
    }
  }

  function _txFields(type, symbol, broker, allSymbols, allWithFunds, brokers, globalBrokers, currentHoldings) {
    const symOpts = allSymbols.map(s => `<option value="${s.symbol}" data-broker="${s.broker}"${symbol === s.symbol ? ' selected' : ''}>${s.symbol} (${s.broker})</option>`).join('');
    const brokerOpts = brokers.map(b => `<option value="${b}"${(broker === b || _pendingBroker === b) ? ' selected' : ''}>${b}</option>`).join('');
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
        ${_portfolioFieldForType(type)}
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
      const catalog = _ensureIntlCatalog(isCrypto);
      _intlCatalog = catalog;
      const sel = symbol || '';
      const gbOpts = (globalBrokers || []).map(b => `<option value="${b}"${broker === b ? ' selected' : ''}>${b}</option>`).join('');
      const fb = sel ? (window.GLOBAL_FALLBACK_USD || {})[sel] : '';
      return `
        ${_portfolioFieldForType(type)}
        <div class="field"><label class="field-label">Search ${isCrypto ? 'crypto' : 'US'} symbol</label>
          <input class="field-input" id="tx-symbol-search" type="search" placeholder="Type ticker e.g. AAPL, TTWO…" value="${sel}" autocomplete="off" autocapitalize="characters">
          <input type="hidden" id="tx-symbol" value="${sel}">
          <div id="tx-symbol-pick" class="lc-intl-pick-list" role="listbox" aria-label="Symbol matches"></div>
          <p class="lc-search-hint">Tap a row or type exact ticker — both work</p>
        </div>
        <div class="field"><label class="field-label">Broker</label><select class="field-select" id="tx-broker">${gbOpts}</select></div>
        <div class="field-row">
          <div class="field"><label class="field-label">Quantity</label><input class="field-input" id="tx-shares" type="number" step="any" placeholder="0"></div>
          <div class="field"><label class="field-label">Price (USD)</label><input class="field-input" id="tx-price-usd" type="number" step="0.01" value="${fb ? Number(fb).toFixed(2) : ''}" placeholder="0.00"></div>
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
      ${_portfolioFieldForType(type)}
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
    const pf = g('tx-portfolio-id') || _pendingPortfolioId || '';
    if (pf) tx.portfolioId = pf;
    _pendingPortfolioId = null;
    _pendingBroker = null;

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
      const sym = _resolveIntlSymbol();
      const br = g('tx-broker') || (type.startsWith('CRYPTO') ? 'Binance' : 'IBKR');
      const qty = parseFloat(g('tx-shares'));
      const priceUsd = parseFloat(g('tx-price-usd'));
      if (!sym || !qty || !priceUsd) { showToast('Fill symbol, quantity, and USD price', 'error'); return; }
      if (!_intlCatalog.some(s => s.symbol === sym) && sym.length > 5) {
        showToast('Check ticker spelling', 'warning');
      }
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
    const addedId = State.get().transactions.slice(-1).id;
    closeBottomSheet();
    showToast('Transaction added', 'success', {
      ms: 10000,
      undo: () => {
        State.deleteTransaction(addedId);
        renderCurrent();
      },
    });
  }

  function deleteTransaction(id) {
    if (!confirm('Delete this transaction?')) return;
    if (typeof LcPolish !== 'undefined') LcPolish.hapticDelete();
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
      <button class="btn-primary" data-action="App._submitIpoListed" data-tab="${id}">Mark as Listed → CDC</button>
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

  function openReconcilePosition(holding) {
    if (!holding?.symbol) return;
    window._pendingReconcile = holding;
    const h = holding;
    const isGlobal = h.kind === 'intl' || h.kind === 'crypto';
    const qtyLabel = h.kind === 'fund' ? 'Units' : 'Quantity';
    const avgCost = h.kind === 'fund'
      ? (h.quantity > 0 ? h.costBasis / h.quantity : 0)
      : isGlobal
        ? FxService.pkrToUsd(h.quantity > 0 ? h.costBasis / h.quantity : 0)
        : (h.quantity > 0 ? h.costBasis / h.quantity : 0);
    const lastPx = isGlobal ? FxService.pkrToUsd(h.price) : h.price;
    const brokers = h.kind === 'fund' ? ['Meezan'] : isGlobal ? (window.GLOBAL_BROKERS || ['IBKR']) : ['Rafi', 'AKD', 'CDC', 'Meezan', 'Other'];
    const brokerOpts = brokers.map(b => `<option value="${b}"${b === h.broker ? ' selected' : ''}>${b}</option>`).join('');

    const content = `
    <div style="padding:0 16px 16px;">
      <p style="font-size:0.78rem;color:var(--psx-text-2);line-height:1.45;margin-bottom:12px;">
        Reconcile sets <strong>correct qty &amp; avg cost</strong> from your AMC/broker statement. Adds a <em>Reconcile</em> audit row — does not delete old transactions.
      </p>
      <div class="detail-stat"><span class="detail-stat-label">Ledger now</span><span class="detail-stat-value">${h.quantity} · avg ${isGlobal ? '$' + Number(avgCost).toFixed(2) : PlatformUI.fmt(avgCost)}</span></div>
      <div class="field-row">
        <div class="field"><label class="field-label">${qtyLabel}</label><input class="field-input" id="rec-qty" type="number" step="any" value="${h.quantity}"></div>
        <div class="field"><label class="field-label">${isGlobal ? 'Avg cost (USD)' : 'Avg cost (₨)'}</label><input class="field-input" id="rec-avg" type="number" step="any" value="${Number(avgCost).toFixed(isGlobal ? 2 : 4)}"></div>
      </div>
      <div class="field-row">
        <div class="field"><label class="field-label">${isGlobal ? 'Last price (USD)' : 'Last price / NAV (₨)'}</label><input class="field-input" id="rec-price" type="number" step="any" value="${Number(lastPx).toFixed(isGlobal ? 2 : 2)}" placeholder="Optional"></div>
        <div class="field"><label class="field-label">Broker</label><select class="field-input" id="rec-broker">${brokerOpts}</select></div>
      </div>
      <div class="field"><label class="field-label">Notes</label><input class="field-input" id="rec-notes" type="text" placeholder="e.g. AMC statement 29-Jun-2026"></div>
      <button type="button" class="btn-primary" data-action="App._submitReconcile">Save reconcile</button>
    </div>`;

    openBottomSheet('reconcile-sheet', `✎ Reconcile ${h.symbol}`, content);
  }

  function _submitReconcile() {
    const holding = window._pendingReconcile;
    if (!holding) return;
    const qty = parseFloat(document.getElementById('rec-qty')?.value);
    const avg = parseFloat(document.getElementById('rec-avg')?.value);
    const manualPrice = parseFloat(document.getElementById('rec-price')?.value);
    const broker = document.getElementById('rec-broker')?.value || holding.broker;
    const notes = (document.getElementById('rec-notes')?.value || '').trim();
    if (!(qty >= 0) || !(avg >= 0)) {
      showToast('Enter valid quantity and average cost', 'error');
      return;
    }
    const isGlobal = holding.kind === 'intl' || holding.kind === 'crypto';
    const tx = {
      id: Ledger.newId(),
      type: 'POSITION_ADJUST',
      date: new Date().toISOString().slice(0, 10),
      symbol: holding.symbol,
      broker,
      holdingKind: holding.kind,
      assetClass: holding.kind === 'crypto' ? 'crypto' : holding.kind === 'intl' ? 'intl' : undefined,
      targetQuantity: qty,
      targetAvgCost: isGlobal ? undefined : avg,
      targetAvgCostUsd: isGlobal ? avg : undefined,
      notes: notes || `Reconcile ${holding.symbol}`,
      amount: 0,
      internal: true,
    };
    State.addTransaction(tx);
    if (manualPrice > 0) {
      if (isGlobal) {
        State.updatePrice(holding.symbol, {
          priceUsd: manualPrice,
          price: FxService.usdToPkr(manualPrice),
          prevCloseUsd: manualPrice * 0.999,
          source: 'manual',
          currency: 'USD',
        });
      } else {
        State.updatePrice(holding.symbol, {
          price: manualPrice,
          prevClose: manualPrice * 0.999,
          source: 'manual',
          currency: 'PKR',
        });
      }
    }
    closeBottomSheet();
    if (typeof LcPolish !== 'undefined') LcPolish.hapticConfirm();
    showToast(`${holding.symbol} reconciled`, 'success');
    renderCurrent();
  }

  function _applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (window.Navigation?.applyTheme) Navigation.applyTheme(theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#fafafa' : '#09090b';
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      if (typeof LcIcons !== 'undefined') btn.innerHTML = LcIcons.icon(theme === 'dark' ? 'moon' : 'sun', 20);
      else btn.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }
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

  return { launch, showToast, refreshPrices, refreshSymbolPrice, clearWrongPrices, openBottomSheet, closeBottomSheet,
    openAddTransaction, openSellHolding, reloadForUpdate, _submitTransaction, _runUndo, _updateBuyTotal, _onSellSymbolChange, _updateSellPnl,
    deleteTransaction, openMarkIpoListed, _submitIpoListed, renderCurrent, dismissInstall, dismissDemo, applyTheme,
    checkPriceAlerts, requestAlertPermission, _filterIntlSymbols, _pickIntlSymbol,
    openAddPortfolio, _submitPortfolio, openAddForPortfolio, deletePortfolio, renamePortfolio,
    openReconcilePosition, _submitReconcile, loadDemo,
    toggleDisplayCurrency, _updateCurrencyToggleBtn, openPriceAlert, _submitPriceAlert, _removePriceAlert };
})();
window.App = App;

document.addEventListener('DOMContentLoaded', App.launch);
