'use strict';
/** Live price SSE — worker push during PSX session (replaces blind poll when connected). */
const LivePriceStream = (() => {
  let _es = null;
  let _connected = false;
  let _lastTick = 0;

  function _proxyBase() {
    const settings = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    const raw = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(settings.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || '').trim();
    return raw.replace(/\/$/, '');
  }

  function _symbols() {
    const state = State.get();
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    const wl = (state.watchlist || []).map((w) => w.symbol);
    return [...new Set([
      ...holdings.map((h) => h.symbol),
      ...funds.map((f) => f.symbol),
      ...wl,
    ])].slice(0, 24);
  }

  function _enabled() {
    const s = State.get('settings') || {};
    if (s.liveStreamEnabled === false) return false;
    return !!_proxyBase();
  }

  function _applyQuotes(quotes) {
    if (!quotes || typeof quotes !== 'object') return 0;
    let n = 0;
    Object.entries(quotes).forEach(([sym, q]) => {
      if (!q?.price) return;
      State.updatePrice(sym, {
        price: q.price,
        prevClose: q.prevClose || q.price,
        source: 'live-sse',
        ts: q.ts || Date.now(),
      });
      n++;
    });
    if (n > 0) {
      State.recordIntradaySnapshot?.();
      State.logPortfolioSnapshot?.();
      if (typeof GlanceBridge !== 'undefined') GlanceBridge.publish();
      window.dispatchEvent(new CustomEvent('ledgercap:live-prices', { detail: { count: n, ts: Date.now() } }));
    }
    return n;
  }

  function stop() {
    if (_es) {
      _es.close();
      _es = null;
    }
    _connected = false;
  }

  function start() {
    stop();
    if (!_enabled() || typeof document !== 'undefined' && document.hidden) return { ok: false, reason: 'disabled or hidden' };
    const syms = _symbols();
    if (!syms.length) return { ok: false, reason: 'no symbols' };
    const base = _proxyBase();
    const url = `${base}/sse/prices?symbols=${encodeURIComponent(syms.join(','))}&interval=20`;
    try {
      _es = new EventSource(url);
      _es.onopen = () => { _connected = true; };
      _es.onmessage = (ev) => {
        _lastTick = Date.now();
        try {
          const data = JSON.parse(ev.data);
          _applyQuotes(data.quotes);
        } catch (_) {}
      };
      _es.onerror = () => {
        _connected = false;
        stop();
        setTimeout(() => { if (!document.hidden) start(); }, 45000);
      };
      return { ok: true, symbols: syms.length };
    } catch (e) {
      return { ok: false, reason: e.message };
    }
  }

  function status() {
    return { connected: _connected, lastTick: _lastTick, enabled: _enabled() };
  }

  function init() {
    if (typeof document === 'undefined') return;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
    window.addEventListener('ledgercap:live-prices', () => {
      if (typeof App !== 'undefined') {
        App._renderTicker?.();
        if (Navigation?.current?.() === 'portfolio' && typeof PortfolioScreen !== 'undefined') {
          PortfolioScreen.render();
        }
        if (Navigation?.current?.() === 'home' && typeof Hub !== 'undefined') Hub.render();
      }
      if (typeof PriceAlertsService !== 'undefined') PriceAlertsService.checkAll();
    });
    setTimeout(start, 2500);
  }

  return { init, start, stop, status };
})();
window.LivePriceStream = LivePriceStream;
