'use strict';
/** International equities + crypto catalog — prices via worker (Yahoo / CoinGecko) */
window.INTL_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', yahoo: 'AAPL', tv: 'NASDAQ:AAPL', currency: 'USD' },
  { symbol: 'MSFT', name: 'Microsoft', exchange: 'NASDAQ', yahoo: 'MSFT', tv: 'NASDAQ:MSFT', currency: 'USD' },
  { symbol: 'NVDA', name: 'NVIDIA', exchange: 'NASDAQ', yahoo: 'NVDA', tv: 'NASDAQ:NVDA', currency: 'USD' },
  { symbol: 'GOOGL', name: 'Alphabet', exchange: 'NASDAQ', yahoo: 'GOOGL', tv: 'NASDAQ:GOOGL', currency: 'USD' },
  { symbol: 'AMZN', name: 'Amazon', exchange: 'NASDAQ', yahoo: 'AMZN', tv: 'NASDAQ:AMZN', currency: 'USD' },
  { symbol: 'META', name: 'Meta', exchange: 'NASDAQ', yahoo: 'META', tv: 'NASDAQ:META', currency: 'USD' },
  { symbol: 'TSLA', name: 'Tesla', exchange: 'NASDAQ', yahoo: 'TSLA', tv: 'NASDAQ:TSLA', currency: 'USD' },
  { symbol: 'VOO', name: 'Vanguard S&P 500', exchange: 'NYSE', yahoo: 'VOO', tv: 'AMEX:VOO', currency: 'USD' },
  { symbol: 'QQQ', name: 'Invesco QQQ', exchange: 'NASDAQ', yahoo: 'QQQ', tv: 'NASDAQ:QQQ', currency: 'USD' },
  { symbol: 'VT', name: 'Vanguard Total World', exchange: 'NYSE', yahoo: 'VT', tv: 'NYSE:VT', currency: 'USD' },
];

window.CRYPTO_ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin', coingecko: 'bitcoin', tv: 'BINANCE:BTCUSDT', currency: 'USD' },
  { symbol: 'ETH', name: 'Ethereum', coingecko: 'ethereum', tv: 'BINANCE:ETHUSDT', currency: 'USD' },
  { symbol: 'USDT', name: 'Tether', coingecko: 'tether', tv: 'BINANCE:USDTUSD', currency: 'USD' },
  { symbol: 'SOL', name: 'Solana', coingecko: 'solana', tv: 'BINANCE:SOLUSDT', currency: 'USD' },
  { symbol: 'BNB', name: 'BNB', coingecko: 'binancecoin', tv: 'BINANCE:BNBUSDT', currency: 'USD' },
  { symbol: 'XRP', name: 'XRP', coingecko: 'ripple', tv: 'BINANCE:XRPUSDT', currency: 'USD' },
];

window.GLOBAL_FALLBACK_USD = {
  AAPL: 228, MSFT: 420, NVDA: 135, GOOGL: 175, AMZN: 195, META: 580, TSLA: 280, VOO: 520, QQQ: 490, VT: 118,
  BTC: 97000, ETH: 3400, USDT: 1, SOL: 180, BNB: 650, XRP: 2.2,
};

window.GLOBAL_BROKERS = ['IBKR', 'Schwab', 'Fidelity', 'Binance', 'Coinbase', 'Kraken', 'Other'];
