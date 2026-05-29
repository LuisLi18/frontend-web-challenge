import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Stepper } from '@/components/Stepper';
import { BackLink } from '@/components/BackLink';
import { Spinner } from '@/components/Spinner';
import {
  filterByAge,
  PlanCard,
  PlansSlider,
  toQuotePlan,
  usePlans,
  type Plan,
  type QuotePlan,
} from '@/features/plans';
import { TargetCard, useQuoteStore } from '@/features/quote';
import { getFirstName } from '@/lib/formatters';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import styles from './Plans.module.scss';
import toMyselfIconUrl from '/icons/to-myself.svg';
import toSomeoneElseIconUrl from '/icons/to-someone-else.svg';
import homePlanIconUrl from '/icons/home-plan.svg';
import clinicPlanIconUrl from '/icons/clinic-plan.svg';
import checkupPlanIconUrl from '/icons/checkup-plan.svg';

const STEPS = [{ label: 'Planes y coberturas' }, { label: 'Resumen' }];
const RECOMMENDED_PLAN = 'Plan en Casa y Clínica';

function iconUrlForPlan(name: string): string {
  const trimmed = name.trim();
  if (trimmed.includes('Clínica')) return clinicPlanIconUrl;
  if (trimmed.includes('Chequeo')) return checkupPlanIconUrl;
  return homePlanIconUrl;
}

export function PlansPage() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const user = useQuoteStore((s) => s.user);
  const target = useQuoteStore((s) => s.target);
  const setTarget = useQuoteStore((s) => s.setTarget);
  const setSelectedPlan = useQuoteStore((s) => s.setSelectedPlan);

  // Cumple "al inicio los planes no deben mostrarse": forzamos target=null
  // en cada montaje, incluso si venía persistido o vivía en memoria de una
  // sesión previa. El gate `mounted` bloquea el bloque de planes hasta que
  // el clear se aplicó → evita el flash de loader si había target persistido.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    useQuoteStore.getState().clearTarget();
    setMounted(true);
  }, []);

  const showPlans = mounted && target !== null;
  const { data: plans, loading, error } = usePlans(showPlans);

  const visiblePlans: QuotePlan[] = useMemo(() => {
    if (!plans || !target || !user) return [];
    return filterByAge(plans, user.age).map((p: Plan) => toQuotePlan(p, target));
  }, [plans, target, user]);

  const handleSelect = (plan: QuotePlan) => {
    setSelectedPlan(plan);
    navigate('/summary');
  };

  if (!user) return null;

  return (
    <Layout
      banner={<Stepper steps={STEPS} current={1} onBack={() => navigate(-1)} />}
      showFooter={false}
    >
      <div className={styles.container}>
        <BackLink onClick={() => navigate(-1)} className={styles.backDesktopOnly} />

        <header className={styles.headline}>
          <h1 className={styles.title}>
            {getFirstName(user.name)} ¿Para quién deseas cotizar?
          </h1>
          <p className={styles.subtitle}>
            Selecciona la opción que se ajuste más a tus necesidades.
          </p>
        </header>

        <div role="radiogroup" aria-label="¿Para quién cotizas?" className={styles.targets}>
          <TargetCard
            icon={<img src={toMyselfIconUrl} alt="" width={48} height={48} decoding="async" />}
            title="Para mí"
            description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
            selected={target === 'self'}
            onSelect={() => setTarget('self')}
          />
          <TargetCard
            icon={<img src={toSomeoneElseIconUrl} alt="" width={48} height={48} decoding="async" />}
            title="Para alguien más"
            description="Realiza una cotización para uno de tus familiares o cualquier persona."
            selected={target === 'someone-else'}
            onSelect={() => setTarget('someone-else')}
          />
        </div>

        {showPlans && (
          <section aria-live="polite" className={styles.plansSection}>
            {loading && (
              <div className={styles.statusCenter}>
                <Spinner /> <span>Cargando planes…</span>
              </div>
            )}

            {error && (
              <div role="alert" className={styles.statusError}>
                No pudimos cargar los planes. Intenta de nuevo.
              </div>
            )}

            {!loading && !error && visiblePlans.length === 0 && (
              <div className={styles.statusCenter}>
                No encontramos planes disponibles para tu edad.
              </div>
            )}

            {!loading && !error && visiblePlans.length > 0 && (
              <>
                {isDesktop ? (
                  <div className={styles.grid}>
                    {visiblePlans.map((plan) => (
                      <PlanCard
                        key={plan.name}
                        plan={plan}
                        icon={<img src={iconUrlForPlan(plan.name)} alt="" width={56} height={56} decoding="async" />}
                        recommended={plan.name.trim() === RECOMMENDED_PLAN}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                ) : (
                  <PlansSlider total={visiblePlans.length}>
                    {visiblePlans.map((plan) => (
                      <div key={plan.name} className={styles.slide}>
                        <PlanCard
                          plan={plan}
                          icon={<img src={iconUrlForPlan(plan.name)} alt="" width={56} height={56} decoding="async" />}
                          recommended={plan.name.trim() === RECOMMENDED_PLAN}
                          onSelect={handleSelect}
                        />
                      </div>
                    ))}
                  </PlansSlider>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </Layout>
  );
}
