import { describe, expect, it } from 'vitest';
import { formatMonthlyPrice, formatPrice, getFirstName, round2 } from './formatters';

describe('formatters', () => {
  it('formatMonthlyPrice: enteros sin decimales', () => {
    expect(formatMonthlyPrice(99)).toBe('$99 al mes');
  });

  it('formatMonthlyPrice: decimales con 2 dígitos', () => {
    expect(formatMonthlyPrice(94.05)).toBe('$94.05 al mes');
    expect(formatMonthlyPrice(46.55)).toBe('$46.55 al mes');
  });

  it('formatPrice: solo el monto', () => {
    expect(formatPrice(39)).toBe('$39');
    expect(formatPrice(37.05)).toBe('$37.05');
  });

  it('round2 redondea a 2 decimales', () => {
    expect(round2(99 * 0.95)).toBe(94.05);
    expect(round2(0.1 + 0.2)).toBe(0.3);
  });

  it('getFirstName extrae el primer nombre', () => {
    expect(getFirstName('Rocío Miranda Díaz')).toBe('Rocío');
    expect(getFirstName('  Luis  Li  ')).toBe('Luis');
  });
});
