'use client';

import { useTranslations } from 'next-intl';
import { Alert } from '@heroui/react';

type Props = {
  isDisplayed: boolean;
  message?: string;
  className?: string;
};

export function FormSuccessMessage({ isDisplayed, message, className }: Props) {
  const t = useTranslations('common');

  if (!isDisplayed) {
    return null;
  }
  return <Alert color="success" description={message ?? t('form.messages.success')} className={className} />;
}
