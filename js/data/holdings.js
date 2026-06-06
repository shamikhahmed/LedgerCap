'use strict';

const RAFI_STOCKS = [
  { id:'r_atrl',    symbol:'ATRL',    name:'Attock Refinery',               shares:10,   avgCost:953.30,  broker:'Rafi', sector:'Energy',       isShariah:false },
  { id:'r_cphl',    symbol:'CPHL',    name:'Cherat Packaging',              shares:120,  avgCost:86.67,   broker:'Rafi', sector:'Packaging',    isShariah:true  },
  { id:'r_dgkc',    symbol:'DGKC',    name:'DG Khan Cement',                shares:100,  avgCost:197.98,  broker:'Rafi', sector:'Cement',       isShariah:true  },
  { id:'r_efert',   symbol:'EFERT',   name:'Engro Fertilizers',             shares:90,   avgCost:207.40,  broker:'Rafi', sector:'Fertilizer',   isShariah:false },
  { id:'r_engroh',  symbol:'ENGROH',  name:'Engro Holdings',                shares:60,   avgCost:287.00,  broker:'Rafi', sector:'Conglomerate', isShariah:false },
  { id:'r_ffl',     symbol:'FFL',     name:'Fauji Fertilizer Bin Qasim',    shares:300,  avgCost:17.74,   broker:'Rafi', sector:'Fertilizer',   isShariah:false },
  { id:'r_hubc',    symbol:'HUBC',    name:'Hub Power Company',             shares:60,   avgCost:225.90,  broker:'Rafi', sector:'Power',        isShariah:false },
  { id:'r_luck',    symbol:'LUCK',    name:'Lucky Cement',                  shares:275,  avgCost:428.68,  broker:'Rafi', sector:'Cement',       isShariah:true  },
  { id:'r_mari',    symbol:'MARI',    name:'Mari Petroleum',                shares:20,   avgCost:674.66,  broker:'Rafi', sector:'Oil & Gas',    isShariah:false },
  { id:'r_mebl',    symbol:'MEBL',    name:'Meezan Bank',                   shares:100,  avgCost:491.59,  broker:'Rafi', sector:'Banking',      isShariah:true  },
  { id:'r_miietf',  symbol:'MIIETF',  name:'Meezan Islamic Income ETF',     shares:1500, avgCost:17.40,   broker:'Rafi', sector:'ETF',          isShariah:true  },
  { id:'r_mlcf',    symbol:'MLCF',    name:'Maple Leaf Cement',             shares:150,  avgCost:89.94,   broker:'Rafi', sector:'Cement',       isShariah:true  },
  { id:'r_mznpetf', symbol:'MZNPETF', name:'Meezan Petroleum ETF',          shares:3000, avgCost:21.14,   broker:'Rafi', sector:'ETF',          isShariah:true  },
  { id:'r_nml',     symbol:'NML',     name:'Nishat Mills',                  shares:60,   avgCost:160.76,  broker:'Rafi', sector:'Textile',      isShariah:true  },
  { id:'r_nrl',     symbol:'NRL',     name:'National Refinery',             shares:25,   avgCost:382.98,  broker:'Rafi', sector:'Energy',       isShariah:false },
  { id:'r_ogdc',    symbol:'OGDC',    name:'Oil & Gas Dev Co',              shares:135,  avgCost:322.64,  broker:'Rafi', sector:'Oil & Gas',    isShariah:false },
  { id:'r_ppl',     symbol:'PPL',     name:'Pakistan Petroleum',            shares:30,   avgCost:241.84,  broker:'Rafi', sector:'Oil & Gas',    isShariah:false },
  { id:'r_pso',     symbol:'PSO',     name:'Pakistan State Oil',            shares:35,   avgCost:381.99,  broker:'Rafi', sector:'Energy',       isShariah:false },
  { id:'r_ptc',     symbol:'PTC',     name:'Pakistan Telecom',              shares:100,  avgCost:67.54,   broker:'Rafi', sector:'Telecom',      isShariah:false },
  { id:'r_searl',   symbol:'SEARL',   name:'Searle Pakistan',               shares:930,  avgCost:92.74,   broker:'Rafi', sector:'Pharma',       isShariah:true  },
  { id:'r_ssgc',    symbol:'SSGC',    name:'Sui Southern Gas',              shares:200,  avgCost:29.74,   broker:'Rafi', sector:'Gas',          isShariah:false },
  { id:'r_trg',     symbol:'TRG',     name:'TRG Pakistan',                  shares:50,   avgCost:63.87,   broker:'Rafi', sector:'Technology',   isShariah:true  },
];

