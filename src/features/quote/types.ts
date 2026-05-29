import type { User } from '@/features/user/types';
import type { QuotePlan } from '@/features/plans/types';

export type Target = 'self' | 'someone-else';

export interface QuoteState {
  user: User | null;
  target: Target | null;
  selectedPlan: QuotePlan | null;
}

export interface QuoteActions {
  setUser: (user: User) => void;
  setTarget: (target: Target) => void;
  /** Limpia target (y por ende selectedPlan). Usado al entrar a /plans para
   *  cumplir "al inicio los planes no deben mostrarse". */
  clearTarget: () => void;
  setSelectedPlan: (plan: QuotePlan) => void;
  reset: () => void;
}

export type QuoteStore = QuoteState & QuoteActions;
