'use strict';
/** International equities catalog — merged from US_STOCKS_CATALOG at load */
window.CRYPTO_ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin', coingecko: 'bitcoin', tv: 'BINANCE:BTCUSDT', currency: 'USD' },
  { symbol: 'ETH', name: 'Ethereum', coingecko: 'ethereum', tv: 'BINANCE:ETHUSDT', currency: 'USD' },
  { symbol: 'USDT', name: 'Tether', coingecko: 'tether', tv: 'BINANCE:USDTUSD', currency: 'USD' },
  { symbol: 'SOL', name: 'Solana', coingecko: 'solana', tv: 'BINANCE:SOLUSDT', currency: 'USD' },
  { symbol: 'BNB', name: 'BNB', coingecko: 'binancecoin', tv: 'BINANCE:BNBUSDT', currency: 'USD' },
  { symbol: 'XRP', name: 'XRP', coingecko: 'ripple', tv: 'BINANCE:XRPUSDT', currency: 'USD' },
  { symbol: 'ADA', name: 'Cardano', coingecko: 'cardano', tv: 'BINANCE:ADAUSDT', currency: 'USD' },
  { symbol: 'DOGE', name: 'Dogecoin', coingecko: 'dogecoin', tv: 'BINANCE:DOGEUSDT', currency: 'USD' },
];

window.GLOBAL_BROKERS = ['IBKR', 'Schwab', 'Fidelity', 'Robinhood', 'Binance', 'Coinbase', 'Kraken', 'Other'];

(function () {
  const us = window.US_STOCKS_CATALOG || [];
  window.INTL_STOCKS = us;
  const fb = {
    AAPL: 228, MSFT: 420, NVDA: 135, GOOGL: 175, AMZN: 195, META: 580, TSLA: 280,
    VOO: 520, QQQ: 490, VT: 118, SPY: 520, BTC: 97000, ETH: 3400, USDT: 1, SOL: 180, BNB: 650, XRP: 2.2,
  };
  us.forEach(s => { if (fb[s.symbol] == null) fb[s.symbol] = 100; });
  window.CRYPTO_ASSETS.forEach(c => { if (fb[c.symbol] == null) fb[c.symbol] = 1; });
  window.GLOBAL_FALLBACK_USD = fb;
})();
