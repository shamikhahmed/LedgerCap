/* LedgerCap bundle — 94 modules — run: npm run bundle */
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
  { fund:'KMIF', amount:40000, color:'#FF6B35', note:'Foundation. Never stop. Index everything.' },
  { fund:'MIF',  amount:20000, color:'#0ECB81', note:'Active equity exposure via Meezan managers.' },
  { fund:'MIIF', amount:10000, color:'#1890FF', note:'Buffer at 16-18% yield. Convert to KMIF on 15%+ KSE drop.' },
  { fund:'STK',  amount:5000,  color:'#F0B90B', note:'Accumulate. Only deploy with full investment memo.' },
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

;/* === js/data/us-stocks.js === */
'use strict';
/** S&P 500 + major US ETFs — 511 symbols */
window.US_STOCKS_CATALOG = [
  {
    "symbol": "SPY",
    "name": "SPDR S&P 500 ETF",
    "exchange": "NYSE",
    "yahoo": "SPY",
    "tv": "AMEX:SPY",
    "currency": "USD"
  },
  {
    "symbol": "IVV",
    "name": "iShares Core S&P 500",
    "exchange": "NYSE",
    "yahoo": "IVV",
    "tv": "AMEX:IVV",
    "currency": "USD"
  },
  {
    "symbol": "VOO",
    "name": "Vanguard S&P 500",
    "exchange": "NYSE",
    "yahoo": "VOO",
    "tv": "AMEX:VOO",
    "currency": "USD"
  },
  {
    "symbol": "QQQ",
    "name": "Invesco QQQ",
    "exchange": "NASDAQ",
    "yahoo": "QQQ",
    "tv": "NASDAQ:QQQ",
    "currency": "USD"
  },
  {
    "symbol": "VTI",
    "name": "Vanguard Total Stock",
    "exchange": "NYSE",
    "yahoo": "VTI",
    "tv": "AMEX:VTI",
    "currency": "USD"
  },
  {
    "symbol": "VT",
    "name": "Vanguard Total World",
    "exchange": "NYSE",
    "yahoo": "VT",
    "tv": "NYSE:VT",
    "currency": "USD"
  },
  {
    "symbol": "IWM",
    "name": "Russell 2000 ETF",
    "exchange": "NYSE",
    "yahoo": "IWM",
    "tv": "AMEX:IWM",
    "currency": "USD"
  },
  {
    "symbol": "DIA",
    "name": "Dow Jones ETF",
    "exchange": "NYSE",
    "yahoo": "DIA",
    "tv": "AMEX:DIA",
    "currency": "USD"
  },
  {
    "symbol": "MMM",
    "name": "3M",
    "exchange": "NYSE",
    "yahoo": "MMM",
    "tv": "NYSE:MMM",
    "currency": "USD"
  },
  {
    "symbol": "AOS",
    "name": "A. O. Smith",
    "exchange": "NYSE",
    "yahoo": "AOS",
    "tv": "NYSE:AOS",
    "currency": "USD"
  },
  {
    "symbol": "ABT",
    "name": "Abbott Laboratories",
    "exchange": "NYSE",
    "yahoo": "ABT",
    "tv": "NYSE:ABT",
    "currency": "USD"
  },
  {
    "symbol": "ABBV",
    "name": "AbbVie",
    "exchange": "NYSE",
    "yahoo": "ABBV",
    "tv": "NYSE:ABBV",
    "currency": "USD"
  },
  {
    "symbol": "ACN",
    "name": "Accenture",
    "exchange": "NYSE",
    "yahoo": "ACN",
    "tv": "NYSE:ACN",
    "currency": "USD"
  },
  {
    "symbol": "ADBE",
    "name": "Adobe Inc.",
    "exchange": "NYSE",
    "yahoo": "ADBE",
    "tv": "NYSE:ADBE",
    "currency": "USD"
  },
  {
    "symbol": "AMD",
    "name": "Advanced Micro Devices",
    "exchange": "NYSE",
    "yahoo": "AMD",
    "tv": "NYSE:AMD",
    "currency": "USD"
  },
  {
    "symbol": "AES",
    "name": "AES Corporation",
    "exchange": "NYSE",
    "yahoo": "AES",
    "tv": "NYSE:AES",
    "currency": "USD"
  },
  {
    "symbol": "AFL",
    "name": "Aflac",
    "exchange": "NYSE",
    "yahoo": "AFL",
    "tv": "NYSE:AFL",
    "currency": "USD"
  },
  {
    "symbol": "A",
    "name": "Agilent Technologies",
    "exchange": "NYSE",
    "yahoo": "A",
    "tv": "NYSE:A",
    "currency": "USD"
  },
  {
    "symbol": "APD",
    "name": "Air Products",
    "exchange": "NYSE",
    "yahoo": "APD",
    "tv": "NYSE:APD",
    "currency": "USD"
  },
  {
    "symbol": "ABNB",
    "name": "Airbnb",
    "exchange": "NYSE",
    "yahoo": "ABNB",
    "tv": "NYSE:ABNB",
    "currency": "USD"
  },
  {
    "symbol": "AKAM",
    "name": "Akamai Technologies",
    "exchange": "NYSE",
    "yahoo": "AKAM",
    "tv": "NYSE:AKAM",
    "currency": "USD"
  },
  {
    "symbol": "ALB",
    "name": "Albemarle Corporation",
    "exchange": "NYSE",
    "yahoo": "ALB",
    "tv": "NYSE:ALB",
    "currency": "USD"
  },
  {
    "symbol": "ARE",
    "name": "Alexandria Real Estate Equities",
    "exchange": "NYSE",
    "yahoo": "ARE",
    "tv": "NYSE:ARE",
    "currency": "USD"
  },
  {
    "symbol": "ALGN",
    "name": "Align Technology",
    "exchange": "NYSE",
    "yahoo": "ALGN",
    "tv": "NYSE:ALGN",
    "currency": "USD"
  },
  {
    "symbol": "ALLE",
    "name": "Allegion",
    "exchange": "NYSE",
    "yahoo": "ALLE",
    "tv": "NYSE:ALLE",
    "currency": "USD"
  },
  {
    "symbol": "LNT",
    "name": "Alliant Energy",
    "exchange": "NYSE",
    "yahoo": "LNT",
    "tv": "NYSE:LNT",
    "currency": "USD"
  },
  {
    "symbol": "ALL",
    "name": "Allstate",
    "exchange": "NYSE",
    "yahoo": "ALL",
    "tv": "NYSE:ALL",
    "currency": "USD"
  },
  {
    "symbol": "GOOGL",
    "name": "Alphabet Inc. (Class A)",
    "exchange": "NASDAQ",
    "yahoo": "GOOGL",
    "tv": "NASDAQ:GOOGL",
    "currency": "USD"
  },
  {
    "symbol": "GOOG",
    "name": "Alphabet Inc. (Class C)",
    "exchange": "NASDAQ",
    "yahoo": "GOOG",
    "tv": "NASDAQ:GOOG",
    "currency": "USD"
  },
  {
    "symbol": "MO",
    "name": "Altria",
    "exchange": "NYSE",
    "yahoo": "MO",
    "tv": "NYSE:MO",
    "currency": "USD"
  },
  {
    "symbol": "AMZN",
    "name": "Amazon",
    "exchange": "NYSE",
    "yahoo": "AMZN",
    "tv": "NYSE:AMZN",
    "currency": "USD"
  },
  {
    "symbol": "AMCR",
    "name": "Amcor",
    "exchange": "NYSE",
    "yahoo": "AMCR",
    "tv": "NYSE:AMCR",
    "currency": "USD"
  },
  {
    "symbol": "AEE",
    "name": "Ameren",
    "exchange": "NYSE",
    "yahoo": "AEE",
    "tv": "NYSE:AEE",
    "currency": "USD"
  },
  {
    "symbol": "AEP",
    "name": "American Electric Power",
    "exchange": "NYSE",
    "yahoo": "AEP",
    "tv": "NYSE:AEP",
    "currency": "USD"
  },
  {
    "symbol": "AXP",
    "name": "American Express",
    "exchange": "NYSE",
    "yahoo": "AXP",
    "tv": "NYSE:AXP",
    "currency": "USD"
  },
  {
    "symbol": "AIG",
    "name": "American International Group",
    "exchange": "NYSE",
    "yahoo": "AIG",
    "tv": "NYSE:AIG",
    "currency": "USD"
  },
  {
    "symbol": "AMT",
    "name": "American Tower",
    "exchange": "NYSE",
    "yahoo": "AMT",
    "tv": "NYSE:AMT",
    "currency": "USD"
  },
  {
    "symbol": "AWK",
    "name": "American Water Works",
    "exchange": "NYSE",
    "yahoo": "AWK",
    "tv": "NYSE:AWK",
    "currency": "USD"
  },
  {
    "symbol": "AMP",
    "name": "Ameriprise Financial",
    "exchange": "NYSE",
    "yahoo": "AMP",
    "tv": "NYSE:AMP",
    "currency": "USD"
  },
  {
    "symbol": "AME",
    "name": "Ametek",
    "exchange": "NYSE",
    "yahoo": "AME",
    "tv": "NYSE:AME",
    "currency": "USD"
  },
  {
    "symbol": "AMGN",
    "name": "Amgen",
    "exchange": "NYSE",
    "yahoo": "AMGN",
    "tv": "NYSE:AMGN",
    "currency": "USD"
  },
  {
    "symbol": "APH",
    "name": "Amphenol",
    "exchange": "NYSE",
    "yahoo": "APH",
    "tv": "NYSE:APH",
    "currency": "USD"
  },
  {
    "symbol": "ADI",
    "name": "Analog Devices",
    "exchange": "NYSE",
    "yahoo": "ADI",
    "tv": "NYSE:ADI",
    "currency": "USD"
  },
  {
    "symbol": "AON",
    "name": "Aon plc",
    "exchange": "NYSE",
    "yahoo": "AON",
    "tv": "NYSE:AON",
    "currency": "USD"
  },
  {
    "symbol": "APA",
    "name": "APA Corporation",
    "exchange": "NYSE",
    "yahoo": "APA",
    "tv": "NYSE:APA",
    "currency": "USD"
  },
  {
    "symbol": "APO",
    "name": "Apollo Global Management",
    "exchange": "NYSE",
    "yahoo": "APO",
    "tv": "NYSE:APO",
    "currency": "USD"
  },
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "exchange": "NYSE",
    "yahoo": "AAPL",
    "tv": "NYSE:AAPL",
    "currency": "USD"
  },
  {
    "symbol": "AMAT",
    "name": "Applied Materials",
    "exchange": "NYSE",
    "yahoo": "AMAT",
    "tv": "NYSE:AMAT",
    "currency": "USD"
  },
  {
    "symbol": "APP",
    "name": "AppLovin",
    "exchange": "NYSE",
    "yahoo": "APP",
    "tv": "NYSE:APP",
    "currency": "USD"
  },
  {
    "symbol": "APTV",
    "name": "Aptiv",
    "exchange": "NYSE",
    "yahoo": "APTV",
    "tv": "NYSE:APTV",
    "currency": "USD"
  },
  {
    "symbol": "ACGL",
    "name": "Arch Capital Group",
    "exchange": "NYSE",
    "yahoo": "ACGL",
    "tv": "NYSE:ACGL",
    "currency": "USD"
  },
  {
    "symbol": "ADM",
    "name": "Archer Daniels Midland",
    "exchange": "NYSE",
    "yahoo": "ADM",
    "tv": "NYSE:ADM",
    "currency": "USD"
  },
  {
    "symbol": "ARES",
    "name": "Ares Management",
    "exchange": "NYSE",
    "yahoo": "ARES",
    "tv": "NYSE:ARES",
    "currency": "USD"
  },
  {
    "symbol": "ANET",
    "name": "Arista Networks",
    "exchange": "NYSE",
    "yahoo": "ANET",
    "tv": "NYSE:ANET",
    "currency": "USD"
  },
  {
    "symbol": "AJG",
    "name": "Arthur J. Gallagher & Co.",
    "exchange": "NYSE",
    "yahoo": "AJG",
    "tv": "NYSE:AJG",
    "currency": "USD"
  },
  {
    "symbol": "AIZ",
    "name": "Assurant",
    "exchange": "NYSE",
    "yahoo": "AIZ",
    "tv": "NYSE:AIZ",
    "currency": "USD"
  },
  {
    "symbol": "T",
    "name": "AT&T",
    "exchange": "NYSE",
    "yahoo": "T",
    "tv": "NYSE:T",
    "currency": "USD"
  },
  {
    "symbol": "ATO",
    "name": "Atmos Energy",
    "exchange": "NYSE",
    "yahoo": "ATO",
    "tv": "NYSE:ATO",
    "currency": "USD"
  },
  {
    "symbol": "ADSK",
    "name": "Autodesk",
    "exchange": "NYSE",
    "yahoo": "ADSK",
    "tv": "NYSE:ADSK",
    "currency": "USD"
  },
  {
    "symbol": "ADP",
    "name": "Automatic Data Processing",
    "exchange": "NYSE",
    "yahoo": "ADP",
    "tv": "NYSE:ADP",
    "currency": "USD"
  },
  {
    "symbol": "AZO",
    "name": "AutoZone",
    "exchange": "NYSE",
    "yahoo": "AZO",
    "tv": "NYSE:AZO",
    "currency": "USD"
  },
  {
    "symbol": "AVB",
    "name": "AvalonBay Communities",
    "exchange": "NYSE",
    "yahoo": "AVB",
    "tv": "NYSE:AVB",
    "currency": "USD"
  },
  {
    "symbol": "AVY",
    "name": "Avery Dennison",
    "exchange": "NYSE",
    "yahoo": "AVY",
    "tv": "NYSE:AVY",
    "currency": "USD"
  },
  {
    "symbol": "AXON",
    "name": "Axon Enterprise",
    "exchange": "NYSE",
    "yahoo": "AXON",
    "tv": "NYSE:AXON",
    "currency": "USD"
  },
  {
    "symbol": "BKR",
    "name": "Baker Hughes",
    "exchange": "NYSE",
    "yahoo": "BKR",
    "tv": "NYSE:BKR",
    "currency": "USD"
  },
  {
    "symbol": "BALL",
    "name": "Ball Corporation",
    "exchange": "NYSE",
    "yahoo": "BALL",
    "tv": "NYSE:BALL",
    "currency": "USD"
  },
  {
    "symbol": "BAC",
    "name": "Bank of America",
    "exchange": "NYSE",
    "yahoo": "BAC",
    "tv": "NYSE:BAC",
    "currency": "USD"
  },
  {
    "symbol": "BAX",
    "name": "Baxter International",
    "exchange": "NYSE",
    "yahoo": "BAX",
    "tv": "NYSE:BAX",
    "currency": "USD"
  },
  {
    "symbol": "BDX",
    "name": "Becton Dickinson",
    "exchange": "NYSE",
    "yahoo": "BDX",
    "tv": "NYSE:BDX",
    "currency": "USD"
  },
  {
    "symbol": "BRK.B",
    "name": "Berkshire Hathaway",
    "exchange": "NASDAQ",
    "yahoo": "BRK-B",
    "tv": "NASDAQ:BRK-B",
    "currency": "USD"
  },
  {
    "symbol": "BBY",
    "name": "Best Buy",
    "exchange": "NYSE",
    "yahoo": "BBY",
    "tv": "NYSE:BBY",
    "currency": "USD"
  },
  {
    "symbol": "TECH",
    "name": "Bio-Techne",
    "exchange": "NYSE",
    "yahoo": "TECH",
    "tv": "NYSE:TECH",
    "currency": "USD"
  },
  {
    "symbol": "BIIB",
    "name": "Biogen",
    "exchange": "NYSE",
    "yahoo": "BIIB",
    "tv": "NYSE:BIIB",
    "currency": "USD"
  },
  {
    "symbol": "BLK",
    "name": "BlackRock",
    "exchange": "NYSE",
    "yahoo": "BLK",
    "tv": "NYSE:BLK",
    "currency": "USD"
  },
  {
    "symbol": "BX",
    "name": "Blackstone Inc.",
    "exchange": "NYSE",
    "yahoo": "BX",
    "tv": "NYSE:BX",
    "currency": "USD"
  },
  {
    "symbol": "XYZ",
    "name": "Block, Inc.",
    "exchange": "NYSE",
    "yahoo": "XYZ",
    "tv": "NYSE:XYZ",
    "currency": "USD"
  },
  {
    "symbol": "BNY",
    "name": "BNY Mellon",
    "exchange": "NYSE",
    "yahoo": "BNY",
    "tv": "NYSE:BNY",
    "currency": "USD"
  },
  {
    "symbol": "BA",
    "name": "Boeing",
    "exchange": "NYSE",
    "yahoo": "BA",
    "tv": "NYSE:BA",
    "currency": "USD"
  },
  {
    "symbol": "BKNG",
    "name": "Booking Holdings",
    "exchange": "NYSE",
    "yahoo": "BKNG",
    "tv": "NYSE:BKNG",
    "currency": "USD"
  },
  {
    "symbol": "BSX",
    "name": "Boston Scientific",
    "exchange": "NYSE",
    "yahoo": "BSX",
    "tv": "NYSE:BSX",
    "currency": "USD"
  },
  {
    "symbol": "BMY",
    "name": "Bristol Myers Squibb",
    "exchange": "NYSE",
    "yahoo": "BMY",
    "tv": "NYSE:BMY",
    "currency": "USD"
  },
  {
    "symbol": "AVGO",
    "name": "Broadcom",
    "exchange": "NYSE",
    "yahoo": "AVGO",
    "tv": "NYSE:AVGO",
    "currency": "USD"
  },
  {
    "symbol": "BR",
    "name": "Broadridge Financial Solutions",
    "exchange": "NYSE",
    "yahoo": "BR",
    "tv": "NYSE:BR",
    "currency": "USD"
  },
  {
    "symbol": "BRO",
    "name": "Brown & Brown",
    "exchange": "NYSE",
    "yahoo": "BRO",
    "tv": "NYSE:BRO",
    "currency": "USD"
  },
  {
    "symbol": "BF.B",
    "name": "Brown–Forman",
    "exchange": "NASDAQ",
    "yahoo": "BF-B",
    "tv": "NASDAQ:BF-B",
    "currency": "USD"
  },
  {
    "symbol": "BLDR",
    "name": "Builders FirstSource",
    "exchange": "NYSE",
    "yahoo": "BLDR",
    "tv": "NYSE:BLDR",
    "currency": "USD"
  },
  {
    "symbol": "BG",
    "name": "Bunge Global",
    "exchange": "NYSE",
    "yahoo": "BG",
    "tv": "NYSE:BG",
    "currency": "USD"
  },
  {
    "symbol": "BXP",
    "name": "BXP, Inc.",
    "exchange": "NYSE",
    "yahoo": "BXP",
    "tv": "NYSE:BXP",
    "currency": "USD"
  },
  {
    "symbol": "CHRW",
    "name": "C.H. Robinson",
    "exchange": "NYSE",
    "yahoo": "CHRW",
    "tv": "NYSE:CHRW",
    "currency": "USD"
  },
  {
    "symbol": "CDNS",
    "name": "Cadence Design Systems",
    "exchange": "NYSE",
    "yahoo": "CDNS",
    "tv": "NYSE:CDNS",
    "currency": "USD"
  },
  {
    "symbol": "CPT",
    "name": "Camden Property Trust",
    "exchange": "NYSE",
    "yahoo": "CPT",
    "tv": "NYSE:CPT",
    "currency": "USD"
  },
  {
    "symbol": "COF",
    "name": "Capital One",
    "exchange": "NYSE",
    "yahoo": "COF",
    "tv": "NYSE:COF",
    "currency": "USD"
  },
  {
    "symbol": "CAH",
    "name": "Cardinal Health",
    "exchange": "NYSE",
    "yahoo": "CAH",
    "tv": "NYSE:CAH",
    "currency": "USD"
  },
  {
    "symbol": "CCL",
    "name": "Carnival Corporation",
    "exchange": "NYSE",
    "yahoo": "CCL",
    "tv": "NYSE:CCL",
    "currency": "USD"
  },
  {
    "symbol": "CARR",
    "name": "Carrier Global",
    "exchange": "NYSE",
    "yahoo": "CARR",
    "tv": "NYSE:CARR",
    "currency": "USD"
  },
  {
    "symbol": "CVNA",
    "name": "Carvana",
    "exchange": "NYSE",
    "yahoo": "CVNA",
    "tv": "NYSE:CVNA",
    "currency": "USD"
  },
  {
    "symbol": "CASY",
    "name": "Casey's",
    "exchange": "NYSE",
    "yahoo": "CASY",
    "tv": "NYSE:CASY",
    "currency": "USD"
  },
  {
    "symbol": "CAT",
    "name": "Caterpillar Inc.",
    "exchange": "NYSE",
    "yahoo": "CAT",
    "tv": "NYSE:CAT",
    "currency": "USD"
  },
  {
    "symbol": "CBOE",
    "name": "Cboe Global Markets",
    "exchange": "NYSE",
    "yahoo": "CBOE",
    "tv": "NYSE:CBOE",
    "currency": "USD"
  },
  {
    "symbol": "CBRE",
    "name": "CBRE Group",
    "exchange": "NYSE",
    "yahoo": "CBRE",
    "tv": "NYSE:CBRE",
    "currency": "USD"
  },
  {
    "symbol": "CDW",
    "name": "CDW Corporation",
    "exchange": "NYSE",
    "yahoo": "CDW",
    "tv": "NYSE:CDW",
    "currency": "USD"
  },
  {
    "symbol": "COR",
    "name": "Cencora",
    "exchange": "NYSE",
    "yahoo": "COR",
    "tv": "NYSE:COR",
    "currency": "USD"
  },
  {
    "symbol": "CNC",
    "name": "Centene Corporation",
    "exchange": "NYSE",
    "yahoo": "CNC",
    "tv": "NYSE:CNC",
    "currency": "USD"
  },
  {
    "symbol": "CNP",
    "name": "CenterPoint Energy",
    "exchange": "NYSE",
    "yahoo": "CNP",
    "tv": "NYSE:CNP",
    "currency": "USD"
  },
  {
    "symbol": "CF",
    "name": "CF Industries",
    "exchange": "NYSE",
    "yahoo": "CF",
    "tv": "NYSE:CF",
    "currency": "USD"
  },
  {
    "symbol": "CRL",
    "name": "Charles River Laboratories",
    "exchange": "NYSE",
    "yahoo": "CRL",
    "tv": "NYSE:CRL",
    "currency": "USD"
  },
  {
    "symbol": "SCHW",
    "name": "Charles Schwab Corporation",
    "exchange": "NYSE",
    "yahoo": "SCHW",
    "tv": "NYSE:SCHW",
    "currency": "USD"
  },
  {
    "symbol": "CHTR",
    "name": "Charter Communications",
    "exchange": "NYSE",
    "yahoo": "CHTR",
    "tv": "NYSE:CHTR",
    "currency": "USD"
  },
  {
    "symbol": "CVX",
    "name": "Chevron Corporation",
    "exchange": "NYSE",
    "yahoo": "CVX",
    "tv": "NYSE:CVX",
    "currency": "USD"
  },
  {
    "symbol": "CMG",
    "name": "Chipotle Mexican Grill",
    "exchange": "NYSE",
    "yahoo": "CMG",
    "tv": "NYSE:CMG",
    "currency": "USD"
  },
  {
    "symbol": "CB",
    "name": "Chubb Limited",
    "exchange": "NYSE",
    "yahoo": "CB",
    "tv": "NYSE:CB",
    "currency": "USD"
  },
  {
    "symbol": "CHD",
    "name": "Church & Dwight",
    "exchange": "NYSE",
    "yahoo": "CHD",
    "tv": "NYSE:CHD",
    "currency": "USD"
  },
  {
    "symbol": "CIEN",
    "name": "Ciena",
    "exchange": "NYSE",
    "yahoo": "CIEN",
    "tv": "NYSE:CIEN",
    "currency": "USD"
  },
  {
    "symbol": "CI",
    "name": "Cigna",
    "exchange": "NYSE",
    "yahoo": "CI",
    "tv": "NYSE:CI",
    "currency": "USD"
  },
  {
    "symbol": "CINF",
    "name": "Cincinnati Financial",
    "exchange": "NYSE",
    "yahoo": "CINF",
    "tv": "NYSE:CINF",
    "currency": "USD"
  },
  {
    "symbol": "CTAS",
    "name": "Cintas",
    "exchange": "NYSE",
    "yahoo": "CTAS",
    "tv": "NYSE:CTAS",
    "currency": "USD"
  },
  {
    "symbol": "CSCO",
    "name": "Cisco",
    "exchange": "NYSE",
    "yahoo": "CSCO",
    "tv": "NYSE:CSCO",
    "currency": "USD"
  },
  {
    "symbol": "C",
    "name": "Citigroup",
    "exchange": "NYSE",
    "yahoo": "C",
    "tv": "NYSE:C",
    "currency": "USD"
  },
  {
    "symbol": "CFG",
    "name": "Citizens Financial Group",
    "exchange": "NYSE",
    "yahoo": "CFG",
    "tv": "NYSE:CFG",
    "currency": "USD"
  },
  {
    "symbol": "CLX",
    "name": "Clorox",
    "exchange": "NYSE",
    "yahoo": "CLX",
    "tv": "NYSE:CLX",
    "currency": "USD"
  },
  {
    "symbol": "CME",
    "name": "CME Group",
    "exchange": "NYSE",
    "yahoo": "CME",
    "tv": "NYSE:CME",
    "currency": "USD"
  },
  {
    "symbol": "CMS",
    "name": "CMS Energy",
    "exchange": "NYSE",
    "yahoo": "CMS",
    "tv": "NYSE:CMS",
    "currency": "USD"
  },
  {
    "symbol": "KO",
    "name": "Coca-Cola Company (The)",
    "exchange": "NYSE",
    "yahoo": "KO",
    "tv": "NYSE:KO",
    "currency": "USD"
  },
  {
    "symbol": "CTSH",
    "name": "Cognizant",
    "exchange": "NYSE",
    "yahoo": "CTSH",
    "tv": "NYSE:CTSH",
    "currency": "USD"
  },
  {
    "symbol": "COHR",
    "name": "Coherent Corp.",
    "exchange": "NYSE",
    "yahoo": "COHR",
    "tv": "NYSE:COHR",
    "currency": "USD"
  },
  {
    "symbol": "COIN",
    "name": "Coinbase",
    "exchange": "NYSE",
    "yahoo": "COIN",
    "tv": "NYSE:COIN",
    "currency": "USD"
  },
  {
    "symbol": "CL",
    "name": "Colgate-Palmolive",
    "exchange": "NYSE",
    "yahoo": "CL",
    "tv": "NYSE:CL",
    "currency": "USD"
  },
  {
    "symbol": "CMCSA",
    "name": "Comcast",
    "exchange": "NYSE",
    "yahoo": "CMCSA",
    "tv": "NYSE:CMCSA",
    "currency": "USD"
  },
  {
    "symbol": "FIX",
    "name": "Comfort Systems USA",
    "exchange": "NYSE",
    "yahoo": "FIX",
    "tv": "NYSE:FIX",
    "currency": "USD"
  },
  {
    "symbol": "CAG",
    "name": "Conagra Brands",
    "exchange": "NYSE",
    "yahoo": "CAG",
    "tv": "NYSE:CAG",
    "currency": "USD"
  },
  {
    "symbol": "COP",
    "name": "ConocoPhillips",
    "exchange": "NYSE",
    "yahoo": "COP",
    "tv": "NYSE:COP",
    "currency": "USD"
  },
  {
    "symbol": "ED",
    "name": "Consolidated Edison",
    "exchange": "NYSE",
    "yahoo": "ED",
    "tv": "NYSE:ED",
    "currency": "USD"
  },
  {
    "symbol": "STZ",
    "name": "Constellation Brands",
    "exchange": "NYSE",
    "yahoo": "STZ",
    "tv": "NYSE:STZ",
    "currency": "USD"
  },
  {
    "symbol": "CEG",
    "name": "Constellation Energy",
    "exchange": "NYSE",
    "yahoo": "CEG",
    "tv": "NYSE:CEG",
    "currency": "USD"
  },
  {
    "symbol": "COO",
    "name": "Cooper Companies (The)",
    "exchange": "NYSE",
    "yahoo": "COO",
    "tv": "NYSE:COO",
    "currency": "USD"
  },
  {
    "symbol": "CPRT",
    "name": "Copart",
    "exchange": "NYSE",
    "yahoo": "CPRT",
    "tv": "NYSE:CPRT",
    "currency": "USD"
  },
  {
    "symbol": "GLW",
    "name": "Corning Inc.",
    "exchange": "NYSE",
    "yahoo": "GLW",
    "tv": "NYSE:GLW",
    "currency": "USD"
  },
  {
    "symbol": "CPAY",
    "name": "Corpay",
    "exchange": "NYSE",
    "yahoo": "CPAY",
    "tv": "NYSE:CPAY",
    "currency": "USD"
  },
  {
    "symbol": "CTVA",
    "name": "Corteva",
    "exchange": "NYSE",
    "yahoo": "CTVA",
    "tv": "NYSE:CTVA",
    "currency": "USD"
  },
  {
    "symbol": "CSGP",
    "name": "CoStar Group",
    "exchange": "NYSE",
    "yahoo": "CSGP",
    "tv": "NYSE:CSGP",
    "currency": "USD"
  },
  {
    "symbol": "COST",
    "name": "Costco",
    "exchange": "NYSE",
    "yahoo": "COST",
    "tv": "NYSE:COST",
    "currency": "USD"
  },
  {
    "symbol": "CRH",
    "name": "CRH plc",
    "exchange": "NYSE",
    "yahoo": "CRH",
    "tv": "NYSE:CRH",
    "currency": "USD"
  },
  {
    "symbol": "CRWD",
    "name": "CrowdStrike",
    "exchange": "NYSE",
    "yahoo": "CRWD",
    "tv": "NYSE:CRWD",
    "currency": "USD"
  },
  {
    "symbol": "CCI",
    "name": "Crown Castle",
    "exchange": "NYSE",
    "yahoo": "CCI",
    "tv": "NYSE:CCI",
    "currency": "USD"
  },
  {
    "symbol": "CSX",
    "name": "CSX Corporation",
    "exchange": "NYSE",
    "yahoo": "CSX",
    "tv": "NYSE:CSX",
    "currency": "USD"
  },
  {
    "symbol": "CMI",
    "name": "Cummins",
    "exchange": "NYSE",
    "yahoo": "CMI",
    "tv": "NYSE:CMI",
    "currency": "USD"
  },
  {
    "symbol": "CVS",
    "name": "CVS Health",
    "exchange": "NYSE",
    "yahoo": "CVS",
    "tv": "NYSE:CVS",
    "currency": "USD"
  },
  {
    "symbol": "DHR",
    "name": "Danaher Corporation",
    "exchange": "NYSE",
    "yahoo": "DHR",
    "tv": "NYSE:DHR",
    "currency": "USD"
  },
  {
    "symbol": "DRI",
    "name": "Darden Restaurants",
    "exchange": "NYSE",
    "yahoo": "DRI",
    "tv": "NYSE:DRI",
    "currency": "USD"
  },
  {
    "symbol": "DDOG",
    "name": "Datadog",
    "exchange": "NYSE",
    "yahoo": "DDOG",
    "tv": "NYSE:DDOG",
    "currency": "USD"
  },
  {
    "symbol": "DVA",
    "name": "DaVita",
    "exchange": "NYSE",
    "yahoo": "DVA",
    "tv": "NYSE:DVA",
    "currency": "USD"
  },
  {
    "symbol": "DECK",
    "name": "Deckers Brands",
    "exchange": "NYSE",
    "yahoo": "DECK",
    "tv": "NYSE:DECK",
    "currency": "USD"
  },
  {
    "symbol": "DE",
    "name": "Deere & Company",
    "exchange": "NYSE",
    "yahoo": "DE",
    "tv": "NYSE:DE",
    "currency": "USD"
  },
  {
    "symbol": "DELL",
    "name": "Dell Technologies",
    "exchange": "NYSE",
    "yahoo": "DELL",
    "tv": "NYSE:DELL",
    "currency": "USD"
  },
  {
    "symbol": "DAL",
    "name": "Delta Air Lines",
    "exchange": "NYSE",
    "yahoo": "DAL",
    "tv": "NYSE:DAL",
    "currency": "USD"
  },
  {
    "symbol": "DVN",
    "name": "Devon Energy",
    "exchange": "NYSE",
    "yahoo": "DVN",
    "tv": "NYSE:DVN",
    "currency": "USD"
  },
  {
    "symbol": "DXCM",
    "name": "Dexcom",
    "exchange": "NYSE",
    "yahoo": "DXCM",
    "tv": "NYSE:DXCM",
    "currency": "USD"
  },
  {
    "symbol": "FANG",
    "name": "Diamondback Energy",
    "exchange": "NYSE",
    "yahoo": "FANG",
    "tv": "NYSE:FANG",
    "currency": "USD"
  },
  {
    "symbol": "DLR",
    "name": "Digital Realty",
    "exchange": "NYSE",
    "yahoo": "DLR",
    "tv": "NYSE:DLR",
    "currency": "USD"
  },
  {
    "symbol": "DG",
    "name": "Dollar General",
    "exchange": "NYSE",
    "yahoo": "DG",
    "tv": "NYSE:DG",
    "currency": "USD"
  },
  {
    "symbol": "DLTR",
    "name": "Dollar Tree",
    "exchange": "NYSE",
    "yahoo": "DLTR",
    "tv": "NYSE:DLTR",
    "currency": "USD"
  },
  {
    "symbol": "D",
    "name": "Dominion Energy",
    "exchange": "NYSE",
    "yahoo": "D",
    "tv": "NYSE:D",
    "currency": "USD"
  },
  {
    "symbol": "DPZ",
    "name": "Domino's",
    "exchange": "NYSE",
    "yahoo": "DPZ",
    "tv": "NYSE:DPZ",
    "currency": "USD"
  },
  {
    "symbol": "DASH",
    "name": "DoorDash",
    "exchange": "NYSE",
    "yahoo": "DASH",
    "tv": "NYSE:DASH",
    "currency": "USD"
  },
  {
    "symbol": "DOV",
    "name": "Dover Corporation",
    "exchange": "NYSE",
    "yahoo": "DOV",
    "tv": "NYSE:DOV",
    "currency": "USD"
  },
  {
    "symbol": "DOW",
    "name": "Dow Inc.",
    "exchange": "NYSE",
    "yahoo": "DOW",
    "tv": "NYSE:DOW",
    "currency": "USD"
  },
  {
    "symbol": "DHI",
    "name": "D. R. Horton",
    "exchange": "NYSE",
    "yahoo": "DHI",
    "tv": "NYSE:DHI",
    "currency": "USD"
  },
  {
    "symbol": "DTE",
    "name": "DTE Energy",
    "exchange": "NYSE",
    "yahoo": "DTE",
    "tv": "NYSE:DTE",
    "currency": "USD"
  },
  {
    "symbol": "DUK",
    "name": "Duke Energy",
    "exchange": "NYSE",
    "yahoo": "DUK",
    "tv": "NYSE:DUK",
    "currency": "USD"
  },
  {
    "symbol": "DD",
    "name": "DuPont",
    "exchange": "NYSE",
    "yahoo": "DD",
    "tv": "NYSE:DD",
    "currency": "USD"
  },
  {
    "symbol": "ETN",
    "name": "Eaton Corporation",
    "exchange": "NYSE",
    "yahoo": "ETN",
    "tv": "NYSE:ETN",
    "currency": "USD"
  },
  {
    "symbol": "EBAY",
    "name": "eBay Inc.",
    "exchange": "NYSE",
    "yahoo": "EBAY",
    "tv": "NYSE:EBAY",
    "currency": "USD"
  },
  {
    "symbol": "ECHO",
    "name": "EchoStar",
    "exchange": "NYSE",
    "yahoo": "ECHO",
    "tv": "NYSE:ECHO",
    "currency": "USD"
  },
  {
    "symbol": "ECL",
    "name": "Ecolab",
    "exchange": "NYSE",
    "yahoo": "ECL",
    "tv": "NYSE:ECL",
    "currency": "USD"
  },
  {
    "symbol": "EIX",
    "name": "Edison International",
    "exchange": "NYSE",
    "yahoo": "EIX",
    "tv": "NYSE:EIX",
    "currency": "USD"
  },
  {
    "symbol": "EW",
    "name": "Edwards Lifesciences",
    "exchange": "NYSE",
    "yahoo": "EW",
    "tv": "NYSE:EW",
    "currency": "USD"
  },
  {
    "symbol": "EA",
    "name": "Electronic Arts",
    "exchange": "NYSE",
    "yahoo": "EA",
    "tv": "NYSE:EA",
    "currency": "USD"
  },
  {
    "symbol": "ELV",
    "name": "Elevance Health",
    "exchange": "NYSE",
    "yahoo": "ELV",
    "tv": "NYSE:ELV",
    "currency": "USD"
  },
  {
    "symbol": "EME",
    "name": "Emcor",
    "exchange": "NYSE",
    "yahoo": "EME",
    "tv": "NYSE:EME",
    "currency": "USD"
  },
  {
    "symbol": "EMR",
    "name": "Emerson Electric",
    "exchange": "NYSE",
    "yahoo": "EMR",
    "tv": "NYSE:EMR",
    "currency": "USD"
  },
  {
    "symbol": "ETR",
    "name": "Entergy",
    "exchange": "NYSE",
    "yahoo": "ETR",
    "tv": "NYSE:ETR",
    "currency": "USD"
  },
  {
    "symbol": "EOG",
    "name": "EOG Resources",
    "exchange": "NYSE",
    "yahoo": "EOG",
    "tv": "NYSE:EOG",
    "currency": "USD"
  },
  {
    "symbol": "EQT",
    "name": "EQT Corporation",
    "exchange": "NYSE",
    "yahoo": "EQT",
    "tv": "NYSE:EQT",
    "currency": "USD"
  },
  {
    "symbol": "EFX",
    "name": "Equifax",
    "exchange": "NYSE",
    "yahoo": "EFX",
    "tv": "NYSE:EFX",
    "currency": "USD"
  },
  {
    "symbol": "EQIX",
    "name": "Equinix",
    "exchange": "NYSE",
    "yahoo": "EQIX",
    "tv": "NYSE:EQIX",
    "currency": "USD"
  },
  {
    "symbol": "EQR",
    "name": "Equity Residential",
    "exchange": "NYSE",
    "yahoo": "EQR",
    "tv": "NYSE:EQR",
    "currency": "USD"
  },
  {
    "symbol": "ERIE",
    "name": "Erie Indemnity",
    "exchange": "NYSE",
    "yahoo": "ERIE",
    "tv": "NYSE:ERIE",
    "currency": "USD"
  },
  {
    "symbol": "ESS",
    "name": "Essex Property Trust",
    "exchange": "NYSE",
    "yahoo": "ESS",
    "tv": "NYSE:ESS",
    "currency": "USD"
  },
  {
    "symbol": "EL",
    "name": "Estée Lauder Companies (The)",
    "exchange": "NYSE",
    "yahoo": "EL",
    "tv": "NYSE:EL",
    "currency": "USD"
  },
  {
    "symbol": "EG",
    "name": "Everest Group",
    "exchange": "NYSE",
    "yahoo": "EG",
    "tv": "NYSE:EG",
    "currency": "USD"
  },
  {
    "symbol": "EVRG",
    "name": "Evergy",
    "exchange": "NYSE",
    "yahoo": "EVRG",
    "tv": "NYSE:EVRG",
    "currency": "USD"
  },
  {
    "symbol": "ES",
    "name": "Eversource Energy",
    "exchange": "NYSE",
    "yahoo": "ES",
    "tv": "NYSE:ES",
    "currency": "USD"
  },
  {
    "symbol": "EXC",
    "name": "Exelon",
    "exchange": "NYSE",
    "yahoo": "EXC",
    "tv": "NYSE:EXC",
    "currency": "USD"
  },
  {
    "symbol": "EXE",
    "name": "Expand Energy",
    "exchange": "NYSE",
    "yahoo": "EXE",
    "tv": "NYSE:EXE",
    "currency": "USD"
  },
  {
    "symbol": "EXPE",
    "name": "Expedia Group",
    "exchange": "NYSE",
    "yahoo": "EXPE",
    "tv": "NYSE:EXPE",
    "currency": "USD"
  },
  {
    "symbol": "EXPD",
    "name": "Expeditors International",
    "exchange": "NYSE",
    "yahoo": "EXPD",
    "tv": "NYSE:EXPD",
    "currency": "USD"
  },
  {
    "symbol": "EXR",
    "name": "Extra Space Storage",
    "exchange": "NYSE",
    "yahoo": "EXR",
    "tv": "NYSE:EXR",
    "currency": "USD"
  },
  {
    "symbol": "XOM",
    "name": "ExxonMobil",
    "exchange": "NYSE",
    "yahoo": "XOM",
    "tv": "NYSE:XOM",
    "currency": "USD"
  },
  {
    "symbol": "FFIV",
    "name": "F5, Inc.",
    "exchange": "NYSE",
    "yahoo": "FFIV",
    "tv": "NYSE:FFIV",
    "currency": "USD"
  },
  {
    "symbol": "FDS",
    "name": "FactSet",
    "exchange": "NYSE",
    "yahoo": "FDS",
    "tv": "NYSE:FDS",
    "currency": "USD"
  },
  {
    "symbol": "FICO",
    "name": "Fair Isaac",
    "exchange": "NYSE",
    "yahoo": "FICO",
    "tv": "NYSE:FICO",
    "currency": "USD"
  },
  {
    "symbol": "FAST",
    "name": "Fastenal",
    "exchange": "NYSE",
    "yahoo": "FAST",
    "tv": "NYSE:FAST",
    "currency": "USD"
  },
  {
    "symbol": "FRT",
    "name": "Federal Realty Investment Trust",
    "exchange": "NYSE",
    "yahoo": "FRT",
    "tv": "NYSE:FRT",
    "currency": "USD"
  },
  {
    "symbol": "FDX",
    "name": "FedEx",
    "exchange": "NYSE",
    "yahoo": "FDX",
    "tv": "NYSE:FDX",
    "currency": "USD"
  },
  {
    "symbol": "FDXF",
    "name": "FedEx Freight",
    "exchange": "NYSE",
    "yahoo": "FDXF",
    "tv": "NYSE:FDXF",
    "currency": "USD"
  },
  {
    "symbol": "FIS",
    "name": "Fidelity National Information Services",
    "exchange": "NYSE",
    "yahoo": "FIS",
    "tv": "NYSE:FIS",
    "currency": "USD"
  },
  {
    "symbol": "FITB",
    "name": "Fifth Third Bancorp",
    "exchange": "NYSE",
    "yahoo": "FITB",
    "tv": "NYSE:FITB",
    "currency": "USD"
  },
  {
    "symbol": "FSLR",
    "name": "First Solar",
    "exchange": "NYSE",
    "yahoo": "FSLR",
    "tv": "NYSE:FSLR",
    "currency": "USD"
  },
  {
    "symbol": "FE",
    "name": "FirstEnergy",
    "exchange": "NYSE",
    "yahoo": "FE",
    "tv": "NYSE:FE",
    "currency": "USD"
  },
  {
    "symbol": "FISV",
    "name": "Fiserv",
    "exchange": "NYSE",
    "yahoo": "FISV",
    "tv": "NYSE:FISV",
    "currency": "USD"
  },
  {
    "symbol": "FLEX",
    "name": "Flex Ltd.",
    "exchange": "NYSE",
    "yahoo": "FLEX",
    "tv": "NYSE:FLEX",
    "currency": "USD"
  },
  {
    "symbol": "F",
    "name": "Ford Motor Company",
    "exchange": "NYSE",
    "yahoo": "F",
    "tv": "NYSE:F",
    "currency": "USD"
  },
  {
    "symbol": "FTNT",
    "name": "Fortinet",
    "exchange": "NYSE",
    "yahoo": "FTNT",
    "tv": "NYSE:FTNT",
    "currency": "USD"
  },
  {
    "symbol": "FTV",
    "name": "Fortive",
    "exchange": "NYSE",
    "yahoo": "FTV",
    "tv": "NYSE:FTV",
    "currency": "USD"
  },
  {
    "symbol": "FOXA",
    "name": "Fox Corporation (Class A)",
    "exchange": "NYSE",
    "yahoo": "FOXA",
    "tv": "NYSE:FOXA",
    "currency": "USD"
  },
  {
    "symbol": "FOX",
    "name": "Fox Corporation (Class B)",
    "exchange": "NYSE",
    "yahoo": "FOX",
    "tv": "NYSE:FOX",
    "currency": "USD"
  },
  {
    "symbol": "BEN",
    "name": "Franklin Resources",
    "exchange": "NYSE",
    "yahoo": "BEN",
    "tv": "NYSE:BEN",
    "currency": "USD"
  },
  {
    "symbol": "FCX",
    "name": "Freeport-McMoRan",
    "exchange": "NYSE",
    "yahoo": "FCX",
    "tv": "NYSE:FCX",
    "currency": "USD"
  },
  {
    "symbol": "GRMN",
    "name": "Garmin",
    "exchange": "NYSE",
    "yahoo": "GRMN",
    "tv": "NYSE:GRMN",
    "currency": "USD"
  },
  {
    "symbol": "IT",
    "name": "Gartner",
    "exchange": "NYSE",
    "yahoo": "IT",
    "tv": "NYSE:IT",
    "currency": "USD"
  },
  {
    "symbol": "GE",
    "name": "GE Aerospace",
    "exchange": "NYSE",
    "yahoo": "GE",
    "tv": "NYSE:GE",
    "currency": "USD"
  },
  {
    "symbol": "GEHC",
    "name": "GE HealthCare",
    "exchange": "NYSE",
    "yahoo": "GEHC",
    "tv": "NYSE:GEHC",
    "currency": "USD"
  },
  {
    "symbol": "GEV",
    "name": "GE Vernova",
    "exchange": "NYSE",
    "yahoo": "GEV",
    "tv": "NYSE:GEV",
    "currency": "USD"
  },
  {
    "symbol": "GEN",
    "name": "Gen Digital",
    "exchange": "NYSE",
    "yahoo": "GEN",
    "tv": "NYSE:GEN",
    "currency": "USD"
  },
  {
    "symbol": "GNRC",
    "name": "Generac",
    "exchange": "NYSE",
    "yahoo": "GNRC",
    "tv": "NYSE:GNRC",
    "currency": "USD"
  },
  {
    "symbol": "GD",
    "name": "General Dynamics",
    "exchange": "NYSE",
    "yahoo": "GD",
    "tv": "NYSE:GD",
    "currency": "USD"
  },
  {
    "symbol": "GIS",
    "name": "General Mills",
    "exchange": "NYSE",
    "yahoo": "GIS",
    "tv": "NYSE:GIS",
    "currency": "USD"
  },
  {
    "symbol": "GM",
    "name": "General Motors",
    "exchange": "NYSE",
    "yahoo": "GM",
    "tv": "NYSE:GM",
    "currency": "USD"
  },
  {
    "symbol": "GPC",
    "name": "Genuine Parts Company",
    "exchange": "NYSE",
    "yahoo": "GPC",
    "tv": "NYSE:GPC",
    "currency": "USD"
  },
  {
    "symbol": "GILD",
    "name": "Gilead Sciences",
    "exchange": "NYSE",
    "yahoo": "GILD",
    "tv": "NYSE:GILD",
    "currency": "USD"
  },
  {
    "symbol": "GPN",
    "name": "Global Payments",
    "exchange": "NYSE",
    "yahoo": "GPN",
    "tv": "NYSE:GPN",
    "currency": "USD"
  },
  {
    "symbol": "GL",
    "name": "Globe Life",
    "exchange": "NYSE",
    "yahoo": "GL",
    "tv": "NYSE:GL",
    "currency": "USD"
  },
  {
    "symbol": "GDDY",
    "name": "GoDaddy",
    "exchange": "NYSE",
    "yahoo": "GDDY",
    "tv": "NYSE:GDDY",
    "currency": "USD"
  },
  {
    "symbol": "GS",
    "name": "Goldman Sachs",
    "exchange": "NYSE",
    "yahoo": "GS",
    "tv": "NYSE:GS",
    "currency": "USD"
  },
  {
    "symbol": "HAL",
    "name": "Halliburton",
    "exchange": "NYSE",
    "yahoo": "HAL",
    "tv": "NYSE:HAL",
    "currency": "USD"
  },
  {
    "symbol": "HIG",
    "name": "Hartford (The)",
    "exchange": "NYSE",
    "yahoo": "HIG",
    "tv": "NYSE:HIG",
    "currency": "USD"
  },
  {
    "symbol": "HAS",
    "name": "Hasbro",
    "exchange": "NYSE",
    "yahoo": "HAS",
    "tv": "NYSE:HAS",
    "currency": "USD"
  },
  {
    "symbol": "HCA",
    "name": "HCA Healthcare",
    "exchange": "NYSE",
    "yahoo": "HCA",
    "tv": "NYSE:HCA",
    "currency": "USD"
  },
  {
    "symbol": "DOC",
    "name": "Healthpeak Properties",
    "exchange": "NYSE",
    "yahoo": "DOC",
    "tv": "NYSE:DOC",
    "currency": "USD"
  },
  {
    "symbol": "HSIC",
    "name": "Henry Schein",
    "exchange": "NYSE",
    "yahoo": "HSIC",
    "tv": "NYSE:HSIC",
    "currency": "USD"
  },
  {
    "symbol": "HSY",
    "name": "Hershey Company (The)",
    "exchange": "NYSE",
    "yahoo": "HSY",
    "tv": "NYSE:HSY",
    "currency": "USD"
  },
  {
    "symbol": "HPE",
    "name": "Hewlett Packard Enterprise",
    "exchange": "NYSE",
    "yahoo": "HPE",
    "tv": "NYSE:HPE",
    "currency": "USD"
  },
  {
    "symbol": "HLT",
    "name": "Hilton Worldwide",
    "exchange": "NYSE",
    "yahoo": "HLT",
    "tv": "NYSE:HLT",
    "currency": "USD"
  },
  {
    "symbol": "HD",
    "name": "Home Depot (The)",
    "exchange": "NYSE",
    "yahoo": "HD",
    "tv": "NYSE:HD",
    "currency": "USD"
  },
  {
    "symbol": "HON",
    "name": "Honeywell",
    "exchange": "NYSE",
    "yahoo": "HON",
    "tv": "NYSE:HON",
    "currency": "USD"
  },
  {
    "symbol": "HRL",
    "name": "Hormel Foods",
    "exchange": "NYSE",
    "yahoo": "HRL",
    "tv": "NYSE:HRL",
    "currency": "USD"
  },
  {
    "symbol": "HST",
    "name": "Host Hotels & Resorts",
    "exchange": "NYSE",
    "yahoo": "HST",
    "tv": "NYSE:HST",
    "currency": "USD"
  },
  {
    "symbol": "HWM",
    "name": "Howmet Aerospace",
    "exchange": "NYSE",
    "yahoo": "HWM",
    "tv": "NYSE:HWM",
    "currency": "USD"
  },
  {
    "symbol": "HPQ",
    "name": "HP Inc.",
    "exchange": "NYSE",
    "yahoo": "HPQ",
    "tv": "NYSE:HPQ",
    "currency": "USD"
  },
  {
    "symbol": "HUBB",
    "name": "Hubbell Incorporated",
    "exchange": "NYSE",
    "yahoo": "HUBB",
    "tv": "NYSE:HUBB",
    "currency": "USD"
  },
  {
    "symbol": "HUM",
    "name": "Humana",
    "exchange": "NYSE",
    "yahoo": "HUM",
    "tv": "NYSE:HUM",
    "currency": "USD"
  },
  {
    "symbol": "HBAN",
    "name": "Huntington Bancshares",
    "exchange": "NYSE",
    "yahoo": "HBAN",
    "tv": "NYSE:HBAN",
    "currency": "USD"
  },
  {
    "symbol": "HII",
    "name": "Huntington Ingalls Industries",
    "exchange": "NYSE",
    "yahoo": "HII",
    "tv": "NYSE:HII",
    "currency": "USD"
  },
  {
    "symbol": "IBM",
    "name": "IBM",
    "exchange": "NYSE",
    "yahoo": "IBM",
    "tv": "NYSE:IBM",
    "currency": "USD"
  },
  {
    "symbol": "IEX",
    "name": "IDEX Corporation",
    "exchange": "NYSE",
    "yahoo": "IEX",
    "tv": "NYSE:IEX",
    "currency": "USD"
  },
  {
    "symbol": "IDXX",
    "name": "Idexx Laboratories",
    "exchange": "NYSE",
    "yahoo": "IDXX",
    "tv": "NYSE:IDXX",
    "currency": "USD"
  },
  {
    "symbol": "ITW",
    "name": "Illinois Tool Works",
    "exchange": "NYSE",
    "yahoo": "ITW",
    "tv": "NYSE:ITW",
    "currency": "USD"
  },
  {
    "symbol": "INCY",
    "name": "Incyte",
    "exchange": "NYSE",
    "yahoo": "INCY",
    "tv": "NYSE:INCY",
    "currency": "USD"
  },
  {
    "symbol": "IR",
    "name": "Ingersoll Rand",
    "exchange": "NYSE",
    "yahoo": "IR",
    "tv": "NYSE:IR",
    "currency": "USD"
  },
  {
    "symbol": "PODD",
    "name": "Insulet Corporation",
    "exchange": "NYSE",
    "yahoo": "PODD",
    "tv": "NYSE:PODD",
    "currency": "USD"
  },
  {
    "symbol": "INTC",
    "name": "Intel",
    "exchange": "NYSE",
    "yahoo": "INTC",
    "tv": "NYSE:INTC",
    "currency": "USD"
  },
  {
    "symbol": "IBKR",
    "name": "Interactive Brokers",
    "exchange": "NYSE",
    "yahoo": "IBKR",
    "tv": "NYSE:IBKR",
    "currency": "USD"
  },
  {
    "symbol": "ICE",
    "name": "Intercontinental Exchange",
    "exchange": "NYSE",
    "yahoo": "ICE",
    "tv": "NYSE:ICE",
    "currency": "USD"
  },
  {
    "symbol": "IFF",
    "name": "International Flavors & Fragrances",
    "exchange": "NYSE",
    "yahoo": "IFF",
    "tv": "NYSE:IFF",
    "currency": "USD"
  },
  {
    "symbol": "IP",
    "name": "International Paper",
    "exchange": "NYSE",
    "yahoo": "IP",
    "tv": "NYSE:IP",
    "currency": "USD"
  },
  {
    "symbol": "INTU",
    "name": "Intuit",
    "exchange": "NYSE",
    "yahoo": "INTU",
    "tv": "NYSE:INTU",
    "currency": "USD"
  },
  {
    "symbol": "ISRG",
    "name": "Intuitive Surgical",
    "exchange": "NYSE",
    "yahoo": "ISRG",
    "tv": "NYSE:ISRG",
    "currency": "USD"
  },
  {
    "symbol": "IVZ",
    "name": "Invesco",
    "exchange": "NYSE",
    "yahoo": "IVZ",
    "tv": "NYSE:IVZ",
    "currency": "USD"
  },
  {
    "symbol": "INVH",
    "name": "Invitation Homes",
    "exchange": "NYSE",
    "yahoo": "INVH",
    "tv": "NYSE:INVH",
    "currency": "USD"
  },
  {
    "symbol": "IQV",
    "name": "IQVIA",
    "exchange": "NYSE",
    "yahoo": "IQV",
    "tv": "NYSE:IQV",
    "currency": "USD"
  },
  {
    "symbol": "IRM",
    "name": "Iron Mountain",
    "exchange": "NYSE",
    "yahoo": "IRM",
    "tv": "NYSE:IRM",
    "currency": "USD"
  },
  {
    "symbol": "JBHT",
    "name": "J.B. Hunt",
    "exchange": "NYSE",
    "yahoo": "JBHT",
    "tv": "NYSE:JBHT",
    "currency": "USD"
  },
  {
    "symbol": "JBL",
    "name": "Jabil",
    "exchange": "NYSE",
    "yahoo": "JBL",
    "tv": "NYSE:JBL",
    "currency": "USD"
  },
  {
    "symbol": "JKHY",
    "name": "Jack Henry & Associates",
    "exchange": "NYSE",
    "yahoo": "JKHY",
    "tv": "NYSE:JKHY",
    "currency": "USD"
  },
  {
    "symbol": "J",
    "name": "Jacobs Solutions",
    "exchange": "NYSE",
    "yahoo": "J",
    "tv": "NYSE:J",
    "currency": "USD"
  },
  {
    "symbol": "JNJ",
    "name": "Johnson & Johnson",
    "exchange": "NYSE",
    "yahoo": "JNJ",
    "tv": "NYSE:JNJ",
    "currency": "USD"
  },
  {
    "symbol": "JCI",
    "name": "Johnson Controls",
    "exchange": "NYSE",
    "yahoo": "JCI",
    "tv": "NYSE:JCI",
    "currency": "USD"
  },
  {
    "symbol": "JPM",
    "name": "JPMorgan Chase",
    "exchange": "NYSE",
    "yahoo": "JPM",
    "tv": "NYSE:JPM",
    "currency": "USD"
  },
  {
    "symbol": "KVUE",
    "name": "Kenvue",
    "exchange": "NYSE",
    "yahoo": "KVUE",
    "tv": "NYSE:KVUE",
    "currency": "USD"
  },
  {
    "symbol": "KDP",
    "name": "Keurig Dr Pepper",
    "exchange": "NYSE",
    "yahoo": "KDP",
    "tv": "NYSE:KDP",
    "currency": "USD"
  },
  {
    "symbol": "KEY",
    "name": "KeyCorp",
    "exchange": "NYSE",
    "yahoo": "KEY",
    "tv": "NYSE:KEY",
    "currency": "USD"
  },
  {
    "symbol": "KEYS",
    "name": "Keysight Technologies",
    "exchange": "NYSE",
    "yahoo": "KEYS",
    "tv": "NYSE:KEYS",
    "currency": "USD"
  },
  {
    "symbol": "KMB",
    "name": "Kimberly-Clark",
    "exchange": "NYSE",
    "yahoo": "KMB",
    "tv": "NYSE:KMB",
    "currency": "USD"
  },
  {
    "symbol": "KIM",
    "name": "Kimco Realty",
    "exchange": "NYSE",
    "yahoo": "KIM",
    "tv": "NYSE:KIM",
    "currency": "USD"
  },
  {
    "symbol": "KMI",
    "name": "Kinder Morgan",
    "exchange": "NYSE",
    "yahoo": "KMI",
    "tv": "NYSE:KMI",
    "currency": "USD"
  },
  {
    "symbol": "KKR",
    "name": "KKR & Co.",
    "exchange": "NYSE",
    "yahoo": "KKR",
    "tv": "NYSE:KKR",
    "currency": "USD"
  },
  {
    "symbol": "KLAC",
    "name": "KLA Corporation",
    "exchange": "NYSE",
    "yahoo": "KLAC",
    "tv": "NYSE:KLAC",
    "currency": "USD"
  },
  {
    "symbol": "KHC",
    "name": "Kraft Heinz",
    "exchange": "NYSE",
    "yahoo": "KHC",
    "tv": "NYSE:KHC",
    "currency": "USD"
  },
  {
    "symbol": "KR",
    "name": "Kroger",
    "exchange": "NYSE",
    "yahoo": "KR",
    "tv": "NYSE:KR",
    "currency": "USD"
  },
  {
    "symbol": "LHX",
    "name": "L3Harris",
    "exchange": "NYSE",
    "yahoo": "LHX",
    "tv": "NYSE:LHX",
    "currency": "USD"
  },
  {
    "symbol": "LH",
    "name": "Labcorp",
    "exchange": "NYSE",
    "yahoo": "LH",
    "tv": "NYSE:LH",
    "currency": "USD"
  },
  {
    "symbol": "LRCX",
    "name": "Lam Research",
    "exchange": "NYSE",
    "yahoo": "LRCX",
    "tv": "NYSE:LRCX",
    "currency": "USD"
  },
  {
    "symbol": "LVS",
    "name": "Las Vegas Sands",
    "exchange": "NYSE",
    "yahoo": "LVS",
    "tv": "NYSE:LVS",
    "currency": "USD"
  },
  {
    "symbol": "LDOS",
    "name": "Leidos",
    "exchange": "NYSE",
    "yahoo": "LDOS",
    "tv": "NYSE:LDOS",
    "currency": "USD"
  },
  {
    "symbol": "LEN",
    "name": "Lennar",
    "exchange": "NYSE",
    "yahoo": "LEN",
    "tv": "NYSE:LEN",
    "currency": "USD"
  },
  {
    "symbol": "LII",
    "name": "Lennox International",
    "exchange": "NYSE",
    "yahoo": "LII",
    "tv": "NYSE:LII",
    "currency": "USD"
  },
  {
    "symbol": "LLY",
    "name": "Lilly (Eli)",
    "exchange": "NYSE",
    "yahoo": "LLY",
    "tv": "NYSE:LLY",
    "currency": "USD"
  },
  {
    "symbol": "LIN",
    "name": "Linde plc",
    "exchange": "NYSE",
    "yahoo": "LIN",
    "tv": "NYSE:LIN",
    "currency": "USD"
  },
  {
    "symbol": "LYV",
    "name": "Live Nation Entertainment",
    "exchange": "NYSE",
    "yahoo": "LYV",
    "tv": "NYSE:LYV",
    "currency": "USD"
  },
  {
    "symbol": "LMT",
    "name": "Lockheed Martin",
    "exchange": "NYSE",
    "yahoo": "LMT",
    "tv": "NYSE:LMT",
    "currency": "USD"
  },
  {
    "symbol": "L",
    "name": "Loews Corporation",
    "exchange": "NYSE",
    "yahoo": "L",
    "tv": "NYSE:L",
    "currency": "USD"
  },
  {
    "symbol": "LOW",
    "name": "Lowe's",
    "exchange": "NYSE",
    "yahoo": "LOW",
    "tv": "NYSE:LOW",
    "currency": "USD"
  },
  {
    "symbol": "LULU",
    "name": "Lululemon Athletica",
    "exchange": "NYSE",
    "yahoo": "LULU",
    "tv": "NYSE:LULU",
    "currency": "USD"
  },
  {
    "symbol": "LITE",
    "name": "Lumentum",
    "exchange": "NYSE",
    "yahoo": "LITE",
    "tv": "NYSE:LITE",
    "currency": "USD"
  },
  {
    "symbol": "LYB",
    "name": "LyondellBasell",
    "exchange": "NYSE",
    "yahoo": "LYB",
    "tv": "NYSE:LYB",
    "currency": "USD"
  },
  {
    "symbol": "MTB",
    "name": "M&T Bank",
    "exchange": "NYSE",
    "yahoo": "MTB",
    "tv": "NYSE:MTB",
    "currency": "USD"
  },
  {
    "symbol": "MPC",
    "name": "Marathon Petroleum",
    "exchange": "NYSE",
    "yahoo": "MPC",
    "tv": "NYSE:MPC",
    "currency": "USD"
  },
  {
    "symbol": "MAR",
    "name": "Marriott International",
    "exchange": "NYSE",
    "yahoo": "MAR",
    "tv": "NYSE:MAR",
    "currency": "USD"
  },
  {
    "symbol": "MRSH",
    "name": "Marsh McLennan",
    "exchange": "NYSE",
    "yahoo": "MRSH",
    "tv": "NYSE:MRSH",
    "currency": "USD"
  },
  {
    "symbol": "MLM",
    "name": "Martin Marietta Materials",
    "exchange": "NYSE",
    "yahoo": "MLM",
    "tv": "NYSE:MLM",
    "currency": "USD"
  },
  {
    "symbol": "MRVL",
    "name": "Marvell Technology",
    "exchange": "NYSE",
    "yahoo": "MRVL",
    "tv": "NYSE:MRVL",
    "currency": "USD"
  },
  {
    "symbol": "MAS",
    "name": "Masco",
    "exchange": "NYSE",
    "yahoo": "MAS",
    "tv": "NYSE:MAS",
    "currency": "USD"
  },
  {
    "symbol": "MA",
    "name": "Mastercard",
    "exchange": "NYSE",
    "yahoo": "MA",
    "tv": "NYSE:MA",
    "currency": "USD"
  },
  {
    "symbol": "MKC",
    "name": "McCormick & Company",
    "exchange": "NYSE",
    "yahoo": "MKC",
    "tv": "NYSE:MKC",
    "currency": "USD"
  },
  {
    "symbol": "MCD",
    "name": "McDonald's",
    "exchange": "NYSE",
    "yahoo": "MCD",
    "tv": "NYSE:MCD",
    "currency": "USD"
  },
  {
    "symbol": "MCK",
    "name": "McKesson Corporation",
    "exchange": "NYSE",
    "yahoo": "MCK",
    "tv": "NYSE:MCK",
    "currency": "USD"
  },
  {
    "symbol": "MDT",
    "name": "Medtronic",
    "exchange": "NYSE",
    "yahoo": "MDT",
    "tv": "NYSE:MDT",
    "currency": "USD"
  },
  {
    "symbol": "MRK",
    "name": "Merck & Co.",
    "exchange": "NYSE",
    "yahoo": "MRK",
    "tv": "NYSE:MRK",
    "currency": "USD"
  },
  {
    "symbol": "META",
    "name": "Meta Platforms",
    "exchange": "NASDAQ",
    "yahoo": "META",
    "tv": "NASDAQ:META",
    "currency": "USD"
  },
  {
    "symbol": "MET",
    "name": "MetLife",
    "exchange": "NYSE",
    "yahoo": "MET",
    "tv": "NYSE:MET",
    "currency": "USD"
  },
  {
    "symbol": "MTD",
    "name": "Mettler Toledo",
    "exchange": "NYSE",
    "yahoo": "MTD",
    "tv": "NYSE:MTD",
    "currency": "USD"
  },
  {
    "symbol": "MGM",
    "name": "MGM Resorts",
    "exchange": "NYSE",
    "yahoo": "MGM",
    "tv": "NYSE:MGM",
    "currency": "USD"
  },
  {
    "symbol": "MCHP",
    "name": "Microchip Technology",
    "exchange": "NYSE",
    "yahoo": "MCHP",
    "tv": "NYSE:MCHP",
    "currency": "USD"
  },
  {
    "symbol": "MU",
    "name": "Micron Technology",
    "exchange": "NYSE",
    "yahoo": "MU",
    "tv": "NYSE:MU",
    "currency": "USD"
  },
  {
    "symbol": "MSFT",
    "name": "Microsoft",
    "exchange": "NYSE",
    "yahoo": "MSFT",
    "tv": "NYSE:MSFT",
    "currency": "USD"
  },
  {
    "symbol": "MAA",
    "name": "Mid-America Apartment Communities",
    "exchange": "NYSE",
    "yahoo": "MAA",
    "tv": "NYSE:MAA",
    "currency": "USD"
  },
  {
    "symbol": "MRNA",
    "name": "Moderna",
    "exchange": "NYSE",
    "yahoo": "MRNA",
    "tv": "NYSE:MRNA",
    "currency": "USD"
  },
  {
    "symbol": "TAP",
    "name": "Molson Coors Beverage Company",
    "exchange": "NYSE",
    "yahoo": "TAP",
    "tv": "NYSE:TAP",
    "currency": "USD"
  },
  {
    "symbol": "MDLZ",
    "name": "Mondelez International",
    "exchange": "NYSE",
    "yahoo": "MDLZ",
    "tv": "NYSE:MDLZ",
    "currency": "USD"
  },
  {
    "symbol": "MPWR",
    "name": "Monolithic Power Systems",
    "exchange": "NYSE",
    "yahoo": "MPWR",
    "tv": "NYSE:MPWR",
    "currency": "USD"
  },
  {
    "symbol": "MNST",
    "name": "Monster Beverage",
    "exchange": "NYSE",
    "yahoo": "MNST",
    "tv": "NYSE:MNST",
    "currency": "USD"
  },
  {
    "symbol": "MCO",
    "name": "Moody's Corporation",
    "exchange": "NYSE",
    "yahoo": "MCO",
    "tv": "NYSE:MCO",
    "currency": "USD"
  },
  {
    "symbol": "MS",
    "name": "Morgan Stanley",
    "exchange": "NYSE",
    "yahoo": "MS",
    "tv": "NYSE:MS",
    "currency": "USD"
  },
  {
    "symbol": "MOS",
    "name": "Mosaic Company (The)",
    "exchange": "NYSE",
    "yahoo": "MOS",
    "tv": "NYSE:MOS",
    "currency": "USD"
  },
  {
    "symbol": "MSI",
    "name": "Motorola Solutions",
    "exchange": "NYSE",
    "yahoo": "MSI",
    "tv": "NYSE:MSI",
    "currency": "USD"
  },
  {
    "symbol": "MSCI",
    "name": "MSCI Inc.",
    "exchange": "NYSE",
    "yahoo": "MSCI",
    "tv": "NYSE:MSCI",
    "currency": "USD"
  },
  {
    "symbol": "NDAQ",
    "name": "Nasdaq, Inc.",
    "exchange": "NYSE",
    "yahoo": "NDAQ",
    "tv": "NYSE:NDAQ",
    "currency": "USD"
  },
  {
    "symbol": "NTAP",
    "name": "NetApp",
    "exchange": "NYSE",
    "yahoo": "NTAP",
    "tv": "NYSE:NTAP",
    "currency": "USD"
  },
  {
    "symbol": "NFLX",
    "name": "Netflix",
    "exchange": "NYSE",
    "yahoo": "NFLX",
    "tv": "NYSE:NFLX",
    "currency": "USD"
  },
  {
    "symbol": "NEM",
    "name": "Newmont",
    "exchange": "NYSE",
    "yahoo": "NEM",
    "tv": "NYSE:NEM",
    "currency": "USD"
  },
  {
    "symbol": "NWSA",
    "name": "News Corp (Class A)",
    "exchange": "NYSE",
    "yahoo": "NWSA",
    "tv": "NYSE:NWSA",
    "currency": "USD"
  },
  {
    "symbol": "NWS",
    "name": "News Corp (Class B)",
    "exchange": "NYSE",
    "yahoo": "NWS",
    "tv": "NYSE:NWS",
    "currency": "USD"
  },
  {
    "symbol": "NEE",
    "name": "NextEra Energy",
    "exchange": "NYSE",
    "yahoo": "NEE",
    "tv": "NYSE:NEE",
    "currency": "USD"
  },
  {
    "symbol": "NKE",
    "name": "Nike, Inc.",
    "exchange": "NYSE",
    "yahoo": "NKE",
    "tv": "NYSE:NKE",
    "currency": "USD"
  },
  {
    "symbol": "NI",
    "name": "NiSource",
    "exchange": "NYSE",
    "yahoo": "NI",
    "tv": "NYSE:NI",
    "currency": "USD"
  },
  {
    "symbol": "NDSN",
    "name": "Nordson Corporation",
    "exchange": "NYSE",
    "yahoo": "NDSN",
    "tv": "NYSE:NDSN",
    "currency": "USD"
  },
  {
    "symbol": "NSC",
    "name": "Norfolk Southern",
    "exchange": "NYSE",
    "yahoo": "NSC",
    "tv": "NYSE:NSC",
    "currency": "USD"
  },
  {
    "symbol": "NTRS",
    "name": "Northern Trust",
    "exchange": "NYSE",
    "yahoo": "NTRS",
    "tv": "NYSE:NTRS",
    "currency": "USD"
  },
  {
    "symbol": "NOC",
    "name": "Northrop Grumman",
    "exchange": "NYSE",
    "yahoo": "NOC",
    "tv": "NYSE:NOC",
    "currency": "USD"
  },
  {
    "symbol": "NCLH",
    "name": "Norwegian Cruise Line Holdings",
    "exchange": "NYSE",
    "yahoo": "NCLH",
    "tv": "NYSE:NCLH",
    "currency": "USD"
  },
  {
    "symbol": "NRG",
    "name": "NRG Energy",
    "exchange": "NYSE",
    "yahoo": "NRG",
    "tv": "NYSE:NRG",
    "currency": "USD"
  },
  {
    "symbol": "NUE",
    "name": "Nucor",
    "exchange": "NYSE",
    "yahoo": "NUE",
    "tv": "NYSE:NUE",
    "currency": "USD"
  },
  {
    "symbol": "NVDA",
    "name": "Nvidia",
    "exchange": "NYSE",
    "yahoo": "NVDA",
    "tv": "NYSE:NVDA",
    "currency": "USD"
  },
  {
    "symbol": "NVR",
    "name": "NVR, Inc.",
    "exchange": "NYSE",
    "yahoo": "NVR",
    "tv": "NYSE:NVR",
    "currency": "USD"
  },
  {
    "symbol": "NXPI",
    "name": "NXP Semiconductors",
    "exchange": "NYSE",
    "yahoo": "NXPI",
    "tv": "NYSE:NXPI",
    "currency": "USD"
  },
  {
    "symbol": "ORLY",
    "name": "O’Reilly Automotive",
    "exchange": "NYSE",
    "yahoo": "ORLY",
    "tv": "NYSE:ORLY",
    "currency": "USD"
  },
  {
    "symbol": "OXY",
    "name": "Occidental Petroleum",
    "exchange": "NYSE",
    "yahoo": "OXY",
    "tv": "NYSE:OXY",
    "currency": "USD"
  },
  {
    "symbol": "ODFL",
    "name": "Old Dominion",
    "exchange": "NYSE",
    "yahoo": "ODFL",
    "tv": "NYSE:ODFL",
    "currency": "USD"
  },
  {
    "symbol": "OMC",
    "name": "Omnicom Group",
    "exchange": "NYSE",
    "yahoo": "OMC",
    "tv": "NYSE:OMC",
    "currency": "USD"
  },
  {
    "symbol": "ON",
    "name": "ON Semiconductor",
    "exchange": "NYSE",
    "yahoo": "ON",
    "tv": "NYSE:ON",
    "currency": "USD"
  },
  {
    "symbol": "OKE",
    "name": "Oneok",
    "exchange": "NYSE",
    "yahoo": "OKE",
    "tv": "NYSE:OKE",
    "currency": "USD"
  },
  {
    "symbol": "ORCL",
    "name": "Oracle Corporation",
    "exchange": "NYSE",
    "yahoo": "ORCL",
    "tv": "NYSE:ORCL",
    "currency": "USD"
  },
  {
    "symbol": "OTIS",
    "name": "Otis Worldwide",
    "exchange": "NYSE",
    "yahoo": "OTIS",
    "tv": "NYSE:OTIS",
    "currency": "USD"
  },
  {
    "symbol": "PCAR",
    "name": "Paccar",
    "exchange": "NYSE",
    "yahoo": "PCAR",
    "tv": "NYSE:PCAR",
    "currency": "USD"
  },
  {
    "symbol": "PKG",
    "name": "Packaging Corporation of America",
    "exchange": "NYSE",
    "yahoo": "PKG",
    "tv": "NYSE:PKG",
    "currency": "USD"
  },
  {
    "symbol": "PLTR",
    "name": "Palantir Technologies",
    "exchange": "NYSE",
    "yahoo": "PLTR",
    "tv": "NYSE:PLTR",
    "currency": "USD"
  },
  {
    "symbol": "PANW",
    "name": "Palo Alto Networks",
    "exchange": "NYSE",
    "yahoo": "PANW",
    "tv": "NYSE:PANW",
    "currency": "USD"
  },
  {
    "symbol": "PSKY",
    "name": "Paramount Skydance Corporation",
    "exchange": "NYSE",
    "yahoo": "PSKY",
    "tv": "NYSE:PSKY",
    "currency": "USD"
  },
  {
    "symbol": "PH",
    "name": "Parker Hannifin",
    "exchange": "NYSE",
    "yahoo": "PH",
    "tv": "NYSE:PH",
    "currency": "USD"
  },
  {
    "symbol": "PAYX",
    "name": "Paychex",
    "exchange": "NYSE",
    "yahoo": "PAYX",
    "tv": "NYSE:PAYX",
    "currency": "USD"
  },
  {
    "symbol": "PYPL",
    "name": "PayPal",
    "exchange": "NYSE",
    "yahoo": "PYPL",
    "tv": "NYSE:PYPL",
    "currency": "USD"
  },
  {
    "symbol": "PNR",
    "name": "Pentair",
    "exchange": "NYSE",
    "yahoo": "PNR",
    "tv": "NYSE:PNR",
    "currency": "USD"
  },
  {
    "symbol": "PEP",
    "name": "PepsiCo",
    "exchange": "NYSE",
    "yahoo": "PEP",
    "tv": "NYSE:PEP",
    "currency": "USD"
  },
  {
    "symbol": "PFE",
    "name": "Pfizer",
    "exchange": "NYSE",
    "yahoo": "PFE",
    "tv": "NYSE:PFE",
    "currency": "USD"
  },
  {
    "symbol": "PCG",
    "name": "PG&E Corporation",
    "exchange": "NYSE",
    "yahoo": "PCG",
    "tv": "NYSE:PCG",
    "currency": "USD"
  },
  {
    "symbol": "PM",
    "name": "Philip Morris International",
    "exchange": "NYSE",
    "yahoo": "PM",
    "tv": "NYSE:PM",
    "currency": "USD"
  },
  {
    "symbol": "PSX",
    "name": "Phillips 66",
    "exchange": "NYSE",
    "yahoo": "PSX",
    "tv": "NYSE:PSX",
    "currency": "USD"
  },
  {
    "symbol": "PNW",
    "name": "Pinnacle West Capital",
    "exchange": "NYSE",
    "yahoo": "PNW",
    "tv": "NYSE:PNW",
    "currency": "USD"
  },
  {
    "symbol": "PNC",
    "name": "PNC Financial Services",
    "exchange": "NYSE",
    "yahoo": "PNC",
    "tv": "NYSE:PNC",
    "currency": "USD"
  },
  {
    "symbol": "PPG",
    "name": "PPG Industries",
    "exchange": "NYSE",
    "yahoo": "PPG",
    "tv": "NYSE:PPG",
    "currency": "USD"
  },
  {
    "symbol": "PPL",
    "name": "PPL Corporation",
    "exchange": "NYSE",
    "yahoo": "PPL",
    "tv": "NYSE:PPL",
    "currency": "USD"
  },
  {
    "symbol": "PFG",
    "name": "Principal Financial Group",
    "exchange": "NYSE",
    "yahoo": "PFG",
    "tv": "NYSE:PFG",
    "currency": "USD"
  },
  {
    "symbol": "PG",
    "name": "Procter & Gamble",
    "exchange": "NYSE",
    "yahoo": "PG",
    "tv": "NYSE:PG",
    "currency": "USD"
  },
  {
    "symbol": "PGR",
    "name": "Progressive Corporation",
    "exchange": "NYSE",
    "yahoo": "PGR",
    "tv": "NYSE:PGR",
    "currency": "USD"
  },
  {
    "symbol": "PLD",
    "name": "Prologis",
    "exchange": "NYSE",
    "yahoo": "PLD",
    "tv": "NYSE:PLD",
    "currency": "USD"
  },
  {
    "symbol": "PRU",
    "name": "Prudential Financial",
    "exchange": "NYSE",
    "yahoo": "PRU",
    "tv": "NYSE:PRU",
    "currency": "USD"
  },
  {
    "symbol": "PEG",
    "name": "Public Service Enterprise Group",
    "exchange": "NYSE",
    "yahoo": "PEG",
    "tv": "NYSE:PEG",
    "currency": "USD"
  },
  {
    "symbol": "PTC",
    "name": "PTC Inc.",
    "exchange": "NYSE",
    "yahoo": "PTC",
    "tv": "NYSE:PTC",
    "currency": "USD"
  },
  {
    "symbol": "PSA",
    "name": "Public Storage",
    "exchange": "NYSE",
    "yahoo": "PSA",
    "tv": "NYSE:PSA",
    "currency": "USD"
  },
  {
    "symbol": "PHM",
    "name": "PulteGroup",
    "exchange": "NYSE",
    "yahoo": "PHM",
    "tv": "NYSE:PHM",
    "currency": "USD"
  },
  {
    "symbol": "PWR",
    "name": "Quanta Services",
    "exchange": "NYSE",
    "yahoo": "PWR",
    "tv": "NYSE:PWR",
    "currency": "USD"
  },
  {
    "symbol": "QCOM",
    "name": "Qualcomm",
    "exchange": "NYSE",
    "yahoo": "QCOM",
    "tv": "NYSE:QCOM",
    "currency": "USD"
  },
  {
    "symbol": "DGX",
    "name": "Quest Diagnostics",
    "exchange": "NYSE",
    "yahoo": "DGX",
    "tv": "NYSE:DGX",
    "currency": "USD"
  },
  {
    "symbol": "Q",
    "name": "Qnity Electronics",
    "exchange": "NYSE",
    "yahoo": "Q",
    "tv": "NYSE:Q",
    "currency": "USD"
  },
  {
    "symbol": "RL",
    "name": "Ralph Lauren Corporation",
    "exchange": "NYSE",
    "yahoo": "RL",
    "tv": "NYSE:RL",
    "currency": "USD"
  },
  {
    "symbol": "RJF",
    "name": "Raymond James Financial",
    "exchange": "NYSE",
    "yahoo": "RJF",
    "tv": "NYSE:RJF",
    "currency": "USD"
  },
  {
    "symbol": "RTX",
    "name": "RTX Corporation",
    "exchange": "NYSE",
    "yahoo": "RTX",
    "tv": "NYSE:RTX",
    "currency": "USD"
  },
  {
    "symbol": "O",
    "name": "Realty Income",
    "exchange": "NYSE",
    "yahoo": "O",
    "tv": "NYSE:O",
    "currency": "USD"
  },
  {
    "symbol": "REG",
    "name": "Regency Centers",
    "exchange": "NYSE",
    "yahoo": "REG",
    "tv": "NYSE:REG",
    "currency": "USD"
  },
  {
    "symbol": "REGN",
    "name": "Regeneron Pharmaceuticals",
    "exchange": "NYSE",
    "yahoo": "REGN",
    "tv": "NYSE:REGN",
    "currency": "USD"
  },
  {
    "symbol": "RF",
    "name": "Regions Financial Corporation",
    "exchange": "NYSE",
    "yahoo": "RF",
    "tv": "NYSE:RF",
    "currency": "USD"
  },
  {
    "symbol": "RSG",
    "name": "Republic Services",
    "exchange": "NYSE",
    "yahoo": "RSG",
    "tv": "NYSE:RSG",
    "currency": "USD"
  },
  {
    "symbol": "RMD",
    "name": "ResMed",
    "exchange": "NYSE",
    "yahoo": "RMD",
    "tv": "NYSE:RMD",
    "currency": "USD"
  },
  {
    "symbol": "RVTY",
    "name": "Revvity",
    "exchange": "NYSE",
    "yahoo": "RVTY",
    "tv": "NYSE:RVTY",
    "currency": "USD"
  },
  {
    "symbol": "HOOD",
    "name": "Robinhood Markets",
    "exchange": "NYSE",
    "yahoo": "HOOD",
    "tv": "NYSE:HOOD",
    "currency": "USD"
  },
  {
    "symbol": "ROK",
    "name": "Rockwell Automation",
    "exchange": "NYSE",
    "yahoo": "ROK",
    "tv": "NYSE:ROK",
    "currency": "USD"
  },
  {
    "symbol": "ROL",
    "name": "Rollins, Inc.",
    "exchange": "NYSE",
    "yahoo": "ROL",
    "tv": "NYSE:ROL",
    "currency": "USD"
  },
  {
    "symbol": "ROP",
    "name": "Roper Technologies",
    "exchange": "NYSE",
    "yahoo": "ROP",
    "tv": "NYSE:ROP",
    "currency": "USD"
  },
  {
    "symbol": "ROST",
    "name": "Ross Stores",
    "exchange": "NYSE",
    "yahoo": "ROST",
    "tv": "NYSE:ROST",
    "currency": "USD"
  },
  {
    "symbol": "RCL",
    "name": "Royal Caribbean Group",
    "exchange": "NYSE",
    "yahoo": "RCL",
    "tv": "NYSE:RCL",
    "currency": "USD"
  },
  {
    "symbol": "SPGI",
    "name": "S&P Global",
    "exchange": "NYSE",
    "yahoo": "SPGI",
    "tv": "NYSE:SPGI",
    "currency": "USD"
  },
  {
    "symbol": "CRM",
    "name": "Salesforce",
    "exchange": "NYSE",
    "yahoo": "CRM",
    "tv": "NYSE:CRM",
    "currency": "USD"
  },
  {
    "symbol": "SNDK",
    "name": "Sandisk",
    "exchange": "NYSE",
    "yahoo": "SNDK",
    "tv": "NYSE:SNDK",
    "currency": "USD"
  },
  {
    "symbol": "SBAC",
    "name": "SBA Communications",
    "exchange": "NYSE",
    "yahoo": "SBAC",
    "tv": "NYSE:SBAC",
    "currency": "USD"
  },
  {
    "symbol": "SLB",
    "name": "Schlumberger",
    "exchange": "NYSE",
    "yahoo": "SLB",
    "tv": "NYSE:SLB",
    "currency": "USD"
  },
  {
    "symbol": "STX",
    "name": "Seagate Technology",
    "exchange": "NYSE",
    "yahoo": "STX",
    "tv": "NYSE:STX",
    "currency": "USD"
  },
  {
    "symbol": "SRE",
    "name": "Sempra",
    "exchange": "NYSE",
    "yahoo": "SRE",
    "tv": "NYSE:SRE",
    "currency": "USD"
  },
  {
    "symbol": "NOW",
    "name": "ServiceNow",
    "exchange": "NYSE",
    "yahoo": "NOW",
    "tv": "NYSE:NOW",
    "currency": "USD"
  },
  {
    "symbol": "SHW",
    "name": "Sherwin-Williams",
    "exchange": "NYSE",
    "yahoo": "SHW",
    "tv": "NYSE:SHW",
    "currency": "USD"
  },
  {
    "symbol": "SPG",
    "name": "Simon Property Group",
    "exchange": "NYSE",
    "yahoo": "SPG",
    "tv": "NYSE:SPG",
    "currency": "USD"
  },
  {
    "symbol": "SWKS",
    "name": "Skyworks Solutions",
    "exchange": "NYSE",
    "yahoo": "SWKS",
    "tv": "NYSE:SWKS",
    "currency": "USD"
  },
  {
    "symbol": "SJM",
    "name": "J.M. Smucker Company (The)",
    "exchange": "NYSE",
    "yahoo": "SJM",
    "tv": "NYSE:SJM",
    "currency": "USD"
  },
  {
    "symbol": "SW",
    "name": "Smurfit Westrock",
    "exchange": "NYSE",
    "yahoo": "SW",
    "tv": "NYSE:SW",
    "currency": "USD"
  },
  {
    "symbol": "SNA",
    "name": "Snap-on",
    "exchange": "NYSE",
    "yahoo": "SNA",
    "tv": "NYSE:SNA",
    "currency": "USD"
  },
  {
    "symbol": "SOLV",
    "name": "Solventum",
    "exchange": "NYSE",
    "yahoo": "SOLV",
    "tv": "NYSE:SOLV",
    "currency": "USD"
  },
  {
    "symbol": "SO",
    "name": "Southern Company",
    "exchange": "NYSE",
    "yahoo": "SO",
    "tv": "NYSE:SO",
    "currency": "USD"
  },
  {
    "symbol": "LUV",
    "name": "Southwest Airlines",
    "exchange": "NYSE",
    "yahoo": "LUV",
    "tv": "NYSE:LUV",
    "currency": "USD"
  },
  {
    "symbol": "SWK",
    "name": "Stanley Black & Decker",
    "exchange": "NYSE",
    "yahoo": "SWK",
    "tv": "NYSE:SWK",
    "currency": "USD"
  },
  {
    "symbol": "SBUX",
    "name": "Starbucks",
    "exchange": "NYSE",
    "yahoo": "SBUX",
    "tv": "NYSE:SBUX",
    "currency": "USD"
  },
  {
    "symbol": "STT",
    "name": "State Street Corporation",
    "exchange": "NYSE",
    "yahoo": "STT",
    "tv": "NYSE:STT",
    "currency": "USD"
  },
  {
    "symbol": "STLD",
    "name": "Steel Dynamics",
    "exchange": "NYSE",
    "yahoo": "STLD",
    "tv": "NYSE:STLD",
    "currency": "USD"
  },
  {
    "symbol": "STE",
    "name": "Steris",
    "exchange": "NYSE",
    "yahoo": "STE",
    "tv": "NYSE:STE",
    "currency": "USD"
  },
  {
    "symbol": "SYK",
    "name": "Stryker Corporation",
    "exchange": "NYSE",
    "yahoo": "SYK",
    "tv": "NYSE:SYK",
    "currency": "USD"
  },
  {
    "symbol": "SMCI",
    "name": "Supermicro",
    "exchange": "NYSE",
    "yahoo": "SMCI",
    "tv": "NYSE:SMCI",
    "currency": "USD"
  },
  {
    "symbol": "SYF",
    "name": "Synchrony Financial",
    "exchange": "NYSE",
    "yahoo": "SYF",
    "tv": "NYSE:SYF",
    "currency": "USD"
  },
  {
    "symbol": "SNPS",
    "name": "Synopsys",
    "exchange": "NYSE",
    "yahoo": "SNPS",
    "tv": "NYSE:SNPS",
    "currency": "USD"
  },
  {
    "symbol": "SYY",
    "name": "Sysco",
    "exchange": "NYSE",
    "yahoo": "SYY",
    "tv": "NYSE:SYY",
    "currency": "USD"
  },
  {
    "symbol": "TMUS",
    "name": "T-Mobile US",
    "exchange": "NYSE",
    "yahoo": "TMUS",
    "tv": "NYSE:TMUS",
    "currency": "USD"
  },
  {
    "symbol": "TROW",
    "name": "T. Rowe Price",
    "exchange": "NYSE",
    "yahoo": "TROW",
    "tv": "NYSE:TROW",
    "currency": "USD"
  },
  {
    "symbol": "TTWO",
    "name": "Take-Two Interactive",
    "exchange": "NYSE",
    "yahoo": "TTWO",
    "tv": "NYSE:TTWO",
    "currency": "USD"
  },
  {
    "symbol": "TPR",
    "name": "Tapestry, Inc.",
    "exchange": "NYSE",
    "yahoo": "TPR",
    "tv": "NYSE:TPR",
    "currency": "USD"
  },
  {
    "symbol": "TRGP",
    "name": "Targa Resources",
    "exchange": "NYSE",
    "yahoo": "TRGP",
    "tv": "NYSE:TRGP",
    "currency": "USD"
  },
  {
    "symbol": "TGT",
    "name": "Target Corporation",
    "exchange": "NYSE",
    "yahoo": "TGT",
    "tv": "NYSE:TGT",
    "currency": "USD"
  },
  {
    "symbol": "TEL",
    "name": "TE Connectivity",
    "exchange": "NYSE",
    "yahoo": "TEL",
    "tv": "NYSE:TEL",
    "currency": "USD"
  },
  {
    "symbol": "TDY",
    "name": "Teledyne Technologies",
    "exchange": "NYSE",
    "yahoo": "TDY",
    "tv": "NYSE:TDY",
    "currency": "USD"
  },
  {
    "symbol": "TER",
    "name": "Teradyne",
    "exchange": "NYSE",
    "yahoo": "TER",
    "tv": "NYSE:TER",
    "currency": "USD"
  },
  {
    "symbol": "TSLA",
    "name": "Tesla, Inc.",
    "exchange": "NASDAQ",
    "yahoo": "TSLA",
    "tv": "NASDAQ:TSLA",
    "currency": "USD"
  },
  {
    "symbol": "TXN",
    "name": "Texas Instruments",
    "exchange": "NYSE",
    "yahoo": "TXN",
    "tv": "NYSE:TXN",
    "currency": "USD"
  },
  {
    "symbol": "TPL",
    "name": "Texas Pacific Land Corporation",
    "exchange": "NYSE",
    "yahoo": "TPL",
    "tv": "NYSE:TPL",
    "currency": "USD"
  },
  {
    "symbol": "TXT",
    "name": "Textron",
    "exchange": "NYSE",
    "yahoo": "TXT",
    "tv": "NYSE:TXT",
    "currency": "USD"
  },
  {
    "symbol": "TMO",
    "name": "Thermo Fisher Scientific",
    "exchange": "NYSE",
    "yahoo": "TMO",
    "tv": "NYSE:TMO",
    "currency": "USD"
  },
  {
    "symbol": "TJX",
    "name": "TJX Companies",
    "exchange": "NYSE",
    "yahoo": "TJX",
    "tv": "NYSE:TJX",
    "currency": "USD"
  },
  {
    "symbol": "TKO",
    "name": "TKO Group Holdings",
    "exchange": "NYSE",
    "yahoo": "TKO",
    "tv": "NYSE:TKO",
    "currency": "USD"
  },
  {
    "symbol": "TTD",
    "name": "Trade Desk (The)",
    "exchange": "NYSE",
    "yahoo": "TTD",
    "tv": "NYSE:TTD",
    "currency": "USD"
  },
  {
    "symbol": "TSCO",
    "name": "Tractor Supply",
    "exchange": "NYSE",
    "yahoo": "TSCO",
    "tv": "NYSE:TSCO",
    "currency": "USD"
  },
  {
    "symbol": "TT",
    "name": "Trane Technologies",
    "exchange": "NYSE",
    "yahoo": "TT",
    "tv": "NYSE:TT",
    "currency": "USD"
  },
  {
    "symbol": "TDG",
    "name": "TransDigm Group",
    "exchange": "NYSE",
    "yahoo": "TDG",
    "tv": "NYSE:TDG",
    "currency": "USD"
  },
  {
    "symbol": "TRV",
    "name": "Travelers Companies (The)",
    "exchange": "NYSE",
    "yahoo": "TRV",
    "tv": "NYSE:TRV",
    "currency": "USD"
  },
  {
    "symbol": "TRMB",
    "name": "Trimble Inc.",
    "exchange": "NYSE",
    "yahoo": "TRMB",
    "tv": "NYSE:TRMB",
    "currency": "USD"
  },
  {
    "symbol": "TFC",
    "name": "Truist Financial",
    "exchange": "NYSE",
    "yahoo": "TFC",
    "tv": "NYSE:TFC",
    "currency": "USD"
  },
  {
    "symbol": "TYL",
    "name": "Tyler Technologies",
    "exchange": "NYSE",
    "yahoo": "TYL",
    "tv": "NYSE:TYL",
    "currency": "USD"
  },
  {
    "symbol": "TSN",
    "name": "Tyson Foods",
    "exchange": "NYSE",
    "yahoo": "TSN",
    "tv": "NYSE:TSN",
    "currency": "USD"
  },
  {
    "symbol": "USB",
    "name": "U.S. Bancorp",
    "exchange": "NYSE",
    "yahoo": "USB",
    "tv": "NYSE:USB",
    "currency": "USD"
  },
  {
    "symbol": "UBER",
    "name": "Uber",
    "exchange": "NYSE",
    "yahoo": "UBER",
    "tv": "NYSE:UBER",
    "currency": "USD"
  },
  {
    "symbol": "UDR",
    "name": "UDR, Inc.",
    "exchange": "NYSE",
    "yahoo": "UDR",
    "tv": "NYSE:UDR",
    "currency": "USD"
  },
  {
    "symbol": "ULTA",
    "name": "Ulta Beauty",
    "exchange": "NYSE",
    "yahoo": "ULTA",
    "tv": "NYSE:ULTA",
    "currency": "USD"
  },
  {
    "symbol": "UNP",
    "name": "Union Pacific Corporation",
    "exchange": "NYSE",
    "yahoo": "UNP",
    "tv": "NYSE:UNP",
    "currency": "USD"
  },
  {
    "symbol": "UAL",
    "name": "United Airlines Holdings",
    "exchange": "NYSE",
    "yahoo": "UAL",
    "tv": "NYSE:UAL",
    "currency": "USD"
  },
  {
    "symbol": "UPS",
    "name": "United Parcel Service",
    "exchange": "NYSE",
    "yahoo": "UPS",
    "tv": "NYSE:UPS",
    "currency": "USD"
  },
  {
    "symbol": "URI",
    "name": "United Rentals",
    "exchange": "NYSE",
    "yahoo": "URI",
    "tv": "NYSE:URI",
    "currency": "USD"
  },
  {
    "symbol": "UNH",
    "name": "UnitedHealth Group",
    "exchange": "NYSE",
    "yahoo": "UNH",
    "tv": "NYSE:UNH",
    "currency": "USD"
  },
  {
    "symbol": "UHS",
    "name": "Universal Health Services",
    "exchange": "NYSE",
    "yahoo": "UHS",
    "tv": "NYSE:UHS",
    "currency": "USD"
  },
  {
    "symbol": "VLO",
    "name": "Valero Energy",
    "exchange": "NYSE",
    "yahoo": "VLO",
    "tv": "NYSE:VLO",
    "currency": "USD"
  },
  {
    "symbol": "VEEV",
    "name": "Veeva Systems",
    "exchange": "NYSE",
    "yahoo": "VEEV",
    "tv": "NYSE:VEEV",
    "currency": "USD"
  },
  {
    "symbol": "VTR",
    "name": "Ventas",
    "exchange": "NYSE",
    "yahoo": "VTR",
    "tv": "AMEX:VTR",
    "currency": "USD"
  },
  {
    "symbol": "VLTO",
    "name": "Veralto",
    "exchange": "NYSE",
    "yahoo": "VLTO",
    "tv": "NYSE:VLTO",
    "currency": "USD"
  },
  {
    "symbol": "VRSN",
    "name": "Verisign",
    "exchange": "NYSE",
    "yahoo": "VRSN",
    "tv": "NYSE:VRSN",
    "currency": "USD"
  },
  {
    "symbol": "VRSK",
    "name": "Verisk Analytics",
    "exchange": "NYSE",
    "yahoo": "VRSK",
    "tv": "NYSE:VRSK",
    "currency": "USD"
  },
  {
    "symbol": "VZ",
    "name": "Verizon",
    "exchange": "NYSE",
    "yahoo": "VZ",
    "tv": "NYSE:VZ",
    "currency": "USD"
  },
  {
    "symbol": "VRTX",
    "name": "Vertex Pharmaceuticals",
    "exchange": "NYSE",
    "yahoo": "VRTX",
    "tv": "NYSE:VRTX",
    "currency": "USD"
  },
  {
    "symbol": "VRT",
    "name": "Vertiv",
    "exchange": "NYSE",
    "yahoo": "VRT",
    "tv": "NYSE:VRT",
    "currency": "USD"
  },
  {
    "symbol": "VTRS",
    "name": "Viatris",
    "exchange": "NYSE",
    "yahoo": "VTRS",
    "tv": "AMEX:VTRS",
    "currency": "USD"
  },
  {
    "symbol": "VICI",
    "name": "Vici Properties",
    "exchange": "NYSE",
    "yahoo": "VICI",
    "tv": "NYSE:VICI",
    "currency": "USD"
  },
  {
    "symbol": "V",
    "name": "Visa Inc.",
    "exchange": "NYSE",
    "yahoo": "V",
    "tv": "NYSE:V",
    "currency": "USD"
  },
  {
    "symbol": "VST",
    "name": "Vistra Corp.",
    "exchange": "NYSE",
    "yahoo": "VST",
    "tv": "NYSE:VST",
    "currency": "USD"
  },
  {
    "symbol": "VMC",
    "name": "Vulcan Materials Company",
    "exchange": "NYSE",
    "yahoo": "VMC",
    "tv": "NYSE:VMC",
    "currency": "USD"
  },
  {
    "symbol": "WRB",
    "name": "W. R. Berkley Corporation",
    "exchange": "NYSE",
    "yahoo": "WRB",
    "tv": "NYSE:WRB",
    "currency": "USD"
  },
  {
    "symbol": "GWW",
    "name": "W. W. Grainger",
    "exchange": "NYSE",
    "yahoo": "GWW",
    "tv": "NYSE:GWW",
    "currency": "USD"
  },
  {
    "symbol": "WAB",
    "name": "Wabtec",
    "exchange": "NYSE",
    "yahoo": "WAB",
    "tv": "NYSE:WAB",
    "currency": "USD"
  },
  {
    "symbol": "WMT",
    "name": "Walmart",
    "exchange": "NYSE",
    "yahoo": "WMT",
    "tv": "NYSE:WMT",
    "currency": "USD"
  },
  {
    "symbol": "DIS",
    "name": "Walt Disney Company (The)",
    "exchange": "NYSE",
    "yahoo": "DIS",
    "tv": "NYSE:DIS",
    "currency": "USD"
  },
  {
    "symbol": "WBD",
    "name": "Warner Bros. Discovery",
    "exchange": "NYSE",
    "yahoo": "WBD",
    "tv": "NYSE:WBD",
    "currency": "USD"
  },
  {
    "symbol": "WM",
    "name": "Waste Management",
    "exchange": "NYSE",
    "yahoo": "WM",
    "tv": "NYSE:WM",
    "currency": "USD"
  },
  {
    "symbol": "WAT",
    "name": "Waters Corporation",
    "exchange": "NYSE",
    "yahoo": "WAT",
    "tv": "NYSE:WAT",
    "currency": "USD"
  },
  {
    "symbol": "WEC",
    "name": "WEC Energy Group",
    "exchange": "NYSE",
    "yahoo": "WEC",
    "tv": "NYSE:WEC",
    "currency": "USD"
  },
  {
    "symbol": "WFC",
    "name": "Wells Fargo",
    "exchange": "NYSE",
    "yahoo": "WFC",
    "tv": "NYSE:WFC",
    "currency": "USD"
  },
  {
    "symbol": "WELL",
    "name": "Welltower",
    "exchange": "NYSE",
    "yahoo": "WELL",
    "tv": "NYSE:WELL",
    "currency": "USD"
  },
  {
    "symbol": "WST",
    "name": "West Pharmaceutical Services",
    "exchange": "NYSE",
    "yahoo": "WST",
    "tv": "NYSE:WST",
    "currency": "USD"
  },
  {
    "symbol": "WDC",
    "name": "Western Digital",
    "exchange": "NYSE",
    "yahoo": "WDC",
    "tv": "NYSE:WDC",
    "currency": "USD"
  },
  {
    "symbol": "WY",
    "name": "Weyerhaeuser",
    "exchange": "NYSE",
    "yahoo": "WY",
    "tv": "NYSE:WY",
    "currency": "USD"
  },
  {
    "symbol": "WSM",
    "name": "Williams-Sonoma, Inc.",
    "exchange": "NYSE",
    "yahoo": "WSM",
    "tv": "NYSE:WSM",
    "currency": "USD"
  },
  {
    "symbol": "WMB",
    "name": "Williams Companies",
    "exchange": "NYSE",
    "yahoo": "WMB",
    "tv": "NYSE:WMB",
    "currency": "USD"
  },
  {
    "symbol": "WTW",
    "name": "Willis Towers Watson",
    "exchange": "NYSE",
    "yahoo": "WTW",
    "tv": "NYSE:WTW",
    "currency": "USD"
  },
  {
    "symbol": "WDAY",
    "name": "Workday, Inc.",
    "exchange": "NYSE",
    "yahoo": "WDAY",
    "tv": "NYSE:WDAY",
    "currency": "USD"
  },
  {
    "symbol": "WYNN",
    "name": "Wynn Resorts",
    "exchange": "NYSE",
    "yahoo": "WYNN",
    "tv": "NYSE:WYNN",
    "currency": "USD"
  },
  {
    "symbol": "XEL",
    "name": "Xcel Energy",
    "exchange": "NYSE",
    "yahoo": "XEL",
    "tv": "NYSE:XEL",
    "currency": "USD"
  },
  {
    "symbol": "XYL",
    "name": "Xylem Inc.",
    "exchange": "NYSE",
    "yahoo": "XYL",
    "tv": "NYSE:XYL",
    "currency": "USD"
  },
  {
    "symbol": "YUM",
    "name": "Yum! Brands",
    "exchange": "NYSE",
    "yahoo": "YUM",
    "tv": "NYSE:YUM",
    "currency": "USD"
  },
  {
    "symbol": "ZBRA",
    "name": "Zebra Technologies",
    "exchange": "NYSE",
    "yahoo": "ZBRA",
    "tv": "NYSE:ZBRA",
    "currency": "USD"
  },
  {
    "symbol": "ZBH",
    "name": "Zimmer Biomet",
    "exchange": "NYSE",
    "yahoo": "ZBH",
    "tv": "NYSE:ZBH",
    "currency": "USD"
  },
  {
    "symbol": "ZTS",
    "name": "Zoetis",
    "exchange": "NYSE",
    "yahoo": "ZTS",
    "tv": "NYSE:ZTS",
    "currency": "USD"
  }
];

;/* === js/data/global-assets.js === */
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
    VOO: 520, QQQ: 490, VT: 118, SPY: 520, TTWO: 245, BTC: 97000, ETH: 3400, USDT: 1, SOL: 180, BNB: 650, XRP: 2.2,
  };
  us.forEach(s => { /* no fake $100 — unpriced until live fetch */ });
  window.CRYPTO_ASSETS.forEach(c => { if (fb[c.symbol] == null) fb[c.symbol] = null; });
  window.GLOBAL_FALLBACK_USD = fb;
})();

;/* === js/data/fundamentals.js === */
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

;/* === js/data/dividends.js === */
'use strict';
/**
 * Production-structured dividend & corporate actions dataset.
 * Replace via DividendService.setAdapter() when live PSX API connects.
 *
 * Schema per symbol:
 *   cashDividends[]  — { id, amountPerShare, exDate, recordDate, paymentDate, fiscalYear, status }
 *   bonusShares[]    — { id, ratio, exDate, recordDate, creditDate, fiscalYear }
 *   rightsIssues[]   — { id, ratio, issuePrice, exDate, recordDate, subscriptionEnd, fiscalYear }
 *   yieldHistory[]   — { date, yield } annual snapshots
 */
const DIVIDEND_DATA = {
  MEBL: {
    companyName: 'Meezan Bank',
    sector: 'Banking',
    cashDividends: [
      { id: 'mebl_cd_26i', amountPerShare: 10, exDate: '2026-06-15', recordDate: '2026-06-17', paymentDate: '2026-08-15', fiscalYear: 2025, status: 'upcoming' },
      { id: 'mebl_cd_26f', amountPerShare: 10, exDate: '2026-02-10', recordDate: '2026-02-12', paymentDate: '2026-04-08', fiscalYear: 2025, status: 'paid' },
      { id: 'mebl_cd_25i', amountPerShare: 10, exDate: '2025-06-12', recordDate: '2025-06-14', paymentDate: '2025-08-10', fiscalYear: 2024, status: 'paid' },
      { id: 'mebl_cd_25f', amountPerShare: 10, exDate: '2025-02-08', recordDate: '2025-02-10', paymentDate: '2025-04-05', fiscalYear: 2024, status: 'paid' },
      { id: 'mebl_cd_24i', amountPerShare: 9,  exDate: '2024-06-10', recordDate: '2024-06-12', paymentDate: '2024-08-08', fiscalYear: 2023, status: 'paid' },
      { id: 'mebl_cd_24f', amountPerShare: 8,  exDate: '2024-02-06', recordDate: '2024-02-08', paymentDate: '2024-04-04', fiscalYear: 2023, status: 'paid' },
      { id: 'mebl_cd_23i', amountPerShare: 8,  exDate: '2023-06-08', recordDate: '2023-06-10', paymentDate: '2023-08-07', fiscalYear: 2022, status: 'paid' },
      { id: 'mebl_cd_23f', amountPerShare: 7,  exDate: '2023-02-05', recordDate: '2023-02-07', paymentDate: '2023-04-03', fiscalYear: 2022, status: 'paid' },
    ],
    bonusShares: [
      { id: 'mebl_b_21', ratio: '1:10', exDate: '2021-09-15', recordDate: '2021-09-17', creditDate: '2021-10-01', fiscalYear: 2021 },
    ],
    rightsIssues: [],
    yieldHistory: [
      { date: '2025-12-31', yield: 8.4 }, { date: '2024-12-31', yield: 8.2 },
      { date: '2023-12-31', yield: 7.8 }, { date: '2022-12-31', yield: 7.2 },
    ],
  },
  OGDC: {
    companyName: 'Oil & Gas Development',
    sector: 'Oil & Gas',
    cashDividends: [
      { id: 'ogdc_cd_26i', amountPerShare: 12, exDate: '2026-05-20', recordDate: '2026-05-22', paymentDate: '2026-07-10', fiscalYear: 2025, status: 'upcoming' },
      { id: 'ogdc_cd_25f', amountPerShare: 12, exDate: '2025-05-18', recordDate: '2025-05-20', paymentDate: '2025-07-08', fiscalYear: 2024, status: 'paid' },
      { id: 'ogdc_cd_25i', amountPerShare: 11, exDate: '2025-11-15', recordDate: '2025-11-17', paymentDate: '2026-01-12', fiscalYear: 2024, status: 'paid' },
      { id: 'ogdc_cd_24f', amountPerShare: 10, exDate: '2024-05-16', recordDate: '2024-05-18', paymentDate: '2024-07-05', fiscalYear: 2023, status: 'paid' },
      { id: 'ogdc_cd_24i', amountPerShare: 10, exDate: '2024-11-12', recordDate: '2024-11-14', paymentDate: '2025-01-10', fiscalYear: 2023, status: 'paid' },
      { id: 'ogdc_cd_23f', amountPerShare: 9,  exDate: '2023-05-14', recordDate: '2023-05-16', paymentDate: '2023-07-06', fiscalYear: 2022, status: 'paid' },
    ],
    bonusShares: [],
    rightsIssues: [],
    yieldHistory: [
      { date: '2025-12-31', yield: 12.6 }, { date: '2024-12-31', yield: 12.4 },
      { date: '2023-12-31', yield: 11.8 }, { date: '2022-12-31', yield: 11.2 },
    ],
  },
  PPL: {
    companyName: 'Pakistan Petroleum',
    sector: 'Oil & Gas',
    cashDividends: [
      { id: 'ppl_cd_26i', amountPerShare: 6, exDate: '2026-06-01', recordDate: '2026-06-03', paymentDate: '2026-08-01', fiscalYear: 2025, status: 'upcoming' },
      { id: 'ppl_cd_25f', amountPerShare: 6, exDate: '2025-05-28', recordDate: '2025-05-30', paymentDate: '2025-07-28', fiscalYear: 2024, status: 'paid' },
      { id: 'ppl_cd_24f', amountPerShare: 5.5, exDate: '2024-05-25', recordDate: '2024-05-27', paymentDate: '2024-07-25', fiscalYear: 2023, status: 'paid' },
      { id: 'ppl_cd_23f', amountPerShare: 5, exDate: '2023-05-22', recordDate: '2023-05-24', paymentDate: '2023-07-20', fiscalYear: 2022, status: 'paid' },
    ],
    bonusShares: [],
    rightsIssues: [],
    yieldHistory: [
      { date: '2025-12-31', yield: 11.0 }, { date: '2024-12-31', yield: 10.8 },
      { date: '2023-12-31', yield: 10.2 },
    ],
  },
  FFC: {
    companyName: 'Fauji Fertilizer',
    sector: 'Fertilizer',
    cashDividends: [
      { id: 'ffc_cd_26i', amountPerShare: 10, exDate: '2026-07-01', recordDate: '2026-07-03', paymentDate: '2026-09-01', fiscalYear: 2025, status: 'upcoming' },
      { id: 'ffc_cd_25f', amountPerShare: 10, exDate: '2025-06-28', recordDate: '2025-06-30', paymentDate: '2025-08-28', fiscalYear: 2024, status: 'paid' },
      { id: 'ffc_cd_24f', amountPerShare: 9,  exDate: '2024-06-25', recordDate: '2024-06-27', paymentDate: '2024-08-25', fiscalYear: 2023, status: 'paid' },
      { id: 'ffc_cd_23f', amountPerShare: 8.5, exDate: '2023-06-22', recordDate: '2023-06-24', paymentDate: '2023-08-20', fiscalYear: 2022, status: 'paid' },
    ],
    bonusShares: [
      { id: 'ffc_b_19', ratio: '1:5', exDate: '2019-10-10', recordDate: '2019-10-12', creditDate: '2019-11-01', fiscalYear: 2019 },
    ],
    rightsIssues: [],
    yieldHistory: [
      { date: '2025-12-31', yield: 7.6 }, { date: '2024-12-31', yield: 7.4 },
      { date: '2023-12-31', yield: 7.0 },
    ],
  },
  PNSC: {
    companyName: 'Pakistan National Shipping',
    sector: 'Shipping',
    cashDividends: [
      { id: 'pnsc_cd_26i', amountPerShare: 10, exDate: '2026-09-01', recordDate: '2026-09-03', paymentDate: '2026-11-12', fiscalYear: 2025, status: 'upcoming' },
      { id: 'pnsc_cd_25f', amountPerShare: 10, exDate: '2025-08-28', recordDate: '2025-08-30', paymentDate: '2025-11-08', fiscalYear: 2024, status: 'paid' },
      { id: 'pnsc_cd_24f', amountPerShare: 9,  exDate: '2024-08-25', recordDate: '2024-08-27', paymentDate: '2024-11-05', fiscalYear: 2023, status: 'paid' },
    ],
    bonusShares: [],
    rightsIssues: [
      { id: 'pnsc_r_18', ratio: '1:4', issuePrice: 120, exDate: '2018-03-15', recordDate: '2018-03-17', subscriptionEnd: '2018-04-15', fiscalYear: 2018 },
    ],
    yieldHistory: [
      { date: '2025-12-31', yield: 7.8 }, { date: '2024-12-31', yield: 7.6 },
    ],
  },
  HUBC: {
    companyName: 'Hub Power Company',
    sector: 'Power',
    cashDividends: [
      { id: 'hubc_cd_26i', amountPerShare: 5, exDate: '2026-06-28', recordDate: '2026-06-30', paymentDate: '2026-08-28', fiscalYear: 2025, status: 'upcoming' },
      { id: 'hubc_cd_25f', amountPerShare: 5, exDate: '2025-06-25', recordDate: '2025-06-27', paymentDate: '2025-08-25', fiscalYear: 2024, status: 'paid' },
      { id: 'hubc_cd_24f', amountPerShare: 4.5, exDate: '2024-06-22', recordDate: '2024-06-24', paymentDate: '2024-08-22', fiscalYear: 2023, status: 'paid' },
    ],
    bonusShares: [],
    rightsIssues: [],
    yieldHistory: [
      { date: '2025-12-31', yield: 9.4 }, { date: '2024-12-31', yield: 9.2 },
    ],
  },
  LUCK: {
    companyName: 'Lucky Cement',
    sector: 'Cement',
    cashDividends: [
      { id: 'luck_cd_26i', amountPerShare: 4.5, exDate: '2026-07-20', recordDate: '2026-07-22', paymentDate: '2026-09-20', fiscalYear: 2025, status: 'upcoming' },
      { id: 'luck_cd_25f', amountPerShare: 4.5, exDate: '2025-07-18', recordDate: '2025-07-20', paymentDate: '2025-09-18', fiscalYear: 2024, status: 'paid' },
      { id: 'luck_cd_24f', amountPerShare: 4,   exDate: '2024-07-15', recordDate: '2024-07-17', paymentDate: '2024-09-15', fiscalYear: 2023, status: 'paid' },
      { id: 'luck_cd_23f', amountPerShare: 3.5, exDate: '2023-07-12', recordDate: '2023-07-14', paymentDate: '2023-09-10', fiscalYear: 2022, status: 'paid' },
    ],
    bonusShares: [],
    rightsIssues: [],
    yieldHistory: [
      { date: '2025-12-31', yield: 4.2 }, { date: '2024-12-31', yield: 4.1 },
      { date: '2023-12-31', yield: 3.8 },
    ],
  },
  PSO: {
    companyName: 'Pakistan State Oil',
    sector: 'Energy',
    cashDividends: [
      { id: 'pso_cd_26i', amountPerShare: 9, exDate: '2026-08-20', recordDate: '2026-08-22', paymentDate: '2026-10-20', fiscalYear: 2025, status: 'upcoming' },
      { id: 'pso_cd_25f', amountPerShare: 9, exDate: '2025-08-18', recordDate: '2025-08-20', paymentDate: '2025-10-18', fiscalYear: 2024, status: 'paid' },
      { id: 'pso_cd_24f', amountPerShare: 8, exDate: '2024-08-15', recordDate: '2024-08-17', paymentDate: '2024-10-15', fiscalYear: 2023, status: 'paid' },
    ],
    bonusShares: [],
    rightsIssues: [],
    yieldHistory: [
      { date: '2025-12-31', yield: 11.4 }, { date: '2024-12-31', yield: 11.2 },
    ],
  },
  EFERT: {
    companyName: 'Engro Fertilizers',
    sector: 'Fertilizer',
    cashDividends: [
      { id: 'efert_cd_26i', amountPerShare: 4, exDate: '2026-07-15', recordDate: '2026-07-17', paymentDate: '2026-09-15', fiscalYear: 2025, status: 'upcoming' },
      { id: 'efert_cd_25f', amountPerShare: 4, exDate: '2025-07-12', recordDate: '2025-07-14', paymentDate: '2025-09-12', fiscalYear: 2024, status: 'paid' },
      { id: 'efert_cd_24f', amountPerShare: 3.5, exDate: '2024-07-10', recordDate: '2024-07-12', paymentDate: '2024-09-08', fiscalYear: 2023, status: 'paid' },
    ],
    bonusShares: [],
    rightsIssues: [],
    yieldHistory: [
      { date: '2025-12-31', yield: 9.0 }, { date: '2024-12-31', yield: 8.8 },
    ],
  },
  MARI: {
    companyName: 'Mari Petroleum',
    sector: 'Oil & Gas',
    cashDividends: [
      { id: 'mari_cd_26i', amountPerShare: 8, exDate: '2026-05-25', recordDate: '2026-05-27', paymentDate: '2026-07-25', fiscalYear: 2025, status: 'upcoming' },
      { id: 'mari_cd_25f', amountPerShare: 8, exDate: '2025-05-22', recordDate: '2025-05-24', paymentDate: '2025-07-22', fiscalYear: 2024, status: 'paid' },
      { id: 'mari_cd_24f', amountPerShare: 7, exDate: '2024-05-20', recordDate: '2024-05-22', paymentDate: '2024-07-18', fiscalYear: 2023, status: 'paid' },
    ],
    bonusShares: [],
    rightsIssues: [],
    yieldHistory: [
      { date: '2025-12-31', yield: 6.0 }, { date: '2024-12-31', yield: 5.8 },
    ],
  },
  FFL: {
    companyName: 'Fauji Fertilizer Bin Qasim',
    sector: 'Fertilizer',
    cashDividends: [
      { id: 'ffl_cd_26i', amountPerShare: 0.4, exDate: '2026-06-08', recordDate: '2026-06-10', paymentDate: '2026-08-08', fiscalYear: 2025, status: 'upcoming' },
      { id: 'ffl_cd_25f', amountPerShare: 0.4, exDate: '2025-06-05', recordDate: '2025-06-07', paymentDate: '2025-08-05', fiscalYear: 2024, status: 'paid' },
      { id: 'ffl_cd_24f', amountPerShare: 0.35, exDate: '2024-06-02', recordDate: '2024-06-04', paymentDate: '2024-08-02', fiscalYear: 2023, status: 'paid' },
    ],
    bonusShares: [],
    rightsIssues: [],
    yieldHistory: [
      { date: '2025-12-31', yield: 10.0 }, { date: '2024-12-31', yield: 9.8 },
    ],
  },
  PICT: {
    companyName: 'Pakistan International Container Terminal',
    sector: 'Logistics',
    cashDividends: [
      { id: 'pict_cd_26i', amountPerShare: 0.8, exDate: '2026-08-05', recordDate: '2026-08-07', paymentDate: '2026-10-05', fiscalYear: 2025, status: 'upcoming' },
      { id: 'pict_cd_25f', amountPerShare: 0.8, exDate: '2025-08-02', recordDate: '2025-08-04', paymentDate: '2025-10-02', fiscalYear: 2024, status: 'paid' },
      { id: 'pict_cd_24f', amountPerShare: 0.7, exDate: '2024-07-30', recordDate: '2024-08-01', paymentDate: '2024-09-28', fiscalYear: 2023, status: 'paid' },
    ],
    bonusShares: [],
    rightsIssues: [],
    yieldHistory: [
      { date: '2025-12-31', yield: 7.0 }, { date: '2024-12-31', yield: 6.8 },
    ],
  },
  ATRL: {
    companyName: 'Attock Refinery',
    sector: 'Refinery',
    cashDividends: [
      { id: 'atrl_cd_26i', amountPerShare: 12, exDate: '2026-06-18', recordDate: '2026-06-20', paymentDate: '2026-08-18', fiscalYear: 2025, status: 'upcoming' },
      { id: 'atrl_cd_25f', amountPerShare: 12, exDate: '2025-06-15', recordDate: '2025-06-17', paymentDate: '2025-08-15', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 5.2 }],
  },
  TRG: {
    companyName: 'TRG Pakistan',
    sector: 'Technology',
    cashDividends: [
      { id: 'trg_cd_26i', amountPerShare: 0.5, exDate: '2026-08-10', recordDate: '2026-08-12', paymentDate: '2026-10-10', fiscalYear: 2025, status: 'upcoming' },
      { id: 'trg_cd_25f', amountPerShare: 0.5, exDate: '2025-08-08', recordDate: '2025-08-10', paymentDate: '2025-10-08', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 2.8 }],
  },
  HINO: {
    companyName: 'Hinopak Motors',
    sector: 'Automobile',
    cashDividends: [
      { id: 'hino_cd_26i', amountPerShare: 2, exDate: '2026-07-08', recordDate: '2026-07-10', paymentDate: '2026-09-08', fiscalYear: 2025, status: 'upcoming' },
      { id: 'hino_cd_25f', amountPerShare: 2, exDate: '2025-07-05', recordDate: '2025-07-07', paymentDate: '2025-09-05', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 3.1 }],
  },
  SLGL: {
    companyName: 'Security Leasing',
    sector: 'Leasing',
    cashDividends: [
      { id: 'slgl_cd_26i', amountPerShare: 0.3, exDate: '2026-09-15', recordDate: '2026-09-17', paymentDate: '2026-11-15', fiscalYear: 2025, status: 'upcoming' },
      { id: 'slgl_cd_25f', amountPerShare: 0.3, exDate: '2025-09-12', recordDate: '2025-09-14', paymentDate: '2025-11-12', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 8.5 }],
  },
  DGKC: {
    companyName: 'DG Khan Cement',
    sector: 'Cement',
    cashDividends: [
      { id: 'dgkc_cd_26i', amountPerShare: 2, exDate: '2026-07-25', recordDate: '2026-07-27', paymentDate: '2026-09-25', fiscalYear: 2025, status: 'upcoming' },
      { id: 'dgkc_cd_25f', amountPerShare: 2, exDate: '2025-07-22', recordDate: '2025-07-24', paymentDate: '2025-09-22', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 3.5 }],
  },
  ENGROH: {
    companyName: 'Engro Holdings',
    sector: 'Conglomerate',
    cashDividends: [
      { id: 'engroh_cd_26i', amountPerShare: 1.5, exDate: '2026-08-01', recordDate: '2026-08-03', paymentDate: '2026-10-01', fiscalYear: 2025, status: 'upcoming' },
      { id: 'engroh_cd_25f', amountPerShare: 1.5, exDate: '2025-07-28', recordDate: '2025-07-30', paymentDate: '2025-09-28', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 2.1 }],
  },
  FATIMA: {
    companyName: 'Fatima Fertilizer',
    sector: 'Fertilizer',
    cashDividends: [
      { id: 'fatima_cd_26i', amountPerShare: 2.5, exDate: '2026-06-22', recordDate: '2026-06-24', paymentDate: '2026-08-22', fiscalYear: 2025, status: 'upcoming' },
      { id: 'fatima_cd_25f', amountPerShare: 2.5, exDate: '2025-06-20', recordDate: '2025-06-22', paymentDate: '2025-08-20', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 4.8 }],
  },
  MLCF: {
    companyName: 'Maple Leaf Cement',
    sector: 'Cement',
    cashDividends: [
      { id: 'mlcf_cd_26i', amountPerShare: 0.5, exDate: '2026-08-18', recordDate: '2026-08-20', paymentDate: '2026-10-18', fiscalYear: 2025, status: 'upcoming' },
      { id: 'mlcf_cd_25f', amountPerShare: 0.5, exDate: '2025-08-15', recordDate: '2025-08-17', paymentDate: '2025-10-15', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 2.2 }],
  },
  NML: {
    companyName: 'Nishat Mills',
    sector: 'Textile',
    cashDividends: [
      { id: 'nml_cd_26i', amountPerShare: 1, exDate: '2026-09-05', recordDate: '2026-09-07', paymentDate: '2026-11-05', fiscalYear: 2025, status: 'upcoming' },
      { id: 'nml_cd_25f', amountPerShare: 1, exDate: '2025-09-02', recordDate: '2025-09-04', paymentDate: '2025-11-02', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 3.0 }],
  },
  NRL: {
    companyName: 'National Refinery',
    sector: 'Refinery',
    cashDividends: [
      { id: 'nrl_cd_26i', amountPerShare: 3, exDate: '2026-07-12', recordDate: '2026-07-14', paymentDate: '2026-09-12', fiscalYear: 2025, status: 'upcoming' },
      { id: 'nrl_cd_25f', amountPerShare: 3, exDate: '2025-07-10', recordDate: '2025-07-12', paymentDate: '2025-09-10', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 4.5 }],
  },
  PAEL: {
    companyName: 'Pak Elektron',
    sector: 'Consumer',
    cashDividends: [
      { id: 'pael_cd_26i', amountPerShare: 0.25, exDate: '2026-10-01', recordDate: '2026-10-03', paymentDate: '2026-12-01', fiscalYear: 2025, status: 'upcoming' },
      { id: 'pael_cd_25f', amountPerShare: 0.25, exDate: '2025-09-28', recordDate: '2025-09-30', paymentDate: '2025-11-28', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 1.8 }],
  },
  PTC: {
    companyName: 'Pakistan Telecommunication',
    sector: 'Telecom',
    cashDividends: [
      { id: 'ptc_cd_26i', amountPerShare: 0.5, exDate: '2026-08-22', recordDate: '2026-08-24', paymentDate: '2026-10-22', fiscalYear: 2025, status: 'upcoming' },
      { id: 'ptc_cd_25f', amountPerShare: 0.5, exDate: '2025-08-20', recordDate: '2025-08-22', paymentDate: '2025-10-20', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 2.5 }],
  },
  SEARL: {
    companyName: 'The Searle Company',
    sector: 'Pharma',
    cashDividends: [
      { id: 'searl_cd_26i', amountPerShare: 0.4, exDate: '2026-09-20', recordDate: '2026-09-22', paymentDate: '2026-11-20', fiscalYear: 2025, status: 'upcoming' },
      { id: 'searl_cd_25f', amountPerShare: 0.4, exDate: '2025-09-18', recordDate: '2025-09-20', paymentDate: '2025-11-18', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 1.2 }],
  },
  SSGC: {
    companyName: 'Sui Southern Gas',
    sector: 'Gas',
    cashDividends: [
      { id: 'ssgc_cd_26i', amountPerShare: 0.5, exDate: '2026-07-28', recordDate: '2026-07-30', paymentDate: '2026-09-28', fiscalYear: 2025, status: 'upcoming' },
      { id: 'ssgc_cd_25f', amountPerShare: 0.5, exDate: '2025-07-25', recordDate: '2025-07-27', paymentDate: '2025-09-25', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 4.0 }],
  },
  TREET: {
    companyName: 'Treet Corporation',
    sector: 'Consumer',
    cashDividends: [
      { id: 'treet_cd_26i', amountPerShare: 0.15, exDate: '2026-10-10', recordDate: '2026-10-12', paymentDate: '2026-12-10', fiscalYear: 2025, status: 'upcoming' },
      { id: 'treet_cd_25f', amountPerShare: 0.15, exDate: '2025-10-08', recordDate: '2025-10-10', paymentDate: '2025-12-08', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 1.5 }],
  },
  CPHL: {
    companyName: 'Citi Pharma',
    sector: 'Pharma',
    cashDividends: [
      { id: 'cphl_cd_26i', amountPerShare: 0.2, exDate: '2026-09-12', recordDate: '2026-09-14', paymentDate: '2026-11-12', fiscalYear: 2025, status: 'upcoming' },
      { id: 'cphl_cd_25f', amountPerShare: 0.2, exDate: '2025-09-10', recordDate: '2025-09-12', paymentDate: '2025-11-10', fiscalYear: 2024, status: 'paid' },
    ],
    bonusShares: [], rightsIssues: [],
    yieldHistory: [{ date: '2025-12-31', yield: 1.0 }],
  },
};

window.DIVIDEND_DATA = DIVIDEND_DATA;

;/* === js/data/commodities.js === */
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

;/* === js/data/psx-stocks.js === */
'use strict';
/** PSX catalog — hydrated from worker snapshot meta:psx_catalog */
window.PSX_STOCKS_CATALOG = window.PSX_STOCKS_CATALOG || [];

window.PsxStocksCatalog = (() => {
  const LS_KEY = 'lc_psx_catalog_v1';

  function _seedFromHoldings() {
    const seen = new Set();
    const rows = [];
    [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].forEach((s) => {
      if (seen.has(s.symbol)) return;
      seen.add(s.symbol);
      rows.push({
        symbol: s.symbol,
        name: s.name || s.symbol,
        sector: s.sector || 'Other',
        isShariah: !!s.isShariah,
      });
    });
    return rows;
  }

  function hydrate(catalog) {
    if (!Array.isArray(catalog) || !catalog.length) return;
    window.PSX_STOCKS_CATALOG = catalog;
    try { localStorage.setItem(LS_KEY, JSON.stringify({ catalog, ts: Date.now() })); } catch (_) {}
  }

  function loadLocal() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return _seedFromHoldings();
      const j = JSON.parse(raw);
      if (j?.catalog?.length) return j.catalog;
    } catch (_) {}
    return _seedFromHoldings();
  }

  function rows() {
    const cat = window.PSX_STOCKS_CATALOG?.length ? window.PSX_STOCKS_CATALOG : loadLocal();
    if (!window.PSX_STOCKS_CATALOG?.length) window.PSX_STOCKS_CATALOG = cat;
    return cat;
  }

  return { hydrate, loadLocal, rows };
})();

;/* === js/data/config.js === */
'use strict';
/** Bump app + sw + cache together (also sync VERSION.json). */
window.LEDGERCAP_VERSION = {
  app: '3.56.0',
  sw: 133,
  cache: 'ledgercap-v133',
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
    nav: { hub: 'Hub', watch: 'Watch', funds: 'Funds', pnl: 'P&L', market: 'Market', portfolio: 'Portfolio', analyze: 'Analyze', more: 'More' },
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
    nav: { hub: 'ہب', watch: 'واچ', funds: 'فنڈز', pnl: 'P&L', market: 'مارکیٹ', portfolio: 'پورٹ فولیو', analyze: 'تجزیہ', more: 'مزید' },
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
    nav: { hub: 'Hub', watch: 'Watch', funds: 'Funds', pnl: 'P&L', market: 'Market', portfolio: 'Portfolio', analyze: 'Tajzia', more: 'Mazeed' },
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
    const splashTitle = document.querySelector('.splash-title');
    if (splashTitle) splashTitle.textContent = t('appName');
    const splashSub = document.querySelector('.splash-sub');
    if (splashSub) splashSub.textContent = t('tagline');
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
  const PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?url=',
  ];

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
      console.warn('LedgerCap: PSX proxy flaky — retrying; public fallbacks disabled for PSX.');
      _proxyWarned = true;
      if (typeof App !== 'undefined' && App.showToast) {
        App.showToast('Live PSX feed slow — using cached prices where needed', 'warning');
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
    if (t.startsWith('{') && t.includes('"error"')) return true;
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
      if (closes.length < 2) {
        data = await _fetchPublicProxy(`https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahoo)}?interval=1d&range=3mo`);
        closes = _yahooCloses(data);
      }
      if (closes.length >= 2) return closes.slice(-points);
    }
    const raw = await _fetchRaw(`https://dps.psx.com.pk/timeseries/eod/${sym}`);
    const rows = Array.isArray(raw) ? raw : (raw?.data || []);
    if (!Array.isArray(rows) || rows.length < 2) return [];
    const sorted = [...rows].sort((a, b) => (Number(a[0]) || 0) - (Number(b[0]) || 0));
    return sorted.slice(-points).map(r => parseFloat(r[1])).filter(n => n > 0);
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
          const noRetry = [429, 502, 503, 520, 522, 524].includes(res.status);
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

  /** Public CORS proxies — Yahoo only. PSX via allorigins/corsproxy is rate-limited and noisy. */
  async function _fetchPublicProxy(url) {
    if (/dps\.psx\.com\.pk/i.test(url)) return null;
    for (const proxyUrl of PROXIES) {
      try {
        const res = await fetch(proxyUrl + encodeURIComponent(url), {
          headers: { Accept: 'application/json,text/plain,*/*' }
        });
        if (!res.ok) continue;
        const text = await res.text();
        if (_isBadPayload(text)) continue;
        let payload = text;
        try {
          const j = JSON.parse(text);
          if (j && j.contents !== undefined) payload = j.contents;
          else if (j && typeof j === 'object' && !Array.isArray(j)) return j;
        } catch {}
        if (typeof payload === 'string') {
          const parsed = _parseJson(payload);
          if (parsed) return parsed;
          continue;
        }
        return payload;
      } catch {}
    }
    return null;
  }

  async function _fetchRaw(url) {
    const appProxy = await _fetchAppProxy(url);
    if (appProxy) return appProxy;
    return _fetchPublicProxy(url);
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
    let data = await _fetchWorkerPath(`yahoo/chart/${encodeURIComponent(yahoo)}`);
    let parsed = _parseYahooChart(data, symbol, 'yahoo_intl');
    if (!parsed) {
      data = await _fetchPublicProxy(`https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahoo)}?interval=1d&range=5d`);
      parsed = _parseYahooChart(data, symbol, 'yahoo_intl');
    }
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

    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${yahooSym}?interval=1d&range=5d`;
    const data = await _fetchPublicProxy(url);
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
    const psxIdx = await _fetchRaw('https://dps.psx.com.pk/timeseries/eod/KSE100');
    const parsed = _parseTimeseries(psxIdx, 'psx_eod');
    if (parsed) {
      const change = parsed.price - parsed.prevClose;
      const changeP = parsed.prevClose ? (change / parsed.prevClose) * 100 : 0;
      return { value: parsed.price, change, changeP, prevClose: parsed.prevClose, ts: Date.now() };
    }
    const yahoo = await _fetchPublicProxy('https://query2.finance.yahoo.com/v8/finance/chart/%5EKSE100?interval=1d&range=1d');
    const meta = yahoo?.chart?.result?.[0]?.meta;
    if (meta?.regularMarketPrice) {
      return {
        value: meta.regularMarketPrice,
        change: meta.regularMarketChange || 0,
        changeP: meta.regularMarketChangePercent || 0,
        prevClose: meta.previousClose || meta.chartPreviousClose,
        ts: Date.now()
      };
    }
    return null;
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
      results.push({ icon: '⚠️', color: '#F0B90B', text: 'Salary received this month but no investments logged yet. Consider contributing now.', priority: 1 });
    }

    // 2. Contribution streak
    let streak = 0;
    for (let i = 0; i < 12; i++) {
      const m = new Date(now.getFullYear(), now.getMonth() - i, 1).toISOString().slice(0, 7);
      if (monthlyContrib[m] > 0) streak++; else break;
    }
    if (streak >= 3) {
      results.push({ icon: '🔥', color: '#FF6B35', text: `${streak}-month investment streak! Consistency is the most powerful wealth-building tool.`, priority: 3 });
    }

    // 3. Concentration risk
    const stockValues = holdings.map(h => ({ symbol: h.symbol, value: h.shares * (prices[h.symbol]?.price || 0) }));
    const totalStockVal = stockValues.reduce((a, s) => a + s.value, 0);
    const topHolding = stockValues.slice().sort((a, b) => b.value - a.value)[0];
    if (topHolding && totalStockVal > 0) {
      const pct = (topHolding.value / totalStockVal) * 100;
      if (pct > 25) {
        results.push({ icon: '📊', color: '#F6465D', text: `${topHolding.symbol} represents ${pct.toFixed(0)}% of your stock portfolio. High concentration — consider diversifying.`, priority: 2 });
      }
    }

    // 4. MIIF buffer suggestion
    const miifFunds = funds.filter(f => f.symbol === 'MIIF-B' || f.symbol === 'MIIF-MMKA');
    const miifVal = miifFunds.reduce((a, f) => {
      const nav = prices[f.symbol]?.price || 55.98;
      return a + f.units * nav;
    }, 0);
    if (miifVal > 200000) {
      results.push({ icon: '💡', color: '#1890FF', text: `MIIF buffer is ₨${Math.round(miifVal / 1000)}k. Consider converting ₨200k to KMIF for higher long-term returns.`, priority: 2 });
    }

    // 5. MEBL underweight
    const meblHolding = holdings.find(h => h.symbol === 'MEBL');
    const meblVal = meblHolding ? meblHolding.shares * (prices['MEBL']?.price || 489) : 0;
    if (meblVal < 100000) {
      results.push({ icon: '🏦', color: '#0ECB81', text: 'MEBL is your highest-conviction stock but position is small. Advisor recommends building to ₨200k+.', priority: 2 });
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
        results.push({ icon: '⭐', color: '#0ECB81', text: `Investment rate is ${rate.toFixed(0)}% of income over 6 months. Excellent financial discipline.`, priority: 3 });
      } else if (rate < 15 && rate > 0) {
        results.push({ icon: '📉', color: '#F0B90B', text: `Investment rate is only ${rate.toFixed(0)}% of income. Target 30%+ for meaningful wealth building.`, priority: 2 });
      }
    }

    // 7. Portfolio all-time high
    const history = state.priceHistory || [];
    if (history.length > 5) {
      const current = history[history.length - 1]?.value || 0;
      const prevMax = Math.max(...history.slice(0, -1).map(h => h.value));
      if (current > prevMax && prevMax > 0) {
        results.push({ icon: '🏆', color: '#0ECB81', text: 'New portfolio all-time high! Your wealth is at its peak value.', priority: 1 });
      }
    }

    return results.sort((a, b) => a.priority - b.priority).slice(0, 5);
  }

  return { generate };
})();
window.Insights = Insights;

;/* === js/engines/projections.js === */
'use strict';
const Projections = (() => {

  function project(currentValue, monthlySIP, years, annualReturn) {
    annualReturn = annualReturn || 0.18;
    const monthlyRate = annualReturn / 12;
    const months = years * 12;
    const futurePortfolio = currentValue * Math.pow(1 + annualReturn, years);
    const futureSIP = monthlySIP > 0
      ? monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      : 0;
    return {
      total: Math.round(futurePortfolio + futureSIP),
      fromPortfolio: Math.round(futurePortfolio),
      fromSIP: Math.round(futureSIP),
      years,
      annualReturn,
      monthlySIP,
    };
  }

  function financialFreedom(targetMonthly, safeWithdrawalRate) {
    safeWithdrawalRate = safeWithdrawalRate || 0.04;
    return Math.round((targetMonthly * 12) / safeWithdrawalRate);
  }

  function yearsToFreedom(currentValue, monthlySIP, targetCorpus, annualReturn) {
    annualReturn = annualReturn || 0.18;
    const monthlyRate = annualReturn / 12;
    let val = currentValue;
    for (let m = 0; m <= 600; m++) {
      if (val >= targetCorpus) return Math.ceil(m / 12);
      val = val * (1 + monthlyRate) + monthlySIP;
    }
    return 50;
  }

  function realReturn(nominalReturn, inflation) {
    inflation = inflation || 0.20;
    return ((1 + nominalReturn) / (1 + inflation)) - 1;
  }

  return { project, financialFreedom, yearsToFreedom, realReturn };
})();
window.Projections = Projections;

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
      insights: Insights.generate(state),
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

;/* === js/engines/ai-analysis.js === */
'use strict';
const AIAnalysis = (() => {

  function _isGlobal(symbol) {
    return (window.INTL_STOCKS || []).some(s => s.symbol === symbol)
      || (window.CRYPTO_ASSETS || []).some(c => c.symbol === symbol);
  }

  function _ratingToAction(rating) {
    const r = (rating || '').toUpperCase();
    if (r.includes('STRONG BUY') || r === 'BUY') return 'BUY';
    if (r.includes('SELL')) return 'SELL';
    return 'HOLD';
  }

  function analyze(symbol) {
    const advisor = (window.ADVISOR_RATINGS || {})[symbol];
    const f = (window.FUNDAMENTALS_DB || {})[symbol];
    const fundA = (window.FUND_ANALYTICS_DB || {})[symbol];
    const quote = MarketDataService.getQuote(symbol);
    const isGlobal = _isGlobal(symbol);
    const priceUsd = quote.priceUsd || (isGlobal && typeof FxService !== 'undefined' ? FxService.pkrToUsd(quote.price) : null);
    const price = isGlobal ? (priceUsd || quote.price) : quote.price;

    if (fundA) {
      const action = fundA.oneYearReturn > 15 ? 'BUY' : fundA.oneYearReturn > 8 ? 'HOLD' : 'HOLD';
      const confidence = Math.min(95, Math.round(50 + fundA.sharpe * 20));
      const fairValue = price * (1 + (fundA.oneYearReturn - 10) / 100);
      return {
        action, confidence, fairValue: Math.round(fairValue * 100) / 100,
        currency: 'PKR',
        riskScore: Math.round((fundA.beta || 0.5) * 40),
        bull: Math.round(price * 1.15 * 100) / 100,
        base: Math.round(price * 1.06 * 100) / 100,
        bear: Math.round(price * 0.88 * 100) / 100,
        summary: `${symbol} fund: ${fundA.category} category, ${fundA.oneYearReturn}% 1Y return, ${fundA.divYield}% yield. ${action} with ${confidence}% confidence.`,
      };
    }

    let action = advisor ? _ratingToAction(advisor.rating) : 'HOLD';
    let confidence = advisor?.conviction ? advisor.conviction * 10 : 50;

    if (f) {
      if (f.profitGrowth > 15 && f.pe < 12) { action = 'BUY'; confidence = Math.max(confidence, 72); }
      if (f.debtToEquity > 1 || f.profitGrowth < -5) { action = action === 'BUY' ? 'HOLD' : action; confidence = Math.min(confidence, 45); }
      if (f.divYield > 8 && f.payout < 80) confidence = Math.min(95, confidence + 8);
    }

    const fairFromPe = f?.eps && f?.pe ? f.eps * (f.pe < 10 ? f.pe * 1.15 : f.pe * 0.92) : null;
    const fairFromAdvisor = advisor?.target;
    const fairValue = Math.round((fairFromAdvisor || fairFromPe || price * 1.08) * 100) / 100;

    let riskScore = 40;
    if (f) {
      if (f.debtToEquity > 0.8) riskScore += 22;
      else if (f.debtToEquity > 0.4) riskScore += 10;
      if (f.profitGrowth < 0) riskScore += 15;
      if (f.pe > 20) riskScore += 8;
      if (f.divYield > 6) riskScore -= 8;
    }
    riskScore = Math.min(100, Math.max(0, riskScore));

    const bull = advisor?.target ? advisor.target * 1.1 : (fairValue * 1.2);
    const base = fairValue;
    const bear = price * 0.75;

    const parts = [];
    parts.push(`${symbol}: ${action} (${confidence}% confidence).`);
    if (f) parts.push(`P/E ${f.pe}, yield ${f.divYield}%, profit growth ${f.profitGrowth}%.`);
    if (advisor?.thesis) parts.push(advisor.thesis.slice(0, 120));
    else if (isGlobal) {
      parts.push(`Fair value est. $${fairValue.toFixed(2)} vs current $${Number(price).toFixed(2)}.`);
    } else if (f) {
      parts.push(`Fair value est. ₨${fairValue.toLocaleString()} vs current ₨${price.toLocaleString()}.`);
    }

    return {
      action, confidence, fairValue, currency: isGlobal ? 'USD' : 'PKR',
      riskScore,
      upside: price > 0 ? ((fairValue - price) / price) * 100 : 0,
      bull: Math.round(bull * 100) / 100,
      base: Math.round(base * 100) / 100,
      bear: Math.round(bear * 100) / 100,
      summary: parts.join(' '),
      rating: advisor?.rating || action,
    };
  }

  return { analyze };
})();
window.AIAnalysis = AIAnalysis;

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

;/* === js/services/corporate-actions-service.js === */
'use strict';
const CorporateActionsService = (() => {
  let _adapter = null;

  function setAdapter(adapter) {
    _adapter = adapter;
  }

  function _data(symbol) {
    if (_adapter?.getSymbolData) return _adapter.getSymbolData(symbol);
    return (window.DIVIDEND_DATA || {})[symbol] || null;
  }

  function _companyName(symbol, data) {
    if (data?.companyName) return data.companyName;
    const meta = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === symbol);
    return meta?.name || symbol;
  }

  function _sector(symbol, data) {
    if (data?.sector) return data.sector;
    const meta = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === symbol);
    return meta?.sector || 'Other';
  }

  function getSymbolProfile(symbol) {
    const data = _data(symbol);
    return {
      symbol,
      companyName: _companyName(symbol, data),
      sector: _sector(symbol, data),
      hasData: !!data,
    };
  }

  function getCashDividends(symbol) {
    const data = _data(symbol);
    if (!data) return [];
    return (data.cashDividends || []).map(d => ({
      ...d,
      symbol,
      type: 'cash',
      companyName: data.companyName,
    })).sort((a, b) => (b.paymentDate || '').localeCompare(a.paymentDate || ''));
  }

  function getBonusShares(symbol) {
    const data = _data(symbol);
    if (!data) return [];
    return (data.bonusShares || []).map(b => ({
      ...b, symbol, type: 'bonus', companyName: data.companyName,
    })).sort((a, b) => (b.creditDate || '').localeCompare(a.creditDate || ''));
  }

  function getRightsIssues(symbol) {
    const data = _data(symbol);
    if (!data) return [];
    return (data.rightsIssues || []).map(r => ({
      ...r, symbol, type: 'rights', companyName: data.companyName,
    })).sort((a, b) => (b.exDate || '').localeCompare(a.exDate || ''));
  }

  function getYieldHistory(symbol) {
    const data = _data(symbol);
    return (data?.yieldHistory || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  function getAllActions(symbol) {
    return {
      cash: getCashDividends(symbol),
      bonus: getBonusShares(symbol),
      rights: getRightsIssues(symbol),
      yieldHistory: getYieldHistory(symbol),
    };
  }

  function getUpcomingCash(symbol) {
    return getCashDividends(symbol).filter(d => d.status === 'upcoming');
  }

  function getPaidCash(symbol) {
    return getCashDividends(symbol).filter(d => d.status === 'paid');
  }

  function listSymbolsWithData() {
    if (_adapter?.listSymbols) return _adapter.listSymbols();
    return Object.keys(window.DIVIDEND_DATA || {});
  }

  function getAllUpcoming() {
    const symbols = listSymbolsWithData();
    const items = [];
    symbols.forEach(sym => {
      getUpcomingCash(sym).forEach(d => items.push({ ...d, sector: _sector(sym, _data(sym)) }));
    });
    return items.sort((a, b) => (a.paymentDate || '').localeCompare(b.paymentDate || ''));
  }

  return {
    setAdapter, getSymbolProfile, getCashDividends, getBonusShares, getRightsIssues,
    getYieldHistory, getAllActions, getUpcomingCash, getPaidCash,
    listSymbolsWithData, getAllUpcoming,
  };
})();
window.CorporateActionsService = CorporateActionsService;

;/* === js/services/market-watch-service.js === */
'use strict';
/** PSX market-watch + trading-board parse (Investify-style bid/offer). */
const MarketWatchService = (() => {
  const CACHE_MS = 90000;
  const _cache = new Map();

  function _num(s) {
    if (s == null) return 0;
    const n = parseFloat(String(s).replace(/,/g, ''));
    return Number.isFinite(n) ? n : 0;
  }

  function _parseTradingRow(html, symbol) {
    const sym = (symbol || '').toUpperCase();
    const re = new RegExp(
      `<tr>[\\s\\S]*?data-search="${sym}"[\\s\\S]*?<\\/tr>`,
      'i'
    );
    const row = html.match(re)?.[0];
    if (!row) return null;
    const tds = [...row.matchAll(/<td[^>]*data-order="([^"]*)"[^>]*>([\s\S]*?)<\/td>/gi)];
    if (tds.length < 9) {
      const rights = [...row.matchAll(/class="right"[^>]*data-order="([^"]*)"[^>]*>([^<]*)/gi)];
      if (rights.length < 7) return null;
      const [, bidVol, bidPrice, askVol, askPrice, ldcp, , volume] = rights.map(m => m[1]);
      return {
        symbol: sym,
        bidVol: _num(bidVol),
        bidPrice: _num(bidPrice),
        askVol: _num(askVol),
        askPrice: _num(askPrice),
        ldcp: _num(ldcp),
        volume: _num(volume),
        spread: _num(askPrice) - _num(bidPrice),
      };
    }
    const bidVol = _num(tds[2]?.[1]);
    const bidPrice = _num(tds[3]?.[1]);
    const askVol = _num(tds[4]?.[1]);
    const askPrice = _num(tds[5]?.[1]);
    const ldcp = _num(tds[6]?.[1]);
    const volume = _num(tds[8]?.[1]);
    return {
      symbol: sym,
      bidVol,
      bidPrice,
      askVol,
      askPrice,
      ldcp,
      volume,
      spread: askPrice > 0 && bidPrice > 0 ? askPrice - bidPrice : 0,
    };
  }

  function _parseMarketRow(html, symbol) {
    const sym = (symbol || '').toUpperCase();
    const re = new RegExp(
      `<tr>[\\s\\S]*?<strong>${sym}<\\/strong>[\\s\\S]*?<\\/tr>`,
      'i'
    );
    const row = html.match(re)?.[0];
    if (!row) return null;
    const orders = [...row.matchAll(/class="right"[^>]*data-order="([^"]*)"/gi)].map(m => _num(m[1]));
    if (orders.length < 8) return null;
    const [ldcp, open, high, low, close, change, changePct, volume] = orders;
    return { symbol: sym, ldcp, open, high, low, close, change, changePct, volume };
  }

  async function _fetchHtml(path) {
    const clean = path.replace(/^\//, '');
    const bases = [...(window.LedgerCapConfig?.psxProxyBases?.() || [])];
    const fromState = (typeof State !== 'undefined' && State.get('settings')?.psxProxyUrl) || '';
    if (fromState && window.LedgerCapConfig?.resolvePsxProxyUrl) {
      const resolved = window.LedgerCapConfig.resolvePsxProxyUrl(fromState);
      if (resolved && !bases.includes(resolved)) bases.unshift(resolved);
    }
    if (!bases.length) {
      bases.push('https://ledgercap-psx-proxy.shamikhahmed.workers.dev');
    }
    for (const base of bases) {
      try {
        const res = await fetch(`${base.replace(/\/$/, '')}/${clean}`, { headers: { Accept: 'text/html,*/*' } });
        if (!res.ok) continue;
        const text = await res.text();
        if (text && text.includes('<')) return text;
      } catch (_) {}
    }
    return null;
  }

  async function getOrderBook(symbol) {
    const sym = (symbol || '').toUpperCase();
    if (!sym) return null;
    const hit = _cache.get(`ob:${sym}`);
    if (hit && Date.now() - hit.ts < CACHE_MS) return hit.data;

    let html = await _fetchHtml('trading-board/REG/main');
    if (typeof html !== 'string') html = '';
    let data = _parseTradingRow(html, sym);

    if (!data) {
      const mw = await _fetchHtml('market-watch');
      if (typeof mw === 'string') {
        const row = _parseMarketRow(mw, sym);
        if (row) {
          data = {
            symbol: sym,
            bidVol: 0,
            bidPrice: row.close || row.ldcp,
            askVol: 0,
            askPrice: row.close || row.ldcp,
            ldcp: row.ldcp,
            volume: row.volume,
            open: row.open,
            high: row.high,
            low: row.low,
            change: row.change,
            changePct: row.changePct,
            spread: 0,
            fallback: true,
          };
        }
      }
    }

    if (data) _cache.set(`ob:${sym}`, { ts: Date.now(), data });
    return data;
  }

  function panelHtml(data) {
    if (!data) {
      return `<div class="lc-orderbook lc-orderbook--empty"><p class="psx-muted">Order book unavailable — market closed or PSX feed slow.</p></div>`;
    }
    const fmt = n => Number(n || 0).toLocaleString('en-PK', { maximumFractionDigits: 2 });
    const spread = data.spread > 0 ? fmt(data.spread) : '—';
    const note = data.fallback ? '<p class="lc-card-sub">Last trade — full bid/offer when PSX session open.</p>' : '';
    return `<div class="lc-orderbook">
      <div class="lc-orderbook-grid">
        <div class="lc-orderbook-side lc-orderbook-side--bid">
          <span class="lc-orderbook-label">Bid</span>
          <strong>${fmt(data.bidPrice)}</strong>
          <em>${fmt(data.bidVol)} vol</em>
        </div>
        <div class="lc-orderbook-mid">
          <span>Spread</span>
          <strong>${spread}</strong>
          <em>Vol ${fmt(data.volume)}</em>
        </div>
        <div class="lc-orderbook-side lc-orderbook-side--ask">
          <span class="lc-orderbook-label">Offer</span>
          <strong>${fmt(data.askPrice)}</strong>
          <em>${fmt(data.askVol)} vol</em>
        </div>
      </div>
      ${data.high ? `<div class="lc-orderbook-ohlc">
        <span>O ${fmt(data.open)}</span><span>H ${fmt(data.high)}</span><span>L ${fmt(data.low)}</span><span>LDCP ${fmt(data.ldcp)}</span>
      </div>` : ''}
      ${note}
    </div>`;
  }

  return { getOrderBook, panelHtml, _parseTradingRow };
})();
window.MarketWatchService = MarketWatchService;

;/* === js/services/commodities-service.js === */
'use strict';
const CommoditiesService = (() => {
  const CACHE_MS = 300000;
  const TROY_OZ_GRAMS = 31.1034768;
  let _cache = { ts: 0, rows: [] };

  function _fromSnapshot(snapId) {
    const snap = window._LC_CMD_SNAPSHOT || {};
    const q = snap[snapId];
    if (!q?.price) return null;
    return {
      price: q.price,
      changePct: q.changePct || 0,
      label: q.source === 'OGRA-fallback' ? `OGRA fallback · ${q.asOf || ''}` : (q.quoteKind === 'derived' ? 'Spot-derived' : 'Worker snapshot'),
      asOf: q.asOf,
      manual: q.quoteKind === 'ogra' && q.source === 'OGRA-fallback',
    };
  }

  async function _yahooQuote(yahoo) {
    let data = null;
    if (typeof Prices !== 'undefined' && Prices.fetchPriceSeries) {
      const bases = window.LedgerCapConfig?.psxProxyBases?.() || [];
      for (const base of bases) {
        try {
          const res = await fetch(`${base.replace(/\/$/, '')}/yahoo/chart/${encodeURIComponent(yahoo)}`, { headers: { Accept: 'application/json' } });
          if (res.ok) { data = await res.json(); break; }
        } catch (_) {}
      }
    }
    if (!data) {
      data = await fetch(`https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahoo)}?interval=1d&range=5d`)
        .then(r => r.ok ? r.json() : null).catch(() => null);
    }
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta?.regularMarketPrice) return null;
    const prev = meta.chartPreviousClose || meta.previousClose || meta.regularMarketPrice;
    const chg = meta.regularMarketPrice - prev;
    const chgPct = prev ? (chg / prev) * 100 : 0;
    return {
      price: meta.regularMarketPrice,
      prevClose: prev,
      change: chg,
      changePct: chgPct,
      currency: meta.currency || 'USD',
      ts: Date.now(),
      label: 'Yahoo spot',
    };
  }

  async function _pkrGoldFromSpot() {
    const snap = _fromSnapshot('GOLD_24K_PKR');
    if (snap) return { ...snap, pkr: snap.price, label: snap.label || 'Snapshot 24k' };
    const q = await _yahooQuote('GC=F');
    if (!q?.price) return null;
    const usd = typeof FxService !== 'undefined' ? FxService.getUsdRate() : 280;
    const pkrPerGram = Math.round((q.price * usd) / TROY_OZ_GRAMS);
    if (pkrPerGram > 0 && typeof State !== 'undefined') {
      State.update((s) => {
        s.settings.goldPricePerGram = pkrPerGram;
        s.settings.goldPriceSource = 'Yahoo GC=F';
        s.settings.goldPriceUpdatedAt = new Date().toISOString();
      });
    }
    return { price: pkrPerGram, changePct: q.changePct || 0, pkr: pkrPerGram, label: 'Yahoo GC=F · auto' };
  }

  async function fetchAll() {
    if (_cache.rows.length && Date.now() - _cache.ts < CACHE_MS) return _cache.rows;
    if (typeof PriceSnapshotService !== 'undefined' && PriceSnapshotService.enabled()) {
      await PriceSnapshotService.refresh('commodities').catch(() => {});
    }
    if (typeof FxService !== 'undefined') await FxService.refreshUsdPkr().catch(() => {});
    const settings = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    const goldAuto = await _pkrGoldFromSpot();
    const usd = typeof FxService !== 'undefined' ? FxService.getUsdRate() : 280;
    const rows = [];

    for (const c of window.COMMODITY_ASSETS || []) {
      if (c.id === 'pkr_gold') {
        const g = goldAuto || { price: settings.goldPricePerGram || 18000, changePct: 0 };
        rows.push({
          ...c,
          price: g.price,
          changePct: g.changePct || 0,
          pkr: g.price,
          label: g.label || 'Settings · manual fallback',
          manual: !goldAuto,
        });
        continue;
      }
      const snap = c.snapId ? _fromSnapshot(c.snapId) : null;
      if (snap) {
        rows.push({
          ...c,
          price: snap.price,
          changePct: snap.changePct || 0,
          pkr: c.unit === 'PKR/g' || c.unit === 'PKR/L' ? snap.price : snap.price * usd,
          label: snap.label,
          asOf: snap.asOf,
          manual: !!snap.manual,
        });
        continue;
      }
      const q = c.yahoo ? await _yahooQuote(c.yahoo) : null;
      const pkr = q?.price ? q.price * usd : 0;
      rows.push({
        ...c,
        price: q?.price || 0,
        change: q?.change || 0,
        changePct: q?.changePct || 0,
        pkr,
        label: q ? 'Yahoo spot' : 'Unavailable',
      });
    }

    _cache = { ts: Date.now(), rows };
    return rows;
  }

  return { fetchAll };
})();
window.CommoditiesService = CommoditiesService;

;/* === js/services/dividend-analytics-service.js === */
'use strict';
const DividendAnalyticsService = (() => {

  function _holdingsMap() {
    const map = {};
    Ledger.calcHoldings(State.get('transactions') || []).forEach(h => {
      const k = h.symbol;
      if (!map[k]) map[k] = { symbol: k, shares: 0, totalCost: 0, brokers: [] };
      map[k].shares += h.shares;
      map[k].totalCost += h.shares * h.avgCost;
      map[k].brokers.push(h.broker);
    });
    return map;
  }

  function _holdingFor(symbol) {
    const holdings = Ledger.calcHoldings(State.get('transactions') || []).filter(h => h.symbol === symbol);
    if (!holdings.length) return null;
    const shares = holdings.reduce((s, h) => s + h.shares, 0);
    const totalCost = holdings.reduce((s, h) => s + h.shares * h.avgCost, 0);
    return { symbol, shares, avgCost: shares > 0 ? totalCost / shares : 0, totalCost, brokers: holdings.map(h => h.broker) };
  }

  function _loggedForSymbol(symbol) {
    return (State.get('transactions') || [])
      .filter(t => t.type === 'DIVIDEND' && t.symbol === symbol);
  }

  function _annualDps(symbol) {
    const paid = CorporateActionsService.getPaidCash(symbol);
    const thisYear = new Date().getFullYear();
    const lastYear = paid.filter(d => (d.paymentDate || '').startsWith(String(thisYear)));
    if (lastYear.length) return lastYear.reduce((s, d) => s + d.amountPerShare, 0);
    const fy = paid.slice(0, 2);
    return fy.reduce((s, d) => s + d.amountPerShare, 0);
  }

  function _cagrFromCash(symbol) {
    const paid = CorporateActionsService.getPaidCash(symbol);
    if (paid.length < 2) return null;
    const byYear = {};
    paid.forEach(d => {
      const y = (d.paymentDate || '').slice(0, 4);
      if (!byYear[y]) byYear[y] = 0;
      byYear[y] += d.amountPerShare;
    });
    const years = Object.keys(byYear).sort();
    if (years.length < 2) return null;
    const first = byYear[years[0]];
    const last = byYear[years[years.length - 1]];
    if (!first || first <= 0) return null;
    const n = years.length - 1;
    return (Math.pow(last / first, 1 / n) - 1) * 100;
  }

  function getHoldingAnalysis(symbol) {
    const holding = _holdingFor(symbol);
    const price = MarketDataService.getQuote(symbol).price;
    const profile = CorporateActionsService.getSymbolProfile(symbol);
    const annualDps = _annualDps(symbol);
    const shares = holding?.shares || 0;
    const annualIncome = annualDps * shares;
    const monthlyIncome = annualIncome / 12;
    const logged = _loggedForSymbol(symbol);
    const totalReceived = logged.reduce((s, t) => s + (t.amount || 0), 0);
    const avgCost = holding?.avgCost || 0;
    const costBasis = holding?.totalCost || 0;
    const yieldOnCost = costBasis > 0 ? (annualIncome / costBasis) * 100 : null;
    const currentYield = price > 0 && annualDps > 0 ? (annualDps / price) * 100 : null;
    const cagr = _cagrFromCash(symbol);
    const upcoming = CorporateActionsService.getUpcomingCash(symbol);
    const nextEvent = upcoming[0] || null;
    const expectedNext = nextEvent && shares ? nextEvent.amountPerShare * shares : null;

    return {
      symbol, companyName: profile.companyName, sector: profile.sector,
      shares, avgCost, costBasis, price,
      annualDps, annualIncome, monthlyIncome,
      yieldOnCost, currentYield, dividendCagr: cagr,
      totalReceived, loggedCount: logged.length,
      nextEvent, expectedNext,
      isHeld: !!holding,
    };
  }

  function getPortfolioHoldingsAnalysis() {
    const held = Object.keys(_holdingsMap());
    return held.map(sym => getHoldingAnalysis(sym)).sort((a, b) => b.annualIncome - a.annualIncome);
  }

  function getForecast() {
    const holdings = getPortfolioHoldingsAnalysis();
    const thisYear = new Date().getFullYear();
    let expectedThisYear = 0;
    let expectedNextYear = 0;

    holdings.forEach(h => {
      const paid = CorporateActionsService.getPaidCash(h.symbol);
      const upcoming = CorporateActionsService.getUpcomingCash(h.symbol);
      const receivedYtd = (State.get('transactions') || [])
        .filter(t => t.type === 'DIVIDEND' && t.symbol === h.symbol && (t.date || '').startsWith(String(thisYear)))
        .reduce((s, t) => s + (t.amount || 0), 0);

      const upcomingIncome = upcoming.reduce((s, u) => s + u.amountPerShare * h.shares, 0);
      expectedThisYear += receivedYtd + upcomingIncome;

      const lastAnnualDps = _annualDps(h.symbol);
      const growth = h.dividendCagr != null ? 1 + h.dividendCagr / 100 : 1.05;
      expectedNextYear += lastAnnualDps * growth * h.shares;
    });

    const monthlyForecast = expectedThisYear / 12;
    return { expectedThisYear, expectedNextYear, monthlyForecast, holdings };
  }

  function getPortfolioDashboard() {
    const holdings = getPortfolioHoldingsAnalysis();
    const forecast = getForecast();
    const txs = (State.get('transactions') || []).filter(t => t.type === 'DIVIDEND');
    const thisYear = new Date().getFullYear();
    const receivedYtd = txs.filter(t => (t.date || '').startsWith(String(thisYear))).reduce((s, t) => s + (t.amount || 0), 0);
    const thisMonth = new Date().toISOString().slice(0, 7);
    const receivedMtd = txs.filter(t => (t.date || '').startsWith(thisMonth)).reduce((s, t) => s + (t.amount || 0), 0);
    const lifetime = State.getTotalDividends();
    const invested = State.calcTotalCost();
    const portfolioYield = invested > 0 ? (forecast.expectedThisYear / invested) * 100 : 0;

    const byStock = holdings.map(h => ({
      symbol: h.symbol, companyName: h.companyName, sector: h.sector,
      annualIncome: h.annualIncome, totalReceived: h.totalReceived,
      yieldOnCost: h.yieldOnCost, currentYield: h.currentYield, cagr: h.dividendCagr,
    })).filter(h => h.annualIncome > 0 || h.totalReceived > 0);

    const bySector = {};
    byStock.forEach(h => {
      const sec = h.sector || 'Other';
      if (!bySector[sec]) bySector[sec] = { sector: sec, annualIncome: 0, totalReceived: 0, symbols: [] };
      bySector[sec].annualIncome += h.annualIncome;
      bySector[sec].totalReceived += h.totalReceived;
      bySector[sec].symbols.push(h.symbol);
    });
    const sectorBreakdown = Object.values(bySector).sort((a, b) => b.annualIncome - a.annualIncome);
    const totalAnnual = byStock.reduce((s, h) => s + h.annualIncome, 0);
    sectorBreakdown.forEach(s => { s.pct = totalAnnual > 0 ? (s.annualIncome / totalAnnual) * 100 : 0; });

    const upcoming = CorporateActionsService.getAllUpcoming().map(u => {
      const h = _holdingFor(u.symbol);
      return {
        ...u,
        shares: h?.shares || 0,
        expectedIncome: h ? u.amountPerShare * h.shares : 0,
        isHeld: !!h,
      };
    });

    return {
      receivedYtd, receivedMtd, lifetime, portfolioYield,
      expectedThisYear: forecast.expectedThisYear,
      expectedNextYear: forecast.expectedNextYear,
      monthlyForecast: forecast.monthlyForecast,
      byStock, bySector: sectorBreakdown, upcoming,
      holdingsCount: holdings.filter(h => h.isHeld).length,
    };
  }

  function getTimeline() {
    const txs = (State.get('transactions') || [])
      .filter(t => t.type === 'DIVIDEND')
      .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

    const byMonth = {};
    txs.forEach(t => {
      const m = (t.date || '').slice(0, 7);
      if (!byMonth[m]) byMonth[m] = { month: m, total: 0, events: [] };
      byMonth[m].total += t.amount || 0;
      byMonth[m].events.push(t);
    });

    let cumulative = 0;
    const months = Object.values(byMonth).sort((a, b) => a.month.localeCompare(b.month));
    months.forEach(m => { cumulative += m.total; m.cumulative = cumulative; });

    return { months, totalEvents: txs.length, cumulative };
  }

  function getCalendar() {
    const upcoming = CorporateActionsService.getAllUpcoming();
    const byMonth = {};
    upcoming.forEach(u => {
      const h = _holdingFor(u.symbol);
      const entry = {
        ...u,
        shares: h?.shares || 0,
        expectedIncome: h ? u.amountPerShare * h.shares : 0,
        isHeld: !!h,
      };
      const payMonth = (u.paymentDate || '').slice(0, 7);
      const exMonth = (u.exDate || '').slice(0, 7);
      [payMonth, exMonth].forEach(m => {
        if (!m) return;
        if (!byMonth[m]) byMonth[m] = { month: m, paymentEvents: [], exEvents: [] };
        if (m === payMonth) byMonth[m].paymentEvents.push(entry);
        if (m === exMonth && m !== payMonth) byMonth[m].exEvents.push(entry);
      });
    });
    return Object.values(byMonth).sort((a, b) => a.month.localeCompare(b.month));
  }

  function getGrowthAnalytics() {
    const held = Object.keys(_holdingsMap());
    return held.map(sym => {
      const h = getHoldingAnalysis(sym);
      const yieldHist = CorporateActionsService.getYieldHistory(sym);
      const paid = CorporateActionsService.getPaidCash(sym);
      const dpsByYear = {};
      paid.forEach(d => {
        const y = (d.paymentDate || '').slice(0, 4);
        dpsByYear[y] = (dpsByYear[y] || 0) + d.amountPerShare;
      });
      return {
        symbol: sym, companyName: h.companyName, cagr: h.dividendCagr,
        yieldOnCost: h.yieldOnCost, currentYield: h.currentYield,
        yieldHistory: yieldHist, dpsByYear,
        trend: h.dividendCagr != null ? (h.dividendCagr >= 5 ? 'growing' : h.dividendCagr >= 0 ? 'stable' : 'declining') : 'unknown',
      };
    }).filter(g => g.cagr != null || g.yieldHistory.length).sort((a, b) => (b.cagr || 0) - (a.cagr || 0));
  }

  function getHistoricalTable(symbol) {
    const cash = CorporateActionsService.getCashDividends(symbol);
    const bonus = CorporateActionsService.getBonusShares(symbol);
    const rights = CorporateActionsService.getRightsIssues(symbol);
    const logged = symbol ? _loggedForSymbol(symbol) : (State.get('transactions') || []).filter(t => t.type === 'DIVIDEND');

    const timeline = [
      ...cash.map(c => ({ ...c, actionType: 'Cash Dividend', amount: c.amountPerShare })),
      ...bonus.map(b => ({ ...b, actionType: 'Bonus Shares', amount: b.ratio })),
      ...rights.map(r => ({ ...r, actionType: 'Rights Issue', amount: r.issuePrice })),
    ].sort((a, b) => {
      const da = a.paymentDate || a.creditDate || a.exDate || '';
      const db = b.paymentDate || b.creditDate || b.exDate || '';
      return db.localeCompare(da);
    });

    return { timeline, logged, cash, bonus, rights };
  }

  return {
    getHoldingAnalysis, getPortfolioHoldingsAnalysis, getForecast, getPortfolioDashboard,
    getTimeline, getCalendar, getGrowthAnalytics, getHistoricalTable,
  };
})();
window.DividendAnalyticsService = DividendAnalyticsService;

;/* === js/services/dividend-service.js === */
'use strict';
/**
 * Dividend data access layer — reads corporate actions dataset + user transactions.
 * Swap adapter for live PSX dividend API without changing UI.
 */
const DividendService = (() => {
  let _adapter = null;

  function setAdapter(adapter) {
    _adapter = adapter;
    if (adapter && CorporateActionsService.setAdapter) {
      CorporateActionsService.setAdapter(adapter);
    }
  }

  function getSymbolData(symbol) {
    return {
      profile: CorporateActionsService.getSymbolProfile(symbol),
      actions: CorporateActionsService.getAllActions(symbol),
      analysis: DividendAnalyticsService.getHoldingAnalysis(symbol),
      historical: DividendAnalyticsService.getHistoricalTable(symbol),
    };
  }

  function getUpcoming() {
    return DividendAnalyticsService.getPortfolioDashboard().upcoming;
  }

  function getCalendar() {
    return DividendAnalyticsService.getCalendar();
  }

  function getPortfolioDividends() {
    const d = DividendAnalyticsService.getPortfolioDashboard();
    return {
      total: d.lifetime,
      annual: d.receivedYtd,
      monthly: d.receivedMtd,
      yieldOnPortfolio: d.portfolioYield,
      expectedThisYear: d.expectedThisYear,
      expectedNextYear: d.expectedNextYear,
      count: (State.get('transactions') || []).filter(t => t.type === 'DIVIDEND').length,
    };
  }

  function getYieldOnCost(symbol, avgCost, shares) {
    const a = DividendAnalyticsService.getHoldingAnalysis(symbol);
    if (avgCost && shares) {
      const annualDps = a.annualDps || 0;
      const cost = avgCost * shares;
      return cost > 0 ? (annualDps * shares / cost) * 100 : null;
    }
    return a.yieldOnCost;
  }

  function getDividendGrowth(symbol) {
    const a = DividendAnalyticsService.getHoldingAnalysis(symbol);
    return a.dividendCagr;
  }

  function loggedBySymbol() {
    return State.dividendsBySymbol();
  }

  function getHistory(symbol) {
    return DividendAnalyticsService.getHistoricalTable(symbol);
  }

  function getPortfolioAnalysis() {
    return DividendAnalyticsService.getPortfolioDashboard();
  }

  function getForecast() {
    return DividendAnalyticsService.getForecast();
  }

  function getTimeline() {
    return DividendAnalyticsService.getTimeline();
  }

  function getGrowthAnalytics() {
    return DividendAnalyticsService.getGrowthAnalytics();
  }

  function getHoldingsAnalysis() {
    return DividendAnalyticsService.getPortfolioHoldingsAnalysis();
  }

  return {
    setAdapter, getSymbolData, getUpcoming, getCalendar, getPortfolioDividends,
    getYieldOnCost, getDividendGrowth, loggedBySymbol, getHistory,
    getPortfolioAnalysis, getForecast, getTimeline, getGrowthAnalytics, getHoldingsAnalysis,
  };
})();
window.DividendService = DividendService;

;/* === js/services/research-service.js === */
'use strict';
const ResearchService = (() => {

  function getStockReport(symbol) {
    const profile = StockService.getProfile(symbol);
    const fundamentals = StockService.getFundamentals(symbol);
    const changes = MarketDataService.getPriceChanges(symbol);
    const quote = MarketDataService.getQuote(symbol);
    const ai = AIAnalysis.analyze(symbol);
    const divHist = DividendService.getHistory(symbol);
    const yoc = null;

    const holdings = Ledger.calcHoldings(State.get('transactions') || []);
    const h = holdings.find(x => x.symbol === symbol);
    const position = h ? {
      shares: h.shares, avgCost: h.avgCost, broker: h.broker,
      value: h.shares * quote.price,
      pnl: h.shares * (quote.price - h.avgCost),
      pnlPct: h.avgCost > 0 ? ((quote.price - h.avgCost) / h.avgCost) * 100 : 0,
      yieldOnCost: DividendService.getYieldOnCost(symbol, h.avgCost, h.shares),
    } : null;

    return {
      symbol, profile, fundamentals, quote, changes, ai, divHist, position,
      notes: (State.get('researchNotes') || {})[symbol] || '',
      updatedAt: Date.now(),
    };
  }

  function search(query) {
    const q = (query || '').trim().toUpperCase();
    return StockService.listSymbols().filter(s =>
      s.includes(q) || StockService.getProfile(s).name?.toUpperCase().includes(q)
    );
  }

  return { getStockReport, search };
})();
window.ResearchService = ResearchService;

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
    const m = Analytics.dashboardMetrics(state);
    const totalValue = m.totalValue;
    const invested = m.totalCost;
    const unrealized = m.totalReturn.abs;
    const realized = _realizedFromLedger(txs);
    const divs = DividendService.getPortfolioDividends();

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
      const ai = AIAnalysis.analyze(h.symbol);
      const meta = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === h.symbol && s.broker === h.broker);
      return {
        symbol: h.symbol, name: meta?.name || h.symbol, broker: h.broker,
        kind: 'stock', quantity: h.shares, avgCost: h.avgCost, price, value: val, costBasis: cost,
        pnl, pnlPct, dailyPnl, dailyPnlPct, allocPct: alloc,
        divYield: f?.divYield || 0,
        yieldOnCost: DividendService.getYieldOnCost(h.symbol, h.avgCost, h.shares),
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
      const ai = AIAnalysis.analyze(f.symbol);
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
      const growth = DividendService.getDividendGrowth(h.symbol);
      if (growth != null && growth < 2) {
        insights.push({ type: 'dividend', severity: 'medium', text: `${h.symbol} dividend growth slowing (${growth.toFixed(1)}% CAGR).`, action: 'Review payout sustainability in Research.' });
      }
    });

    if (summary.portfolioDivYield < 4 && summary.invested > 500000) {
      insights.push({ type: 'income', severity: 'low', text: `Portfolio yield ${summary.portfolioDivYield.toFixed(1)}% — income generation below target.`, action: 'Add high-yield names like MEBL, OGDC, or MIIF.' });
    }

    const ruleInsights = Insights.generate(state) || [];
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
        ? `<div class="lc-portfolio-spark">${Charts.lineChart(spark, { height: 24, width: 64, fill: false, color: s.pnl >= 0 ? '#22c55e' : '#ef4444' })}</div>`
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

;/* === js/services/transaction-ledger-service.js === */
'use strict';
/**
 * Unified transaction display, cash-flow math, and cross-screen linking.
 */
const TransactionLedger = (() => {
  // icon = LcIcons key (render with LcIcons.icon(meta.icon, size)).
  const TYPE_META = {
    BUY:           { icon: 'trending',     cls: 'buy',          label: 'Buy',           flow: 'out'  },
    SELL:          { icon: 'trendingDown', cls: 'sell',         label: 'Sell',          flow: 'in'   },
    DIVIDEND:      { icon: 'banknote',     cls: 'dividend',     label: 'Dividend',      flow: 'in'   },
    SALARY:        { icon: 'wallet',       cls: 'salary',       label: 'Salary',        flow: 'in'   },
    DEPOSIT:       { icon: 'download',     cls: 'salary',       label: 'Deposit',       flow: 'in'   },
    CONTRIBUTION:  { icon: 'briefcase',    cls: 'contribution', label: 'Fund buy',      flow: 'out'  },
    FUND_OUT:      { icon: 'swap',         cls: 'contribution', label: 'Fund convert',  flow: 'neutral'},
    REDEMPTION:    { icon: 'download',     cls: 'contribution', label: 'Redemption',    flow: 'in'   },
    IPO_SUBSCRIBE: { icon: 'zap',          cls: 'ipo',          label: 'IPO',           flow: 'out'  },
    FEE:           { icon: 'ledger',       cls: 'fee',          label: 'Fee',           flow: 'out'  },
    TAX:           { icon: 'scale',        cls: 'tax',          label: 'Tax',           flow: 'out'  },
    INTL_BUY:      { icon: 'globe',        cls: 'buy',          label: 'US buy',        flow: 'out'  },
    INTL_SELL:     { icon: 'globe',        cls: 'sell',         label: 'US sell',       flow: 'in'   },
    CRYPTO_BUY:    { icon: 'coins',        cls: 'buy',          label: 'Crypto buy',    flow: 'out'  },
    CRYPTO_SELL:   { icon: 'coins',        cls: 'sell',         label: 'Crypto sell',   flow: 'in'   },
    POSITION_ADJUST: { icon: 'edit',       cls: 'contribution', label: 'Reconcile',     flow: 'neutral' },
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

;/* === js/services/fund-nav-service.js === */
'use strict';
/** Meezan / AMC fund NAV — manual overrides in settings (no public API). */
const FundNavService = (() => {
  function overrides() {
    const s = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    return s.fundNavOverrides || {};
  }

  function navFor(symbol) {
    const sym = String(symbol || '').toUpperCase();
    const o = overrides()[sym];
    if (o?.nav > 0) return { nav: o.nav, source: 'manual_nav', asOf: o.asOf || null };
    const seed = (window.MEEZAN_FUNDS || []).find((f) => f.symbol === sym);
    const fromState = typeof State !== 'undefined' ? State.getPrice(sym) : 0;
    if (fromState > 0) return { nav: fromState, source: State.getPriceSource?.(sym) || 'seed', asOf: null };
    if (seed?.currentNav > 0) return { nav: seed.currentNav, source: 'meezan_seed', asOf: seed.navAsOf || null };
    return { nav: 0, source: 'none', asOf: null };
  }

  function applyAll() {
    if (typeof State === 'undefined') return 0;
    let n = 0;
    Object.entries(overrides()).forEach(([sym, row]) => {
      if (!(row?.nav > 0)) return;
      State.updatePrice(sym, {
        price: row.nav,
        prevClose: row.nav,
        source: 'manual_nav',
        ts: row.updatedAt ? Date.parse(row.updatedAt) || Date.now() : Date.now(),
      });
      n++;
    });
    return n;
  }

  function saveNav(symbol, nav, asOf) {
    const sym = String(symbol || '').toUpperCase();
    const val = parseFloat(nav);
    if (!(val > 0)) return false;
    State.update((s) => {
      s.settings = s.settings || {};
      s.settings.fundNavOverrides = s.settings.fundNavOverrides || {};
      s.settings.fundNavOverrides[sym] = {
        nav: val,
        asOf: asOf || new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString(),
      };
    });
    State.updatePrice(sym, { price: val, prevClose: val, source: 'manual_nav', ts: Date.now() });
    return true;
  }

  function label(symbol) {
    const { source, asOf } = navFor(symbol);
    if (source === 'manual_nav') return asOf ? `Manual NAV · ${asOf}` : 'Manual NAV';
    if (source === 'meezan_seed') return 'Statement seed';
    return '';
  }

  return { overrides, navFor, applyAll, saveNav, label };
})();
window.FundNavService = FundNavService;

;/* === js/services/news-service.js === */
'use strict';
/**
 * Portfolio news — Yahoo, Google News RSS, BBC Business (via worker proxy), optional GNews key.
 * Rule-based impact tags for decision support (not AI advice).
 */
const NewsService = (() => {
  const CACHE_MS = 900000;
  const _cache = new Map();

  const IMPACT_RULES = [
    { id: 'earnings', re: /earnings|profit|revenue|eps|quarterly results/i, label: 'Earnings', severity: 'high', bias: 'neutral' },
    { id: 'dividend', re: /dividend|payout|yield|interim|final cash/i, label: 'Dividend', severity: 'medium', bias: 'positive' },
    { id: 'upgrade', re: /upgrade|outperform|buy rating|raised target/i, label: 'Upgrade', severity: 'medium', bias: 'positive' },
    { id: 'downgrade', re: /downgrade|underperform|sell rating|cut target/i, label: 'Downgrade', severity: 'high', bias: 'negative' },
    { id: 'macro', re: /fed |interest rate|inflation|imf|sbp|rupee|dollar|oil price|kse-100/i, label: 'Macro', severity: 'medium', bias: 'neutral' },
    { id: 'regulatory', re: /sec |secp|fine|investigation|lawsuit|regulator/i, label: 'Regulatory', severity: 'high', bias: 'negative' },
    { id: 'merger', re: /merger|acquisition|takeover|buyout|m&a/i, label: 'M&A', severity: 'high', bias: 'neutral' },
  ];

  function _proxyBase() {
    const settings = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    const raw = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(settings.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || '').trim();
    return raw.replace(/\/$/, '');
  }

  function _yahooSymbol(sym, kind) {
    if (kind === 'intl' || kind === 'crypto') return sym;
    return `${sym}.KA`;
  }

  function _tagImpact(title, summary) {
    const text = `${title || ''} ${summary || ''}`;
    const hits = IMPACT_RULES.filter(r => r.re.test(text));
    if (!hits.length) return { tags: ['General'], severity: 'low', bias: 'neutral', hint: '' };
    const top = hits.sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.severity] - { high: 0, medium: 1, low: 2 }[b.severity]))[0];
    const bias = hits.some(h => h.bias === 'negative') ? 'negative' : hits.some(h => h.bias === 'positive') ? 'positive' : 'neutral';
    const hint = bias === 'positive'
      ? 'Potentially supportive for holders — verify against your thesis.'
      : bias === 'negative'
        ? 'Headline risk — review position size and stop-loss discipline.'
        : 'Material event — read full story before trading.';
    return { tags: hits.map(h => h.label), severity: top.severity, bias, hint };
  }

  function _normalizeItem(it, symbol) {
    return {
      id: it.id || it.url || `${it.source}:${it.title}`,
      title: it.title,
      url: it.url,
      publisher: it.publisher || it.source,
      publishedAt: it.publishedAt,
      symbol: it.symbol || symbol,
      portfolioSymbol: it.portfolioSymbol || symbol,
      source: it.source || 'News',
      impact: it.impact || _tagImpact(it.title),
    };
  }

  async function _fetchWorkerNews(path) {
    const base = _proxyBase();
    if (!base) return [];
    try {
      const res = await fetch(`${base}/${path}`, { headers: { Accept: 'application/json' } });
      if (!res.ok) return [];
      const j = await res.json();
      return j.articles || [];
    } catch (_) {
      return [];
    }
  }

  async function _fetchYahooNews(symbol, kind) {
    const viaWorker = await _fetchWorkerNews(`news/yahoo/${encodeURIComponent(symbol)}?kind=${encodeURIComponent(kind || 'stock')}`);
    if (viaWorker.length) return viaWorker;
    const ysym = _yahooSymbol(symbol, kind);
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(ysym)}&newsCount=6`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Yahoo ${res.status}`);
    const j = await res.json();
    return (j.news || []).map(n => ({
      id: n.uuid || n.link,
      title: n.title,
      url: n.link,
      publisher: n.publisher,
      publishedAt: n.providerPublishTime ? new Date(n.providerPublishTime * 1000).toISOString() : null,
      symbol,
      source: 'Yahoo Finance',
    }));
  }

  async function _fetchGoogleNewsRss(query, symbol) {
    const q = encodeURIComponent(query);
    const sym = encodeURIComponent(symbol || '—');
    const viaWorker = await _fetchWorkerNews(`news/google?q=${q}&symbol=${sym}`);
    if (viaWorker.length) return viaWorker;
    return [];
  }

  async function _fetchBbcBusiness() {
    return _fetchWorkerNews('news/bbc');
  }

  async function _fetchGNews(query, apiKey) {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=6&apikey=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GNews ${res.status}`);
    const j = await res.json();
    return (j.articles || []).map(a => ({
      id: a.url,
      title: a.title,
      url: a.url,
      publisher: a.source?.name,
      publishedAt: a.publishedAt,
      symbol: query,
      source: 'GNews',
    }));
  }

  function _dedupe(items) {
    const seen = new Set();
    return items.filter(a => {
      const key = (a.title || '').toLowerCase().replace(/\W+/g, '').slice(0, 80);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  async function fetchForSymbol(symbol, opts) {
    opts = opts || {};
    const kind = opts.kind || 'stock';
    const key = `${symbol}:${kind}`;
    const hit = _cache.get(key);
    if (hit && Date.now() - hit.ts < CACHE_MS) return hit.items;

    const q = kind === 'stock' ? `${symbol} Pakistan PSX stock` : symbol;
    const batches = await Promise.all([
      _fetchYahooNews(symbol, kind).catch(() => []),
      _fetchGoogleNewsRss(q, symbol).catch(() => []),
    ]);
    let items = batches.flat();

    const gKey = typeof State !== 'undefined' ? State.get('settings')?.gnewsApiKey : '';
    if (gKey) {
      try {
        const gq = kind === 'stock' ? `${symbol} Pakistan stock PSX` : symbol;
        items = items.concat(await _fetchGNews(gq, gKey));
      } catch (_) {}
    }

    items = _dedupe(items).map(it => _normalizeItem(it, symbol));
    _cache.set(key, { ts: Date.now(), items });
    return items;
  }

  function portfolioSymbols(state) {
    state = state || (typeof State !== 'undefined' ? State.get() : {});
    const txs = state.transactions || [];
    const syms = [];
    // Funds (Meezan NAVs) have no per-security news — querying their ticker
    // returns unrelated global headlines. They are covered by macro PSX news.
    Ledger.calcHoldings(txs).forEach(h => syms.push({ symbol: h.symbol, kind: 'stock', weight: h.shares * (State.getPrice(h.symbol) || h.avgCost) }));
    (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(txs) : []).forEach(h => syms.push({ symbol: h.symbol, kind: h.assetClass === 'crypto' ? 'crypto' : 'intl', weight: h.qty }));
    return syms.sort((a, b) => (b.weight || 0) - (a.weight || 0)).slice(0, 8);
  }

  async function fetchMacroNews() {
    const key = '__macro__';
    const hit = _cache.get(key);
    if (hit && Date.now() - hit.ts < CACHE_MS) return hit.items;
    // Pakistan-specific only — generic BBC business was drowning out
    // relevant PSX/economy headlines.
    const batches = await Promise.all([
      _fetchGoogleNewsRss('KSE-100 Pakistan stock market PSX', 'PSX'),
      _fetchGoogleNewsRss('Pakistan rupee economy SBP inflation', 'Macro'),
      _fetchGoogleNewsRss('Pakistan Stock Exchange listed companies', 'PSX'),
    ]);
    const items = _dedupe(batches.flat()).map(it => _normalizeItem(it, it.symbol || 'PSX'));
    _cache.set(key, { ts: Date.now(), items });
    return items;
  }

  async function fetchPortfolioNews(state) {
    state = state || (typeof State !== 'undefined' ? State.get() : {});
    const picks = portfolioSymbols(state);
    const base = _proxyBase();

    // PSX macro news (KSE-100, rupee, SBP) is always relevant — it leads.
    const macro = (await fetchMacroNews().catch(() => [])) || [];

    // Per-symbol items are only kept when the headline actually names the
    // company/ticker — PSX tickers aren't in global news indexes, so raw
    // per-ticker feeds return unrelated noise otherwise.
    const kindOf = {};
    picks.forEach(p => { kindOf[p.symbol] = p.kind; });

    let perSymbol = [];
    if (picks.length && base) {
      const syms = picks.slice(0, 6).map(p => p.symbol).join(',');
      const viaAgg = await _fetchWorkerNews(`news/aggregate?symbols=${encodeURIComponent(syms)}&limit=14`).catch(() => []);
      perSymbol = viaAgg.map(it => _normalizeItem(it, it.portfolioSymbol || it.symbol));
    }
    const nameFor = (sym) => {
      const s = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(x => x.symbol === sym);
      return (s?.name || '').split(/\s+/).filter(w => w.length > 3).slice(0, 2);
    };
    const relevant = perSymbol.filter(n => {
      const sym = n.portfolioSymbol || n.symbol || '';
      // Yahoo indexes US/crypto tickers — their per-symbol news is genuine.
      if (kindOf[sym] === 'intl' || kindOf[sym] === 'crypto') return true;
      // PSX tickers aren't indexed — require the headline to name the company.
      const title = (n.title || '').toUpperCase();
      if (sym && title.includes(sym.toUpperCase())) return true;
      return nameFor(sym).some(w => title.includes(w.toUpperCase()));
    });

    const merged = _dedupe(macro.concat(relevant))
      .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
      .slice(0, 12);
    return merged;
  }

  function newsFingerprint(items) {
    return (items || []).slice(0, 6).map(n => (n.title || '').slice(0, 40)).join('|');
  }

  function toTelegramRows(items) {
    return (items || []).slice(0, 6).map(n => ({
      symbol: n.portfolioSymbol || n.symbol || '—',
      title: (n.title || '').slice(0, 72),
      tag: (n.impact?.tags || [])[0] || 'News',
      source: n.source || n.publisher || 'News',
    }));
  }

  function impactBadge(impact) {
    if (!impact) return '';
    const cls = impact.bias === 'positive' ? 'psx-up' : impact.bias === 'negative' ? 'psx-down' : '';
    const tags = (impact.tags || []).slice(0, 2).join(' · ');
    return `<span class="lc-news-impact ${cls}">${tags}</span>`;
  }

  return {
    fetchForSymbol,
    fetchPortfolioNews,
    fetchMacroNews,
    portfolioSymbols,
    newsFingerprint,
    toTelegramRows,
    impactBadge,
    _tagImpact,
    IMPACT_RULES,
  };
})();
window.NewsService = NewsService;

;/* === js/shared/telegram-brief-format.js === */
'use strict';
/** Browser shim — keep in sync with shared/telegram-brief.mjs */
const TelegramBriefFormat = (() => {
  const MAX_LEN = 4096;

  function escapeMarkdown(text) {
    if (text == null) return '';
    return String(text).replace(/([_*`\[\]])/g, '\\$1');
  }

  function truncate(text, max) {
    max = max || MAX_LEN;
    const s = String(text || '');
    if (s.length <= max) return s;
    return s.slice(0, max - 1) + '…';
  }

  function formatMorningBrief(brief, extras, fmtPkr) {
    extras = extras || {};
    const fmt = fmtPkr || ((n) => '₨' + Math.round(n || 0).toLocaleString('en-PK'));
    const day = extras.weekdayLabel || '';
    const pkt = extras.pktLabel || '9:00 PKT';
    const netWorth = extras.netWorth || 0;
    const dailyPct = extras.dailyPct ?? 0;
    const sign = dailyPct >= 0 ? '+' : '';
    const actionEmoji = {
      SELL: '🔴', TRIM: '🟠', REDUCE: '🟠', ADD: '🟢',
      STRONG_BUY: '🟢', BUY: '🟢', WATCH: '🟡', HOLD: '⚪',
    };
    const lines = [
      `📊 *LedgerCap — Daily Brief* (${escapeMarkdown(day)} ${escapeMarkdown(pkt)})`,
    ];
    if (extras.dataAsOf) {
      const stale = extras.dataStale ? ' ⚠️ stale' : '';
      lines.push(`_Data as of ${escapeMarkdown(extras.dataAsOf)}${stale}_`);
    }
    lines.push(`Net worth: *${escapeMarkdown(fmt(netWorth))}* (${sign}${Number(dailyPct).toFixed(1)}% today)`);
    if (extras.invested) lines.push(`Invested: *${escapeMarkdown(fmt(extras.invested))}*`);
    if (extras.dailyPnl != null) {
      const dSign = extras.dailyPnl >= 0 ? '+' : '';
      lines.push(`Today P&L: *${dSign}${escapeMarkdown(fmt(extras.dailyPnl))}*`);
    }
    if (extras.totalPnl != null) {
      const tSign = extras.totalPnl >= 0 ? '+' : '';
      const tPct = extras.totalPnlPct != null ? ` (${tSign}${Number(extras.totalPnlPct).toFixed(1)}%)` : '';
      lines.push(`All-time P&L: *${tSign}${escapeMarkdown(fmt(extras.totalPnl))}*${tPct}`);
    }
    if (extras.usStocks?.length) {
      lines.push('', '*US / Intl holdings*');
      extras.usStocks.slice(0, 6).forEach((h) => {
        lines.push(`• *${escapeMarkdown(h.symbol)}* ${Number(h.qty || 0).toFixed(2)} sh · ${escapeMarkdown(fmt(h.valuePkr))}`);
      });
    }
    if (extras.portfolios?.length) {
      lines.push('', '*Portfolios*');
      extras.portfolios.slice(0, 6).forEach((p) => {
        const ps = (p.pnlPct || 0) >= 0 ? '+' : '';
        lines.push(`• *${escapeMarkdown(p.name)}* ${escapeMarkdown(fmt(p.value))} (${ps}${Number(p.pnlPct || 0).toFixed(1)}%)`);
      });
    }
    if (extras.dividends?.length) {
      lines.push('', '*Upcoming dividends*');
      extras.dividends.slice(0, 5).forEach((d) => {
        lines.push(`• *${escapeMarkdown(d.symbol)}* ex in ${d.days}d · ${escapeMarkdown(fmt(d.amountPkr))}/sh`);
      });
    }
    if (extras.news?.length) {
      lines.push('', '*News — your holdings*');
      extras.news.slice(0, 4).forEach((n) => {
        lines.push(`• [${escapeMarkdown(n.tag || 'News')}] *${escapeMarkdown(n.symbol)}* ${escapeMarkdown(n.title)}`);
      });
    }
    const signals = (brief?.urgent_signals || []).slice(0, 4);
    if (signals.length) {
      lines.push('', '*Signals*');
      signals.forEach((s) => {
        const em = actionEmoji[s.action] || '•';
        const rat = escapeMarkdown((s.rationale || '').slice(0, 100));
        lines.push(`${em} ${escapeMarkdown(s.action)}: *${escapeMarkdown(s.symbol)}* — ${rat}`);
      });
    }
    const counts = brief?.action_counts || {};
    lines.push(
      '',
      `STRONG BUY ${counts['STRONG BUY'] || 0} · ADD ${counts.ADD || 0} · HOLD ${counts.HOLD || 0} · TRIM ${counts.TRIM || 0} · SELL ${counts.SELL || 0}`,
    );
    if (extras.pilotScore) {
      lines.push(`Pilot Score: *${escapeMarkdown(extras.pilotScore.grade)}* (${extras.pilotScore.score}/100)`);
    }
    lines.push('', '_Rule-based brief — not financial advice._');
    return truncate(lines.join('\n'));
  }

  function formatPortfolioDigest(row, fmtPkr) {
    const fmt = fmtPkr || ((n) => '₨' + Math.round(n || 0).toLocaleString('en-PK'));
    if (!row || !(row.value > 0)) return '';
    const dSign = (row.dailyPnl || 0) >= 0 ? '+' : '';
    const pSign = (row.pnlPct || 0) >= 0 ? '+' : '';
    const lines = [
      `📊 *${escapeMarkdown(row.name)}*`,
      `Qeemat / Value: *${escapeMarkdown(fmt(row.value))}*`,
      `Aaj / Today: *${dSign}${escapeMarkdown(fmt(row.dailyPnl || 0))}* (${dSign}${Number(row.dailyPct || 0).toFixed(1)}%)`,
      `Kul / All-time: *${pSign}${Number(row.pnlPct || 0).toFixed(1)}%* · Faida ${escapeMarkdown(fmt(row.pnl || 0))}`,
      `Invested: ${escapeMarkdown(fmt(row.invested || 0))} · ${row.positions || 0} positions`,
      '',
      '_Rule-based — not financial advice._',
    ];
    return truncate(lines.join('\n'), 1200);
  }

  function formatNewsDigest(news, title) {
    const rows = (news || []).slice(0, 5);
    if (!rows.length) return '';
    const lines = [`📰 *${escapeMarkdown(title || 'News — your holdings')}*`, ''];
    rows.forEach((n) => {
      const src = n.source ? `[${escapeMarkdown(n.source)}] ` : '';
      lines.push(`• ${src}[${escapeMarkdown(n.tag || 'News')}] *${escapeMarkdown(n.symbol)}* ${escapeMarkdown(n.title)}`);
    });
    lines.push('', '_Rule-based — not financial advice._');
    return truncate(lines.join('\n'));
  }

  function formatPktTimestamp(iso) {
    if (!iso) return 'unknown';
    try {
      return new Intl.DateTimeFormat('en-PK', {
        timeZone: 'Asia/Karachi',
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(iso));
    } catch {
      return String(iso).slice(0, 16);
    }
  }

  return { MAX_LEN, escapeMarkdown, truncate, formatMorningBrief, formatPortfolioDigest, formatNewsDigest, formatPktTimestamp };
})();
window.TelegramBriefFormat = TelegramBriefFormat;

;/* === js/services/secrets-vault.js === */
'use strict';
/** Encrypt Telegram bot token at rest (AES-GCM). Key derived from PIN when enabled. */
const SecretsVault = (() => {
  const MK = 'ledgercap_mk_v1';
  const ENC = 'ledgercap_tg_token_enc';
  const VK = 'ledgercap_vault_key_v1';
  let _sessionPin = null;

  async function _legacyMasterKey() {
    let b64 = localStorage.getItem(MK);
    if (!b64) {
      const buf = crypto.getRandomValues(new Uint8Array(32));
      b64 = btoa(String.fromCharCode(...buf));
      localStorage.setItem(MK, b64);
    }
    const raw = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    return crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt', 'decrypt']);
  }

  async function _pinDerivedKey(pin) {
    if (typeof PinVault === 'undefined' || !PinVault.deriveVaultKeyBits) return null;
    const bits = await PinVault.deriveVaultKeyBits(pin);
    if (!bits) return null;
    return crypto.subtle.importKey('raw', bits, 'AES-GCM', false, ['encrypt', 'decrypt']);
  }

  async function _masterKey() {
    if (_sessionPin && typeof PinVault !== 'undefined' && PinVault.isEnabled()) {
      const k = await _pinDerivedKey(_sessionPin);
      if (k) return k;
    }
    const stored = localStorage.getItem(VK);
    if (stored === 'pin' && _sessionPin) {
      const k = await _pinDerivedKey(_sessionPin);
      if (k) return k;
    }
    return _legacyMasterKey();
  }

  function setSessionPin(pin) {
    _sessionPin = pin ? String(pin) : null;
  }

  function clearSessionPin() {
    _sessionPin = null;
  }

  async function bindToPin(pin) {
    const plain = await getTelegramToken();
    localStorage.setItem(VK, 'pin');
    localStorage.removeItem(MK);
    setSessionPin(pin);
    if (plain) await setTelegramToken(plain);
  }

  async function rekeyAfterPinChange(pin) {
    const plain = await getTelegramToken();
    setSessionPin(pin);
    if (plain) await setTelegramToken(plain);
  }

  async function migrateLegacyToPin(pin) {
    if (localStorage.getItem(VK) === 'pin') return;
    if (!localStorage.getItem(ENC)) {
      localStorage.setItem(VK, 'pin');
      localStorage.removeItem(MK);
      return;
    }
    const legacy = await _legacyMasterKey();
    const raw = localStorage.getItem(ENC);
    let token = '';
    try {
      const { iv, data } = JSON.parse(raw);
      const dec = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: Uint8Array.from(atob(iv), (c) => c.charCodeAt(0)) },
        legacy,
        Uint8Array.from(atob(data), (c) => c.charCodeAt(0)),
      );
      token = new TextDecoder().decode(dec);
    } catch { /* empty */ }
    localStorage.setItem(VK, 'pin');
    localStorage.removeItem(MK);
    setSessionPin(pin);
    if (token) await setTelegramToken(token);
  }

  function hasTelegramToken() {
    return !!localStorage.getItem(ENC);
  }

  async function setTelegramToken(token) {
    token = String(token || '').trim();
    if (!token) {
      localStorage.removeItem(ENC);
      if (typeof State !== 'undefined') {
        State.update((s) => { delete s.settings.telegramBotToken; });
      }
      return;
    }
    const key = await _masterKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(token),
    );
    const payload = {
      iv: btoa(String.fromCharCode(...iv)),
      data: btoa(String.fromCharCode(...new Uint8Array(enc))),
    };
    localStorage.setItem(ENC, JSON.stringify(payload));
    if (typeof State !== 'undefined') {
      State.update((s) => { delete s.settings.telegramBotToken; });
    }
  }

  async function getTelegramToken() {
    const raw = localStorage.getItem(ENC);
    if (!raw) return '';
    try {
      const { iv, data } = JSON.parse(raw);
      const key = await _masterKey();
      const dec = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: Uint8Array.from(atob(iv), (c) => c.charCodeAt(0)) },
        key,
        Uint8Array.from(atob(data), (c) => c.charCodeAt(0)),
      );
      return new TextDecoder().decode(dec);
    } catch {
      return '';
    }
  }

  async function migratePlaintextToken() {
    if (typeof State === 'undefined') return;
    const plain = State.get('settings')?.telegramBotToken;
    if (!plain || hasTelegramToken()) return;
    await setTelegramToken(plain);
  }

  function stripSensitiveSettings(settings) {
    if (!settings || typeof settings !== 'object') return settings;
    const out = { ...settings };
    delete out.telegramBotToken;
    delete out.gnewsApiKey;
    if (out.telegramSyncKey) out.telegramSyncKey = '[redacted — re-enter after import]';
    return out;
  }

  return {
    setTelegramToken,
    getTelegramToken,
    hasTelegramToken,
    migratePlaintextToken,
    stripSensitiveSettings,
    setSessionPin,
    clearSessionPin,
    bindToPin,
    rekeyAfterPinChange,
    migrateLegacyToPin,
  };
})();
window.SecretsVault = SecretsVault;

;/* === js/services/history-series-service.js === */
'use strict';
/** Per-symbol + index price history for 1M/1Y/5Y charts (local storage). */
const HistorySeriesService = (() => {
  const MAX_POINTS = 1260;

  function _ensure(state) {
    if (!state.seriesHistory) state.seriesHistory = {};
    if (!state.fundNavHistory) state.fundNavHistory = {};
    return state;
  }

  function recordSymbol(symbol, price, date) {
    if (!symbol || !(price > 0)) return;
    const state = _ensure(State.get());
    const sym = symbol.toUpperCase();
    const d = date || new Date().toISOString().slice(0, 10);
    if (!state.seriesHistory[sym]) state.seriesHistory[sym] = [];
    const rows = state.seriesHistory[sym];
    const idx = rows.findIndex((r) => r.date === d);
    const row = { date: d, price: Number(price) };
    if (idx >= 0) rows[idx] = row;
    else rows.push(row);
    rows.sort((a, b) => a.date.localeCompare(b.date));
    state.seriesHistory[sym] = rows.slice(-MAX_POINTS);
    State.set(state);
  }

  function recordFromPrices(prices) {
    if (!prices || typeof prices !== 'object') return;
    Object.entries(prices).forEach(([sym, row]) => {
      const p = typeof row === 'number' ? row : row?.price;
      if (p > 0) recordSymbol(sym, p);
    });
  }

  function recordFundNav(symbol, nav, date) {
    if (!symbol || !(nav > 0)) return;
    const state = _ensure(State.get());
    const sym = symbol.toUpperCase();
    const d = date || new Date().toISOString().slice(0, 10);
    if (!state.fundNavHistory[sym]) state.fundNavHistory[sym] = [];
    const rows = state.fundNavHistory[sym];
    const idx = rows.findIndex((r) => r.date === d);
    const row = { date: d, nav: Number(nav) };
    if (idx >= 0) rows[idx] = row;
    else rows.push(row);
    rows.sort((a, b) => a.date.localeCompare(b.date));
    state.fundNavHistory[sym] = rows.slice(-MAX_POINTS);
    State.set(state);
  }

  function getSeries(symbol, rangeDays) {
    const sym = (symbol || '').toUpperCase();
    const state = State.get();
    const rows = state.seriesHistory?.[sym] || [];
    if (!rangeDays || rangeDays <= 0) return rows.map((r) => r.price);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - rangeDays);
    const cut = cutoff.toISOString().slice(0, 10);
    return rows.filter((r) => r.date >= cut).map((r) => r.price);
  }

  function getPortfolioSeries(rangeDays) {
    const hist = State.get().priceHistory || [];
    if (!rangeDays) return hist.map((h) => h.value).filter((v) => v > 0);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - rangeDays);
    const cut = cutoff.toISOString().slice(0, 10);
    return hist.filter((h) => h.date >= cut).map((h) => h.value).filter((v) => v > 0);
  }

  function ranges() {
    return [
      { id: '1w', label: '1W', days: 7 },
      { id: '1m', label: '1M', days: 30 },
      { id: '3m', label: '3M', days: 90 },
      { id: '1y', label: '1Y', days: 365 },
      { id: '5y', label: '5Y', days: 1260 },
      { id: 'all', label: 'All', days: 0 },
    ];
  }

  return { recordSymbol, recordFromPrices, recordFundNav, getSeries, getPortfolioSeries, ranges };
})();
window.HistorySeriesService = HistorySeriesService;

;/* === js/services/telegram-service.js === */
'use strict';
/**
 * Telegram Bot API — routes via LedgerCap worker in Pakistan (api.telegram.org blocked).
 * Never send full transaction history; briefs use aggregated rule output.
 */
const TelegramService = (() => {
  const DIRECT_API = 'https://api.telegram.org/bot';
  const MAX_LEN = 4096;

  function _settings() {
    return (typeof window !== 'undefined' && window.State)
      ? (window.State.get('settings') || {})
      : {};
  }

  async function _botToken() {
    if (typeof SecretsVault !== 'undefined') {
      const enc = await SecretsVault.getTelegramToken();
      if (enc) return enc;
    }
    return String(_settings().telegramBotToken || '').trim();
  }

  function isConfigured() {
    const s = _settings();
    const hasToken = (typeof SecretsVault !== 'undefined' && SecretsVault.hasTelegramToken())
      || String(s.telegramBotToken || '').trim();
    return !!(hasToken && String(s.telegramChatId || '').trim());
  }

  function proxyBase(settings) {
    settings = settings || _settings();
    if (settings.telegramUseDirect) return '';
    const raw = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(settings.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || window.LEDGERCAP_CONFIG?.legacyPsxProxyUrl || '').trim();
    return raw.replace(/\/$/, '');
  }

  function buildProxyUrl(method, settings) {
    const base = proxyBase(settings);
    return base ? `${base}/telegram/bot/${method}` : '';
  }

  async function _botRequest(method, token, payload) {
    token = String(token || '').trim();
    if (!token) return { ok: false, error: 'Bot token required' };

    const proxy = buildProxyUrl(method);
    const attempts = [];

    if (proxy) {
      attempts.push({ mode: 'proxy', url: proxy });
    }
    attempts.push({ mode: 'direct', url: `${DIRECT_API}${token}/${method}` });

    let lastErr = 'Network error';
    for (const attempt of attempts) {
      try {
        const headers = { Accept: 'application/json' };
        const opts = { method: payload == null ? 'GET' : 'POST', headers };
        if (attempt.mode === 'proxy') {
          headers['X-Telegram-Bot-Token'] = token;
        }
        if (payload != null) {
          headers['Content-Type'] = 'application/json';
          opts.body = JSON.stringify(payload);
        }
        const res = await fetch(attempt.url, opts);
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.ok) {
          return { ok: true, data, via: attempt.mode };
        }
        lastErr = data.description || data.error || `HTTP ${res.status}`;
        if (attempt.mode === 'proxy') continue;
      } catch (e) {
        lastErr = e.message || 'Network error';
        if (attempt.mode === 'proxy') continue;
      }
    }

    const hint = proxy
      ? lastErr
      : `${lastErr} — set PSX proxy URL in Settings (required in Pakistan).`;
    return { ok: false, error: hint };
  }

  function escapeMarkdown(text) {
    return TelegramBriefFormat.escapeMarkdown(text);
  }

  function truncate(text, max) {
    return TelegramBriefFormat.truncate(text, max);
  }

  function _fmtPkr(n) {
    if (typeof PsxUI !== 'undefined') return PsxUI.fmt(n);
    return '₨' + Math.round(n || 0).toLocaleString('en-PK');
  }

  function formatMorningBrief(brief, extras) {
    return TelegramBriefFormat.formatMorningBrief(brief, extras, _fmtPkr);
  }

  async function gatherBriefContext(state) {
    state = state || (typeof window !== 'undefined' && window.State ? window.State.get() : null);
    if (!state || !window.PilotEngine) return null;

    const brief = PilotEngine.buildMorningBrief(state);
    const score = PilotEngine.buildPilotScore(state);
    const summary = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    const dailyPct = summary.totalValue > 0 ? (daily / summary.totalValue) * 100 : 0;

    let portfolios = [];
    if (typeof PortfolioBuckets !== 'undefined') {
      if (PortfolioBuckets.bucketBriefRows) {
        portfolios = PortfolioBuckets.bucketBriefRows(state);
      } else {
        portfolios = PortfolioBuckets.list(state)
          .filter(b => b.builtin)
          .map(b => {
            const s = PortfolioBuckets.statsForBucket(state, b.id);
            return { name: b.name, value: s.value, pnl: s.pnl, pnlPct: s.pnlPct };
          })
          .filter(p => p.value > 0);
      }
    }

    let dividends = [];
    if (typeof DividendService !== 'undefined') {
      dividends = (DividendService.getUpcoming() || []).map(u => {
        const ex = u.exDate || u.ex_date;
        if (!ex) return null;
        const days = Math.ceil((new Date(ex) - new Date()) / 86400000);
        if (days < 0 || days > 21) return null;
        const amountPkr = u.amountPerShare ?? u.dps ?? u.amount ?? 0;
        if (!(amountPkr > 0)) return null;
        return { symbol: u.symbol, days, amountPkr };
      }).filter(Boolean);
    }

    let news = [];
    let newsSymbols = [];
    if (typeof NewsService !== 'undefined') {
      newsSymbols = NewsService.portfolioSymbols(state).map((p) => p.symbol);
      try {
        const items = await NewsService.fetchPortfolioNews(state);
        news = NewsService.toTelegramRows ? NewsService.toTelegramRows(items) : items.slice(0, 6).map(n => ({
          symbol: n.portfolioSymbol || n.symbol || '—',
          title: (n.title || '').slice(0, 72),
          tag: (n.impact?.tags || [])[0] || 'News',
          source: n.source || n.publisher || 'News',
        }));
      } catch (_) {}
    }

    const txSum = typeof TransactionLedger !== 'undefined'
      ? TransactionLedger.summary(state.transactions || []) : null;

    const usStocks = (Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(state.transactions) : [])
      .filter((h) => h.assetClass !== 'crypto')
      .map((h) => ({
        symbol: h.symbol,
        qty: h.qty,
        valuePkr: h.qty * (State.getPrice(h.symbol) || FxService.usdToPkr(h.avgCostUsd || 0)),
      }))
      .filter((h) => h.valuePkr > 0);

    return {
      brief,
      extras: {
        netWorth: summary.totalValue,
        invested: summary.invested,
        dailyPnl: daily,
        dailyPct,
        totalPnl: summary.totalReturn?.abs ?? summary.unrealized,
        totalPnlPct: summary.totalReturn?.pct,
        pilotScore: { grade: score.grade, score: score.score },
        portfolios,
        portfolioDigests: portfolios,
        usStocks,
        kse100: state.kseIndex || {},
        movers: PortfolioAnalyticsService.getHoldings(state)
          .filter((h) => h.kind === 'stock')
          .map((h) => ({ symbol: h.symbol, movePct: h.pnlPct }))
          .sort((a, b) => Math.abs(b.movePct) - Math.abs(a.movePct))
          .slice(0, 8),
        dividends,
        news,
        newsSymbols,
        taxes: txSum?.taxes,
        loggedDividends: txSum?.loggedDividends,
      },
    };
  }

  function formatIntradayDigest(signals) {
    const rows = (signals || []).slice(0, 8);
    if (!rows.length) return truncate('⚡ *LedgerCap intraday*\nNo PSX moves above thresholds.');
    const lines = ['⚡ *LedgerCap — Intraday*', ''];
    rows.forEach(s => {
      lines.push(`• *${escapeMarkdown(s.symbol)}* ${s.movePct >= 0 ? '+' : ''}${Number(s.movePct).toFixed(1)}% — ${escapeMarkdown(s.label || s.kind)}`);
    });
    lines.push('', '_Rule-based — not financial advice._');
    return truncate(lines.join('\n'));
  }

  function formatDividendReminder(events) {
    const rows = (events || []).slice(0, 6);
    if (!rows.length) return '';
    const lines = ['💰 *Dividend reminders*', ''];
    rows.forEach(e => {
      lines.push(`Ex-date in ${e.days}d: *${escapeMarkdown(e.symbol)}* — ${escapeMarkdown(_fmtPkr(e.amountPkr))}/share`);
    });
    return truncate(lines.join('\n'));
  }

  function formatPriceAlert(alert) {
    const a = alert || {};
    const dir = a.direction === 'above' ? 'crossed above' : 'crossed below';
    const stale = a.quoteLabel === 'Last close' ? ' (last close)' : '';
    return truncate([
      '🔔 *Price alert*',
      `*${escapeMarkdown(a.symbol)}* ${dir} ${escapeMarkdown(_fmtPkr(a.target))}`,
      `Now ${escapeMarkdown(_fmtPkr(a.price))}${escapeMarkdown(stale)}`,
      '_PSX session crossover — rule-based, not financial advice._',
    ].join('\n'));
  }

  async function sendMessage(text, opts) {
    opts = opts || {};
    const s = _settings();
    const token = await _botToken();
    const chatId = String(s.telegramChatId || '').trim();
    if (!token || !chatId) {
      return { ok: false, error: 'Telegram bot token and chat ID required in Settings.' };
    }
    const body = {
      chat_id: chatId,
      text: truncate(text),
      parse_mode: opts.parseMode || 'Markdown',
      disable_web_page_preview: true,
    };
    const result = await _botRequest('sendMessage', token, body);
    if (!result.ok) return { ok: false, error: result.error };
    return { ok: true, messageId: result.data?.result?.message_id, via: result.via };
  }

  async function sendTestMessage() {
    const pkt = typeof NotificationScheduler !== 'undefined'
      ? NotificationScheduler.pktParts()
      : { dateKey: new Date().toISOString().slice(0, 10) };
    const text = truncate([
      '✅ *LedgerCap test*',
      'Telegram delivery works.',
      `Date (PKT): ${escapeMarkdown(pkt.dateKey)}`,
      '_Rule-based wealth app — portfolio stays on your device._',
    ].join('\n'));
    return sendMessage(text);
  }

  async function sendMorningBriefNow() {
    const ctx = await gatherBriefContext();
    if (!ctx) return { ok: false, error: 'Brief not available' };
    const pkt = typeof NotificationScheduler !== 'undefined' ? NotificationScheduler.pktParts() : {};
    const text = formatMorningBrief(ctx.brief, {
      ...ctx.extras,
      weekdayLabel: pkt.weekday || '',
      pktLabel: pkt.hour != null ? `${pkt.hour}:${String(pkt.minute).padStart(2, '0')} PKT` : '9:00 PKT',
    });
    return sendMessage(text);
  }

  async function sendPortfolioDigestsNow() {
    const ctx = await gatherBriefContext();
    if (!ctx) return { ok: false, error: 'Brief not available' };
    const rows = ctx.extras.portfolioDigests || ctx.extras.portfolios || [];
    if (!rows.length) return { ok: false, error: 'No portfolio rows' };
    const results = [];
    for (const row of rows) {
      if (!(row.value > 0)) continue;
      const text = TelegramBriefFormat.formatPortfolioDigest(row, _fmtPkr);
      if (!text) continue;
      results.push(await sendMessage(text));
      if (!results[results.length - 1].ok) break;
    }
    const ok = results.length > 0 && results.every((r) => r.ok);
    return { ok, sent: results.length, error: ok ? undefined : results.find((r) => !r.ok)?.error };
  }

  async function sendIntradayNewsNow() {
    if (typeof NewsService === 'undefined') return { ok: false, error: 'News service not loaded' };
    const items = await NewsService.fetchPortfolioNews();
    const rows = NewsService.toTelegramRows(items);
    if (!rows.length) return { ok: false, error: 'No headlines right now' };
    const text = TelegramBriefFormat.formatNewsDigest(rows, 'Test — Din ki khabrain / Intraday news');
    if (!text) return { ok: false, error: 'Could not format news' };
    return sendMessage(text);
  }

  async function resolveChatIds() {
    const token = await _botToken();
    if (!token) return { ok: false, error: 'Bot token required' };
    const result = await _botRequest('getUpdates', token, null);
    if (!result.ok) return { ok: false, error: result.error };
    const data = result.data || {};
    const ids = [];
    const seen = new Set();
    (data.result || []).forEach(u => {
      const chat = u.message?.chat || u.my_chat_member?.chat;
      const id = chat?.id;
      if (id != null && !seen.has(id)) {
        seen.add(id);
        ids.push({ id, type: chat.type, title: chat.username || chat.first_name || chat.title || String(id) });
      }
    });
    return { ok: true, chatIds: ids, via: result.via };
  }

  async function checkProxy() {
    const base = proxyBase();
    if (!base) return { ok: false, error: 'No proxy URL configured' };
    try {
      const res = await fetch(`${base}/telegram/ping`, { headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      return { ok: !!data.ok && !!data.proxy, proxy: base, ...data };
    } catch (e) {
      return { ok: false, error: e.message || 'Proxy unreachable', proxy: base };
    }
  }

  async function buildCloudBriefPayload(state) {
    const ctx = await gatherBriefContext(state);
    if (!ctx) return null;
    return {
      updatedAt: new Date().toISOString(),
      brief: {
        urgent_signals: (ctx.brief.urgent_signals || []).slice(0, 8),
        action_counts: ctx.brief.action_counts || {},
      },
      extras: ctx.extras,
    };
  }

  async function claimDedupeKey(key, ttlSec) {
    const s = _settings();
    const syncKey = String(s.telegramSyncKey || '').trim();
    if (!syncKey) return { claimed: false, via: 'none' };
    const proxy = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(s.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || '').replace(/\/$/, '');
    if (!proxy) return { claimed: false, via: 'none' };
    try {
      const res = await fetch(`${proxy}/telegram/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-LedgerCap-Sync-Key': syncKey,
        },
        body: JSON.stringify({ key: String(key).slice(0, 120), ttlSec: ttlSec || 86400 }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { claimed: false, via: 'kv', error: data.error };
      return { claimed: !!data.claimed, via: 'kv' };
    } catch (e) {
      return { claimed: false, via: 'kv', error: e.message };
    }
  }

  async function syncBriefToCloud() {
    const s = _settings();
    const syncKey = String(s.telegramSyncKey || '').trim();
    if (!s.telegramCloudSyncEnabled || !syncKey) {
      return { ok: false, error: 'Enable cloud sync and set sync key in Settings' };
    }
    const payload = await buildCloudBriefPayload();
    if (!payload) return { ok: false, error: 'Brief not available' };
    const proxy = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(s.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || '').replace(/\/$/, '');
    if (!proxy) return { ok: false, error: 'PSX proxy URL required for cloud sync' };
    try {
      const res = await fetch(`${proxy}/telegram/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-LedgerCap-Sync-Key': syncKey,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: data.error || `HTTP ${res.status}` };
      return { ok: true, bytes: data.bytes };
    } catch (e) {
      return { ok: false, error: e.message || 'Network error' };
    }
  }

  return {
    escapeMarkdown,
    truncate,
    isConfigured,
    proxyBase,
    buildProxyUrl,
    formatMorningBrief,
    gatherBriefContext,
    formatIntradayDigest,
    formatDividendReminder,
    formatPriceAlert,
    sendMessage,
    sendTestMessage,
    sendMorningBriefNow,
    sendPortfolioDigestsNow,
    sendIntradayNewsNow,
    resolveChatIds,
    checkProxy,
    buildCloudBriefPayload,
    claimDedupeKey,
    syncBriefToCloud,
  };
})();
window.TelegramService = TelegramService;

;/* === js/services/pin-vault.js === */
'use strict';
/**
 * Client-side PIN vault — PBKDF2-SHA256 (310k iterations), never stores
 * plaintext PIN. Legacy single-SHA-256 hashes are verified once and
 * transparently upgraded on the next successful unlock.
 * Note: the PIN gates the UI; portfolio data itself is not encrypted with it.
 */
const PinVault = (() => {
  const KEY = 'ledgercap_pin_v1';
  const SESSION_KEY = 'ledgercap_pin_session';
  const BACKUP_KEY = 'ledgercap_pin_backup';
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_MS = 30000;
  const LOCKOUT_MAX_MS = 30 * 60000;
  const PBKDF2_ITER = 310000;
  const PIN_RE = /^\d{4,6}$/;

  let _hiddenAt = 0;

  function _readSession() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null') || null;
    } catch (_) {
      return null;
    }
  }

  function _writeSession(data) {
    try {
      if (!data) sessionStorage.removeItem(SESSION_KEY);
      else sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    } catch (_) {}
  }

  function getConfig() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || 'null') || { enabled: false };
    } catch (_) {
      return { enabled: false };
    }
  }

  function saveConfig(cfg) {
    localStorage.setItem(KEY, JSON.stringify(cfg));
  }

  function validateFormat(pin) {
    return PIN_RE.test(String(pin || ''));
  }

  function _hex(buf) {
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /** Legacy scheme (pre-3.44): single SHA-256 of `salt:pin`. Kept for verify-and-upgrade only. */
  async function digestPinLegacy(pin, salt) {
    const payload = `${salt}:${pin}`;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload));
    return _hex(buf);
  }

  /** Current scheme: PBKDF2-SHA256, 310k iterations. Output prefixed `v2:`. */
  async function digestPin(pin, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(String(pin)), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode(String(salt)), iterations: PBKDF2_ITER },
      keyMaterial,
      256
    );
    return 'v2:' + _hex(bits);
  }

  /** AES-256 key material for SecretsVault — separate salt domain from PIN hash. */
  async function deriveVaultKeyBits(pin) {
    const cfg = getConfig();
    if (!cfg.salt || !validateFormat(pin)) return null;
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(String(pin)), 'PBKDF2', false, ['deriveBits']);
    const vaultSalt = enc.encode(`ledgercap:vault:${cfg.salt}`);
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt: vaultSalt, iterations: PBKDF2_ITER },
      keyMaterial,
      256
    );
    return new Uint8Array(bits);
  }

  async function _matchesStored(pin, salt, storedHash) {
    if (!storedHash) return false;
    if (String(storedHash).startsWith('v2:')) {
      return (await digestPin(pin, salt)) === storedHash;
    }
    return (await digestPinLegacy(pin, salt)) === storedHash;
  }

  function isEnabled() {
    const cfg = getConfig();
    return !!(cfg.enabled && cfg.hash && cfg.salt);
  }

  function isUnlocked() {
    if (!isEnabled()) return true;
    const s = _readSession();
    return !!(s && s.unlockedAt && !shouldReLock(s));
  }

  function isDecoyMode() {
    const s = _readSession();
    return !!(s && s.decoy && isUnlocked());
  }

  function shouldReLock(session) {
    const s = session || _readSession();
    if (!s || !s.unlockedAt) return true;
    const cfg = getConfig();
    const min = cfg.autoLockMin;
    if (min == null || min <= 0) return false;
    return Date.now() - s.unlockedAt > min * 60000;
  }

  function unlock(decoy) {
    _writeSession({ unlockedAt: Date.now(), decoy: !!decoy });
  }

  function lock() {
    _writeSession(null);
  }

  function noteBackground() {
    _hiddenAt = Date.now();
  }

  function lockoutRemaining(cfg) {
    cfg = cfg || getConfig();
    if (!cfg.lockUntil) return 0;
    const left = cfg.lockUntil - Date.now();
    return left > 0 ? left : 0;
  }

  async function verifyPin(pin) {
    const cfg = getConfig();
    if (!cfg.enabled) return { ok: true, decoy: false };
    const wait = lockoutRemaining(cfg);
    if (wait > 0) return { ok: false, locked: true, waitMs: wait };

    if (!validateFormat(pin)) return { ok: false, reason: 'format' };

    if (await _matchesStored(pin, cfg.salt, cfg.hash)) {
      // Transparent upgrade: re-hash legacy SHA-256 entries with PBKDF2.
      if (!String(cfg.hash).startsWith('v2:')) cfg.hash = await digestPin(pin, cfg.salt);
      cfg.fails = 0;
      cfg.lockUntil = 0;
      cfg.lockLevel = 0;
      saveConfig(cfg);
      if (typeof SecretsVault !== 'undefined') {
        SecretsVault.setSessionPin(pin);
        SecretsVault.migrateLegacyToPin(pin).catch(() => {});
      }
      return { ok: true, decoy: false };
    }
    if (cfg.decoyHash && await _matchesStored(pin, cfg.salt, cfg.decoyHash)) {
      if (!String(cfg.decoyHash).startsWith('v2:')) cfg.decoyHash = await digestPin(pin, cfg.salt);
      cfg.fails = 0;
      cfg.lockUntil = 0;
      cfg.lockLevel = 0;
      saveConfig(cfg);
      return { ok: true, decoy: true };
    }

    cfg.fails = (cfg.fails || 0) + 1;
    let attemptsLeft = MAX_ATTEMPTS - cfg.fails;
    if (cfg.fails >= MAX_ATTEMPTS) {
      // Escalating lockout: 30s, 1m, 2m, 4m … capped at 30m.
      const level = (cfg.lockLevel || 0);
      cfg.lockUntil = Date.now() + Math.min(LOCKOUT_MS * Math.pow(2, level), LOCKOUT_MAX_MS);
      cfg.lockLevel = level + 1;
      cfg.fails = 0;
      attemptsLeft = 0;
    }
    saveConfig(cfg);
    return { ok: false, attemptsLeft, locked: attemptsLeft === 0 && lockoutRemaining(cfg) > 0 };
  }

  async function enablePin(pin, confirmPin) {
    if (pin !== confirmPin) throw new Error('PINs do not match');
    if (!validateFormat(pin)) throw new Error('Use 4–6 digits');
    const salt = crypto.randomUUID();
    const hash = await digestPin(pin, salt);
    const prev = getConfig();
    saveConfig({
      enabled: true,
      salt,
      hash,
      decoyHash: prev.decoyHash || '',
      fails: 0,
      lockUntil: 0,
      autoLockMin: prev.autoLockMin != null ? prev.autoLockMin : 5,
    });
    unlock(false);
    if (typeof SecretsVault !== 'undefined') {
      SecretsVault.bindToPin(pin).catch(() => {});
    }
  }

  async function changePin(oldPin, newPin, confirmPin) {
    const check = await verifyPin(oldPin);
    if (!check.ok) throw new Error(check.locked ? 'Too many attempts — wait 30s' : 'Current PIN incorrect');
    if (newPin !== confirmPin) throw new Error('New PINs do not match');
    if (!validateFormat(newPin)) throw new Error('Use 4–6 digits');
    const cfg = getConfig();
    const hash = await digestPin(newPin, cfg.salt);
    cfg.hash = hash;
    cfg.fails = 0;
    cfg.lockUntil = 0;
    saveConfig(cfg);
    unlock(false);
    if (typeof SecretsVault !== 'undefined') {
      SecretsVault.rekeyAfterPinChange(newPin).catch(() => {});
    }
  }

  async function disablePin(pin) {
    const check = await verifyPin(pin);
    if (!check.ok || check.decoy) throw new Error('PIN incorrect');
    localStorage.removeItem(KEY);
    _writeSession(null);
    if (typeof SecretsVault !== 'undefined') SecretsVault.clearSessionPin();
  }

  async function setDecoyPin(pin, mainPin) {
    if (!validateFormat(pin)) throw new Error('Use 4–6 digits');
    const cfg = getConfig();
    if (!cfg.enabled) throw new Error('Set main PIN first');
    if (!(await _matchesStored(mainPin, cfg.salt, cfg.hash))) throw new Error('Main PIN incorrect');
    if (pin === mainPin) throw new Error('Decoy must differ from main PIN');
    cfg.decoyHash = await digestPin(pin, cfg.salt);
    saveConfig(cfg);
  }

  async function clearDecoyPin(mainPin) {
    const cfg = getConfig();
    if (!(await _matchesStored(mainPin, cfg.salt, cfg.hash))) throw new Error('Main PIN incorrect');
    cfg.decoyHash = '';
    saveConfig(cfg);
  }

  function setAutoLock(minutes) {
    const cfg = getConfig();
    cfg.autoLockMin = minutes;
    saveConfig(cfg);
  }

  function getAutoLock() {
    const cfg = getConfig();
    return cfg.autoLockMin != null ? cfg.autoLockMin : 5;
  }

  function hasDecoy() {
    return !!getConfig().decoyHash;
  }

  function snapshotBeforeDestructive(exportJson) {
    try {
      if (exportJson) localStorage.setItem(BACKUP_KEY, exportJson);
    } catch (_) {}
  }

  return {
    KEY,
    MAX_ATTEMPTS,
    LOCKOUT_MS,
    validateFormat,
    digestPin,
    deriveVaultKeyBits,
    getConfig,
    saveConfig,
    isEnabled,
    isUnlocked,
    isDecoyMode,
    shouldReLock,
    unlock,
    lock,
    noteBackground,
    lockoutRemaining,
    verifyPin,
    enablePin,
    changePin,
    disablePin,
    setDecoyPin,
    clearDecoyPin,
    setAutoLock,
    getAutoLock,
    hasDecoy,
    snapshotBeforeDestructive,
  };
})();

window.PinVault = PinVault;

;/* === js/services/notification-scheduler.js === */
'use strict';
/** PWA-open scheduler — weekday alerts (PKT). Scheduled digests use worker cron when cloud sync on. */
const NotificationScheduler = (() => {
  const INTERVAL_MS = 15 * 60 * 1000;
  const LS_PREFIX = 'ledgercap_dedupe_';
  let _timer = null;

  function pktParts() {
    return typeof PsxSession !== 'undefined'
      ? PsxSession.pktParts()
      : { weekday: '', hour: 0, minute: 0, dateKey: '', mins: 0 };
  }

  function _isWeekday(pkt) {
    return typeof PsxSession !== 'undefined' ? PsxSession.isWeekday(pkt) : false;
  }

  function _isPsxSession(pkt) {
    return typeof PsxSession !== 'undefined' ? PsxSession.isOpen(pkt) : false;
  }

  function _settings() {
    return window.State?.get('settings') || {};
  }

  function _syncKey() {
    return String(_settings().telegramSyncKey || '').trim();
  }

  function _cloudCronActive() {
    return _syncKey() && !!_settings().telegramCloudSyncEnabled;
  }

  async function _claimOnce(key, ttlSec) {
    if (_syncKey() && window.TelegramService?.claimDedupeKey) {
      const r = await TelegramService.claimDedupeKey(key, ttlSec);
      if (r.via === 'kv') return r.claimed;
    }
    const lsKey = LS_PREFIX + key;
    if (localStorage.getItem(lsKey)) return false;
    localStorage.setItem(lsKey, String(Date.now()));
    return true;
  }

  async function _maybeMorningBrief(pkt) {
    const s = _settings();
    if (!s.telegramMorningEnabled) return;
    if (!window.TelegramService?.isConfigured()) return;
    if (_cloudCronActive()) return;
    if (!_isWeekday(pkt)) return;
    if (pkt.hour !== 9 || pkt.minute >= 15) return;
    const claimKey = `brief:${pkt.dateKey}`;
    if (!(await _claimOnce(claimKey, 90000))) return;
    const res = await TelegramService.sendMorningBriefNow();
    if (res.ok) {
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        try { new Notification('LedgerCap', { body: 'Morning brief sent to Telegram', icon: './assets/icons/icon-192.png' }); } catch (_) {}
      }
    } else {
      console.warn('LedgerCap: morning brief failed', res.error || 'unknown');
    }
  }

  async function _maybeDividendReminders(pkt) {
    const s = _settings();
    if (!s.telegramDividendEnabled || !TelegramService?.isConfigured()) return;
    if (!_isWeekday(pkt)) return;
    if (pkt.hour !== 9 || pkt.minute >= 30) return;
    const claimKey = `dividend:${pkt.dateKey}`;
    if (!(await _claimOnce(claimKey, 90000))) return;
    if (typeof DividendService === 'undefined') return;
    const upcoming = DividendService.getUpcoming() || [];
    const soon = upcoming
      .map((u) => {
        const ex = u.exDate || u.ex_date;
        if (!ex) return null;
        const days = Math.ceil((new Date(ex + 'T12:00:00') - new Date()) / 86400000);
        if (days < 0 || days > 7) return null;
        const amountPkr = u.amountPerShare ?? u.dps ?? u.amount ?? 0;
        if (!(amountPkr > 0)) return null;
        return { symbol: u.symbol, days, amountPkr };
      })
      .filter(Boolean);
    if (!soon.length) return;
    const text = TelegramService.formatDividendReminder(soon);
    if (!text) return;
    await TelegramService.sendMessage(text);
  }

  async function _maybePriceAlerts(pkt) {
    const s = _settings();
    if (!s.telegramPriceAlertsEnabled) return;
    if (!_isWeekday(pkt) || !_isPsxSession(pkt)) return;
    if (typeof PriceAlertsService !== 'undefined') {
      PriceAlertsService.checkAll({ telegramOnly: true });
    }
  }

  async function _maybeIntradayNews(pkt) {
    const s = _settings();
    if (!s.telegramIntradayNewsEnabled || !TelegramService?.isConfigured()) return;
    if (!_isWeekday(pkt) || !_isPsxSession(pkt)) return;
    const claimKey = `news:${pkt.dateKey}-${pkt.hour}`;
    if (!(await _claimOnce(claimKey, 7200))) return;
    if (typeof NewsService === 'undefined') return;
    const items = await NewsService.fetchPortfolioNews();
    if (!items.length) return;
    const fp = NewsService.newsFingerprint(items);
    const lastFp = localStorage.getItem('ledgercap_last_news_fp');
    if (fp && fp === lastFp) return;
    const rows = NewsService.toTelegramRows(items);
    const text = TelegramBriefFormat.formatNewsDigest(rows, 'Din ki khabrain / Intraday news');
    if (!text) return;
    const res = await TelegramService.sendMessage(text);
    if (res.ok && fp) localStorage.setItem('ledgercap_last_news_fp', fp);
  }

  async function tick() {
    if (typeof document !== 'undefined' && document.hidden) return;
    if (!window.TelegramService?.isConfigured()) return;
    const pkt = pktParts();
    await _maybeMorningBrief(pkt);
    await _maybeDividendReminders(pkt);
    if (_settings().telegramIntradayEnabled && _isPsxSession(pkt)) {
      const claimKey = `intraday:${pkt.dateKey}-${pkt.hour}`;
      if (await _claimOnce(claimKey, 7200) && typeof IntradaySignals !== 'undefined') {
        const signals = IntradaySignals.scan?.() || [];
        if (signals.length) {
          await TelegramService.sendMessage(TelegramService.formatIntradayDigest(signals));
        }
      }
    }
    await _maybePriceAlerts(pkt);
    await _maybeIntradayNews(pkt);
    if (_settings().telegramCloudSyncEnabled && window.TelegramService?.syncBriefToCloud) {
      await TelegramService.syncBriefToCloud().catch(() => {});
    }
  }

  function init() {
    if (_timer) return;
    tick();
    _timer = setInterval(tick, INTERVAL_MS);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) tick();
    });
  }

  function stop() {
    if (_timer) {
      clearInterval(_timer);
      _timer = null;
    }
  }

  return { init, stop, tick, pktParts };
})();
window.NotificationScheduler = NotificationScheduler;

;/* === js/services/glance-bridge.js === */
'use strict';
/** Home-screen / lock-screen glance snapshot (localStorage + BroadcastChannel). */
const GlanceBridge = (() => {
  const KEY = 'ledgercap_glance';
  const CH = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('ledgercap_glance') : null;

  function publish() {
    if (typeof State === 'undefined' || typeof PortfolioAnalyticsService === 'undefined') return;
    const s = PortfolioAnalyticsService.getSummary(State.get());
    const daily = State.calcDailyPnl();
    const settings = State.get('settings') || {};
    const payload = {
      netWorth: s.totalValue,
      dailyPnl: daily,
      dailyPct: s.totalValue > 0 ? (daily / s.totalValue) * 100 : 0,
      currency: settings.displayCurrency || 'PKR',
      usdRate: settings.usdRate || FxService?.getUsdRate?.() || 280,
      ts: Date.now(),
      live: typeof LivePriceStream !== 'undefined' ? LivePriceStream.status() : {},
    };
    try {
      localStorage.setItem(KEY, JSON.stringify(payload));
      CH?.postMessage(payload);
    } catch (_) {}
    return payload;
  }

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || 'null');
    } catch { return null; }
  }

  return { publish, read, KEY };
})();
window.GlanceBridge = GlanceBridge;

;/* === js/services/backup-crypto.js === */
'use strict';
/** PIN-encrypted .ledgercap backup (AES-GCM, same salt as PinVault). */
const BackupCrypto = (() => {
  async function _key(pin) {
    if (typeof PinVault === 'undefined' || !PinVault.deriveVaultKeyBits) return null;
    const bits = await PinVault.deriveVaultKeyBits(String(pin || ''));
    if (!bits) return null;
    return crypto.subtle.importKey('raw', bits, 'AES-GCM', false, ['encrypt', 'decrypt']);
  }

  async function encrypt(json, pin) {
    const key = await _key(pin);
    if (!key) throw new Error('PIN required');
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(json),
    );
    return JSON.stringify({
      ledgercapEnc: 1,
      iv: btoa(String.fromCharCode(...iv)),
      data: btoa(String.fromCharCode(...new Uint8Array(enc))),
    });
  }

  async function _passKey(passphrase) {
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(passphrase || '')));
    return crypto.subtle.importKey('raw', hash, 'AES-GCM', false, ['encrypt', 'decrypt']);
  }

  async function encryptWithPassphrase(json, passphrase) {
    const key = await _passKey(passphrase);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(json));
    return JSON.stringify({
      ledgercapEnc: 2,
      iv: btoa(String.fromCharCode(...iv)),
      data: btoa(String.fromCharCode(...new Uint8Array(enc))),
    });
  }

  async function decryptWithPassphrase(raw, passphrase) {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!parsed?.ledgercapEnc) return null;
    const key = parsed.ledgercapEnc === 2 ? await _passKey(passphrase) : await _key(passphrase);
    if (!key) throw new Error('Key required');
    const iv = Uint8Array.from(atob(parsed.iv), (c) => c.charCodeAt(0));
    const data = Uint8Array.from(atob(parsed.data), (c) => c.charCodeAt(0));
    const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    return new TextDecoder().decode(dec);
  }

  async function decrypt(raw, pin) {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!parsed?.ledgercapEnc) return null;
    if (parsed.ledgercapEnc === 2) return decryptWithPassphrase(parsed, pin);
    const key = await _key(pin);
    if (!key) throw new Error('PIN required');
    const iv = Uint8Array.from(atob(parsed.iv), (c) => c.charCodeAt(0));
    const data = Uint8Array.from(atob(parsed.data), (c) => c.charCodeAt(0));
    const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    return new TextDecoder().decode(dec);
  }

  return { encrypt, decrypt, encryptWithPassphrase, decryptWithPassphrase };
})();
window.BackupCrypto = BackupCrypto;

;/* === js/services/cloud-backup-service.js === */
'use strict';
/** Optional encrypted ledger backup via LedgerCap worker (sync key auth). */
const CloudBackupService = (() => {
  function _syncKey(state) {
    state = state || State.get();
    return String(state.settings?.cloudBackupKey || state.settings?.telegramSyncKey || '').trim();
  }

  function _proxyBase(state) {
    state = state || State.get();
    const raw = state.settings?.psxProxyUrl || window.LEDGERCAP_CONFIG?.psxProxyUrl || '';
    return typeof resolvePsxProxyUrl === 'function' ? resolvePsxProxyUrl(raw) : raw.replace(/\/$/, '');
  }

  async function pushBackup() {
    const key = _syncKey();
    if (!key) return { ok: false, error: 'Set Cloud sync key in Settings (Telegram sync key works)' };
    const proxy = _proxyBase();
    if (!proxy) return { ok: false, error: 'PSX proxy URL required' };
    if (typeof BackupCrypto === 'undefined') return { ok: false, error: 'Backup crypto unavailable' };
    try {
      const enc = await BackupCrypto.encryptWithPassphrase(State.exportJSON(), key);
      const res = await fetch(`${proxy}/ledger/backup`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-LedgerCap-Sync-Key': key,
        },
        body: JSON.stringify({ payload: enc, updatedAt: new Date().toISOString() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: data.error || `HTTP ${res.status} — worker may need ledger/backup route` };
      return { ok: true, updatedAt: data.updatedAt || new Date().toISOString() };
    } catch (e) {
      return { ok: false, error: e.message || 'Network error' };
    }
  }

  async function pullBackup() {
    const key = _syncKey();
    if (!key) return { ok: false, error: 'Set Cloud sync key in Settings' };
    const proxy = _proxyBase();
    if (!proxy) return { ok: false, error: 'PSX proxy URL required' };
    try {
      const res = await fetch(`${proxy}/ledger/backup`, {
        headers: { Accept: 'application/json', 'X-LedgerCap-Sync-Key': key },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: data.error || `HTTP ${res.status}` };
      if (!data.payload) return { ok: false, error: 'No backup on server' };
      const json = await BackupCrypto.decryptWithPassphrase(data.payload, key);
      if (!json) return { ok: false, error: 'Decrypt failed — wrong sync key?' };
      if (!confirm('Replace local ledger with cloud backup? Export first if unsure.')) {
        return { ok: false, error: 'Cancelled' };
      }
      const ok = State.importJSON(json);
      if (!ok) return { ok: false, error: 'Invalid backup payload' };
      return { ok: true, updatedAt: data.updatedAt };
    } catch (e) {
      return { ok: false, error: e.message || 'Network error' };
    }
  }

  return { pushBackup, pullBackup };
})();
window.CloudBackupService = CloudBackupService;

;/* === js/services/statement-export.js === */
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

  function exportCgtHtml(year) {
    year = year || _year();
    if (typeof PilotEngine === 'undefined') return false;
    const r = PilotEngine.buildCgtReport(State.get());
    const fmt = (n) => PlatformUI.fmt(n);
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>LedgerCap CGT ${year}</title>
<style>body{font-family:system-ui,sans-serif;padding:24px;color:#111;max-width:800px;margin:0 auto}
h1{font-size:1.25rem}table{width:100%;border-collapse:collapse;font-size:12px;margin-top:16px}
th,td{border:1px solid #ddd;padding:6px 8px;text-align:left}th{background:#f4f4f5}
.summary{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:16px 0}
.summary div{padding:10px;border:1px solid #e4e4e7;border-radius:8px}
@media print{body{padding:12px}}</style></head><body>
<h1>LedgerCap — Capital Gains Tax Estimate ${year}</h1>
<p>Generated ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })} PKT · ${r.disclaimer}</p>
<div class="summary">
<div><strong>Filer status</strong><br>${r.is_filer ? 'Filer' : 'Non-filer'}</div>
<div><strong>Unrealized gain</strong><br>${fmt(r.total_unrealized_gain)}</div>
<div><strong>Est. tax</strong><br>${fmt(r.total_estimated_tax)}</div>
<div><strong>Short / long lots</strong><br>${r.short_term_count} / ${r.long_term_count} (${r.short_term_rate_pct}% / ${r.long_term_rate_pct}%)</div>
<div><strong>Missing buy dates</strong><br>${r.lots_missing_date}</div>
</div>
<table><thead><tr><th>Symbol</th><th>Qty</th><th>P&amp;L</th><th>Tier</th><th>Days</th><th>Est. tax</th></tr></thead><tbody>
${r.lots.filter(l => l.pl > 0).map(l => `<tr><td>${l.symbol}</td><td>${l.quantity}</td><td>${fmt(l.pl)}</td><td>${l.tier}</td><td>${l.days_held ?? '—'}</td><td>${l.estimated_tax ? fmt(l.estimated_tax) : '—'}</td></tr>`).join('')}
</tbody></table>
<p style="font-size:11px;color:#666;margin-top:24px">Print or Save as PDF from browser. Not tax advice.</p>
<script>window.onload=function(){window.print()}</script></body></html>`;
    const w = window.open('', '_blank');
    if (!w) return false;
    w.document.write(html);
    w.document.close();
    return true;
  }

  function exportCgtPdf(year) {
    return exportCgtHtml(year);
  }

  return { exportCsv, exportHtml, exportCgtHtml, exportCgtPdf };
})();
window.StatementExport = StatementExport;

;/* === js/services/price-alerts-service.js === */
'use strict';
/** Price triggers — crossover during PSX session; toast + Telegram */
const PriceAlertsService = (() => {
  const ARM_PREFIX = 'ledgercap_alert_arm:';
  const FIRED_PREFIX = 'ledgercap_alert_fired:';
  const SEED_SOURCES = new Set(['fallback', 'seed', 'meezan_seed']);

  function _armKey(id) { return ARM_PREFIX + id; }
  function _firedKey(id) { return FIRED_PREFIX + id; }

  function list() {
    const state = State.get();
    const holdingAlerts = (state.priceAlerts || []).filter((a) => a.enabled !== false);
    const watch = (state.watchlist || [])
      .filter((w) => w.alertEnabled !== false && w.targetPrice > 0)
      .map((w) => ({
        id: `wl:${w.id}`,
        symbol: w.symbol,
        direction: 'below',
        price: w.targetPrice,
        source: 'watchlist',
      }));
    return [...holdingAlerts, ...watch];
  }

  function _quoteReliable(q) {
    if (!q?.price) return false;
    if (q.seeded) return false;
    if (SEED_SOURCES.has(q.source) && !(q.ts > 0)) return false;
    return true;
  }

  /** Arm/re-arm — fire only on crossover into hit zone */
  function _crossed(a, price) {
    const key = _armKey(a.id);
    let armed = localStorage.getItem(key);
    if (armed === null) {
      if (a.direction === 'above') armed = price < a.price ? '1' : '0';
      else armed = price > a.price ? '1' : '0';
      localStorage.setItem(key, armed);
      return false;
    }
    armed = armed === '1';
    if (a.direction === 'below') {
      if (price > a.price) {
        localStorage.setItem(key, '1');
        return false;
      }
      if (armed && price <= a.price) {
        localStorage.setItem(key, '0');
        return true;
      }
      return false;
    }
    if (price < a.price) {
      localStorage.setItem(key, '1');
      return false;
    }
    if (armed && price >= a.price) {
      localStorage.setItem(key, '0');
      return true;
    }
    return false;
  }

  function checkAll(opts) {
    opts = opts || {};
    const pkt = typeof PsxSession !== 'undefined' ? PsxSession.pktParts() : null;
    const sessionOpen = opts.forceSession || (pkt && PsxSession.isOpen(pkt));
    if (!opts.skipSession && !sessionOpen) return { skipped: 'market closed' };

    const alerts = list();
    if (!alerts.length) return { checked: 0 };

    const now = Date.now();
    const fired = JSON.parse(localStorage.getItem('ledgercap_alerts_fired') || '{}');
    let n = 0;

    alerts.forEach((a) => {
      const q = MarketDataService.getQuote(a.symbol);
      if (!_quoteReliable(q)) return;
      if (!_crossed(a, q.price)) return;

      const key = _firedKey(a.id);
      if (fired[key] && now - fired[key] < 3600000) return;
      fired[key] = now;
      n++;

      const dir = a.direction === 'above' ? 'above' : 'below';
      const stale = q.quoteLabel === 'Last close' ? ' (last close)' : '';
      const msg = `${a.symbol} ${PlatformUI.fmt(q.price)}${stale} — crossed ${dir} ${PlatformUI.fmt(a.price)}`;

      if (!opts.telegramOnly) {
        if (typeof App !== 'undefined') App.showToast(msg, 'success');
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          try { new Notification('LedgerCap alert', { body: msg, icon: './assets/icons/icon-192.png' }); } catch (_) {}
        }
        if (typeof LcPolish !== 'undefined') LcPolish.hapticConfirm();
      }

      const sendTg = opts.telegram !== false
        && typeof TelegramService !== 'undefined'
        && TelegramService.isConfigured()
        && State.get('settings')?.telegramPriceAlertsEnabled;

      if (sendTg) {
        TelegramService.sendMessage(TelegramService.formatPriceAlert({
          symbol: a.symbol,
          price: q.price,
          target: a.price,
          direction: dir,
          quoteLabel: q.quoteLabel,
        })).catch(() => {});
      }
    });

    localStorage.setItem('ledgercap_alerts_fired', JSON.stringify(fired));
    return { checked: alerts.length, fired: n };
  }

  function upsert(alert) {
    State.update((s) => {
      if (!s.priceAlerts) s.priceAlerts = [];
      const i = s.priceAlerts.findIndex((x) => x.id === alert.id);
      if (i >= 0) s.priceAlerts[i] = { ...s.priceAlerts[i], ...alert };
      else s.priceAlerts.push(alert);
    });
    try { localStorage.removeItem(_armKey(alert.id)); } catch (_) {}
  }

  function remove(id) {
    State.update((s) => {
      s.priceAlerts = (s.priceAlerts || []).filter((a) => a.id !== id);
    });
    try {
      localStorage.removeItem(_armKey(id));
      localStorage.removeItem(_firedKey(id));
    } catch (_) {}
  }

  return { list, checkAll, upsert, remove, _crossed };
})();
window.PriceAlertsService = PriceAlertsService;

;/* === js/services/live-price-stream.js === */
'use strict';
/** Live price SSE — worker push during PSX session (replaces blind poll when connected). */
const LivePriceStream = (() => {
  let _es = null;
  let _connected = false;
  let _lastTick = 0;

  function _proxyBase() {
    const settings = typeof State !== 'undefined' ? State.get('settings') || {} : {};
    const raw = typeof resolvePsxProxyUrl === 'function'
      ? resolvePsxProxyUrl(settings.psxProxyUrl)
      : (window.LEDGERCAP_CONFIG?.psxProxyUrl || '').trim();
    return raw.replace(/\/$/, '');
  }

  function _symbols() {
    const state = State.get();
    const txs = state.transactions || [];
    const holdings = Ledger.calcHoldings(txs);
    const funds = Ledger.calcFundHoldings(txs);
    const wl = (state.watchlist || []).map((w) => w.symbol);
    return [...new Set([
      ...holdings.map((h) => h.symbol),
      ...funds.map((f) => f.symbol),
      ...wl,
    ])].slice(0, 24);
  }

  function _enabled() {
    const s = State.get('settings') || {};
    if (s.liveStreamEnabled === false) return false;
    return !!_proxyBase();
  }

  function _applyQuotes(quotes) {
    if (!quotes || typeof quotes !== 'object') return 0;
    let n = 0;
    Object.entries(quotes).forEach(([sym, q]) => {
      if (!q?.price) return;
      State.updatePrice(sym, {
        price: q.price,
        prevClose: q.prevClose || q.price,
        source: q.source || 'live-sse',
        ts: q.ts || Date.now(),
      });
      n++;
    });
    if (n > 0) {
      State.recordIntradaySnapshot?.();
      State.logPortfolioSnapshot?.();
      if (typeof GlanceBridge !== 'undefined') GlanceBridge.publish();
      window.dispatchEvent(new CustomEvent('ledgercap:live-prices', { detail: { count: n, ts: Date.now() } }));
    }
    return n;
  }

  function stop() {
    if (_es) {
      _es.close();
      _es = null;
    }
    _connected = false;
  }

  function start() {
    stop();
    if (!_enabled() || typeof document !== 'undefined' && document.hidden) return { ok: false, reason: 'disabled or hidden' };
    const syms = _symbols();
    if (!syms.length) return { ok: false, reason: 'no symbols' };
    const base = _proxyBase();
    const url = `${base}/sse/prices?symbols=${encodeURIComponent(syms.join(','))}&interval=20`;
    try {
      _es = new EventSource(url);
      _es.onopen = () => { _connected = true; };
      _es.onmessage = (ev) => {
        _lastTick = Date.now();
        try {
          const data = JSON.parse(ev.data);
          _applyQuotes(data.quotes);
        } catch (_) {}
      };
      _es.onerror = () => {
        _connected = false;
        stop();
        setTimeout(() => { if (!document.hidden) start(); }, 45000);
      };
      return { ok: true, symbols: syms.length };
    } catch (e) {
      return { ok: false, reason: e.message };
    }
  }

  function status() {
    return { connected: _connected, lastTick: _lastTick, enabled: _enabled() };
  }

  function init() {
    if (typeof document === 'undefined') return;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
    window.addEventListener('ledgercap:live-prices', () => {
      if (typeof App !== 'undefined') {
        App._renderTicker?.();
        if (Navigation?.current?.() === 'portfolio' && typeof PortfolioScreen !== 'undefined') {
          PortfolioScreen.render();
        }
        if (Navigation?.current?.() === 'home' && typeof Hub !== 'undefined') Hub.render();
      }
      if (typeof PriceAlertsService !== 'undefined') PriceAlertsService.checkAll();
    });
    setTimeout(start, 2500);
  }

  return { init, start, stop, status };
})();
window.LivePriceStream = LivePriceStream;

;/* === js/services/price-health.js === */
'use strict';
/** Fallback / stale price audit + topbar banner */
const PriceHealth = (() => {
  const SEED_SOURCES = new Set(['fallback', 'seed', 'meezan_seed', 'none']);

  function _heldSymbols() {
    if (typeof State === 'undefined' || typeof Ledger === 'undefined') return [];
    const txs = State.get('transactions') || [];
    const stocks = Ledger.calcHoldings(txs).map((h) => h.symbol);
    const funds = Ledger.calcFundHoldings(txs).map((f) => f.symbol);
    return [...new Set([...stocks, ...funds])];
  }

  function audit() {
    const prices = State.get('prices') || {};
    const symbols = _heldSymbols();
    if (!symbols.length) return { total: 0, seeded: 0, stale: 0, live: 0, pctSeeded: 0, showBanner: false };

    let seeded = 0;
    let stale = 0;
    let live = 0;
    const now = Date.now();

    symbols.forEach((sym) => {
      const p = prices[sym];
      const src = p?.source || 'none';
      if (SEED_SOURCES.has(src) || !(p?.price > 0)) {
        seeded++;
        return;
      }
      if (p.ts && now - p.ts > 24 * 3600000) stale++;
      else live++;
    });

    const total = symbols.length;
    const pctSeeded = total ? seeded / total : 0;
    const showBanner = pctSeeded >= 0.4 || (stale > 0 && stale >= total * 0.3);

    return { total, seeded, stale, live, pctSeeded, showBanner };
  }

  function bannerHtml(rep) {
    const snap = typeof PriceSnapshotService !== 'undefined' ? PriceSnapshotService.freshnessLabel() : '';
    const snapStale = window._LC_SNAPSHOT_META?.stale?.psx;
    if (snap && snapStale) {
      return `<div class="lc-price-health" role="status">
        <span class="lc-price-health-msg">Market snapshot stale — ${snap}. PSX origin may be slow; tap refresh.</span>
        <button type="button" class="lc-price-health-btn" data-action="App.refreshPrices">Refresh snapshot</button>
        <button type="button" class="lc-price-health-dismiss" data-action="PriceHealth.dismiss" aria-label="Dismiss">${typeof LcIcons !== 'undefined' ? LcIcons.icon('x', 14) : '×'}</button>
      </div>`;
    }
    if (!rep?.showBanner) return '';
    const updated = window.FALLBACK_PRICES_UPDATED || 'unknown date';
    const pct = Math.round((rep.pctSeeded || 0) * 100);
    const msg = rep.pctSeeded >= 0.4
      ? `PSX origin (dps.psx.com.pk) flakes — ${pct}% on EOD snapshot (${updated}). Paid feed needed for terminal-grade live.`
      : `${rep.stale} price${rep.stale > 1 ? 's' : ''} older than 24h — refresh or accept EOD`;
    return `<div class="lc-price-health" role="status">
      <span class="lc-price-health-msg">${msg}</span>
      <button type="button" class="lc-price-health-btn" data-action="App.refreshPrices">Refresh</button>
      <button type="button" class="lc-price-health-dismiss" data-action="PriceHealth.dismiss" aria-label="Dismiss">${typeof LcIcons !== 'undefined' ? LcIcons.icon('x', 14) : '×'}</button>
    </div>`;
  }

  function mount() {
    if (localStorage.getItem('ledgercap_price_health_dismiss')) return;
    const host = document.getElementById('lc-price-health-host');
    if (!host) return;
    const rep = audit();
    host.innerHTML = bannerHtml(rep);
    host.classList.toggle('hidden', !rep.showBanner);
  }

  function dismiss() {
    try { localStorage.setItem('ledgercap_price_health_dismiss', String(Date.now())); } catch (_) {}
    const host = document.getElementById('lc-price-health-host');
    if (host) { host.innerHTML = ''; host.classList.add('hidden'); }
  }

  function clearDismiss() {
    localStorage.removeItem('ledgercap_price_health_dismiss');
  }

  return { audit, mount, dismiss, clearDismiss, bannerHtml };
})();
window.PriceHealth = PriceHealth;

;/* === js/services/intraday-signals.js === */
'use strict';
/** PSX session move scanner — rule-based intraday flags (no live API). */
const IntradaySignals = (() => {
  const MOVE_THRESHOLD = 2.0;
  const GAP_THRESHOLD = 4.0;

  function sessionMovePct(price, prevClose) {
    if (!price || !prevClose || prevClose <= 0) return 0;
    return ((price - prevClose) / prevClose) * 100;
  }

  function classifyIntraday(ctx) {
    const { symbol, movePct, plPct, morningAction, book } = ctx || {};
    if (!symbol) return null;
    const abs = Math.abs(movePct || 0);
    let kind = 'MOVE';
    let label = `${movePct >= 0 ? '+' : ''}${Number(movePct).toFixed(1)}% session`;

    if (movePct >= GAP_THRESHOLD) {
      kind = 'GAP_UP';
      label = `Gap up ${movePct.toFixed(1)}%`;
    } else if (movePct <= -GAP_THRESHOLD) {
      kind = 'GAP_DOWN';
      label = `Gap down ${movePct.toFixed(1)}%`;
    } else if (plPct != null && plPct < -8 && movePct < -2) {
      kind = 'STOP';
      label = 'Stop-loss zone — review swing book';
    } else if (plPct != null && plPct > 10 && movePct > 3) {
      kind = 'TAKE_PROFIT';
      label = 'Take-profit window';
    } else if (['STRONG BUY', 'ADD'].includes(morningAction) && movePct > 2) {
      kind = 'BREAKOUT';
      label = 'Morning buy + positive momentum';
    } else if (['SELL', 'TRIM', 'REDUCE'].includes(morningAction) && movePct < -2) {
      kind = 'CONFIRM_TRIM';
      label = 'Morning trim confirmed by price';
    }

    if (abs < MOVE_THRESHOLD && kind === 'MOVE') return null;

    return {
      symbol,
      movePct,
      label,
      kind,
      book: book || 'core',
      morningAction: morningAction || null,
      plPct: plPct ?? null,
    };
  }

  function scan(state) {
    if (typeof window !== 'undefined' && window.State && !state) state = State.get();
    state = state || {};
    if (typeof PilotEngine === 'undefined') return [];

    const brief = PilotEngine.buildMorningBrief(state);
    const morningMap = {};
    (brief.all_signals || []).forEach(s => { morningMap[s.symbol] = s.action; });

    const holdings = (typeof PortfolioAnalyticsService !== 'undefined'
      ? PortfolioAnalyticsService.getHoldings(state)
      : []).filter(h => h.kind === 'stock');

    const out = [];
    holdings.forEach(h => {
      const price = (typeof State !== 'undefined' ? State.getPrice(h.symbol) : h.price) || 0;
      const prev = (typeof State !== 'undefined' ? State.getPrevClose(h.symbol) : price) || price;
      const movePct = sessionMovePct(price, prev);
      const meta = PilotEngine.holdingMeta(h.symbol, h.broker, state);
      const sig = classifyIntraday({
        symbol: h.symbol,
        movePct,
        plPct: h.pnlPct,
        morningAction: morningMap[h.symbol],
        book: meta.book || 'core',
      });
      if (sig) out.push(sig);
    });

    return out.sort((a, b) => Math.abs(b.movePct) - Math.abs(a.movePct));
  }

  return { scan, sessionMovePct, classifyIntraday, MOVE_THRESHOLD, GAP_THRESHOLD };
})();
window.IntradaySignals = IntradaySignals;

;/* === js/services/buy-recommendations.js === */
'use strict';
/** Merge rebalance ADD rows with morning STRONG BUY / ADD — PSX 100-share lots. */
const BuyRecommendations = (() => {
  const BUY_ACTIONS = new Set(['STRONG BUY', 'ADD']);

  function roundPsxLot(shares) {
    const n = Math.floor(Number(shares) || 0);
    if (n < 100) return 100;
    return Math.floor(n / 100) * 100;
  }

  function mergeBuyRecs(rebalanceRows, morningSignals) {
    const map = new Map();

    (rebalanceRows || []).filter(r => r.action === 'ADD').forEach(r => {
      map.set(r.symbol, {
        symbol: r.symbol,
        source: 'rebalance',
        action: 'ADD',
        rationale: `Underweight by ${Math.abs(r.delta_pct || 0).toFixed(1)}% vs target`,
        ltp: r.ltp,
        suggested_shares: r.suggested_shares,
        delta_value: Math.abs(r.delta_value || 0),
        book: r.book,
      });
    });

    (morningSignals || []).filter(s => BUY_ACTIONS.has(s.action)).forEach(s => {
      if (map.has(s.symbol)) {
        const row = map.get(s.symbol);
        row.source = 'both';
        row.morning_action = s.action;
        row.rationale = `${row.rationale}; ${(s.rationale || '').slice(0, 120)}`;
      } else {
        map.set(s.symbol, {
          symbol: s.symbol,
          source: 'morning',
          action: s.action,
          rationale: s.rationale,
          ltp: s.ltp,
          morning_action: s.action,
          book: s.book,
          suggested_shares: 0,
          delta_value: 0,
        });
      }
    });

    return [...map.values()];
  }

  function getRecommendations(state) {
    if (typeof window !== 'undefined' && window.State && !state) state = State.get();
    if (typeof PilotEngine === 'undefined') return [];

    const rebalance = PilotEngine.buildRebalancePlan(state);
    const brief = PilotEngine.buildMorningBrief(state);
    const merged = mergeBuyRecs(rebalance.rows, brief.all_signals);

    return merged.map(row => {
      const ltp = row.ltp || (typeof State !== 'undefined' ? State.getPrice(row.symbol) : 0) || 100;
      const basis = row.suggested_shares > 0
        ? row.suggested_shares
        : roundPsxLot((row.delta_value || 50000) / ltp);
      const shares = roundPsxLot(basis);
      return { ...row, buy_shares: shares, buy_pkr: shares * ltp, ltp };
    }).sort((a, b) => b.buy_pkr - a.buy_pkr);
  }

  return { getRecommendations, roundPsxLot, mergeBuyRecs, BUY_ACTIONS };
})();
window.BuyRecommendations = BuyRecommendations;

;/* === js/services/risk-audit-service.js === */
'use strict';
/** Rule-based portfolio risk report — pure logic, no network. */
const RiskAuditService = (() => {
  function severityFromPct(pct, warn, crit) {
    if (pct >= crit) return 'critical';
    if (pct >= warn) return 'high';
    if (pct >= warn * 0.75) return 'medium';
    return 'low';
  }

  function buildReport(deps) {
    deps = deps || {};
    const intel = deps.intel || { insights: [], scores: {}, summary: {} };
    const summary = intel.summary || deps.summary || {};
    const holdings = deps.holdings || [];
    const cgt = deps.cgt || {};
    const rebalance = deps.rebalance || {};
    const pilotScore = deps.pilotScore || {};
    const findings = [];

    (summary.sectorAllocation || []).forEach(s => {
      if (s.pct > 25) {
        findings.push({
          id: `sector-${s.sector}`,
          category: 'sector',
          severity: severityFromPct(s.pct, 25, 35),
          title: `${s.sector} ${s.pct.toFixed(0)}%`,
          detail: 'Sector concentration above 25% guideline.',
          action: 'Trim overweight sector or add diversifiers.',
        });
      }
    });

    const top = holdings[0];
    if (top && top.allocPct > 15) {
      findings.push({
        id: `name-${top.symbol}`,
        category: 'concentration',
        severity: severityFromPct(top.allocPct, 20, 30),
        title: `${top.symbol} ${top.allocPct.toFixed(0)}% of portfolio`,
        detail: 'Single-name concentration risk.',
        action: 'Review trim vs conviction in Research.',
      });
    }

    const brokers = summary.brokers || {};
    const brokerTotal = Object.values(brokers).reduce((a, v) => a + v, 0) || 1;
    Object.entries(brokers).forEach(([name, val]) => {
      const pct = (val / brokerTotal) * 100;
      if (pct > 55) {
        findings.push({
          id: `broker-${name}`,
          category: 'broker',
          severity: pct > 75 ? 'high' : 'medium',
          title: `${name} ${pct.toFixed(0)}% at one broker`,
          detail: 'Operational and custody concentration.',
          action: 'Consider splitting new buys across brokers.',
        });
      }
    });

    if ((cgt.short_term_count || 0) > 0) {
      findings.push({
        id: 'cgt-short',
        category: 'tax',
        severity: 'medium',
        title: `${cgt.short_term_count} lot(s) short-term CGT`,
        detail: 'Unrealized gains may attract higher CGT if sold within 365 days.',
        action: 'Verify tiers in Tax & Rebalance before trimming.',
      });
    }

    if ((cgt.lots_missing_date || 0) > 0) {
      findings.push({
        id: 'cgt-missing',
        category: 'tax',
        severity: 'low',
        title: `${cgt.lots_missing_date} position(s) missing buy date`,
        detail: 'CGT tier unknown until acquisition dates are set.',
        action: 'Open Tax & Rebalance → update holding dates.',
      });
    }

    if ((rebalance.drift_count || 0) > 0) {
      findings.push({
        id: 'drift',
        category: 'allocation',
        severity: rebalance.drift_count > 3 ? 'high' : 'medium',
        title: `${rebalance.drift_count} target weight drift(s)`,
        detail: rebalance.summary || 'Positions >3% from target.',
        action: 'Set target weights in Pilot Tools or review Buy more tab.',
      });
    }

    (intel.insights || []).filter(i => i.severity === 'high').forEach((i, idx) => {
      findings.push({
        id: `intel-${idx}`,
        category: 'insight',
        severity: 'high',
        title: (i.text || '').slice(0, 80),
        detail: i.text,
        action: i.action,
      });
    });

    const rafi = deps.rafiStocks || [];
    const akd = deps.akdStocks || [];
    const nonShariah = holdings.filter(h => {
      if (h.kind !== 'stock') return false;
      const sd = [...rafi, ...akd].find(s => s.symbol === h.symbol);
      return sd && sd.isShariah === false;
    });
    if (nonShariah.length) {
      findings.push({
        id: 'shariah',
        category: 'compliance',
        severity: 'low',
        title: `${nonShariah.length} conventional holding(s)`,
        detail: nonShariah.map(h => h.symbol).join(', '),
        action: 'Screen in Research or Zakat view.',
      });
    }

    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    findings.sort((a, b) => (order[a.severity] ?? 9) - (order[b.severity] ?? 9));

    return {
      findings,
      counts: {
        critical: findings.filter(f => f.severity === 'critical').length,
        high: findings.filter(f => f.severity === 'high').length,
        medium: findings.filter(f => f.severity === 'medium').length,
        low: findings.filter(f => f.severity === 'low').length,
      },
      pilotScore,
      scores: intel.scores || {},
      summary: {
        totalValue: summary.totalValue,
        portfolioDivYield: summary.portfolioDivYield,
      },
      disclaimer: 'Rule-based risk checklist — not financial advice.',
    };
  }

  return { buildReport, severityFromPct };
})();
window.RiskAuditService = RiskAuditService;

;/* === js/engines/pilot-engine.js === */
'use strict';
/**
 * Portfolio Pilot rule engine — ported for LedgerCap (offline, no AI API).
 * Morning brief, Core/Swing books, CGT, rebalance, screener, pilot score.
 */
const PilotEngine = (() => {
  const SECTOR_PE_MEDIAN = {
    Banking: 8, Cement: 11, 'Oil & Gas': 7, Technology: 18, Textile: 12,
    Power: 9, Chemical: 10, Food: 14, Pharmaceutical: 16, Engineering: 13,
    Securities: 8, Other: 12, Unclassified: 12,
  };

  const ACTION_ORDER = ['SELL', 'REDUCE', 'TRIM', 'WATCH', 'HOLD', 'ADD', 'STRONG BUY'];

  function settings(state) {
    const s = state || State.get();
    return {
      concentrationThresholdPct: s.pilotSettings?.concentrationThresholdPct ?? 20,
      corePeDiscountPct: s.pilotSettings?.corePeDiscountPct ?? 15,
      swingRsiOversold: s.pilotSettings?.swingRsiOversold ?? 35,
      swingRsiOverbought: s.pilotSettings?.swingRsiOverbought ?? 65,
      isFiler: s.pilotSettings?.isFiler !== false,
      cashBalancePkr: s.pilotSettings?.cashBalancePkr ?? s.settings?.cashBalance ?? 0,
      goldPricePerGram: s.pilotSettings?.goldPricePerGram ?? s.settings?.goldPricePerGram ?? 18000,
    };
  }

  function holdingMeta(symbol, broker, state) {
    const s = state || State.get();
    const key = `${symbol}_${broker || 'default'}`;
    return (s.holdingMeta || {})[key] || { book: 'core', targetWeight: null, acquiredAt: null };
  }

  function setHoldingMeta(symbol, broker, patch) {
    State.update(st => {
      if (!st.holdingMeta) st.holdingMeta = {};
      const key = `${symbol}_${broker || 'default'}`;
      st.holdingMeta[key] = { ...holdingMeta(symbol, broker, st), ...patch };
    });
  }

  function isMutualFund(symbol) {
    return !!(window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol)
      || /^(KMIF|MIF|MIIF|MAAF|MBF|MDAAF)/i.test(symbol);
  }

  function sectorFor(symbol) {
    const meta = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(x => x.symbol === symbol);
    return meta?.sector || 'Other';
  }

  function sectorMedianPe(sector) {
    return SECTOR_PE_MEDIAN[sector] || 12;
  }

  function scoreToAction(score) {
    if (score >= 75) return 'STRONG BUY';
    if (score >= 60) return 'ADD';
    if (score >= 45) return 'HOLD';
    if (score >= 35) return 'WATCH';
    if (score >= 25) return 'TRIM';
    if (score >= 15) return 'REDUCE';
    return 'SELL';
  }

  function buildTechnical(symbol, price, prevClose) {
    const seed = (window.PRICE_CHANGE_SEED || {})[symbol] || {};
    const dayChg = prevClose > 0 ? ((price - prevClose) / prevClose) * 100 : (seed.weekly || 0);
    const yearly = seed.yearly || 0;
    const pos52 = Math.max(5, Math.min(95, 50 + yearly / 2));
    const rsi = Math.max(18, Math.min(82, 50 - (seed.monthly || 0) * 1.2));
    const ma20 = price * (1 - (seed.monthly || 0) / 200);
    return { rsi_14: rsi, ma_20: ma20, position_in_52w_pct: pos52, day_change_pct: dayChg };
  }

  function scoreCore(ctx) {
    let score = 50;
    const reasons = [];
    const cfg = ctx.settings;

    if (ctx.weightPct > cfg.concentrationThresholdPct) {
      score -= 25;
      reasons.push({ rule: 'concentration', detail: `Position ${ctx.weightPct.toFixed(1)}% exceeds ${cfg.concentrationThresholdPct}% threshold`, score_delta: -25 });
    }

    const pe = ctx.fundamentals?.pe;
    const median = sectorMedianPe(ctx.sector);
    if (pe && pe < median * (1 - cfg.corePeDiscountPct / 100)) {
      score += 15;
      reasons.push({ rule: 'value_pe', detail: `P/E ${pe.toFixed(1)} below sector median ${median}`, score_delta: 15 });
    } else if (pe && pe > median * 1.3) {
      score -= 10;
      reasons.push({ rule: 'expensive_pe', detail: `P/E ${pe.toFixed(1)} above sector median ${median}`, score_delta: -10 });
    }

    if (ctx.technical.position_in_52w_pct < 40) {
      score += 10;
      reasons.push({ rule: '52w_value', detail: `Lower ${ctx.technical.position_in_52w_pct.toFixed(0)}% of 52-week range`, score_delta: 10 });
    } else if (ctx.technical.position_in_52w_pct > 85) {
      score -= 8;
      reasons.push({ rule: '52w_high', detail: 'Near 52-week high — limited upside', score_delta: -8 });
    }

    const growth = ctx.fundamentals?.profitGrowth;
    if (growth > 10) {
      score += 12;
      reasons.push({ rule: 'eps_growth', detail: `Profit growth +${growth.toFixed(1)}% YoY`, score_delta: 12 });
    } else if (growth < -5) {
      score -= 12;
      reasons.push({ rule: 'eps_decline', detail: `Profit growth ${growth.toFixed(1)}% YoY`, score_delta: -12 });
    }

    const yld = ctx.fundamentals?.divYield;
    if (yld > 5) {
      score += 8;
      reasons.push({ rule: 'dividend_yield', detail: `Dividend yield ${yld.toFixed(1)}%`, score_delta: 8 });
    }

    if (ctx.plPct > 15) {
      score -= ctx.daysHeld != null && ctx.daysHeld < 730 ? 12 : 5;
      reasons.push({
        rule: 'cgt_awareness',
        detail: ctx.daysHeld != null && ctx.daysHeld < 730
          ? `Held ${ctx.daysHeld}d with +${ctx.plPct.toFixed(1)}% — short-term CGT applies`
          : `+${ctx.plPct.toFixed(1)}% gain — review CGT before trimming`,
        score_delta: -5,
      });
    }

    return { score: Math.max(0, Math.min(100, score)), reasons, action: scoreToAction(score) };
  }

  function scoreSwing(ctx) {
    let score = 50;
    const reasons = [];
    const cfg = ctx.settings;
    const t = ctx.technical;

    if (t.rsi_14 < cfg.swingRsiOversold) {
      score += 20;
      reasons.push({ rule: 'rsi_oversold', detail: `RSI ${t.rsi_14.toFixed(0)} — oversold`, score_delta: 20 });
    } else if (t.rsi_14 > cfg.swingRsiOverbought) {
      score -= 20;
      reasons.push({ rule: 'rsi_overbought', detail: `RSI ${t.rsi_14.toFixed(0)} — overbought`, score_delta: -20 });
    }

    if (t.ma_20 && ctx.price > t.ma_20 * 1.02) {
      score += 8;
      reasons.push({ rule: 'above_ma20', detail: `Above 20-day MA (${t.ma_20.toFixed(2)})`, score_delta: 8 });
    } else if (t.ma_20 && ctx.price < t.ma_20 * 0.96) {
      score -= 8;
      reasons.push({ rule: 'below_ma20', detail: `Below 20-day MA (${t.ma_20.toFixed(2)})`, score_delta: -8 });
    }

    if (t.day_change_pct < -4) {
      score += 6;
      reasons.push({ rule: 'gap_down', detail: `Gap down ${t.day_change_pct.toFixed(1)}% — mean reversion watch`, score_delta: 6 });
    }

    if (ctx.plPct < -8) {
      score -= 25;
      reasons.push({ rule: 'stop_loss', detail: `Unrealized loss ${ctx.plPct.toFixed(1)}% — stop discipline`, score_delta: -25 });
    }

    if (ctx.plPct > 10 && t.position_in_52w_pct > 80) {
      score -= 15;
      reasons.push({ rule: 'take_profit', detail: `+${ctx.plPct.toFixed(1)}% near 52w high — consider trim`, score_delta: -15 });
    }

    return { score: Math.max(0, Math.min(100, score)), reasons, action: scoreToAction(score) };
  }

  function evaluateRow(row, totalValue, cfg, state) {
    if (row.kind === 'fund' || isMutualFund(row.symbol)) {
      const action = row.pnlPct < -2 ? 'WATCH' : 'HOLD';
      return {
        symbol: row.symbol, book: 'core', action, score: 50,
        rationale: `${row.symbol} mutual fund — track NAV, long-term hold`,
        reasons: [{ rule: 'mutual_fund_nav', detail: 'Fund units — equity technicals not applied', score_delta: 0 }],
        ltp: row.price, pl_pct: row.pnlPct, weight_pct: totalValue > 0 ? (row.value / totalValue) * 100 : 0,
        is_mutual_fund: true,
      };
    }

    const meta = holdingMeta(row.symbol, row.broker, state);
    const f = (window.FUNDAMENTALS_DB || {})[row.symbol] || {};
    const sector = row.sector || sectorFor(row.symbol);
    const prev = State.getPrice(row.symbol);
    const quote = State.get().prices?.[row.symbol];
    const technical = buildTechnical(row.symbol, row.price, quote?.prevClose || prev);
    let daysHeld = null;
    if (meta.acquiredAt) {
      const acq = new Date(meta.acquiredAt);
      if (!isNaN(acq)) daysHeld = Math.floor((Date.now() - acq.getTime()) / 86400000);
    }

    const ctx = {
      settings: cfg,
      weightPct: totalValue > 0 ? (row.value / totalValue) * 100 : 0,
      plPct: row.pnlPct,
      price: row.price,
      fundamentals: f,
      sector,
      technical,
      daysHeld,
    };

    const scored = meta.book === 'swing' ? scoreSwing(ctx) : scoreCore(ctx);
    const top = scored.reasons.slice(0, 2).map(r => r.detail).join('; ');
    const rationale = top
      ? `${top}; ${row.pnlPct.toFixed(1)}% P&L`
      : `${row.symbol} position, ${row.pnlPct.toFixed(1)}% P&L`;

    return {
      symbol: row.symbol, book: meta.book || 'core', action: scored.action, score: scored.score,
      rationale, reasons: scored.reasons, ltp: row.price, pl_pct: row.pnlPct,
      weight_pct: ctx.weightPct, is_mutual_fund: false, broker: row.broker,
    };
  }

  function buildMorningBrief(state) {
    state = state || State.get();
    const cfg = settings(state);
    const holdings = PortfolioAnalyticsService.getHoldings(state);
    const total = holdings.reduce((a, h) => a + h.value, 0) || 1;
    const signals = holdings.map(h => evaluateRow(h, total, cfg, state));
    const core = signals.filter(s => s.book !== 'swing' && !s.is_mutual_fund);
    const swing = signals.filter(s => s.book === 'swing');
    const urgent = [...signals].sort((a, b) => ACTION_ORDER.indexOf(a.action) - ACTION_ORDER.indexOf(b.action)).slice(0, 5);

    const counts = {};
    signals.forEach(s => { counts[s.action] = (counts[s.action] || 0) + 1; });

    return {
      date: new Date().toISOString().slice(0, 10),
      generated_at: new Date().toISOString(),
      core_signals: core,
      swing_signals: swing,
      all_signals: signals,
      urgent_signals: urgent,
      action_counts: counts,
      macro_notes: [
        `SBP policy context — review rate-sensitive banks if policy shifts.`,
        `USD/PKR ${state.settings?.usdRate || 280} — imported cost pressure on industrials.`,
      ],
      ipo_reminders: (state.ipoEvents || []).filter(e => {
        const d = e.subscription_end || e.listing_date;
        if (!d) return false;
        const diff = (new Date(d) - new Date()) / 86400000;
        return diff >= 0 && diff <= 14;
      }).map(e => `${e.company}${e.symbol ? ' (' + e.symbol + ')' : ''} — check subscription window`),
      disclaimer: 'Rule-based research summary only — not financial advice.',
    };
  }

  function buildCgtReport(state) {
    state = state || State.get();
    const cfg = settings(state);
    const shortRate = cfg.isFiler ? 15 : 20;
    const longRate = cfg.isFiler ? 0 : 10;
    const holdings = PortfolioAnalyticsService.getHoldings(state).filter(h => h.kind === 'stock');
    const lots = [];
    let totalGain = 0, totalTax = 0, missing = 0, st = 0, lt = 0;

    holdings.forEach(h => {
      const meta = holdingMeta(h.symbol, h.broker, state);
      if (h.pnl <= 0) {
        lots.push({ symbol: h.symbol, quantity: h.quantity, pl: h.pnl, pl_pct: h.pnlPct, tier: 'no_gain', estimated_tax: 0, days_held: null, acquired_at: meta.acquiredAt });
        if (!meta.acquiredAt) missing++;
        return;
      }
      let days = null, tier = 'unknown', rate = null;
      if (meta.acquiredAt) {
        days = Math.floor((Date.now() - new Date(meta.acquiredAt).getTime()) / 86400000);
        if (days < 365) { tier = 'short'; rate = shortRate; st++; }
        else { tier = 'long'; rate = longRate; lt++; }
      } else { missing++; }
      const tax = rate != null ? h.pnl * rate / 100 : 0;
      if (rate != null) totalTax += tax;
      totalGain += h.pnl;
      lots.push({ symbol: h.symbol, quantity: h.quantity, pl: h.pnl, pl_pct: h.pnlPct, tier, tax_rate_pct: rate, estimated_tax: tax, days_held: days, acquired_at: meta.acquiredAt });
    });

    return {
      lots, total_unrealized_gain: totalGain, total_estimated_tax: totalTax,
      lots_missing_date: missing, short_term_count: st, long_term_count: lt,
      short_term_rate_pct: shortRate, long_term_rate_pct: longRate, is_filer: cfg.isFiler,
      disclaimer: 'Estimated CGT only — verify with your tax advisor. Pakistan rules change; 365-day holding applies.',
    };
  }

  function buildRebalancePlan(state) {
    state = state || State.get();
    const holdings = PortfolioAnalyticsService.getHoldings(state).filter(h => h.kind === 'stock');
    const total = holdings.reduce((a, h) => a + h.value, 0);
    if (total <= 0) return { total_value: 0, rows: [], summary: 'No holdings loaded.', drift_count: 0 };

    const bySym = {};
    holdings.forEach(h => {
      const meta = holdingMeta(h.symbol, h.broker, state);
      if (!bySym[h.symbol]) bySym[h.symbol] = { value: 0, target: meta.targetWeight, book: meta.book, ltp: h.price };
      bySym[h.symbol].value += h.value;
      if (meta.targetWeight != null) bySym[h.symbol].target = meta.targetWeight;
    });

    const rows = [];
    let drift = 0;
    Object.entries(bySym).forEach(([symbol, d]) => {
      const actual = (d.value / total) * 100;
      const target = d.target;
      let action = 'OK', delta = 0, deltaVal = 0;
      if (target != null) {
        delta = actual - target;
        deltaVal = (delta / 100) * total;
        if (delta > 3) { action = 'TRIM'; drift++; }
        else if (delta < -3) { action = 'ADD'; drift++; }
      } else {
        action = actual > 25 ? 'REVIEW' : 'OK';
      }
      const shares = d.ltp > 0 ? Math.max(100, Math.floor(Math.abs(deltaVal) / d.ltp / 100) * 100) : 0;
      rows.push({
        symbol, book: d.book || 'core', actual_pct: actual, target_pct: target,
        delta_pct: target != null ? delta : null, delta_value: deltaVal, action,
        ltp: d.ltp, suggested_shares: shares, suggested_pkr: shares * d.ltp,
      });
    });

    return {
      total_value: total, rows: rows.sort((a, b) => Math.abs(b.delta_pct || 0) - Math.abs(a.delta_pct || 0)),
      drift_count: drift,
      summary: drift ? `${drift} position(s) drifted >3% from target weights.` : 'Portfolio weights within target bands.',
    };
  }

  function buildPilotScore(state) {
    state = state || State.get();
    const brief = buildMorningBrief(state);
    const intel = PortfolioAnalyticsService.getIntelligence(state);
    let divPts = 25, riskPts = 25, sigPts = 25, compPts = 25;
    const highlights = [], improvements = [];

    const topSector = intel.summary?.sectorAllocation?.[0];
    if (topSector && topSector.pct > 35) {
      divPts -= 10;
      improvements.push(`Top sector ${topSector.sector} at ${topSector.pct.toFixed(0)}% — consider trimming.`);
    } else highlights.push('Sector diversification looks reasonable.');

    const urgent = brief.urgent_signals.filter(s => ['SELL', 'REDUCE', 'TRIM'].includes(s.action)).length;
    if (urgent === 0) { sigPts = 25; highlights.push('No urgent trim/sell signals.'); }
    else if (urgent <= 2) { sigPts = 18; improvements.push(`${urgent} position(s) flagged for review.`); }
    else { sigPts = 8; improvements.push(`${urgent} urgent signals — open Signals tab.`); }

    const highRisk = intel.insights.filter(i => i.severity === 'high').length;
    riskPts = highRisk === 0 ? 25 : highRisk <= 2 ? 15 : 8;
    if (highRisk) improvements.push(`${highRisk} high-severity insight(s) on dashboard.`);

    compPts = 25;
    highlights.push('Shariah screening available in Research & Zakat.');

    const score = divPts + riskPts + sigPts + compPts;
    const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : score >= 40 ? 'D' : 'F';
    return { score, grade, diversification_pts: divPts, risk_pts: riskPts, signals_pts: sigPts, compliance_pts: compPts, highlights, improvements };
  }

  function runScreener(filters, state) {
    state = state || State.get();
    filters = filters || {};
    const holdings = new Set(PortfolioAnalyticsService.getHoldings(state).map(h => h.symbol));
    const rows = [];
    Object.entries(window.FUNDAMENTALS_DB || {}).forEach(([symbol, f]) => {
      const price = State.getPrice(symbol) || 100;
      const tech = buildTechnical(symbol, price, price);
      if (filters.min_yield != null && (f.divYield || 0) < filters.min_yield) return;
      if (filters.max_pe != null && f.pe > filters.max_pe) return;
      if (filters.min_rsi != null && tech.rsi_14 < filters.min_rsi) return;
      if (filters.max_rsi != null && tech.rsi_14 > filters.max_rsi) return;
      if (filters.portfolio_only && !holdings.has(symbol)) return;
      rows.push({
        symbol, ltp: price, pe_ratio: f.pe, dividend_yield_pct: f.divYield,
        rsi_14: tech.rsi_14, sector: sectorFor(symbol), in_portfolio: holdings.has(symbol),
        risk_level: f.debtToEquity > 0.8 ? 'High' : f.profitGrowth < 0 ? 'Elevated' : 'Moderate',
      });
    });
    return { rows: rows.sort((a, b) => (b.dividend_yield_pct || 0) - (a.dividend_yield_pct || 0)), scanned: Object.keys(window.FUNDAMENTALS_DB || {}).length };
  }

  function calculator(kind, input) {
    input = input || {};
    if (kind === 'cagr') {
      const p = input.principal || 0, fv = input.final_value || 0, y = input.years || 1;
      const cagr = p > 0 && y > 0 ? (Math.pow(fv / p, 1 / y) - 1) * 100 : 0;
      return { kind, result: cagr, label: 'CAGR %', detail: `${p.toLocaleString()} → ${fv.toLocaleString()} over ${y}y` };
    }
    if (kind === 'position_size') {
      const risk = input.risk_pkr || 10000, stop = input.stop_loss_pct || 5, price = input.price || 100;
      const shares = stop > 0 ? Math.floor((risk / (price * stop / 100)) / 100) * 100 : 0;
      return { kind, result: shares, label: 'Shares (PSX lot)', detail: `Risk ₨${risk.toLocaleString()} at ${stop}% stop` };
    }
    if (kind === 'sip_future') {
      const m = input.monthly || 0, r = (input.rate_pct || 12) / 100 / 12, n = (input.years || 10) * 12;
      const fv = r > 0 ? m * ((Math.pow(1 + r, n) - 1) / r) : m * n;
      return { kind, result: fv, label: 'Future value ₨', detail: `₨${m.toLocaleString()}/mo for ${input.years || 10}y @ ${input.rate_pct || 12}%` };
    }
    return { kind, result: 0, label: '—', detail: '' };
  }

  function portfolioSummary(state) {
    const holdings = PortfolioAnalyticsService.getHoldings(state);
    const total = holdings.reduce((a, h) => a + h.value, 0);
    const cost = holdings.reduce((a, h) => a + h.costBasis, 0);
    let coreVal = 0, swingVal = 0;
    holdings.forEach(h => {
      const book = holdingMeta(h.symbol, h.broker, state).book;
      if (book === 'swing') swingVal += h.value; else coreVal += h.value;
    });
    return {
      total_value: total, total_cost: cost, total_pl: total - cost,
      total_pl_pct: cost > 0 ? ((total - cost) / cost) * 100 : 0,
      core_pct: total > 0 ? (coreVal / total) * 100 : 0,
      swing_pct: total > 0 ? (swingVal / total) * 100 : 0,
      holdings_count: holdings.length,
    };
  }

  return {
    settings, holdingMeta, setHoldingMeta, isMutualFund,
    buildMorningBrief, buildCgtReport, buildRebalancePlan, buildPilotScore,
    buildTechnical,
    runScreener, calculator, portfolioSummary, evaluateRow, scoreToAction,
  };
})();
window.PilotEngine = PilotEngine;

;/* === js/ui/charts.js === */
'use strict';
const Charts = (() => {

  function _chartColor(fallback) {
    if (typeof document !== 'undefined' && document.body) {
      const v = getComputedStyle(document.body).getPropertyValue('--lc-chart-stroke').trim()
        || getComputedStyle(document.body).getPropertyValue('--psx-accent').trim();
      if (v) return v;
    }
    return fallback || '#0a84ff';
  }

  function _gradId(color) {
    return 'lg_' + String(color || _chartColor()).replace(/[^a-zA-Z0-9]/g, '');
  }

  function lineChart(data, opts) {
    opts = opts || {};
    const color = opts.color || _chartColor();
    const height = opts.height || 100;
    const fill = opts.fill !== false;
    const width = 400;
    const label = opts.ariaLabel || 'Line chart';

    if (!data || data.length < 2) {
      return `<div class="lc-chart-empty" style="height:${height}px">Not enough data for chart</div>`;
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padY = height * 0.08;
    const usableH = height - padY * 2;
    const gid = _gradId(color);

    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = padY + usableH - ((v - min) / range) * usableH;
      return [x, y];
    });

    const linePath = pts.map((p, i) => (i === 0 ? `M${p[0].toFixed(1)},${p[1].toFixed(1)}` : `L${p[0].toFixed(1)},${p[1].toFixed(1)}`)).join(' ');
    const fillPath = fill ? `${linePath} L${width},${height} L0,${height} Z` : '';

    return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="lc-chart-svg" style="width:${opts.width ? opts.width + 'px' : '100%'};height:${height}px;display:block;" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      ${fill ? `<path d="${fillPath}" fill="url(#${gid})" />` : ''}
      <path d="${linePath}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  function lineChartBlock(data, opts) {
    opts = opts || {};
    const caption = opts.caption || '';
    const sub = opts.subcaption || '';
    const subCls = opts.subcaptionCls || '';
    const chart = lineChart(data, opts);
    if (!caption && !sub) return chart;
    return `<div class="lc-chart-inner">${chart}
      <div class="lc-chart-caption">
        <span>${caption}</span>
        ${sub ? `<span class="lc-chart-caption-sub ${subCls}">${sub}</span>` : ''}
      </div>
    </div>`;
  }

  function barChart(data, opts) {
    opts = opts || {};
    const color = opts.color || _chartColor();
    const height = opts.height || 80;
    const width = 400;
    const gap = 3;
    const label = opts.ariaLabel || 'Bar chart';

    if (!data || data.length === 0) {
      return `<div class="lc-chart-empty" style="height:${height}px">No data to chart</div>`;
    }

    const max = Math.max(...data.map(v => Math.abs(v)), 1);
    const barW = (width - gap * (data.length - 1)) / data.length;

    const bars = data.map((v, i) => {
      const barH = Math.max(2, (Math.abs(v) / max) * height);
      const x = i * (barW + gap);
      const y = height - barH;
      const fill = v >= 0 ? color : '#ef4444';
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="2" fill="${fill}"/>`;
    }).join('');

    return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="lc-chart-svg" style="width:${opts.width ? opts.width + 'px' : '100%'};height:${height}px;display:block;" role="img" aria-label="${label}">${bars}</svg>`;
  }

  function ringProgress(pct, color, size, strokeWidth) {
    pct = Math.min(100, Math.max(0, pct || 0));
    color = color || _chartColor();
    size = size || 56;
    strokeWidth = strokeWidth || 5;
    const r = (size - strokeWidth) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct / 100);
    const cx = size / 2;

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="var(--psx-border)" stroke-width="${strokeWidth}"/>
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"
        stroke-dasharray="${circ.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"
        stroke-linecap="round" transform="rotate(-90 ${cx} ${cx})"/>
    </svg>`;
  }

  function sparkline(data, opts) {
    opts = opts || {};
    const h = opts.height || 20;
    const w = opts.width || 56;
    if (!data || data.length < 2) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const up = opts.positive != null ? opts.positive : data[data.length - 1] >= data[0];
    const color = opts.color || (up ? 'var(--psx-up, #30d158)' : 'var(--psx-down, #ff453a)');
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - 2 - ((v - min) / range) * (h - 4);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    return `<svg class="lc-sparkline" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function holdingSpark(h) {
    const px = h.price || 0;
    if (px <= 0) return '';
    const prev = (typeof State !== 'undefined' ? State.getPrevClose(h.symbol) : null) || px;
    const avg = h.quantity > 0 ? h.costBasis / h.quantity : px;
    const data = [avg, (avg + prev) / 2, prev, px].filter((v) => v > 0);
    if (data.length < 2) return sparkline([px, px], { positive: (h.pnlPct || 0) >= 0 });
    return sparkline(data, { positive: (h.pnlPct || 0) >= 0 });
  }

  /**
   * Horizontal range bar with current-value marker (52-week range,
   * fair-value gauge). Gradient low→high, dot at current position.
   */
  function rangeBar(low, high, current, opts) {
    opts = opts || {};
    if (!(high > low) || current == null) return '';
    const pct = Math.max(0, Math.min(100, ((current - low) / (high - low)) * 100));
    const lowLabel = opts.lowLabel || '';
    const highLabel = opts.highLabel || '';
    const markerLabel = opts.markerLabel || '';
    return `<div class="lc-range-bar" role="img" aria-label="${opts.ariaLabel || `Range ${low} to ${high}, current ${current}`}">
      <div class="lc-range-bar-track"><span class="lc-range-bar-marker" style="left:${pct.toFixed(1)}%"></span></div>
      <div class="lc-range-bar-labels">
        <span>${lowLabel}</span>
        ${markerLabel ? `<span class="lc-range-bar-mid">${markerLabel}</span>` : ''}
        <span>${highLabel}</span>
      </div>
    </div>`;
  }

  return { lineChart, lineChartBlock, barChart, ringProgress, sparkline, holdingSpark, rangeBar, _chartColor };
})();
window.Charts = Charts;

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
    if (nav?.dataset.nav && window.Navigation) {
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

  function init() {
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
    funds: 'wallet',
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
    // Whole units once amounts reach 4 digits — paisa noise on large
    // figures reads cheap and slows the 3-second glance.
    const d = opts.decimals ?? (abs >= 1000 ? 0 : 2);
    const formatted = abs.toLocaleString('en-PK', { minimumFractionDigits: d, maximumFractionDigits: d });
    if (opts.signed && val > 0) return '+' + sym + formatted;
    if (val < 0) return '-' + sym + formatted;
    return sym + formatted;
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
    return { value: k.value, changeP: chg, ts: k.ts, cls: chg == null ? '' : (chg >= 0 ? 'psx-up' : 'psx-down') };
  }

  function _act(expr) {
    return String(expr || 'App.refreshPrices').replace(/\(\)$/, '').replace(/\(\)/g, '');
  }

  function strip(onRefresh) {
    const k = kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    return `<div class="psx-strip">
      <div><span class="psx-live"><span class="psx-live-dot"></span>${I18n.t('liveMarket')}</span></div>
      <div><strong>KSE-100</strong> ${k.value ? fmtIndex(k.value) : '—'} <span class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : ''}</span></div>
      <button type="button" class="psx-strip-refresh" data-action="${_act(onRefresh)}">${I18n.t('refresh')}</button>
    </div>`;
  }

  function indexRow() {
    const k = kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    return `<div class="psx-index-row">
      <div class="psx-index-card">
        <div class="psx-index-label">KSE-100 · Index · live</div>
        <div class="psx-index-val">${k.value ? fmtIndex(k.value) : '—'}</div>
        <div class="psx-index-meta"><span class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : I18n.t('loading')}</span></div>
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
    return `<div class="psx-skel-news" aria-busy="true" aria-label="Loading news">
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
    return `<div class="lc-empty-state">
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

  return { fmt, fmtIndex, fmtNum, chgCls, kse, strip, indexRow, statGrid, panel, sectorTable, filters, pageTitle, lcDash, segment, skeleton, skeletonNews, skeletonHoldings, emptyState, errorState, num, refreshPortfolioMini };
})();
window.PsxUI = PsxUI;

;/* === js/ui/tradingview.js === */
'use strict';
const TradingViewUI = (() => {
  let _chartReq = 0;

  function resolveTvSymbol(symbol, assetClass) {
    const intl = (window.INTL_STOCKS || []).find(x => x.symbol === symbol);
    if (intl?.tv) return intl.tv;
    const cry = (window.CRYPTO_ASSETS || []).find(x => x.symbol === symbol);
    if (cry?.tv) return cry.tv;
    if (assetClass === 'crypto') return `BINANCE:${symbol}USDT`;
    if (assetClass === 'intl') return `NASDAQ:${symbol}`;
    const psx = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === symbol);
    if (psx) return `PSX:${symbol}`;
    return null;
  }

  async function _svgChart(el, symbol, height, reqId) {
    height = height || 360;
    el.innerHTML = `<div class="lc-chart-loading">Loading chart…</div>`;
    let series = [];
    if (typeof Prices !== 'undefined' && Prices.fetchPriceSeries) {
      try { series = await Prices.fetchPriceSeries(symbol, 40); } catch (_) {}
    }
    if (reqId != null && reqId !== _chartReq) return;
    if (series.length < 2) {
      el.innerHTML = `<p class="psx-muted">Could not load price history for <strong>${symbol}</strong>. Tap Refresh in Settings or check proxy.</p>`;
      return;
    }
    const up = series[series.length - 1] >= series[0];
    const tvSym = resolveTvSymbol(symbol);
    const tvLink = tvSym
      ? `<p class="lc-chart-caption"><a class="lc-link-btn" href="https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tvSym)}" target="_blank" rel="noopener noreferrer">Open ${tvSym} in TradingView ↗</a></p>`
      : '';
    el.innerHTML = `<div class="lc-chart-fallback">${Charts.lineChart(series, { height, color: up ? '#22c55e' : '#ef4444', fill: true })}${tvLink}<p class="psx-muted lc-chart-caption">${series.length} daily points · USD for US · PKR for PSX</p></div>`;
  }

  /** Reliable SVG price chart — no embedded TradingView widget */
  async function mount(containerId, symbol, assetClass, opts) {
    opts = opts || {};
    const el = document.getElementById(containerId);
    if (!el || !symbol) return;
    const reqId = ++_chartReq;
    await _svgChart(el, symbol, opts.height || 360, reqId);
  }

  function destroy(containerId) {
    _chartReq++;
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = '';
  }

  return { mount, destroy, resolveTvSymbol };
})();
window.TradingViewUI = TradingViewUI;

;/* === js/ui/market-ui.js === */
'use strict';
/** PSX Tactics–inspired shared chrome — live strip, section kickers, dense tables */
const MarketUI = (() => {
  function fmtNum(n, decimals) {
    if (n == null || Number.isNaN(n)) return '—';
    return Number(n).toLocaleString('en-PK', { maximumFractionDigits: decimals ?? 0 });
  }

  function timeAgo(ts) {
    if (!ts) return null;
    const mins = Math.floor((Date.now() - ts) / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  function dailyChgPct(symbol, price) {
    if (typeof State === 'undefined') return null;
    const prev = State.getPrevClose(symbol);
    if (!prev || !price) return null;
    return ((price - prev) / prev) * 100;
  }

  function kseSnapshot() {
    const state = typeof State !== 'undefined' ? State.get() : {};
    const kse = state.kseIndex || {};
    const chg = kse.changeP ?? kse.change ?? null;
    return {
      value: kse.value,
      changeP: chg,
      ts: kse.ts,
      cls: chg == null ? '' : (chg >= 0 ? 't-gain' : 't-loss'),
      sign: chg != null && chg >= 0 ? '+' : '',
    };
  }

  function liveBadge(ts) {
    const ago = timeAgo(ts);
    return `<div class="lc-live-badge" aria-live="polite"><span class="lc-live-dot" aria-hidden="true"></span>Live market${ago ? ` · ${ago}` : ''}</div>`;
  }

  function compactStrip() {
    const k = kseSnapshot();
    const ago = timeAgo(k.ts);
    return `<div class="lc-compact-strip cap-reveal" role="status">
      <span class="lc-compact-label">KSE-100</span>
      <strong class="lc-compact-val">${k.value ? fmtNum(k.value) : '—'}</strong>
      <span class="lc-compact-chg ${k.cls}">${k.changeP != null ? `${k.sign}${Number(k.changeP).toFixed(2)}%` : '…'}</span>
      <span class="lc-compact-sep" aria-hidden="true">·</span>
      <span class="lc-compact-live"><span class="lc-live-dot lc-live-dot--sm" aria-hidden="true"></span>${ago ? ago : 'Live'}</span>
      <button type="button" class="lc-compact-refresh" data-action="App.refreshPrices" title="Refresh prices">↻</button>
    </div>`;
  }

  function sectionHead(label, accent, actionHtml) {
    const accentPart = accent ? ` <span>· ${accent}</span>` : '';
    return `<div class="lc-section-head cap-reveal">
      <div class="lc-section-kicker">${label}${accentPart}</div>
      ${actionHtml || ''}
    </div>`;
  }

  function pageHeader(kicker, title, sub) {
    const h = title || kicker;
    const p = sub || (title ? kicker : '');
    return `${typeof PsxUI !== 'undefined' ? PsxUI.strip() : compactStrip()}${typeof PsxUI !== 'undefined' ? PsxUI.pageTitle(h, p) : `<div class="lc-page-head"><div class="lc-section-kicker">${h}</div>${p ? `<p class="lc-page-sub">${p}</p>` : ''}</div>`}`;
  }

  function emptyState(icon, title, body, primaryAction) {
    const btn = primaryAction ? primaryAction.replace(/os-btn os-btn-primary|btn-primary/g, 'psx-btn psx-btn-primary') : '';
    return `<div class="psx-empty">
      <div class="psx-empty-icon">${icon}</div>
      <div class="psx-empty-title">${title}</div>
      <div class="psx-empty-body">${body}</div>
      ${btn}
    </div>`;
  }

  function marketStripFull(holdings) {
    const state = State.get();
    const k = kseSnapshot();
    let adv = 0;
    let dec = 0;
    let topDay = null;
    let topDayChg = -Infinity;
    let worstDay = null;
    let worstDayChg = Infinity;

    (holdings || []).forEach(h => {
      const chg = dailyChgPct(h.symbol, h.price);
      if (chg == null) return;
      if (chg > 0.05) adv++;
      else if (chg < -0.05) dec++;
      if (chg > topDayChg) { topDayChg = chg; topDay = h; }
      if (chg < worstDayChg) { worstDayChg = chg; worstDay = h; }
    });

    const wl = holdings?.length ? PortfolioAnalyticsService.getWinnersLosers() : { winners: [], losers: [] };
    const topHold = wl.winners[0];
    const worstHold = wl.losers[0];
    const summary = holdings?.length ? PortfolioAnalyticsService.getSummary(state) : null;

    return `
    <div class="lc-home-top cap-reveal">
      ${liveBadge(k.ts)}
      <button type="button" class="lc-section-action" data-action="App.refreshPrices">Refresh prices</button>
    </div>
    <div class="lc-market-strip cap-reveal">
      <div class="lc-index-card lc-index-card--hero">
        <div class="lc-index-kicker">
          <span class="lc-index-label">KSE-100</span>
          <span class="lc-index-tag">Index · Live</span>
        </div>
        <div class="lc-index-value">${k.value ? fmtNum(k.value) : '—'}</div>
        <div class="lc-index-meta">
          <span class="${k.cls}">${k.changeP != null ? `${k.sign}${Number(k.changeP).toFixed(2)}%` : 'Loading…'}</span>
          <span>${holdings?.length ? `${holdings.length} tracked positions` : 'PSX market index'}</span>
        </div>
      </div>
      <div class="lc-index-card">
        <div class="lc-index-kicker"><span class="lc-index-label">Your positions</span></div>
        <div class="lc-pulse-grid">
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Advancing</div><div class="lc-pulse-item-value t-gain">${holdings?.length ? adv : '—'}${holdings?.length ? ' ▲' : ''}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Declining</div><div class="lc-pulse-item-value t-loss">${holdings?.length ? dec : '—'}${holdings?.length ? ' ▼' : ''}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Top today</div><div class="lc-pulse-item-value">${topDay ? `${topDay.symbol} ${topDayChg >= 0 ? '+' : ''}${topDayChg.toFixed(1)}%` : (topHold ? `${topHold.symbol} +${topHold.pnlPct.toFixed(1)}%` : '—')}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Weakest</div><div class="lc-pulse-item-value">${worstDay ? `${worstDay.symbol} ${worstDayChg.toFixed(1)}%` : (worstHold ? `${worstHold.symbol} ${worstHold.pnlPct.toFixed(1)}%` : '—')}</div></div>
        </div>
      </div>
      <div class="lc-index-card">
        <div class="lc-index-kicker"><span class="lc-index-label">Portfolio pulse</span></div>
        <div class="lc-pulse-grid">
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Annual yield</div><div class="lc-pulse-item-value t-gain">${summary ? `${summary.portfolioDivYield.toFixed(1)}%` : '—'}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Positions</div><div class="lc-pulse-item-value">${holdings?.length || '—'}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Sectors</div><div class="lc-pulse-item-value">${holdings?.length ? [...new Set(holdings.map(h => h.sector).filter(Boolean))].length : '—'}</div></div>
          <div class="lc-pulse-item"><div class="lc-pulse-item-label">Brokers</div><div class="lc-pulse-item-value">${holdings?.length ? [...new Set(holdings.map(h => h.broker))].length : '—'}</div></div>
        </div>
      </div>
    </div>`;
  }

  function toolsGrid(items) {
    return `<div class="lc-tools-grid cap-reveal">${items.map(t => {
      const nav = (t.nav || (t.on || '').match(/Navigation\.go\('([^']+)'\)/)?.[1]);
      const attr = nav ? `data-nav="${nav}"` : `data-action="${String(t.on || '').replace(/\(\)$/, '')}"`;
      return `<button type="button" class="lc-tool-card" ${attr}><strong>${t.title}</strong><span>${t.sub}</span></button>`;
    }).join('')}</div>`;
  }

  function defaultTools() {
    return toolsGrid([
      { title: 'Signals', sub: 'Rule-based brief on holdings', nav: 'signals' },
      { title: 'Dividends', sub: 'Income calendar & yield', nav: 'dividends' },
      { title: 'Research', sub: 'Charts, DMA, smart rating', nav: 'research' },
      { title: 'Tax & Rebalance', sub: 'CGT · rebalance · IPO tools', nav: 'pilot-tools' },
      { title: 'Performance', sub: 'XIRR & benchmark compare', nav: 'performance' },
      { title: 'Compare', sub: 'Side-by-side holdings', nav: 'comparison' },
      { title: 'Transactions', sub: 'Full buy/sell log', nav: 'transactions' },
      { title: 'Paper trade', sub: 'Simulated PSX ledger', nav: 'paper-trade' },
    ]);
  }

  function morningBriefCard() {
    if (!window.PilotEngine) return '';
    const brief = PilotEngine.buildMorningBrief();
    const counts = brief.action_counts || {};
    const urgent = brief.urgent_signals || [];
    const top = urgent[0];
    const pills = ['STRONG BUY', 'ADD', 'HOLD', 'WATCH', 'TRIM', 'SELL']
      .filter(a => counts[a])
      .map(a => `<span class="lc-brief-pill">${a} ${counts[a]}</span>`).join('');
    return `<div class="lc-brief-card cap-reveal">
      <div class="lc-brief-head">
        <div>
          <div class="lc-index-label">Today&apos;s pulse</div>
          <div class="lc-brief-title">Rule-based action queue</div>
        </div>
        <button type="button" class="lc-section-action" data-nav="signals">Open →</button>
      </div>
      <div class="lc-brief-pills">${pills || '<span class="lc-brief-pill lc-brief-pill--muted">HOLD zone</span>'}</div>
      ${top
        ? `<p class="lc-brief-copy"><strong>${top.symbol}</strong> — ${top.action}: ${top.rationale.slice(0, 140)}…</p>`
        : '<p class="lc-brief-copy">No urgent actions — portfolio in hold zone.</p>'}
      <p class="lc-brief-disclaimer">${brief.disclaimer}</p>
    </div>`;
  }

  function renderAppTicker() {
    const el = document.getElementById('lc-app-ticker');
    if (!el) return;
    const k = kseSnapshot();
    el.innerHTML = `<span class="lc-ticker-label">KSE-100</span>
      <strong>${k.value ? fmtNum(k.value) : '—'}</strong>
      <span class="${k.cls}">${k.changeP != null ? `${k.sign}${Number(k.changeP).toFixed(2)}%` : ''}</span>`;
  }

  return {
    fmtNum, timeAgo, dailyChgPct, kseSnapshot, liveBadge, compactStrip,
    sectionHead, pageHeader, marketStripFull, toolsGrid, defaultTools,
    morningBriefCard, renderAppTicker, emptyState,
  };
})();
window.MarketUI = MarketUI;

;/* === js/lc-desktop-nav.js === */
'use strict';
/** Toggle body.lc-desktop-nav at ≥900px — Playwright viewport contract + sidebar/bottom nav */
(function () {
  const MQ = window.matchMedia('(min-width: 900px)');
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
    { id: 'funds', labelKey: 'nav.funds', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
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
    const on = t.id === _current ? ' active' : '';
    return `<button type="button" class="psx-nav-btn${on}" data-tab="${t.id}" aria-label="${_t(t.labelKey)}">
      <span class="psx-nav-icon-wrap">${t.icon}</span>
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
    _current = tabId;
    document.querySelectorAll('.psx-screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.psx-nav-btn, .psx-side-btn[data-tab]').forEach(b => b.classList.remove('active'));
    const el = document.getElementById('screen-' + tabId);
    if (el) {
      el.classList.add('active', 'lc-screen-enter');
      el.scrollTop = 0;
      requestAnimationFrame(() => el.classList.remove('lc-screen-enter'));
    }
    document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(b => b.classList.add('active'));
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
    if (typeof PsxUI !== 'undefined') PsxUI.refreshPortfolioMini?.();
    if (typeof CapMotion !== 'undefined') CapMotion.refresh();
    if (typeof LcPolish !== 'undefined') LcPolish.afterRender();
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
      if (!localStorage.getItem(KEY)) console.error('LedgerCap: localStorage write failed silently');
    } catch(e) {
      console.warn('LedgerCap save error:', e.message);
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
    if (!trusted && fallback && price && price > 0) {
      if (price > fallback * 2.5 || price < fallback * 0.4) {
        console.warn(`Rejected bad price for ${symbol}: ₨${price} (fallback: ₨${fallback})`);
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
    return `<button type="button" class="lc-stale-chip" data-action="App.refreshPrices">${stale} stale price${stale > 1 ? 's' : ''} · refresh</button>`;
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

  let _newsHtml = typeof PsxUI !== 'undefined' ? PsxUI.skeletonNews() : '<p class="lc-empty-note">Loading…</p>';

  async function _loadNews(state) {
    if (typeof NewsService === 'undefined') return;
    try {
      const items = await NewsService.fetchPortfolioNews(state);
      if (!items.length) {
        _newsHtml = PsxUI.emptyState('Thin free feeds', 'No Bloomberg desk here — Yahoo + BBC via worker when reachable. Google RSS often blocks worker IP. Headlines are rule-tagged, not advice.', '');
        return;
      }
      _newsHtml = items.slice(0, 6).map(n => `
        <a class="lc-news-row" href="${escUrl(n.url)}" target="_blank" rel="noopener noreferrer">
          <div class="lc-news-title">${esc(n.title)}</div>
          <div class="lc-news-meta">${esc(n.portfolioSymbol || n.symbol)} · ${esc(n.publisher || n.source)}${NewsService.impactBadge(n.impact)}</div>
          <p class="lc-news-hint">${esc(n.impact?.hint || '')}</p>
        </a>`).join('');
    } catch (e) {
      _newsHtml = PsxUI.errorState('News unavailable', navigator.onLine ? (e.message || 'Feed error — try again.') : 'You appear offline.', 'Hub.refreshNews()');
    }
  }

  function _newsSection() {
    return `<div class="lc-dash-section" id="hub-news-section">
      <div class="lc-dash-section-head"><h3>Market news</h3><span>Free feeds · not Bloomberg</span></div>
      <div class="lc-sector-card" id="hub-news-list">${_newsHtml}</div>
      <div class="lc-dash-actions"><button type="button" class="psx-btn psx-btn-ghost" data-action="Hub.refreshNews">Refresh news</button></div>
    </div>`;
  }

  async function refreshNews() {
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

  function _kseCard(k, sign) {
    return `<button type="button" class="lc-dash-market-card lc-dash-market-card--btn" data-nav="market" aria-label="Open stock watch">
      <span>KSE-100</span>
      <strong>${k.value ? PsxUI.fmtIndex(k.value) : '—'}</strong>
      <em class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : I18n.t('loading')}</em>
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

  function render() {
    const screen = document.getElementById('screen-home');
    if (!screen) return;
    const state = State.get();
    const hasHoldings = (state.transactions || []).length > 0;
    const k = PsxUI.kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    const stats = _marketStats();

    if (!hasHoldings) {
      screen.innerHTML = `
        <div class="lc-dash">
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
          <div class="lc-dash-section">
            <div class="lc-dash-section-head"><h3>${I18n.t('hub.toolsTitle')}</h3><span>${I18n.t('hub.toolsSub')}</span></div>
            ${_toolGrid()}
          </div>
        </div>`;
      return;
    }

    const s = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    // Real broker cash lives in manualAssets (statement figures), not the
    // salary-minus-buys ledger estimate which clamps to 0 here.
    const ma = state.manualAssets || {};
    const cash = (ma.brokerCashPkr || 0) + (typeof FxService !== 'undefined' ? FxService.usdToPkr(ma.usdCash || 0) : 0);

    screen.innerHTML = `
      <div class="lc-dash">
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
          <button type="button" class="psx-btn psx-btn-primary" data-action="App.refreshPrices">${I18n.t('refresh')}</button>
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
        <div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>${I18n.t('hub.toolsTitle')}</h3><span>${I18n.t('hub.toolsSub')}</span></div>
          ${_toolGrid()}
        </div>
      </div>`;
    _loadNews(state).then(() => {
      if (Navigation?.current?.() === 'home') refreshNews();
    });
  }

  return { render, openMarketFilter, openPortfolio, refreshNews };
})();
window.Hub = Hub;
window.Home = Hub;

;/* === js/modules/market.js === */
'use strict';
const Market = (() => {
  let _filter = 'all';
  let _moveFilter = 'all';
  let _sectorFilter = '';
  let _query = '';

  function _rows() {
    const catalog = typeof PsxStocksCatalog !== 'undefined' ? PsxStocksCatalog.rows() : [];
    return catalog.map((s) => {
      const price = State.getPrice(s.symbol) || (window.FALLBACK_PRICES || {})[s.symbol] || 0;
      const prev = State.getPrevClose(s.symbol) || price;
      const chg = prev ? ((price - prev) / prev) * 100 : 0;
      return { ...s, price, chg, priced: price > 0 };
    });
  }

  function _pricedRows(rows) {
    return rows.filter((r) => r.priced && r.price > 0);
  }

  const PAGE = 80;
  let _page = 0;

  function _pagedSectorBlocks(bySector, totalRows) {
    const flat = [];
    Object.keys(bySector).sort().forEach((sec) => {
      bySector[sec].forEach((r) => flat.push({ ...r, sector: sec }));
    });
    const start = _page * PAGE;
    const slice = flat.slice(start, start + PAGE);
    const byPage = {};
    slice.forEach((r) => { (byPage[r.sector || 'Other'] = byPage[r.sector || 'Other'] || []).push(r); });
    const blocks = _sectorBlocks(byPage);
    const more = start + PAGE < totalRows
      ? `<button type="button" class="psx-btn psx-btn-ghost" data-action="Market.nextPage">Show more (${Math.min(PAGE, totalRows - start - PAGE)} of ${totalRows - start - PAGE} left)</button>`
      : '';
    const reset = _page > 0
      ? `<button type="button" class="psx-btn psx-btn-ghost" data-action="Market.prevPage">Back to start</button>`
      : '';
    return blocks + `<div class="lc-dash-actions">${reset}${more}</div>`;
  }

  function _segment() {
    return `<div class="lc-segment" role="tablist">
      <button type="button" class="lc-segment-btn${_filter === 'all' ? ' on' : ''}" data-action="Market.setFilter" data-tab="all">${I18n.t('screener.all')}</button>
      <button type="button" class="lc-segment-btn${_filter === 'islamic' ? ' on' : ''}" data-action="Market.setFilter" data-tab="islamic">${I18n.t('screener.islamic')}</button>
    </div>`;
  }

  function _pulseRow(baseRows) {
    const priced = _pricedRows(baseRows);
    let adv = 0, dec = 0, unch = 0;
    priced.forEach(r => {
      if (r.chg > 0.05) adv++;
      else if (r.chg < -0.05) dec++;
      else unch++;
    });
    const listed = baseRows.length;
    const pricedN = priced.length;
    return `<div class="lc-pulse-row" role="group" aria-label="Market movers">
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${_moveFilter === 'advancing' ? ' on' : ''}" data-action="Market.setMoveFilter" data-tab="advancing" aria-pressed="${_moveFilter === 'advancing'}">
        <label>${I18n.t('market.advancing')}</label><b class="psx-up">${adv}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${_moveFilter === 'declining' ? ' on' : ''}" data-action="Market.setMoveFilter" data-tab="declining" aria-pressed="${_moveFilter === 'declining'}">
        <label>${I18n.t('market.declining')}</label><b class="psx-down">${dec}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${_moveFilter === 'unchanged' ? ' on' : ''}" data-action="Market.setMoveFilter" data-tab="unchanged" aria-pressed="${_moveFilter === 'unchanged'}">
        <label>${I18n.t('market.unchanged')}</label><b>${unch}</b>
      </button>
      <button type="button" class="lc-pulse-pill lc-pulse-pill--btn${_moveFilter === 'all' ? ' on' : ''}" data-action="Market.setMoveFilter" data-tab="all" aria-pressed="${_moveFilter === 'all'}">
        <label>Listed</label><b>${listed}</b>
      </button>
      <div class="lc-pulse-pill" title="Symbols with a snapshot or live price"><label>Priced</label><b>${pricedN}/${listed}</b></div>
    </div>`;
  }

  function _sectorBlocks(bySector) {
    return Object.keys(bySector).sort().map(sec => `
      <div class="lc-sector-card">
        <button type="button" class="lc-sector-head lc-sector-head--btn${_sectorFilter === sec ? ' on' : ''}" data-action="Market.setSectorFilter" data-tab="${sec.replace(/"/g, '&quot;')}">
          <h4>${sec}</h4><span>${bySector[sec].length} stock${bySector[sec].length === 1 ? '' : 's'}</span>
        </button>
        ${bySector[sec].map(r => `
          <button type="button" class="lc-market-row" data-action="Research.open" data-symbol="${r.symbol}">
            <div>
              <div class="lc-market-sym">${r.symbol}${r.isShariah ? '<span class="lc-badge">S</span>' : ''}</div>
              <div class="lc-market-name">${r.name}</div>
            </div>
            <div class="lc-market-price">${PsxUI.fmt(r.price)} ${typeof Prices !== 'undefined' && Prices.priceBadge ? Prices.priceBadge(r.symbol) : ''}</div>
            <div class="lc-market-chg ${PsxUI.chgCls(r.chg)}">${PsxUI.fmt(r.chg, { pct: true, signed: true })}</div>
          </button>`).join('')}
      </div>`).join('');
  }

  function _filteredRows() {
    let baseRows = _rows();
    if (_filter === 'islamic') baseRows = baseRows.filter(r => r.isShariah);
    const q = _query.trim().toLowerCase();
    if (q) {
      baseRows = baseRows.filter(r =>
        r.symbol.toLowerCase().includes(q) ||
        (r.name || '').toLowerCase().includes(q) ||
        (r.sector || '').toLowerCase().includes(q)
      );
    }
    let rows = baseRows;
    if (_moveFilter === 'advancing') rows = baseRows.filter(r => r.chg > 0.05);
    else if (_moveFilter === 'declining') rows = baseRows.filter(r => r.chg < -0.05);
    else if (_moveFilter === 'unchanged') rows = baseRows.filter(r => r.chg >= -0.05 && r.chg <= 0.05);
    if (_sectorFilter) rows = rows.filter(r => (r.sector || 'Other') === _sectorFilter);
    if (_moveFilter === 'advancing') rows.sort((a, b) => b.chg - a.chg);
    else if (_moveFilter === 'declining') rows.sort((a, b) => a.chg - b.chg);
    else rows.sort((a, b) => a.symbol.localeCompare(b.symbol));
    return { baseRows, rows };
  }

  function _paintList() {
    const host = document.getElementById('market-list');
    if (!host) { render(); return; }
    const { rows } = _filteredRows();
    const bySector = {};
    rows.forEach(r => { (bySector[r.sector || 'Other'] = bySector[r.sector || 'Other'] || []).push(r); });
    host.innerHTML = rows.length
      ? (_query.trim() ? _sectorBlocks(bySector) : _pagedSectorBlocks(bySector, rows.length))
      : `<div class="lc-empty-state"><h2>No matches</h2><p>Try another symbol or clear filters.</p></div>`;
  }

  function render() {
    const screen = document.getElementById('screen-market');
    if (!screen) return;
    const { baseRows, rows } = _filteredRows();
    const bySector = {};
    rows.forEach(r => { (bySector[r.sector || 'Other'] = bySector[r.sector || 'Other'] || []).push(r); });
    const k = PsxUI.kse();
    const sign = k.changeP != null && k.changeP >= 0 ? '+' : '';
    const filterHint = (_moveFilter !== 'all' || _sectorFilter)
      ? `<p class="lc-filter-hint">${_sectorFilter ? `Sector: ${_sectorFilter} · ` : ''}${_moveFilter !== 'all' ? _moveFilter + ' · ' : ''}<button type="button" class="lc-link-btn" data-action="Market.clearFilters">Clear filters</button></p>`
      : '';

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${I18n.t('market.title')}</h1>
          <p>${I18n.t('market.sub')}</p>
        </div>
        <div class="lc-dash-market" style="margin-bottom:var(--lc-space-4)">
          <button type="button" class="lc-dash-market-card lc-dash-market-card--btn" data-action="App.refreshPrices" aria-label="Refresh KSE-100">
            <span>KSE-100</span>
            <strong>${k.value ? PsxUI.fmtIndex(k.value) : '—'}</strong>
            <em class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : '—'}</em>
          </button>
          <button type="button" class="lc-dash-market-card lc-dash-market-card--btn" data-action="Market.setMoveFilter" data-tab="all" aria-label="Show all listed stocks">
            <span>Listed</span>
            <strong>${baseRows.length}</strong>
            <em>${_pricedRows(baseRows).length} priced</em>
          </button>
        </div>
        ${_segment()}
        <div class="lc-search-wrap">
          <input type="search" id="market-search" placeholder="Search symbol, sector…" value="${_query.replace(/"/g, '&quot;')}" autocomplete="off" aria-label="Search stocks">
          <p class="lc-search-hint">Type to shortlist — stays focused while you type</p>
        </div>
        ${_pulseRow(baseRows)}
        ${filterHint}
        <div id="market-list">${rows.length ? (_query.trim() ? _sectorBlocks(bySector) : _pagedSectorBlocks(bySector, rows.length)) : `
          <div class="lc-empty-state"><h2>No matches</h2><p>Try another symbol, filter, or clear movers filter.</p></div>`}</div>
        <div class="lc-dash-actions">
          <button type="button" class="psx-btn psx-btn-primary" data-action="App.refreshPrices">${I18n.t('refresh')}</button>
        </div>
      </div>`;

    const inp = document.getElementById('market-search');
    if (inp && !inp.dataset.bound) {
      inp.dataset.bound = '1';
      const onInput = typeof LcDebounce !== 'undefined'
        ? LcDebounce.debounce(e => { _query = e.target.value; _paintList(); }, 120)
        : e => { _query = e.target.value; _paintList(); };
      inp.addEventListener('input', onInput);
    }
  }

  function nextPage() { _page++; _paintList(); }
  function prevPage() { _page = 0; _paintList(); }
  function setFilter(f) { _filter = f; _page = 0; render(); }
  function setMoveFilter(f) { _moveFilter = _moveFilter === f ? 'all' : f; _page = 0; render(); }
  function setSectorFilter(sec) { _sectorFilter = _sectorFilter === sec ? '' : sec; _page = 0; render(); }
  function clearFilters() { _moveFilter = 'all'; _sectorFilter = ''; _page = 0; render(); }
  function moveFilter() { return _moveFilter; }
  function _onSearch(q) { _query = q; _page = 0; _paintList(); }

  return { render, setFilter, setMoveFilter, setSectorFilter, clearFilters, moveFilter, nextPage, prevPage, _onSearch };
})();
window.Market = Market;

;/* === js/modules/portfolio-screen.js === */
'use strict';
const PortfolioScreen = (() => {
  let _filter = null;
  let _lastHoldings = [];
  let _chartRange = '1M';
  let _search = '';
  let _sort = 'value';
  let _viewMode = (typeof localStorage !== 'undefined' && localStorage.getItem('lc_pf_view')) || 'cards';

  function setSearch(v) { _search = String(v || ''); render(); }
  function setSort(v) { _sort = v || 'value'; render(); }
  function setViewMode(v) {
    _viewMode = v === 'table' ? 'table' : 'cards';
    try { localStorage.setItem('lc_pf_view', _viewMode); } catch (_) {}
    render();
  }

  function _filterSort(holdings) {
    let rows = holdings;
    const q = _search.trim().toLowerCase();
    if (q) {
      rows = rows.filter((h) =>
        h.symbol.toLowerCase().includes(q) ||
        (h.broker || '').toLowerCase().includes(q) ||
        (h.name || '').toLowerCase().includes(q));
    }
    return [...rows].sort((a, b) => {
      if (_sort === 'symbol') return a.symbol.localeCompare(b.symbol);
      if (_sort === 'pnl') return (b.pnl || 0) - (a.pnl || 0);
      if (_sort === 'daily') return (b.dailyPnl || 0) - (a.dailyPnl || 0);
      return (b.value || 0) - (a.value || 0);
    });
  }

  function _priceStale(sym) {
    return typeof State !== 'undefined' && State.isPriceStale && State.isPriceStale(sym, 24);
  }

  function setFilter(id, opts) {
    opts = opts || {};
    if (opts.replace) _filter = id || null;
    else _filter = _filter === id ? null : (id || null);
    render();
  }
  function clearFilter() { _filter = null; }
  function currentFilter() { return _filter; }

  function _daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
  }

  function _chartData(range, currentValue) {
    const state = State.get();
    const hist = (state.priceHistory || []).filter((p) => p.value > 0);
    const intra = state.intradayHistory || [];
    const today = new Date().toISOString().slice(0, 10);
    const nowVal = currentValue || State.calcTotalValue();

    if (range === '1D') {
      const pts = intra.filter((p) => (p.date || '') === today).map((p) => p.value);
      if (pts.length >= 2) return pts;
      if (pts.length === 1 && hist.length) return [hist[hist.length - 1].value, pts[0]];
      if (hist.length >= 2) return [hist[hist.length - 2].value, nowVal];
      return [nowVal * 0.995, nowVal];
    }
    if (range === '1W') {
      const cutoff = _daysAgo(7);
      const week = hist.filter((p) => p.date >= cutoff).map((p) => p.value);
      if (week.length) { week[week.length - 1] = nowVal; return week; }
      return hist.slice(-7).map((p) => p.value).concat(nowVal).slice(-8);
    }
    if (range === '1M') {
      const cutoff = _daysAgo(30);
      const m = hist.filter((p) => p.date >= cutoff).map((p) => p.value);
      if (m.length >= 2) { m[m.length - 1] = nowVal; return m; }
      const sliced = hist.slice(-30).map((p) => p.value);
      if (sliced.length) { sliced[sliced.length - 1] = nowVal; return sliced; }
      return [nowVal * 0.95, nowVal];
    }
    if (range === '1Y') {
      const cutoff = _daysAgo(365);
      const y = hist.filter((p) => p.date >= cutoff).map((p) => p.value);
      if (y.length >= 2) { y[y.length - 1] = nowVal; return y; }
      const sliced = hist.slice(-365).map((p) => p.value);
      if (sliced.length) { sliced[sliced.length - 1] = nowVal; return sliced; }
      return [nowVal * 0.85, nowVal];
    }
    if (hist.length >= 2) {
      const all = hist.map((p) => p.value);
      all[all.length - 1] = nowVal;
      return all;
    }
    return [nowVal * 0.9, nowVal];
  }

  function setChartRange(r) {
    _chartRange = r || '1M';
    render();
  }

  function _holdingCard(h) {
    const qtyLabel = h.kind === 'fund' ? h.quantity.toFixed(2) : PsxUI.fmtNum(h.quantity, 0);
    const avgLabel = h.kind === 'intl' || h.kind === 'crypto'
      ? '$' + Number(h.avgCost || 0).toFixed(2)
      : PsxUI.fmt(h.avgCost || (h.quantity ? h.costBasis / h.quantity : 0));
    const priceLabel = h.kind === 'intl' || h.kind === 'crypto'
      ? '$' + Number(FxService.pkrToUsd(h.price)).toFixed(2)
      : PsxUI.fmt(h.price);
    const dayCls = PsxUI.chgCls(h.dailyPnlPct || 0);
    const totCls = PsxUI.chgCls(h.pnlPct || 0);
    const spark = typeof Charts !== 'undefined' ? Charts.holdingSpark(h) : '';
    const broker = (h.broker || '').replace(/"/g, '&quot;');
    const stale = _priceStale(h.symbol);
    const canSell = h.kind === 'stock' || h.kind === 'intl' || h.kind === 'crypto';
    const sellType = h.kind === 'intl' ? 'INTL_SELL' : h.kind === 'crypto' ? 'CRYPTO_SELL' : 'SELL';
    return `<article class="lc-holding-inv${stale ? ' lc-holding-inv--stale' : ''}" data-nav="research">
      <div class="lc-holding-inv-head">
        <div class="lc-holding-inv-sym">
          <strong>${h.symbol}</strong>
          <span class="lc-holding-inv-price">${priceLabel}</span>
          <span class="lc-holding-inv-sub">${h.broker}${stale ? ' · stale price' : ''}</span>
        </div>
        <div class="lc-holding-inv-value lc-num">${PsxUI.fmt(h.value)}</div>
      </div>
      <div class="lc-holding-inv-meta">
        <span><label>Cost</label><b class="lc-num">${PsxUI.fmt(h.costBasis)}</b></span>
        <span><label>Avg buy</label><b class="lc-num">${avgLabel}</b></span>
        <span><label>Shares</label><b class="lc-num">${qtyLabel}</b></span>
      </div>
      <div class="lc-holding-inv-pnl">
        <div class="lc-pf-pnl-box ${dayCls}">
          <label>${I18n.t('portfolio.today')}</label>
          <b class="lc-num">${PsxUI.fmt(h.dailyPnl || 0, { signed: true })}</b>
          <em>${PsxUI.fmt(h.dailyPnlPct || 0, { pct: true, signed: true })}</em>
        </div>
        <div class="lc-pf-pnl-box ${totCls}">
          <label>${I18n.t('portfolio.gainLoss')}</label>
          <b class="lc-num">${PsxUI.fmt(h.pnl || 0, { signed: true })}</b>
          <em>${PsxUI.fmt(h.pnlPct || 0, { pct: true, signed: true })}</em>
        </div>
      </div>
      <div class="lc-holding-inv-foot">
        <div class="lc-holding-inv-spark" aria-hidden="true">${spark}</div>
        <div class="lc-holding-inv-actions">
          <button type="button" class="lc-link-btn" data-action="App.refreshSymbolPrice" data-symbol="${h.symbol}" data-refresh-symbol="${h.symbol}" data-stop="1" aria-label="Refresh ${h.symbol} price">↻</button>
          ${canSell ? `<button type="button" class="lc-link-btn lc-link-btn--sell" data-action="App.openSellHolding" data-symbol="${h.symbol}" data-broker="${broker}" data-tab="${sellType}" data-stop="1">Sell</button>` : ''}
          <button type="button" class="lc-link-btn" data-action="App.openPriceAlert" data-symbol="${h.symbol}" data-stop="1">Alert</button>
          <button type="button" class="lc-link-btn" data-action="PortfolioScreen.reconcile" data-symbol="${h.symbol}" data-broker="${broker}" data-mode="${h.kind}" data-stop="1">Edit</button>
          <button type="button" class="lc-link-btn" data-action="Transactions.openSymbol" data-symbol="${h.symbol}" data-stop="1">Txs</button>
        </div>
      </div>
    </article>`;
  }

  function _holdingTableRow(h) {
    const broker = (h.broker || '').replace(/"/g, '&quot;');
    const stale = _priceStale(h.symbol);
    const canSell = h.kind === 'stock' || h.kind === 'intl' || h.kind === 'crypto';
    const sellType = h.kind === 'intl' ? 'INTL_SELL' : h.kind === 'crypto' ? 'CRYPTO_SELL' : 'SELL';
    return `<tr class="${stale ? 'lc-row-stale' : ''}">
      <td data-nav="research"><div class="psx-sym">${h.symbol}</div><div class="psx-sym-sub">${h.broker}${stale ? ' · stale' : ''}</div></td>
      <td class="lc-num">${h.kind === 'fund' ? h.quantity.toFixed(2) : PsxUI.fmtNum(h.quantity, 0)}</td>
      <td class="lc-num">${PsxUI.fmt(h.price)}</td>
      <td class="lc-num">${PsxUI.fmt(h.costBasis)}</td>
      <td class="lc-num">${PsxUI.fmt(h.value)}</td>
      <td class="lc-num ${PsxUI.chgCls(h.dailyPnlPct || 0)}">${PsxUI.fmt(h.dailyPnl || 0, { signed: true })}<br><small>${PsxUI.fmt(h.dailyPnlPct || 0, { pct: true, signed: true })}</small></td>
      <td class="lc-num ${PsxUI.chgCls(h.pnlPct || 0)}">${PsxUI.fmt(h.pnl || 0, { signed: true })}<br><small>${PsxUI.fmt(h.pnlPct || 0, { pct: true, signed: true })}</small></td>
      <td style="white-space:nowrap">
        <button type="button" class="lc-link-btn" data-action="App.refreshSymbolPrice" data-symbol="${h.symbol}" data-refresh-symbol="${h.symbol}" data-stop="1" aria-label="Refresh ${h.symbol}">↻</button>
        ${canSell ? `<button type="button" class="lc-link-btn" data-action="App.openSellHolding" data-symbol="${h.symbol}" data-broker="${broker}" data-tab="${sellType}" data-stop="1">Sell</button>` : ''}
        <button type="button" class="lc-link-btn" data-action="PortfolioScreen.reconcile" data-symbol="${h.symbol}" data-broker="${broker}" data-mode="${h.kind}" data-stop="1">Edit</button>
      </td>
    </tr>`;
  }

  function _holdingsToolbar(count) {
    return `<div class="lc-pf-holdings-bar">
      <input type="search" class="lc-pf-search" placeholder="Search symbol…" value="${_search.replace(/"/g, '&quot;')}" aria-label="Search holdings" data-action-input="PortfolioScreen.setSearch">
      <select class="lc-pf-sort" aria-label="Sort holdings" data-action-change="PortfolioScreen.setSort">
        <option value="value"${_sort === 'value' ? ' selected' : ''}>Value</option>
        <option value="pnl"${_sort === 'pnl' ? ' selected' : ''}>Total P&amp;L</option>
        <option value="daily"${_sort === 'daily' ? ' selected' : ''}>Today</option>
        <option value="symbol"${_sort === 'symbol' ? ' selected' : ''}>Symbol</option>
      </select>
      <div class="lc-pf-view-toggle" role="group" aria-label="View mode">
        <button type="button" class="lc-range-btn${_viewMode === 'cards' ? ' on' : ''}" data-action="PortfolioScreen.setViewMode" data-tab="cards">Cards</button>
        <button type="button" class="lc-range-btn${_viewMode === 'table' ? ' on' : ''}" data-action="PortfolioScreen.setViewMode" data-tab="table">Table</button>
      </div>
      <span class="lc-pf-count">${count} shown</span>
    </div>`;
  }

  function _holdingsBlock(holdings) {
    const rows = _filterSort(holdings);
    if (!rows.length) {
      return `<div class="lc-empty-state"><p>No holdings match “${_search.replace(/</g, '')}”.</p></div>`;
    }
    if (_viewMode === 'table') {
      return `${_holdingsToolbar(rows.length)}<div class="psx-table-wrap lc-pf-table-wrap">
        <table class="psx-table"><thead><tr>
          <th>Symbol</th><th>Qty</th><th>Last</th><th>Cost</th><th>Value</th><th>Today</th><th>Total</th><th></th>
        </tr></thead><tbody>${rows.map(_holdingTableRow).join('')}</tbody></table>
      </div>`;
    }
    return `${_holdingsToolbar(rows.length)}<div class="lc-holdings-inv">${rows.map(_holdingCard).join('')}</div>`;
  }

  function render(opts) {
    opts = opts || {};
    if (opts.portfolioId) _filter = opts.portfolioId;

    const screen = document.getElementById('screen-portfolio');
    if (!screen) return;
    const state = State.get();
    const buckets = PortfolioBuckets.list(state);
    const cards = `<div class="lc-portfolio-grid">${PortfolioBuckets.cardsHtml(state, { activeId: _filter, onClick: 'PortfolioScreen.setFilter' })}</div>`;

    if (!(state.transactions || []).length) {
      screen.innerHTML = `
        <div class="lc-dash">
          <div class="lc-screen-head">
            <h1>${I18n.t('portfolio.title')}</h1>
            <p>${I18n.t('portfolio.sub')}</p>
          </div>
          <div class="lc-dash-section">
            <div class="lc-dash-section-head"><h3>${I18n.t('portfolio.bucketsTitle')}</h3><span>${I18n.t('portfolio.bucketsSub')}</span></div>
            ${cards}
          </div>
          <div class="lc-empty-state">
            <h2>No positions yet</h2>
            <p>Pick a portfolio above or add your first holding.</p>
            <button type="button" class="psx-btn psx-btn-primary" data-action="App.openAddTransaction">${I18n.t('addHoldings')}</button>
          </div>
        </div>`;
      return;
    }

    const active = _filter ? buckets.find(b => b.id === _filter) : null;
    const holdings = _filter
      ? PortfolioBuckets.getHoldingsForBucket(state, _filter)
      : PortfolioAnalyticsService.getHoldings(state);
    _lastHoldings = holdings;
    const bucketStats = _filter ? PortfolioBuckets.statsForBucket(state, _filter) : null;
    const s = PortfolioAnalyticsService.getSummary(state);
    const daily = _filter
      ? holdings.reduce((sum, h) => sum + (h.dailyPnl || 0), 0)
      : State.calcDailyPnl();
    const heroValue = bucketStats ? bucketStats.value : s.totalValue;
    const totalPnl = bucketStats ? bucketStats.pnl : s.totalReturn.abs;
    const totalPnlPct = bucketStats ? bucketStats.pnlPct : s.totalReturn.pct;
    const dailyPct = heroValue > 0 ? (daily / heroValue) * 100 : 0;
    const heroPnlPct = totalPnlPct;
    const chartSeries = _chartData(_chartRange, heroValue);
    const chartUp = chartSeries.length >= 2 && chartSeries[chartSeries.length - 1] >= chartSeries[0];
    const ranges = ['1D', '1W', '1M', '1Y', 'All'];
    const chartBlock = typeof Charts !== 'undefined' ? `
          <div class="lc-pnl-chart-wrap">
            <div class="lc-range-picker" role="tablist" aria-label="Chart range">
              ${ranges.map((r) => `<button type="button" role="tab" class="lc-range-btn${_chartRange === r ? ' on' : ''}" aria-selected="${_chartRange === r}" data-action="PortfolioScreen.setChartRange" data-tab="${r}">${r}</button>`).join('')}
            </div>
            ${Charts.lineChartBlock(chartSeries, {
              height: 128,
              color: chartUp ? '#22c55e' : '#ef4444',
              ariaLabel: `Portfolio value ${_chartRange}`,
            })}
          </div>` : '';

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${active ? active.name : I18n.t('portfolio.title')}</h1>
          <p>${active ? active.desc : I18n.t('portfolio.sub')}</p>
          ${_filter ? `<div class="lc-pf-toolbar">
            <button type="button" class="psx-btn psx-btn-primary" data-action="App.openAddForPortfolio" data-tab="${_filter}">Transaction</button>
            <button type="button" class="psx-btn psx-btn-ghost" data-action="Transactions.openBucket" data-tab="${_filter}">Ledger</button>
          </div>` : ''}
        </div>
        <div class="lc-dash-hero">
          <div class="lc-dash-hero-label">${active ? active.name : I18n.t('portfolio.value')}</div>
          <div class="lc-dash-hero-val lc-num" data-lc-count="${heroValue}" data-lc-count-key="pf-hero">${PsxUI.fmt(heroValue)}</div>
          <div class="lc-pf-pnl-grid">
            <div class="lc-pf-pnl-box ${daily >= 0 ? 'up' : 'down'}">
              <label>${I18n.t('portfolio.today')}</label>
              <b class="lc-num">${PsxUI.fmt(daily, { signed: true })}</b>
              <em>${PsxUI.fmt(dailyPct, { pct: true, signed: true })}</em>
            </div>
            <div class="lc-pf-pnl-box ${totalPnl >= 0 ? 'up' : 'down'}">
              <label>${I18n.t('portfolio.gainLoss')}</label>
              <b class="lc-num">${PsxUI.fmt(totalPnl, { signed: true })}</b>
              <em>${PsxUI.fmt(heroPnlPct, { pct: true, signed: true })}</em>
            </div>
          </div>
          ${chartBlock}
        </div>
        <div class="lc-pulse-row">
          <div class="lc-pulse-pill"><label>${I18n.t('portfolio.yield')}</label><b class="psx-up">${s.portfolioDivYield.toFixed(2)}%</b></div>
          <div class="lc-pulse-pill"><label>${bucketStats?.deployedPkr ? 'Deployed' : I18n.t('portfolio.invested')}</label><b>${PsxUI.fmt(bucketStats?.deployedPkr ? bucketStats.deployedPkr : s.invested)}</b></div>
          <div class="lc-pulse-pill"><label>Cost basis</label><b>${PsxUI.fmt(bucketStats ? bucketStats.invested : s.invested)}</b></div>
          ${bucketStats?.cashPkr ? `<div class="lc-pulse-pill"><label>Cash</label><b>${PsxUI.fmt(bucketStats.cashPkr)}</b></div>` : ''}
          <div class="lc-pulse-pill"><label>${I18n.t('portfolio.gainLoss')}</label><b class="${(bucketStats ? bucketStats.pnl : s.totalReturn.abs) >= 0 ? 'psx-up' : 'psx-down'}">${PsxUI.fmt(bucketStats ? bucketStats.pnl : s.totalReturn.abs, { signed: true })}</b></div>
          <div class="lc-pulse-pill"><label>Positions</label><b>${holdings.length}</b></div>
        </div>
        <div class="lc-dash-section">
          <div class="lc-dash-section-head">
            <h3>${I18n.t('portfolio.bucketsTitle')}</h3>
            <span>${_filter ? `<button type="button" class="lc-link-btn" data-action="PortfolioScreen.clearFilter">Show all</button>` : I18n.t('portfolio.bucketsSub')}</span>
          </div>
          ${cards}
        </div>
        ${!_filter && (s.geoAllocation || []).length ? `<div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>Geography</h3><span>Allocation</span></div>
          <div class="psx-alloc-bars" style="padding:0 2px 12px">
            ${s.geoAllocation.map(g => `<div class="psx-alloc-row"><span>${g.label}</span><div class="psx-alloc-track"><div class="psx-alloc-fill" style="width:${Math.min(100, g.pct).toFixed(1)}%"></div></div><span>${g.pct.toFixed(1)}%</span></div>`).join('')}
          </div>
        </div>` : ''}
        <div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>Holdings</h3><span>${holdings.length} positions</span></div>
        </div>
        ${holdings.length ? _holdingsBlock(holdings) : `<div class="lc-empty-state" style="margin-top:0">
          <h2>No holdings in this portfolio</h2>
          <p>Add ${active ? active.name.toLowerCase() : 'positions'} to start tracking.</p>
          <button type="button" class="psx-btn psx-btn-primary" data-action="App.openAddForPortfolio" data-tab="${_filter || 'rafi'}">${I18n.t('addHoldings')}</button>
        </div>`}
        <div class="lc-dash-actions" style="margin-top:var(--lc-space-6)">
          <button type="button" class="psx-btn psx-btn-primary" data-action="App.openAddForPortfolio" data-tab="${_filter || ''}">${I18n.t('addHoldings')}</button>
          <button type="button" class="psx-btn psx-btn-ghost" data-action="App.openAddPortfolio">+ ${I18n.t('portfolio.addBucket')}</button>
        </div>
      </div>`;
  }

  function reconcile(symbol, broker, kind) {
    const h = _lastHoldings.find((x) => x.symbol === symbol && x.broker === broker && x.kind === kind)
      || _lastHoldings.find((x) => x.symbol === symbol);
    if (h && typeof App !== 'undefined') App.openReconcilePosition(h);
  }

  return { render, setFilter, clearFilter, currentFilter, reconcile, setChartRange, setSearch, setSort, setViewMode };
})();
window.PortfolioScreen = PortfolioScreen;

;/* === js/modules/funds.js === */
'use strict';
const Funds = (() => {
  let _filter = 'all';
  let _query = '';

  function _filteredFunds() {
    let funds = (window.MEEZAN_FUNDS || []).filter(f => {
      if (_filter === 'islamic') return f.isShariah;
      if (_filter === 'income') return /income|mmka/i.test(f.type || f.name);
      return true;
    });
    const q = _query.trim().toLowerCase();
    if (q) funds = funds.filter(f => f.symbol.toLowerCase().includes(q) || (f.name || '').toLowerCase().includes(q));
    return funds;
  }

  function _listHtml(funds) {
    // Cost basis comes from replaying the transaction ledger; the seed
    // MEEZAN_FUNDS avgNav is a value snapshot (== currentNav), not cost.
    const ledgerFunds = typeof Ledger !== 'undefined' && State.get()
      ? Ledger.calcFundHoldings(State.get().transactions || [])
      : [];
    return funds.map(f => {
      const a = (window.FUND_ANALYTICS_DB || {})[f.symbol] || {};
      const navRow = typeof FundNavService !== 'undefined' ? FundNavService.navFor(f.symbol) : { nav: State.getPrice(f.symbol) || f.currentNav || 0 };
      const nav = navRow.nav || 0;
      const navHint = typeof FundNavService !== 'undefined' ? FundNavService.label(f.symbol) : '';
      const lf = ledgerFunds.find(x => x.symbol === f.symbol);
      const invested = lf?.totalInvested || 0;
      const value = lf ? lf.units * nav : 0;
      const pnl = invested > 0 ? value - invested : 0;
      const right = invested
        ? `<span class="${PsxUI.chgCls(pnl)}">${PsxUI.fmt(pnl, { signed: true })}</span> · Inv ${PsxUI.fmt(invested)}`
        : (a.oneYearReturn != null ? a.oneYearReturn + '% 1Y' : f.type || '—');
      return `<button type="button" class="lc-market-row" data-action="Research.open" data-symbol="${f.symbol}">
        <div><div class="lc-market-sym">${f.symbol}</div><div class="lc-market-name">${f.name}${navHint ? ` · <span style="opacity:0.7">${navHint}</span>` : ''}</div></div>
        <div class="lc-market-price">${PsxUI.fmt(nav)}</div>
        <div class="lc-market-chg">${right}</div>
      </button>`;
    }).join('');
  }

  function _paintList() {
    const listEl = document.getElementById('funds-list');
    if (!listEl) { render(); return; }
    listEl.innerHTML = _listHtml(_filteredFunds());
  }

  function render() {
    const screen = document.getElementById('screen-funds');
    if (!screen) return;
    const funds = _filteredFunds();
    const meezanInvested = window.MEEZAN_TOTAL_PURCHASES_PKR || 0;
    const meezanValue = window.MEEZAN_PORTFOLIO_VALUE_PKR || funds.reduce((s, f) => {
      const navRow = typeof FundNavService !== 'undefined' ? FundNavService.navFor(f.symbol) : { nav: State.getPrice(f.symbol) || f.currentNav || 0 };
      return s + (f.units || 0) * (navRow.nav || 0);
    }, 0);

    screen.innerHTML = PsxUI.lcDash(I18n.t('tools.fundNavs.t'), I18n.t('tools.fundNavs.d'), `
      <div class="lc-pulse-row">
        <div class="lc-pulse-pill"><label>Total invested</label><b>${PsxUI.fmt(meezanInvested)}</b></div>
        <div class="lc-pulse-pill"><label>Portfolio value</label><b>${PsxUI.fmt(meezanValue)}</b></div>
        <div class="lc-pulse-pill"><label>Funds</label><b>${funds.length}</b></div>
        <div class="lc-pulse-pill"><label>Gain</label><b class="${meezanValue >= meezanInvested ? 'psx-up' : 'psx-down'}">${PsxUI.fmt(meezanValue - meezanInvested, { signed: true })}</b></div>
      </div>
      ${PsxUI.segment([
        { id: 'all', label: I18n.t('screener.all') },
        { id: 'islamic', label: I18n.t('screener.islamic') },
        { id: 'income', label: 'Income' },
      ], _filter, 'Funds')}
      <div class="lc-search-wrap">
        <input type="search" id="funds-search" placeholder="Search funds…" value="${_query.replace(/"/g, '&quot;')}" autocomplete="off" aria-label="Search funds">
        <p class="lc-search-hint">Type to shortlist — list updates in place</p>
      </div>
      <div class="lc-sector-card" style="margin-top:0" id="funds-list">${_listHtml(funds)}</div>
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-ghost" data-action="Navigation.go" data-screen="settings" data-hash="fund-nav-section">Update NAVs</button>
        <button type="button" class="psx-btn psx-btn-primary" data-action="App.refreshPrices">${I18n.t('refresh')}</button>
      </div>
    `);

    const inp = document.getElementById('funds-search');
    if (inp && !inp.dataset.bound) {
      inp.dataset.bound = '1';
      inp.addEventListener('input', e => { _query = e.target.value; _paintList(); });
    }
  }

  function setFilter(f) { _filter = f; render(); }
  function _onSearch(q) { _query = q; _paintList(); }
  return { render, setFilter, _onSearch };
})();
window.Funds = Funds;

;/* === js/modules/screener.js === */
'use strict';
const Screener = (() => {
  let _filter = 'all';
  let _query = '';
  let _page = 0;
  const PAGE = 80;

  function _rows() {
    const catalog = typeof PsxStocksCatalog !== 'undefined' ? PsxStocksCatalog.rows() : [];
    const db = window.FUNDAMENTALS_DB || {};
    return catalog.map((s) => {
      const f = db[s.symbol] || {};
      const price = State.getPrice(s.symbol) || (window.FALLBACK_PRICES || {})[s.symbol] || 0;
      return {
        ...s,
        pe: f.pe,
        divYield: f.divYield,
        profitGrowth: f.profitGrowth,
        roe: f.roe,
        price,
        hasFundamentals: !!(f.pe || f.divYield),
      };
    });
  }

  function _match(r) {
    if (_filter === 'islamic' && !r.isShariah) return false;
    if (_filter === 'highDiv') {
      if (!r.hasFundamentals) return false;
      if (!r.divYield || r.divYield < 6) return false;
    }
    if (_filter === 'value') {
      if (!r.hasFundamentals) return false;
      if (!r.pe || r.pe > 12) return false;
    }
    return true;
  }

  function _filteredRows() {
    const q = _query.trim().toLowerCase();
    let rows = _rows().filter(_match);
    if (q) rows = rows.filter((r) => r.symbol.toLowerCase().includes(q) || (r.name || '').toLowerCase().includes(q));
    rows.sort((a, b) => {
      const da = a.divYield || 0;
      const db = b.divYield || 0;
      if (db !== da) return db - da;
      return a.symbol.localeCompare(b.symbol);
    });
    return rows;
  }

  function _listHtml(rows) {
    return rows.map((r) => {
      const pe = r.pe != null ? r.pe : '—';
      const yld = r.divYield != null ? r.divYield + '%' : '—';
      const gr = r.profitGrowth != null ? r.profitGrowth + '% gr' : '—';
      return `<button type="button" class="lc-market-row" data-action="Research.open" data-symbol="${r.symbol}">
      <div><div class="lc-market-sym">${r.symbol}</div><div class="lc-market-name">P/E ${pe} · Yld ${yld}</div></div>
      <div class="lc-market-price">${r.price > 0 ? PsxUI.fmt(r.price) : '—'}</div>
      <div class="lc-market-chg ${PsxUI.chgCls(r.profitGrowth)}">${gr}</div>
    </button>`;
    }).join('');
  }

  function _paintList() {
    const listEl = document.getElementById('screener-list');
    const countEl = document.getElementById('screener-count');
    const fundEl = document.getElementById('screener-fund-count');
    if (!listEl) { render(); return; }
    const all = _filteredRows();
    const withFund = all.filter((r) => r.hasFundamentals).length;
    const start = _page * PAGE;
    const pageRows = all.slice(start, start + PAGE);
    const pages = Math.max(1, Math.ceil(all.length / PAGE));
    listEl.innerHTML = (pageRows.length ? _listHtml(pageRows) : '<p class="lc-empty-hint">No matches — try another filter.</p>')
      + (pages > 1 ? `<div class="lc-pager"><button type="button" class="psx-btn psx-btn-ghost" data-action="Screener.prevPage" ${_page <= 0 ? 'disabled' : ''}>Prev</button><span>${_page + 1} / ${pages}</span><button type="button" class="psx-btn psx-btn-ghost" data-action="Screener.nextPage" ${_page >= pages - 1 ? 'disabled' : ''}>Next</button></div>` : '');
    if (countEl) countEl.textContent = String(all.length);
    if (fundEl) fundEl.textContent = String(withFund);
  }

  function render() {
    const screen = document.getElementById('screen-screener');
    if (!screen) return;
    const all = _filteredRows();
    const withFund = all.filter((r) => r.hasFundamentals).length;
    const start = _page * PAGE;
    const pageRows = all.slice(start, start + PAGE);
    const pages = Math.max(1, Math.ceil(all.length / PAGE));

    screen.innerHTML = PsxUI.lcDash(I18n.t('screener.title'), I18n.t('screener.sub'), `
      ${PsxUI.segment([
        { id: 'all', label: I18n.t('screener.all') },
        { id: 'islamic', label: I18n.t('screener.islamic') },
        { id: 'highDiv', label: I18n.t('screener.highDiv') },
        { id: 'value', label: I18n.t('screener.value') },
      ], _filter, 'Screener')}
      <div class="lc-search-wrap">
        <input type="search" id="screener-search" placeholder="Filter results…" value="${_query.replace(/"/g, '&quot;')}" autocomplete="off" aria-label="Filter screener">
        <p class="lc-search-hint">Full PSX catalog · dividend/value filters need fundamentals seed</p>
      </div>
      <div class="lc-pulse-row">
        <div class="lc-pulse-pill"><label>Matches</label><b id="screener-count">${all.length}</b></div>
        <div class="lc-pulse-pill" title="Symbols with P/E or yield in seed DB"><label>With fundamentals</label><b id="screener-fund-count">${withFund}</b></div>
      </div>
      <div class="lc-sector-card" id="screener-list">${pageRows.length ? _listHtml(pageRows) : '<p class="lc-empty-hint">No matches.</p>'}${pages > 1 ? `<div class="lc-pager"><button type="button" class="psx-btn psx-btn-ghost" data-action="Screener.prevPage" ${_page <= 0 ? 'disabled' : ''}>Prev</button><span>${_page + 1} / ${pages}</span><button type="button" class="psx-btn psx-btn-ghost" data-action="Screener.nextPage" ${_page >= pages - 1 ? 'disabled' : ''}>Next</button></div>` : ''}</div>
    `);

    const inp = document.getElementById('screener-search');
    if (inp && !inp.dataset.bound) {
      inp.dataset.bound = '1';
      inp.addEventListener('input', (e) => { _query = e.target.value; _page = 0; _paintList(); });
    }
  }

  function setFilter(f) { _filter = f; _page = 0; render(); }
  function nextPage() { _page++; _paintList(); }
  function prevPage() { _page = Math.max(0, _page - 1); _paintList(); }
  function _onSearch(q) { _query = q; _page = 0; _paintList(); }
  return { render, setFilter, nextPage, prevPage, _onSearch };
})();
window.Screener = Screener;

;/* === js/modules/more.js === */
'use strict';
const More = (() => {
  const ITEMS = () => [
    { id: 'global', t: I18n.t('tools.global.t'), d: I18n.t('tools.global.d') },
    { id: 'commodities', t: I18n.t('tools.commodities.t'), d: I18n.t('tools.commodities.d') },
    { id: 'announcements', t: I18n.t('tools.announcements.t'), d: I18n.t('tools.announcements.d') },
    { id: 'zakat', t: I18n.t('tools.zakat.t'), d: I18n.t('tools.zakat.d') },
    { id: 'import', t: I18n.t('tools.import.t'), d: I18n.t('tools.import.d') },
    { id: 'screener', t: I18n.t('tools.screener.t'), d: I18n.t('tools.screener.d') },
    { id: 'dividends', t: I18n.t('tools.dividends.t'), d: I18n.t('tools.dividends.d') },
    { id: 'calendar', t: I18n.t('tools.calendar.t'), d: I18n.t('tools.calendar.d') },
    { id: 'watchlist', t: I18n.t('tools.watchlist.t'), d: I18n.t('tools.watchlist.d') },
    { id: 'signals', t: I18n.t('tools.signals.t'), d: I18n.t('tools.signals.d') },
    { id: 'risk-audit', t: I18n.t('tools.riskAudit.t'), d: I18n.t('tools.riskAudit.d') },
    { id: 'insights', t: I18n.t('tools.insightsTool.t'), d: I18n.t('tools.insightsTool.d') },
    { id: 'comparison', t: 'Compare', d: 'Side by side' },
    { id: 'performance', t: 'Performance', d: 'P&L · daily · forecast' },
    { id: 'journal', t: 'Journal', d: 'Investment thesis' },
    { id: 'transactions', t: I18n.t('tools.transactions.t'), d: I18n.t('tools.transactions.d') },
    { id: 'settings', t: 'Settings', d: I18n.t('more.sub') },
  ];

  function render() {
    const screen = document.getElementById('screen-more');
    if (!screen) return;
    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${I18n.t('more.title')}</h1>
          <p>${I18n.t('more.sub')}</p>
        </div>
        <div class="lc-tool-grid" style="margin-top:8px">
          ${ITEMS().map(it => `
            <button type="button" class="lc-tool-card" data-nav="${it.id}">
              <strong>${it.t}</strong>
              <span>${it.d}</span>
            </button>`).join('')}
        </div>
        <div style="padding:24px 4px">${I18n.langSwitcher('lc-more-lang')}</div>
      </div>`;
    I18n.bindLangSwitch(screen);
  }
  return { render };
})();
window.More = More;

;/* === js/modules/research.js === */
'use strict';
const Research = (() => {
  let _symbol = null;
  let _mode = 'stock';
  let _searchQ = '';

  function setMode(mode) {
    _mode = mode === 'portfolio' ? 'portfolio' : 'stock';
    try { sessionStorage.setItem('ledgercap_research_mode', _mode); } catch (_) {}
    render();
  }

  function open(symbol) {
    _symbol = symbol;
    _searchQ = '';
    _mode = 'stock';
    try { sessionStorage.setItem('ledgercap_research_mode', 'stock'); } catch (_) {}
    if (typeof Navigation !== 'undefined') Navigation.go('research', true);
    render();
  }

  function pickSymbol(sym) {
    if (!sym) return;
    _symbol = sym;
    _searchQ = '';
    render();
  }

  function _catalogSearch(q) {
    const needle = (q || '').trim().toUpperCase();
    if (!needle) return StockService.listSymbols().slice(0, 24);
    const out = [];
    const seen = new Set();
    const push = sym => { if (sym && !seen.has(sym)) { seen.add(sym); out.push(sym); } };
    [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].forEach(s => {
      if (s.symbol.includes(needle) || (s.name || '').toUpperCase().includes(needle)) push(s.symbol);
    });
    (window.INTL_STOCKS || []).forEach(s => {
      if (s.symbol.includes(needle) || (s.name || '').toUpperCase().includes(needle)) push(s.symbol);
    });
    (window.CRYPTO_ASSETS || []).forEach(s => {
      if (s.symbol.includes(needle) || (s.name || '').toUpperCase().includes(needle)) push(s.symbol);
    });
    Object.keys(window.FUNDAMENTALS_DB || {}).forEach(sym => {
      if (sym.includes(needle)) push(sym);
    });
    return out.slice(0, 24);
  }

  function _modeSegment() {
    return `<div class="lc-segment" role="tablist">
      <button type="button" class="lc-segment-btn${_mode === 'stock' ? ' on' : ''}" data-action="Research.setMode" data-tab="stock">Stock</button>
      <button type="button" class="lc-segment-btn${_mode === 'portfolio' ? ' on' : ''}" data-action="Research.setMode" data-tab="portfolio">Portfolio</button>
    </div>`;
  }

  function _metricGrid(cells) {
    return `<div class="lc-metric-grid">${cells.map(c => `
      <div class="lc-metric-cell"><label>${c.l}</label><strong class="${c.cls || ''}">${c.v}</strong></div>
    `).join('')}</div>`;
  }

  function _searchHitsHtml(matches) {
    if (!matches.length) return `<p class="psx-muted lc-search-empty">No symbols match</p>`;
    return matches.map(s => {
      const meta = (window.INTL_STOCKS || []).find(x => x.symbol === s)
        || (window.CRYPTO_ASSETS || []).find(x => x.symbol === s)
        || [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(x => x.symbol === s);
      const name = meta?.name || '';
      return `<button type="button" class="lc-search-hit${s === _symbol ? ' on' : ''}" onmousedown="event.preventDefault();Research.pickSymbol('${s}')">
        <strong>${s}</strong><span>${name}</span>
      </button>`;
    }).join('');
  }

  function _fmtMoney(sym, value, isIntl, isCrypto) {
    if (isIntl || isCrypto) return '$' + Number(value || 0).toFixed(2);
    return PsxUI.fmt(value);
  }

  function _fmtPct(value) {
    const n = Number(value);
    if (!Number.isFinite(n) || Math.abs(n) > 50) return '—';
    return PsxUI.fmt(n, { pct: true, signed: true });
  }

  function _usdDisplay(sym, quote) {
    const st = State.get()?.prices?.[sym];
    if (st?.priceUsd > 0) return st.priceUsd;
    if (quote?.priceUsd > 0) return quote.priceUsd;
    if (quote?.price > 0 && typeof FxService !== 'undefined') return FxService.pkrToUsd(quote.price);
    return (window.GLOBAL_FALLBACK_USD || {})[sym] || 0;
  }

  function _paintQuote(sym) {
    const q = MarketDataService.getQuote(sym);
    const isIntl = (window.INTL_STOCKS || []).some(i => i.symbol === sym);
    const isCrypto = (window.CRYPTO_ASSETS || []).some(c => c.symbol === sym);
    const priceEl = document.querySelector('.lc-research-price');
    const chgEl = document.querySelector('.lc-research-chg');
    const srcEl = document.querySelector('.lc-research-source');
    if (priceEl) {
      priceEl.textContent = (isIntl || isCrypto)
        ? `$${Number(_usdDisplay(sym, q)).toFixed(2)}`
        : PsxUI.fmt(q.price);
    }
    if (chgEl) {
      const chgTxt = _fmtPct(q.changePct);
      const dayLbl = q.sessionOpen ? 'today' : 'vs prev close';
      chgEl.textContent = chgTxt === '—' ? 'Change unavailable' : `${chgTxt} ${dayLbl}`;
      chgEl.className = `lc-research-chg ${q.changePct >= 0 ? 'up' : 'down'}`;
    }
    if (srcEl) {
      const lbl = q.quoteLabel || 'Last close';
      const age = q.ts && typeof Prices !== 'undefined' ? Prices.formatTs(q.ts) : '';
      srcEl.textContent = `${lbl}${age ? ' · ' + age : ''} · ${Prices.sourceLabel(q.source || 'seed')}`;
    }
  }

  async function _refreshQuote(sym) {
    if (!sym) return;
    const isIntl = (window.INTL_STOCKS || []).some(i => i.symbol === sym);
    const isCrypto = (window.CRYPTO_ASSETS || []).some(c => c.symbol === sym);
    let raw = null;
    if (isIntl && typeof Prices !== 'undefined' && Prices.fetchIntlSymbol) {
      raw = await Prices.fetchIntlSymbol(sym);
    } else if (isCrypto && typeof Prices !== 'undefined' && Prices.fetchCryptoSymbol) {
      raw = await Prices.fetchCryptoSymbol(sym);
    } else if (typeof MarketDataService !== 'undefined' && MarketDataService.fetchLiveQuote) {
      await MarketDataService.fetchLiveQuote(sym);
      if (sym === _symbol) _paintQuote(sym);
      return;
    }
    if (raw && (raw.priceUsd > 0 || raw.price > 0)) {
      State.updatePrice(sym, raw);
    }
    if (sym !== _symbol) return;
    _paintQuote(sym);
    const assetClass = isCrypto ? 'crypto' : isIntl ? 'intl' : 'psx';
    if (typeof TradingViewUI !== 'undefined') {
      TradingViewUI.mount('research-tv-chart', sym, assetClass);
    }
  }

  function _portfolioContext(symbol) {
    if (typeof PilotEngine === 'undefined') return '';
    const state = State.get();
    const brief = PilotEngine.buildMorningBrief(state);
    const sig = (brief.all_signals || []).find(s => s.symbol === symbol);
    const reb = PilotEngine.buildRebalancePlan(state).rows.find(r => r.symbol === symbol);
    if (!sig && !reb) return '';
    const rows = [];
    if (sig) {
      rows.push(`<div class="lc-verdict cap-reveal"><strong>Pilot signal:</strong> ${sig.action} — ${sig.rationale}</div>`);
    }
    if (reb && reb.action !== 'OK') {
      rows.push(`<div class="lc-verdict lc-verdict--warn cap-reveal"><strong>Rebalance:</strong> ${reb.action} · actual ${reb.actual_pct.toFixed(1)}%${reb.target_pct != null ? ` vs target ${reb.target_pct.toFixed(1)}%` : ''}</div>`);
    }
    return `<div class="lc-dash-section"><div class="lc-dash-section-head"><h3>Portfolio context</h3><span>Rule-based</span></div>${rows.join('')}</div>`;
  }

  function _onSearch(q) {
    _searchQ = q;
    const el = document.getElementById('rt-search-results');
    if (!el) return;
    el.innerHTML = _searchHitsHtml(_catalogSearch(q));
  }

  function _peersBlock(symbol, sector) {
    if (!sector) return '';
    const seen = new Set();
    const peers = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])]
      .filter(s => {
        if (s.sector !== sector || s.symbol === symbol || seen.has(s.symbol)) return false;
        seen.add(s.symbol);
        return true;
      })
      .slice(0, 6);
    if (!peers.length) return '';
    const rows = peers.map(p => {
      const q = State.getPrice(p.symbol) || (window.FALLBACK_PRICES || {})[p.symbol] || 0;
      const f = (window.FUNDAMENTALS_DB || {})[p.symbol] || {};
      return `<button type="button" class="lc-peer-row" data-action="Research.pickSymbol" data-symbol="${p.symbol}">
        <strong>${p.symbol}</strong><span>${p.name || ''}</span>
        <em>${q ? PsxUI.fmt(q) : '—'}</em><b>${f.pe ? 'P/E ' + Number(f.pe).toFixed(1) : ''}</b>
      </button>`;
    }).join('');
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Sector peers</h3><span>${sector}</span></div>
      <div class="lc-peer-list">${rows}</div>
    </div>`;
  }

  function _technicalBlock(symbol, price, prevClose) {
    if (typeof PilotEngine === 'undefined') return '';
    const t = PilotEngine.buildTechnical(symbol, price, prevClose || price);
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Technicals</h3><span>Rule-based</span></div>
      ${_metricGrid([
        { l: 'RSI (14)', v: t.rsi_14.toFixed(1) },
        { l: 'MA (20 est.)', v: PsxUI.fmt(t.ma_20) },
        { l: '52w position', v: t.position_in_52w_pct.toFixed(0) + '%' },
        { l: 'Day chg', v: _fmtPct(t.day_change_pct), cls: PsxUI.chgCls(t.day_change_pct) },
      ])}
    </div>`;
  }

  function _dividendBlock(symbol) {
    if (typeof CorporateActionsService === 'undefined') return '';
    const up = CorporateActionsService.getUpcomingCash(symbol)[0];
    const paid = CorporateActionsService.getPaidCash(symbol)[0];
    if (!up && !paid) return '';
    const cells = [];
    if (up) cells.push({ l: 'Next dividend', v: up.paymentDate ? up.paymentDate.slice(0, 10) : 'TBD' });
    if (up?.amount) cells.push({ l: 'Amount', v: '₨' + up.amount });
    if (paid) cells.push({ l: 'Last paid', v: (paid.paymentDate || '').slice(0, 10) || '—' });
    // Payout track record: yearly per-share history as mini bars + consistency verdict.
    const f = (window.FUNDAMENTALS_DB || {})[symbol];
    const hist = (f?.divHistory || []).slice().sort((a, b) => a.y - b.y);
    let histHtml = '';
    if (hist.length >= 2) {
      const rising = hist.every((h, i) => i === 0 || h.a >= hist[i - 1].a);
      histHtml = `<div class="lc-sector-card" style="margin-top:8px">
        <p class="lc-card-sub">Per-share payout by year — <strong class="${rising ? 'psx-up' : ''}">${rising ? 'consistent & growing' : 'variable'}</strong></p>
        ${Charts.barChart(hist.map(h => h.a), { height: 56, ariaLabel: `${symbol} dividend history` })}
        <div class="lc-range-bar-labels">${hist.map(h => `<span>${h.y} · ₨${h.a}</span>`).join('')}</div>
      </div>`;
    }
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Dividend check</h3><button type="button" class="lc-section-action" data-nav="announcements">All →</button></div>
      ${_metricGrid(cells)}
      ${histHtml}
    </div>`;
  }

  /** Rule-based good/bad tinting for investor parameters. */
  function _investorParams(symbol) {
    const f = (window.FUNDAMENTALS_DB || {})[symbol];
    if (!f) return '';
    const tint = (good, bad) => good ? 'psx-up' : bad ? 'psx-down' : '';
    const cells = [
      { l: 'P/E', v: f.pe != null ? f.pe.toFixed(1) : '—', cls: tint(f.pe > 0 && f.pe < 10, f.pe > 20) },
      { l: 'P/B', v: f.pb != null ? f.pb.toFixed(1) : '—', cls: tint(f.pb > 0 && f.pb < 1.5, f.pb > 4) },
      { l: 'ROE', v: f.roe != null ? f.roe.toFixed(1) + '%' : '—', cls: tint(f.roe >= 15, f.roe < 8) },
      { l: 'Dividend yield', v: f.divYield != null ? f.divYield.toFixed(1) + '%' : '—', cls: tint(f.divYield >= 6, false) },
      { l: 'Payout ratio', v: f.payout != null ? f.payout + '%' : '—', cls: tint(f.payout >= 30 && f.payout <= 70, f.payout > 90) },
      { l: 'Debt / equity', v: f.debtToEquity != null ? f.debtToEquity.toFixed(2) : '—', cls: tint(f.debtToEquity <= 0.3, f.debtToEquity > 0.8) },
      { l: 'Revenue growth', v: f.revGrowth != null ? _fmtPct(f.revGrowth) : '—', cls: PsxUI.chgCls(f.revGrowth) },
      { l: 'Profit growth', v: f.profitGrowth != null ? _fmtPct(f.profitGrowth) : '—', cls: PsxUI.chgCls(f.profitGrowth) },
    ];
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Investor parameters</h3><span>Green/red = rule thresholds, not advice</span></div>
      ${_metricGrid(cells)}
    </div>`;
  }

  const _GLOSSARY = [
    ['P/E ratio', 'Price ÷ yearly earnings per share. How many years of current profit you pay for the stock. Lower can mean cheaper — or a business in trouble.'],
    ['P/B ratio', 'Price ÷ book value per share. Under 1 means the market prices the company below its net assets.'],
    ['ROE', 'Return on equity — profit as % of shareholders’ money. Higher = the business earns more on the capital it keeps.'],
    ['Dividend yield', 'Yearly cash dividend ÷ price. What the stock pays you to hold it, before tax.'],
    ['Payout ratio', 'Share of profit paid out as dividends. 30–70% is usually sustainable; above ~90% is hard to keep up.'],
    ['Debt / equity', 'Borrowed money vs shareholders’ money. High leverage amplifies both gains and trouble.'],
    ['52-week range', 'Cheapest and most expensive the stock traded in the last year. Position near the low is not automatically a bargain.'],
    ['Fair value (rule-based)', 'A simple estimate this app computes from earnings, growth and sector norms. It is a sanity check, not a target price.'],
  ];

  function _glossaryBlock() {
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Learn the basics</h3><span>Plain-language glossary</span></div>
      <div class="lc-sector-card">
        ${_GLOSSARY.map(([t, d]) => `<details class="lc-glossary-item"><summary>${t}</summary><p>${d}</p></details>`).join('')}
      </div>
    </div>`;
  }

  async function _loadOrderBook(sym, isPsx) {
    const host = document.getElementById('research-orderbook');
    if (!host) return;
    if (!isPsx) {
      host.innerHTML = '<p class="psx-muted lc-card-sub">Bid/offer depth available for PSX symbols during market hours.</p>';
      return;
    }
    host.innerHTML = '<p class="psx-muted">Loading order book…</p>';
    const data = typeof MarketWatchService !== 'undefined'
      ? await MarketWatchService.getOrderBook(sym)
      : null;
    host.innerHTML = typeof MarketWatchService !== 'undefined'
      ? MarketWatchService.panelHtml(data)
      : '<p class="psx-muted">Order book unavailable.</p>';
  }

  let _histRange = '6M';
  let _histSeries = null; // cache per symbol
  let _histSymbol = null;

  async function _load52w(sym, price) {
    const host = document.getElementById('research-52w');
    if (!host || typeof Prices === 'undefined') return;
    let series = [];
    try {
      // Proxy fallback chains can hang for minutes — cap the wait so the
      // section degrades honestly instead of spinning forever.
      series = await Promise.race([
        Prices.fetchPriceSeries(sym, 252),
        new Promise(resolve => setTimeout(() => resolve([]), 12000)),
      ]);
    } catch (_) {}
    if (_symbol !== sym) return; // user moved on while we were fetching
    if (series.length < 5) {
      const msg = '<p class="psx-muted lc-card-sub">PSX end-of-day feed unreachable right now — history returns when the feed recovers.</p>';
      host.innerHTML = msg;
      const hist = document.getElementById('research-history');
      if (hist) hist.innerHTML = msg;
      return;
    }
    _histSeries = series;
    _histSymbol = sym;
    const low = Math.min(...series);
    const high = Math.max(...series);
    host.innerHTML = `
      ${Charts.rangeBar(low, high, price, {
        lowLabel: 'Low ' + PsxUI.fmt(low),
        highLabel: 'High ' + PsxUI.fmt(high),
        markerLabel: PsxUI.fmt(price),
        ariaLabel: `52 week range ${PsxUI.fmt(low)} to ${PsxUI.fmt(high)}, current ${PsxUI.fmt(price)}`,
      })}`;
    _paintHistory();
  }

  function setHistRange(r) {
    _histRange = r;
    _paintHistory();
  }

  function _paintHistory() {
    const host = document.getElementById('research-history');
    if (!host || !_histSeries) return;
    const n = _histRange === '1M' ? 22 : _histRange === '6M' ? 126 : 252;
    const slice = _histSeries.slice(-n);
    if (slice.length < 2) { host.innerHTML = ''; return; }
    const up = slice[slice.length - 1] >= slice[0];
    const chg = slice[0] ? ((slice[slice.length - 1] - slice[0]) / slice[0]) * 100 : 0;
    host.innerHTML = `
      <div class="lc-range-picker" role="tablist" aria-label="History range">
        ${['1M', '6M', '1Y'].map(r => `<button type="button" role="tab" class="lc-range-btn${_histRange === r ? ' on' : ''}" aria-selected="${_histRange === r}" data-action="Research.setHistRange" data-tab="${r}">${r}</button>`).join('')}
        <span class="lc-card-sub ${up ? 'psx-up' : 'psx-down'}" style="margin-left:auto">${(chg >= 0 ? '+' : '') + chg.toFixed(1)}% ${_histRange}</span>
      </div>
      ${Charts.lineChart(slice, { height: 120, color: up ? 'var(--psx-up, #30d158)' : 'var(--psx-down, #ff453a)', ariaLabel: `${_histSymbol} price history ${_histRange}` })}`;
  }

  function _valueCheck(price, fairValue) {
    if (!(fairValue > 0) || !(price > 0)) return '';
    const gap = ((price - fairValue) / fairValue) * 100;
    const verdict = gap > 15 ? 'Overvalued' : gap < -15 ? 'Undervalued' : 'Fairly valued';
    const cls = gap > 15 ? 'psx-down' : gap < -15 ? 'psx-up' : '';
    const lo = Math.min(price, fairValue) * 0.85;
    const hi = Math.max(price, fairValue) * 1.15;
    return `<div class="lc-dash-section">
      <div class="lc-dash-section-head"><h3>Value check</h3><span>Rule-based estimate — not advice</span></div>
      <div class="lc-sector-card">
        <p class="lc-card-sub"><strong class="${cls}">${verdict}</strong> — price ${PsxUI.fmt(price)} vs estimated fair value ${PsxUI.fmt(fairValue)} (${(gap >= 0 ? '+' : '') + gap.toFixed(1)}%)</p>
        ${Charts.rangeBar(lo, hi, price, { lowLabel: PsxUI.fmt(lo), highLabel: PsxUI.fmt(hi), markerLabel: 'Fair ' + PsxUI.fmt(fairValue) })}
      </div>
    </div>`;
  }

  function render() {
    const screen = document.getElementById('screen-research');
    if (!screen) return;

    if (_mode === 'portfolio') {
      const state = State.get();
      const bucketsHtml = typeof PortfolioBuckets !== 'undefined'
        ? `<div class="lc-dash-section" style="padding:0 var(--lc-space-4)">
            <div class="lc-dash-section-head"><h3>${I18n.t('portfolio.bucketsTitle')}</h3><span>${I18n.t('portfolio.bucketsSub')}</span></div>
            <div class="lc-portfolio-grid">${PortfolioBuckets.cardsHtml(state)}</div>
          </div>`
        : '';
      screen.innerHTML = `
        <div class="lc-dash">
          <div class="lc-screen-head">
            <h1>${I18n.t('analyze.title')}</h1>
            <p>Portfolio intelligence &amp; risk signals</p>
          </div>
          ${_modeSegment()}
          ${bucketsHtml}
          <div class="lc-dash-actions" style="padding:0 var(--lc-space-4) 8px;display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" class="psx-btn psx-btn-ghost" data-nav="risk-audit">Full risk audit →</button>
            <button type="button" class="psx-btn psx-btn-ghost" data-nav="insights">Portfolio insights →</button>
          </div>
          <div id="research-portfolio-host" style="padding:0 var(--lc-space-4)"></div>
        </div>`;
      if (window.Intelligence) Intelligence.render(document.getElementById('research-portfolio-host'));
      return;
    }

    const symbols = StockService.listSymbols();
    if (!_symbol && symbols.length) {
      // Default to the user's largest holding — never a random catalog
      // entry with a $0 seed price.
      try {
        const txs = State.get().transactions || [];
        const held = Ledger.calcHoldings(txs)
          .map(h => ({ symbol: h.symbol, value: h.shares * (State.getPrice(h.symbol) || h.avgCost) }))
          .sort((a, b) => b.value - a.value);
        _symbol = held[0]?.symbol || symbols[0];
      } catch (_) {
        _symbol = symbols[0];
      }
    }
    if (!_symbol) {
      screen.innerHTML = `
        <div class="lc-dash">
          <div class="lc-screen-head">
            <h1>${I18n.t('analyze.title')}</h1>
            <p>Add holdings to analyze</p>
          </div>
          ${_modeSegment()}
          <div class="lc-search-wrap">
            <input type="search" placeholder="Search US, PSX, crypto…" id="rt-search" value="${_searchQ.replace(/"/g, '&quot;')}" oninput="Research._onSearch(this.value)" autocomplete="off" aria-label="Search symbols" aria-controls="rt-search-results">
            <div id="rt-search-results" class="lc-search-results" role="listbox"></div>
          </div>
          <div class="lc-empty-state">
            <h2>No symbols</h2>
            <p>Search above or add holdings / load demo.</p>
            <button type="button" class="psx-btn psx-btn-primary" data-action="App.openAddTransaction">${I18n.t('addHoldings')}</button>
          </div>
        </div>`;
      _onSearch(_searchQ);
      return;
    }

    const r = ResearchService.getStockReport(_symbol);
    const { profile, fundamentals: f, quote, changes, ai, position } = r;
    const isFund = f.type === 'fund';
    const sd = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === r.symbol);
    const shLabel = sd?.isShariah ? I18n.t('analyze.shariahCompliant') : I18n.t('analyze.notShariah');
    const chgCls = quote.changePct >= 0 ? 'up' : 'down';
    const isIntl = (window.INTL_STOCKS || []).some(i => i.symbol === r.symbol);
    const isCrypto = (window.CRYPTO_ASSETS || []).some(c => c.symbol === r.symbol);
    const priceLabel = (isIntl || isCrypto)
      ? `$${Number(_usdDisplay(r.symbol, quote)).toFixed(2)}`
      : PsxUI.fmt(quote.price);

    const fundMetrics = !isFund ? _metricGrid([
      { l: 'P/E', v: f.pe ?? '—' },
      { l: 'Div yield', v: f.divYield ? Number(f.divYield).toFixed(2) + '%' : '—' },
      { l: 'ROE', v: f.roe ? Number(f.roe).toFixed(2) + '%' : '—' },
      { l: 'EPS', v: f.eps ? ((isIntl || isCrypto) ? '$' : '₨') + Number(f.eps).toFixed(2) : '—' },
    ]) : '';

    const fundNote = (!isFund && (isIntl || isCrypto) && !f.available)
      ? `<p class="psx-muted lc-card-sub">US/crypto fundamentals appear after live refresh (Yahoo P/E &amp; yield).</p>`
      : '';

    const perfMetrics = _metricGrid([
      { l: 'Daily', v: _fmtPct(changes.daily), cls: PsxUI.chgCls(changes.daily) },
      { l: 'Weekly', v: _fmtPct(changes.weekly), cls: PsxUI.chgCls(changes.weekly) },
      { l: 'Monthly', v: _fmtPct(changes.monthly), cls: PsxUI.chgCls(changes.monthly) },
      { l: 'Yearly', v: changes.yearly ? _fmtPct(changes.yearly) : '—', cls: PsxUI.chgCls(changes.yearly) },
    ]);

    const positionBlock = position ? `
      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Your position</h3><span>${position.shares} shares</span></div>
      </div>
      ${_metricGrid([
        { l: 'Market value', v: PsxUI.fmt(position.value) },
        { l: 'P&amp;L', v: PsxUI.fmt(position.pnlPct, { pct: true, signed: true }), cls: PsxUI.chgCls(position.pnl) },
      ])}` : '';

    const quickPicks = symbols.slice(0, 16);

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${I18n.t('analyze.title')}</h1>
          <p>${I18n.t('analyze.sub')}</p>
        </div>
        ${_modeSegment()}
        <div class="lc-search-wrap">
          <input type="search" placeholder="Search symbol — type to shortlist" id="rt-search" value="${_searchQ.replace(/"/g, '&quot;')}" oninput="Research._onSearch(this.value)" autocomplete="off" aria-label="Search symbols" aria-controls="rt-search-results">
          <div id="rt-search-results" class="lc-search-results" role="listbox">${_searchHitsHtml(_searchQ ? _catalogSearch(_searchQ) : [])}</div>
        </div>
        <div class="lc-research-hero">
          <div class="lc-research-hero-top">
            <div>
              <h2>${esc(r.symbol)}</h2>
              <p>${esc(profile.name)}${profile.sector ? ' · ' + esc(profile.sector) : ''}</p>
            </div>
          </div>
          <div class="lc-research-price">${priceLabel}</div>
          <span class="lc-research-chg ${chgCls}">${_fmtPct(quote.changePct) === '—' ? 'Change unavailable' : _fmtPct(quote.changePct) + ' today'}</span>
          <p class="lc-card-sub lc-research-source">Source: ${Prices.sourceLabel(quote.source || 'seed')}</p>
        </div>
        <div class="lc-verdict ${ai.action === 'BUY' || ai.action === 'HOLD+' ? 'lc-verdict--healthy' : ai.action === 'SELL' || ai.riskScore > 70 ? 'lc-verdict--risky' : 'lc-verdict--caution'}">
          <h3>${I18n.t('analyze.plainEnglish')}</h3>
          <p>${esc(ai.summary)}</p>
          <div class="lc-verdict-meta">${shLabel}</div>
        </div>
        <div class="lc-sym-scroll" id="rt-pills">${quickPicks.map(s =>
          `<button type="button" class="lc-sym-chip${s === r.symbol ? ' on' : ''}" data-action="Research.pickSymbol" data-symbol="${s}">${s}</button>`
        ).join('')}</div>
        ${_metricGrid([
          { l: 'Smart rating (rules)', v: ai.action },
          { l: 'Confidence', v: ai.confidence + '%' },
          { l: 'Fair value', v: _fmtMoney(r.symbol, ai.fairValue, isIntl, isCrypto) },
          { l: 'Risk', v: ai.riskScore + '/100' },
        ])}
        ${!isFund ? `<div class="lc-dash-section"><div class="lc-dash-section-head"><h3>${I18n.t('analyze.fundamentals')}</h3></div></div>${fundNote}${fundMetrics}` : ''}
        ${!isIntl && !isCrypto ? `<div class="lc-dash-section">
          <div class="lc-dash-section-head"><h3>Market depth</h3><span>Bid · offer</span></div>
          <div id="research-orderbook"><p class="psx-muted">Loading…</p></div>
        </div>` : ''}
        ${_technicalBlock(r.symbol, quote.price, quote.prevClose)}
        <div class="lc-dash-section"><div class="lc-dash-section-head"><h3>52-week range</h3><span>EOD history</span></div><div class="lc-sector-card" id="research-52w"><p class="psx-muted lc-card-sub">Loading…</p></div></div>
        <div class="lc-dash-section"><div class="lc-dash-section-head"><h3>Price trend</h3><span>EOD closes</span></div><div class="lc-sector-card" id="research-history"><p class="psx-muted lc-card-sub">Loading…</p></div></div>
        ${_valueCheck(quote.price, ai.fairValue)}
        ${!isIntl && !isCrypto && !isFund ? _investorParams(r.symbol) : ''}
        ${_peersBlock(r.symbol, profile.sector)}
        ${_dividendBlock(r.symbol)}
        <div class="lc-dash-section"><div class="lc-dash-section-head"><h3>Performance</h3><span>% change</span></div></div>
        ${perfMetrics}
        ${_portfolioContext(r.symbol)}
        ${positionBlock}
        <div class="lc-chart-block">
          <div class="lc-dash-section-head"><h3>Price history</h3><span>Last ~30 sessions</span></div>
          <div id="research-tv-chart" style="min-height:320px"></div>
        </div>
        ${_glossaryBlock()}
      </div>`;

    const assetClass = isCrypto ? 'crypto' : isIntl ? 'intl' : 'psx';
    if (typeof TradingViewUI !== 'undefined') {
      TradingViewUI.destroy('research-tv-chart');
      TradingViewUI.mount('research-tv-chart', r.symbol, assetClass);
    }
    _refreshQuote(r.symbol);
    if (!isIntl && !isCrypto) _loadOrderBook(r.symbol, true);
    else _loadOrderBook(r.symbol, false);
    _load52w(r.symbol, quote.price);
  }

  return { render, open, pickSymbol, setMode, setHistRange, _onSearch };
})();
window.Research = Research;

;/* === js/modules/watchlist.js === */
'use strict';
const Watchlist = (() => {
  const U = PlatformUI;

  function _form(item) {
    const w = item || {};
    return `
    <div class="field"><label class="field-label">Symbol</label><input class="field-input" id="wl-symbol" value="${w.symbol || ''}"></div>
    <div class="field"><label class="field-label">Name</label><input class="field-input" id="wl-name" value="${w.name || ''}"></div>
    <div class="field"><label class="field-label">Thesis</label><textarea class="field-input" id="wl-thesis" rows="3">${w.thesis || ''}</textarea></div>
    <div class="field"><label class="field-label">Alert target price (PKR)</label><input class="field-input" id="wl-target" type="number" step="0.01" value="${w.targetPrice || ''}" placeholder="Buy below this price"></div>
    <label class="lc-check-row"><input type="checkbox" id="wl-alert" ${w.alertEnabled !== false ? 'checked' : ''}> Alert on crossover ≤ target (PSX session)</label>
    <button type="button" class="os-btn os-btn-primary" style="width:100%;margin-top:8px;" data-action="Watchlist.save" data-tab="${w.id || ''}">Save</button>`;
  }

  function openAdd() { App.requestAlertPermission?.(); App.openBottomSheet('watchlist-add', 'Add to Watchlist', _form()); }
  function openEdit(id) { const item = (State.get('watchlist') || []).find(w => w.id === id); if (item) App.openBottomSheet('watchlist-edit', 'Edit', _form(item)); }

  function save(id) {
    const symbol = document.getElementById('wl-symbol')?.value?.trim().toUpperCase();
    if (!symbol) return App.showToast('Symbol required', 'warning');
    const targetPrice = parseFloat(document.getElementById('wl-target')?.value) || 0;
    const alertEnabled = document.getElementById('wl-alert')?.checked !== false;
    if (alertEnabled && targetPrice > 0) App.requestAlertPermission?.();
    const entry = {
      symbol, name: document.getElementById('wl-name')?.value?.trim() || symbol,
      thesis: document.getElementById('wl-thesis')?.value?.trim() || '',
      targetPrice,
      alertEnabled,
      priority: 'MEDIUM',
    };
    State.update(s => {
      if (id) { const i = s.watchlist.findIndex(w => w.id === id); if (i >= 0) s.watchlist[i] = { ...s.watchlist[i], ...entry }; }
      else s.watchlist.push({ ...entry, id: Ledger.newId(), addedAt: Date.now() });
    });
    App.closeBottomSheet(); render();
  }

  function remove(id) { State.update(s => { s.watchlist = s.watchlist.filter(w => w.id !== id); }); render(); }

  function render() {
    const screen = document.getElementById('screen-watchlist');
    if (!screen) return;
    const list = State.get('watchlist') || [];

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Watchlist</h1><p>${list.length} symbols · alerts when target hit</p></div>
    <div class="lc-dash-actions cap-reveal"><button type="button" class="lc-btn-primary" data-action="Watchlist.openAdd">+ Add symbol</button></div>
    ${list.length ? list.map(w => {
      const quote = MarketDataService.getQuote(w.symbol);
      const ai = AIAnalysis.analyze(w.symbol);
      const upside = quote.price > 0 ? ((ai.fairValue - quote.price) / quote.price * 100) : 0;
      const alertHit = w.targetPrice > 0 && quote.price > 0 && quote.price <= w.targetPrice;
      return `
      <div class="rt-wl-card cap-reveal${alertHit ? ' lc-alert-hit' : ''}">
        <div class="rt-wl-card-main" data-action="Research.open" data-symbol="${w.symbol}">
          <div class="rt-wl-head">
            <strong>${w.symbol}</strong>
            ${U.ratingBadge(ai.action)}
            ${alertHit ? '<span class="lc-alert-badge">Target hit</span>' : ''}
          </div>
          <div class="lc-card-sub">${w.name}${w.thesis ? ' · ' + w.thesis.slice(0, 50) : ''}</div>
          <div class="lc-card-meta">
            <span>Fair: <strong>${U.fmt(ai.fairValue)}</strong></span>
            <span class="${U.chgCls(upside)}">Upside ${U.fmt(upside, { pct: true, signed: true })}</span>
            ${w.targetPrice ? `<span>Target ${U.fmt(w.targetPrice)}</span>` : ''}
          </div>
        </div>
        <div class="rt-wl-price" data-action="Research.open" data-symbol="${w.symbol}">
          <div class="rt-wl-price-val">${U.fmt(quote.price)}</div>
          <div class="${U.chgCls(quote.changePct)} rt-wl-price-chg">${U.fmt(quote.changePct, { pct: true, signed: true })}</div>
          <div class="lc-card-sub">${Prices.sourceLabel?.(quote.source) || quote.source || ''}</div>
        </div>
        <div class="rt-wl-foot">
          <button type="button" class="os-btn os-btn-ghost rt-wl-foot-btn" data-action="Watchlist.openEdit" data-tab="${w.id}" data-stop="1">Edit</button>
          <button type="button" class="os-btn os-btn-ghost rt-wl-foot-btn" data-action="Watchlist.remove" data-tab="${w.id}" data-stop="1">Remove</button>
        </div>
      </div>`;
    }).join('') : `<div class="lc-empty-note">Empty watchlist. Track symbols before you buy.</div>`}
    </div>`;
    CapMotion.refresh();
  }

  return { render, openAdd, openEdit, save, remove };
})();
window.Watchlist = Watchlist;

;/* === js/modules/dividends.js === */
'use strict';
const Dividends = (() => {
  const U = PlatformUI;
  let _tab = 'overview';

  function _tabs() {
    return [
      { id: 'overview', label: 'Overview' },
      { id: 'upcoming', label: 'Upcoming' },
      { id: 'calendar', label: 'Calendar' },
      { id: 'holdings', label: 'Holdings' },
      { id: 'history', label: 'History' },
      { id: 'forecast', label: 'Forecast' },
      { id: 'growth', label: 'Growth' },
    ];
  }

  function _tabBar() {
    return `<div class="div-tabs cap-tab-bar cap-reveal">${_tabs().map(t =>
      `<button type="button" class="div-tab cap-tab${_tab === t.id ? ' active' : ''}" data-action="Dividends.setTab" data-tab="${t.id}">${t.label}</button>`
    ).join('')}</div>`;
  }

  function setTab(id) { _tab = id; render(); }

  function _hero(dash) {
    const top = dash.byStock[0];
    return `
    <div class="div-hero cap-reveal">
      <div class="div-hero-grid">
        <div>
          <div class="div-hero-item-label">Received YTD</div>
          <div class="div-hero-item-value t-gain">${U.fmt(dash.receivedYtd)}</div>
        </div>
        <div>
          <div class="div-hero-item-label">Expected ${new Date().getFullYear()}</div>
          <div class="div-hero-item-value">${U.fmt(dash.expectedThisYear)}</div>
        </div>
        <div>
          <div class="div-hero-item-label">Top income holding</div>
          <div class="div-hero-item-value">${top ? top.symbol : '—'}</div>
          ${top ? `<div style="font-size:var(--type-caption);color:var(--os-text-secondary);margin-top:var(--space-1);">${U.fmt(top.annualIncome)}/yr · ${top.currentYield != null ? top.currentYield.toFixed(1) + '% yield' : ''}</div>` : ''}
        </div>
      </div>
    </div>`;
  }

  function _overview(dash, forecast) {
    return `
    ${_hero(dash)}
    ${U.section('', U.metricGrid([
      U.metricCell('Portfolio Yield', U.fmt(dash.portfolioYield, { pct: true }), 'On cost basis'),
      U.metricCell('Monthly forecast', U.fmt(dash.monthlyForecast), 'Avg this year'),
      U.metricCell('Next year', U.fmt(dash.expectedNextYear), 'Forecast'),
      U.metricCell('Lifetime', U.fmt(dash.lifetime), dash.holdingsCount + ' dividend stocks'),
    ], 4))}

    ${dash.upcoming.filter(u => u.isHeld).length ? U.section('Next Dividend Events', `
      <div class="rt-table-wrap"><table class="rt-table"><thead><tr>
        <th>Company</th><th>Amount/sh</th><th>Ex-Date</th><th>Record</th><th>Payment</th><th>Your Income</th>
      </tr></thead><tbody>
      ${dash.upcoming.filter(u => u.isHeld).slice(0, 8).map(u => `
        <tr data-action="Research.open" data-symbol="${u.symbol}">
          <td><strong>${u.symbol}</strong><div style="font-size:0.68rem;color:var(--os-text-tertiary)">${u.companyName || ''}</div></td>
          <td>₨${u.amountPerShare}</td>
          <td>${u.exDate || '—'}</td>
          <td>${u.recordDate || '—'}</td>
          <td>${u.paymentDate || '—'}</td>
          <td class="t-gain">${U.fmt(u.expectedIncome)}</td>
        </tr>`).join('')}
      </tbody></table></div>`) : ''}

    ${U.section('Income by Stock', dash.byStock.length ? `
      <div class="rt-table-wrap"><table class="rt-table"><thead><tr>
        <th>Stock</th><th>Annual Income</th><th>Received</th><th>YoC</th><th>Yield</th><th>CAGR</th>
      </tr></thead><tbody>
      ${dash.byStock.map(h => `
        <tr data-action="Research.open" data-symbol="${h.symbol}">
          <td><strong>${h.symbol}</strong><div style="font-size:0.68rem;color:var(--os-text-tertiary)">${h.sector}</div></td>
          <td class="t-gain">${U.fmt(h.annualIncome)}</td>
          <td>${U.fmt(h.totalReceived)}</td>
          <td>${h.yieldOnCost != null ? h.yieldOnCost.toFixed(1) + '%' : '—'}</td>
          <td>${h.currentYield != null ? h.currentYield.toFixed(1) + '%' : '—'}</td>
          <td>${h.cagr != null ? h.cagr.toFixed(1) + '%' : '—'}</td>
        </tr>`).join('')}
      </tbody></table></div>` : '<div style="color:var(--os-text-secondary);font-size:0.85rem;">No dividend-paying holdings.</div>')}

    ${U.section('Income by Sector', dash.bySector.length ? dash.bySector.map(s => `
      <div class="os-row"><div><div class="os-row-sym">${s.sector}</div><div class="os-row-sub">${s.symbols.join(', ')}</div></div>
      <div class="os-row-val t-gain">${U.fmt(s.annualIncome)} · ${s.pct.toFixed(0)}%</div></div>`).join('') : '')}`;
  }

  function _upcoming(dash) {
    const all = dash.upcoming;
    return U.section('All Upcoming Dividends', all.length ? `
      <div class="rt-table-wrap"><table class="rt-table"><thead><tr>
        <th>Company</th><th>Amount/sh</th><th>Ex-Dividend</th><th>Record Date</th><th>Payment Date</th><th>Shares</th><th>Expected Income</th>
      </tr></thead><tbody>
      ${all.map(u => `
        <tr data-action="Research.open" data-symbol="${u.symbol}">
          <td><strong>${u.symbol}</strong><div style="font-size:0.68rem;color:var(--os-text-tertiary)">${u.companyName || ''}</div></td>
          <td>₨${u.amountPerShare}</td>
          <td>${u.exDate}</td>
          <td>${u.recordDate}</td>
          <td>${u.paymentDate}</td>
          <td>${u.isHeld ? u.shares : '<span style="color:var(--os-text-tertiary)">—</span>'}</td>
          <td class="${u.isHeld ? 't-gain' : ''}">${u.isHeld ? U.fmt(u.expectedIncome) : '—'}</td>
        </tr>`).join('')}
      </tbody></table></div>` : '<div style="color:var(--os-text-secondary);">No upcoming dividends in dataset.</div>');
  }

  function _calendar(cal) {
    return cal.length ? cal.map(m => `
      <div class="div-cal-month cap-reveal">
        <div class="div-cal-month-title">${new Date(m.month + '-01').toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}</div>
        ${m.paymentEvents.length ? `<div class="div-cal-section-label">Payment dates</div>` + m.paymentEvents.map(e => `
          <div class="rt-div-event" data-action="Research.open" data-symbol="${e.symbol}">
            <div><strong>${e.symbol}</strong> · ${e.paymentDate}<div style="font-size:0.68rem;color:var(--os-text-tertiary)">₨${e.amountPerShare}/sh${e.isHeld ? ' · ' + e.shares + ' shares' : ''}</div></div>
            <div class="t-gain">${e.isHeld ? U.fmt(e.expectedIncome) : '—'}</div>
          </div>`).join('') : ''}
        ${m.exEvents.length ? `<div class="div-cal-section-label">Ex-dividend dates</div>` + m.exEvents.map(e => `
          <div class="rt-div-event" data-action="Research.open" data-symbol="${e.symbol}">
            <div><strong>${e.symbol}</strong> · Ex ${e.exDate}</div>
            <div style="font-size:0.72rem;color:var(--os-text-tertiary)">Record ${e.recordDate}</div>
          </div>`).join('') : ''}
      </div>`).join('') : '<div class="os-section" style="color:var(--os-text-secondary);">No calendar events.</div>';
  }

  function _holdings(holdings) {
    const drip = State.get('dripSettings') || {};
    return holdings.length ? `
      <div class="rt-table-wrap cap-reveal"><table class="rt-table"><thead><tr>
        <th>Holding</th><th>Shares</th><th>Annual Income</th><th>YoC</th><th>Yield</th><th>DRIP</th><th>Received</th>
      </tr></thead><tbody>
      ${holdings.map(h => {
        const yoc = DividendService.getYieldOnCost(h.symbol, h.avgCost, h.shares);
        const on = !!drip[h.symbol]?.reinvest;
        return `
        <tr data-action="Research.open" data-symbol="${h.symbol}" style="cursor:pointer">
          <td><strong>${h.symbol}</strong><div style="font-size:0.68rem;color:var(--os-text-tertiary)">${h.companyName}</div></td>
          <td>${h.shares}</td>
          <td class="t-gain">${U.fmt(h.annualIncome)}</td>
          <td>${yoc != null ? yoc.toFixed(1) + '%' : (h.yieldOnCost != null ? h.yieldOnCost.toFixed(1) + '%' : '—')}</td>
          <td>${h.currentYield != null ? h.currentYield.toFixed(1) + '%' : '—'}</td>
          <td><label data-action="event.stopPropagation"><input type="checkbox" data-action-change="Dividends.toggleDrip" data-symbol="${h.symbol}"${on ? ' checked' : ''}> Reinvest</label></td>
          <td>${U.fmt(h.totalReceived)}</td>
        </tr>`;
      }).join('')}
      </tbody></table></div>
      <p style="font-size:0.72rem;color:var(--os-text-tertiary);padding:8px 16px">DRIP flags track reinvestment intent — log buys when you reinvest dividends.</p>` : '<div class="os-section" style="color:var(--os-text-secondary);">No holdings with dividend data.</div>';
  }

  function toggleDrip(symbol, enabled) {
    symbol = (symbol || '').toUpperCase();
    State.update((s) => {
      if (!s.dripSettings) s.dripSettings = {};
      s.dripSettings[symbol] = { reinvest: !!enabled };
    });
    if (window.App?.showToast) App.showToast(`DRIP ${enabled ? 'on' : 'off'} for ${symbol}`, 'ok');
    render();
  }

  function _history(timeline) {
    const corp = [];
    Object.keys(window.DIVIDEND_DATA || {}).forEach(sym => {
      const h = DividendService.getHistory(sym);
      h.timeline.forEach(t => corp.push({ ...t, symbol: sym }));
    });
    corp.sort((a, b) => {
      const da = a.paymentDate || a.creditDate || a.exDate || '';
      const db = b.paymentDate || b.creditDate || b.exDate || '';
      return db.localeCompare(da);
    });

    let body = '';
    if (timeline.months.length) {
      body += U.section('Received Over Time', `
        <div class="rt-table-wrap"><table class="rt-table"><thead><tr><th>Month</th><th>Received</th><th>Cumulative</th><th>Payments</th></tr></thead><tbody>
        ${timeline.months.map(m => `
          <tr><td>${new Date(m.month + '-01').toLocaleDateString('en-PK', { month: 'short', year: 'numeric' })}</td>
          <td class="t-gain">${U.fmt(m.total)}</td><td>${U.fmt(m.cumulative)}</td><td>${m.events.length}</td></tr>`).join('')}
        </tbody></table></div>`);
    }

    body += U.section('Logged in LedgerCap', (() => {
      const divTx = (State.get().transactions || []).filter(t => t.type === 'DIVIDEND').sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      if (!divTx.length) return '<p class="lc-empty-note">No dividend transactions logged yet.</p>';
      return `<div class="rt-table-wrap"><table class="rt-table"><thead><tr>
        <th>Date</th><th>Symbol</th><th>Broker</th><th>Received</th><th></th>
      </tr></thead><tbody>
      ${divTx.map(t => `
        <tr>
          <td>${t.date}</td>
          <td><strong>${t.symbol}</strong></td>
          <td>${t.broker || '—'}</td>
          <td class="t-gain">${U.fmt(t.amount)}</td>
          <td><button type="button" class="lc-link-btn" data-action="Transactions.openSymbol" data-tab="${t.symbol}">Txs</button></td>
        </tr>`).join('')}
      </tbody></table></div>
      <div class="lc-dash-actions" style="margin-top:8px">
        <button type="button" class="psx-btn psx-btn-ghost" data-action="Transactions.setFilter" data-tab="dividend">All dividend txs</button>
      </div>`;
    })());

    body += U.section('Corporate Actions Timeline', `
      <div class="rt-table-wrap"><table class="rt-table"><thead><tr>
        <th>Symbol</th><th>Type</th><th>Amount</th><th>Ex-Date</th><th>Record</th><th>Payment</th><th>Status</th>
      </tr></thead><tbody>
      ${corp.slice(0, 40).map(c => `
        <tr data-action="Research.open" data-symbol="${c.symbol}">
          <td><strong>${c.symbol}</strong></td>
          <td>${c.actionType}</td>
          <td>${typeof c.amount === 'number' ? '₨' + c.amount : c.amount}</td>
          <td>${c.exDate || '—'}</td>
          <td>${c.recordDate || '—'}</td>
          <td>${c.paymentDate || c.creditDate || '—'}</td>
          <td>${c.status || '—'}</td>
        </tr>`).join('')}
      </tbody></table></div>`);

    const logged = (State.get('transactions') || []).filter(t => t.type === 'DIVIDEND').sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    if (logged.length) {
      body += U.section('Your Logged Payments', `
        <div class="rt-table-wrap"><table class="rt-table"><thead><tr><th>Date</th><th>Symbol</th><th>Amount</th></tr></thead><tbody>
        ${logged.map(t => `<tr><td>${t.date}</td><td><strong>${t.symbol || 'General'}</strong></td><td class="t-gain">${U.fmt(t.amount)}</td></tr>`).join('')}
        </tbody></table></div>`);
    }
    return body;
  }

  function _forecast(forecast, dash) {
    return `
    ${U.section('Income Forecast', U.metricGrid([
      U.metricCell('This Year', U.fmt(forecast.expectedThisYear), 'Received + upcoming'),
      U.metricCell('Next Year', U.fmt(forecast.expectedNextYear), 'DPS × growth × shares'),
      U.metricCell('Monthly Avg', U.fmt(forecast.monthlyForecast), 'This year'),
      U.metricCell('Held Stocks', dash.holdingsCount, 'With dividend data'),
    ], 4))}
    ${U.section('Per-Holding Forecast', forecast.holdings.length ? `
      <div class="rt-table-wrap"><table class="rt-table"><thead><tr>
        <th>Symbol</th><th>Annual DPS</th><th>Shares</th><th>Annual Income</th><th>Next Event</th><th>Next Income</th>
      </tr></thead><tbody>
      ${forecast.holdings.map(h => `
        <tr data-action="Research.open" data-symbol="${h.symbol}">
          <td><strong>${h.symbol}</strong></td>
          <td>₨${h.annualDps.toFixed(2)}</td>
          <td>${h.shares}</td>
          <td class="t-gain">${U.fmt(h.annualIncome)}</td>
          <td>${h.nextEvent ? h.nextEvent.paymentDate : '—'}</td>
          <td class="t-gain">${h.expectedNext ? U.fmt(h.expectedNext) : '—'}</td>
        </tr>`).join('')}
      </tbody></table></div>` : '')}`;
  }

  function _growth(growth) {
    return growth.length ? growth.map(g => `
      <div class="os-card cap-reveal" style="margin:0 20px 12px;cursor:pointer;" data-action="Research.open" data-symbol="${g.symbol}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div><strong>${g.symbol}</strong> <span class="rt-badge rt-${g.trend === 'growing' ? 'buy' : g.trend === 'declining' ? 'sell' : 'hold'}">${g.trend}</span></div>
          <div style="text-align:right;"><div class="t-gain" style="font-weight:700;">${g.cagr != null ? g.cagr.toFixed(1) + '% CAGR' : '—'}</div>
          <div style="font-size:0.72rem;color:var(--os-text-tertiary);">YoC ${g.yieldOnCost != null ? g.yieldOnCost.toFixed(1) + '%' : '—'} · Yield ${g.currentYield != null ? g.currentYield.toFixed(1) + '%' : '—'}</div></div>
        </div>
        ${g.yieldHistory.length ? `<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
          ${g.yieldHistory.map(y => `<span style="font-size:0.72rem;padding:4px 8px;background:var(--os-bg-hover);border-radius:6px;">${y.date.slice(0,4)}: ${y.yield}%</span>`).join('')}
        </div>` : ''}
      </div>`).join('') : '<div class="os-section" style="color:var(--os-text-secondary);">No growth data for held stocks.</div>';
  }

  function render() {
    const screen = document.getElementById('screen-dividends');
    if (!screen) return;

    const dash = DividendService.getPortfolioAnalysis();
    const forecast = DividendService.getForecast();
    const holdings = DividendService.getHoldingsAnalysis().filter(h => h.isHeld);
    const timeline = DividendService.getTimeline();
    const calendar = DividendService.getCalendar();
    const growth = DividendService.getGrowthAnalytics();

    const panels = {
      overview: _overview(dash, forecast),
      upcoming: _upcoming(dash),
      calendar: _calendar(calendar),
      holdings: _holdings(holdings),
      history: _history(timeline),
      forecast: _forecast(forecast, dash),
      growth: _growth(growth),
    };

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Dividends</h1><p>Income center · earned · forecast · calendar</p></div>
    ${_tabBar()}
    <div class="div-panel cap-reveal">${panels[_tab] || panels.overview}</div>
    </div>`;
    CapMotion.refresh();
  }

  return { render, setTab, toggleDrip };
})();
window.Dividends = Dividends;

;/* === js/modules/wealth-calendar.js === */
'use strict';
/** Unified wealth calendar — dividends, IPO, corporate actions (rule-based, offline). */
const WealthCalendar = (() => {
  let _month = null;

  function _monthKey(d) {
    return d.toISOString().slice(0, 7);
  }

  function _events(state) {
    state = state || State.get();
    const events = [];

    (typeof DividendService !== 'undefined' ? DividendService.getCalendar() : []).forEach(row => {
      const date = row.exDate || row.paymentDate || row.date;
      if (!date) return;
      events.push({
        date: date.slice(0, 10),
        kind: 'dividend',
        symbol: row.symbol,
        title: `${row.symbol} ex-div`,
        detail: row.amountPerShare ? `₨${Number(row.amountPerShare).toFixed(2)}/sh` : (row.note || 'Dividend'),
        sort: 1,
      });
    });

    (state.ipoEvents || []).forEach(e => {
      const date = e.subscription_end || e.listing_date;
      if (!date) return;
      events.push({
        date: date.slice(0, 10),
        kind: 'ipo',
        symbol: e.symbol || 'IPO',
        title: e.company,
        detail: e.symbol ? `${e.symbol} · subscription` : 'IPO window',
        sort: 0,
      });
    });

    const holdings = new Set((PortfolioAnalyticsService?.getHoldings(state) || []).map(h => h.symbol));
    holdings.forEach(sym => {
      const upcoming = CorporateActionsService?.getUpcomingCash?.(sym) || [];
      upcoming.forEach(u => {
        const date = u.exDate || u.paymentDate;
        if (!date) return;
        events.push({
          date: date.slice(0, 10),
          kind: 'corporate',
          symbol: sym,
          title: `${sym} corporate action`,
          detail: u.type || `₨${Number(u.amountPerShare || 0).toFixed(2)}/sh`,
          sort: 2,
        });
      });
    });

    return events.sort((a, b) => a.date.localeCompare(b.date) || a.sort - b.sort);
  }

  function _monthEvents(events, monthKey) {
    return events.filter(e => e.date.startsWith(monthKey));
  }

  function render() {
    const screen = document.getElementById('screen-calendar');
    if (!screen) return;
    const state = State.get();
    const now = new Date();
    if (!_month) _month = _monthKey(now);
    const events = _events(state);
    const monthEv = _monthEvents(events, _month);
    const [y, m] = _month.split('-').map(Number);
    const label = new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const prev = new Date(y, m - 2, 1);
    const next = new Date(y, m, 1);
    const prevKey = _monthKey(prev);
    const nextKey = _monthKey(next);

    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head">
        <h1>Wealth calendar</h1>
        <p>Dividends · IPO · corporate actions in your portfolio</p>
      </div>
      <div class="lc-filter-bar cap-reveal" style="justify-content:space-between;align-items:center">
        <button type="button" class="btn-ghost btn-sm" data-action="WealthCalendar.setMonth" data-tab="${prevKey}">←</button>
        <strong>${label}</strong>
        <button type="button" class="btn-ghost btn-sm" data-action="WealthCalendar.setMonth" data-tab="${nextKey}">→</button>
      </div>
      <div class="lc-dash-section">
        ${monthEv.length ? monthEv.map(e => `
          <button type="button" class="lc-market-row cap-reveal" data-action="Research.open" data-symbol="${e.symbol}">
            <div>
              <div class="lc-market-sym">${e.date.slice(8)} · ${e.title}</div>
              <div class="lc-market-name">${e.kind} · ${e.detail}</div>
            </div>
            <div class="lc-market-meta">${e.symbol}</div>
          </button>`).join('') : '<p class="lc-empty-note">No events this month — check Dividends or add IPO dates in Pilot Tools.</p>'}
      </div>
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="dividends">Dividends</button>
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="pilot-tools">IPO calendar</button>
      </div>
    </div>`;
    CapMotion.refresh();
  }

  function setMonth(key) {
    _month = key;
    render();
  }

  return { render, setMonth, _events };
})();
window.WealthCalendar = WealthCalendar;

;/* === js/modules/transactions.js === */
'use strict';
const Transactions = (() => {
  let _filter = 'all';
  let _showInternal = false;

  function fmt(n) {
    if (typeof PsxUI !== 'undefined') return PsxUI.fmt(n);
    if (!n && n !== 0) return '—';
    return '₨' + Number(n).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function setFilter(f, opts) {
    opts = opts || {};
    _filter = f || 'all';
    if (opts.showInternal != null) _showInternal = opts.showInternal;
    render();
  }

  function openSymbol(symbol) {
    _filter = 'sym:' + String(symbol || '').toUpperCase();
    Navigation.go('transactions');
    render();
  }

  function openBucket(bucketId) {
    _filter = 'bucket:' + bucketId;
    Navigation.go('transactions');
    render();
  }

  function render() {
    const screen = document.getElementById('screen-transactions');
    if (!screen) return;

    const state = State.get();
    const all = state.transactions || [];
    const TL = TransactionLedger;
    const sum = TL.summary(all);
    const filtered = TL.filterTxs(all, { filter: _filter, showInternal: _showInternal })
      .sort((a, b) => (b.date || '').localeCompare(a.date || '') || String(b.id).localeCompare(String(a.id)));

    const filterLabel = _filter.startsWith('sym:') ? _filter.slice(4)
      : _filter.startsWith('bucket:') ? (PortfolioBuckets.BUILTIN.find(b => b.id === _filter.slice(7))?.name || _filter.slice(7))
      : null;

    const grouped = {};
    filtered.forEach(tx => {
      const month = (tx.date || '').slice(0, 7);
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(tx);
    });
    const monthKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    const filters = [
      ['all', 'All'], ['buy', 'Buy'], ['sell', 'Sell'], ['dividend', 'Dividends'],
      ['tax', 'Tax'], ['fee', 'Fees'], ['deposit', 'Cash in'], ['fund', 'Funds'], ['global', 'US/Crypto'],
    ];

    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head lc-screen-head--row">
        <div>
          <h1>Transactions</h1>
          <p>${filtered.length} of ${sum.count} entries${filterLabel ? ` · ${filterLabel}` : ''}${_showInternal ? ' · incl. internal' : ''}</p>
        </div>
        <button type="button" class="lc-section-action" data-action="App.openAddTransaction">+ Add</button>
      </div>

      <div class="lc-pulse-row">
        <div class="lc-pulse-pill"><label>Cash in</label><b class="psx-up">${fmt(sum.inflow)}</b></div>
        <div class="lc-pulse-pill"><label>Cash out</label><b class="psx-down">${fmt(sum.outflow)}</b></div>
        <div class="lc-pulse-pill"><label>Net flow</label><b class="${sum.net >= 0 ? 'psx-up' : 'psx-down'}">${sum.net >= 0 ? '+' : '−'}${fmt(Math.abs(sum.net))}</b></div>
        <div class="lc-pulse-pill"><label>Dividends</label><b class="psx-up">${fmt(sum.loggedDividends)}</b></div>
        <div class="lc-pulse-pill"><label>Taxes</label><b>${fmt(sum.taxes)}</b></div>
        <div class="lc-pulse-pill"><label>Fees</label><b>${fmt(sum.fees)}</b></div>
      </div>

      <div class="lc-hub-quick lc-hub-quick--scroll cap-reveal" role="group" aria-label="Transaction filters">
        ${filters.map(([f, label]) =>
          `<button type="button" class="lc-view-pill${_filter === f ? ' active' : ''}" data-f="${f}">${label}</button>`
        ).join('')}
        <button type="button" class="lc-view-pill${_showInternal ? ' active' : ''}" data-internal="1">Internal</button>
        <button type="button" class="lc-view-pill" data-action="Transactions.exportCsv">Export CSV</button>
      </div>

      ${filterLabel ? `<div class="lc-dash-actions"><button type="button" class="psx-btn psx-btn-ghost" data-action="Transactions.setFilter" data-tab="all">Clear filter</button></div>` : ''}

      ${!filtered.length ? `<div class="empty-state"><div class="empty-state-icon">${typeof LcIcons !== 'undefined' ? LcIcons.icon('list', 28) : ''}</div><div class="empty-state-title">No transactions</div><div class="empty-state-sub">Try another filter or add a transaction</div></div>` : ''}

      ${monthKeys.map(month => {
        const txs = grouped[month];
        const net = txs.reduce((a, t) => a + TL.signedFlow(t), 0);
        const monthTax = txs.filter(t => t.type === 'TAX').reduce((s, t) => s + (t.amount || 0), 0);
        const monthFee = txs.filter(t => t.type === 'FEE').reduce((s, t) => s + (t.amount || 0), 0);
        const label = new Date(month + '-01').toLocaleDateString('en-PK', { month: 'long', year: 'numeric' });
        return `
        <div class="month-group">
          <span>${label}</span>
          <span title="Net cash flow">${fmt(net)}${monthTax + monthFee > 0 ? ` · tax/fees ${fmt(monthTax + monthFee)}` : ''}</span>
        </div>
        ${txs.map(tx => _txRowHTML(tx, all)).join('')}`;
      }).join('')}
    </div>`;

    document.querySelectorAll('[data-f]').forEach(tab => {
      tab.addEventListener('click', () => { _filter = tab.dataset.f; render(); });
    });
    document.querySelectorAll('[data-internal]').forEach(btn => {
      btn.addEventListener('click', () => { _showInternal = !_showInternal; render(); });
    });
    document.querySelectorAll('.tx-row[data-id]').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.tx-link')) return;
        _openDetail(row.dataset.id);
      });
    });
    document.querySelectorAll('.tx-link[data-sym]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        Navigation.go('research');
        Research.open(el.dataset.sym);
      });
    });
  }

  function _ipoStatusBadge(tx) {
    if (tx.type !== 'IPO_SUBSCRIBE') return '';
    const listed = tx.status === 'listed';
    return listed
      ? '<span class="badge badge-cdc" style="font-size:0.58rem;margin-left:4px;">LISTED · CDC</span>'
      : '<span class="badge" style="font-size:0.58rem;margin-left:4px;background:rgba(240,185,11,0.12);color:var(--gold);">PENDING</span>';
  }

  function _txRowHTML(tx, all) {
    const TL = TransactionLedger;
    const m = TL.meta(tx);
    const title = TL.title(tx);
    const flow = TL.signedFlow(tx);
    const amt = TL.formatAmount(tx);
    const bucket = TL.bucketName(tx);
    const internalTag = tx.internal ? '<span class="tx-tag tx-tag--internal">internal</span>' : '';
    const custodialTag = tx.custodial ? '<span class="tx-tag tx-tag--custodial">custodial</span>' : '';
    const symLink = tx.symbol
      ? `<button type="button" class="tx-link" data-sym="${esc(tx.symbol)}">${esc(tx.symbol)}</button>`
      : '';

    let amtClass = 't-muted';
    let sign = '';
    if (flow > 0) { amtClass = 't-gain'; sign = '+'; }
    else if (flow < 0) { amtClass = 't-loss'; sign = '−'; }
    else if (tx.type === 'TAX' || tx.type === 'FEE') { amtClass = 't-loss'; sign = '−'; }

    const sub = [
      tx.date,
      esc(bucket),
      tx.broker && tx.broker !== bucket ? esc(tx.broker) : null,
      symLink,
      tx.shares ? `${tx.shares} sh` : null,
      tx.units ? `${Number(tx.units).toFixed(2)} units` : null,
      tx.notes ? esc(tx.notes.slice(0, 48)) : null,
    ].filter(Boolean).join(' · ');

    return `<div class="tx-row" data-id="${esc(tx.id)}">
      <div class="tx-type-dot ${m.cls}">${typeof LcIcons !== 'undefined' ? LcIcons.icon(m.icon, 14) : ''}</div>
      <div class="tx-left">
        <div class="tx-title">${esc(title)}${_ipoStatusBadge(tx)} ${internalTag}${custodialTag}</div>
        <div class="tx-sub">${sub}</div>
      </div>
      <div class="tx-amount ${amtClass}">${flow !== 0 ? sign : ''}${amt}</div>
    </div>`;
  }

  function _openDetail(id) {
    const state = State.get();
    const all = state.transactions || [];
    const tx = all.find(t => t.id === id);
    if (!tx) return;

    const TL = TransactionLedger;
    const m = TL.meta(tx);
    const related = TL.relatedTxs(tx, all);
    const fields = [
      ['Type', m.label + (TL.chargeLabel(tx) ? ` (${TL.chargeLabel(tx)})` : '')],
      ['Portfolio', TL.bucketName(tx)],
      tx.symbol ? ['Symbol', tx.symbol] : null,
      tx.name && tx.name !== tx.symbol ? ['Company', tx.name] : null,
      tx.type === 'IPO_SUBSCRIBE' ? ['Status', tx.status === 'listed' ? 'Listed (CDC)' : 'Pending'] : null,
      tx.broker ? ['Broker', tx.broker] : null,
      ['Date', tx.date],
      ['Amount', TL.formatAmount(tx)],
      tx.costUsd != null ? ['Cost USD', '$' + Number(tx.costUsd).toFixed(2)] : null,
      tx.shares ? ['Shares', tx.shares] : null,
      tx.allottedShares ? ['Allotted', tx.allottedShares] : null,
      tx.price ? ['Price', '₨' + tx.price] : null,
      tx.priceUsd ? ['Price USD', '$' + tx.priceUsd] : null,
      tx.units ? ['Units', tx.units.toFixed(4)] : null,
      tx.nav ? ['NAV', '₨' + tx.nav] : null,
      tx.chargeType ? ['Charge', TL.chargeLabel(tx)] : null,
      tx.relatedId ? ['Linked tx', tx.relatedId] : null,
      tx.internal ? ['Internal', 'Yes — fund convert / ROC'] : null,
      tx.notes ? ['Notes', tx.notes] : null,
    ].filter(Boolean);

    const links = [];
    if (tx.symbol) links.push(`<button type="button" class="psx-btn psx-btn-ghost" data-action="App.closeBottomSheet">Research ${tx.symbol}</button>`);
    links.push(`<button type="button" class="psx-btn psx-btn-ghost" data-action="App.closeBottomSheet">All ${tx.symbol || 'bucket'} txs</button>`);
    const bid = TL.bucketId(tx);
    if (bid) links.push(`<button type="button" class="psx-btn psx-btn-ghost" data-action="App.closeBottomSheet">Portfolio txs</button>`);

    const relatedHtml = related.length ? `
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--lc-border)">
        <p style="font-size:0.72rem;font-weight:700;margin-bottom:8px;color:var(--text2)">Linked transactions</p>
        ${related.map(r => `<div class="detail-stat" style="cursor:pointer" data-action="App.closeBottomSheet">
          <span class="detail-stat-label">${r.date} · ${TL.title(r)}</span>
          <span class="detail-stat-value">${TL.formatAmount(r)}</span>
        </div>`).join('')}
      </div>` : '';

    const isPendingIpo = tx.type === 'IPO_SUBSCRIBE' && (tx.status || 'pending') === 'pending';
    const listBtn = isPendingIpo
      ? `<button type="button" class="btn-primary" style="margin-bottom:8px;" data-action="App.openMarkIpoListed" data-tab="${id}">Mark as Listed → CDC</button>`
      : '';

    const content = `<div style="padding:0 16px 16px;">
      ${fields.map(([l, v]) => `<div class="detail-stat"><span class="detail-stat-label">${l}</span><span class="detail-stat-value">${v}</span></div>`).join('')}
      ${relatedHtml}
      <div style="margin-top:16px;display:flex;flex-wrap:wrap;gap:8px">${links.join('')}</div>
      <div style="margin-top:16px;">
        ${listBtn}
        <button type="button" class="btn-danger" data-action="App.deleteTransaction" data-tab="${id}">Delete Transaction</button>
      </div>
    </div>`;

    App.openBottomSheet('tx-detail-sheet', TL.title(tx), content);
  }

  function exportCsv() {
    const txs = (State.get().transactions || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    if (!txs.length) { App.showToast('No transactions to export', 'error'); return; }
    const headers = ['date', 'type', 'symbol', 'broker', 'shares', 'units', 'amount', 'costUsd', 'price', 'priceUsd', 'chargeType', 'relatedId', 'internal', 'custodial', 'notes', 'status'];
    const esc = (v) => {
      const s = v == null ? '' : String(v);
      return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = txs.map(t => headers.map(h => esc(t[h])).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ledgercap-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast(`Exported ${txs.length} transactions`, 'success');
  }

  function openLog() {
    Navigation.go('transactions');
  }

  return { render, exportCsv, openLog, setFilter, openSymbol, openBucket, _openDetail };
})();
window.Transactions = Transactions;

;/* === js/modules/settings.js === */
'use strict';
const Settings = (() => {
  let _proxyHealth = { status: 'idle', detail: '' };

  async function _pingProxy(url) {
    if (!url) {
      _proxyHealth = { status: 'none', detail: 'No proxy URL configured' };
      return _proxyHealth;
    }
    _proxyHealth = { status: 'checking', detail: 'Pinging worker…' };
    _updateProxyHealthUI();
    try {
      const base = url.replace(/\/$/, '');
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 6000);
      const res = await fetch(`${base}/health`, { signal: ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        const body = await res.json().catch(() => ({}));
        _proxyHealth = body.ok
          ? { status: 'ok', detail: 'Worker reachable' }
          : { status: 'error', detail: 'Unexpected health response' };
      } else {
        _proxyHealth = { status: 'error', detail: `HTTP ${res.status}` };
      }
    } catch (e) {
      _proxyHealth = { status: 'error', detail: e.name === 'AbortError' ? 'Timeout — worker unreachable' : 'Worker unreachable' };
    }
    _updateProxyHealthUI();
    return _proxyHealth;
  }

  function _proxyHealthLabel() {
    if (_proxyHealth.status === 'ok') return { cls: 't-gain', text: '● Online' };
    if (_proxyHealth.status === 'checking') return { cls: '', text: '● Checking…' };
    if (_proxyHealth.status === 'none') return { cls: '', text: '● Not set' };
    return { cls: 't-loss', text: '● Offline' };
  }

  function _updateProxyHealthUI() {
    const el = document.getElementById('proxy-health-val');
    const sub = document.getElementById('proxy-health-sub');
    if (!el) return;
    const h = _proxyHealthLabel();
    el.className = `setting-value ${h.cls}`.trim();
    el.textContent = h.text;
    if (sub) sub.textContent = _proxyHealth.detail || '';
  }

  function render() {
    const screen = document.getElementById('screen-settings');
    if (!screen) return;

    const state = State.get();
    const settings = state.settings || {};
    const allPrices = Object.values(state.prices || {});
    const lastUpdate = allPrices.sort((a, b) => (b.ts || 0) - (a.ts || 0))[0];
    const lastUpdateStr = lastUpdate ? Prices.formatTs(lastUpdate.ts) : 'Never';
    const txCount = (state.transactions || []).length;
    const proxyUrl = window.LedgerCapConfig?.resolvePsxProxyUrl(settings.psxProxyUrl) || settings.psxProxyUrl || window.LEDGERCAP_CONFIG?.psxProxyUrl || '';
    const isOnline = navigator.onLine;
    const proxyHealth = _proxyHealthLabel();

    const holdings = Ledger.calcHoldings(state.transactions || []);
    const funds = Ledger.calcFundHoldings(state.transactions || []);
    const goldPpg = settings.goldPricePerGram || 18000;
    const nisabValue = 87.48 * goldPpg;
    const zakatableStocks = holdings.filter(h => {
      const sd = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === h.symbol && s.broker === h.broker);
      return sd?.isShariah;
    }).reduce((sum, h) => sum + h.shares * (State.getPrice(h.symbol) || h.avgCost), 0);
    const zakatableFunds = funds.reduce((sum, f) => {
      const nav = State.getPrice(f.symbol) || f.avgNav;
      return sum + f.units * nav;
    }, 0);
    const zakatableTotal = zakatableStocks + zakatableFunds;
    const zakatDue = zakatableTotal >= nisabValue ? zakatableTotal * 0.025 : 0;

    const theme = settings.theme || 'dark';
    const pilot = state.pilotSettings || {};
    const ma = state.manualAssets || {};
    const fundOverrides = settings.fundNavOverrides || {};
    const fundNavFields = (window.MEEZAN_FUNDS || []).map((f) => {
      const o = fundOverrides[f.symbol];
      const nav = o?.nav ?? '';
      const asOf = o?.asOf ?? '';
      const symEsc = f.symbol.replace(/"/g, '&quot;');
      return `<div class="field-row" style="margin-bottom:8px">
        <div class="field" style="flex:1.4">
          <label class="field-label">${f.symbol}</label>
          <input class="field-input fn-nav" data-symbol="${symEsc}" type="number" step="0.0001" value="${nav}" placeholder="${f.currentNav || ''}">
        </div>
        <div class="field" style="flex:1">
          <label class="field-label">Statement date</label>
          <input class="field-input fn-asof" data-symbol="${symEsc}" type="date" value="${asOf}">
        </div>
      </div>`;
    }).join('');

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Settings</h1><p>${I18n.t('more.sub')}</p></div>
    <div class="sec-head"><span class="sec-title">${I18n.t('lang.label')}</span></div>
    <div style="background:var(--lc-bg-card);border-bottom:1px solid var(--lc-border);padding:16px 20px;">
      ${I18n.langSwitcher('lc-settings-lang')}
    </div>

    <div class="sec-head"><span class="sec-title">${I18n.t('theme.toggle')}</span></div>
    <div style="background:var(--lc-bg-card);border-bottom:1px solid var(--lc-border);padding:16px 20px;">
      <div class="os-theme-toggle">
        <button type="button" class="os-theme-btn${theme === 'dark' ? ' active' : ''}" data-action="Settings._setTheme" data-tab="dark">${I18n.t('theme.dark')}</button>
        <button type="button" class="os-theme-btn${theme === 'light' ? ' active' : ''}" data-action="Settings._setTheme" data-tab="light">${I18n.t('theme.light')}</button>
      </div>
      <label class="lc-check-row" style="margin-top:14px"><input type="checkbox" id="s-haptics" ${settings.hapticsEnabled ? 'checked' : ''} data-action-change="Settings._setHaptics"> Haptic feedback on taps (off by default)</label>
      <p class="field-hint" style="margin-top:6px">Desktop: <kbd>⌘K</kbd> or <kbd>Ctrl+K</kbd> quick nav when width ≥900px</p>
    </div>

    <div class="sec-head"><span class="sec-title">Number format</span></div>
    <div style="background:var(--lc-bg-card);border-bottom:1px solid var(--lc-border);padding:16px 20px;">
      <p style="font-size:0.75rem;color:var(--psx-text-2);margin-bottom:12px;line-height:1.5;">Full shows every digit with 2 decimals. Compact uses L/cr for big PKR amounts.</p>
      <div class="os-theme-toggle">
        <button type="button" class="os-theme-btn${(settings.numberFormat || 'full') === 'full' ? ' active' : ''}" data-action="Settings._setNumberFormat" data-tab="full">Full</button>
        <button type="button" class="os-theme-btn${settings.numberFormat === 'compact' ? ' active' : ''}" data-action="Settings._setNumberFormat" data-tab="compact">Compact</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Display &amp; live data</span></div>
    <div style="background:var(--lc-bg-card);border-bottom:1px solid var(--lc-border);padding:16px 20px;">
      <p style="font-size:0.75rem;color:var(--psx-text-2);margin-bottom:12px;line-height:1.5;">One tap flips all amounts PKR↔USD. SSE pushes during PSX session (intraday when open, last close after hours).</p>
      <div class="os-theme-toggle" style="margin-bottom:14px">
        <button type="button" class="os-theme-btn${(settings.displayCurrency || 'PKR') === 'PKR' ? ' active' : ''}" data-action="Settings._setDisplayCurrency" data-tab="PKR">PKR ₨</button>
        <button type="button" class="os-theme-btn${settings.displayCurrency === 'USD' ? ' active' : ''}" data-action="Settings._setDisplayCurrency" data-tab="USD">USD $</button>
      </div>
      <label class="lc-check-row"><input type="checkbox" id="s-live-stream" ${settings.liveStreamEnabled !== false ? 'checked' : ''} data-action-change="Settings._setLiveStream"> Live price stream (SSE push)</label>
      <label class="lc-check-row"><input type="checkbox" id="s-snapshot" ${settings.snapshotEnabled !== false ? 'checked' : ''} data-action-change="Settings._setSnapshot"> Market snapshot (full PSX + US + commodities)</label>
      <p class="field-hint" style="margin-top:8px">Snapshot: ${typeof PriceSnapshotService !== 'undefined' ? (PriceSnapshotService.freshnessLabel() || 'worker KV · 15m refresh') : 'worker KV'}</p>
      <p class="field-hint" style="margin-top:4px">Stream: ${(() => {
        const st = typeof LivePriceStream !== 'undefined' ? LivePriceStream.status() : {};
        const open = typeof PsxSession !== 'undefined' && PsxSession.isOpen();
        if (st.connected) return open ? '● connected · intraday push' : '● connected · last close (EOD)';
        return '○ disconnected · manual refresh / poll';
      })()}</p>
      <p class="field-hint" style="margin-top:4px"><a href="./widget-glance.html" target="_blank" rel="noopener">Glance widget page</a> — add to home screen for 3-second net worth check. Native iOS widget needs Capacitor build.</p>
    </div>

    <div class="sec-head"><span class="sec-title">Tax &amp; audit export</span></div>
    <div style="background:var(--lc-bg-card);border-bottom:1px solid var(--lc-border);padding:16px 20px;">
      <p style="font-size:0.75rem;color:var(--psx-text-2);margin-bottom:12px;line-height:1.5;">Annual statement CSV or printable PDF. Verify against broker statements — not tax advice.</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <button type="button" class="btn-secondary" data-action="Settings._exportStatementCsv">CSV statement</button>
        <button type="button" class="btn-secondary" data-action="Settings._exportStatementPdf">PDF / print</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Investor Profile</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <div class="field">
        <label class="field-label">Monthly Salary (₨)</label>
        <input class="field-input" id="s-salary" type="number" value="${settings.salary || 150000}" placeholder="150000">
      </div>
      <div class="field">
        <label class="field-label">Monthly SIP Target (₨)</label>
        <input class="field-input" id="s-sip" type="number" value="${settings.targetSIP || 75000}" placeholder="75000">
      </div>
      <div class="field-row">
        <div class="field">
          <label class="field-label">USD/PKR Rate</label>
          <input class="field-input" id="s-usdrate" type="number" step="0.01" value="${settings.usdRate || 280}" placeholder="280">
          <p style="font-size:0.7rem;color:var(--text3);margin-top:4px">Live: ExchangeRate-API (free)${settings.usdRateSource ? ' · ' + settings.usdRateSource : ''}</p>
        </div>
        <div class="field">
          <label class="field-label">Gold Price (₨/gram)</label>
          <input class="field-input" id="s-goldprice" type="number" value="${settings.goldPricePerGram || 18000}" placeholder="18000">
        </div>
      </div>
      <div class="field">
        <label class="field-label">GNews API key (optional)</label>
        <input class="field-input" id="s-gnews-key" type="password" autocomplete="off" value="${settings.gnewsApiKey || ''}" placeholder="For Pakistan PSX headlines — gnews.io">
      </div>
      <button type="button" class="btn-ghost" style="margin-bottom:8px" data-action="Settings._refreshFx">Refresh USD/PKR now</button>
      <button type="button" class="btn-primary" data-action="Settings._saveProfile">Save Profile</button>
    </div>

    <div class="sec-head"><span class="sec-title">Cash &amp; manual assets</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--text3);margin-bottom:12px;line-height:1.5;">Uninvested broker cash (Rafi + your AKD slice). AKD ledger ₨138,045 includes ~₨97,946 friend custodial — excluded here.</p>
      <div class="field">
        <label class="field-label">Broker cash (₨)</label>
        <input class="field-input" id="s-broker-cash" type="number" min="0" step="1" value="${ma.brokerCashPkr || 0}" placeholder="40960">
      </div>
      <div class="field-row">
        <div class="field">
          <label class="field-label">USD cash</label>
          <input class="field-input" id="s-usd-cash" type="number" min="0" step="0.01" value="${ma.usdCash || 0}">
        </div>
        <div class="field">
          <label class="field-label">Gold (grams)</label>
          <input class="field-input" id="s-gold-grams" type="number" min="0" step="0.01" value="${ma.goldGrams || 0}">
        </div>
      </div>
      <button type="button" class="btn-primary" data-action="Settings._saveManualAssets">Save manual assets</button>
    </div>

    <div class="sec-head"><span class="sec-title">Return Assumptions</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <div class="field-row" style="margin-bottom:16px;">
        <div class="field">
          <label class="field-label">Target Return (%/yr)</label>
          <input class="field-input" id="s-return" type="number" step="0.5" value="${((settings.targetReturn || 0.18) * 100).toFixed(0)}" placeholder="18">
        </div>
        <div class="field">
          <label class="field-label">Inflation (%/yr)</label>
          <input class="field-input" id="s-inflation" type="number" step="0.5" value="${((settings.inflationRate || 0.20) * 100).toFixed(0)}" placeholder="20">
        </div>
      </div>
      <div class="field-row" style="margin-bottom:16px;">
        <div class="field">
          <label class="field-label">PKR Depreciation (%/yr)</label>
          <input class="field-input" id="s-pkrdep" type="number" step="0.5" value="${((settings.pkrDepreciationRate || 0.15) * 100).toFixed(0)}" placeholder="15">
        </div>
        <div class="field">
          <label class="field-label">Freedom Target (₨/mo)</label>
          <input class="field-input" id="s-freedom" type="number" value="${settings.freedomTarget || 100000}" placeholder="100000">
        </div>
      </div>
      <div class="field-hint" style="margin-bottom:12px;">4% rule: corpus needed = ₨${Math.round((settings.freedomTarget || 100000) * 12 / 0.04).toLocaleString()}</div>
      <div style="display:flex;gap:8px;">
        <button type="button" class="btn-primary" style="flex:1;" data-action="Settings._saveAssumptions">Save Assumptions</button>
        <button type="button" class="btn-ghost" data-action="Settings._resetAssumptions">Reset Defaults</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title" id="fund-nav-section">Meezan fund NAVs</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--text3);margin-bottom:12px;line-height:1.5;">No public AMC API — paste latest NAV from your Meezan statement. Overrides portfolio value &amp; zakat.</p>
      ${fundNavFields || '<p class="field-hint">No fund seed loaded.</p>'}
      <button type="button" class="btn-primary" style="margin-top:12px" data-action="Settings._saveFundNavs">Save fund NAVs</button>
    </div>

    <div class="sec-head"><span class="sec-title" id="zakat-section">Zakat Calculator</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Nisab (87.48g gold)</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(nisabValue).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">At ₨${goldPpg.toLocaleString()}/g</div>
        </div>
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Zakatable Assets</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(zakatableTotal).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">Shariah holdings</div>
        </div>
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Shariah Stocks</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(zakatableStocks).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">Marked ☪ in portfolio</div>
        </div>
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Meezan Funds</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(zakatableFunds).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">All funds (Shariah)</div>
        </div>
      </div>
      ${zakatableTotal >= nisabValue ? `
      <div style="padding:12px 14px;background:rgba(14,203,129,0.08);border:1px solid rgba(14,203,129,0.2);border-radius:var(--r-sm);margin-bottom:8px;">
        <div style="font-size:0.75rem;color:var(--text3);margin-bottom:4px;">Zakat Due (2.5%)</div>
        <div style="font-size:1.4rem;font-weight:800;color:var(--green);">₨${Math.round(zakatDue).toLocaleString()}</div>
        <div style="font-size:0.68rem;color:var(--text3);margin-top:2px;">Above nisab threshold ✓</div>
      </div>` : `
      <div style="padding:12px 14px;background:var(--bg3);border-radius:var(--r-sm);margin-bottom:8px;">
        <div style="font-size:0.78rem;color:var(--text3);">Below nisab threshold (₨${Math.round(nisabValue).toLocaleString()}) — no Zakat due on these assets yet.</div>
      </div>`}
      <div style="font-size:0.65rem;color:var(--text3);line-height:1.4;">Consult a scholar for your specific situation. Non-Shariah stocks excluded from calculation.</div>
    </div>

    <div class="sec-head"><span class="sec-title">Live Prices</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="setting-row">
        <div>
          <div class="setting-label">Last Updated</div>
          <div class="setting-sub">${lastUpdateStr}</div>
        </div>
        <span class="setting-value ${isOnline ? 't-gain' : 't-loss'}">${isOnline ? '● Online' : '● Offline'}</span>
      </div>
      <div class="setting-row">
        <div>
          <div class="setting-label">PSX Proxy</div>
          <div class="setting-sub" id="proxy-health-sub">${_proxyHealth.detail || (proxyUrl ? 'Worker health check — live quotes need this path' : 'No Worker URL — live PSX/Yahoo quotes unavailable (cached/fallback only)')}</div>
        </div>
        <span class="setting-value ${proxyHealth.cls}" id="proxy-health-val">${proxyHealth.text}</span>
      </div>
      <div style="padding:12px 16px;display:flex;flex-direction:column;gap:10px;">
        <div class="field">
          <label class="field-label">PSX Proxy URL (Cloudflare Worker)</label>
          <input class="field-input" id="s-proxy" type="url" placeholder="https://ledgercap-psx-proxy.yourname.workers.dev" value="${proxyUrl}">
          <div class="field-hint">Live PSX/Yahoo quotes route through this Worker (default Capricorn endpoint is pre-filled). Portfolio never leaves your device. Cached/fallback prices if unreachable.</div>
        </div>
        <button type="button" class="btn-ghost" data-action="Settings._saveProxy">Save Proxy URL</button>
        <button type="button" class="btn-secondary" data-action="App.refreshPrices">⟳ Refresh All Prices</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Telegram</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--psx-text-2);margin-bottom:12px;line-height:1.5;">
        Bot: <a href="https://t.me/LedgerCap_Bot" target="_blank" rel="noopener noreferrer">@LedgerCap_Bot</a> — message it once, then detect chat ID.
        <strong> Pakistan:</strong> Bot API routes via your LedgerCap worker proxy (not api.telegram.org).
      </p>
      <div class="field">
        <label class="field-label">Bot token</label>
        <input class="field-input" id="tg-token" type="password" autocomplete="off" placeholder="${(typeof SecretsVault !== 'undefined' && SecretsVault.hasTelegramToken()) || settings.telegramBotToken ? 'Saved — enter new token to replace' : '123456:ABC…'}" value="">
      </div>
      <div class="field">
        <label class="field-label">Chat ID</label>
        <input class="field-input" id="tg-chat" type="text" inputmode="numeric" placeholder="e.g. 123456789" value="${settings.telegramChatId || ''}">
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
        <button type="button" class="btn-ghost btn-sm" data-action="Settings._detectTelegramChat">Detect chat ID</button>
        <button type="button" class="btn-ghost btn-sm" data-action="Settings._checkTelegramProxy">Test proxy</button>
      </div>
      <div class="field-hint" style="margin-bottom:12px;">Numeric chat_id only — not your phone number. Use @userinfobot if detect fails.</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px;">
        <label class="lc-check-row"><input type="checkbox" id="tg-morning" ${settings.telegramMorningEnabled ? 'checked' : ''}> Morning brief (client, weekdays 9:00 PKT — off when cloud sync on)</label>
        <label class="lc-check-row"><input type="checkbox" id="tg-intraday" ${settings.telegramIntradayEnabled ? 'checked' : ''}> Intraday moves (PSX session, max 1/hour)</label>
        <label class="lc-check-row"><input type="checkbox" id="tg-intraday-news" ${settings.telegramIntradayNewsEnabled ? 'checked' : ''}> Intraday news (Yahoo + Google RSS + BBC, max 1/hour)</label>
        <label class="lc-check-row"><input type="checkbox" id="tg-dividend" ${settings.telegramDividendEnabled ? 'checked' : ''}> Dividend reminders (7 days before ex-date)</label>
        <label class="lc-check-row"><input type="checkbox" id="tg-price" ${settings.telegramPriceAlertsEnabled ? 'checked' : ''}> Watchlist price alerts</label>
        <label class="lc-check-row"><input type="checkbox" id="tg-cloud" ${settings.telegramCloudSyncEnabled ? 'checked' : ''}> Cloud brief sync (background 9am PKT via worker)</label>
      </div>
      <div class="field" style="margin-bottom:12px;">
        <label class="field-label">Cloud sync key</label>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <input class="field-input" id="tg-sync-key" type="text" autocomplete="off" placeholder="Generate or paste wrangler secret" value="${settings.telegramSyncKey || ''}" style="flex:1;min-width:180px">
          <button type="button" class="btn-ghost btn-sm" data-action="Settings._genTelegramSyncKey">Generate</button>
        </div>
        <div class="field-hint">Match <code>TELEGRAM_SYNC_KEY</code> on Cloudflare worker. Syncs urgent signals only — never full ledger.</div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
        <button type="button" class="btn-ghost" data-action="Settings._syncTelegramCloud">Sync brief to cloud</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <button type="button" class="btn-primary" data-action="Settings._saveTelegram">Save Telegram</button>
        <button type="button" class="btn-secondary" data-action="Settings._sendTelegramTest">Send test message</button>
        <button type="button" class="btn-ghost" data-action="Settings._sendTelegramBrief">Send brief now</button>
        <button type="button" class="btn-ghost" data-action="Settings._sendTelegramPortfolioDigests">Send portfolio digests</button>
        <button type="button" class="btn-ghost" data-action="Settings._sendTelegramNews">Send news digest</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Manual Fund NAV</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--text3);margin-bottom:12px;">Meezan funds aren't on PSX — update NAV when AMC publishes new values.</p>
      ${(window.MEEZAN_FUNDS || []).map(f => {
        const p = state.prices?.[f.symbol];
        const nav = p?.price || f.currentNav;
        return `<div class="field-row" style="margin-bottom:8px;align-items:flex-end;">
          <div class="field" style="flex:1;">
            <label class="field-label">${f.symbol}</label>
            <input class="field-input nav-inp" data-sym="${f.symbol}" type="number" step="0.01" value="${nav}">
          </div>
          <button type="button" class="btn-ghost" style="padding:10px 14px;" data-action="Settings._saveNav" data-tab="${f.symbol}">Save</button>
        </div>`;
      }).join('')}
    </div>

    <div class="sec-head"><span class="sec-title">Try demo</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--text3);margin-bottom:0;line-height:1.5;">Open <strong>?demo=1</strong> for a sample PSX + Meezan portfolio without replacing your ledger from Settings.</p>
    </div>

    <div class="sec-head"><span class="sec-title">Security &amp; PIN</span></div>
    <div style="background:var(--psx-bg-card);border-bottom:1px solid var(--psx-border);padding:16px;">
      <p style="font-size:0.75rem;color:var(--psx-text-2);margin-bottom:12px;line-height:1.5;">
        Optional 4–6 digit PIN. Hash stored locally — never sent to a server. Decoy PIN shows masked balances.
      </p>
      <div class="setting-row" style="padding:0 0 12px;border:none;">
        <div>
          <div class="setting-label">App lock</div>
          <div class="setting-sub">${PinVault?.isEnabled?.() ? 'Enabled' : 'Off'}${PinVault?.hasDecoy?.() ? ' · decoy set' : ''}</div>
        </div>
        <span class="setting-value ${PinVault?.isEnabled?.() ? 't-gain' : ''}">${PinVault?.isEnabled?.() ? '● On' : '○ Off'}</span>
      </div>
      <div class="field" style="margin-bottom:12px;">
        <label class="field-label">Auto-lock after</label>
        <select class="field-input" id="pin-autolock" data-action-change="Settings._setPinAutoLock">
          ${[0, 1, 5, 15, 60].map(m => `<option value="${m}"${(PinVault?.getAutoLock?.() ?? 5) === m ? ' selected' : ''}>${m === 0 ? 'Never (manual only)' : m === 60 ? '1 hour' : m + ' min'}</option>`).join('')}
        </select>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${PinVault?.isEnabled?.() ? `
          <button type="button" class="btn-secondary btn-sm" data-action="Settings._changePin">Change PIN</button>
          <button type="button" class="btn-ghost btn-sm" data-action="Settings._setDecoyPin">Decoy PIN</button>
          <button type="button" class="btn-ghost btn-sm" data-action="Settings._lockNow">Lock now</button>
          <button type="button" class="btn-danger btn-sm" data-action="Settings._disablePin">Disable PIN</button>
        ` : `
          <button type="button" class="btn-primary btn-sm" data-action="Settings._enablePin">Set PIN</button>
        `}
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Data Management</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="setting-row">
        <div>
          <div class="setting-label">Transactions</div>
          <div class="setting-sub">${txCount} entries in ledger</div>
        </div>
      </div>
      <div style="padding:12px 16px;display:flex;flex-direction:column;gap:8px;">
        <button type="button" class="btn-secondary" data-action="Settings._exportData">↑ Export .ledgercap Backup</button>
        <button type="button" class="btn-secondary" data-action="Settings._exportEncryptedBackup">🔒 Encrypted backup (PIN)</button>
        <button type="button" class="btn-secondary" data-action="Settings._pushCloudBackup">☁ Push cloud backup</button>
        <button type="button" class="btn-secondary" data-action="Settings._pullCloudBackup">☁ Restore from cloud</button>
        <p class="field-hint" style="margin:0">Cloud uses your Telegram sync key — encrypted ledger only, never plaintext.</p>
        <button type="button" class="btn-secondary" data-action="Settings._importData">↓ Import .ledgercap Backup</button>
        <button type="button" class="btn-danger" data-action="Settings._resetVault">⚠ Reset All Data</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Portfolio Pilot</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:12px;color:var(--os-text-secondary);margin-bottom:12px;line-height:1.5">Rule-based signals, CGT estimates, and rebalance tools — ported from Portfolio Pilot. Not AI advice.</p>
      <div class="field">
        <label class="field-label">Concentration alert (%)</label>
        <input class="field-input" id="p-conc" type="number" value="${pilot.concentrationThresholdPct ?? 20}" min="5" max="50">
      </div>
      <div class="field">
        <label class="field-label">Core P/E discount vs sector (%)</label>
        <input class="field-input" id="p-pe" type="number" value="${pilot.corePeDiscountPct ?? 15}" min="0" max="40">
      </div>
      <div class="field">
        <label class="field-label">Swing RSI oversold / overbought</label>
        <div style="display:flex;gap:8px">
          <input class="field-input" id="p-rsi-low" type="number" value="${pilot.swingRsiOversold ?? 35}" min="10" max="45" style="flex:1">
          <input class="field-input" id="p-rsi-high" type="number" value="${pilot.swingRsiOverbought ?? 65}" min="55" max="90" style="flex:1">
        </div>
      </div>
      <div class="field">
        <label class="field-label">Cash balance (₨) for rebalance</label>
        <input class="field-input" id="p-cash" type="number" value="${pilot.cashBalancePkr ?? 0}" min="0" step="1000">
      </div>
      <label style="display:flex;align-items:center;gap:10px;font-size:14px;margin:12px 0">
        <input type="checkbox" id="p-filer" ${pilot.isFiler !== false ? 'checked' : ''}>
        Filer (15% CGT on short-term gains)
      </label>
      <button type="button" class="btn-primary" style="width:100%;margin-top:8px" data-action="Settings._savePilot">Save Pilot settings</button>
    </div>

    <div class="sec-head"><span class="sec-title">About</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="setting-row"><div class="setting-label">LedgerCap</div><span class="setting-value">v${window.APP_VERSION || '3.14.0'}</span></div>
      <div class="setting-row"><div class="setting-label">Architecture</div><span class="setting-value">Ledger-first</span></div>
      <div class="setting-row"><div class="setting-label">Storage</div><span class="setting-value">Local (offline-first)</span></div>
    </div>
    </div>`;
    if (typeof I18n !== 'undefined') I18n.bindLangSwitch(screen);
    _pingProxy(proxyUrl);
    if (typeof CapMotion !== 'undefined') CapMotion.refresh();
  }

  function _saveManualAssets() {
    const brokerCashPkr = parseFloat(document.getElementById('s-broker-cash')?.value) || 0;
    const usdCash = parseFloat(document.getElementById('s-usd-cash')?.value) || 0;
    const goldGrams = parseFloat(document.getElementById('s-gold-grams')?.value) || 0;
    State.update(s => {
      if (!s.manualAssets) s.manualAssets = {};
      s.manualAssets.brokerCashPkr = brokerCashPkr;
      s.manualAssets.usdCash = usdCash;
      s.manualAssets.goldGrams = goldGrams;
    });
    App.showToast('Manual assets saved', 'success');
    App.renderCurrent();
    render();
  }

  async function _refreshFx() {
    if (typeof FxService === 'undefined') return;
    const rate = await FxService.refreshUsdPkr();
    const inp = document.getElementById('s-usdrate');
    if (inp && rate) inp.value = Number(rate).toFixed(2);
    App.showToast(`USD/PKR ₨${Number(rate).toFixed(2)} (${FxService.getMeta?.().source || 'updated'})`, 'success');
    render();
  }

  function _saveProfile() {
    const salary = parseInt(document.getElementById('s-salary')?.value, 10) || 150000;
    const targetSIP = parseInt(document.getElementById('s-sip')?.value, 10) || 75000;
    const usdRate = parseFloat(document.getElementById('s-usdrate')?.value) || 280;
    const goldPricePerGram = parseInt(document.getElementById('s-goldprice')?.value, 10) || 18000;
    const gnewsApiKey = document.getElementById('s-gnews-key')?.value?.trim() || '';
    State.update(s => {
      s.settings.salary = salary;
      s.settings.targetSIP = targetSIP;
      s.settings.usdRate = usdRate;
      s.settings.goldPricePerGram = goldPricePerGram;
      if (gnewsApiKey) s.settings.gnewsApiKey = gnewsApiKey;
      else delete s.settings.gnewsApiKey;
    });
    App.showToast(`Saved: ₨${salary.toLocaleString()}/mo salary`, 'success');
    App.renderCurrent();
    render();
  }

  function _saveFundNavs() {
    if (typeof FundNavService === 'undefined') {
      App.showToast('Fund NAV service not loaded', 'error');
      return;
    }
    let n = 0;
    document.querySelectorAll('.fn-nav').forEach((inp) => {
      const sym = inp.dataset.symbol;
      const nav = parseFloat(inp.value);
      if (!(nav > 0)) return;
      const asOf = document.querySelector(`.fn-asof[data-symbol="${sym}"]`)?.value;
      FundNavService.saveNav(sym, nav, asOf);
      n++;
    });
    App.showToast(n ? `Saved ${n} fund NAV${n > 1 ? 's' : ''}` : 'Enter at least one NAV', n ? 'success' : 'error');
    App.renderCurrent();
    render();
  }

  function _saveNav() { _saveFundNavs(); }

  function _saveAssumptions() {
    const ret = parseFloat(document.getElementById('s-return')?.value) / 100 || 0.18;
    const inflation = parseFloat(document.getElementById('s-inflation')?.value) / 100 || 0.20;
    const pkrDep = parseFloat(document.getElementById('s-pkrdep')?.value) / 100 || 0.15;
    const freedom = parseInt(document.getElementById('s-freedom')?.value, 10) || 100000;
    State.update(s => {
      s.settings.targetReturn = ret;
      s.settings.inflationRate = inflation;
      s.settings.pkrDepreciationRate = pkrDep;
      s.settings.freedomTarget = freedom;
    });
    App.showToast('Assumptions saved ✓', 'success');
    App.renderCurrent();
    render();
  }

  function _resetAssumptions() {
    if (!confirm('Reset assumptions to defaults?')) return;
    State.update(s => {
      s.settings.targetReturn = 0.18;
      s.settings.inflationRate = 0.20;
      s.settings.pkrDepreciationRate = 0.15;
      s.settings.freedomTarget = 100000;
    });
    App.showToast('Assumptions reset to defaults', 'success');
    render();
  }

  function _pinPrompt(title, fields) {
    const body = fields.map(f =>
      `<div class="field"><label class="field-label">${f.label}</label><input class="field-input" id="${f.id}" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="off" placeholder="4–6 digits"></div>`
    ).join('');
    App.openBottomSheet('pin-sheet', title, `${body}<button type="button" class="btn-primary" style="width:100%;margin-top:12px" id="pin-sheet-submit">Continue</button>`);
    return new Promise(resolve => {
      document.getElementById('pin-sheet-submit')?.addEventListener('click', () => {
        const vals = {};
        fields.forEach(f => { vals[f.id] = document.getElementById(f.id)?.value || ''; });
        resolve(vals);
      }, { once: true });
    });
  }

  async function _enablePin() {
    const vals = await _pinPrompt('Set app PIN', [
      { id: 'pin-new', label: 'New PIN' },
      { id: 'pin-confirm', label: 'Confirm PIN' },
    ]);
    try {
      await PinVault.enablePin(vals['pin-new'], vals['pin-confirm']);
      App.closeBottomSheet();
      App.showToast('PIN enabled', 'success');
      render();
    } catch (e) {
      App.showToast(e.message || 'Could not set PIN', 'error');
    }
  }

  async function _changePin() {
    const vals = await _pinPrompt('Change PIN', [
      { id: 'pin-old', label: 'Current PIN' },
      { id: 'pin-new', label: 'New PIN' },
      { id: 'pin-confirm', label: 'Confirm new PIN' },
    ]);
    try {
      await PinVault.changePin(vals['pin-old'], vals['pin-new'], vals['pin-confirm']);
      App.closeBottomSheet();
      App.showToast('PIN updated', 'success');
    } catch (e) {
      App.showToast(e.message || 'Could not change PIN', 'error');
    }
  }

  async function _disablePin() {
    const vals = await _pinPrompt('Disable PIN', [{ id: 'pin-old', label: 'Current PIN' }]);
    try {
      await PinVault.disablePin(vals['pin-old']);
      App.closeBottomSheet();
      App.showToast('PIN disabled', 'success');
      render();
    } catch (e) {
      App.showToast(e.message || 'PIN incorrect', 'error');
    }
  }

  async function _setDecoyPin() {
    if (PinVault.hasDecoy()) {
      if (!confirm('Replace existing decoy PIN?')) return;
    }
    const vals = await _pinPrompt('Decoy PIN', [
      { id: 'pin-main', label: 'Main PIN (verify)' },
      { id: 'pin-decoy', label: 'Decoy PIN' },
    ]);
    try {
      await PinVault.setDecoyPin(vals['pin-decoy'], vals['pin-main']);
      App.closeBottomSheet();
      App.showToast('Decoy PIN saved', 'success');
      render();
    } catch (e) {
      App.showToast(e.message || 'Could not save decoy', 'error');
    }
  }

  function _setPinAutoLock(val) {
    PinVault.setAutoLock(parseInt(val, 10) || 0);
    App.showToast('Auto-lock updated', 'success');
  }

  function _lockNow() {
    PinVault.lock();
    PinLock.show();
  }

  function _exportData() {
    if (PinVault?.isDecoyMode?.()) {
      App.showToast('Export blocked in decoy view — use main PIN', 'warning');
      return;
    }
    const json = State.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ledgercap-backup-${new Date().toISOString().slice(0, 10)}.ledgercap`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast('Backup exported', 'success');
  }

  async function _exportEncryptedBackup() {
    if (PinVault?.isDecoyMode?.()) {
      App.showToast('Export blocked in decoy view', 'warning');
      return;
    }
    if (typeof BackupCrypto === 'undefined') {
      App.showToast('Encryption unavailable', 'error');
      return;
    }
    const pin = prompt('Enter PIN to encrypt this backup (4+ digits):');
    if (!pin || pin.length < 4) {
      App.showToast('PIN required for encrypted backup', 'warning');
      return;
    }
    try {
      const payload = await BackupCrypto.encrypt(State.exportJSON(), pin);
      const blob = new Blob([payload], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ledgercap-encrypted-${new Date().toISOString().slice(0, 10)}.ledgercap.enc`;
      a.click();
      URL.revokeObjectURL(url);
      App.showToast('Encrypted backup exported', 'success');
    } catch (e) {
      App.showToast('Encrypt failed — enable PIN vault first', 'error');
    }
  }

  function _importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.ledgercap,.ledgercap.enc,.json,.stunds,application/json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (ev) => {
        let raw = ev.target.result;
        try {
          const parsed = JSON.parse(raw);
          if (parsed?.ledgercapEnc) {
            const pin = prompt('Enter PIN to decrypt backup:');
            if (!pin) return;
            raw = await BackupCrypto.decrypt(parsed, pin);
            if (!raw) { App.showToast('Decrypt failed — wrong PIN?', 'error'); return; }
          }
        } catch (_) { /* plain json */ }
        const ok = State.importJSON(raw);
        if (ok) { App.showToast('Data imported successfully', 'success'); App.renderCurrent(); }
        else App.showToast('Invalid backup file', 'error');
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function _saveProxy() {
    const url = window.LedgerCapConfig?.resolvePsxProxyUrl(document.getElementById('s-proxy')?.value?.trim() || '') || '';
    State.update(s => { s.settings.psxProxyUrl = url; });
    if (window.LEDGERCAP_CONFIG) window.LEDGERCAP_CONFIG.psxProxyUrl = url;
    _pingProxy(url);
    App.showToast(url ? 'Proxy URL saved' : 'Proxy cleared — using public fallbacks', 'success');
    App.renderCurrent();
    render();
  }

  function _saveNav(symbol) {
    const inp = document.querySelector(`.nav-inp[data-sym="${symbol}"]`);
    const nav = parseFloat(inp?.value);
    if (!nav || nav <= 0) { App.showToast('Enter a valid NAV', 'warning'); return; }
    State.updatePrice(symbol, { price: nav, prevClose: nav * 0.999, source: 'manual', ts: Date.now() });
    App.showToast(`${symbol} NAV updated to ₨${nav}`, 'success');
    App.renderCurrent();
  }

  function _snapshotBeforeDestructive() {
    try {
      const json = State.exportJSON();
      if (typeof PinVault !== 'undefined') PinVault.snapshotBeforeDestructive(json);
      else localStorage.setItem('ledgercap_pin_backup', json);
    } catch (e) {}
  }

  function _resetVault() {
    if (PinVault?.isDecoyMode?.()) {
      App.showToast('Reset blocked in decoy view', 'warning');
      return;
    }
    if (!confirm('Reset all data? Export a .ledgercap backup first if you need to recover.')) return;
    _snapshotBeforeDestructive();
    if (!confirm('Final confirmation — delete all ledger data on this device?')) return;
    State.reset();
    App.showToast('Data reset', 'warning');
    App.renderCurrent();
  }

  function loadSeedData(opts) {
    const silent = opts && opts.silent;
    const seed = window.INITIAL_TRANSACTIONS || [];
    if (!seed.length) { if (!silent) App.showToast('Seed data unavailable', 'error'); return false; }
    if (!silent && !confirm(`Load ${seed.length} portfolio transactions? Existing ledger will be replaced.`)) return false;
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
    if (!silent) App.showToast('Portfolio loaded ✓', 'success');
    App.renderCurrent();
    render();
    return true;
  }

  function _loadSeed() {
    loadSeedData();
  }

  function _clearHoldings() {
    if (!confirm('Remove all transactions? Settings and prices stay.')) return;
    State.update(s => { s.transactions = []; });
    App.showToast('Transactions cleared', 'warning');
    App.renderCurrent();
    render();
  }

  function _savePilot() {
    const conc = parseFloat(document.getElementById('p-conc')?.value) || 20;
    const pe = parseFloat(document.getElementById('p-pe')?.value) || 15;
    const rsiLow = parseFloat(document.getElementById('p-rsi-low')?.value) || 35;
    const rsiHigh = parseFloat(document.getElementById('p-rsi-high')?.value) || 65;
    const cash = parseFloat(document.getElementById('p-cash')?.value) || 0;
    const isFiler = !!document.getElementById('p-filer')?.checked;
    State.update(s => {
      s.pilotSettings = {
        concentrationThresholdPct: conc,
        corePeDiscountPct: pe,
        swingRsiOversold: rsiLow,
        swingRsiOverbought: rsiHigh,
        cashBalancePkr: cash,
        isFiler,
      };
    });
    App.showToast('Pilot settings saved', 'success');
    App.renderCurrent();
    render();
  }

  function _setNumberFormat(mode) {
    if (mode !== 'full' && mode !== 'compact') return;
    State.update(s => { s.settings.numberFormat = mode; });
    App.showToast(mode === 'compact' ? 'Compact numbers on' : 'Full numbers on', 'success');
    render();
    App.renderCurrent();
  }

  function _setDisplayCurrency(cur) {
    if (cur !== 'PKR' && cur !== 'USD') return;
    State.update(s => { s.settings.displayCurrency = cur; });
    App._updateCurrencyToggleBtn?.();
    if (typeof GlanceBridge !== 'undefined') GlanceBridge.publish();
    App.renderCurrent();
    App.showToast(`Display: ${cur}`, 'success');
    render();
  }

  function _setLiveStream(on) {
    State.update(s => { s.settings.liveStreamEnabled = !!on; });
    if (typeof LivePriceStream !== 'undefined') {
      if (on) LivePriceStream.init();
      else LivePriceStream.stop?.();
    }
    App.showToast(on ? 'Live stream on' : 'Live stream off', 'success');
    render();
  }

  function _setSnapshot(on) {
    State.update(s => { s.settings.snapshotEnabled = !!on; });
    if (on && typeof PriceSnapshotService !== 'undefined') PriceSnapshotService.init();
    App.showToast(on ? 'Market snapshot on' : 'Market snapshot off', 'success');
    render();
  }

  function _exportStatementCsv() {
    if (typeof StatementExport === 'undefined') {
      App.showToast('Export not loaded', 'error');
      return;
    }
    StatementExport.exportCsv();
    App.showToast('CSV exported', 'success');
  }

  function _exportStatementPdf() {
    if (typeof StatementExport === 'undefined') {
      App.showToast('Export not loaded', 'error');
      return;
    }
    if (!StatementExport.exportHtml()) App.showToast('Allow popups for PDF', 'warning');
  }

  function _setHaptics(on) {
    State.update(s => { s.settings.hapticsEnabled = !!on; });
    App.showToast(on ? 'Haptics on' : 'Haptics off', 'success');
  }

  function _setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return;
    App.applyTheme(theme);
    App.showToast(`${theme === 'light' ? 'Light' : 'Dark'} theme applied`, 'success');
    render();
  }

  async function _persistTelegramToken(tokenIn) {
    if (!tokenIn) return;
    if (typeof SecretsVault !== 'undefined') await SecretsVault.setTelegramToken(tokenIn);
    else State.update(s => { s.settings.telegramBotToken = tokenIn; });
  }

  async function _saveTelegram() {
    const tokenIn = document.getElementById('tg-token')?.value?.trim() || '';
    const chatId = document.getElementById('tg-chat')?.value?.trim() || '';
    const morning = !!document.getElementById('tg-morning')?.checked;
    const intraday = !!document.getElementById('tg-intraday')?.checked;
    const intradayNews = !!document.getElementById('tg-intraday-news')?.checked;
    const dividend = !!document.getElementById('tg-dividend')?.checked;
    const price = !!document.getElementById('tg-price')?.checked;
    const cloud = !!document.getElementById('tg-cloud')?.checked;
    const syncKey = document.getElementById('tg-sync-key')?.value?.trim() || '';
    if (tokenIn) await _persistTelegramToken(tokenIn);
    State.update(s => {
      s.settings.telegramChatId = chatId;
      s.settings.telegramMorningEnabled = morning;
      s.settings.telegramIntradayEnabled = intraday;
      s.settings.telegramIntradayNewsEnabled = intradayNews;
      s.settings.telegramDividendEnabled = dividend;
      s.settings.telegramPriceAlertsEnabled = price;
      s.settings.telegramCloudSyncEnabled = cloud;
      if (syncKey) s.settings.telegramSyncKey = syncKey;
    });
    App.showToast('Telegram settings saved', 'success');
    render();
  }

  async function _sendTelegramTest() {
    if (typeof TelegramService === 'undefined') {
      App.showToast('Telegram service not loaded', 'error');
      return;
    }
    const tokenIn = document.getElementById('tg-token')?.value?.trim();
    if (tokenIn) await _persistTelegramToken(tokenIn);
    const chatId = document.getElementById('tg-chat')?.value?.trim();
    if (chatId) {
      State.update(s => { s.settings.telegramChatId = chatId; });
    }
    if (!TelegramService.isConfigured()) {
      App.showToast('Enter bot token + chat ID first', 'warning');
      return;
    }
    App.showToast('Sending test…', 'info');
    const res = await TelegramService.sendTestMessage();
    App.showToast(res.ok ? 'Test message sent' : (res.error || 'Send failed'), res.ok ? 'success' : 'error');
  }

  async function _sendTelegramBrief() {
    if (!TelegramService?.isConfigured()) {
      App.showToast('Configure Telegram first', 'warning');
      return;
    }
    App.showToast('Building brief…', 'info');
    const res = await TelegramService.sendMorningBriefNow();
    App.showToast(res.ok ? 'Morning brief sent' : (res.error || 'Send failed'), res.ok ? 'success' : 'error');
  }

  async function _sendTelegramPortfolioDigests() {
    if (!TelegramService?.isConfigured()) {
      App.showToast('Configure Telegram first', 'warning');
      return;
    }
    App.showToast('Sending portfolio digests…', 'info');
    const res = await TelegramService.sendPortfolioDigestsNow();
    App.showToast(
      res.ok ? `Sent ${res.sent} portfolio message(s)` : (res.error || 'Send failed'),
      res.ok ? 'success' : 'error',
    );
  }

  async function _sendTelegramNews() {
    if (!TelegramService?.isConfigured()) {
      App.showToast('Configure Telegram first', 'warning');
      return;
    }
    App.showToast('Fetching news…', 'info');
    const res = await TelegramService.sendIntradayNewsNow();
    App.showToast(res.ok ? 'News digest sent' : (res.error || 'Send failed'), res.ok ? 'success' : 'error');
  }

  async function _detectTelegramChat() {
    const tokenIn = document.getElementById('tg-token')?.value?.trim();
    if (tokenIn) await _persistTelegramToken(tokenIn);
    if (!TelegramService?.resolveChatIds) {
      App.showToast('Telegram service not loaded', 'error');
      return;
    }
    App.showToast('Checking bot updates…', 'info');
    const res = await TelegramService.resolveChatIds();
    if (!res.ok) {
      App.showToast(res.error || 'Detect failed — message @LedgerCap_Bot first', 'error');
      return;
    }
    if (!res.chatIds?.length) {
      App.showToast('No chats yet — open t.me/LedgerCap_Bot and tap Start', 'warning');
      return;
    }
    const first = res.chatIds[0].id;
    State.update(s => { s.settings.telegramChatId = String(first); });
    const el = document.getElementById('tg-chat');
    if (el) el.value = String(first);
    App.showToast(`Chat ID ${first} detected`, 'success');
  }

  function _genTelegramSyncKey() {
    const key = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID().replace(/-/g, '')
      : 'lc' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    const el = document.getElementById('tg-sync-key');
    if (el) el.value = key;
    State.update(s => { s.settings.telegramSyncKey = key; });
    App.showToast('Sync key generated — save Telegram settings', 'success');
  }

  async function _syncTelegramCloud() {
    _saveTelegram();
    if (!TelegramService?.syncBriefToCloud) {
      App.showToast('Cloud sync not available', 'error');
      return;
    }
    App.showToast('Syncing brief…', 'info');
    const res = await TelegramService.syncBriefToCloud();
    App.showToast(res.ok ? `Synced (${res.bytes || 0} bytes)` : (res.error || 'Sync failed'), res.ok ? 'success' : 'error');
  }

  async function _checkTelegramProxy() {
    if (!TelegramService?.checkProxy) {
      App.showToast('Telegram service not loaded', 'error');
      return;
    }
    App.showToast('Checking worker proxy…', 'info');
    const res = await TelegramService.checkProxy();
    if (!res.ok) {
      App.showToast(res.error || 'Proxy failed — redeploy worker & check PSX proxy URL', 'error');
      return;
    }
    App.showToast(`Proxy OK (${res.proxy || 'worker'})`, 'success');
  }

  async function _pushCloudBackup() {
    if (typeof CloudBackupService === 'undefined') {
      App.showToast('Cloud backup not loaded', 'error');
      return;
    }
    const syncKey = document.getElementById('tg-sync-key')?.value?.trim();
    if (syncKey) State.update((s) => { s.settings.telegramSyncKey = syncKey; });
    App.showToast('Uploading encrypted backup…', 'info');
    const res = await CloudBackupService.pushBackup();
    App.showToast(res.ok ? 'Cloud backup saved' : (res.error || 'Upload failed'), res.ok ? 'success' : 'error');
  }

  async function _pullCloudBackup() {
    if (typeof CloudBackupService === 'undefined') {
      App.showToast('Cloud backup not loaded', 'error');
      return;
    }
    const syncKey = document.getElementById('tg-sync-key')?.value?.trim();
    if (syncKey) State.update((s) => { s.settings.telegramSyncKey = syncKey; });
    App.showToast('Fetching cloud backup…', 'info');
    const res = await CloudBackupService.pullBackup();
    if (res.ok) {
      App.showToast('Restored from cloud', 'success');
      App.renderCurrent();
      render();
    } else if (res.error !== 'Cancelled') {
      App.showToast(res.error || 'Restore failed', 'error');
    }
  }

  return { render, loadSeedData, _saveProfile, _saveManualAssets, _saveAssumptions, _resetAssumptions, _saveProxy, _saveNav, _saveFundNavs, _savePilot, _exportData, _exportEncryptedBackup, _importData, _resetVault, _loadSeed, _clearHoldings, _setTheme, _setHaptics, _setNumberFormat, _setDisplayCurrency, _setLiveStream, _setSnapshot, _exportStatementCsv, _exportStatementPdf, _refreshFx, _saveTelegram, _sendTelegramTest, _sendTelegramBrief, _sendTelegramPortfolioDigests, _sendTelegramNews, _detectTelegramChat, _genTelegramSyncKey, _syncTelegramCloud, _checkTelegramProxy, _pushCloudBackup, _pullCloudBackup, _enablePin, _changePin, _disablePin, _setDecoyPin, _setPinAutoLock, _lockNow };
})();
window.Settings = Settings;

;/* === js/modules/pin-lock.js === */
'use strict';
const PinLock = (() => {
  let _gatePromise = null;
  let _digits = '';
  let _busy = false;

  function _el(id) {
    return document.getElementById(id);
  }

  function _renderDots() {
    const dots = _el('pin-dots');
    if (!dots) return;
    const n = _digits.length;
    dots.setAttribute('role', 'progressbar');
    dots.setAttribute('aria-label', 'PIN entry progress');
    dots.setAttribute('aria-valuemin', '0');
    dots.setAttribute('aria-valuemax', '6');
    dots.setAttribute('aria-valuenow', String(n));
    dots.setAttribute('aria-valuetext', `${n} of up to 6 digits entered`);
    dots.innerHTML = Array.from({ length: 6 }, (_, i) =>
      `<span class="lc-pin-dot${i < n ? ' lc-pin-dot--on' : ''}" aria-hidden="true"></span>`
    ).join('');
  }

  function _setError(msg) {
    const err = _el('pin-error');
    if (!err) return;
    if (!msg) {
      err.classList.add('hidden');
      err.textContent = '';
      return;
    }
    err.textContent = msg;
    err.classList.remove('hidden');
  }

  function _showOverlay() {
    const root = _el('pin-lock');
    if (!root) return;
    root.classList.remove('hidden');
    root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lc-pin-active');
    _digits = '';
    _renderDots();
    _setError('');
    _buildPad();
  }

  function _hideOverlay() {
    const root = _el('pin-lock');
    if (!root) return;
    root.classList.add('hidden');
    root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lc-pin-active');
    _digits = '';
    _gatePromise = null;
  }

  function _buildPad() {
    const pad = _el('pin-pad');
    if (!pad || pad.dataset.built) return;
    pad.dataset.built = '1';
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'];
    const delHtml = typeof LcIcons !== 'undefined' ? LcIcons.icon('x', 18) : 'Del';
    pad.innerHTML = keys.map(k => {
      if (!k) return '<span class="lc-pin-key lc-pin-key--spacer"></span>';
      const act = k === 'back' ? 'back' : 'digit';
      const label = k === 'back' ? delHtml : k;
      return `<button type="button" class="lc-pin-key${k === 'back' ? ' lc-pin-key--del' : ''}" data-act="${act}" data-val="${k === 'back' ? '' : k}" aria-label="${k === 'back' ? 'Delete' : k}">${label}</button>`;
    }).join('');
    pad.addEventListener('click', e => {
      const btn = e.target.closest('.lc-pin-key');
      if (!btn || _busy) return;
      const act = btn.dataset.act;
      if (act === 'back') {
        _digits = _digits.slice(0, -1);
        _renderDots();
        _setError('');
        return;
      }
      if (_digits.length >= 6) return;
      _digits += btn.dataset.val;
      _renderDots();
      _setError('');
      _scheduleSubmit();
    });
  }

  let _pendingSubmit = null;

  function _scheduleSubmit() {
    if (_pendingSubmit) clearTimeout(_pendingSubmit);
    if (_digits.length >= 6) {
      _submitPin();
      return;
    }
    if (_digits.length >= 4) {
      _pendingSubmit = setTimeout(() => {
        _pendingSubmit = null;
        if (_digits.length >= 4 && _digits.length <= 6) _submitPin();
      }, 550);
    }
  }

  async function _submitPin() {
    if (_pendingSubmit) {
      clearTimeout(_pendingSubmit);
      _pendingSubmit = null;
    }
    if (_busy || _digits.length < 4) return;
    _busy = true;
    const pin = _digits;
    const waitMs = PinVault.lockoutRemaining();
    if (waitMs > 0) {
      _setError(`Locked — wait ${Math.ceil(waitMs / 1000)}s`);
      _digits = '';
      _renderDots();
      _busy = false;
      return;
    }
    const res = await PinVault.verifyPin(pin);
    if (res.ok) {
      PinVault.unlock(res.decoy);
      _hideOverlay();
      if (res.decoy && typeof App !== 'undefined') {
        App.showToast('Private view — decoy PIN', 'info', 4000);
      }
      if (_gatePromise?.resolve) _gatePromise.resolve();
      _busy = false;
      return;
    }
    _digits = '';
    _renderDots();
    if (res.locked) {
      _setError('Too many attempts — wait 30s');
    } else if (res.attemptsLeft != null) {
      _setError(res.attemptsLeft > 0 ? `Wrong PIN — ${res.attemptsLeft} left` : 'Wrong PIN');
    } else {
      _setError('Wrong PIN');
    }
    _busy = false;
  }

  function gate() {
    if (!PinVault.isEnabled()) return Promise.resolve();
    if (PinVault.isUnlocked()) return Promise.resolve();
    if (_gatePromise) return _gatePromise.promise;
    let resolve;
    const promise = new Promise(r => { resolve = r; });
    _gatePromise = { promise, resolve };
    _showOverlay();
    return promise;
  }

  function show() {
    PinVault.lock();
    return gate();
  }

  return { gate, show };
})();

window.PinLock = PinLock;

;/* === js/modules/signals.js === */
'use strict';
const Signals = (() => {
  const U = PlatformUI;
  let _tab = 'morning';

  function _actionClass(action) {
    const a = (action || '').toUpperCase();
    if (a.includes('SELL') || a === 'REDUCE' || a === 'TRIM') return 't-loss';
    if (a.includes('BUY') || a === 'ADD') return 't-gain';
    if (a === 'WATCH') return 't-warn';
    return '';
  }

  function _segment() {
    return `<div class="lc-segment perf-tabs cap-tab-bar" role="tablist" style="margin-bottom:12px">
      <button type="button" class="lc-segment-btn perf-tab cap-tab${_tab === 'morning' ? ' on active' : ''}" role="tab" aria-selected="${_tab === 'morning'}" data-action="Signals.setTab" data-tab="morning">Morning</button>
      <button type="button" class="lc-segment-btn perf-tab cap-tab${_tab === 'intraday' ? ' on active' : ''}" role="tab" aria-selected="${_tab === 'intraday'}" data-action="Signals.setTab" data-tab="intraday">Intraday</button>
      <button type="button" class="lc-segment-btn perf-tab cap-tab${_tab === 'buy' ? ' on active' : ''}" role="tab" aria-selected="${_tab === 'buy'}" data-action="Signals.setTab" data-tab="buy">Buy more</button>
    </div>`;
  }

  function _signalRow(s, onSymbol) {
    const click = onSymbol ? `data-action="Research.open" data-symbol="${s.symbol}"` : '';
    return `<div class="os-row cap-reveal" style="cursor:pointer" ${click}>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="os-row-sym">${s.symbol}</span>
          <span class="badge" style="font-size:10px;opacity:.8">${s.book === 'swing' ? 'Swing' : 'Core'}</span>
          <span class="badge ${_actionClass(s.action)}" style="font-size:10px;font-weight:700">${s.action}</span>
        </div>
        <div style="font-size:12px;color:var(--os-text-secondary);margin-top:4px;line-height:1.45">${s.rationale}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div class="${s.pl_pct >= 0 ? 't-gain' : 't-loss'}" style="font-weight:700;font-size:13px">${s.pl_pct >= 0 ? '+' : ''}${Number(s.pl_pct).toFixed(1)}%</div>
        <div style="font-size:11px;color:var(--os-text-tertiary)">${Number(s.weight_pct).toFixed(1)}% wt</div>
      </div>
    </div>`;
  }

  function _intradayRow(s) {
    const cls = s.movePct >= 0 ? 't-gain' : 't-loss';
    return `<div class="os-row cap-reveal" style="cursor:pointer" data-action="Research.open" data-symbol="${s.symbol}">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="os-row-sym">${s.symbol}</span>
          <span class="badge" style="font-size:10px">${s.kind}</span>
          <span class="badge" style="font-size:10px;opacity:.8">${s.book === 'swing' ? 'Swing' : 'Core'}</span>
        </div>
        <div style="font-size:12px;color:var(--os-text-secondary);margin-top:4px">${s.label}</div>
      </div>
      <div class="${cls}" style="font-weight:700;font-size:13px">${s.movePct >= 0 ? '+' : ''}${Number(s.movePct).toFixed(1)}%</div>
    </div>`;
  }

  function _buyRow(r) {
    const src = r.source === 'both' ? 'Rebalance + morning' : r.source === 'morning' ? 'Morning brief' : 'Rebalance';
    return `<div class="os-row cap-reveal" style="cursor:pointer" data-action="Research.open" data-symbol="${r.symbol}">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="os-row-sym">${r.symbol}</span>
          <span class="badge t-gain" style="font-size:10px;font-weight:700">${r.action}</span>
          <span class="badge" style="font-size:10px;opacity:.75">${src}</span>
        </div>
        <div style="font-size:12px;color:var(--os-text-secondary);margin-top:4px;line-height:1.45">${r.rationale}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-weight:700;font-size:13px">${r.buy_shares} sh</div>
        <div style="font-size:11px;color:var(--os-text-tertiary)">${PsxUI.fmt(r.buy_pkr)} @ ${PsxUI.fmt(r.ltp)}</div>
      </div>
    </div>`;
  }

  function renderBriefCard() {
    return typeof MarketUI !== 'undefined' ? MarketUI.morningBriefCard() : '';
  }

  function _renderMorning(screen) {
    const brief = PilotEngine.buildMorningBrief();
    const score = PilotEngine.buildPilotScore();
    const summary = PilotEngine.portfolioSummary();

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Signals</h1><p>Morning brief · Core &amp; Swing books</p></div>
    ${_segment()}
    ${U.metricGrid([
      U.metricCell('Pilot Score', score.grade + ' · ' + score.score, null, score.score >= 70 ? 't-gain' : 't-warn'),
      U.metricCell('Core book', summary.core_pct.toFixed(0) + '%', 'Long-term positions'),
      U.metricCell('Swing book', summary.swing_pct.toFixed(0) + '%', 'Tactical trades'),
      U.metricCell('Positions', String(summary.holdings_count), 'Stocks + funds'),
    ], 2)}

    ${U.section('Urgent actions', (brief.urgent_signals || []).length
      ? brief.urgent_signals.map(s => _signalRow(s, true)).join('')
      : '<div style="color:var(--os-text-secondary);padding:8px 0">No urgent trim/sell signals today.</div>')}

    ${U.section('Core book', (brief.core_signals || []).slice(0, 12).map(s => _signalRow(s, true)).join('') || '<div style="color:var(--os-text-secondary)">No core equity signals.</div>')}

    ${brief.swing_signals?.length ? U.section('Swing book', brief.swing_signals.map(s => _signalRow(s, true)).join('')) : ''}

    ${brief.ipo_reminders?.length ? U.section('IPO reminders', brief.ipo_reminders.map(t => `<div class="os-insight cap-reveal"><div class="os-insight-icon">📅</div><div class="os-insight-text">${t}</div></div>`).join('')) : ''}

    ${U.section('Book tags', _bookTagEditor())}

    <div class="lc-disclaimer">${brief.disclaimer}</div>
    </div>`;
  }

  function _renderIntraday(screen) {
    const rows = typeof IntradaySignals !== 'undefined' ? IntradaySignals.scan() : [];
    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head"><h1>Signals</h1><p>PSX session moves vs previous close</p></div>
      ${_segment()}
      ${U.metricGrid([
        U.metricCell('Flags', String(rows.length), '≥2% move or rule hit'),
        U.metricCell('Threshold', '2%', 'Session change'),
        U.metricCell('Gap', '4%', 'Gap up/down'),
        U.metricCell('Source', 'Cached prices', 'No paid API'),
      ], 2)}
      ${U.section('Intraday flags', rows.length
        ? rows.map(_intradayRow).join('')
        : '<div style="color:var(--os-text-secondary);padding:8px 0">No PSX moves above thresholds in your holdings.</div>')}
      <div class="lc-disclaimer">Rule-based session scan — refresh prices during market hours. Not financial advice.</div>
    </div>`;
  }

  function _renderBuy(screen) {
    const recs = typeof BuyRecommendations !== 'undefined' ? BuyRecommendations.getRecommendations() : [];
    const totalPkr = recs.reduce((a, r) => a + (r.buy_pkr || 0), 0);
    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head"><h1>Signals</h1><p>Buy more — rebalance ADD + morning STRONG BUY / ADD</p></div>
      ${_segment()}
      ${U.metricGrid([
        U.metricCell('Ideas', String(recs.length), 'Merged sources'),
        U.metricCell('Est. deploy', PsxUI.fmt(totalPkr), 'PSX 100-lot rounded'),
        U.metricCell('Lot rule', '100 shares', 'PSX minimum'),
        U.metricCell('Targets', 'Optional', 'Set in Pilot Tools'),
      ], 2)}
      ${U.section('Buy list', recs.length
        ? recs.map(_buyRow).join('')
        : '<div style="color:var(--os-text-secondary);padding:8px 0">No ADD signals — set target weights in Tax &amp; Rebalance or wait for morning brief upgrades.</div>')}
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="pilot-tools">Set target weights</button>
      </div>
      <div class="lc-disclaimer">Illustrative lot sizes — verify cash and broker limits before trading.</div>
    </div>`;
  }

  function render(target) {
    const screen = target || document.getElementById('screen-signals');
    if (!screen) return;
    if (_tab === 'intraday') _renderIntraday(screen);
    else if (_tab === 'buy') _renderBuy(screen);
    else _renderMorning(screen);
    CapMotion.refresh();
  }

  function setTab(tab) {
    _tab = tab === 'intraday' || tab === 'buy' ? tab : 'morning';
    render();
  }

  function _bookTagEditor() {
    const rows = PortfolioAnalyticsService.getHoldings().filter(h => h.kind === 'stock').slice(0, 20);
    if (!rows.length) return '<div style="color:var(--os-text-secondary)">Add stock holdings to tag Core vs Swing.</div>';
    return rows.map(h => {
      const meta = PilotEngine.holdingMeta(h.symbol, h.broker);
      const book = meta.book || 'core';
      return `<div class="os-row">
        <div class="os-row-sym">${h.symbol}</div>
        <div style="display:flex;gap:6px">
          <button type="button" class="btn-sm ${book === 'core' ? 'btn-primary' : 'btn-ghost'}" data-action="Signals.setBook" data-symbol="${h.symbol}" data-broker="${h.broker}" data-tab="core">Core</button>
          <button type="button" class="btn-sm ${book === 'swing' ? 'btn-primary' : 'btn-ghost'}" data-action="Signals.setBook" data-symbol="${h.symbol}" data-broker="${h.broker}" data-tab="swing">Swing</button>
        </div>
      </div>`;
    }).join('');
  }

  function setBook(symbol, broker, book) {
    PilotEngine.setHoldingMeta(symbol, broker, { book });
    if (window.App?.showToast) App.showToast(`${symbol} → ${book} book`, 'ok');
    render();
    if (window.Home) Home.render();
  }

  return { render, renderBriefCard, setBook, setTab };
})();
window.Signals = Signals;

;/* === js/modules/risk-audit.js === */
'use strict';
const RiskAudit = (() => {
  const U = PlatformUI;

  function _sevClass(sev) {
    if (sev === 'critical' || sev === 'high') return 'lc-verdict--high';
    if (sev === 'medium') return 'lc-verdict--warn';
    return '';
  }

  function _report(state) {
    const intel = PortfolioAnalyticsService.getIntelligence(state);
    return RiskAuditService.buildReport({
      intel,
      summary: intel.summary,
      holdings: PortfolioAnalyticsService.getHoldings(state),
      cgt: PilotEngine.buildCgtReport(state),
      rebalance: PilotEngine.buildRebalancePlan(state),
      pilotScore: PilotEngine.buildPilotScore(state),
      rafiStocks: window.RAFI_STOCKS || [],
      akdStocks: window.AKD_STOCKS || [],
    });
  }

  function render() {
    const screen = document.getElementById('screen-risk-audit');
    if (!screen) return;
    const state = State.get();

    if (!state.transactions?.length) {
      screen.innerHTML = `<div class="lc-dash"><div class="lc-screen-head"><h1>Risk audit</h1><p>Concentration · tax · allocation drift</p></div>
        ${MarketUI.emptyState(LcIcons.icon('shield', 28), 'No holdings', 'Load your ledger to run a rule-based risk audit.', '<button type="button" class="os-btn os-btn-primary" data-action="App.openAddTransaction">Add holdings</button>')}
      </div>`;
      CapMotion.refresh();
      return;
    }

    const report = _report(state);
    const ps = report.pilotScore || {};

    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head">
        <h1>Risk audit</h1>
        <p>Rule-based checklist — sector · name · broker · CGT · drift</p>
      </div>
      ${U.metricGrid([
        U.metricCell('Pilot Score', `${ps.grade || '—'} · ${ps.score ?? '—'}`, 'Composite health'),
        U.metricCell('Critical', String(report.counts.critical), 'Immediate review'),
        U.metricCell('High', String(report.counts.high), 'This week'),
        U.metricCell('Findings', String(report.findings.length), 'All categories'),
      ], 2)}

      ${report.findings.length ? U.section('Findings', report.findings.map(f => `
        <div class="lc-verdict ${_sevClass(f.severity)} cap-reveal">
          <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            <strong>${f.title}</strong>
            <span class="badge" style="font-size:10px;text-transform:uppercase">${f.severity} · ${f.category}</span>
          </div>
          <p style="margin:0 0 6px;font-size:13px;line-height:1.45">${f.detail}</p>
          <small>→ ${f.action}</small>
        </div>`).join('')) : U.section('Findings', '<p class="lc-empty-note">No elevated risks flagged — keep monitoring weekly.</p>')}

      ${U.section('Score breakdown', `
        <div class="lc-metric-grid">
          <div class="lc-metric-cell"><label>Diversification</label><strong>${report.scores.diversification ?? '—'}/100</strong></div>
          <div class="lc-metric-cell"><label>Risk</label><strong>${report.scores.risk ?? '—'}/100</strong></div>
          <div class="lc-metric-cell"><label>Dividend quality</label><strong>${report.scores.dividendQuality ?? '—'}/100</strong></div>
          <div class="lc-metric-cell"><label>Growth quality</label><strong>${report.scores.growthQuality ?? '—'}/100</strong></div>
        </div>
        ${(ps.improvements || []).length ? `<p style="font-size:12px;color:var(--os-text-secondary);margin-top:12px">${ps.improvements.map(i => `• ${i}`).join('<br>')}</p>` : ''}
      `)}

      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="pilot-tools">Tax &amp; Rebalance</button>
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="signals">Signals</button>
        <button type="button" class="psx-btn psx-btn-primary" data-action="Navigation.goResearchIntel">Portfolio intel</button>
      </div>
      <div class="lc-disclaimer">${report.disclaimer}</div>
    </div>`;
    CapMotion.refresh();
  }

  return { render, _report };
})();
window.RiskAudit = RiskAudit;

;/* === js/modules/insights.js === */
'use strict';
/** Portfolio insights screen — distinct from engines/insights.js rule engine. */
const InsightsScreen = (() => {
  const SECONDARY_BENCH = 'MZNPETF';

  function _benchmarkCompare(state) {
    const summary = PortfolioAnalyticsService.getSummary(state);
    const daily = State.calcDailyPnl();
    const portPct = summary.totalValue > 0 ? (daily / summary.totalValue) * 100 : 0;

    const kse = state.kseIndex || {};
    let benchPct = kse.changeP;
    if (benchPct == null && kse.value && kse.prevClose) {
      benchPct = ((kse.value - kse.prevClose) / kse.prevClose) * 100;
    }
    benchPct = benchPct != null ? benchPct : 0;
    const alpha = portPct - benchPct;

    const mznPrice = State.getPrice(SECONDARY_BENCH) || 0;
    const mznPrev = State.getPrevClose(SECONDARY_BENCH) || mznPrice;
    const mznPct = mznPrev > 0 ? ((mznPrice - mznPrev) / mznPrev) * 100 : 0;

    return {
      portPct,
      benchPct,
      alpha,
      benchSymbol: 'KSE-100',
      benchValue: kse.value,
      secondarySymbol: SECONDARY_BENCH,
      secondaryPct: mznPct,
    };
  }

  function _valueSeries(state) {
    const hist = state.priceHistory || [];
    if (hist.length >= 2) {
      return hist.map(h => h.totalValue || h.value || 0).filter(v => v > 0);
    }
    const now = State.calcTotalValue();
    const cost = State.calcTotalCost();
    if (now > 0 && cost > 0) return [cost, now];
    return now > 0 ? [now] : [];
  }

  function _zakatDue(state) {
    const settings = state.settings || {};
    const ma = state.manualAssets || {};
    const goldG = settings.goldPricePerGram || 18000;
    const nisab = 87.48 * goldG;
    const s = PortfolioAnalyticsService.getSummary(state);
    const zakatable = Math.max(0, s.totalValue + (ma.usdCash || 0) * FxService.getUsdRate()
      + (ma.goldGrams || 0) * goldG + (ma.realEstate || 0) - (settings.zakatDebts || 0));
    return { due: zakatable >= nisab ? zakatable * 0.025 : 0, zakatable, nisab };
  }

  function render() {
    const screen = document.getElementById('screen-insights');
    if (!screen) return;
    const state = State.get();

    if (!state.transactions?.length) {
      screen.innerHTML = `<div class="lc-dash"><div class="lc-screen-head"><h1>Insights</h1><p>Pilot score · benchmark · history</p></div>
        ${MarketUI.emptyState(LcIcons.icon('chart', 28), 'No insights yet', 'Add holdings to see score, benchmark, and value history.', '<button type="button" class="os-btn os-btn-primary" data-action="App.openAddTransaction">Add holdings</button>')}
      </div>`;
      CapMotion.refresh();
      return;
    }

    const pilot = PilotEngine.buildPilotScore(state);
    const bench = _benchmarkCompare(state);
    const zakat = _zakatDue(state);
    const series = _valueSeries(state);
    const ruleInsights = (typeof Insights !== 'undefined' ? Insights.generate(state) : []) || [];
    const histDays = (state.priceHistory || []).length;
    const alphaCls = bench.alpha >= 0 ? 't-gain' : 't-loss';

    screen.innerHTML = `
    <div class="lc-dash">
      <div class="lc-screen-head">
        <h1>Insights</h1>
        <p>Pilot score · KSE-100 benchmark · zakatable wealth</p>
      </div>

      <div class="lc-dash-hero cap-reveal">
        <div class="lc-dash-hero-label">Pilot Score</div>
        <div class="lc-dash-hero-val">${pilot.grade} · ${pilot.score}/100</div>
        <div class="lc-dash-hero-row">
          ${(pilot.highlights || []).slice(0, 2).map(h => `<span class="lc-dash-chip">${h}</span>`).join('')}
        </div>
      </div>

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>vs ${bench.benchSymbol} (today)</h3><span>PSX index</span></div>
        <div class="lc-metric-grid">
          <div class="lc-metric-cell"><label>Your portfolio</label><strong class="${bench.portPct >= 0 ? 't-gain' : 't-loss'}">${bench.portPct >= 0 ? '+' : ''}${bench.portPct.toFixed(2)}%</strong></div>
          <div class="lc-metric-cell"><label>${bench.benchSymbol}</label><strong class="${bench.benchPct >= 0 ? 't-gain' : 't-loss'}">${bench.benchPct >= 0 ? '+' : ''}${bench.benchPct.toFixed(2)}%</strong></div>
          <div class="lc-metric-cell"><label>Alpha (est.)</label><strong class="${alphaCls}">${bench.alpha >= 0 ? '+' : ''}${bench.alpha.toFixed(2)}%</strong></div>
        </div>
        <div class="lc-metric-grid" style="margin-top:8px">
          <div class="lc-metric-cell"><label>${bench.secondarySymbol}</label><strong class="${bench.secondaryPct >= 0 ? 't-gain' : 't-loss'}">${bench.secondaryPct >= 0 ? '+' : ''}${bench.secondaryPct.toFixed(2)}%</strong></div>
          <div class="lc-metric-cell"><label>Index level</label><strong>${bench.benchValue ? PsxUI.fmtIndex(bench.benchValue) : '—'}</strong></div>
        </div>
        <p class="lc-card-sub" style="margin-top:8px">KSE-100 primary benchmark (Sarmaaya-style). ${bench.secondarySymbol} shown as Shariah ETF proxy.</p>
      </div>

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Portfolio value</h3><span>${histDays} day${histDays === 1 ? '' : 's'} logged</span></div>
        <div class="lc-chart-wrap">${typeof Charts !== 'undefined' ? Charts.lineChartBlock(series, { height: 120, ariaLabel: 'Portfolio insight trend' }) : ''}</div>
        <p class="lc-card-sub" style="margin-top:8px">Open app after price refresh to build daily snapshots.</p>
      </div>

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Zakat snapshot</h3><button type="button" class="lc-section-action" data-nav="zakat">Calculator →</button></div>
        <div class="lc-metric-grid">
          <div class="lc-metric-cell"><label>Est. due</label><strong>${PsxUI.fmt(zakat.due)}</strong></div>
          <div class="lc-metric-cell"><label>Zakatable</label><strong>${PsxUI.fmt(zakat.zakatable)}</strong></div>
          <div class="lc-metric-cell"><label>Nisab</label><strong>${PsxUI.fmt(zakat.nisab)}</strong></div>
        </div>
      </div>

      ${ruleInsights.length ? `<div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Contribution insights</h3><span>Rule-based</span></div>
        ${ruleInsights.map(i => `
          <div class="lc-verdict cap-reveal">
            <p>${i.text || i.message || ''}</p>
            ${i.action ? `<small>→ ${i.action}</small>` : ''}
          </div>`).join('')}
      </div>` : ''}

      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="risk-audit">Risk audit</button>
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="performance">Performance</button>
      </div>
      <div class="lc-disclaimer">Smart Assistant summary — not financial advice. Benchmark is illustrative only.</div>
    </div>`;
    CapMotion.refresh();
  }

  return { render, _benchmarkCompare, _valueSeries };
})();
window.InsightsScreen = InsightsScreen;

;/* === js/modules/comparison.js === */
'use strict';
const StockComparison = (() => {
  let _symbol1 = '';
  let _symbol2 = '';

  function render() {
    const screen = document.getElementById('screen-comparison');
    if (!screen) return;

    const holdings = PortfolioAnalyticsService ? PortfolioAnalyticsService.getHoldings() : [];
    const symbols = holdings.map(h => h.symbol);

    if (symbols.length < 2) {
      screen.innerHTML = `<div class="lc-dash"><div class="lc-screen-head"><h1>Compare</h1><p>Side by side</p></div>${MarketUI.emptyState(LcIcons.icon('scale', 28), 'Need 2+ holdings to compare', 'Add more stocks or funds to compare side-by-side performance.', '<button type="button" class="os-btn os-btn-primary" data-action="App.openAddTransaction">Add holdings</button>')}</div>`;
      CapMotion.refresh();
      return;
    }

    // Use selected symbols if available, otherwise use first two
    const sym1 = _symbol1 || symbols[0];
    const sym2 = _symbol2 || symbols[1];
    const comp1 = _buildComparison(sym1);
    const comp2 = _buildComparison(sym2);

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Compare</h1><p>Side by side · ${sym1} vs ${sym2}</p></div>
    <div class="comp-header cap-reveal" style="padding-top:0">
      <div class="comp-selectors">
        <select class="comp-select" data-action-change="StockComparison._selectSymbol">
          <option value="">Select Stock 1</option>
          ${symbols.map(s => `<option value="${s}" ${sym1 === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
        <select class="comp-select" data-action-change="StockComparison._selectSymbol">
          <option value="">Select Stock 2</option>
          ${symbols.map(s => `<option value="${s}" ${sym2 === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>

    ${sym1 && sym2 ? `
    <div class="comp-grid cap-reveal">
      <div class="comp-card">
        <div class="comp-card-title">${sym1}</div>
        ${_renderComparisonCard(comp1)}
      </div>
      <div class="comp-card">
        <div class="comp-card-title">${sym2}</div>
        ${_renderComparisonCard(comp2)}
      </div>
    </div>

    <div class="comp-verdict cap-reveal">
      <div class="comp-verdict-title">Comparison Results</div>
      ${_renderVerdict(comp1, comp2)}
    </div>
    ` : '<div class="os-empty-body cap-reveal">Select two stocks to compare</div>'}

    </div>`;
    CapMotion.refresh();
  }

  function _buildComparison(symbol) {
    const holdings = PortfolioAnalyticsService ? PortfolioAnalyticsService.getHoldings() : [];
    const h = holdings.find(holding => holding.symbol === symbol) || {};
    const price = State.getPrice(symbol);
    const prevClose = State.getPrevClose(symbol);
    const change = price - prevClose;
    const changePct = prevClose > 0 ? (change / prevClose) * 100 : 0;
    const totalValue = h.value || 0;
    const totalCost = h.costBasis || h.cost || h.invested || 0;
    const totalReturn = totalValue - totalCost;
    const returnPct = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;
    const divPaid = (typeof State !== 'undefined' && State.dividendsBySymbol)
      ? (State.dividendsBySymbol()[symbol] || 0)
      : (h.dividend || 0);
    const yieldPct = h.divYield || 0;

    return {
      symbol,
      price,
      change,
      changePct,
      totalValue,
      totalCost,
      totalReturn,
      returnPct,
      divPaid,
      yieldPct,
      units: h.quantity || 0
    };
  }

  function _renderComparisonCard(comp) {
    return `
      <div class="comp-metric">
        <div class="comp-metric-label">Current Price</div>
        <div class="comp-metric-value">${PlatformUI.fmt(comp.price)}</div>
        <div class="comp-metric-sub ${comp.changePct >= 0 ? 't-gain' : 't-loss'}">${comp.changePct >= 0 ? '+' : ''}${PlatformUI.fmt(comp.changePct, { pct: true })}</div>
      </div>
      <div class="comp-metric">
        <div class="comp-metric-label">Total Return</div>
        <div class="comp-metric-value ${comp.returnPct >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(comp.totalReturn)}</div>
        <div class="comp-metric-sub">${comp.returnPct >= 0 ? '+' : ''}${PlatformUI.fmt(comp.returnPct, { pct: true })}</div>
      </div>
      <div class="comp-metric">
        <div class="comp-metric-label">Dividend Yield</div>
        <div class="comp-metric-value">${PlatformUI.fmt(comp.yieldPct, { pct: true })}</div>
        <div class="comp-metric-sub">₨${PlatformUI.fmt(comp.divPaid)}</div>
      </div>
      <div class="comp-metric">
        <div class="comp-metric-label">Position Value</div>
        <div class="comp-metric-value">${PlatformUI.fmt(comp.totalValue)}</div>
        <div class="comp-metric-sub">${PlatformUI.fmt(comp.units)} units</div>
      </div>
    `;
  }

  function _renderVerdict(comp1, comp2) {
    let score1 = 0, score2 = 0;
    if (comp1.returnPct > comp2.returnPct) score1++; else score2++;
    if (comp1.yieldPct > comp2.yieldPct) score1++; else score2++;
    if (comp1.changePct > comp2.changePct) score1++; else score2++;
    if (comp1.price / comp1.totalCost > comp2.price / comp2.totalCost) score1++; else score2++;
    const winner = score1 > score2 ? 'winner-left' : score2 > score1 ? 'winner-right' : 'tie';
    return `
      <div class="comp-verdict-row">
        <div class="comp-verdict-metric">
          <div class="comp-verdict-name">Return</div>
          <div class="comp-verdict-score ${score1 > score2 ? 'winner' : ''}">${comp1.symbol}</div>
          <div class="comp-verdict-vs">vs</div>
          <div class="comp-verdict-score ${score2 > score1 ? 'winner' : ''}">${comp2.symbol}</div>
        </div>
      </div>
      <div class="comp-verdict-winner ${winner}">
        ${winner === 'tie' ? '🤝 Tied Performance' : (score1 > score2 ? `🏆 ${comp1.symbol} Leads` : `🏆 ${comp2.symbol} Leads`)}
      </div>
    `;
  }

  function _selectSymbol(n, symbol) {
    if (n === 1) _symbol1 = symbol;
    if (n === 2) _symbol2 = symbol;
    render();
  }

  return { render, _selectSymbol };
})();
window.StockComparison = StockComparison;
window.Comparison = StockComparison;

;/* === js/modules/performance.js === */
'use strict';
const Performance = (() => {
  let _tab = 'daily';
  let _histRange = 365;

  function _priceFn(symbol, fallback) {
    const live = typeof State !== 'undefined' ? State.getPrice(symbol) : 0;
    if (live && live > 0) return live;
    const fp = (window.FALLBACK_PRICES || {})[symbol];
    return fp && fp > 0 ? fp : (fallback || 0);
  }

  function render() {
    const screen = document.getElementById('screen-performance');
    if (!screen) return;

    const state = State.get();
    if (!state.transactions?.length) {
      screen.innerHTML = `<div class="lc-dash"><div class="lc-screen-head"><h1>Performance</h1><p>P&amp;L tracking</p></div>${MarketUI.emptyState('📈', 'No performance data', 'Add holdings to track daily, monthly, and predictive profit.', '<button type="button" class="os-btn os-btn-primary" data-action="App.openAddTransaction">Add holdings</button>')}</div>`;
      CapMotion.refresh();
      return;
    }

    const dailyData = _calcDailyPnL(state);
    const monthlyData = _calcMonthlyPnL(state);
    const predictiveData = _calcPredictivePnL(state);
    const totalRealised = Ledger.realisedPnl(state.transactions || []);
    const realisedRows = Ledger.realisedTrades ? Ledger.realisedTrades(state.transactions || []) : [];
    const histDays = (state.priceHistory || []).length;
    const m2mSource = histDays >= 2 ? 'logged snapshots' : 'cost-basis until more daily snapshots';
    const costBasis = Ledger.currentCostBasis ? Ledger.currentCostBasis(state.transactions || []) : State.calcTotalCost();
    const marketValue = State.calcTotalValue();
    const unrealised = marketValue - costBasis;

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Performance</h1><p>P&amp;L tracking · daily · monthly · forecast</p></div>
    <div class="perf-header cap-reveal" style="padding-top:0">
      <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;margin-top:var(--space-2);font-size:0.85rem;color:var(--os-text-secondary);">
        <span>Cost basis <strong>${PlatformUI.fmt(costBasis)}</strong></span>
        <span>Unrealised <strong class="${unrealised >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(unrealised)}</strong></span>
        <span>Realised <strong class="${totalRealised >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(totalRealised)}</strong></span>
      </div>
      <div class="perf-tabs cap-tab-bar">
        <button type="button" class="perf-tab cap-tab${_tab === 'daily' ? ' active' : ''}" data-action="Performance.setTab" data-tab="daily">Daily</button>
        <button type="button" class="perf-tab cap-tab${_tab === 'monthly' ? ' active' : ''}" data-action="Performance.setTab" data-tab="monthly">Monthly</button>
        <button type="button" class="perf-tab cap-tab${_tab === 'history' ? ' active' : ''}" data-action="Performance.setTab" data-tab="history">NAV series</button>
        <button type="button" class="perf-tab cap-tab${_tab === 'realised' ? ' active' : ''}" data-action="Performance.setTab" data-tab="realised">Realised</button>
        <button type="button" class="perf-tab cap-tab${_tab === 'predictive' ? ' active' : ''}" data-action="Performance.setTab" data-tab="predictive">Forecast</button>
      </div>
      <p class="perf-disclaimer" style="margin:var(--space-2) 0 0;font-size:0.7rem;color:var(--text3);line-height:1.4;">Daily/monthly M2M uses ${m2mSource} (${histDays} day${histDays === 1 ? '' : 's'} logged). Open app after refresh to build history. Realised = closed PSX + US/crypto sells. Forecast uses Settings assumptions.</p>
    </div>

    ${_tab === 'daily' ? `<div class="perf-section cap-reveal">
      <div class="perf-chart" id="daily-chart"></div>
      <div class="perf-stats">
        <div class="perf-stat">
          <div class="perf-stat-label">Realised (total)</div>
          <div class="perf-stat-value ${totalRealised >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(totalRealised)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Best Day</div>
          <div class="perf-stat-value t-gain">${PlatformUI.fmt(dailyData.best || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Worst Day</div>
          <div class="perf-stat-value t-loss">${PlatformUI.fmt(dailyData.worst || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Avg Daily</div>
          <div class="perf-stat-value">${PlatformUI.fmt(dailyData.avg || 0)}</div>
        </div>
      </div>
      <div class="perf-list">
        ${(dailyData.days || []).slice(0, 30).map(d => `
          <div class="perf-item">
            <div class="perf-item-date">${d.date}${d.realised ? `<div style="font-size:0.62rem;color:var(--text3);">Realised ${d.realised >= 0 ? '+' : ''}${PlatformUI.fmt(d.realised)}</div>` : ''}</div>
            <div class="perf-item-value ${d.pnl >= 0 ? 't-gain' : 't-loss'}">${d.pnl >= 0 ? '+' : ''}${PlatformUI.fmt(d.pnl)}</div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}

    ${_tab === 'monthly' ? `<div class="perf-section cap-reveal">
      <div class="perf-chart" id="monthly-chart"></div>
      <div class="perf-stats">
        <div class="perf-stat">
          <div class="perf-stat-label">Realised (total)</div>
          <div class="perf-stat-value ${totalRealised >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(totalRealised)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Best Month</div>
          <div class="perf-stat-value t-gain">${PlatformUI.fmt(monthlyData.best || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Worst Month</div>
          <div class="perf-stat-value t-loss">${PlatformUI.fmt(monthlyData.worst || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Avg Monthly</div>
          <div class="perf-stat-value">${PlatformUI.fmt(monthlyData.avg || 0)}</div>
        </div>
      </div>
      <div class="perf-list">
        ${(monthlyData.months || []).map(m => `
          <div class="perf-item">
            <div class="perf-item-date">${m.month}${m.realised ? `<div style="font-size:0.62rem;color:var(--text3);">Realised ${m.realised >= 0 ? '+' : ''}${PlatformUI.fmt(m.realised)}</div>` : ''}</div>
            <div class="perf-item-value ${m.pnl >= 0 ? 't-gain' : 't-loss'}">${m.pnl >= 0 ? '+' : ''}${PlatformUI.fmt(m.pnl)}</div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}

    ${_tab === 'realised' ? `<div class="perf-section cap-reveal">
      <div class="perf-stats">
        <div class="perf-stat">
          <div class="perf-stat-label">Total realised</div>
          <div class="perf-stat-value ${totalRealised >= 0 ? 't-gain' : 't-loss'}">${PlatformUI.fmt(totalRealised)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Closed trades</div>
          <div class="perf-stat-value">${realisedRows.length}</div>
        </div>
      </div>
      <div class="perf-list">
        ${realisedRows.length ? realisedRows.map(r => `
          <div class="perf-item">
            <div class="perf-item-date">${new Date((r.date || '') + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · ${r.symbol} · ${r.qty} ${r.unit}${r.currency === 'USD' ? ` @ $${Number(r.exitPrice || 0).toFixed(2)}` : ''}</div>
            <div class="perf-item-value ${r.pnl >= 0 ? 't-gain' : 't-loss'}">${r.pnl >= 0 ? '+' : ''}${PlatformUI.fmt(r.pnl)}</div>
          </div>`).join('') : '<p class="lc-empty-note">No closed sells logged yet.</p>'}
      </div>
    </div>` : ''}

    ${_tab === 'history' ? `<div class="perf-section cap-reveal">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
        ${(typeof HistorySeriesService !== 'undefined' ? HistorySeriesService.ranges() : [{ id: '1m', label: '1M', days: 30 }, { id: '1y', label: '1Y', days: 365 }]).map((r) =>
          `<button type="button" class="lc-view-pill${_histRange === r.days ? ' active' : ''}" data-action="Performance.setHistRange" data-tab="${r.days}">${r.label}</button>`
        ).join('')}
      </div>
      <div class="perf-chart" id="history-chart"></div>
      <p class="perf-disclaimer" style="margin-top:8px;font-size:0.7rem;color:var(--text3)">Portfolio NAV from daily snapshots + per-symbol price series on refresh.</p>
    </div>` : ''}

    ${_tab === 'predictive' ? `<div class="perf-section cap-reveal">
      <div class="perf-chart" id="predictive-chart"></div>
      <div class="perf-stats">
        <div class="perf-stat">
          <div class="perf-stat-label">Est. 3M Profit</div>
          <div class="perf-stat-value t-gain">${PlatformUI.fmt(predictiveData.m3 || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Est. 1Y Profit</div>
          <div class="perf-stat-value t-gain">${PlatformUI.fmt(predictiveData.y1 || 0)}</div>
        </div>
        <div class="perf-stat">
          <div class="perf-stat-label">Est. 5Y Profit</div>
          <div class="perf-stat-value t-gain">${PlatformUI.fmt(predictiveData.y5 || 0)}</div>
        </div>
      </div>
      <div class="perf-prediction">
        <div class="perf-pred-item">
          <div class="perf-pred-label">Based on</div>
          <div class="perf-pred-value">18% annual return + dividend yield</div>
        </div>
        <div class="perf-pred-item">
          <div class="perf-pred-label">Current Portfolio</div>
          <div class="perf-pred-value">${PlatformUI.fmt(predictiveData.currentValue || 0)}</div>
        </div>
      </div>
    </div>` : ''}

    </div>`;

    _renderCharts(dailyData, monthlyData, predictiveData);
    CapMotion.refresh();
  }

  function _calcDailyPnL(state) {
    const series = Ledger.dailyPnlSeries(state.transactions, state.priceHistory, _priceFn);
    const days = series.slice().reverse().map(d => ({
      date: new Date(d.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      pnl: d.pnl,
      realised: d.realised,
      markToMarket: d.markToMarket,
    }));
    const values = series.map(d => d.pnl);
    return {
      days,
      best: values.length ? Math.max(...values) : 0,
      worst: values.length ? Math.min(...values) : 0,
      avg: values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0,
    };
  }

  function _calcMonthlyPnL(state) {
    const series = Ledger.monthlyPnlSeries(state.transactions, state.priceHistory, _priceFn);
    const months = series.map(m => ({
      month: m.month,
      pnl: m.pnl,
      realised: m.realised,
      markToMarket: m.markToMarket,
    }));
    const values = months.map(m => m.pnl);
    return {
      months,
      best: values.length ? Math.max(...values) : 0,
      worst: values.length ? Math.min(...values) : 0,
      avg: values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0,
    };
  }

  function _calcPredictivePnL(state) {
    const current = State.calcTotalValue();
    const annualReturn = 0.18;
    const divYield = (PortfolioAnalyticsService?.getSummary(state)?.portfolioDivYield || 0) / 100;
    const totalYield = annualReturn + divYield;
    return {
      currentValue: current,
      m3: current * (totalYield * 0.25),
      y1: current * totalYield,
      y5: current * (Math.pow(1 + totalYield, 5) - 1)
    };
  }

  function _renderCharts(daily, monthly, predictive) {
    if (_tab === 'daily' && document.getElementById('daily-chart')) {
      const values = (daily.days || []).slice().reverse().map(d => d.pnl);
      document.getElementById('daily-chart').innerHTML = Charts.barChart ? Charts.barChart(values.slice(-30), { height: 160, ariaLabel: 'Daily returns' }) : '';
    }
    if (_tab === 'monthly' && document.getElementById('monthly-chart')) {
      const values = (monthly.months || []).map(m => m.pnl);
      document.getElementById('monthly-chart').innerHTML = Charts.barChart ? Charts.barChart(values, { height: 160, ariaLabel: 'Monthly returns' }) : '';
    }
    if (_tab === 'predictive' && document.getElementById('predictive-chart')) {
      const projections = [predictive.currentValue, predictive.currentValue * 1.18, predictive.currentValue * Math.pow(1.18, 2), predictive.currentValue * Math.pow(1.18, 5)];
      document.getElementById('predictive-chart').innerHTML = Charts.lineChart ? Charts.lineChart(projections, { height: 160, color: '#10b981' }) : '';
    }
    if (_tab === 'history' && document.getElementById('history-chart') && typeof HistorySeriesService !== 'undefined') {
      const series = HistorySeriesService.getPortfolioSeries(_histRange || 0);
      document.getElementById('history-chart').innerHTML = series.length >= 2 && Charts.lineChart
        ? Charts.lineChart(series, { height: 180, fill: true, ariaLabel: 'Portfolio NAV history' })
        : '<p class="lc-empty-note">Open app after price refresh to build series.</p>';
    }
  }

  function setHistRange(days) {
    _histRange = parseInt(days, 10) || 0;
    render();
  }

  function setTab(tab) {
    _tab = tab;
    render();
  }

  return { render, setTab, setHistRange };
})();
window.Performance = Performance;

;/* === js/modules/journal.js === */
'use strict';
const Journal = (() => {
  let _editing = null;

  function _form(entry) {
    const e = entry || {};
    return `
    <div class="field"><label class="field-label">Title</label>
      <input class="field-input" id="jr-title" value="${(e.title || '').replace(/"/g, '&quot;')}" placeholder="Investment thesis title"></div>
    <div class="field"><label class="field-label">Symbol (optional)</label>
      <input class="field-input" id="jr-symbol" value="${e.symbol || ''}" placeholder="MEBL"></div>
    <div class="field"><label class="field-label">Thesis</label>
      <textarea class="field-input" id="jr-body" rows="4" placeholder="Why did you make this decision?">${e.body || ''}</textarea></div>
    <div class="field"><label class="field-label">Outcome review</label>
      <textarea class="field-input" id="jr-review" rows="3" placeholder="Was the thesis correct?">${e.review || ''}</textarea></div>
    <button type="button" class="os-btn os-btn-primary" style="width:100%;margin-top:8px;" data-action="Journal.save">Save entry</button>`;
  }

  function openNew() {
    _editing = null;
    App.openBottomSheet('journal-new', 'New Journal Entry', _form());
  }

  function openEdit(id) {
    const entry = (State.get('journal') || []).find(j => j.id === id);
    if (!entry) return;
    _editing = id;
    App.openBottomSheet('journal-edit', 'Edit Entry', _form(entry));
  }

  function save() {
    const title = document.getElementById('jr-title')?.value?.trim();
    const symbol = document.getElementById('jr-symbol')?.value?.trim().toUpperCase();
    const body = document.getElementById('jr-body')?.value?.trim();
    const review = document.getElementById('jr-review')?.value?.trim();
    if (!title && !body) { App.showToast('Add a title or thesis', 'warning'); return; }
    State.update(s => {
      if (_editing) {
        const idx = s.journal.findIndex(j => j.id === _editing);
        if (idx >= 0) s.journal[idx] = { ...s.journal[idx], title, symbol, body, review, updatedAt: Date.now() };
      } else {
        s.journal.push({ id: Ledger.newId(), title, symbol, body, review, createdAt: Date.now(), date: new Date().toISOString().slice(0, 10) });
      }
    });
    App.closeBottomSheet();
    App.showToast('Journal saved', 'success');
    render();
  }

  function remove(id) {
    if (!confirm('Delete this journal entry?')) return;
    State.update(s => { s.journal = s.journal.filter(j => j.id !== id); });
    render();
  }

  function render() {
    const screen = document.getElementById('screen-journal');
    if (!screen) return;
    const entries = [...(State.get('journal') || [])].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Journal</h1><p>Investment thesis · record decisions</p></div>
    <div class="lc-dash-actions cap-reveal">
      <button type="button" class="lc-btn-primary" data-action="Journal.openNew">+ New entry</button>
    </div>
    ${entries.length ? entries.map(e => `
      <div class="os-card cap-reveal" role="button" tabindex="0" aria-label="Edit journal entry" style="margin:0 20px 12px;cursor:pointer;" data-action="Journal.openEdit" data-tab="${e.id}">
        <div style="display:flex;justify-content:space-between;align-items:start;">
          <div>
            <div style="font-weight:700;font-size:1rem;">${e.title || 'Untitled'}</div>
            <div style="font-size:0.72rem;color:var(--os-text-tertiary);margin-top:4px;">${e.date || ''}${e.symbol ? ' · ' + e.symbol : ''}</div>
          </div>
          <button type="button" class="os-btn os-btn-ghost" style="padding:4px 8px;font-size:0.7rem;" data-action="Journal.remove" data-tab="${e.id}" data-stop="1">Delete</button>
        </div>
        ${e.body ? `<p style="font-size:0.85rem;color:var(--os-text-secondary);margin:10px 0 0;line-height:1.5;">${e.body.slice(0, 160)}${e.body.length > 160 ? '…' : ''}</p>` : ''}
        ${e.review ? `<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--os-border);font-size:0.8rem;color:var(--os-gain);">Review: ${e.review.slice(0, 100)}${e.review.length > 100 ? '…' : ''}</div>` : ''}
      </div>`).join('') : `<div class="lc-empty-note">No journal entries yet. Document your investment thesis before you buy.</div>`}
    </div>`;
    CapMotion.refresh();
  }

  return { render, openNew, openEdit, save, remove };
})();
window.Journal = Journal;

;/* === js/modules/pilot-tools.js === */
'use strict';
const PilotTools = (() => {
  const U = PlatformUI;
  let _tab = 'rebalance';

  function render(target, tab) {
    if (tab) _tab = tab;
    const screen = target || document.getElementById('screen-pilot-tools');
    if (!screen) return;

    const tabs = [
      ['rebalance', 'Rebalance'], ['cgt', 'CGT'], ['screener', 'Screener'],
      ['calculators', 'Calc'], ['ipo', 'IPO'], ['cash', 'Cash'],
    ];

    screen.innerHTML = `
    ${MarketUI.pageHeader('Pilot tools', 'Rebalance & tax', 'CGT · screener · IPO · cash plan')}
    <div class="lc-filter-bar cap-reveal" style="border-top:none">
      ${tabs.map(([id, label]) => `<button type="button" class="lc-view-pill ${_tab === id ? 'active' : ''}" data-action="PilotTools.render" data-tab="${id}">${label}</button>`).join('')}
    </div>
    <div id="pilot-tools-body"></div>
    <div style="height:24px"></div>`;

    const body = document.getElementById('pilot-tools-body');
    if (!body) return;
    const panels = {
      rebalance: _rebalance,
      cgt: _cgt,
      screener: _screener,
      calculators: _calculators,
      ipo: _ipo,
      cash: _cash,
    };
    body.innerHTML = (panels[_tab] || _rebalance)();
    CapMotion.refresh();
  }

  function _rebalance() {
    const plan = PilotEngine.buildRebalancePlan();
    return U.section('Target weight drift', plan.summary) +
      _targetWeightEditor() +
      (plan.rows.length ? plan.rows.map(r => `
        <div class="os-row cap-reveal">
          <div><div class="os-row-sym">${r.symbol}</div>
          <div style="font-size:11px;color:var(--os-text-tertiary)">${r.actual_pct.toFixed(1)}% actual${r.target_pct != null ? ' · target ' + r.target_pct.toFixed(1) + '%' : ''}</div></div>
          <div style="text-align:right"><span class="badge">${r.action}</span>
          ${r.suggested_pkr ? `<div style="font-size:11px;margin-top:4px">~${U.fmt(r.suggested_pkr)}</div>` : ''}</div>
        </div>`).join('') : '<div style="padding:12px;color:var(--os-text-secondary)">Set target % below to enable drift alerts.</div>');
  }

  function _targetWeightEditor() {
    const rows = PortfolioAnalyticsService.getHoldings().filter(h => h.kind === 'stock').slice(0, 24);
    if (!rows.length) return '';
    return U.section('Target weights &amp; CGT dates', `
      <p style="font-size:12px;color:var(--os-text-secondary);margin:0 0 10px;line-height:1.45">Set target % for rebalance ADD/TRIM. Acquisition date improves CGT tier estimates.</p>
      ${rows.map(h => {
        const meta = PilotEngine.holdingMeta(h.symbol, h.broker);
        const tw = meta.targetWeight != null ? meta.targetWeight : '';
        const acq = meta.acquiredAt || '';
        const broker = (h.broker || 'default').replace(/'/g, '');
        return `<div class="os-row cap-reveal" style="flex-wrap:wrap;gap:8px">
          <div class="os-row-sym" style="min-width:64px">${h.symbol}</div>
          <label style="font-size:11px;color:var(--os-text-tertiary)">Target %
            <input type="number" class="field-input" style="width:72px;margin-left:4px;padding:6px 8px" min="0" max="100" step="0.5" value="${tw}" placeholder="—"
              data-action-change="PilotTools.setTarget" data-symbol="${h.symbol}" data-broker="${broker}">
          </label>
          <label style="font-size:11px;color:var(--os-text-tertiary)">Bought
            <input type="date" class="field-input" style="width:130px;margin-left:4px;padding:6px 8px" value="${acq}"
              data-action-change="PilotTools.setAcquired" data-symbol="${h.symbol}" data-broker="${broker}">
          </label>
        </div>`;
      }).join('')}
    `);
  }

  function setTarget(symbol, broker, pct) {
    const v = parseFloat(pct);
    PilotEngine.setHoldingMeta(symbol, broker, { targetWeight: Number.isFinite(v) && v > 0 ? v : null });
    if (window.App?.showToast) App.showToast(`${symbol} target ${v > 0 ? v + '%' : 'cleared'}`, 'ok');
    render(null, 'rebalance');
  }

  function setAcquired(symbol, broker, date) {
    PilotEngine.setHoldingMeta(symbol, broker, { acquiredAt: date || null });
    if (window.App?.showToast) App.showToast(`${symbol} buy date saved`, 'ok');
    render(null, 'rebalance');
  }

  function _cgt() {
    const r = PilotEngine.buildCgtReport();
    return U.section('Capital gains (estimate)', r.disclaimer) +
      `<div style="padding:0 16px 12px;display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" class="btn-sm btn-secondary" data-action="StatementExport.exportCgtPdf">Export CGT PDF</button>
      </div>` +
      U.metricGrid([
        U.metricCell('Unrealized gain', U.fmt(r.total_unrealized_gain)),
        U.metricCell('Est. tax', U.fmt(r.total_estimated_tax)),
        U.metricCell('Short-term lots', String(r.short_term_count)),
        U.metricCell('Missing dates', String(r.lots_missing_date), null, r.lots_missing_date ? 't-loss' : ''),
      ], 2) +
      (r.lots.filter(l => l.pl > 0).map(l => `
        <div class="os-row cap-reveal">
          <div class="os-row-sym">${l.symbol}</div>
          <div style="font-size:12px;text-align:right">
            <div class="${l.pl >= 0 ? 't-gain' : 't-loss'}">${U.fmt(l.pl)}</div>
            <div style="color:var(--os-text-tertiary)">${l.tier}${l.estimated_tax ? ' · tax ' + U.fmt(l.estimated_tax) : ''}</div>
          </div>
        </div>`).join('') || '<div style="padding:12px;color:var(--os-text-secondary)">No taxable unrealized gains.</div>');
  }

  function _screener() {
    return U.section('PSX screener', 'Filter seed fundamentals database') + `
      <div style="padding:0 16px 12px;display:flex;flex-wrap:wrap;gap:8px">
        <button type="button" class="btn-sm btn-secondary" data-action="PilotTools.runScreen" data-payload='{min_yield:6}'>High yield 6%+</button>
        <button type="button" class="btn-sm btn-secondary" data-action="PilotTools.runScreen" data-payload='{max_pe:10}'>Value P/E &lt;10</button>
        <button type="button" class="btn-sm btn-secondary" data-action="PilotTools.runScreen" data-payload='{max_rsi:35}'>RSI oversold</button>
        <button type="button" class="btn-sm btn-secondary" data-action="PilotTools.runScreen" data-payload='{portfolio_only:true}'>My holdings</button>
      </div>
      <div id="screener-results"></div>`;
  }

  function runScreen(filters) {
    const res = PilotEngine.runScreener(filters);
    const el = document.getElementById('screener-results');
    if (!el) return;
    el.innerHTML = U.section(`Results (${res.rows.length} / ${res.scanned})`, res.rows.slice(0, 15).map(r => `
      <div class="os-row cap-reveal" data-action="Research.open" data-symbol="${r.symbol}" style="cursor:pointer">
        <div class="os-row-sym">${r.symbol}${r.in_portfolio ? ' ★' : ''}</div>
        <div style="font-size:12px;text-align:right;color:var(--os-text-secondary)">
          P/E ${r.pe_ratio ?? '—'} · Yld ${r.dividend_yield_pct ?? '—'}% · RSI ${r.rsi_14?.toFixed(0) ?? '—'}
        </div>
      </div>`).join('') || 'No matches.');
    CapMotion.refresh();
  }

  function _calculators() {
    return U.section('Calculators', '') + `
      <div style="padding:0 16px;display:flex;flex-direction:column;gap:12px">
        <button type="button" class="btn-secondary" data-action="PilotTools.calc" data-tab="cagr">CAGR — principal → final value</button>
        <button type="button" class="btn-secondary" data-action="PilotTools.calc" data-tab="position_size">Position size — risk & stop %</button>
        <button type="button" class="btn-secondary" data-action="PilotTools.calc" data-tab="sip_future">SIP future value</button>
        <div id="calc-result" style="font-size:13px;color:var(--os-text-secondary)"></div>
      </div>`;
  }

  function calc(kind) {
    const prompts = {
      cagr: [['Principal ₨', 'principal', 100000], ['Final value ₨', 'final_value', 250000], ['Years', 'years', 5]],
      position_size: [['Risk ₨', 'risk_pkr', 10000], ['Stop loss %', 'stop_loss_pct', 5], ['Price ₨', 'price', 500]],
      sip_future: [['Monthly ₨', 'monthly', 50000], ['Rate %', 'rate_pct', 14], ['Years', 'years', 10]],
    };
    const fields = prompts[kind] || [];
    const input = {};
    for (const [label, key, def] of fields) {
      const v = prompt(label, String(def));
      if (v === null) return;
      input[key] = parseFloat(v) || 0;
    }
    const r = PilotEngine.calculator(kind, input);
    const el = document.getElementById('calc-result');
    if (el) el.innerHTML = `<strong>${r.label}:</strong> ${typeof r.result === 'number' ? r.result.toLocaleString(undefined, { maximumFractionDigits: 2 }) : r.result}<br>${r.detail}`;
  }

  function _ipo() {
    const events = State.get('ipoEvents') || [];
    return U.section('IPO calendar', 'Manual entries — subscription & listing reminders') + `
      <div style="padding:0 16px 12px">
        <button type="button" class="btn-primary btn-sm" data-action="PilotTools.addIpo">+ Add IPO</button>
      </div>` +
      (events.length ? events.map(e => `
        <div class="os-row cap-reveal">
          <div><div class="os-row-sym">${e.company}</div>
          <div style="font-size:11px;color:var(--os-text-tertiary)">${e.symbol || '—'} · ${e.subscription_end || e.listing_date || 'TBD'}</div></div>
          <button type="button" class="btn-ghost btn-sm" aria-label="Delete IPO entry" data-action="PilotTools.delIpo" data-tab="${e.id}">✕</button>
        </div>`).join('') : '<div style="padding:12px 16px;color:var(--os-text-secondary)">No IPO events — add PSX primary offerings you are tracking.</div>');
  }

  function addIpo() {
    const company = prompt('Company name');
    if (!company) return;
    const symbol = prompt('Symbol (optional)') || '';
    const end = prompt('Subscription end (YYYY-MM-DD)', '') || '';
    State.update(s => {
      if (!s.ipoEvents) s.ipoEvents = [];
      s.ipoEvents.push({ id: 'ipo_' + Date.now(), company, symbol: symbol.toUpperCase(), subscription_end: end || null, listing_date: null, notes: '' });
    });
    if (window.App?.showToast) App.showToast('IPO added', 'ok');
    render(null, 'ipo');
  }

  function delIpo(id) {
    State.update(s => { s.ipoEvents = (s.ipoEvents || []).filter(e => e.id !== id); });
    render(null, 'ipo');
  }

  function _cash() {
    const cfg = PilotEngine.settings();
    const entries = State.get('cashLedger') || [];
  const net = entries.reduce((a, e) => a + (e.entry_type === 'withdraw' ? -e.amount : e.amount), 0);
    return U.section('Cash ledger', `Settings cash: ${U.fmt(cfg.cashBalancePkr)} · Ledger net: ${U.fmt(net)}`) +
      `<div style="padding:0 16px 12px"><button type="button" class="btn-sm btn-secondary" data-action="PilotTools.addCash" data-tab="deposit">+ Deposit</button>
      <button type="button" class="btn-sm btn-ghost" data-action="PilotTools.addCash" data-tab="withdraw">− Withdraw</button></div>` +
      (entries.slice(-10).reverse().map(e => `
        <div class="os-row"><div>${e.entry_type}</div><div>${U.fmt(e.amount)}</div></div>`).join('') || '<div style="padding:12px 16px;color:var(--os-text-secondary)">No cash movements logged.</div>');
  }

  function addCash(type) {
    const amount = parseFloat(prompt(type === 'deposit' ? 'Deposit amount ₨' : 'Withdraw amount ₨', '0'));
    if (!amount || amount <= 0) return;
    State.update(s => {
      if (!s.cashLedger) s.cashLedger = [];
      s.cashLedger.push({ id: 'c_' + Date.now(), entry_type: type, amount, entry_at: new Date().toISOString().slice(0, 10), notes: '' });
    });
    render(null, 'cash');
  }

  return { render, runScreen, calc, addIpo, delIpo, addCash, setTarget, setAcquired };
})();
window.PilotTools = PilotTools;

;/* === js/modules/paper-trade.js === */
'use strict';
/** Simulated PSX ledger — isolated from real transactions. */
const PaperTrade = (() => {
  const U = PlatformUI;
  let _tab = 'portfolio';

  function _ledger() {
    const s = State.get();
    if (!s.paperLedger) s.paperLedger = { cashPkr: 500000, transactions: [] };
    return s.paperLedger;
  }

  function _holdings() {
    const ledger = _ledger();
    const txs = ledger.transactions || [];
    const bySym = {};
    txs.forEach((t) => {
      const sym = (t.symbol || '').toUpperCase();
      if (!sym) return;
      if (!bySym[sym]) bySym[sym] = { symbol: sym, shares: 0, cost: 0 };
      const q = t.shares || 0;
      if (t.type === 'BUY') {
        bySym[sym].cost += t.amount || q * (t.price || 0);
        bySym[sym].shares += q;
      } else if (t.type === 'SELL') {
        const avg = bySym[sym].shares > 0 ? bySym[sym].cost / bySym[sym].shares : 0;
        bySym[sym].shares -= q;
        bySym[sym].cost -= avg * q;
        if (bySym[sym].shares <= 0) delete bySym[sym];
      }
    });
    return Object.values(bySym).map((h) => {
      const price = State.getPrice(h.symbol) || (window.FALLBACK_PRICES || {})[h.symbol] || 0;
      const value = h.shares * price;
      const avg = h.shares > 0 ? h.cost / h.shares : 0;
      const pnl = value - h.cost;
      return { ...h, price, value, avgCost: avg, pnl, pnlPct: h.cost > 0 ? (pnl / h.cost) * 100 : 0 };
    }).sort((a, b) => b.value - a.value);
  }

  function setTab(id) { _tab = id; render(); }

  function _save(fn) {
    State.update((s) => {
      if (!s.paperLedger) s.paperLedger = { cashPkr: 500000, transactions: [] };
      fn(s.paperLedger);
    });
    render();
  }

  function openBuy(symbol) {
    symbol = (symbol || '').toUpperCase();
    const price = State.getPrice(symbol) || (window.FALLBACK_PRICES || {})[symbol] || 0;
    const content = `
      <div class="field"><label class="field-label">Symbol</label>
        <input class="field-input" id="pt-symbol" value="${symbol}" placeholder="ENGROH"></div>
      <div class="field"><label class="field-label">Shares</label>
        <input class="field-input" id="pt-shares" type="number" min="1" step="1" value="100"></div>
      <div class="field"><label class="field-label">Price ₨</label>
        <input class="field-input" id="pt-price" type="number" min="0" step="0.01" value="${price || ''}"></div>
      <button type="button" class="btn-primary" data-action="PaperTrade._submitBuy">Paper buy</button>`;
    App.openBottomSheet('paper-buy', `Paper buy ${symbol || ''}`, content);
  }

  function _submitBuy() {
    const sym = document.getElementById('pt-symbol')?.value?.trim().toUpperCase();
    const shares = parseFloat(document.getElementById('pt-shares')?.value);
    const price = parseFloat(document.getElementById('pt-price')?.value);
    if (!sym || !(shares > 0) || !(price > 0)) {
      App.showToast('Enter symbol, shares, price', 'error');
      return;
    }
    const amount = shares * price;
    const ledger = _ledger();
    if (amount > (ledger.cashPkr || 0)) {
      App.showToast('Insufficient paper cash', 'error');
      return;
    }
    _save((pl) => {
      pl.cashPkr = (pl.cashPkr || 0) - amount;
      pl.transactions.push({
        id: Ledger.newId(),
        type: 'BUY',
        symbol: sym,
        shares,
        price,
        amount,
        date: new Date().toISOString().slice(0, 10),
      });
    });
    App.closeBottomSheet();
    App.showToast(`Paper bought ${shares} ${sym}`, 'success');
  }

  function openSell(h) {
    const content = `
      <div class="field"><label class="field-label">Shares (max ${h.shares})</label>
        <input class="field-input" id="pt-sell-shares" type="number" min="1" max="${h.shares}" value="${h.shares}"></div>
      <div class="field"><label class="field-label">Price ₨</label>
        <input class="field-input" id="pt-sell-price" type="number" value="${h.price || ''}"></div>
      <button type="button" class="btn-primary" data-action="PaperTrade._submitSell" data-symbol="${h.symbol}">Paper sell</button>`;
    window._paperSell = h;
    App.openBottomSheet('paper-sell', `Paper sell ${h.symbol}`, content);
  }

  function _submitSell(el) {
    const h = window._paperSell;
    if (!h) return;
    const shares = parseFloat(document.getElementById('pt-sell-shares')?.value);
    const price = parseFloat(document.getElementById('pt-sell-price')?.value);
    if (!(shares > 0) || shares > h.shares || !(price > 0)) {
      App.showToast('Invalid sell', 'error');
      return;
    }
    const amount = shares * price;
    _save((pl) => {
      pl.cashPkr = (pl.cashPkr || 0) + amount;
      pl.transactions.push({
        id: Ledger.newId(),
        type: 'SELL',
        symbol: h.symbol,
        shares,
        price,
        amount,
        date: new Date().toISOString().slice(0, 10),
      });
    });
    App.closeBottomSheet();
    App.showToast(`Paper sold ${shares} ${h.symbol}`, 'success');
  }

  function resetLedger() {
    if (!confirm('Reset paper ledger? Clears all simulated trades.')) return;
    _save((pl) => {
      pl.cashPkr = 500000;
      pl.transactions = [];
    });
    App.showToast('Paper ledger reset', 'info');
  }

  function render() {
    const screen = document.getElementById('screen-paper-trade');
    if (!screen) return;
    const ledger = _ledger();
    const holdings = _holdings();
    const invested = holdings.reduce((a, h) => a + h.cost, 0);
    const mkt = holdings.reduce((a, h) => a + h.value, 0);
    const pnl = mkt - invested;

    screen.innerHTML = `<div class="lc-dash">
    ${MarketUI.pageHeader('Paper trading', 'Simulated PSX', 'Isolated from your real ledger')}
    <div class="lc-filter-bar cap-reveal">
      <button type="button" class="lc-view-pill${_tab === 'portfolio' ? ' active' : ''}" data-action="PaperTrade.setTab" data-tab="portfolio">Portfolio</button>
      <button type="button" class="lc-view-pill${_tab === 'history' ? ' active' : ''}" data-action="PaperTrade.setTab" data-tab="history">History</button>
    </div>
    ${U.metricGrid([
      U.metricCell('Paper cash', U.fmt(ledger.cashPkr || 0)),
      U.metricCell('Market value', U.fmt(mkt)),
      U.metricCell('P&L', U.fmt(pnl), null, pnl >= 0 ? 't-gain' : 't-loss'),
      U.metricCell('Positions', String(holdings.length)),
    ], 4)}
    ${_tab === 'portfolio' ? `
      <div style="padding:0 16px 12px;display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" class="btn-primary" data-action="PaperTrade.openBuy">New paper buy</button>
        <button type="button" class="btn-secondary" data-action="PaperTrade.resetLedger">Reset</button>
      </div>
      ${holdings.length ? holdings.map((h) => `
        <div class="os-row cap-reveal">
          <div><div class="os-row-sym">${h.symbol}</div>
            <div style="font-size:11px;color:var(--os-text-tertiary)">${h.shares} sh · avg ${U.fmt(h.avgCost)}</div></div>
          <div class="rt-price-col">
            <div class="${h.pnl >= 0 ? 't-gain' : 't-loss'}">${U.fmt(h.pnl)} (${h.pnlPct.toFixed(1)}%)</div>
            <button type="button" class="btn-sm btn-secondary" data-action="PaperTrade.openSellRow" data-symbol="${h.symbol}">Sell</button>
          </div>
        </div>`).join('') : MarketUI.emptyState('', 'No paper positions', 'Practice entries without touching your real ledger.', '<button type="button" class="os-btn os-btn-primary" data-action="PaperTrade.openBuy">Paper buy</button>')}
    ` : `
      <div class="perf-list" style="padding:0 16px">
        ${(ledger.transactions || []).slice().reverse().slice(0, 40).map((t) => `
          <div class="perf-item"><div>${t.date} · ${t.type} ${t.symbol}</div>
          <div>${t.shares} @ ${U.fmt(t.price)}</div></div>`).join('') || '<p class="psx-muted" style="padding:16px">No paper trades yet.</p>'}
      </div>`}
    <div style="height:24px"></div></div>`;
    CapMotion.refresh();
  }

  function openSellRow(el) {
    const sym = el?.dataset?.symbol;
    const h = _holdings().find((x) => x.symbol === sym);
    if (h) openSell(h);
  }

  return { render, setTab, openBuy, _submitBuy, openSell, openSellRow, _submitSell, resetLedger };
})();
window.PaperTrade = PaperTrade;

;/* === js/modules/onboarding.js === */
'use strict';
const Onboarding = (() => {
  let step = 1;

  function isDone() {
    try {
      if (sessionStorage.getItem('ledgercap_demo_mode') === '1') return true;
    } catch (_) {}
    const s = State.get('settings') || {};
    if (s.onboardingDone) return true;
    if ((State.get('transactions') || []).length > 0) return true;
    return false;
  }

  function _dots(n) {
    return [1, 2, 3].map(i =>
      `<span class="ob-dot${i === n ? ' on' : ''}"></span>`
    ).join('');
  }

  function mount() {
    if (isDone()) return;
    document.getElementById('onboarding')?.remove();

    const s = State.get('settings') || {};
    const el = document.createElement('div');
    el.id = 'onboarding';
    el.className = 'ob-overlay';
    el.innerHTML = `
      <div class="ob-shell">
        <div class="ob-top">
          <div class="ob-brand">Ledger<em>Cap</em></div>
          <button type="button" class="ob-skip-top" data-action="Onboarding.skip">Skip</button>
        </div>
        <div class="ob-progress">${_dots(1)}</div>
        <p class="ob-step-label">Step 1 of 3</p>

        <div class="ob-panel on" id="ob-panel-1">
          <div class="ob-hero-icon"><img src="assets/icons/icon-mark.svg" alt="" width="56" height="56"></div>
          <h1 class="ob-title">Your wealth command center</h1>
          <p class="ob-desc">Track PSX stocks, Meezan funds, SIP goals, and how much you've invested over time — all on your phone.</p>
          <ul class="ob-features">
            <li><span class="ob-feat-icon">${typeof LcIcons !== 'undefined' ? LcIcons.icon('trending', 16) : ''}</span> Live portfolio &amp; P&amp;L</li>
            <li><span class="ob-feat-icon">${typeof LcIcons !== 'undefined' ? LcIcons.icon('wallet', 16) : ''}</span> Investment tracker</li>
            <li><span class="ob-feat-icon">${typeof LcIcons !== 'undefined' ? LcIcons.icon('chart', 16) : ''}</span> SIP &amp; freedom planning</li>
          </ul>
          <button type="button" class="btn-primary ob-cta" data-action="Onboarding.next">Set up in 30 sec</button>
        </div>

        <div class="ob-panel" id="ob-panel-2">
          <p class="ob-step-label">Step 2 of 3</p>
          <h1 class="ob-title">Income &amp; goals</h1>
          <p class="ob-desc">Used for SIP progress and financial freedom math. Your ledger data stays untouched.</p>
          <div class="field">
            <label class="field-label">Monthly salary</label>
            <div class="field-prefix-wrap">
              <span class="field-prefix">₨</span>
              <input class="field-input" id="ob-salary" type="number" inputmode="numeric" value="${s.salary || 150000}">
            </div>
          </div>
          <div class="field">
            <label class="field-label">Monthly SIP target</label>
            <div class="field-prefix-wrap">
              <span class="field-prefix">₨</span>
              <input class="field-input" id="ob-sip" type="number" inputmode="numeric" value="${s.targetSIP || 75000}">
            </div>
          </div>
          <div class="field">
            <label class="field-label">Freedom income goal / month</label>
            <div class="field-prefix-wrap">
              <span class="field-prefix">₨</span>
              <input class="field-input" id="ob-freedom" type="number" inputmode="numeric" value="${s.freedomTarget || 100000}">
            </div>
          </div>
          <div class="ob-nav">
            <button type="button" class="btn-ghost" data-action="Onboarding.back">Back</button>
            <button type="button" class="btn-primary" data-action="Onboarding.next">Continue</button>
          </div>
        </div>

        <div class="ob-panel" id="ob-panel-3">
          <p class="ob-step-label">Step 3 of 3</p>
          <h1 class="ob-title">Almost done</h1>
          <p class="ob-desc">Pick your main broker. We'll pull PSX prices through your secure proxy when markets are open.</p>
          <div class="field">
            <label class="field-label">Primary broker</label>
            <select class="field-input" id="ob-broker">
              <option value="Mixed">Mixed (Rafi + AKD + Meezan)</option>
              <option value="Rafi">Rafi</option>
              <option value="AKD">AKD</option>
              <option value="Meezan">Meezan</option>
            </select>
          </div>
          <div class="ob-proxy-note">
            <span class="ob-proxy-dot"></span>
            PSX proxy ready — prices refresh on open
          </div>
          <div class="ob-nav">
            <button type="button" class="btn-ghost" data-action="Onboarding.back">Back</button>
            <button type="button" class="btn-primary" data-action="Onboarding.finish">Open dashboard</button>
          </div>
          <div class="ob-quick-paths">
            <button type="button" class="btn-ghost" data-action="App.loadDemo">Try demo portfolio</button>
            <button type="button" class="btn-ghost" data-nav="import">Import CSV</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(el);
    const sel = document.getElementById('ob-broker');
    if (sel) sel.value = s.primaryBroker || 'Mixed';
  }

  function _showPanel(n) {
    step = n;
    [1, 2, 3].forEach(i => {
      document.getElementById('ob-panel-' + i)?.classList.toggle('on', i === n);
    });
    const prog = document.querySelector('.ob-progress');
    if (prog) prog.innerHTML = _dots(n);
  }

  function next() {
    if (step === 2) {
      State.update(st => {
        st.settings.salary = parseFloat(document.getElementById('ob-salary')?.value) || 150000;
        st.settings.targetSIP = parseFloat(document.getElementById('ob-sip')?.value) || 75000;
        st.settings.freedomTarget = parseFloat(document.getElementById('ob-freedom')?.value) || 100000;
      });
    }
    if (step < 3) _showPanel(step + 1);
  }

  function back() {
    if (step > 1) _showPanel(step - 1);
  }

  function _close() {
    document.getElementById('onboarding')?.remove();
  }

  function skip() {
    State.update(st => { st.settings.onboardingDone = true; });
    _close();
    App.showToast('Setup skipped — change anytime in Settings', 'info');
  }

  function finish() {
    const broker = document.getElementById('ob-broker')?.value || 'Mixed';
    State.update(st => {
      st.settings.primaryBroker = broker;
      st.settings.onboardingDone = true;
    });
    _close();
    App.showToast('Welcome to LedgerCap', 'success');
    Navigation.go('home');
    setTimeout(() => App.refreshPrices(), 600);
  }

  return { mount, next, back, skip, finish, isDone };
})();
window.Onboarding = Onboarding;

;/* === js/modules/whats-new.js === */
'use strict';
const WhatsNew = (() => {
  const NOTES = {
    '3.46.0': [
      'Undo last transaction (10s toast)',
      'Per-holding price refresh (↻ on cards)',
      'Cloud encrypted backup push/restore',
      'Hub rebalance summary card',
      'Urdu nav clip fixes',
    ],
    '3.45.0': [
      'Portfolio: search, sort, cards/table toggle, Sell shortcut',
      'Import CSV preview before merge',
      'Hub: market status, CGT & paper trade shortcuts',
      'PIN-encrypted backup export',
      'Update banner when new version live',
    ],
  };

  function maybeShow() {
    const v = window.LEDGERCAP_VERSION?.app || '';
    if (!v || !NOTES[v]) return;
    const seen = localStorage.getItem('lc_seen_version');
    if (seen === v) return;
    localStorage.setItem('lc_seen_version', v);
    const items = NOTES[v].map((t) => `<li>${t}</li>`).join('');
    const el = document.createElement('div');
    el.id = 'lc-whats-new';
    el.className = 'lc-whats-new';
    el.innerHTML = `
      <div class="lc-whats-new-card" role="dialog" aria-modal="true" aria-label="What's new">
        <h2>What's new · v${v}</h2>
        <ul>${items}</ul>
        <button type="button" class="psx-btn psx-btn-primary" data-action="WhatsNew.dismiss">Got it</button>
      </div>`;
    document.body.appendChild(el);
  }

  function dismiss() {
    document.getElementById('lc-whats-new')?.remove();
  }

  return { maybeShow, dismiss };
})();
window.WhatsNew = WhatsNew;

;/* === js/modules/global.js === */
'use strict';
const Global = (() => {
  let _tab = 'intl';
  let _query = '';

  async function _refreshQuotes() {
    const holdings = Ledger.calcGlobalHoldings(State.get().transactions || []);
    if (!holdings.length) return;
    const results = await Prices.fetchAllGlobal(holdings);
    Object.entries(results).forEach(([sym, data]) => {
      const pkr = FxService.usdToPkr(data.priceUsd || data.price);
      State.updatePrice(sym, { ...data, price: pkr, priceUsd: data.priceUsd || data.price });
    });
    render();
  }

  function _rows() {
    const txs = State.get().transactions || [];
    const holdings = Ledger.calcGlobalHoldings(txs);
    const catalog = _tab === 'crypto' ? (window.CRYPTO_ASSETS || []) : (window.INTL_STOCKS || []);
    const q = _query.trim().toLowerCase();
    let list = catalog.map(s => {
      const h = holdings.find(x => x.symbol === s.symbol && (_tab === 'crypto' ? x.assetClass === 'crypto' : x.assetClass !== 'crypto'));
      const usd = h && State.getPrice(s.symbol) ? FxService.pkrToUsd(State.getPrice(s.symbol)) : (window.GLOBAL_FALLBACK_USD || {})[s.symbol];
      return { ...s, usd: usd || 0, pkr: FxService.usdToPkr(usd || 0), qty: h?.qty || 0, held: !!h };
    });
    if (q) list = list.filter(r => r.symbol.toLowerCase().includes(q) || (r.name || '').toLowerCase().includes(q));
    return { list, holdings, count: catalog.length };
  }

  function _listHtml(list) {
    const shown = list.slice(0, 80);
    return `
      ${shown.map(r => `<button type="button" class="lc-market-row" data-action="Research.open" data-symbol="${r.symbol}">
        <div><div class="lc-market-sym">${r.symbol}</div><div class="lc-market-name">${r.name}${r.held ? ' · ' + r.qty + ' held' : ''}</div></div>
        <div class="lc-market-price">$${Number(r.usd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${typeof Prices !== 'undefined' && Prices.priceBadge ? Prices.priceBadge(r.symbol) : ''}</div>
        <div class="lc-market-meta">${PsxUI.fmt(r.pkr)}</div>
      </button>`).join('')}
      ${list.length > 80 ? `<p class="lc-search-empty">Showing 80 of ${list.length} — keep typing to narrow</p>` : ''}
      ${!list.length ? `<p class="lc-search-empty">No matches for “${_query.replace(/"/g, '&quot;')}”</p>` : ''}`;
  }

  function _paintList() {
    const listEl = document.getElementById('global-list');
    const showingEl = document.getElementById('global-showing');
    if (!listEl) { render(); return; }
    const { list } = _rows();
    listEl.innerHTML = _listHtml(list);
    if (showingEl) showingEl.textContent = String(Math.min(80, list.length)) + (list.length > 80 ? '+' : '');
  }

  function render() {
    const screen = document.getElementById('screen-global');
    if (!screen) return;
    const usdRate = FxService.getUsdRate();
    const fxMeta = FxService.getMeta ? FxService.getMeta() : {};
    const state = State.get();
    const usaStats = typeof PortfolioBuckets !== 'undefined' ? PortfolioBuckets.statsForBucket(state, 'usa') : null;
    const globalHoldings = Ledger.calcGlobalHoldings ? Ledger.calcGlobalHoldings(state.transactions || []) : [];
    const ttwo = globalHoldings.find(h => h.symbol === 'TTWO');
    const { list, holdings, count } = _rows();
    const heldCount = holdings.filter(h => _tab === 'crypto' ? h.assetClass === 'crypto' : h.assetClass !== 'crypto').length;

    screen.innerHTML = PsxUI.lcDash('Global markets', `USD/PKR ₨${usdRate.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${fxMeta.source ? ' · ' + fxMeta.source : ''} · ${count} US symbols + crypto`, `
      ${PsxUI.segment([
        { id: 'intl', label: 'US equities' },
        { id: 'crypto', label: 'Crypto' },
      ], _tab, 'Global', 'setTab')}
      <div class="lc-search-wrap">
        <input type="search" id="global-search" placeholder="Search ${_tab === 'crypto' ? 'crypto' : 'US ticker'}…" value="${_query.replace(/"/g, '&quot;')}" autocomplete="off" aria-label="Search global symbols">
        <p class="lc-search-hint">Type to shortlist — list updates without leaving the field</p>
      </div>
      <div class="lc-pulse-row">
        ${usaStats?.deployedUsd ? `<div class="lc-pulse-pill"><label>IBKR invested</label><b>${FxService.fmtUsdPkr(usaStats.deployedUsd)}</b></div>` : ''}
        ${ttwo ? `<div class="lc-pulse-pill"><label>TTWO cost</label><b>${FxService.fmtUsdPkr(ttwo.totalCostUsd || ttwo.qty * (ttwo.avgCostUsd || 0))}</b></div>` : ''}
        <div class="lc-pulse-pill"><label>Your positions</label><b>${heldCount}</b></div>
        <div class="lc-pulse-pill"><label>Catalog</label><b>${count}</b></div>
        <div class="lc-pulse-pill"><label>Showing</label><b id="global-showing">${Math.min(80, list.length)}${list.length > 80 ? '+' : ''}</b></div>
      </div>
      <div class="lc-sector-card" id="global-list">${_listHtml(list)}</div>
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-primary" data-action="Global._refreshQuotes">Refresh FX &amp; quotes</button>
        <button type="button" class="psx-btn psx-btn-ghost" data-action="App.openAddTransaction" data-tab="INTL_BUY">Add US stock</button>
        <button type="button" class="psx-btn psx-btn-ghost" data-action="App.openAddTransaction" data-tab="CRYPTO_BUY">Add crypto</button>
      </div>
    `);

    const inp = document.getElementById('global-search');
    if (inp && !inp.dataset.bound) {
      inp.dataset.bound = '1';
      const onInput = typeof LcDebounce !== 'undefined'
        ? LcDebounce.debounce(e => { _query = e.target.value; _paintList(); }, 120)
        : e => { _query = e.target.value; _paintList(); };
      inp.addEventListener('input', onInput);
    }
  }

  function setTab(t) { _tab = t; _query = ''; render(); }
  function _onSearch(q) { _query = q; _paintList(); }
  return { render, setTab, _onSearch, _refreshQuotes };
})();
window.Global = Global;

;/* === js/modules/commodities.js === */
'use strict';
const Commodities = (() => {
  let _rows = [];
  let _loading = false;

  function _rowHtml(r) {
    const chgCls = (r.id === 'pkr_gold' && !r.manual) ? PsxUI.chgCls(r.changePct || 0) : (r.manual ? '' : PsxUI.chgCls(r.changePct || 0));
    const sign = (r.changePct || 0) > 0 ? '+' : '';
    const priceLabel = r.manual && r.id !== 'pkr_gold'
      ? PsxUI.fmt(r.price) + '/g'
      : r.id === 'pkr_gold'
        ? PsxUI.fmt(r.price) + '/g'
        : `$${Number(r.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const chgLabel = r.id === 'pkr_gold'
      ? (r.label || 'Auto')
      : r.manual ? 'Manual' : sign + Number(r.changePct || 0).toFixed(2) + '%';
    return `<button type="button" class="lc-market-row" ${r.id === 'pkr_gold' ? 'data-nav="settings"' : ''}>
      <div><div class="lc-market-sym">${r.symbol}</div><div class="lc-market-name">${r.name}</div></div>
      <div class="lc-market-price">${priceLabel}</div>
      <div class="lc-market-meta ${chgCls}">${chgLabel}</div>
    </button>`;
  }

  async function refresh() {
    if (_loading) return;
    _loading = true;
    const list = document.getElementById('commodities-list');
    if (list) list.innerHTML = '<p class="psx-muted">Refreshing spot prices…</p>';
    _rows = await CommoditiesService.fetchAll();
    _loading = false;
    render();
  }

  function render() {
    const screen = document.getElementById('screen-commodities');
    if (!screen) return;
    const usd = FxService.getUsdRate();
    const listInner = _rows.length
      ? _rows.map(_rowHtml).join('')
      : '<p class="psx-muted">Loading commodities…</p>';

    screen.innerHTML = PsxUI.lcDash('Commodities', `Gold · silver · oil · USD/PKR ₨${usd.toLocaleString('en-PK', { maximumFractionDigits: 2 })}`, `
      <div class="lc-pulse-row">
        <div class="lc-pulse-pill"><label>USD/PKR</label><b>₨${usd.toLocaleString('en-PK', { maximumFractionDigits: 2 })}</b></div>
        <div class="lc-pulse-pill"><label>PKR gold</label><b>${PsxUI.fmt((State.get('settings') || {}).goldPricePerGram || 18000)}/g</b></div>
      </div>
      <p class="lc-card-sub">Spot via worker snapshot (Yahoo futures + derived PKR karats + OGRA). Indicative — not jeweller or pump board prices.</p>
      <div class="lc-sector-card" id="commodities-list">${listInner}</div>
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-primary" data-action="Commodities.refresh">Refresh</button>
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="zakat">Zakat calculator →</button>
      </div>
      <div class="lc-disclaimer">Illustrative spot prices — not a trading feed. Verify before zakat or hedging decisions.</div>
    `);

    if (!_rows.length && !_loading) refresh();
    CapMotion.refresh();
  }

  return { render, refresh };
})();
window.Commodities = Commodities;

;/* === js/modules/announcements.js === */
'use strict';
const Announcements = (() => {
  let _news = [];
  let _tab = 'all';

  function _heldSymbols() {
    const txs = State.get().transactions || [];
    return [...new Set(txs.map(t => (t.symbol || '').toUpperCase()).filter(Boolean))];
  }

  function _corpItems(symbols) {
    const items = [];
    const symSet = new Set(symbols);
    if (typeof CorporateActionsService === 'undefined') return items;

    CorporateActionsService.getAllUpcoming().forEach(d => {
      if (!symSet.size || symSet.has(d.symbol)) {
        items.push({
          kind: 'dividend',
          symbol: d.symbol,
          title: `${d.symbol} — ${d.type || 'cash'} dividend`,
          date: d.paymentDate || d.exDate,
          detail: d.amount ? `₨${d.amount}/share` : (d.status || 'upcoming'),
          status: d.status || 'upcoming',
        });
      }
    });

    symbols.forEach(sym => {
      CorporateActionsService.getBonusShares(sym).slice(0, 2).forEach(b => {
        items.push({
          kind: 'bonus',
          symbol: sym,
          title: `${sym} — bonus ${b.ratio || ''}`,
          date: b.creditDate || b.announcementDate,
          detail: b.ratio || 'Bonus issue',
          status: 'announced',
        });
      });
      CorporateActionsService.getRightsIssues(sym).slice(0, 2).forEach(r => {
        items.push({
          kind: 'rights',
          symbol: sym,
          title: `${sym} — rights issue`,
          date: r.exDate || r.announcementDate,
          detail: r.ratio || r.price ? `${r.ratio || ''} @ ₨${r.price || ''}` : 'Rights',
          status: 'announced',
        });
      });
    });

    return items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  async function _loadNews(symbols) {
    if (typeof NewsService === 'undefined' || !NewsService.fetchPortfolioNews) return [];
    try {
      return await NewsService.fetchPortfolioNews(State.get());
    } catch (_) {
      return [];
    }
  }

  function _itemRow(it) {
    const badge = it.kind === 'dividend' ? 'Dividend' : it.kind === 'bonus' ? 'Bonus' : it.kind === 'rights' ? 'Rights' : 'News';
    const date = it.date ? String(it.date).slice(0, 10) : (it.publishedAt ? String(it.publishedAt).slice(0, 10) : '');
    const safeUrl = it.url && /^https?:\/\//i.test(String(it.url)) ? String(it.url) : '';
    const safeSym = String(it.symbol || '').replace(/[^A-Za-z0-9.\-:]/g, '');
    const link = safeUrl ? `data-external-url="${esc(safeUrl)}"` : (safeSym ? `data-action="Research.open" data-symbol="${safeSym}"` : '');
    return `<button type="button" class="lc-announce-row" ${link}>
      <div class="lc-announce-top"><strong>${esc(it.symbol || 'PSX')}</strong><span class="lc-announce-badge">${badge}</span></div>
      <p>${esc(it.title)}</p>
      <em>${date}${it.detail ? ' · ' + esc(it.detail) : ''}</em>
    </button>`;
  }

  function _paintList() {
    const el = document.getElementById('announcements-list');
    if (!el) return;
    const corp = _corpItems(_heldSymbols());
    const news = _news.map(n => ({
      kind: 'news',
      symbol: n.portfolioSymbol || n.symbol,
      title: n.title,
      date: n.publishedAt,
      detail: n.publisher || n.source,
      url: n.url,
    }));
    let items = [...corp, ...news];
    if (_tab === 'corp') items = corp;
    if (_tab === 'news') items = news;
    items = items.slice(0, 40);
    el.innerHTML = items.length
      ? items.map(_itemRow).join('')
      : `<p class="psx-muted">No announcements for your holdings yet. Add transactions or load demo.</p>`;
  }

  function setTab(tab) {
    _tab = tab;
    _paintList();
    document.querySelectorAll('#screen-announcements .lc-segment-btn').forEach(b => {
      b.classList.toggle('on', b.dataset.tab === tab || b.textContent.trim().toLowerCase() === tab);
    });
  }

  async function refresh() {
    _news = await _loadNews(_heldSymbols());
    _paintList();
  }

  function render() {
    const screen = document.getElementById('screen-announcements');
    if (!screen) return;
    const syms = _heldSymbols();

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>Announcements</h1>
          <p>Corporate actions · dividends · portfolio news</p>
        </div>
        ${PsxUI.segment([
          { id: 'all', label: 'All' },
          { id: 'corp', label: 'Corporate' },
          { id: 'news', label: 'News' },
        ], _tab, 'Announcements', 'setTab')}
        <p class="lc-card-sub">${syms.length ? syms.length + ' holding(s) tracked' : 'No holdings — showing market-wide upcoming dividends'}</p>
        <div class="lc-sector-card" id="announcements-list"><p class="psx-muted">Loading…</p></div>
        <div class="lc-dash-actions">
          <button type="button" class="psx-btn psx-btn-primary" data-action="Announcements.refresh">Refresh</button>
          <button type="button" class="psx-btn psx-btn-ghost" data-nav="calendar">Wealth calendar →</button>
        </div>
        <div class="lc-disclaimer">Headlines and dividend dates from public sources — confirm on PSX / company filings.</div>
      </div>`;

    _paintList();
    if (!_news.length) refresh();
    CapMotion.refresh();
  }

  return { render, refresh, setTab };
})();
window.Announcements = Announcements;

;/* === js/modules/zakat.js === */
'use strict';
const Zakat = (() => {
  const NISAB_GOLD_G = 87.48;

  function _zakatable(state) {
    const s = PortfolioAnalyticsService.getSummary(state);
    const settings = state.settings || {};
    const ma = state.manualAssets || {};
    const total = s.totalValue + (ma.usdCash || 0) * FxService.getUsdRate() + (ma.goldGrams || 0) * (settings.goldPricePerGram || 18000) + (ma.realEstate || 0);
    return Math.max(0, total - (settings.zakatDebts || 0));
  }

  function render() {
    const screen = document.getElementById('screen-zakat');
    if (!screen) return;
    const state = State.get();
    const settings = state.settings || {};
    const goldG = settings.goldPricePerGram || 18000;
    const nisab = NISAB_GOLD_G * goldG;
    const zakatable = _zakatable(state);
    const due = zakatable >= nisab ? zakatable * 0.025 : 0;
    const haul = settings.zakatHaulDate || new Date().toISOString().slice(0, 10);

    screen.innerHTML = PsxUI.lcDash('Zakat calculator', 'Hanafi nisab · 2.5% on zakatable wealth', `
      <div class="lc-dash-hero">
        <div class="lc-dash-hero-label">Estimated Zakat due</div>
        <div class="lc-dash-hero-val">${PsxUI.fmt(due)}</div>
        <div class="lc-dash-hero-row">
          <span class="lc-dash-chip">Nisab ${PsxUI.fmt(nisab)}</span>
          <span class="lc-dash-chip">Zakatable ${PsxUI.fmt(zakatable)}</span>
        </div>
      </div>
      <div class="lc-metric-grid">
        <div class="lc-metric-cell"><label>Gold nisab</label><strong>${NISAB_GOLD_G}g</strong></div>
        <div class="lc-metric-cell"><label>Gold / g</label><strong>${PsxUI.fmt(goldG)}</strong></div>
        <div class="lc-metric-cell"><label>Haul date</label><strong>${haul}</strong></div>
        <div class="lc-metric-cell"><label>Debts offset</label><strong>${PsxUI.fmt(settings.zakatDebts || 0)}</strong></div>
      </div>
      <div class="lc-verdict"><h3>Disclaimer</h3><p>Rules-based estimate only — not a fatwa. Consult a scholar for crypto, inventory, and mixed portfolios. Data stays on device.</p></div>
      <div class="lc-form-block">
        <label class="lc-field-label">Debts to subtract (₨)</label>
        <input class="lc-field-input" id="zk-debts" type="number" value="${settings.zakatDebts || 0}" data-action-change="Zakat._saveDebts">
        <label class="lc-field-label">Gold grams (manual)</label>
        <input class="lc-field-input" id="zk-gold" type="number" step="0.01" value="${(state.manualAssets || {}).goldGrams || 0}" data-action-change="Zakat._saveGold">
        <label class="lc-field-label">USD cash (manual)</label>
        <input class="lc-field-input" id="zk-usd" type="number" step="0.01" value="${(state.manualAssets || {}).usdCash || 0}" data-action-change="Zakat._saveUsd">
      </div>
    `);
  }

  function _saveDebts(v) { State.update(s => { s.settings.zakatDebts = parseFloat(v) || 0; }); render(); }
  function _saveGold(v) { State.update(s => { s.manualAssets = { ...(s.manualAssets || {}), goldGrams: parseFloat(v) || 0 }; }); render(); }
  function _saveUsd(v) { State.update(s => { s.manualAssets = { ...(s.manualAssets || {}), usdCash: parseFloat(v) || 0 }; }); render(); }
  return { render, _saveDebts, _saveGold, _saveUsd };
})();
window.Zakat = Zakat;

;/* === js/modules/import.js === */
'use strict';
const ImportCsv = (() => {
  let _pending = [];

  function _portfolioOptions() {
    if (typeof PortfolioBuckets === 'undefined') return '';
    const custom = PortfolioBuckets.list().filter(p => !p.builtin);
    if (!custom.length) return '';
    const opts = custom.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    return `<div class="field"><label class="field-label">Assign to portfolio (optional)</label>
      <select class="field-select" id="csv-portfolio-id">
        <option value="">Default ledger</option>${opts}
      </select></div>`;
  }

  function render() {
    const screen = document.getElementById('screen-import');
    if (!screen) return;
    _pending = [];
    screen.innerHTML = PsxUI.lcDash('Import CSV', 'IBKR · Binance · generic trade log', `
      <div class="lc-verdict"><h3>Format</h3><p>Columns: <code>date,symbol,type,quantity,price,broker</code>. Types: BUY, SELL, INTL_BUY, CRYPTO_BUY.</p></div>
      <div class="lc-form-block">
        ${_portfolioOptions()}
        <textarea id="csv-input" class="lc-field-input lc-field-textarea" rows="10" placeholder="date,symbol,type,quantity,price,broker&#10;2026-01-15,AAPL,INTL_BUY,10,195,IBKR" aria-label="CSV rows"></textarea>
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
          <button type="button" class="psx-btn psx-btn-ghost" data-action="ImportCsv._preview">Preview</button>
          <button type="button" class="psx-btn psx-btn-primary" data-action="ImportCsv._confirm" id="csv-import-btn" disabled>Import ${_pending.length || ''}</button>
        </div>
        <div id="csv-preview" class="lc-csv-preview" aria-live="polite"></div>
        <p id="csv-result" style="margin-top:12px;font-size:13px;color:var(--psx-text-3)"></p>
      </div>
    `);
  }

  function _parseLine(line) {
    const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    if (parts.length < 4) return null;
    let [date, symbol, type, qty, price, broker] = parts;
    symbol = String(symbol || '').replace(/[^A-Za-z0-9.\-:]/g, '').slice(0, 16);
    broker = String(broker || '').replace(/[<>"'&]/g, '').slice(0, 32);
    if (!date || !symbol || date === 'date') return null;
    const t = (type || 'BUY').toUpperCase();
    const quantity = parseFloat(qty) || 0;
    const px = parseFloat(price) || 0;
    if (!quantity) return null;
    if (t === 'INTL_BUY' || t === 'INTL_SELL') {
      return { type: t, date, symbol: symbol.toUpperCase(), assetClass: 'intl', shares: quantity, qty: quantity, priceUsd: px, costUsd: quantity * px, broker: broker || 'IBKR', currency: 'USD' };
    }
    if (t === 'CRYPTO_BUY' || t === 'CRYPTO_SELL') {
      return { type: t, date, symbol: symbol.toUpperCase(), assetClass: 'crypto', qty: quantity, shares: quantity, priceUsd: px, costUsd: quantity * px, broker: broker || 'Binance', currency: 'USD' };
    }
    if (t === 'BUY' || t === 'SELL') {
      return { type: t, date, symbol: symbol.toUpperCase(), shares: quantity, price: px, amount: quantity * px, broker: broker || 'CDC' };
    }
    return null;
  }

  function _parseAll() {
    const raw = document.getElementById('csv-input')?.value || '';
    return raw.split(/\r?\n/).filter(Boolean).map(_parseLine).filter(Boolean);
  }

  function _preview() {
    _pending = _parseAll();
    const el = document.getElementById('csv-preview');
    const btn = document.getElementById('csv-import-btn');
    if (btn) {
      btn.disabled = !_pending.length;
      btn.textContent = _pending.length ? `Import ${_pending.length} rows` : 'Import';
    }
    if (!el) return;
    if (!_pending.length) {
      el.innerHTML = '<p class="lc-empty-note">No valid rows — check header and columns.</p>';
      return;
    }
    el.innerHTML = `<table class="psx-table"><thead><tr><th>Date</th><th>Symbol</th><th>Type</th><th>Qty</th><th>Price</th><th>Broker</th></tr></thead><tbody>
      ${_pending.slice(0, 20).map((t) => `<tr><td>${t.date}</td><td>${t.symbol}</td><td>${t.type}</td><td>${t.shares ?? t.qty ?? ''}</td><td>${t.price ?? t.priceUsd ?? ''}</td><td>${t.broker || ''}</td></tr>`).join('')}
      </tbody></table>${_pending.length > 20 ? `<p class="lc-empty-note">+${_pending.length - 20} more rows</p>` : ''}`;
  }

  function _confirm() {
    if (!_pending.length) {
      _preview();
      if (!_pending.length) return;
    }
    const portfolioId = document.getElementById('csv-portfolio-id')?.value || '';
    _pending.forEach((tx) => {
      if (portfolioId) tx.portfolioId = portfolioId;
      State.addTransaction(tx);
    });
    const n = _pending.length;
    _pending = [];
    const el = document.getElementById('csv-result');
    if (el) el.textContent = n ? `Imported ${n} transactions${portfolioId ? ' into custom portfolio' : ''}.` : 'No valid rows found.';
    if (n && typeof App !== 'undefined') App.renderCurrent();
    render();
  }

  function _run() {
    _preview();
    _confirm();
  }

  return { render, _preview, _confirm, _run };
})();
window.ImportCsv = ImportCsv;

;/* === js/modules/intelligence.js === */
'use strict';
const Intelligence = (() => {
  function render(target) {
    const screen = target || document.getElementById('screen-intelligence');
    if (!screen) return;
    const intel = PortfolioAnalyticsService.getIntelligence();
    const { summary, insights, ruleInsights, scores } = intel;
    const fmtScore = n => Math.round(Number(n) || 0);

    screen.innerHTML = PsxUI.lcDash('Intelligence', 'Rule-based portfolio analysis — not AI advice', `
      <div class="lc-pulse-row">
        ${[
          { label: 'Health', value: fmtScore(scores.health) + '/100', cls: scores.health >= 60 ? 'psx-up' : 'psx-down' },
          { label: 'Risk', value: fmtScore(scores.risk) + '/100' },
          { label: 'Diversification', value: fmtScore(scores.diversification) + '/100' },
          { label: 'Dividend quality', value: fmtScore(scores.dividendQuality) + '/100' },
          { label: 'Growth quality', value: fmtScore(scores.growthQuality) + '/100' },
          { label: 'Portfolio yield', value: summary.portfolioDivYield.toFixed(1) + '%' },
        ].map(c => `<div class="lc-pulse-pill"><label>${c.label}</label><b class="${c.cls || ''}">${c.value}</b></div>`).join('')}
      </div>

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Insights</h3><span>Actionable</span></div>
        ${insights.length ? insights.map(i => `
          <div class="lc-verdict lc-verdict--${i.severity || 'info'}">
            <p>${i.text}</p>
            <small>→ ${i.action}</small>
          </div>`).join('') : '<p class="lc-empty-note">No critical insights.</p>'}
      </div>

      ${ruleInsights.length ? `<div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Alerts</h3></div>
        ${ruleInsights.map(i => `<div class="lc-verdict"><p>${i.icon || '•'} ${i.text}</p></div>`).join('')}
      </div>` : ''}

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Sector exposure</h3></div>
        <div class="lc-sector-card">
          ${(summary.sectorAllocation || []).map(s => `
            <div class="lc-market-row" style="cursor:default">
              <div><div class="lc-market-sym">${s.sector}</div></div>
              <div class="lc-market-price">${s.pct.toFixed(1)}%</div>
              <div class="lc-market-chg">${PsxUI.fmt(s.value)}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="lc-dash-section">
        <div class="lc-dash-section-head"><h3>Broker exposure</h3></div>
        <div class="lc-sector-card">
          ${Object.entries(summary.brokers || {}).sort((a, b) => b[1] - a[1]).map(([b, v]) => `
            <div class="lc-market-row" style="cursor:default">
              <div><div class="lc-market-sym">${b}</div></div>
              <div class="lc-market-price">${PsxUI.fmt(v)}</div>
              <div class="lc-market-chg">${summary.totalValue > 0 ? ((v / summary.totalValue) * 100).toFixed(1) : 0}%</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="lc-dash-section" id="intel-news-section">
        <div class="lc-dash-section-head"><h3>News impact</h3><span>Rule-based signals — not AI advice</span></div>
        <div class="lc-sector-card" id="intel-news-list"><p class="lc-empty-note">Loading…</p></div>
      </div>
    `);
    if (typeof NewsService !== 'undefined') {
      NewsService.fetchPortfolioNews(State.get()).then(items => {
        const el = document.getElementById('intel-news-list');
        if (!el) return;
        el.innerHTML = items.length ? items.slice(0, 8).map(n => `
          <a class="lc-news-row" href="${escUrl(n.url)}" target="_blank" rel="noopener noreferrer">
            <div class="lc-news-title">${esc(n.title)}</div>
            <div class="lc-news-meta">${esc(n.portfolioSymbol)} · ${esc(n.impact?.tags?.join(' · ') || 'General')}</div>
            <p class="lc-news-hint">${esc(n.impact?.hint || '')}</p>
          </a>`).join('') : '<p class="lc-empty-note">No headlines — check connection or add GNews key in Settings.</p>';
      }).catch(() => {});
    }
    CapMotion.refresh();
  }

  return { render };
})();
window.Intelligence = Intelligence;

;/* === js/capricorn-motion.js === */
/* GENERATED by scripts/sync-design-system.mjs — DO NOT EDIT.
   Source: shared/design-system/{capricorn-motion.js} */

/* ════════════════════════════════════════════════════════════════
   Capricorn Design System — motion runtime (no deps)
   App shells (data-cap-app): instant reveals only — no RAF / tilt / parallax.
   Marketing surfaces: full motion when not in app-fast mode.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function isAppShell() {
    return document.body && document.body.getAttribute('data-cap-app') === '1';
  }

  function revealInstant(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  function observeVisible(selector, visibleClass) {
    var nodes = document.querySelectorAll(selector);
    if (!nodes.length) return;
    if (isAppShell() || reduced || !('IntersectionObserver' in window)) {
      nodes.forEach(function (el) { el.classList.add(visibleClass); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add(visibleClass);
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    nodes.forEach(function (el, i) {
      if (!el.style.getPropertyValue('--cap-stagger-i')) {
        var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : i;
        el.style.setProperty('--cap-stagger-i', String(sib % 8));
      }
      io.observe(el);
    });
  }

  function bindRipples() {
    if (isAppShell()) return;
    document.querySelectorAll('[data-cap-ripple], .cap-ripple-host').forEach(function (host) {
      if (host.dataset.capRippleBound) return;
      host.dataset.capRippleBound = '1';
      host.addEventListener('pointerdown', function (ev) {
        if (reduced) return;
        var r = host.getBoundingClientRect();
        var ripple = document.createElement('span');
        ripple.className = 'cap-ripple';
        var size = Math.max(r.width, r.height) * 1.2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (ev.clientX - r.left - size / 2) + 'px';
        ripple.style.top = (ev.clientY - r.top - size / 2) + 'px';
        host.appendChild(ripple);
        ripple.addEventListener('animationend', function () { ripple.remove(); });
      });
    });
  }

  function bindMagnetic() {
    if (isAppShell() || reduced || !finePointer) return;
    document.querySelectorAll('.cap-magnetic').forEach(function (el) {
      if (el.dataset.capMagneticBound) return;
      el.dataset.capMagneticBound = '1';
      var strength = parseFloat(el.dataset.capStrength || '0.25');
      el.addEventListener('pointermove', function (ev) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--cap-mx', ((ev.clientX - r.left - r.width / 2) * strength).toFixed(1));
        el.style.setProperty('--cap-my', ((ev.clientY - r.top - r.height / 2) * strength).toFixed(1));
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--cap-mx', '0');
        el.style.setProperty('--cap-my', '0');
      });
    });
  }

  function bindTilt() {
    if (isAppShell() || reduced || !finePointer) return;
    document.querySelectorAll('[data-cap-tilt]').forEach(function (el) {
      if (el.dataset.capTiltBound) return;
      el.dataset.capTiltBound = '1';
      var max = parseFloat(el.dataset.capTilt || '6');
      el.classList.add('cap-depth');
      el.addEventListener('pointermove', function (ev) {
        var r = el.getBoundingClientRect();
        var rx = ((ev.clientY - r.top) / r.height - 0.5) * -2 * max;
        var ry = ((ev.clientX - r.left) / r.width - 0.5) * 2 * max;
        el.style.transform = 'perspective(800px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  function bindHero3d() {
    if (isAppShell() || reduced || !finePointer) return;
    document.querySelectorAll('.cap-hero-3d').forEach(function (wrap) {
      if (wrap.dataset.capHero3dBound) return;
      wrap.dataset.capHero3dBound = '1';
      var inner = wrap.querySelector('.cap-hero-3d-inner') || wrap;
      wrap.addEventListener('pointermove', function (ev) {
        var r = wrap.getBoundingClientRect();
        var ry = ((ev.clientX - r.left) / r.width - 0.5) * 14;
        var rx = ((ev.clientY - r.top) / r.height - 0.5) * -10;
        inner.style.setProperty('--cap-ry', ry.toFixed(2) + 'deg');
        inner.style.setProperty('--cap-rx', rx.toFixed(2) + 'deg');
      });
      wrap.addEventListener('pointerleave', function () {
        inner.style.setProperty('--cap-ry', '0deg');
        inner.style.setProperty('--cap-rx', '0deg');
      });
    });
  }

  function initScrollProgress() {
    if (isAppShell()) return;
    var progress = document.querySelector('.cap-scroll-progress');
    if (!progress || reduced) return;
    function updateScroll() {
      var max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
      progress.style.setProperty('--cap-scroll-progress', String(window.scrollY / max));
    }
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
  }

  function initParallax() {
    if (isAppShell() || reduced) return;
    var parallax = document.querySelectorAll('[data-cap-parallax]');
    if (!parallax.length) return;
    var ticking = false;
    function updateParallax() {
      parallax.forEach(function (el) {
        var factor = parseFloat(el.dataset.capParallaxDepth || el.getAttribute('data-cap-parallax-depth') || '1') * 0.12;
        var rect = el.getBoundingClientRect();
        var center = rect.top + rect.height * 0.5 - innerHeight * 0.5;
        el.style.setProperty('--cap-parallax-y', String(-center * factor * 0.08));
      });
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();
  }

  function init() {
    if (isAppShell()) {
      revealInstant('.cap-reveal, .cap-reveal-scale, .cap-reveal-lines, .cap-kinetic, .cap-stagger, .cap-stagger > *');
      return;
    }
    observeVisible('.cap-reveal, .cap-reveal-scale, .cap-reveal-lines', 'is-visible');
    observeVisible('.cap-kinetic', 'is-visible');
    observeVisible('.cap-stagger', 'is-visible');
    bindRipples();
    bindMagnetic();
    bindTilt();
    bindHero3d();
    initScrollProgress();
    initParallax();
  }

  window.CapricornMotion = {
    init: init,
    refresh: function () {
      if (isAppShell()) {
        revealInstant('.cap-reveal:not(.is-visible), .cap-reveal-scale:not(.is-visible), .cap-kinetic:not(.is-visible)');
        return;
      }
      init();
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Alias for modules that use CapMotion
window.CapMotion = window.CapricornMotion;

;/* === js/ui/motion-polish.js === */
'use strict';
/** Count-up, haptics, tap feedback, Cmd-K palette, post-render polish */
const LcPolish = (() => {
  const _countStore = new Map();
  let _cmdkOpen = false;

  const CMD_ACTIONS = () => [
    { q: 'hub home', label: 'Hub', run: () => Navigation.go('home') },
    { q: 'portfolio pnl', label: 'P&L / Portfolio', run: () => Navigation.go('portfolio') },
    { q: 'market watch stocks', label: 'Stock watch', run: () => Navigation.go('market') },
    { q: 'funds meezan nav', label: 'Fund NAVs', run: () => Navigation.go('funds') },
    { q: 'research analyze', label: 'Research', run: () => Navigation.go('research') },
    { q: 'transactions ledger', label: 'Transactions', run: () => Navigation.go('transactions') },
    { q: 'settings', label: 'Settings', run: () => Navigation.go('settings') },
    { q: 'refresh prices', label: 'Refresh all prices', run: () => App.refreshPrices() },
    { q: 'add holding buy', label: 'Add holding', run: () => App.openAddTransaction() },
    { q: 'import csv', label: 'Import CSV', run: () => Navigation.go('import') },
    { q: 'telegram', label: 'Telegram settings', run: () => Navigation.go('settings') },
    { q: 'zakat', label: 'Zakat calculator', run: () => Navigation.go('zakat') },
    { q: 'dividends', label: 'Dividends', run: () => Navigation.go('dividends') },
    { q: 'signals pilot', label: 'Market strategy', run: () => Navigation.go('signals') },
  ];

  function hapticsOn() {
    return !!(typeof State !== 'undefined' && State.get('settings')?.hapticsEnabled);
  }

  function haptic(ms) {
    if (!hapticsOn()) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(ms || 10); } catch (_) {}
    }
  }

  function hapticConfirm() { haptic([8, 40, 12]); }
  function hapticDelete() { haptic([12, 30, 18]); }

  function bindTapFeedback(root) {
    root = root || document;
    root.querySelectorAll('.psx-btn, .psx-nav-btn, .psx-side-btn, .lc-tool-card, .lc-link-btn, .lc-pulse-pill--btn, .lc-dash-market-card--btn, .lc-market-row, .lc-segment-btn, .rt-wl-card').forEach((el) => {
      if (el.dataset.lcTapBound) return;
      el.dataset.lcTapBound = '1';
      el.addEventListener('pointerdown', () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        el.classList.add('lc-tap-active');
      }, { passive: true });
      el.addEventListener('pointerup', () => el.classList.remove('lc-tap-active'), { passive: true });
      el.addEventListener('pointerleave', () => el.classList.remove('lc-tap-active'), { passive: true });
      el.addEventListener('click', () => haptic(8), { passive: true });
    });
  }

  function animateCounts(root) {
    root = root || document;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.querySelectorAll('[data-lc-count]').forEach((el) => {
      const target = parseFloat(el.getAttribute('data-lc-count'));
      if (!Number.isFinite(target)) return;
      const key = el.getAttribute('data-lc-count-key') || el.id || 'c';
      const prev = _countStore.has(key) ? _countStore.get(key) : target;
      _countStore.set(key, target);
      const isPct = el.getAttribute('data-lc-count-pct') === '1';
      const signed = el.getAttribute('data-lc-count-signed') === '1';
      const fmt = (v) => {
        if (isPct) return `${v >= 0 && signed ? '+' : ''}${v.toFixed(2)}%`;
        if (typeof PsxUI !== 'undefined') return PsxUI.fmt(v, { signed: signed && v !== 0 });
        return Math.round(v).toLocaleString('en-PK');
      };
      if (reduced || Math.abs(target - prev) < 0.005) {
        el.textContent = fmt(target);
        return;
      }
      const start = performance.now();
      const dur = parseInt(el.getAttribute('data-lc-count-ms') || '520', 10);
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(prev + (target - prev) * ease);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = fmt(target);
      };
      requestAnimationFrame(step);
    });
  }

  function _ensureCmdk() {
    if (document.getElementById('lc-cmdk')) return;
    const el = document.createElement('div');
    el.id = 'lc-cmdk';
    el.className = 'lc-cmdk hidden';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Quick actions');
    el.innerHTML = `
      <div class="lc-cmdk-backdrop" data-cmdk-close></div>
      <div class="lc-cmdk-panel">
        <input type="search" class="lc-cmdk-input" id="lc-cmdk-input" placeholder="Go to… or refresh prices" autocomplete="off" aria-label="Search actions">
        <ul class="lc-cmdk-list" id="lc-cmdk-list" role="listbox"></ul>
        <p class="lc-cmdk-hint"><kbd>↑</kbd><kbd>↓</kbd> navigate · <kbd>↵</kbd> run · <kbd>esc</kbd> close</p>
      </div>`;
    document.body.appendChild(el);
    el.querySelector('[data-cmdk-close]').addEventListener('click', closeCmdk);
    const inp = el.querySelector('#lc-cmdk-input');
    inp.addEventListener('input', () => _paintCmdk(inp.value));
    inp.addEventListener('keydown', (e) => {
      const items = [...el.querySelectorAll('.lc-cmdk-item')];
      const idx = items.findIndex((n) => n.classList.contains('on'));
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = items[Math.min(items.length - 1, idx + 1)] || items[0];
        items.forEach((n) => n.classList.remove('on'));
        if (next) next.classList.add('on');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = items[Math.max(0, idx - 1)] || items[items.length - 1];
        items.forEach((n) => n.classList.remove('on'));
        if (prev) prev.classList.add('on');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const on = items.find((n) => n.classList.contains('on')) || items[0];
        if (on) on.click();
      }
    });
  }

  function _paintCmdk(q) {
    const list = document.getElementById('lc-cmdk-list');
    if (!list) return;
    const qq = (q || '').trim().toLowerCase();
    const rows = CMD_ACTIONS().filter((a) => !qq || a.label.toLowerCase().includes(qq) || a.q.includes(qq));
    list.innerHTML = rows.map((a, i) =>
      `<li><button type="button" class="lc-cmdk-item${i === 0 ? ' on' : ''}" role="option">${a.label}</button></li>`
    ).join('');
    list.querySelectorAll('.lc-cmdk-item').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        closeCmdk();
        hapticConfirm();
        rows[i].run();
      });
    });
  }

  function openCmdk() {
    if (window.innerWidth < 900) return;
    _ensureCmdk();
    const el = document.getElementById('lc-cmdk');
    if (!el) return;
    el.classList.remove('hidden');
    _cmdkOpen = true;
    const inp = document.getElementById('lc-cmdk-input');
    if (inp) { inp.value = ''; inp.focus(); }
    _paintCmdk('');
  }

  function closeCmdk() {
    const el = document.getElementById('lc-cmdk');
    if (el) el.classList.add('hidden');
    _cmdkOpen = false;
  }

  function init() {
    _ensureCmdk();
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (_cmdkOpen) closeCmdk();
        else openCmdk();
      } else if (e.key === 'Escape' && _cmdkOpen) {
        closeCmdk();
      }
    });
    bindTapFeedback();
  }

  function afterRender() {
    bindTapFeedback();
    animateCounts();
  }

  function announcePrices(netWorth, daily) {
    const el = document.getElementById('lc-price-announcer');
    if (!el || typeof PsxUI === 'undefined') return;
    const dSign = daily >= 0 ? '+' : '';
    el.textContent = `Net worth updated: ${PsxUI.fmt(netWorth)}. Today ${dSign}${PsxUI.fmt(Math.abs(daily))}.`;
  }

  return {
    init, afterRender, haptic, hapticConfirm, hapticDelete, announcePrices, openCmdk, closeCmdk,
  };
})();
window.LcPolish = LcPolish;

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

  function _isBadPrice(sym, stored) {
    if (!Number.isFinite(stored) || stored <= 0) return true;
    const ref = _priceRef(sym);
    if (ref > 0 && (stored > ref * 3 || stored < ref * 0.3)) return true;
    return false;
  }

  function _validateAndCleanPrices() {
    const state = State.get();
    let cleaned = 0;
    let changed = false;
    Object.keys(state.prices || {}).forEach(sym => {
      const entry = state.prices[sym];
      const stored = entry?.price;
      if (!entry || typeof entry !== 'object' || _isBadPrice(sym, stored)) {
        delete state.prices[sym];
        cleaned++;
        changed = true;
      }
    });
    if (changed) {
      State.save();
      console.log(`Cleared ${cleaned} invalid cached prices on init`);
    }
  }

  function clearWrongPrices() {
    let cleaned = 0;
    State.update(s => {
      Object.keys(s.prices || {}).forEach(sym => {
        const stored = s.prices[sym]?.price;
        if (_isBadPrice(sym, stored)) {
          console.log(`Clearing bad price for ${sym}: ${stored} (ref: ${_priceRef(sym)})`);
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
    if (offline) return { label: 'Offline', cls: 'lc-ticker-pill--warn' };
    if (live) return { label: 'Live', cls: 'lc-ticker-pill--live' };
    if (pktLabel === 'Last close' || pktLabel === 'Pre-market') return { label: `${pktLabel} ${age}`, cls: stale ? 'lc-ticker-pill--warn' : '' };
    return { label: age, cls: stale ? 'lc-ticker-pill--warn' : '' };
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

  function deletePortfolio(id) {
    if (typeof PortfolioBuckets === 'undefined') return;
    const b = PortfolioBuckets.list().find(x => x.id === id);
    if (!b || b.builtin) { showToast('Built-in portfolios cannot be deleted', 'warning'); return; }
    const txs = PortfolioBuckets.txsForBucket(State.get(), id);
    if (txs.length && !confirm(`Delete “${b.name}” and ${txs.length} transaction(s)? Cannot undo.`)) return;
    State.update(s => {
      s.portfolios = (s.portfolios || []).filter(p => p.id !== id);
      if (txs.length) s.transactions = (s.transactions || []).filter(t => t.portfolioId !== id);
    });
    showToast(`Deleted ${b.name}`, 'success');
    if (typeof Hub !== 'undefined') Hub.render();
    if (typeof PortfolioScreen !== 'undefined') PortfolioScreen.render();
  }

  function renamePortfolio(id) {
    const b = PortfolioBuckets.list().find(x => x.id === id);
    if (!b || b.builtin) return;
    const name = prompt('Portfolio name', b.name);
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

  function _hideSplash() {
    const el = document.getElementById('splash');
    setTimeout(() => { if (el) el.classList.add('hide'); }, 480);
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
    if (demo && window.Settings && Settings.loadSeedData) {
      const hasLedger = (State.get().transactions || []).length > 0;
      if (!hasLedger) Settings.loadSeedData({ silent: true });
      else showToast('Demo mode — your saved ledger was kept. Clear data in Settings to load sample portfolio.', 'info');
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
    if (typeof NotificationScheduler !== 'undefined') NotificationScheduler.init();
    if (typeof LcPolish !== 'undefined') LcPolish.init();
    if (typeof LivePriceStream !== 'undefined') LivePriceStream.init();
    if (typeof PriceSnapshotService !== 'undefined') PriceSnapshotService.init();
    if (typeof FundNavService !== 'undefined') FundNavService.applyAll();
    if (typeof GlanceBridge !== 'undefined') GlanceBridge.publish();
    _updateCurrencyToggleBtn();
    _scheduleAutoRefresh();
    _fetchMarketIndex();
    const hasProxy = State.get('settings')?.psxProxyUrl || window.LEDGERCAP_CONFIG?.psxProxyUrl;
    if (typeof FxService !== 'undefined') FxService.refreshUsdPkr().then(() => _renderTicker());
    if (hasProxy && !demo) {
      setTimeout(() => refreshPrices(), 1200);
    }
    else if (!demo && (State.get().transactions || []).length) {
      setTimeout(() => refreshPrices(), 1200);
    }
    else if (demo) setTimeout(() => showToast('Demo portfolio — sample NAVs; live PSX refresh skipped', 'info'), 800);
    _maybeDemoBanner();
    _maybeInstallHint();
    if (typeof PriceHealth !== 'undefined') PriceHealth.mount();
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

  function _checkDeployVersion() {
    const local = window.LEDGERCAP_VERSION?.app || window.APP_VERSION || '';
    fetch('./VERSION.json?_=' + Date.now(), { cache: 'no-store' })
      .then(r => r.json())
      .then(v => {
        const remote = v.version || v.appVersion || '';
        if (remote && local && remote !== local) _showUpdateBanner(remote);
      })
      .catch(() => {});
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        _showUpdateBanner(window.LEDGERCAP_VERSION?.app || 'new', true);
      });
    }
  }

  function _showUpdateBanner(version, swReady) {
    let bar = document.getElementById('lc-update-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'lc-update-bar';
      bar.className = 'lc-update-bar';
      bar.setAttribute('role', 'status');
      document.body.prepend(bar);
    }
    bar.innerHTML = `<span>${swReady ? 'App updated' : 'Update available'} (v${version})</span>
      <button type="button" class="psx-btn psx-btn-primary psx-btn-sm" data-action="App.reloadForUpdate">Refresh</button>`;
  }

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
      showToast('Demo mode — live refresh disabled', 'info');
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
      if (kse) {
        State.set('kseIndex', kse);
        State.recordKseSnapshot?.(kse);
        _renderTicker();
        if (typeof Home !== 'undefined' && Navigation?.current?.() === 'home') Home.render();
      }
    } catch (_) { /* offline / blocked */ }
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
      showToast('Demo mode — showing seed NAVs. Remove ?demo=1 for live PSX refresh.', 'info');
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
    sheet.classList.add('open');
    _activeSheet = id;
    sheet.querySelector('.bs-backdrop')?.addEventListener('click', closeBottomSheet);
  }

  function closeBottomSheet() {
    const sheet = document.getElementById('bottom-sheet');
    if (sheet) sheet.classList.remove('open');
    _activeSheet = null;
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
      BUY: '📈 BUY', SELL: '📉 SELL', INTL_BUY: '🌎 US BUY', INTL_SELL: '🌎 US SELL',
      CRYPTO_BUY: '₿ CRYPTO BUY', CRYPTO_SELL: '₿ CRYPTO SELL',
      DIVIDEND: '💰 DIV', SALARY: '💼 SALARY',
      CONTRIBUTION: '🏦 FUND', IPO_SUBSCRIBE: '🚀 IPO',
    };

    const content = `
    <div id="tx-form">
      <div class="type-selector">
        ${typeOpts.map(t => `<div class="type-btn${t === selType ? ' active' : ''}" data-type="${t}">${typeLabels[t] || t}</div>`).join('')}
      </div>
      <div id="tx-fields">${_txFields(selType, symbol, broker, allSymbols, allWithFunds, brokers, globalBrokers, currentHoldings)}</div>
      <button class="btn-primary" data-action="App._submitTransaction">Add Transaction</button>
    </div>`;

    openBottomSheet('add-tx', 'Add Transaction', content);

    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
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

  function deleteTransaction(id) {
    if (!confirm('Delete this transaction?')) return;
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
    if (meta) meta.content = theme === 'light' ? '#fafafa' : '#09090b';
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

  function renderCurrent() {
    Navigation.go(Navigation.current(), true);
  }

  return { launch, showToast, refreshPrices, refreshSymbolPrice, clearWrongPrices, openBottomSheet, closeBottomSheet,
    openAddTransaction, openSellHolding, reloadForUpdate, _submitTransaction, _runUndo, _updateBuyTotal, _onSellSymbolChange, _updateSellPnl,
    deleteTransaction, openMarkIpoListed, _submitIpoListed, renderCurrent, dismissInstall, dismissDemo, applyTheme,
    checkPriceAlerts, requestAlertPermission, _filterIntlSymbols, _pickIntlSymbol,
    openAddPortfolio, _submitPortfolio, openAddForPortfolio, deletePortfolio, renamePortfolio,
    openReconcilePosition, _submitReconcile, loadDemo,
    toggleDisplayCurrency, _updateCurrencyToggleBtn, openPriceAlert, _submitPriceAlert, _removePriceAlert };
})();
window.App = App;

document.addEventListener('DOMContentLoaded', App.launch);
