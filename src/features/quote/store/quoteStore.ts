import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuoteStore } from '../types';

const initialState = {
  user: null,
  target: null,
  selectedPlan: null,
} as const;

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user }),
      setTarget: (target) => set({ target, selectedPlan: null }),
      clearTarget: () => set({ target: null, selectedPlan: null }),
      setSelectedPlan: (selectedPlan) => set({ selectedPlan }),
      reset: () => set(initialState),
    }),
    {
      name: 'rimac-quote',
      version: 1,
      // `target` queda fuera del partialize a propósito: la regla del reto
       // exige que "al inicio los planes no deben mostrarse" → cada visita
       // a /plans debe partir con target=null hasta que el usuario reelige.
      partialize: (state) => ({
        user: state.user,
        selectedPlan: state.selectedPlan,
      }),
    },
  ),
);
