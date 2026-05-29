import { z } from 'zod';

const docNumberByType = {
  DNI: { length: 8, label: 'DNI debe tener 8 dígitos' },
  CE: { length: 9, label: 'CE debe tener 9 dígitos' },
} as const;

export const userFormSchema = z
  .object({
    docType: z.enum(['DNI', 'CE'], {
      errorMap: () => ({ message: 'Selecciona tipo de documento' }),
    }),
    docNumber: z
      .string()
      .min(1, 'Número de documento requerido')
      .regex(/^\d+$/, 'Solo dígitos'),
    phone: z
      .string()
      .min(1, 'Celular requerido')
      .regex(/^9\d{8}$/, 'Celular inválido (9 dígitos, empieza en 9)'),
    acceptsPrivacy: z.boolean().refine((v) => v === true, {
      message: 'Debes aceptar la Política de Privacidad',
    }),
    acceptsComms: z.boolean().refine((v) => v === true, {
      message: 'Debes aceptar la Política de Comunicaciones',
    }),
  })
  .superRefine((data, ctx) => {
    const rule = docNumberByType[data.docType];
    if (data.docNumber.length !== rule.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['docNumber'],
        message: rule.label,
      });
    }
  });

export type UserFormSchema = z.infer<typeof userFormSchema>;
