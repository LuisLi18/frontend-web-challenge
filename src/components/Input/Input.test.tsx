import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('asocia label con input via htmlFor', () => {
    render(<Input label="Celular" />);
    const input = screen.getByLabelText('Celular');
    expect(input).toBeInstanceOf(HTMLInputElement);
  });

  it('muestra error con aria-invalid y role=alert', () => {
    render(<Input label="Celular" error="Celular inválido" />);
    expect(screen.getByLabelText('Celular')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Celular inválido');
  });

  it('escribe valor', async () => {
    render(<Input label="DNI" />);
    await userEvent.type(screen.getByLabelText('DNI'), '12345678');
    expect(screen.getByLabelText('DNI')).toHaveValue('12345678');
  });
});
