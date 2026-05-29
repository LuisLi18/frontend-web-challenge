import { useCallback, useState } from 'react';
import { getUser } from '../api/getUser';
import type { UserApi } from '../types';

interface UseUserResult {
  fetchUser: () => Promise<UserApi>;
  data: UserApi | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook imperativo: dispara fetch al llamar `fetchUser()`.
 * Pensado para el submit del form del Landing — NO auto-ejecuta.
 */
export function useUser(): UseUserResult {
  const [data, setData] = useState<UserApi | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await getUser();
      setData(user);
      return user;
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Error al obtener usuario');
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchUser, data, loading, error };
}
