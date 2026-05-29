import type { Plan } from '../types';

/**
 * Mantiene solo los planes donde la edad del usuario es ≤ a la edad MÁXIMA del plan.
 * Ejemplo: usuario 36 años, plan.age 30 → excluido. plan.age 60 → incluido.
 */
export function filterByAge(plans: Plan[], userAge: number): Plan[] {
  return plans.filter((plan) => userAge <= plan.age);
}
