import clsx from 'clsx';
import styles from './Card.module.scss';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section';
  padding?: 'md' | 'lg' | 'xl';
}

export function Card({
  as = 'article',
  padding = 'lg',
  className,
  children,
  ...rest
}: CardProps) {
  const Component = as;
  return (
    <Component
      className={clsx(styles.root, styles[`padding-${padding}`], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
