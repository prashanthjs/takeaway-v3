'use client';

import { useTranslations } from 'next-intl';
import { Alert } from '@heroui/react';
import { se } from 'date-fns/locale';

type Props = {
  className?: string;
  serverError?: string;
  validationErrors?: Record<string, string[] | undefined>;
};

export function FormErrorMessage({ serverError, validationErrors, className }: Props) {
  const t = useTranslations('common');

  if (!serverError && !validationErrors) {
    return null;
  }

  const errorDescription = (function () {
    const errors = validationErrors;
    if (!errors) {
      return null;
    }

    return (
      <ul className="text-sm list-disc pl-5">
        {Object.keys(errors).map(key => (
          <li key={key}>{`${key}: ${validationErrors[key as keyof typeof validationErrors]}`}</li>
        ))}
      </ul>
    );
  })();

  return (
    <Alert
      color="danger"
      description={serverError ?? errorDescription ?? t('form.messages.failed')}
      className={className}
    />
  );
}
