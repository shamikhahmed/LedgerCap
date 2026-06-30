'use strict';
const PlatformUI = (() => {
  function _numberFormat() {
    try {
      return (typeof State !== 'undefined' && State.get('settings')?.numberFormat) || 'full';
    } catch (_) { return 'full'; }
  }

  function fmt(n, opts) {
    if (n == null || Number.isNaN(n)) return '—';
    opts = opts || {};
    if (opts.pct) {
      const d = opts.decimals ?? 2;
      const sign = opts.signed && n > 0 ? '+' : '';
      return sign + Number(n).toFixed(d) + '%';
    }
    const compact = opts.compact ?? (_numberFormat() === 'compact');
    const abs = Math.abs(n);
    if (compact) {
      if (abs >= 1e7) return '₨' + (n / 1e7).toFixed(2) + 'cr';
      if (abs >= 1e5) return '₨' + (n / 1e5).toFixed(2) + 'L';
      if (abs >= 1e3) return '₨' + (n / 1e3).toFixed(2) + 'k';
    }
    const d = opts.decimals ?? 2;
    const formatted = abs.toLocaleString('en-PK', { minimumFractionDigits: d, maximumFractionDigits: d });
    const prefix = opts.noCurrency ? '' : '₨';
    if (opts.signed && n > 0) return '+' + prefix + formatted;
    if (n < 0) return '-' + prefix + formatted;
    return prefix + formatted;
  }

  /** Index / points — no currency prefix, 2 decimals */
  function fmtIndex(n, d) {
    return fmtNum(n, d ?? 2);
  }

  function fmtNum(n, d) {
    if (n == null || Number.isNaN(n)) return '—';
    const dec = d ?? 2;
    return Number(n).toLocaleString('en-PK', { minimumFractionDigits: dec, maximumFractionDigits: dec });
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
    const head = title
      ? `<div class="lc-section-head lc-section-head--inline"><div class="lc-section-kicker">${title}</div></div>`
      : '';
    return `<div class="rt-section cap-reveal">${head}<div class="lc-section-body">${body}</div></div>`;
  }

  return { fmt, fmtNum, fmtIndex, chgCls, ratingBadge, metricCell, metricGrid, section };
})();
window.PlatformUI = PlatformUI;
