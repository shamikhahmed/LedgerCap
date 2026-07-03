'use strict';
/** Commodity watchlist — worker snapshot + Yahoo fallback */
window.COMMODITY_ASSETS = [
  { id: 'gold', symbol: 'GOLD', name: 'Gold (COMEX)', yahoo: 'GC=F', snapId: 'GC=F', unit: 'USD/oz', icon: 'gold' },
  { id: 'silver', symbol: 'SILVER', name: 'Silver', yahoo: 'SI=F', snapId: 'SI=F', unit: 'USD/oz', icon: 'silver' },
  { id: 'platinum', symbol: 'PLAT', name: 'Platinum', yahoo: 'PL=F', snapId: 'PL=F', unit: 'USD/oz', icon: 'metal' },
  { id: 'crude', symbol: 'CRUDE', name: 'Crude oil (WTI)', yahoo: 'CL=F', snapId: 'CL=F', unit: 'USD/bbl', icon: 'oil' },
  { id: 'brent', symbol: 'BRENT', name: 'Brent crude', yahoo: 'BZ=F', snapId: 'BZ=F', unit: 'USD/bbl', icon: 'oil' },
  { id: 'natgas', symbol: 'NATGAS', name: 'Natural gas', yahoo: 'NG=F', snapId: 'NG=F', unit: 'USD/MMBtu', icon: 'oil' },
  { id: 'copper', symbol: 'COPPER', name: 'Copper', yahoo: 'HG=F', snapId: 'HG=F', unit: 'USD/lb', icon: 'metal' },
  { id: 'gold_24k', symbol: 'G24K', name: 'Gold 24k (PKR/g)', snapId: 'GOLD_24K_PKR', derived: true, unit: 'PKR/g', icon: 'gold' },
  { id: 'gold_22k', symbol: 'G22K', name: 'Gold 22k (PKR/g)', snapId: 'GOLD_22K_PKR', derived: true, unit: 'PKR/g', icon: 'gold' },
  { id: 'gold_21k', symbol: 'G21K', name: 'Gold 21k (PKR/g)', snapId: 'GOLD_21K_PKR', derived: true, unit: 'PKR/g', icon: 'gold' },
  { id: 'gold_18k', symbol: 'G18K', name: 'Gold 18k (PKR/g)', snapId: 'GOLD_18K_PKR', derived: true, unit: 'PKR/g', icon: 'gold' },
  { id: 'gold_12k', symbol: 'G12K', name: 'Gold 12k (PKR/g)', snapId: 'GOLD_12K_PKR', derived: true, unit: 'PKR/g', icon: 'gold' },
  { id: 'pkr_gold', symbol: 'PKR_GOLD', name: 'Gold 24k (Zakat)', snapId: 'GOLD_24K_PKR', derived: true, unit: 'PKR/g', icon: 'gold' },
  { id: 'ogra_ms', symbol: 'OGRA_MS', name: 'Petrol MS (OGRA)', snapId: 'OGRA_MS', ogra: true, unit: 'PKR/L', icon: 'oil' },
  { id: 'ogra_hsd', symbol: 'OGRA_HSD', name: 'Diesel HSD (OGRA)', snapId: 'OGRA_HSD', ogra: true, unit: 'PKR/L', icon: 'oil' },
];
