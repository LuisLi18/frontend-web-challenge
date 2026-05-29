/**
 * Formatea el precio mensual del plan. La API devuelve número raw (sin moneda);
 * el Figma muestra "$X al mes". Mantenemos el símbolo `$` por fidelidad visual.
 */
export function formatMonthlyPrice(price: number): string {
  const value = Number.isInteger(price) ? price.toString() : price.toFixed(2);
  return `$${value} al mes`;
}

/** Muestra solo "$X" (sin la frase). Útil en lugares compactos. */
export function formatPrice(price: number): string {
  const value = Number.isInteger(price) ? price.toString() : price.toFixed(2);
  return `$${value}`;
}

/** Redondea a 2 decimales (para descuentos). */
export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Capitaliza la primera letra. Útil para el saludo "Rocío" del Plans. */
export function getFirstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? '';
}
