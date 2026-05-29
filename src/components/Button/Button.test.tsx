import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza children', () => {
    render(<Button>Cotiza aquí</Button>);
    expect(screen.getByRole('button', { name: /cotiza aquí/i })).toBeInTheDocument();
  });

  it('dispara onClick al hacer click', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>OK</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('cuando loading: deshabilita y oculta children', () => {
    render(<Button loading>OK</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });

  it('default type es button (no submit)', () => {
    render(<Button>X</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
