const assert = require('node:assert/strict');
const test = require('node:test');
const { escapeCsvCell, normalizeIndonesianAmount } = require('../dashboard-export.js');

test('normalizes Indonesian currency with exact decimal and suffix scaling', () => {
  assert.equal(normalizeIndonesianAmount('+ Rp 1.500,50'), '1500.5');
  assert.equal(normalizeIndonesianAmount('Rp - 1.250,50'), '-1250.5');
  assert.equal(normalizeIndonesianAmount('Rp 1,16 M'), '1160000000');
  assert.equal(normalizeIndonesianAmount('Rp 1,5 jt'), '1500000');
});

test('rejects unknown or conflicting currency formats', () => {
  assert.equal(normalizeIndonesianAmount('Rp 1,5 ribu'), null);
  assert.equal(normalizeIndonesianAmount('+ Rp -500'), null);
});

test('neutralizes formula prefixes and standalone control characters', () => {
  for (const value of ['=SUM(A1)', '+SUM(A1)', '-SUM(A1)', '@SUM(A1)', '\t', '\r', '\t=1+1', '\r=1+1']) {
    assert.equal(escapeCsvCell(value), `"\'${value}"`);
  }
});

test('preserves numeric cells and quotes embedded CSV quotes', () => {
  assert.equal(escapeCsvCell('-1250.5'), '-1250.5');
  assert.equal(escapeCsvCell('Member says "hello"'), '"Member says ""hello"""');
});
