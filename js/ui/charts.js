'use strict';
const Charts = (() => {
  function lineChart(data, opts) {
    opts = opts || {};
    const color  = opts.color  || '#FF6B35';
    const height = opts.height || 120;
    const fill   = opts.fill   !== false;
    const width  = 380;

    if (!data || data.length < 2) return '<div style="height:'+height+'px;display:flex;align-items:center;justify-content:center;color:var(--text3);font-size:0.75rem;">Not enough data</div>';

    const min = opts.min !== undefined ? opts.min : Math.min(...data) * 0.98;
    const max = opts.max !== undefined ? opts.max : Math.max(...data) * 1.02;
    const range = max - min || 1;

    const padX = 4;
    const padY = 8;
    const w = width - padX * 2;
    const h = height - padY * 2;

    const points = data.map((v, i) => {
      const x = padX + (i / (data.length - 1)) * w;
      const y = padY + h - ((v - min) / range) * h;
      return [x, y];
    });

    const pathD = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');

    let fillPath = '';
    if (fill) {
      const bottom = padY + h;
      fillPath = `<path d="${pathD} L${points[points.length-1][0]},${bottom} L${points[0][0]},${bottom} Z"
        fill="url(#chartGrad)" opacity="0.3"/>`;
    }

    const isGain = data[data.length - 1] >= data[0];
    const lineColor = isGain ? color : '#F6465D';

    return `<svg viewBox="0 0 ${width} ${height}" style="width:100%;height:${height}px;overflow:visible;" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${lineColor}" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="${lineColor}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${fillPath}
      <path d="${pathD}" fill="none" stroke="${lineColor}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${points[points.length-1][0]}" cy="${points[points.length-1][1]}" r="3" fill="${lineColor}"/>
    </svg>`;
  }

  function barChart(data, opts) {
    opts = opts || {};
    const color  = opts.color  || '#FF6B35';
    const height = opts.height || 80;
    const width  = 380;

    if (!data || data.length === 0) return '';

    const max = Math.max(...data.map(d => d.value)) || 1;
    const barW = Math.floor((width - 8) / data.length) - 2;

    const bars = data.map((d, i) => {
      const bh = Math.max(2, ((d.value / max) * (height - 20)));
      const x  = 4 + i * (barW + 2);
      const y  = height - 16 - bh;
      return `<rect x="${x}" y="${y}" width="${barW}" height="${bh}" rx="2" fill="${d.color || color}" opacity="0.85"/>`;
    }).join('');

    return `<svg viewBox="0 0 ${width} ${height}" style="width:100%;height:${height}px;">
      ${bars}
    </svg>`;
  }

  return { lineChart, barChart };
})();
window.Charts = Charts;
