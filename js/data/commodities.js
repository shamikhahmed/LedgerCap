'use strict';
/** Commodity watchlist — spot proxies via Yahoo (Sarmaaya-style). */
window.COMMODITY_ASSETS = [
  { id: 'gold', symbol: 'GOLD', name: 'Gold', yahoo: 'GC=F', unit: 'USD/oz', icon: 'gold' },
  { id: 'silver', symbol: 'SILVER', name: 'Silver', yahoo: 'SI=F', unit: 'USD/oz', icon: 'silver' },
  { id: 'crude', symbol: 'CRUDE', name: 'Crude oil (WTI)', yahoo: 'CL=F', unit: 'USD/bbl', icon: 'oil' },
  { id: 'copper', symbol: 'COPPER', name: 'Copper', yahoo: 'HG=F', unit: 'USD/lb', icon: 'metal' },
  { id: 'pkr_gold', symbol: 'PKR_GOLD', name: 'Gold (PKR/gram)', manual: true, unit: 'PKR/g', icon: 'gold' },
];
