import clsx from 'clsx';
import styles from './Stepper.module.scss';

export interface StepperStep {
  label: string;
}

export interface StepperProps {
  steps: StepperStep[];
  /** 1-indexed. */
  current: number;
  className?: string;
  /** Si se proporciona, en mobile renderiza un botón de back inline antes
   *  del "PASO X DE Y". En desktop el back vive en el contenido de la página. */
  onBack?: () => void;
}

export function Stepper({ steps, current, className, onBack }: StepperProps) {
  const total = steps.length;
  const progress = Math.min(100, Math.round((current / total) * 100));

  return (
    <nav
      className={clsx(styles.root, className)}
      aria-label="Progreso de cotización"
    >
      <ol className={styles.desktop}>
        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isActive = stepNumber === current;
          return (
            <li key={step.label} className={styles.item}>
              <span
                className={clsx(styles.bubble, isActive && styles.bubbleActive)}
                aria-current={isActive ? 'step' : undefined}
              >
                {stepNumber}
              </span>
              <span className={clsx(styles.label, isActive && styles.labelActive)}>
                {step.label}
              </span>
              {idx < steps.length - 1 && <span className={styles.dots} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>

      <div className={styles.mobile}>
        {onBack && (
          <button
            type="button"
            className={styles.backBtn}
            onClick={onBack}
            aria-label="Volver"
          >
            <svg viewBox="0 0 16 16" className={styles.backIcon} aria-hidden="true">
              <path
                d="M10 4 L6 8 L10 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        )}
        <span className={styles.mobileLabel}>
          PASO {current} DE {total}
        </span>
        <div className={styles.bar} role="presentation">
          <div className={styles.barFill} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </nav>
  );
}
