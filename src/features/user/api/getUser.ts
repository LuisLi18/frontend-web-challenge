import { apiGet } from '@/lib/apiClient';
import type { UserApi } from '../types';

export function getUser(signal?: AbortSignal): Promise<UserApi> {
  return apiGet<UserApi>('/user.json', { signal });
}
