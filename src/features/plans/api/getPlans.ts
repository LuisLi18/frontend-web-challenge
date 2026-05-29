import { apiGet } from '@/lib/apiClient';
import type { Plan, PlansApi } from '../types';

export async function getPlans(signal?: AbortSignal): Promise<Plan[]> {
  const res = await apiGet<PlansApi>('/plans.json', { signal });
  return res.list;
}
