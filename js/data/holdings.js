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
