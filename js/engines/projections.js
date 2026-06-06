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
