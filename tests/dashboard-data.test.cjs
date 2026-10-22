const assert = require('node:assert/strict');
const test = require('node:test');
const { buildSummaryDescription, getPeriodData } = require('../dashboard-data.js');

test('returns selected-period KPI values and trends', () => {
  assert.deepEqual(getPeriodData('2026-09'), {
    values: ['1.239', 'Rp 2,67 M', 'Rp 1,29 M', 'Rp 172,1 jt'],
    trends: ['↗ 4,1%', '↗ 5,9%', '↘ 1,8%', '↗ 7,8%']
  });
  assert.equal(getPeriodData('2026-07'), null);
});

test('distinguishes selected KPI period from the fixed snapshot', () => {
  assert.equal(
    buildSummaryDescription('September 2026', 'Oktober 2026'),
    'Kartu KPI mengikuti periode September 2026. Grafik, komposisi, transaksi, dan CSV adalah snapshot data dummy Oktober 2026.'
  );
});
