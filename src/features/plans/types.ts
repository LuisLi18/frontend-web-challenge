/** Plan crudo desde /plans.json */
export interface Plan {
  name: string;
  /** Precio mensual raw (sin moneda). */
  price: number;
  description: string[];
  /** Edad MÁXIMA permitida del usuario para este plan. */
  age: number;
}

export interface PlansApi {
  list: Plan[];
}

/** Plan derivado para UI, con descuento aplicado (o no). */
export interface QuotePlan extends Plan {
  originalPrice: number;
  finalPrice: number;
  hasDiscount: boolean;
}
