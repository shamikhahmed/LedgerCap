'use strict';
/** Seed fundamentals — replace via ResearchService adapter when live API connects */
const FUNDAMENTALS_DB = {
  MEBL:  { marketCap: 890000, pe: 6.5, pb: 1.8, roe: 28.4, roa: 2.1, eps: 75.4, divYield: 8.2, payout: 52, revGrowth: 18.2, profitGrowth: 20.1, debtToEquity: 0.12, freeCashFlow: 42000, bookValue: 272, shares: 1815000, divHistory: [{y:2024,a:40},{y:2023,a:35},{y:2022,a:30}], upcomingDiv: {date:'2026-08-15',amount:10} },
  LUCK:  { marketCap: 720000, pe: 12.1, pb: 2.4, roe: 19.8, roa: 8.2, eps: 35.6, divYield: 4.1, payout: 48, revGrowth: 8.4, profitGrowth: 6.2, debtToEquity: 0.28, freeCashFlow: 38000, bookValue: 180, shares: 1670000, divHistory: [{y:2024,a:18},{y:2023,a:16},{y:2022,a:14}], upcomingDiv: {date:'2026-09-20',amount:4.5} },
  OGDC:  { marketCap: 520000, pe: 5.8, pb: 0.9, roe: 15.2, roa: 9.1, eps: 55.2, divYield: 12.4, payout: 72, revGrowth: -2.1, profitGrowth: 4.8, debtToEquity: 0.08, freeCashFlow: 62000, bookValue: 356, shares: 1624000, divHistory: [{y:2024,a:42},{y:2023,a:38},{y:2022,a:35}], upcomingDiv: {date:'2026-07-10',amount:12} },
  PPL:   { marketCap: 310000, pe: 7.2, pb: 1.1, roe: 14.8, roa: 7.5, eps: 31.8, divYield: 10.8, payout: 78, revGrowth: 1.2, profitGrowth: 3.1, debtToEquity: 0.15, freeCashFlow: 28000, bookValue: 208, shares: 1356000, divHistory: [{y:2024,a:22},{y:2023,a:20},{y:2022,a:18}], upcomingDiv: {date:'2026-08-01',amount:6} },
  PICT:  { marketCap: 185000, pe: 14.2, pb: 3.8, roe: 26.5, roa: 12.4, eps: 2.7, divYield: 6.8, payout: 45, revGrowth: 12.4, profitGrowth: 15.2, debtToEquity: 0.22, freeCashFlow: 8200, bookValue: 10.1, shares: 4800000, divHistory: [{y:2024,a:2.5},{y:2023,a:2.2},{y:2022,a:2.0}], upcomingDiv: {date:'2026-10-05',amount:0.8} },
  PNSC:  { marketCap: 42000, pe: 8.4, pb: 1.2, roe: 14.2, roa: 6.8, eps: 64.2, divYield: 7.6, payout: 64, revGrowth: 6.8, profitGrowth: 8.1, debtToEquity: 0.18, freeCashFlow: 3200, bookValue: 450, shares: 65000, divHistory: [{y:2024,a:38},{y:2023,a:35},{y:2022,a:32}], upcomingDiv: {date:'2026-11-12',amount:10} },
  FFC:   { marketCap: 195000, pe: 9.1, pb: 1.6, roe: 17.5, roa: 8.9, eps: 61.5, divYield: 7.4, payout: 67, revGrowth: 4.2, profitGrowth: 5.8, debtToEquity: 0.11, freeCashFlow: 18000, bookValue: 350, shares: 320000, divHistory: [{y:2024,a:38},{y:2023,a:35},{y:2022,a:32}], upcomingDiv: {date:'2026-09-01',amount:10} },
  TRG:   { marketCap: 48000, pe: 18.4, pb: 4.2, roe: 22.8, roa: 11.2, eps: 3.9, divYield: 2.1, payout: 38, revGrowth: 22.4, profitGrowth: 28.6, debtToEquity: 0.05, freeCashFlow: 2100, bookValue: 17, shares: 670000, divHistory: [{y:2024,a:1.2},{y:2023,a:1.0},{y:2022,a:0.8}], upcomingDiv: null },
  SEARL: { marketCap: 125000, pe: 22.1, pb: 5.8, roe: 26.2, roa: 14.1, eps: 4.1, divYield: 1.8, payout: 40, revGrowth: 14.2, profitGrowth: 18.4, debtToEquity: 0.32, freeCashFlow: 4200, bookValue: 15.7, shares: 1375000, divHistory: [{y:2024,a:1.5},{y:2023,a:1.2},{y:2022,a:1.0}], upcomingDiv: null },
  DGKC:  { marketCap: 98000, pe: 11.8, pb: 1.4, roe: 11.8, roa: 5.2, eps: 16.7, divYield: 3.2, payout: 38, revGrowth: 5.4, profitGrowth: 4.1, debtToEquity: 0.42, freeCashFlow: 6800, bookValue: 141, shares: 497000, divHistory: [{y:2024,a:5},{y:2023,a:4.5},{y:2022,a:4}], upcomingDiv: {date:'2026-12-01',amount:1.2} },
  HUBC:  { marketCap: 145000, pe: 8.2, pb: 1.1, roe: 13.4, roa: 4.8, eps: 26.1, divYield: 9.2, payout: 75, revGrowth: 3.8, profitGrowth: 2.4, debtToEquity: 0.55, freeCashFlow: 12000, bookValue: 195, shares: 677000, divHistory: [{y:2024,a:18},{y:2023,a:16},{y:2022,a:14}], upcomingDiv: {date:'2026-08-28',amount:5} },
  MARI:  { marketCap: 88000, pe: 6.4, pb: 2.8, roe: 42.5, roa: 28.4, eps: 101.5, divYield: 5.8, payout: 37, revGrowth: 8.2, profitGrowth: 12.4, debtToEquity: 0.02, freeCashFlow: 14500, bookValue: 232, shares: 135500, divHistory: [{y:2024,a:30},{y:2023,a:28},{y:2022,a:25}], upcomingDiv: {date:'2026-07-25',amount:8} },
  EFERT: { marketCap: 112000, pe: 7.8, pb: 1.5, roe: 19.2, roa: 10.4, eps: 25.7, divYield: 8.8, payout: 68, revGrowth: 6.1, profitGrowth: 7.8, debtToEquity: 0.18, freeCashFlow: 9800, bookValue: 133, shares: 436000, divHistory: [{y:2024,a:16},{y:2023,a:14},{y:2022,a:12}], upcomingDiv: {date:'2026-09-15',amount:4} },
  ATRL:  { marketCap: 78000, pe: 10.2, pb: 1.8, roe: 17.6, roa: 8.1, eps: 85.5, divYield: 4.5, payout: 46, revGrowth: 2.8, profitGrowth: 1.2, debtToEquity: 0.24, freeCashFlow: 5200, bookValue: 485, shares: 89400, divHistory: [{y:2024,a:35},{y:2023,a:32},{y:2022,a:30}], upcomingDiv: null },
  MLCF:  { marketCap: 52000, pe: 13.4, pb: 1.6, roe: 12.1, roa: 5.8, eps: 6.5, divYield: 2.8, payout: 38, revGrowth: 7.2, profitGrowth: 5.4, debtToEquity: 0.38, freeCashFlow: 2800, bookValue: 54.6, shares: 595000, divHistory: [{y:2024,a:2},{y:2023,a:1.8},{y:2022,a:1.5}], upcomingDiv: null },
  CPHL:  { marketCap: 38000, pe: 15.8, pb: 2.2, roe: 14.2, roa: 7.8, eps: 4.9, divYield: 3.4, payout: 54, revGrowth: 9.8, profitGrowth: 11.2, debtToEquity: 0.28, freeCashFlow: 1800, bookValue: 35.3, shares: 488000, divHistory: [{y:2024,a:2.2},{y:2023,a:2.0},{y:2022,a:1.8}], upcomingDiv: null },
  PSO:   { marketCap: 168000, pe: 9.4, pb: 1.3, roe: 13.8, roa: 5.4, eps: 37.4, divYield: 11.2, payout: 82, revGrowth: -4.2, profitGrowth: -2.8, debtToEquity: 0.48, freeCashFlow: 4200, bookValue: 270, shares: 478000, divHistory: [{y:2024,a:35},{y:2023,a:32},{y:2022,a:28}], upcomingDiv: {date:'2026-10-20',amount:9} },
  NRL:   { marketCap: 42000, pe: 8.8, pb: 0.8, roe: 9.2, roa: 4.1, eps: 41.4, divYield: 6.2, payout: 55, revGrowth: 1.4, profitGrowth: 2.1, debtToEquity: 0.32, freeCashFlow: 2100, bookValue: 455, shares: 115000, divHistory: [{y:2024,a:20},{y:2023,a:18},{y:2022,a:16}], upcomingDiv: null },
  NML:   { marketCap: 28000, pe: 11.2, pb: 0.9, roe: 8.1, roa: 3.2, eps: 12.9, divYield: 4.8, payout: 54, revGrowth: 3.2, profitGrowth: 2.8, debtToEquity: 0.62, freeCashFlow: 1200, bookValue: 160, shares: 194000, divHistory: [{y:2024,a:6},{y:2023,a:5.5},{y:2022,a:5}], upcomingDiv: null },
  ENGROH:{ marketCap: 195000, pe: 14.5, pb: 2.8, roe: 19.4, roa: 8.2, eps: 18.1, divYield: 2.4, payout: 35, revGrowth: 11.8, profitGrowth: 14.2, debtToEquity: 0.22, freeCashFlow: 8200, bookValue: 93.6, shares: 1078000, divHistory: [{y:2024,a:4},{y:2023,a:3.5},{y:2022,a:3}], upcomingDiv: null },
  FFL:   { marketCap: 85000, pe: 8.1, pb: 1.4, roe: 17.2, roa: 9.8, eps: 2.2, divYield: 9.8, payout: 80, revGrowth: 4.5, profitGrowth: 5.2, debtToEquity: 0.14, freeCashFlow: 6800, bookValue: 12.7, shares: 4760000, divHistory: [{y:2024,a:1.6},{y:2023,a:1.4},{y:2022,a:1.2}], upcomingDiv: {date:'2026-08-08',amount:0.4} },
  PIBTL: { marketCap: 22000, pe: 12.4, pb: 2.1, roe: 16.8, roa: 9.4, eps: 1.4, divYield: 5.2, payout: 42, revGrowth: 14.2, profitGrowth: 16.8, debtToEquity: 0.18, freeCashFlow: 1400, bookValue: 8.3, shares: 1262000, divHistory: [{y:2024,a:0.7},{y:2023,a:0.6},{y:2022,a:0.5}], upcomingDiv: null },
  PASM:  { marketCap: 18000, pe: 18.2, pb: 0.6, roe: 3.2, roa: 1.8, eps: 0.46, divYield: 0, payout: 0, revGrowth: -8.4, profitGrowth: -12.2, debtToEquity: 1.2, freeCashFlow: -400, bookValue: 14.1, shares: 2125000, divHistory: [], upcomingDiv: null },
  SLGL:  { marketCap: 8000, pe: 22.4, pb: 0.4, roe: 1.8, roa: 0.9, eps: 0.71, divYield: 0, payout: 0, revGrowth: -12.4, profitGrowth: -18.2, debtToEquity: 1.4, freeCashFlow: -200, bookValue: 39.8, shares: 502000, divHistory: [], upcomingDiv: null },
  HINO:  { marketCap: 12000, pe: 16.8, pb: 0.8, roe: 4.8, roa: 2.1, eps: 21.5, divYield: 1.2, payout: 20, revGrowth: -6.2, profitGrowth: -8.4, debtToEquity: 0.72, freeCashFlow: -800, bookValue: 450, shares: 28000, divHistory: [{y:2024,a:4},{y:2023,a:4},{y:2022,a:4}], upcomingDiv: null },
  SSGC:  { marketCap: 42000, pe: 12.2, pb: 0.7, roe: 5.8, roa: 2.4, eps: 2.2, divYield: 4.2, payout: 52, revGrowth: 2.1, profitGrowth: 1.8, debtToEquity: 0.88, freeCashFlow: 800, bookValue: 38.2, shares: 1414000, divHistory: [{y:2024,a:1.0},{y:2023,a:0.9},{y:2022,a:0.8}], upcomingDiv: null },
  PTC:   { marketCap: 35000, pe: 14.8, pb: 1.2, roe: 8.2, roa: 3.8, eps: 4.6, divYield: 3.8, payout: 56, revGrowth: 4.8, profitGrowth: 3.2, debtToEquity: 0.42, freeCashFlow: 2200, bookValue: 56.2, shares: 518000, divHistory: [{y:2024,a:2.2},{y:2023,a:2.0},{y:2022,a:1.8}], upcomingDiv: null },
};

