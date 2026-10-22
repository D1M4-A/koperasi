(function (root, createData) {
  const data = createData();
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.KoperasiDashboardData = data;
})(globalThis, function () {
  const periods = {
    '2026-10': { values: ['1.248', 'Rp 2,84 M', 'Rp 1,26 M', 'Rp 186,5 jt'], trends: ['↗ 4,8%', '↗ 6,2%', '↘ 2,1%', '↗ 8,4%'] },
    '2026-09': { values: ['1.239', 'Rp 2,67 M', 'Rp 1,29 M', 'Rp 172,1 jt'], trends: ['↗ 4,1%', '↗ 5,9%', '↘ 1,8%', '↗ 7,8%'] },
    '2026-08': { values: ['1.226', 'Rp 2,52 M', 'Rp 1,31 M', 'Rp 158,8 jt'], trends: ['↗ 3,2%', '↗ 5,4%', '↘ 1,5%', '↗ 7,1%'] }
  };

  function getPeriodData(periodId) {
    const period = periods[periodId];
    return period ? { values: [...period.values], trends: [...period.trends] } : null;
  }

  function buildSummaryDescription(periodLabel, snapshotLabel) {
    return `Kartu KPI mengikuti periode ${periodLabel}. Grafik, komposisi, transaksi, dan CSV adalah snapshot data dummy ${snapshotLabel}.`;
  }

  return { getPeriodData, buildSummaryDescription };
});
