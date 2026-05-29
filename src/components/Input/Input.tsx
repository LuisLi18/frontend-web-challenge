import { forwardRef, useId } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  /** Adornment a la izquierda (e.g. un Select de tipo doc). */
  startSlot?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, startSlot, id, className, ...rest },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const errorId = `${inputId}-error`;

  return (
    <div className={clsx(styles.root, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={clsx(styles.field, error && styles.fieldError)}>
        {startSlot && <div className={styles.startSlot}>{startSlot}</div>}
        <input
          ref={ref}
          id={inputId}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
      </div>
      {error && (
        <p id={errorId} role="alert" className={styles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
});
