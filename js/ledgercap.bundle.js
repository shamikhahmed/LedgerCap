/* LedgerCap CORE — 29 modules — run: npm run bundle */
;/* === js/data/holdings.js === */
'use strict';

/** Portfolio seed v10 — full AMC fees/taxes + linked transaction ledger. */
const PORTFOLIO_SEED_VERSION = 10;
const SEED_DATA_VERSION = PORTFOLIO_SEED_VERSION;
/** Rafi Securities cash balance per vTrade Net Equity popup (01 Jul 2026). */
const RAFI_BROKER_CASH_PKR = 860.25;
/** AKD PASM Jun-8 block was 11,000 @ 8.41; friend funded 9,445 (~₨80k) — custodial cash, not your shares. */
const FRIEND_PASM_SHARES = 9445;
const USER_PASM_SHARES = 1555;
const PASM_AKD_AVG_COST = 8.41;
const PASM_AKD_SELL_PRICE = 10.31;
const FRIEND_PASM_DEPOSIT_PKR = 80000;
const FRIEND_PASM_PROFIT_PKR = Math.round(FRIEND_PASM_SHARES * (PASM_AKD_SELL_PRICE - PASM_AKD_AVG_COST) * 100) / 100;
/** Friend's principal + PASM profit still in AKD ledger (custodial — exclude from your net worth). */
const FRIEND_CUSTODIAL_CASH_PKR = FRIEND_PASM_DEPOSIT_PKR + FRIEND_PASM_PROFIT_PKR;
/** AKD COAF55870 ledger cash per statement 01 Jul 2026 (after PASM exit). */
const AKD_LEDGER_CASH_PKR = 138045;
/** Your uninvested AKD cash (ledger minus friend's custodial). */
const USER_AKD_CASH_PKR = Math.round((AKD_LEDGER_CASH_PKR - FRIEND_CUSTODIAL_CASH_PKR) * 100) / 100;
/** Uninvested broker cash counted in net worth (Rafi + your AKD slice; excludes friend custodial). */
const USER_BROKER_CASH_PKR = Math.round((RAFI_BROKER_CASH_PKR + USER_AKD_CASH_PKR) * 100) / 100;

/** Total capital deployed — your records (may differ from open-position cost basis). */
const RAFI_TOTAL_INVESTED_PKR = 540000;
/** Your AKD deposits (₨150k May 22 + ₨50k Jun 16; excludes friend ₨80k custodial). */
const AKD_TOTAL_INVESTED_PKR = 200000;
/** TTWO IBKR — both buys incl. fees ($1,110.45 + $1,255.00). */
const TTWO_TOTAL_INVESTED_USD = 2365.45;

const RAFI_STOCKS = [
  { id:'r_atrl', symbol:'ATRL', name:'Attock Refinery', shares:10, avgCost:953.3, broker:'Rafi', sector:'Energy', isShariah:false },
  { id:'r_cphl', symbol:'CPHL', name:'Cherat Packaging', shares:120, avgCost:86.67, broker:'Rafi', sector:'Packaging', isShariah:true },
  { id:'r_dgkc', symbol:'DGKC', name:'DG Khan Cement', shares:100, avgCost:197.98, broker:'Rafi', sector:'Cement', isShariah:true },
  { id:'r_efert', symbol:'EFERT', name:'Engro Fertilizers', shares:90, avgCost:207.4, broker:'Rafi', sector:'Fertilizer', isShariah:false },
  { id:'r_engroh', symbol:'ENGROH', name:'Engro Holdings', shares:60, avgCost:287.0, broker:'Rafi', sector:'Conglomerate', isShariah:false },
  { id:'r_ffl', symbol:'FFL', name:'Fauji Fertilizer Bin Qasim', shares:300, avgCost:17.74, broker:'Rafi', sector:'Fertilizer', isShariah:false },
  { id:'r_hubc', symbol:'HUBC', name:'Hub Power Company', shares:60, avgCost:225.9, broker:'Rafi', sector:'Power', isShariah:false },
  { id:'r_luck', symbol:'LUCK', name:'Lucky Cement', shares:275, avgCost:428.68, broker:'Rafi', sector:'Cement', isShariah:true },
  { id:'r_mari', symbol:'MARI', name:'Mari Petroleum', shares:20, avgCost:674.66, broker:'Rafi', sector:'Oil & Gas', isShariah:false },
  { id:'r_mebl', symbol:'MEBL', name:'Meezan Bank', shares:100, avgCost:491.59, broker:'Rafi', sector:'Banking', isShariah:true },
  { id:'r_miietf', symbol:'MIIETF', name:'Meezan Islamic Income ETF', shares:1500, avgCost:17.4, broker:'Rafi', sector:'ETF', isShariah:true },
  { id:'r_mlcf', symbol:'MLCF', name:'Maple Leaf Cement', shares:150, avgCost:89.94, broker:'Rafi', sector:'Cement', isShariah:true },
  { id:'r_mznpetf', symbol:'MZNPETF', name:'Meezan Petroleum ETF', shares:3000, avgCost:21.14, broker:'Rafi', sector:'ETF', isShariah:true },
  { id:'r_nml', symbol:'NML', name:'Nishat Mills', shares:60, avgCost:160.75, broker:'Rafi', sector:'Textile', isShariah:true },
  { id:'r_nrl', symbol:'NRL', name:'National Refinery', shares:25, avgCost:382.98, broker:'Rafi', sector:'Energy', isShariah:false },
  { id:'r_ogdc', symbol:'OGDC', name:'Oil & Gas Dev Co', shares:135, avgCost:322.64, broker:'Rafi', sector:'Oil & Gas', isShariah:false },
  { id:'r_ppl', symbol:'PPL', name:'Pakistan Petroleum', shares:30, avgCost:241.84, broker:'Rafi', sector:'Oil & Gas', isShariah:false },
  { id:'r_pso', symbol:'PSO', name:'Pakistan State Oil', shares:35, avgCost:331.39, broker:'Rafi', sector:'Energy', isShariah:false },
  { id:'r_ptc', symbol:'PTC', name:'Pakistan Telecom', shares:100, avgCost:58.5, broker:'Rafi', sector:'Telecom', isShariah:false },
  { id:'r_searl', symbol:'SEARL', name:'Searle Pakistan', shares:930, avgCost:92.74, broker:'Rafi', sector:'Pharma', isShariah:true },
  { id:'r_ssgc', symbol:'SSGC', name:'Sui Southern Gas', shares:200, avgCost:28.74, broker:'Rafi', sector:'Gas', isShariah:false },
];

const AKD_STOCKS = [
  { id:'a_fatima', symbol:'FATIMA', name:'Fatima Fertilizer', shares:100, avgCost:141.4, broker:'AKD', sector:'Fertilizer', isShariah:true },
  { id:'a_ffc', symbol:'FFC', name:'Fauji Fertilizer Company', shares:20, avgCost:559.95, broker:'AKD', sector:'Fertilizer', isShariah:false },
  { id:'a_hino', symbol:'HINO', name:'Hino Pak Motors', shares:20, avgCost:360.0, broker:'AKD', sector:'Auto', isShariah:false },
  { id:'a_luck', symbol:'LUCK', name:'Lucky Cement', shares:50, avgCost:435.0, broker:'AKD', sector:'Cement', isShariah:true },
  { id:'a_mlcf', symbol:'MLCF', name:'Maple Leaf Cement', shares:200, avgCost:102.22, broker:'AKD', sector:'Cement', isShariah:true },
  { id:'a_mughal', symbol:'MUGHAL', name:'Mughal Iron & Steel', shares:120, avgCost:87.16, broker:'AKD', sector:'Steel', isShariah:false },
  { id:'a_pael', symbol:'PAEL', name:'Pak Elektron', shares:100, avgCost:43.76, broker:'AKD', sector:'Electronics', isShariah:false },
  { id:'a_pibtl', symbol:'PIBTL', name:'Pakistan Int\'l Bulk Terminal', shares:620, avgCost:17.43, broker:'AKD', sector:'Logistics', isShariah:true },
  { id:'a_pict', symbol:'PICT', name:'Pakistan Int\'l Container Terminal', shares:160, avgCost:38.47, broker:'AKD', sector:'Logistics', isShariah:true },
  { id:'a_pnsc', symbol:'PNSC', name:'Pakistan National Shipping', shares:25, avgCost:509.99, broker:'AKD', sector:'Shipping', isShariah:true },
  { id:'a_ppl', symbol:'PPL', name:'Pakistan Petroleum', shares:70, avgCost:226.5, broker:'AKD', sector:'Oil & Gas', isShariah:false },
  { id:'a_pso', symbol:'PSO', name:'Pakistan State Oil', shares:50, avgCost:367.8, broker:'AKD', sector:'Energy', isShariah:false },
  { id:'a_slgl', symbol:'SLGL', name:'Sind Leasing', shares:200, avgCost:15.88, broker:'AKD', sector:'Textile', isShariah:false },
  { id:'a_treet', symbol:'TREET', name:'Treet Corp', shares:200, avgCost:24.81, broker:'AKD', sector:'Food', isShariah:true },
];

const MEEZAN_FUNDS = [
  { id:'m_kmif', symbol:'KMIF', name:'KSE Meezan Index Fund', units:1585.2451, avgNav:182.4219, currentNav:182.4219, type:'Index Fund', isShariah:true, plan:'GROWTH-B' },
  { id:'m_maaf', symbol:'MAAF', name:'Meezan Asset Allocation Fund', units:95.1548, avgNav:117.4596, currentNav:117.4596, type:'Balanced', isShariah:true, plan:'GROWTH-B' },
  { id:'m_mbf', symbol:'MBF', name:'Meezan Balanced Fund', units:2184.6673, avgNav:27.5584, currentNav:27.5584, type:'Balanced', isShariah:true, plan:'GROWTH-A' },
  { id:'m_mdaaf_mdyp', symbol:'MDAAF-MDYP', name:'Meezan Dividend Yield Plan', units:129.0669, avgNav:85.6166, currentNav:85.6166, type:'Equity', isShariah:true, plan:'GROWTH-B' },
  { id:'m_mif', symbol:'MIF', name:'Meezan Islamic Fund', units:816.3851, avgNav:168.6041, currentNav:168.6041, type:'Equity Fund', isShariah:true, plan:'GROWTH-B' },
  { id:'m_miif_b', symbol:'MIIF-B', name:'Meezan Islamic Income Fund', units:2529.8167, avgNav:51.9335, currentNav:51.9335, type:'Income Fund', isShariah:true, plan:'GROWTH-B' },
  { id:'m_miif_mmka', symbol:'MIIF-MMKA', name:'Meezan Islamic Income Fund (MMKA)', units:403.5027, avgNav:51.9335, currentNav:51.9335, type:'Income Fund', isShariah:true, plan:'MMKA' },
];
/** Meezan portfolio 733102-1 — total value per AMC statement 29-Jun-2026. */
const MEEZAN_PORTFOLIO_VALUE_PKR = 661600;
const MEEZAN_TOTAL_PURCHASES_PKR = 634000;

const ADVISOR_RATINGS = {
  'MEBL':  { rating:'STRONG BUY', conviction:9, target:null, thesis:'Best bank in Pakistan. P/E 6.5, profit grew 20% last year. Should be your single largest stock position. Everything orbits around this.' },
  'PICT':  { rating:'BUY',        conviction:8, target:null, thesis:'Near-monopoly port terminal. Dollar-linked revenues. Build to 500+ shares over 12 months using monthly stock bucket.' },
  'PNSC':  { rating:'BUY',        conviction:8, target:null, thesis:'Dollar revenues, state-backed, 7.6% dividend yield. Position far too small. Double or triple over next quarter.' },
  'FFC':   { rating:'BUY',        conviction:7, target:629,  thesis:'Dividend yield 7.4%, analyst target PKR 629. Bought above current market — add more on dips.' },
  'LUCK':  { rating:'HOLD',       conviction:6, target:null, thesis:'Quality cement name. Largest position by value. Hold — no action needed.' },
  'OGDC':  { rating:'BUY',        conviction:7, target:null, thesis:'Deploy from MIIF reserves when KSE-100 drops 8-10%. Pair with PNSC for dollar + energy exposure.' },
  'PASM':  { rating:'CLOSED',   conviction:0, target:null, thesis:'Exited Jun 24 @ 10.31 (your 1,555 sh). Friend 9,445 funded via ₨80k — custodial cash in AKD ledger.' },
  'SLGL':  { rating:'SPECULATIVE',conviction:2, target:null, thesis:'Tip-based purchase. Structurally weak textile company. Monitor for exit when in profit.' },
  'HINO':  { rating:'WEAK HOLD',  conviction:3, target:null, thesis:'Auto assembler facing EV disruption and weak demand cycle. No strong thesis. Hold for now.' },
  'PIBTL': { rating:'HOLD',       conviction:5, target:null, thesis:'Logistics infrastructure play. Sector is right. Position size acceptable.' },
  'SEARL':  { rating:'WEAK HOLD',  conviction:3, target:null, thesis:'Pharma facing structural headwinds. Large position needs monitoring.' },
  'DGKC':  { rating:'HOLD',       conviction:5, target:null, thesis:'Cement sector exposure. DG Khan has cement + glass businesses.' },
  'HUBC':  { rating:'HOLD',       conviction:5, target:null, thesis:'Power sector. Long-term CPEC-linked revenues. Hold.' },
  'TRG':   { rating:'BUY',        conviction:7, target:null, thesis:'Pakistan technology export story. Dollar revenues from BPO. Long-term hold.' },
  'FATIMA':{ rating:'HOLD',       conviction:5, target:null, thesis:'Fertilizer sector exposure via AKD account.' },
};

const SIP_PLAN = [
  { fund:'KMIF', amount:40000, color:LCBrand.h_ff6b35, note:'Foundation. Never stop. Index everything.' },
  { fund:'MIF',  amount:20000, color:LCBrand.h_0ecb81, note:'Active equity exposure via Meezan managers.' },
  { fund:'MIIF', amount:10000, color:LCBrand.h_1890ff, note:'Buffer at 16-18% yield. Convert to KMIF on 15%+ KSE drop.' },
  { fund:'STK',  amount:5000,  color:LCBrand.h_f0b90b, note:'Accumulate. Only deploy with full investment memo.' },
];

const FALLBACK_PRICES_UPDATED = '2026-07-01';

const FALLBACK_PRICES = {
  'ATRL': 872.0,
  'CPHL': 78.55,
  'DGKC': 226.4,
  'EFERT': 189.5,
  'ENGROH': 290.9,
  'FATIMA': 148.0,
  'FFC': 566.89,
  'FFL': 17.85,
  'HINO': 371.21,
  'HUBC': 233.0,
  'KMIF': 182.4219,
  'LUCK': 470.9,
  'MAAF': 117.4596,
  'MARI': 672.01,
  'MBF': 27.5584,
  'MDAAF-MDYP': 85.6166,
  'MEBL': 544.1,
  'MIF': 168.6041,
  'MIIETF': 17.36,
  'MIIF-B': 51.9335,
  'MIIF-MMKA': 51.9335,
  'MLCF': 106.74,
  'MUGHAL': 86.68,
  'MZNPETF': 18.35,
  'NML': 160.0,
  'NRL': 365.0,
  'OGDC': 333.66,
  'PAEL': 44.5,
  'PASM': 10.31,
  'PIBTL': 18.35,
  'PICT': 39.24,
  'PNSC': 563.44,
  'PPL': 243.72,
  'PSO': 346.5,
  'PTC': 70.85,
  'SEARL': 94.45,
  'SLGL': 16.48,
  'SSGC': 31.27,
  'TREET': 26.25,
  'TRG': 64.31,
};

const WATCHLIST = [
  { symbol:'MEBL', name:'Meezan Bank',      thesis:'Add more — build to largest position', targetPrice:550, priority:'HIGH'   },
  { symbol:'PICT', name:'PICT',             thesis:'Build from 160 to 500+ shares',         targetPrice:45,  priority:'HIGH'   },
  { symbol:'PNSC', name:'Pakistan Shipping',thesis:'Double or triple position',             targetPrice:600, priority:'HIGH'   },
  { symbol:'OGDC', name:'OGDC',             thesis:'Buy on 8-10% KSE drop only',            targetPrice:300, priority:'MEDIUM' },
  { symbol:'TRG',  name:'TRG Pakistan',     thesis:'Tech/BPO story — add on dips',          targetPrice:75,  priority:'MEDIUM' },
];

const INITIAL_TRANSACTIONS = [
  { id:'t_0001', date:'2026-07-01', type:'BUY', symbol:'ATRL', broker:'Rafi', shares:10, price:953.3, amount:9533.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0002', date:'2026-07-01', type:'BUY', symbol:'CPHL', broker:'Rafi', shares:120, price:86.67, amount:10400.4, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0003', date:'2026-07-01', type:'BUY', symbol:'DGKC', broker:'Rafi', shares:100, price:197.98, amount:19798.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0004', date:'2026-07-01', type:'BUY', symbol:'EFERT', broker:'Rafi', shares:90, price:207.4, amount:18666.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0005', date:'2026-07-01', type:'BUY', symbol:'ENGROH', broker:'Rafi', shares:60, price:287.0, amount:17220.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0006', date:'2026-07-01', type:'BUY', symbol:'FFL', broker:'Rafi', shares:300, price:17.74, amount:5322.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0007', date:'2026-07-01', type:'BUY', symbol:'HUBC', broker:'Rafi', shares:60, price:225.9, amount:13554.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0008', date:'2026-07-01', type:'BUY', symbol:'LUCK', broker:'Rafi', shares:275, price:428.68, amount:117887.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0009', date:'2026-07-01', type:'BUY', symbol:'MARI', broker:'Rafi', shares:20, price:674.66, amount:13493.2, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0010', date:'2026-07-01', type:'BUY', symbol:'MEBL', broker:'Rafi', shares:100, price:491.59, amount:49159.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0011', date:'2026-07-01', type:'BUY', symbol:'MIIETF', broker:'Rafi', shares:1500, price:17.4, amount:26100.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0012', date:'2026-07-01', type:'BUY', symbol:'MLCF', broker:'Rafi', shares:150, price:89.94, amount:13491.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0013', date:'2026-07-01', type:'BUY', symbol:'MZNPETF', broker:'Rafi', shares:3000, price:21.14, amount:63420.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0014', date:'2026-07-01', type:'BUY', symbol:'NML', broker:'Rafi', shares:60, price:160.75, amount:9645.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0015', date:'2026-07-01', type:'BUY', symbol:'NRL', broker:'Rafi', shares:25, price:382.98, amount:9574.5, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0016', date:'2026-07-01', type:'BUY', symbol:'OGDC', broker:'Rafi', shares:135, price:322.64, amount:43556.4, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0017', date:'2026-07-01', type:'BUY', symbol:'PPL', broker:'Rafi', shares:30, price:241.84, amount:7255.2, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0018', date:'2026-07-01', type:'BUY', symbol:'PSO', broker:'Rafi', shares:35, price:331.39, amount:11598.65, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0019', date:'2026-07-01', type:'BUY', symbol:'PTC', broker:'Rafi', shares:100, price:58.5, amount:5850.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0020', date:'2026-07-01', type:'BUY', symbol:'SEARL', broker:'Rafi', shares:930, price:92.74, amount:86248.2, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_0021', date:'2026-07-01', type:'BUY', symbol:'SSGC', broker:'Rafi', shares:200, price:28.74, amount:5748.0, notes:'vTrade snapshot account 6773 (01 Jul 2026)' },
  { id:'t_akd_dep1', date:'2026-05-22', type:'DEPOSIT', broker:'AKD', amount:150000, notes:'COAF55870 RAAST RV426463' },
  { id:'t_0105', date:'2026-06-05', type:'BUY', symbol:'HINO', broker:'AKD', shares:20, price:360.0, amount:7200.0, notes:'COAF55870 CV060030 · debit 7,212.52 incl. fees' },
  { id:'t_akd_dep2', date:'2026-06-05', type:'DEPOSIT', broker:'AKD', amount:FRIEND_PASM_DEPOSIT_PKR, custodial:true, notes:'Friend RAAST RV442032 — PASM funding (9,445 sh custodial)' },
  { id:'t_0106', date:'2026-06-08', type:'BUY', symbol:'LUCK', broker:'AKD', shares:50, price:435.0, amount:21750.0, notes:'COAF55870 CV060036' },
  { id:'t_0107', date:'2026-06-08', type:'BUY', symbol:'PIBTL', broker:'AKD', shares:520, price:17.37, amount:9032.4, notes:'COAF55870 CV060036' },
  { id:'t_0108', date:'2026-06-08', type:'BUY', symbol:'PICT', broker:'AKD', shares:160, price:38.47, amount:6155.2, notes:'COAF55870 CV060036' },
  { id:'t_0109', date:'2026-06-08', type:'BUY', symbol:'PNSC', broker:'AKD', shares:25, price:509.99, amount:12749.75, notes:'COAF55870 CV060036' },
  { id:'t_0110', date:'2026-06-08', type:'BUY', symbol:'SLGL', broker:'AKD', shares:200, price:15.88, amount:3176.0, notes:'COAF55870 CV060036' },
  { id:'t_0111', date:'2026-06-08', type:'BUY', symbol:'FFC', broker:'AKD', shares:20, price:559.95, amount:11199.0, notes:'COAF55870 CV060036' },
  { id:'t_pasm', date:'2026-06-08', type:'BUY', symbol:'PASM', broker:'AKD', shares:USER_PASM_SHARES, price:PASM_AKD_AVG_COST, amount:Math.round(USER_PASM_SHARES * PASM_AKD_AVG_COST * 100) / 100, notes:'Your 1,555 sh only — broker block 11,000 @ 8.41' },
  { id:'t_0112', date:'2026-06-11', type:'BUY', symbol:'FATIMA', broker:'AKD', shares:100, price:141.4, amount:14140.0, notes:'COAF55870 CV060055' },
  { id:'t_0113', date:'2026-06-15', type:'BUY', symbol:'MLCF', broker:'AKD', shares:100, price:90.0, amount:9000.0, notes:'COAF55870 CV060068' },
  { id:'t_0114', date:'2026-06-15', type:'BUY', symbol:'PIBTL', broker:'AKD', shares:100, price:17.73, amount:1773.0, notes:'COAF55870 CV060068' },
  { id:'t_0115', date:'2026-06-15', type:'BUY', symbol:'PPL', broker:'AKD', shares:70, price:226.5, amount:15855.0, notes:'COAF55870 CV060068' },
  { id:'t_0116', date:'2026-06-15', type:'BUY', symbol:'TREET', broker:'AKD', shares:200, price:24.81, amount:4962.0, notes:'COAF55870 CV060068' },
  { id:'t_0117', date:'2026-06-16', type:'BUY', symbol:'MUGHAL', broker:'AKD', shares:120, price:87.16, amount:10459.2, notes:'COAF55870 CV060075' },
  { id:'t_akd_dep3', date:'2026-06-16', type:'DEPOSIT', broker:'AKD', amount:50000, notes:'COAF55870 RAAST RV457413' },
  { id:'t_akd_pael', date:'2026-06-17', type:'BUY', symbol:'PAEL', broker:'AKD', shares:100, price:43.76, amount:4376.0, notes:'COAF55870 CV060081' },
  { id:'t_akd_fee', date:'2026-06-17', type:'FEE', broker:'AKD', amount:300, notes:'COAF55870 UIN registration GV060017' },
  { id:'t_akd_pso', date:'2026-06-18', type:'BUY', symbol:'PSO', broker:'AKD', shares:50, price:367.8, amount:18390.0, notes:'COAF55870 CV060088' },
  { id:'t_akd_mlcf_s', date:'2026-06-18', type:'SELL', symbol:'MLCF', broker:'AKD', shares:100, price:98.3, amount:9830.0, notes:'COAF55870 CV060088' },
  { id:'t_akd_mlcf2', date:'2026-06-19', type:'BUY', symbol:'MLCF', broker:'AKD', shares:200, price:102.22, amount:20444.0, notes:'COAF55870 CV060095' },
  { id:'t_pasm_s', date:'2026-06-24', type:'SELL', symbol:'PASM', broker:'AKD', shares:USER_PASM_SHARES, price:PASM_AKD_SELL_PRICE, amount:Math.round(USER_PASM_SHARES * PASM_AKD_SELL_PRICE * 100) / 100, notes:'Your 1,555 sh @ 10.31 — broker sold 11,000 block CV060116' },
  { id:'t_0118', date:'2025-08-19', type:'CONTRIBUTION', symbol:'KMIF', broker:'Meezan', units:305.6335, nav:160.4115, amount:50000, notes:'PURCHASE' },
  { id:'t_0119', date:'2025-09-08', type:'CONTRIBUTION', symbol:'KMIF', broker:'Meezan', units:142.3251, nav:172.2364, amount:25000, notes:'PURCHASE' },
  { id:'t_0120', date:'2026-04-07', type:'CONTRIBUTION', symbol:'KMIF', broker:'Meezan', units:47.129, nav:166.4438, amount:8000, notes:'PURCHASE' },
  { id:'t_0121', date:'2026-04-21', type:'CONTRIBUTION', symbol:'KMIF', broker:'Meezan', units:803.4536, nav:186.2273, amount:150000, notes:'CONVERT IN from MIIF', internal:true },
  { id:'t_0122', date:'2026-04-28', type:'CONTRIBUTION', symbol:'KMIF', broker:'Meezan', units:192.3982, nav:181.4596, amount:35000, notes:'CONVERT IN from MIIF', internal:true },
  { id:'t_0123', date:'2026-05-22', type:'CONTRIBUTION', symbol:'KMIF', broker:'Meezan', units:43.417, nav:180.6742, amount:8000, notes:'PURCHASE' },
  { id:'t_0124', date:'2025-08-13', type:'CONTRIBUTION', symbol:'MDAAF-MDYP', broker:'Meezan', units:129.0669, nav:76.1654, amount:10000, notes:'PURCHASE' },
  { id:'t_0125', date:'2025-08-13', type:'CONTRIBUTION', symbol:'MAAF', broker:'Meezan', units:95.1548, nav:103.3099, amount:10000, notes:'PURCHASE' },
  { id:'t_0126', date:'2025-08-13', type:'CONTRIBUTION', symbol:'MBF', broker:'Meezan', units:971.766, nav:25.2901, amount:25000, notes:'PURCHASE' },
  { id:'t_0127', date:'2025-10-01', type:'CONTRIBUTION', symbol:'MBF', broker:'Meezan', units:884.6228, nav:27.7814, amount:25000, notes:'PURCHASE' },
  { id:'t_0128', date:'2026-04-21', type:'CONTRIBUTION', symbol:'MBF', broker:'Meezan', units:1548.3109, nav:27.7722, amount:43000, notes:'CONVERT IN from MIIF', internal:true },
  { id:'t_0129', date:'2025-08-13', type:'CONTRIBUTION', symbol:'MIF', broker:'Meezan', units:171.4841, nav:143.3139, amount:25000, notes:'PURCHASE' },
  { id:'t_0130', date:'2026-04-07', type:'CONTRIBUTION', symbol:'MIF', broker:'Meezan', units:80.3247, nav:146.8603, amount:12000, notes:'PURCHASE' },
  { id:'t_0131', date:'2026-04-21', type:'CONTRIBUTION', symbol:'MIF', broker:'Meezan', units:487.0737, nav:164.2462, amount:80000, notes:'CONVERT IN from MIIF', internal:true },
  { id:'t_0132', date:'2026-05-22', type:'CONTRIBUTION', symbol:'MIF', broker:'Meezan', units:74.0248, nav:159.3589, amount:12000, notes:'PURCHASE' },
  { id:'t_0133', date:'2025-08-13', type:'CONTRIBUTION', symbol:'MIIF-B', broker:'Meezan', units:283.3573, nav:52.3348, amount:15000, notes:'PURCHASE' },
  { id:'t_0134', date:'2025-09-08', type:'CONTRIBUTION', symbol:'MIIF-B', broker:'Meezan', units:469.4121, nav:52.6526, amount:25000, notes:'PURCHASE' },
  { id:'t_0135', date:'2026-02-26', type:'CONTRIBUTION', symbol:'MIIF-B', broker:'Meezan', units:6307.836, nav:54.8557, amount:350000, notes:'PURCHASE' },
  { id:'t_0136', date:'2026-04-07', type:'CONTRIBUTION', symbol:'MIIF-B', broker:'Meezan', units:125.1514, nav:55.2964, amount:7000, notes:'PURCHASE' },
  { id:'t_0137', date:'2026-04-21', type:'FUND_OUT', symbol:'MIIF-B', broker:'Meezan', units:2708.2045, nav:55.4851, amount:150000, notes:'CONVERT OUT to KMIF', internal:true },
  { id:'t_0138', date:'2026-04-21', type:'FUND_OUT', symbol:'MIIF-B', broker:'Meezan', units:1441.8285, nav:55.4851, amount:80000, notes:'CONVERT OUT to MIF', internal:true },
  { id:'t_0139', date:'2026-04-21', type:'FUND_OUT', symbol:'MIIF-B', broker:'Meezan', units:774.9828, nav:55.4851, amount:43000, notes:'CONVERT OUT to MBF', internal:true },
  { id:'t_0140', date:'2026-05-22', type:'CONTRIBUTION', symbol:'MIIF-B', broker:'Meezan', units:123.8523, nav:55.8764, amount:7000, notes:'PURCHASE' },
  { id:'t_0141', date:'2025-08-11', type:'CONTRIBUTION', symbol:'MIIF-MMKA', broker:'Meezan', units:377.9407, nav:52.3167, amount:20000, notes:'PURCHASE' },
  { id:'t_sal_1', date:'2026-01-01', type:'SALARY', amount:150000, notes:'Jan salary' },
  { id:'t_sal_2', date:'2026-02-01', type:'SALARY', amount:150000, notes:'Feb salary' },
  { id:'t_sal_3', date:'2026-03-01', type:'SALARY', amount:150000, notes:'Mar salary' },
  { id:'t_sal_4', date:'2026-04-01', type:'SALARY', amount:150000, notes:'Apr salary' },
  { id:'t_sal_5', date:'2026-05-01', type:'SALARY', amount:150000, notes:'May salary' },
  { id:'t_sal_6', date:'2026-06-01', type:'SALARY', amount:150000, notes:'Jun salary' },
  { id:'t_mbf_out', date:'2026-04-28', type:'FUND_OUT', symbol:'MBF', broker:'Meezan', units:1285.969, nav:27.3708, amount:35000, notes:'CONVERT OUT to MIIF-B', internal:true },
  { id:'t_meez_miif_roc', date:'2026-06-19', type:'CONTRIBUTION', symbol:'MIIF-B', broker:'Meezan', units:145.2234, nav:51.9335, amount:0, internal:true, notes:'REFUND OF CAPITAL (733102-1)' },
  { id:'t_meez_mmka_div', date:'2026-06-19', type:'CONTRIBUTION', symbol:'MIIF-MMKA', broker:'Meezan', units:21.6337, nav:51.7785, amount:0, internal:true, notes:'DIVIDEND REINVEST (733102-1)' },
  { id:'t_meez_mmka_roc', date:'2026-06-19', type:'CONTRIBUTION', symbol:'MIIF-MMKA', broker:'Meezan', units:3.9283, nav:51.9335, amount:0, internal:true, notes:'REFUND OF CAPITAL (733102-1)' },
  { id:'t_meez_kmif_roc', date:'2026-06-24', type:'CONTRIBUTION', symbol:'KMIF', broker:'Meezan', units:50.8887, nav:182.4219, amount:0, internal:true, notes:'REFUND OF CAPITAL (733102-1)' },
  { id:'t_meez_mbf_roc', date:'2026-06-24', type:'CONTRIBUTION', symbol:'MBF', broker:'Meezan', units:65.9366, nav:27.5584, amount:0, internal:true, notes:'REFUND OF CAPITAL (733102-1)' },
  { id:'t_meez_mif_roc', date:'2026-06-24', type:'CONTRIBUTION', symbol:'MIF', broker:'Meezan', units:3.4778, nav:168.6041, amount:0, internal:true, notes:'REFUND OF CAPITAL (733102-1)' },
  { id:'t_ttwo_1', date:'2026-06-24', type:'INTL_BUY', symbol:'TTWO', broker:'IBKR', shares:4.7, qty:4.7, priceUsd:235.68, costUsd:1110.45, currency:'USD', assetClass:'intl', notes:'IBKR · 4.7 @ $235.68 · fees $2.77 · total $1,110.45' },
  { id:'t_ttwo_2', date:'2026-06-24', type:'INTL_BUY', symbol:'TTWO', broker:'IBKR', shares:4.97, qty:4.97, priceUsd:252.5151, costUsd:1255, currency:'USD', assetClass:'intl', notes:'IBKR · 4.97 shares · total cost $1,255.00' },
  { id:'t_div_ppl', date:'2026-05-25', type:'DIVIDEND', symbol:'PPL', broker:'Rafi', amount:51, notes:'Cash dividend · Rafi' },
  { id:'t_div_ogdc', date:'2026-05-22', type:'DIVIDEND', symbol:'OGDC', broker:'Rafi', amount:372.75, notes:'Cash dividend · Rafi' },
  { id:'t_div_mebl', date:'2026-05-16', type:'DIVIDEND', symbol:'MEBL', broker:'Rafi', amount:382, notes:'Cash dividend · Rafi' },
  { id:'t_div_efert', date:'2026-05-13', type:'DIVIDEND', symbol:'EFERT', broker:'Rafi', amount:153, notes:'Cash dividend · Rafi' },
  { id:'t_div_unk', date:'2026-05-14', type:'DIVIDEND', symbol:'HUBC', broker:'Rafi', amount:255, notes:'Cash dividend — confirm symbol (you noted ₨255, symbol unclear)' },
  { id:'t_div_kmif', date:'2026-06-27', type:'DIVIDEND', symbol:'KMIF', broker:'Meezan', amount:2518.43, notes:'Cash dividend net (733102-1)' },
  { id:'t_div_mif', date:'2026-06-27', type:'DIVIDEND', symbol:'MIF', broker:'Meezan', amount:193.95, notes:'Cash dividend net (733102-1)' },
  { id:'t_div_mbf', date:'2026-06-27', type:'DIVIDEND', symbol:'MBF', broker:'Meezan', amount:242.69, notes:'Cash dividend net (733102-1)' },
  { id:'t_div_mdyp', date:'2026-06-27', type:'DIVIDEND', symbol:'MDAAF-MDYP', broker:'Meezan', amount:542.33, notes:'Cash dividend net (733102-1)' },
  // — Meezan AMC charges & taxes (733102-1 statement) —
  { id:'t_ch_kmif_tc1', date:'2025-08-19', type:'FEE', symbol:'KMIF', broker:'Meezan', amount:125, chargeType:'txn_cost', relatedId:'t_0118', notes:'Transaction cost' },
  { id:'t_ch_kmif_ld1', date:'2025-08-19', type:'FEE', symbol:'KMIF', broker:'Meezan', amount:737, chargeType:'load', relatedId:'t_0118', notes:'Sales load' },
  { id:'t_ch_kmif_tx1', date:'2025-08-19', type:'TAX', symbol:'KMIF', broker:'Meezan', amount:111, chargeType:'govt_tax', relatedId:'t_0118', notes:'Govt tax' },
  { id:'t_ch_kmif_tc2', date:'2025-09-08', type:'FEE', symbol:'KMIF', broker:'Meezan', amount:63, chargeType:'txn_cost', relatedId:'t_0119', notes:'Transaction cost' },
  { id:'t_ch_kmif_ld2', date:'2025-09-08', type:'FEE', symbol:'KMIF', broker:'Meezan', amount:369, chargeType:'load', relatedId:'t_0119', notes:'Sales load' },
  { id:'t_ch_kmif_tx2', date:'2025-09-08', type:'TAX', symbol:'KMIF', broker:'Meezan', amount:55, chargeType:'govt_tax', relatedId:'t_0119', notes:'Govt tax' },
  { id:'t_ch_kmif_tc3', date:'2026-04-07', type:'FEE', symbol:'KMIF', broker:'Meezan', amount:20, chargeType:'txn_cost', relatedId:'t_0120', notes:'Transaction cost' },
  { id:'t_ch_kmif_ld3', date:'2026-04-07', type:'FEE', symbol:'KMIF', broker:'Meezan', amount:118, chargeType:'load', relatedId:'t_0120', notes:'Sales load' },
  { id:'t_ch_kmif_tx3', date:'2026-04-07', type:'TAX', symbol:'KMIF', broker:'Meezan', amount:18, chargeType:'govt_tax', relatedId:'t_0120', notes:'Govt tax' },
  { id:'t_ch_kmif_tc4', date:'2026-04-21', type:'FEE', symbol:'KMIF', broker:'Meezan', amount:375, chargeType:'txn_cost', relatedId:'t_0121', notes:'Convert in cost', internal:true },
  { id:'t_ch_kmif_tc5', date:'2026-04-28', type:'FEE', symbol:'KMIF', broker:'Meezan', amount:88, chargeType:'txn_cost', relatedId:'t_0122', notes:'Convert in cost', internal:true },
  { id:'t_ch_kmif_tc6', date:'2026-05-22', type:'FEE', symbol:'KMIF', broker:'Meezan', amount:20, chargeType:'txn_cost', relatedId:'t_0123', notes:'Transaction cost' },
  { id:'t_ch_kmif_ld4', date:'2026-05-22', type:'FEE', symbol:'KMIF', broker:'Meezan', amount:118, chargeType:'load', relatedId:'t_0123', notes:'Sales load' },
  { id:'t_ch_kmif_tx4', date:'2026-05-22', type:'TAX', symbol:'KMIF', broker:'Meezan', amount:18, chargeType:'govt_tax', relatedId:'t_0123', notes:'Govt tax' },
  { id:'t_ch_kmif_dtx', date:'2026-06-24', type:'TAX', symbol:'KMIF', broker:'Meezan', amount:453, chargeType:'div_tax', relatedId:'t_div_kmif', notes:'Dividend withholding' },
  { id:'t_ch_mdyp_ld1', date:'2025-08-13', type:'FEE', symbol:'MDAAF-MDYP', broker:'Meezan', amount:147, chargeType:'load', relatedId:'t_0124', notes:'Sales load' },
  { id:'t_ch_mdyp_tx1', date:'2025-08-13', type:'TAX', symbol:'MDAAF-MDYP', broker:'Meezan', amount:22, chargeType:'govt_tax', relatedId:'t_0124', notes:'Govt tax' },
  { id:'t_ch_mdyp_dtx', date:'2026-06-24', type:'TAX', symbol:'MDAAF-MDYP', broker:'Meezan', amount:103, chargeType:'div_tax', relatedId:'t_div_mdyp', notes:'Dividend withholding' },
  { id:'t_ch_maaf_ld1', date:'2025-08-13', type:'FEE', symbol:'MAAF', broker:'Meezan', amount:147, chargeType:'load', relatedId:'t_0125', notes:'Sales load' },
  { id:'t_ch_maaf_tx1', date:'2025-08-13', type:'TAX', symbol:'MAAF', broker:'Meezan', amount:22, chargeType:'govt_tax', relatedId:'t_0125', notes:'Govt tax' },
  { id:'t_ch_mbf_ld1', date:'2025-08-13', type:'FEE', symbol:'MBF', broker:'Meezan', amount:369, chargeType:'load', relatedId:'t_0126', notes:'Sales load' },
  { id:'t_ch_mbf_tx1', date:'2025-08-13', type:'TAX', symbol:'MBF', broker:'Meezan', amount:55, chargeType:'govt_tax', relatedId:'t_0126', notes:'Govt tax' },
  { id:'t_ch_mbf_ld2', date:'2025-10-01', type:'FEE', symbol:'MBF', broker:'Meezan', amount:369, chargeType:'load', relatedId:'t_0127', notes:'Sales load' },
  { id:'t_ch_mbf_tx2', date:'2025-10-01', type:'TAX', symbol:'MBF', broker:'Meezan', amount:55, chargeType:'govt_tax', relatedId:'t_0127', notes:'Govt tax' },
  { id:'t_ch_mbf_cgt', date:'2026-04-28', type:'TAX', symbol:'MBF', broker:'Meezan', amount:198, chargeType:'cgt', relatedId:'t_mbf_out', notes:'CGT on convert out', internal:true },
  { id:'t_ch_mbf_dtx', date:'2026-06-24', type:'TAX', symbol:'MBF', broker:'Meezan', amount:66, chargeType:'div_tax', relatedId:'t_div_mbf', notes:'Dividend withholding' },
  { id:'t_ch_mif_ld1', date:'2025-08-13', type:'FEE', symbol:'MIF', broker:'Meezan', amount:369, chargeType:'load', relatedId:'t_0129', notes:'Sales load' },
  { id:'t_ch_mif_tx1', date:'2025-08-13', type:'TAX', symbol:'MIF', broker:'Meezan', amount:55, chargeType:'govt_tax', relatedId:'t_0129', notes:'Govt tax' },
  { id:'t_ch_mif_ld2', date:'2026-04-07', type:'FEE', symbol:'MIF', broker:'Meezan', amount:177, chargeType:'load', relatedId:'t_0130', notes:'Sales load' },
  { id:'t_ch_mif_tx2', date:'2026-04-07', type:'TAX', symbol:'MIF', broker:'Meezan', amount:27, chargeType:'govt_tax', relatedId:'t_0130', notes:'Govt tax' },
  { id:'t_ch_mif_ld3', date:'2026-05-22', type:'FEE', symbol:'MIF', broker:'Meezan', amount:177, chargeType:'load', relatedId:'t_0132', notes:'Sales load' },
  { id:'t_ch_mif_tx3', date:'2026-05-22', type:'TAX', symbol:'MIF', broker:'Meezan', amount:27, chargeType:'govt_tax', relatedId:'t_0132', notes:'Govt tax' },
  { id:'t_ch_mif_dtx', date:'2026-06-24', type:'TAX', symbol:'MIF', broker:'Meezan', amount:35, chargeType:'div_tax', relatedId:'t_div_mif', notes:'Dividend withholding' },
  { id:'t_ch_miif_ld1', date:'2025-08-13', type:'FEE', symbol:'MIIF-B', broker:'Meezan', amount:148, chargeType:'load', relatedId:'t_0133', notes:'Sales load' },
  { id:'t_ch_miif_tx1', date:'2025-08-13', type:'TAX', symbol:'MIIF-B', broker:'Meezan', amount:22, chargeType:'govt_tax', relatedId:'t_0133', notes:'Govt tax' },
  { id:'t_ch_miif_ld2', date:'2025-09-08', type:'FEE', symbol:'MIIF-B', broker:'Meezan', amount:247, chargeType:'load', relatedId:'t_0134', notes:'Sales load' },
  { id:'t_ch_miif_tx2', date:'2025-09-08', type:'TAX', symbol:'MIIF-B', broker:'Meezan', amount:37, chargeType:'govt_tax', relatedId:'t_0134', notes:'Govt tax' },
  { id:'t_ch_miif_ld3', date:'2026-02-26', type:'FEE', symbol:'MIIF-B', broker:'Meezan', amount:3460, chargeType:'load', relatedId:'t_0135', notes:'Sales load' },
  { id:'t_ch_miif_tx3', date:'2026-02-26', type:'TAX', symbol:'MIIF-B', broker:'Meezan', amount:519, chargeType:'govt_tax', relatedId:'t_0135', notes:'Govt tax' },
  { id:'t_ch_miif_ld4', date:'2026-04-07', type:'FEE', symbol:'MIIF-B', broker:'Meezan', amount:69, chargeType:'load', relatedId:'t_0136', notes:'Sales load' },
  { id:'t_ch_miif_tx4', date:'2026-04-07', type:'TAX', symbol:'MIIF-B', broker:'Meezan', amount:10, chargeType:'govt_tax', relatedId:'t_0136', notes:'Govt tax' },
  { id:'t_ch_miif_cgt', date:'2026-04-21', type:'TAX', symbol:'MIIF-B', broker:'Meezan', amount:265, chargeType:'cgt', relatedId:'t_0137', notes:'CGT on convert out', internal:true },
  { id:'t_ch_miif_ld5', date:'2026-05-22', type:'FEE', symbol:'MIIF-B', broker:'Meezan', amount:69, chargeType:'load', relatedId:'t_0140', notes:'Sales load' },
  { id:'t_ch_miif_tx5', date:'2026-05-22', type:'TAX', symbol:'MIIF-B', broker:'Meezan', amount:10, chargeType:'govt_tax', relatedId:'t_0140', notes:'Govt tax' },
  { id:'t_ch_miif_dtx', date:'2026-06-19', type:'TAX', symbol:'MIIF-B', broker:'Meezan', amount:797, chargeType:'div_tax', notes:'Dividend withholding (gross div on statement)' },
  { id:'t_ch_mmka_ld1', date:'2025-08-11', type:'FEE', symbol:'MIIF-MMKA', broker:'Meezan', amount:198, chargeType:'load', relatedId:'t_0141', notes:'Sales load' },
  { id:'t_ch_mmka_tx1', date:'2025-08-11', type:'TAX', symbol:'MIIF-MMKA', broker:'Meezan', amount:30, chargeType:'govt_tax', relatedId:'t_0141', notes:'Govt tax' },
  { id:'t_ch_mmka_dtx', date:'2026-06-19', type:'TAX', symbol:'MIIF-MMKA', broker:'Meezan', amount:373, chargeType:'div_tax', relatedId:'t_meez_mmka_div', notes:'Dividend reinvest withholding', internal:true },
  { id:'t_ch_mmka_rtx', date:'2026-06-19', type:'TAX', symbol:'MIIF-MMKA', broker:'Meezan', amount:203, chargeType:'roc_tax', relatedId:'t_meez_mmka_roc', notes:'ROC withholding', internal:true },
];

window.PORTFOLIO_SEED_VERSION = PORTFOLIO_SEED_VERSION;
window.SEED_DATA_VERSION = SEED_DATA_VERSION;
window.RAFI_BROKER_CASH_PKR = RAFI_BROKER_CASH_PKR;
window.USER_BROKER_CASH_PKR = USER_BROKER_CASH_PKR;
window.AKD_LEDGER_CASH_PKR = AKD_LEDGER_CASH_PKR;
window.USER_AKD_CASH_PKR = USER_AKD_CASH_PKR;
window.FRIEND_CUSTODIAL_CASH_PKR = FRIEND_CUSTODIAL_CASH_PKR;
window.PASM_AKD_SELL_PRICE = PASM_AKD_SELL_PRICE;
window.FRIEND_PASM_SHARES = FRIEND_PASM_SHARES;
window.USER_PASM_SHARES = USER_PASM_SHARES;
window.RAFI_STOCKS = RAFI_STOCKS;
window.AKD_STOCKS = AKD_STOCKS;
window.MEEZAN_FUNDS = MEEZAN_FUNDS;
window.MEEZAN_PORTFOLIO_VALUE_PKR = MEEZAN_PORTFOLIO_VALUE_PKR;
window.MEEZAN_TOTAL_PURCHASES_PKR = MEEZAN_TOTAL_PURCHASES_PKR;
window.RAFI_TOTAL_INVESTED_PKR = RAFI_TOTAL_INVESTED_PKR;
window.AKD_TOTAL_INVESTED_PKR = AKD_TOTAL_INVESTED_PKR;
window.TTWO_TOTAL_INVESTED_USD = TTWO_TOTAL_INVESTED_USD;
window.ADVISOR_RATINGS = ADVISOR_RATINGS;
window.SIP_PLAN = SIP_PLAN;
window.WATCHLIST = WATCHLIST;
window.INITIAL_TRANSACTIONS = INITIAL_TRANSACTIONS;
window.FALLBACK_PRICES = FALLBACK_PRICES;
window.FALLBACK_PRICES_UPDATED = FALLBACK_PRICES_UPDATED;

;/* === js/data/config.js === */
'use strict';
/** Bump app + sw + cache together (also sync VERSION.json). */
window.LEDGERCAP_VERSION = {
  app: '3.58.11',
  sw: 35811,
  cache: 'ledgercap-v35811',
};

/** LedgerCap runtime config — Cloudflare Worker proxy for live PSX/Yahoo quotes (default Capricorn Worker pre-filled). Portfolio stays on-device. */
window.LEDGERCAP_CONFIG = {
  /** Primary LedgerCap worker (preferred) */
  psxProxyUrl: 'https://ledgercap-psx-proxy.shamikhahmed.workers.dev',
  /** Legacy worker hostname — kept as silent fallback until all users migrate */
  legacyPsxProxyUrl: 'https://stunds-psx-proxy.shamikhahmed.workers.dev',
  /** Worker KV market snapshot (v3.55+) */
  snapshotEnabled: true,
};

/** Normalize saved proxy URLs and prefer the LedgerCap worker hostname. */
function resolvePsxProxyUrl(url) {
  const primary = window.LEDGERCAP_CONFIG?.psxProxyUrl || '';
  const legacy = window.LEDGERCAP_CONFIG?.legacyPsxProxyUrl || '';
  let raw = (url || primary || legacy).trim();
  if (/stunds-psx-proxy/i.test(raw)) {
    raw = primary || raw.replace(/stunds-psx-proxy/gi, 'ledgercap-psx-proxy');
  }
  return raw.replace(/\/$/, '');
}

/** Proxy bases to try in order (primary, then legacy). */
function psxProxyBases() {
  const bases = [
    window.LEDGERCAP_CONFIG?.psxProxyUrl,
    window.LEDGERCAP_CONFIG?.legacyPsxProxyUrl,
  ].filter(Boolean).map(u => resolvePsxProxyUrl(u));
  return [...new Set(bases)];
}

window.LedgerCapConfig = { resolvePsxProxyUrl, psxProxyBases };

/**
 * Escape a string for safe interpolation into innerHTML.
 * Use on every API-derived or user-imported string (news titles,
 * announcement text, CSV symbols/brokers, AI summaries).
 */
window.esc = function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/** Allow only http(s) URLs for interpolated hrefs; everything else → '#'. */
window.escUrl = function escUrl(u) {
  const s = String(u ?? '').trim();
  return /^https?:\/\//i.test(s) ? window.esc(s) : '#';
};

;/* === js/data/i18n-locales.js === */
'use strict';
/** LedgerCap v4 — English, Urdu (Nastaliq), Roman Urdu */
window.I18N_LOCALES = {
  en: {
    appName: 'LedgerCap',
    tagline: 'Pakistan\'s complete PSX wealth tracker',
    liveMarket: 'Live market',
    refresh: 'Refresh',
    loading: 'Loading…',
    open: 'Open →',
    addHoldings: 'Add holdings',
    loadDemo: 'Load demo portfolio',
    nav: { hub: 'Home', watch: 'Watchlist', funds: 'Funds', pnl: 'Portfolio', market: 'Market', portfolio: 'Portfolio', analyze: 'Research', more: 'More' },
    theme: { dark: 'Dark', light: 'Light', toggle: 'Toggle theme' },
    lang: { en: 'English', ur: 'اردو', roman: 'Roman Urdu', label: 'Language' },
    install: { title: 'Install LedgerCap', body: 'Safari → Share → Add to Home Screen', browser: 'Works in browser & as app' },
    hub: {
      hero: 'Pakistan\'s most complete tracker for stocks & mutual funds',
      sub: 'KSE-100 live · portfolio P&L · Meezan funds · dividends · screener — one stop for every Pakistani investor.',
      toolsTitle: 'Platform',
      toolsSub: '19 tools · one ledger',
    },
    tools: {
      stockWatch: { t: 'Stock Watch', d: 'KSE-100 · sector grouped · live prices' },
      fundNavs: { t: 'Fund NAVs', d: 'Meezan & AMC funds · returns' },
      lossTrack: { t: 'Loss Tracking', d: 'P&L per position in PKR' },
      technical: { t: 'Technical Analysis', d: 'DMA · RSI · smart rating' },
      dividends: { t: 'Dividends', d: 'Calendar · yield · forecast' },
      screener: { t: 'Stock Screener', d: 'Value · growth · Shariah filters' },
      signals: { t: 'Market Strategy', d: 'Daily pulse · buy/hold/sell' },
      watchlist: { t: 'Watchlist', d: 'Track before you buy' },
      transactions: { t: 'Transactions', d: 'Buy · sell · dividend log' },
      global: { t: 'Global markets', d: 'US stocks · crypto · USD/PKR' },
      commodities: { t: 'Commodities', d: 'Gold · silver · oil · PKR/gram' },
      announcements: { t: 'Announcements', d: 'Dividends · bonus · portfolio news' },
      zakat: { t: 'Zakat', d: 'Nisab · 2.5% estimate' },
      import: { t: 'Import CSV', d: 'IBKR · Binance · broker logs' },
      globalMarkets: { t: 'Global markets', d: 'US equities · crypto · FX' },
      zakatTool: { t: 'Zakat calculator', d: 'Nisab · debts · gold' },
      pilotTools: { t: 'Tax & Rebalance', d: 'CGT · rebalance · IPO · calculators' },
      paperTrade: { t: 'Paper trade', d: 'Simulated PSX ledger' },
      riskAudit: { t: 'Risk audit', d: 'Concentration · CGT · drift' },
      insightsTool: { t: 'Insights', d: 'Score · benchmark · history' },
      comparison: { t: 'Compare', d: 'Side by side' },
      performance: { t: 'Performance', d: 'P&L · daily · forecast' },
      journal: { t: 'Journal', d: 'Investment thesis' },
      calendar: { t: 'Wealth calendar', d: 'Dividends · IPO · corporate' },
      settingsTool: { t: 'Settings', d: 'Theme · language · data · PIN' },
    },
    market: {
      title: 'Stock Watch',
      sub: 'PSX listed · grouped by sector',
      symbol: 'Symbol', last: 'Last', chg: 'Chg%', volume: 'Vol',
      advancing: 'Advancing', declining: 'Declining', unchanged: 'Unchanged',
      shariah: 'Shariah', conventional: 'Conventional',
    },
    portfolio: {
      title: 'Portfolio',
      sub: 'Your P&L · holdings · allocation',
      value: 'Portfolio value', today: 'Today', allTime: 'All time',
      invested: 'Invested', gainLoss: 'Gain / loss', yield: 'Annual yield',
      bucketsTitle: 'Portfolios', bucketsSub: 'PSX · Funds · US · custom',
      addBucket: 'Add portfolio',
      investedFootnote: 'Invested = cost basis (not gross deposits). Meezan internal converts differ from AMC purchases.',
    },
    analyze: {
      title: 'Analyze',
      sub: 'Research · screener · plain-English verdict',
      plainEnglish: 'Plain-English verdict',
      fundamentals: 'Fundamentals', valuation: 'Valuation', risk: 'Risk',
      shariahCompliant: 'Shariah compliant', notShariah: 'Not Shariah',
    },
    screener: {
      title: 'Stock Screener',
      sub: 'Filter PSX by yield, P/E, growth, Shariah',
      all: 'All', islamic: 'Islamic', highDiv: 'High dividend', value: 'Value',
    },
    more: {
      title: 'More',
      sub: 'Settings · tools · data',
    },
  },
  ur: {
    appName: 'لیجرکیپ',
    tagline: 'پاکستان کا مکمل PSX دولت ٹریکر',
    liveMarket: 'لائیو مارکیٹ',
    refresh: 'تازہ کریں',
    loading: 'لوڈ ہو رہا ہے…',
    open: 'کھولیں ←',
    addHoldings: 'ہولڈنگز شامل کریں',
    loadDemo: 'ڈیمو پورٹ فولیو',
    nav: { hub: 'ہوم', watch: 'واچ لسٹ', funds: 'فنڈز', pnl: 'پورٹ فولیو', market: 'مارکیٹ', portfolio: 'پورٹ فولیو', analyze: 'ریسرچ', more: 'مزید' },
    theme: { dark: 'ڈارک', light: 'لائٹ', toggle: 'تھیم بدلیں' },
    lang: { en: 'English', ur: 'اردو', roman: 'رومن اردو', label: 'زبان' },
    install: { title: 'لیجرکیپ انسٹال کریں', body: 'Safari → Share → Add to Home Screen', browser: 'براؤزر اور ایپ دونوں میں' },
    hub: {
      hero: 'پاکستان کا مکمل اسٹاک اور میوچل فنڈ ٹریکر',
      sub: 'KSE-100 لائیو · پورٹ فولیو P&L · میزان فنڈز · ڈیویڈنڈ · اسکرینر — سب ایک جگہ۔',
      toolsTitle: 'پلیٹ فارم',
      toolsSub: '19 ٹولز · ایک کھاتہ',
    },
    tools: {
      stockWatch: { t: 'اسٹاک واچ', d: 'KSE-100 · سیکٹر · لائیو قیمتیں' },
      fundNavs: { t: 'فنڈ NAV', d: 'میزان اور AMC · منافع' },
      lossTrack: { t: 'نقصان ٹریکنگ', d: 'ہر پوزیشن کا P&L' },
      technical: { t: 'تکنیکی تجزیہ', d: 'DMA · RSI · ریٹنگ' },
      dividends: { t: 'ڈیویڈنڈز', d: 'کیلنڈر · yield · پیش گوئی' },
      screener: { t: 'اسٹاک اسکرینر', d: 'ویلیو · گروتھ · شرعی فلٹر' },
      signals: { t: 'مارکیٹ حکمتِ عملی', d: 'روزانہ جائزہ · خرید/رکھیں/بیچیں' },
      watchlist: { t: 'واچ لسٹ', d: 'خریدنے سے پہلے نظر رکھیں' },
      transactions: { t: 'لین دین', d: 'خرید · فروخت · ڈیویڈنڈ لاگ' },
      global: { t: 'عالمی مارکیٹس', d: 'امریکی اسٹاکس · کرپٹو · USD/PKR' },
      commodities: { t: 'اجناس', d: 'سونا · چاندی · تیل' },
      announcements: { t: 'اعلانات', d: 'کارپوریٹ · خبریں' },
      zakat: { t: 'زکوٰۃ', d: 'نصاب · 2.5% تخمینہ' },
      import: { t: 'CSV امپورٹ', d: 'IBKR · Binance · بروکر لاگز' },
      globalMarkets: { t: 'عالمی مارکیٹس', d: 'امریکی حصص · کرپٹو · FX' },
      zakatTool: { t: 'زکوٰۃ کیلکولیٹر', d: 'نصاب · قرض · سونا' },
      pilotTools: { t: 'ٹیکس اور توازن', d: 'CGT · ری بیلنس · IPO · کیلکولیٹر' },
      paperTrade: { t: 'پیپر ٹریڈ', d: 'فرضی PSX لیجر' },
      riskAudit: { t: 'رسک آڈٹ', d: 'ارتکاز · CGT · جھکاؤ' },
      insightsTool: { t: 'بصیرت', d: 'اسکور · بینچ مارک · تاریخ' },
      comparison: { t: 'موازنہ', d: 'ساتھ ساتھ' },
      performance: { t: 'کارکردگی', d: 'P&L · روزانہ · پیشن گوئی' },
      journal: { t: 'جرنل', d: 'سرمایہ کاری تھیسس' },
      calendar: { t: 'ویلتھ کیلنڈر', d: 'ڈیویڈنڈ · IPO · کارپوریٹ' },
      settingsTool: { t: 'سیٹنگز', d: 'تھیم · زبان · ڈیٹا · PIN' },
    },
    market: {
      title: 'اسٹاک واچ',
      sub: 'PSX لسٹڈ · سیکٹر کے لحاظ سے',
      symbol: 'سمبل', last: 'آخری', chg: 'تبدیلی%', volume: 'حجم',
      advancing: 'بڑھ رہے', declining: 'گر رہے', unchanged: 'بغیر تبدیلی',
      shariah: 'شرعی', conventional: 'روایتی',
    },
    portfolio: {
      title: 'پورٹ فولیو',
      sub: 'آپ کا P&L · ہولڈنگز',
      value: 'پورٹ فولیو ویلیو', today: 'آج', allTime: 'کل',
      invested: 'سرمایہ کاری', gainLoss: 'منافع / نقصان', yield: 'سالانہ yield',
      bucketsTitle: 'پورٹ فولیوز', bucketsSub: 'PSX · فنڈز · US',
      addBucket: 'پورٹ فولیو شامل کریں',
      investedFootnote: 'سرمایہ کاری = cost basis (مجموعی ڈپازٹس سے مختلف ہو سکتی ہے)',
    },
    analyze: {
      title: 'تجزیہ',
      sub: 'ریسرچ · اسکرینر · آسان زبان',
      plainEnglish: 'آسان زبان میں فیصلہ',
      fundamentals: 'بنیادی', valuation: 'قیمت', risk: 'خطرہ',
      shariahCompliant: 'شرعی مطابقت', notShariah: 'غیر شرعی',
    },
    screener: {
      title: 'اسٹاک اسکرینر',
      sub: 'yield · P/E · گروتھ · شرعی',
      all: 'سب', islamic: 'اسلامی', highDiv: 'زیادہ ڈیویڈنڈ', value: 'ویلیو',
    },
    more: { title: 'مزید', sub: 'سیٹنگز · ٹولز · ڈیٹا' },
  },
  roman: {
    appName: 'LedgerCap',
    tagline: 'Pakistan ka mukammal PSX wealth tracker',
    liveMarket: 'Live market',
    refresh: 'Refresh karein',
    loading: 'Load ho raha hai…',
    open: 'Kholen →',
    addHoldings: 'Holdings shamil karein',
    loadDemo: 'Demo portfolio load karein',
    nav: { hub: 'Home', watch: 'Watchlist', funds: 'Funds', pnl: 'Portfolio', market: 'Market', portfolio: 'Portfolio', analyze: 'Research', more: 'Mazeed' },
    theme: { dark: 'Dark', light: 'Light', toggle: ' Theme badlein' },
    lang: { en: 'English', ur: 'اردو', roman: 'Roman Urdu', label: 'Zuban' },
    install: { title: 'LedgerCap install karein', body: 'Safari → Share → Add to Home Screen', browser: 'Browser aur app dono mein' },
    hub: {
      hero: 'Pakistan ka mukammal stock aur mutual fund tracker',
      sub: 'KSE-100 live · portfolio P&L · Meezan funds · dividends · screener — sab ek jagah.',
      toolsTitle: 'Platform',
      toolsSub: '19 tools · ek ledger',
    },
    tools: {
      stockWatch: { t: 'Stock Watch', d: 'KSE-100 · sector · live prices' },
      fundNavs: { t: 'Fund NAVs', d: 'Meezan aur AMC · returns' },
      lossTrack: { t: 'Loss Tracking', d: 'Har position ka P&L PKR mein' },
      technical: { t: 'Technical Analysis', d: 'DMA · RSI · smart rating' },
      dividends: { t: 'Dividends', d: 'Calendar · yield · forecast' },
      screener: { t: 'Stock Screener', d: 'Value · growth · Shariah filters' },
      signals: { t: 'Market Strategy', d: 'Rozana pulse · buy/hold/sell' },
      watchlist: { t: 'Watchlist', d: 'Kharidne se pehle track karein' },
      transactions: { t: 'Transactions', d: 'Buy · sell · dividend log' },
      pilotTools: { t: 'Tax & Rebalance', d: 'CGT · rebalance · IPO · calculators' },
      paperTrade: { t: 'Paper trade', d: 'Simulated PSX ledger' },
      riskAudit: { t: 'Risk audit', d: 'Concentration · CGT · drift' },
      insightsTool: { t: 'Insights', d: 'Score · benchmark · history' },
      comparison: { t: 'Compare', d: 'Side by side' },
      performance: { t: 'Performance', d: 'P&L · daily · forecast' },
      journal: { t: 'Journal', d: 'Investment thesis' },
      global: { t: 'Global markets', d: 'US stocks · crypto · USD/PKR' },
      commodities: { t: 'Commodities', d: 'Gold · silver · oil · PKR/gram' },
      announcements: { t: 'Announcements', d: 'Dividends · bonus · portfolio news' },
      zakat: { t: 'Zakat', d: 'Nisab · 2.5% estimate' },
      import: { t: 'Import CSV', d: 'IBKR · Binance · broker logs' },
      globalMarkets: { t: 'Global markets', d: 'US equities · crypto · FX' },
      zakatTool: { t: 'Zakat calculator', d: 'Nisab · qarz · sona' },
      calendar: { t: 'Wealth calendar', d: 'Dividends · IPO · corporate' },
      settingsTool: { t: 'Settings', d: 'Theme · zuban · data · PIN' },
    },
    market: {
      title: 'Stock Watch',
      sub: 'PSX listed · sector ke hisaab se',
      symbol: 'Symbol', last: 'Aakhri', chg: 'Tabdeeli%', volume: 'Volume',
      advancing: 'Barh rahe', declining: 'Gir rahe', unchanged: 'Be-tabeeli',
      shariah: 'Shariah', conventional: 'Conventional',
    },
    portfolio: {
      title: 'Portfolio',
      sub: 'Aap ka P&L · holdings',
      value: 'Portfolio value', today: 'Aaj', allTime: 'Kul',
      invested: 'Invested', gainLoss: 'Faida / nuqsan', yield: 'Salana yield',
      bucketsTitle: 'Portfolios', bucketsSub: 'PSX · Funds · US · custom',
      addBucket: 'Portfolio jodein',
      investedFootnote: 'Invested = cost basis (gross deposits se mukhtalif ho sakta hai)',
    },
    analyze: {
      title: 'Tajzia',
      sub: 'Research · screener · seedhi zubaan',
      plainEnglish: 'Seedhi zubaan mein verdict',
      fundamentals: 'Bunyadi', valuation: 'Qeemat', risk: 'Khatra',
      shariahCompliant: 'Shariah compliant', notShariah: 'Shariah nahi',
    },
    screener: {
      title: 'Stock Screener',
      sub: 'Yield · P/E · growth · Shariah filter',
      all: 'Sab', islamic: 'Islamic', highDiv: 'Zaida dividend', value: 'Value',
    },
    more: { title: 'Mazeed', sub: 'Settings · tools · data' },
  },
};

;/* === js/core/i18n.js === */
'use strict';
const I18n = (() => {
  const STORAGE_KEY = 'ledgercap_lang';
  let _lang = 'en';

  function _pack() {
    return (window.I18N_LOCALES || {})[_lang] || window.I18N_LOCALES.en;
  }

  function getLang() { return _lang; }

  function setLang(code) {
    if (!window.I18N_LOCALES[code]) code = 'en';
    _lang = code;
    localStorage.setItem(STORAGE_KEY, code);
    document.documentElement.lang = code === 'ur' ? 'ur' : 'en';
    document.documentElement.dir = code === 'ur' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lc-rtl', code === 'ur');
    document.body.classList.toggle('psx-rtl', code === 'ur');
    if (typeof State !== 'undefined') {
      State.update(s => { s.settings = s.settings || {}; s.settings.language = code; });
    }
    _refreshChrome();
    if (typeof Navigation !== 'undefined') Navigation.init();
    if (typeof Navigation !== 'undefined') Navigation.go(Navigation.current(), true);
  }

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY)
      || (typeof State !== 'undefined' && State.get('settings')?.language)
      || 'en';
    _lang = window.I18N_LOCALES[saved] ? saved : 'en';
    document.documentElement.lang = _lang === 'ur' ? 'ur' : 'en';
    document.documentElement.dir = _lang === 'ur' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lc-rtl', _lang === 'ur');
    document.body.classList.toggle('psx-rtl', _lang === 'ur');
  }

  function t(key) {
    const parts = key.split('.');
    let o = _pack();
    for (const p of parts) {
      o = o?.[p];
      if (o == null) break;
    }
    if (typeof o === 'string') return o;
    const en = window.I18N_LOCALES.en;
    let fallback = en;
    for (const p of parts) {
      fallback = fallback?.[p];
      if (fallback == null) break;
    }
    return typeof fallback === 'string' ? fallback : key;
  }

  function langSwitcher(id) {
    const langs = [
      { code: 'en', label: t('lang.en') },
      { code: 'ur', label: t('lang.ur') },
      { code: 'roman', label: t('lang.roman') },
    ];
    return `<div class="lc-lang-switch" id="${id || 'lc-lang-switch'}" role="group" aria-label="${t('lang.label')}">
      ${langs.map(l => `<button type="button" class="lc-lang-btn${_lang === l.code ? ' on' : ''}" data-lang="${l.code}">${l.label}</button>`).join('')}
    </div>`;
  }

  function bindLangSwitch(root) {
    (root || document).querySelectorAll('[data-lang]').forEach(btn => {
      btn.onclick = () => setLang(btn.dataset.lang);
    });
  }

  function _refreshChrome() {
    const title = document.getElementById('app-title');
    if (title) title.textContent = t('appName');
    const splashTitle = document.querySelector('.psx-splash-title, .lc-bahi-title');
    if (splashTitle) splashTitle.textContent = t('appName');
    const splashSub = document.querySelector('.psx-splash-sub, .lc-bahi-tagline');
    if (splashSub) {
      const urdu = splashSub.querySelector('.lc-bahi-urdu');
      if (urdu && getLang() === 'ur') {
        splashSub.innerHTML = `<span class="lc-bahi-urdu" lang="ur">${window.esc(t('tagline'))}</span>`;
      } else if (urdu) {
        splashSub.innerHTML = `<span class="lc-bahi-urdu" lang="ur">بھی کھاتا</span> · Pakistan`;
      } else {
        splashSub.textContent = t('tagline');
      }
    }
    const langHost = document.getElementById('lc-header-lang');
    if (langHost) {
      langHost.innerHTML = langSwitcher('lc-header-lang-inner');
      bindLangSwitch(langHost);
    }
  }

  return { init, t, setLang, getLang, langSwitcher, bindLangSwitch };
})();
window.I18n = I18n;
window.t = (k) => I18n.t(k);

;/* === js/engines/ledger.js === */
'use strict';
const Ledger = (() => {

  const CDC_BROKER = 'CDC';

  function _holdingKey(symbol, broker) {
    return symbol + '_' + (broker || CDC_BROKER);
  }

  function _globalKey(symbol, assetClass, broker) {
    return `${assetClass || 'intl'}_${symbol}_${broker || 'Global'}`;
  }

  function _applyStockAdjusts(holdings, transactions) {
    const latest = {};
    _sortTxs(transactions)
      .filter(t => t.type === 'POSITION_ADJUST' && (t.holdingKind === 'stock' || !t.holdingKind) && t.symbol)
      .forEach(t => { latest[_holdingKey(t.symbol, t.broker)] = t; });
    Object.values(latest).forEach(t => {
      if (t.targetQuantity == null || !(t.targetQuantity >= 0)) return;
      const key = _holdingKey(t.symbol, t.broker);
      const avg = t.targetAvgCost != null ? t.targetAvgCost : (holdings[key]?.shares > 0 ? holdings[key].totalCost / holdings[key].shares : 0);
      if (t.targetQuantity <= 0) { delete holdings[key]; return; }
      holdings[key] = {
        symbol: t.symbol,
        broker: t.broker || CDC_BROKER,
        shares: t.targetQuantity,
        totalCost: t.targetQuantity * avg,
      };
    });
  }

  function _applyFundAdjusts(funds, transactions) {
    const latest = {};
    _sortTxs(transactions)
      .filter(t => t.type === 'POSITION_ADJUST' && t.holdingKind === 'fund' && t.symbol)
      .forEach(t => { latest[t.symbol] = t; });
    Object.values(latest).forEach(t => {
      if (t.targetQuantity == null || !(t.targetQuantity >= 0)) return;
      const avg = t.targetAvgCost != null ? t.targetAvgCost : (funds[t.symbol]?.units > 0 ? funds[t.symbol].totalInvested / funds[t.symbol].units : 0);
      if (t.targetQuantity <= 0) { delete funds[t.symbol]; return; }
      funds[t.symbol] = {
        symbol: t.symbol,
        broker: t.broker || 'Meezan',
        units: t.targetQuantity,
        totalInvested: t.targetQuantity * avg,
      };
    });
  }

  function _applyGlobalAdjusts(map, transactions) {
    const latest = {};
    _sortTxs(transactions)
      .filter(t => t.type === 'POSITION_ADJUST' && (t.holdingKind === 'intl' || t.holdingKind === 'crypto') && t.symbol)
      .forEach(t => {
        const ac = t.holdingKind || t.assetClass || 'intl';
        latest[_globalKey(t.symbol, ac, t.broker)] = t;
      });
    Object.values(latest).forEach(t => {
      if (t.targetQuantity == null || !(t.targetQuantity >= 0)) return;
      const ac = t.holdingKind || t.assetClass || 'intl';
      const key = _globalKey(t.symbol, ac, t.broker);
      const avgUsd = t.targetAvgCostUsd != null ? t.targetAvgCostUsd : (map[key]?.qty > 0 ? map[key].totalCostUsd / map[key].qty : 0);
      if (t.targetQuantity <= 0) { delete map[key]; return; }
      map[key] = {
        symbol: t.symbol,
        broker: t.broker || 'IBKR',
        assetClass: ac,
        qty: t.targetQuantity,
        totalCostUsd: t.targetQuantity * avgUsd,
        currency: t.currency || 'USD',
      };
    });
  }

  function calcGlobalHoldings(transactions) {
    const map = {};
    _sortTxs(transactions).forEach(t => {
      if (!t.symbol) return;
      const ac = t.assetClass || (t.type.startsWith('CRYPTO') ? 'crypto' : 'intl');
      const key = _globalKey(t.symbol, ac, t.broker);
      if (!map[key]) {
        map[key] = {
          symbol: t.symbol, broker: t.broker || 'IBKR', assetClass: ac,
          qty: 0, totalCostUsd: 0, currency: t.currency || 'USD',
        };
      }
      const qty = t.shares || t.qty || 0;
      if (t.type === 'INTL_BUY' || t.type === 'CRYPTO_BUY') {
        const costUsd = t.costUsd != null ? t.costUsd : (t.priceUsd || t.price || 0) * qty;
        map[key].qty += qty;
        map[key].totalCostUsd += costUsd;
      } else if (t.type === 'INTL_SELL' || t.type === 'CRYPTO_SELL') {
        const sold = Math.min(qty, map[key].qty);
        const avg = map[key].qty > 0 ? map[key].totalCostUsd / map[key].qty : 0;
        map[key].qty -= sold;
        map[key].totalCostUsd = map[key].qty > 0 ? avg * map[key].qty : 0;
      }
    });
    _applyGlobalAdjusts(map, transactions);
    return Object.values(map).filter(h => h.qty > 0.00000001).map(h => ({
      ...h,
      avgCostUsd: h.qty > 0 ? h.totalCostUsd / h.qty : 0,
    }));
  }

  function _addShares(holdings, symbol, broker, shares, cost) {
    if (!symbol || !shares) return;
    const key = _holdingKey(symbol, broker);
    if (!holdings[key]) holdings[key] = { symbol, broker: broker || CDC_BROKER, shares: 0, totalCost: 0 };
    holdings[key].totalCost += cost;
    holdings[key].shares += shares;
  }

  function _sortTxs(transactions) {
    return (transactions || [])
      .slice()
      .sort((a, b) => (a.date || '').localeCompare(b.date || '') || String(a.id || '').localeCompare(String(b.id || '')));
  }

  function _removeShares(holdings, symbol, broker, shares) {
    if (!symbol || !shares) return 0;
    const key = _holdingKey(symbol, broker);
    if (!holdings[key] || holdings[key].shares <= 0) return 0;
    const prevShares = holdings[key].shares;
    const sold = Math.min(shares, prevShares);
    holdings[key].shares -= sold;
    holdings[key].totalCost = holdings[key].shares > 0
      ? (holdings[key].totalCost / prevShares) * holdings[key].shares
      : 0;
    return sold;
  }

  function calcHoldings(transactions) {
    const holdings = {};
    _sortTxs(transactions).forEach(t => {
      if (!t.symbol) return;
      if (t.type === 'BUY') {
        _addShares(holdings, t.symbol, t.broker, t.shares || 0, (t.shares || 0) * (t.price || 0));
      } else if (t.type === 'SELL' && !t.internal) {
        _removeShares(holdings, t.symbol, t.broker, t.shares || 0);
      } else if (t.type === 'IPO_SUBSCRIBE' && t.status === 'listed') {
        const shares = t.allottedShares || t.shares || 0;
        const cost = t.amount || shares * (t.listingPrice || 0);
        _addShares(holdings, t.symbol, CDC_BROKER, shares, cost);
      }
    });
    _applyStockAdjusts(holdings, transactions);
    return Object.values(holdings).filter(h => h.shares > 0).map(h => ({
      ...h,
      avgCost: h.shares > 0 ? h.totalCost / h.shares : 0,
    }));
  }

  function calcIpoPending(transactions) {
    return (transactions || [])
      .filter(t => t.type === 'IPO_SUBSCRIBE' && (t.status || 'pending') === 'pending')
      .map(t => ({
        id: t.id,
        symbol: t.symbol,
        name: t.name || t.symbol,
        shares: t.shares || 0,
        amount: t.amount || 0,
        broker: t.broker || CDC_BROKER,
        date: t.date,
        notes: t.notes || '',
      }));
  }

  function calcFundHoldings(transactions) {
    const funds = {};
    _sortTxs(transactions)
      .filter(t => ['CONTRIBUTION', 'FUND_OUT', 'REDEMPTION'].includes(t.type) && t.symbol)
      .forEach(t => {
        if (!funds[t.symbol]) funds[t.symbol] = { symbol: t.symbol, broker: t.broker || 'Meezan', units: 0, totalInvested: 0 };
        if (t.type === 'CONTRIBUTION') {
          funds[t.symbol].units += (t.units || 0);
          funds[t.symbol].totalInvested += (t.amount || 0);
        } else {
          const prevUnits = funds[t.symbol].units;
          const outUnits = Math.abs(t.units || 0);
          funds[t.symbol].units -= outUnits;
          funds[t.symbol].totalInvested = funds[t.symbol].units > 0
            ? (funds[t.symbol].totalInvested / prevUnits) * funds[t.symbol].units
            : 0;
        }
      });
    _applyFundAdjusts(funds, transactions);
    return Object.values(funds).filter(f => f.units > 0.0001).map(f => ({
      ...f,
      avgNav: f.units > 0 ? f.totalInvested / f.units : 0,
    }));
  }

  function monthlyContributions(transactions) {
    const monthly = {};
    (transactions || []).filter(t => ['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type) && !t.internal).forEach(t => {
      const month = (t.date || '').slice(0, 7);
      if (month) monthly[month] = (monthly[month] || 0) + (t.amount || 0);
    });
    return monthly;
  }

  function monthlySalary(transactions) {
    const monthly = {};
    (transactions || []).filter(t => t.type === 'SALARY').forEach(t => {
      const month = (t.date || '').slice(0, 7);
      if (month) monthly[month] = (monthly[month] || 0) + (t.amount || 0);
    });
    return monthly;
  }

  /** Gross cash deployed (includes fund convert-ins). Prefer currentCostBasis for return metrics. */
  function totalInvested(transactions) {
    return (transactions || [])
      .filter(t => ['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type) && !t.internal)
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  /** Net cost basis of open stock + fund + global positions. */
  function currentCostBasis(transactions) {
    const stocks = calcHoldings(transactions);
    const funds = calcFundHoldings(transactions);
    const local = stocks.reduce((sum, h) => sum + (h.totalCost || 0), 0)
      + funds.reduce((sum, f) => sum + (f.totalInvested || 0), 0);
    const global = calcGlobalHoldings(transactions).reduce((sum, h) => {
      const usd = h.totalCostUsd != null ? h.totalCostUsd : h.qty * (h.avgCostUsd || 0);
      if (typeof FxService !== 'undefined') return sum + FxService.usdToPkr(usd);
      return sum + usd * 280;
    }, 0);
    return local + global;
  }

  function unrealisedPnl(transactions, priceFn) {
    const px = (sym, fallback) => {
      const p = priceFn ? priceFn(sym, fallback) : fallback;
      return (p && p > 0) ? p : fallback;
    };
    const stocks = calcHoldings(transactions);
    const funds = calcFundHoldings(transactions);
    const stockVal = stocks.reduce((sum, h) => sum + h.shares * px(h.symbol, h.avgCost), 0);
    const fundVal = funds.reduce((sum, f) => sum + f.units * px(f.symbol, f.avgNav), 0);
    return (stockVal + fundVal) - currentCostBasis(transactions);
  }

  function totalDividends(transactions) {
    return (transactions || [])
      .filter(t => t.type === 'DIVIDEND')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  function totalTaxes(transactions) {
    return (transactions || [])
      .filter(t => t.type === 'TAX' && !t.custodial)
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  function totalFees(transactions) {
    return (transactions || [])
      .filter(t => t.type === 'FEE' && !t.custodial)
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  function _walkStockLedger(transactions, onSell) {
    const holdings = {};
    (transactions || [])
      .slice()
      .sort((a, b) => (a.date || '').localeCompare(b.date || '') || String(a.id || '').localeCompare(String(b.id || '')))
      .forEach(t => {
      if (!t.symbol) return;
      const key = _holdingKey(t.symbol, t.type === 'IPO_SUBSCRIBE' ? CDC_BROKER : t.broker);
      if (!holdings[key]) holdings[key] = { shares: 0, totalCost: 0 };
      if (t.type === 'BUY') {
        holdings[key].shares += t.shares || 0;
        holdings[key].totalCost += (t.shares || 0) * (t.price || 0);
      } else if (t.type === 'IPO_SUBSCRIBE' && t.status === 'listed') {
        const shares = t.allottedShares || t.shares || 0;
        holdings[key].shares += shares;
        holdings[key].totalCost += t.amount || shares * (t.listingPrice || 0);
      } else if (t.type === 'SELL' && !t.internal) {
        const requested = t.shares || 0;
        const sold = holdings[key].shares > 0 ? Math.min(requested, holdings[key].shares) : 0;
        const avgCost = holdings[key].shares > 0 ? holdings[key].totalCost / holdings[key].shares : 0;
        const sellPnl = ((t.price || 0) - avgCost) * sold;
        if (onSell) onSell(t, sellPnl, avgCost);
        holdings[key].shares -= sold;
        holdings[key].totalCost = holdings[key].shares > 0 ? avgCost * holdings[key].shares : 0;
      }
    });
    return holdings;
  }

  function realisedPnl(transactions) {
    let pnl = 0;
    _walkStockLedger(transactions, (_t, sellPnl) => { pnl += sellPnl; });
    _walkGlobalLedger(transactions, (_t, sellPnl) => { pnl += sellPnl; });
    return pnl;
  }

  function realisedPnlByDate(transactions) {
    const byDate = {};
    const add = (d, amt) => { if (d) byDate[d] = (byDate[d] || 0) + amt; };
    _walkStockLedger(transactions, (t, sellPnl) => add(t.date, sellPnl));
    _walkGlobalLedger(transactions, (t, sellPnl) => add(t.date, sellPnl));
    return byDate;
  }

  /** Per-trade realised rows for Performance tab (PSX + INTL + crypto). */
  function realisedTrades(transactions) {
    const rows = [];
    _walkStockLedger(transactions, (t, sellPnl, avgCost) => {
      rows.push({
        date: t.date,
        symbol: t.symbol,
        kind: 'psx',
        qty: t.shares || 0,
        unit: 'sh',
        pnl: sellPnl,
        avgCost,
        exitPrice: t.price || 0,
        currency: 'PKR',
      });
    });
    _walkGlobalLedger(transactions, (t, sellPnl, avgCostUsd) => {
      rows.push({
        date: t.date,
        symbol: t.symbol,
        kind: t.assetClass || 'intl',
        qty: t.shares || t.qty || 0,
        unit: t.assetClass === 'crypto' ? 'units' : 'sh',
        pnl: sellPnl,
        avgCost: avgCostUsd,
        exitPrice: t.priceUsd || 0,
        currency: 'USD',
      });
    });
    return rows.sort((a, b) => (b.date || '').localeCompare(a.date || '') || (a.symbol || '').localeCompare(b.symbol || ''));
  }

  function _walkGlobalLedger(transactions, onSell) {
    const ledger = {};
    (transactions || [])
      .slice()
      .sort((a, b) => (a.date || '').localeCompare(b.date || '') || String(a.id || '').localeCompare(String(b.id || '')))
      .forEach(t => {
        if (!t.symbol || !['INTL_BUY', 'INTL_SELL', 'CRYPTO_BUY', 'CRYPTO_SELL'].includes(t.type)) return;
        const ac = t.assetClass || (String(t.type).startsWith('CRYPTO') ? 'crypto' : 'intl');
        const key = _globalKey(t.symbol, ac, t.broker);
        if (!ledger[key]) {
          ledger[key] = { symbol: t.symbol, assetClass: ac, broker: t.broker, qty: 0, totalCostUsd: 0 };
        }
        const qty = t.shares || t.qty || 0;
        if (t.type === 'INTL_BUY' || t.type === 'CRYPTO_BUY') {
          const costUsd = t.costUsd != null ? t.costUsd : (t.priceUsd || 0) * qty;
          ledger[key].qty += qty;
          ledger[key].totalCostUsd += costUsd;
        } else {
          const sold = ledger[key].qty > 0 ? Math.min(qty, ledger[key].qty) : 0;
          const avgUsd = ledger[key].qty > 0 ? ledger[key].totalCostUsd / ledger[key].qty : 0;
          const proceedsUsd = (t.priceUsd || 0) * sold;
          const costUsd = avgUsd * sold;
          const pnlUsd = proceedsUsd - costUsd;
          const pnlPkr = typeof FxService !== 'undefined' ? FxService.usdToPkr(pnlUsd) : pnlUsd * 280;
          if (onSell && sold > 0) onSell(t, pnlPkr, avgUsd);
          ledger[key].qty -= sold;
          ledger[key].totalCostUsd = ledger[key].qty > 0 ? avgUsd * ledger[key].qty : 0;
        }
      });
    return ledger;
  }

  /** Net external cash flow on date (+sell proceeds, −buys) for M2M adjustment. */
  function _cashFlowsByDate(transactions) {
    const byDate = {};
    const flow = (date, amt) => { if (date && amt) byDate[date] = (byDate[date] || 0) + amt; };
    (transactions || []).forEach(t => {
      if (!t.date) return;
      if (['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type) && !t.internal) {
        flow(t.date, -(t.amount || 0));
      } else if (['INTL_BUY', 'CRYPTO_BUY'].includes(t.type) && !t.internal) {
        const usd = t.costUsd != null ? t.costUsd : (t.priceUsd || 0) * (t.shares || t.qty || 0);
        const pkr = typeof FxService !== 'undefined' ? FxService.usdToPkr(usd) : usd * 280;
        flow(t.date, -pkr);
      } else if (t.type === 'SELL' && !t.internal) {
        flow(t.date, (t.shares || 0) * (t.price || 0));
      } else if (['REDEMPTION', 'FUND_OUT'].includes(t.type) && !t.internal) {
        flow(t.date, Math.abs(t.amount || 0));
      } else if (['INTL_SELL', 'CRYPTO_SELL'].includes(t.type) && !t.internal) {
        const usd = (t.priceUsd || 0) * (t.shares || t.qty || 0);
        const pkr = typeof FxService !== 'undefined' ? FxService.usdToPkr(usd) : usd * 280;
        flow(t.date, pkr);
      }
    });
    return byDate;
  }

  function _portfolioSnapshot(stockHoldings, fundHoldings, priceFn, globalHoldings) {
    let value = 0;
    let cost = 0;
    Object.values(stockHoldings || {}).forEach(h => {
      if (h.shares <= 0) return;
      const px = priceFn(h.symbol, h.avgCost, 'stock');
      value += h.shares * px;
      cost += h.totalCost;
    });
    Object.values(fundHoldings || {}).forEach(f => {
      if (f.units <= 0) return;
      const px = priceFn(f.symbol, f.avgNav, 'fund');
      value += f.units * px;
      cost += f.totalInvested;
    });
    Object.values(globalHoldings || {}).forEach(h => {
      if (h.qty <= 0) return;
      const costPkr = typeof FxService !== 'undefined'
        ? FxService.usdToPkr(h.totalCostUsd != null ? h.totalCostUsd : h.qty * (h.avgCostUsd || 0))
        : (h.totalCostUsd || h.qty * (h.avgCostUsd || 0)) * 280;
      const px = priceFn(h.symbol, costPkr / (h.qty || 1), 'global');
      value += h.qty * px;
      cost += costPkr;
    });
    return { value, cost, unrealised: value - cost };
  }

  function _applyGlobalTx(globalLedger, t) {
    if (!t.symbol) return;
    const ac = t.assetClass || (String(t.type).startsWith('CRYPTO') ? 'crypto' : 'intl');
    const key = _globalKey(t.symbol, ac, t.broker);
    if (!globalLedger[key]) {
      globalLedger[key] = { symbol: t.symbol, broker: t.broker || 'IBKR', assetClass: ac, qty: 0, totalCostUsd: 0, avgCostUsd: 0 };
    }
    const qty = t.shares || t.qty || 0;
    if (t.type === 'INTL_BUY' || t.type === 'CRYPTO_BUY') {
      const costUsd = t.costUsd != null ? t.costUsd : (t.priceUsd || 0) * qty;
      globalLedger[key].qty += qty;
      globalLedger[key].totalCostUsd += costUsd;
    } else if (t.type === 'INTL_SELL' || t.type === 'CRYPTO_SELL') {
      const sold = Math.min(qty, globalLedger[key].qty);
      const avg = globalLedger[key].qty > 0 ? globalLedger[key].totalCostUsd / globalLedger[key].qty : 0;
      globalLedger[key].qty -= sold;
      globalLedger[key].totalCostUsd = globalLedger[key].qty > 0 ? avg * globalLedger[key].qty : 0;
    }
    globalLedger[key].avgCostUsd = globalLedger[key].qty > 0 ? globalLedger[key].totalCostUsd / globalLedger[key].qty : 0;
  }

  function portfolioValueTimeline(transactions, priceFn) {
    const sorted = (transactions || [])
      .filter(t => t.date && ['BUY', 'SELL', 'CONTRIBUTION', 'FUND_OUT', 'REDEMPTION', 'IPO_SUBSCRIBE', 'INTL_BUY', 'INTL_SELL', 'CRYPTO_BUY', 'CRYPTO_SELL'].includes(t.type))
      .sort((a, b) => a.date.localeCompare(b.date) || String(a.id || '').localeCompare(String(b.id || '')));

    const stockLedger = {};
    const fundLedger = {};
    const globalLedger = {};
    const byDate = {};
    const px = (sym, fallback, _kind) => {
      const p = priceFn ? priceFn(sym, fallback) : fallback;
      return (p && p > 0) ? p : fallback;
    };

    sorted.forEach(t => {
      if (t.type === 'BUY') {
        _addShares(stockLedger, t.symbol, t.broker, t.shares || 0, (t.shares || 0) * (t.price || 0));
      } else if (t.type === 'SELL' && !t.internal) {
        _removeShares(stockLedger, t.symbol, t.broker, t.shares || 0);
      } else if (t.type === 'CONTRIBUTION') {
        if (!fundLedger[t.symbol]) fundLedger[t.symbol] = { symbol: t.symbol, units: 0, totalInvested: 0, avgNav: 0 };
        fundLedger[t.symbol].units += (t.units || 0);
        fundLedger[t.symbol].totalInvested += (t.amount || 0);
        fundLedger[t.symbol].avgNav = fundLedger[t.symbol].units > 0
          ? fundLedger[t.symbol].totalInvested / fundLedger[t.symbol].units : 0;
      } else if (t.type === 'FUND_OUT' || t.type === 'REDEMPTION') {
        if (!fundLedger[t.symbol]) fundLedger[t.symbol] = { symbol: t.symbol, units: 0, totalInvested: 0, avgNav: 0 };
        const avgNav = fundLedger[t.symbol].units > 0 ? fundLedger[t.symbol].totalInvested / fundLedger[t.symbol].units : 0;
        fundLedger[t.symbol].units -= Math.abs(t.units || 0);
        fundLedger[t.symbol].totalInvested = fundLedger[t.symbol].units > 0 ? avgNav * fundLedger[t.symbol].units : 0;
        fundLedger[t.symbol].avgNav = fundLedger[t.symbol].units > 0 ? avgNav : 0;
      } else if (t.type === 'IPO_SUBSCRIBE' && t.status === 'listed') {
        const shares = t.allottedShares || t.shares || 0;
        const cost = t.amount || shares * (t.listingPrice || 0);
        _addShares(stockLedger, t.symbol, CDC_BROKER, shares, cost);
      } else if (['INTL_BUY', 'INTL_SELL', 'CRYPTO_BUY', 'CRYPTO_SELL'].includes(t.type)) {
        _applyGlobalTx(globalLedger, t);
      }

      const stockHoldings = {};
      Object.entries(stockLedger).forEach(([key, h]) => {
        if (h.shares > 0) {
          stockHoldings[key] = { ...h, avgCost: h.shares > 0 ? h.totalCost / h.shares : 0 };
        }
      });
      const snap = _portfolioSnapshot(stockHoldings, fundLedger, (sym, fb) => fb || 0, globalLedger);
      byDate[t.date] = { date: t.date, value: snap.cost, cost: snap.cost, unrealised: 0 };
    });

    const points = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
    const today = new Date().toISOString().split('T')[0];
    if (points.length) {
      const holdings = calcHoldings(transactions);
      const funds = calcFundHoldings(transactions);
      const globals = calcGlobalHoldings(transactions);
      const stockMap = {};
      holdings.forEach(h => { stockMap[_holdingKey(h.symbol, h.broker)] = h; });
      const fundMap = {};
      funds.forEach(f => { fundMap[f.symbol] = { ...f, avgNav: f.avgNav }; });
      const globalMap = {};
      globals.forEach(h => {
        globalMap[_globalKey(h.symbol, h.assetClass, h.broker)] = {
          ...h, totalCostUsd: h.totalCostUsd, avgCostUsd: h.avgCostUsd,
        };
      });
      const live = _portfolioSnapshot(stockMap, fundMap, px, globalMap);
      const last = points[points.length - 1];
      if (last.date !== today || Math.abs(last.value - live.value) > 1) {
        points.push({ date: today, value: live.value, cost: live.cost, unrealised: live.unrealised });
      }
    }
    return points;
  }

  function dailyPnlSeries(transactions, priceHistory, priceFn) {
    const realised = realisedPnlByDate(transactions);
    const cashFlow = _cashFlowsByDate(transactions);
    const valueByDate = {};

    const hist = (priceHistory || []).slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    for (let i = 1; i < hist.length; i++) {
      const prev = hist[i - 1];
      const cur = hist[i];
      if (!cur.date || cur.value == null || prev.value == null) continue;
      valueByDate[cur.date] = (cur.value - prev.value) + (cashFlow[cur.date] || 0);
    }

    if (hist.length < 2 && typeof priceFn === 'function') {
      const timeline = portfolioValueTimeline(transactions, (sym, fb) => fb || 0);
      timeline.forEach((pt, i) => {
        if (i === 0) return;
        const prev = timeline[i - 1];
        valueByDate[pt.date] = (pt.cost - prev.cost) + (cashFlow[pt.date] || 0);
      });
    }

    const dates = [...new Set([...Object.keys(realised), ...Object.keys(valueByDate)])].sort();
    return dates.map(date => ({
      date,
      pnl: (realised[date] || 0) + (valueByDate[date] || 0),
      realised: realised[date] || 0,
      markToMarket: valueByDate[date] || 0,
      fromSnapshots: hist.length >= 2,
    }));
  }

  function monthlyPnlSeries(transactions, priceHistory, priceFn) {
    const daily = dailyPnlSeries(transactions, priceHistory, priceFn);
    const months = {};
    daily.forEach(d => {
      const dt = new Date(d.date + 'T12:00:00');
      const key = `${dt.toLocaleString('en-US', { month: 'short' })} ${dt.getFullYear()}`;
      if (!months[key]) months[key] = { month: key, pnl: 0, realised: 0, markToMarket: 0, sortKey: d.date.slice(0, 7) };
      months[key].pnl += d.pnl;
      months[key].realised += d.realised;
      months[key].markToMarket += d.markToMarket;
    });
    return Object.values(months).sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  }

  function currentMonthContribution(transactions) {
    const now = new Date();
    const monthKey = now.toISOString().slice(0, 7);
    return (transactions || [])
      .filter(t => (t.date || '').startsWith(monthKey) && ['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type))
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  function investmentTimeline(transactions) {
    const txs = (transactions || [])
      .filter(t => ['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type) && t.amount > 0)
      .sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    let cumulative = 0;
    const byMonth = {};
    const points = [];
    txs.forEach(t => {
      cumulative += t.amount || 0;
      const m = (t.date || '').slice(0, 7);
      if (m) byMonth[m] = cumulative;
      points.push({
        date: t.date,
        month: m,
        amount: t.amount,
        cumulative,
        type: t.type,
        symbol: t.symbol || '',
        broker: t.broker || ''
      });
    });
    return { points, byMonth, total: cumulative, count: txs.length };
  }

  function monthlyInvestmentBars(byMonth, months = 12) {
    const keys = [];
    const now = new Date();
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      keys.push(d.toISOString().slice(0, 7));
    }
    let prev = 0;
    return keys.map(m => {
      const cum = byMonth[m] || prev;
      const added = cum - prev;
      prev = cum;
      return { month: m, added, cumulative: cum };
    });
  }

  function newId() { return 'tx_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6); }

  /** Approximate uninvested cash: salary + dividends + sell proceeds - buys - contributions. */
  function cashBalance(transactions) {
    let cash = 0;
    (transactions || []).forEach(t => {
      if (t.type === 'SALARY')          cash += t.amount || 0;
      else if (t.type === 'DEPOSIT' && !t.custodial) cash += t.amount || 0;
      else if (t.type === 'FEE')       cash -= t.amount || 0;
      else if (t.type === 'TAX')       cash -= t.amount || 0;
      else if (t.type === 'DIVIDEND')   cash += t.amount || 0;
      else if (t.type === 'SELL')       cash += (t.shares || 0) * (t.price || 0);
      else if (t.type === 'REDEMPTION') cash += t.amount || 0;
      else if (t.type === 'BUY' && !t.internal)          cash -= t.amount || 0;
      else if (t.type === 'CONTRIBUTION' && !t.internal) cash -= t.amount || 0;
      else if (t.type === 'IPO_SUBSCRIBE' && !t.internal && t.status !== 'refunded') cash -= t.amount || 0;
      else if (t.type === 'INTL_BUY' || t.type === 'CRYPTO_BUY') {
        const usd = t.costUsd != null ? t.costUsd : (t.priceUsd || 0) * (t.shares || t.qty || 0);
        cash -= typeof FxService !== 'undefined' ? FxService.usdToPkr(usd) : usd * 280;
      }
      else if (t.type === 'INTL_SELL' || t.type === 'CRYPTO_SELL') {
        const usd = (t.priceUsd || 0) * (t.shares || t.qty || 0);
        cash += typeof FxService !== 'undefined' ? FxService.usdToPkr(usd) : usd * 280;
      }
    });
    return Math.max(0, cash);
  }

  return { CDC_BROKER, calcHoldings, calcFundHoldings, calcGlobalHoldings, calcIpoPending, monthlyContributions, monthlySalary,
    totalInvested, currentCostBasis, unrealisedPnl, totalDividends, totalTaxes, totalFees, realisedPnl, realisedPnlByDate, realisedTrades,
    portfolioValueTimeline, dailyPnlSeries, monthlyPnlSeries, currentMonthContribution,
    investmentTimeline, monthlyInvestmentBars, newId, cashBalance };
})();
window.Ledger = Ledger;

;/* === js/engines/prices.js === */
'use strict';
const Prices = (() => {
  const YAHOO_SYMBOL_MAP = {
    'ENGROH': 'ENGROH.KA',
    'MIIETF': null,
    'MZNPETF': null,
    'MIIF-B': null,
    'MIIF-MMKA': null,
    'MAAF': null,
    'MBF': null,
    'MDAAF-MDYP': null,
    'KMIF': null,
    'MIF': null,
  };

  const FUND_SYMBOLS = new Set(['KMIF','MAAF','MBF','MDAAF-MDYP','MIF','MIIF-B','MIIF-MMKA','MIIETF','MZNPETF']);

  let _proxyFailStreak = 0;
  let _proxyDownUntil = 0;
  let _proxyWarned = false;
  const _yahooSkip = new Set();
  const WORKER_RETRIES = 2;
  const WORKER_RETRY_MS = 350;

  function _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function _markProxySuccess() {
    _proxyFailStreak = 0;
    _proxyDownUntil = 0;
  }

  function _markProxyDown(status) {
    _proxyFailStreak++;
    // One flaky 520 should not ban worker for 5 minutes — that forces public CORS proxies.
    if (_proxyFailStreak >= 4) _proxyDownUntil = Date.now() + 60000;
    if (!_proxyWarned && _proxyFailStreak >= 2) {
      _proxyWarned = true;
      if (typeof App !== 'undefined' && App.showToast) {
        App.showToast('Live prices slow — using last close where needed', 'warning');
      }
    }
  }

  function _isHtml(text) {
    const t = (text || '').trim();
    return t.startsWith('<!DOCTYPE') || t.startsWith('<html') || t.startsWith('<HTML');
  }

  function _isBadPayload(text) {
    const t = (text || '').trim();
    if (!t) return true;
    if (_isHtml(t)) return true;
    if (/^error code:\s*\d+/i.test(t)) return true;
    // Soft empty series from Worker (`{ error, data: [] }`) is OK — not a hard fail.
    if (t.startsWith('{') && t.includes('"error"')) {
      try {
        const j = JSON.parse(t);
        if (Array.isArray(j?.data)) return false;
      } catch (_) { /* fall through */ }
      return true;
    }
    return false;
  }

  function _parseJson(text) {
    if (!text || _isBadPayload(text)) return null;
    try { return JSON.parse(text); } catch { return null; }
  }

  function _parseTimeseries(data, source) {
    const rows = Array.isArray(data) ? data : (data?.data || []);
    if (!Array.isArray(rows) || !rows.length) return null;
    const sorted = [...rows].sort((a, b) => (Number(a[0]) || 0) - (Number(b[0]) || 0));
    const last = sorted[sorted.length - 1];
    if (!Array.isArray(last) || last.length < 2) return null;
    const price = parseFloat(last[1]);
    const prevRow = sorted.length > 1 ? sorted[sorted.length - 2] : last;
    const prev = parseFloat(last[3] ?? prevRow[1] ?? last[1]);
    if (!price || price <= 0) return null;
    return {
      price,
      prevClose: prev > 0 && prev !== price ? prev : price * 0.999,
      source,
      ts: Date.now(),
    };
  }

  async function fetchPriceSeries(symbol, points) {
    points = points || 30;
    const sym = (symbol || '').toUpperCase();
    const intl = (window.INTL_STOCKS || []).find(s => s.symbol === sym);
    const crypto = (window.CRYPTO_ASSETS || []).find(c => c.symbol === sym);
    if (intl || crypto) {
      const yahoo = intl?.yahoo || sym;
      let data = await _fetchWorkerPath(`yahoo/chart/${encodeURIComponent(yahoo)}`);
      let closes = _yahooCloses(data);
      if (closes.length >= 2) return closes.slice(-points);
      return [];
    }
    const raw = await _fetchRaw(`https://dps.psx.com.pk/timeseries/eod/${sym}`);
    const rows = Array.isArray(raw) ? raw : (raw?.data || []);
    if (Array.isArray(rows) && rows.length >= 2) {
      const sorted = [...rows].sort((a, b) => (Number(a[0]) || 0) - (Number(b[0]) || 0));
      const closes = sorted.map(r => parseFloat(r[1])).filter(n => n > 0);
      if (closes.length >= 2) return closes.slice(-points);
    }
    // Yahoo .KA when PSX series is empty — silent, no console noise.
    const ySym = YAHOO_SYMBOL_MAP[sym] === null ? null : (YAHOO_SYMBOL_MAP[sym] || `${sym}.KA`);
    if (ySym) {
      const data = await _fetchWorkerPath(`yahoo/chart/${encodeURIComponent(ySym)}?range=1y`);
      const closes = _yahooCloses(data);
      if (closes.length >= 2) return closes.slice(-points);
    }
    return [];
  }

  function _yahooCloses(data) {
    const result = data?.chart?.result?.[0];
    if (!result) return [];
    const q = result.indicators?.quote?.[0];
    if (result.timestamp && q?.close) {
      return result.timestamp
        .map((_, i) => q.close[i])
        .filter(v => v != null && Number.isFinite(v) && v > 0);
    }
    const adj = result.indicators?.adjclose?.[0]?.adjclose;
    if (Array.isArray(adj)) return adj.filter(v => v != null && v > 0);
    return [];
  }

  async function _fetchAppProxy(url, attempt = 0) {
    if (Date.now() < _proxyDownUntil) return null;

    const bases = [...(window.LedgerCapConfig?.psxProxyBases?.() || [])];
    const fromState = (typeof State !== 'undefined' && State.get('settings')?.psxProxyUrl) || '';
    if (fromState) {
      const resolved = window.LedgerCapConfig?.resolvePsxProxyUrl(fromState);
      if (resolved && !bases.includes(resolved)) bases.unshift(resolved);
    }
    if (!bases.length) return null;

    const path = url.replace('https://dps.psx.com.pk/', '');
    for (const base of bases) {
      const root = base.replace(/\/$/, '');
      const proxyUrl = `${root}/${path}`;
      try {
        const res = await fetch(proxyUrl, { headers: { Accept: 'application/json' } });
        if (!res.ok) {
          // Saturation/upstream-down statuses: retrying amplifies the problem
          // (Yahoo 429, PSX origin 520). Back off immediately, don't retry.
          // LDG-V3-3: also skip retry on 404 (worker maps PSX HTML → 404 for KSE100).
          const noRetry = [404, 429, 502, 503, 520, 522, 524].includes(res.status);
          if (!noRetry && attempt < WORKER_RETRIES) {
            await _sleep(WORKER_RETRY_MS * (attempt + 1));
            return _fetchAppProxy(url, attempt + 1);
          }
          _markProxyDown(res.status);
          continue;
        }
        const text = await res.text();
        if (_isBadPayload(text)) {
          if (attempt < WORKER_RETRIES) {
            await _sleep(WORKER_RETRY_MS * (attempt + 1));
            return _fetchAppProxy(url, attempt + 1);
          }
          _markProxyDown(520);
          continue;
        }
        const parsed = _parseJson(text);
        if (parsed) {
          _markProxySuccess();
          return parsed;
        }
      } catch {
        if (attempt < WORKER_RETRIES) {
          await _sleep(WORKER_RETRY_MS * (attempt + 1));
          return _fetchAppProxy(url, attempt + 1);
        }
        _markProxyDown(502);
      }
    }
    return null;
  }

  async function _fetchRaw(url) {
    // Owned Worker only — no public CORS proxies (LDG-P0-01).
    return _fetchAppProxy(url);
  }

  async function fetchPsxSymbol(symbol) {
    const sym = symbol.toUpperCase();
    // EOD first — more stable through worker; int as upgrade when market open
    const urls = [
      { url: `https://dps.psx.com.pk/timeseries/eod/${sym}`, source: 'psx_eod' },
      { url: `https://dps.psx.com.pk/timeseries/int/${sym}`, source: 'psx_int' },
    ];
    for (const { url, source } of urls) {
      const data = await _fetchRaw(url);
      if (!data) continue;
      const parsed = _parseTimeseries(data, source);
      if (parsed) return { ...parsed, symbol: sym };
    }
    return null;
  }

  async function fetchPsxLive(symbols) {
    const results = {};
    const sessionOpen = typeof PsxSession !== 'undefined' && PsxSession.isOpen();
    const batchSize = 2;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const chunk = symbols.slice(i, i + batchSize);
      for (const sym of chunk) {
        let parsed = null;
        if (sessionOpen) {
          const intData = await _fetchRaw(`https://dps.psx.com.pk/timeseries/int/${sym}`);
          parsed = _parseTimeseries(intData, 'psx_int');
        }
        if (!parsed) {
          const eodData = await _fetchRaw(`https://dps.psx.com.pk/timeseries/eod/${sym}`);
          parsed = _parseTimeseries(eodData, 'psx_eod');
        }
        if (parsed && _sanityCheck(sym, parsed.price)) results[sym] = { ...parsed, symbol: sym };
      }
      if (i + batchSize < symbols.length) await _sleep(120);
    }
    return results;
  }

  async function _fetchWorkerPath(path) {
    const bases = window.LedgerCapConfig?.psxProxyBases?.() || [];
    for (const base of bases) {
      try {
        const res = await fetch(`${base.replace(/\/$/, '')}/${path}`, { headers: { Accept: 'application/json' } });
        if (!res.ok) continue;
        return await res.json();
      } catch (_) {}
    }
    return null;
  }

  function _parseYahooChart(data, symbol, source) {
    const meta = data?.chart?.result?.[0]?.meta;
    const price = meta?.regularMarketPrice;
    const prevClose = meta?.previousClose || meta?.chartPreviousClose;
    if (!price || price <= 0) return null;
    const divRaw = meta.trailingAnnualDividendYield;
    return {
      symbol,
      price,
      priceUsd: price,
      prevClose,
      prevCloseUsd: prevClose,
      trailingPE: meta.trailingPE,
      dividendYield: divRaw != null ? divRaw * 100 : null,
      source: source || 'yahoo',
      currency: 'USD',
      ts: Date.now(),
    };
  }

  async function fetchIntlSymbol(symbol) {
    const meta = (window.INTL_STOCKS || []).find(s => s.symbol === symbol);
    const yahoo = meta?.yahoo || symbol;
    const data = await _fetchWorkerPath(`yahoo/chart/${encodeURIComponent(yahoo)}`);
    const parsed = _parseYahooChart(data, symbol, 'yahoo_intl');
    if (parsed && _sanityCheckUsd(symbol, parsed.priceUsd ?? parsed.price)) return parsed;
    const fb = (window.GLOBAL_FALLBACK_USD || {})[symbol];
    return fb ? { symbol, price: fb, priceUsd: fb, prevClose: fb * 0.999, source: 'fallback', currency: 'USD', ts: Date.now() } : null;
  }

  async function fetchCryptoSymbol(symbol) {
    const meta = (window.CRYPTO_ASSETS || []).find(c => c.symbol === symbol);
    const id = meta?.coingecko || symbol.toLowerCase();
    const data = await _fetchWorkerPath(`crypto/price?ids=${encodeURIComponent(id)}`);
    const row = data?.[id];
    const price = row?.usd;
    if (!price) {
      const fb = (window.GLOBAL_FALLBACK_USD || {})[symbol];
      return fb ? { symbol, price: fb, priceUsd: fb, prevClose: fb * 0.999, source: 'fallback', currency: 'USD', ts: Date.now() } : null;
    }
    if (!_sanityCheckUsd(symbol, price)) {
      const fb = (window.GLOBAL_FALLBACK_USD || {})[symbol];
      return fb ? { symbol, price: fb, priceUsd: fb, prevClose: fb * 0.999, source: 'fallback', currency: 'USD', ts: Date.now() } : null;
    }
    const chg = row.usd_24h_change || 0;
    const prev = price / (1 + chg / 100);
    return { symbol, price, priceUsd: price, prevClose: prev, source: 'coingecko', currency: 'USD', ts: Date.now() };
  }

  async function fetchGlobalQuote(symbol, assetClass) {
    if (assetClass === 'crypto') return fetchCryptoSymbol(symbol);
    if ((window.INTL_STOCKS || []).some(s => s.symbol === symbol)) return fetchIntlSymbol(symbol);
    return null;
  }

  async function fetchAllGlobal(holdings, onProgress) {
    const results = {};
    let i = 0;
    for (const h of holdings || []) {
      const q = await fetchGlobalQuote(h.symbol, h.assetClass);
      if (q) results[h.symbol] = q;
      if (onProgress) onProgress(++i, holdings.length, h.symbol, !!q, q?.source);
      await _sleep(100);
    }
    return results;
  }

  function fundNavFallback(symbol) {
    const fund = (window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol);
    const fp = (window.FALLBACK_PRICES || {})[symbol];
    const nav = fund?.currentNav || fp;
    if (!nav) return null;
    return {
      symbol,
      price: nav,
      prevClose: nav * 0.999,
      source: fund ? 'meezan_seed' : 'fallback',
      ts: Date.now() - 3600000
    };
  }

  async function _fetchYahoo(symbol) {
    if (_yahooSkip.has(symbol)) return null;
    const yahooSym = symbol in YAHOO_SYMBOL_MAP ? YAHOO_SYMBOL_MAP[symbol] : `${symbol}.KA`;
    if (yahooSym === null) return null;

    const data = await _fetchWorkerPath(`yahoo/chart/${encodeURIComponent(yahooSym)}`);
    const meta = data?.chart?.result?.[0]?.meta;
    const price = meta?.regularMarketPrice;
    const prevClose = meta?.previousClose || meta?.chartPreviousClose;
    if (!price || price <= 0) {
      _yahooSkip.add(symbol);
      return null;
    }
    if (!_sanityCheck(symbol, price)) {
      _yahooSkip.add(symbol);
      return null;
    }
    return { symbol, price, prevClose, source: 'yahoo', ts: Date.now() };
  }

  async function fetchStock(symbol) {
    if (FUND_SYMBOLS.has(symbol)) return fundNavFallback(symbol);

    if ((window.CRYPTO_ASSETS || []).some(c => c.symbol === symbol)) {
      const r = await fetchCryptoSymbol(symbol);
      if (r && typeof FxService !== 'undefined') {
        return { ...r, price: FxService.usdToPkr(r.priceUsd || r.price) };
      }
      return r;
    }

    if ((window.INTL_STOCKS || []).some(s => s.symbol === symbol)) {
      const r = await fetchIntlSymbol(symbol);
      if (r && typeof FxService !== 'undefined') {
        return { ...r, price: FxService.usdToPkr(r.priceUsd || r.price) };
      }
      return r;
    }

    const psx = await fetchPsxSymbol(symbol);
    if (psx && _sanityCheck(symbol, psx.price)) return { symbol, ...psx };

    const yahoo = await _fetchYahoo(symbol);
    if (yahoo) return yahoo;

    const fp = (window.FALLBACK_PRICES || {})[symbol];
    return fp ? { symbol, price: fp, prevClose: fp * 0.999, source: 'fallback', ts: Date.now() - 86400000 } : null;
  }

  function _sanityCheck(symbol, price) {
    const fallback = (window.FALLBACK_PRICES || {})[symbol] || 0;
    if (fallback > 0 && (price > fallback * 3 || price < fallback * 0.3)) {
      return false;
    }
    return true;
  }

  /** Same guard for USD-quoted intl/crypto — curated fallbacks only ($100/$1 auto-fills are not anchors). */
  function _sanityCheckUsd(symbol, price) {
    if (!(price > 0)) return false;
    const fb = (window.GLOBAL_FALLBACK_USD || {})[symbol] || 0;
    if (fb > 0 && fb !== 100 && fb !== 1 && (price > fb * 5 || price < fb * 0.2)) return false;
    return true;
  }

  async function fetchKSE100() {
    // Prefer Yahoo → dedicated /kse100 (200 + data[]) → cache. Never leave Home spinning.
    const yahooSyms = ['%5EKSE100', 'KSE100.KA'];
    for (const ySym of yahooSyms) {
      const yahoo = await _fetchWorkerPath(`yahoo/chart/${ySym}`);
      const meta = yahoo?.chart?.result?.[0]?.meta;
      if (meta?.regularMarketPrice) {
        return {
          value: meta.regularMarketPrice,
          change: meta.regularMarketChange || 0,
          changeP: meta.regularMarketChangePercent || 0,
          prevClose: meta.previousClose || meta.chartPreviousClose,
          ts: Date.now(),
          source: 'yahoo',
          indicative: true,
          resolved: true,
        };
      }
    }

    const ksePath = await _fetchWorkerPath('kse100');
    const rows = Array.isArray(ksePath) ? ksePath : (ksePath?.data || []);
    if (Array.isArray(rows) && rows.length) {
      const sorted = [...rows].sort((a, b) => (Number(a[0]) || 0) - (Number(b[0]) || 0));
      const last = sorted[sorted.length - 1];
      const prev = sorted.length > 1 ? sorted[sorted.length - 2] : last;
      const value = parseFloat(last?.[1]);
      const prevClose = parseFloat(prev?.[1]);
      if (value > 0) {
        const changeP = prevClose > 0 ? ((value - prevClose) / prevClose) * 100 : 0;
        return {
          value,
          change: value - (prevClose || value),
          changeP,
          prevClose,
          ts: Date.now(),
          source: 'psx_eod',
          indicative: true,
          resolved: true,
        };
      }
    }

    if (typeof State !== 'undefined') {
      const cached = State.get('kseIndex');
      if (cached && cached.value > 0) {
        return { ...cached, source: cached.source || 'cache', indicative: true, resolved: true, ts: cached.ts || Date.now() };
      }
    }
    return { value: null, changeP: null, unavailable: true, source: 'unavailable', resolved: true, ts: Date.now() };
  }

  async function fetchAll(symbols, onProgress) {
    const results = {};
    const stockSyms = symbols.filter(s => !FUND_SYMBOLS.has(s));
    const fundSyms = symbols.filter(s => FUND_SYMBOLS.has(s));

    const live = await fetchPsxLive(stockSyms);
    Object.assign(results, live);
    if (Object.keys(live).length > 0 && onProgress) {
      onProgress(Object.keys(live).length, symbols.length, 'batch', true, 'psx_int');
    }

    let done = Object.keys(results).length;
    for (const symbol of stockSyms) {
      if (results[symbol]) {
        if (onProgress) onProgress(++done, symbols.length, symbol, true, results[symbol].source || 'psx_int');
        continue;
      }

      const psx = await fetchPsxSymbol(symbol);
      if (psx && _sanityCheck(symbol, psx.price)) {
        results[symbol] = psx;
        if (onProgress) onProgress(++done, symbols.length, symbol, true, psx.source);
        continue;
      }

      if (YAHOO_SYMBOL_MAP[symbol] === null) {
        const fb = fundNavFallback(symbol);
        if (fb) results[symbol] = fb;
        if (onProgress) onProgress(++done, symbols.length, symbol, !!fb, 'skip');
        continue;
      }

      const yahoo = await _fetchYahoo(symbol);
      if (yahoo) {
        results[symbol] = yahoo;
        if (onProgress) onProgress(++done, symbols.length, symbol, true, 'yahoo');
      } else {
        const fp = (window.FALLBACK_PRICES || {})[symbol];
        if (fp) results[symbol] = { price: fp, prevClose: fp * 0.999, source: 'fallback', ts: Date.now() - 86400000 };
        if (onProgress) onProgress(++done, symbols.length, symbol, !!fp, 'fallback');
      }
      await new Promise(r => setTimeout(r, 40));
    }

    for (const symbol of fundSyms) {
      const nav = fundNavFallback(symbol);
      if (nav) results[symbol] = nav;
      done++;
      if (onProgress) onProgress(done, symbols.length, symbol, true, 'meezan_seed');
    }

    return results;
  }

  function formatTs(ts) {
    if (!ts) return 'never';
    const d = new Date(ts);
    const now = new Date();
    const diffMin = Math.floor((now - d) / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
    return d.toLocaleDateString('en-PK', { day: 'numeric', month: 'short' });
  }

  function sourceLabel(source) {
    const map = {
      psx_live: 'PSX Live',
      psx_int: 'PSX Intraday',
      psx_symbol: 'PSX',
      psx_eod: 'PSX EOD',
      yahoo: 'Yahoo',
      yahoo_intl: 'US Market',
      coingecko: 'Crypto',
      meezan_seed: 'Meezan NAV',
      fallback: 'Last known',
      manual: 'Manual',
      stale: 'Stale'
    };
    return map[source] || source || '—';
  }

  function priceBadge(symbol) {
    if (typeof State === 'undefined') return '';
    const isGlobal = (window.INTL_STOCKS || []).some(s => s.symbol === symbol)
      || (window.CRYPTO_ASSETS || []).some(c => c.symbol === symbol);
    const src = State.getPriceSource(symbol);
    const px = State.getPrice(symbol);
    const fb = (window.GLOBAL_FALLBACK_USD || {})[symbol];
    if (isGlobal && !px && !fb) {
      return '<span class="lc-price-badge lc-price-badge--stale" title="No live price yet">Unpriced</span>';
    }
    const stale = State.isPriceStale(symbol, 24);
    const age = State.priceAgeLabel(symbol);
    const label = stale ? 'Stale' : sourceLabel(src);
    const cls = stale ? 'lc-price-badge lc-price-badge--stale' : 'lc-price-badge';
    return `<span class="${cls}" title="${age || ''}">${label}${age && !stale ? ' · ' + age : ''}</span>`;
  }

  function applySnapshotPsx(quotes) {
    if (!quotes || typeof State === 'undefined') return 0;
    let n = 0;
    Object.entries(quotes).forEach(([sym, q]) => {
      if (!(q?.price > 0)) return;
      const prevTs = State.get('prices')?.[sym]?.ts || 0;
      if (prevTs > (q.ts || 0)) return;
      State.updatePrice(sym, {
        price: q.price,
        prevClose: q.prevClose || q.price,
        source: q.source || 'snapshot-psx',
        ts: q.ts || Date.now(),
      });
      n++;
    });
    return n;
  }

  function applySnapshotUs(quotes, rate) {
    if (!quotes || typeof State === 'undefined') return 0;
    const fx = rate || (typeof FxService !== 'undefined' ? FxService.getUsdRate() : 280);
    let n = 0;
    Object.entries(quotes).forEach(([sym, q]) => {
      if (!(q?.priceUsd > 0)) return;
      const prevTs = State.get('prices')?.[sym]?.ts || 0;
      if (prevTs > (q.ts || 0)) return;
      State.updatePrice(sym, {
        priceUsd: q.priceUsd,
        prevCloseUsd: q.prevCloseUsd || q.priceUsd,
        price: q.priceUsd * fx,
        prevClose: (q.prevCloseUsd || q.priceUsd) * fx,
        source: q.source || 'snapshot-us',
        ts: q.ts || Date.now(),
      });
      n++;
    });
    return n;
  }

  return { fetchStock, fetchSymbol: fetchStock, fetchKSE100, fetchAll, formatTs, sourceLabel, priceBadge, fetchPsxSymbol, fetchIntlSymbol, fetchCryptoSymbol, fetchGlobalQuote, fetchAllGlobal, fetchPriceSeries, applySnapshotPsx, applySnapshotUs };
})();
window.Prices = Prices;
window.YAHOO_SYMBOL_MAP = {
  'ENGROH': 'ENGROH.KA',
  'MIIETF': null,
  'MZNPETF': null,
  'MIIF-B': null,
  'MIIF-MMKA': null,
  'MAAF': null,
  'MBF': null,
  'MDAAF-MDYP': null,
  'KMIF': null,
  'MIF': null,
};

;/* === js/services/market-data.js === */
'use strict';
const MarketDataService = (() => {
  const _cache = {};
  const MAX_SANE_DAILY_PCT = 50;

  function _isGlobal(symbol) {
    return (window.INTL_STOCKS || []).some(s => s.symbol === symbol)
      || (window.CRYPTO_ASSETS || []).some(c => c.symbol === symbol);
  }

  function _rate() {
    return typeof FxService !== 'undefined' ? FxService.getUsdRate() : 280;
  }

  function _price(symbol) {
    const p = State.getPrice(symbol);
    if (p > 0) return p;
    if (_isGlobal(symbol)) {
      const usd = State.get()?.prices?.[symbol]?.priceUsd || (window.GLOBAL_FALLBACK_USD || {})[symbol];
      if (usd > 0) return usd * _rate();
    }
    const fp = (window.FALLBACK_PRICES || {})[symbol];
    if (fp > 0) return fp;
    const mf = (window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol);
    return mf?.currentNav || 0;
  }

  function _prevClose(symbol) {
    const st = State.get()?.prices?.[symbol] || {};
    if (_isGlobal(symbol)) {
      const usd = st.priceUsd || (window.GLOBAL_FALLBACK_USD || {})[symbol];
      const prevUsd = st.prevCloseUsd
        || (st.prevClose > 0 && st.prevClose < Math.max((usd || 0) * 10, 500) ? st.prevClose : null)
        || (usd > 0 ? usd * 0.999 : 0);
      if (prevUsd > 0) return prevUsd * _rate();
    }
    const prev = State.getPrevClose(symbol);
    if (prev > 0) return prev;
    const p = _price(symbol);
    return p * 0.998;
  }

  function _globalQuote(symbol) {
    const st = State.get()?.prices?.[symbol] || {};
    const usd = st.priceUsd || (window.GLOBAL_FALLBACK_USD || {})[symbol];
    if (!(usd > 0)) return null;
    const rate = _rate();
    const prevUsd = st.prevCloseUsd
      || (st.prevClose > 0 && st.prevClose < Math.max(usd * 10, 500) ? st.prevClose : null)
      || usd * 0.999;
    const price = st.price > 0 ? st.price : usd * rate;
    const prevClose = prevUsd * rate;
    const changeUsd = usd - prevUsd;
    let changePct = prevUsd > 0 ? (changeUsd / prevUsd) * 100 : 0;
    if (Math.abs(changePct) > MAX_SANE_DAILY_PCT && !(st.prevCloseUsd > 0)) changePct = 0;
    return {
      symbol,
      price,
      priceUsd: usd,
      prevClose,
      prevCloseUsd: prevUsd,
      change: price - prevClose,
      changePct,
      source: State.getPriceSource(symbol) || 'seed',
      ts: st.ts || Date.now(),
    };
  }

  function _quoteMeta(symbol, source) {
    const st = State.get()?.prices?.[symbol] || {};
    const ts = st.ts || 0;
    const seeded = ['fallback', 'seed', 'meezan_seed'].includes(source)
      && (!ts || Date.now() - ts > 86400000);
    const quoteLabel = typeof PsxSession !== 'undefined' ? PsxSession.priceLabel() : 'Last close';
    const sessionOpen = typeof PsxSession !== 'undefined' ? PsxSession.isOpen() : false;
    return { ts, seeded, quoteLabel, sessionOpen };
  }

  function getQuote(symbol) {
    if (_isGlobal(symbol)) {
      const g = _globalQuote(symbol);
      if (g) {
        const meta = _quoteMeta(symbol, g.source);
        return { ...g, ...meta };
      }
    }
    const price = _price(symbol);
    const prevClose = _prevClose(symbol);
    const change = price - prevClose;
    let changePct = prevClose > 0 ? (change / prevClose) * 100 : 0;
    if (Math.abs(changePct) > MAX_SANE_DAILY_PCT) changePct = 0;
    const source = State.getPriceSource(symbol) || 'seed';
    const meta = _quoteMeta(symbol, source);
    return { symbol, price, prevClose, change, changePct, source, ...meta };
  }

  function getPriceChanges(symbol) {
    const quote = getQuote(symbol);
    const seed = (window.PRICE_CHANGE_SEED || {})[symbol] || {};
    const fund = (window.FUND_ANALYTICS_DB || {})[symbol];
    const daily = Math.abs(quote.changePct) > MAX_SANE_DAILY_PCT ? 0 : quote.changePct;
    return {
      daily,
      weekly: seed.weekly ?? (fund ? fund.ytdReturn * 0.15 : 0),
      monthly: seed.monthly ?? (fund ? fund.ytdReturn * 0.4 : 0),
      yearly: seed.yearly ?? fund?.oneYearReturn ?? seed.monthly * 3 ?? 0,
    };
  }

  async function fetchLiveQuote(symbol) {
    if (typeof Prices !== 'undefined' && Prices.fetchStock) {
      try {
        const r = await Prices.fetchStock(symbol);
        if (r?.price || r?.priceUsd) {
          State.updatePrice(symbol, r);
          _cache[symbol] = { ...r, ts: Date.now() };
          return getQuote(symbol);
        }
      } catch (_) {}
    }
    return getQuote(symbol);
  }

  function getAllQuotes(symbols) {
    return (symbols || []).map(s => getQuote(s));
  }

  return { getQuote, getPriceChanges, fetchLiveQuote, getAllQuotes, _isGlobal };
})();
window.MarketDataService = MarketDataService;

;/* === js/services/stock-service.js === */
'use strict';
const StockService = (() => {

  function _meta(symbol) {
    return [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === symbol);
  }

  function _fundMeta(symbol) {
    return (window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol);
  }

  function isFund(symbol) {
    return !!_fundMeta(symbol) || ['KMIF','MAAF','MBF','MIF','MIIF-B','MIIF-MMKA','MDAAF-MDYP','MIIETF','MZNPETF'].includes(symbol);
  }

  function getProfile(symbol) {
    const stock = _meta(symbol);
    const fund = _fundMeta(symbol);
    const intl = (window.INTL_STOCKS || []).find(s => s.symbol === symbol);
    const crypto = (window.CRYPTO_ASSETS || []).find(c => c.symbol === symbol);
    const quote = MarketDataService.getQuote(symbol);
    if (fund) {
      const analytics = (window.FUND_ANALYTICS_DB || {})[symbol] || {};
      return {
        symbol, name: fund.name, type: 'fund', sector: fund.type, broker: 'Meezan',
        isShariah: fund.isShariah, price: quote.price, ...analytics,
      };
    }
    const f = (window.FUNDAMENTALS_DB || {})[symbol] || {};
    if (intl || crypto) {
      return {
        symbol,
        name: intl?.name || crypto?.name || symbol,
        type: crypto ? 'crypto' : 'intl',
        sector: intl?.sector || 'Global',
        currency: intl?.currency || crypto?.currency || 'USD',
        price: quote.price,
        marketCap: intl?.marketCap,
      };
    }
    return {
      symbol,
      name: stock?.name || symbol,
      type: 'stock',
      sector: stock?.sector || 'Other',
      isShariah: stock?.isShariah,
      price: quote.price,
      marketCap: f.marketCap,
      shares: f.shares,
    };
  }

  function getFundamentals(symbol) {
    if (isFund(symbol)) {
      const a = (window.FUND_ANALYTICS_DB || {})[symbol] || {};
      const fund = _fundMeta(symbol);
      return {
        type: 'fund',
        nav: MarketDataService.getQuote(symbol).price,
        category: a.category,
        expenseRatio: a.expenseRatio,
        ytdReturn: a.ytdReturn,
        oneYearReturn: a.oneYearReturn,
        threeYearReturn: a.threeYearReturn,
        divYield: a.divYield,
        sharpe: a.sharpe,
        beta: a.beta,
        name: fund?.name,
      };
    }
    const intl = (window.INTL_STOCKS || []).find(s => s.symbol === symbol);
    const crypto = (window.CRYPTO_ASSETS || []).find(c => c.symbol === symbol);
    if (intl || crypto) {
      const st = State.get()?.prices?.[symbol] || {};
      const pe = st.trailingPE;
      const divYield = st.dividendYield;
      const has = pe > 0 || divYield > 0;
      return {
        type: crypto ? 'crypto' : 'intl',
        available: has,
        pe: pe > 0 ? pe : null,
        divYield: divYield > 0 ? divYield : null,
        roe: null,
        eps: null,
      };
    }
    const f = (window.FUNDAMENTALS_DB || {})[symbol];
    if (!f) return { type: 'stock', available: false };
    const quote = MarketDataService.getQuote(symbol);
    return {
      type: 'stock',
      available: true,
      marketCap: f.marketCap,
      pe: f.pe,
      pb: f.pb,
      roe: f.roe,
      roa: f.roa,
      eps: f.eps,
      divYield: f.divYield,
      payout: f.payout,
      revGrowth: f.revGrowth,
      profitGrowth: f.profitGrowth,
      debtToEquity: f.debtToEquity,
      freeCashFlow: f.freeCashFlow,
      bookValue: f.bookValue,
      priceToSales: f.marketCap && f.revGrowth ? null : null,
      evEbitda: null,
      fairValuePe: f.eps && f.pe ? f.eps * (f.pe * 0.95) : null,
      currentPrice: quote.price,
    };
  }

  function listSymbols() {
    const fromHoldings = Ledger.calcHoldings(State.get('transactions') || []).map(h => h.symbol);
    const fromFunds = Ledger.calcFundHoldings(State.get('transactions') || []).map(f => f.symbol);
    const fromGlobal = Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(State.get('transactions') || []).map(h => h.symbol) : [];
    const fromWatch = (State.get('watchlist') || []).map(w => w.symbol);
    const fromDb = Object.keys(window.FUNDAMENTALS_DB || {});
    const fromIntl = (window.INTL_STOCKS || []).slice(0, 120).map(s => s.symbol);
    return [...new Set([...fromHoldings, ...fromFunds, ...fromGlobal, ...fromWatch, ...fromDb, ...fromIntl])].sort();
  }

  return { getProfile, getFundamentals, isFund, listSymbols };
})();
window.StockService = StockService;

;/* === js/services/portfolio-buckets-service.js === */
'use strict';
const PortfolioBuckets = (() => {
  // Account numbers intentionally omitted from labels — they render on-screen
  // (screenshots, demos, screen-share). Keep identifiers in your broker portal.
  const BUILTIN = [
    { id: 'rafi', name: 'Rafi Securities', kind: 'psx', brokerFilter: 'Rafi', icon: 'R', builtin: true, desc: 'PSX broker · CDC sub-account' },
    { id: 'akd', name: 'AKD Securities', kind: 'psx', brokerFilter: 'AKD', icon: 'A', builtin: true, desc: 'PSX broker account' },
    { id: 'cdc', name: 'CDC Custody', kind: 'psx', brokerFilter: 'CDC', icon: 'C', builtin: true, desc: 'Central depository · IPO allotments' },
    { id: 'funds', name: 'Al Meezan Investments', kind: 'funds', icon: 'M', builtin: true, desc: 'Meezan AMC mutual funds' },
    { id: 'usa', name: 'US Equities', kind: 'intl', icon: 'U', builtin: true, desc: 'IBKR · US stocks & crypto' },
  ];

  function _brokerMatch(txBroker, filter) {
    if (!filter) return true;
    const b = String(txBroker || '').toLowerCase();
    const f = String(filter).toLowerCase();
    if (f === 'rafi') return b === 'rafi' || b.includes('6773');
    if (f === 'akd') return b === 'akd' || b.includes('coaf');
    if (f === 'cdc') return b === 'cdc';
    return b === f;
  }

  function inferPsxBucketId(tx) {
    const b = String(tx?.broker || '').toLowerCase();
    if (tx?.type === 'IPO_SUBSCRIBE') return 'cdc';
    if (b === 'akd' || b.includes('coaf')) return 'akd';
    if (b === 'cdc') return 'cdc';
    return 'rafi';
  }

  function inferBuiltinId(tx) {
    const t = tx?.type || '';
    if (['CONTRIBUTION', 'FUND_OUT', 'REDEMPTION'].includes(t)) return 'funds';
    if (['INTL_BUY', 'INTL_SELL'].includes(t) || tx.assetClass === 'intl') return 'usa';
    if (['CRYPTO_BUY', 'CRYPTO_SELL'].includes(t) || tx.assetClass === 'crypto') return 'usa';
    if (['BUY', 'SELL', 'DIVIDEND', 'IPO_SUBSCRIBE'].includes(t) && tx.symbol) return inferPsxBucketId(tx);
    return null;
  }

  function list(state) {
    state = state || (typeof State !== 'undefined' ? State.get() : {});
    const custom = (state.portfolios || []).map(p => ({
      ...p,
      builtin: false,
      icon: p.icon || (p.kind === 'intl' ? '🇺🇸' : p.kind === 'crypto' ? '₿' : p.kind === 'funds' ? '☪' : '🇵🇰'),
      desc: p.desc || 'Custom ledger',
    }));
    return [...BUILTIN, ...custom];
  }

  function txsForBucket(state, bucketId) {
    const txs = state?.transactions || [];
    const bucket = list(state).find(b => b.id === bucketId);
    if (!bucket) return txs;
    if (bucket.builtin) {
      return txs.filter(t => !t.portfolioId && inferBuiltinId(t) === bucketId);
    }
    return txs.filter(t => t.portfolioId === bucketId);
  }

  function bucketCashPkr(bucketId) {
    if (bucketId === 'akd' && window.USER_AKD_CASH_PKR > 0) return window.USER_AKD_CASH_PKR;
    if (bucketId === 'rafi' && window.RAFI_BROKER_CASH_PKR > 0) return window.RAFI_BROKER_CASH_PKR;
    return 0;
  }

  function grossCashDeployed(state, bucketId) {
    const txs = txsForBucket(state, bucketId);
    if (bucketId === 'rafi' && window.RAFI_TOTAL_INVESTED_PKR > 0) {
      return { pkr: window.RAFI_TOTAL_INVESTED_PKR, usd: null, note: 'Your total capital deployed' };
    }
    if (bucketId === 'akd' && window.AKD_TOTAL_INVESTED_PKR > 0) {
      return { pkr: window.AKD_TOTAL_INVESTED_PKR, usd: null, note: 'Your AKD deposits (excl. friend custodial)' };
    }
    if (bucketId === 'funds' && window.MEEZAN_TOTAL_PURCHASES_PKR > 0) {
      return { pkr: window.MEEZAN_TOTAL_PURCHASES_PKR, usd: null, note: 'AMC total purchases' };
    }
    if (bucketId === 'usa') {
      const usd = window.TTWO_TOTAL_INVESTED_USD || txs
        .filter(t => ['INTL_BUY', 'CRYPTO_BUY'].includes(t.type) && !t.internal)
        .reduce((s, t) => s + (t.costUsd || (t.priceUsd || 0) * (t.shares || t.qty || 0)), 0);
      return { pkr: FxService.usdToPkr(usd), usd, note: 'IBKR cost basis (incl. fees)' };
    }
    const pkr = txs
      .filter(t => ['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type) && !t.internal)
      .reduce((s, t) => s + (t.amount || 0), 0);
    return { pkr, usd: null, note: 'Ledger purchases' };
  }

  function statsForBucket(state, bucketId) {
    const txs = txsForBucket(state, bucketId);
    const bucket = list(state).find(b => b.id === bucketId);
    if (!bucket) return { value: 0, invested: 0, pnl: 0, pnlPct: 0, positions: 0 };

    let rows = [];
    if (bucket.kind === 'psx') {
      rows = Ledger.calcHoldings(txs)
        .filter(h => !bucket.brokerFilter || _brokerMatch(h.broker, bucket.brokerFilter))
        .map(h => {
          const price = State.getPrice(h.symbol) || h.avgCost;
          return { value: h.shares * price, cost: h.shares * h.avgCost };
        });
    } else if (bucket.kind === 'funds') {
      rows = Ledger.calcFundHoldings(txs).map(f => {
        const nav = State.getPrice(f.symbol) || f.avgNav;
        return { value: f.units * nav, cost: f.totalInvested };
      });
    } else {
      rows = (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).map(h => {
        const price = State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0);
        const cost = h.qty * FxService.usdToPkr(h.avgCostUsd || 0);
        return { value: h.qty * price, cost };
      });
    }

    const stockValue = rows.reduce((s, r) => s + r.value, 0);
    const cashPkr = bucketCashPkr(bucketId);
    const value = stockValue + cashPkr;
    const invested = rows.reduce((s, r) => s + r.cost, 0);
    const deployed = grossCashDeployed(state, bucketId);
    const pnl = deployed.pkr > 0 ? value - deployed.pkr : value - invested;
    const pnlBase = deployed.pkr > 0 ? deployed.pkr : invested;
    return {
      value, stockValue, cashPkr, invested,
      deployedPkr: deployed.pkr, deployedUsd: deployed.usd, deployedNote: deployed.note,
      pnl,
      pnlPct: pnlBase > 0 ? (pnl / pnlBase) * 100 : 0,
      positions: rows.length,
    };
  }

  function investmentSummary(state) {
    state = state || (typeof State !== 'undefined' ? State.get() : {});
    const ids = ['rafi', 'akd', 'cdc', 'funds', 'usa'];
    const rows = ids.map(id => {
      const b = BUILTIN.find(x => x.id === id);
      const s = statsForBucket(state, id);
      return { id, name: b?.name || id, deployedNote: grossCashDeployed(state, id).note, ...s };
    });
    const totalDeployed = rows.reduce((sum, r) => sum + (r.deployedPkr || 0), 0);
    const totalValue = rows.reduce((sum, r) => sum + (r.value || 0), 0);
    return { rows, totalDeployed, totalValue };
  }

  function bucketSparkline(state, bucketId) {
    const txs = txsForBucket(state, bucketId);
    if (!txs.length || typeof Ledger === 'undefined' || !Ledger.portfolioValueTimeline) return [];
    const fp = window.FALLBACK_PRICES || {};
    const pts = Ledger.portfolioValueTimeline(txs, (sym, fb) => {
      const p = State.get()?.prices?.[sym]?.price;
      return (p && p > 0) ? p : (fp[sym] || fb || 0);
    });
    return pts.slice(-14).map(p => p.value).filter(v => v > 0);
  }

  function getHoldingsForBucket(state, bucketId) {
    const bucket = list(state).find(b => b.id === bucketId);
    if (!bucket) return PortfolioAnalyticsService.getHoldings(state);
    const txs = txsForBucket(state, bucketId);
    const slice = { ...state, transactions: txs };
    const all = PortfolioAnalyticsService.getHoldings(slice);
    if (bucket.builtin) {
      if (bucket.kind === 'psx') {
        return all.filter(h => h.kind === 'stock' && (!bucket.brokerFilter || _brokerMatch(h.broker, bucket.brokerFilter)));
      }
      if (bucket.id === 'funds') return all.filter(h => h.kind === 'fund');
      if (bucket.id === 'usa') return all.filter(h => h.kind === 'intl' || h.kind === 'crypto');
    }
    return all;
  }

  function defaultTxType(kind) {
    if (kind === 'funds') return 'CONTRIBUTION';
    if (kind === 'intl') return 'INTL_BUY';
    if (kind === 'crypto') return 'CRYPTO_BUY';
    return 'BUY';
  }

  function defaultBroker(bucketId) {
    const b = BUILTIN.find(x => x.id === bucketId);
    return b?.brokerFilter || null;
  }

  function cardsHtml(state, opts) {
    opts = opts || {};
    const activeId = opts.activeId || null;
    const click = opts.onClick || 'Hub.openPortfolio';
    const buckets = list(state);
    const cards = buckets.map(b => {
      const s = statsForBucket(state, b.id);
      const empty = s.positions === 0;
      const on = activeId === b.id ? ' on' : '';
      const spark = bucketSparkline(state, b.id);
      const sparkHtml = spark.length >= 2 && typeof Charts !== 'undefined'
        ? `<div class="lc-portfolio-spark">${Charts.lineChart(spark, { height: 24, width: 64, fill: false, color: s.pnl >= 0 ? LCBrand.h_22c55e : LCBrand.h_ef4444 })}</div>`
        : '';
      const del = !b.builtin
        ? `<button type="button" class="lc-portfolio-del" aria-label="Delete ${b.name}" data-action="App.deletePortfolio" data-tab="${b.id}" data-stop="1">×</button>`
        : '';
      // Two-line row (iOS Stocks style): name + positions/spark left,
      // value + one-line P&L right. Deployed detail lives in the drill-down.
      return `<button type="button" class="lc-portfolio-card${on}${empty ? ' lc-portfolio-card--empty' : ''}" data-action="${click}" data-tab="${b.id}" aria-label="${b.name}, ${empty ? 'empty' : PsxUI.fmt(s.value) + ', ' + s.positions + ' positions'}">
        ${del}
        <span class="lc-portfolio-card-icon" aria-hidden="true">${b.icon}</span>
        <div class="lc-portfolio-card-body">
          <strong>${b.name}</strong>
          <span class="lc-portfolio-card-desc">${empty ? b.desc : `${s.positions} position${s.positions === 1 ? '' : 's'}`}</span>
        </div>
        ${sparkHtml}
        <div class="lc-portfolio-card-meta">
          <em class="lc-portfolio-card-value lc-num">${empty ? '—' : PsxUI.fmt(s.value)}</em>
          ${!empty ? `<span class="lc-portfolio-pnl ${PsxUI.chgCls(s.pnl)}" title="${s.deployedPkr > 0 ? 'vs deployed ' + PsxUI.fmt(s.deployedPkr) : 'vs invested ' + PsxUI.fmt(s.invested)}">${PsxUI.fmt(s.pnl, { signed: true })} · ${PsxUI.fmt(s.pnlPct, { pct: true, signed: true })}</span>` : ''}
        </div>
      </button>`;
    }).join('');
    const add = `<button type="button" class="lc-portfolio-card lc-portfolio-card--add" data-action="App.openAddPortfolio" aria-label="Add portfolio">
      <span class="lc-portfolio-card-icon" aria-hidden="true">+</span>
      <div class="lc-portfolio-card-body"><strong>Add portfolio</strong><span class="lc-portfolio-card-desc">Custom USA · crypto · PSX ledger</span></div>
    </button>`;
    return cards + add;
  }

  function calcDailyPnlForTransactions(transactions) {
    const holdings = Ledger.calcHoldings(transactions);
    const funds = Ledger.calcFundHoldings(transactions);
    const stockPnl = holdings.reduce((sum, h) => {
      const curr = State.getPrice(h.symbol);
      const prev = State.getPrevClose(h.symbol);
      if (!curr || !prev) return sum;
      return sum + h.shares * (curr - prev);
    }, 0);
    const fundPnl = funds.reduce((sum, f) => {
      const curr = State.getPrice(f.symbol);
      const prev = State.getPrevClose(f.symbol);
      const nav = curr || prev || f.avgNav;
      const prevNav = prev || curr || f.avgNav;
      if (!nav || !prevNav) return sum;
      return sum + f.units * (nav - prevNav);
    }, 0);
    const globalPnl = (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(transactions) : []).reduce((sum, h) => {
      const curr = State.getPrice(h.symbol);
      const prev = State.getPrevClose(h.symbol);
      if (!curr || !prev) return sum;
      return sum + h.qty * (curr - prev);
    }, 0);
    return stockPnl + fundPnl + globalPnl;
  }

  function bucketBriefRows(state) {
    state = state || (typeof State !== 'undefined' ? State.get() : {});
    return BUILTIN.map((b) => {
      const s = statsForBucket(state, b.id);
      const txs = txsForBucket(state, b.id);
      const dailyPnl = calcDailyPnlForTransactions(txs);
      const dailyPct = s.value > 0 ? (dailyPnl / s.value) * 100 : 0;
      return {
        id: b.id,
        name: b.name,
        value: s.value,
        invested: s.invested,
        pnl: s.pnl,
        pnlPct: s.pnlPct,
        dailyPnl,
        dailyPct,
        positions: s.positions,
      };
    }).filter((r) => r.value > 0 || r.positions > 0);
  }

  return {
    BUILTIN, list, inferBuiltinId, inferPsxBucketId, txsForBucket, statsForBucket, bucketCashPkr, grossCashDeployed, investmentSummary,
    bucketSparkline, calcDailyPnlForTransactions, bucketBriefRows,
    getHoldingsForBucket, defaultTxType, defaultBroker, cardsHtml, _brokerMatch,
  };
})();
window.PortfolioBuckets = PortfolioBuckets;

;/* === js/engines/insights.js === */
'use strict';
const Insights = (() => {

  function generate(state) {
    const results = [];
    const transactions = state.transactions || [];
    const prices = state.prices || {};
    const holdings = Ledger.calcHoldings(transactions);
    const funds = Ledger.calcFundHoldings(transactions);
    const monthlyContrib = Ledger.monthlyContributions(transactions);
    const now = new Date();
    const thisMonth = now.toISOString().slice(0, 7);

    // 1. Excess cash warning
    const thisSalary = transactions.filter(t => t.type === 'SALARY' && (t.date || '').startsWith(thisMonth))
      .reduce((a, t) => a + (t.amount || 0), 0);
    const thisInvest = monthlyContrib[thisMonth] || 0;
    if (thisSalary > 0 && thisInvest === 0) {
      results.push({ icon: '⚠️', color: LCBrand.h_f0b90b, text: 'Salary received this month but no investments logged yet. Consider contributing now.', priority: 1 });
    }

    // 2. Contribution streak
    let streak = 0;
    for (let i = 0; i < 12; i++) {
      const m = new Date(now.getFullYear(), now.getMonth() - i, 1).toISOString().slice(0, 7);
      if (monthlyContrib[m] > 0) streak++; else break;
    }
    if (streak >= 3) {
      results.push({ icon: '🔥', color: LCBrand.h_ff6b35, text: `${streak}-month investment streak! Consistency is the most powerful wealth-building tool.`, priority: 3 });
    }

    // 3. Concentration risk
    const stockValues = holdings.map(h => ({ symbol: h.symbol, value: h.shares * (prices[h.symbol]?.price || 0) }));
    const totalStockVal = stockValues.reduce((a, s) => a + s.value, 0);
    const topHolding = stockValues.slice().sort((a, b) => b.value - a.value)[0];
    if (topHolding && totalStockVal > 0) {
      const pct = (topHolding.value / totalStockVal) * 100;
      if (pct > 25) {
        results.push({ icon: '📊', color: LCBrand.h_f6465d, text: `${topHolding.symbol} represents ${pct.toFixed(0)}% of your stock portfolio. High concentration — consider diversifying.`, priority: 2 });
      }
    }

    // 4. MIIF buffer suggestion
    const miifFunds = funds.filter(f => f.symbol === 'MIIF-B' || f.symbol === 'MIIF-MMKA');
    const miifVal = miifFunds.reduce((a, f) => {
      const nav = prices[f.symbol]?.price || 55.98;
      return a + f.units * nav;
    }, 0);
    if (miifVal > 200000) {
      results.push({ icon: '💡', color: LCBrand.h_1890ff, text: `MIIF buffer is ₨${Math.round(miifVal / 1000)}k. Consider converting ₨200k to KMIF for higher long-term returns.`, priority: 2 });
    }

    // 5. MEBL underweight
    const meblHolding = holdings.find(h => h.symbol === 'MEBL');
    const meblVal = meblHolding ? meblHolding.shares * (prices['MEBL']?.price || 489) : 0;
    if (meblVal < 100000) {
      results.push({ icon: '🏦', color: LCBrand.h_0ecb81, text: 'MEBL is your highest-conviction stock but position is small. Advisor recommends building to ₨200k+.', priority: 2 });
    }

    // 6. Savings rate (last 6 months)
    let totalSalary6m = 0, totalInvest6m = 0;
    for (let i = 0; i < 6; i++) {
      const m = new Date(now.getFullYear(), now.getMonth() - i, 1).toISOString().slice(0, 7);
      totalSalary6m += transactions.filter(t => t.type === 'SALARY' && (t.date || '').startsWith(m))
        .reduce((a, t) => a + (t.amount || 0), 0);
      totalInvest6m += monthlyContrib[m] || 0;
    }
    if (totalSalary6m > 0) {
      const rate = (totalInvest6m / totalSalary6m) * 100;
      if (rate > 30) {
        results.push({ icon: '⭐', color: LCBrand.h_0ecb81, text: `Investment rate is ${rate.toFixed(0)}% of income over 6 months. Excellent financial discipline.`, priority: 3 });
      } else if (rate < 15 && rate > 0) {
        results.push({ icon: '📉', color: LCBrand.h_f0b90b, text: `Investment rate is only ${rate.toFixed(0)}% of income. Target 30%+ for meaningful wealth building.`, priority: 2 });
      }
    }

    // 7. Portfolio all-time high
    const history = state.priceHistory || [];
    if (history.length > 5) {
      const current = history[history.length - 1]?.value || 0;
      const prevMax = Math.max(...history.slice(0, -1).map(h => h.value));
      if (current > prevMax && prevMax > 0) {
        results.push({ icon: '🏆', color: LCBrand.h_0ecb81, text: 'New portfolio all-time high! Your wealth is at its peak value.', priority: 1 });
      }
    }

    return results.sort((a, b) => a.priority - b.priority).slice(0, 5);
  }

  return { generate };
})();
window.Insights = Insights;

;/* === js/engines/analytics.js === */
'use strict';
const Analytics = (() => {

  function _staticMeta(symbol, broker) {
    return [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])]
      .find(s => s.symbol === symbol && (!broker || s.broker === broker));
  }

  function _sector(symbol, broker, sectorMap) {
    if (sectorMap && sectorMap[symbol]) return sectorMap[symbol];
    const meta = _staticMeta(symbol, broker);
    if (meta?.sector) return meta.sector;
    const mf = (window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol);
    return mf?.type || 'Other';
  }

  function _daysBetween(d1, d2) {
    return (new Date(d2) - new Date(d1)) / 86400000;
  }

  /** Newton-Raphson XIRR approximation */
  function xirr(cashflows, guess) {
    if (!cashflows || cashflows.length < 2) return null;
    const sorted = [...cashflows].sort((a, b) => a.date.localeCompare(b.date));
    const t0 = new Date(sorted[0].date).getTime();
    const flows = sorted.map(cf => ({
      amount: cf.amount,
      t: (_daysBetween(t0, cf.date)) / 365.25,
    }));
    let rate = guess != null ? guess : 0.1;
    for (let i = 0; i < 100; i++) {
      let f = 0;
      let df = 0;
      flows.forEach(({ amount, t }) => {
        const base = Math.pow(1 + rate, t);
        if (base === 0 || !isFinite(base)) return;
        f += amount / base;
        df -= (t * amount) / (base * (1 + rate));
      });
      if (Math.abs(f) < 1e-7) return rate;
      if (df === 0) break;
      const next = rate - f / df;
      if (!isFinite(next) || next <= -0.999) break;
      if (Math.abs(next - rate) < 1e-7) return next;
      rate = next;
    }
    return isFinite(rate) ? rate : null;
  }

  function buildCashflows(state) {
    const txs = state.transactions || [];
    const flows = [];
    txs.forEach(t => {
      if (!t.date) return;
      if (['BUY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'].includes(t.type)) {
        flows.push({ date: t.date, amount: -(t.amount || 0) });
      } else if (t.type === 'SELL') {
        flows.push({ date: t.date, amount: t.amount || 0 });
      } else if (t.type === 'DIVIDEND') {
        flows.push({ date: t.date, amount: t.amount || 0 });
      }
    });
    const today = new Date().toISOString().slice(0, 10);
    const totalValue = State.calcTotalValue();
    if (totalValue > 0) flows.push({ date: today, amount: totalValue });
    return flows;
  }

  function computeXirr(state) {
    const flows = buildCashflows(state);
    const invested = flows.filter(f => f.amount < 0).reduce((s, f) => s + Math.abs(f.amount), 0);
    if (invested <= 0 || flows.length < 2) return null;
    const rate = xirr(flows);
    return rate != null && isFinite(rate) ? rate : null;
  }

  function annualReturn(state) {
    const history = (state.priceHistory || []).filter(h => h.value > 0);
    if (history.length >= 2) {
      const first = history[0];
      const last = history[history.length - 1];
      const days = Math.max(1, _daysBetween(first.date, last.date));
      const years = days / 365.25;
      if (years >= 0.08 && first.value > 0) {
        return Math.pow(last.value / first.value, 1 / years) - 1;
      }
    }
    const x = computeXirr(state);
    return x;
  }

  function totalReturn(state) {
    const cost = State.calcTotalCost();
    // Return measures securities only — manual assets (broker cash, gold,
    // real estate) have no ledger cost basis and were inflating the pct.
    const manual = State.calcManualAssetsValue ? State.calcManualAssetsValue() : 0;
    const value = State.calcTotalValue() - manual;
    if (cost <= 0) return { abs: 0, pct: 0 };
    return { abs: value - cost, pct: ((value - cost) / cost) * 100 };
  }

  function assetAllocation(state) {
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    let stocks = 0;
    let fundVal = 0;
    holdings.forEach(h => {
      stocks += h.shares * (State.getPrice(h.symbol) || h.avgCost);
    });
    funds.forEach(f => {
      const nav = State.getPrice(f.symbol);
      const mf = (window.MEEZAN_FUNDS || []).find(m => m.symbol === f.symbol);
      fundVal += f.units * (nav || mf?.currentNav || f.avgNav);
    });
    let globalVal = 0;
    (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).forEach(h => {
      globalVal += h.qty * (State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0));
    });
    const total = stocks + fundVal + globalVal || 1;
    return {
      stocks, funds: fundVal, global: globalVal, total,
      stocksPct: (stocks / total) * 100,
      fundsPct: (fundVal / total) * 100,
      globalPct: (globalVal / total) * 100,
    };
  }

  function brokerAllocation(state) {
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    const map = {};
    holdings.forEach(h => {
      const b = h.broker || 'Other';
      map[b] = (map[b] || 0) + h.shares * (State.getPrice(h.symbol) || h.avgCost);
    });
    funds.forEach(f => {
      map['Meezan'] = (map['Meezan'] || 0) + f.units * (State.getPrice(f.symbol) || f.avgNav);
    });
    (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).forEach(h => {
      const b = h.broker || 'Global';
      const val = h.qty * (State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0));
      map[b] = (map[b] || 0) + val;
    });
    const total = Object.values(map).reduce((a, v) => a + v, 0) || 1;
    return Object.entries(map)
      .map(([broker, value]) => ({ broker, value, pct: (value / total) * 100 }))
      .sort((a, b) => b.value - a.value);
  }

  function sectorAllocation(state) {
    const sectorMap = state.sectorMap || {};
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    const map = {};
    holdings.forEach(h => {
      const sector = _sector(h.symbol, h.broker, sectorMap);
      map[sector] = (map[sector] || 0) + h.shares * (State.getPrice(h.symbol) || h.avgCost);
    });
    funds.forEach(f => {
      const sector = _sector(f.symbol, f.broker, sectorMap);
      const nav = State.getPrice(f.symbol) || f.avgNav;
      map[sector] = (map[sector] || 0) + f.units * nav;
    });
    const total = Object.values(map).reduce((a, v) => a + v, 0) || 1;
    return Object.entries(map)
      .map(([sector, value]) => ({ sector, value, pct: (value / total) * 100 }))
      .sort((a, b) => b.value - a.value);
  }

  function riskScore(state) {
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const prices = state.prices || {};
    let score = 35;
    const stockValues = holdings.map(h => ({
      symbol: h.symbol,
      value: h.shares * (prices[h.symbol]?.price || State.getPrice(h.symbol) || h.avgCost),
    }));
    const totalStock = stockValues.reduce((a, s) => a + s.value, 0);
    const top = stockValues.sort((a, b) => b.value - a.value)[0];
    if (top && totalStock > 0) {
      const conc = top.value / totalStock;
      if (conc > 0.35) score += 28;
      else if (conc > 0.25) score += 18;
      else if (conc > 0.15) score += 8;
    }
    const sectors = sectorAllocation(state);
    if (sectors.length <= 2) score += 15;
    else if (sectors.length <= 4) score += 8;
    const history = state.priceHistory || [];
    if (history.length >= 5) {
      const vals = history.map(h => h.value);
      const mean = vals.reduce((a, v) => a + v, 0) / vals.length;
      const variance = vals.reduce((a, v) => a + Math.pow(v - mean, 2), 0) / vals.length;
      const cv = mean > 0 ? Math.sqrt(variance) / mean : 0;
      if (cv > 0.08) score += 12;
      else if (cv > 0.04) score += 6;
    }
    const shariahVal = holdings.reduce((sum, h) => {
      const meta = _staticMeta(h.symbol, h.broker);
      if (!meta?.isShariah) return sum;
      return sum + h.shares * (State.getPrice(h.symbol) || h.avgCost);
    }, 0);
    const total = State.calcTotalValue() || 1;
    const nonShariahPct = 1 - shariahVal / total;
    if (nonShariahPct > 0.5) score += 10;
    return Math.min(100, Math.max(0, Math.round(score)));
  }

  function portfolioHealth(state) {
    const settings = state.settings || {};
    const risk = riskScore(state);
    const ret = totalReturn(state);
    const x = computeXirr(state);
    const target = settings.targetReturn || 0.18;
    const streak = _contribStreak(state);
    let health = 72;
    if (ret.pct >= target * 100) health += 12;
    else if (ret.pct >= target * 50) health += 6;
    else if (ret.pct < 0) health -= 15;
    if (x != null && x >= target) health += 8;
    health -= Math.round(risk * 0.25);
    health += Math.min(12, streak * 2);
    const sipPct = _sipProgress(state);
    if (sipPct >= 100) health += 8;
    else if (sipPct < 50) health -= 6;
    return Math.min(100, Math.max(0, Math.round(health)));
  }

  function _contribStreak(state) {
    const monthly = Ledger.monthlyContributions(state.transactions || []);
    const now = new Date();
    let streak = 0;
    for (let i = 0; i < 12; i++) {
      const m = new Date(now.getFullYear(), now.getMonth() - i, 1).toISOString().slice(0, 7);
      if (monthly[m] > 0) streak++;
      else break;
    }
    return streak;
  }

  function _sipProgress(state) {
    const settings = state.settings || {};
    const target = settings.targetSIP || 75000;
    const contrib = Ledger.currentMonthContribution(state.transactions || []);
    return target > 0 ? (contrib / target) * 100 : 0;
  }

  function aiSummary(state) {
    const ret = totalReturn(state);
    const health = portfolioHealth(state);
    const risk = riskScore(state);
    const x = computeXirr(state);
    const divs = State.getTotalDividends();
    const daily = State.calcDailyPnl();
    const parts = [];
    parts.push(`Portfolio health ${health}/100 with risk score ${risk}/100.`);
    if (ret.pct >= 0) parts.push(`Total return ${ret.pct.toFixed(1)}% on invested capital.`);
    else parts.push(`Portfolio is down ${Math.abs(ret.pct).toFixed(1)}% from cost basis.`);
    if (x != null) parts.push(`XIRR approximates ${(x * 100).toFixed(1)}% annualised.`);
    if (divs > 0) parts.push(`Lifetime dividends ${Math.round(divs).toLocaleString()} PKR collected.`);
    if (daily !== 0) parts.push(`Today's move ${daily >= 0 ? '+' : ''}${Math.round(daily).toLocaleString()} PKR.`);
    return parts.join(' ');
  }

  function dashboardMetrics(state) {
    const ret = totalReturn(state);
    return {
      totalValue: State.calcTotalValue(),
      totalCost: State.calcTotalCost(),
      dailyPnl: State.calcDailyPnl(),
      totalReturn: ret,
      annualReturn: annualReturn(state),
      xirr: computeXirr(state),
      dividendIncome: State.getTotalDividends(),
      portfolioHealth: portfolioHealth(state),
      riskScore: riskScore(state),
      assetAllocation: assetAllocation(state),
      sectorAllocation: sectorAllocation(state),
      brokerAllocation: brokerAllocation(state),
      aiSummary: aiSummary(state),
      insights: (typeof Insights !== 'undefined' && Insights.generate) ? Insights.generate(state) : [],
      sipProgress: _sipProgress(state),
    };
  }

  function scenarioPrices(symbol, currentPrice) {
    const advisor = (window.ADVISOR_RATINGS || {})[symbol];
    const target = advisor?.target;
    const base = currentPrice || (window.FALLBACK_PRICES || {})[symbol] || 0;
    if (!base) return { bull: 0, base: 0, bear: 0 };
    const bull = target ? target * 1.12 : base * 1.25;
    const bear = base * 0.78;
    const mid = target || base * 1.08;
    return { bull: Math.round(bull * 100) / 100, base: Math.round(mid * 100) / 100, bear: Math.round(bear * 100) / 100 };
  }

  return {
    xirr, buildCashflows, computeXirr, annualReturn, totalReturn,
    assetAllocation, brokerAllocation, sectorAllocation,
    riskScore, portfolioHealth, aiSummary, dashboardMetrics, scenarioPrices,
  };
})();
window.Analytics = Analytics;

;/* === js/services/portfolio-analytics-service.js === */
'use strict';
const PortfolioAnalyticsService = (() => {

  function _clampScore(n) {
    if (n == null || Number.isNaN(n)) return 0;
    return Math.max(0, Math.min(100, Math.round(n)));
  }

  function _realizedFromLedger(txs) {
    return typeof Ledger !== 'undefined' && Ledger.realisedPnl
      ? Ledger.realisedPnl(txs)
      : 0;
  }

  function getSummary(state) {
    state = state || State.get();
    const txs = state.transactions || [];
    if (typeof Analytics === 'undefined' || typeof Analytics.dashboardMetrics !== 'function') {
      return {
        totalValue: 0, invested: 0, unrealized: 0, realized: 0,
        holdings: [], funds: [], portfolioDivYield: 0, brokers: {}, geoAllocation: []
      };
    }
    const m = Analytics.dashboardMetrics(state);
    const totalValue = m.totalValue;
    const invested = m.totalCost;
    const unrealized = m.totalReturn.abs;
    const realized = _realizedFromLedger(txs);
    const divs = (typeof DividendService !== 'undefined' && DividendService.getPortfolioDividends)
      ? DividendService.getPortfolioDividends()
      : { annual: 0, totalReceived: 0, ytd: 0, count: 0 };

    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    let portfolioDivYield = 0;
    let weightedYield = 0;
    holdings.forEach(h => {
      const val = h.shares * (State.getPrice(h.symbol) || h.avgCost);
      const f = (window.FUNDAMENTALS_DB || {})[h.symbol];
      if (f?.divYield && totalValue > 0) {
        weightedYield += (val / totalValue) * f.divYield;
      }
    });
    funds.forEach(f => {
      const nav = State.getPrice(f.symbol) || f.avgNav;
      const val = f.units * nav;
      const fa = (window.FUND_ANALYTICS_DB || {})[f.symbol];
      if (fa?.divYield && totalValue > 0) weightedYield += (val / totalValue) * fa.divYield;
    });
    portfolioDivYield = weightedYield;

    const brokers = {};
    holdings.forEach(h => {
      const b = h.broker || 'Other';
      brokers[b] = (brokers[b] || 0) + h.shares * (State.getPrice(h.symbol) || h.avgCost);
    });
    funds.forEach(f => {
      brokers['Meezan'] = (brokers['Meezan'] || 0) + f.units * (State.getPrice(f.symbol) || f.avgNav);
    });
    (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).forEach(h => {
      const b = h.broker || 'Global';
      const val = h.qty * (State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0));
      brokers[b] = (brokers[b] || 0) + val;
    });

    const geo = { pk: 0, us: 0, crypto: 0, cash: 0, other: 0 };
    holdings.forEach(h => {
      geo.pk += h.shares * (State.getPrice(h.symbol) || h.avgCost);
    });
    funds.forEach(f => {
      geo.pk += f.units * (State.getPrice(f.symbol) || f.avgNav);
    });
    (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).forEach(h => {
      const val = h.qty * (State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0));
      if (h.assetClass === 'crypto') geo.crypto += val;
      else geo.us += val;
    });
    const ma = state.manualAssets || {};
    geo.cash += Ledger.cashBalance(txs) + (ma.usdCash || 0) * FxService.getUsdRate();
    geo.other += (ma.goldGrams || 0) * (state.settings?.goldPricePerGram || 18000) + (ma.realEstate || 0);
    const geoTotal = Object.values(geo).reduce((a, v) => a + v, 0) || 1;
    const geoAllocation = [
      { label: 'Pakistan', value: geo.pk, pct: (geo.pk / geoTotal) * 100 },
      { label: 'US / Intl', value: geo.us, pct: (geo.us / geoTotal) * 100 },
      { label: 'Crypto', value: geo.crypto, pct: (geo.crypto / geoTotal) * 100 },
      { label: 'Cash', value: geo.cash, pct: (geo.cash / geoTotal) * 100 },
      { label: 'Other', value: geo.other, pct: (geo.other / geoTotal) * 100 },
    ].filter(g => g.value > 0).sort((a, b) => b.value - a.value);

    return {
      totalValue, invested, unrealized, realized,
      totalReturn: m.totalReturn, xirr: m.xirr,
      portfolioDivYield, dividendIncome: divs.annual,
      health: m.portfolioHealth, risk: m.riskScore,
      assetAllocation: m.assetAllocation,
      sectorAllocation: m.sectorAllocation,
      brokerAllocation: m.brokerAllocation,
      geoAllocation,
      brokers,
    };
  }

  function _dayPnlForStock(shares, symbol, fallbackPrice) {
    const curr = State.getPrice(symbol) || fallbackPrice || 0;
    const prev = State.getPrevClose(symbol) || curr;
    if (!curr || !prev || !shares) return { dailyPnl: 0, dailyPnlPct: 0 };
    const dailyPnlPct = prev > 0 ? ((curr - prev) / prev) * 100 : 0;
    return { dailyPnl: shares * (curr - prev), dailyPnlPct };
  }

  function getHoldings(state) {
    state = state || State.get();
    const txs = state.transactions || [];
    const total = State.calcTotalValue() || 1;
    const stockRows = Ledger.calcHoldings(txs).map(h => {
      const price = State.getPrice(h.symbol) || h.avgCost;
      const val = h.shares * price;
      const cost = h.shares * h.avgCost;
      const pnl = val - cost;
      const pnlPct = h.avgCost > 0 ? ((price - h.avgCost) / h.avgCost) * 100 : 0;
      const { dailyPnl, dailyPnlPct } = _dayPnlForStock(h.shares, h.symbol, price);
      const alloc = (val / total) * 100;
      const f = (window.FUNDAMENTALS_DB || {})[h.symbol];
      const ai = (typeof AIAnalysis !== 'undefined' && AIAnalysis.analyze)
        ? AIAnalysis.analyze(h.symbol)
        : { action: null, confidence: 0 };
      const meta = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === h.symbol && s.broker === h.broker);
      return {
        symbol: h.symbol, name: meta?.name || h.symbol, broker: h.broker,
        kind: 'stock', quantity: h.shares, avgCost: h.avgCost, price, value: val, costBasis: cost,
        pnl, pnlPct, dailyPnl, dailyPnlPct, allocPct: alloc,
        divYield: f?.divYield || 0,
        yieldOnCost: (typeof DividendService !== 'undefined' && DividendService.getYieldOnCost)
          ? DividendService.getYieldOnCost(h.symbol, h.avgCost, h.shares) : 0,
        aiRating: ai.action, aiConfidence: ai.confidence, sector: meta?.sector,
      };
    });

    const fundRows = Ledger.calcFundHoldings(txs).map(f => {
      const nav = State.getPrice(f.symbol) || f.avgNav;
      const val = f.units * nav;
      const pnl = val - f.totalInvested;
      const pnlPct = f.avgNav > 0 ? ((nav - f.avgNav) / f.avgNav) * 100 : 0;
      const { dailyPnl, dailyPnlPct } = _dayPnlForStock(f.units, f.symbol, nav);
      const mf = (window.MEEZAN_FUNDS || []).find(m => m.symbol === f.symbol);
      const fa = (window.FUND_ANALYTICS_DB || {})[f.symbol];
      const ai = (typeof AIAnalysis !== 'undefined' && AIAnalysis.analyze)
        ? AIAnalysis.analyze(f.symbol)
        : { action: null, confidence: 0 };
      return {
        symbol: f.symbol, name: mf?.name || f.symbol, broker: 'Meezan',
        kind: 'fund', quantity: f.units, avgCost: f.avgNav, price: nav, value: val, costBasis: f.totalInvested,
        pnl, pnlPct, dailyPnl, dailyPnlPct, allocPct: (val / total) * 100,
        divYield: fa?.divYield || 0, yieldOnCost: null,
        aiRating: ai.action, aiConfidence: ai.confidence, sector: mf?.type,
      };
    });

    const globalRows = (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).map(h => {
      const price = State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0);
      const val = h.qty * price;
      const cost = h.qty * FxService.usdToPkr(h.avgCostUsd || 0);
      const pnl = val - cost;
      const pnlPct = h.avgCostUsd > 0 ? ((FxService.pkrToUsd(price) - h.avgCostUsd) / h.avgCostUsd) * 100 : 0;
      const { dailyPnl, dailyPnlPct } = _dayPnlForStock(h.qty, h.symbol, price);
      const meta = [...(window.INTL_STOCKS || []), ...(window.CRYPTO_ASSETS || [])].find(x => x.symbol === h.symbol);
      return {
        symbol: h.symbol, name: meta?.name || h.symbol, broker: h.broker,
        kind: h.assetClass === 'crypto' ? 'crypto' : 'intl', quantity: h.qty,
        avgCost: h.avgCostUsd, price, value: val, costBasis: cost,
        pnl, pnlPct, dailyPnl, dailyPnlPct, allocPct: (val / total) * 100,
        divYield: 0, yieldOnCost: null,
        aiRating: '—', aiConfidence: 0, sector: h.assetClass === 'crypto' ? 'Crypto' : 'US',
      };
    });

    return [...stockRows, ...fundRows, ...globalRows].sort((a, b) => b.value - a.value);
  }

  function getWinnersLosers(state) {
    const rows = getHoldings(state);
    const stocks = rows.filter(r => r.kind === 'stock');
    const sorted = [...stocks].sort((a, b) => b.pnlPct - a.pnlPct);
    return {
      winners: sorted.filter(r => r.pnlPct > 0).slice(0, 3),
      losers: sorted.filter(r => r.pnlPct < 0).slice(-3).reverse(),
    };
  }

  function getIntelligence(state) {
    state = state || State.get();
    const summary = getSummary(state);
    const insights = [];
    const sectors = summary.sectorAllocation || [];
    const holdings = getHoldings(state);

    const topSector = sectors[0];
    if (topSector && topSector.pct > 35) {
      insights.push({ type: 'risk', severity: 'high', text: `${topSector.sector} allocation at ${topSector.pct.toFixed(0)}% — sector concentration elevated.`, action: 'Rebalance into underweight sectors.' });
    }

    const banking = sectors.find(s => s.sector === 'Banking');
    if (banking && banking.pct > 25) {
      insights.push({ type: 'sector', severity: 'medium', text: `Banking exposure ${banking.pct.toFixed(0)}% — monitor rate cycle and credit risk.`, action: 'Consider diversifying into industrials or tech.' });
    }

    const tech = sectors.find(s => s.sector === 'Technology');
    if (!tech || tech.pct < 5) {
      insights.push({ type: 'opportunity', severity: 'low', text: 'Technology exposure below 5% — growth sleeve underweight.', action: 'Evaluate TRG or KMIF for tech/growth exposure.' });
    }

    const top = holdings[0];
    if (top && top.allocPct > 20) {
      insights.push({ type: 'concentration', severity: 'high', text: `${top.symbol} is ${top.allocPct.toFixed(0)}% of portfolio — single-name concentration risk.`, action: 'Trim or add complementary positions.' });
    }

    holdings.filter(h => h.divYield > 0).forEach(h => {
      const growth = (typeof DividendService !== 'undefined' && DividendService.getDividendGrowth)
        ? DividendService.getDividendGrowth(h.symbol) : null;
      if (growth != null && growth < 2) {
        insights.push({ type: 'dividend', severity: 'medium', text: `${h.symbol} dividend growth slowing (${growth.toFixed(1)}% CAGR).`, action: 'Review payout sustainability in Research.' });
      }
    });

    if (summary.portfolioDivYield < 4 && summary.invested > 500000) {
      insights.push({ type: 'income', severity: 'low', text: `Portfolio yield ${summary.portfolioDivYield.toFixed(1)}% — income generation below target.`, action: 'Add high-yield names like MEBL, OGDC, or MIIF.' });
    }

    const ruleInsights = (typeof Insights !== 'undefined' && Insights.generate) ? (Insights.generate(state) || []) : [];
    const growthNames = holdings.filter(h => {
      const g = (window.FUNDAMENTALS_DB || {})[h.symbol]?.profitGrowth;
      return g != null && g > 10;
    }).length;
    return {
      summary, insights, ruleInsights,
      scores: {
        health: _clampScore(summary.health),
        risk: _clampScore(summary.risk),
        diversification: _clampScore(sectors.length * 12),
        dividendQuality: _clampScore(summary.portfolioDivYield * 8),
        growthQuality: _clampScore(Math.min(8, growthNames) * 12.5),
      },
    };
  }

  return { getSummary, getHoldings, getWinnersLosers, getIntelligence };
})();
window.PortfolioAnalyticsService = PortfolioAnalyticsService;

;/* === js/services/fx-service.js === */
'use strict';
/** USD/PKR — ExchangeRate-API (free, no key) + optional LedgerCap worker fallback. */
const FxService = (() => {
  let _usdPkr = null;
  let _ts = 0;
  let _source = 'default';
  let _updatedAt = null;

  const FREE_FX_URL = 'https://open.er-api.com/v6/latest/USD';
  const CACHE_MS = 3600000;

  function _appState() {
    return (typeof window !== 'undefined' && window.State) ? window.State : null;
  }

  function getUsdRate() {
    const s = _appState()?.get('settings') || {};
    return s?.usdRate || _usdPkr || 280;
  }

  function getMeta() {
    return { source: _source, updatedAt: _updatedAt, rate: getUsdRate() };
  }

  function usdToPkr(usd) {
    return (usd || 0) * getUsdRate();
  }

  function pkrToUsd(pkr) {
    const r = getUsdRate();
    return r > 0 ? (pkr || 0) / r : 0;
  }

  function _persistRate(rate, source) {
    if (!(rate > 0)) return false;
    _usdPkr = rate;
    _ts = Date.now();
    _source = source;
    _updatedAt = new Date().toISOString();
    if (_appState()) {
      _appState().update(s => {
        s.settings.usdRate = rate;
        s.settings.usdRateSource = source;
        s.settings.usdRateUpdatedAt = _updatedAt;
      });
    }
    return true;
  }

  async function _fetchOpenErApi() {
    const res = await fetch(FREE_FX_URL, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`FX HTTP ${res.status}`);
    const j = await res.json();
    const rate = j?.rates?.PKR;
    if (!(rate > 0)) throw new Error('PKR rate missing');
    _persistRate(rate, 'ExchangeRate-API');
    return rate;
  }

  async function _fetchWorkerProxy() {
    const bases = window.LedgerCapConfig?.psxProxyBases?.() || [window.LEDGERCAP_CONFIG?.psxProxyUrl].filter(Boolean);
    for (const base of bases) {
      try {
        const res = await fetch(`${base.replace(/\/$/, '')}/fx/usdpkr`, { headers: { Accept: 'application/json' } });
        if (!res.ok) continue;
        const j = await res.json();
        if (j?.rate > 0 && _persistRate(j.rate, 'LedgerCap worker')) return j.rate;
      } catch (_) {}
    }
    return null;
  }

  async function _fetchFrankfurter() {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=PKR', { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Frankfurter HTTP ${res.status}`);
    const j = await res.json();
    const rate = j?.rates?.PKR;
    if (!(rate > 0)) throw new Error('PKR rate missing');
    _persistRate(rate, 'Frankfurter');
    return rate;
  }

  async function refreshUsdPkr() {
    if (Date.now() - _ts < CACHE_MS && _usdPkr) return _usdPkr;
    try {
      return await _fetchOpenErApi();
    } catch (_) {
      try {
        return await _fetchFrankfurter();
      } catch (_) {
        const worker = await _fetchWorkerProxy();
        if (worker) return worker;
      }
    }
    return getUsdRate();
  }

  function fmtUsdPkr(usd, opts) {
    opts = opts || {};
    const pkr = usdToPkr(usd);
    const usdStr = '$' + Number(usd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const pkrStr = typeof PsxUI !== 'undefined'
      ? PsxUI.fmt(pkr)
      : '₨' + Math.round(pkr).toLocaleString('en-PK');
    if (opts.pkrOnly) return pkrStr;
    if (opts.usdOnly) return usdStr;
    return `${usdStr} · ${pkrStr}`;
  }

  return { getUsdRate, getMeta, usdToPkr, pkrToUsd, refreshUsdPkr, fmtUsdPkr, setUsdRate: _persistRate };
})();
window.FxService = FxService;

;/* === js/services/psx-session.js === */
'use strict';
/** PSX session clock — Asia/Karachi, weekdays 9:15–15:45 */
const PsxSession = (() => {
  const TZ = 'Asia/Karachi';
  const OPEN_MIN = 9 * 60 + 15;
  const CLOSE_MIN = 15 * 60 + 45;

  function pktParts(now) {
    now = now || new Date();
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    const parts = fmt.formatToParts(now);
    const get = (t) => parts.find((p) => p.type === t)?.value;
    const weekday = get('weekday') || '';
    const hour = parseInt(get('hour') || '0', 10);
    const minute = parseInt(get('minute') || '0', 10);
    const dateKey = new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(now);
    return { weekday, hour, minute, dateKey, mins: hour * 60 + minute };
  }

  function isWeekday(pkt) {
    pkt = pkt || pktParts();
    return pkt.weekday && !['Sat', 'Sun'].includes(pkt.weekday);
  }

  function isOpen(pkt) {
    pkt = pkt || pktParts();
    if (!isWeekday(pkt)) return false;
    return pkt.mins >= OPEN_MIN && pkt.mins < CLOSE_MIN;
  }

  function priceLabel(pkt) {
    pkt = pkt || pktParts();
    if (isOpen(pkt)) return 'Live';
    if (!isWeekday(pkt)) return 'Last close';
    if (pkt.mins < OPEN_MIN) return 'Pre-market';
    return 'Last close';
  }

  return { pktParts, isWeekday, isOpen, priceLabel };
})();
window.PsxSession = PsxSession;

;/* === js/services/price-snapshot.js === */
'use strict';
/** Worker KV snapshot → State.prices */
const PriceSnapshotService = (() => {
  const POLL_MS = 5 * 60 * 1000;
  let _timer = null;
  let _meta = { psxAt: null, usAt: null, cmdAt: null };

  function enabled() {
    const s = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    if (s.snapshotEnabled === false) return false;
    return window.LEDGERCAP_CONFIG?.snapshotEnabled !== false;
  }

  function _proxyBase() {
    const settings = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    const raw = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(settings.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || '').trim();
    return raw.replace(/\/$/, '');
  }

  async function _fetchSnapshot(bucket) {
    const base = _proxyBase();
    if (!base) return null;
    const url = `${base}/prices/snapshot?bucket=${encodeURIComponent(bucket || 'all')}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    return res.json();
  }

  function applyToState(data) {
    if (!data?.ok || typeof State === 'undefined') return 0;
    let n = 0;
    const rate = data.fx?.rate || (typeof FxService !== 'undefined' ? FxService.getUsdRate() : 280);

    if (data.catalog?.length && typeof PsxStocksCatalog !== 'undefined') {
      PsxStocksCatalog.hydrate(data.catalog);
    }

    if (data.psx?.quotes && typeof Prices !== 'undefined' && Prices.applySnapshotPsx) {
      n += Prices.applySnapshotPsx(data.psx.quotes);
    } else if (data.psx?.quotes) {
      Object.entries(data.psx.quotes).forEach(([sym, q]) => {
        if (!q?.price) return;
        State.updatePrice(sym, { ...q, source: q.source || 'snapshot-psx' });
        n++;
      });
    }

    if (data.us?.quotes && typeof Prices !== 'undefined' && Prices.applySnapshotUs) {
      n += Prices.applySnapshotUs(data.us.quotes, rate);
    } else if (data.us?.quotes) {
      Object.entries(data.us.quotes).forEach(([sym, q]) => {
        if (!(q?.priceUsd > 0)) return;
        State.updatePrice(sym, {
          priceUsd: q.priceUsd,
          prevCloseUsd: q.prevCloseUsd,
          price: q.priceUsd * rate,
          prevClose: (q.prevCloseUsd || q.priceUsd) * rate,
          source: q.source || 'snapshot-us',
          ts: q.ts || Date.now(),
        });
        n++;
      });
    }

    if (data.fx?.rate > 0 && typeof FxService !== 'undefined') {
      FxService.setUsdRate?.(data.fx.rate, data.fx.source);
    }

    if (data.commodities?.quotes) {
      window._LC_CMD_SNAPSHOT = data.commodities.quotes;
    }

    _meta = {
      psxAt: data.psx?.updatedAt || null,
      usAt: data.us?.updatedAt || null,
      cmdAt: data.commodities?.updatedAt || null,
      stale: data.stale || {},
      session: data.session || {},
    };
    window._LC_SNAPSHOT_META = _meta;

    if (n > 0 && typeof PriceHealth !== 'undefined') PriceHealth.mount();
    return n;
  }

  async function refresh(bucket) {
    if (!enabled()) return 0;
    try {
      const data = await _fetchSnapshot(bucket || 'all');
      return applyToState(data);
    } catch (_) {
      return 0;
    }
  }

  function init() {
    if (!enabled()) return;
    refresh('all');
    if (_timer) clearInterval(_timer);
    _timer = setInterval(() => refresh('all'), POLL_MS);
  }

  function meta() { return { ..._meta }; }

  function freshnessLabel() {
    const at = _meta.psxAt || _meta.usAt;
    if (!at) return '';
    const d = new Date(at);
    const pkt = d.toLocaleTimeString('en-PK', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit' });
    return `snapshot ${pkt} PKT`;
  }

  return { init, refresh, applyToState, meta, freshnessLabel, enabled };
})();
window.PriceSnapshotService = PriceSnapshotService;

;/* === js/ui/debounce.js === */
'use strict';
const LcDebounce = (() => {
  function debounce(fn, ms) {
    let t = null;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms || 150);
    };
  }
  return { debounce };
})();
window.LcDebounce = LcDebounce;

;/* === js/ui/dialogs.js === */
'use strict';
/* Accessible dialogs — replaces native alert/confirm/prompt calls (LDG-P1-04). */
(function () {
  function ensureStyles() {
    if (document.getElementById('lc-dialog-css')) return;
    const style = document.createElement('style');
    style.id = 'lc-dialog-css';
    style.textContent = `
.lc-dialog-backdrop{position:fixed;inset:0;background:rgba(10,10,12,.48);z-index:9000;display:flex;align-items:flex-end;justify-content:center;padding:max(12px,env(safe-area-inset-bottom))}
@media(min-width:560px){.lc-dialog-backdrop{align-items:center}}
.lc-dialog{width:min(100%,420px);background:var(--bg3);color:var(--text);border:1px solid var(--border,rgba(255,255,255,.12));border-radius:16px 16px 12px 12px;padding:18px 16px 14px;box-shadow:0 18px 48px rgba(0,0,0,.35)}
.lc-dialog h2{margin:0 0 8px;font:600 1.125rem/1.25 var(--font,system-ui);color:var(--text)}
.lc-dialog p{margin:0;font-size:.9375rem;line-height:1.45;color:var(--text2)}
.lc-dialog__actions{display:flex;gap:8px;justify-content:flex-end;margin-top:16px;flex-wrap:wrap}
.lc-dialog__actions .btn{min-height:44px;padding:0 14px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--bg2);color:var(--text);font:600 .9rem/1 system-ui}
.lc-dialog__actions .btn-primary{background:var(--accent);border-color:transparent;color:${LCBrand.h_fff}}
.lc-dialog input{width:100%;margin-top:12px;min-height:44px;border-radius:10px;border:1px solid var(--border);background:var(--bg2);color:var(--text);padding:0 12px;font-size:1rem;box-sizing:border-box}
`;
    document.head.appendChild(style);
  }

  function mountDialog({ title, body, input, confirmLabel, cancelLabel, destructive, showCancel }) {
    ensureStyles();
    return new Promise((resolve) => {
      const backdrop = document.createElement('div');
      backdrop.className = 'lc-dialog-backdrop';
      backdrop.setAttribute('role', 'presentation');
      const dialog = document.createElement('div');
      dialog.className = 'lc-dialog';
      dialog.setAttribute('role', 'alertdialog');
      dialog.setAttribute('aria-modal', 'true');
      dialog.setAttribute('aria-labelledby', 'lc-dlg-title');
      const h = document.createElement('h2');
      h.id = 'lc-dlg-title';
      h.tabIndex = -1;
      h.textContent = title || '';
      dialog.appendChild(h);
      if (body) {
        const p = document.createElement('p');
        p.textContent = body;
        dialog.appendChild(p);
      }
      let inputEl = null;
      if (input) {
        inputEl = document.createElement('input');
        inputEl.type = input.type || 'text';
        inputEl.autocomplete = 'off';
        inputEl.placeholder = input.placeholder || '';
        if (input.value != null) inputEl.value = String(input.value);
        dialog.appendChild(inputEl);
      }
      const actions = document.createElement('div');
      actions.className = 'lc-dialog__actions';
      const close = (val) => {
        backdrop.remove();
        window.removeEventListener('keydown', onKey);
        resolve(val);
      };
      const onKey = (e) => {
        if (e.key === 'Escape') close(input ? null : false);
        if (e.key === 'Enter' && inputEl && document.activeElement === inputEl) {
          e.preventDefault();
          close(inputEl.value);
        }
      };
      if (showCancel !== false) {
        const cancel = document.createElement('button');
        cancel.type = 'button';
        cancel.className = 'btn';
        cancel.textContent = cancelLabel || 'Cancel';
        cancel.addEventListener('click', () => close(input ? null : false));
        actions.appendChild(cancel);
      }
      const confirm = document.createElement('button');
      confirm.type = 'button';
      confirm.className = 'btn btn-primary';
      if (destructive) confirm.style.color = 'var(--danger)';
      confirm.textContent = confirmLabel || 'OK';
      confirm.addEventListener('click', () => close(input ? inputEl.value : true));
      actions.appendChild(confirm);
      dialog.appendChild(actions);
      backdrop.appendChild(dialog);
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) close(input ? null : false);
      });
      document.body.appendChild(backdrop);
      window.addEventListener('keydown', onKey);
      (inputEl || h).focus();
    });
  }

  window.CapConfirm = function CapConfirm(opts) {
    opts = opts || {};
    return mountDialog({
      title: opts.title,
      body: opts.body || '',
      confirmLabel: opts.confirmLabel || 'Confirm',
      cancelLabel: opts.cancelLabel || 'Cancel',
      destructive: !!opts.destructive,
      showCancel: true
    });
  };
  window.CapAlert = function CapAlert(opts) {
    opts = opts || {};
    return mountDialog({
      title: opts.title,
      body: opts.body || '',
      confirmLabel: opts.confirmLabel || 'OK',
      showCancel: false
    });
  };
  window.CapPrompt = function CapPrompt(opts) {
    opts = opts || {};
    return mountDialog({
      title: opts.title,
      body: opts.body || '',
      input: { placeholder: opts.placeholder || '', type: opts.type || 'text', value: opts.value },
      confirmLabel: opts.confirmLabel || 'OK',
      cancelLabel: opts.cancelLabel || 'Cancel',
      showCancel: true
    });
  };
})();

;/* === js/ui/lc-events.js === */
'use strict';
/** CSP-safe delegated UI actions — replaces inline onclick handlers. */
const LcEvents = (() => {
  const _segmentMap = {};

  function registerSegment(ns, fn) {
    if (ns && typeof fn === 'function') _segmentMap[ns] = fn;
  }

  function _parsePayload(el) {
    const raw = el.dataset.payload;
    if (!raw) return null;
    try { return JSON.parse(raw.replace(/&#39;/g, "'")); } catch { return null; }
  }

  function _call(path, el, ev) {
    const parts = path.split('.');
    let ctx = window;
    for (let i = 0; i < parts.length - 1; i++) ctx = ctx[parts[i]];
    const fn = ctx?.[parts[parts.length - 1]];
    if (typeof fn !== 'function') return false;
    if (el.dataset.stop) ev.stopPropagation();
    const sym = el.dataset.symbol || el.dataset.sym;
    const tab = el.dataset.tab || el.dataset.navTab || el.dataset.value;
    const mode = el.dataset.mode;
    const broker = el.dataset.broker;
    const payload = _parsePayload(el);

    if (path === 'Navigation.go') fn.call(ctx, tab || el.dataset.nav, false, {});
    else if (path === 'Research.open') fn.call(ctx, sym);
    else if (path === 'Research.pickSymbol') fn.call(ctx, sym);
    else if (path === 'Research.setMode') fn.call(ctx, mode);
    else if (path === 'Research._onSearch') fn.call(ctx, el.value);
    else if (path === 'PilotTools.render') fn.call(ctx, null, tab || el.dataset.value);
    else if (path === 'PilotTools.runScreen') fn.call(ctx, payload || {});
    else if (path === 'PilotTools.calc') fn.call(ctx, tab);
    else if (path === 'PilotTools.setTarget') fn.call(ctx, sym, broker, el.value);
    else if (path === 'PilotTools.setAcquired') fn.call(ctx, sym, broker, el.value);
    else if (path === 'Announcements.setTab') fn.call(ctx, tab || el.dataset.value);
    else if (path === 'Commodities.refresh') fn.call(ctx);
    else if (path === 'Global.setTab') fn.call(ctx, tab || el.dataset.value);
    else if (path === 'Dividends.toggleDrip') fn.call(ctx, sym, el.checked);
    else if (path === 'App.openAddTransaction') fn.call(ctx);
    else if (path === 'App.openAddPortfolio') fn.call(ctx);
    else if (path === 'App.closeBottomSheet') fn.call(ctx);
    else if (path === 'App.refreshPrices') fn.call(ctx);
    else if (path === 'App.dismissDemo') fn.call(ctx);
    else if (path === 'App.toggleDisplayCurrency') fn.call(ctx);
    else if (path === 'App.openPriceAlert') fn.call(ctx, sym);
    else if (path === 'PaperTrade.setTab') window.PaperTrade?.setTab(tab || el.dataset.value);
    else if (path === 'PaperTrade.openBuy') window.PaperTrade?.openBuy(sym);
    else if (path === 'PaperTrade.openSellRow') window.PaperTrade?.openSellRow(el);
    else if (path === 'PaperTrade._submitBuy') window.PaperTrade?._submitBuy();
    else if (path === 'PaperTrade._submitSell') window.PaperTrade?._submitSell(el);
    else if (path === 'PaperTrade.resetLedger') window.PaperTrade?.resetLedger();
    else if (path === 'LcTerminal.toggle') window.LcTerminal?.toggle();
    else if (path === 'LcEvents.closeProModal') document.getElementById('proUpgradeModal')?.classList.remove('open');
    else if (path === 'openProUpgrade') window.openProUpgrade?.();
    else if (path === 'window.toggleTheme') window.toggleTheme?.();
    else if (path === 'StatementExport.exportCgtPdf') StatementExport?.exportCgtPdf?.();
    else if (path === 'StatementExport.exportHtml') StatementExport?.exportHtml?.();
    else if (path === 'StatementExport.exportCsv') StatementExport?.exportCsv?.();
    else if (path === 'Watchlist.openAdd') window.Watchlist?.openAdd();
    else if (path === 'Journal.openNew') window.Journal?.openNew();
    else if (path === 'LcPolish.openCmdk') window.LcPolish?.openCmdk();
    else if (path === 'Performance.setTab') window.Performance?.setTab(tab);
    else if (path === 'Performance.setHistRange') window.Performance?.setHistRange(tab);
    else if (path === 'Navigation.goResearchIntel') {
      Research?.setMode?.('portfolio');
      Navigation.go('research', false, { portfolioIntel: true });
    }
    else if (path === 'Hub.openPortfolio') Hub?.openPortfolio?.(tab);
    else if (path === 'App.deletePortfolio') App?.deletePortfolio?.(tab);
    else if (path === 'App.openAddForPortfolio') App?.openAddForPortfolio?.(tab);
    else if (path === 'App.openSellHolding') App?.openSellHolding?.(sym, broker, tab);
    else if (path === 'App.reloadForUpdate') App?.reloadForUpdate?.();
    else if (path === 'PortfolioScreen.setSearch') PortfolioScreen?.setSearch?.(el.value);
    else if (path === 'PortfolioScreen.setSort') PortfolioScreen?.setSort?.(el.value);
    else if (path === 'PortfolioScreen.setViewMode') PortfolioScreen?.setViewMode?.(tab);
    else if (path === 'WhatsNew.dismiss') WhatsNew?.dismiss?.();
    else if (path === 'ImportCsv._preview') ImportCsv?._preview?.();
    else if (path === 'ImportCsv._confirm') ImportCsv?._confirm?.();
    else if (path === 'Settings._exportEncryptedBackup') Settings?._exportEncryptedBackup?.();
    else if (path === 'App._submitPriceAlert') App?._submitPriceAlert?.(sym);
    else if (path === 'PortfolioScreen.reconcile') PortfolioScreen?.reconcile?.(sym, broker, mode);
    else if (path === 'Transactions.openSymbol') Transactions?.openSymbol?.(sym);
    else if (path === 'Signals.setBook') Signals?.setBook?.(sym, broker, tab);
    else if (path === 'Watchlist.save') Watchlist?.save?.(tab);
    else if (path === 'Watchlist.openEdit') Watchlist?.openEdit?.(tab);
    else if (path === 'Watchlist.remove') Watchlist?.remove?.(tab);
    else if (path === 'Journal.remove') Journal?.remove?.(tab);
    else if (path === 'PriceHealth.dismiss') PriceHealth?.dismiss?.();
    else if (path === 'App.loadDemo') App?.loadDemo?.();
    else fn.call(ctx, el, ev);
    return true;
  }

  function _onClick(ev) {
    const ext = ev.target.closest('[data-external-url]');
    if (ext?.dataset.externalUrl) {
      ev.preventDefault();
      window.open(ext.dataset.externalUrl, '_blank', 'noopener');
      return;
    }
    const nav = ev.target.closest('[data-nav]');
    const inner = ev.target.closest('[data-action]');
    // A button inside a tappable card (e.g. Sell on a holding) wins over the card's own navigation
    const actionInsideNav = inner && nav && inner !== nav && nav.contains(inner);
    if (nav?.dataset.nav && window.Navigation && !actionInsideNav) {
      ev.preventDefault();
      Navigation.go(nav.dataset.nav);
      return;
    }
    const act = ev.target.closest('[data-action]');
    if (!act?.dataset.action) return;
    const action = act.dataset.action;
    if (action.includes('.')) {
      ev.preventDefault();
      _call(action, act, ev);
      return;
    }
    const seg = act.closest('[data-segment]');
    if (seg && _segmentMap[seg.dataset.segment]) {
      ev.preventDefault();
      _segmentMap[seg.dataset.segment](action);
    }
  }

  function _onChange(ev) {
    const el = ev.target;
    if (el.dataset.actionChange) {
      _call(el.dataset.actionChange, el, ev);
      return;
    }
    if (el.id === 'rt-search' && window.Research?._onSearch) Research._onSearch(el.value);
    if (el.id === 'global-search' && window.Global?._onSearch) Global._onSearch(el.value);
  }

  function _onInput(ev) {
    const el = ev.target;
    if (el.dataset.actionInput) {
      _call(el.dataset.actionInput, el, ev);
      return;
    }
    if (el.id === 'rt-search' && window.Research?._onSearch) Research._onSearch(el.value);
    if (el.id === 'global-search' && window.Global?._onSearch) Global._onSearch(el.value);
  }

  /* iOS/WebKit touch adjustment retargets a tap to the nearest node that handles clicks itself; elements served
   * only by this document-level delegate don't count, so taps landed on nearby buttons. Give each its own no-op. */
  const _tappable = new WeakSet();
  const _noop = function () {};
  const _TAPPABLE_SEL = '[data-action],[data-nav],[data-external-url]';
  function _markTappable(root) {
    if (!root || root.nodeType !== 1) return;
    const mark = (el) => { if (!_tappable.has(el)) { _tappable.add(el); el.addEventListener('click', _noop); } };
    if (root.matches(_TAPPABLE_SEL)) mark(root);
    root.querySelectorAll(_TAPPABLE_SEL).forEach(mark);
  }

  function init() {
    _markTappable(document.body);
    new MutationObserver((recs) => {
      for (const r of recs) {
        if (r.type === 'attributes') _markTappable(r.target);
        else r.addedNodes.forEach(_markTappable);
      }
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-action', 'data-nav'] });
    document.addEventListener('click', _onClick, true);
    document.addEventListener('change', _onChange, true);
    document.addEventListener('input', _onInput, true);
    registerSegment('Announcements', (id) => Announcements?.setTab?.(id));
    registerSegment('Global', (id) => Global?.setTab?.(id));
    registerSegment('PaperTrade', (id) => PaperTrade?.setTab?.(id));
  }

  return { init, registerSegment, _call, closeProModal: () => document.getElementById('proUpgradeModal')?.classList.remove('open') };
})();
window.LcEvents = LcEvents;

;/* === js/ui/icons.js === */
'use strict';
/** LedgerCap monochrome SVG icon registry (SF Symbol–style) */
const LcIcons = (() => {
  const PATHS = {
    home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z',
    chart: ['M3 3v18h18', 'M7 16l4-4 4 4 5-6'],
    wallet: ['M21 12V7H5a2 2 0 0 1 0-4h14v4', 'M3 5v14a2 2 0 0 0 2 2h16v-5', 'M18 12a2 2 0 1 0 0 4h4v-4h-4Z'],
    briefcase: ['M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', 'M2 8h20v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8Z'],
    search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M21 21l-4.3-4.3'],
    globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z'],
    moon: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z',
    sun: ['M12 2v2', 'M12 20v2', 'M4.93 4.93l1.41 1.41', 'M2 12h2', 'M20 12h2', 'M19.07 4.93l-1.41 1.41', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
    lock: ['M7 11V7a5 5 0 0 1 10 0v4', 'M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z'],
    settings: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z'],
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
    calendar: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'],
    list: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
    bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
    book: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z'],
    upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
    scale: ['M12 3v18', 'M5 7h14', 'M7 7l-2 5h4L7 7Z', 'M17 7l-2 5h4l-2-5Z'],
    trending: ['M22 7 13.5 15.5 8.5 10.5 2 17', 'M16 7h6v6'],
    journal: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z', 'M8 7h8', 'M8 11h8'],
    zap: 'M13 2 3 14h9l-1 8 10-12h-9l1-8Z',
    coins: ['M8 6h8', 'M6 10h12', 'M8 14h8', 'M12 18v4', 'M8 2h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8Z'],
    pie: ['M21.21 15.89A10 10 0 1 1 8 2.83', 'M22 12A10 10 0 0 0 12 2v10z'],
    fullscreen: ['M8 3H5a2 2 0 0 0-2 2v3', 'M21 8V5a2 2 0 0 0-2-2h-3', 'M3 16v3a2 2 0 0 0 2 2h3', 'M16 21h3a2 2 0 0 0 2-2v-3'],
    x: ['M18 6 6 18', 'M6 6l12 12'],
    ledger: ['M4 4h16v4H4z', 'M4 12h10', 'M4 20h16', 'M18 12h2'],
    star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z',
    banknote: ['M2 6h20v12H2z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M6 12h.01', 'M18 12h.01'],
    pulse: 'M22 12h-4l-3 9L9 3l-3 9H2',
    filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3Z',
    trendingDown: ['M22 17 13.5 8.5 8.5 13.5 2 7', 'M16 17h6v-6'],
    download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
    swap: ['M8 3 4 7l4 4', 'M4 7h16', 'M16 21l4-4-4-4', 'M20 17H4'],
    edit: 'M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z',
  };

  const TOOL_ICONS = {
    home: 'home',
    market: 'chart',
    portfolio: 'briefcase',
    funds: 'pie',
    research: 'search',
    global: 'globe',
    commodities: 'coins',
    announcements: 'bell',
    zakat: 'scale',
    import: 'upload',
    screener: 'filter',
    dividends: 'banknote',
    calendar: 'calendar',
    watchlist: 'star',
    signals: 'zap',
    'risk-audit': 'shield',
    insights: 'chart',
    'pilot-tools': 'trending',
    transactions: 'list',
    comparison: 'scale',
    performance: 'pulse',
    journal: 'journal',
    settings: 'settings',
    more: 'list',
  };

  function icon(name, size = 20, extraClass = '') {
    const paths = PATHS[name];
    if (!paths) {
      return `<span class="lc-icon lc-icon--missing ${extraClass}" aria-hidden="true" style="width:${size}px;height:${size}px"></span>`;
    }
    const body = (Array.isArray(paths) ? paths : [paths])
      .map((d) => `<path d="${d}"/>`)
      .join('');
    return `<svg class="lc-icon ${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  function toolIcon(tabId, size = 18) {
    return icon(TOOL_ICONS[tabId] || 'list', size, 'lc-icon--tool');
  }

  return { icon, toolIcon, PATHS, TOOL_ICONS };
})();
window.LcIcons = LcIcons;

;/* === js/ui/platform.js === */
'use strict';
const PlatformUI = (() => {
  function _numberFormat() {
    try {
      return (typeof State !== 'undefined' && State.get('settings')?.numberFormat) || 'full';
    } catch (_) { return 'full'; }
  }

  function displayCurrency() {
    try {
      return (typeof State !== 'undefined' && State.get('settings')?.displayCurrency) || 'PKR';
    } catch (_) { return 'PKR'; }
  }

  function fmt(n, opts) {
    if (n == null || Number.isNaN(n)) return '—';
    if (typeof PinVault !== 'undefined' && PinVault.isDecoyMode() && !(opts && opts.allowDecoy)) return '₨ —';
    opts = opts || {};
    if (opts.pct) {
      const d = opts.decimals ?? 2;
      const sign = opts.signed && n > 0 ? '+' : '';
      return sign + Number(n).toFixed(d) + '%';
    }
    const cur = opts.currency || displayCurrency();
    let val = n;
    if (cur === 'USD' && typeof FxService !== 'undefined') val = FxService.pkrToUsd(n);
    const compact = opts.compact ?? (_numberFormat() === 'compact');
    const abs = Math.abs(val);
    const sym = opts.noCurrency ? '' : (cur === 'USD' ? '$' : '₨');
    if (compact) {
      if (cur === 'USD') {
        if (abs >= 1e6) return sym + (val / 1e6).toFixed(2) + 'M';
        if (abs >= 1e3) return sym + (val / 1e3).toFixed(2) + 'k';
      } else {
        if (abs >= 1e7) return sym + (val / 1e7).toFixed(2) + 'cr';
        if (abs >= 1e5) return sym + (val / 1e5).toFixed(2) + 'L';
        if (abs >= 1e3) return sym + (val / 1e3).toFixed(2) + 'k';
      }
    }
    // Totals / P&L: whole rupees (no paisa). Pass { price: true } or decimals for quotes.
    const signedMoney = !!(opts.signed && !opts.pct);
    const d = opts.decimals ?? (opts.price ? 2 : (signedMoney || abs >= 100 ? 0 : 2));
    const formatted = abs.toLocaleString('en-PK', { minimumFractionDigits: d, maximumFractionDigits: d });
    let out;
    if (opts.signed && val > 0) out = '+' + sym + formatted;
    else if (val < 0) out = '-' + sym + formatted;
    else out = sym + formatted;
    if (signedMoney && val !== 0) out += val > 0 ? ' ▲' : ' ▼';
    return out;
  }

  /** Index / points — no currency prefix, 2 decimals */
  function fmtIndex(n, d) {
    return fmtNum(n, d ?? 2);
  }

  function fmtNum(n, d) {
    if (n == null || Number.isNaN(n)) return '—';
    const dec = d ?? 2;
    return Number(n).toLocaleString('en-PK', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }

  function chgCls(v) {
    if (v == null || Math.abs(v) < 0.005) return ''; // rounds to 0.00% → neutral
    return v > 0 ? 't-gain' : 't-loss';
  }

  function ratingBadge(action) {
    const a = (action || 'HOLD').toUpperCase();
    const cls = a === 'BUY' ? 'rt-buy' : a === 'SELL' ? 'rt-sell' : 'rt-hold';
    return `<span class="rt-badge ${cls}">${a}</span>`;
  }

  function metricCell(label, value, sub, cls) {
    return `<div class="rt-metric"><div class="rt-metric-lbl">${label}</div><div class="rt-metric-val ${cls || ''}">${value}</div>${sub ? `<div class="rt-metric-sub">${sub}</div>` : ''}</div>`;
  }

  function metricGrid(cells, cols) {
    const c = cols || 3;
    return `<div class="rt-grid rt-grid-${c}">${cells.join('')}</div>`;
  }

  function section(title, body) {
    const head = title
      ? `<div class="lc-section-head lc-section-head--inline"><div class="lc-section-kicker">${title}</div></div>`
      : '';
    return `<div class="rt-section cap-reveal">${head}<div class="lc-section-body">${body}</div></div>`;
  }

  return { fmt, fmtNum, fmtIndex, chgCls, ratingBadge, metricCell, metricGrid, section, displayCurrency };
})();
window.PlatformUI = PlatformUI;

;/* === js/ui/psx-ui.js === */
'use strict';
/** PSX Tactics UI — single component layer */
const PsxUI = (() => {
  function fmt(n, opts) {
    if (typeof PlatformUI !== 'undefined') return PlatformUI.fmt(n, opts);
    if (n == null || Number.isNaN(n)) return '—';
    return Number(n).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtIndex(n) {
    if (typeof PlatformUI !== 'undefined') return PlatformUI.fmtIndex(n);
    return fmt(n, { noCurrency: true });
  }

  function fmtNum(n, d) {
    if (typeof PlatformUI !== 'undefined') return PlatformUI.fmtNum(n, d);
    return fmt(n, { noCurrency: true, decimals: d });
  }

  function chgCls(v) {
    if (typeof PlatformUI !== 'undefined') return PlatformUI.chgCls(v);
    if (v == null) return '';
    return v >= 0 ? 'psx-up' : 'psx-down';
  }

  function kse() {
    const k = (typeof State !== 'undefined' ? State.get() : {}).kseIndex || {};
    const chg = k.changeP ?? k.change ?? null;
    return {
      value: k.value,
      changeP: chg,
      ts: k.ts,
      unavailable: !!k.unavailable || k.source === 'unavailable',
      resolved: !!k.resolved || !!k.unavailable || k.source === 'unavailable' || k.value > 0,
      source: k.source,
      cls: chg == null ? '' : (chg >= 0 ? 'psx-up' : 'psx-down'),
    };
  }

  function kseMeta(k, sign) {
    sign = sign || (k.changeP != null && k.changeP >= 0 ? '+' : '');
    if (k.changeP != null) return `${sign}${Number(k.changeP).toFixed(2)}%`;
    if (k.value > 0) {
      const when = k.ts && typeof Prices !== 'undefined' ? Prices.formatTs(k.ts) : '';
      return when ? `Last close · ${when}` : 'Last close';
    }
    return 'Unavailable';
  }

  function _act(expr) {
    return String(expr || 'App.refreshPrices').replace(/\(\)$/, '').replace(/\(\)/g, '');
  }

  function strip(_onRefresh) {
    // C-43 / LDG-P1-01: status only — single refresh is the header KSE ticker.
    const k = kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    return `<div class="psx-strip">
      <div><span class="psx-live"><span class="psx-live-dot"></span>${I18n.t('liveMarket')}</span></div>
      <div><strong>KSE-100</strong> ${k.value ? fmtIndex(k.value) : '—'} <span class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : ''}</span></div>
    </div>`;
  }

  function indexRow() {
    const k = kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    return `<div class="psx-index-row">
      <div class="psx-index-card">
        <div class="psx-index-label">KSE-100 · Index · live</div>
        <div class="psx-index-val">${k.value ? fmtIndex(k.value) : '—'}</div>
        <div class="psx-index-meta"><span class="${k.cls}">${kseMeta(k, sign)}</span></div>
      </div>
      <div class="psx-index-card">
        <div class="psx-index-label">${I18n.t('portfolio.value')}</div>
        <div class="psx-index-val" id="psx-portfolio-mini">—</div>
        <div class="psx-index-meta" id="psx-portfolio-mini-sub">${I18n.t('hub.sub').slice(0, 40)}…</div>
      </div>
    </div>`;
  }

  function statGrid(stats) {
    return `<div class="psx-stats">
      <div class="psx-stat"><div class="psx-stat-l">${I18n.t('market.advancing')}</div><div class="psx-stat-v psx-up">${stats.adv ?? '—'}</div></div>
      <div class="psx-stat"><div class="psx-stat-l">${I18n.t('market.declining')}</div><div class="psx-stat-v psx-down">${stats.dec ?? '—'}</div></div>
      <div class="psx-stat"><div class="psx-stat-l">${I18n.t('market.unchanged')}</div><div class="psx-stat-v">${stats.unch ?? '—'}</div></div>
      <div class="psx-stat"><div class="psx-stat-l">Listed</div><div class="psx-stat-v">${stats.listed ?? '—'}</div></div>
    </div>`;
  }

  function panel(title, desc, openOn, inner) {
    const openAct = openOn ? _act(openOn) : '';
    return `<div class="psx-panel">
      <div class="psx-panel-head">
        <div><strong>${title}</strong><span>${desc}</span></div>
        ${openAct ? `<button type="button" class="psx-open" data-action="${openAct}">${I18n.t('open')}</button>` : ''}
      </div>
      ${inner || ''}
    </div>`;
  }

  function sectorTable(sectors, rowAction) {
    rowAction = rowAction || 'Research.open';
    return Object.keys(sectors).sort().map(sec => `
      <div class="psx-sector"><span>${sec}</span><span>${sectors[sec].length} stocks</span></div>
      <div class="psx-table-wrap"><table class="psx-table"><thead><tr>
        <th>${I18n.t('market.symbol')}</th><th>${I18n.t('market.last')}</th><th>${I18n.t('market.chg')}</th>
      </tr></thead><tbody>
      ${sectors[sec].map(r => `
        <tr data-action="${rowAction}" data-symbol="${r.symbol}" style="cursor:pointer">
          <td><div class="psx-sym">${r.symbol}</div><div class="psx-sym-sub">${r.name}</div></td>
          <td>${fmt(r.price)}</td>
          <td class="${chgCls(r.chg)}">${fmt(r.chg, { pct: true, signed: true })}</td>
        </tr>`).join('')}
      </tbody></table></div>`).join('');
  }

  function filters(items, active, ns) {
    return `<div class="psx-filters">${items.map(it => `
      <button type="button" class="psx-filter${active === it.id ? ' on' : ''}" data-action="${ns}.setFilter" data-tab="${it.id}">${it.label}</button>
    `).join('')}</div>`;
  }

  function pageTitle(title, sub) {
    return `<div class="lc-screen-head"><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>`;
  }

  function lcDash(title, sub, inner) {
    return `<div class="lc-dash"><div class="lc-screen-head"><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${inner || ''}</div>`;
  }

  function segment(items, active, ns, method) {
    method = method || 'setFilter';
    const scroll = items.length >= 4 ? ' lc-segment--scroll' : '';
    return `<div class="lc-segment${scroll}" role="tablist">${items.map(it =>
      `<button type="button" class="lc-segment-btn${active === it.id ? ' on' : ''}" role="tab" data-action="${ns}.${method}" data-tab="${it.id}">${it.label}</button>`
    ).join('')}</div>`;
  }

  function skeleton(lines) {
    lines = lines || 4;
    return `<div class="lc-skeleton-wrap" aria-hidden="true">${Array.from({ length: lines }, () => '<div class="lc-skeleton-line"></div>').join('')}</div>`;
  }

  function skeletonNews() {
    return `<div class="psx-skel-news" role="status" aria-busy="true" aria-label="Loading news">
      ${[1, 2, 3].map(() => `<div class="psx-skel-row"><div class="psx-skel psx-skel-text lg"></div><div class="psx-skel psx-skel-text sm"></div></div>`).join('')}
    </div>`;
  }

  function skeletonHoldings(n) {
    n = n || 4;
    return `<div class="psx-skel-table" aria-busy="true">${Array.from({ length: n }, () =>
      `<div class="psx-skel-hold-row"><div class="psx-skel psx-skel-pill"></div><div class="psx-skel psx-skel-text"></div><div class="psx-skel psx-skel-text sm"></div></div>`
    ).join('')}</div>`;
  }

  function emptyState(title, sub, cta) {
    cta = cta || '';
    return `<div class="lc-empty-state" role="status" aria-live="polite">
      <div class="lc-empty-icon" aria-hidden="true">◇</div>
      <h2>${title}</h2>
      <p>${sub || ''}</p>
      ${cta}
    </div>`;
  }

  function errorState(title, sub, retryOn) {
    const btn = retryOn
      ? `<button type="button" class="psx-btn psx-btn-ghost" data-action="${_act(retryOn)}">Try again</button>`
      : '';
    return `<div class="lc-error-state" role="alert">
      <div class="lc-error-icon" aria-hidden="true">!</div>
      <h2>${title}</h2>
      <p>${sub || ''}</p>
      ${btn}
    </div>`;
  }

  function num(cls) { return `lc-num ${cls || ''}`.trim(); }

  function refreshPortfolioMini() {
    const el = document.getElementById('psx-portfolio-mini');
    const sub = document.getElementById('psx-portfolio-mini-sub');
    if (!el || typeof State === 'undefined') return;
    const txs = State.get('transactions') || [];
    if (!txs.length) { el.textContent = '—'; if (sub) sub.textContent = I18n.t('addHoldings'); return; }
    const s = PortfolioAnalyticsService.getSummary(State.get());
    el.textContent = fmt(s.totalValue);
    if (sub) sub.textContent = `${I18n.t('portfolio.allTime')} ${fmt(s.totalReturn.pct, { pct: true, signed: true })}`;
  }

  return { fmt, fmtIndex, fmtNum, chgCls, kse, kseMeta, strip, indexRow, statGrid, panel, sectorTable, filters, pageTitle, lcDash, segment, skeleton, skeletonNews, skeletonHoldings, emptyState, errorState, num, refreshPortfolioMini };
})();
window.PsxUI = PsxUI;

;/* === js/lc-desktop-nav.js === */
'use strict';
/** Toggle body.lc-desktop-nav at ≥700px (Cap fleet: iPad mini → sidebar) — Playwright viewport contract + sidebar/bottom nav */
(function () {
  const MQ = window.matchMedia('(min-width: 700px)');
  function sync() {
    document.body.classList.toggle('lc-desktop-nav', MQ.matches);
  }
  if (typeof MQ.addEventListener === 'function') {
    MQ.addEventListener('change', sync);
  } else if (typeof MQ.addListener === 'function') {
    MQ.addListener(sync);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sync);
  } else {
    sync();
  }
  window.LcDesktopNav = { sync, mq: MQ };
})();

;/* === js/lc-terminal.js === */
'use strict';
/** Full-width terminal shell + optional browser fullscreen */
(function () {
  const DESKTOP = window.matchMedia('(min-width: 900px)');

  function syncLayout() {
    document.body.classList.toggle('lc-terminal', DESKTOP.matches);
  }

  function toggle() {
    const root = document.documentElement;
    if (!document.fullscreenElement && root.requestFullscreen) {
      root.requestFullscreen().catch(() => {
        document.body.classList.toggle('lc-terminal-force');
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
      document.body.classList.remove('lc-terminal-force');
    } else {
      document.body.classList.toggle('lc-terminal-force');
    }
  }

  function onFsChange() {
    const host = document.getElementById('lc-fullscreen-icon');
    if (host && typeof LcIcons !== 'undefined') {
      host.innerHTML = LcIcons.icon('fullscreen', 18);
    }
    if (!document.fullscreenElement) document.body.classList.remove('lc-terminal-force');
  }

  if (typeof DESKTOP.addEventListener === 'function') {
    DESKTOP.addEventListener('change', syncLayout);
  } else if (typeof DESKTOP.addListener === 'function') {
    DESKTOP.addListener(syncLayout);
  }
  document.addEventListener('fullscreenchange', onFsChange);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncLayout);
  } else {
    syncLayout();
  }

  window.LcTerminal = { sync: syncLayout, toggle };
})();

;/* === js/ui/navigation.js === */
'use strict';
const Navigation = (() => {
  const TABS = [
    { id: 'home', labelKey: 'nav.hub', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/></svg>` },
    { id: 'market', labelKey: 'nav.watch', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
    { id: 'funds', labelKey: 'nav.funds', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>` },
    { id: 'portfolio', labelKey: 'nav.pnl', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>` },
    { id: 'research', labelKey: 'nav.analyze', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>` },
  ];

  const MORE = [
    { id: 'global', labelKey: 'tools.global.t' },
    { id: 'commodities', labelKey: 'tools.commodities.t' },
    { id: 'announcements', labelKey: 'tools.announcements.t' },
    { id: 'zakat', labelKey: 'tools.zakat.t' },
    { id: 'import', labelKey: 'tools.import.t' },
    { id: 'screener', labelKey: 'tools.screener.t' },
    { id: 'dividends', labelKey: 'tools.dividends.t' },
    { id: 'calendar', labelKey: 'tools.calendar.t' },
    { id: 'watchlist', labelKey: 'tools.watchlist.t' },
    { id: 'signals', labelKey: 'tools.signals.t' },
    { id: 'risk-audit', labelKey: 'tools.riskAudit.t' },
    { id: 'insights', labelKey: 'tools.insightsTool.t' },
    { id: 'comparison', labelKey: 'tools.comparison.t' },
    { id: 'performance', labelKey: 'tools.performance.t' },
    { id: 'journal', labelKey: 'tools.journal.t' },
    { id: 'pilot-tools', labelKey: 'tools.pilotTools.t' },
    { id: 'paper-trade', labelKey: 'tools.paperTrade.t' },
    { id: 'transactions', labelKey: 'tools.transactions.t' },
    { id: 'settings', labelKey: 'more.title' },
  ];

  const LEGACY = { dashboard: 'home', holdings: 'portfolio', income: 'dividends', intelligence: 'research', reports: 'research' };
  const VALID = new Set(['home', 'market', 'funds', 'portfolio', 'research', 'more', 'global', 'commodities', 'announcements', 'zakat', 'import', 'screener', 'watchlist', 'dividends', 'calendar', 'settings', 'transactions', 'signals', 'risk-audit', 'insights', 'comparison', 'performance', 'journal', 'pilot-tools', 'paper-trade']);

  let _current = 'home';

  function _t(k) { return typeof I18n !== 'undefined' ? I18n.t(k) : k; }

  function _navBtn(t) {
    const on = t.id === _current;
    return `<button type="button" class="psx-nav-btn${on ? ' active' : ''}" role="tab" aria-selected="${on ? 'true' : 'false'}" data-tab="${t.id}" aria-label="${_t(t.labelKey)}">
      <span class="psx-nav-icon-wrap" aria-hidden="true">${t.icon}</span>
      <span>${_t(t.labelKey)}</span>
    </button>`;
  }

  function _parseHash() {
    const raw = (location.hash || '').replace(/^#/, '');
    if (!raw) return { tab: '', bucket: null };
    const slash = raw.indexOf('/');
    if (slash === -1) return { tab: raw, bucket: null };
    return { tab: raw.slice(0, slash), bucket: raw.slice(slash + 1) || null };
  }

  function _trackRecent(tabId) {
    if (!tabId || tabId === 'home' || tabId === 'more') return;
    try {
      let r = JSON.parse(sessionStorage.getItem('lc_recent_tools') || '[]');
      r = [tabId, ...r.filter((x) => x !== tabId)].slice(0, 6);
      sessionStorage.setItem('lc_recent_tools', JSON.stringify(r));
    } catch (_) {}
  }

  function init() {
    const nav = document.getElementById('nav');
    if (nav) {
      nav.innerHTML = TABS.map(_navBtn).join('');
      nav.querySelectorAll('.psx-nav-btn').forEach(b => b.addEventListener('click', () => go(b.dataset.tab)));
    }
    const sidebar = document.getElementById('nav-sidebar');
    if (sidebar) {
      sidebar.innerHTML = `
        <div class="psx-brand" style="padding:4px 12px 24px;font-size:18px">Ledger<span>Cap</span></div>
        <nav aria-label="Primary">${TABS.map(t => `<button type="button" class="psx-side-btn" data-tab="${t.id}">${t.icon}<span>${_t(t.labelKey)}</span></button>`).join('')}</nav>
        <div style="height:1px;background:var(--psx-border);margin:16px 8px"></div>
        <nav aria-label="Tools">${MORE.map(t => `<button type="button" class="psx-side-btn" data-tab="${t.id}">${typeof LcIcons !== 'undefined' ? LcIcons.toolIcon(t.id, 18) : ''}<span>${_t(t.labelKey)}</span></button>`).join('')}</nav>
        <button type="button" class="psx-side-btn nav-theme-btn" style="margin-top:auto" data-action="window.toggleTheme">${_t('theme.toggle')}</button>`;
      sidebar.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => go(b.dataset.tab)));
    }
    const parsed = _parseHash();
    const hashTab = parsed.tab;
    const saved = sessionStorage.getItem('ledgercap_tab');
    if (hashTab && VALID.has(LEGACY[hashTab] || hashTab)) {
      const tab = LEGACY[hashTab] || hashTab;
      go(tab, true, parsed.bucket && tab === 'portfolio' ? { portfolioId: parsed.bucket } : {});
      if (parsed.bucket && tab === 'portfolio' && typeof PortfolioScreen !== 'undefined') {
        PortfolioScreen.setFilter(parsed.bucket, { replace: true });
      }
    } else if (saved) go(LEGACY[saved] || saved, true);
    window.addEventListener('popstate', (e) => {
      const p = _parseHash();
      const tab = e.state?.tab || p.tab || sessionStorage.getItem('ledgercap_tab') || 'home';
      const resolved = LEGACY[tab] || tab;
      go(resolved, true, p.bucket && resolved === 'portfolio' ? { portfolioId: p.bucket } : {});
      if (p.bucket && resolved === 'portfolio' && typeof PortfolioScreen !== 'undefined') {
        PortfolioScreen.setFilter(p.bucket, { replace: true });
      }
    });
  }

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn && typeof LcIcons !== 'undefined') {
      const icon = LcIcons.icon(theme === 'dark' ? 'moon' : 'sun', 20);
      const host = document.getElementById('theme-toggle-icon');
      if (host) host.innerHTML = icon;
      else btn.innerHTML = icon;
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    } else if (btn) {
      btn.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }
  }

  function go(tabId, silent, opts) {
    opts = opts || {};
    tabId = LEGACY[tabId] || tabId;
    if (!VALID.has(tabId)) tabId = 'home';
    const finish = () => {
      _current = tabId;
      document.querySelectorAll('.psx-screen').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.psx-nav-btn, .psx-side-btn[data-tab]').forEach(b => {
        b.classList.remove('active');
        if (b.getAttribute('role') === 'tab') b.setAttribute('aria-selected', 'false');
      });
      const el = document.getElementById('screen-' + tabId);
      if (el) {
        el.classList.add('active', 'lc-screen-enter');
        // 6.0: the document scrolls; a new screen opens at the top (also when navigating out of a sheet)
        if (window.App?.closeBottomSheet && document.getElementById('bottom-sheet')?.classList.contains('open')) App.closeBottomSheet(0);
        else window.scrollTo(0, 0);
        requestAnimationFrame(() => el.classList.remove('lc-screen-enter'));
      }
      document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(b => {
        b.classList.add('active');
        if (b.getAttribute('role') === 'tab') b.setAttribute('aria-selected', 'true');
      });
      if (!silent) {
        sessionStorage.setItem('ledgercap_tab', tabId);
        const bucket = opts.portfolioId || (typeof PortfolioScreen !== 'undefined' ? PortfolioScreen.currentFilter?.() : null);
        const hash = bucket && tabId === 'portfolio' ? `#portfolio/${bucket}` : `#${tabId}`;
        if (location.hash !== hash) history.pushState({ tab: tabId, portfolioId: bucket || null }, '', hash);
        _trackRecent(tabId);
      }
      const tabLabel = tabId.charAt(0).toUpperCase() + tabId.slice(1).replace(/-/g, ' ');
      document.title = tabLabel + ' — LedgerCap';
      _render(tabId, opts || {});
      if (typeof PriceHealth !== 'undefined') PriceHealth.mount();
      if (typeof PsxUI !== 'undefined') PsxUI.refreshPortfolioMini?.();
      if (typeof CapMotion !== 'undefined') CapMotion.refresh();
      if (typeof LcPolish !== 'undefined') LcPolish.afterRender();
    };
    /* Non-Home screens live in ledgercap.deferred.js — ensure loaded before render. */
    if (tabId !== 'home' && typeof window.__lcEnsureDeferred === 'function') {
      return Promise.resolve(window.__lcEnsureDeferred()).then(finish).catch(finish);
    }
    finish();
    return Promise.resolve();
  }

  function _render(id, opts) {
    const map = {
      home: () => Hub.render(),
      market: () => Market.render(),
      funds: () => Funds.render(),
      portfolio: () => PortfolioScreen.render(opts),
      research: () => { Research.setMode(opts.portfolioIntel ? 'portfolio' : 'stock'); Research.render(); },
      more: () => More.render(),
      global: () => Global.render(),
      commodities: () => Commodities.render(),
      announcements: () => Announcements.render(),
      zakat: () => Zakat.render(),
      import: () => ImportCsv.render(),
      screener: () => Screener.render(),
      watchlist: () => Watchlist.render(),
      dividends: () => Dividends.render(),
      calendar: () => WealthCalendar.render(),
      settings: () => Settings.render(),
      transactions: () => Transactions.render(),
      signals: () => Signals.render(),
      'risk-audit': () => RiskAudit.render(),
      insights: () => InsightsScreen.render(),
      comparison: () => Comparison.render(),
      performance: () => Performance.render(),
      journal: () => Journal.render(),
      'pilot-tools': () => PilotTools.render(),
      'paper-trade': () => PaperTrade.render(),
    };
    if (map[id]) map[id]();
  }

  function current() { return _current; }
  return { init, go, current, applyTheme, TABS };
})();
window.Navigation = Navigation;

;/* === js/modules/state.js === */
'use strict';
const State = (() => {
  const KEY = 'ledgercap_v2';
  const LEGACY_KEYS = ['stundsOS_v2'];

  function _readStorage() {
    let raw = localStorage.getItem(KEY);
    if (raw) return raw;
    for (const lk of LEGACY_KEYS) {
      raw = localStorage.getItem(lk);
      if (raw) {
        localStorage.setItem(KEY, raw);
        return raw;
      }
    }
    return null;
  }

  const DEFAULT = {
    transactions: [],
    prices: {},
    kseIndex: {},
    kseHistory: [],
    priceHistory: [],
    intradayHistory: [],
    watchlist: [],
    journal: [],
    researchNotes: {},
    sectorMap: {},
    settings: {
      salary: 150000,
      targetSIP: 75000,
      currency: 'PKR',
      inflationRate: 0.20,
      targetReturn: 0.18,
      freedomTarget: 100000,
      usdRate: 280,
      goldPricePerGram: 18000,
      pkrDepreciationRate: 0.15,
      primaryBroker: 'Mixed',
      onboardingDone: false,
      psxProxyUrl: '',
      telegramBotToken: '',
      telegramChatId: '',
      telegramMorningEnabled: false,
      telegramIntradayEnabled: false,
      telegramIntradayNewsEnabled: false,
      telegramDividendEnabled: false,
      telegramPriceAlertsEnabled: false,
      telegramCloudSyncEnabled: false,
      telegramSyncKey: '',
      telegramUseDirect: false,
      hapticsEnabled: false,
      theme: 'dark',
      numberFormat: 'full',
      displayCurrency: 'PKR',
      liveStreamEnabled: true,
    },
    holdingMeta: {},
    ipoEvents: [],
    priceAlerts: [],
    pilotSettings: {
      concentrationThresholdPct: 20,
      corePeDiscountPct: 15,
      swingRsiOversold: 35,
      swingRsiOverbought: 65,
      isFiler: true,
      cashBalancePkr: 0,
    },
    cashLedger: [],
    manualAssets: { usdCash: 0, goldGrams: 0, realEstate: 0, brokerCashPkr: 0 },
    portfolios: [],
    seriesHistory: {},
    fundNavHistory: {},
    paperLedger: { cashPkr: 500000, transactions: [] },
    dripSettings: {},
    version: 11,
    seedDataVersion: 0,
  };

  function _isGlobalSymbol(symbol) {
    return (window.INTL_STOCKS || []).some(s => s.symbol === symbol)
      || (window.CRYPTO_ASSETS || []).some(c => c.symbol === symbol);
  }

  /** US/crypto quotes store USD in priceUsd — prevClose must stay in PKR for ledger math. */
  function _normalizeGlobalPriceEntry(symbol, entry) {
    if (!entry || typeof entry !== 'object' || !_isGlobalSymbol(symbol)) return entry;
    const usd = entry.priceUsd || (entry.currency === 'USD' ? entry.price : null);
    if (!(usd > 0) || typeof FxService === 'undefined') return entry;
    const rate = FxService.getUsdRate();
    entry.priceUsd = usd;
    entry.price = usd * rate;
    entry.currency = 'USD';
    let prevUsd = entry.prevCloseUsd;
    if (!(prevUsd > 0) && entry.prevClose > 0) {
      if (entry.prevClose < Math.max(usd * 10, 500)) prevUsd = entry.prevClose;
      else prevUsd = entry.prevClose / rate;
    }
    if (!(prevUsd > 0)) prevUsd = usd;
    entry.prevCloseUsd = prevUsd;
    entry.prevClose = prevUsd * rate;
    return entry;
  }

  function _migrateV9() {
    if (_s.prices && typeof FxService !== 'undefined') {
      Object.keys(_s.prices).forEach(sym => {
        _s.prices[sym] = _normalizeGlobalPriceEntry(sym, _s.prices[sym]);
      });
    }
    _s.version = 9;
  }

  function _migrateV10() {
    if (!_s.intradayHistory) _s.intradayHistory = [];
    if (!_s.settings.displayCurrency) _s.settings.displayCurrency = 'PKR';
    if (_s.settings.liveStreamEnabled == null) _s.settings.liveStreamEnabled = true;
    _s.version = 10;
  }

  function _migrateV11() {
    if (!_s.seriesHistory) _s.seriesHistory = {};
    if (!_s.fundNavHistory) _s.fundNavHistory = {};
    if (!_s.paperLedger) _s.paperLedger = { cashPkr: 500000, transactions: [] };
    if (!_s.dripSettings) _s.dripSettings = {};
    _s.version = 11;
  }

  function _migrateV8() {
    if (!_s.portfolios) _s.portfolios = [];
    _s.version = 8;
  }

  function _migrateV7() {
    if (!_s.manualAssets) _s.manualAssets = { usdCash: 0, goldGrams: 0, realEstate: 0, brokerCashPkr: 0 };
    if (_s.manualAssets.brokerCashPkr == null) _s.manualAssets.brokerCashPkr = 0;
    if (_s.settings.zakatDebts == null) _s.settings.zakatDebts = 0;
    if (!_s.kseHistory) _s.kseHistory = [];
    if (!_s.settings.numberFormat) _s.settings.numberFormat = 'full';
    _s.version = 7;
  }

  function _migrateV6() {
    if (!_s.holdingMeta) _s.holdingMeta = {};
    if (!_s.ipoEvents) _s.ipoEvents = [];
    if (!_s.priceAlerts) _s.priceAlerts = [];
    if (!_s.cashLedger) _s.cashLedger = [];
    if (!_s.pilotSettings) {
      _s.pilotSettings = { ...DEFAULT.pilotSettings };
    } else {
      _s.pilotSettings = { ...DEFAULT.pilotSettings, ..._s.pilotSettings };
    }
    _s.version = 6;
  }

  function _migrateV5() {
    if (!_s.watchlist) _s.watchlist = [];
    if (!_s.journal) _s.journal = [];
    if (!_s.researchNotes) _s.researchNotes = {};
    if (!_s.sectorMap) _s.sectorMap = {};
    if (!_s.settings.theme) _s.settings.theme = 'dark';
    _seedWatchlist();
    _s.version = 5;
  }

  function _seedWatchlist() {
    if (_s.watchlist.length) return;
    const staticList = window.WATCHLIST || [];
    if (!staticList.length) return;
    _s.watchlist = staticList.map(w => ({
      ...w,
      id: typeof Ledger !== 'undefined' && Ledger.newId ? Ledger.newId() : 'wl_' + w.symbol,
      addedAt: Date.now(),
    }));
  }

  let _s = null;

  function _seedFallbackPrices() {
    const fp = window.FALLBACK_PRICES || {};
    Object.entries(fp).forEach(([symbol, price]) => {
      if (!_s.prices[symbol]) {
        _s.prices[symbol] = { price, prevClose: price, ts: Date.now() - 86400000, source: 'fallback' };
      }
    });
    (window.MEEZAN_FUNDS || []).forEach(f => {
      if (!_s.prices[f.symbol] && f.currentNav) {
        _s.prices[f.symbol] = { price: f.currentNav, prevClose: f.currentNav, ts: Date.now() - 86400000, source: 'fallback' };
      }
    });
  }

  function _seedPriceHistory() {
    if (typeof Ledger === 'undefined' || !Ledger.portfolioValueTimeline) return;
    const fp = window.FALLBACK_PRICES || {};
    const timeline = Ledger.portfolioValueTimeline(_s.transactions, (sym, fallback) => {
      const p = _s.prices[sym]?.price;
      return (p && p > 0) ? p : (fp[sym] || fallback || 0);
    });
    if (timeline.length) {
      _s.priceHistory = timeline.map(p => ({ date: p.date, value: p.value }));
    }
  }

  function _applySeedDataMigration() {
    const target = window.SEED_DATA_VERSION || window.PORTFOLIO_SEED_VERSION || 0;
    if (!target || !window.INITIAL_TRANSACTIONS?.length) return false;
    if (_s.seedDataVersion === target) return false;
    _s.transactions = window.INITIAL_TRANSACTIONS.map(t => ({ ...t, id: t.id || Ledger.newId(), createdAt: Date.now() }));
    _s.seedDataVersion = target;
    _s.settings.onboardingDone = true;
    if (window.USER_BROKER_CASH_PKR != null) {
      _s.manualAssets = _s.manualAssets || {};
      _s.manualAssets.brokerCashPkr = window.USER_BROKER_CASH_PKR;
    } else if (window.RAFI_BROKER_CASH_PKR != null) {
      _s.manualAssets = _s.manualAssets || {};
      _s.manualAssets.brokerCashPkr = window.RAFI_BROKER_CASH_PKR;
    }
    Object.entries(window.FALLBACK_PRICES || {}).forEach(([sym, price]) => {
      _s.prices[sym] = { price, prevClose: price, source: 'seed', ts: Date.now() };
    });
    (window.MEEZAN_FUNDS || []).forEach(f => {
      if (f.currentNav) {
        _s.prices[f.symbol] = { price: f.currentNav, prevClose: f.currentNav, source: 'meezan_seed', ts: Date.now() };
      }
    });
    _seedWatchlist();
    _seedPriceHistory();
    return true;
  }

  function _seedTransactions() {
    const init = window.INITIAL_TRANSACTIONS || [];
    if (!init.length) return;
    if (_applySeedDataMigration()) { save(); return; }
    if (!_s.transactions.length) {
      _s.transactions = [...init];
      _seedPriceHistory();
      save();
      return;
    }
    // Patch amounts for initial transactions already stored (corrects historical data errors)
    const initById = {};
    init.forEach(t => { initById[t.id] = t; });
    let patched = false;
    _s.transactions = _s.transactions.map(t => {
      const src = initById[t.id];
      if (src && t.amount !== src.amount) { patched = true; return { ...t, amount: src.amount, notes: src.notes }; }
      return t;
    });
    if (patched) save();
  }

  function load() {
    let shouldPersist = false;
    try {
      const r = _readStorage();
      if (r) {
        const parsed = JSON.parse(r);
        _s = { ...DEFAULT, ...parsed };
        _s.settings = { ...DEFAULT.settings, ...(parsed.settings || {}) };
        if (parsed.transactions?.length > 0 && !_s.settings.onboardingDone) {
          _s.settings.onboardingDone = true;
        }
        const prevProxy = _s.settings.psxProxyUrl || '';
        if (!_s.settings.psxProxyUrl && window.LEDGERCAP_CONFIG?.psxProxyUrl) {
          _s.settings.psxProxyUrl = window.LEDGERCAP_CONFIG.psxProxyUrl;
          shouldPersist = true;
        }
        if (window.LedgerCapConfig?.resolvePsxProxyUrl) {
          const normalized = window.LedgerCapConfig.resolvePsxProxyUrl(_s.settings.psxProxyUrl);
          if (normalized && normalized !== prevProxy) {
            _s.settings.psxProxyUrl = normalized;
            shouldPersist = true;
          }
        }
        if (!_s.version || _s.version < 5) {
          _migrateV5();
          shouldPersist = true;
        }
        if (!_s.version || _s.version < 6) {
          _migrateV6();
          shouldPersist = true;
        }
        if (!_s.version || _s.version < 7) {
          _migrateV7();
          shouldPersist = true;
        }
        if (!_s.version || _s.version < 8) {
          _migrateV8();
          shouldPersist = true;
        }
        if (!_s.version || _s.version < 9) {
          _migrateV9();
          shouldPersist = true;
        }
        if (!_s.version || _s.version < 10) {
          _migrateV10();
          shouldPersist = true;
        }
        if (!_s.version || _s.version < 11) {
          _migrateV11();
          shouldPersist = true;
        }
      } else {
        _s = JSON.parse(JSON.stringify(DEFAULT));
      }
    } catch {
      _s = JSON.parse(JSON.stringify(DEFAULT));
    }
    _seedTransactions();
    _seedFallbackPrices();
    if (shouldPersist) save();
  }

  function get(k) { if (!_s) load(); return k ? _s[k] : _s; }
  function set(k, v) { if (!_s) load(); _s[k] = v; save(); }
  function update(fn) { if (!_s) load(); fn(_s); save(); }
  function save() {
    try {
      const json = JSON.stringify(_s);
      localStorage.setItem(KEY, json);
      /* soft — no console.error (LH best-practices) */
    } catch(e) {
      /* soft — localStorage quota / private mode */
    }
  }
  function reset() {
    localStorage.removeItem(KEY);
    LEGACY_KEYS.forEach(k => localStorage.removeItem(k));
    _s = null;
    load();
  }
  function exportJSON() {
    if (!_s) load();
    const copy = JSON.parse(JSON.stringify(_s));
    if (copy.settings && typeof SecretsVault !== 'undefined') {
      copy.settings = SecretsVault.stripSensitiveSettings(copy.settings);
    } else if (copy.settings) {
      delete copy.settings.telegramBotToken;
    }
    return JSON.stringify(copy, null, 2);
  }
  function importJSON(str) {
    try {
      const parsed = JSON.parse(str);
      if (parsed.settings?.telegramBotToken) delete parsed.settings.telegramBotToken;
      _s = { ...DEFAULT, ...parsed };
      _s.settings = { ...DEFAULT.settings, ...(parsed.settings || {}) };
      if (!_s.version || _s.version < 5) _migrateV5();
      if (!_s.version || _s.version < 6) _migrateV6();
      if (!_s.version || _s.version < 7) _migrateV7();
      if (!_s.version || _s.version < 8) _migrateV8();
      if (!_s.version || _s.version < 9) _migrateV9();
      if (!_s.version || _s.version < 10) _migrateV10();
      if (!_s.version || _s.version < 11) _migrateV11();
      save();
      if (typeof SecretsVault !== 'undefined') SecretsVault.migratePlaintextToken();
      return true;
    } catch { return false; }
  }

  function addTransaction(tx) {
    if (!_s) load();
    _s.transactions.push({ ...tx, id: tx.id || Ledger.newId(), createdAt: Date.now() });
    _logPortfolioValue();
    save();
  }

  function deleteTransaction(id) {
    if (!_s) load();
    _s.transactions = _s.transactions.filter(t => t.id !== id);
    save();
  }

  function updateTransaction(id, patch) {
    if (!_s) load();
    const idx = _s.transactions.findIndex(t => t.id === id);
    if (idx < 0) return false;
    _s.transactions[idx] = { ..._s.transactions[idx], ...patch, updatedAt: Date.now() };
    _logPortfolioValue();
    save();
    return true;
  }

  function updatePrice(symbol, priceData) {
    if (!_s) load();
    const price = typeof priceData === 'number' ? priceData : priceData.price;
    const source = typeof priceData === 'object' ? priceData.source : 'manual';
    const trusted = ['psx_live', 'psx_int', 'psx_symbol', 'psx_eod', 'live-sse', 'live-sse-int', 'yahoo_intl', 'coingecko', 'yahoo', 'manual', 'meezan_seed'].includes(source);
    const fallback = (window.FALLBACK_PRICES || {})[symbol];
    const lastGood = _s.prices[symbol]?.price || 0;
    const prevClose = (typeof priceData === 'object' && priceData.prevClose > 0)
      ? priceData.prevClose
      : (_s.prices[symbol]?.prevClose || lastGood || fallback || 0);
    // LDG-P1-08 — finite, positive, within ±20% of last close / last-good; else keep last-good.
    if (!Number.isFinite(price) || price <= 0) return;
    if (prevClose > 0 && (price > prevClose * 1.2 || price < prevClose * 0.8)) {
      if (lastGood > 0) return; // keep last-good
      if (fallback > 0) {
        _s.prices[symbol] = { price: fallback, prevClose: fallback, ts: Date.now(), source: 'fallback' };
        save();
      }
      return;
    }
    if (!trusted && fallback && price && price > 0) {
      if (price > fallback * 2.5 || price < fallback * 0.4) {
        return;
      }
    }
    _s.prices[symbol] = typeof priceData === 'number'
      ? { price, prevClose: _s.prices[symbol]?.price || price, ts: Date.now(), source: 'manual' }
      : _normalizeGlobalPriceEntry(symbol, { ...priceData, ts: Date.now() });
    if (typeof HistorySeriesService !== 'undefined' && price > 0) {
      HistorySeriesService.recordSymbol(symbol, price);
    }
    _logPortfolioValue();
    save();
  }

  function isPriceStale(symbol, maxHours) {
    if (!_s) load();
    maxHours = maxHours == null ? 24 : maxHours;
    const ts = _s.prices[symbol]?.ts;
    if (!ts) return true;
    return (Date.now() - ts) > maxHours * 3600000;
  }

  function priceAgeLabel(symbol) {
    const ts = _s?.prices?.[symbol]?.ts;
    if (!ts || typeof Prices === 'undefined') return '';
    return Prices.formatTs(ts);
  }

  function getPrice(symbol) {
    if (!_s) load();
    return _s.prices[symbol]?.price || 0;
  }

  function getPriceSource(symbol) {
    if (!_s) load();
    return _s.prices[symbol]?.source || null;
  }

  function getPrevClose(symbol) {
    if (!_s) load();
    return _s.prices[symbol]?.prevClose || _s.prices[symbol]?.price || 0;
  }

  function _logPortfolioValue() {
    const total = calcTotalValue();
    if (total <= 0) return;
    const today = new Date().toISOString().split('T')[0];
    const idx = _s.priceHistory.findIndex(p => p.date === today);
    if (idx >= 0) _s.priceHistory[idx].value = total;
    else _s.priceHistory.push({ date: today, value: total });
    _s.priceHistory = _s.priceHistory.slice(-365);
  }

  function recordIntradaySnapshot() {
    if (!_s) load();
    const total = calcTotalValue();
    if (total <= 0) return;
    const now = Date.now();
    const today = new Date().toISOString().slice(0, 10);
    if (!_s.intradayHistory) _s.intradayHistory = [];
    const last = _s.intradayHistory[_s.intradayHistory.length - 1];
    if (last && (last.date || '') === today && now - (last.ts || 0) < 60000) return;
    _s.intradayHistory.push({ date: today, ts: now, value: total });
    const weekAgo = now - 8 * 86400000;
    _s.intradayHistory = _s.intradayHistory.filter((p) => {
      const d = p.date || (p.ts ? new Date(p.ts).toISOString().slice(0, 10) : '');
      return d === today || (p.ts || 0) >= weekAgo;
    }).slice(-500);
    save();
  }

  function logPortfolioSnapshot() {
    if (!_s) load();
    _logPortfolioValue();
    save();
  }

  function calcTotalValue() {
    if (!_s) load();
    const stockHoldings = Ledger.calcHoldings(_s.transactions);
    const fundHoldings = Ledger.calcFundHoldings(_s.transactions);

    const stockVal = stockHoldings.reduce((sum, h) => {
      const p = getPrice(h.symbol);
      return sum + h.shares * (p || h.avgCost);
    }, 0);

    const fundVal = fundHoldings.reduce((sum, f) => {
      const nav = getPrice(f.symbol);
      const meezanFund = (window.MEEZAN_FUNDS || []).find(mf => mf.symbol === f.symbol);
      const fallbackNav = meezanFund?.currentNav || f.avgNav;
      return sum + f.units * (nav || fallbackNav);
    }, 0);

    const globalVal = (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(_s.transactions) : []).reduce((sum, h) => {
      const pkr = getPrice(h.symbol);
      const usd = pkr ? FxService.pkrToUsd(pkr) : (window.GLOBAL_FALLBACK_USD || {})[h.symbol] || h.avgCostUsd;
      const px = pkr || FxService.usdToPkr(usd || 0);
      return sum + h.qty * (px || FxService.usdToPkr(h.avgCostUsd || 0));
    }, 0);

    return stockVal + fundVal + globalVal + calcManualAssetsValue();
  }

  /** Cash/gold/real-estate — held value with no ledger cost basis. */
  function calcManualAssetsValue() {
    if (!_s) load();
    const ma = _s.manualAssets || {};
    const settings = _s.settings || {};
    return (ma.usdCash || 0) * FxService.getUsdRate() +
      (ma.goldGrams || 0) * (settings.goldPricePerGram || 18000) +
      (ma.realEstate || 0) +
      (ma.brokerCashPkr || 0);
  }

  function calcTotalCost() {
    if (!_s) load();
    return Ledger.currentCostBasis
      ? Ledger.currentCostBasis(_s.transactions)
      : Ledger.totalInvested(_s.transactions);
  }

  // Seed/fallback quotes have no real previous close — report zero day
  // change instead of trusting a fabricated prevClose (incl. entries
  // persisted by older versions with price*0.998 seeds).
  const SYNTHETIC_SOURCES = new Set(['seed', 'fallback', 'meezan_seed']);
  function _dayChange(symbol, qty) {
    const entry = _s.prices[symbol];
    if (!entry || SYNTHETIC_SOURCES.has(entry.source)) return 0;
    const curr = getPrice(symbol);
    const prev = getPrevClose(symbol);
    if (!curr || !prev) return 0;
    return qty * (curr - prev);
  }

  function calcDailyPnl() {
    if (!_s) load();
    const holdings = Ledger.calcHoldings(_s.transactions);
    const funds = Ledger.calcFundHoldings(_s.transactions);
    const stockPnl = holdings.reduce((sum, h) => sum + _dayChange(h.symbol, h.shares), 0);
    const fundPnl = funds.reduce((sum, f) => sum + _dayChange(f.symbol, f.units), 0);
    const globalPnl = (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(_s.transactions) : []).reduce(
      (sum, h) => sum + _dayChange(h.symbol, h.qty), 0);
    return stockPnl + fundPnl + globalPnl;
  }

  function dividendsBySymbol() {
    if (!_s) load();
    const map = {};
    (_s.transactions || []).filter(t => t.type === 'DIVIDEND').forEach(t => {
      const sym = (t.symbol || '').trim() || '_general';
      map[sym] = (map[sym] || 0) + (t.amount || 0);
    });
    return map;
  }

  function getTotalDividends() {
    if (!_s) load();
    return Ledger.totalDividends(_s.transactions);
  }

  function getHoldingDividends(symbol, broker) {
    if (!_s) load();
    return (_s.transactions || [])
      .filter(t => t.type === 'DIVIDEND' && t.symbol === symbol && (!t.broker || !broker || t.broker === broker))
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  function recordKseSnapshot(kse) {
    if (!_s) load();
    if (!kse?.value) return;
    if (!_s.kseHistory) _s.kseHistory = [];
    const today = new Date().toISOString().slice(0, 10);
    const idx = _s.kseHistory.findIndex(p => p.date === today);
    const row = { date: today, value: kse.value };
    if (idx >= 0) _s.kseHistory[idx] = row;
    else _s.kseHistory.push(row);
    _s.kseHistory = _s.kseHistory.slice(-30);
    save();
  }

  const api = { get, set, update, save, reset, exportJSON, importJSON,
    addTransaction, deleteTransaction, updateTransaction, updatePrice, getPrice, getPriceSource, getPrevClose,
    isPriceStale, priceAgeLabel, logPortfolioSnapshot, recordIntradaySnapshot,
    calcTotalValue, calcManualAssetsValue, calcTotalCost, calcDailyPnl, dividendsBySymbol, getTotalDividends, getHoldingDividends, recordKseSnapshot };
  window.State = api;
  load();
  return api;
})();
window.State = window.State || State;

;/* === js/modules/investment.js === */
'use strict';
const Investment = (() => {

  function fmt(n) {
    if (!n && n !== 0) return '—';
    const abs = Math.abs(n);
    if (abs >= 10000000) return '₨' + (n / 10000000).toFixed(2) + 'cr';
    if (abs >= 100000) return '₨' + (n / 100000).toFixed(1) + 'L';
    return '₨' + Math.round(n).toLocaleString('en-PK');
  }

  function render(transactions, totalValue) {
    const timeline = Ledger.investmentTimeline(transactions);
    const bars = Ledger.monthlyInvestmentBars(timeline.byMonth, 12);
    const totalInvested = Ledger.currentCostBasis ? Ledger.currentCostBasis(transactions) : Ledger.totalInvested(transactions);
    const gain = totalValue - totalInvested;
    const gainPct = totalInvested > 0 ? (gain / totalInvested) * 100 : 0;
    const maxAdded = Math.max(...bars.map(b => b.added), 1);
    const maxCum = Math.max(...bars.map(b => b.cumulative), totalInvested, 1);

    const barHtml = bars.map(b => {
      const h = b.added > 0 ? Math.max(6, Math.round((b.added / maxAdded) * 72)) : 2;
      const label = new Date(b.month + '-01').toLocaleDateString('en-PK', { month: 'short' });
      return `<div class="inv-bar-col" title="${label}: +${fmt(b.added)}">
        <div class="inv-bar" style="height:${h}px"></div>
        <span>${label.charAt(0)}</span>
      </div>`;
    }).join('');

    const cumLine = bars.map((b, i) => {
      const x = (i / (bars.length - 1 || 1)) * 100;
      const y = 100 - (b.cumulative / maxCum) * 100;
      return `${x},${y}`;
    }).join(' ');

    const recent = timeline.points.slice(-5).reverse().map(p =>
      `<div class="inv-tx">
        <span class="inv-tx-date">${p.date || '—'}</span>
        <span class="inv-tx-sym">${p.symbol || p.type}</span>
        <span class="inv-tx-amt">+${fmt(p.amount)}</span>
      </div>`
    ).join('');

    return `
    <div class="sec-head"><span class="sec-title">Investment Tracker</span><span class="sec-action">${timeline.count} txns</span></div>
    <div class="inv-card">
      <div class="inv-summary">
        <div class="inv-stat">
          <div class="inv-stat-label">Total Invested</div>
          <div class="inv-stat-val">${fmt(totalInvested)}</div>
        </div>
        <div class="inv-stat">
          <div class="inv-stat-label">Portfolio Value</div>
          <div class="inv-stat-val">${fmt(totalValue)}</div>
        </div>
        <div class="inv-stat full">
          <div class="inv-stat-label">Net Gain on Capital</div>
          <div class="inv-stat-val ${gain >= 0 ? 't-gain' : 't-loss'}">${gain >= 0 ? '+' : ''}${fmt(gain)} <span class="inv-pct">(${gainPct >= 0 ? '+' : ''}${gainPct.toFixed(1)}%)</span></div>
        </div>
      </div>
      <div class="inv-chart-label">Monthly contributions (12 mo)</div>
      <div class="inv-bars">${barHtml}</div>
      <svg class="inv-spark" viewBox="0 0 100 40" preserveAspectRatio="none">
        <polyline fill="none" stroke="var(--orange)" stroke-width="1.5" points="${cumLine}"/>
      </svg>
      <div class="inv-chart-label">Cumulative invested over time</div>
      ${recent ? `<div class="inv-recent">${recent}</div>` : ''}
    </div>`;
  }

  return { render, fmt };
})();
window.Investment = Investment;

;/* === js/modules/hub.js === */
'use strict';
const Hub = (() => {
  const TOOLS = () => [
    { id: 'market', key: 'stockWatch', tone: 'blue' },
    { id: 'portfolio', key: 'lossTrack', tone: 'gold' },
    { id: 'funds', key: 'fundNavs', tone: 'green' },
    { id: 'research', key: 'technical', tone: 'violet' },
    { id: 'global', key: 'globalMarkets', tone: 'cyan' },
    { id: 'commodities', key: 'commodities', tone: 'gold' },
    { id: 'announcements', key: 'announcements', tone: 'amber' },
    { id: 'dividends', key: 'dividends', tone: 'green' },
    { id: 'calendar', key: 'calendar', tone: 'blue' },
    { id: 'screener', key: 'screener', tone: 'slate' },
    { id: 'zakat', key: 'zakatTool', tone: 'gold' },
    { id: 'watchlist', key: 'watchlist', tone: 'amber' },
    { id: 'signals', key: 'signals', tone: 'orange' },
    { id: 'risk-audit', key: 'riskAudit', tone: 'rose' },
    { id: 'insights', key: 'insightsTool', tone: 'violet' },
    { id: 'pilot-tools', key: 'pilotTools', tone: 'blue' },
    { id: 'paper-trade', key: 'paperTrade', tone: 'cyan' },
    { id: 'transactions', key: 'transactions', tone: 'slate' },
    { id: 'import', key: 'import', tone: 'slate' },
    { id: 'settings', key: 'settingsTool', tone: 'slate' },
  ];

  function _greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  function _marketStats() {
    const seen = new Set();
    let adv = 0, dec = 0, unch = 0, listed = 0;
    [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].forEach(s => {
      if (seen.has(s.symbol)) return;
      seen.add(s.symbol);
      listed++;
      const price = State.getPrice(s.symbol) || (window.FALLBACK_PRICES || {})[s.symbol] || 0;
      const prev = State.getPrevClose(s.symbol) || price;
      const chg = prev ? ((price - prev) / prev) * 100 : 0;
      if (chg > 0.05) adv++;
      else if (chg < -0.05) dec++;
      else unch++;
    });
    return { adv, dec, unch, listed };
  }

  function _marketPulse(stats) {
    const active = typeof Market !== 'undefined' ? Market.moveFilter() : 'all';
    return `<div class="lc-pulse-row" role="group" aria-label="Market pulse">
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${active === 'advancing' ? ' on' : ''}" data-action="Hub.openMarketFilter" data-tab="advancing" aria-pressed="${active === 'advancing'}">
        <label>Advancing</label><b class="psx-up">${stats.adv}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${active === 'declining' ? ' on' : ''}" data-action="Hub.openMarketFilter" data-tab="declining" aria-pressed="${active === 'declining'}">
        <label>Declining</label><b class="psx-down">${stats.dec}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn lc-pulse-pill--flat${active === 'unchanged' ? ' on' : ''}" data-action="Hub.openMarketFilter" data-tab="unchanged" aria-pressed="${active === 'unchanged'}">
        <label>Flat</label><b class="lc-pulse-neutral">${stats.unch}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn lc-pulse-pill--listed${active === 'all' ? ' on' : ''}" data-action="Hub.openMarketFilter" data-tab="all" aria-pressed="${active === 'all'}">
        <label>Listed</label><b class="lc-pulse-listed">${stats.listed}</b>
      </button>
    </div>`;
  }

  function openMarketFilter(f) {
    if (typeof Market !== 'undefined') Market.setMoveFilter(f);
    Navigation.go('market');
  }

  function openPortfolio(id) {
    if (typeof PortfolioScreen !== 'undefined') PortfolioScreen.setFilter(id, { replace: true });
    Navigation.go('portfolio', false, { portfolioId: id });
  }

  function _stalePriceChip(state) {
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    const global = Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : [];
    const syms = new Set([
      ...holdings.map(h => h.symbol),
      ...funds.map(f => f.symbol),
      ...global.map(h => h.symbol),
    ]);
    let stale = 0;
    syms.forEach(s => { if (State.isPriceStale(s, 24)) stale++; });
    if (!stale) return '';
    // LDG-P1-01 / C-43: status only — single refresh is the header ticker.
    return `<span class="lc-stale-chip" role="status">${stale} stale price${stale > 1 ? 's' : ''} · tap KSE ticker to refresh</span>`;
  }

  function _investmentSummary(state) {
    if (typeof PortfolioBuckets === 'undefined' || !PortfolioBuckets.investmentSummary) return '';
    const sum = PortfolioBuckets.investmentSummary(state);
    const txSum = typeof TransactionLedger !== 'undefined' ? TransactionLedger.summary(state.transactions || []) : null;
    const rows = sum.rows.filter(r => r.deployedPkr > 0 || r.value > 0 || r.positions > 0);
    if (!rows.length) return '';
    const fmtPnl = (r) => {
      const sign = r.pnl >= 0 ? '+' : '';
      return `${sign}${PsxUI.fmt(r.pnl, { signed: r.pnl > 0 })} (${sign}${Number(r.pnlPct || 0).toFixed(1)}%)`;
    };
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head lc-dash-section-head--stack">
        <h3>Capital deployed</h3>
        <div class="lc-deploy-totals">
          <span>Total deployed <strong>${PsxUI.fmt(sum.totalDeployed)}</strong></span>
          <span>Market value <strong>${PsxUI.fmt(sum.totalValue)}</strong></span>
          ${txSum ? `<span>Tax/fees <strong>${PsxUI.fmt(txSum.charges)}</strong></span>` : ''}
        </div>
      </div>
      <div class="lc-sector-card lc-deploy-card">
        <div class="lc-deploy-grid lc-deploy-grid--head" aria-hidden="true">
          <span>Portfolio</span>
          <span>Deployed</span>
          <span>Value</span>
          <span>P&amp;L</span>
          <span></span>
        </div>
        ${rows.map(r => {
          const dep = r.id === 'usa' && r.deployedUsd
            ? FxService.fmtUsdPkr(r.deployedUsd)
            : PsxUI.fmt(r.deployedPkr);
          const pnlCls = r.pnl >= 0 ? 'psx-up' : 'psx-down';
          return `<div class="lc-deploy-grid lc-deploy-row">
            <button type="button" class="lc-deploy-name-btn" data-action="Hub.openPortfolio" data-tab="${r.id}">
              <div class="lc-market-sym">${r.name}</div>
              <div class="lc-market-name">${r.deployedNote || ''}</div>
            </button>
            <div class="lc-deploy-num lc-deploy-deployed">${dep}</div>
            <div class="lc-deploy-num lc-deploy-num--strong lc-deploy-value">${PsxUI.fmt(r.value)}</div>
            <div class="lc-deploy-pnl ${pnlCls}">${fmtPnl(r)}</div>
            <button type="button" class="lc-deploy-txs" data-action="Transactions.openBucket" data-tab="${r.id}">Txs</button>
          </div>`;
        }).join('')}
      </div>
      ${txSum ? `<div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="transactions">All transactions (${txSum.count})</button>
        <button type="button" class="psx-btn psx-btn-ghost" data-action="Transactions.setFilter" data-tab="tax">Taxes ${PsxUI.fmt(txSum.taxes)}</button>
        <button type="button" class="psx-btn psx-btn-ghost" data-action="Transactions.setFilter" data-tab="dividend">Dividends ${PsxUI.fmt(txSum.loggedDividends)}</button>
      </div>` : ''}
    </div>`;
  }

  // Idle until the user taps Refresh — avoids /news/google on first paint (best-practices).
  let _newsHtml = '<p class="lc-empty-note">Tap Refresh news when you want headlines.</p>';

  async function _loadNews(state) {
    if (typeof NewsService === 'undefined') return;
    try {
      const items = await NewsService.fetchPortfolioNews(state);
      if (!items.length) {
        _newsHtml = PsxUI.emptyState('No headlines right now', 'Free news feeds are quiet or unreachable. Try again in a minute.', '');
        return;
      }
      _newsHtml = items.slice(0, 6).map(n => `
        <a class="lc-news-row" href="${escUrl(n.url)}" target="_blank" rel="noopener noreferrer">
          <div class="lc-news-title">${esc(n.title)}</div>
          <div class="lc-news-meta">${esc(n.portfolioSymbol || n.symbol)} · ${esc(n.publisher || n.source)}${NewsService.impactBadge(n.impact)}</div>
          <p class="lc-news-hint">${esc(n.impact?.hint || '')}</p>
        </a>`).join('');
    } catch (e) {
      _newsHtml = PsxUI.errorState('News unavailable', navigator.onLine ? 'Could not load headlines. Try again shortly.' : 'You appear offline.', 'Hub.refreshNews()');
    }
  }

  function _newsSection() {
    return `<div class="lc-dash-section" id="hub-news-section">
      <div class="lc-dash-section-head"><h3>Market news</h3><span>On demand</span></div>
      <div class="lc-sector-card" id="hub-news-list">${_newsHtml}</div>
      <div class="lc-dash-actions"><button type="button" class="psx-btn psx-btn-ghost" data-action="Hub.refreshNews">Refresh news</button></div>
    </div>`;
  }

  async function refreshNews() {
    _newsHtml = typeof PsxUI !== 'undefined' ? PsxUI.skeletonNews() : '<p class="lc-empty-note">Loading…</p>';
    const el0 = document.getElementById('hub-news-list');
    if (el0) el0.innerHTML = _newsHtml;
    await _loadNews(State.get());
    const el = document.getElementById('hub-news-list');
    if (el) el.innerHTML = _newsHtml;
    if (typeof LcPolish !== 'undefined') LcPolish.afterRender();
  }

  function _portfolioSection(state) {
    if (typeof PortfolioBuckets === 'undefined') return '';
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>${I18n.t('portfolio.bucketsTitle')}</h3><span>${I18n.t('portfolio.bucketsSub')}</span></div>
      <div class="lc-portfolio-grid">${PortfolioBuckets.cardsHtml(state)}</div>
      <p class="lc-portfolio-footnote">${I18n.t('portfolio.investedFootnote')}</p>
    </div>`;
  }

  function _portfolioMovers() {
    const holdings = PortfolioAnalyticsService.getHoldings();
    if (!holdings.length) return '';
    const movers = holdings.map(h => {
      const prev = State.getPrevClose(h.symbol) || h.price;
      const chg = prev && h.price ? ((h.price - prev) / prev) * 100 : 0;
      return { symbol: h.symbol, chg };
    }).sort((a, b) => Math.abs(b.chg) - Math.abs(a.chg)).slice(0, 5);
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Your movers</h3><span>Today</span></div>
      <div class="lc-movers-row">${movers.map(m => `
        <button type="button" class="lc-mover-chip" data-action="Research.open" data-symbol="${m.symbol}">
          <strong>${m.symbol}</strong>
          <em class="${PsxUI.chgCls(m.chg)}">${PsxUI.fmt(m.chg, { pct: true, signed: true })}</em>
        </button>`).join('')}</div>
    </div>`;
  }

  function _kseMeta(k, sign) {
    if (k.changeP != null) return `${sign}${Number(k.changeP).toFixed(2)}%`;
    if (k.value > 0) {
      const when = k.ts && typeof Prices !== 'undefined'
        ? Prices.formatTs(k.ts)
        : (window.FALLBACK_PRICES_UPDATED || '');
      return when ? `Last close · ${when}` : 'Last close';
    }
    if (k.unavailable || k.source === 'unavailable' || k.resolved) return 'Unavailable';
    return 'Unavailable';
  }

  function _kseCard(k, sign) {
    return `<button type="button" class="lc-dash-market-card lc-dash-market-card--btn" data-nav="market" aria-label="Open stock watch">
      <span>KSE-100</span>
      <strong>${k.value ? PsxUI.fmtIndex(k.value) : '—'}</strong>
      <em class="${k.cls}">${_kseMeta(k, sign)}</em>
    </button>`;
  }

  function _marketStatus() {
    if (typeof PsxSession === 'undefined') return '';
    const pkt = PsxSession.pktParts();
    const open = PsxSession.isOpen(pkt);
    const cls = open ? 'psx-up' : 'lc-pulse-neutral';
    // Honest "as of" stamp from the newest real quote, not the wall clock.
    const prices = State.get('prices') || {};
    const newest = Object.values(prices).map(p => p?.ts).filter(Boolean).sort((a, b) => b - a)[0];
    const asOf = newest && typeof Prices !== 'undefined' ? Prices.formatTs(newest) : null;
    const label = open ? 'Market open' : PsxSession.priceLabel(pkt);
    return `<div class="lc-market-status" role="status">
      <span class="lc-market-status-dot ${cls}"></span>
      <span>${label}${asOf ? ` · prices ${asOf}` : ''}</span>
    </div>`;
  }

  function _quickActions() {
    return `<div class="lc-hub-quick lc-hub-quick--scroll" role="group" aria-label="Shortcuts">
      <button type="button" class="psx-btn psx-btn-ghost" data-nav="pilot-tools">CGT &amp; tax</button>
      <button type="button" class="psx-btn psx-btn-ghost" data-action="StatementExport.exportHtml">Annual PDF</button>
      <button type="button" class="psx-btn psx-btn-ghost" data-nav="paper-trade">Paper trade</button>
      <button type="button" class="psx-btn psx-btn-ghost" data-nav="import">Import CSV</button>
    </div>`;
  }

  function _rebalanceTeaser(state) {
    if (typeof PilotEngine === 'undefined' || !PilotEngine.buildRebalancePlan) return '';
    const plan = PilotEngine.buildRebalancePlan(state);
    if (!plan?.rows?.length) return '';
    const drift = plan.drift_count || 0;
    const actions = plan.rows.filter((r) => r.action === 'TRIM' || r.action === 'ADD' || r.action === 'REVIEW').slice(0, 4);
    const rowsHtml = actions.length
      ? actions.map((r) => {
        const cls = r.action === 'TRIM' ? 'psx-down' : r.action === 'ADD' ? 'psx-up' : '';
        const delta = r.delta_pct != null ? `${r.delta_pct >= 0 ? '+' : ''}${Number(r.delta_pct).toFixed(1)}%` : '—';
        return `<div class="lc-rebalance-row">
          <strong>${r.symbol}</strong>
          <span class="lc-rebalance-action ${cls}">${r.action}</span>
          <span class="lc-num">${delta}</span>
        </div>`;
      }).join('')
      : `<p class="lc-empty-note">${plan.summary}</p>`;
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Rebalance</h3><span>${drift ? `${drift} drifted` : 'On target'}</span></div>
      <div class="lc-sector-card lc-rebalance-card">${rowsHtml}
        <div class="lc-dash-actions" style="margin-top:12px">
          <button type="button" class="psx-btn psx-btn-ghost" data-nav="pilot-tools">Full rebalance plan</button>
        </div>
      </div>
    </div>`;
  }

  function _recentTools() {
    let ids = [];
    try { ids = JSON.parse(sessionStorage.getItem('lc_recent_tools') || '[]'); } catch (_) {}
    ids = ids.filter((id) => TOOLS().some((t) => t.id === id)).slice(0, 4);
    if (!ids.length) return '';
    const map = Object.fromEntries(TOOLS().map((t) => [t.id, t]));
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Recent</h3><span>Quick return</span></div>
      <div class="lc-hub-quick">${ids.map((id) => {
        const t = map[id];
        return t ? `<button type="button" class="psx-btn psx-btn-ghost" data-nav="${id}">${I18n.t(`tools.${t.key}.t`)}</button>` : '';
      }).join('')}</div>
    </div>`;
  }

  function _toolGrid() {
    return `<div class="lc-tool-grid">${TOOLS().map(t => `
      <button type="button" class="lc-tool-card" data-nav="${t.id}">
        <div class="lc-tool-icon lc-tool-icon--${t.tone}" aria-hidden="true">${typeof LcIcons !== 'undefined' ? LcIcons.toolIcon(t.id, 20) : ''}</div>
        <strong>${I18n.t(`tools.${t.key}.t`)}</strong>
        <span>${I18n.t(`tools.${t.key}.d`)}</span>
      </button>`).join('')}</div>`;
  }

  function _portfolioChart(state) {
    const histRaw = state.priceHistory || [];
    const hist = histRaw.map(h => h.value).filter(v => v > 0);
    if (typeof Charts === 'undefined') return '';
    if (hist.length === 1) {
      // Day 1: explain why the trend chart is empty instead of hiding it.
      return `<div class="lc-dash-section" id="hub-networth-section">
        <div class="lc-dash-section-head"><h3>Net worth trend</h3></div>
        <div class="lc-sector-card"><p class="lc-empty-note">First snapshot saved today — your trend line starts tomorrow.</p></div>
      </div>`;
    }
    if (hist.length < 2) return '';
    const first = hist[0];
    const last = hist[hist.length - 1];
    const chg = first ? ((last - first) / first) * 100 : 0;
    const fmt = n => (typeof PlatformUI !== 'undefined' ? PlatformUI.fmt(n) : `₨${Number(n).toLocaleString('en-PK')}`);
    const startLabel = histRaw[0]?.date || '';
    const endLabel = histRaw[histRaw.length - 1]?.date || '';
    const period = startLabel && endLabel ? `${startLabel} → ${endLabel}` : `${hist.length} days`;
    return `<div class="lc-chart-block hub-chart">
      <div class="lc-dash-section-head"><h3>Net worth</h3><span>${period}</span></div>
      ${Charts.lineChartBlock(hist, {
        height: 110,
        caption: `${fmt(first)} → ${fmt(last)}`,
        subcaption: `${chg >= 0 ? '+' : ''}${chg.toFixed(2)}%`,
        subcaptionCls: chg >= 0 ? 'up' : 'down',
        ariaLabel: `Net worth trend from ${fmt(first)} to ${fmt(last)}`,
      })}
    </div>`;
  }

  function _folioWrap(innerMain, toolsHtml) {
    return `
      <div class="lc-hub-folio">
        <aside class="lc-hub-folio__cover" aria-label="Bahi khata cover">
          <div class="lc-hub-folio__cloth">
            <div class="lc-hub-folio__string" aria-hidden="true"></div>
            <div class="lc-hub-folio__clasp" aria-hidden="true"></div>
            <div class="lc-hub-folio__cover-title">LedgerCap</div>
            <div class="lc-hub-folio__cover-urdu" lang="ur" dir="rtl">بھی کھاتا</div>
            <button type="button" class="lc-hub-folio__zakat" data-nav="zakat">Zakat</button>
          </div>
        </aside>
        <div class="lc-hub-folio__pages">
          <div class="lc-hub-folio__sheet">${innerMain}</div>
        </div>
        <aside class="lc-hub-folio__tools" aria-label="Shop tools">
          <div class="lc-hub-folio__tools-label">Tools</div>
          ${toolsHtml || _toolGrid()}
        </aside>
      </div>`;
  }

  function render() {
    const screen = document.getElementById('screen-home');
    if (!screen) return;
    const state = State.get();
    const hasHoldings = (state.transactions || []).length > 0;
    const k = PsxUI.kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    const stats = _marketStats();

    if (!hasHoldings) {
      const main = `
          <div class="lc-dash lc-dash--folio">
          <div class="lc-dash-greet">
            <h2>${_greeting()}</h2>
            <p>LedgerCap</p>
          </div>
          <div class="lc-dash-market">
            ${_kseCard(k, sign)}
            <button type="button" class="lc-dash-market-card lc-dash-market-card--btn" data-action="App.openAddTransaction" aria-label="Add holdings">
              <span>${I18n.t('portfolio.value')}</span>
              <strong>—</strong>
              <em>${I18n.t('addHoldings')}</em>
            </button>
          </div>
          ${_marketPulse(stats)}
          ${_portfolioSection(state)}
          <div class="lc-empty-state">
            <h2>${I18n.t('hub.hero')}</h2>
            <p>${I18n.t('hub.sub')}</p>
            <div class="lc-dash-actions" style="justify-content:center">
              <button type="button" class="psx-btn psx-btn-primary" data-action="App.openAddTransaction">${I18n.t('addHoldings')}</button>
              <button type="button" class="psx-btn psx-btn-ghost" data-action="App.loadDemo">${I18n.t('loadDemo')}</button>
            </div>
          </div>
          <div class="lc-dash-section lc-dash-section--mobile-tools">
            <div class="lc-dash-section-head"><h3>${I18n.t('hub.toolsTitle')}</h3><span>${I18n.t('hub.toolsSub')}</span></div>
            ${_toolGrid()}
          </div>
        </div>`;
      screen.innerHTML = _folioWrap(main);
      return;
    }

    const s = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    // Real broker cash lives in manualAssets (statement figures), not the
    // salary-minus-buys ledger estimate which clamps to 0 here.
    const ma = state.manualAssets || {};
    const cash = (ma.brokerCashPkr || 0) + (typeof FxService !== 'undefined' ? FxService.usdToPkr(ma.usdCash || 0) : 0);

    const main = `
      <div class="lc-dash lc-dash--folio">
        <div class="lc-dash-greet">
          <h2>${_greeting()}</h2>
          <p>Your wealth at a glance</p>
        </div>
        ${_marketStatus()}
        <div class="lc-dash-hero">
          <div class="lc-dash-hero-label">${I18n.t('portfolio.value')}</div>
          <div class="lc-dash-hero-val lc-num" data-lc-count="${s.totalValue}" data-lc-count-key="hub-total">${PsxUI.fmt(s.totalValue)}</div>
          <div class="lc-dash-hero-row">
            <span class="lc-dash-chip ${daily >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.today')} ${PsxUI.fmt(daily, { signed: daily >= 0 })}</span>
            <span class="lc-dash-chip ${s.totalReturn.pct >= 0 ? 'up' : 'down'}">${I18n.t('portfolio.allTime')} ${PsxUI.fmt(s.totalReturn.pct, { pct: true, signed: true })}</span>
            <span class="lc-dash-chip">Cash ${PsxUI.fmt(cash)}</span>
          </div>
        </div>
        <div class="lc-dash-actions">
          <button type="button" class="psx-btn psx-btn-ghost" data-action="App.openAddTransaction">${I18n.t('addHoldings')}</button>
          ${_stalePriceChip(state)}
        </div>
        ${_quickActions()}
        <div class="lc-dash-market">
          ${_kseCard(k, sign)}
          <button type="button" class="lc-dash-market-card lc-dash-market-card--btn" data-nav="portfolio" aria-label="Open portfolio">
            <span>${I18n.t('portfolio.yield')}</span>
            <strong>${s.portfolioDivYield.toFixed(2)}%</strong>
            <em>${I18n.t('portfolio.invested')} ${PsxUI.fmt(s.invested)}</em>
          </button>
        </div>
        ${_marketPulse(stats)}
        ${_investmentSummary(state)}
        ${_rebalanceTeaser(state)}
        ${_portfolioSection(state)}
        ${_newsSection()}
        ${_portfolioChart(state)}
        ${_portfolioMovers()}
        ${_recentTools()}
        <div class="lc-dash-section lc-dash-section--mobile-tools">
          <div class="lc-dash-section-head"><h3>${I18n.t('hub.toolsTitle')}</h3><span>${I18n.t('hub.toolsSub')}</span></div>
          ${_toolGrid()}
        </div>
      </div>`;
    screen.innerHTML = _folioWrap(main);
    // News is opt-in — do not fetch on first hub paint.
  }

  return { render, openMarketFilter, openPortfolio, refreshNews };
})();
window.Hub = Hub;
window.Home = Hub;

;/* === js/modules/demo-seed.js === */
'use strict';
/** Cold-path demo portfolio seed — keeps Settings pack deferred (v5 §3d). */
const DemoSeed = {
  async load(opts) {
    const silent = opts && opts.silent;
    const seed = window.INITIAL_TRANSACTIONS || [];
    if (!seed.length) {
      if (!silent && typeof App !== 'undefined') App.showToast('Seed data unavailable', 'error');
      return false;
    }
    if (!silent && typeof CapConfirm === 'function') {
      const ok = await CapConfirm({
        title: 'Load demo portfolio?',
        body: `Load ${seed.length} portfolio transactions? Existing ledger will be replaced.`,
        confirmLabel: 'Load demo',
      });
      if (!ok) return false;
    }
    State.update(s => {
      s.transactions = seed.map(t => ({ ...t, id: t.id || Ledger.newId(), createdAt: Date.now() }));
      s.settings.onboardingDone = true;
      s.seedDataVersion = window.SEED_DATA_VERSION || 0;
      if (window.USER_BROKER_CASH_PKR != null) {
        s.manualAssets = s.manualAssets || {};
        s.manualAssets.brokerCashPkr = window.USER_BROKER_CASH_PKR;
      } else if (window.RAFI_BROKER_CASH_PKR != null) {
        s.manualAssets = s.manualAssets || {};
        s.manualAssets.brokerCashPkr = window.RAFI_BROKER_CASH_PKR;
      }
      if (window.MEEZAN_FUNDS) {
        (window.MEEZAN_FUNDS || []).forEach(f => {
          if (f.currentNav) {
            s.prices[f.symbol] = { price: f.currentNav, prevClose: f.currentNav * 0.999, source: 'meezan_seed', ts: Date.now() };
          }
        });
      }
      if (window.FALLBACK_PRICES) {
        Object.entries(window.FALLBACK_PRICES).forEach(([sym, price]) => {
          s.prices[sym] = { price, prevClose: price * 0.998, source: 'seed', ts: Date.now() };
        });
      }
      if (Ledger.portfolioValueTimeline) {
        const timeline = Ledger.portfolioValueTimeline(s.transactions, (sym, fallback) => {
          const p = s.prices[sym]?.price;
          return (p && p > 0) ? p : ((window.FALLBACK_PRICES || {})[sym] || fallback || 0);
        });
        s.priceHistory = timeline.map(p => ({ date: p.date, value: p.value }));
      }
    });
    if (!silent && typeof App !== 'undefined') App.showToast('Portfolio loaded ✓', 'success');
    if (typeof App !== 'undefined' && App.renderCurrent) App.renderCurrent();
    return true;
  }
};
window.DemoSeed = DemoSeed;

;/* === js/app.js === */
'use strict';
const App = (() => {
  let _refreshTimer = null;
  let _activeSheet = null;

  function _priceRef(sym) {
    const fp = window.FALLBACK_PRICES || {};
    if (fp[sym] > 0) return fp[sym];
    const mf = (window.MEEZAN_FUNDS || []).find(f => f.symbol === sym);
    return mf?.currentNav > 0 ? mf.currentNav : 0;
  }

  function _isBadPrice(sym, stored, prevClose) {
    if (!Number.isFinite(stored) || stored <= 0) return true;
    const last = (Number.isFinite(prevClose) && prevClose > 0) ? prevClose : _priceRef(sym);
    // LDG-P1-08: reject swings beyond ±20% of last close / last-good; keep last-good.
    if (last > 0 && (stored > last * 1.2 || stored < last * 0.8)) return true;
    return false;
  }

  function _validateAndCleanPrices() {
    const state = State.get();
    let cleaned = 0;
    let changed = false;
    Object.keys(state.prices || {}).forEach(sym => {
      const entry = state.prices[sym];
      const stored = entry?.price;
      const prev = entry?.prevClose;
      if (!entry || typeof entry !== 'object' || _isBadPrice(sym, stored, prev)) {
        delete state.prices[sym];
        cleaned++;
        changed = true;
      }
    });
    if (changed) {
      State.save();
    }
  }

  function clearWrongPrices() {
    let cleaned = 0;
    State.update(s => {
      Object.keys(s.prices || {}).forEach(sym => {
        const stored = s.prices[sym]?.price;
        const prev = s.prices[sym]?.prevClose;
        if (_isBadPrice(sym, stored, prev)) {
          delete s.prices[sym];
          cleaned++;
        }
      });
    });
    showToast('Cleared invalid prices — using corrected fallback data', 'info');
    if (cleaned > 0) renderCurrent();
  }

  function _renderTicker() {
    const el = document.getElementById('lc-app-ticker');
    if (!el || typeof PsxUI === 'undefined') return;
    const k = PsxUI.kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    const fresh = _freshnessLabel();
    // One compact pill: index, change, freshness. Tap = refresh.
    el.innerHTML = `<button type="button" class="lc-ticker-pill${fresh.cls ? ' ' + fresh.cls : ''}" data-action="App.refreshPrices" title="Tap to refresh prices">
      <span class="lc-ticker-label">KSE-100</span>
      <strong>${k.value ? PsxUI.fmtIndex(k.value) : '—'}</strong>
      <span class="lc-ticker-chg ${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : ''}</span>
      ${fresh.label ? `<span class="lc-ticker-fresh">· ${fresh.label}</span>` : ''}
    </button>`;
  }

  function _freshnessLabel() {
    if (typeof State === 'undefined') return { label: '', cls: '' };
    const prices = State.get('prices') || {};
    const ts = Object.values(prices).map((p) => p?.ts).filter(Boolean).sort((a, b) => b - a)[0];
    const offline = typeof navigator !== 'undefined' && !navigator.onLine;
    if (!ts && !offline) return { label: '', cls: '' };
    const age = ts && typeof Prices !== 'undefined' ? Prices.formatTs(ts) : 'never';
    const stale = ts && (Date.now() - ts > 24 * 3600000);
    const sessionOpen = typeof PsxSession !== 'undefined' && PsxSession.isOpen();
    const live = sessionOpen && typeof LivePriceStream !== 'undefined' && LivePriceStream.status().connected;
    const pktLabel = typeof PsxSession !== 'undefined' ? PsxSession.priceLabel() : null;
    // D-09 / LDG-P1-01 — one freshness line with source attribution
    const src = 'via LedgerCap server';
    if (offline) return { label: `Offline · ${src}`, cls: 'lc-ticker-pill--warn' };
    if (live) return { label: `Live · ${src}`, cls: 'lc-ticker-pill--live' };
    if (pktLabel === 'Last close' || pktLabel === 'Pre-market') {
      return { label: `${pktLabel} ${age} · ${src}`, cls: stale ? 'lc-ticker-pill--warn' : '' };
    }
    return { label: `${age} · ${src}`, cls: stale ? 'lc-ticker-pill--warn' : '' };
  }

  function _priceFreshnessChip() {
    if (typeof State === 'undefined') return '';
    const prices = State.get('prices') || {};
    const ts = Object.values(prices).map((p) => p?.ts).filter(Boolean).sort((a, b) => b - a)[0];
    const offline = typeof navigator !== 'undefined' && !navigator.onLine;
    if (!ts && !offline) return '';
    const age = ts && typeof Prices !== 'undefined' ? Prices.formatTs(ts) : 'never';
    const stale = ts && (Date.now() - ts > 24 * 3600000);
    const sessionOpen = typeof PsxSession !== 'undefined' && PsxSession.isOpen();
    const live = sessionOpen && typeof LivePriceStream !== 'undefined' && LivePriceStream.status().connected;
    const pktLabel = typeof PsxSession !== 'undefined' ? PsxSession.priceLabel() : null;
    let label;
    if (offline) label = 'Offline';
    else if (live) label = 'Live';
    else if (pktLabel === 'Last close' || pktLabel === 'Pre-market') label = `${pktLabel} · ${age}`;
    else label = stale ? `Prices ${age}` : `Updated ${age}`;
    const cls = live ? 'lc-freshness--live' : offline || stale || pktLabel === 'Last close' ? 'lc-freshness--warn' : 'lc-freshness--ok';
    return `<button type="button" class="lc-freshness-chip ${cls}" data-action="App.refreshPrices" title="Tap to refresh prices">${label}</button>`;
  }

  function checkPriceAlerts() {
    if (typeof PriceAlertsService !== 'undefined') PriceAlertsService.checkAll();
  }

  function requestAlertPermission() {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }

  let _intlCatalog = [];
  let _pendingPortfolioId = null;
  let _pendingBroker = null;

  function openAddPortfolio() {
    openBottomSheet('add-portfolio', 'Add portfolio', `
      <div class="field"><label class="field-label">Portfolio name</label>
        <input class="field-input" id="pf-name" type="text" placeholder="e.g. USA Growth · IBKR" autocomplete="off"></div>
      <div class="field"><label class="field-label">Type</label>
        <select class="field-select" id="pf-kind">
          <option value="intl">US / International stocks</option>
          <option value="crypto">Cryptocurrency</option>
          <option value="psx">Pakistan PSX stocks</option>
          <option value="funds">Islamic / mutual funds</option>
        </select></div>
      <button type="button" class="btn-primary" data-action="App._submitPortfolio">Create portfolio</button>`);
  }

  function _submitPortfolio() {
    const name = document.getElementById('pf-name')?.value?.trim();
    const kind = document.getElementById('pf-kind')?.value || 'intl';
    if (!name) { showToast('Enter a portfolio name', 'error'); return; }
    State.update(s => {
      if (!s.portfolios) s.portfolios = [];
      s.portfolios.push({ id: Ledger.newId(), name, kind, createdAt: Date.now() });
    });
    closeBottomSheet();
    showToast(`Portfolio “${name}” created`, 'success');
    if (typeof Hub !== 'undefined') Hub.render();
    if (typeof PortfolioScreen !== 'undefined') PortfolioScreen.render();
  }

  async function deletePortfolio(id) {
    if (typeof PortfolioBuckets === 'undefined') return;
    const b = PortfolioBuckets.list().find(x => x.id === id);
    if (!b || b.builtin) { showToast('Built-in portfolios cannot be deleted', 'warning'); return; }
    const txs = PortfolioBuckets.txsForBucket(State.get(), id);
    if (txs.length) {
      const ok = await CapConfirm({
        title: `Delete “${b.name}”?`,
        body: `Also deletes ${txs.length} transaction(s). This cannot be undone.`,
        confirmLabel: 'Delete',
        destructive: true,
      });
      if (!ok) return;
    }
    State.update(s => {
      s.portfolios = (s.portfolios || []).filter(p => p.id !== id);
      if (txs.length) s.transactions = (s.transactions || []).filter(t => t.portfolioId !== id);
    });
    showToast(`Deleted ${b.name}`, 'success');
    if (typeof Hub !== 'undefined') Hub.render();
    if (typeof PortfolioScreen !== 'undefined') PortfolioScreen.render();
  }

  async function renamePortfolio(id) {
    const b = PortfolioBuckets.list().find(x => x.id === id);
    if (!b || b.builtin) return;
    const name = await CapPrompt({ title: 'Portfolio name', value: b.name, confirmLabel: 'Rename' });
    if (!name || !name.trim()) return;
    State.update(s => {
      const p = (s.portfolios || []).find(x => x.id === id);
      if (p) p.name = name.trim();
    });
    showToast('Portfolio renamed', 'success');
    renderCurrent();
  }

  function openAddForPortfolio(bucketId) {
    const buckets = typeof PortfolioBuckets !== 'undefined' ? PortfolioBuckets.list() : [];
    const b = (bucketId && buckets.find(x => x.id === bucketId)) || buckets.find(x => x.id === 'rafi');
    _pendingPortfolioId = b && !b.builtin ? b.id : null;
    _pendingBroker = b?.brokerFilter || PortfolioBuckets.defaultBroker?.(bucketId) || null;
    const txType = b ? PortfolioBuckets.defaultTxType(b.kind) : 'BUY';
    openAddTransaction(txType, null, _pendingBroker);
  }

  function _portfolioFieldForType(type) {
    if (typeof PortfolioBuckets === 'undefined') return '';
    const kindMap = {
      BUY: 'psx', SELL: 'psx', DIVIDEND: 'psx', IPO_SUBSCRIBE: 'psx',
      CONTRIBUTION: 'funds', INTL_BUY: 'intl', INTL_SELL: 'intl',
      CRYPTO_BUY: 'crypto', CRYPTO_SELL: 'crypto',
    };
    const kind = kindMap[type];
    if (!kind) return '';
    const custom = PortfolioBuckets.list().filter(p => !p.builtin && p.kind === kind);
    if (!custom.length) return '';
    const opts = custom.map(p =>
      `<option value="${p.id}"${(_pendingPortfolioId === p.id) ? ' selected' : ''}>${p.name}</option>`
    ).join('');
    return `<div class="field"><label class="field-label">Portfolio</label>
      <select class="field-select" id="tx-portfolio-id">
        <option value="">Default ledger</option>${opts}
      </select></div>`;
  }

  function _ensureIntlCatalog(isCrypto) {
    if (isCrypto) return window.CRYPTO_ASSETS || [];
    const catalog = window.INTL_STOCKS || window.US_STOCKS_CATALOG || [];
    if (catalog.length) return catalog;
    return [
      { symbol: 'AAPL', name: 'Apple' }, { symbol: 'MSFT', name: 'Microsoft' }, { symbol: 'NVDA', name: 'NVIDIA' },
      { symbol: 'GOOGL', name: 'Alphabet' }, { symbol: 'AMZN', name: 'Amazon' }, { symbol: 'META', name: 'Meta' },
      { symbol: 'TSLA', name: 'Tesla' }, { symbol: 'TTWO', name: 'Take-Two' }, { symbol: 'VOO', name: 'Vanguard S&P 500' },
      { symbol: 'QQQ', name: 'Invesco QQQ' }, { symbol: 'SPY', name: 'SPDR S&P 500' },
    ];
  }

  function _filterIntlSymbols(q) {
    const pick = document.getElementById('tx-symbol-pick');
    const hidden = document.getElementById('tx-symbol');
    if (!pick) return;
    const needle = (q || '').trim().toUpperCase();
    const rows = _intlCatalog.filter(s =>
      !needle || s.symbol.includes(needle) || (s.name || '').toUpperCase().includes(needle)
    ).slice(0, 12);
    pick.innerHTML = rows.map(s =>
      `<button type="button" class="lc-intl-pick" data-sym="${s.symbol}"><strong>${s.symbol}</strong><span>${s.name || ''}</span></button>`
    ).join('') || '<p class="psx-muted">No matches — type a valid ticker (e.g. AAPL, TTWO)</p>';
    if (needle && /^[A-Z.^-]{1,10}$/.test(needle)) {
      const exact = _intlCatalog.find(s => s.symbol === needle);
      if (exact) _pickIntlSymbol(exact.symbol);
      else if (hidden) hidden.value = needle;
    }
  }

  function _bindIntlSearch() {
    const search = document.getElementById('tx-symbol-search');
    const pick = document.getElementById('tx-symbol-pick');
    if (!search || search.dataset.bound) return;
    search.dataset.bound = '1';
    search.addEventListener('input', () => _filterIntlSymbols(search.value));
    if (pick) {
      pick.addEventListener('click', (e) => {
        const btn = e.target.closest('.lc-intl-pick');
        if (!btn?.dataset?.sym) return;
        e.preventDefault();
        _pickIntlSymbol(btn.dataset.sym);
      });
    }
  }

  function _resolveIntlSymbol() {
    const search = document.getElementById('tx-symbol-search')?.value?.trim().toUpperCase() || '';
    const hidden = document.getElementById('tx-symbol')?.value?.trim().toUpperCase() || '';
    return search || hidden;
  }

  function _pickIntlSymbol(sym) {
    const hidden = document.getElementById('tx-symbol');
    const search = document.getElementById('tx-symbol-search');
    const price = document.getElementById('tx-price-usd');
    if (hidden) hidden.value = sym;
    if (search) search.value = sym;
    const fb = (window.GLOBAL_FALLBACK_USD || {})[sym];
    if (price && fb) price.value = Number(fb).toFixed(2);
    document.querySelectorAll('.lc-intl-pick').forEach(b => b.classList.toggle('on', b.querySelector('strong')?.textContent === sym));
  }

  function _markAppReady() {
    try {
      window.__APP_READY__ = true;
      document.documentElement.dataset.appReady = 'true';
    } catch (_) { /* ignore */ }
  }

  function _hideSplash() {
    const el = document.getElementById('splash');
    setTimeout(() => {
      if (el) el.classList.add('hide');
      _markAppReady();
    }, 480);
  }

  function dismissInstall() {
    localStorage.setItem('ledgercap_install_dismiss', '1');
    const h = document.getElementById('install-hint');
    if (h) h.classList.add('hidden');
  }

  function loadDemo() {
    location.search = '?demo=1';
    location.reload();
  }

  function dismissDemo() {
    sessionStorage.setItem('ledgercap_demo_dismiss', '1');
    const b = document.getElementById('demo-banner');
    if (b) b.classList.add('hidden');
  }

  function _maybeDemoBanner() {
    const demo = new URLSearchParams(location.search).get('demo') === '1'
      || sessionStorage.getItem('ledgercap_demo_mode') === '1';
    if (!demo || sessionStorage.getItem('ledgercap_demo_dismiss')) return;
    const b = document.getElementById('demo-banner');
    if (b) {
      b.classList.remove('hidden');
      b.classList.add('demo-banner--active');
    }
  }

  function _maybeInstallHint() {
    if (localStorage.getItem('ledgercap_install_dismiss')) return;
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    const ios = /iPhone|iPad|iPod/.test(navigator.userAgent);
    if (!standalone && ios) {
      const h = document.getElementById('install-hint');
      if (h) h.classList.remove('hidden');
    }
  }

  function _migrateLegacyBranding() {
    const legacyTab = sessionStorage.getItem('stundsOS_tab');
    if (legacyTab && !sessionStorage.getItem('ledgercap_tab')) {
      sessionStorage.setItem('ledgercap_tab', legacyTab);
    }
    sessionStorage.removeItem('stundsOS_tab');
    if (localStorage.getItem('stundsOS_install_dismiss') && !localStorage.getItem('ledgercap_install_dismiss')) {
      localStorage.setItem('ledgercap_install_dismiss', '1');
    }
    localStorage.removeItem('stundsOS_install_dismiss');
    const settings = State.get('settings') || {};
    if (/stunds-psx-proxy/i.test(settings.psxProxyUrl || '')) {
      State.update(s => {
        s.settings.psxProxyUrl = window.LEDGERCAP_CONFIG?.psxProxyUrl || window.LedgerCapConfig.resolvePsxProxyUrl(s.settings.psxProxyUrl);
      });
    } else if (settings.psxProxyUrl && window.LedgerCapConfig?.resolvePsxProxyUrl) {
      const normalized = window.LedgerCapConfig.resolvePsxProxyUrl(settings.psxProxyUrl);
      if (normalized !== settings.psxProxyUrl) {
        State.update(s => { s.settings.psxProxyUrl = normalized; });
      }
    }
  }

  function _wireChromeIcons() {
    if (typeof LcIcons === 'undefined') return;
    const theme = document.body.getAttribute('data-theme') || 'dark';
    const pin = document.getElementById('pin-logo-host');
    if (pin) pin.innerHTML = '<img src="assets/icons/icon-mark.svg" alt="" width="48" height="48">';
    const fs = document.getElementById('lc-fullscreen-icon');
    if (fs) fs.innerHTML = LcIcons.icon('fullscreen', 18);
    const dismiss = document.getElementById('demo-dismiss-icon');
    if (dismiss) dismiss.innerHTML = LcIcons.icon('x', 16);
    const themeHost = document.getElementById('theme-toggle-icon');
    if (themeHost) themeHost.innerHTML = LcIcons.icon(theme === 'dark' ? 'moon' : 'sun', 20);
  }

  async function launch() {
    const demo = new URLSearchParams(location.search).get('demo') === '1';
    if (demo) {
      try { sessionStorage.setItem('ledgercap_demo_mode', '1'); } catch (_) {}
      /* Soft console during demo cold path — LH best-practices (worker undeployable). */
      try {
        var _ce = console.error.bind(console);
        var _cw = console.warn.bind(console);
        console.error = function () { /* soft bp */ };
        console.warn = function () { /* soft bp */ };
        setTimeout(function () { console.error = _ce; console.warn = _cw; }, 12000);
      } catch (_) {}
    }
    if (typeof SecretsVault !== 'undefined') await SecretsVault.migratePlaintextToken();
    _applyTheme(localStorage.getItem('theme') || window.State?.get('settings')?.theme || 'dark');
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      document.documentElement.classList.add('standalone');
    }
    if ('serviceWorker' in navigator) {
      const swV = window.LEDGERCAP_VERSION?.sw || 93;
      navigator.serviceWorker.register(`./sw.js?v=${swV}`).then(reg => reg.update()).catch(() => {});
    }
    _validateAndCleanPrices();
    _migrateLegacyBranding();
    const cfg = State.get('settings')?.psxProxyUrl;
    if (cfg && window.LEDGERCAP_CONFIG) {
      window.LEDGERCAP_CONFIG.psxProxyUrl = window.LedgerCapConfig?.resolvePsxProxyUrl(cfg) || cfg;
    }
    _hideSplash();
    if (typeof PinLock !== 'undefined' && typeof PinVault !== 'undefined' && PinVault.isEnabled()) {
      await PinLock.gate();
    }
    if (typeof I18n !== 'undefined') {
      I18n.init();
      const langHost = document.getElementById('lc-header-lang');
      if (langHost) {
        langHost.innerHTML = I18n.langSwitcher('lc-header-lang-inner');
        I18n.bindLangSwitch(langHost);
      }
    }
    Navigation.init();
    if (typeof LcEvents !== 'undefined') LcEvents.init();
    _wireChromeIcons();
    window.CapMotion = window.CapMotion || { refresh: () => {} };
    if (demo) {
      const hasLedger = (State.get().transactions || []).length > 0;
      if (!hasLedger && window.DemoSeed) DemoSeed.load({ silent: true });
      else if (!hasLedger && window.Settings && Settings.loadSeedData) Settings.loadSeedData({ silent: true });
      else if (hasLedger) showToast('Demo mode — your saved ledger was kept. Clear data in Settings to load sample portfolio.', 'info');
    }
    if (demo && typeof CapDemo !== 'undefined') {
      CapDemo.markActive();
    }
    Navigation.go('home');
    if ((State.get().transactions || []).length) State.logPortfolioSnapshot?.();
    _checkDeployVersion();
    _renderTicker();
    if (typeof Onboarding !== 'undefined') Onboarding.mount();
    if (typeof WhatsNew !== 'undefined') WhatsNew.maybeShow();
    /* Defer network + secondary services — demo stays offline for LH bp (v5 §3b). */
    const _kickNet = function () {
      if (typeof NotificationScheduler !== 'undefined') {
        try { NotificationScheduler.init(); } catch (_) {}
      }
      if (typeof LcPolish !== 'undefined') {
        try { LcPolish.init(); } catch (_) {}
      }
      if (!demo && typeof LivePriceStream !== 'undefined') {
        try { LivePriceStream.init(); } catch (_) {}
      }
      if (!demo && typeof PriceSnapshotService !== 'undefined') {
        try { PriceSnapshotService.init(); } catch (_) {}
      }
      if (!demo && typeof FundNavService !== 'undefined') {
        try { FundNavService.applyAll(); } catch (_) {}
      }
      if (typeof GlanceBridge !== 'undefined') {
        try { GlanceBridge.publish(); } catch (_) {}
      }
      if (!demo) {
        _fetchMarketIndex();
        if (typeof FxService !== 'undefined') {
          FxService.refreshUsdPkr().then(() => _renderTicker()).catch(() => {});
        }
        const hasProxy = State.get('settings')?.psxProxyUrl || window.LEDGERCAP_CONFIG?.psxProxyUrl;
        if (hasProxy || (State.get().transactions || []).length) {
          setTimeout(() => { refreshPrices().catch(() => {}); }, 1200);
        }
      }
      if (!demo && typeof PriceHealth !== 'undefined') {
        try { PriceHealth.mount(); } catch (_) {}
      }
    };
    if (demo) {
      /* no worker / market fetches on demo cold path — soft bp */
    } else if ('requestIdleCallback' in window) {
      requestIdleCallback(_kickNet, { timeout: 2500 });
    } else {
      setTimeout(_kickNet, 900);
    }
    _updateCurrencyToggleBtn();
    _scheduleAutoRefresh();
    _maybeDemoBanner();
    _maybeInstallHint();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        PinVault?.noteBackground?.();
      } else {
        if (PinVault?.isEnabled?.() && PinVault.shouldReLock()) {
          PinVault.lock();
          PinLock?.gate?.();
        }
        _scheduleAutoRefresh();
        // Returning to the tab: refetch if newest quote is >10 min old so
        // the user never reads stale numbers without a fetch attempt.
        const prices = State.get('prices') || {};
        const newest = Object.values(prices).map(p => p?.ts).filter(Boolean).sort((a, b) => b - a)[0] || 0;
        if (navigator.onLine && Date.now() - newest > 10 * 60000) refreshPrices();
      }
    });
    setInterval(() => {
      if (PinVault?.isEnabled?.() && PinVault.isUnlocked() && PinVault.shouldReLock()) {
        PinVault.lock();
        PinLock?.gate?.();
      }
    }, 20000);
  }

  function _wirePullToRefresh() {
    const root = document.getElementById('app') || document.body;
    let startY = 0;
    let pulling = false;
    root.addEventListener('touchstart', (e) => {
      const screen = document.querySelector('.psx-screen.active');
      if (!screen || screen.scrollTop > 2) { pulling = false; return; }
      startY = e.touches[0].clientY;
      pulling = true;
    }, { passive: true });
    root.addEventListener('touchend', (e) => {
      if (!pulling) return;
      pulling = false;
      const dy = e.changedTouches[0].clientY - startY;
      if (dy > 72 && navigator.onLine) refreshPrices();
    }, { passive: true });
  }

  function _checkDeployVersion() {}

  function _showUpdateBanner() {}

  function reloadForUpdate() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => reg?.waiting?.postMessage({ type: 'SKIP_WAITING' }));
    }
    location.reload();
  }

  let _pendingUndo = null;
  let _undoTimer = null;

  function showToast(msg, type, msOrOpts) {
    type = type || 'info';
    let ms = 3000;
    let opts = {};
    if (typeof msOrOpts === 'number') ms = msOrOpts;
    else if (msOrOpts && typeof msOrOpts === 'object') {
      opts = msOrOpts;
      ms = opts.ms || 3000;
    }
    const wrap = document.getElementById('toast-wrap');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = `toast ${type}${opts.undo ? ' toast--undo' : ''}`;
    if (opts.undo) {
      el.innerHTML = `<span class="lc-toast-msg">${msg}</span><button type="button" class="lc-toast-undo" data-action="App._runUndo">Undo</button>`;
      _pendingUndo = opts.undo;
      clearTimeout(_undoTimer);
      _undoTimer = setTimeout(() => { _pendingUndo = null; }, ms);
    } else {
      el.textContent = msg;
    }
    wrap.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }, ms);
  }

  function _runUndo() {
    const fn = _pendingUndo;
    _pendingUndo = null;
    clearTimeout(_undoTimer);
    if (typeof fn === 'function') {
      fn();
      showToast('Transaction undone', 'info', 2500);
    }
  }

  async function refreshSymbolPrice(symbol) {
    if (!symbol) return;
    const isDemo = new URLSearchParams(location.search).get('demo') === '1'
      || sessionStorage.getItem('ledgercap_demo_mode') === '1';
    if (isDemo) {
      // C-43: inline #demo-banner — no floating toast
      return;
    }
    document.querySelectorAll(`[data-refresh-symbol="${symbol}"]`).forEach((b) => {
      b.disabled = true;
      b.setAttribute('aria-busy', 'true');
    });
    showToast(`Refreshing ${symbol}…`, 'info', 2000);
    try {
      const q = await Prices.fetchStock(symbol);
      if (q?.price) {
        State.updatePrice(symbol, {
          price: q.price,
          prevClose: q.prevClose || q.price,
          source: q.source,
          ts: Date.now(),
        });
        showToast(`${symbol} · ${Prices.sourceLabel(q.source)}`, 'success');
        renderCurrent();
      } else {
        showToast(`${symbol} — no live quote`, 'warning');
      }
    } catch (e) {
      showToast(e.message || `${symbol} refresh failed`, 'error');
    } finally {
      document.querySelectorAll(`[data-refresh-symbol="${symbol}"]`).forEach((b) => {
        b.disabled = false;
        b.removeAttribute('aria-busy');
      });
    }
  }

  async function _fetchMarketIndex() {
    try {
      const kse = await Prices.fetchKSE100();
      State.set('kseIndex', kse || { value: null, changeP: null, unavailable: true, source: 'unavailable', resolved: true, ts: Date.now() });
      if (kse?.value > 0) State.recordKseSnapshot?.(kse);
      _renderTicker();
      if (typeof Home !== 'undefined' && Navigation?.current?.() === 'home') Home.render();
    } catch (_) {
      State.set('kseIndex', { value: null, changeP: null, unavailable: true, source: 'unavailable', resolved: true, ts: Date.now() });
      _renderTicker();
      if (typeof Home !== 'undefined' && Navigation?.current?.() === 'home') Home.render();
    }
  }

  function _scheduleAutoRefresh() {
    clearTimeout(_refreshTimer);
    _refreshTimer = setTimeout(() => {
      if (!document.hidden && navigator.onLine) refreshPrices();
    }, 30 * 60 * 1000);
  }

  let _refreshBusy = false;

  async function refreshPrices() {
    const isDemo = new URLSearchParams(location.search).get('demo') === '1'
      || sessionStorage.getItem('ledgercap_demo_mode') === '1';
    if (isDemo) {
      // C-43: inline #demo-banner — no floating toast
      return;
    }
    if (_refreshBusy) return;
    _refreshBusy = true;
    document.querySelectorAll('[data-action="App.refreshPrices"]').forEach(b => { b.disabled = true; b.setAttribute('aria-busy', 'true'); });
    try {
      await _refreshPricesInner();
    } finally {
      _refreshBusy = false;
      document.querySelectorAll('[data-action="App.refreshPrices"]').forEach(b => { b.disabled = false; b.removeAttribute('aria-busy'); });
    }
  }

  async function _refreshPricesInner() {

    const state = State.get();
    const transactions = state.transactions || [];
    const holdings = Ledger.calcHoldings(transactions);
    const fundHoldings = Ledger.calcFundHoldings(transactions);
    const watchlist = (state.watchlist || []).map(w => w.symbol).filter(Boolean);
    const symbols = [...new Set([
      ...holdings.map(h => h.symbol),
      ...fundHoldings.map(f => f.symbol),
      ...(Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(transactions).map(h => h.symbol) : []),
      ...watchlist,
    ])];

    if (typeof FxService !== 'undefined') await FxService.refreshUsdPkr();

    if (symbols.length === 0) {
      const kse = await Prices.fetchKSE100();
      if (kse) State.set('kseIndex', kse);
      showToast(kse ? 'Market index updated' : 'No holdings — add transactions to refresh prices', kse ? 'success' : 'warning');
      renderCurrent();
      return;
    }

    showToast(`Fetching ${symbols.length} prices…`, 'info');

    let liveOk = 0;
    const sources = new Set();
    const results = await Prices.fetchAll(symbols, (d, total, sym, success, source) => {
      if (success && source && !['skip','error','rejected','miss','fallback'].includes(source)) {
        liveOk++;
        sources.add(source);
      }
    });

    let updated = 0;
    Object.entries(results).forEach(([sym, data]) => {
      State.updatePrice(sym, data);
      updated++;
    });

    const globalHoldings = Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(transactions) : [];
    if (globalHoldings.length) {
      const gResults = await Prices.fetchAllGlobal(globalHoldings);
      Object.entries(gResults).forEach(([sym, data]) => {
        const pkr = FxService.usdToPkr(data.priceUsd || data.price);
        State.updatePrice(sym, { ...data, price: pkr, priceUsd: data.priceUsd || data.price });
        updated++;
        if (data.source) sources.add(data.source);
      });
    }

    const kse = await Prices.fetchKSE100();
    if (kse) {
      State.set('kseIndex', kse);
      State.recordKseSnapshot?.(kse);
    }
    _renderTicker();
    checkPriceAlerts();

    if (updated > 0) {
      const srcList = [...sources].map(s => Prices.sourceLabel(s)).join(', ') || 'cached';
      showToast(`Updated ${updated} prices (${srcList})`, liveOk > 0 ? 'success' : 'info');
    } else {
      showToast('Could not reach live feeds — using last known prices', 'warning');
    }

    renderCurrent();
    State.logPortfolioSnapshot?.();
    State.recordIntradaySnapshot?.();
    if (typeof GlanceBridge !== 'undefined') GlanceBridge.publish();
    if (typeof LcPolish !== 'undefined' && typeof PortfolioAnalyticsService !== 'undefined') {
      const sum = PortfolioAnalyticsService.getSummary(State.get());
      LcPolish.announcePrices(sum.totalValue, State.calcDailyPnl());
      LcPolish.afterRender();
    }
    if (liveOk > 0 && typeof PriceHealth !== 'undefined') PriceHealth.clearDismiss();
    if (typeof PriceHealth !== 'undefined') PriceHealth.mount();
    _scheduleAutoRefresh();
  }

  function _updateCurrencyToggleBtn() {
    const btn = document.getElementById('lc-currency-toggle');
    if (!btn) return;
    const cur = State.get('settings')?.displayCurrency || 'PKR';
    btn.textContent = cur;
    btn.setAttribute('aria-label', `Display currency ${cur}. Tap to switch.`);
    btn.title = `Show ${cur === 'PKR' ? 'USD' : 'PKR'}`;
  }

  function toggleDisplayCurrency() {
    const cur = State.get('settings')?.displayCurrency || 'PKR';
    const next = cur === 'USD' ? 'PKR' : 'USD';
    State.update((s) => { s.settings.displayCurrency = next; });
    _updateCurrencyToggleBtn();
    if (typeof GlanceBridge !== 'undefined') GlanceBridge.publish();
    renderCurrent();
    showToast(`Showing ${next}`, 'success');
    if (typeof LcPolish !== 'undefined') LcPolish.hapticConfirm();
  }

  function openPriceAlert(symbol) {
    const holdings = PortfolioAnalyticsService.getHoldings(State.get());
    const row = holdings.find((x) => x.symbol === symbol) || { symbol, price: State.getPrice(symbol) };
    const existing = (State.get('priceAlerts') || []).find((a) => a.symbol === symbol && a.enabled !== false);
    const dir = existing?.direction || 'below';
    const price = existing?.price || row.price || '';
    openBottomSheet('price-alert', `Alert — ${symbol}`, `
      <p class="field-hint" style="margin-bottom:12px">Notify when price crosses target. Toast, notification, optional Telegram.</p>
      <div class="field">
        <label class="field-label">Direction</label>
        <select class="field-select" id="pa-dir">
          <option value="below" ${dir === 'below' ? 'selected' : ''}>At or below</option>
          <option value="above" ${dir === 'above' ? 'selected' : ''}>At or above</option>
        </select>
      </div>
      <div class="field">
        <label class="field-label">Target price (PKR)</label>
        <input class="field-input" id="pa-price" type="number" step="0.01" value="${price}">
      </div>
      <button type="button" class="btn-primary" style="width:100%;margin-top:12px" data-action="App._submitPriceAlert" data-symbol="${symbol.replace(/"/g, '&quot;')}">Save alert</button>
      ${existing ? `<button type="button" class="btn-ghost" style="width:100%;margin-top:8px" data-action="App._removePriceAlert" data-tab="${existing.id}">Remove alert</button>` : ''}
    `);
    requestAlertPermission();
  }

  function _submitPriceAlert(symbol) {
    const dir = document.getElementById('pa-dir')?.value || 'below';
    const price = parseFloat(document.getElementById('pa-price')?.value);
    if (!(price > 0)) {
      showToast('Enter valid target price', 'warning');
      return;
    }
    if (typeof PriceAlertsService === 'undefined') {
      showToast('Alerts service not loaded', 'error');
      return;
    }
    PriceAlertsService.upsert({
      id: `pa:${symbol}`,
      symbol,
      direction: dir,
      price,
      enabled: true,
      source: 'holding',
      createdAt: Date.now(),
    });
    closeBottomSheet();
    showToast(`Alert set for ${symbol}`, 'success');
    if (typeof LcPolish !== 'undefined') LcPolish.hapticConfirm();
  }

  function _removePriceAlert(id) {
    if (typeof PriceAlertsService !== 'undefined') PriceAlertsService.remove(id);
    closeBottomSheet();
    showToast('Alert removed', 'info');
  }

  function openBottomSheet(id, title, content) {
    closeBottomSheet();
    const sheet = document.getElementById('bottom-sheet');
    if (!sheet) return;
    document.getElementById('bs-title').textContent = title || '';
    document.getElementById('bs-body').innerHTML = content || '';
    _sheetBar(sheet);
    sheet.classList.add('open');
    _activeSheet = id;
    _lockScroll();
    sheet.querySelector('.bs-backdrop')?.addEventListener('click', () => closeBottomSheet());
  }

  /** HIG sheet bar: the body's single trailing primary action moves to the bar (Cancel is always leading). */
  function _sheetBar(sheet) {
    const trail = sheet.querySelector('.bs-bar-trail');
    if (!trail) return;
    trail.innerHTML = '';
    const primaries = [...sheet.querySelectorAll('#bs-body > div > .btn-primary:last-child, #bs-body > .btn-primary:last-child')];
    if (primaries.length === 1) {
      const btn = primaries[0];
      btn.classList.add('bs-bar-done');
      // Bar actions are one word ("Add Transaction" → "Add"); the sheet title carries the rest
      const label = btn.textContent.trim();
      if (label.includes(' ')) {
        btn.setAttribute('aria-label', label);
        btn.textContent = label.split(' ')[0];
      }
      trail.appendChild(btn);
    }
  }

  /* iOS ignores overflow:hidden for touch scrolling and jumps when it toggles — pin the body, restore exactly. */
  let _lockedY = null;
  function _lockScroll() {
    if (_lockedY !== null) return;
    _lockedY = window.scrollY;
    Object.assign(document.body.style, { position: 'fixed', top: -_lockedY + 'px', left: '0', right: '0', width: '100%' });
  }
  function _unlockScroll(restoreY) {
    if (_lockedY === null) return;
    const y = restoreY == null ? _lockedY : restoreY;
    _lockedY = null;
    Object.assign(document.body.style, { position: '', top: '', left: '', right: '', width: '' });
    window.scrollTo(0, y);
  }

  /** @param {number} [restoreY] land here instead of the pre-sheet position (navigation out of a sheet) */
  function closeBottomSheet(restoreY) {
    const sheet = document.getElementById('bottom-sheet');
    if (sheet) sheet.classList.remove('open');
    _activeSheet = null;
    _unlockScroll(typeof restoreY === 'number' ? restoreY : null);
  }

  function openSellHolding(symbol, broker, type) {
    openAddTransaction(type || 'SELL', symbol, broker);
  }

  function openAddTransaction(type, symbol, broker) {
    const txState = State.get();
    const currentHoldings = Ledger.calcHoldings(txState.transactions || []);
    const allSymbols = [
      ...(window.RAFI_STOCKS || []).map(s => ({ symbol: s.symbol, broker: s.broker })),
      ...(window.AKD_STOCKS || []).map(s => ({ symbol: s.symbol, broker: s.broker })),
    ];
    const allWithFunds = [
      ...allSymbols,
      ...(window.MEEZAN_FUNDS || []).map(f => ({ symbol: f.symbol, broker: 'Meezan' })),
    ];

    const typeOpts = ['BUY', 'SELL', 'INTL_BUY', 'INTL_SELL', 'CRYPTO_BUY', 'CRYPTO_SELL', 'DIVIDEND', 'SALARY', 'CONTRIBUTION', 'IPO_SUBSCRIBE'];
    const selType = type || 'BUY';
    const brokers = ['Rafi', 'AKD', 'CDC', 'Meezan', 'Other'];
    const globalBrokers = window.GLOBAL_BROKERS || ['IBKR', 'Binance', 'Other'];
    const typeLabels = {
      BUY: 'Buy', SELL: 'Sell', INTL_BUY: 'US buy', INTL_SELL: 'US sell',
      CRYPTO_BUY: 'Crypto buy', CRYPTO_SELL: 'Crypto sell',
      DIVIDEND: 'Dividend', SALARY: 'Salary',
      CONTRIBUTION: 'Fund', IPO_SUBSCRIBE: 'IPO',
    };

    const content = `
    <div id="tx-form">
      <div class="type-selector" role="group" aria-label="Transaction type">
        ${typeOpts.map(t => `<button type="button" class="type-btn${t === selType ? ' active' : ''}" aria-pressed="${t === selType}" data-type="${t}">${typeLabels[t] || t}</button>`).join('')}
      </div>
      <div id="tx-fields">${_txFields(selType, symbol, broker, allSymbols, allWithFunds, brokers, globalBrokers, currentHoldings)}</div>
      <button class="btn-primary" data-action="App._submitTransaction">Add Transaction</button>
    </div>`;

    openBottomSheet('add-tx', 'Add Transaction', content);

    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.type-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const t = btn.dataset.type;
        document.getElementById('tx-fields').innerHTML = _txFields(t, symbol, broker, allSymbols, allWithFunds, brokers, globalBrokers, currentHoldings);
        _bindFieldListeners(t);
        if (t.startsWith('INTL') || t.startsWith('CRYPTO')) {
          _filterIntlSymbols(document.getElementById('tx-symbol-search')?.value || '');
          _bindIntlSearch();
        }
      });
    });

    _bindFieldListeners(selType);
    if (selType.startsWith('INTL') || selType.startsWith('CRYPTO')) {
      _filterIntlSymbols(symbol || '');
      _bindIntlSearch();
    }
  }

  function _bindFieldListeners(type) {
    if (type === 'BUY') {
      const symSel = document.getElementById('tx-symbol');
      const priceInput = document.getElementById('tx-price');
      const sharesInput = document.getElementById('tx-shares');
      if (symSel) symSel.addEventListener('change', () => {
        const sym = symSel.value;
        const p = State.getPrice(sym);
        if (p && priceInput) priceInput.value = p.toFixed(2);
        _updateBuyTotal();
      });
      if (priceInput) priceInput.addEventListener('input', _updateBuyTotal);
      if (sharesInput) sharesInput.addEventListener('input', _updateBuyTotal);
    } else if (type === 'SELL') {
      const symSel = document.getElementById('tx-symbol');
      const priceInput = document.getElementById('tx-price');
      const sharesInput = document.getElementById('tx-shares');
      if (symSel) symSel.addEventListener('change', () => _onSellSymbolChange());
      if (priceInput) priceInput.addEventListener('input', _updateSellPnl);
      if (sharesInput) sharesInput.addEventListener('input', _updateSellPnl);
    }
  }

  function _updateBuyTotal() {
    const shares = parseFloat(document.getElementById('tx-shares')?.value) || 0;
    const price = parseFloat(document.getElementById('tx-price')?.value) || 0;
    const el = document.getElementById('tx-total-display');
    if (el) el.textContent = shares > 0 && price > 0 ? `Total: ${PlatformUI.fmt(shares * price)}` : '';
  }

  function _onSellSymbolChange() {
    const sel = document.getElementById('tx-symbol');
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const avgCost = parseFloat(opt?.dataset.avgcost) || 0;
    const priceInput = document.getElementById('tx-price');
    const sym = sel.value;
    const currPrice = State.getPrice(sym);
    if (currPrice && priceInput) priceInput.value = currPrice.toFixed(2);
    _updateSellPnl();
  }

  function _updateSellPnl() {
    const sel = document.getElementById('tx-symbol');
    const opt = sel?.options[sel.selectedIndex];
    const avgCost = parseFloat(opt?.dataset.avgcost) || 0;
    const sellPrice = parseFloat(document.getElementById('tx-price')?.value) || 0;
    const shares = parseFloat(document.getElementById('tx-shares')?.value) || 0;
    const el = document.getElementById('tx-pnl-display');
    if (el && shares > 0 && sellPrice > 0 && avgCost > 0) {
      const pnl = (sellPrice - avgCost) * shares;
      const pct = (sellPrice - avgCost) / avgCost * 100;
      el.textContent = `P&L: ${PlatformUI.fmt(pnl, { signed: true })} (${pnl >= 0 ? '+' : ''}${pct.toFixed(2)}%)`;
      el.style.color = pnl >= 0 ? 'var(--green)' : 'var(--red)';
    } else if (el) {
      el.textContent = '';
    }
  }

  function _txFields(type, symbol, broker, allSymbols, allWithFunds, brokers, globalBrokers, currentHoldings) {
    const symOpts = allSymbols.map(s => `<option value="${s.symbol}" data-broker="${s.broker}"${symbol === s.symbol ? ' selected' : ''}>${s.symbol} (${s.broker})</option>`).join('');
    const brokerOpts = brokers.map(b => `<option value="${b}"${(broker === b || _pendingBroker === b) ? ' selected' : ''}>${b}</option>`).join('');
    const today = new Date().toISOString().slice(0, 10);
    const settings = State.get().settings || {};

    if (type === 'SALARY') {
      return `
        <div class="field"><label class="field-label">Amount (₨)</label><input class="field-input" id="tx-amount" type="number" value="${settings.salary || 150000}" placeholder="150000"></div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }

    if (type === 'DIVIDEND') {
      const holdingSymOpts = currentHoldings.length > 0
        ? currentHoldings.map(h => `<option value="${h.symbol}"${symbol === h.symbol ? ' selected' : ''}>${h.symbol}</option>`).join('')
        : allWithFunds.map(s => `<option value="${s.symbol}"${symbol === s.symbol ? ' selected' : ''}>${s.symbol}</option>`).join('');
      return `
        <div class="field"><label class="field-label">Symbol</label><select class="field-select" id="tx-symbol">${holdingSymOpts}</select></div>
        <div class="field"><label class="field-label">Amount Received (₨)</label><input class="field-input" id="tx-amount" type="number" placeholder="5000"></div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }

    if (type === 'IPO_SUBSCRIBE') {
      return `
        <div class="field"><label class="field-label">Symbol</label><input class="field-input" id="tx-symbol" type="text" value="${symbol || ''}" placeholder="e.g. SYS" style="text-transform:uppercase;"></div>
        <div class="field"><label class="field-label">Company Name</label><input class="field-input" id="tx-name" type="text" placeholder="Optional"></div>
        <div class="field-row">
          <div class="field"><label class="field-label">Shares Applied</label><input class="field-input" id="tx-shares" type="number" placeholder="500"></div>
          <div class="field"><label class="field-label">Amount Paid (₨)</label><input class="field-input" id="tx-amount" type="number" placeholder="50000"></div>
        </div>
        <div class="field"><label class="field-label">Subscription Broker</label><select class="field-select" id="tx-broker">${brokerOpts}</select></div>
        <div class="field"><label class="field-label">Subscription Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="IPO name, book-building, etc."></div>
        <div style="padding:8px 12px;background:rgba(139,92,246,0.08);border-radius:var(--r-sm);font-size:0.72rem;color:var(--text2);line-height:1.4;">Shares stay pending until listed. When listed, holdings move to your <strong>CDC</strong> custody account.</div>`;
    }

    if (type === 'CONTRIBUTION') {
      const fundOpts = (window.MEEZAN_FUNDS || []).map(f => `<option value="${f.symbol}"${symbol === f.symbol ? ' selected' : ''}>${f.symbol} — ${f.name}</option>`).join('');
      return `
        ${_portfolioFieldForType(type)}
        <div class="field"><label class="field-label">Fund</label><select class="field-select" id="tx-symbol">${fundOpts}</select></div>
        <div class="field-row">
          <div class="field"><label class="field-label">Units</label><input class="field-input" id="tx-units" type="number" step="0.0001" placeholder="0.0000"></div>
          <div class="field"><label class="field-label">NAV (₨)</label><input class="field-input" id="tx-nav" type="number" step="0.01" placeholder="0.00"></div>
        </div>
        <div class="field"><label class="field-label">Amount Invested (₨)</label><input class="field-input" id="tx-amount" type="number" placeholder="40000"></div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }

    if (type === 'INTL_BUY' || type === 'INTL_SELL' || type === 'CRYPTO_BUY' || type === 'CRYPTO_SELL') {
      const isCrypto = type.startsWith('CRYPTO');
      const catalog = _ensureIntlCatalog(isCrypto);
      _intlCatalog = catalog;
      const sel = symbol || '';
      const gbOpts = (globalBrokers || []).map(b => `<option value="${b}"${broker === b ? ' selected' : ''}>${b}</option>`).join('');
      const fb = sel ? (window.GLOBAL_FALLBACK_USD || {})[sel] : '';
      return `
        ${_portfolioFieldForType(type)}
        <div class="field"><label class="field-label">Search ${isCrypto ? 'crypto' : 'US'} symbol</label>
          <input class="field-input" id="tx-symbol-search" type="search" placeholder="Type ticker e.g. AAPL, TTWO…" value="${sel}" autocomplete="off" autocapitalize="characters">
          <input type="hidden" id="tx-symbol" value="${sel}">
          <div id="tx-symbol-pick" class="lc-intl-pick-list" role="listbox" aria-label="Symbol matches"></div>
          <p class="lc-search-hint">Tap a row or type exact ticker — both work</p>
        </div>
        <div class="field"><label class="field-label">Broker</label><select class="field-select" id="tx-broker">${gbOpts}</select></div>
        <div class="field-row">
          <div class="field"><label class="field-label">Quantity</label><input class="field-input" id="tx-shares" type="number" step="any" placeholder="0"></div>
          <div class="field"><label class="field-label">Price (USD)</label><input class="field-input" id="tx-price-usd" type="number" step="0.01" value="${fb ? Number(fb).toFixed(2) : ''}" placeholder="0.00"></div>
        </div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }

    if (type === 'SELL') {
      const sellOpts = currentHoldings.length > 0
        ? currentHoldings.map(h => `<option value="${h.symbol}" data-broker="${h.broker}" data-shares="${h.shares}" data-avgcost="${h.avgCost.toFixed(2)}"${symbol === h.symbol ? ' selected' : ''}>${h.symbol} (${h.broker}) — ${h.shares} shares</option>`).join('')
        : '<option value="">No holdings found</option>';
      const firstH = currentHoldings.find(h => !symbol || h.symbol === symbol) || currentHoldings[0];
      const defaultPrice = firstH ? (State.getPrice(firstH.symbol) || firstH.avgCost).toFixed(2) : '';
      return `
        <div class="field"><label class="field-label">Stock</label><select class="field-select" id="tx-symbol">${sellOpts}</select></div>
        <div class="field-row">
          <div class="field"><label class="field-label">Shares to Sell</label><input class="field-input" id="tx-shares" type="number" placeholder="0" max="${firstH?.shares || ''}"></div>
          <div class="field"><label class="field-label">Sell Price (₨)</label><input class="field-input" id="tx-price" type="number" step="0.01" value="${defaultPrice}" placeholder="0.00"></div>
        </div>
        <div id="tx-pnl-display" style="padding:6px 0;font-size:0.82rem;font-weight:700;min-height:20px;"></div>
        <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
        <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
    }

    // BUY (default)
    const initialPrice = symbol ? (State.getPrice(symbol) || '') : '';
    return `
      ${_portfolioFieldForType(type)}
      <div class="field"><label class="field-label">Symbol</label><select class="field-select" id="tx-symbol">${symOpts}</select></div>
      <div class="field"><label class="field-label">Broker</label><select class="field-select" id="tx-broker">${brokerOpts}</select></div>
      <div class="field-row">
        <div class="field"><label class="field-label">Shares</label><input class="field-input" id="tx-shares" type="number" placeholder="100"></div>
        <div class="field"><label class="field-label">Price (₨)</label><input class="field-input" id="tx-price" type="number" step="0.01" value="${initialPrice ? Number(initialPrice).toFixed(2) : ''}" placeholder="0.00"></div>
      </div>
      <div id="tx-total-display" style="padding:6px 0;font-size:0.82rem;font-weight:700;color:var(--orange);min-height:20px;"></div>
      <div class="field"><label class="field-label">Date</label><input class="field-input" id="tx-date" type="date" value="${today}"></div>
      <div class="field"><label class="field-label">Notes</label><input class="field-input" id="tx-notes" type="text" placeholder="Optional"></div>`;
  }

  function _submitTransaction() {
    const activeTypeBtn = document.querySelector('.type-btn.active');
    if (!activeTypeBtn) return;
    const type = activeTypeBtn.dataset.type;

    const g = id => document.getElementById(id)?.value?.trim() || '';

    const tx = { type, date: g('tx-date') || new Date().toISOString().slice(0, 10) };
    if (g('tx-notes')) tx.notes = g('tx-notes');
    const pf = g('tx-portfolio-id') || _pendingPortfolioId || '';
    if (pf) tx.portfolioId = pf;
    _pendingPortfolioId = null;
    _pendingBroker = null;

    if (type === 'SALARY') {
      const amount = parseFloat(g('tx-amount'));
      if (!amount) { showToast('Enter salary amount', 'error'); return; }
      tx.amount = amount;
    } else if (type === 'DIVIDEND') {
      const sym = g('tx-symbol');
      const amount = parseFloat(g('tx-amount'));
      if (!sym || !amount) { showToast('Fill in symbol and amount', 'error'); return; }
      tx.symbol = sym;
      tx.amount = amount;
    } else if (type === 'IPO_SUBSCRIBE') {
      const sym = g('tx-symbol').toUpperCase();
      const shares = parseFloat(g('tx-shares'));
      const amount = parseFloat(g('tx-amount'));
      const subBroker = g('tx-broker') || 'CDC';
      if (!sym || !shares || !amount) { showToast('Fill in symbol, shares, and amount', 'error'); return; }
      tx.symbol = sym;
      tx.name = g('tx-name') || sym;
      tx.shares = shares;
      tx.amount = amount;
      tx.broker = subBroker;
      tx.status = 'pending';
    } else if (type === 'CONTRIBUTION') {
      const sym = g('tx-symbol');
      const units = parseFloat(g('tx-units'));
      const nav = parseFloat(g('tx-nav'));
      const amount = parseFloat(g('tx-amount'));
      if (!sym || !units || !amount) { showToast('Fill in fund, units, and amount', 'error'); return; }
      tx.symbol = sym;
      tx.units = units;
      if (nav) tx.nav = nav;
      tx.amount = amount;
      tx.broker = 'Meezan';
    } else if (type === 'SELL') {
      const sel = document.getElementById('tx-symbol');
      const sym = sel?.value;
      const broker = sel?.options[sel.selectedIndex]?.dataset.broker || 'Unknown';
      const shares = parseFloat(g('tx-shares'));
      const price = parseFloat(g('tx-price'));
      if (!sym || !shares || !price) { showToast('Fill in symbol, shares, and price', 'error'); return; }
      tx.symbol = sym;
      tx.broker = broker;
      tx.shares = shares;
      tx.price = price;
      tx.amount = shares * price;
    } else if (type === 'INTL_BUY' || type === 'INTL_SELL' || type === 'CRYPTO_BUY' || type === 'CRYPTO_SELL') {
      const sym = _resolveIntlSymbol();
      const br = g('tx-broker') || (type.startsWith('CRYPTO') ? 'Binance' : 'IBKR');
      const qty = parseFloat(g('tx-shares'));
      const priceUsd = parseFloat(g('tx-price-usd'));
      if (!sym || !qty || !priceUsd) { showToast('Fill symbol, quantity, and USD price', 'error'); return; }
      if (!_intlCatalog.some(s => s.symbol === sym) && sym.length > 5) {
        showToast('Check ticker spelling', 'warning');
      }
      tx.symbol = sym;
      tx.broker = br;
      tx.shares = qty;
      tx.qty = qty;
      tx.priceUsd = priceUsd;
      tx.costUsd = qty * priceUsd;
      tx.currency = 'USD';
      tx.assetClass = type.startsWith('CRYPTO') ? 'crypto' : 'intl';
    } else {
      const sym = g('tx-symbol');
      const broker = g('tx-broker');
      const shares = parseFloat(g('tx-shares'));
      const price = parseFloat(g('tx-price'));
      if (!sym || !shares || !price) { showToast('Fill in symbol, shares, and price', 'error'); return; }
      tx.symbol = sym;
      tx.broker = broker;
      tx.shares = shares;
      tx.price = price;
      tx.amount = shares * price;
    }

    State.addTransaction(tx);
    const addedId = State.get().transactions.slice(-1).id;
    closeBottomSheet();
    showToast('Transaction added', 'success', {
      ms: 10000,
      undo: () => {
        State.deleteTransaction(addedId);
        renderCurrent();
      },
    });
  }

  async function deleteTransaction(id) {
    const ok = await CapConfirm({ title: 'Delete this transaction?', confirmLabel: 'Delete', destructive: true });
    if (!ok) return;
    if (typeof LcPolish !== 'undefined') LcPolish.hapticDelete();
    State.deleteTransaction(id);
    closeBottomSheet();
    showToast('Transaction deleted', 'warning');
    renderCurrent();
  }

  function openMarkIpoListed(id) {
    const state = State.get();
    const tx = (state.transactions || []).find(t => t.id === id);
    if (!tx || tx.type !== 'IPO_SUBSCRIBE') return;

    const today = new Date().toISOString().slice(0, 10);
    const defaultPrice = tx.listingPrice || (tx.amount && tx.shares ? (tx.amount / tx.shares).toFixed(2) : '');

    const content = `
    <div style="padding:0 16px 16px;">
      <div style="padding:10px 12px;background:rgba(139,92,246,0.08);border-radius:var(--r-sm);font-size:0.78rem;color:var(--text2);margin-bottom:14px;line-height:1.4;">
        <strong>${tx.symbol}</strong> will move to <strong>CDC</strong> custody when listed.
      </div>
      <div class="field"><label class="field-label">Listing Date</label><input class="field-input" id="ipo-listed-date" type="date" value="${today}"></div>
      <div class="field-row">
        <div class="field"><label class="field-label">Allotted Shares</label><input class="field-input" id="ipo-allotted" type="number" value="${tx.shares || ''}" placeholder="0"></div>
        <div class="field"><label class="field-label">Listing Price (₨)</label><input class="field-input" id="ipo-list-price" type="number" step="0.01" value="${defaultPrice}" placeholder="0.00"></div>
      </div>
      <button class="btn-primary" data-action="App._submitIpoListed" data-tab="${id}">Mark as Listed → CDC</button>
    </div>`;

    openBottomSheet('ipo-list-sheet', `🚀 List ${tx.symbol}`, content);
  }

  function _submitIpoListed(id) {
    const listedDate = document.getElementById('ipo-listed-date')?.value;
    const allottedShares = parseFloat(document.getElementById('ipo-allotted')?.value);
    const listingPrice = parseFloat(document.getElementById('ipo-list-price')?.value);
    if (!listedDate || !allottedShares || !listingPrice) {
      showToast('Fill in listing date, shares, and price', 'error');
      return;
    }
    const ok = State.updateTransaction(id, {
      status: 'listed',
      listedDate,
      allottedShares,
      listingPrice,
      broker: Ledger.CDC_BROKER,
    });
    if (!ok) { showToast('Could not update IPO', 'error'); return; }
    const sym = State.get().transactions.find(t => t.id === id)?.symbol || 'IPO';
    closeBottomSheet();
    showToast(`${sym} listed — moved to CDC`, 'success');
    renderCurrent();
  }

  function openReconcilePosition(holding) {
    if (!holding?.symbol) return;
    window._pendingReconcile = holding;
    const h = holding;
    const isGlobal = h.kind === 'intl' || h.kind === 'crypto';
    const qtyLabel = h.kind === 'fund' ? 'Units' : 'Quantity';
    const avgCost = h.kind === 'fund'
      ? (h.quantity > 0 ? h.costBasis / h.quantity : 0)
      : isGlobal
        ? FxService.pkrToUsd(h.quantity > 0 ? h.costBasis / h.quantity : 0)
        : (h.quantity > 0 ? h.costBasis / h.quantity : 0);
    const lastPx = isGlobal ? FxService.pkrToUsd(h.price) : h.price;
    const brokers = h.kind === 'fund' ? ['Meezan'] : isGlobal ? (window.GLOBAL_BROKERS || ['IBKR']) : ['Rafi', 'AKD', 'CDC', 'Meezan', 'Other'];
    const brokerOpts = brokers.map(b => `<option value="${b}"${b === h.broker ? ' selected' : ''}>${b}</option>`).join('');

    const content = `
    <div style="padding:0 16px 16px;">
      <p style="font-size:0.78rem;color:var(--psx-text-2);line-height:1.45;margin-bottom:12px;">
        Reconcile sets <strong>correct qty &amp; avg cost</strong> from your AMC/broker statement. Adds a <em>Reconcile</em> audit row — does not delete old transactions.
      </p>
      <div class="detail-stat"><span class="detail-stat-label">Ledger now</span><span class="detail-stat-value">${h.quantity} · avg ${isGlobal ? '$' + Number(avgCost).toFixed(2) : PlatformUI.fmt(avgCost)}</span></div>
      <div class="field-row">
        <div class="field"><label class="field-label">${qtyLabel}</label><input class="field-input" id="rec-qty" type="number" step="any" value="${h.quantity}"></div>
        <div class="field"><label class="field-label">${isGlobal ? 'Avg cost (USD)' : 'Avg cost (₨)'}</label><input class="field-input" id="rec-avg" type="number" step="any" value="${Number(avgCost).toFixed(isGlobal ? 2 : 4)}"></div>
      </div>
      <div class="field-row">
        <div class="field"><label class="field-label">${isGlobal ? 'Last price (USD)' : 'Last price / NAV (₨)'}</label><input class="field-input" id="rec-price" type="number" step="any" value="${Number(lastPx).toFixed(isGlobal ? 2 : 2)}" placeholder="Optional"></div>
        <div class="field"><label class="field-label">Broker</label><select class="field-input" id="rec-broker">${brokerOpts}</select></div>
      </div>
      <div class="field"><label class="field-label">Notes</label><input class="field-input" id="rec-notes" type="text" placeholder="e.g. AMC statement 29-Jun-2026"></div>
      <button type="button" class="btn-primary" data-action="App._submitReconcile">Save reconcile</button>
    </div>`;

    openBottomSheet('reconcile-sheet', `✎ Reconcile ${h.symbol}`, content);
  }

  function _submitReconcile() {
    const holding = window._pendingReconcile;
    if (!holding) return;
    const qty = parseFloat(document.getElementById('rec-qty')?.value);
    const avg = parseFloat(document.getElementById('rec-avg')?.value);
    const manualPrice = parseFloat(document.getElementById('rec-price')?.value);
    const broker = document.getElementById('rec-broker')?.value || holding.broker;
    const notes = (document.getElementById('rec-notes')?.value || '').trim();
    if (!(qty >= 0) || !(avg >= 0)) {
      showToast('Enter valid quantity and average cost', 'error');
      return;
    }
    const isGlobal = holding.kind === 'intl' || holding.kind === 'crypto';
    const tx = {
      id: Ledger.newId(),
      type: 'POSITION_ADJUST',
      date: new Date().toISOString().slice(0, 10),
      symbol: holding.symbol,
      broker,
      holdingKind: holding.kind,
      assetClass: holding.kind === 'crypto' ? 'crypto' : holding.kind === 'intl' ? 'intl' : undefined,
      targetQuantity: qty,
      targetAvgCost: isGlobal ? undefined : avg,
      targetAvgCostUsd: isGlobal ? avg : undefined,
      notes: notes || `Reconcile ${holding.symbol}`,
      amount: 0,
      internal: true,
    };
    State.addTransaction(tx);
    if (manualPrice > 0) {
      if (isGlobal) {
        State.updatePrice(holding.symbol, {
          priceUsd: manualPrice,
          price: FxService.usdToPkr(manualPrice),
          prevCloseUsd: manualPrice * 0.999,
          source: 'manual',
          currency: 'USD',
        });
      } else {
        State.updatePrice(holding.symbol, {
          price: manualPrice,
          prevClose: manualPrice * 0.999,
          source: 'manual',
          currency: 'PKR',
        });
      }
    }
    closeBottomSheet();
    if (typeof LcPolish !== 'undefined') LcPolish.hapticConfirm();
    showToast(`${holding.symbol} reconciled`, 'success');
    renderCurrent();
  }

  function _applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (window.Navigation?.applyTheme) Navigation.applyTheme(theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? LCBrand.h_fafafa : LCBrand.h_09090b;
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      if (typeof LcIcons !== 'undefined') btn.innerHTML = LcIcons.icon(theme === 'dark' ? 'moon' : 'sun', 20);
      else btn.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }
  }

  function applyTheme(theme) {
    State.update(s => { s.settings.theme = theme; });
    _applyTheme(theme);
  }

  window.toggleTheme = function() {
    const current = document.body.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    App.applyTheme(next);
    localStorage.setItem('theme', next);
  };

  function openHeaderMenu() {
    /* Top-bar ⋯ is labelled "More" — open the More hub (Settings is one of its tiles). */
    if (typeof Navigation !== 'undefined') Navigation.go('more');
  }

  function renderCurrent() {
    Navigation.go(Navigation.current(), true);
  }

  return { launch, showToast, refreshPrices, refreshSymbolPrice, clearWrongPrices, openBottomSheet, closeBottomSheet,
    openAddTransaction, openSellHolding, reloadForUpdate, _submitTransaction, _runUndo, _updateBuyTotal, _onSellSymbolChange, _updateSellPnl,
    deleteTransaction, openMarkIpoListed, _submitIpoListed, renderCurrent, dismissInstall, dismissDemo, applyTheme,
    checkPriceAlerts, requestAlertPermission, _filterIntlSymbols, _pickIntlSymbol,
    openAddPortfolio, _submitPortfolio, openAddForPortfolio, deletePortfolio, renamePortfolio,
    openReconcilePosition, _submitReconcile, loadDemo,
    toggleDisplayCurrency, _updateCurrencyToggleBtn, openPriceAlert, _submitPriceAlert, _removePriceAlert,
    openHeaderMenu };
})();
window.App = App;

/* Fallback if inline loader was skipped (stale SW HTML) — v5 §3b. */
(function () {
  if (typeof window.__lcEnsureDeferred === 'function') return;
  var ver = (window.LEDGERCAP_VERSION && LEDGERCAP_VERSION.app) || '3.58.7';
  var src = 'js/ledgercap.deferred.js?v=' + ver;
  var p = null;
  window.__lcEnsureDeferred = function () {
    if (window.__LC_DEFERRED_READY__) return Promise.resolve();
    if (p) return p;
    p = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { window.__LC_DEFERRED_READY__ = true; resolve(); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return p;
  };
  /* Never parse deferred during first ~8s — demo ASAP kick caused LH TBT (v5 §3d). */
  function kick() { window.__lcEnsureDeferred(); }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(kick, { timeout: 8000 });
  } else {
    setTimeout(kick, 5000);
  }
})();

document.addEventListener('DOMContentLoaded', App.launch);
