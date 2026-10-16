/* LedgerCap DEFERRED — 50 modules — idle-loaded after Home */
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
  let _meta = { source: 'empty', asOf: null };

  function getMeta() {
    return { source: _meta.source, asOf: _meta.asOf, count: _cache.rows.length };
  }

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

  function _hasPricedQuote(row) {
    return row && Number(row.price) > 0;
  }

  async function fetchAll() {
    if (_cache.rows.length && Date.now() - _cache.ts < CACHE_MS && _meta.source === 'live') {
      return _cache.rows;
    }
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
        // Honest: only show PKR gold when we have a live/derived quote or an explicit source — never invent ₨18000 as spot.
        if (goldAuto) {
          rows.push({
            ...c,
            price: goldAuto.price,
            changePct: goldAuto.changePct || 0,
            pkr: goldAuto.price,
            label: goldAuto.label || 'Spot-derived',
            manual: false,
          });
        } else if (settings.goldPriceSource && settings.goldPricePerGram > 0) {
          rows.push({
            ...c,
            price: settings.goldPricePerGram,
            changePct: 0,
            pkr: settings.goldPricePerGram,
            label: settings.goldPriceSource === 'Yahoo GC=F' ? 'Settings · last auto' : 'Settings · manual',
            manual: true,
          });
        }
        continue;
      }
      const snap = c.snapId ? _fromSnapshot(c.snapId) : null;
      if (snap && _hasPricedQuote(snap)) {
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
      if (q && _hasPricedQuote(q)) {
        rows.push({
          ...c,
          price: q.price,
          change: q.change || 0,
          changePct: q.changePct || 0,
          pkr: q.price * usd,
          label: 'Yahoo spot',
        });
      }
      // No zero-price placeholders — unavailable symbols stay out of the list.
    }

    if (rows.length) {
      _cache = { ts: Date.now(), rows };
      _meta = { source: 'live', asOf: _cache.ts };
      return rows;
    }
    if (_cache.rows.length) {
      _meta = { source: 'last-known', asOf: _cache.ts };
      return _cache.rows;
    }
    _meta = { source: 'empty', asOf: null };
    return [];
  }

  return { fetchAll, getMeta };
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
      const okReplace = await CapConfirm({
        title: 'Replace local ledger?',
        body: 'Replace local ledger with cloud backup? Export first if unsure.',
        confirmLabel: 'Replace',
        destructive: true,
      });
      if (!okReplace) {
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
<style>body{font-family:system-ui,sans-serif;padding:24px;color:${LCBrand.h_111};max-width:800px;margin:0 auto}
h1{font-size:1.25rem}table{width:100%;border-collapse:collapse;font-size:12px;margin-top:16px}
th,td{border:1px solid #ddd;padding:6px 8px;text-align:left}th{background:${LCBrand.h_f4f4f5}}
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
<p style="font-size:11px;color:${LCBrand.h_666};margin-top:24px">Not tax advice. For Zakat use in-app Zakat module.</p>
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
<style>body{font-family:system-ui,sans-serif;padding:24px;color:${LCBrand.h_111};max-width:800px;margin:0 auto}
h1{font-size:1.25rem}table{width:100%;border-collapse:collapse;font-size:12px;margin-top:16px}
th,td{border:1px solid #ddd;padding:6px 8px;text-align:left}th{background:${LCBrand.h_f4f4f5}}
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
<p style="font-size:11px;color:${LCBrand.h_666};margin-top:24px">Print or Save as PDF from browser. Not tax advice.</p>
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
          <div class="lc-dash-market-card" role="status">
            <span>KSE-100</span>
            <strong>${k.value ? PsxUI.fmtIndex(k.value) : '—'}</strong>
            <em class="${k.cls}">${k.changeP != null ? sign + Number(k.changeP).toFixed(2) + '%' : '—'}</em>
          </div>
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
      return `<button type="button" class="lc-search-hit${s === _symbol ? ' on' : ''}" onmousedown="event.preventDefault();Research.pickSymbol('${esc(s)}')">
        <strong>${esc(s)}</strong><span>${esc(name)}</span>
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
      const msg = '<p class="psx-muted lc-card-sub">No history available for this symbol right now.</p>';
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
      ${Charts.lineChart(slice, { height: 120, color: up ? 'var(--psx-up)' : 'var(--psx-down)', ariaLabel: `${_histSymbol} price history ${_histRange}` })}`;
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
        <div class="lc-disclaimer">LedgerCap is for tracking and education. Prices may be delayed or indicative. Nothing here is investment advice.</div>
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
    <div class="field"><label class="field-label">Symbol</label><input class="field-input" id="wl-symbol" value="${esc(w.symbol || '')}"></div>
    <div class="field"><label class="field-label">Name</label><input class="field-input" id="wl-name" value="${esc(w.name || '')}"></div>
    <div class="field"><label class="field-label">Thesis</label><textarea class="field-input" id="wl-thesis" rows="3">${esc(w.thesis || '')}</textarea></div>
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
        <div class="rt-wl-card-main" data-action="Research.open" data-symbol="${esc(w.symbol)}">
          <div class="rt-wl-head">
            <strong>${esc(w.symbol)}</strong>
            ${U.ratingBadge(ai.action)}
            ${alertHit ? '<span class="lc-alert-badge">Target hit</span>' : ''}
          </div>
          <div class="lc-card-sub">${esc(w.name)}${w.thesis ? ' · ' + esc(w.thesis.slice(0, 50)) : ''}</div>
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
          <td><strong>${u.symbol}</strong><div style="font-size: 0.6875rem;color:var(--os-text-tertiary)">${u.companyName || ''}</div></td>
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
          <td><strong>${h.symbol}</strong><div style="font-size: 0.6875rem;color:var(--os-text-tertiary)">${h.sector}</div></td>
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
          <td><strong>${u.symbol}</strong><div style="font-size: 0.6875rem;color:var(--os-text-tertiary)">${u.companyName || ''}</div></td>
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
            <div><strong>${e.symbol}</strong> · ${e.paymentDate}<div style="font-size: 0.6875rem;color:var(--os-text-tertiary)">₨${e.amountPerShare}/sh${e.isHeld ? ' · ' + e.shares + ' shares' : ''}</div></div>
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
          <td><strong>${h.symbol}</strong><div style="font-size: 0.6875rem;color:var(--os-text-tertiary)">${h.companyName}</div></td>
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
        <button type="button" class="btn-ghost btn-sm" data-action="WealthCalendar.setMonth" data-tab="${prevKey}" aria-label="Previous month">←</button>
        <strong>${label}</strong>
        <button type="button" class="btn-ghost btn-sm" data-action="WealthCalendar.setMonth" data-tab="${nextKey}" aria-label="Next month">→</button>
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
      ? '<span class="badge badge-cdc" style="font-size: 0.6875rem;margin-left:4px;">LISTED · CDC</span>'
      : '<span class="badge" style="font-size: 0.6875rem;margin-left:4px;background:rgba(240,185,11,0.12);color:var(--gold);">PENDING</span>';
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
          <span class="badge" style="font-size:11px;opacity:.8">${s.book === 'swing' ? 'Swing' : 'Core'}</span>
          <span class="badge ${_actionClass(s.action)}" style="font-size:11px;font-weight:700">${s.action}</span>
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
          <span class="badge" style="font-size:11px">${s.kind}</span>
          <span class="badge" style="font-size:11px;opacity:.8">${s.book === 'swing' ? 'Swing' : 'Core'}</span>
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
          <span class="badge t-gain" style="font-size:11px;font-weight:700">${r.action}</span>
          <span class="badge" style="font-size:11px;opacity:.75">${src}</span>
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

      <div class="lc-disclaimer">LedgerCap is for tracking and education. Prices may be delayed or indicative. Nothing here is investment advice.</div>
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
      <div class="lc-disclaimer">LedgerCap is for tracking and education. Prices may be delayed or indicative. Nothing here is investment advice.</div>
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
            <span class="badge" style="font-size:11px;text-transform:uppercase">${f.severity} · ${f.category}</span>
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
            <div class="perf-item-date">${d.date}${d.realised ? `<div style="font-size: 0.6875rem;color:var(--text3);">Realised ${d.realised >= 0 ? '+' : ''}${PlatformUI.fmt(d.realised)}</div>` : ''}</div>
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
            <div class="perf-item-date">${m.month}${m.realised ? `<div style="font-size: 0.6875rem;color:var(--text3);">Realised ${m.realised >= 0 ? '+' : ''}${PlatformUI.fmt(m.realised)}</div>` : ''}</div>
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
      document.getElementById('predictive-chart').innerHTML = Charts.lineChart ? Charts.lineChart(projections, { height: 160, color: LCBrand.h_10b981 }) : '';
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

  async function remove(id) {
    const ok = await CapConfirm({ title: 'Delete this journal entry?', confirmLabel: 'Delete', destructive: true });
    if (!ok) return;
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
            <div style="font-weight:700;font-size:1rem;">${esc(e.title || 'Untitled')}</div>
            <div style="font-size:0.72rem;color:var(--os-text-tertiary);margin-top:4px;">${esc(e.date || '')}${e.symbol ? ' · ' + esc(e.symbol) : ''}</div>
          </div>
          <button type="button" class="os-btn os-btn-ghost" style="padding:4px 8px;font-size:0.7rem;" data-action="Journal.remove" data-tab="${e.id}" data-stop="1">Delete</button>
        </div>
        ${e.body ? `<p style="font-size:0.85rem;color:var(--os-text-secondary);margin:10px 0 0;line-height:1.5;">${esc(e.body.slice(0, 160))}${e.body.length > 160 ? '…' : ''}</p>` : ''}
        ${e.review ? `<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--os-border);font-size:0.8rem;color:var(--os-gain);">Review: ${esc(e.review.slice(0, 100))}${e.review.length > 100 ? '…' : ''}</div>` : ''}
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

  async function calc(kind) {
    const prompts = {
      cagr: [['Principal ₨', 'principal', 100000], ['Final value ₨', 'final_value', 250000], ['Years', 'years', 5]],
      position_size: [['Risk ₨', 'risk_pkr', 10000], ['Stop loss %', 'stop_loss_pct', 5], ['Price ₨', 'price', 500]],
      sip_future: [['Monthly ₨', 'monthly', 50000], ['Rate %', 'rate_pct', 14], ['Years', 'years', 10]],
    };
    const fields = prompts[kind] || [];
    const input = {};
    for (const [label, key, def] of fields) {
      const v = await CapPrompt({ title: label, value: String(def), confirmLabel: 'Next' });
      if (v === null) return;
      input[key] = parseFloat(v) || 0;
    }
    const r = PilotEngine.calculator(kind, input);
    const el = document.getElementById('calc-result');
    if (el) el.innerHTML = `<strong>${esc(r.label)}:</strong> ${typeof r.result === 'number' ? r.result.toLocaleString(undefined, { maximumFractionDigits: 2 }) : esc(r.result)}<br>${esc(r.detail)}`;
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

  async function addIpo() {
    const company = await CapPrompt({ title: 'Company name', confirmLabel: 'Next' });
    if (!company) return;
    const symbol = (await CapPrompt({ title: 'Symbol (optional)', confirmLabel: 'Next' })) || '';
    const end = (await CapPrompt({ title: 'Subscription end (YYYY-MM-DD)', confirmLabel: 'Add' })) || '';
    State.update(s => {
      if (!s.ipoEvents) s.ipoEvents = [];
      s.ipoEvents.push({ id: 'ipo_' + Date.now(), company, symbol: String(symbol).toUpperCase(), subscription_end: end || null, listing_date: null, notes: '' });
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

  async function addCash(type) {
    const amount = parseFloat(await CapPrompt({
      title: type === 'deposit' ? 'Deposit amount ₨' : 'Withdraw amount ₨',
      value: '0',
      confirmLabel: 'Save',
    }));
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

  async function resetLedger() {
    const ok = await CapConfirm({ title: 'Reset paper ledger?', body: 'Clears all simulated trades.', confirmLabel: 'Reset', destructive: true });
    if (!ok) return;
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
  let _attempted = false;

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

  function _offlineEmptyHtml() {
    const online = typeof navigator === 'undefined' || navigator.onLine !== false;
    const body = online
      ? 'Commodity spot prices need a network connection to the price Worker. The Worker is unavailable right now — no last-known quotes on this device.'
      : 'You appear offline. Commodity prices need network access to the price Worker — no last-known quotes on this device.';
    return `<div class="lc-empty-state" role="status" aria-live="polite">
      <div class="lc-empty-icon" aria-hidden="true">◇</div>
      <h2>Spot prices unavailable</h2>
      <p>${body}</p>
    </div>`;
  }

  function _staleBannerHtml() {
    const meta = typeof CommoditiesService !== 'undefined' && CommoditiesService.getMeta
      ? CommoditiesService.getMeta()
      : {};
    const when = meta.asOf
      ? new Date(meta.asOf).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' })
      : '';
    return `<div class="lc-cmd-stale" role="status" aria-live="polite">
      <p class="lc-cmd-stale-msg">Showing last-known prices${when ? ` · as of ${when}` : ''}. Live quotes need the price Worker — tap Refresh when network is available.</p>
    </div>`;
  }

  function _listInner() {
    if (_loading && !_rows.length) {
      return `<div role="status" aria-busy="true" aria-label="Loading commodities"><p class="psx-muted">Loading commodities…</p></div>`;
    }
    if (!_rows.length) {
      return _offlineEmptyHtml();
    }
    const meta = typeof CommoditiesService !== 'undefined' && CommoditiesService.getMeta
      ? CommoditiesService.getMeta()
      : { source: 'live' };
    const banner = meta.source === 'last-known' ? _staleBannerHtml() : '';
    return `${banner}${_rows.map(_rowHtml).join('')}`;
  }

  function _goldPillLabel() {
    const settings = (typeof State !== 'undefined' ? State.get('settings') : null) || {};
    const pkrRow = _rows.find((r) => r.id === 'pkr_gold' || r.id === 'gold_24k');
    if (pkrRow?.price > 0) return `${PsxUI.fmt(pkrRow.price)}/g`;
    if (settings.goldPriceSource && settings.goldPricePerGram > 0) {
      return `${PsxUI.fmt(settings.goldPricePerGram)}/g`;
    }
    return '—';
  }

  async function refresh() {
    if (_loading) return;
    _loading = true;
    _attempted = true;
    const list = document.getElementById('commodities-list');
    if (list && !_rows.length) {
      list.innerHTML = `<div role="status" aria-busy="true" aria-label="Refreshing spot prices"><p class="psx-muted">Refreshing spot prices…</p></div>`;
    }
    _rows = await CommoditiesService.fetchAll();
    _loading = false;
    render();
  }

  function render() {
    const screen = document.getElementById('screen-commodities');
    if (!screen) return;
    const usd = FxService.getUsdRate();
    const meta = typeof CommoditiesService !== 'undefined' && CommoditiesService.getMeta
      ? CommoditiesService.getMeta()
      : { source: _rows.length ? 'live' : 'empty' };
    const sub = meta.source === 'last-known'
      ? 'Last-known quotes · Worker unavailable'
      : meta.source === 'empty' && _attempted
        ? 'Prices need network · Worker unavailable'
        : `Gold · silver · oil · USD/PKR ₨${usd.toLocaleString('en-PK', { maximumFractionDigits: 2 })}`;

    screen.innerHTML = PsxUI.lcDash('Commodities', sub, `
      <div class="lc-pulse-row">
        <div class="lc-pulse-pill"><label>USD/PKR</label><b>₨${usd.toLocaleString('en-PK', { maximumFractionDigits: 2 })}</b></div>
        <div class="lc-pulse-pill"><label>PKR gold</label><b>${_goldPillLabel()}</b></div>
      </div>
      <p class="lc-card-sub">Spot from market snapshot (Yahoo futures + derived PKR karats + OGRA). Indicative — not jeweller or pump board prices.</p>
      <div class="lc-sector-card" id="commodities-list">${_listInner()}</div>
      <div class="lc-dash-actions">
        <button type="button" class="psx-btn psx-btn-primary" data-action="Commodities.refresh">Refresh</button>
        <button type="button" class="psx-btn psx-btn-ghost" data-nav="zakat">Zakat calculator →</button>
      </div>
      <div class="lc-disclaimer">Illustrative spot prices — not a trading feed. Verify before zakat or hedging decisions.</div>
    `);

    if (!_attempted && !_loading) refresh();
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
    const opts = custom.map(p => `<option value="${esc(p.id)}">${esc(p.name)}</option>`).join('');
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
      ${_pending.slice(0, 20).map((t) => `<tr><td>${esc(t.date)}</td><td>${esc(t.symbol)}</td><td>${esc(t.type)}</td><td>${esc(t.shares ?? t.qty ?? '')}</td><td>${esc(t.price ?? t.priceUsd ?? '')}</td><td>${esc(t.broker || '')}</td></tr>`).join('')}
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
