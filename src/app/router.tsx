import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from '@/pages/Landing';
import { PlansPage } from '@/pages/Plans';
import { SummaryPage } from '@/pages/Summary';
import { useQuoteStore } from '@/features/quote';

interface GuardProps {
  children: React.ReactNode;
}

function RequireUser({ children }: GuardProps) {
  const user = useQuoteStore((s) => s.user);
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function RequirePlan({ children }: GuardProps) {
  const user = useQuoteStore((s) => s.user);
  const plan = useQuoteStore((s) => s.selectedPlan);
  if (!user || !plan) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/plans"
        element={
          <RequireUser>
            <PlansPage />
          </RequireUser>
        }
      />
      <Route
        path="/summary"
        element={
          <RequirePlan>
            <SummaryPage />
          </RequirePlan>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
