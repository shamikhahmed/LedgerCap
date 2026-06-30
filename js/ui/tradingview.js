'use strict';
const TradingViewUI = (() => {

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

  async function _svgChart(el, symbol, height) {
    height = height || 360;
    el.innerHTML = `<div class="lc-chart-loading">Loading chart…</div>`;
    let series = [];
    if (typeof Prices !== 'undefined' && Prices.fetchPriceSeries) {
      try { series = await Prices.fetchPriceSeries(symbol, 40); } catch (_) {}
    }
    if (series.length < 2) {
      el.innerHTML = `<p class="psx-muted">Could not load price history for <strong>${symbol}</strong>. Tap Refresh in Settings or check proxy.</p>`;
      return;
    }
    const up = series[series.length - 1] >= series[0];
    const tvSym = resolveTvSymbol(symbol);
    const tvLink = tvSym
      ? `<p class="lc-chart-caption"><a class="lc-link-btn" href="https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tvSym)}" target="_blank" rel="noopener noreferrer">Open ${tvSym} in TradingView ↗</a></p>`
      : '';
    el.innerHTML = `<div class="lc-chart-fallback">${Charts.lineChart(series, { height, color: up ? '#22c55e' : '#ef4444', fill: true })}${tvLink}<p class="psx-muted lc-chart-caption">${series.length} daily points · USD for US · PKR for PSX</p></div>`;
  }

  /** Reliable SVG price chart — no embedded TradingView widget */
  async function mount(containerId, symbol, assetClass, opts) {
    opts = opts || {};
    const el = document.getElementById(containerId);
    if (!el || !symbol) return;
    await _svgChart(el, symbol, opts.height || 360);
  }

  function destroy(containerId) {
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = '';
  }

  return { mount, destroy, resolveTvSymbol };
})();
window.TradingViewUI = TradingViewUI;
