import { forwardRef, useId } from 'react';
import clsx from 'clsx';
import styles from './Checkbox.module.scss';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, id, className, ...rest },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const errorId = `${inputId}-error`;

  return (
    <div className={clsx(styles.root, className)}>
      <label htmlFor={inputId} className={styles.label}>
        <span className={styles.boxWrapper}>
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={styles.input}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            {...rest}
          />
          <span className={clsx(styles.box, error && styles.boxError)} aria-hidden="true">
            <svg viewBox="0 0 12 10" fill="none" className={styles.tick}>
              <path
                d="M1 5L4.5 8.5L11 1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
        {label && <span className={styles.text}>{label}</span>}
      </label>
      {error && (
        <p id={errorId} role="alert" className={styles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
});