const AKD_STOCKS = [
  { id:'a_ffc',   symbol:'FFC',   name:'Fauji Fertilizer Company',           shares:20,   avgCost:560.92, broker:'AKD', sector:'Fertilizer', isShariah:false },
  { id:'a_hino',  symbol:'HINO',  name:'Hino Pak Motors',                    shares:20,   avgCost:360.63, broker:'AKD', sector:'Auto',       isShariah:false },
  { id:'a_luck',  symbol:'LUCK',  name:'Lucky Cement',                       shares:50,   avgCost:435.76, broker:'AKD', sector:'Cement',     isShariah:true  },
  { id:'a_pibtl', symbol:'PIBTL', name:"Pakistan Int'l Bulk Terminal",       shares:520,  avgCost:17.43,  broker:'AKD', sector:'Logistics',  isShariah:true  },
  { id:'a_pict',  symbol:'PICT',  name:'Pakistan Int\'l Container Terminal', shares:160,  avgCost:38.54,  broker:'AKD', sector:'Logistics',  isShariah:true  },
  { id:'a_pnsc',  symbol:'PNSC',  name:'Pakistan National Shipping',         shares:25,   avgCost:510.87, broker:'AKD', sector:'Shipping',   isShariah:true  },
  { id:'a_slgl',  symbol:'SLGL',  name:'Sind Leasing',                       shares:200,  avgCost:15.94,  broker:'AKD', sector:'Textile',    isShariah:false },
  { id:'a_pasm',  symbol:'PASM',  name:'Pakistan Synthetics',                shares:1554, avgCost:8.47,   broker:'AKD', sector:'Textile',    isShariah:false },
];

const MEEZAN_FUNDS = [
  { id:'m_kmif',      symbol:'KMIF',       name:'KSE Meezan Index Fund',           units:1534.3564, avgNav:160.41, currentNav:187.70, investedValue:276000, currentValue:287999, type:'Index Fund',  isShariah:true },
  { id:'m_maaf',      symbol:'MAAF',       name:'Meezan Asset Allocation Fund',    units:95.1548,   avgNav:103.31, currentNav:114.02, investedValue:10000,  currentValue:10850,  type:'Balanced',    isShariah:true },
  { id:'m_mbf',       symbol:'MBF',        name:'Meezan Balanced Fund',            units:2118.7307, avgNav:26.23,  currentNav:27.89,  investedValue:93000,  currentValue:59098,  type:'Balanced',    isShariah:true },
  { id:'m_mdaaf',     symbol:'MDAAF-MDYP', name:'Meezan Dividend Yield Plan',      units:129.0669,  avgNav:76.17,  currentNav:88.89,  investedValue:10000,  currentValue:11472,  type:'Equity',      isShariah:true },
  { id:'m_mif',       symbol:'MIF',        name:'Meezan Islamic Fund',             units:812.9073,  avgNav:148.20, currentNav:165.16, investedValue:129000, currentValue:134263, type:'Equity Fund', isShariah:true },
  { id:'m_miif_b',    symbol:'MIIF-B',     name:'Meezan Islamic Income Fund (B)',  units:2384.5933, avgNav:54.00,  currentNav:55.98,  investedValue:397000, currentValue:133478, type:'Income Fund', isShariah:true },
  { id:'m_miif_mmka', symbol:'MIIF-MMKA',  name:'Meezan Islamic Income (MMKA)',    units:377.9407,  avgNav:52.32,  currentNav:55.98,  investedValue:20000,  currentValue:21155,  type:'Income Fund', isShariah:true },
];

