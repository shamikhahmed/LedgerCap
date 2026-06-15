'use strict';
const PlatformUI = (() => {
  function fmt(n, opts) {
    if (n == null || isNaN(n)) return '—';
    opts = opts || {};
    const abs = Math.abs(n);
    if (opts.pct) return (n >= 0 && opts.signed ? '+' : '') + n.toFixed(opts.decimals ?? 1) + '%';
    if (abs >= 1e7) return '₨' + (n / 1e7).toFixed(2) + 'cr';
    if (abs >= 1e5) return '₨' + (n / 1e5).toFixed(2) + 'L';
    if (abs >= 1e3 && opts.compact) return '₨' + (n / 1e3).toFixed(1) + 'k';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function fmtNum(n, d) {
    if (n == null || isNaN(n)) return '—';
    return Number(n).toLocaleString('en-PK', { maximumFractionDigits: d ?? 2 });
  }

  function chgCls(v) { return v >= 0 ? 't-gain' : 't-loss'; }

  function ratingBadge(action) {
    const a = (action || 'HOLD').toUpperCase();
    const cls = a === 'BUY' ? 'rt-buy' : a === 'SELL' ? 'rt-sell' : 'rt-hold';
    return `<span class="rt-badge ${cls}">${a}</span>`;
  }

  function metricCell(label, value, sub, cls) {
    return `<div class="rt-metric"><div class="rt-metric-lbl">${label}</div><div class="rt-metric-val ${cls || ''}">${value}</div>${sub ? `<div class="rt-metric-sub">${sub}</div>` : ''}</div>`;
  }

  function metricGrid(cells, cols) {
    const c = cols || 3;
    return `<div class="rt-grid rt-grid-${c}">${cells.join('')}</div>`;
  }

  function section(title, body) {
    return `<div class="rt-section cap-reveal"><div class="rt-section-title">${title}</div>${body}</div>`;
  }

  return { fmt, fmtNum, chgCls, ratingBadge, metricCell, metricGrid, section };
})();
window.PlatformUI = PlatformUI;
