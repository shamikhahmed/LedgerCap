'use strict';
/**
 * Unified transaction display, cash-flow math, and cross-screen linking.
 */
const TransactionLedger = (() => {
  const TYPE_META = {
    BUY:           { icon: '📈', cls: 'buy',          label: 'Buy',           flow: 'out'  },
    SELL:          { icon: '📉', cls: 'sell',         label: 'Sell',          flow: 'in'   },
    DIVIDEND:      { icon: '💰', cls: 'dividend',     label: 'Dividend',      flow: 'in'   },
    SALARY:        { icon: '💵', cls: 'salary',       label: 'Salary',        flow: 'in'   },
    DEPOSIT:       { icon: '🏧', cls: 'salary',       label: 'Deposit',       flow: 'in'   },
    CONTRIBUTION:  { icon: '🏦', cls: 'contribution', label: 'Fund buy',      flow: 'out'  },
    FUND_OUT:      { icon: '↔', cls: 'contribution', label: 'Fund convert',  flow: 'neutral'},
    REDEMPTION:    { icon: '↩', cls: 'contribution', label: 'Redemption',    flow: 'in'   },
    IPO_SUBSCRIBE: { icon: '🚀', cls: 'ipo',          label: 'IPO',           flow: 'out'  },
    FEE:           { icon: '🧾', cls: 'fee',          label: 'Fee',           flow: 'out'  },
    TAX:           { icon: '⚖', cls: 'tax',          label: 'Tax',           flow: 'out'  },
    INTL_BUY:      { icon: '🌎', cls: 'buy',          label: 'US buy',        flow: 'out'  },
    INTL_SELL:     { icon: '🌎', cls: 'sell',         label: 'US sell',       flow: 'in'   },
    CRYPTO_BUY:    { icon: '₿', cls: 'buy',          label: 'Crypto buy',    flow: 'out'  },
    CRYPTO_SELL:   { icon: '₿', cls: 'sell',         label: 'Crypto sell',   flow: 'in'   },
  };

  const CHARGE_LABELS = {
    txn_cost: 'Transaction cost',
    load: 'Sales load',
    govt_tax: 'Govt tax',
    cgt: 'CGT',
    div_tax: 'Dividend withholding',
    roc_tax: 'ROC withholding',
    registration: 'Registration',
  };

  function meta(tx) {
    return TYPE_META[tx?.type] || { icon: '•', cls: 'buy', label: tx?.type || 'Tx', flow: 'neutral' };
  }

  function amountPkr(tx) {
    if (!tx) return 0;
    if (tx.type === 'INTL_BUY' || tx.type === 'CRYPTO_BUY') {
      const usd = tx.costUsd != null ? tx.costUsd : (tx.priceUsd || 0) * (tx.shares || tx.qty || 0);
      return typeof FxService !== 'undefined' ? FxService.usdToPkr(usd) : usd * 280;
    }
    if (tx.type === 'INTL_SELL' || tx.type === 'CRYPTO_SELL') {
      const usd = (tx.priceUsd || 0) * (tx.shares || tx.qty || 0);
      return typeof FxService !== 'undefined' ? FxService.usdToPkr(usd) : usd * 280;
    }
    if (tx.type === 'BUY' || tx.type === 'SELL') return (tx.amount != null ? tx.amount : (tx.shares || 0) * (tx.price || 0));
    return tx.amount || 0;
  }

  function amountUsd(tx) {
    if (!tx) return null;
    if (tx.costUsd != null) return tx.costUsd;
    if (tx.type === 'INTL_BUY' || tx.type === 'CRYPTO_BUY' || tx.type === 'INTL_SELL' || tx.type === 'CRYPTO_SELL') {
      return (tx.priceUsd || 0) * (tx.shares || tx.qty || 0);
    }
    return null;
  }

  /** Signed PKR cash impact (0 for internal / custodial / neutral converts). */
  function signedFlow(tx) {
    if (!tx || tx.custodial) return 0;
    const m = meta(tx);
    if (tx.internal && tx.type !== 'FUND_OUT' && tx.type !== 'CONTRIBUTION') {
      if (tx.type === 'CONTRIBUTION' || tx.type === 'FUND_OUT') return 0;
    }
    if (tx.internal && ['CONTRIBUTION', 'FUND_OUT'].includes(tx.type)) return 0;

    const pkr = amountPkr(tx);
    if (m.flow === 'in') return pkr;
    if (m.flow === 'out') return -pkr;
    return 0;
  }

  function bucketId(tx) {
    if (typeof PortfolioBuckets === 'undefined') return null;
    return PortfolioBuckets.inferBuiltinId(tx);
  }

  function bucketName(tx) {
    const id = bucketId(tx);
    if (!id || typeof PortfolioBuckets === 'undefined') return tx.broker || '—';
    const b = PortfolioBuckets.BUILTIN.find(x => x.id === id);
    return b?.name || id;
  }

  function chargeLabel(tx) {
    if (tx.chargeType) return CHARGE_LABELS[tx.chargeType] || tx.chargeType;
    if (tx.type === 'TAX') return 'Tax';
    if (tx.type === 'FEE') return 'Fee';
    return null;
  }

  function formatAmount(tx, opts) {
    opts = opts || {};
    const pkr = amountPkr(tx);
    const usd = amountUsd(tx);
    const fmt = typeof PsxUI !== 'undefined'
      ? (n) => PsxUI.fmt(n)
      : (n) => '₨' + Number(n).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (usd != null && (tx.type.startsWith('INTL') || tx.type.startsWith('CRYPTO'))) {
      const usdStr = '$' + Number(usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (opts.usdOnly) return usdStr;
      return `${usdStr} · ${fmt(pkr)}`;
    }
    return fmt(pkr);
  }

  function relatedTxs(tx, all) {
    all = all || [];
    if (!tx?.id) return [];
    return all.filter(t => t.id !== tx.id && (t.relatedId === tx.id || tx.relatedId === t.id));
  }

  function summary(transactions) {
    const txs = transactions || [];
    let inflow = 0;
    let outflow = 0;
    let dividends = 0;
    let taxes = 0;
    let fees = 0;
    const byType = {};
    const byBucket = {};

    txs.forEach(t => {
      const flow = signedFlow(t);
      if (flow > 0) inflow += flow;
      else if (flow < 0) outflow += -flow;

      if (t.type === 'DIVIDEND') dividends += t.amount || 0;
      if (t.type === 'TAX') taxes += t.amount || 0;
      if (t.type === 'FEE') fees += t.amount || 0;

      byType[t.type] = (byType[t.type] || 0) + 1;

      const bid = bucketId(t);
      if (bid) {
        if (!byBucket[bid]) byBucket[bid] = { count: 0, inflow: 0, outflow: 0, taxes: 0, fees: 0 };
        byBucket[bid].count++;
        if (flow > 0) byBucket[bid].inflow += flow;
        else if (flow < 0) byBucket[bid].outflow += -flow;
        if (t.type === 'TAX') byBucket[bid].taxes += t.amount || 0;
        if (t.type === 'FEE') byBucket[bid].fees += t.amount || 0;
      }
    });

    return {
      count: txs.length,
      inflow, outflow, net: inflow - outflow,
      dividends, taxes, fees, charges: taxes + fees,
      byType, byBucket,
      loggedDividends: typeof Ledger !== 'undefined' ? Ledger.totalDividends(txs) : dividends,
    };
  }

  function filterTxs(transactions, opts) {
    opts = opts || {};
    let list = (transactions || []).slice();
    const f = opts.filter || 'all';
    const showInternal = !!opts.showInternal;

    if (!showInternal) list = list.filter(t => !t.internal && !t.custodial);

    if (f === 'all') return list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    if (f === 'buy') return list.filter(t => t.type === 'BUY' || t.type === 'INTL_BUY' || t.type === 'CRYPTO_BUY');
    if (f === 'sell') return list.filter(t => t.type === 'SELL' || t.type === 'INTL_SELL' || t.type === 'CRYPTO_SELL');
    if (f === 'dividend') return list.filter(t => t.type === 'DIVIDEND');
    if (f === 'tax') return list.filter(t => t.type === 'TAX');
    if (f === 'fee') return list.filter(t => t.type === 'FEE');
    if (f === 'deposit') return list.filter(t => t.type === 'DEPOSIT' || t.type === 'SALARY');
    if (f === 'fund') return list.filter(t => ['CONTRIBUTION', 'FUND_OUT', 'REDEMPTION'].includes(t.type));
    if (f === 'global') return list.filter(t => t.type.startsWith('INTL') || t.type.startsWith('CRYPTO'));
    if (f === 'ipo') return list.filter(t => t.type === 'IPO_SUBSCRIBE');
    if (f.startsWith('sym:')) {
      const sym = f.slice(4).toUpperCase();
      return list.filter(t => (t.symbol || '').toUpperCase() === sym);
    }
    if (f.startsWith('bucket:')) {
      const bid = f.slice(7);
      return list.filter(t => bucketId(t) === bid);
    }
    return list.filter(t => t.type === f.toUpperCase());
  }

  function title(tx) {
    const m = meta(tx);
    const charge = chargeLabel(tx);
    if (charge && tx.symbol) return `${charge} · ${tx.symbol}`;
    if (tx.symbol) return `${m.label} · ${tx.symbol}`;
    return m.label;
  }

  return {
    TYPE_META, CHARGE_LABELS, meta, amountPkr, amountUsd, signedFlow, bucketId, bucketName,
    chargeLabel, formatAmount, relatedTxs, summary, filterTxs, title,
  };
})();
window.TransactionLedger = TransactionLedger;
