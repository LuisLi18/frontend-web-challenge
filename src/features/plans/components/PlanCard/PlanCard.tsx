import { Fragment } from 'react';
import { Button } from '@/components/Button';
import { formatMonthlyPrice, formatPrice } from '@/lib/formatters';
import type { QuotePlan } from '@/features/plans/types';
import styles from './PlanCard.module.scss';
import doctorIconUrl from '/icons/doctor.svg';
import laptopIconUrl from '/icons/laptop.svg';
import hospitalIconUrl from '/icons/hospital.svg';

/** Iconos por posición — todos los planes tienen 3 items según el API.
 *  Se rotan con módulo por defensa si algún plan tiene >3 items. */
const FEATURE_ICONS = [doctorIconUrl, laptopIconUrl, hospitalIconUrl];

/** Frases que el Figma muestra en bold dentro de las descripciones de los 5
 *  planes del API. Cubre los casos visibles (Casa, Casa y Clínica, Chequeo)
 *  y los inferidos (Bienestar, Fitness) por consistencia visual. */
const BOLD_PHRASES = [
  'Médico general a domicilio',
  'Un Chequeo preventivo general',
  'más de 200 clínicas del país',
  'videos y recursos sobre bienestar',
  'Consultas en clínica',
  'Medicinas y exámenes',
  'Beneficios exclusivos',
  'del Plan en Casa',
  'del plan en casa',
  'Videoconsulta',
  'Indemnización',
  'Descuentos',
  'Vacunas',
].sort((a, b) => b.length - a.length); // ordenado por longitud desc → la regex prefiere matches largos

const BOLD_REGEX = new RegExp(
  `(${BOLD_PHRASES.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g',
);

function highlightDescription(text: string): React.ReactNode {
  return text.split(BOLD_REGEX).map((part, i) => {
    if (BOLD_PHRASES.includes(part)) {
      return <strong key={i}>{part}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export interface PlanCardProps {
  plan: QuotePlan;
  icon: React.ReactNode;
  recommended?: boolean;
  onSelect: (plan: QuotePlan) => void;
}

export function PlanCard({ plan, icon, recommended = false, onSelect }: PlanCardProps) {
  return (
    <article className={styles.root}>
      {recommended && <span className={styles.badge}>Plan recomendado</span>}

      <header className={styles.header}>
        <h3 className={styles.title}>{plan.name.trim()}</h3>
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      </header>

      <div className={styles.priceBlock}>
        <span className={styles.priceLabel}>COSTO DEL PLAN</span>
        {plan.hasDiscount && (
          <span className={styles.priceOld}>
            <s>{formatPrice(plan.originalPrice)} antes</s>
          </span>
        )}
        <span className={styles.priceFinal}>{formatMonthlyPrice(plan.finalPrice)}</span>
      </div>

      <hr className={styles.divider} />

      <ul className={styles.features}>
        {plan.description.map((line, idx) => (
          <li key={idx} className={styles.feature}>
            <img
              src={FEATURE_ICONS[idx % FEATURE_ICONS.length]}
              alt=""
              width={20}
              height={20}
              className={styles.featureIcon}
              aria-hidden="true"
              decoding="async"
            />
            <span className={styles.featureText}>{highlightDescription(line)}</span>
          </li>
        ))}
      </ul>

      <Button
        variant="primary"
        fullWidth
        onClick={() => onSelect(plan)}
        className={styles.selectButton}
      >
        Seleccionar Plan
      </Button>
    </article>
  );
}
