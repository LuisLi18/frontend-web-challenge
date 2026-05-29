import clsx from 'clsx';
import styles from './TargetCard.module.scss';

export interface TargetCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export function TargetCard({ icon, title, description, selected, onSelect }: TargetCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={clsx(styles.root, selected && styles.selected)}
      onClick={onSelect}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        {icon}
      </span>

      <span className={styles.check} aria-hidden="true">
        {selected ? (
          <svg viewBox="0 0 24 24" className={styles.checkIcon}>
            <circle cx="12" cy="12" r="12" fill="#379e0e" />
            <path
              d="M7 12L11 16L17 9"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        ) : (
          <span className={styles.checkEmpty} />
        )}
      </span>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </button>
  );
}
