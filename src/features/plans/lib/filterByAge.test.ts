import { describe, expect, it } from 'vitest';
import { filterByAge } from './filterByAge';
import type { Plan } from '../types';

const plan = (name: string, age: number): Plan => ({
  name,
  age,
  price: 1,
  description: [],
});

describe('filterByAge', () => {
  it('mantiene planes cuya edad máxima >= edad del usuario', () => {
    const result = filterByAge(
      [plan('A', 60), plan('B', 25), plan('C', 36)],
      36,
    );
    expect(result.map((p) => p.name)).toEqual(['A', 'C']);
  });

  it('inclusivo en el límite exacto', () => {
    const result = filterByAge([plan('A', 25)], 25);
    expect(result).toHaveLength(1);
  });

  it('replica el caso real del reto (Rocío 36 años)', () => {
    const plans = [
      plan('Plan en Casa', 60),
      plan('Plan en Casa y Clínica', 70),
      plan('Plan en Casa + Bienestar', 25),
      plan('Plan en Casa + Chequeo', 90),
      plan('Plan en Casa + Fitness', 30),
    ];
    const visible = filterByAge(plans, 36).map((p) => p.name);
    expect(visible).toEqual([
      'Plan en Casa',
      'Plan en Casa y Clínica',
      'Plan en Casa + Chequeo',
    ]);
  });
});