const ADVISOR_RATINGS = {
  'MEBL':  { rating:'STRONG BUY', conviction:9, target:null, thesis:'Best bank in Pakistan. P/E 6.5, profit grew 20% last year. Should be your single largest stock position. Everything orbits around this.' },
  'PICT':  { rating:'BUY',        conviction:8, target:null, thesis:'Near-monopoly port terminal. Dollar-linked revenues. Build to 500+ shares over 12 months using monthly stock bucket.' },
  'PNSC':  { rating:'BUY',        conviction:8, target:null, thesis:'Dollar revenues, state-backed, 7.6% dividend yield. Position far too small. Double or triple over next quarter.' },
  'FFC':   { rating:'BUY',        conviction:7, target:629,  thesis:'Dividend yield 7.4%, analyst target PKR 629. Bought above current market — add more on dips.' },
  'LUCK':  { rating:'HOLD',       conviction:6, target:null, thesis:'Quality cement name. Largest position by value. Hold — no action needed.' },
  'OGDC':  { rating:'BUY',        conviction:7, target:null, thesis:'Deploy from MIIF reserves when KSE-100 drops 8-10%. Pair with PNSC for dollar + energy exposure.' },
  'PASM':  { rating:'SPECULATIVE',conviction:2, target:null, thesis:'Tip-based purchase. No fundamental thesis. Structurally weak textile. Monitor for exit when in profit.' },
  'SLGL':  { rating:'SPECULATIVE',conviction:2, target:null, thesis:'Tip-based purchase. Structurally weak textile company. Monitor for exit when in profit.' },
  'HINO':  { rating:'WEAK HOLD',  conviction:3, target:null, thesis:'Auto assembler facing EV disruption and weak demand cycle. No strong thesis. Hold for now.' },
  'PIBTL': { rating:'HOLD',       conviction:5, target:null, thesis:'Logistics infrastructure play. Sector is right. Position size acceptable.' },
  'SEARL': { rating:'WEAK HOLD',  conviction:3, target:null, thesis:'Pharma facing structural headwinds. Large position (930 shares) needs monitoring.' },
  'DGKC':  { rating:'HOLD',       conviction:5, target:null, thesis:'Cement sector exposure. DG Khan has cement + glass businesses.' },
  'HUBC':  { rating:'HOLD',       conviction:5, target:null, thesis:'Power sector. Long-term CPEC-linked revenues. Hold.' },
  'TRG':   { rating:'BUY',        conviction:7, target:null, thesis:'Pakistan technology export story. Dollar revenues from BPO. Long-term hold.' },
};

const SIP_PLAN = [
  { fund:'KMIF', amount:40000, color:'#FF6B35', note:'Foundation. Never stop. Index everything.' },
  { fund:'MIF',  amount:20000, color:'#0ECB81', note:'Active equity exposure via Meezan managers.' },
  { fund:'MIIF', amount:10000, color:'#1890FF', note:'Buffer at 16-18% yield. Convert to KMIF on 15%+ KSE drop.' },
  { fund:'STK',  amount:5000,  color:'#F0B90B', note:'Accumulate. Only deploy with full investment memo.' },
];

const WATCHLIST = [
  { symbol:'MEBL', name:'Meezan Bank',      thesis:'Add more — build to largest position', targetPrice:550, priority:'HIGH'   },
  { symbol:'PICT', name:'PICT',             thesis:'Build from 160 to 500+ shares',         targetPrice:45,  priority:'HIGH'   },
  { symbol:'PNSC', name:'Pakistan Shipping',thesis:'Double or triple position',             targetPrice:600, priority:'HIGH'   },
  { symbol:'OGDC', name:'OGDC',             thesis:'Buy on 8-10% KSE drop only',            targetPrice:300, priority:'MEDIUM' },
  { symbol:'TRG',  name:'TRG Pakistan',     thesis:'Tech/BPO story — add on dips',          targetPrice:75,  priority:'MEDIUM' },
];

window.RAFI_STOCKS = RAFI_STOCKS;
window.AKD_STOCKS = AKD_STOCKS;
window.MEEZAN_FUNDS = MEEZAN_FUNDS;
window.ADVISOR_RATINGS = ADVISOR_RATINGS;
window.SIP_PLAN = SIP_PLAN;
window.WATCHLIST = WATCHLIST;
