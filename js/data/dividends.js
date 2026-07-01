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
