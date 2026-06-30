'use strict';
const TradingViewUI = (() => {
  let _loaded = false;

  function _theme() {
    return document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function loadScript() {
    if (_loaded || document.getElementById('tv-widget-script')) {
      _loaded = true;
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.id = 'tv-widget-script';
      s.src = 'https://s3.tradingview.com/tv.js';
      s.async = true;
      s.onload = () => { _loaded = true; resolve(); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function resolveTvSymbol(symbol, assetClass) {
    const intl = (window.INTL_STOCKS || []).find(x => x.symbol === symbol);
    if (intl?.tv) return intl.tv;
    const cry = (window.CRYPTO_ASSETS || []).find(x => x.symbol === symbol);
    if (cry?.tv) return cry.tv;
    if (assetClass === 'crypto') return `BINANCE:${symbol}USDT`;
    if (assetClass === 'intl') return `NASDAQ:${symbol}`;
    const psx = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === symbol);
    if (psx) return `PSX:${symbol}`;
    return null;
  }

  function _isTvLikely(symbol, assetClass) {
    if (assetClass === 'intl' || assetClass === 'crypto') return true;
    if ((window.YAHOO_SYMBOL_MAP || {})[symbol] === null) return false;
    if ((window.MEEZAN_FUNDS || []).some(f => f.symbol === symbol)) return false;
    return !!resolveTvSymbol(symbol, assetClass);
  }

  async function _svgFallback(el, symbol, height) {
    height = height || 360;
    el.innerHTML = `<div class="lc-chart-loading">Loading chart…</div>`;
    let series = [];
    if (typeof Prices !== 'undefined' && Prices.fetchPriceSeries) {
      try { series = await Prices.fetchPriceSeries(symbol, 40); } catch (_) {}
    }
    if (series.length < 2) {
      const hist = (typeof State !== 'undefined' ? State.get('priceHistory') : []) || [];
      if (hist.length >= 2) series = hist.map(h => h.value);
    }
    if (series.length < 2) {
      el.innerHTML = `<p class="psx-muted">Price history chart unavailable for ${symbol}. Refresh live prices or check proxy in Settings.</p>`;
      return;
    }
    const up = series[series.length - 1] >= series[0];
    el.innerHTML = `<div class="lc-chart-fallback">${Charts.lineChart(series, { height, color: up ? '#22c55e' : '#ef4444', fill: true })}<p class="psx-muted lc-chart-caption">Local price series · ${series.length} points</p></div>`;
  }

  async function mount(containerId, symbol, assetClass, opts) {
    opts = opts || {};
    const el = document.getElementById(containerId);
    if (!el || !symbol) return;

    const tvSym = resolveTvSymbol(symbol, assetClass);
    const useTv = opts.forceTv !== false && _isTvLikely(symbol, assetClass) && tvSym;

    if (!useTv) {
      await _svgFallback(el, symbol, opts.height || 360);
      return;
    }

    el.innerHTML = `<div class="psx-tv-wrap"><div id="tv-chart-${containerId}" class="psx-tv-chart"></div></div>`;
    try {
      await loadScript();
      if (typeof TradingView === 'undefined') {
        await _svgFallback(el, symbol, opts.height || 360);
        return;
      }
      new TradingView.widget({
        autosize: true,
        symbol: tvSym,
        interval: 'D',
        timezone: 'Asia/Karachi',
        theme: _theme(),
        style: '1',
        locale: 'en',
        toolbar_bg: '#18181b',
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        container_id: `tv-chart-${containerId}`,
      });
      setTimeout(() => {
        const inner = document.getElementById(`tv-chart-${containerId}`);
        if (inner && !inner.children.length) _svgFallback(el, symbol, opts.height || 360);
      }, 4500);
    } catch (_) {
      await _svgFallback(el, symbol, opts.height || 360);
    }
  }

  function destroy(containerId) {
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = '';
  }

  return { mount, destroy, resolveTvSymbol };
})();
window.TradingViewUI = TradingViewUI;
