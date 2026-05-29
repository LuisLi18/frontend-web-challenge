import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children'> {
  options: SelectOption[];
  /** Cuando se usa dentro del Input como startSlot, sin borde propio. */
  embedded?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, embedded = false, className, ...rest },
  ref,
) {
  return (
    <div className={clsx(styles.root, embedded && styles.embedded, className)}>
      <select ref={ref} className={styles.select} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className={styles.chevron}
        viewBox="0 0 12 8"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 1.5L6 6.5L11 1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
});
