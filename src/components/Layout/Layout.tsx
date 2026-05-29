import clsx from 'clsx';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './Layout.module.scss';

export interface LayoutProps {
  /** Slot opcional debajo del header (Stepper). */
  banner?: React.ReactNode;
  /** Slot opcional al final del main (Volver). */
  showFooter?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Layout({ banner, showFooter = true, className, children }: LayoutProps) {
  return (
    <div className={styles.root}>
      <Header />
      {banner}
      <main className={clsx(styles.main, className)}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
