'use strict';

const INITIAL_HOLDINGS = {
  rafi: [
    { id:'r_atrl',   symbol:'ATRL',   name:'Attock Refinery',               shares:0,    avgCost:0,      broker:'Rafi',   sector:'Energy',       isShariah:false },
    { id:'r_cphl',   symbol:'CPHL',   name:'Cherat Packaging',              shares:0,    avgCost:0,      broker:'Rafi',   sector:'Packaging',    isShariah:true  },
    { id:'r_dgkc',   symbol:'DGKC',   name:'DG Khan Cement',                shares:0,    avgCost:0,      broker:'Rafi',   sector:'Cement',       isShariah:true  },
    { id:'r_efert',  symbol:'EFERT',  name:'Engro Fertilizers',             shares:0,    avgCost:0,      broker:'Rafi',   sector:'Fertilizer',   isShariah:false },
    { id:'r_engroh', symbol:'ENGROH', name:'Engro Holdings',                shares:0,    avgCost:0,      broker:'Rafi',   sector:'Conglomerate', isShariah:false },
    { id:'r_ffl',    symbol:'FFL',    name:'Fauji Fertilizer Bin Qasim',    shares:0,    avgCost:0,      broker:'Rafi',   sector:'Fertilizer',   isShariah:false },
    { id:'r_ffc',    symbol:'FFC',    name:'Fauji Fertilizer Company',      shares:0,    avgCost:0,      broker:'Rafi',   sector:'Fertilizer',   isShariah:false },
    { id:'r_hubc',   symbol:'HUBC',   name:'Hub Power Company',             shares:0,    avgCost:0,      broker:'Rafi',   sector:'Power',        isShariah:false },
    { id:'r_luck',   symbol:'LUCK',   name:'Lucky Cement',                  shares:275,  avgCost:428.68, broker:'Rafi',   sector:'Cement',       isShariah:true  },
    { id:'r_mari',   symbol:'MARI',   name:'Mari Petroleum',                shares:0,    avgCost:0,      broker:'Rafi',   sector:'Oil & Gas',    isShariah:false },
    { id:'r_mebl',   symbol:'MEBL',   name:'Meezan Bank',                   shares:100,  avgCost:0,      broker:'Rafi',   sector:'Banking',      isShariah:true  },
    { id:'r_miietf', symbol:'MIIETF', name:'Meezan Islamic Income ETF',     shares:0,    avgCost:0,      broker:'Rafi',   sector:'ETF',          isShariah:true  },
    { id:'r_mlcf',   symbol:'MLCF',   name:'Maple Leaf Cement',             shares:0,    avgCost:0,      broker:'Rafi',   sector:'Cement',       isShariah:true  },
    { id:'r_nrl',    symbol:'NRL',    name:'National Refinery',             shares:0,    avgCost:0,      broker:'Rafi',   sector:'Energy',       isShariah:false },
    { id:'r_ptc',    symbol:'PTC',    name:'Pakistan Telecommunication',    shares:0,    avgCost:0,      broker:'Rafi',   sector:'Telecom',      isShariah:false },
    { id:'r_pso',    symbol:'PSO',    name:'Pakistan State Oil',            shares:0,    avgCost:0,      broker:'Rafi',   sector:'Energy',       isShariah:false },
    { id:'r_searl',  symbol:'SEARL',  name:'Searle Pakistan',               shares:0,    avgCost:0,      broker:'Rafi',   sector:'Pharma',       isShariah:true  },
    { id:'r_ssgc',   symbol:'SSGC',   name:'Sui Southern Gas',              shares:0,    avgCost:0,      broker:'Rafi',   sector:'Gas',          isShariah:false },
    { id:'r_trg',    symbol:'TRG',    name:'TRG Pakistan',                  shares:0,    avgCost:0,      broker:'Rafi',   sector:'Technology',   isShariah:true  },
    { id:'r_ogdc',   symbol:'OGDC',   name:'Oil & Gas Dev Co',              shares:0,    avgCost:0,      broker:'Rafi',   sector:'Oil & Gas',    isShariah:false },
  ],
  akd: [
    { id:'a_ffc',   symbol:'FFC',   name:'Fauji Fertilizer Company',        shares:20,   avgCost:560.92, broker:'AKD',    sector:'Fertilizer',  isShariah:false },
    { id:'a_hino',  symbol:'HINO',  name:'Hino Pak Motors',                 shares:20,   avgCost:360.63, broker:'AKD',    sector:'Auto',        isShariah:false },
    { id:'a_luck',  symbol:'LUCK',  name:'Lucky Cement',                    shares:50,   avgCost:435.76, broker:'AKD',    sector:'Cement',      isShariah:true  },
    { id:'a_pibtl', symbol:'PIBTL', name:'Pakistan Int\'l Bulk Terminal',   shares:520,  avgCost:17.43,  broker:'AKD',    sector:'Logistics',   isShariah:true  },
    { id:'a_pict',  symbol:'PICT',  name:'Pakistan Int\'l Container Terminal', shares:160, avgCost:38.54, broker:'AKD',   sector:'Logistics',   isShariah:true  },
    { id:'a_pnsc',  symbol:'PNSC',  name:'Pakistan National Shipping',      shares:25,   avgCost:510.87, broker:'AKD',    sector:'Shipping',    isShariah:true  },
    { id:'a_slgl',  symbol:'SLGL',  name:'Sind Leasing Company',            shares:200,  avgCost:15.94,  broker:'AKD',    sector:'Textile',     isShariah:false },
    { id:'a_pasm',  symbol:'PASM',  name:'Pakistan Synthetics',             shares:1554, avgCost:8.47,   broker:'AKD',    sector:'Textile',     isShariah:false },
  ],
  meezan: [
    { id:'m_kmif',    symbol:'KMIF',    name:'KSE Meezan Index Fund',         units:0,    avgNav:0, broker:'Meezan', type:'Equity Fund',  isShariah:true },
    { id:'m_mif',     symbol:'MIF',     name:'Meezan Islamic Fund',           units:0,    avgNav:0, broker:'Meezan', type:'Equity Fund',  isShariah:true },
    { id:'m_miif',    symbol:'MIIF',    name:'Meezan Islamic Income Fund',    units:0,    avgNav:0, broker:'Meezan', type:'Income Fund',  isShariah:true },
    { id:'m_mznpetf', symbol:'MZNPETF', name:'Meezan Petroleum ETF',         units:3000, avgNav:0, broker:'Meezan', type:'ETF',          isShariah:true },
    { id:'m_mznketf', symbol:'MZNKETF', name:'Meezan KSE ETF',               units:0,    avgNav:0, broker:'Meezan', type:'ETF',          isShariah:true },
    { id:'m_mab',     symbol:'MAB',     name:'Meezan Asset Builder',          units:0,    avgNav:0, broker:'Meezan', type:'Hybrid Fund',  isShariah:true },
  ]
};

