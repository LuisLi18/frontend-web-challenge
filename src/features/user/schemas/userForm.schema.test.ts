import { describe, expect, it } from 'vitest';
import { userFormSchema } from './userForm.schema';

const valid = {
  docType: 'DNI' as const,
  docNumber: '12345678',
  phone: '987654321',
  acceptsPrivacy: true as const,
  acceptsComms: true as const,
};

describe('userFormSchema', () => {
  it('acepta entrada válida con DNI', () => {
    expect(userFormSchema.safeParse(valid).success).toBe(true);
  });

  it('rechaza DNI con longitud incorrecta', () => {
    const res = userFormSchema.safeParse({ ...valid, docNumber: '123' });
    expect(res.success).toBe(false);
  });

  it('valida CE con 9 dígitos', () => {
    const ce = { ...valid, docType: 'CE' as const, docNumber: '123456789' };
    expect(userFormSchema.safeParse(ce).success).toBe(true);
  });

  it('rechaza celular que no empieza en 9', () => {
    const res = userFormSchema.safeParse({ ...valid, phone: '812345678' });
    expect(res.success).toBe(false);
  });

  it('rechaza checkboxes sin marcar', () => {
    const res = userFormSchema.safeParse({ ...valid, acceptsPrivacy: false });
    expect(res.success).toBe(false);
  });
});
