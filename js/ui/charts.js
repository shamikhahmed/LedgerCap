'use strict';
const Charts = (() => {

  function lineChart(data, opts) {
    opts = opts || {};
    const color = opts.color || '#FF6B35';
    const height = opts.height || 100;
    const fill = opts.fill !== false;
    const width = 400;

    if (!data || data.length < 2) return '<div style="height:' + height + 'px;display:flex;align-items:center;justify-content:center;color:var(--text3);font-size:0.75rem;">Not enough data</div>';

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padY = height * 0.08;
    const usableH = height - padY * 2;

    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = padY + usableH - ((v - min) / range) * usableH;
      return [x, y];
    });

    const linePath = pts.map((p, i) => (i === 0 ? `M${p[0].toFixed(1)},${p[1].toFixed(1)}` : `L${p[0].toFixed(1)},${p[1].toFixed(1)}`)).join(' ');

    const fillPath = fill
      ? `${linePath} L${width},${height} L0,${height} Z`
      : '';

    const trend = data[data.length - 1] >= data[0];

    return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" style="width:100%;height:${height}px;display:block;">
      <defs>
        <linearGradient id="lg_${color.slice(1)}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.01"/>
        </linearGradient>
      </defs>
      ${fill ? `<path d="${fillPath}" fill="url(#lg_${color.slice(1)})" />` : ''}
      <path d="${linePath}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  function barChart(data, opts) {
    opts = opts || {};
    const color = opts.color || '#FF6B35';
    const height = opts.height || 80;
    const width = 400;
    const gap = 3;

    if (!data || data.length === 0) return '';

    const max = Math.max(...data, 1);
    const barW = (width - gap * (data.length - 1)) / data.length;

    const bars = data.map((v, i) => {
      const barH = Math.max(2, (v / max) * height);
      const x = i * (barW + gap);
      const y = height - barH;
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="2" fill="${color}"/>`;
    }).join('');

    return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" style="width:100%;height:${height}px;display:block;">${bars}</svg>`;
  }

  function ringProgress(pct, color, size, strokeWidth) {
    pct = Math.min(100, Math.max(0, pct || 0));
    color = color || '#FF6B35';
    size = size || 56;
    strokeWidth = strokeWidth || 5;
    const r = (size - strokeWidth) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct / 100);
    const cx = size / 2;

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="var(--bg4)" stroke-width="${strokeWidth}"/>
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"
        stroke-dasharray="${circ.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"
        stroke-linecap="round" transform="rotate(-90 ${cx} ${cx})"/>
    </svg>`;
  }

  return { lineChart, barChart, ringProgress };
})();
window.Charts = Charts;
