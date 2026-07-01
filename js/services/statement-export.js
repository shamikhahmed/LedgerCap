'use strict';
/** Tax / audit annual statement — CSV + printable HTML */
const StatementExport = (() => {
  function _year() { return new Date().getFullYear(); }

  function _rows(state) {
    const txs = state.transactions || [];
    const sum = typeof TransactionLedger !== 'undefined' ? TransactionLedger.summary(txs) : {};
    const holdings = PortfolioAnalyticsService.getSummary(state);
    return { txs, sum, holdings };
  }

  function exportCsv(year) {
    year = year || _year();
    const state = State.get();
    const { txs, sum, holdings } = _rows(state);
    const lines = [
      `LedgerCap Annual Statement ${year}`,
      `Generated,${new Date().toISOString()}`,
      `Net worth (PKR),${Math.round(holdings.totalValue)}`,
      `Invested (PKR),${Math.round(holdings.invested)}`,
      `Unrealized P&L (PKR),${Math.round(holdings.totalReturn?.abs || 0)}`,
      `Taxes logged (PKR),${Math.round(sum.taxes || 0)}`,
      `Fees logged (PKR),${Math.round(sum.fees || 0)}`,
      `Dividends logged (PKR),${Math.round(sum.loggedDividends || 0)}`,
      '',
      'Date,Type,Symbol,Broker,Qty,Amount,Notes',
    ];
    txs.filter((t) => String(t.date || '').startsWith(String(year))).forEach((t) => {
      lines.push([
        t.date, t.type, t.symbol || '', t.broker || '',
        t.shares ?? t.units ?? '', t.amount ?? '', (t.notes || '').replace(/,/g, ';'),
      ].join(','));
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `ledgercap-statement-${year}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    return lines.length;
  }

  function exportHtml(year) {
    year = year || _year();
    const state = State.get();
    const { txs, sum, holdings } = _rows(state);
    const fmt = (n) => PlatformUI.fmt(n);
    const yearTxs = txs.filter((t) => String(t.date || '').startsWith(String(year)));
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>LedgerCap ${year}</title>
<style>body{font-family:system-ui,sans-serif;padding:24px;color:#111;max-width:800px;margin:0 auto}
h1{font-size:1.25rem}table{width:100%;border-collapse:collapse;font-size:12px;margin-top:16px}
th,td{border:1px solid #ddd;padding:6px 8px;text-align:left}th{background:#f4f4f5}
.summary{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:16px 0}
.summary div{padding:10px;border:1px solid #e4e4e7;border-radius:8px}
@media print{body{padding:12px}}</style></head><body>
<h1>LedgerCap — Annual Statement ${year}</h1>
<p>Generated ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })} PKT · Rule-based export — verify with broker statements.</p>
<div class="summary">
<div><strong>Net worth</strong><br>${fmt(holdings.totalValue)}</div>
<div><strong>Invested</strong><br>${fmt(holdings.invested)}</div>
<div><strong>Unrealized P&L</strong><br>${fmt(holdings.totalReturn?.abs || 0)}</div>
<div><strong>Taxes / fees / divs</strong><br>${fmt(sum.taxes || 0)} / ${fmt(sum.fees || 0)} / ${fmt(sum.loggedDividends || 0)}</div>
</div>
<table><thead><tr><th>Date</th><th>Type</th><th>Symbol</th><th>Broker</th><th>Qty</th><th>Amount</th></tr></thead><tbody>
${yearTxs.map((t) => `<tr><td>${t.date}</td><td>${t.type}</td><td>${t.symbol || ''}</td><td>${t.broker || ''}</td><td>${t.shares ?? t.units ?? ''}</td><td>${t.amount ?? ''}</td></tr>`).join('')}
</tbody></table>
<p style="font-size:11px;color:#666;margin-top:24px">Not tax advice. For Zakat use in-app Zakat module.</p>
<script>window.onload=function(){window.print()}</script></body></html>`;
    const w = window.open('', '_blank');
    if (!w) return false;
    w.document.write(html);
    w.document.close();
    return true;
  }

  return { exportCsv, exportHtml };
})();
window.StatementExport = StatementExport;
