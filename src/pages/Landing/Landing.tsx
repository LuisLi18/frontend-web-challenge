import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { useUser, userFormSchema, type UserFormSchema } from '@/features/user';
import { useQuoteStore } from '@/features/quote';
import { calcAge } from '@/lib/age';
import styles from './Landing.module.scss';
import familyUrl from '/family-hero.png';

export function LandingPage() {
  const navigate = useNavigate();
  const setUser = useQuoteStore((s) => s.setUser);
  const { fetchUser, loading: userLoading } = useUser();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      docType: 'DNI',
      docNumber: '',
      phone: '',
      acceptsPrivacy: false,
      acceptsComms: false,
    },
    mode: 'onBlur',
  });

  const docType = watch('docType');
  const docMaxLength = docType === 'CE' ? 9 : 8;

  const onSubmit = handleSubmit(async (form) => {
    setSubmitError(null);
    try {
      const apiUser = await fetchUser();
      setUser({
        ...apiUser,
        docType: form.docType,
        docNumber: form.docNumber,
        phone: form.phone,
        age: calcAge(apiUser.birthDay),
      });
      navigate('/plans');
    } catch {
      setSubmitError('No pudimos obtener tus datos. Intenta nuevamente.');
    }
  });

  return (
    <Layout className={styles.layout} showFooter={false}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.titleRow}>
            <span className={styles.badge}>Seguro Salud Flexible</span>
            <h1 className={styles.title}>Creado para ti y tu familia</h1>
          </div>

          <div className={styles.imageWrap} aria-hidden="true">
            <img
              src={familyUrl}
              alt="Ilustración de una familia feliz"
              width={480}
              height={560}
              className={styles.image}
              decoding="async"
            />
          </div>

          <hr className={styles.divider} />

          <p className={styles.subtitle}>
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría.
            100% online.
          </p>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <div className={styles.fields}>
              <Input
                label="Documento"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={docMaxLength}
                aria-required="true"
                error={errors.docNumber?.message}
                startSlot={
                  <Select
                    embedded
                    className={styles.docSelect}
                    aria-label="Tipo de documento"
                    options={[
                      { value: 'DNI', label: 'DNI' },
                      { value: 'CE', label: 'CE' },
                    ]}
                    {...register('docType')}
                  />
                }
                {...register('docNumber')}
              />

              <Input
                label="Celular"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={9}
                aria-required="true"
                error={errors.phone?.message}
                {...register('phone')}
              />
            </div>

            <div className={styles.checkboxes}>
              <Checkbox
                label="Acepto la Política de Privacidad"
                error={errors.acceptsPrivacy?.message}
                {...register('acceptsPrivacy')}
              />
              <Checkbox
                label="Acepto la Política Comunicaciones Comerciales"
                error={errors.acceptsComms?.message}
                {...register('acceptsComms')}
              />
            </div>

            <a className={styles.terms} href="#" onClick={(e) => e.preventDefault()}>
              Aplican Términos y Condiciones.
            </a>

            {submitError && (
              <p role="alert" className={styles.submitError}>
                {submitError}
              </p>
            )}

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              loading={userLoading}
              className={styles.submitBtn}
            >
              Cotiza aquí
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
