import { describe, expect, it } from 'vitest';
import { calcAge } from './age';

describe('calcAge', () => {
  it('calcula edad cuando el cumpleaños ya pasó este año', () => {
    expect(calcAge('02-04-1990', new Date(2026, 4, 28))).toBe(36);
  });

  it('calcula edad cuando el cumpleaños aún no llega este año', () => {
    expect(calcAge('02-04-1990', new Date(2026, 2, 31))).toBe(35);
  });

  it('día exacto del cumpleaños suma el año', () => {
    expect(calcAge('02-04-1990', new Date(2026, 3, 2))).toBe(36);
  });

  it('lanza error si el formato es inválido', () => {
    expect(() => calcAge('1990-04-02')).toThrow();
    expect(() => calcAge('foo')).toThrow();
  });
});
