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
    const psx = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === symbol);
    if (psx) return `PSX:${symbol}`;
    if (assetClass === 'crypto') return `BINANCE:${symbol}USDT`;
    if (assetClass === 'intl') return `NASDAQ:${symbol}`;
    return `PSX:${symbol}`;
  }

  async function mount(containerId, symbol, assetClass) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const tvSym = resolveTvSymbol(symbol, assetClass);
    el.innerHTML = `<div class="psx-tv-wrap"><div id="tv-chart-${containerId}" class="psx-tv-chart"></div></div>`;
    try {
      await loadScript();
      if (typeof TradingView === 'undefined') {
        el.innerHTML = `<p class="psx-muted">Chart unavailable offline. Symbol: ${tvSym}</p>`;
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
    } catch (_) {
      el.innerHTML = `<p class="psx-muted">TradingView chart failed to load.</p>`;
    }
  }

  function destroy(containerId) {
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = '';
  }

  return { mount, destroy, resolveTvSymbol };
})();
window.TradingViewUI = TradingViewUI;
