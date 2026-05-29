import { useEffect, useRef, useState } from 'react';
import { getPlans } from '../api/getPlans';
import type { Plan } from '../types';

interface UsePlansResult {
  data: Plan[] | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Carga los planes solo si `enabled` es true. Diseñado para llamarse DESPUÉS
 * de tener el user (regla de negocio del reto).
 *
 * Dedupe via `inFlightRef`: React 18 StrictMode monta los efectos 2 veces en
 * dev. Como `useRef` persiste entre el dummy unmount/remount, el segundo
 * effect ve `inFlightRef.current === true` y sale temprano. La fetch original
 * completa y actualiza el state normalmente.
 *
 * En unmount real (navegar fuera), React 18 ignora silenciosamente los
 * setState post-unmount — no hace falta cancelar.
 */
export function usePlans(enabled: boolean): UsePlansResult {
  const [data, setData] = useState<Plan[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      inFlightRef.current = false;
      return;
    }
    if (inFlightRef.current) return;
    inFlightRef.current = true;

    setLoading(true);
    setError(null);

    getPlans()
      .then((plans) => setData(plans))
      .catch((err: unknown) => {
        inFlightRef.current = false; // permite reintento si hubo error
        setError(err instanceof Error ? err : new Error('Error al obtener planes'));
      })
      .finally(() => setLoading(false));
  }, [enabled]);

  return { data, loading, error };
}