const ADVISOR_RATINGS = {
  'MEBL':  { rating:'STRONG BUY', conviction:9, target:null, thesis:'Best bank in Pakistan. P/E 6.5, 20% profit growth. Should be largest single stock position.' },
  'PICT':  { rating:'BUY',        conviction:8, target:null, thesis:'Near-monopoly port terminal. Dollar-linked revenues. Build to 500+ shares over 12 months.' },
  'PNSC':  { rating:'BUY',        conviction:8, target:null, thesis:'Dollar revenues, state-backed, 7.6% dividend. Position too small — double or triple it.' },
  'FFC':   { rating:'BUY',        conviction:7, target:629,  thesis:'Dividend yield 7.4%, analyst target PKR 629. Bought above market — add on dips.' },
  'LUCK':  { rating:'HOLD',       conviction:6, target:null, thesis:'Quality cement name. Hold, no action needed.' },
  'OGDC':  { rating:'BUY',        conviction:7, target:null, thesis:'Deploy from MIIF reserves when KSE drops 8-10%.' },
  'PASM':  { rating:'SPECULATIVE',conviction:2, target:null, thesis:'Tip-based buy. No fundamental thesis. Monitor for exit.' },
  'SLGL':  { rating:'SPECULATIVE',conviction:2, target:null, thesis:'Tip-based buy. Structurally weak textile. Monitor for exit.' },
  'HINO':  { rating:'WEAK HOLD',  conviction:3, target:null, thesis:'Auto assembler facing EV disruption. No strong thesis.' },
  'PIBTL': { rating:'HOLD',       conviction:5, target:null, thesis:'Logistics infrastructure. Speculative but sector is right.' },
};

const SIP_PLAN = [
  { fund:'KMIF',  amount:40000, label:'KSE Meezan Index Fund',    note:'Foundation. Never stop.', color:'#FF6B35' },
  { fund:'MIF',   amount:20000, label:'Meezan Islamic Fund',      note:'Active equity exposure.',  color:'#0A84FF' },
  { fund:'MIIF',  amount:10000, label:'Meezan Islamic Income Fund',note:'Buffer. Convert to KMIF on 15%+ market drop.', color:'#30D158' },
  { fund:'Stocks',amount:5000,  label:'Stock Bucket',             note:'Accumulate. Deploy only with full memo.', color:'#FFD60A' },
];

const ADVISOR_RULES = [
  'No investment without a written memo. If you can\'t write the thesis, you can\'t buy.',
  'SIP is sacred — ₨75,000/month, every month, no exceptions.',
  'No tips. Not from friends, not from AI signals, not from Twitter.',
  'MEBL should be your largest single stock position. P/E 6.5 is a gift.',
  'PICT: build to 500+ shares. Dollar-linked port terminal is a 5-year hold.',
  'MIIF is your dry powder. When KSE drops 15%+, convert to KMIF immediately.',
  'PASM and SLGL are mistakes. Monitor for exit, not accumulation.',
  'OGDC: deploy from reserves only when KSE drops 8-10%. Be patient.',
  'Dividend yield is income, not a bonus. Reinvest it.',
  'Your edge is patience. Pakistani retail investors panic. You don\'t.',
];

window.INITIAL_HOLDINGS = INITIAL_HOLDINGS;
window.ADVISOR_RATINGS = ADVISOR_RATINGS;
window.SIP_PLAN = SIP_PLAN;
window.ADVISOR_RULES = ADVISOR_RULES;
