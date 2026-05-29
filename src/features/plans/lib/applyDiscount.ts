import { round2 } from '@/lib/formatters';
import type { Target } from '@/features/quote';
import type { Plan, QuotePlan } from '../types';

export const DISCOUNT_RATE = 0.05;

/**
 * Convierte un Plan crudo a QuotePlan con descuento aplicado si target = 'someone-else'.
 */
export function toQuotePlan(plan: Plan, target: Target): QuotePlan {
  const hasDiscount = target === 'someone-else';
  const finalPrice = hasDiscount ? round2(plan.price * (1 - DISCOUNT_RATE)) : plan.price;

  return {
    ...plan,
    originalPrice: plan.price,
    finalPrice,
    hasDiscount,
  };
}
