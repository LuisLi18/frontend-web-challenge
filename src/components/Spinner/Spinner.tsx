import clsx from 'clsx';
import styles from './Spinner.module.scss';

export interface SpinnerProps {
  size?: 'sm' | 'md';
  className?: string;
  label?: string;
}

export function Spinner({ size = 'md', className, label = 'Cargando' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={clsx(styles.root, styles[size], className)}
    />
  );
}
