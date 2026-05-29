import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Stepper } from '@/components/Stepper';
import { BackLink } from '@/components/BackLink';
import { Card } from '@/components/Card';
import { useQuoteStore } from '@/features/quote';
import { formatMonthlyPrice } from '@/lib/formatters';
import styles from './Summary.module.scss';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import familyIconUrl from '/icons/family.svg';

const STEPS = [{ label: 'Planes y coberturas' }, { label: 'Resumen' }];

export function SummaryPage() {
  const navigate = useNavigate();
  const user = useQuoteStore((s) => s.user);
  const plan = useQuoteStore((s) => s.selectedPlan);
  const isDesktop = useIsDesktop();

  if (!user || !plan) return null;

  const fullName = `${user.name} ${user.lastName}`.trim();

  return (
    <Layout banner={isDesktop ? <Stepper steps={STEPS} current={2} /> : null} showFooter={false}>
      <div className={styles.container}>
        {isDesktop && <BackLink onClick={() => navigate(-1)} />}

        <h1 className={styles.title}>Resumen del seguro</h1>

        <Card padding="xl" className={styles.card} as="section">
          <p className={styles.calculatedFor}>PRECIOS CALCULADOS PARA:</p>
          <p className={styles.user}>
            <span className={styles.userIcon} aria-hidden="true">
              <img src={familyIconUrl} alt="Icono de familia" width="24" height="24" />
            </span>
            <span>{fullName}</span>
          </p>

          <hr className={styles.divider} />

          <dl className={styles.details}>
            <div className={styles.detailsBlock}>
              <dt>Responsable de pago</dt>
              <dd>{user.docType}: {user.docNumber}</dd>
              <dd>Celular: {user.phone}</dd>
            </div>

            <div className={styles.detailsBlock}>
              <dt>Plan elegido</dt>
              <dd>{plan.name.trim()}</dd>
              <dd>Costo del Plan: {formatMonthlyPrice(plan.finalPrice)}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </Layout>
  );
}
