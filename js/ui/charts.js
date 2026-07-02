'use strict';
const Charts = (() => {

  function _chartColor(fallback) {
    if (typeof document !== 'undefined' && document.body) {
      const v = getComputedStyle(document.body).getPropertyValue('--lc-chart-stroke').trim()
        || getComputedStyle(document.body).getPropertyValue('--psx-accent').trim();
      if (v) return v;
    }
    return fallback || '#0a84ff';
  }

  function _gradId(color) {
    return 'lg_' + String(color || _chartColor()).replace(/[^a-zA-Z0-9]/g, '');
  }

  function lineChart(data, opts) {
    opts = opts || {};
    const color = opts.color || _chartColor();
    const height = opts.height || 100;
    const fill = opts.fill !== false;
    const width = 400;
    const label = opts.ariaLabel || 'Line chart';

    if (!data || data.length < 2) {
      return `<div class="lc-chart-empty" style="height:${height}px">Not enough data for chart</div>`;
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padY = height * 0.08;
    const usableH = height - padY * 2;
    const gid = _gradId(color);

    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = padY + usableH - ((v - min) / range) * usableH;
      return [x, y];
    });

    const linePath = pts.map((p, i) => (i === 0 ? `M${p[0].toFixed(1)},${p[1].toFixed(1)}` : `L${p[0].toFixed(1)},${p[1].toFixed(1)}`)).join(' ');
    const fillPath = fill ? `${linePath} L${width},${height} L0,${height} Z` : '';

    return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="lc-chart-svg" style="width:${opts.width ? opts.width + 'px' : '100%'};height:${height}px;display:block;" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      ${fill ? `<path d="${fillPath}" fill="url(#${gid})" />` : ''}
      <path d="${linePath}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  function lineChartBlock(data, opts) {
    opts = opts || {};
    const caption = opts.caption || '';
    const sub = opts.subcaption || '';
    const subCls = opts.subcaptionCls || '';
    const chart = lineChart(data, opts);
    if (!caption && !sub) return chart;
    return `<div class="lc-chart-inner">${chart}
      <div class="lc-chart-caption">
        <span>${caption}</span>
        ${sub ? `<span class="lc-chart-caption-sub ${subCls}">${sub}</span>` : ''}
      </div>
    </div>`;
  }

  function barChart(data, opts) {
    opts = opts || {};
    const color = opts.color || _chartColor();
    const height = opts.height || 80;
    const width = 400;
    const gap = 3;
    const label = opts.ariaLabel || 'Bar chart';

    if (!data || data.length === 0) {
      return `<div class="lc-chart-empty" style="height:${height}px">No data to chart</div>`;
    }

    const max = Math.max(...data.map(v => Math.abs(v)), 1);
    const barW = (width - gap * (data.length - 1)) / data.length;

    const bars = data.map((v, i) => {
      const barH = Math.max(2, (Math.abs(v) / max) * height);
      const x = i * (barW + gap);
      const y = height - barH;
      const fill = v >= 0 ? color : '#ef4444';
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="2" fill="${fill}"/>`;
    }).join('');

    return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="lc-chart-svg" style="width:${opts.width ? opts.width + 'px' : '100%'};height:${height}px;display:block;" role="img" aria-label="${label}">${bars}</svg>`;
  }

  function ringProgress(pct, color, size, strokeWidth) {
    pct = Math.min(100, Math.max(0, pct || 0));
    color = color || _chartColor();
    size = size || 56;
    strokeWidth = strokeWidth || 5;
    const r = (size - strokeWidth) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct / 100);
    const cx = size / 2;

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="var(--psx-border)" stroke-width="${strokeWidth}"/>
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"
        stroke-dasharray="${circ.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"
        stroke-linecap="round" transform="rotate(-90 ${cx} ${cx})"/>
    </svg>`;
  }

  function sparkline(data, opts) {
    opts = opts || {};
    const h = opts.height || 20;
    const w = opts.width || 56;
    if (!data || data.length < 2) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const up = opts.positive != null ? opts.positive : data[data.length - 1] >= data[0];
    const color = opts.color || (up ? 'var(--psx-up, #30d158)' : 'var(--psx-down, #ff453a)');
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - 2 - ((v - min) / range) * (h - 4);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    return `<svg class="lc-sparkline" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function holdingSpark(h) {
    const px = h.price || 0;
    if (px <= 0) return '';
    const prev = (typeof State !== 'undefined' ? State.getPrevClose(h.symbol) : null) || px;
    const avg = h.quantity > 0 ? h.costBasis / h.quantity : px;
    const data = [avg, (avg + prev) / 2, prev, px].filter((v) => v > 0);
    if (data.length < 2) return sparkline([px, px], { positive: (h.pnlPct || 0) >= 0 });
    return sparkline(data, { positive: (h.pnlPct || 0) >= 0 });
  }

  return { lineChart, lineChartBlock, barChart, ringProgress, sparkline, holdingSpark, _chartColor };
})();
window.Charts = Charts;
