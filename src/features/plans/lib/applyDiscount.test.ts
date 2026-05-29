import { describe, expect, it } from 'vitest';
import { toQuotePlan } from './applyDiscount';
import type { Plan } from '../types';

const base: Plan = {
  name: 'Plan en Casa y Clínica',
  price: 99,
  description: [],
  age: 70,
};

describe('toQuotePlan', () => {
  it('sin descuento cuando target = self', () => {
    const result = toQuotePlan(base, 'self');
    expect(result.hasDiscount).toBe(false);
    expect(result.finalPrice).toBe(99);
    expect(result.originalPrice).toBe(99);
  });

  it('aplica 5% de descuento cuando target = someone-else', () => {
    const result = toQuotePlan(base, 'someone-else');
    expect(result.hasDiscount).toBe(true);
    expect(result.finalPrice).toBe(94.05);
    expect(result.originalPrice).toBe(99);
  });

  it('replica los precios exactos del Figma', () => {
    expect(toQuotePlan({ ...base, price: 39 }, 'someone-else').finalPrice).toBe(37.05);
    expect(toQuotePlan({ ...base, price: 99 }, 'someone-else').finalPrice).toBe(94.05);
    expect(toQuotePlan({ ...base, price: 49 }, 'someone-else').finalPrice).toBe(46.55);
  });
});
