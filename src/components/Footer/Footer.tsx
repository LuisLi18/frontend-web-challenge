import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <svg viewBox="0 0 90 30" className={styles.logo} aria-label="Rimac">
          <text
            x="0"
            y="22"
            fontFamily="Lato, sans-serif"
            fontSize="22"
            fontStyle="italic"
            fontWeight="900"
            fill="#FFFFFF"
          >
            RIMAC
          </text>
          <path
            d="M2 5 C 20 -2, 60 1, 88 6"
            stroke="#FFFFFF"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <p className={styles.copy}>© 2026 RIMAC Seguros y Reaseguros</p>
      </div>
    </footer>
  );
}
