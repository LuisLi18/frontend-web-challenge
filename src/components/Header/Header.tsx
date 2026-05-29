import logoUrl from '/rimac-logo-header.svg';
import phoneIconUrl from '/icons/phone.svg';

import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <a href="/" className={styles.logoLink}>
          <img
            src={logoUrl}
            alt="Rimac"
            width={40}
            height={36}
            className={styles.logo}
            decoding="async"
          />
        </a>

        <div className={styles.contact}>
          <span className={styles.tagline}>¡Compra por este medio!</span>
          <a href="tel:014116001" className={styles.phone}>
            <img
              src={phoneIconUrl}
              alt="Phone"
              width={20}
              height={20}
              className={styles.phoneIcon}
              decoding="async"
            />
            <span>(01) 411 6001</span>
          </a>
        </div>
      </div>
    </header>
  );
}
