import clsx from 'clsx';
import styles from './BackLink.module.scss';
import backButtonUrl from '/icons/back-btn.svg';

export interface BackLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function BackLink({ label = 'Volver', className, type = 'button', ...rest }: BackLinkProps) {
  return (
    <button type={type} className={clsx(styles.root, className)} {...rest}>
      <img  
        src={backButtonUrl}
        alt="Butón de volver"
        width={20}
        height={20}
        className={styles.icon}
        decoding="async"
      />
      <span>{label}</span>
    </button>
  );
}