const FUND_ANALYTICS_DB = {
  KMIF:       { category:'Index', expenseRatio:1.2, ytdReturn:12.4, oneYearReturn:18.2, threeYearReturn:42.8, divYield:0, sharpe:1.1, beta:0.98 },
  MIF:        { category:'Equity', expenseRatio:1.8, ytdReturn:14.2, oneYearReturn:22.4, threeYearReturn:48.2, divYield:0, sharpe:0.9, beta:1.05 },
  'MIIF-B':   { category:'Income', expenseRatio:1.0, ytdReturn:8.4, oneYearReturn:14.8, threeYearReturn:38.4, divYield:16.2, sharpe:0.7, beta:0.2 },
  'MIIF-MMKA':{ category:'Income', expenseRatio:1.0, ytdReturn:8.2, oneYearReturn:14.5, threeYearReturn:37.8, divYield:16.0, sharpe:0.7, beta:0.2 },
  MAAF:       { category:'Balanced', expenseRatio:1.5, ytdReturn:10.8, oneYearReturn:16.4, threeYearReturn:35.2, divYield:2.4, sharpe:0.8, beta:0.6 },
  MBF:        { category:'Balanced', expenseRatio:1.4, ytdReturn:9.8, oneYearReturn:15.2, threeYearReturn:32.8, divYield:3.2, sharpe:0.75, beta:0.55 },
  'MDAAF-MDYP':{ category:'Equity', expenseRatio:1.6, ytdReturn:11.2, oneYearReturn:17.8, threeYearReturn:40.2, divYield:4.8, sharpe:0.85, beta:0.9 },
};

/** Estimated period price changes (% from current) — live API will replace */
const PRICE_CHANGE_SEED = {
  MEBL: { weekly: 1.2, monthly: 3.4, yearly: 18.2 },
  LUCK: { weekly: -0.8, monthly: 2.1, yearly: 12.4 },
  OGDC: { weekly: 0.5, monthly: -1.2, yearly: 8.8 },
  PICT: { weekly: 2.4, monthly: 5.8, yearly: 22.4 },
  PNSC: { weekly: 1.8, monthly: 4.2, yearly: 15.6 },
  TRG:  { weekly: 3.2, monthly: 8.4, yearly: 42.8 },
};

window.FUNDAMENTALS_DB = FUNDAMENTALS_DB;
window.FUND_ANALYTICS_DB = FUND_ANALYTICS_DB;
window.PRICE_CHANGE_SEED = PRICE_CHANGE_SEED;
