(function (root, createUtilities) {
  const utilities = createUtilities();
  if (typeof module === 'object' && module.exports) module.exports = utilities;
  else root.KoperasiCsv = utilities;
})(globalThis, function () {
  function normalizeIndonesianAmount(value) {
    const amount = value.trim().match(/^([+-]?)\s*(?:Rp\s*([+-]?)\s*)?(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?\s*(juta|jt|miliar|m)?$/i);
    if (!amount || (amount[1] && amount[2] && amount[1] !== amount[2])) return null;
    const sign = amount[1] === '-' || amount[2] === '-' ? '-' : '';
    const whole = amount[3].replace(/\./g, '');
    const fraction = amount[4] || '';
    const decimalScale = 10n ** BigInt(fraction.length);
    const suffix = amount[5]?.toLowerCase();
    const multiplier = suffix === 'jt' || suffix === 'juta' ? 1000000n : suffix === 'm' || suffix === 'miliar' ? 1000000000n : 1n;
    const scaledAmount = (BigInt(whole) * decimalScale + BigInt(fraction || '0')) * multiplier;
    const digits = scaledAmount.toString().padStart(fraction.length + 1, '0');
    const integerPart = fraction ? digits.slice(0, -fraction.length) : digits;
    const decimalPart = fraction ? digits.slice(-fraction.length).replace(/0+$/, '') : '';
    return `${sign}${integerPart}${decimalPart ? `.${decimalPart}` : ''}`;
  }

  function escapeCsvCell(value) {
    const cell = String(value);
    if (/^-?\d+(?:\.\d+)?$/.test(cell)) return cell;
    const safeCell = /^[\t\r]/.test(cell) || /^[\t\r\n ]*[=+\-@]/.test(cell) ? `'${cell}` : cell;
    return `"${safeCell.replaceAll('"', '""')}"`;
  }

  return { normalizeIndonesianAmount, escapeCsvCell };
});
