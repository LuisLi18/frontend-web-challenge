const API_BASE = import.meta.env.VITE_API_BASE;

if (!API_BASE) {
  throw new Error('VITE_API_BASE no está definido. Revisa tu .env');
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string,
  ) {
    super(message ?? `${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    ...init,
  });

  if (!res.ok) {
    throw new ApiError(res.status, res.statusText);
  }

  return (await res.json()) as T;
}
