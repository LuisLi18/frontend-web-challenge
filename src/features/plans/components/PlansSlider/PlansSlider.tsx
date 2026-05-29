import { useState } from 'react';
import clsx from 'clsx';
import styles from './PlansSlider.module.scss';

export interface PlansSliderProps {
  /** Total de slides. */
  total: number;
  children: React.ReactNode;
}

/**
 * Carrusel simple para mobile. Muestra una slide activa + un sliver del
 * siguiente card para indicar visualmente que hay más planes (peek pattern).
 * Cada paso de paginación desplaza por ancho-de-slide + gap.
 */
const SLIDE_PERCENT = 88; // % del contenedor que ocupa cada slide
const GAP_PX = 16; // debe coincidir con el `gap` del .track en SCSS

export function PlansSlider({ total, children }: PlansSliderProps) {
  const [index, setIndex] = useState(0);

  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(total - 1, next));
    setIndex(clamped);
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.track}
        style={{
          transform: `translateX(calc(-${index * SLIDE_PERCENT}% - ${index * GAP_PX}px))`,
        }}
      >
        {children}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Plan anterior"
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path
              d="M10 4 L6 8 L10 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>

        <span className={styles.counter} aria-live="polite">
          {index + 1} / {total}
        </span>

        <button
          type="button"
          className={clsx(styles.arrow, styles.arrowNext)}
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
          aria-label="Siguiente plan"
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path
              d="M6 4 L10 8 L6 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
