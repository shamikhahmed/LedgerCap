'use strict';
const Charts = (() => {

  function fmt(n) {
    if (n >= 1e7) return (n/1e7).toFixed(1)+'Cr';
    if (n >= 1e5) return (n/1e5).toFixed(1)+'L';
    if (n >= 1e3) return (n/1e3).toFixed(0)+'K';
    return n.toFixed(0);
  }

  function lineChart(container, data, opts = {}) {
    container.innerHTML = '';
    if (!data || data.length < 2) {
      container.innerHTML = '<div class="chart-no-data">Update prices to see portfolio chart</div>';
      return;
    }

    const W = container.offsetWidth || 320;
    const H = opts.height || 140;
    const pad = { top: 16, right: 8, bottom: 28, left: 48 };
    const cw = W - pad.left - pad.right;
    const ch = H - pad.top - pad.bottom;

    const vals = data.map(d => d.value);
    const minV = Math.min(...vals) * 0.99;
    const maxV = Math.max(...vals) * 1.01;
    const range = maxV - minV || 1;

    const xScale = i => pad.left + (i / (data.length - 1)) * cw;
    const yScale = v => pad.top + ch - ((v - minV) / range) * ch;

    const points = data.map((d, i) => `${xScale(i).toFixed(1)},${yScale(d.value).toFixed(1)}`).join(' ');
    const areaPoints = `${xScale(0).toFixed(1)},${(pad.top + ch).toFixed(1)} ${points} ${xScale(data.length-1).toFixed(1)},${(pad.top + ch).toFixed(1)}`;

    const isUp = vals[vals.length-1] >= vals[0];
    const lineColor = isUp ? '#30D158' : '#FF3B30';
    const gradId = 'grad_' + Math.random().toString(36).slice(2,7);

    const last = data[data.length - 1];
    const labelDates = [data[0], data[Math.floor(data.length/2)], last];

    let svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${lineColor}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${lineColor}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <polygon points="${areaPoints}" fill="url(#${gradId})" />
  <polyline points="${points}" fill="none" stroke="${lineColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;

    // Y axis labels
    const steps = 3;
    for (let i = 0; i <= steps; i++) {
      const v = minV + (range * i / steps);
      const y = yScale(v);
      svg += `<text x="${pad.left - 4}" y="${y + 4}" fill="#636366" font-size="9" text-anchor="end" font-family="-apple-system,sans-serif">${fmt(v)}</text>`;
      svg += `<line x1="${pad.left}" y1="${y}" x2="${pad.left + cw}" y2="${y}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`;
    }

    // X axis date labels
    labelDates.forEach((d, i) => {
      if (!d) return;
      const di = data.indexOf(d);
      const x = xScale(di);
      const anchor = i === 0 ? 'start' : i === labelDates.length - 1 ? 'end' : 'middle';
      const label = d.date ? d.date.slice(5) : '';
      svg += `<text x="${x}" y="${H - 6}" fill="#636366" font-size="9" text-anchor="${anchor}" font-family="-apple-system,sans-serif">${label}</text>`;
    });

    // Last value dot
    const lx = xScale(data.length - 1);
    const ly = yScale(last.value);
    svg += `<circle cx="${lx}" cy="${ly}" r="3.5" fill="${lineColor}"/>`;

    svg += '</svg>';
    container.innerHTML = svg;
  }

  function allocationBar(container, segments) {
    container.innerHTML = '';
    const total = segments.reduce((s, seg) => s + seg.value, 0);
    if (total <= 0) {
      container.innerHTML = '<div style="color:var(--text3);font-size:0.78rem;padding:8px 0">No data yet — update prices</div>';
      return;
    }

    let barHtml = '<div class="alloc-bar">';
    segments.forEach(seg => {
      const pct = total > 0 ? (seg.value / total * 100).toFixed(1) : 0;
      barHtml += `<div class="alloc-segment" style="width:${pct}%;background:${seg.color};min-width:${pct > 0 ? 4 : 0}px"></div>`;
    });
    barHtml += '</div><div class="alloc-legend">';
    segments.forEach(seg => {
      const pct = total > 0 ? (seg.value / total * 100).toFixed(1) : 0;
      barHtml += `<div class="alloc-legend-item"><div class="alloc-dot" style="background:${seg.color}"></div>${seg.label} ${pct}%</div>`;
    });
    barHtml += '</div>';
    container.innerHTML = barHtml;
  }

  function sectorBars(container, sectors) {
    container.innerHTML = '';
    if (!sectors || !sectors.length) {
      container.innerHTML = '<div style="color:var(--text3);font-size:0.78rem;padding:8px 0">Update prices to see sector breakdown</div>';
      return;
    }
    const max = sectors[0].value;
    let html = '';
    sectors.forEach(s => {
      const pct = max > 0 ? (s.value / max * 100).toFixed(0) : 0;
      html += `<div class="sector-bar-row">
        <div class="sector-bar-label"><span>${s.sector}</span><span style="color:var(--text3)">${fmtPKR(s.value)}</span></div>
        <div class="sector-bar-bg"><div class="sector-bar-fill" style="width:${pct}%"></div></div>
      </div>`;
    });
    container.innerHTML = html;
  }

  function fmtPKR(n) {
    if (!n || isNaN(n)) return '₨0';
    if (n >= 1e7) return '₨' + (n/1e7).toFixed(2) + 'Cr';
    if (n >= 1e5) return '₨' + (n/1e5).toFixed(1) + 'L';
    if (n >= 1e3) return '₨' + (n/1e3).toFixed(1) + 'K';
    return '₨' + n.toFixed(0);
  }

  return { lineChart, allocationBar, sectorBars, fmtPKR };
})();
window.Charts = Charts;
